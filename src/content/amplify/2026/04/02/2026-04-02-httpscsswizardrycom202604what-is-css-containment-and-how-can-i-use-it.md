---
author: Harry Roberts
cover_image: null
date: '2026-04-02T15:42:03.953Z'
dateFolder: 2026/04/02
description: >-
  CSS containment lets you isolate layout and paint work to self-contained
  ‘islands’. Here’s what each contain value does and how to use it safely.
isBasedOn: 'https://csswizardry.com/2026/04/what-is-css-containment-and-how-can-i-use-it/'
link: 'https://csswizardry.com/2026/04/what-is-css-containment-and-how-can-i-use-it/'
slug: >-
  2026-04-02-httpscsswizardrycom202604what-is-css-containment-and-how-can-i-use-it
tags:
  - code
title: What Is CSS Containment and How Can I Use It?
---
<p>Written by <b>Harry Roberts</b> on <b>CSS Wizardry</b>.</p>
<p>Continuing my work on <em>web performance for design systems</em>, I want to look at a woefully underused CSS feature called <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain">containment</a>. I fear it’s underused because there isn’t much written about it, so this piece aims to be the post I wish I’d been able to read a few years ago. Hopefully it demystifies things a little for you, too.</p>
<p>Modern UIs are busy places. A single page might contain a fixed header, an infinite scroll feed, a sticky cart summary, and a few different third-party widgets stuck around the edges. Every time something changes, the browser needs to decide how much of that page it has to re-think: styles, layout, painting, compositing, and so on.</p>
<p>Out of the box, the browser needs to be cautious. If it cannot be sure that a change is local, it behaves as if almost anything might have moved, forcing it to touch more of the page than is strictly necessary. While this is safe, it’s not always cheap.</p>
<p>CSS containment is a way of telling the browser where the boundaries really are. You use it to say this bit of the DOM is independent of the rest; you can treat it as a self-contained island. In return, the browser is free to skip work outside those islands when things change.</p>
<p>In this post, we’ll take a look at what CSS containment actually is, what each <code>contain</code> value does, and how to use it confidently on real projects without creating hard-to-debug side effects. We’ll also look at my most favourite real-world example of just how effective containment can be. Let’s go!</p>
<h2>Why Containment Exists</h2>
<p>To understand containment, you don’t need to memorise the entire rendering pipeline, but you do need a rough mental model of where the work goes.</p>
<p>When something changes in the DOM, a browser typically has to:</p>
<ol> <li>recalculate styles for affected elements,</li> <li>recalculate layout (sizes and positions),</li> <li>repaint the pixels that changed, and</li> <li>re-composite layers on screen.</li> </ol>
<p>The expensive part is often how <em>far</em> those changes spread. A small change in one part of the tree can invalidate layout or painting in other parts—or even the whole document—and the browser cannot always know that the effect is local. That is why relatively simple operations on a large application can feel sluggish: the browser is having to think about the whole world.</p>
<p>Containment is a promise that a given subtree is isolated:</p>
<ul> <li>changes inside it will not influence layout or paint outside it, and</li> <li>in some cases, its own size does not depend on its children.</li> </ul>
<p>Once you make that promise, the browser can exploit it. For example:</p>
<ul> <li>it can avoid relayout of the rest of the page when something changes inside a contained widget, or</li> <li>it can skip painting descendants of an off-screen container entirely.</li> </ul>
<p>All of that reduces work on the main thread, which is exactly what we want when we are trying to keep interactions snappy (think <a href="https://csswizardry.com/2023/07/core-web-vitals-for-search-engine-optimisation/"><em>Interaction to Next Paint</em></a>).</p>
<h2>Meet the <code>contain</code> Property</h2>
<p>The main lever you’ll pull is the <code>contain</code> property:</p>
<pre><code>.card {
  contain: content;
}
</code></pre>
<p>At a high level, <code>contain</code> lets you assert different <em>kinds</em> of independence for an element and its subtree. There are four basic types of containment:</p>
<ul> <li><code>layout</code></li> <li><code>paint</code></li> <li><code>size</code></li> <li><code>style</code></li> </ul>
<p>You can specify them individually or in combinations:</p>
<pre><code>.card {
  contain: layout paint;
}
</code></pre>
<p>On top of those, there are a couple of shorthand values:</p>
<ul> <li><code>content</code>: shorthand for <code>layout paint style</code>.</li> <li><code>strict</code>: shorthand for <code>size layout paint style</code>.</li> </ul>
<p>There is also <code>inline-size</code>, which is a more targeted form of <code>size</code> containment—we don’t really need to give it much more attention than that.</p>
<p>Let’s go through each of these in turn.</p>
<h2>Layout Containment</h2>
<p>tells the browser that the internal layout of the element is completely independent of the rest of the page.</p>
<pre><code>.card {
  contain: layout;
}
</code></pre>
<p>In practice, that means:</p>
<ul> <li>layout calculations for descendants of <code>.card</code> do not affect layout outside of <code>.card</code>,</li> <li>the <code>.card</code> establishes its own formatting context (like a mini layout world),</li> <li>floats and margin-collapsing are contained within <code>.card</code>,</li> <li><code>.card</code> becomes the containing block for <code>position: absolute</code> and <code>position: fixed</code> descendants, and</li> <li>a new stacking context is created, so <code>z-index</code> on children is scoped to that card.</li> </ul>
<p>This has two main consequences:</p>
<ol> <li><strong>Performance.</strong> When something changes inside <code>.card</code>, the browser can keep most layout work local to that subtree because it has been told none of those changes influence other boxes outside.</li> <li><strong>Layout behaviour.</strong> The new formatting context and containing block can be very handy for controlling floats, margin-collapsing, and <code>position: fixed</code> children, but it can also change behaviour compared to an uncontained element.</li> </ol>
<p>A simple, realistic use case is a grid of dashboard cards:</p>
<pre><code>.dashboard-card {
  contain: layout;
}
</code></pre>
<p>Each card may have its own internal structure (headings, charts, small controls), but nothing inside one card affects the layout of any other. When a chart animates inside a card, the browser does not have to re-evaluate layout for the entire dashboard.</p>
<ul> <li>A fixed-position child that used to be anchored to the viewport will now be anchored to the contained element instead. If you are using <code>position: fixed</code> for tooltips or overlays, check them carefully.</li> <li>Margin-collapsing rules change; that is usually a feature, but it can affect legacy layouts that rely on collapsing from the first child into the parent.</li> </ul>
<h2>Paint Containment</h2>
<p>isolates painting to the element’s box:</p>
<pre><code>.card {
  contain: paint;
}
</code></pre>
<p>With paint containment in place:</p>
<ul> <li>nothing inside <code>.card</code> can visibly overflow its padding box,</li> <li>if the <code>.card</code> itself is off-screen, the browser does not need to paint its children at all, and</li> <li>you still get a stacking context and containing block, as with layout containment.</li> </ul>
<p>This is ideal for widgets where everything should stay visually inside the box anyway: cards, tiles, thumbnail previews, and so on.</p>
<ul> <li>Any intentional overflow effects (drop-shadows that extend beyond the box, popovers that stick out of a sidebar, decorative ‘bleeds’) simply will not show. If you depend on overflow, do not use <code>contain: paint</code> on that element.</li> <li>If you combine <code>layout</code> and <code>paint</code> containment, you will see both behaviours: independent layout plus clipped painting.</li> </ul>
<h2>Size Containment</h2>
<p>is more specialised. It decouples an element’s <em>size</em> from its contents:</p>
<pre><code>.widget {
  contain: size;
}
</code></pre>
<p>When you turn on size containment:</p>
<ul> <li>the size of <code>.widget</code> is calculated as if it had no children, and</li> <li>children can still be laid out and painted inside, but they do not inform the container’s own size.</li> </ul>
<p>This is a powerful constraint. Used wrongly, it is also an easy way to create a bunch of zero-sized boxes.</p>
<p>In almost all cases, when you use <code>contain: size</code> you must also provide an explicit size for the element, either via the usual <code>width</code>/<code>height</code> properties or via <code>contain-intrinsic-size</code>:</p>
<pre><code>.widget {
  contain: size;
  contain-intrinsic-size: 400px 300px; /* Fallback/reserved size */
}
</code></pre>
<p>The intrinsic size tells the browser what size to assume for layout purposes if it cannot derive that size from the children. This becomes particularly important when you start deferring rendering with <code>content-visibility</code>, which we’ll look at shortly.</p>
<ul> <li>Forgetting to set a size often leads to zero-height containers, which then hide their children or cause unexpected scroll behaviour.</li> <li>The size containment itself does not buy you much performance on its own; it is mainly there to unlock other optimisations safely.</li> </ul>
<h2>Style Containment</h2>
<p>is probably the least glamorous of the four, but it has a specific job:</p>
<pre><code>.section {
  contain: style;
}
</code></pre>
<p>Style containment stops certain style-related side effects from spreading outside the contained subtree. The main one you will encounter is CSS counters:</p>
<ul> <li>Counters created or modified inside <code>.section</code> will not affect counters outside it.</li> </ul>
<p>If you have ever used <a href="https://github.com/csswizardry/csswizardry.github.com/blob/d537a2fb16f9c1bd0644d3446487677a6de97ece/css/_elements.type.scss#L172">automatic numbering for headings or figures</a> across a page, you will know that counters are global by default. Style containment is a way of saying this component’s counters are its own, do not let them leak out.</p>
<p>It does <strong>not</strong> give you general purpose ‘scoped CSS’ in the sense of preventing selectors from matching, so it should not be confused with Shadow DOM or <code>@scope</code>.</p>
<h2>Special Values: <code>content</code> and <code>strict</code></h2>
<p>Typing <code>contain: layout paint style</code> over and over gets boring <em>fast</em>. The spec therefore gives us a couple of convenient shorthands.</p>
<h3><code>contain: content</code></h3>
<pre><code>.article {
  contain: content;
}
</code></pre>
<p>is shorthand for:</p>
<pre><code>.article {
  contain: layout paint style;
}
</code></pre>
<p>You get:</p>
<ul> <li>independent internal layout,</li> <li>clipped painting within the padding box, and</li> <li>counters and similar style side-effects scoped to the subtree.</li> </ul>
<p>You <strong>do not</strong> get size containment. That omission is deliberate: without <code>size</code>, the risk of creating zero-sized boxes is much lower, which makes <code>contain: content</code> safe to apply quite widely.</p>
<p>This value is an excellent default for self-contained units like:</p>
<ul> <li>blog posts on a listing page,</li> <li>cards in a grid,</li> <li>rows in a data table,</li> <li>slides in a carousel…</li> </ul>
<p>…as long as nothing needs to extend outside of the bounds of them (e.g. tooltips in said data table).</p>
<h3><code>contain: strict</code></h3>
<pre><code>.panel {
  contain: strict;
  contain-intrinsic-size: 600px 400px;
}
</code></pre>
<p>is shorthand for:</p>
<pre><code>.panel {
  contain: size layout paint style;
}
</code></pre>
<p>This is the most aggressive containment you can ask for: the panel’s size no longer depends on its children, its internal layout is independent, its paint is clipped, and its counters are local.</p>
<p>That combination is very powerful, but it comes with responsibilities:</p>
<ul> <li>you need to give the panel an explicit or intrinsic size,</li> <li>you need to be confident that nothing inside the panel is meant to overflow visually, and</li> <li>you need to understand that <code>position: fixed</code> children will now anchor to the panel, not the viewport.</li> </ul>
<p>As a rule of thumb: do not reach for <code>strict</code> until you have a clear reason and a good understanding of what will happen.</p>
<h2>Containment in the Real World</h2>
<p>So far we have stayed fairly abstract. Let us start with a real example before we look at a few more generic patterns.</p>
<h3>OpenTable’s Mobile Drawer</h3>
<p>A couple of years ago, I ran <a href="https://csswizardry.com/workshops/">a custom INP workshop</a> for the wonderful <a href="https://www.opentable.com/">OpenTable</a> (honestly, web-perf and grub, can you think of a better client?!). When we think about INP, we usually think of JavaScript, but the <em>Presentation Delay</em> phase touches a lot of what I call <em>purple time</em>: recalc style and layout. And while the headline savings below aren’t going to win me any awards, I do think this is a beautifully succinct and comprehensive demonstration of <code>contain</code> in action…</p>
<p>On OpenTable’s mobile UI, there’s a language switcher in their off-screen drawer menu. Tapping the switcher opens a dropdown. The dropdown opens and pushes content <em>beneath</em> it down the viewport, but it doesn’t affect anything outside of the drawer menu itself. Without <code>contain</code>ment, opening the language switcher scopes a layout event to the whole document, touching 4,371 nodes and applying new layout to just 41 of them—fewer than 10%:</p>
<figure><img alt="Chrome DevTools performance profile showing OpenTable’s mobile drawer before containment. Opening the language switcher triggers a layout rooted at the whole document, touching 4,371 nodes and laying out 41 of them in 11.21 milliseconds." src="https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/04/opentable-before.png"/><figcaption>Chrome DevTools performance profile showing OpenTable’s mobile drawer before containment. Opening the language switcher triggers a layout rooted at the whole document, touching 4,371 nodes and laying out 41 of them in 11.21 milliseconds.</figcaption></figure>
<p>While the whole operation only took 11 milliseconds, that’s still a lot of waste, and we don’t like waste.</p>
<p>By applying <code>contain: strict</code> to the drawer menu’s root DOM node, we can limit the reach of the work and create incredible savings:</p>
<figure><img alt="Chrome DevTools performance profile showing OpenTable’s mobile drawer after applying contain: strict. The layout root is now the drawer itself, touching 73 nodes and laying out 40 of them in 1.89 milliseconds." src="https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/04/opentable-after.png"/><figcaption>1.89ms of layout work, rooted at the drawer itself, touching 73 nodes to relayout 40. <a href="https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/04/opentable-after-full.png">View full size/quality (1MB)</a></figcaption></figure>
<p>Now, we can see as clear as day that the operation only touched 73 DOM nodes, 40 of which needed attention, and the scope of the work is very clearly the drawer itself. Hyper precise, and about six times faster.</p>
<p>I think this is one of the most beautiful demos I have ever been fortunate enough to present: such a story told in one before/after.</p>
<p>If this kind of rendering and interaction work looks familiar, it is exactly the sort of thing I cover in <a href="https://csswizardry.com/workshops/">workshops</a>, <a href="https://csswizardry.com/masterclasses/">masterclasses</a>, and hands-on <a href="https://csswizardry.com/consultancy/">consultancy</a>.</p>
<h3>Other Good Candidates</h3>
<p>Once you start looking for them, you will see these opportunities everywhere:</p>
<ul> <li>dashboards full of independent cards, where updates in one card should not force relayout of its neighbours,</li> <li>long, scrollable feeds or search results, where each item can be treated as its own island, and</li> <li>third-party widgets, where you may not control the internals but can still bound their effect on the rest of the page.</li> </ul>
<p>In those kinds of interface, <code>contain: content</code> is often a very good starting point:</p>
<pre><code>.dashboard-card,
.feed-item {
  contain: content; /* layout + paint + style */
}
</code></pre>
<p>And where you need to fence off an embed or ad slot more explicitly, this is often enough:</p>
<pre><code>.ad-slot {
  contain: layout paint;
}
</code></pre>
<p>If those widgets live on other origins, it is also worth <a href="https://csswizardry.com/2023/12/correctly-configure-preconnections/">configuring your preconnections</a> properly.</p>
<h2><code>content-visibility</code> and <code>contain-intrinsic-size</code></h2>
<p>While this post is about <code>contain</code>, it would be unwise not to mention two closely related features: <code>content-visibility</code> and <code>contain-intrinsic-size</code>.</p>
<h3>Skipping Work with <code>content-visibility</code></h3>
<p>allows the browser to skip layout and painting work for elements that are not currently relevant to the user, typically because they are off-screen.</p>
<p>The value you will see most often is <code>auto</code>:</p>
<pre><code>.article-preview {
  content-visibility: auto;
  contain-intrinsic-size: 600px 400px;
}
</code></pre>
<p>With this in place:</p>
<ul> <li>elements near or inside the viewport are rendered normally,</li> <li>elements far off-screen can have their contents ‘skipped’—the browser does just enough to know where the element sits, but does not lay out or paint the subtree,</li> <li>while skipped, the elements effectively have layout, style, paint, and size containment applied, and</li> <li>the <code>contain-intrinsic-size</code> value tells the browser what size to assume for layout purposes before it has actually rendered the contents.</li> </ul>
<p>This is particularly effective for long and repetitive pages or lists. You get the performance benefits of virtualisation without having to wire up a full virtualised list implementation, as long as you can provide a reasonable size estimate.</p>
<p>In fact, I use <code>content-visibility</code> on this page you’re reading right now:</p>
<pre><code>.s-post &gt; h2:nth-of-type(2) ~ p {
  content-visibility: auto;
  contain-intrinsic-size: 1px 250px;
}
</code></pre>
<p>This rather unwieldy selector targets every paragraph after the second <code>&lt;h2&gt;</code> on the page, renders them lazily with <code>content-visibility</code>, and sets their placeholder size to one pixel wide and 250 pixels tall. These numbers are somewhat magic and the 250 is derived from ‘roughly how big the average paragraph on a page is’—nothing more complicated than that.</p>
<h3>Accessibility and Script Considerations</h3>
<p>Because the DOM nodes still exist, off-screen content with <code>content-visibility: auto</code> can usually still be:</p>
<ul> <li>surfaced to search engines and other bots,</li> <li>found via in-page search,</li> <li>targeted via anchor links, and</li> <li>interacted with via assistive technologies.</li> </ul>
<p>However:</p>
<ul> <li><code>content-visibility: hidden</code> is more like a performance-friendly <code>visibility: hidden</code> plus containment. The content is not rendered and may be removed from the accessibility tree, depending on the browser.</li> <li>Any JavaScript that queries layout or style (<code>getBoundingClientRect</code>, <code>getComputedStyle</code>, etc.) on a skipped subtree may force the browser to render it early, eating into your performance gains. Keeping such calls away from skipped content is important.</li> </ul>
<p>Your mileage may vary.</p>
<h2>Caveats, Gotchas, and Things to Watch for</h2>
<p>Containment is not free. You are trading global flexibility for local isolation, and that trade can surprise you in a few ways.</p>
<h3>Zero-Sized Boxes</h3>
<p>The most common error with size containment (directly or via <code>content-visibility</code>) is forgetting to provide an explicit or intrinsic size. The browser then treats the element as if it had no children when computing its size, and in many layouts that means it collapses to zero.</p>
<p>Symptoms include:</p>
<ul> <li>content that appears ‘missing’ but still exists in the DOM,</li> <li>scrollbars not behaving as expected,</li> <li>layout shifts as content does get rendered, or</li> <li>click targets that are present but not visible.</li> </ul>
<p>The cure is simple: always pair <code>contain: size</code> or <code>content-visibility: auto</code> with <code>contain-intrinsic-size</code> or appropriate <code>width</code>/<code>height</code> constraints.</p>
<h3>Unexpected Clipping</h3>
<p>(directly or via <code>content</code>/<code>strict</code>) will clip painting to the padding box. That is often exactly what you want, but it will break patterns that rely on overflow:</p>
<ul> <li>tooltips or dropdowns implemented as children,</li> <li><code>box-shadow</code> ‘bleeds’ beyond the card boundary, or</li> <li>decorative elements that are positioned partially outside a section.</li> </ul>
<p>In those cases, either move the overflowing element out of the contained subtree or avoid paint containment on that particular container.</p>
<h3>Stacking Contexts Everywhere</h3>
<p>Each layout or paint containment boundary establishes a stacking context and a containing block. This is usually a benefit, but can add up:</p>
<ul> <li><code>z-index</code> debugging becomes more involved because more elements define their own stacking contexts,</li> <li><code>fixed</code>-position children may suddenly anchor to a widget instead of the viewport, and</li> <li>combinations with <code>transform</code>/<code>opacity</code>-driven stacking contexts can become tricky.</li> </ul>
<p>If you ever find yourself thinking why is this tooltip behind that overlay?, check for containment on ancestor elements as part of your debugging checklist.</p>
<h3>Interaction with Container Queries</h3>
<p>Container queries rely on certain forms of containment under the hood; for example, <code>container-type: inline-size</code> effectively applies layout and style containment to define a query container.</p>
<p>That means:</p>
<ul> <li>If you are already using container queries, you may get some of the benefits of containment ‘for free’ on those containers.</li> <li>If you add more explicit containment on the same elements without thinking about it, you might over-constrain things, particularly with <code>size</code> or <code>paint</code>.</li> </ul>
<p>A sensible approach is to treat query containers as places where you carefully review which kinds of containment are already applied before adding more.</p>
<h2>When to Use Containment</h2>
<p>By this point you should have a decent mental map of what the different containment values do. The remaining question is when to actually apply them.</p>
<p>Here is a pragmatic checklist.</p>
<h3>Good Candidates</h3>
<p>You should <em>strongly</em> consider <code>contain: content</code> (or similar) for:</p>
<ul> <li>self-contained cards or tiles arranged in grids or lists;</li> <li>repeated article previews on index pages;</li> <li>sections of a long, scrolling page that are visually and functionally independent; and</li> <li>third-party widgets that should not bleed into the rest of the layout.</li> </ul>
<p>You should consider <code>content-visibility: auto</code> plus <code>contain-intrinsic-size</code> for:</p>
<ul> <li>very long lists of similar items where many are off-screen;</li> <li>pages with dozens of article previews or product tiles; and</li> <li>heavy, mostly static sections further down a page.</li> </ul>
<h3>Use With Care</h3>
<p>Be cautious with:</p>
<ul> <li><code>contain: strict</code>: use it only when you have explicitly sized elements and no desired overflow.</li> <li><code>contain: size</code> or <code>inline-size</code>: always provide intrinsic or explicit sizes, and always test in a range of layouts.</li> <li><code>paint</code> containment around components that intentionally overflow (tooltips, dropdowns, overlays).</li> </ul>
<h3>Probably Avoid</h3>
<p>Containment usually does <strong>not</strong> belong on:</p>
<ul> <li>root- or page-level wrappers where everything inside is interdependent;</li> <li>small inline elements like buttons or labels; or</li> <li>elements whose whole purpose is to extend beyond their own bounds visually.</li> </ul>
<h2>Closing Thoughts</h2>
<p>CSS containment is a feature that can yield massive benefit when well deployed. It lets the browser do less work and gives you better control over where you spend your purple time.</p>
<p>You don’t need to apply it everywhere—and it might even be a micro optimisation for your use-case—but a small handful of well-placed rules can make measurable improvements to the interactivity of your UI.</p>
<p>Start small, <a href="https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/">measure carefully</a>, and keep an eye on the gotchas, but before you know it, you’ll have a finely tuned interface that leaves as small a footprint as possible.</p>
<p>Hopefully that’s lifted containment from an obscurity to an everyday part of your arsenal.</p>
