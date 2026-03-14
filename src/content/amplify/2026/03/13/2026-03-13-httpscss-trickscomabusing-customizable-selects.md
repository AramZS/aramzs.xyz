---
author: CSS-Tricks
cover_image: 'https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/custom-select.webp'
date: '2026-03-14T00:34:20.784Z'
dateFolder: 2026/03/13
description: >-
  Let’s go over a few demos using the new customizable <select> feature that may
  be wild, but also give us a great chance to learn new things in CSS.
isBasedOn: 'https://css-tricks.com/abusing-customizable-selects/'
link: 'https://css-tricks.com/abusing-customizable-selects/'
slug: 2026-03-13-httpscss-trickscomabusing-customizable-selects
tags:
  - code
title: Abusing Customizable Selects
---
<p>Web browsers ship new features all the time, but what fun is it if we can’t build silly and fun things with them?</p>
<p>In this article, let’s go over a few demos that I’ve made by using <a href="https://css-tricks.com/the-selectmenu-element-is-no-morelong-live-select/">the new customizable <code>&lt;select&gt;</code> feature</a>, and walk through the main steps and techniques that I’ve used to implement them.</p>
<p>I hope they get you as excited as I am about custom selects, and give you just about enough knowledge to get started creating your own. Yours might be more, you know, useful than mine, and probably for good reasons, but I like going a little bit overboard on silly ideas because that gives me a better chance to learn.</p>
<p>Before we start, a word about browser support: the demos in this article only run on recent Chromium-based browsers because that’s where customizable selects are implemented right now. However, this feature is designed in a way that doesn’t break non-supporting browsers. After all, a customized <code>&lt;select&gt;</code> element is still a <code>&lt;select&gt;</code> element. So, if the browser you’re using doesn’t support customizable selects, you’ll just see normal selects and options in these demos, and that’s great. It’ll just be a lot less fun.</p>
<h3>Curved stack of folders</h3>
<p>Let’s get started with the first demo: a stack of folders to pick from, with a twist:</p>
<figure><video controls="" height="964" playsinline="" src="https://css-tricks.com/wp-content/uploads/2026/02/css-tricks-custom-select-folder-stack.mp4" width="744"></video></figure>
<p>We’ll start with some HTML code first. We don’t need a lot of complicated markup here because each option is just the name of the folder. We can draw the folder icons later with CSS only.</p>
<pre data-line=""><code>&lt;select&gt;
  &lt;option value="documents"&gt;&lt;span&gt;Documents&lt;/span&gt;&lt;/option&gt;
  &lt;option value="photos"&gt;&lt;span&gt;Photos&lt;/span&gt;&lt;/option&gt;
  &lt;option value="music"&gt;&lt;span&gt;Music&lt;/span&gt;&lt;/option&gt;
  &lt;option value="videos"&gt;&lt;span&gt;Videos&lt;/span&gt;&lt;/option&gt;
  &lt;option value="downloads"&gt;&lt;span&gt;Downloads&lt;/span&gt;&lt;/option&gt;
  &lt;option value="desktop"&gt;&lt;span&gt;Desktop&lt;/span&gt;&lt;/option&gt;
  &lt;option value="projects"&gt;&lt;span&gt;Projects&lt;/span&gt;&lt;/option&gt;
  &lt;option value="backups"&gt;&lt;span&gt;Backups&lt;/span&gt;&lt;/option&gt;
  &lt;option value="trash"&gt;&lt;span&gt;Trash&lt;/span&gt;&lt;/option&gt;
