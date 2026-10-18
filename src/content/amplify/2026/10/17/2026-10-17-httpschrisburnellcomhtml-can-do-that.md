---
author: Chris Burnell
cover_image: 'https://chrisburnell.com/images/favicon-256.png'
date: '2026-10-18T03:09:11.312Z'
dateFolder: 2026/10/17
description: >-
  HTML has been gobbling up swathes of what used to be JavaScript’s remit. This
  page lists a bunch of dynamic functionality that we can now achieve with just
  HTML.
isBasedOn: 'https://chrisburnell.com/html-can-do-that/'
link: 'https://chrisburnell.com/html-can-do-that/'
slug: 2026-10-17-httpschrisburnellcomhtml-can-do-that
tags:
  - tech
title: HTML Can Do That
---
<p>HTML has been gobbling up swathes of what used to be JavaScript’s remit. This page lists a bunch of dynamic functionality that we can now achieve with just HTML.</p>
<h2><code>&lt;dialog&gt;</code></h2>
<details> <summary>Available since March 2022</summary> <ul> <li>Chrome 37+</li> <li>Edge 79+</li> <li>Firefox 98+</li> <li>Opera 24+</li> <li>Safari 15.4+</li> <li>Chrome Android 37+</li> <li>Firefox for Android 98+</li> <li>Opera Android 24+</li> <li>Safari on iOS 15.4+</li> <li>Samsung Internet 3+</li> <li>WebView Android 37+</li> </ul> </details>
<p>Opened and closed entirely with <code>command</code> and <code>commandfor</code> HTML attributes that describe what command is being directed at which element, matched by <code>id</code>.</p>
<p>Open dialog </p>
<pre><code>&lt;button command="show-modal" commandfor="example-dialog"&gt;Open dialog&lt;/button&gt;
&lt;dialog id="example-dialog"&gt;
	&lt;p&gt;Look, Ma! No JavaScript!&lt;/p&gt;
	&lt;form method="dialog"&gt;
		&lt;button type="submit"&gt;Close&lt;/button&gt;
	&lt;/form&gt;
&lt;/dialog&gt;</code></pre>
<h2><code>popover</code></h2>
<details> <summary>Available since January 2025</summary> <ul> <li>Chrome 114+</li> <li>Edge 114+</li> <li>Firefox 125+</li> <li>Opera 100+</li> <li>Safari 17+</li> <li>Chrome Android 114+</li> <li>Firefox for Android 125+</li> <li>Opera Android 76+</li> <li>Safari on iOS 17+</li> <li>Samsung Internet 23+</li> <li>WebView Android 114+</li> </ul> </details>
<p>Light dismiss, Esc to close, no managing <code>z-index</code> to wrangle it onto a top later. All managed with <code>popover</code> and <code>popovertarget</code> attributes in HTML.</p>
<p>Toggle popover </p>
<pre><code>&lt;button popovertarget="example-popover"&gt;Toggle popover&lt;/button&gt;
&lt;div id="example-popover" popover&gt;
	&lt;p&gt;Same deal as the &amp;lt;dialog&amp;gt; above: no JS, just HTML attributes!&lt;/p&gt;
&lt;/div&gt;</code></pre>
<h2>Grouped <code>&lt;details&gt;</code></h2>
<details> <summary>Available since September 2025</summary> <ul> <li>Chrome 120+</li> <li>Edge 120+</li> <li>Firefox 130+</li> <li>Opera 106+</li> <li>Safari 17.2+</li> <li>Chrome Android 120+</li> <li>Firefox for Android 130+</li> <li>Opera Android 80+</li> <li>Safari on iOS 17.2+</li> <li>Samsung Internet 25+</li> <li>WebView Android 120+</li> </ul> </details>
<p>A shared <code>name</code> attribute turns a group of <code>&lt;details&gt;</code> into an exclusive accordion. Open one and the others close automatically. Magic!</p>
<details> <summary>First</summary> <p>Open the seond one and watch this close on its own.</p> </details>
<details> <summary>Second</summary> <p>First one’s hidden now.</p> </details>
<pre><code>&lt;details name="example-group"&gt;
	&lt;summary&gt;First&lt;/summary&gt;
	&lt;p&gt;Open the seond one and watch this close on its own.&lt;/p&gt;
&lt;/details&gt;
&lt;details name="example-group"&gt;
	&lt;summary&gt;Second&lt;/summary&gt;
	&lt;p&gt;First one’s hidden now.&lt;/p&gt;
&lt;/details&gt;</code></pre>
<h2><code>command</code> &amp; <code>commandfor</code></h2>
<details> <summary>Available since December 2025</summary> <ul> <li>Chrome 135+</li> <li>Edge 135+</li> <li>Firefox 144+</li> <li>Opera 120+</li> <li>Safari 26.2+</li> <li>Chrome Android 135+</li> <li>Firefox for Android 144+</li> <li>Opera Android 89+</li> <li>Safari on iOS 26.2+</li> <li>Samsung Internet 29+</li> <li>WebView Android 135+</li> </ul> <p> So far only , , , , , and  have landed stable in browsers. We can look forward to invokers supported in the future to increment/decrement values, interact with media elements, copy text, etc.</p> </details>
<p>Two separate HTML buttons controlling <em>one</em> popover. No scripting.</p>
<p>Open Close </p>
<pre><code>&lt;button command="show-popover" commandfor="example-command-popover"&gt;Open&lt;/button&gt;
&lt;button command="hide-popover" commandfor="example-command-popover"&gt;Close&lt;/button&gt;
&lt;div id="example-command-popover" popover&gt;
	&lt;p&gt;&lt;code&gt;show-popover&lt;/code&gt; opens this and &lt;code&gt;hide-popover&lt;/code&gt; closes it!&lt;/p&gt;
