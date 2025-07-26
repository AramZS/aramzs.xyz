---
author: ache.one
cover_image: ''
date: '2025-07-26T16:25:47.452Z'
dateFolder: 2025/07/26
description: >-
  <h1 id="a-valid-html-zip-bomb"><a tabindex="0" class="anchor"
  href="/notes/html_zip_bomb">A valid HTML zip bomb</a></h1><p><img
  src="/notes/res/zip_bomb_file.svg" alt="Illustration d&#x27;une bombe zip"
  height="150" width="150"></p><a href="/notes/html_zip_bomb"></a> 
isBasedOn: 'https://ache.one/notes/html_zip_bomb'
link: 'https://ache.one/notes/html_zip_bomb'
slug: 2025-07-26-httpsacheonenoteshtmlzipbomb
tags:
  - ai
  - code
title: A valid HTML zip bomb
---
<figure><img alt="Illustration d'une bombe zip" src="https://ache.one/notes/res/zip_bomb_file.svg"/><figcaption>Illustration d'une bombe zip</figcaption></figure>
<p>Many sites have been affected by the aggressiveness of web crawlers designed to improve LLMs.<br/>
I’ve been relatively spared, but since the phenomenon started, I've been looking for a solution to implement.<br/>
Today, I present a zip bomb <a href="https://ache.one/bomb.html">gzip and brotli that is valid HTML</a>.</p>
<p>The initial problem is the aggressiveness of LLM web crawlers that don't respect <code>robots.txt</code>. The first idea that comes to mind is IP blocking. However, web crawlers have circumvented this restriction by using individual IPs via specialized botnets.</p>
<p>Another solution is therefore to exhaust the resources of the harvesters. With a zip bomb, we attempt to exhaust their RAM.<sup><a data-footnote-ref="" href="https://ache.one/notes/html_zip_bomb?utm_source=tldrnewsletter#user-content-fn-pro">1</a></sup></p>
<p>We’re exploiting the asymmetry of the resources needed to serve the zip bomb versus those needed to detect it. Naturally, I’m going to try to minimize the resources needed to distribute the zip bomb.</p>
<p>The most basic gzip bomb consists of zeros.</p>
<pre><code>$ dd if=/dev/zero bs=1M count=10240 | gzip -9 &gt; 10G.gzip
</code></pre>
<p>That's not bad; the theoretical ratio is 1032:1 (approximately 1030 in practice for a zip bomb), so our file weighs ~10MiB.</p>
<p>The problem is that web browsers parse the page on the fly as soon as possible and quickly detect that it's not a valid HTML page.</p>
<p>So, I set myself the challenge of creating a valid HTML page containing a zip bomb.</p>
<p>I had several ideas. First, since it's an HTML page, we start with the HTML5 doctype. Then we try to fit the 10 MB of identical characters.</p>
<p>I first attempted to use <a href="https://shkspr.mobi/blog/2025/05/decorative-text-within-html/">HTML classes, which can contain anything</a>, but quickly the HTML comment solution seemed most practical. So, I set up a small shell script (in <a href="https://fishshell.com/">fish</a>) to create an HTML file with a 10 MB 'H' comment.</p>
<pre><code>#!/bin/fish

# Base HTML
echo -n '&lt;!DOCTYPE html&gt;&lt;html lang=en&gt;&lt;head&gt;&lt;meta charset=utf-8&gt;&lt;title&gt;Projet: Valid HTML bomb&lt;/title&gt;&lt;meta name=fediverse:creator content=@ache@mastodon.xyz&gt;&lt;link rel=canonical href=https://ache.one/bomb.html&gt;&lt;!--'

# Create a file filled with H
echo -n (string repeat --count 258 'H') &gt;/tmp/H_258

# Lots of H
for i in (seq 507)
    # Concat H_258 with itself  times
    cat (yes /tmp/H_258 | head --lines=81925)
end

cat (yes /tmp/H_258 | head --lines=81924)

# End of HTML comment and body tag
echo -n "--&gt;&lt;body&gt;&lt;p&gt;This is a HTML valid bomb, cf. https://ache.one/articles/html_zip_bomb&lt;/p&gt;&lt;/body&gt;"
</code></pre>
<p>Then, we gzip all that:</p>
<pre><code>$ fish zip_bomb.fish | gzip -9 &gt; bomb.html.gz
$ du -sb bomb.html.gz
10180	bomb.html.gz
</code></pre>
<p>We have our 1:1030 ratio, that’s perfect.</p>
<p>I use Nginx; the idea is to serve the pre-compressed file. Ideally, we don't even want the 10 GB file on the server.</p>
<p>To do that, we use the <code>ngx_http_gzip_static_module</code> <sup><a data-footnote-ref="" href="https://ache.one/notes/html_zip_bomb?utm_source=tldrnewsletter#user-content-fn-gzip_static_nginx">2</a></sup>.</p>
<pre><code>location = /bomb.html {
  gzip on; # Normally this should be the gzip module on the fly. 🤷
  gzip_static on;
  gzip_proxied expired no-cache no-store private auth;
  gunzip off; # Definitely don't decompress the gzip!

  brotli_static on;  # My site is available in brotli too, so why not.
}
</code></pre>
<p>Unfortunately, Nginx returns a 404 if the <code>bomb.html</code> file doesn't exist, so I created a small, simple file that announces that it’s a gzip bomb.</p>
<pre><code>$ curl https://ache.one/bomb.html
You don't support gzip encoding. Add the HTTP header "accept-encoding: gzip".
</code></pre>
<p>I verify that Nginx is serving the file correctly:</p>
<pre><code>$ curl -H "accept-encoding: gzip,br" -I -- https://ache.one/bomb.html | grep content
content-type: text/html; charset=utf-8
content-length: 8298
content-encoding: br
$ curl -H "accept-encoding: gzip" -I -- https://ache.one/bomb.html | grep content
content-type: text/html; charset=utf-8
content-length: 10420650
content-encoding: gzip
</code></pre>
<p>Okay, the size is right. Now we absolutely must make sure that we don’t exceed the budget of a legitimate web crawler by forbidding it in robots.txt. By placing it at the root, I know that my robots.txt already forbids it, but otherwise, we should find this:</p>
<pre><code>User-agent: *
Disallow: /bomb.html
</code></pre>
<p>Firefox struggles a lot and ends up crashing cleanly with an <code>NS_ERROR_OUT_OF_MEMORY</code> error, visible only in the developer tools. If I put the body tag before the malicious comment, I would certainly have a correctly displayed page.</p>
<p>Chrome is much faster to crash! It offers a happy screen signaling that an error occurred via <code>SIGKILL</code>.</p>
<p>In both cases, we notice that the page is partially loaded; however, the title is correct. Therefore, we are certain that a Selenium-type web crawler will crash on this HTML file. Fortunately, there appears to be no security vulnerability to exploit.</p>
<p>The HTML comment trick is certainly not the most elegant. I’m sure there are plenty of ideas to fit packs of 258 identical characters<sup><a data-footnote-ref="" href="https://ache.one/notes/html_zip_bomb?utm_source=tldrnewsletter#user-content-fn-max_paquet">3</a></sup>. However, here it seems to work so well that I haven’t taken the time to explore further. The interest of having a more varied HTML zip bomb would be to ensure that the HTML parser doesn’s optimize the reading of certain parts.</p>
<p>By the way, I allowed myself to create a brotli version as well. Since my site is available in brotli and the zip bomb is even more efficient in brotli, there’s no reason not to do it.</p>
