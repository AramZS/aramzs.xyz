---
author: CSS-Tricks
cover_image: >-
  https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/css-types-arithmetic.png
date: '2025-09-25T12:35:32.459Z'
dateFolder: 2025/09/25
description: >-
  Starting in Chrome 140, we'll be able to calculate numeric values with mixed
  data types. Sounds small, but Amit demonstrates how big a deal this is,
  calling it Computational CSS.
isBasedOn: 'https://css-tricks.com/css-typed-arithmetic/'
link: 'https://css-tricks.com/css-typed-arithmetic/'
slug: 2025-09-25-httpscss-trickscomcss-typed-arithmetic
tags:
  - code
title: CSS Typed Arithmetic
---
<p>CSS typed arithmetic is genuinely exciting! It opens the door to new kinds of layout composition and animation logic we could only hack before. The first time I published something that leaned on typed arithmetic was in this animation:</p>
<figure><video controls="" playsinline="" src="https://css-tricks.com/wp-content/uploads/2025/09/swirl.mp4"></video></figure>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/PwZoLBG?height=450&amp;theme-id=1&amp;slug-hash=PwZoLBG&amp;default-tab=result">View content ↗ </a></p></figure>
<p>But before we dive into what is happening in there, let’s pause and get clear on what <strong>typed arithmetic</strong> actually is and why it matters for CSS.</p>
<p><strong>Browser Support:</strong> The CSS feature discussed in this article, typed arithmetic, is on the cutting edge. As of the time of writing, browser support is very limited and experimental. To ensure all readers can understand the concepts, the examples throughout this article are accompanied by videos and images, demonstrating the results for those whose browsers do not yet support this functionality. Please check resources like MDN or Can I Use for the latest support status.</p>
<h3>The Types</h3>
<p>If you really want to get what a “type” is in CSS, think about TypeScript. Now forget about TypeScript. This is a CSS article, where semantics actually matter.</p>
<p>In CSS, a <strong>type</strong> describes the unit space a value lives in, and is called a <code>data-type</code>. Every CSS value belongs to a specific type, and each CSS property and function only accepts the data type (or types) it expects.</p>
<ul> <li>Properties like <code>opacity</code> or <code>scale</code> use a plain <code>&lt;number&gt;</code> with no units.</li> <li><code>width</code>, <code>height</code>, other box metrics, and many additional properties use <code>&lt;length&gt;</code> units like <code>px</code>, <code>rem</code>, <code>cm</code>, etc.</li> <li>Functions like <code>rotate()</code> or <code>conic-gradient()</code> use an <code>&lt;angle&gt;</code> with <code>deg</code>, <code>rad</code>, or <code>turn</code>.</li> <li><code>animation</code> and <code>transition</code> use <code>&lt;time&gt;</code> for their duration in seconds (<code>s</code>) or milliseconds (<code>ms</code>).</li> </ul>
<p><strong>Note:</strong> You can identify CSS data types in the specs, on MDN, and other official references by their angle brackets: <code>&lt;data-type&gt;</code>.</p>
<p>There are many more data types like <code>&lt;percentage&gt;</code>, <code>&lt;frequency&gt;</code>, and <code>&lt;resolution&gt;</code>, but the types mentioned above cover most of our daily use cases and are all we will need for our discussion today. The mathematical concept remains the same for (almost) all types.</p>
<p>I say “almost” all types for one reason: not every data type is calculable. For instance, types like <code>&lt;color&gt;</code>, <code>&lt;string&gt;</code>, or <code>&lt;image&gt;</code> cannot be used in mathematical operations. An expression like <code>"foo" * red</code> would be meaningless. So, when we discuss mathematics in general, and typed arithmetic in particular, it is crucial to use types that are inherently calculable, like <code>&lt;length&gt;</code>, <code>&lt;angle&gt;</code>, or <code>&lt;number&gt;</code>.</p>
<h3>The Rules of Typed Arithmetic</h3>
<p>Even when we use calculable data types, there are still limitations and important rules to keep in mind when performing mathematical operations on them.</p>
<h4>Addition and Subtraction</h4>
<p>Sadly, a mix-and-match approach doesn’t really work here. Expressions like <code>calc(3em + 45deg)</code> or <code>calc(6s - 3px)</code> will not produce a logical result. When adding or subtracting, you must stick to the same data type.</p>
<p>Of course, you can add and subtract different units within the same type, like <code>calc(4em + 20px)</code> or <code>calc(300deg - 1rad)</code>.</p>
<h4>Multiplication</h4>
<p>With multiplication, you can only multiply by a plain <code>&lt;number&gt;</code> type. For example: <code>calc(3px * 7)</code>, <code>calc(10deg * 6)</code>, or <code>calc(40ms * 4)</code>. The result will always adopt the type and unit of the first value, with the new value being the product of the multiplication.</p>
<p>But why can you only multiply by a number? If we tried something like <code>calc(10px * 10px)</code> and assumed it followed “regular” math, we would expect a result of <code>100px²</code>. However, there are no squared pixels in CSS, and certainly no square degrees (though that could be interesting…). Because such a result is invalid, CSS only permits multiplying typed values by unitless numbers.</p>
<h4>Division</h4>
<p>Here, too, mixing and matching incompatible types is not allowed, and you can divide by a number just as you can multiply a number. But what happens when you divide a type by the same type?</p>
<p><strong>Hint:</strong> this is where things get interesting.</p>
<p>Again, if we were thinking in terms of regular math, we would expect the units to cancel each other out, leaving only the calculated value. For example, <code>90x / 6x = 15</code>. In CSS, however, this isn’t the case. Sorry, it <em>wasn’t</em> the case.</p>
<p>Previously, an expression like <code>calc(70px / 10px)</code> would have been invalid. But <a href="https://developer.chrome.com/release-notes/140#css_typed_arithmetic">starting with Chrome 140</a> (and hopefully soon in all other browsers), <strong>this expression now returns a valid number</strong>, which winds up being <code>7</code> in this case. This is the major change that typed arithmetic enables.</p>
<h3>Is that all?!</h3>
<p>That little division? Is that the big thing I called “genuinely exciting”? Yes! Because this one little feature opens the door to a world of creative possibilities. Case in point: we can convert values from one data type to another and mathematically condition values of one type based on another, just like in the swirl example I demoed at the top.</p>
<p>So, to understand what is happening there, let’s look at a more simplified swirl:</p>
<figure><img alt="A long series of white dots forming a spiral against a stark black background. The dots get closer together as they swirl." data-recalc-dims="1" sizes="(min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758506945721_image.png?w=540&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758506945721_image.png?w=540&amp;ssl=1 540w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758506945721_image.png?resize=300%2C300&amp;ssl=1 300w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758506945721_image.png?resize=150%2C150&amp;ssl=1 150w"/></figure>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/xbZbgbj/ef457fca2413ccd44a557c5a68bd5516?height=450&amp;theme-id=1&amp;slug-hash=xbZbgbj/ef457fca2413ccd44a557c5a68bd5516&amp;default-tab=result">View content ↗ </a></p></figure>
<p>I have a container<code>&lt;div&gt;</code> with 36 <code>&lt;i&gt;</code> elements in the markup that are arranged in a spiral with CSS. Each element has an angle relative to the center point, <code>rotate(var(--angle))</code>, and a distance from that center point, <code>translateX(var(--distance))</code>.</p>
<p>The angle calculation is quite direct. I take the index of each <code>&lt;i&gt;</code> element using <a href="https://css-tricks.com/almanac/functions/s/sibling-index/"><code>sibling-index()</code></a> and multiply it by <code>10deg</code>. So, the first element with an index of <code>1</code> will be rotated by 10 degrees (<code>1 * 10deg</code>), the second by 20 degrees (<code>2 * 10deg</code>), the third by 30 degrees (<code>3 * 10deg</code>), and so on.</p>
<pre data-line=""><code>i { --angle: calc(sibling-index() * 10deg); }</code></pre>
<p>As for the distance, I want it to be directly proportional to the angle. I first use typed arithmetic to divide the angle by 360 degrees: <code>var(--angle) / 360deg</code>.</p>
<p>This returns the angle’s value, but as a unitless number, which I can then use anywhere. In this case, I can multiply it by a <code>&lt;length&gt;</code> value (e.g. <code>180px</code>) that determines the element’s distance from the center point.</p>
<pre data-line=""><code>i {
  --angle: calc(sibling-index() * 10deg);
  --distance: calc(var(--angle) / 360deg * 180px);
}</code></pre>
<p>This way, the ratio between the angle and the distance remains constant. Even if we set the angle of each element differently, or to a new value, the elements will still align on the same spiral.</p>
<h3>The Importance of the Divisor’s Unit</h3>
<p>It’s important to clarify that when using typed arithmetic this way, you get a unitless number, but its value is <strong>relative to the unit of the divisor</strong>.</p>
<p>In our simplified spiral, we divided the angle by <code>360deg</code>. The resulting unitless number, therefore, represents the value in degrees. If we had divided by <code>1turn</code> instead, the result would be completely different — even though <code>1turn</code> is equivalent to <code>360deg</code>, the resulting unitless number would represent the value in turns.</p>
<p>A clearer example can be seen with <a href="https://css-tricks.com/css-length-units/"><code>&lt;length&gt;</code></a> <a href="https://css-tricks.com/css-length-units/">values</a>.</p>
<p>Let’s say we are working with a screen width of <code>1080px</code>. If we divide the screen width (<code>100vw</code>) by <code>1px</code>, we get the number of pixels that fit into the screen width, which is, of course, <code>1080</code>.</p>
<pre data-line=""><code>calc(100vw / 1px) /* 1080 */</code></pre>
<p>However, if we divide that same width by <code>1em</code> (and assume a font size of <code>16px</code>), we get the number of <code>em</code> units that fit across the screen.</p>
<pre data-line=""><code>calc(100vw / 1em) /* 67.5 */</code></pre>
<p>The resulting number is unitless in both cases, but its meaning is entirely dependent on the unit of the value we divided by.</p>
<h3>From Length to Angle</h3>
<p>Of course, this conversion doesn’t have to be from a type <code>&lt;angle&gt;</code> to a type <code>&lt;length&gt;</code>. Here is an example that calculates an element’s angle based on the screen width (<code>100vw</code>), creating a new and unusual kind of responsiveness.</p>
<figure><video controls="" playsinline="" src="https://css-tricks.com/wp-content/uploads/2025/09/demo-02.mp4"></video></figure>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/ZYQYBKQ/40ee7e5010d521a2f0aa247126af2090?height=450&amp;theme-id=1&amp;slug-hash=ZYQYBKQ/40ee7e5010d521a2f0aa247126af2090&amp;default-tab=result">View content ↗ </a></p></figure>
<p>And get this: <strong>There are no media queries in here!</strong> it’s all happening in a single line of CSS doing the calculations.</p>
<p>To determine the angle, I first define the width range I want to work within. <code>clamp(300px, 100vw, 700px)</code> gives me a closed range of <code>400px</code>, from <code>300px</code> to <code>700px</code>. I then subtract <code>700px</code> from this range, which gives me a new range, from <code>-400px</code> to <code>0px</code>.</p>
<p>Using typed arithmetic, I then divide this range by <code>400px</code>, which gives me a normalized, unitless number between <code>-1</code> and <code>0</code>. And finally, I convert this number into an <code>&lt;angle&gt;</code> by multiplying it by <code>-90deg</code>.</p>
<p>Here’s what that looks like in CSS when we put it all together:</p>
<pre data-line=""><code>p {
  rotate: calc(((clamp(300px, 100vw, 700px) - 700px) / 400px) * -90deg);
}</code></pre>
<h3>From Length to Opacity</h3>
<p>Of course, the resulting unitless number can be used as-is in any property that accepts a <code>&lt;number&gt;</code> data type, such as <code>opacity</code>. What if I want to determine the font’s opacity based on its size, making smaller fonts more opaque and therefore clearer? Is it possible? Absolutely.</p>
<figure><img alt="Five sentences stacked vertically, each getting larger and more opaque from top to bottom." data-recalc-dims="1" sizes="(min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758507750089_image.png?w=540&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758507750089_image.png?w=540&amp;ssl=1 540w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758507750089_image.png?resize=300%2C300&amp;ssl=1 300w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758507750089_image.png?resize=150%2C150&amp;ssl=1 150w"/></figure>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/zxrxoaw/44a20f0f4b182b91760f889a9bb92734?height=450&amp;theme-id=1&amp;slug-hash=zxrxoaw/44a20f0f4b182b91760f889a9bb92734&amp;default-tab=result">View content ↗ </a></p></figure>
<p>In this example, I am setting a different <code>font-size</code> value for each <code>&lt;p&gt;</code> element using a <code>--font-size</code> custom property. and since the range of this variable is from <code>0.8rem</code> to <code>2rem</code>, I first subtract <code>0.8rem</code> from it to create a new range of <code>0</code> to <code>1.2rem</code>.</p>
<p>I could divide this range by <code>1.2rem</code> to get a normalized, unitless value between <code>0</code> and <code>1</code>. However, because I don’t want the text to become fully transparent, I divide it by twice that amount (<code>2.4rem</code>). This gives me a result between <code>0</code> and <code>0.5</code>, which I then subtract from the maximum opacity of <code>1</code>.</p>
<pre data-line=""><code>p {
  font-size: var(--font-size, 1rem);
  opacity: calc(1 - (var(--font-size, 1rem) - 0.8rem) / 2.4rem);
}</code></pre>
<p>Notice that I am displaying the font size in pixel units even though the size is defined in <code>rem</code> units. I simply use typed arithmetic to divide the font size by <code>1px</code>, which gives me the size in pixels as a unitless value. I then inject this value into the <code>content</code> of the the paragraph’s <code>::after</code> pseudo-element.</p>
<pre data-line=""><code>p::after {
  counter-reset: px calc(var(--font-size, 1rem) / 1px);
  content: counter(px) 'px';
}</code></pre>
<h3>Dynamic Width Colors</h3>
<p>Of course, the real beauty of using native CSS math functions, compared to other approaches, is that everything happens dynamically at runtime. Here, for example, is a small demo where I color the element’s background relative to its rendered width.</p>
<pre data-line=""><code>p {
  --hue: calc(100cqi / 1px);
  background-color: hsl(var(--hue, 0) 75% 25%);
}</code></pre>
<p>You can drag the bottom-right corner of the element to see how the color changes in real-time.</p>
<figure><video controls="" playsinline="" src="https://css-tricks.com/wp-content/uploads/2025/09/demo-4.mp4"></video></figure>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/LEGEbBd/2c2d0d1d7b5b43703b22b838741fc542?height=450&amp;theme-id=1&amp;slug-hash=LEGEbBd/2c2d0d1d7b5b43703b22b838741fc542&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Here’s something neat about this demo: because the element’s default width is 50% of the screen width and the color is directly proportional to that width, it’s possible that the element will initially appear in completely different colors on different devices with different screens. <strong>Again, this is all happening without any media queries or JavaScript.</strong></p>
<h3>An Extreme Example: Chaining Conversions</h3>
<p>OK, so we’ve established that typed arithmetic is cool and opens up new and exciting possibilities. Before we put a bow on this, I wanted to pit this concept against a more <em>extreme</em> example. I tried to imagine what would happen if we took a <code>&lt;length&gt;</code> type, converted it to a <code>&lt;number&gt;</code> type, then to an <code>&lt;angle&gt;</code> type, back to a <code>&lt;number&gt;</code> type, <em>and</em>, from there, back to a <code>&lt;length&gt;</code> type.</p>
<p>Phew!</p>
<p>I couldn’t find a real-world use case for such a chain, but I did wonder what would happen if we were to animate an element’s width and use that width to determine the height of something else. All the calculations might not be necessary (maybe?), but I think I found something that looks pretty cool.</p>
<figure><video controls="" src="https://css-tricks.com/wp-content/uploads/2025/09/demo-5.mp4"></video></figure>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/OPMPWLL/e5b33d8639cd8b288beebfa8bfb4bbc9?height=450&amp;theme-id=1&amp;slug-hash=OPMPWLL/e5b33d8639cd8b288beebfa8bfb4bbc9&amp;default-tab=result">View content ↗ </a></p></figure>
<p>In this demo, the animation is on the solid line along the bottom. The vertical position of the ball, i.e. its height, relative to the line, is proportional to the line’s width. So, as the line expands and contracts, so does the path of the bouncing ball.</p>
<p>To create the parabolic arc that the ball moves along, I take the element’s width (<code>100cqi</code>) and, using typed arithmetic, divide it by <code>300px</code> to get a unitless number between <code>0</code> and <code>1</code>. I multiply that by <code>180deg</code> to get an angle that I use in a <code>sin()</code> function (Juan Diego has a <a href="https://css-tricks.com/the-most-hated-css-feature-cos-and-sin/">great article on this</a>), which returns another unitless number between <code>0</code> and <code>1</code>, but with a parabolic distribution of values.</p>
<p>Finally, I multiply this number by <code>-200px</code>, which outputs the ball’s vertical position relative to the line.</p>
<pre data-line=""><code>.ball {
  --translateY: calc(sin(calc(100cqi / 300px) * 180deg) * -200px) ;
  translate: -50% var(--translateY, 0);
}</code></pre>
<p>And again, because the ball’s position is relative to the line’s width, the ball’s position will remain on the same arc, no matter how we define that width.</p>
<h3>Wrapping Up: The Dawn of Computational CSS</h3>
<p>The ability to divide one typed value by another to produce a unitless number might seem like no big deal; more like a minor footnote in <a href="https://css-tricks.com/category/history/">the grand history of CSS</a>.</p>
<p>But as we’ve seen, this single feature is a quiet revolution. It dismantles the long-standing walls between different CSS data types, transforming them from isolated silos into a connected, interoperable system. We’ve moved beyond simple calculations, and entered the era of true <strong>Computational CSS</strong>.</p>
<p>This isn’t just about finding new ways to style a button or animate a loading spinner. <strong>It represents a fundamental shift in our mental model.</strong> We are no longer merely <em>declaring</em> static styles, but rather defining dynamic, mathematical <em>relationships</em> between properties. The width of an element can now intrinsically know about its color, an angle can dictate a distance, and a font’s size can determine its own visibility.</p>
<p>This is CSS becoming self-aware, capable of creating complex behaviors and responsive designs that adapt with a precision and elegance that previously required JavaScript.</p>
<p>So, the next time you find yourself reaching for JavaScript to bridge a gap between two CSS properties, pause for a moment. Ask yourself if there’s a mathematical relationship you can define instead. You might be surprised at how far you can go with just a few lines of CSS.</p>
<h4>The Future is Calculable</h4>
<p>The examples in this article are just the first steps into a much larger world. What happens when we start mixing these techniques with scroll-driven animations, view transitions, and other modern CSS features? The potential for creating intricate data visualizations, generative art, and truly fluid user interfaces, all natively in CSS, is immense. We are being handed a new set of creative tools, and the instruction manual is still being written.</p>
