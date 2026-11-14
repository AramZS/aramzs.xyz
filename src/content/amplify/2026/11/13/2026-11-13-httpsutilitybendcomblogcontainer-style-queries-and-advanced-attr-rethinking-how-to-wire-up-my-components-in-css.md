---
author: Brecht De Ruyte
cover_image: 'https://utilitybend.com/_astro/visual.OrjLuofZ_1JWjcU.webp'
date: '2026-11-13T20:32:20.125Z'
dateFolder: 2026/11/13
description: >-
  Wiring HTML attributes into CSS with advanced typed attr(), and letting
  container style queries pass that state down to child components.
isBasedOn: >-
  https://utilitybend.com/blog/container-style-queries-and-advanced-attr-rethinking-how-to-wire-up-my-components-in-css
link: >-
  https://utilitybend.com/blog/container-style-queries-and-advanced-attr-rethinking-how-to-wire-up-my-components-in-css
slug: >-
  2026-11-13-httpsutilitybendcomblogcontainer-style-queries-and-advanced-attr-rethinking-how-to-wire-up-my-components-in-css
tags:
  - code
title: >-
  Container style queries and advanced attr(): rethinking how to wire up my
  components in CSS
---
<p>8 Sep 2026</p>
<figure data-vt="post-img-container-style-queries-and-advanced-attr-rethinking-how-to-wire-up-my-components-in-css"><picture><source sizes="(max-width: 575px) 100vw,(max-width: 767px) 100vw,(max-width: 991px) 100vw,80vw" srcset="https://utilitybend.com/_astro/visual.OrjLuofZ_Z1YJRkc.avif 375w," type="image/avif"/><source sizes="(max-width: 575px) 100vw,(max-width: 767px) 100vw,(max-width: 991px) 100vw,80vw" srcset="https://utilitybend.com/_astro/visual.OrjLuofZ_hrDem.webp 375w," type="image/webp"/><img alt="Card components showing different density modes: compact, comfortable, and spacious" sizes="(max-width: 575px) 100vw,(max-width: 767px) 100vw,(max-width: 991px) 100vw,80vw" src="https://utilitybend.com/_astro/visual.OrjLuofZ_tOkfD.jpg" srcset="https://utilitybend.com/_astro/visual.OrjLuofZ_Z1KDnO5.jpg 375w,"/></picture><figcaption>Card components showing different density modes: compact, comfortable, and spacious</figcaption></figure>
<p>How do you handle the look and feel of a component when an element moves between contexts? In the past we relied on modifier classes or passing down framework props. But combining container style queries with the new advanced attr() capabilities gives us interesting ways to handle our CSS architecture: HTML attributes feeding directly into typed CSS variables, and components adapting themselves purely through CSS.</p>
<p>I’ve been playing a lot with container style queries in the past, same goes for the advanced <code>attr()</code> capabilities. I think both of these additions in CSS are great and go together hand in hand. But now that container style queries are baseline newly available and the <code>attr()</code> capabilities feature is getting closer to full adoption, I feel like I really have to start rewiring my brains when starting on a new green field project. The approach to adaptable components can become a lot cleaner and smarter. So, I wanted to write this article, mostly to just get into that mindset myself. I hope you can take something out of this as well.</p>
<p>There are a few ideas that I’ve been playing with. One of them is mostly about grids and the other one is about card densities. I’ll split the ideas in this article.</p>
<p>One thing worth mentioning before we start: the demos below have no fallbacks in them. I stripped every <code>@supports</code> block out on purpose, because I wanted to see what this stuff looks like when you write it the way you’d write it in a few months from now. That does mean at the moment you’ll need Chrome, Edge or Firefox, the baseline status of these features can be found here:</p>
<p>(At the moment there seems to be missing information on the <code>attr()</code> capabilities on <a href="https://webstatus.dev/features/attr">webstatus.dev</a>.)</p>
<h2>Understanding the syntax: advanced attr() and style queries</h2>
<p>Before jumping into the demos, let’s take a look at the syntax for both of these features.</p>
<h3>The new powers of attr()</h3>
<p>In the past, <code>attr()</code> in CSS was very limited. We could only use it inside the <code>content</code> property of pseudo-elements (like <code>content: attr(data-tooltip)</code>), and it would only ever return an unquoted string. We couldn’t use it for widths, padding, colors, numbers, etc.</p>
<p>The <a href="https://www.w3.org/TR/css-values-5/#attr-notation">CSS Values and Units Module Level 5</a> opens up the capabilities of this feature. The modern syntax looks like this:</p>
<pre data-language="css"><code>attr( &lt;attribute-name&gt; &lt;type-or-unit&gt;? [, &lt;fallback&gt; ]? )</code></pre>
<p>We can now use <code>attr()</code> on any CSS property, specify the data type or unit expected, and provide a fallback value.</p>
<p>In this article I’ll mostly be using the following capabilities:</p>
<ul> <li><strong>Direct unit casting:</strong> <code>attr(data-gap cqi, 2cqi)</code>. Notice that <code>cqi</code> here is the unit type. If your HTML has <code>data-gap="2"</code>, the browser takes that raw number and attaches <code>cqi</code> (container query inline units) to it, resulting in <code>2cqi</code>. If the attribute is missing, it falls back to <code>2cqi</code>.</li> <li><strong>Numbers:</strong> <code>attr(data-repeat type(&lt;number&gt;), 3)</code>. This parses the attribute as an integer <code>&lt;number&gt;</code>, which is required when passing number counting to functions like <code>repeat(3, 1fr)</code>.</li> <li><strong>Lengths:</strong> <code>attr(data-minSize type(&lt;length&gt;), 280px)</code>. This parses a length with its unit included in the attribute (like <code>280px</code>, <code>34ch</code>, <code>20cqi</code>, ….).</li> <li><strong>Custom identifiers:</strong> <code>attr(data-density type(&lt;custom-ident&gt;), comfortable)</code>. I already had some demos with this before, passing custom-idents is a lot of fun. Instead of returning a quoted string <code>"compact"</code>, <code>type(&lt;custom-ident&gt;)</code> returns an unquoted CSS keyword / identifier (<code>compact</code>). That is important and will make sense in a bit, because style queries match against identifiers, not strings.</li> </ul>
<h3>Container style queries</h3>
<p>While container size queries (<code>@container (width &gt;= 400px)</code>) query the dimensions of an element, style queries let you query computed CSS declarations on a parent container:</p>
<pre data-language="css"><code>@container style(--density: compact) {
  .card {
    /* Style children based on the container's custom property */
  }
}</code></pre>
<p>There is one important thing to know here: <strong>you do not need <code>container-type</code> to query custom properties</strong>. Any parent element can act as a style query container automatically. The child simply looks up the DOM tree to find the nearest ancestor declaring that property.</p>
<p>Ok, that’s enough syntax. Let’s build a thing. The idea in this article is that I guide you through both these features and end up with combining them. Not sure how many people still read articles, but that’s the way I hope to make it click for you 😉.</p>
<h2>Grids</h2>
<p>Let’s start with layout grids, as that’s the easiest way to get a feel for <code>attr()</code>.</p>
<p>Personally I’m not the biggest Tailwind fan, but I did work with it a few times before and have gone through utility class hell. So ask yourself: How many utility classes have you written that only exist to set one number? <code>.grid-cols-2</code>, <code>.grid-cols-3</code>, <code>.grid-cols-4</code>… and then a matching set for the gaps.</p>
<p>I always felt like I wanted a sort of middle ground for utility classes that just work in my HTML, combined with custom things, keeping my markup pretty. So here is an idea for “mini grid framework” but not by using classes.</p>
<h3>Fixed columns with data-repeat</h3>
<p>In this first demo, the number of columns and the gap between them both come from attributes on the grid element:</p>
<pre data-language="html"><code>&lt;div class="grid" data-repeat="3" data-gap="2"&gt;
  &lt;article class="card"&gt;...&lt;/article&gt;
  &lt;article class="card"&gt;...&lt;/article&gt;
  &lt;article class="card"&gt;...&lt;/article&gt;
