---
author: meyerweb.com
cover_image: 'https://meyerweb.com/ui/i/hamonshu/fb-og-image.png'
date: '2025-10-29T16:44:52.775Z'
dateFolder: 2025/10/29
description: >-
  In which I turn inline asides into robustly enhanced sidenotes with CSS and
  just a touch of JS.
isBasedOn: 'https://meyerweb.com/eric/thoughts/2025/10/29/custom-asidenotes/'
link: 'https://meyerweb.com/eric/thoughts/2025/10/29/custom-asidenotes/'
slug: 2025-10-29-httpsmeyerwebcomericthoughts20251029custom-asidenotes
tags:
  - code
title: Custom Asidenotes
---
<p> <em>Published 3 hours past</em> </p>
<p><a href="https://meyerweb.com/eric/thoughts/2025/10/28/parenthetical-asidenotes/">Previously on meyerweb</a>, I crawled through a way to turn parenthetical comments into sidenotes, which I called “asidenotes”. As a recap, these are inline asides in parentheses, which is something I like to do. The constraints are that the text has to start inline, with its enclosing parentheses as part of the static content, so that the parentheses are present if CSS isn’t applied, but should lose those parentheses when turned into asidenotes, while also adding a sentence-terminating period when needed.</p>
<p>At the end of that post, I said I wouldn’t use the technique I developed, because the markup was too cluttered and unwieldy, and there were failure states that CSS alone couldn’t handle. So what can we do instead? Extend HTML to do things automatically!</p>
<p>If you’ve read my old post “<a href="https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/">Blinded By the DOM Light</a>”, you can probably guess how this will go. Basically, we can write a little bit of JavaScript to take an invented element and Do Things To It™. What things? Anything JavaScript makes possible.</p>
<p>So first, we need an element, one with a hyphen in the middle of its name because all custom elements require an interior hyphen, similar to how all custom properties and most custom identifiers in CSS require two leading dashes.. Something like:</p>
<pre><code>&lt;aside-note&gt;(actual text content)&lt;/aside-note&gt;</code></pre>
<p>Okay, great! Thanks to HTML’s permissive handling of unrecognized elements, this completely new element will be essentially treated like a <code>&lt;span&gt;</code> in older browsers. In newer browsers, we can massage it.</p>
<pre><code>class asideNote extends HTMLElement {
	connectedCallback() {
		let marker = document.createElement('sup');
		marker.classList.add('asidenote-marker');
		this.after(marker);
	}
}
customElements.define("aside-note",asideNote);</code></pre>
<p>With this in place, whenever a supporting browser encounters an <code>&lt;aside-note&gt;</code> element, it will run the JS above. Right now, what that does is insert a <code>&lt;sup&gt;</code> element just after the <code>&lt;aside-note&gt;</code>.</p>
<p>“Whoa, wait a minute”, I thought to myself at this point. “There will be browsers (mostly older browser versions) that understand custom elements, but don’t support anchor positioning. I should only run this JS if the browser can position with anchors, because I don’t want to needlessly clutter the DOM. I need an @supports query, except in JS!” And wouldn’t you know it, such things do exist.</p>
<pre><code>class asideNote extends HTMLElement {
	connectedCallback() {
		if (CSS.supports('bottom','anchor(top)')) {
			let marker = document.createElement('sup');
			marker.classList.add('asidenote-marker');
			this.after(marker);
		}
	}
}</code></pre>
<p>That will yield the following DOM structure:</p>
<pre><code>&lt;aside-note&gt;(and brower versions)&lt;/aside-note&gt;&lt;sup&gt;&lt;/sup&gt;</code>

