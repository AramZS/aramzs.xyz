---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/cards/2026/movie-poster-grid.png'
date: '2026-01-20T18:21:24.735Z'
dateFolder: 2026/01/20
description: >-
  A step-by-step guide to a movie poster grid that uses CSS Grid, text-wrap
  balanced titles, and dynamic hover states.
isBasedOn: 'https://alexwlchan.net/2026/movie-poster-grid/'
link: 'https://alexwlchan.net/2026/movie-poster-grid/'
slug: 2026-01-20-httpsalexwlchannet2026movie-poster-grid
tags:
  - code
  - design
title: 'The Good, the Bad, and the Gutters'
---
<p>I’ve been organising my local movie collection recently, and converting it into <a href="https://alexwlchan.net/2024/static-websites/">a static site</a>. I want the homepage to be a scrolling grid of movie posters, where I can click on any poster and start watching the movie. Here’s a screenshot of the design:</p>
<p><a href="https://alexwlchan.net/images/2026/movie-poster-hero.png"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/movie-poster-hero_1x.png 750w,/images/2026/movie-poster-hero_2x.png" type="image/png"/><figure><img alt="A grid of portrait-sized posters for made-up movies. There are two rows of six posters, and each poster is the same height. The posters line up horiozntally, and below each poster is the title of the movie." src="https://alexwlchan.net/images/2026/movie-poster-hero_1x.png"/><figcaption><a href="https://alexwlchan.net/images/2026/movie-poster-hero.png">A grid of portrait-sized posters for made-up movies. There are two rows of six posters, and each poster is the same height. The posters line up horiozntally, and below each poster is the title of the movie.</a></figcaption></figure></picture></figure></a></p>
<p>This scrolling grid of posters is something I’d like to reuse for other media collections – books, comics, and TV shows.</p>
<p>I wrote an initial implementation with <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout">CSS grid layout</a>, but over time I found rough edges and bugs. I kept adding rules and properties to “fix” the layout, but these piecemeal changes introduced new bugs and conflicts, and eventually I no longer understood the page as a whole. This gradual degradation often happens when I write CSS, and when I no longer understand how the page works, it’s time to reset and start again.</p>
<p>To help me understand how this layout works, I’m going to step through it and explain how I built the new version of the page.</p>
<h2>Step 1: Write the unstyled HTML</h2>
<p>This is a list of movies, so I use an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul">unordered list <code>&lt;ul&gt;</code></a>. Each list item is pretty basic, with just an image and a title. I wrap them both in a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure"><code>&lt;figure&gt;</code> element</a> – I don’t think that’s strictly necessary, but it feels semantically correct to group the image and title together.</p>
<pre><code>&lt;ul id="movies"&gt;
  &lt;li&gt;
    &lt;a href="#"&gt;
      &lt;figure&gt;
        &lt;img src="apollo-13px.png"&gt;
        &lt;figcaption&gt;Apollo 13px&lt;/figcaption&gt;
      &lt;/figure&gt;
    &lt;/a&gt;
  &lt;/li&gt;
  &lt;li&gt;
    &lt;a href="#"&gt;
      &lt;figure&gt;
        &lt;img src="breakpoint-at-tiffanys.png"&gt;
        &lt;figcaption&gt;Breakpoint at Tiffany’s&lt;/figcaption&gt;
      &lt;/figure&gt;
    &lt;/a&gt;
  &lt;/li&gt;
  ...