&lt;/div&gt;</code></pre>
<p>And the CSS:</p>
<pre data-language="css"><code>@layer demo {
  .grid-section {
    container-type: inline-size;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(attr(data-repeat type(&lt;number&gt;), 3), 1fr);
    gap: attr(data-gap cqi, 2cqi);
  }
}</code></pre>
<p>That’s the whole grid definition. <code>attr(data-repeat type(&lt;number&gt;), 3)</code> reads <code>data-repeat="3"</code> as a real number and drops it straight into <code>repeat()</code>. Change the attribute to <code>4</code> and you have a four column grid, no extra selector needed.</p>
<p>The gap is the part I like most here. <code>attr(data-gap cqi, 2cqi)</code> takes <code>data-gap="2"</code> and attaches the <code>cqi</code> unit to it, so the spacing scales with the container’s inline size instead of the viewport. The markup stays free of units, and the component keeps ownership of its own unit system. Which feels like a nice separation of concerns. But this is of course not really adjusting to the container’s width. All in time, this is just an intro.</p>
<p>In the demo I wired two sliders to it. The sliders don’t touch a single CSS property, they only rewrite the attributes using JS (you could perfectly just inspect element of the demo and adjust those attributes yourself). There is also a little code preview above the grid so you can watch the HTML change while you drag.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/utilitybend/embed/preview/01a07c2f-6f25-7645-a1bc-8dfaa05d1bef?default-tab=result">View content ↗ </a></p></figure>
<h3>Fluid columns with data-minSize</h3>
<p>Fixed columns might be enough for some dashboards, but for cards I usually want the grid to figure it out by itself. So instead of a column count, the HTML says how narrow a card is allowed to get before things should wrap:</p>
<pre data-language="html"><code>&lt;div class="fluid-grid" data-minSize="320px" data-gap="2"&gt;
  &lt;article class="card"&gt;...&lt;/article&gt;
  &lt;article class="card"&gt;...&lt;/article&gt;
  &lt;article class="card"&gt;...&lt;/article&gt;
