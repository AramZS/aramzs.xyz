---
author: Temani Afif
cover_image: 'https://blog.master.dev/wp-json/social-image-generator/v1/image/11629'
date: '2026-11-11T01:00:07.951Z'
dateFolder: 2026/11/10
description: >-
  Explore dynamic CSS connections with border-shape in this tutorial, enhancing
  your designs with stylish curves and interactive shapes.
isBasedOn: 'https://blog.master.dev/two-circles-one-connection-and-border-shape/'
link: 'https://blog.master.dev/two-circles-one-connection-and-border-shape/'
slug: 2026-11-10-httpsblogmasterdevtwo-circles-one-connection-and-border-shape
tags:
  - code
title: 'Two Circles, One Connection, and border-shape'
---
<figure><img alt="" sizes="(max-width: 1024px) 100vw, 1024px" src="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/connector.jpg?w=2000&amp;quality=89&amp;ssl=1" srcset="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/connector.jpg?w=2000&amp;quality=89&amp;ssl=1 2000w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/connector.jpg?resize=300%2C180&amp;quality=89&amp;ssl=1 300w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/connector.jpg?resize=1024%2C614&amp;quality=89&amp;ssl=1 1024w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/connector.jpg?resize=768%2C461&amp;quality=89&amp;ssl=1 768w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/connector.jpg?resize=1536%2C922&amp;quality=89&amp;ssl=1 1536w"/></figure>
<p>In <a href="https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/">the previous article</a>, we combined anchor positioning with modern CSS features to connect two circles with an arrow. The idea was to create dynamic behavior where the arrow follows the movement of both circles and changes shape based on their distance. We can also show the distance!</p>
<p>At the time of writing, only Chrome and Edge fully support the features we’ll use. The demos in Firefox and Safari likely won’t look right.</p>
<p>Here is a demo from the previous article where you can drag both circles and see the magic in play:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/wBWWKxP?height=550&amp;theme-id=1&amp;slug-hash=wBWWKxP&amp;default-tab=result">View content ↗ </a></p></figure>
<p>While the technique was a bit elaborate, the shape was basic, so what about fancier shapes? Curved and distorted lines like the ones below.</p>
<figure><img alt="A diagram showing four colored blocks labeled A, B, C, and D connected by lines, with the left side depicting a complex network, while the right side illustrates a simpler connection of colored circles." data-recalc-dims="1" sizes="(max-width: 973px) 100vw, 973px" src="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p.png?w=973&amp;quality=80&amp;ssl=1" srcset="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p.png?w=973&amp;quality=80&amp;ssl=1 973w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p.png?resize=300%2C159&amp;quality=80&amp;ssl=1 300w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p.png?resize=768%2C408&amp;quality=80&amp;ssl=1 768w"/><figcaption>A diagram showing four colored blocks labeled A, B, C, and D connected by lines, with the left side depicting a complex network, while the right side illustrates a simpler connection of colored circles.</figcaption></figure>
<p>It may sound like a difficult task, but a new powerful feature will make it straightforward: It’s <code>border-shape</code>.</p>
<h3>Article Series</h3>
<h2>Prerequisites</h2>
<p>Well, you need to read <a href="https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/">the first article</a> of this series. At least to the section “Linking the Circles” because it’s crucial to understand the anchor positioning part. I will use the same code structure and the same anchor positioning configuration. The only difference will be creating the shapes.</p>
<p>Here is our starting point:</p>
<pre data-shcb-language-name="HTML, XML" data-shcb-language-slug="xml"><code>&lt;div class="circle" size="170px"&gt;&lt;/div&gt;
&lt;div class="circle" size="100px"&gt;&lt;/div&gt;

&lt;div class="link"&gt;
  &lt;a&gt;&lt;/a&gt;
  &lt;b&gt;&lt;/b&gt;
  &lt;c&gt;&lt;/c&gt;
  &lt;d&gt;&lt;/d&gt;
&lt;/div&gt;</code>Code language: HTML, XML (xml)</pre>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link&gt; * {
  position: absolute;
  --_x: calc(anchor(--c1 inside) + anchor-size(--c1)/2);
  --_y: calc(anchor(--c2 inside) + anchor-size(--c2)/2);
}
.link :is(a,b) {top:  var(--_x); bottom: var(--_y);}
.link :is(a,c) {left: var(--_x); right:  var(--_y);}
.link :is(c,d) {top:  var(--_y); bottom: var(--_x);}
.link :is(b,d) {left: var(--_y); right:  var(--_x);}

