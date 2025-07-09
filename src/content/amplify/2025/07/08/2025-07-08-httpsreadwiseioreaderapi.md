---
author: readwise.io
cover_image: >-
  https://readwise-assets.s3.amazonaws.com/static/images/readwisecard.058019f9f4b1.jpg
date: '2025-07-08T22:03:48.000Z'
dateFolder: 2025/07/08
description: >-
  The Reader API currently allows users to save new documents to Reader with
  plans to introduce more endpoints soon. To authenticate, users need to set a
  header with the key "Authorization" and their Readwise access token. For
  document creation, a POST request with specific parameters is made to the
  designated endpoint, including details like URL, HTML content, title, author,
  summary, and more. The API provides responses indicating successful document
  creation and includes usage examples in JavaScript, Python, and Bash, along
  with information on rate limiting.
isBasedOn: 'https://readwise.io/reader_api'
link: 'https://readwise.io/reader_api'
slug: 2025-07-08-httpsreadwiseioreaderapi
tags:
  - code
  - tech
title: Reader API
---
<p>The Reader API just supports saving new documents to Reader. We will add more endpoints in the near future. If you have any questions, please reach out :)</p>
<h2>Authentication</h2>
<p>Set a header with key "Authorization" and value: "Token XXX" where XXX is your Readwise access token. You (or your users) can get that from here: <a href="https://readwise.io/access_token">readwise.io/access_token</a></p>
<p>If you want to check that a token is valid, just make a GET request to <code>https://readwise.io/api/v2/auth/</code> with the above header. You should receive a <code>204</code> response.</p>
<h2>Document CREATE</h2>
<p><b>Request</b>: <code>POST</code> to <code>https://readwise.io/api/v3/save/</code></p>
<p><b>Parameters:</b> A JSON object with the following keys:</p>
<table> <tr> <th>Key</th> <th>Type</th> <th>Description</th> <th>Required</th> </tr> <tbody> <tr> <td>url</td> <td>string</td> <td>The document's unique URL. If you don't have one, you can provide a made up value such as <code>https://yourapp.com#document1</code></td> <td>yes</td> </tr> <tr> <td>html</td> <td>string</td> <td>The document's content, in valid html (see examples). If you don't provide this, we will try to scrape the URL you provided to fetch html from the open web.</td> <td>no</td> </tr> <tr> <td>should_clean_html</td> <td>boolean</td> <td>Only valid when <code>html</code> is provided. Pass <code>true</code> to have us automatically clean the html and parse the metadata (title/author) of the document for you. By default, this option is <code>false</code>.</td> <td>no</td> </tr> <tr> <td>title</td> <td>string</td> <td>The document's title, it will overwrite the original title of the document </td> <td>no</td> </tr> <tr> <td>author</td> <td>string</td> <td>The document's author, it will overwrite the original author (if found during the parsing step) </td> <td>no</td> </tr> <tr> <td>summary</td> <td>string</td> <td>Summary of the document</td> <td>no</td> </tr> <tr> <td>published_date</td> <td>date</td> <td>A datetime representing when the document was published in the ISO 8601 format; default timezone is UTC.<br/>Example: <code>"2020-07-14T20:11:24+00:00"</code></td> <td>no</td> </tr> <tr> <td>image_url</td> <td>string</td> <td>An image URL to use as cover image</td> <td>no</td> </tr> <tr> <td>location</td> <td>string</td> <td>One of: <code>new</code>, <code>later</code>, <code>archive</code> or <code>feed</code><br/>Default is <code>new</code>. The value represents the initial state of the document </td> <td>no</td> </tr> <tr> <td>saved_using</td> <td>string</td> <td>This value represents the source of the document</td> <td>no</td> </tr> <tr> <td>tags</td> <td>list</td> <td>A list of strings containing tags, example: <code>["tag1", "tag2"]</code></td> <td>no</td> </tr> </tbody> </table>
<p><b>Response:</b></p>
<ul> <li>Status code: <code>201</code> or <code>200</code> if document already exist</li> <li>Created document details:</li> </ul>
<p><b>Usage/Examples:</b></p>
<ul> <li>JavaScript</li> <pre><code>
$.ajax({
  url: 'https://readwise.io/api/v3/save/',
  type: 'POST',
  contentType: 'application/json',
  beforeSend: function (xhr) {
    xhr.setRequestHeader('Authorization', 'Token XXX');
    },
  data: JSON.stringify({
    "url": "https://example.com/article/",
    "html": "&lt;div&gt;&lt;h1&gt;This article is awesome&lt;/h1&gt;&lt;p&gt;content here!&lt;/p&gt;&lt;/div&gt;"
    "tags": ["tag1", "tag2"]
  }),
  success: function (result) {console.log(result)},
  error: function (error) {console.log(error)},
});
          </code></pre> <pre><code>
import requests
requests.post(
    url="https://readwise.io/api/v3/save/",
    headers={"Authorization": "Token XXX"},
    json={
        "url": "https://example.com/article/",
        # No html is provided, so the url will be scraped to get the document's content.
        "tags": ["tag3", "tag4"]
    }
)
                    </code></pre> <li>Bash</li> </ul>
<h2>Rate Limiting</h2>
<p>The default base rate is 20 requests per minute. You can check <code>Retry-After</code> header in the 429 response to get the number of seconds to wait for.</p>