&lt;/div&gt;</code></pre>
<pre data-language="css"><code>@layer demo {
  .fluid-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(attr(data-minSize type(&lt;length&gt;), 280px), 100%), 1fr)
    );
    gap: attr(data-gap cqi, 2cqi);
  }
}</code></pre>
<p>Here <code>attr(data-minSize type(&lt;length&gt;), 280px)</code> parses <code>320px</code> as an actual length and hands it to <code>minmax()</code>. The <code>min(…, 100%)</code> around it is the old guard against overflow on screens narrower than the minimum, I’ve been using that one for years and this little snippet with <code>attr()</code> will be entering my starting CSS files soon enough.</p>
<p>So whoever writes the markup can now decide how wide cards should be before they wrap, without ever opening the stylesheet. Like I said, not meant to create a full adaptable grid system, but mini framework for fast prototyping.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/utilitybend/embed/preview/01a07c37-8390-78b4-8791-47cdf223f812?default-tab=result">View content ↗ </a></p></figure>
<p>I’ve been thinking on how I could turn this into a bigger framework without it turning into “just Tailwind with data attributes”. It’s a side-project, I might finish it, I might not.</p>
<p>Now that we’re all on board with <code>attr()</code>. Let’s get over to style queries.</p>
<h2>Density controller</h2>
<p>In a perfect design system world, a component should be context-aware on its own. The parent container defines the environment, and the child component looks up at its ancestor, sees what density is requested, and styles itself.</p>
<p>To try that out I built a set of squad cards themed around superheroes, a small nod to <a href="https://www.youtube.com/watch?v=wzw4XJ038VA"><em>Dispatch</em></a>, a fun game that I’ve been playing for a few days.</p>
<figure><picture><source sizes="(max-width: 800px) 100vw, 80vw" srcset="https://utilitybend.com/_astro/dispatch.Bm5rtNGu_WpR39.avif 320w," type="image/avif"/><source sizes="(max-width: 800px) 100vw, 80vw" srcset="https://utilitybend.com/_astro/dispatch.Bm5rtNGu_uYS9l.webp 320w," type="image/webp"/><figure><img alt="Key art from the video game Dispatch, showing its cast of misfit superheroes in the dispatch office" sizes="(max-width: 800px) 100vw, 80vw" src="https://utilitybend.com/_astro/dispatch.Bm5rtNGu_Juvvd.jpg" srcset="https://utilitybend.com/_astro/dispatch.Bm5rtNGu_Z22FpLa.jpg 320w,"/><figcaption>Key art from the video game Dispatch, showing its cast of misfit superheroes in the dispatch office</figcaption></figure></picture></figure>
<p>The markup is straightforward, your everyday card component.</p>
<pre data-language="html"><code>&lt;article class="card"&gt;
  &lt;img class="avatar" src="avatars/irondude.jpg" alt="Irondude" /&gt;
  &lt;div class="card-content"&gt;
    &lt;h2 class="card-title"&gt;
      Irondude
      &lt;span class="badge"&gt;Powered Armor&lt;/span&gt;
    &lt;/h2&gt;
    &lt;p class="card-desc"&gt;
      Walks into collapsing buildings so nobody else has to.
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="card-actions"&gt;
    &lt;button class="btn btn-secondary"&gt;Message&lt;/button&gt;
    &lt;button class="btn"&gt;Dispatch&lt;/button&gt;
  &lt;/div&gt;