</pre>
<p>That’s all we need to generate some markers and do some positioning, as was done in my previous post. To wit:</p>
<pre><code>@supports (anchor-name: --main) {
	#thoughts {
		anchor-name: --main;
	}
	#thoughts article {
		counter-reset: asidenotes;
	}
	#thoughts article sup {
		font-size: 89%;
		line-height: 0.5;
		color: inherit;
		text-decoration: none;
	}
	#thoughts article aside-note::after,
	#thoughts article aside-note + sup::before {
		content: counter(asidenotes);
	}
	#thoughts article aside-note {
		counter-increment: asidenotes;
		position: absolute;
		anchor-name: --asidenote;
		top: max(anchor(top), calc(anchor(--asidenote bottom, 0px) + 0.67em));
		bottom: auto;
		left: calc(anchor(--main right) + 4em);
		max-width: 23em;
		margin-block: 0.15em 0;
		text-wrap: balance;
		text-indent: 0;
		font-size: 89%;
		line-height: 1.25;
		list-style: none;
	}
	#thoughts article aside-note::before {
		content: counter(asidenotes);
		position: absolute;
		top: -0.4em;
		right: calc(100% + 0.25em);
	}
	#thoughts article aside-note::first-letter {
		text-transform: uppercase;
	}
}</code></pre>
<p>I went through a lot of that CSS <a href="https://meyerweb.com/eric/thoughts/2025/10/28/parenthetical-asidenotes/">in the previous post</a>, so jump over there to get details on what all that means if the above has you agog. I did add a few bits of text styling like an explicit line height and slight size reduction, and changed all the <code>asidenote</code> classes there to <code>aside-note</code> elements here, but nothing is different with the positioning and such.</p>
<p>Let’s go back to the JavaScript, where we can strip off the leading and trailing parentheses with relative ease.</p>
<pre><code>class asideNote extends HTMLElement {
	connectedCallback() {
		if (CSS.supports('bottom','anchor(top)')) {
			let marker = document.createElement('sup');
			marker.classList.add('asidenote-marker');
			this.after(marker);
			let inner = this.innerText;
			if (inner.slice(0,1) == '(' &amp;&amp; inner.slice(-1) == ')') {
				inner = inner.slice(1,inner.length-1);}
			this.innerText = inner;
		}
	}
}</code></pre>
<p>This code looks at the innerText of the asidenote, checks to see if it both begins and ends with parentheses , and then if so, it strips them out of the text and sets the <code>&lt;aside-note&gt;</code>’s innerText to be that stripped string. I decided to set it up so that the stripping only happens if there are balanced parentheses because if there aren’t, I’ll see that in the post preview and fix it before publishing.</p>
<p>I still haven’t added the full stop at the end of the asidenotes, nor have I accounted for asidenotes that end in punctuation, so let’s add in a little bit more code to check for and do that:</p>
<pre><code>class asideNote extends HTMLElement {
	connectedCallback() {
		if (CSS.supports('bottom','anchor(top)')) {
			let marker = document.createElement('sup');
			marker.classList.add('asidenote-marker');
			this.after(marker);
			let inner = this.innerText;
			if (inner.slice(0,1) == '(' &amp;&amp; inner.slice(-1) == ')') {
				inner = inner.slice(1,inner.length-1);}
			if (!isLastCharSpecial(inner)) {
				inner += '.';}
			this.innerText = inner;
		}
	}
}
function isLastCharSpecial(str) {
	const punctuationRegex = /[!/?/‽/.\\]/;
	return punctuationRegex.test(str.slice(-1));
}
</code></pre>
<p>And with that, there is really only one more point of concern: what will happen to my asidenotes in mobile contexts? Probably be positioned just offscreen, creating a horizontal scrollbar or just cutting off the content completely. Thus, I don’t just need a supports query in my JS. I also need a media query. It’s a good thing those also exist!</p>
<pre><code>class asideNote extends HTMLElement {
	connectedCallback() {
		if (CSS.supports('bottom','anchor(top)') &amp;&amp;
			window.matchMedia('(width &gt;= 65em)').matches) {
			let marker = document.createElement('sup');
			marker.classList.add('asidenote-marker');
			this.after(marker);
</code></pre>
<p>Adding that <code>window.matchMedia</code> to the <code>if</code> statement’s test means all the DOM and content massaging will be done <em>only if</em> the browser understands anchor positioning <em>and</em> the window width is above 65 ems, which is my site’s first mobile media breakpoint that would cause real layout problems. Otherwise, it will leave the asidenote content embedded and fully parenthetical. Your breakpoint will very likely differ, but the principle still holds.</p>
<p>The one thing about this JS is that the media query only happens when the custom element is set up, same as the support query. There are <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries#receiving_query_notifications">ways to watch for changes to the media environment</a> due to things like window resizes, but I’m not going to use them here. I probably should, but I’m still not going to.</p>
<p>So: will I use <em>this</em> version of asidenotes on meyerweb? <a href="https://www.youtube.com/watch?v=HKnBgF4Hx1w&amp;t=72s">I might, Rabbit, I might.</a> I mean, I’m already using them in this post, so it seems like I should just add the JS to my blog templates and the CSS to my stylesheets so I can keep doing this sort of thing going forward. Any objections? Let’s hear ’em!</p>
<ul> <li><a href="https://meyerweb.com/eric/thoughts/2025/10/29/custom-asidenotes/">Custom Asidenotes</a> was published on Wednesday, October 29th, 2025.</li> <li>It was assigned to the <a href="https://meyerweb.com/eric/thoughts/category/tech/css/">CSS</a> and <a href="https://meyerweb.com/eric/thoughts/category/tech/javascript/">JavaScript</a> categories.</li> <li>There have been <a href="https://meyerweb.com/eric/thoughts/2025/10/29/custom-asidenotes/#respond">no replies</a>.</li> </ul>