&lt;/ul&gt;
</code></pre>
<p>I did wonder if this should be an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol">ordered list</a>, because the list is ordered alphabetically, but I decided against it because the numbering isn’t important.</p>
<p>Having a particular item be #1 is meaningful in a ranked list (the 100 best movies) or a sequence of steps (a cooking recipe), but there’s less significance to #1 in an alphabetical list. If I get a new movie that goes at the top of the list, it doesn’t matter that the previous #1 has moved to #2.</p>
<p>This is an unstyled HTML page, so it looks pretty rough:</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo1-markup.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo1-markup_1x.png 750w,/images/2026/mp-css-demo1-markup_2x.png" type="image/png"/><figure><img alt="A web page which is mostly dominated by a poster for ‘Apollo 13px’, with a bullet point vaguely visible on the left. The title of the movie is visible in small blue, underlined text below the image. The spacing looks weird." src="https://alexwlchan.net/images/2026/mp-css-demo1-markup_1x.png"/><figcaption><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo1-markup.html">A web page which is mostly dominated by a poster for ‘Apollo 13px’, with a bullet point vaguely visible on the left. The title of the movie is visible in small blue, underlined text below the image. The spacing looks weird.</a></figcaption></figure></picture></figure></a></p>
<h2>Step 2: Add a CSS grid layout</h2>
<p>Next, let’s get the items arranged in a grid. This is a textbook use case for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout">CSS grid layout</a>.</p>
<p>I start by resetting some default styles: removing the bullet point and whitespace from the list, and the whitespace around the figure.</p>
<pre><code>#movies {
  list-style-type: none;
  padding: 0;
  margin:  0;
  
  figure {
    margin: 0;
  }
}
</code></pre>
<p>Then I create a grid that creates columns which are 200px wide, as many columns as will fit on the screen. The column width was an arbitrary choice and caused some layout issues – I’ll explain how to choose this properly in the next step.</p>
<pre><code>#movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  column-gap: 1em;
  row-gap:    2em;
}
</code></pre>
<p>By default, browsers show images at their original size, which means they overlap each other. For now, clamp the width of the images to the columns, so they don’t overlap:</p>
<pre><code>#movies {
  img {
    width: 100%;
  }
}
</code></pre>
<p>With these styles, the grid fills up from the left and stops as soon as it runs out of room for a full 200px column. It looks a bit like an unfinished game of Tetris – there’s an awkward gap on the right-hand side of the window that makes the page feel off-balance.</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo2-grid-no-space-evenly.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo2-grid-no-space-evenly_1x.png 750w,/images/2026/mp-css-demo2-grid-no-space-evenly_2x.png" type="image/png"/><figure><img alt="A grid of movie posters on a white background, two rows of six posters. All the posters are pushed to the left of the screen, with a big white gap on the right-hand side." src="https://alexwlchan.net/images/2026/mp-css-demo2-grid-no-space-evenly_1x.png"/><figcaption><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo2-grid-no-space-evenly.html">A grid of movie posters on a white background, two rows of six posters. All the posters are pushed to the left of the screen, with a big white gap on the right-hand side.</a></figcaption></figure></picture></figure></a></p>
<p>We can space the columns more evenly by adding a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content"><code>justify-content</code> property</a> which tells the browser to create equal spacing between each of them, including on the left and right-hand side:</p>
<pre><code>#movies {
  justify-content: space-evenly;
}
</code></pre>
<p>With just ten CSS properties, the page looks a lot closer to the desired result:</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo2-grid.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo2-grid_1x.png 750w,/images/2026/mp-css-demo2-grid_2x.png" type="image/png"/><figure><img alt="A grid of movie posters on a white background, two rows of six posters. Below each poster is a blue link with the title of the movie. Every poster is the same width, but some are different heights." src="https://alexwlchan.net/images/2026/mp-css-demo2-grid_1x.png"/><figcaption><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo2-grid.html">A grid of movie posters on a white background, two rows of six posters. Below each poster is a blue link with the title of the movie. Every poster is the same width, but some are different heights.</a></figcaption></figure></picture></figure></a></p>
<p>After this step, what stands out here is the inconsistent heights, especially the text beneath the posters. The mismatched height of <em>The Empire Strikes Block</em> is obvious, but the posters for <em>The Devil Wears Padding</em> and <em>vh for Vendetta</em> are also slightly shorter than their neighbours. Let’s fix that next.</p>
<h2>Step 3: Choosing the correct column size</h2>
<p>Although movie posters are always portrait orientation, the aspect ratio can vary. Because my first grid fixes the width, some posters will be a different height to others.</p>
<p>I prefer to have the posters be fixed height and allow varied widths, so all the text is on the same level. Let’s replace the width rule on images:</p>
<pre><code>#movies {
  img {
    height: 300px;
  }
}
</code></pre>
<p>This causes an issue with my columns, because now some of the posters are wider than 200px, and overflow into their neighbour. I need to pick a column size which is wide enough to allow all of my posters at this fixed height. I can calculate the displayed width of a single poster:</p>
<p>display width = 300px ×  poster width poster height </p>
<p>Then I pick the largest display width in my collection, so even the widest poster has enough room to breathe without overlapping its neighbour.</p>
<p>In my case, the largest poster is 225px wide when it’s shown at 300px tall, so I change my column rule to match:</p>
<pre><code>#movies {
  grid-template-columns: repeat(auto-fill, 225px);
}
</code></pre>
<p>If I ever change the height of the posters or get a wider poster, I’ll need to adjust this widths. If I was adding movies too fast for that to be sustainable, I’d look at using something like <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit#cover"><code>object-fit: cover</code></a> to clip anything that was extra wide. I’ve skipped that here because I don’t need it, and I like seeing the whole poster.</p>
<p>If you have big columns or small devices, you need some extra CSS to make columns and images shrink when they’re wider than the device, but I can ignore that here. A 225px column is narrower than my iPhone, which is the smallest device I’ll use this for. (I did try writing that CSS, and I quickly got stuck. I’ll come back to it if it’s ever an issue, but I don’t need it today.)</p>
<p>Now the posters which are narrower than the column are flush left with the edge of the column, whereas I’d really like them to be centred inside the column. I cam fix this with one more rule:</p>
<pre><code>#movies {
  li {
    text-align: center;
  }
}
</code></pre>
<p>This is a more subtle transformation from the previous step – nothing’s radically different, but all the posters line up neatly in a way they didn’t before.</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo3-geometry.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo3-geometry_1x.png 750w,/images/2026/mp-css-demo3-geometry_2x.png" type="image/png"/><figure><img alt="A grid of movie posters on a white background, but now each poster is the same height and the text under each poster is centre-aligned." src="https://alexwlchan.net/images/2026/mp-css-demo3-geometry_1x.png"/><figcaption><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo3-geometry.html">A grid of movie posters on a white background, but now each poster is the same height and the text under each poster is centre-aligned.</a></figcaption></figure></picture></figure></a></p>
<p>Swapping fixed width for fixed height means there’s now an inconsistent amount of horizontal space between posters – but I find that less noticeable. You can’t get a fixed space in both directions unless all your posters have the same aspect ratio, which would mean clipping or stretching. I’d rather have the slightly inconsistent gaps.</p>
<p>The white background and blue underlined text are still giving “unstyled HTML page” vibes, so let’s tidy up the colours.</p>
<h2>Step 4: Invert the colours with a dark background</h2>
<p>The next set of rules change the page to white text on a dark background. I use a dark grey, so I can distinguish the posters which often use black:</p>
<pre><code>body {
  background: #222;
  font-family: -apple-system, sans-serif;
}

