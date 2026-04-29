---
author: Amit Sheen
cover_image: 'https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9400'
date: '2026-04-28T14:52:43.925Z'
dateFolder: 2026/04/28
description: >-
  An experimental API let's us put HTML within those opening and closing canvas
  tags and render it to the canvas, while remaining interactive. Lots of
  possibility here! 
isBasedOn: >-
  https://frontendmasters.com/blog/the-web-is-fun-again-first-experiments-with-html-in-canvas/
link: >-
  https://frontendmasters.com/blog/the-web-is-fun-again-first-experiments-with-html-in-canvas/
slug: >-
  2026-04-28-httpsfrontendmasterscomblogthe-web-is-fun-again-first-experiments-with-html-in-canvas
tags:
  - code
  - tech
  - design
title: 'The Web Is Fun Again: First Experiments with HTML in Canvas'
---
<figure><img alt="Amit Sheen" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/06/TKAPXJpv_400x400.jpg?fit=96%2C96&amp;ssl=1"/><figcaption>Amit Sheen</figcaption></figure>
<p>Every once in a while, the platform drops something that makes you want to build strange demos again, or at least weirder ones. The <a href="https://github.com/WICG/html-in-canvas">new HTML in Canvas API</a> is a perfect example of one of those moments.</p>
<p>The promise is simple and exciting: take native HTML, render it into canvas workflows, and then apply visual effects with 2D Canvas, WebGL, or WebGPU. In other words, you can keep real semantic elements in your markup while treating their rendered output as pixels.</p>
<p><strong>Support Status (Important)</strong></p>
<p>To enable it, go to <code>chrome://flags/#canvas-draw-element</code> and turn on the “Canvas Draw Element” flag. After enabling, you can start experimenting with the API in your local environment.</p>
<p>As of now, this API is still experimental, only available in Chromium-based browsers (146+) and behind a flag. That means you need to enable it manually to experiment with it, and it is not yet a production-ready feature.</p>
<p>The main demos below have a collapsed video after them so you can see the effect if you happen to be in a non-supporting browser.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/EagOyyK/e82acffbffe52508b5691bcae49a5aab?height=450&amp;theme-id=1&amp;slug-hash=EagOyyK/e82acffbffe52508b5691bcae49a5aab&amp;default-tab=result">View content ↗ </a></p></figure>
<details><summary>Video</summary> <figure> <p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://videopress.com/embed/GS825p1k?cover=1&amp;autoPlay=0&amp;controls=1&amp;loop=0&amp;muted=0&amp;persistVolume=1&amp;playsinline=0&amp;preloadContent=metadata&amp;useAverageColor=1&amp;hd=0">View content ↗ </a></p> </figure> </details>
<p>This combination of HTML rendering and semantics, with Canvas’s visual freedom and shader-style effects, feels like a missing piece we have wanted for years.</p>
<p>To understand the HTML in Canvas APIs, we’ll start with a simple example that demonstrates the core concepts.</p>
<p>Let’s start with a plain <code>div</code> that contains real content: a heading, a card, a short paragraph, and a tiny form with an input and a button, so we’ll have some interactive elements to play with.</p>
<pre data-shcb-language-name="HTML, XML" data-shcb-language-slug="xml"><code>&lt;div class="content"&gt;
  &lt;h1&gt;HTML in Canvas&lt;/h1&gt;
  &lt;div class="card"&gt;
    &lt;p&gt;...text&lt;/p&gt;
    &lt;form&gt;
      &lt;input type="text" placeholder="name"&gt;
      &lt;button&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/xbEQOOE/ab2a0337c735df78eada1f0c16556e8f?height=450&amp;theme-id=1&amp;slug-hash=xbEQOOE/ab2a0337c735df78eada1f0c16556e8f&amp;default-tab=result">View content ↗ </a></p></figure>