&lt;/select&gt;</code></pre>
<p>You’ll notice that we’ve used <code>&lt;span&gt;</code> elements inside the <code>&lt;option&gt;</code> elements, to wrap each folder name. That’s going to be useful for styling the selected folder name later. Even though this is just a <code>&lt;span&gt;</code>, being able to do this is quite a big change from what was previously possible.</p>
<p>That’s because, up until very recently, <code>&lt;option&gt;</code>s could only contain text, because that’s the only thing that could appear inside options of a select. The HTML parser has now been relaxed to allow for a lot more HTML elements to be embedded in options. Browsers that don’t support customizable selects will just ignore these extra elements and display the text only.</p>
<p>So, here’s what our stack of folders looks like so far:</p>
<figure><img alt="An unstyled select element with expanded options." data-recalc-dims="1" sizes="(min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-7.png?w=246&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-7.png?w=246&amp;ssl=1 246w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-7.png?resize=131%2C300&amp;ssl=1 131w"/></figure>
<p>Next up, and this is the most important thing you’ll want to do to opt into the customizable select feature: let’s reset the default appearance of the select and its dropdown part, by using the <a href="https://css-tricks.com/almanac/pseudo-selectors/p/picker/"><code>::picker()</code></a> pseudo-element:</p>
<pre data-line=""><code>select,
::picker(select) {
  appearance: base-select;
}</code></pre>
<p>This CSS rule does a lot for us: it unlocks full styling capabilities for the entire select, including its button, dropdown, and options. Without this opt-in, you get a standard select.</p>
<p>Now let’s style the select, starting with its button part. First, we’ll get rid of the picker icon by using the new <a href="https://css-tricks.com/almanac/pseudo-selectors/p/picker-icon/"><code>::picker-icon</code></a> pseudo-element to hide it:</p>
<pre data-line=""><code>select::picker-icon {
  display: none;
}</code></pre>
<p>Next, let’s add a bit more styles to create a nice-looking button:</p>
<pre data-line=""><code>select {
  background: linear-gradient(
    135deg,
    rgba(40, 40, 50, 0.4) 0%,
    rgba(60, 60, 70, 0.25) 50%,
    rgba(50, 50, 60, 0.35) 100%
  );
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.15),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  min-inline-size: 12rem;
}</code></pre>
<p>And here is our new select button:</p>
<figure><img alt="A custom select button with an opaque background, a folder icon, and a text label called Music." data-recalc-dims="1" sizes="(min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-6.png?w=444&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-6.png?w=444&amp;ssl=1 444w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-6.png?resize=300%2C66&amp;ssl=1 300w"/></figure>
<p>Now let’s turn our attention to the dropdown part since this is where the magic happens.</p>
<p>In a select, the dropdown contains all the options and appears when you click on the button. A lot of browser default styles apply to it already to set its <code>position</code>, <code>background-color</code>, <code>margin</code>, and more. So, we’ll have to disable and override a bunch of stuff.</p>
<p>In our demo, we don’t want the dropdown to be visible at all. Instead, we want each individual option (each folder in this case) to appear as if floating above the page, without a container element.</p>
<p>To do this, let’s use the <code>::picker(select)</code> pseudo-element to set our styles:</p>
<pre data-line=""><code>::picker(select) {
  background: transparent;
  border: none;
  box-shadow: none;
  overflow: visible;
}</code></pre>
<p>And with this, the dropdown isn’t visible anymore and it no longer constrains the options or clips them if they overflow the dropdown area.</p>
<p>This gives us the following improvements:</p>
<figure><img alt="A select element with expanded options formatted as text in a single vertical list. An option called music is selected and represents the top picker button which is styled with a folder icon to the left of the text label." data-recalc-dims="1" sizes="(min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-8.png?w=255&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-8.png?w=255&amp;ssl=1 255w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-8.png?resize=168%2C300&amp;ssl=1 168w"/></figure>
<p>It’s now time to turn our attention to the option elements. First, let’s replace the checkmark icon with a little disc icon instead by using the <a href="https://css-tricks.com/almanac/pseudo-selectors/c/checkmark/"><code>::checkmark</code></a> pseudo-element:</p>
<pre data-line=""><code>option::checkmark {
  content: "●";
  color: #222;
}</code></pre>
<p>This pseudo-element makes it easy to change the shape, the color, or even the size of the checkmark.</p>
<p>Let’s also add an additional pseudo-element to each option, by using <code>option::before</code>, to display a folder emoji next to each option. And, with a pinch more CSS fine tuning, we end up with this:</p>
<figure><img alt="A vertical column of folder icons expanded as options from a select element. Each folder includes a label on the right." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-10.png?w=385&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-10.png?w=385&amp;ssl=1 385w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-10.png?resize=141%2C300&amp;ssl=1 141w"/></figure>
<p>We now have a list of folders which floats on top of the page when we click the select button. It works like any other select, too, either with the mouse, or with the keyboard, so we can just thank the browser for maintaining the accessibility of the input while we’re having fun with CSS.</p>
<p>Let’s now apply some CSS transformation to make the stack of folders a little curvy, so it looks cooler.</p>
<p>To achieve this, we’ll need one more piece of new CSS syntax which, unfortunately, isn’t yet widely available: the <a href="https://css-tricks.com/almanac/functions/s/sibling-index/"><code>sibling-index()</code></a> function. This function returns the index of the element within its siblings. The <a href="https://css-tricks.com/almanac/functions/s/sibling-count/"><code>sibling-count()</code></a> function also exists, and it returns the total number of siblings, but we won’t need it here.</p>
<p>Having access to the index of the current element within its siblings means that we can style each option depending on its position within the select dropdown. This is exactly what we need to make the options appear at a gradually larger angle.</p>
<p>Here is the code:</p>
<pre data-line=""><code>option {
  --rotation-offset: -4deg;
  rotate: calc(sibling-index() * var(--rotation-offset));
}</code></pre>
<p>In this code snippet, we first create a custom property called <code>--rotation-offset</code>, which defines the angle by which each option should rotate, with respect to the previous option. We then use this with the <a href="https://css-tricks.com/almanac/properties/r/rotate/"><code>rotate</code></a> property, multiplying its value by <code>sibling-index()</code>. That way, the first option is rotated by -4 degrees, the second one by -8 degrees, the third by -12 degrees, and so on.</p>
<p>Now, that’s not enough on its own to create the illusion of a curved stack of folders because each folder rotates around its own point of origin, which is located in the top-left corner of each folder by default. Right now, we get this:</p>
<figure><img alt="A single column of folder icons with labels on the right. Each folder is slightly rotated more as the list goes down." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-15.png?w=363&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-15.png?w=363&amp;ssl=1 363w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-15.png?resize=126%2C300&amp;ssl=1 126w"/></figure>
<p>Let’s use the <a href="https://css-tricks.com/almanac/properties/t/transform-origin/"><code>transform-origin</code></a> property to set a shared point of origin around which all options will rotate. Because <code>transform-origin</code> is relative to each individual element, we need to use the <code>sibling-index()</code> function again to move all origin points up and to the right so they’re all in the same spot:</p>
<pre data-line=""><code>option {
  --rotation-offset: -4deg;
  rotate: calc(sibling-index() * var(--rotation-offset));
  transform-origin: right calc(sibling-index() * -1.5rem);
}</code></pre>
<p>And with this, we get the following result:</p>
<figure><img alt="A vertical column of folders with labels on the right fanned out and curving towards the right." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-14.png?w=508&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-14.png?w=508&amp;ssl=1 508w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-14.png?resize=172%2C300&amp;ssl=1 172w"/></figure>
<p>The final step is to animate the options. It looks great as it is, but we want the stack of folders to get gradually curved until it reaches its final shape. That’ll make it a lore more lively and fun to interact with.</p>
<p>Let’s reset the option’s rotation by default, and apply a transition with a nice elastic <a href="https://css-tricks.com/almanac/functions/c/cubic-bezier/">easing function</a>:</p>
<pre data-line=""><code>option {
  rotate: 0deg;
  transition: rotate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}</code></pre>
