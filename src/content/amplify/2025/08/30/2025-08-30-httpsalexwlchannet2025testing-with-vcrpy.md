---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/cards/2025/testing-with-vcrpy.jpg'
date: '2025-08-30T20:27:05.924Z'
dateFolder: 2025/08/30
description: >-
  How I record HTTP requests to get fast, reliable, and consistent tests, and
  the patterns I use in a production codebase.
isBasedOn: 'https://alexwlchan.net/2025/testing-with-vcrpy/'
link: 'https://alexwlchan.net/2025/testing-with-vcrpy/'
slug: 2025-08-30-httpsalexwlchannet2025testing-with-vcrpy
tags:
  - code
title: Using vcrpy to test HTTP interactions in Python
---
<p>Testing code that makes HTTP requests can be difficult. Real requests are slow, flaky, and hard to control. That’s why I use a Python library called <a href="https://vcrpy.readthedocs.io/">vcrpy</a>, which does a one-off recording of real HTTP interactions, then replays them during future tests.</p>
<p>These recordings are saved to a “cassette” – a plaintext file that I keep alongside my tests and my code. The cassette ensures that all my tests get consistent HTTP responses, which makes them faster and more reliable, especially in CI. I only have to make one real network request, and then I can run my tests locally and offline.</p>
<p>In this post, I’ll show you how I use vcrpy in a production codebase – not just the basics, but also the patterns, pitfalls, and fixtures that make it work for a real team.</p>
<blockquote><h3>Table of contents</h3><ul><li><a href="https://alexwlchan.net/2025/testing-with-vcrpy/#why-do-you-like-vcrpy">Why do you like vcrpy?</a></li><li><a href="https://alexwlchan.net/2025/testing-with-vcrpy/#summary">Summary</a></li></ul></blockquote>
<figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2025/pexels-inspiredimages-157541_1x.avif%20750w,/images/2025/pexels-inspiredimages-157541_2x.avif%201500w,/images/2025/pexels-inspiredimages-157541_3x.avif%202250w" type="image/avif"/><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2025/pexels-inspiredimages-157541_1x.webp%20750w,/images/2025/pexels-inspiredimages-157541_2x.webp%201500w,/images/2025/pexels-inspiredimages-157541_3x.webp%202250w" type="image/webp"/><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2025/pexels-inspiredimages-157541_1x.jpg%20750w,/images/2025/pexels-inspiredimages-157541_2x.jpg%201500w,/images/2025/pexels-inspiredimages-157541_3x.jpg%202250w" type="image/jpeg"/><img alt="A pile of three black video cassette tapes stacked on a wooden table." src="https://alexwlchan.net/images/2025/pexels-inspiredimages-157541_1x.jpg"/></picture><figcaption>A pile of three black video cassette tapes stacked on a wooden table.</figcaption></figure>
<h2>Why not make real HTTP requests in tests?</h2>
<p>There are several reasons why I avoid real HTTP requests in my tests:</p>
<h3>It makes my tests slower</h3>
<p>I want my tests to be fast, because then I’ll run them more often and catch mistakes sooner. An individual HTTP call might be quick, but stack up hundreds of them and tests really start to drag.</p>
<h3>It makes my tests less reliable</h3>
<p>Even if my code is correct, my tests could fail because of problems on the remote server. What if I’m offline? What if the server is having a temporary outage? What if the server starts rate limiting me for making too many HTTP requests?</p>
<h3>It makes my tests more brittle</h3>
<p>If my tests depend on the server having certain state, then the server state could change and break or degrade my test suite.</p>
<p>Sometimes this change is obvious. For example, suppose I’m testing a function to fetch photos from Flickr, and then the photo I’m using in my test gets deleted. My code works correctly for photos that still exist, but now my test starts failing.</p>
<p>Sometimes this change is more subtle. Suppose I’ve written a regression test for an edge case, and then the server state changes, so the example I’m checking is no longer an instance of the edge case. I could break the code and never realise, because the test would keep passing. My test suite would become less effective.</p>
<h3>It means passing around more secrets</h3>
<p>A lot of my HTTP calls require secrets, like API keys or OAuth tokens. If the tests made real HTTP calls, I’d need to copy those secrets to every environment where I’m running the tests. That increases the risk of the secret getting leaked.</p>
<h3>It makes my tests harder to debug</h3>
<p>If there are more reasons why a test could fail, then it takes longer to work out if the failure was caused by my mistake, or a change on the server.</p>
<h3>Recording and replaying HTTP requests solves these problems</h3>
<p>If my test suite is returning consistent responses for HTTP calls, and those responses are defined within the test suite itself, then my tests get faster and more reliable. I’m not making real network calls, I’m not dependent on the behaviour of a server, and I don’t need real secrets to run the tests.</p>
<p>There are a variety of ways to define this sort of test mock; I like to record real responses because it ensures I’m getting a high-fidelity mock, and it makes it fairly easy to add new tests.</p>
<h2>Why do you like vcrpy?</h2>
<p>I know two Python libraries that record real HTTP responses: <a href="https://vcrpy.readthedocs.io/">vcrpy</a> and <a href="https://github.com/betamaxpy/betamax">betamax</a>, both based on <a href="https://github.com/vcr/vcr">a Ruby library called vcr</a>. I’ve used all three, they behave in a similar way, and they work well.</p>
<p>I prefer vcrpy for Python because it supports a <a href="https://vcrpy.readthedocs.io/en/latest/installation.html#compatibility">wide variety of HTTP libraries</a>, whereas betamax only works with <a href="https://requests.readthedocs.io/en/latest/">requests</a>. I currently use a mixture of <a href="https://github.com/encode/httpx">httpx</a> and <a href="https://urllib3.readthedocs.io/en/stable/">urllib3</a>, and it’s convenient to test them both with the same library and test helpers.</p>
<p>I also like that vcrpy works without needing any changes to the code I’m testing. I can write HTTP code as I normally would, then I add a vcrpy decorator in my test and the responses get recorded. I don’t like test frameworks that require me to rewrite my code to fit – the tests should follow the code, not the other way round.</p>
<h2>A basic example of using vcrpy</h2>
<p>Here’s a test that uses vcrpy to fetch <code>www.example.com</code>, and look for some text in the response. I use <code>vcr.use_cassette</code> as a context manager around the code that makes an HTTP request:</p>
<pre><code>import httpx
import vcr


