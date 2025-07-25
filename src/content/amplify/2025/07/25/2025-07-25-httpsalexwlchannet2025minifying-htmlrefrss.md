---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/profile_green_sq.jpg'
date: '2025-07-25T18:32:52.333Z'
dateFolder: 2025/07/25
description: I compare three different approaches to minifying HTML.
isBasedOn: 'https://alexwlchan.net/2025/minifying-html/?ref=rss'
link: 'https://alexwlchan.net/2025/minifying-html/?ref=rss'
slug: 2025-07-25-httpsalexwlchannet2025minifying-htmlrefrss
tags:
  - code
title: Minifying HTML on my Jekyll website
---
<p>I minify all the HTML on this website – removing unnecessary whitespace, tidying up attributes, optimising HTML entities, and so on. This makes each page smaller, and theoretically the website should be slightly faster.</p>
<p>I’m not going to pretend this step is justified by the numbers. My pages are already pretty small pre-minification, and it only reduces the average page size by about 4%. In June, minification probably saved less than MiB of bandwidth.</p>
<p>But I do it anyway. I minify HTML because I like tinkering with the website, and I enjoy finding ways to make it that little bit faster or more efficient. I recently changed the way I’m minifying HTML, and I thought this would be a good time to compare the three approaches I’ve used and share a few things I learned about HTML along the way.</p>
<p>I build this website using <a href="https://jekyllrb.com">Jekyll</a>, so I’ve looked for Jekyll or Ruby-based solutions.</p>
<p>This is a Jekyll layout that compresses HTML. It’s a single HTML file written in pure <a href="https://shopify.github.io/liquid/">Liquid</a> (the templating language used by Jekyll).</p>
<p>First you save the HTML file to <code>_layouts/compress.html</code>, then reference it in your highest-level layout. For example, in <code>_layouts/default.html</code> you might write:</p>

{% raw %}

<pre><code>---
layout: compress
---

&lt;html&gt;
{{ content }}
&lt;/html&gt;
</code></pre>
<p>Because it’s a single HTML file, it’s easy to install and doesn’t require any plugins. This is useful if you’re running in an environment where plugins are restricted or disallowed (which I think includes <a href="https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins">GitHub Pages</a>, although I’m not 100% sure).</p>
<p>The downside is that the single HTML file can be tricky to debug, it only minifies HTML (not CSS or JavaScript), and there’s no easy way to cache the output.</p>
<h2>Approach #2: The <a href="https://github.com/paolochiodi/htmlcompressor/">htmlcompressor gem</a>, by Paolo Chiodi</h2>
<p>The <a href="https://github.com/paolochiodi/htmlcompressor/">htmlcompressor gem</a> is a Ruby port of <a href="https://code.google.com/archive/p/htmlcompressor/">Google’s Java-based HtmlCompressor</a>. The README describes it as an “alpha version”, but in my usage it was very stable and it has a simple API.</p>
<p>I start by changing my <code>compress.html</code> layout to pass the page content to a <code>compress_html</code> filter:</p>
<pre><code>---
---

{{ content | compress_html }}
</code></pre>
<p>This filter is defined as <a href="https://jekyllrb.com/docs/plugins/filters/">a custom plugin</a>; I save the following code in <code>_plugins/compress_html.rb</code>:</p>
<pre><code>def run_compress_html(html)
  require 'htmlcompressor'

  options = {
    remove_intertag_spaces: true
  }
  compressor = HtmlCompressor::Compressor.new(options)
  compressor.compress(html)
end

module Jekyll
  module CompressHtmlFilter
    def compress_html(html)
      cache = Jekyll::Cache.new('CompressHtml')

      cache.getset(html) do
        run_compress_html(html)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CompressHtmlFilter)
