---
author: overreacted.io
cover_image: 'https://overreacted.io/progressive-json/opengraph-image?5b0b970dfd19bb8c'
date: '2026-02-16T05:22:57.511Z'
dateFolder: 2026/02/16
description: Why streaming isn't enough.
isBasedOn: 'https://overreacted.io/progressive-json/'
link: 'https://overreacted.io/progressive-json/'
slug: 2026-02-16-httpsoverreactedioprogressive-json
tags:
  - code
  - tech
title: Progressive JSON
---
<div><div><p>Do you know about Progressive JPEGs? Here’s a <a href="https://www.liquidweb.com/blog/what-is-a-progressive-jpeg/" target="_blank">nice explanation</a> of what a Progressive JPEG is. The idea is that instead of loading the image top to bottom, the image instead is fuzzy at first and then progressively becomes more crisp.</p>
<p>What if we apply the same idea to transferring JSON?</p>
<p>Suppose you have a JSON tree with some data:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>'</span><span>Welcome to my blog</span><span>'</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>{</span></span>
<span data-line=""><span>    content: </span><span>'</span><span>This is my article</span><span>'</span><span>,</span></span>
<span data-line=""><span>    comments: </span><span>[</span></span>
<span data-line=""><span>      '</span><span>First comment</span><span>'</span><span>,</span></span>
<span data-line=""><span>      '</span><span>Second comment</span><span>'</span><span>,</span></span>
<span data-line=""><span>      // ...</span></span>
<span data-line=""><span>    ]</span></span>
<span data-line=""><span>  },</span></span>
<span data-line=""><span>  footer: </span><span>'</span><span>Hope you like it</span><span>'</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>Now imagine you want to transfer it over the wire. Because the format is JSON, you’re not going to have a valid object tree until the last byte loads. You have to wait for the <em>entire</em> thing to load, then call <code>JSON.parse</code>, and then process it.</p>
<p>The client can’t do <em>anything</em> with JSON until the server sends the <em>last</em> byte. If a part of the JSON was slow to generate on the server (e.g. loading <code>comments</code> took a slow database trip), <strong>the client can’t <em>start any</em> work until the server <em>finishes all</em> the work.</strong></p>
<p>Would you call that good engineering? And yet it’s the status quo—that’s how 99.9999%<sup>*</sup> of apps send and process JSON. Do we dare to improve on that?</p>
<p><small>* I made it up</small></p>
<hr/>
<p>We can try to improve this by implementing a <em>streaming</em> JSON parser. A streaming JSON parser would be able to produce an object tree from an incomplete input:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>'</span><span>Welcome to my blog</span><span>'</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>{</span></span>
<span data-line=""><span>    content: </span><span>'</span><span>This is my article</span><span>'</span><span>,</span></span>
<span data-line=""><span>    comments: </span><span>[</span></span>
<span data-line=""><span>      '</span><span>First comment</span><span>'</span><span>,</span></span>
<span data-line=""><span>      '</span><span>Second comment</span><span>'</span></span></code></pre></figure>
<p>If you ask for the result at this point, a streaming parser would hand you this:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>'</span><span>Welcome to my blog</span><span>'</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>{</span></span>
<span data-line=""><span>    content: </span><span>'</span><span>This is my article</span><span>'</span><span>,</span></span>
<span data-line=""><span>    comments: </span><span>[</span></span>
<span data-line=""><span>      '</span><span>First comment</span><span>'</span><span>,</span></span>
<span data-line=""><span>      '</span><span>Second comment</span><span>'</span></span>
<span data-line=""><span>      // (The rest of the comments are missing)</span></span>
<span data-line=""><span>    ]</span></span>
<span data-line=""><span>  }</span></span>
<span data-line=""><span>  // (The footer property is missing)</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>However, this isn’t too great either.</p>
<p>One downside of this approach is that the objects are kind of malformed. For example, the top-level object was supposed to have three properties (<code>header</code>, <code>post</code>, and <code>footer</code>), but the <code>footer</code> is missing because it hasn’t appeared in the stream yet. The <code>post</code> was supposed to have three <code>comments</code>, but you <em>can’t actually tell</em> whether more <code>comments</code> are coming or if this was the last one.</p>
<p>In a way, this is inherent to streaming—didn’t we <em>want</em> to get incomplete data?—but <strong>this makes it very difficult to actually <em>use</em> this data on the client.</strong> None of the types “match up” due to missing fields. We don’t know what’s complete and what’s not. That’s why streaming JSON isn’t popular aside from niche use cases. It’s just too hard to actually take advantage of it in the application logic which generally assumes the types are correct, “ready” means “complete”, and so on.</p>
<p>In the analogy with JPEG, this naïve approach to streaming matches the default “top-down” loading mechanism. The picture you see is crisp but you only see the top 10%. So despite the high fidelity, you don’t actually see <em>what’s</em> on the picture.</p>
<p>Curiously, this is also how streaming <em>HTML itself</em> works by default. If you load an HTML page on a slow connection, it will be streamed in the document order:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>&lt;</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>header</span><span>&gt;</span><span>Welcome to my blog</span><span>&lt;/</span><span>header</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>p</span><span>&gt;</span><span>This is my article</span><span>&lt;/</span><span>p</span><span>&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>ul</span><span> class=</span><span>"</span><span>comments</span><span>"</span><span>&gt;</span></span>
<span data-line=""><span>          &lt;</span><span>li</span><span>&gt;</span><span>First comment</span><span>&lt;/</span><span>li</span><span>&gt;</span></span>
<span data-line=""><span>          &lt;</span><span>li</span><span>&gt;</span><span>Second comment</span><span>&lt;/</span><span>li</span><span>&gt;</span></span></code></pre></figure>
<p>This has some upsides—the browser is able to display the page partially—but it has the same issues. The cutoff point is arbitrary and can be visually jarring or even mess up the page layout. It’s unclear if more content is coming. Whatever’s below—like the footer—is cut off, even if it <em>was</em> ready on the server and <em>could</em> have been sent earlier. When we stream data <em>in order</em>, <strong>one slow part delays <em>everything</em>.</strong></p>
<p>Let’s repeat that: when we stream things in order they appear, a <em>single</em> slow part delays <em>everything</em> that comes after it. Can you think of some way to fix this?</p>
<hr/>
<p>There is another way to approach streaming.</p>
<p>So far we’ve been sending things <em>depth-first</em>. We start with the top-level object’s properties, we go into that object’s <code>post</code> property, then we go into <em>that</em> object’s <code>comments</code> property, and so on. If something is slow, everything else gets held up.</p>
<p>However, we could also send data <em>breadth-first</em>.</p>
<p>Suppose we send the top-level object like this:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$2</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>$3</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>Here, <code>"$1"</code>, <code>"$2"</code>, <code>"$3"</code> refer to pieces of information that <em>have not been sent yet</em>. These are placeholders that can progressively be filled in later in the stream.</p>
<p>For example, suppose the server sends a few more rows of data to the stream:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$2</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>$3</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-highlighted-line="" data-line=""><span>/*$1*/</span></span>
<span data-highlighted-line="" data-line=""><span>"</span><span>Welcome to my blog</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>/*$3*/</span></span>
<span data-highlighted-line="" data-line=""><span>"</span><span>Hope you like it</span><span>"</span></span></code></pre></figure>
<p>Notice that we’re not obligated to send the rows in any particular order. In the above example, we’ve just sent both <code>$1</code> and <code>$3</code>—but the <code>$2</code> row is still pending!</p>
<p>If the client tried to reconstruct the tree at this point, it could look like this:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>new</span><span> Promise</span><span>(</span><span>/* ... not yet resolved ... */</span><span>),</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>We’ll represent the parts that haven’t loaded yet as Promises.</p>
<p>Then suppose the server could stream in a few more rows:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$2</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>$3</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""><span>/*$1*/</span></span>
<span data-line=""><span>"</span><span>Welcome to my blog</span><span>"</span></span>
<span data-line=""><span>/*$3*/</span></span>
<span data-line=""><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>/*$2*/</span></span>
<span data-highlighted-line="" data-line=""><span>{</span></span>
<span data-highlighted-line="" data-line=""><span>  content: </span><span>"</span><span>$4</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>  comments: </span><span>"</span><span>$5</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>}</span></span>
<span data-highlighted-line="" data-line=""><span>/*$4*/</span></span>
<span data-highlighted-line="" data-line=""><span>"</span><span>This is my article</span><span>"</span></span></code></pre></figure>
<p>This would “fill in” some of the missing pieces from the client’s perspective:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>  post: </span><span>{</span></span>
<span data-highlighted-line="" data-line=""><span>    content: </span><span>"</span><span>This is my article</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>    comments: </span><span>new</span><span> Promise</span><span>(</span><span>/* ... not yet resolved ... */</span><span>),</span></span>
<span data-highlighted-line="" data-line=""><span>  },</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>The Promise for the <code>post</code> would now resolve to a object. However, we still don’t know what’s inside the <code>comments</code>, so now <em>those</em> are represented as a Promise.</p>
<p>Finally, the comments could stream in:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$2</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>$3</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""><span>/*$1*/</span></span>
<span data-line=""><span>"</span><span>Welcome to my blog</span><span>"</span></span>
<span data-line=""><span>/*$3*/</span></span>
<span data-line=""><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>/*$2*/</span></span>
<span data-line=""><span>{</span></span>
<span data-line=""><span>  content: </span><span>"</span><span>$4</span><span>"</span><span>,</span></span>
<span data-line=""><span>  comments: </span><span>"</span><span>$5</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""><span>/*$4*/</span></span>
<span data-line=""><span>"</span><span>This is my article</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>/*$5*/</span></span>
<span data-highlighted-line="" data-line=""><span>[</span><span>"</span><span>$6</span><span>"</span><span>,</span><span> "</span><span>$7</span><span>"</span><span>,</span><span> "</span><span>$8</span><span>"</span><span>]</span></span>
<span data-highlighted-line="" data-line=""><span>/*$6*/</span></span>
<span data-highlighted-line="" data-line=""><span>"</span><span>This is the first comment</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>/*$7*/</span></span>
<span data-highlighted-line="" data-line=""><span>"</span><span>This is the second comment</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>/*$8*/</span></span>
<span data-highlighted-line="" data-line=""><span>"</span><span>This is the third comment</span><span>"</span></span></code></pre></figure>
<p>Now, from the client’s perspective, the entire tree would be complete:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>{</span></span>
<span data-line=""><span>    content: </span><span>"</span><span>This is my article</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>    comments: </span><span>[</span></span>
<span data-highlighted-line="" data-line=""><span>      "</span><span>This is the first comment</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>      "</span><span>This is the second comment</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>      "</span><span>This is the third comment</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>    ]</span></span>
<span data-line=""><span>  },</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>By sending data breadth-first in chunks, we gained the ability to progressively handle it on the client. As long as the client can deal with some parts being “not ready” (represented as Promises) and process the rest, this is an improvement!</p>
<hr/>
<p>Now that we have the basic mechanism, we’ll adjust it for more efficient output. Let’s have another look at the entire streaming sequence from the last example:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$2</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>$3</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""><span>/*$1*/</span></span>
<span data-line=""><span>"</span><span>Welcome to my blog</span><span>"</span></span>
<span data-line=""><span>/*$3*/</span></span>
<span data-line=""><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>/*$2*/</span></span>
<span data-line=""><span>{</span></span>
<span data-line=""><span>  content: </span><span>"</span><span>$4</span><span>"</span><span>,</span></span>
<span data-line=""><span>  comments: </span><span>"</span><span>$5</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""><span>/*$4*/</span></span>
<span data-line=""><span>"</span><span>This is my article</span><span>"</span></span>
<span data-line=""><span>/*$5*/</span></span>
<span data-line=""><span>[</span><span>"</span><span>$6</span><span>"</span><span>,</span><span> "</span><span>$7</span><span>"</span><span>,</span><span> "</span><span>$8</span><span>"</span><span>]</span></span>
<span data-line=""><span>/*$6*/</span></span>
<span data-line=""><span>"</span><span>This is the first comment</span><span>"</span></span>
<span data-line=""><span>/*$7*/</span></span>
<span data-line=""><span>"</span><span>This is the second comment</span><span>"</span></span>
<span data-line=""><span>/*$8*/</span></span>
<span data-line=""><span>"</span><span>This is the third comment</span><span>"</span></span></code></pre></figure>
<p>We may have gone a <em>little</em> too far with streaming here. Unless generating some parts actually <em>is</em> slow, we don’t gain anything from sending them as separate rows.</p>
<p>Suppose that we have two different slow operations: loading a post and loading a post’s comments. In that case, it would make sense to send three chunks in total.</p>
<p>First, we would send the outer shell:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>On the client, this would immediately become:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>new</span><span> Promise</span><span>(</span><span>/* ... not yet resolved ... */</span><span>),</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>Then we’d send the <code>post</code> data (but without the <code>comments</code>):</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-highlighted-line="" data-line=""><span>/*$1*/</span></span>
<span data-highlighted-line="" data-line=""><span>{</span></span>
<span data-highlighted-line="" data-line=""><span>  content: </span><span>"</span><span>This is my article</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>  comments: </span><span>"</span><span>$2</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>}</span></span></code></pre></figure>
<p>From the client’s perspective:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>  post: </span><span>{</span></span>
<span data-highlighted-line="" data-line=""><span>    content: </span><span>"</span><span>This is my article</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>    comments: </span><span>new</span><span> Promise</span><span>(</span><span>/* ... not yet resolved ... */</span><span>),</span></span>
<span data-highlighted-line="" data-line=""><span>  },</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>Finally, we’d send the comments in a single chunk:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>"</span><span>$1</span><span>"</span><span>,</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""><span>/*$1*/</span></span>
<span data-line=""><span>{</span></span>
<span data-line=""><span>  content: </span><span>"</span><span>This is my article</span><span>"</span><span>,</span></span>
<span data-line=""><span>  comments: </span><span>"</span><span>$2</span><span>"</span></span>
<span data-line=""><span>}</span></span>
<span data-highlighted-line="" data-line=""><span>/*$2*/</span></span>
<span data-highlighted-line="" data-line=""><span>[</span></span>
<span data-highlighted-line="" data-line=""><span>  "</span><span>This is the first comment</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>  "</span><span>This is the second comment</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>  "</span><span>This is the third comment</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>]</span></span></code></pre></figure>
<p>That would give us the whole tree on the client:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>{</span></span>
<span data-line=""><span>  header: </span><span>"</span><span>Welcome to my blog</span><span>"</span><span>,</span></span>
<span data-line=""><span>  post: </span><span>{</span></span>
<span data-line=""><span>    content: </span><span>"</span><span>This is my article</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>    comments: </span><span>[</span></span>
<span data-highlighted-line="" data-line=""><span>      "</span><span>This is the first comment</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>      "</span><span>This is the second comment</span><span>"</span><span>,</span></span>
<span data-highlighted-line="" data-line=""><span>      "</span><span>This is the third comment</span><span>"</span></span>
<span data-highlighted-line="" data-line=""><span>    ]</span></span>
<span data-line=""><span>  },</span></span>
<span data-line=""><span>  footer: </span><span>"</span><span>Hope you like it</span><span>"</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>This is more compact and achieves the same purpose.</p>
<p>In general, this format gives us leeway to decide when to send things as a single chunks vs. multiple chunks. As long as the client is resilient to chunks arriving out-of-order, the server can pick different batching and chunking heuristics.</p>
<hr/>
<p>One interesting consequence of this approach is that it <em>also</em> gives us a natural way to reduce repetition in the output stream. If we’re serializing an object we’ve already seen before, we can just outline it as a separate row, and reuse it.</p>
<p>For example, suppose we have an object tree like this:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>const </span><span>userInfo</span><span> =</span><span> {</span><span> name</span><span>:</span><span> '</span><span>Dan</span><span>'</span><span> };</span></span>
<span data-line=""> </span>
<span data-line=""><span>[</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>header</span><span>'</span><span>,</span><span> user</span><span>:</span><span> userInfo </span><span>},</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>sidebar</span><span>'</span><span>,</span><span> user</span><span>:</span><span> userInfo </span><span>},</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>footer</span><span>'</span><span>,</span><span> user</span><span>:</span><span> userInfo </span><span>}</span></span>
<span data-line=""><span>]</span></span></code></pre></figure>
<p>If we were to serialize it to plain JSON, we’d end up repeating <code>{ name: 'Dan' }</code>:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>[</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>header</span><span>'</span><span>,</span><span> user</span><span>:</span><span> {</span><span> name</span><span>:</span><span> '</span><span>Dan</span><span>'</span><span> }</span><span> },</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>sidebar</span><span>'</span><span>,</span><span> user</span><span>:</span><span> {</span><span> name</span><span>:</span><span> '</span><span>Dan</span><span>'</span><span> }</span><span> },</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>footer</span><span>'</span><span>,</span><span> user</span><span>:</span><span> {</span><span> name</span><span>:</span><span> '</span><span>Dan</span><span>'</span><span> }</span><span> }</span></span>
<span data-line=""><span>]</span></span></code></pre></figure>
<p>However, if we’re serving JSON progressively, we could choose to outline it:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>[</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>header</span><span>'</span><span>,</span><span> user</span><span>:</span><span> "</span><span>$1</span><span>"</span><span> },</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>sidebar</span><span>'</span><span>,</span><span> user</span><span>:</span><span> "</span><span>$1</span><span>"</span><span> },</span></span>
<span data-line=""><span>  {</span><span> type</span><span>:</span><span> '</span><span>footer</span><span>'</span><span>,</span><span> user</span><span>:</span><span> "</span><span>$1</span><span>"</span><span> }</span></span>
<span data-line=""><span>]</span></span>
<span data-highlighted-line="" data-line=""><span>/* $1 */</span></span>
<span data-highlighted-line="" data-line=""><span>{</span><span> name: </span><span>"</span><span>Dan</span><span>"</span><span> }</span></span></code></pre></figure>
<p>We could also pursue a more balanced strategy—for example, to inline objects by default (for compactness) until we see some object being used two or more times, at which point we’ll emit it separately and dedupe the rest of them in the stream.</p>
<p>This also means that, unlike with plain JSON, we can support serializing cyclic objects. A cyclic object just has a property that points to its own stream “row”.</p>
<hr/>
<p>The approach described above is essentially how React Server Components work.</p>
<p>Suppose you write a page with React Server Components:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>function</span><span> Page</span><span>()</span><span> {</span></span>
<span data-line=""><span>  return</span><span> (</span></span>
<span data-line=""><span>    &lt;</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>header</span><span>&gt;</span><span>Welcome to my blog</span><span>&lt;/</span><span>header</span><span>&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>Post</span><span> /&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>footer</span><span>&gt;</span><span>Hope you like it</span><span>&lt;/</span><span>footer</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;/</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;/</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>  );</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""> </span>
<span data-line=""><span>async</span><span> function</span><span> Post</span><span>()</span><span> {</span></span>
<span data-line=""><span>  const </span><span>post</span><span> =</span><span> await </span><span>loadPost</span><span>();</span></span>
<span data-line=""><span>  return</span><span> (</span></span>
<span data-line=""><span>    &lt;</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>p</span><span>&gt;{</span><span>post</span><span>.</span><span>text</span><span>}&lt;/</span><span>p</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>Comments</span><span> /&gt;</span></span>
<span data-line=""><span>    &lt;/</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>  );</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""> </span>
<span data-line=""><span>async</span><span> function</span><span> Comments</span><span>()</span><span> {</span></span>
<span data-line=""><span>  const </span><span>comments</span><span> =</span><span> await </span><span>loadComments</span><span>();</span></span>
<span data-line=""><span>  return</span><span> &lt;</span><span>ul</span><span>&gt;{</span><span>comments</span><span>.</span><span>map</span><span>(</span><span>c </span><span>=&gt;</span><span> &lt;</span><span>li</span><span> key={</span><span>c</span><span>.</span><span>id</span><span>}&gt;{</span><span>c</span><span>.</span><span>text</span><span>}&lt;/</span><span>li</span><span>&gt;)}&lt;/</span><span>ul</span><span>&gt;;</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>React will serve the output of the <code>Page</code> as a progressive JSON stream. On the client, it will be reconstructed as a progressively loaded React tree.</p>
<p>Initially, the React tree on the client will appear like this:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>&lt;</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>header</span><span>&gt;</span><span>Welcome to my blog</span><span>&lt;/</span><span>header</span><span>&gt;</span></span>
<span data-line=""><span>    {new</span><span> Promise</span><span>(</span><span>/* ... not resolved yet */</span><span>)}</span></span>
<span data-line=""><span>    &lt;</span><span>footer</span><span>&gt;</span><span>Hope you like it</span><span>&lt;/</span><span>footer</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;/</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>&lt;/</span><span>html</span><span>&gt;</span></span></code></pre></figure>
<p>Then, as <code>loadPost</code> resolves on the server, more will stream in:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>&lt;</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>header</span><span>&gt;</span><span>Welcome to my blog</span><span>&lt;/</span><span>header</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>    &lt;</span><span>article</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>      &lt;</span><span>p</span><span>&gt;</span><span>This is my post</span><span>&lt;/</span><span>p</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>      {new</span><span> Promise</span><span>(</span><span>/* ... not resolved yet */</span><span>)}</span></span>
<span data-highlighted-line="" data-line=""><span>    &lt;/</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>footer</span><span>&gt;</span><span>Hope you like it</span><span>&lt;/</span><span>footer</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;/</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>&lt;/</span><span>html</span><span>&gt;</span></span></code></pre></figure>
<p>Finally, when <code>loadComment</code> resolves on the server, the client will receive the rest:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-line=""><span>&lt;</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>header</span><span>&gt;</span><span>Welcome to my blog</span><span>&lt;/</span><span>header</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>p</span><span>&gt;</span><span>This is my post</span><span>&lt;/</span><span>p</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>      &lt;</span><span>ul</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>        &lt;</span><span>li</span><span> key=</span><span>"</span><span>1</span><span>"</span><span>&gt;</span><span>This is the first comment</span><span>&lt;/</span><span>li</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>        &lt;</span><span>li</span><span> key=</span><span>"</span><span>2</span><span>"</span><span>&gt;</span><span>This is the second comment</span><span>&lt;/</span><span>li</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>        &lt;</span><span>li</span><span> key=</span><span>"</span><span>3</span><span>"</span><span>&gt;</span><span>This is the third comment</span><span>&lt;/</span><span>li</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>      &lt;/</span><span>ul</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;/</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;</span><span>footer</span><span>&gt;</span><span>Hope you like it</span><span>&lt;/</span><span>footer</span><span>&gt;</span></span>
<span data-line=""><span>  &lt;/</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>&lt;/</span><span>html</span><span>&gt;</span></span></code></pre></figure>
<p>However, here’s the kicker.</p>
<p>You don’t actually <em>want</em> the page to jump arbitrarily as the data streams in. For example, maybe you never want to show the page <em>without</em> the post’s content.</p>
<p><strong>This is why React doesn’t display “holes” for pending Promises. Instead, it displays the closest declarative loading state, indicated by <a href="https://react.dev/reference/react/Suspense" target="_blank"><code>&lt;Suspense&gt;</code></a>.</strong></p>
<p>In the above example, there are no <code>&lt;Suspense&gt;</code> boundaries in the tree. This means that, although React will receive the <em>data</em> as a stream, it will not actually display a “jumping” page to the user. It will wait for the <em>entire</em> page to be ready.</p>
<p>However, you can <em>opt into</em> a progressively revealed loading state by wrapping a part of the UI tree into <code>&lt;Suspense&gt;</code>. This doesn’t change how the data is sent (it’s still as “streaming” as possible), but it changes <em>when</em> React reveals it to the user.</p>
<p>For example:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight" tabindex="0"><code data-language="js" data-theme="Overnight"><span data-highlighted-line="" data-line=""><span>import</span><span> {</span><span> Suspense </span><span>}</span><span> from</span><span> '</span><span>react</span><span>'</span><span>;</span></span>
<span data-line=""> </span>
<span data-line=""><span>function</span><span> Page</span><span>()</span><span> {</span></span>
<span data-line=""><span>  return</span><span> (</span></span>
<span data-line=""><span>    &lt;</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>header</span><span>&gt;</span><span>Welcome to my blog</span><span>&lt;/</span><span>header</span><span>&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>Post</span><span> /&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>footer</span><span>&gt;</span><span>Hope you like it</span><span>&lt;/</span><span>footer</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;/</span><span>body</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;/</span><span>html</span><span>&gt;</span></span>
<span data-line=""><span>  );</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""> </span>
<span data-line=""><span>async</span><span> function</span><span> Post</span><span>()</span><span> {</span></span>
<span data-line=""><span>  const </span><span>post</span><span> =</span><span> await </span><span>loadPost</span><span>();</span></span>
<span data-line=""><span>  return</span><span> (</span></span>
<span data-line=""><span>    &lt;</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>      &lt;</span><span>p</span><span>&gt;{</span><span>post</span><span>.</span><span>text</span><span>}&lt;/</span><span>p</span><span>&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>      &lt;</span><span>Suspense</span><span> fallback={&lt;</span><span>CommentsGlimmer</span><span> /&gt;}&gt;</span></span>
<span data-line=""><span>        &lt;</span><span>Comments</span><span> /&gt;</span></span>
<span data-highlighted-line="" data-line=""><span>      &lt;/</span><span>Suspense</span><span>&gt;</span></span>
<span data-line=""><span>    &lt;/</span><span>article</span><span>&gt;</span></span>
<span data-line=""><span>  );</span></span>
<span data-line=""><span>}</span></span>
<span data-line=""> </span>
<span data-line=""><span>async</span><span> function</span><span> Comments</span><span>()</span><span> {</span></span>
<span data-line=""><span>  const </span><span>comments</span><span> =</span><span> await </span><span>loadComments</span><span>();</span></span>
<span data-line=""><span>  return</span><span> &lt;</span><span>ul</span><span>&gt;{</span><span>comments</span><span>.</span><span>map</span><span>(</span><span>c </span><span>=&gt;</span><span> &lt;</span><span>li</span><span> key={</span><span>c</span><span>.</span><span>id</span><span>}&gt;{</span><span>c</span><span>.</span><span>text</span><span>}&lt;/</span><span>li</span><span>&gt;)}&lt;/</span><span>ul</span><span>&gt;;</span></span>
<span data-line=""><span>}</span></span></code></pre></figure>
<p>Now the user will perceive the loading sequence in two stages:</p>
<ul>
<li>First, the post “pops in” together with the header, the footer, and a glimmer for comments. The header and the footer never appear on their own.</li>
<li>Then, the comments “pop in” on their own.</li>
</ul>
<p><strong>In other words, the stages in which the UI gets revealed are decoupled from how the data arrives. The data is streamed as it becomes available, but we only want to <em>reveal</em> things to the user according to intentionally designed loading states.</strong></p>
<p>In a way, you can see those Promises in the React tree acting almost like a <code>throw</code>, while <code>&lt;Suspense&gt;</code> acts almost like a <code>catch</code>. The data arrives as fast as it can in whatever order the server is ready to send it, but React takes care to present the loading sequence gracefully and let the developer control the visual reveal.</p>
<p>Note that what I described so far has nothing to do with “SSR” or HTML. I was describing a general mechanism for streaming a UI tree represented as JSON. You can <em>turn</em> that JSON tree into progressively revealed HTML (and <a href="https://gal.hagever.com/posts/out-of-order-streaming-from-scratch" target="_blank">React can do that</a>), but the idea is broader than HTML and applies to SPA-like navigations as well.</p>
<hr/>
<p>In this post, I’ve sketched out one of the core innovations of RSC. Instead of sending data as a single big chunk, it sends the props for your component tree outside-in. As a result, as soon as there’s an intentional loading state to display, React can do that while the rest of the data for your page is being streamed in.</p>
<p>I’d like to challenge more tools to adopt progressive streaming of data. If you have a situation where you can’t <em>start</em> doing something on the client until the server <em>stops</em> doing something, that’s a clear example of where streaming can help. If a <em>single slow thing</em> can slow down <em>everything after it,</em> that’s another warning sign.</p>
<p>Like I showed in this post, streaming <em>alone</em> is not enough—you also need a programming model that can <em>take advantage</em> of streaming and gracefully handle incomplete information. React solves that with intentional <code>&lt;Suspense&gt;</code> loading states. If you know systems that solve this differently, I’d love to hear about them!</p><a href="https://ko-fi.com/gaearon" target="_blank"><span></span>Pay what you like</a><hr/><p><a href="https://bsky.app/search?q=https%3A%2F%2Foverreacted.io%2Fprogressive-json%2F" target="_blank">Discuss on Bluesky</a>  ·  <a href="https://github.com/gaearon/overreacted.io/edit/main/public/progressive-json/index.md" target="_blank">Edit on GitHub</a></p></div></div>