def test_example_domain():
    with vcr.use_cassette("fixtures/vcr_cassettes/test_example_domain.yml"):
        resp = httpx.get("https://www.example.com/")
        assert "&lt;h1&gt;Example Domain&lt;/h1&gt;" in resp.text
</code></pre>
<p>Alternatively, you can use <code>vcr.use_cassette</code> as a decorator:</p>
<pre><code>@vcr.use_cassette("fixtures/vcr_cassettes/test_example_domain.yml")
def test_example_domain():
    resp = httpx.get("https://www.example.com/")
    assert "&lt;h1&gt;Example Domain&lt;/h1&gt;" in resp.text
</code></pre>
<p>With the decorator, you can also omit the path to the cassette file, and vcrpy will name the cassette file after the function:</p>
<pre><code>@vcr.use_cassette()
def test_example_domain():
    resp = httpx.get("https://www.example.com/")
    assert "&lt;h1&gt;Example Domain&lt;/h1&gt;" in resp.text
</code></pre>
<p>When I run this test using pytest (<code>python3 -m pytest test_example.py</code>), vcrpy will check if the cassette file exists. If the file is missing, it makes a real HTTP call and saves it to the file. If the file exists, it replays the previously-recorded HTTP call.</p>
<p>By default, the cassette is a YAML file. Here’s what it looks like: <a href="https://alexwlchan.net/files/2025/test_example_domain.yml">test_example_domain.yml</a>.</p>
<p>If a test makes more than one HTTP request, vcrpy records all of them in the same cassette file.</p>
<h2>Using vcrpy in production</h2>
<h3>Keeping secrets out of my cassettes</h3>
<p>The cassette files contain the complete HTTP request and response, which includes the URL, form data, and HTTP headers. If I’m testing an API that requires auth, the HTTP request could include secrets like an API key or OAuth token. I don’t want to save those secrets in the cassette file!</p>
<p>Fortunately, vcrpy can <a href="https://vcrpy.readthedocs.io/en/latest/advanced.html#filter-sensitive-data-from-the-request">filter sensitive data</a> before it’s saved to the cassette file – HTTP headers, URL query parameters, or form data.</p>
<p>Here’s an example where I’m using <code>filter_query_parameters</code> to redact an API key. I’m replacing the real value with the placeholder <code>REDACTED_API_KEY</code>.</p>
<pre><code>import os