&lt;/article&gt;</code></pre>
<p>And three density modes:</p>
<ul> <li><strong>compact</strong> (tight padding, small avatar, description hidden),</li> <li><strong>comfortable</strong> (the default)</li> <li><strong>spacious</strong> (room to breathe).</li> </ul>
<h3>One multiplier</h3>
<p>Before writing any queries, let’s talk maths…</p>
<p>The reflex when building size variants is to write out every override by hand. Smaller padding on the card for <code>.card--compact</code>, smaller gap, smaller avatar, smaller title, smaller badge, smaller buttons… and then the whole ritual again for <code>.card--spacious</code> with bigger numbers. You end up maintaining three disconnected sets of hardcoded values for one component, and when you change the base padding six months later, you get to update all of them. If you remember.</p>
<p>It’s not always an easy sell to designers to make fluid choices, by simple maths. However, if I were to design cards now, this is the direction I’d like to think of: one simple multiplier:</p>
<pre data-language="css"><code>.card {
  --density-scale: 1;
  gap: calc(1.25rem * var(--density-scale));
  padding: calc(1.25rem * var(--density-scale)) calc(1.5rem * var(--density-scale));
  border-radius: calc(16px * var(--density-scale));

  .avatar {
    width: calc(52px * var(--density-scale));
  }

  .card-title {
    font-size: calc(1.15rem * var(--density-scale));
  }

  .badge {
    font-size: calc(0.72rem * var(--density-scale));
  }

  .btn {
    padding: calc(0.55rem * var(--density-scale)) calc(1.1rem * var(--density-scale));
    font-size: calc(0.85rem * var(--density-scale));
  }
}</code></pre>
<p>Everything that cares about density references <code>--density-scale</code>. Change that one number and the padding, radius, avatar, badge and buttons all move together, so the card keeps its proportions instead of looking squished.</p>
<p>If compact ends up feeling a bit too tiny, you tweak one value instead of twenty. It takes a little while to get right, but you start with the medium sized one (comfortable) and adjust accordingly.</p>
<h3>Starting simple: radio buttons and :has()</h3>
<p>For the first density demo I kept it dead simple. Three radio buttons, and <code>:has()</code> on the body to set <code>--density</code> on the container:</p>
<pre data-language="css"><code>@layer demo {
  .card-container {
    --density: comfortable;
  }

  body:has(#compact:checked) .card-container {
    --density: compact;
  }

  body:has(#spacious:checked) .card-container {
    --density: spacious;
  }

  @container style(--density: compact) {
    .card {
      --density-scale: 0.72;
    }

    .card-desc {
      display: none;
    }
  }

  @container style(--density: spacious) {
    .card {
      --density-scale: 1.3;
    }
  }
}</code></pre>
<p>The cards themselves don’t get a single extra class. They ask their ancestor what density it wants and rescale.</p>
<p>This was a good first draft, but truth be told, this demo doesn’t prove much yet. You could get a similar result with <code>.card-container.compact .card</code> and a descendant selector. It’s a warm-up.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/utilitybend/embed/preview/01a04c70-890e-7681-bd05-a7a53d35fa56?default-tab=result">View content ↗ </a></p></figure>
<p>Note: don’t overly use <code>:has()</code> on the root as it can cause performance issues, but for demos sake…</p>
<h3>The fun stuff: moving cards around and combining with attr()</h3>
<p>Style queries get interesting when elements actually move. So the second demo has three drop zones, and each one declares its own density in the HTML. In reality those dropzones might not be a drag and drop but regions of your application, but it should give you an idea:</p>
<pre data-language="html"><code>&lt;main class="containers"&gt;
  &lt;section class="card-container" data-density="compact"&gt;&lt;/section&gt;
  &lt;section class="card-container" data-density="comfortable"&gt;&lt;/section&gt;
  &lt;section class="card-container" data-density="spacious"&gt;&lt;/section&gt;