</code></pre>
{% endraw %}
<p>I mostly stick with the default options; the only extra rule I enabled was to remove inter-tag spaces. Consider the following example:</p>
<pre><code>&lt;p&gt;hello world&lt;/p&gt; &lt;p&gt;my name is Alex&lt;/p&gt;
</code></pre>
<p>By default, htmlcompressor will leave the space between the closing <code>&lt;/p&gt;</code> and the opening <code>&lt;p&gt;</code> as-is. Enabling <code>remove_intertag_spaces</code> makes it a bit more aggressive, and it removes that space.</p>
<p>I’m using the <a href="https://alexwlchan.net/2024/jekyll-caching/">Jekyll cache</a> to save the results of the compression – most pages don’t change from build-to-build, and it’s faster to cache the results than recompress the HTML each time.</p>
<p>The gem seems abandoned – the last push to GitHub was in 2017.</p>
<h2>Approach #3: The <a href="https://github.com/wilsonzlin/minify-html">minify-html library</a>, by Wilson Lin</h2>
<p>This is a Rust-based HTML minifier, with bindings for a variety of languages, including Ruby, Python, and Node. It’s very fast, and even more aggressive than other minifiers.</p>
<p>I use it in a very similar way to <code>htmlcompressor</code>. I call the same <code>compress_html</code> filter in <code>_layouts/compress.html</code>, and then my <code>run_compress_html</code> in <code>_plugins/compress_html.rb</code> is a bit different:</p>
{% raw %}
<pre><code>def run_compress_html(html)
  require 'minify_html'

  options = {
    keep_html_and_head_opening_tags: true,
    keep_closing_tags: true,
    minify_css: true,
    minify_js: true
  }

  minify_html(html, options)
end
</code></pre>
{% endraw %}
<p>This is a much more aggressive minifier. For example, it turns out that the <code>&lt;html&gt;</code> and <code>&lt;head&gt;</code> elements are optional in an HTML5 document, so this minifier removes them if it can. I’ve disabled this behaviour, because I’m old-fashioned and I like my pages to have <code>&lt;html&gt;</code> and <code>&lt;head&gt;</code> tags.</p>
<p>This library also allows minifying inline CSS and JavaScript, which is a nice bonus. That has some rough edges though: there’s <a href="https://github.com/wilsonzlin/minify-html/issues/242">an open issue with JS minification</a>, and I had to tweak several of my if-else statements to work with the minifier. Activity on the GitHub repository is sporadic, so I don’t know if that will get fixed any time soon.</p>
<h2>Minify, but verify</h2>
<p>After I minify HTML, but before I publish the site, I run <a href="https://alexwlchan.net/2019/checking-jekyll-sites-with-htmlproofer/">HTML-Proofer to validate my HTML</a>.</p>
<p>I’m not sure this has ever caught an issue introduced by a minifer, but it gives me peace of mind that these tools aren’t mangling my HTML. (It has caught plenty of issues caused by my mistakes!)</p>
<h2>Comparing the three approaches</h2>
<p>There are two key metrics for HTML minifiers:</p>
<ul><li><p><strong>Speed:</strong> this is a dead heat. When I built the site with a warm cache, it takes about 2.5s whatever minifier I’m using. The <code>htmlcompressor</code> gem and <code>minify-html</code> library are much slower if I have a cold cache, but that’s only a few extra seconds and it’s rare for me to build the site that way.</p></li><li><p><strong>File size:</strong> the Ruby and Rust-based minifiers achieve slightly better minification, because they’re more aggressive in what they trim. For example, they’re smarter about removing unnecessary spaces and quoting around attribute values.</p> <p>Here’s the average page size after minification:</p> <table><tbody><tr><th>Approach</th><th>Average HTML page size</th></tr><tr><td>Without minification</td><td>14.9 KiB</td></tr><tr><td>Compress HTML in Jekyll 3.2.0</td><td>14.3 KiB</td></tr><tr><td>htmlcompressor 0.4.0</td><td>14.0 KiB</td></tr><tr><td>minify-html 0.16.4</td><td>13.5 KiB</td></tr></tbody></table></li></ul>
<p>I’m currently using minify-html. This is partly because it gets slightly smaller page sizes, and partly because it has bindings in other languages. This website is my only major project that uses Ruby, and so I’m always keen to find things I can share in my other non-Ruby projects. If minify-html works for me (and it is so far), I can imagine using it elsewhere.</p>