import httpx
import vcr


def test_flickr_api():
    with vcr.use_cassette(
        "fixtures/vcr_cassettes/test_flickr_api.yml",
        filter_query_parameters=[("api_key", "REDACTED_API_KEY")],
    ):
        api_key = os.environ.get("FLICKR_API_KEY", "API_KEY")

        resp = httpx.get(
            "https://api.flickr.com/services/rest/",
            params={
                "api_key": api_key,
                "method": "flickr.urls.lookupUser",
                "url": "https://www.flickr.com/photos/alexwlchan/",
            },
        )

        assert '&lt;user id="199258389@N04"&gt;' in resp.text
</code></pre>
<p>When I run this test the first time, I need to pass an env var <code>FLICKR_API_KEY</code>. This makes a real request and records a cassette, but with my redacted value. When I run the test again, I don’t need to pass the env var, but the test will still pass.</p>
<p>You can see the complete YAML file in <a href="https://alexwlchan.net/files/2025/test_flickr_api.yml">test_flickr_api.yml</a>. Notice how the <code>api_key</code> query parameter has been redacted in the recorded request:</p>
<pre><code>interactions:
- request:
    …
    uri: https://api.flickr.com/services/rest/?api_key=REDACTED_API_KEY&amp;method=flickr.urls.lookupUser&amp;url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Falexwlchan%2F
    …
</code></pre>
<p>You can also tell vcrpy to omit the sensitive field entirely, but I like to insert a placeholder value. It’s useful for debugging later – you can see that a value was replaced, and easily search for the code that’s doing the redaction.</p>
<h3>Improving the human readability of cassettes</h3>
<p>If you look at the first two cassette files, you’ll notice that the response body is stored as base64-encoded binary data:</p>
<pre><code>response:
  body:
    string: !!binary |
      H4sIAAAAAAAAAH1UTXPbIBC9+1ds1UsyIyQnaRqPLWn6mWkPaQ9pDz0SsbKYCFAByfZ08t+7Qo4j
      N5makYFdeLvvsZC9Eqb0uxah9qopZtljh1wUM6Bf5qVvsPi85aptED4ZxaXO0tE6G5co9BzKmluH
      Po86X7FFBGkxcdbetwx/d7LPo49Ge9SeDWEjKMdZHnnc+nQIvzpAvYSkucI86iVuWmP9ZP9GCl/n
</code></pre>
<p>That’s because <code>example.com</code> and <code>api.flickr.com</code> both <a href="https://developer.mozilla.org/en-US/docs/Glossary/gzip_compression">gzip compress</a> their responses, and vcrpy is preserving that compression. But gzip compression is handled by the HTTP libraries – my code never needs to worry about compression; it just gets the uncompressed response.</p>
<p>Where possible, I prefer to store responses in their uncompressed form. It makes the cassettes easier to read, and you can see if secrets are included in the saved response data. I also find it useful to read cassettes as an example of what an API response looks like – and in particular, what it looked like when I wrote the test. Cassettes have helped me spot undocumented changes in APIs.</p>
<p>Here’s an example where I’m using <a href="https://vcrpy.readthedocs.io/en/latest/advanced.html#decode-compressed-response"><code>decode_compressed_response=True</code></a> to remove the gzip compression in the cassette:</p>
<pre><code>def test_example_domain_with_decode():
    with vcr.use_cassette(
        "fixtures/vcr_cassettes/test_example_domain_with_decode.yml",
        decode_compressed_response=True,
    ):
        resp = httpx.get("https://www.example.com/")
        assert "&lt;h1&gt;Example Domain&lt;/h1&gt;" in resp.text