<p>And now, let’s apply the right rotation angle only when the select is open:</p>
<pre data-line=""><code>select:open option {
  rotate: calc(sibling-index() * -1 *  var(--rotation-offset));
}</code></pre>
<p>Unfortunately, the above is not enough. By default, CSS transitions are not triggered when an element appears, which is the case for our options. Thankfully, there’s a fix for this issue: the <a href="https://css-tricks.com/almanac/rules/s/starting-style/"><code>@starting-style</code></a> at-rule. This at-rule lets us define the initial state of the options, making it possible for the transition to play right when the options appear:</p>
<pre data-line=""><code>@starting-style {
  select:open option {
    rotate: 0deg;
  }
}</code></pre>
<p>One more thing to make it even nicer. Let’s delay each transition relative to the previous one to make it look like each folder comes in slightly after the one before it. To achieve this, let’s use the <code>sibling-index()</code> function once more, as a multiplier to a short transition delay:</p>
<pre data-line=""><code>option {
  transition-delay: calc((sibling-index() - 1) * 0.01s);
}</code></pre>
<p>We now have an animated, curved, stack of folders implemented with a <code>&lt;select&gt;</code> element! Check out the demo and code in the next CodePen:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/dPXdgae?height=450&amp;theme-id=1&amp;slug-hash=dPXdgae&amp;default-tab=result">View content ↗ </a></p></figure>
<p>CSS gains a lot of new capabilities each year. I hope this demo walk through helped you get a better understanding of some of these new capabilities. Building it helped me understand a lot of new, to me, concepts. It also got me very excited about the customizable select feature. So much, that I created other demos too. So, let’s look at two more of them. This time though, we’ll go quicker and only highlight the most important parts.</p>
<h3>Fanned deck of cards</h3>
<p>For our second demo, we’ll create a card picker, which opens up in a fanned deck fashion:</p>
<figure><video controls="" height="672" playsinline="" src="https://css-tricks.com/wp-content/uploads/2026/02/css-tricks-custom-select-cards.mp4" width="1060"></video></figure>
<p>The HTML markup for this demo is a little different than for the previous one. Each card has a bit of content to display, so let’s create a couple of <code>&lt;span&gt;</code> elements to each option:</p>
<pre data-line=""><code>&lt;option class="red" value="QH"&gt;
  &lt;span class="rank"&gt;Q&lt;/span&gt;
  &lt;span class="suit"&gt;♥&lt;/span&gt;