<p>This is just regular HTML and CSS. Nothing special yet.</p>
<p>Now, to render that content inside a canvas, we wrap it with <code>&lt;canvas&gt;</code>:</p>
<pre data-shcb-language-name="HTML, XML" data-shcb-language-slug="xml"><code>&lt;canvas width="500" height="300" layoutsubtree&gt;
  &lt;div class="content"&gt;
    ... content ...
  &lt;/div&gt;
&lt;/canvas&gt;</code></pre>
<p>Notice that I added the <code>layoutsubtree</code> attribute to the canvas, <strong>this is mandatory for the HTML-in-Canvas API to work</strong>, as this attribute opts canvas descendants into layout and hit testing so they behave like real DOM content. In practice, <code>layoutsubtree</code> is the opt-in switch that turns your canvas children into a proper render source for the HTML-in-Canvas pipeline.</p>
<p>Putting content inside the canvas means it is treated as real DOM elements, and you can interact with them as usual, but they are not rendered (i.e., they are ‘invisible’) until you explicitly draw them into the canvas.</p>
<p>Now let’s wire up the JavaScript APIs. First, we need to get references to the canvas, its 2D context, and the content element we want to draw:</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const content = canvas.querySelector('.content');</code></pre>
<p>Next, we need to trigger the <code>canvas.requestPaint()</code> for the browser to fire a <code>paint</code> event. It’s important to call <code>requestPaint()</code> at least once to kickstart the rendering pipeline, even if nothing changed yet, as it gives us the initial snapshot of the content. Without this initial call, you may have no paint event yet, and no frame to draw from.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>canvas.requestPaint();</code></pre>
<p>And finally, we set up the <code>paint</code> event listener to draw the content into the canvas. This is your render callback for HTML-in-Canvas: when paint happens, this is where you copy DOM rendering into canvas pixels.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>canvas.addEventListener('paint', () =&gt; {
  ctx.reset();
  ctx.drawElementImage(content, 0, 0);
});</code></pre>
<p>Inside the <code>paint</code> event listener, we call <code>ctx.drawElementImage(content, 0, 0)</code>. This is the core method of the HTML-in-Canvas API that takes the current rendered output of the specified DOM element (in this case, <code>.content</code>) and draws it into the canvas at the specified coordinates (0, 0).</p>
<p>The <code>ctx.reset()</code> call before it is important to clear any previous drawing state, ensuring that each paint starts with a clean slate. This is especially crucial if you plan to apply transformations or styles in the future, as it prevents unintended carryover from previous frames.</p>
<p>And now we have the (same) content rendered inside the canvas!</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/XJjyeYw/ed4f4061ea4e525c4f21ddc2a849c3f4?height=450&amp;theme-id=1&amp;slug-hash=XJjyeYw/ed4f4061ea4e525c4f21ddc2a849c3f4&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Note that the content is still fully interactive, and you can click the input and button as usual, but their visual representation is now part of the canvas rendering. What you <strong>see</strong> are pixels on a canvas, that are generated from real HTML elements, allowing you to apply any canvas effects or transformations to them as needed.</p>
<p>In the previous example, we set the canvas size explicitly with <code>width="500"</code> and <code>height="300"</code>. If I’m being honest, in all my experiments with this API, size and resizing are the only areas that felt a bit undercooked in its current state, and I hope this area gets smoother over time.</p>
<p>There are two main reasons why sizing here feels different.</p>
<ol> <li>Originally, canvas was not meant to have children. It does not behave like a regular <code>div</code> container, it doesn’t default to <code>width: 100%</code>, and doesn’t know how to grow its height based on its content.</li> <li>The canvas element has its own <code>width</code> and <code>height</code> attributes that define its drawing surface, and these <strong>can be</strong> independent of the size of the content inside it, which can be very confusing at first.</li> </ol>
<p>This means we need to size the canvas intentionally. One option is to use absolute values on the width and height attributes, as in the earlier example, which sets both the element size and the drawing surface size. The other option is to skip fixed attributes, size the canvas dynamically with CSS, and then sync the drawing surface with the element’s rendered size.</p>
<p>The most convenient way to do that is with a simple observer that forwards the element’s external dimensions into the canvas itself:</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>const observer = new ResizeObserver(([entry]) =&gt; {
  canvas.width = entry.devicePixelContentBoxSize[0].inlineSize;
  canvas.height = entry.devicePixelContentBoxSize[0].blockSize;
});
observer.observe(canvas, { box: 'device-pixel-content-box' });</code></pre>
<p>And here is a simple example of a canvas with some responsive cards. The canvas has no explicit size, and is set to <code>width: 100%</code> and <code>height: 100%</code> in the CSS, so it’s adapting to the viewport size. The observer is syncing the canvas drawing surface to match the rendered size of the canvas element, so the pixels are always crisp and not stretched.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/WbGYxRm/6b9541f02a58ce8491d9289bd98a94af?height=450&amp;theme-id=1&amp;slug-hash=WbGYxRm/6b9541f02a58ce8491d9289bd98a94af&amp;default-tab=result">View content ↗ </a></p></figure>
<p>(<a href="https://codepen.io/amit_sheen/pen/WbGYxRm/6b9541f02a58ce8491d9289bd98a94af">Open the demo in a new tab</a> and resize the window to see how the grid adapts.)</p>
<details><summary>Video</summary> <figure> <p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://videopress.com/embed/Orza9FBd?cover=1&amp;autoPlay=0&amp;controls=1&amp;loop=0&amp;muted=1&amp;persistVolume=0&amp;playsinline=1&amp;preloadContent=metadata&amp;useAverageColor=1&amp;hd=0">View content ↗ </a></p> </figure> </details>
<p>So now we have painted pixels on a canvas that represent real elements still sitting in the DOM. But what if we want to move those elements around? What if we want to apply transforms to the canvas, or to the source DOM elements?</p>
<p>The official explainer is very explicit about this: “The canvas’s current transformation matrix is applied when drawing into the canvas. CSS transforms on the source element are <strong>ignored</strong> for drawing (but continue to affect hit testing/accessibility).”</p>
<p>This means that if we apply <code>translate</code> on the source HTML element, interaction moves with that element, but the pixels in the canvas are still drawn from the element’s original drawing position.</p>
<p>On the other hand, if we apply transform on the canvas drawing context itself, the pixels move, but the DOM elements do not, and interaction stays where the elements are in the DOM.</p>
<figure><img alt="" data-recalc-dims="1" sizes="(max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/gSoZIXYc.png?w=1122&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/gSoZIXYc.png?resize=1024%2C319&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/gSoZIXYc.png?resize=300%2C93&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/gSoZIXYc.png?resize=768%2C239&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/gSoZIXYc.png?w=1122&amp;ssl=1 1122w"/></figure>
<p>In the image above, the container on the right has <code>translate: 0 100px</code>, so the DOM elements move down, but in the canvas they are still drawn in their original location. On the left side, the canvas uses <code>ctx.translate(0, 100)</code>, so the drawing moves down, but the DOM elements stay in place.</p>
<p>The fix is to synchronize the transform on both sides. Since the <code>drawElementImage()</code> method returns a transform value, we can set the transform in the canvas, and use the returned value to apply the same transform to the DOM element.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>canvas.addEventListener('paint', () =&gt; {
  ctx.reset();

  /* Add transform to canvas */
  ctx.translate(250, 150);
  ctx.rotate((input.value.length - 30) * Math.PI / 180);
  ctx.translate(-250, -150);

  /* Draw HTML content into canvas and get the transform applied to it. */
  const transform = ctx.drawElementImage(content, 0, 0);

  /* Apply the same transform to the HTML content, so it matches the canvas. */
  content.style.transform = transform.toString();
});</code></pre>
<p>Notice that the rotation is driven by the input’s text length. Click into the input and start typing to see the element rotate. The canvas rendering rotates along with the DOM elements, because the same transform is applied to both, and visuals and interaction stay aligned.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/LERXzJp/c4f61ba29e228a7ebe819c3a1406e7e2?height=450&amp;theme-id=1&amp;slug-hash=LERXzJp/c4f61ba29e228a7ebe819c3a1406e7e2&amp;default-tab=result">View content ↗ </a></p></figure>
<p>And if we’re playing with transforms, I wanted to push that idea a bit further. In the next demo, I mapped the same HTML content between four draggable control points using homography and a bit of math. This one is less about practical UI and more about exploring how far this API can be stretched while still keeping real DOM content in the loop. Feel free to drag the points and play with it.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/ogzQGOL/767a0207778c26cd8e887371a53d125a?height=650&amp;theme-id=1&amp;slug-hash=ogzQGOL/767a0207778c26cd8e887371a53d125a&amp;default-tab=result">View content ↗ </a></p></figure>
<details><summary>Video</summary> <figure> <p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://videopress.com/embed/Up4CNUgg?cover=1&amp;autoPlay=0&amp;controls=1&amp;loop=0&amp;muted=0&amp;persistVolume=1&amp;playsinline=0&amp;preloadContent=metadata&amp;useAverageColor=1&amp;hd=0">View content ↗ </a></p> </figure> </details>
<p>Okay, we turned real elements into pixels on a canvas, but what does that actually give us? Until now, we haven’t really treated pixels as independent units, so let’s start.</p>
<p>The idea here is simple: create an array of all canvas pixels, iterate through it one pixel at a time, and do whatever you want with those values. We’ll begin with a simple example of replacing all pure-green pixels (which we will use for text and borders) with a colorful gradient based on their position.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.content {
  /* Pure green text and border */
  color: #0f0;
  border: 4px solid currentColor;
}</code></pre>
<p>To get the pixel array, we call <code>getImageData</code> inside the <code>paint</code> event listener, right after drawing the HTML content into the canvas.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>canvas.addEventListener('paint', () =&gt; {
  // First draw the HTML content into the canvas
  ctx.reset();
  ctx.drawElementImage(content, 0, 0);

  // Then read the pixels from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
});</code></pre>
<p>Remember! <code>data</code> is now an array where each pixel is represented by 4 cells: red, green, blue, and alpha (opacity). So the array length is 4 times the number of pixels in the canvas.</p>
<p><code>data.length === canvas.width * canvas.height * 4</code></p>
<p>Now we can loop through all pixels. Notice that we increment by 4 each time, so every iteration handles one full pixel.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>for (let i = 0; i &lt; data.length; i += 4) {
  ...
}</code></pre>
<p>Inside that loop, we can do anything. For this example, we’ll check each of the RGB values to see if the pixel is pure green (<code>#0f0</code>), and if it is, we will calculate a new color based on the pixel’s position, and create a colorful gradient.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>for (let i = 0; i &lt; data.length; i += 4) {

  // Check if the pixel is pure green (#0f0)
  if (data[i] === 0 &amp;&amp; data[i + 1] === 255 &amp;&amp; data[i + 2] === 0) {

    // Calculate the pixel's position
    const pixelX = (i / 4) % canvas.width;
    const pixelY = Math.floor((i / 4) / canvas.width);
  
    // Calculate a hue based on the pixel's position and convert it to RGB
    const hue = (pixelX + pixelY) % 360;
    const [r, g, b] = hslToRgb(hue);
  
    // Replace the green pixel with the new color
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
}</code></pre>
<p>And after we finish updating the values in <code>data</code>, we need to draw the updated pixels back into the canvas with <code>putImageData</code>:</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// Draw the modified pixels into the canvas
ctx.putImageData(imageData, 0, 0);</code></pre>
<p>And here is the result. Note that input and button are still at their original color, because we didn’t change those elements’ color.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/ogzQoNY/6ea679c8ea5e624d056a8fb04fcc0548?height=450&amp;theme-id=1&amp;slug-hash=ogzQoNY/6ea679c8ea5e624d056a8fb04fcc0548&amp;default-tab=result">View content ↗ </a></p></figure>
<p>If you inspect the elements, you will see that the text and borders are still just green in the DOM, but on the canvas, they have been replaced with a colorful gradient.</p>
<p>Okay, so we changed the color of each pixel, and that’s cool, but when we talk about pixel manipulation, we usually want to see them move.</p>
<p>The key issue here is that pixels are not elements. They are just values in an array. You cannot call <code>translate()</code> on them and move them somewhere else. To “move” a pixel, you simply draw its value into a different pixel.</p>
<p>Because JavaScript is asynchronous and the loop iterates over pixels one by one, we don’t want to mutate the source while we are still reading from it. A common best practice is to keep a buffer copy of the original data as a stable reference, then write the new values into <code>data</code>.</p>
<p>We save that buffer in the <code>paint</code> event listener, right after reading from canvas:</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// Read the pixels from the canvas
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

// Save the original pixel data as a source of reference
const originalPixelData = [...data];</code></pre>
<p>Now we can redraw any pixel anywhere. For example, here is a simple X/Y distortion pass: for each pixel, we compute its coordinates, calculate an offset on each axis, use that offset to find a source pixel, and copy the source RGBA into the current pixel.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// Loop through the pixels
for (let i = 0; i &lt; data.length; i += 4) {

  // Calculate the pixel's coordinates
  const pixelX = (i / 4) % canvas.width;
  const pixelY = Math.floor((i / 4) / canvas.width);

  // Calculate the wave offset for this pixel based on its coordinates
  const offsetX = waveSize[0] * Math.cos(((pixelX % waveSpacing[0]) / waveSpacing[0]) * 2 * Math.PI);
  const offsetY = waveSize[1] * Math.sin(((pixelY % waveSpacing[1]) / waveSpacing[1]) * 2 * Math.PI);

  // Calculate the coordinates of the source pixel
  const newX = Math.max(0, Math.min(canvas.width - 1, pixelX + Math.round(offsetX)));
  const newY = Math.max(0, Math.min(canvas.height - 1, pixelY + Math.round(offsetY)));

  // Calculate the index of the source pixel in the original pixel data array
  const newIndex = (newY * canvas.width + newX) * 4;

  // Save the offset pixel values from the original pixel data
  data[i] = originalPixelData[newIndex];
  data[i + 1] = originalPixelData[newIndex + 1];
  data[i + 2] = originalPixelData[newIndex + 2];
  data[i + 3] = originalPixelData[newIndex + 3];
}</code></pre>
<p>And here is the result:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/Kwgryqj/630bdabade0956d21074c2e57eac0429?height=450&amp;theme-id=1&amp;slug-hash=Kwgryqj/630bdabade0956d21074c2e57eac0429&amp;default-tab=result">View content ↗ </a></p></figure>
<p>One of the most common things to do once you start moving pixels around, is to add some mouse interaction. This is pretty straightforward: listen to <code>mousemove</code>, get the mouse position relative to the canvas, and use that data however you like.</p>
<p>The big difference here is that the render loop is no longer driven directly inside the <code>paint</code> event listener. When canvas content changes, we still capture the source data into <code>originalPixelData</code> (same as before), but for the actual pixel remap we now need live mouse coordinates, so that part runs inside the <code>mousemove</code> callback.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>canvas.onpaint = (event) =&gt; {
    // Draw the elements and read the pixels from the canvas
    // Save the original pixel data as a source of reference
}

canvas.addEventListener('mousemove', (e) =&gt; {
    // Loop through the pixels
    for (let i = 0; i &lt; data.length; i += 4) {
      // Do stuff based on `e.clientX` and `e.clientY`
    }
    // Draw the modified pixels into the canvas
});</code></pre>
<p>Here is a simple example that calculates the distance of each pixel from the mouse. It is basically the same idea as the previous example, but now we compute the offset relative to the mouse position. If a pixel is outside the effect radius, it keeps its original value.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// Calculate the distance (d) from the mouse to the pixel
const dx = pixelX - e.pageX + 32;
const dy = pixelY - e.pageY + 32;
const d = Math.sqrt(dx * dx + dy * dy);

if (d &lt; effectSize) {

  // Calculate the offset for this pixel
  const offset = Math.sin(Math.sqrt(d / effectSize) * Math.PI) * -10;

  // Calculate the coordinates of the source pixel
  const newX = clamp(pixelX + Math.round(offset * (dx / d)), 0, canvas.width - 1);
  const newY = clamp(pixelY + Math.round(offset * (dy / d)), 0, canvas.height - 1);

// Calculate the index of the source pixel in the original pixel data array
newIndex = (newY * canvas.width + newX) * 4;

} else {
  // If the pixel is outside the wave radius, keep its original color
  newIndex = i;
}</code></pre>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/GgjwyXR/3697eeeb173fa8b909f3dd69ae85af99?height=450&amp;theme-id=1&amp;slug-hash=GgjwyXR/3697eeeb173fa8b909f3dd69ae85af99&amp;default-tab=result">View content ↗ </a></p></figure>
<details><summary>Video</summary> <figure> <p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://videopress.com/embed/7pGz8kaz?cover=1&amp;autoPlay=0&amp;controls=1&amp;loop=0&amp;muted=1&amp;persistVolume=0&amp;playsinline=1&amp;preloadContent=metadata&amp;useAverageColor=1&amp;hd=0">View content ↗ </a></p> </figure> </details>
<p>So far, we have moved things with the mouse, sliders, and even by typing in an input field. But in many cases, we just need continuous motion. For that, we need a render loop that re-calculates pixel values and redraws the canvas every frame.</p>
<p>The basic structure looks like this:</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// Start the animation loop
render(performance.now());

function render(nowMs) {
  // Loop through the pixels and calculate new values
  for (let i = 0; i &lt; data.length; i += 4) {
          ...
  }

  // Then draw the modified pixels into the canvas
  ctx.putImageData(imageData, 0, 0);

  // Request the next animation frame to keep the animation going
  requestAnimationFrame(render);
}</code></pre>
<p><code>nowMs</code> is the current timestamp (in milliseconds) passed automatically by <code>requestAnimationFrame</code> into <code>render(nowMs)</code>, and we can use that value to create time-based animations.</p>
<p>As a simple example, I took the rainbow demo from before, but this time the color is recalculated on every frame based on time.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// Calculate a hue based on the pixel's position and the current time
const hue = (pixelX + pixelY + nowMs * effectSpeed) % 360;</code></pre>
<p>And here is the result:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/VYKVyNJ/684cae02f76e096c0ae6903870ee2ed4?height=450&amp;theme-id=1&amp;slug-hash=VYKVyNJ/684cae02f76e096c0ae6903870ee2ed4&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Of course, these are still just small demos to explain the core ideas behind pixel manipulation. But once the basics click, it becomes very easy to extend them and build original effects on top of them, and I hope this also sparks your own creative itch to experiment and build something weird and wonderful.</p>
<p>When I started playing with this API, it reminded me of an old Daniel Shiffman (Coding train) video where he used pixel manipulation to create a fire effect, and I wondered what it would feel like to do that on real DOM elements.</p>
<p>If you are curious, here is <a href="https://www.youtube.com/watch?v=X0kjv0MozuY">Daniel’s great video</a>, and this is how I implemented the effect on a real text input, utilizing the same pixel manipulation techniques we covered in this post.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/jEMQZMY/8037bb33bb9233be0974cc60cd3bea5f?height=450&amp;theme-id=1&amp;slug-hash=jEMQZMY/8037bb33bb9233be0974cc60cd3bea5f&amp;default-tab=result">View content ↗ </a></p></figure>
<h2>Now for the Serious Stuff: Shaders</h2>
<p>Until now, we were playing. Transforms and pixel manipulation are great up to a certain point, but when you really want to go wild, you call shaders.</p>
<p>Turning native elements into pixels opens the door to the GPU’s raw power via WebGL and WebGPU. These technologies can push visual effects to a completely different level without sacrificing performance.</p>
<p>Explaining shaders in depth is a full article on its own, but at a high level, a shader is just a tiny program that runs on the graphics card and determines how things should be drawn. Instead of manually editing pixels one by one on the CPU, you describe a visual rule, and the GPU applies that rule across huge amounts of pixels in parallel.</p>
<p>If you want a fun visual reference for this idea, there is an old but great Mythbusters demo showing the difference between CPU-style processing (one pixel after another, like we did so far) and GPU-style processing (many pixels in parallel).</p>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/8_ZTvG1WQxM?feature=oembed" type="video/mp4"/></div></figure>
<h2>The Smallest Shader Pipeline</h2>
<p>To understand how to use WebGL with the HTML in Canvas API, let’s start with a minimal setup to get the first shader-based frame on screen. We will build the most basic shader possible, which creates a tinted gradient across the canvas, and then we can extend it with more complex effects.</p>
<p>The flow: capture HTML, feed it into a GPU texture, run a shader, and render the result back to the canvas. Once this flow works, we can experiment with all the wild effects that shader programming allows.</p>
<p>At this stage, we are no longer working with a 2D canvas context. Instead of using <code>ctx</code>, we move to a WebGL context (<code>gl</code>) so the rendering path runs through the GPU.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>const canvas = document.querySelector('canvas');
const content = canvas.querySelector('.content');
const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true });</code></pre>
<p>A basic shader setup consists of four main ingredients: First, we define the “rules” that tell the computer exactly where to place our content and how to color it (Shaders). Second, we translate these rules into a language the graphics card can actually understand (Compile &amp; Link). Third, we set up a flat, invisible surface across the screen to project our image onto (Geometry). Finally, we prepare the image itself so the system knows exactly how to smoothly read and display its pixels on that surface (Texture).</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>// 1. Shaders (Shortened)
const vsSource = `
  attribute vec2 p; varying vec2 v;
  void main() { v = vec2(p.x, -p.y) * 0.5 + 0.5; gl_Position = vec4(p, 0, 1); }
`;
const fsSource = `
  precision mediump float; varying vec2 v; uniform sampler2D u;
  void main() { 
    vec4 c = texture2D(u, v);
    vec3 tint = mix(vec3(1.5, 0.5, 0.5), vec3(0.5, 0.5, 1.5), v.x);
    gl_FragColor = vec4(c.rgb * tint * c.a, c.a); 
  }
`;

