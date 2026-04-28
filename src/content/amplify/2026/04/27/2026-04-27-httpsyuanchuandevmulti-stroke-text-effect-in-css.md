---
author: yuanchuan
cover_image: ''
date: '2026-04-28T03:10:16.360Z'
dateFolder: 2026/04/27
description: |-
  I used to see that retro multi-stroke text effect quite often and
      tried to replicate it using the CSS text-stroke property,
      but the results never quite matched.
      Because text-stroke accepts a single value, stacking elements was the only workaround I could think of, though it didn't seem to work.
isBasedOn: 'https://yuanchuan.dev/multi-stroke-text-effect-in-css'
link: 'https://yuanchuan.dev/multi-stroke-text-effect-in-css'
slug: 2026-04-27-httpsyuanchuandevmulti-stroke-text-effect-in-css
tags:
  - code
  - design
title: Multi-stroke text effect in CSS
---
<p>I used to see that retro multi-stroke text effect quite often and tried to replicate it using the CSS <code>text-stroke</code> property, but the results never quite matched. Because <code>text-stroke</code> accepts a single value, stacking elements was the only workaround I could think of, though it didn't seem to work.</p>
<p>One evening late last year, I was eager to give it another shot after seeing the text effect again in the book <a href="https://archive.org/details/graphicjapanfrom0000avel">Graphic Japan : from woodblock and zen to manga and kawaii</a>.</p>
<figure><img alt="pattern from book Graphic Japan : from woodblock and zen to manga and kawaii" src="https://yuanchuan.dev/assets/images/post/multiple-text-stroke/from-book.webp"/><figcaption>pattern from book Graphic Japan : from woodblock and zen to manga and kawaii</figcaption></figure>
<p>I kept stacking several elements and accidentally varied the <code>text-stroke-width</code> for each layer. To my suprise, the result was getting closer this time.</p>
<figure><pre><code data-lang="css">--c: #cc0d55;
--n: @i(-1);

@grid: 36x1 / 240px;
@content: '✱';

position: absolute;
inset: 0;
font: 100px/0 sans-serif;
color: var(--c);
z-index: @I(-@i);

-webkit-text-stroke-color: @pn(--c, #f4e1e8);
-webkit-text-stroke-width: $em(.08n+.02(1-(-1)^n));</code></pre></figure>
<h2>How it works</h2>
<p>For different values of the <code>text-stroke-width</code>, browsers will automatically draw outlines of the charater, The larger you set the stroke width, the thicker the outline will get, while still maintain its original shape.</p>
<p>The next step is to use different colors and put them in order.</p>
<p>The interesting part is how the browsers outlining the character shapes differently. FireFox offers more smoother rendering than in Chrome and Safari.</p>
<figure><img alt="" src="https://yuanchuan.dev/assets/images/post/multiple-text-stroke/chrome.webp"/><figcaption>Chrome/Safari </figcaption></figure>
<figure><img alt="" src="https://yuanchuan.dev/assets/images/post/multiple-text-stroke/firefox.webp"/><figcaption>Firefox </figcaption></figure>
<p>Another interesting part is when there are more text put inline, the character shapes will be merged.</p>
<figure><pre><code data-lang="css">/* ... */
@content: '秋收冬藏';</code></pre></figure>
<h2>Trying different fonts</h2>
<p>The final result really depends on the font you choose. To help experimenting with different fonts more quickly, I added the <code>@google-font</code> function for faster font loading.</p>
<figure><pre><code data-lang="css">font-family: @google-font(Matemasie);
@content: 'b';</code></pre></figure>
<figure><pre><code data-lang="css">font-family: @google-font(Tangerine);
@content: 'Love';</code></pre></figure>
<figure><pre><code data-lang="css">font-family: @google-font('Cherry Bomb One');
@content: '+';</code></pre></figure>
<p>Unfortunately, the performance is as bad as CSS filters, especially when the font-size is getting bigger, you may have noticed some flicking above. It's fine for experiments like this, or for generating images with css-doodle, but it's not well-suited for production usage.</p>
<h2>More examples</h2>
<p>Here are two more examples to play around with different colors and characters, generated with css-doodle, just for fun.</p>
<figure><img alt="" src="https://yuanchuan.dev/assets/images/post/multiple-text-stroke/poster-1.webp"/></figure>
<figure><img alt="" src="https://yuanchuan.dev/assets/images/post/multiple-text-stroke/poster-2.webp"/></figure>
<p>CodePen link for the first one: <a href="https://codepen.io/yuanchuan/pen/ogzarGo">https://codepen.io/yuanchuan/pen/ogzarGo</a></p>