</code></pre>
<p>You can see the complete cassette file in <a href="https://alexwlchan.net/files/2025/test_example_domain_with_decode.yml">test_example_domain_with_decode.yml</a>. Notice the response body now contains an HTML string:</p>
<pre><code>response:
  body:
    string: "&lt;!doctype html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Example Domain&lt;/title&gt;\n\n
      \   &lt;meta charset=\"utf-8\" /&gt;\n    &lt;meta http-equiv=\"Content-type\" content=\"text/html;
      charset=utf-8\" /&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width,
</code></pre>
<h3>Naming my cassettes to make sense later</h3>
<p>If you write a lot of tests that use vcrpy, you’ll end up with a fixtures directory that’s full of cassettes. I like cassette names to match my test functions, so they’re easy to match up later.</p>
<p>I could specify a cassette name explicitly in every test, but that’s extra work and prone to error. Alternatively, I could use the decorator and use the automatic cassette name – but vcrpy uses the name of the test function, which may not distinguish between tests. In particular, I often group tests into classes, or use <a href="https://nedbatchelder.com/blog/202508/starting_with_pytests_parametrize.html">parametrized tests</a> to run the same test with different values.</p>
<p>Consider the following example:</p>
<pre><code>import httpx
import pytest
import vcr


class TestExampleDotCom:
    def test_status_code(self):
        resp = httpx.get("https://example.com")
        assert resp.status_code == 200


@vcr.use_cassette()
@pytest.mark.parametrize(
    "url, status_code",
    [
        ("https://httpbin.org/status/200", 200),
        ("https://httpbin.org/status/404", 404),
        ("https://httpbin.org/status/500", 500),
    ],
)
def test_status_code(url, status_code):
    resp = httpx.get(url)
    assert resp.status_code == status_code
</code></pre>
<p>This is four different tests, but vcrpy’s automatic cassette name is the same for each of them: <code>test_status_code</code>. The tests will fail if you try to run them – vcrpy will record a cassette for the first test that runs, then try to replay that cassette for the second test. The second test makes a different HTTP request, so vcrpy will throw an error because it can’t find a matching request.</p>
<p>Here’s what I do instead: I have a pytest fixture to choose cassette names, which includes the name of the test class (if any) and the ID of the parametrized test case. Because I sometimes use URLs in parametrized tests, I also check the test case ID doesn’t include slashes or colons – I don’t want those in my filenames!</p>
<p>Here’s the decorator:</p>
<pre><code>@pytest.fixture
def cassette_name(request: pytest.FixtureRequest) -&gt; str:
    """
    Returns the filename of a VCR cassette to use in tests.

    The name can be made up of (up to) three parts:

    -   the name of the test class
    -   the name of the test function
    -   the ID of the test case in @pytest.mark.parametrize

    """
    name = request.node.name

    # This is to catch cases where e.g. I try to include a complete
    # HTTP URL in a cassette name, which creates messy folders in
    # the fixtures directory.
    if ":" in name or "/" in name:
        raise ValueError(
            "Illegal characters in VCR cassette name - "
            "please set a test ID with pytest.param(…, id='…')"
        )

    if request.cls is not None:
        return f"{request.cls.__name__}.{name}.yml"
    else:
        return f"{name}.yml"
</code></pre>
<p>Here’s my test rewritten to use that new decorator:</p>
<pre><code>class TestExampleDotCom:
    def test_status_code(self, cassette_name):
        with vcr.use_cassette(cassette_name):
            resp = httpx.get("https://example.com")
            assert resp.status_code == 200


@vcr.use_cassette()
@pytest.mark.parametrize(
    "url, status_code",
    [
        pytest.param("https://httpbin.org/status/200", 200, id="ok"),
        pytest.param("https://httpbin.org/status/404", 404, id="not_found"),
        pytest.param("https://httpbin.org/status/500", 500, id="server_error"),
    ],
)
def test_status_code(url, status_code, cassette_name):
    with vcr.use_cassette(cassette_name):
        resp = httpx.get(url)
        assert resp.status_code == status_code
