---
author: MDN Web Docs
cover_image: 'https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png'
date: '2025-12-12T07:32:16.789Z'
dateFolder: 2025/12/12
description: >-
  The sibling-index() CSS function returns an integer representing the position
  of the current element in the DOM tree relative to all its sibling elements.
  The returned value is the index number of the contextual child's position
  among all the sibling elements within a parent element, with the first child
  returning 1 and the last child, returning the length of Element.children.
isBasedOn: >-
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index
link: >-
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index
slug: 2025-12-12-httpsdevelopermozillaorgen-usdocswebcssreferencevaluessibling-index
tags:
  - code
title: sibling-index()
---
<p>The <strong><code>sibling-index()</code></strong> <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a> <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Functions">function</a> returns an integer representing the position of the current element in the DOM tree relative to all its sibling elements. The returned value is the index number of the contextual child's position among all the sibling elements within a parent element, with the first child returning <code>1</code> and the last child, returning the <code>length</code> of <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/children"><code>Element.children</code></a>.</p>
<p><strong>Note:</strong> Like the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child"><code>:nth-child()</code></a> pseudo-class, <code>sibling-index()</code> starts from 1, not 0.</p>
<p><strong>Note:</strong> The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/counter"><code>counter()</code></a> function provides a similar result but it returns a <code>&lt;string&gt;</code> (which is more suitable for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Generated_content">generated content</a>, while <code>sibling-index()</code> returns an <code>&lt;integer&gt;</code> (which can be used for calculations).</p>
<h2><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index/#try_it">Try it</a></h2>
<p>The <code>sibling-index()</code> function doesn't accept parameters.</p>
<p>An integer; the position of the current element in the DOM tree's sibling order.</p>
<h2><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index/#examples">Examples</a></h2>
<p>This example demonstrates how to dynamically increase the width of each <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/li"><code>&lt;li&gt;</code></a> item in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul"><code>&lt;ul&gt;</code></a> by <code>50px</code>.</p>
<h4>CSS</h4>
<h4>Results</h4>
<p>Combining <code>sibling-index()</code> with CSS animations opens new possibilities. In this example, the opacity of elements in sequential order by setting an <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-delay"><code>animation-delay</code></a> based on their order in the DOM.</p>
<h4>HTML</h4>
<p>We include a container element with four children:</p>
<h4>CSS</h4>
<p>We apply the <code>fade-in</code> animation to each element. We use the <code>sibling-index()</code> function within a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc"><code>calc()</code></a> function to set the duration of the <code>animation-delay</code> based on the source element's position in the source order. The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-fill-mode"><code>animation-fill-mode</code></a> applies the animation's <code>0%</code> keyframe until the <code>animation-duration</code> expires.</p>
<pre><code>ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  animation-name: fade-in;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
  animation-delay: calc(1s * sibling-index());
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</code></pre>
<h4>Results</h4>
<figure></figure><p> <a href="https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started">Learn how to contribute</a> </p>
