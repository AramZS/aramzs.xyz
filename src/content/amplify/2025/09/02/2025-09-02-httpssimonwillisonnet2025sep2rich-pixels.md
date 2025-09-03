---
author: Simon Willison
cover_image: 'https://static.simonwillison.net/static/2025/pixel-storehouse.jpg'
date: '2025-09-02T12:20:02.070Z'
dateFolder: 2025/09/02
description: >-
  Neat Python library by Darren Burns adding pixel image support to the Rich
  terminal library, using tricks to render an image using full or half-height
  colored blocks. Here's the key …
isBasedOn: 'https://simonwillison.net/2025/Sep/2/rich-pixels/'
link: 'https://simonwillison.net/2025/Sep/2/rich-pixels/'
slug: 2025-09-02-httpssimonwillisonnet2025sep2rich-pixels
tags:
  - code
title: Rich Pixels
---
<p><strong><a href="https://github.com/darrenburns/rich-pixels">Rich Pixels</a></strong>. Neat Python library by Darren Burns adding pixel image support to the Rich terminal library, using tricks to render an image using full or half-height colored blocks.</p>
<p>Here's <a href="https://github.com/darrenburns/rich-pixels/blob/a0745ebcc26b966d9dbac5875720364ee5c6a1d3/rich_pixels/_renderer.py#L123C25-L123C26">the key trick</a> - it renders Unicode ▄ (U+2584, "lower half block") characters after setting a foreground and background color for the two pixels it needs to display.</p>
<p>I got GPT-5 to <a href="https://chatgpt.com/share/68b6c443-2408-8006-8f4a-6862755cd1e4">vibe code up</a> a <code>show_image.py</code> terminal command which resizes the provided image to fit the width and height of the current terminal and displays it using Rich Pixels. That <a href="https://github.com/simonw/tools/blob/main/python/show_image.py">script is here</a>, you can run it with <code>uv</code> like this:</p>
<pre><code>uv run http://tools.simonwillison.net/python/show_image.py \
  image.jpg
</code></pre>
<p>Here's what I got when I ran it against my V&amp;A East Storehouse photo from <a href="https://simonwillison.net/2025/Aug/27/london-culture/">this post</a>:</p>
<figure><img alt="Terminal window. I ran that command and it spat out quite a pleasing and recognizable pixel art version of the photograph." src="https://static.simonwillison.net/static/2025/pixel-storehouse.jpg"/></figure>