</code></pre>
<p>The four tests now get distinct cassette filenames:</p>
<ul><li><code>TestExampleDotCom.test_status_code</code></li><li><code>test_status_code[ok]</code></li><li><code>test_status_code[not_found]</code></li><li><code>test_status_code[server_error]</code></li></ul>
<h3>Explaining how to use cassettes with helpful errors</h3>
<p>Most of the time, you don’t need to worry about how vcrpy works. If you’re running an existing test, then vcrpy is just a fancy test mock that happens to be reading its data from a YAML file. You don’t need to worry about the implementation details.</p>
<p>However, if you’re writing a new test, you need to record new cassettes. This can involve some non-obvious setup, especially if you’ve never done it before.</p>
<p>Let’s revisit an earlier example:</p>
<pre><code>def test_flickr_api():
    with vcr.use_cassette(
        "fixtures/vcr_cassettes/test_flickr_api.yml",
        filter_query_parameters=[("api_key", "REDACTED_API_KEY")],
    ):
        api_key = os.environ.get("FLICKR_API_KEY", "API_KEY")

        resp = httpx.get(
            "https://api.flickr.com/services/rest/",
            params={
                "api_key": api_key,
                "method": "flickr.urls.lookupUser",
                "url": "https://www.flickr.com/photos/alexwlchan/",
            },
        )

        assert '&lt;user id="199258389@N04"&gt;' in resp.text
</code></pre>
<p>If you run this test without passing a <code>FLICKR_API_KEY</code> environment variable, it will call the real Flickr API with the placeholder API key. Unsurprisingly, the Flickr API will return an error response, and your test will fail:</p>
<pre><code>&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;rsp stat="fail"&gt;
  &lt;err code="100" msg="Invalid API Key (Key has invalid format)" /&gt;
&lt;/rsp&gt;
</code></pre>
<p>Worse still, vcrpy will record this error in the cassette file. Even if you work out you need to re-run the test with the env var, it will keep failing as it replays the recorded error.</p>
<p>Can we make this better? In this scenario, what I’d prefer is:</p>
<ol><li>The test fails if you don’t pass an env var</li><li>The error explains how to run the test properly</li><li>vcrpy doesn’t save a cassette file</li></ol>
<p>I worked out how to get this nicer error handling. vcrpy has a <a href="https://vcrpy.readthedocs.io/en/latest/advanced.html#custom-response-filtering"><code>before_record_response</code> hook</a>, that allows you to modify a response before writing it to the cassette file. You could use this to redact secrets from responses, but I realised you could also use it to validate the response – and if you throw an exception, it prevents vcrpy from writing a cassette.</p>
<p>Here’s a hook I wrote, which checks if a vcrpy response is a Flickr API error telling us that we passed an invalid API key, and throws an exception if so:</p>
<pre><code>def check_for_invalid_api_key(response):
    """
    Before we record a new response to a cassette, check if it's
    a Flickr API response telling us we're missing an API key -- that
    means we didn't set up the test correctly.

    If so, give the developer an instruction explaining what to do next.
    """
    try:
        body: bytes = response["body"]["string"]
    except KeyError:
        body = response["content"]

    is_error_response = (
        b'&lt;err code="100" msg="Invalid API Key (Key has invalid format)" /&gt;' in body
    )

    if is_error_response:
        raise RuntimeError(
            "You tried to record a new call to the Flickr API, \n"
            "but the tests don't have an API key.\n"
            "\n"
            "Pass an API key as an env var FLICKR_API_KEY=ae84…,\n"
            "and re-run the test.\n"
        )

    return response
</code></pre>
<p>We can call this hook in our <code>vcr.use_cassette</code> call:</p>
<pre><code>def test_flickr_api(cassette_name):
    with vcr.use_cassette(
        cassette_name,
        filter_query_parameters=[("api_key", "REDACTED_API_KEY")],
        decode_compressed_response=True,
        before_record_response=check_for_invalid_api_key,
    ):
        ...