#movies {
  a {
    color: white;
    text-decoration: none;
  }
}
</code></pre>
<p>Let’s also make the text bigger, and add a bit of spacing between it and the image. And when the title and image are more spaced apart, let’s increase the row spacing even more, so it’s always clear which title goes with which poster:</p>
<pre><code>#movies {
  grid-row-gap: 3em;
  
  figcaption {
    font-size:  1.5em;
    margin-top: 0.4em;
  }
}
</code></pre>
<p>The movie title is a good opportunity to use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap"><code>text-wrap: balance</code></a>. This tells the browser to balance the length of each line, which can make the text look a bit nicer. You’ll get several lines of roughly the same length, rather than one or more long lines and a short line. For example, it changes <em>“The Empire Strikes // Block”</em> to the more balanced <em>“The Empire // Strikes Block”</em>.</p>
<pre><code>#movies {  
  figcaption {
    text-wrap: balance;
  }
}
</code></pre>
<p>Here’s what the page looks like now, which is pretty close to the final result:</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo4-cosmetic.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo4-cosmetic_1x.png 750w,/images/2026/mp-css-demo4-cosmetic_2x.png" type="image/png"/><figure><img alt="A grid of movie posters on a dark grey background, and now the text under each poster is larger and white." src="https://alexwlchan.net/images/2026/mp-css-demo4-cosmetic_1x.png"/><figcaption><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo4-cosmetic.html">A grid of movie posters on a dark grey background, and now the text under each poster is larger and white.</a></figcaption></figure></picture></figure></a></p>
<p>What’s left is a couple of dynamic elements – hover states for individual posters, and placeholders while images are loading.</p>
<h2>Step 5: Add a border/underline on hover</h2>
<p>As I’m mousing around the grid, I like to add a hover style that shows me which movie is currently selected – <a href="https://alexwlchan.net/2024/hover-states/">a coloured border</a> around the poster, and a text underline on the title.</p>
<p>First, I use my <a href="https://alexwlchan.net/2021/dominant-colours/">dominant_colours tool</a> to get a suitable tint colour for use with this background:</p>
<pre><code>$ dominant_colours gridiator.png --best-against-bg '#222'
▇ #ecd3ab
</code></pre>
<p>Then I add this to my markup as a CSS variable:</p>
<pre><code>&lt;ul id="movies"&gt;
  ...
  &lt;li style="--tint-colour: #ecd3ab"&gt;
    &lt;a href="#"&gt;
      &lt;figure&gt;
        &lt;img src="gridiator.png"&gt;
        &lt;figcaption&gt;Gridiator&lt;/figcaption&gt;
      &lt;/figure&gt;
    &lt;/a&gt;
  &lt;/li&gt;
  ...