// 2. Compile &amp; Link
const program = gl.createProgram();
[vsSource, fsSource].forEach((src, i) =&gt; {
  const s = gl.createShader(i ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  gl.attachShader(program, s);
});
gl.linkProgram(program);
gl.useProgram(program);

// 3. Geometry
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
const pos = gl.getAttribLocation(program, 'p');
gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

// 4. Texture
gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // Required (no mipmaps)</code></pre>
<p>Now that the shader is ready, we can copy the HTML into the canvas on each frame, but this time through the WebGL path. Instead of <code>ctx.drawElementImage(...)</code> (which is a 2D-canvas direct draw call), we upload the element snapshot into a GPU texture with <code>gl.texElementImage2D(...)</code>, and then render that texture with <code>gl.drawArrays(...)</code>.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>function render() {
    gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, content);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}</code></pre>
<p>At this point, if we want a continuous animation, we can schedule the next frame from inside <code>render()</code> by adding <code>requestAnimationFrame(render)</code> at the end of the function. When the output is static, like in this example, calling <code>render</code> from the <code>paint</code> callback is enough.</p>
<pre data-shcb-language-name="JavaScript" data-shcb-language-slug="javascript"><code>canvas.addEventListener('paint', () =&gt; requestAnimationFrame(render));
canvas.requestPaint();</code></pre>
<p>Notice we still schedule rendering for the next frame instead of calling <code>render()</code> directly, to avoid loop-related issues. Also, prefer <code>requestPaint</code>-driven flow and avoid direct render calls when possible, as calling render without a valid paint snapshot can throw errors like “no cached paint record for element”.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/KwgrQqR/a486464a688794e777aa0a0ecdd72b36?height=450&amp;theme-id=1&amp;slug-hash=KwgrQqR/a486464a688794e777aa0a0ecdd72b36&amp;default-tab=result">View content ↗ </a></p></figure>
<h2>Same Pipeline, Wildly Different Shaders</h2>
<p>Now it’s the fun part: once the pipeline is in place, everything opens up. The structure is the same, the tools are the same, and the building blocks are the same, but from there, you can create the wildest shaders you can imagine.</p>
<p>You probably noticed the classic trail ripple demo at the beginning of this post. I have a feeling we are going to see that pattern a lot soon. It is already a great baseline effect, and in a similar style, you can build a much more expressive cursor treatment.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/NPREyzy/1d5636998f0a98a5b2af02c89484789b?height=450&amp;theme-id=1&amp;slug-hash=NPREyzy/1d5636998f0a98a5b2af02c89484789b&amp;default-tab=result">View content ↗ </a></p></figure>
<p>Of course, we are not limited to mouse movement only. We can also react to clicks themselves, like in this demo.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/ZYpmxYd/597373bb1d295feb751ae42bcfa890cc?height=450&amp;theme-id=1&amp;slug-hash=ZYpmxYd/597373bb1d295feb751ae42bcfa890cc&amp;default-tab=result">View content ↗ </a></p></figure>
<details><summary>Video</summary> <figure> <p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://videopress.com/embed/Vkr6onDa?cover=1&amp;autoPlay=0&amp;controls=1&amp;loop=0&amp;muted=0&amp;persistVolume=1&amp;playsinline=0&amp;preloadContent=metadata&amp;useAverageColor=1&amp;hd=0">View content ↗ </a></p> </figure> </details>
<p>And we can even react to drag gestures, then animate the content as if it has physical tension.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/NPREYqL/0a167f6402718992470aa377211551a2?height=450&amp;theme-id=1&amp;slug-hash=NPREYqL/0a167f6402718992470aa377211551a2&amp;default-tab=result">View content ↗ </a></p></figure>
<details><summary>Video</summary> <figure> <p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://videopress.com/embed/NITseV7t?cover=1&amp;autoPlay=0&amp;controls=1&amp;loop=0&amp;muted=0&amp;persistVolume=1&amp;playsinline=0&amp;preloadContent=metadata&amp;useAverageColor=1&amp;hd=0">View content ↗ </a></p> </figure> </details>
<p>We can also go in a softer direction and use subtle ambient effects for atmosphere.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/MYjzVaM/eb4501f32f9d025cf56b8667dd84baf6?height=450&amp;theme-id=1&amp;slug-hash=MYjzVaM/eb4501f32f9d025cf56b8667dd84baf6&amp;default-tab=result">View content ↗ </a></p></figure>
<p>And here is one more, just because I really liked it.</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/dPpQmGv/42adf6e00961d1c6e5b890a30ef6e5ae?height=450&amp;theme-id=1&amp;slug-hash=dPpQmGv/42adf6e00961d1c6e5b890a30ef6e5ae&amp;default-tab=result">View content ↗ </a></p></figure>
<p>If there is one takeaway from all of this, it is that HTML in Canvas is not just a new API; it is a new workflow mindset. We keep real HTML, semantics, forms, and interactions, but we can render the final output as pure pixels and treat the UI as a visual playground.</p>
<p>What excites me most is the range this technology unlocks. It can serve playful demos, expressive interactions, visual storytelling, and many practical UI ideas that were previously awkward to build with traditional rendering paths.</p>
<p>We are still at the beginning, which is exactly why this is the right time to experiment, push boundaries, and publish weird ideas that might become tomorrow’s standard patterns.</p>
<p>So, what is your weird idea?</p>
<p>Also, check out the HiC (HTML-in-Canvas) Showroom with many more effects!</p>