&lt;/div&gt;</code></pre>
<h2>Native input pickers</h2>
<details> <summary>Available since March 2017</summary> <ul> <li>Chrome: Colour 20+, Range 4+, Date 20+</li> <li>Edge: Colour 14+, Range 12+, Date 12+</li> <li>Firefox: Colour 29+, Range 23+, Date 57+</li> <li>Opera: Colour 12+, Range 11+, Date 11+</li> <li>Safari: Colour 12.1+, Range 3.1+, Date 14.1+</li> <li>Chrome Android: Colour 25+, Range 57+, Date 25+</li> <li>Firefox for Android: Colour 27+, Range 52+, Date 57+</li> <li>Opera Android: Colour 12+, Range 11+, Date 11+</li> <li>Safari on iOS: Colour 12.2+, Range 5+, Date 5+</li> <li>Samsung Internet: Colour 1.5+, Range 7+, Date 1.5+</li> <li>WebView Android: Colour 4.4+, Range 4.4+, Date 4.4+</li> </ul> </details>
<p>Colour, range, and date pickers, built right into the browser.</p>
<p><em>Your mileage may vary with these elements; although, hand-written JS solutions tend to vary wildly, and I think we can expect form elements to receive more love over the coming years.</em></p>
<p>Colour</p>
<p>Range</p>
<p>Date</p>
<pre><code>&lt;label&gt;Colour &lt;input type="color" value="#5f8aa6" autocomplete="off"&gt;&lt;/label&gt;
&lt;label&gt;Range &lt;input type="range" min="0" max="100" value="50" autocomplete="off"&gt;&lt;/label&gt;
&lt;label&gt;Date &lt;input type="date" autocomplete="off"&gt;&lt;/label&gt;</code></pre>
<h2><code>&lt;datalist&gt;</code></h2>
<details> <summary>Available since March 2019</summary> <ul> <li>Chrome 20+</li> <li>Edge 12+</li> <li>Firefox 4+</li> <li>Opera 9.5+</li> <li>Safari 12.1+</li> <li>Chrome Android 33+</li> <li>Firefox for Android 79+</li> <li>Opera Android 20+</li> <li>Safari on iOS 12.2+</li> <li>Samsung Internet 2+</li> <li>WebView Android 4.4.3+</li> </ul> <p> This isn’t yet supported across the board with all input types, e.g. colour or date inputs.</p> </details>
<p>Native autocomplete suggestions, no dropdown library required.</p>
<p>Favourite HTML element  </p>
<pre><code>&lt;label&gt;Favourite HTML element &lt;input type="text" id="example-datalist-input" list="example-datalist" autocomplete="off"&gt;&lt;/label&gt;
&lt;datalist id="example-datalist"&gt;
	&lt;option value="a"&gt;
	&lt;option value="abbr"&gt;
	&lt;option value="address"&gt;
	&lt;!-- ... --&gt;
&lt;/datalist&gt;</code></pre>
<h2><code>loading="lazy"</code></h2>
<details> <summary>Available since March 2022</summary> <ul> <li>Chrome 77+</li> <li>Edge 79+</li> <li>Firefox 75+</li> <li>Opera 64+</li> <li>Safari 15.4+</li> <li>Chrome Android 77+</li> <li>Firefox for Android 79+</li> <li>Opera Android 55+</li> <li>Safari on iOS 15.4+</li> <li>Samsung Internet 12+</li> <li>WebView Android 77+</li> </ul> </details>
<p>This image defers loading until it’s near the viewport. Not an <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"><code>IntersectionObserver</code></a> in sight.</p>
<figure><img alt="Chris Burnell’s avatar." src="https://chrisburnell.com/images/avatar@2x.jpeg"/><figcaption>Chris Burnell’s avatar.</figcaption></figure>
<pre><code>&lt;img src="/images/avatar@2x.jpeg" loading="lazy" width="200" height="200" alt="Chris Burnell’s avatar."&gt;</code></pre>
<h2>hidden until-found</h2>
<details> <summary>Available since December 2025</summary> <ul> <li>Chrome 102+</li> <li>Edge 102+</li> <li>Firefox 148+</li> <li>Opera 88+</li> <li>Safari 26.2+</li> <li>Chrome Android 102+</li> <li>Firefox for Android 148+</li> <li>Opera Android 70+</li> <li>Safari on iOS 26.2+</li> <li>Samsung Internet 19+</li> <li>WebView Android 102+</li> </ul> </details>
<p>Navigating to the fragment link below reveals the hidden section. The browser automatically removes <code>hidden="until-found"</code>.</p>
<p><a href="https://chrisburnell.com/html-can-do-that/#example-until-found">Jump to hidden content</a></p>
<p>Yahaha! You found me!</p>
<pre><code>&lt;a href="#example-until-found"&gt;Jump to hidden content&lt;/a&gt;
&lt;div id="example-until-found" hidden="until-found"&gt;
	&lt;p&gt;Yahaha! You found me!&lt;/p&gt;
&lt;/div&gt;</code></pre>