&lt;/option&gt;</code></pre>
<p>The other interesting thing about the HTML code we’ll use here, is the addition of an empty <code>&lt;button&gt;</code> element right below the <code>&lt;select&gt;</code> opening tag:</p>
<pre data-line=""><code>&lt;select&gt;
  &lt;button&gt;&lt;/button&gt;
  &lt;option&gt;…&lt;/option&gt;
  &lt;!-- ... --&gt;
&lt;/select&gt;</code></pre>
<p>This empty <code>&lt;button&gt;</code> serves a very specific purpose: it prevents the default <a href="https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/selectedcontent"><code>&lt;selectedcontent&gt;</code></a> behavior from happening.</p>
<p>In a customized select, the browser automatically displays the currently selected option’s content (in this case, the card face) in the button area of the select. And it does this by creating an element named <code>&lt;selectedcontent&gt;</code> which mirrors the selected option. But, in our demo, we want the button to always show the back of the deck of cards, not the selected card. To achieve this, we override the default behavior by introducing our own <code>&lt;button&gt;</code>. This tells the browser not to insert its own <code>&lt;selectedcontent&gt;</code> element and lets us style the <code>&lt;select&gt;</code> element:</p>
<pre data-line=""><code>select {
  background:
    /* Diamond pattern overlay */
    repeating-linear-gradient(45deg,
      transparent,
      transparent 1vmin,
      rgba(255, 255, 255, 0.05) 1vmin,
      rgba(255, 255, 255, 0.05) 2vmin),
    repeating-linear-gradient(-45deg,
      transparent,
      transparent 1vmin,
      rgba(255, 255, 255, 0.05) 1vmin,
      rgba(255, 255, 255, 0.05) 2vmin),
    /* Base gradient */
    linear-gradient(135deg, #8b0000 0%, #dc143c 50%, #8b0000 100%);
}</code></pre>
<figure><img alt="A single card with its back showing in red." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-13.png?w=703&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-13.png?w=703&amp;ssl=1 703w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-13.png?resize=300%2C221&amp;ssl=1 300w"/></figure>
<p>Now, for the dropdown part, just like in the previous demo, we don’t want the dropdown container element to be visible, so we’ll also override the default background, border, and overflow styles like we did before.</p>
<p>More importantly, the position of the deck of cards, when opened, is very important. We want it to fan out from the deck itself and remain centered above it.</p>
<p>In a customizable select, the dropdown part, i.e., the <code>::picker(select)</code> pseudo-element, is positioned relative to the button part thanks to <a href="https://css-tricks.com/css-anchor-positioning-guide/">anchor positioning</a>, which is great because we can override it!</p>
<p>In our case, let’s override the alignment relative to the anchor, which is the button, by using the <a href="https://css-tricks.com/almanac/properties/p/position-area/"><code>position-area</code></a> property:</p>
<pre data-line=""><code>::picker(select) {
  position-area: center center;
  inset: 0;
}</code></pre>
<p>We’re also setting the <code>inset</code> property to <code>0</code> here. This sets all <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> properties to <code>0</code> in a single declaration, which makes the dropdown part able to use the entire available space, rather than being constrained by the browser to appear on the side of the select button.</p>
<p>Finally, let’s make the cards appear side by side, rather than above each other:</p>
<pre data-line=""><code>select:open::picker(select) {
  display: flex;
}</code></pre>
<p>When the select element is open and the options are visible, we now see this:</p>
<figure><img alt="Nice cards lined up in a single row. Each card slightly overlaps." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-9.png?w=937&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-9.png?w=937&amp;ssl=1 937w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-9.png?resize=300%2C93&amp;ssl=1 300w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-9.png?resize=768%2C238&amp;ssl=1 768w"/></figure>
<p>The next step is to rotate each card so the options appear in a fanned out way, with the center card straight, the cards to the left gradually more rotated towards the left, and the cards to the right rotated towards the right.</p>
<p>To do this, you’ve guessed it, we’ll use the <code>sibling-index()</code> property again. We’ll also use the <code>sibling-count()</code> property this time:</p>
<pre data-line=""><code>option {
  --card-fan-rotation: 7deg;
  --card-fan-spread: -11vmin;
  --option-index: calc(sibling-index() - 1);
  --center: calc(sibling-count() / 2);
  --offset-from-center: calc(var(--option-index) - var(--center));

  rotate: calc(var(--offset-from-center) * var(--card-fan-rotation));
  translate: calc(var(--offset-from-center) * var(--card-fan-spread)) 0;
  transform-origin: center 75vmin;
}</code></pre>
<p>In the above code snippet, we’re calculating the offset of each card relative to the center card, and we’re using this to rotate each card by increments of 7 degrees. For example, in a deck with 9 cards, the left-most card (i.e., the first card) will get a -4 offset, and will be rotated by <code>-4 * 7 = -28</code> degrees, while the right-most card will be rotated by 28 degrees.</p>
<p>We also use the <code>translate</code> property to bring the cards close together into a fan, and the `transform-origin` property to make it all look perfect.</p>
<figure><img alt="Nice cards fanned out in a subtle arc." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-11.png?w=937&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-11.png?w=937&amp;ssl=1 937w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-11.png?resize=300%2C107&amp;ssl=1 300w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-11.png?resize=768%2C273&amp;ssl=1 768w"/></figure>
<p>Finally, let’s bring it all together by animating the opening of the deck. To do this, we can define a CSS transition on the custom <code>--card-fan-rotation</code> property. Animating it from 0 to 7 degrees is all we need to create the illusion we’re after. Animating a custom property takes a couple of steps.</p>
<p>First, let’s define the custom property’s type, so that the browser can animate it correctly:</p>
<pre data-line=""><code>@property --card-fan-rotation {
  syntax: '&lt;angle&gt;';
  inherits: false;
  initial-value: 7deg;
}</code></pre>
<p>Second, let’s use a <code>@starting-style</code> at-rule, like in the previous demo, to allow the CSS transition to play when the options appear:</p>
<pre data-line=""><code>@starting-style {
  select:open option {
  --card-fan-rotation: 0deg;
  }
}</code></pre>
<p>Then, set the starting rotation angle when the select element is closed, and define the CSS transition:</p>
<pre data-line=""><code>option {
  --card-fan-rotation: 0deg;
  transition: --card-fan-rotation 0.2s ease-out;
}</code></pre>
<p>And, finally, let’s set the final angle when the select is opened:</p>
<pre data-line=""><code>select:open option {
  --card-fan-rotation: initial;
}</code></pre>
<p>We can use the `initial` value above instead of hard-coding the <code>7deg</code> value again, since it’s already defined as the initial value in the <a href="https://css-tricks.com/almanac/rules/p/property/"><code>@property</code></a> rule above.</p>
<p>That’s it, our deck of cards, with animated opening, is now ready! Check out the complete code and live demo in this CodePen:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/ZYONReV?height=450&amp;theme-id=1&amp;slug-hash=ZYONReV&amp;default-tab=result">View content ↗ </a></p></figure>
<p>It’s amazing to me how far customizable selects allow you to push things. You don’t only get to override the way the button and its options look, you get to change how everything is positioned, and even animated.</p>
<p>Let’s close with one final demo.</p>
<h3>Radial emoji picker</h3>
<figure><video controls="" height="600" playsinline="" src="https://css-tricks.com/wp-content/uploads/2026/02/css-tricks-custom-select-emojis.mp4" width="600"></video></figure>
<p>Just like in the previous demo, here we want the emojis to be centered around the select button. To achieve this, let’s override the default anchor positioning of the dropdown part.</p>
<p>This time, we’ll use the <a href="https://css-tricks.com/almanac/functions/a/anchor/"><code>anchor()</code></a> function to set the top and left coordinates of the dropdown container:</p>
<pre data-line=""><code>::picker(select) {
  top: calc(anchor(top) - var(--radius));
  left: calc(anchor(left) - var(--radius));
  width: calc(var(--radius) * 2 + var(--option-size));
  height: calc(var(--radius) * 2 + var(--option-size));
}</code></pre>
<p>In this code snippet, the <code>--radius</code> property is the radius of the circle of emojis. And, since customizable selects already use anchor positioning, we can use the <code>anchor()</code> function to position the dropdown relative to the button.</p>
<p>Now we need to position the options in a circle, inside the dropdown. As it turns out, CSS knows trigonometry now, too, so we’ll use the <a href="https://css-tricks.com/almanac/functions/c/cos/"><code>cos()</code></a> and <a href="https://css-tricks.com/almanac/functions/s/sin/"><code>sin()</code></a> functions together with the <code>sibling-index()</code> and <code>sibling-count()</code> functions:</p>
<pre data-line=""><code>option {
  position: absolute;
  --angle: calc((sibling-index() - 2) * (360deg / (sibling-count() - 1)) - 90deg);
  top: 50%;
  left: 50%;
  translate:
    calc(-50% + cos(var(--angle)) * var(--radius)) calc(-50% + sin(var(--angle)) * var(--radius));
}</code></pre>
<p>And there we are:</p>
<figure><img alt="Circular options with icons around another circular item in the center with a star icon." data-recalc-dims="1" sizes="auto, (min-width: 735px) 864px, 96vw" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-12.png?w=496&amp;ssl=1" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-12.png?w=496&amp;ssl=1 496w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-12.png?resize=285%2C300&amp;ssl=1 285w"/></figure>
<p>The final demo also contains a bit of code for animating the opening of the options, but we won’t dig into the details in this article.</p>
<p>To learn more and play with the live demo, check out this CodePen:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://codepen.io/anon/embed/preview/PwzvBGB?height=450&amp;theme-id=1&amp;slug-hash=PwzvBGB&amp;default-tab=result">View content ↗ </a></p></figure>
<h3>Wrapping up</h3>
<p>That’s it for now. I hope these demos have given you a bit more of an understanding for how customizable selects are customized, and some excitement for actually using the feature in a real project.</p>
<p>Keep in mind, even when customized, the element is still a <code>&lt;select&gt;</code> and will work just fine in non-supporting browsers. So, even if the feature is still in its early days, you can use it as a great progressive enhancement.</p>