&lt;/ul&gt;
</code></pre>
<p>Finally, I can add some hover styles that use this new variable:</p>
<pre><code>#movies {
  a:hover {
    figcaption {
      text-decoration-line: underline;
      text-decoration-thickness: 3px;
    }
  
    img {
      outline: 3px solid var(--tint-colour);
    }
  }
}
</code></pre>
<p>I’ve added the <code>text-decoration</code> styles directly on the <code>figcaption</code> rather than the <code>a</code>, because browsers are inconsistent about whether those properties are inherited from parent elements.</p>
<p>I used <code>outline</code> instead of <code>border</code> so the 3px width doesn’t move the image when the style is applied.</p>
<p>Here’s what the page looks like when I hover over <em>Breakpoint at Tiffany’s</em>:</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo5-hover-styles.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo5-hover-styles_1x.png 750w,/images/2026/mp-css-demo5-hover-styles_2x.png" type="image/png"/></picture></figure></a></p>
<p>We’re almost there!</p>
<h2>Step 6: Add placeholder colours</h2>
<p>As my movie collection grows, I want to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading">lazy load</a> my images so I don’t try to load them all immediately, especially posters that aren’t scrolled into view. But then if I scroll and I’m on a slow connection, it can take a few seconds for the image to load, and until then the page has a hole. I like having solid colour placeholders which get replaced by the image when it loads.</p>
<p>First I have to insert a wrapper <code>&lt;div&gt;</code> which I’m going to colour, and a CSS variable with the aspect ratio of the poster so I can size it correctly:</p>
<pre><code>&lt;ul id="movies"&gt;
  ...
  &lt;li style="--tint-colour: #ecd3ab; --aspect-ratio: 510 / 768"&gt;
    &lt;a href="#"&gt;
      &lt;figure&gt;
        &lt;div class="wrapper"&gt;
          &lt;img src="gridiator.png" loading="lazy"&gt;
        &lt;/div&gt;
        &lt;figcaption&gt;Gridiator&lt;/figcaption&gt;
      &lt;/figure&gt;
    &lt;/a&gt;
  &lt;/li&gt;
  ...