&lt;/main&gt;</code></pre>
<p>This is where <code>type(&lt;custom-ident&gt;)</code> comes back:</p>
<pre data-language="css"><code>@layer demo {
  .card-container {
    --density: attr(data-density type(&lt;custom-ident&gt;), comfortable);
  }
}</code></pre>
<p>No <code>.card-container.compact</code>, no <code>.card-container.spacious</code>. Add a fourth density tomorrow and this line doesn’t change, it is flexible from the start.</p>
<p>The identifier lands in <code>--density</code>, the style queries match, done. (If <code>attr()</code> still only gave us strings, <code>@container style(--density: compact)</code> would never match, since a style query compares identifiers and <code>"compact"</code> is not the same as <code>compact</code>.)</p>
<p>Then the cards get <code>draggable="true"</code> and the usual native drag and drop listeners. Here’s the drop handler in full:</p>
<pre data-language="js"><code>document.addEventListener('drop', (e) =&gt; {
  const container = e.target.closest('.card-container');
  if (!container || !draggedCard) return;

  e.preventDefault();
  container.classList.remove('drag-over');

  if (!container.contains(draggedCard)) {
    container.appendChild(draggedCard);
  }
});</code></pre>
<p>No <code>classList.add('card--compact')</code>, no <code>setAttribute('data-density', …)</code> on the card, no re-render. The only thing that JavaScript does with styling here is add and remove a <code>drag-over</code> class on the drop zone, purely as eye candy.</p>
<p>The moment the card lands in its new parent, the browser re-evaluates the container tree, the card matches a different style query, and it rescales itself. JavaScript moves DOM nodes, CSS handles the looks. Once again, separation of concerns. First HTML, then CSS then JS.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/utilitybend/embed/preview/01a07c1b-7ae1-709a-89ba-ed3ca5dcbce7?default-tab=result">View content ↗ </a></p></figure>
<h2>Putting both ideas in one component</h2>
<p>For the last demo I wanted to see how far this goes when you combine everything, think of it as a warm-up for a mini grid framework. One grid where the parent declares its entire configuration in HTML: the minimum column width, the fluid gap, whether the first article should become a hero card, and which accent colour the cards should use.</p>
<pre data-language="html"><code>&lt;div
  class="fluid-grid"
  data-minSize="280px"
  data-gap="2"
  data-featured="true"
  data-accent="terracotta"
&gt;
  &lt;article class="card"&gt;
    &lt;img src="cabin.jpg" alt="Forest cabin" /&gt;
    &lt;div class="card-content"&gt;
      &lt;span class="tag"&gt;Habitats&lt;/span&gt;
      &lt;h3&gt;Forest Micro-Cabins&lt;/h3&gt;
    &lt;/div&gt;
  &lt;/article&gt;
  &lt;!-- more cards… --&gt;