.link b {scale: -1  1} 
.link c {scale:  1 -1} 
.link d {scale: -1 -1} 

.circle {
  width: calc(attr(size type(&lt;length&gt;)));
  aspect-ratio: 1;
  anchor-name: --c1;
}
.circle + .circle {
  anchor-name: --c2;
}</code>Code language: CSS (css)</pre>
<p>And a demo picked from the previous article with a random shape built with <code>clip-path</code>.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/dPpvWxr/02b431fbdaf0aeedb2c6dbe47a6cf841?height=450&amp;theme-id=1&amp;slug-hash=dPpvWxr/02b431fbdaf0aeedb2c6dbe47a6cf841&amp;default-tab=result">View content ↗ </a></p></figure>
<p>The goal is to update that “ugly” shape with a fancy curved line using <code>border-shape</code>.</p>
<h2>Why border-shape?</h2>
<p>In case you missed it, we got a lot of new features for creating shapes: <code>corner-shape</code>, <code>shape()</code>, and <code>border-shape</code>. I have a bunch of articles about them that I invite you to read. Some are short and quick to read, while others are lengthy and very detailed.</p>
<blockquote> <p>Do I have to read them all?!</p> </blockquote>
<p>Not really; consider them as references if you want to dig more into those new features. For our case, you only need to understand how <code>border-shape</code> works, and it’s pretty simple.</p>
<p><code>border-shape</code> lets us shape the whole element while keeping its decorations such as border, shadow, outline, etc. For comparison, <code>clip-path</code> shapes the element as well but clips everything. We all know how tricky it is to have borders when using <code>clip-path</code>. It’s no longer an issue with <code>border-shape</code>.</p>
<figure><img alt="Image showing three shapes: a solid square with a black border and red glow, a clip-path shape with a light blue fill, and a border-shaped figure with a black outline and red glow." data-recalc-dims="1" sizes="(max-width: 891px) 100vw, 891px" src="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p-jhYxb.png?w=891&amp;quality=80&amp;ssl=1" srcset="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p-jhYxb.png?w=891&amp;quality=80&amp;ssl=1 891w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p-jhYxb.png?resize=300%2C111&amp;quality=80&amp;ssl=1 300w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p-jhYxb.png?resize=768%2C285&amp;quality=80&amp;ssl=1 768w"/><figcaption>Showing the difference between clip-path and border-shape</figcaption></figure>
<p>Now, let’s consider the following example:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.shape {
  border: 10px solid #000;
  background: red;
  border-shape: polygon(0 0,100% 100%,0 100%);
}</code>Code language: CSS (css)</pre>
<p>Nothing fancy. A triangle with a border and a background.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16fbc-5b36-73db-b6a3-e746c019a36e/a663930bb9ba2fec9923a5aaa0485a35?height=450&amp;theme-id=1&amp;slug-hash=01a16fbc-5b36-73db-b6a3-e746c019a36e/a663930bb9ba2fec9923a5aaa0485a35&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Let’s update the shape and try a slightly more complex one using <code>shape()</code>.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.shape {
  border-shape: shape(from 0 0,curve to 100% 100% with 100% 0,line to 0 100%,close);
}</code>Code language: CSS (css)</pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16fbe-88c5-7431-9eef-50e3d0646e7d/490f38936d0779fdb45d1a9dd3f50179?height=450&amp;theme-id=1&amp;slug-hash=01a16fbe-88c5-7431-9eef-50e3d0646e7d/490f38936d0779fdb45d1a9dd3f50179&amp;default-tab=result">View content ↗ </a></p></figure>
<p>The shape contains 3 parts: one curved line and two straight lines. Let’s remove the straight lines and keep only the curved one:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.shape {
  border-shape: shape(from 0 0,curve to 100% 100% with 100% 0);
}</code>Code language: CSS (css)</pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16fc0-8773-7f45-a1a2-d503426e8a06/7da2738ebe249c05aea632d64e44636b?height=450&amp;theme-id=1&amp;slug-hash=01a16fc0-8773-7f45-a1a2-d503426e8a06/7da2738ebe249c05aea632d64e44636b&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Do you see where I am going with this idea? If we remove the background color, only the curved line remains visible.</p>
<figure><img alt="Diagram illustrating the transformation of a red triangular shape into a red rounded shape through a series of transitions." data-recalc-dims="1" sizes="(max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/9RiADzvB.png?w=1101&amp;quality=80&amp;ssl=1" srcset="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/9RiADzvB.png?w=1101&amp;quality=80&amp;ssl=1 1101w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/9RiADzvB.png?resize=300%2C65&amp;quality=80&amp;ssl=1 300w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/9RiADzvB.png?resize=1024%2C220&amp;quality=80&amp;ssl=1 1024w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/9RiADzvB.png?resize=768%2C165&amp;quality=80&amp;ssl=1 768w"/><figcaption>Diagram illustrating the transformation of a red triangular shape into a red rounded shape through a series of transitions.</figcaption></figure>
<p>We use <code>border-shape</code> combined with <code>shape()</code> to draw a path/line that connects two points, then we set the border property to control the thickness and color:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.shape {
  border: 10px solid #000;
  border-shape: shape(...);
}</code>Code language: CSS (css)</pre>
<p>That’s it!</p>
<p>If you are new to <code>shape()</code>, don’t worry. We are not going crazy with it, so you can easily follow what’s coming next. That said, I have <a href="https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/">a four-article series</a> if you want to better understand the various commands (line, arc, curve, etc.).</p>
<h2>The Implementation</h2>
<p>Let’s take our previous demo and replace <code>clip-path</code> with <code>border-shape</code>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; * {
  position: absolute;
  border: 12px solid #556270;
  border-shape: shape(from 0 0,curve to 100% 100% with 100% 0);
}</code>Code language: CSS (css)</pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16963-15ce-786a-8599-61b293cdb35d/d35bb48d7064148faf20abcb1948795b?height=550&amp;theme-id=1&amp;slug-hash=01a16963-15ce-786a-8599-61b293cdb35d/d35bb48d7064148faf20abcb1948795b&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Hmm, the result is quite strange. We get more curves than expected. The issue is the use of <code>border</code>. The link structure is a set of four elements to distinguish the four possible positions (You have read <a href="https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/">the previous article</a>, so you should know what I am talking about, right?). The anchor positioning configuration is set to make only one element visible at a time, meaning the others have a size of 0 (the width, the height, or both).</p>
<p>By setting a border, they no longer have a size of 0, so all of them are visible. That’s why you see four strange shapes, but only one is correct and should be visible. To fix this, let’s move the <code>border-shape</code> thing to a pseudo-element and use <code>overflow: hidden</code> on the main element.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; * {
  position: absolute;
  overflow: hidden;
}
.link &gt; *:before {
  content: "";
  position: absolute;
  inset: 0;
  border: 12px solid #556270;
  border-shape: shape(from 0 0,curve to 100% 100% with 100% 0);
}</code>Code language: CSS (css)</pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a1697d-eb9f-7030-9809-f6ef4b54f60a/624e553f916f53bfe0ee2d2bb8d3d98f?height=550&amp;theme-id=1&amp;slug-hash=01a1697d-eb9f-7030-9809-f6ef4b54f60a/624e553f916f53bfe0ee2d2bb8d3d98f&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Better but still not perfect. The start and end of the curve aren’t perfectly centered within the circles, and the curve disappears when the circles align horizontally or vertically.</p>
<figure><img alt="Abstract illustration showing three circles in different sizes and colors: two larger teal circles, one smaller orange circle, with a curved line connecting a red dot to an orange circle." data-recalc-dims="1" sizes="(max-width: 878px) 100vw, 878px" src="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/wEI8KfVQ.png?w=878&amp;quality=80&amp;ssl=1" srcset="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/wEI8KfVQ.png?w=878&amp;quality=80&amp;ssl=1 878w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/wEI8KfVQ.png?resize=300%2C125&amp;quality=80&amp;ssl=1 300w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/wEI8KfVQ.png?resize=768%2C321&amp;quality=80&amp;ssl=1 768w"/><figcaption>Abstract illustration showing three circles in different sizes and colors: two larger teal circles, one smaller orange circle, with a curved line connecting a red dot to an orange circle.</figcaption></figure>
<p>To fix the alignment, we can add <code>border-box</code> as a second value to <code>border-shape</code>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; *:before {
  border: 12px solid #556270;
  /* we add border-box at the end */
  border-shape: shape(from 0 0,curve to 100% 100% with 100% 0) border-box;
}</code>Code language: CSS (css)</pre>
<p>This will change the reference compared to the default behavior:</p>
<figure><img alt="Comparison of two box model settings in CSS: half-border-box (default) on the left with rounded corners, and border-box on the right with sharp corners." data-recalc-dims="1" sizes="(max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/CmT475LI.png?w=1096&amp;quality=80&amp;ssl=1" srcset="https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/CmT475LI.png?w=1096&amp;quality=80&amp;ssl=1 1096w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/CmT475LI.png?resize=300%2C104&amp;quality=80&amp;ssl=1 300w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/CmT475LI.png?resize=1024%2C355&amp;quality=80&amp;ssl=1 1024w, https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/CmT475LI.png?resize=768%2C266&amp;quality=80&amp;ssl=1 768w"/><figcaption>Comparison of two box model settings in CSS: half-border-box (default) on the left with rounded corners, and border-box on the right with sharp corners.</figcaption></figure>
<p>Our shape is a line with a thickness equal to <code>border-width</code>. By default, that line is placed in a way to match the border area (don’t ask me why it’s called half-border-box). By using <code>border-box</code>, the midpoint of the line will start at the top-left corner of the element. If the line were straight, it would be half outside and half inside. You can clearly notice this behavior at the start and end of the curve.</p>
<p>This fixes the alignment issue:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16a91-6c0c-7e1a-ac98-46aa60c03b8d/801619979f0caf9bb4bc9fe56e8f0a91?height=550&amp;theme-id=1&amp;slug-hash=01a16a91-6c0c-7e1a-ac98-46aa60c03b8d/801619979f0caf9bb4bc9fe56e8f0a91&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Ah, <code>overflow: hidden</code> is hiding the outside part of the shape, which is not good. We need something different.</p>
<p>I will toggle the opacity of the pseudo-element based on the element size:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link * {
  container-type: size;
}
.link *:before {
  opacity: calc(sign(1cqw)*sign(1cqh));
}</code>Code language: CSS (css)</pre>
<p>It’s the same technique I used in the first article:</p>
<blockquote> <p>If either the width or the height of the element is <code>0</code>, it means that either <code>1cqh</code> or <code>1cqw</code> will be <code>0</code>. <code>sign()</code> of <code>0</code> is also <code>0</code> hence we get <code>opacity: 0</code> (invisible).</p> </blockquote>
<p>We can do the same with the display property if we combine it with <code>if()</code>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link * {
  container-type: size;
}
.link *:before {
  display: if(style(calc(sign(1cqw)*sign(1cqh)) = 0):none);
}</code>Code language: CSS (css)</pre>
<p>The latter is more robust because it removes the element completely, avoiding weird overflow issues caused by invisible elements. I will remind you about this when we face such an issue.</p>
<p>Now, we are good!</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16ace-272a-7f55-9710-8011d77456fb/3d7c18bf79d9690c08e93962c9e40e59?height=550&amp;theme-id=1&amp;slug-hash=01a16ace-272a-7f55-9710-8011d77456fb/3d7c18bf79d9690c08e93962c9e40e59&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Good but still not perfect. If you drag the circles around, you will notice that the curve gets misaligned at some points, and there is a weird jump when moving from one area to another. This is again because of the border.</p>
<p>The pseudo-element has a border width equal to <code>12px</code>, meaning that its width/height cannot be smaller than <code>24px</code>. When the main element shrinks from <code>24px</code> to <code>0px</code>, the pseudo-element will overflow, and we get that weird misalignment.</p>
<p>Since we cannot avoid that overflow, let’s keep it consistent all the time. Instead of using <code>inset: 0</code>, we use <code>inset: -12px</code>. This means the pseudo-element’s border always overflows the main element. This will shift the position of the curve, but we can fix that by changing <code>border-box</code> to <code>padding-box</code>.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; *:before {
  inset: -12px; /* instead of inset: 0 */
  border: 12px solid #556270;
  /* we add padding-box at the end */
  border-shape: shape(from 0 0,curve to 100% 100% with 100% 0) padding-box;
}</code>Code language: CSS (css)</pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16adb-4eb0-7132-b829-e0b1fd832b7f/ec2a60c130bc18c9fe36eb058e4dcc05?height=550&amp;theme-id=1&amp;slug-hash=01a16adb-4eb0-7132-b829-e0b1fd832b7f/ec2a60c130bc18c9fe36eb058e4dcc05&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Now, it’s perfect! The curve links both circles from their centers, and everything remains aligned when you update the circles’ positions.</p>
<p>Getting the correct position was a bit tricky, so I wanted to highlight the process I followed to align everything perfectly. If you are a bit lost, don’t worry; I struggled to find the right configuration too. Give it another read and play with the demos to better understand each fix.</p>
<h2>Improving the Shape</h2>
<p>The shape I used was “ugly”, right? I know. It was only a temporary one to get the implementation done, but now we can update it with whatever we want. The good news is that we just need to update the <code>shape()</code> value without touching the rest of the code.</p>
<p>Let’s try the following:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%)</code>Code language: CSS (css)</pre>
<p>This time, I draw a first curve from the top-left corner to the middle, then use the <code>smooth</code> command to draw a second curve that mirrors the first one to the bottom-right corner.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16af0-4e70-75d4-b4af-ddc7fabdb7da/fcde811c31ebc392822cf3d51c42932a?height=550&amp;theme-id=1&amp;slug-hash=01a16af0-4e70-75d4-b4af-ddc7fabdb7da/fcde811c31ebc392822cf3d51c42932a&amp;default-tab=result">View content ↗ </a></p></figure>
<p>A lot better!</p>
<p>We can still go fancier and update the shape based on the distance between the two circles.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; *:before {
  border-shape: if(
    style((100cqw &lt; 200px) or (100cqh &lt; 200px)):
     shape(from 0 0,line to 100% 100%);
    else:
     shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%);)
   padding-box;
}</code>Code language: CSS (css)</pre>
<p>If the vertical or horizontal distance (defined by <code>100cqw</code> and <code>100cqh</code>) is less than <code>200px</code>, we transform the shape into a straight line. Otherwise, we keep the previous curve.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16af5-da94-76a1-8fbe-f67be6129f74/f25701e9d7826c4d5825b06e4c5767bd?height=550&amp;theme-id=1&amp;slug-hash=01a16af5-da94-76a1-8fbe-f67be6129f74/f25701e9d7826c4d5825b06e4c5767bd&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Here is an even better way to achieve the same thing:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; *:before {
  border-shape: if(
    style((100cqw &lt; 200px) or (100cqh &lt; 200px)):
     shape(from 0 0,curve to 50% 50% with 0   0,smooth to 100% 100%);
    else:
     shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%);)
   padding-box;
}</code>Code language: CSS (css)</pre>
<p>Instead of changing the shape completely, we keep the same structure and update some values. By changing the <code>with</code> and making it equal to the initial point, the curve becomes a straight line.</p>
<p>It sounds more complex than the first one, but this code lets us have a smooth transition between both shapes since they share the same structure!</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16afa-7fab-77f3-bc8d-f028da3a76f5/4630297dbfa45561fe30a0041c7dedba?height=550&amp;theme-id=1&amp;slug-hash=01a16afa-7fab-77f3-bc8d-f028da3a76f5/4630297dbfa45561fe30a0041c7dedba&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Do you see the potential of this technique? Not only can we easily draw complex curves with <code>shape()</code>, but we can also update them conditionally based on the distance between the two elements using <code>if()</code> and container query units. For this reason, there will be a third article to complete this series with more examples and more shapes!</p>
<p>What about the extremities of the line? Can we make them look better?</p>
<p>Yes, we can. For that, we have the other pseudo-element we can use to draw the extremities using <code>shape()</code> or any other technique depending on your needs.</p>
<p>Here is an example where I am applying the same CSS to both pseudo-elements. Then each one will have its own <code>border-shape</code> configuration.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16d05-898d-7880-931a-6a0704ec6ac8/63161b595a5b15f205cb1e4c78b7f0f3?height=550&amp;theme-id=1&amp;slug-hash=01a16d05-898d-7880-931a-6a0704ec6ac8/63161b595a5b15f205cb1e4c78b7f0f3&amp;default-tab=result">View content ↗ </a></p></figure>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link &gt; *:before,
.link &gt; *:after {
  content: "";
  position: absolute;
  inset: -12px;
  border: 12px solid #556270;
  display: if(style(calc(sign(1cqw)*sign(1cqh)) = 0):none);
  /* draw the curved line */
  border-shape: if(
    style((100cqw &lt; 200px) or (100cqh &lt; 200px)):
     shape(from 0 0,curve to 50% 50% with 0   0,smooth to 100% 100%);
    else:
     shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%);)
   padding-box;
  transition: border-shape .3s;
}
.link &gt; *:after {
  /* draw two circles */
  border-shape: 
    shape(from 6px 0,arc by 0 .1px of 6px large,
      move to calc(100% + 6px) 100%,arc by 0 .1px of 6px large) 
    padding-box
}</code>Code language: CSS (css)</pre>
<p>How am I creating the circles? This will be your homework. Try to dissect the <code>shape()</code> value to understand how one arc command can simulate a circle. Mastering <code>shape()</code> is crucial for this technique because it allows you to easily create complex connections, so don’t hesitate to learn more about it (<a href="https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/">my four-article series</a> is a good starting point).</p>
<p>Here is another example with arrow shapes.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/editor/anon/embed/01a16da0-dd4f-747d-a905-fa97115de366/883ccdd7cf2ad87e6425ac667b2e5aec?height=550&amp;theme-id=1&amp;slug-hash=01a16da0-dd4f-747d-a905-fa97115de366/883ccdd7cf2ad87e6425ac667b2e5aec&amp;default-tab=result">View content ↗ </a></p></figure>
<p>This time, I am getting back to <code>clip-path</code> but still using <code>shape()</code> to create the arrows:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.link {
  --s: 25px; /* size of arrow */
  --t: 12px; /* line thickness */
}
.link &gt; *:before,
.link &gt; *:after {
  --a: atan(100cqh/100cqw);
  --d: calc(var(--s)/sqrt(2));
  display: if(style(calc(sign(1cqw)*sign(1cqh)) = 0):none);
}
.link &gt; *:before {
  inset: calc(-1*var(--t));
  border: var(--t) solid #556270;
  border-shape: if(
    style((100cqw &lt; 200px) or (100cqh &lt; 200px)):
     shape(from calc(var(--d)*cos(var(--a))) calc(var(--d)*sin(var(--a))),
          line to calc(100% - calc(var(--d)*cos(var(--a)))) 
                  calc(100% - calc(var(--d)*sin(var(--a)))));
    else:
     shape(from var(--d) 0,curve to 50% 50% with 50% 0,smooth to calc(100% - var(--d)) 100%);)
   padding-box;
}
.link &gt; *:after {
  inset: 0;
  border-image: conic-gradient(#556270 0 0) fill 0//99px;
  clip-path: if(
    style((100cqw &lt; 200px) or (100cqh &lt; 200px)):
        shape(from 0 0, 
           line to calc(var(--s)*cos(var(--a) - 45deg)) calc(var(--s)*sin(var(--a) - 45deg)),
           line to calc(var(--s)*cos(var(--a) + 45deg)) calc(var(--s)*sin(var(--a) + 45deg)),
          move to 100% 100%, 
           line to calc(100% - var(--s)*cos(var(--a) - 45deg)) calc(100% - var(--s)*sin(var(--a) - 45deg)),
           line to calc(100% - var(--s)*cos(var(--a) + 45deg)) calc(100% - var(--s)*sin(var(--a) + 45deg))
         );
    else:
        shape(from 0 0, 
            line to var(--d) calc(-1*var(--d)),
            line to var(--d) var(--d),
          move to 100% 100%, 
            line to calc(100% - var(--d)) calc(100% - var(--d)),
            line to calc(100% - var(--d)) calc(100% + var(--d))
         ););
}</code>Code language: CSS (css)</pre>
<p>But the code is unreadable?! What the heck is this?</p>
<p>I know, I know. I said we’d keep things simple, but I cannot miss the chance to show what this technique can do. By introducing CSS variables and math functions, we can create complex-looking shapes with precision.</p>
<h2>Conclusion</h2>
<p>Let’s stop here for this article. We will explore more examples in the next one. Until then, take the time to study the technique and how everything works. It has three parts: the anchor positioning configuration (explained in the first article), the <code>border-shape</code> configuration with the fixes to keep everything perfectly aligned, and the shape creation using <code>shape()</code>.</p>
<p>Don’t be discouraged by the complexity of the <code>shape()</code> function. It’s one of those features that takes a lot of practice to get used to.</p>
<h3>Article Series</h3>
<p>Drawing an line with arrows pointing to the center of two arbitrary elements measuring and displaying the distance between them doesn't seem like it would be possible in CSS alone... but...</p>
<p>In a previous article, we created flower-like shapes using modern CSS (mask, trigonometric functions, etc). This article is a follow-up where we will create a similar shape and also introduce some fancy animations. Here is a demo of what we are building. Hover the image to see the animation CodePen…</p>
<p>Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through…</p>
<p>Master.dev donates to open source projects through <a href="https://thanks.dev/d/gh/frontendmasters/dependencies">thanks.dev</a> and <a href="https://opencollective.com/frontendmasters">Open Collective</a>, as well as donates to non-profits like <a href="https://thelastmile.org/">The Last Mile</a>, <a href="https://anniecannons.org/">Annie Canons</a>, and <a href="https://vetswhocode.io/">Vets Who Code</a>.</p>