</code></pre>
<p>Now, if you try to record a Flickr API call and don’t set the API key, you’ll get a helpful error explaining how to re-run the test correctly.</p>
<h3>Wrapping everything in a fixture for convenience</h3>
<p>This is all useful, but it’s a lot of boilerplate to add to every test. To make everything cleaner, I wrap vcrpy in a <a href="https://docs.pytest.org/en/6.2.x/fixture.html">pytest fixture</a> that returns an HTTP client I can use in my tests. This fixture allows me to configure vcrpy, and also do any other setup I need on the HTTP client – for example, adding authentication params or HTTP headers.</p>
<p>Here’s an example of such a fixture in a <a href="https://github.com/Flickr-Foundation/flickr-photos-api">library for using the Flickr API</a>:</p>
<pre><code>@pytest.fixture
def flickr_api(cassette_name):
    with vcr.use_cassette(
        cassette_name,
        filter_query_parameters=[("api_key", "REDACTED_API_KEY")],
        decode_compressed_response=True,
        before_record_response=check_for_invalid_api_key,
    ):
        client = httpx.Client(
            params={"api_key": os.environ.get("FLICKR_API_KEY", "API_KEY")},
            headers={
                # Close the connection as soon as the API returns a
                # response, to fix pytest warnings about unclosed sockets.
                "Connection": "Close",
            },
        )

        yield client
</code></pre>
<p>This makes individual tests much shorter and simpler:</p>
<pre><code>def test_flickr_api_without_boilerplate(flickr_api):
    resp = flickr_api.get(
        "https://api.flickr.com/services/rest/",
        params={
            "method": "flickr.urls.lookupUser",
            "url": "https://www.flickr.com/photos/alexwlchan/",
        },
    )

    assert '&lt;user id="199258389@N04"&gt;' in resp.text
</code></pre>
<p>When somebody reads this test, they don’t need to think about the authentication or or mocking; they can just see the API call that we’re making.</p>
<h2>When I don’t vcrpy</h2>
<p>Although vcrpy is useful, there are times when I prefer to test my HTTP code in a different way. Here are a few examples.</p>
<h3>If I’m testing error handling</h3>
<p>If I’m testing my error handling code – errors like timeouts, connection failures, or 5xx errors – it’s difficult to record a real response. Even if I could find a reliable error case today, it might be fixed tomorrow, which makes it difficult to reproduce if I ever need to re-record a cassette.</p>
<p>When I test error handling, I prefer a pure-Python mock where I can see exactly what error conditions I’m creating.</p>
<h3>If I’m fetching lots of binary files</h3>
<p>If my HTTP code is downloading images and video, storing them in a vcrpy cassette is pretty inefficient – they have to be encoded as base64. This makes the cassettes large and inefficient, the extra decoding step slows my test down, and the files are hard to inspect.</p>
<p>When I’m testing with binary files, I store them as standalone files in my <code>fixtures</code> directory (e.g. in <code>tests/fixtures/images</code>), and I write my own mock to read the file from disk. I can easily inspect or modify the fixture data, and I don’t have the overhead of using cassettes.</p>
<h3>If I’m testing future or hypothetical changes in an API</h3>
<p>A vcrpy cassette locks in the current behaviour. But suppose I know about an upcoming change, or I want to check my code would handle an unusual response – I can’t capture that in a vcrpy cassette, because the server isn’t returning responses like that (yet).</p>
<p>In those cases, I either construct a vcrpy cassette with the desired response by hand, or I use a code-based mock to return my unusual response.</p>
<h2>Summary</h2>
<p>Using vcrpy has allowed me to write more thorough tests, and it does all the hard work of intercepting HTTP calls and serialising them to disk. It gives me high-fidelity snapshots of HTTP responses, allowing me to mock HTTP calls and avoid network requests in my tests. This makes my tests faster, consistent, and reliable.</p>
<p>Here’s a quick reminder of what I do to run vcrpy in production:</p>
<ul><li>I use <code>filter_query_parameters</code> and <code>filter_headers</code> to keep secrets out of cassette files</li><li>I set <code>decode_compressed_response=True</code> to make cassettes more readable</li><li>I name cassettes after the test function they’re associated with</li><li>I throw errors if an HTTP client isn’t set up correctly when you try to record a cassette</li><li>I wrap everything in a fixture, to keep individual tests simpler</li></ul>
<p>If you make HTTP calls from your tests, I really recommend it: <a href="https://vcrpy.readthedocs.io/en/latest/">https://vcrpy.readthedocs.io/en/latest/</a></p>