&lt;/div&gt;</code></pre>
<p>Two of those attributes go straight into layout values, the other two become identifiers that the children can query:</p>
<pre data-language="css"><code>@layer demo {
  .fluid-grid {
    --featured: attr(data-featured type(&lt;custom-ident&gt;), false);
    --accent: attr(data-accent type(&lt;custom-ident&gt;), terracotta);

    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(attr(data-minSize type(&lt;length&gt;), 280px), 100%), 1fr)
    );
    gap: attr(data-gap cqi, 2cqi);
  }

  /* layout variation */
  @container style(--featured: true) {
    .card:first-child {
      grid-column: span 2;
      grid-row: span 2;
    }
  }

  /* accent distribution */
  @container style(--accent: terracotta) {
    .card {
      --accent-color: oklch(52% 0.16 35);
    }
  }

  @container style(--accent: sage) {
    .card {
      --accent-color: oklch(48% 0.11 150);
    }
  }

  @container style(--accent: indigo) {
    .card {
      --accent-color: oklch(48% 0.16 265);
    }
  }
}</code></pre>
<p>The card then just picks up whatever accent it was handed:</p>
<pre data-language="css"><code>.card {
  --card-accent: var(--accent-color, oklch(52% 0.16 35));
  border-top: 3px solid var(--card-accent);

  .tag {
    color: var(--card-accent);
  }
}</code></pre>
<p>So a template, a CMS or an editor sets four attributes, <code>attr()</code> turns them into typed values and identifiers, and the style queries pass that state down to the children. Flipping “feature the first post” in a CMS becomes a <code>data-featured="true"</code> in the output, and a card two levels down decides to become a 2x2 hero. Nothing in JavaScript needs to know that a hero card even exists.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/utilitybend/embed/preview/01a07c3c-455c-7a1d-83d6-767cf9f75e82?default-tab=result">View content ↗ </a></p></figure>
<h2>A final note on support</h2>
<p>Container style queries for custom properties are still fresh off the shelf this year, but have full browser support. So for the density pattern, the drag and drop demo, all of it, you’re good.</p>
<p>Advanced typed <code>attr()</code> is the newer half. The <code>type()</code> part, which is what all of these demos lean on, shipped in Chrome and Edge 133 back in February 2025, and Firefox picked it up in 155 at the end of last month. Safari has it in Technology Preview but not in a stable release yet. So, I’m thinking soon-ish?</p>
<p>There is a fallback pattern for this. It removes the “DRY” part from the code, but not that hard, you keep a plain custom property as the base and upgrade it behind <code>@supports</code>:</p>
<pre data-language="css"><code>.fluid-grid {
  /* base values every browser understands */
  --featured: false;
  --accent: terracotta;

  &amp;[data-featured="true"] { --featured: true; }
  &amp;[data-accent="sage"] { --accent: sage; }
  &amp;[data-accent="indigo"] { --accent: indigo; }

  /* upgrade for browsers with typed attr() */
  @supports (x: attr(x type(*))) {
    --featured: attr(data-featured type(&lt;custom-ident&gt;), false);
    --accent: attr(data-accent type(&lt;custom-ident&gt;), terracotta);
  }
}</code></pre>
<p>I’m not sure I’ll be using it this way. I kinda just want to use the feature as is.</p>
<h2>Conclusion</h2>
<p>What I really love about this is how well everything snaps together. Both of these features are useful enough on their own, but sitting next to each other they turn into some sort of pipeline, where the markup declares what it wants and the components further down figure out the rest by themselves. As I mentioned, these features do make me wonder about future architectures, thinking how I can get the best flexible/adaptable system out there.</p>
<p>For example: I don’t mind being honest telling you that it took me a while before container size queries became my go-to by default. You need to practice these things, shift your mindset. Sure you can learn syntax easily, but making it a default choice takes time and repetition.</p>
<p>I don’t have a green field project to try this on just yet, and it might even be a bit too soon. But when I do, I’m sure I’ll be force-reaching for this instead of another set of modifier classes. And you know what? That system is going to be pretty darn cool.</p>