&lt;/ul&gt;
</code></pre>
<p>We can add a coloured background to this wrapper and make it the right size:</p>
<pre><code>#movies {
  img, .wrapper {
    height: 300px;
    aspect-ratio: var(--aspect-ratio);
  }
  
  .wrapper {
    background: var(--tint-colour);
  }
}
</code></pre>
<p>But a <code>&lt;div&gt;</code> is a <code>block</code> element by default, so it isn’t centred properly – it sticks to the left-hand side of the column, and doesn’t line up with the text. We could add <code>margin: 0 auto;</code> to move it to the middle, but that duplicates the <code>text-align: center;</code> property we wrote earlier. Instead, I prefer to make the wrapper an <code>inline-block</code>, so it follows the existing text alignment rule:</p>
<pre><code>#movies {
  .wrapper {
    display: inline-block;
  }
}
</code></pre>
<p>Here’s what the page looks like when some of the images have yet to load:</p>
<p><a href="https://alexwlchan.net/files/2026/movie-poster-css/demo6-placeholders.html"><figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2026/mp-css-demo6-placeholders_1x.png 750w,/images/2026/mp-css-demo6-placeholders_2x.png" type="image/png"/></picture></figure></a></p>
<p>And we’re done!</p>
<h2>The final page</h2>
<p>There’s a <a href="https://alexwlchan.net/files/2026/movie-poster-css/demo7-final.html">demo page</a> where you can try this design and see how it works in practice.</p>
<p>Here’s what the HTML markup looks like:</p>
<pre><code>&lt;ul id="movies"&gt;
  &lt;li style="--tint-colour: #dbdfde; --aspect-ratio: 510 / 768"&gt;
    &lt;a href="#"&gt;
      &lt;figure&gt;
        &lt;div class="wrapper"&gt;
          &lt;img src="apollo-13px.png" loading="lazy"&gt;
        &lt;/div&gt;
        &lt;figcaption&gt;Apollo 13px&lt;/figcaption&gt;
      &lt;/figure&gt;
    &lt;/a&gt;
  &lt;/li&gt;
  ...
&lt;/ul&gt;
</code></pre>
<p>and here’s the complete CSS:</p>
<pre><code>body {
  background: #222;
  font-family: -apple-system, sans-serif;
}

#movies {
  list-style-type: none;
  padding: 0;
  margin:  0;
  
  display: grid;
  grid-template-columns: repeat(auto-fill, 225px);
  column-gap: 1em;
  row-gap:    3em;

  justify-content: space-evenly;

  figure {
    margin: 0;
  }
  
  li {
    text-align: center;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  
  figcaption {
    font-size:  1.5em;
    margin-top: 0.4em;
    text-wrap: balance;
  }
  
  a:hover, a#tiffanys {
    figcaption {
      text-decoration-line: underline;
      text-decoration-thickness: 3px;
    }
    
    img {
      outline: 3px solid var(--tint-colour);
    }
  }
  
  img, .wrapper {
    height: 300px;
    aspect-ratio: var(--aspect-ratio);
  }

  .wrapper {
    background: var(--tint-colour);
    display: inline-block;
  }
}
</code></pre>
<p>I’m really happy with the result – not just the final page, but how well I understand it. CSS can be tricky to reason about, and writing this step-by-step guide has solidified my mental model.</p>
<p>I learnt a few new details while checking references, like the <code>outline</code> property for hover states, the way <code>text-decoration</code> isn’t meant to inherit, and the fact that <code>column-gap</code> and <code>row-gap</code> have replaced the older <code>grid-</code> prefixed versions.</p>
<p>This layout is working well enough for now, but more importantly, I’m confident I could tweak it if I want to make changes later.</p>
