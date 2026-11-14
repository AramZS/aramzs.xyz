---
author: Victor Ayomipo
cover_image: >-
  https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/stop-treating-css-container-queries-traditional-media-queries.jpg
date: '2026-11-13T20:32:35.577Z'
dateFolder: 2026/11/13
description: >-
  Despite broad browser support, container queries remain surprisingly underused
  and frequently misunderstood. Let’s look at how they differ from media
  queries, when to reach for each, and how container queries help reusable
  components respond naturally to the contexts in which they appear. - CSS -
  Tools - Techniques
isBasedOn: >-
  https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/
link: >-
  https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/
slug: >-
  2026-11-13-httpswwwsmashingmagazinecom202609stop-treating-css-container-queries-traditional-media-queries
tags:
  - code
title: Stop Treating CSS Container Queries Like Traditional Media Queries
---
<p>Despite broad browser support, container queries remain surprisingly underused and frequently misunderstood. Let’s look at how they differ from media queries, when to reach for each, and how container queries help reusable components respond naturally to the contexts in which they appear.</p>
<p>To be completely honest with you, I missed the news when CSS Container Queries first shipped. And when I finally heard about it, my very first thought was, <em>“Why exactly do I need this when media queries already exist?”</em></p>
<p>I’m not proud of that reaction, knowing what I know now, but it was comforting to know that I wasn’t alone. In fact, there are legions of us out there.</p>
<p>What baffles me is that container queries aren’t a new feature, as it currently sits at around <a href="https://caniuse.com/css-container-queries">94% browser support</a>. And yet, very few people are actually using it. According to the <a href="https://2025.stateofcss.com/en-US/features/">State of CSS</a> survey, 86% of developers are aware of container queries, but only 41.4% actually use them. Surveys can be biased and not completely representative of our entire field, but this one is certainly the best indicator we’ve got.</p>
<p><a href="http://youtu.be/4IBXIFe2CKA?si=2g3869tmp0yLOYz_&amp;t=297">Kevin Powell also talked about this</a> at SmashingConf Amsterdam 2026: <strong>Container Queries adoption has been terrible.</strong> And that is so strange to me, knowing that the ability for components to adapt to the size of their outer container <a href="https://css-tricks.com/2019-css-wishlist/">has been at the top of so many CSS wishlists</a> over the years.</p>
<p>I’m not particularly interested in how many people are using container queries as much as in <em>how</em> they are using them. I can’t account for everyone, but from what I’ve seen — including in my own early attempts — many of us are using them <em>wrong</em>.</p>
<p>The bottom line is that incorrect use comes down to the same impression I had when learning about them: <strong>they absolutely look just like media queries at first glance</strong>. And since they look similar, it’s easy to assume they serve similar purposes and work the same way.</p>
<p>They don’t.</p>
<p><strong>Note</strong>: I should state up front that what I’m focusing on in this article is using container <em>size</em> queries, i.e., a responsive design technique for responding to the size of a particular container. There are also container <em>style</em> queries that respond to a container’s computed styles (and are experimental at the time of this writing). You can catch up on those in <a href="https://www.smashingmagazine.com/2024/06/what-are-css-container-style-queries-good-for/">Juan Diego’s piece here on Smashing Magazine</a> where he examines their possible use cases.</p>
<h2>Media Queries Look Outward <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#media-queries-look-outward">#</a></h2>
<p>The viewport is a proxy. It always has been. Media queries are what gave us the illusion that screen width alone is responsible for how responsive apps adapt to their environment.</p>
<p>Ask yourself this: When you write <code>@media</code>, what are you asking the browser?</p>
<pre><code>@media (min-width: 1024px) {
  .card {
    display: flex;
  }
</code></pre>
<p>Copy</p>
<p>I, like most developers, am asking the browser: <em>How wide is the screen right now?</em> That’s it.</p>
<p>Media queries answer that beautifully, but what happens when this <code>.card</code> component is placed in a grid cell that’s <code>300px</code> wide on a <code>1920px</code> desktop screen?</p>
<p>The media query doesn’t care; it does its job. The viewport is still <code>1920px</code>, so <code>min-width: 1024px</code> fires and the matched query styles are applied, even though the card only has <code>300px</code> of space to work with. Eventually, everything in the card deforms, overflows, or cramps up.</p>
<blockquote>“Media queries are dumb. Not dumb in terms of the concept, but dumb in that they don’t know very much. In fact, most people assume that they know more than they do.”<br/><br/>— <a href="https://css-tricks.com/smart-layouts-with-container-queries/#:~:text=Because%20of%20how,than%20they%20do.">Kevin Powell</a></blockquote>
<p>It’s common to think of responsive design purely as a system for updating complete page layouts, like going from two columns on a large screen to a single column on a small screen.</p>
<h2>Container Queries Look Inward <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#container-queries-look-inward">#</a></h2>
<p>Container queries are smarter than that. They make responsive layouts more reliant on what’s happening <strong>inside</strong> a component rather than on the outer context that has no insight into a component’s contents. It is more like: <em>“How much space is available for me in this specific spot, right now?”</em></p>
<p>Here is the same card code example we looked at in the last section, but with a container query:</p>
<pre><code>.card-wrapper {
  container-name: card;
  container-type: inline-size;
}

@container card (min-width: 450px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
</code></pre>
<p>Copy</p>
<p>This changes everything. The card isn’t influenced by the viewport; its only concern is whether the <code>.card</code> component’s parent wrapper has at least <code>450px</code> of inline (i.e., horizontal in a left-to-right writing mode) space. If that condition is true, the component goes horizontal; if not, it goes to its default <code>block</code> display.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/smashingmag/embed/RNpoLNX?height=480&amp;theme-id=light&amp;slug-hash=RNpoLNX&amp;user=smashingmag&amp;default-tab=result">View content ↗ </a></p><figcaption>See the Pen <a href="https://codepen.io/smashingmag/pen/01a0a73d-6f39-709f-8dae-037f6b588852">Viewport vs Container [forked]</a> by <a href="https://codepen.io/vayospot">Vayo</a>.</figcaption></figure>
<h2>“Macro” Layout Vs. “Micro” Layouts <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#macro-layout-vs-micro-layouts">#</a></h2>
<p>A very interesting way to distinguish <code>@media</code> and <code>@container</code> queries is the <strong>layout type</strong>.</p>
<p>Media queries are for the “macro” layout; they look outward. Stuff like page structure, the header that spans the window, footers, main grid layout, system preferences (<code>prefers-color-scheme</code>), device capabilities (touch screens). You know, anything that is majorly true to the entire page structure.</p>
<p>Container queries, I’d say, are for “micro” layouts, i.e., most things that live inside the “macro” layout. We use them when any content needs to responsively fit whatever space it is allocated. Components that come to mind are things like cards, widgets, forms, navigation, and so on.</p>
<p>In other words, think <strong>“page layout” vs. “component layout”</strong>.</p>
<p>An element shouldn’t magically become “tablet-sized” just because the width exceeds an abstract width threshold like <code>768px</code>. Instead, it should switch layout when it has enough space to do so, whether that happens on a mobile viewport or inside a desktop sidebar.</p>
<p>In case you’re still not convinced, did you know there are over <a href="https://viewports.fyi/#:~:text=we%20conducted%20a%20little%20casual%20experiment%20to%20answer%20%E2%80%9Chow%20fragmented%20are%20viewport%20sizes%3F%E2%80%9D.%20We%20gathered%20over%20120%2C000%20datapoints%20with%20over%202%2C300%20unique%20viewport%20sizes.">2,300 unique viewport sizes on the modern web</a>? Do you think it is possible to account for all of them?</p>
<blockquote><p><a href="https://twitter.com/share?text=%0aI%e2%80%99m%20not%20hating%20on%20media%20queries.%20It%e2%80%99s%20that%20in%20this%20era%20of%20responsiveness%20and%20component%20re-use,%20layout%20logic%20is%20closer%20to%20the%20container%20than%20the%20viewport.%20When%20we%20think%20in%20terms%20of%20containers%20and%20components,%20we%e2%80%99re%20effectively%20relying%20on%20the%20content%20to%20determine%20layout,%20not%20the%20viewport.%0a&amp;url=https://smashingmagazine.com%2f2026%2f09%2fstop-treating-css-container-queries-traditional-media-queries%2f">I’m not hating on media queries. It’s that in this era of responsiveness and component re-use, layout logic is closer to the container than the viewport. When we think in terms of containers and components, we’re effectively relying on the content to determine layout, not the viewport.</a></p>“</blockquote>
<p>This is how it should be.</p>
<h2>Example: Fluid Typography Inside A Component <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#example-fluid-typography-inside-a-component">#</a></h2>
<p>Responsive typography is a good example of something many of us have relied on media queries for. The fact that media queries come with their own CSS units — e.g., <code>vw</code>, <code>vh</code>, and so on — that are relative to the viewport size makes media queries look really good for adjusting font size based on the user’s screen size.</p>
<pre><code>.card-title {
  font-size: clamp(100%, 1rem + 2vw, 24px);
}
</code></pre>
<p>Copy</p>
<p>This works until that same component is moved into a different context, like a sidebar, where the viewport is completely irrelevant. Now, because we tied the responsiveness to the wrong reference point, the scaled typography can get too big or too small.</p>
<p>Container queries come with <a href="https://www.w3.org/TR/css-contain-3/#container-lengths">their very own units</a> — <code>cqi</code>, <code>cqw</code>, <code>cqb</code>, among others — and we can take responsive components further by coupling those units with the CSS <code>clamp()</code> function, using it for <a href="https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/">fluid typography</a> that scales with the component rather than the viewport:</p>
<pre><code>
.card-title {
  font-size: clamp(1rem, .5rem + 3cqi, 2rem);
}
</code></pre>
<p>Copy</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/smashingmag/embed/rayWGVd?height=480&amp;theme-id=light&amp;slug-hash=rayWGVd&amp;user=smashingmag&amp;default-tab=result">View content ↗ </a></p><figcaption>See the Pen <a href="https://codepen.io/smashingmag/pen/01a0a73f-1a44-750c-8b40-9b0ab774d981">Fluid Typography [forked]</a> by <a href="https://codepen.io/vayospot">Vayo</a>.</figcaption></figure>
<p>With this in place, the entire code is self-contained to that element’s specific container.</p>
<h2>Example: Flexbox Wrap Detection <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#example-flexbox-wrap-detection">#</a></h2>
<p>Interestingly, container queries can, in a way, detect the state of a component’s internal layout. It’s not bulletproof, but it is also something media queries simply cannot do because they only observe the external browser window and are structurally blind to internal layout events like when, for example, flex items wrap onto a new line. Let’s poke at that.</p>
<p>Flexbox is superb at wrapping content (<code>flex-wrap: wrap</code>), allowing flex items to automatically wrap to new lines when the flex container runs out of space to fit them in a single row. But CSS by itself can’t tell when that wrap happens. There isn’t something like a <code>:wrapped</code> pseudo-class or a media query like <code>@media (flex-wrapped: true)</code> that would get us there.</p>
<p>Media queries only observe the browser window, as they can’t see internal changes. That is pretty much what flex wrapping is: a width state change on the item itself.</p>
<p>For example, if you have a horizontal menu that is lined up with flexbox and you want the items to restyle themselves only when wrapped, you’d be in JavaScript territory, using <code>ResizeObserver</code> to get that information. However, when we nest container queries inside flex items, we can come up with a workaround to get what we need without JavaScript, <a href="https://www.youtube.com/watch?v=9XKWnvpdSlU">thanks to this technique I learned from Kevin Powell</a>. The core idea is to allow a flex item to <code>flex-grow: 1</code> when we query the container’s inline size.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/smashingmag/embed/rayWGVd?height=480&amp;theme-id=light&amp;slug-hash=rayWGVd&amp;user=smashingmag&amp;default-tab=result">View content ↗ </a></p><figcaption>See the Pen <a href="https://codepen.io/smashingmag/pen/01a0a73f-1a44-750c-8b40-9b0ab774d981">Fluid Typography [forked]</a> by <a href="https://codepen.io/vayospot">Vayo</a>.</figcaption></figure>
<figure><a href="https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg"><img alt="Normal and wrapped states of two responsive items." sizes="100vw" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg 2000w"/></a><figcaption>(<a href="https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/1-normal-state-vs-wrapped-state.jpg">Large preview</a>)</figcaption></figure>
<p>The logic works like this:</p>
<ol><li>When there’s enough room, both items (<code>.flex-item</code>) sit side-by-side, each exactly half the parent container’s width.</li><li>When there is limited space, the second item wraps to the next line.</li><li>Because <code>flex-grow</code> is active on each item, the wrapped items stretch to fill most of the parent’s width.</li><li>If the item is a container itself, it detects the sudden width expansion and fires.</li></ol>
<pre><code>/* The flex parent */
.flex-layout {
  display: flex;
  flex-wrap: wrap;
}

/* Register a flex item as a container */
.flex-item {
  container-type: inline-size;
  flex: 1 1 390px; /* Grow to fill space, wrap at 390px */
}

/* Default Card Styles (narrow / side-by-side) */
.card {
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
}

/* Once there's enough room for a full row */
@container (min-width: 600px) {
  .card {
    flex-direction: row;
    align-items: center;
    background: #e2f0d9;
  }
}
</code></pre>
<p>Copy</p>
<p>This works. As the parent size shrinks and the cards wrap to two lines, the card item expands, the container query fires, and applies the necessary styles.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/smashingmag/embed/ByWQwLz?height=480&amp;theme-id=light&amp;slug-hash=ByWQwLz&amp;user=smashingmag&amp;default-tab=result">View content ↗ </a></p><figcaption>See the Pen <a href="https://codepen.io/smashingmag/pen/01a0a752-150a-754e-a77a-07fe1b046658">Flex Wrap Detection Using Container Queries [forked]</a> by <a href="https://codepen.io/vayospot">Vayo</a>.</figcaption></figure>
<h2>Container Queries Do Have Side Effects <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#container-queries-do-have-side-effects">#</a></h2>
<p>Container queries, like all things, come with some side effects or caveats you will want to watch for before reaching for them.</p>
<h3>1. A Container Requires An Extra Wrapper <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#1-a-container-requires-an-extra-wrapper">#</a></h3>
<p>Container queries need something similar to a parent-child relationship to function as expected. Let’s say we have this markup:</p>
<pre><code>&lt;div class="card"&gt;
  &lt;div class="card-content"&gt;...&lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p>Copy</p>
<p>We can’t actually query the <code>.card</code> component to adjust the <code>.card-content</code>, like this:</p>
<pre><code>/* DOES NOT WORK */
.card {
  container-name: card;
  container-type: inline-size;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
  }
}
</code></pre>
<p>Copy</p>
<p>This doesn’t work because a container cannot query itself. In that last example, we’re querying a <code>card</code> container and then attempting to adjust that container’s display based on its size. It’s an infinite loop.</p>
<p>Instead, we need an additional wrapper that makes the <code>.card</code> a descendant of the container:</p>
<pre><code>&lt;div class="cards"&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-content"&gt;...&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p>Copy</p>
<p>From there, we can query the <code>.cards</code> container and adjust the <code>.card</code> layout accordingly:</p>
<pre><code>.cards {
  container-name: cards;
  container-type: inline-size;
}

@container cards (min-width: 400px) {
  .card {
    display: flex;
  }
}
</code></pre>
<p>Copy</p>
<p>In media queries, this doesn’t matter as <code>@media</code> does not care which element you style inside the block; its only concern is the viewport, which is always available. So you can just slap a condition on any element and call it a day.</p>
<h3>2. Querying A Container’s <code>size</code> Could Collapse Your Layout <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#2-querying-a-container-s-size-could-collapse-your-layout">#</a></h3>
<p>This happens when querying the container’s <code>size</code> (i.e., its block, or vertical, size) instead of its <code>inline-size</code>:</p>
<pre><code>/* Collapses to 0px even if it has content inside */
.hero-banner {
  container-type: size;
}
</code></pre>
<p>Copy</p>
<p>Why? Because the browser calculates the container’s dimensions without looking at its children. If we don’t give the <code>.hero-banner</code> an explicit <code>height</code> (or <code>min-height</code> or <code>aspect-ratio</code>), the browser sets a height of <code>0px</code>.</p>
<p>For that reason, it’s often better to query a container by its <code>inline-size</code> instead. That is, unless you genuinely need to query the container’s block size.</p>
<p>Media queries aren’t affected by this, as they treat height the same way they treat <code>@media (min-height: ...)</code> does, i.e., ask the viewport and move on.</p>
<h3>3. Queries Cannot Accept Custom Properties <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#3-queries-cannot-accept-custom-properties">#</a></h3>
<p>Another container query limitation: we can’t query against a custom property value:</p>
<pre><code>:root {
  --breakpoint-lg: 1600px;
}

/* DOES NOT WORK */
@container (min-width: var(--breakpoint-lg)) {
  /* ... */
}
</code></pre>
<p>Copy</p>
<p>This is because custom properties depend on values that cascade down the DOM tree. There’s the possibility that a container query that relies on a custom property can change that same custom property. And it can quickly get complicated:</p>
<pre><code>:root {
  --breakpoint-lg: 1600px;
}

/* DOES NOT WORK */
@container cards (min-width: var(--breakpoint-lg)) {
  .card {
    --breakpoint-lg: 1000px;
  }
}
</code></pre>
<p>Copy</p>
<h2>When To Reach For Media And Container Queries <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#when-to-reach-for-media-and-container-queries">#</a></h2>
<p>I don’t think any project should wholesale use <code>@container</code> instead of <code>@media</code>. Media queries still play an important role in responsive layouts. It’s about understanding the separation of concerns.</p>
<p>I tend to reach for container queries when a component is used in more than one layout context. For example, a <code>.card</code> element could live in a full-width grid or a narrower sidebar. If that’s the case, then we’ll want the component’s content to determine when it adjusts rather than a media query that looks at the outer viewport.</p>
<p>Similarly, I reach for media queries when a component solely exists at the page level. This would be something like a main navigation that always sits at the top of the page. It is directly influenced by the viewport’s size, meaning that the viewport is a reliable reference for when the navigation needs to adjust. Again, it’s all about “macro” layout versus “micro” layouts.</p>
<p>Here’s a diagram for how I reason about which type of query to use:</p>
<figure><a href="https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg"><img alt="Flowchart for choosing between media and container queries" sizes="100vw" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg 2000w"/></a><figcaption>(<a href="https://files.smashing.media/articles/stop-treating-css-container-queries-traditional-media-queries/2-reusable-component.jpg">Large preview</a>)</figcaption></figure>
<h2>Conclusion <a href="https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/#conclusion">#</a></h2>
<p>At the end of the day, the core reason why container queries look incredibly similar to media queries is simply familiarity. They’re not exactly “new”, but they are way less understood and adopted than media queries. But media queries have plenty of their own limitations; otherwise, we wouldn’t need container queries to fill those gaps.</p>
<p>What we have is a more effective feature for detecting when a specific component’s context changes and a means for adjusting styles based on its content, as it should be when that component can exist in multiple contexts.</p>
