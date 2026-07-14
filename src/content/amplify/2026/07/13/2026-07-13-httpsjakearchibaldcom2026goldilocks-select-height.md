---
author: jakearchibald.com
cover_image: 'https://jakearchibald.com/c/img-CxMtxBGV.png'
date: '2026-07-13T22:09:53.254Z'
dateFolder: 2026/07/13
description: The 'ideal' sizing is more complicated than you think…
isBasedOn: 'https://jakearchibald.com/2026/goldilocks-select-height/'
link: 'https://jakearchibald.com/2026/goldilocks-select-height/'
slug: 2026-07-13-httpsjakearchibaldcom2026goldilocks-select-height
tags:
  - code
title: The Goldilocks customizable select height
---
<p>I recently gave a talk on customizable (as in fully-stylable) <code>&lt;select&gt;</code>, and as I was building demos I realised there's a sizing 'pattern' that's almost always the-one-you-want, but it took me a long time to figure out how to do it in CSS.</p>
<p>Well, I say I figured it out. I actually failed, and asked a bunch of people for help, who (thankfully, for my ego) also struggled. Eventually, <a href="https://bsky.app/profile/bfgeek.bsky.social">Ian Kilpatrick</a> pointed me at the feature I was missing…</p>
<p>TL;DR: If you just want the solution, <a href="https://jakearchibald.com/2026/goldilocks-select-height/#putting-it-all-together">skip to the end</a>.</p>
<p>Also, if you want a general introduction to customizable <code>&lt;select&gt;</code>, <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select">MDN has you covered</a>.</p>
<p>Here's a mock-up of a custom select:</p>
<p>Unfortunately you're using Safari 26.5 or lower, which has a buggy implementation of anchor positioning, so these demos won't work for you. They work in Safari Technology Preview, so the techniques in this article should work by the time Safari ships custom select.</p>
<p>It isn't actually a custom select. Firefox and Safari are actively working on custom select, but haven't released it yet, so to make the demos work in more browsers, and to make it easier for you to inspect with DevTools, I've built the demos from <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">popovers</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning">CSS anchor positioning</a>, which are the same primitives custom select uses under the hood.</p>
<p>You can drag it around and see how it reacts to being in other parts of the viewport, and how it reacts to scrolling. If you can't be bothered with all that, here's a video:</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/1-av1-CXNyB3ut.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/1-avc-CHjZ2tdg.mp4" type="video/mp4"/> </video></figure>
<p>Here are the default UA styles that impact the picker's position and height:</p>
<pre><code>::picker(select) {margin: 0;inset: auto;min-inline-size: anchor-size(self-inline);max-block-size: stretch;position-area: self-block-end span-self-inline-end;position-try-order: most-block-size;position-try-fallbacks:self-block-start span-self-inline-end,self-block-end span-self-inline-start,self-block-start span-self-inline-start;/* Not part of the spec, but it's something Chrome does, so I've included it */min-block-size: 1lh;}</code></pre>
<p>As a result:</p>
<ul> <li><code>min-inline-size</code> means the picker will always be at least as wide as the <code>&lt;select&gt;</code> button (or toggle button in this case).</li> <li><code>max-block-size</code> means the picker will not overflow the viewport. Its <code>stretch</code> size is the full anchor positioning cell (the area from the edge of the <code>&lt;select&gt;</code> button to the edge of the viewport).</li> <li><code>position-area</code> defines the default anchor positioning cell to use, which is below the <code>&lt;select&gt;</code> button, and from its left edge to the right edge of the viewport.</li> <li><code>position-try-fallbacks</code> defines fallbacks for the anchor positioning cell, so it can appear above the <code>&lt;select&gt;</code> button, and/or clamp to the button's right edge.</li> <li><code>position-try-order</code> means the picker will initially appear in the anchor positioning cell that offers it the <code>most-block-size</code>, which means vertical space in this writing-mode. This doesn't currently work in Firefox (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=2050547">ticket</a>) or Safari (<a href="https://bugs.webkit.org/show_bug.cgi?id=317916">ticket</a>), as it <a href="https://github.com/w3c/csswg-drafts/issues/13268#issuecomment-4801719311">wasn't clear in the spec</a>.</li> </ul>
<p>This is a reasonable set of defaults, but I think there are a number of things we can do to improve the UX.</p>
<p>Right now the picker extends to the edge of the viewport, making it hard to tell if it's actually stopping there, or if it's overflowing the viewport. The only visual clue is the small border &amp; rounded corners.</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/1-av1-CXNyB3ut.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/1-avc-CHjZ2tdg.mp4" type="video/mp4"/> </video></figure>
<p>Instead, I'll add a small margin:</p>
<pre><code>.custom-select::picker(select) {margin-block-end: 1em;}</code></pre>
<p>Try it out:</p>
<p>This isn't quite right, because:</p>
<ul> <li>In Firefox, it simply isn't working.</li> <li>In Chrome &amp; Safari, the margin is on the bottom, which looks bad when the picker flips above the button.</li> </ul>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/2-av1-uXqGQ1Bg.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/2-avc-BTWGe3l0.mp4" type="video/mp4"/> </video></figure>
<p>Remember when I said pickers have <code>max-block-size: stretch</code>? Well, Firefox doesn't support that, so I threw in <code>max-block-size: 100%</code> as a fallback. However, with percent heights, margins don't take away from the height, so the picker still hits the viewport edge, and the margin is outside it.</p>
<p>We can work around it:</p>
<pre><code>.custom-select::picker(select) {--viewport-margin: 1em;max-block-size: calc(100% - var(--viewport-margin));@supports (max-block-size: stretch) {max-block-size: stretch;margin-block-end: var(--viewport-margin);}}</code></pre>
<p>Now, for Firefox, we're deducting the margin from the 100% <code>max-block-size</code>. For browsers that support <code>stretch</code>, we stick with the previous solution.</p>
<p>And here's the result:</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/3-av1-Ddhc9sZL.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/3-avc-Bttyx-6o.mp4" type="video/mp4"/> </video></figure>
<p>It even does the right thing when the picker flips above the button! So… why am I not using this solution for the other browsers? Well, there's a slight imperfection with how the percent-based solution behaves. See if you can spot it - I'll come back to it later.</p>
<p>We need to fix the margin when the picker flips above the button. Now, there's a feature called <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Anchored_container_queries">anchored container queries</a> which lets us apply different styles when the anchored item flips position, but it isn't supported in Safari. Thankfully, there's an even better solution that Safari <em>does</em> support. Watch this…</p>
<pre><code>.custom-select::picker(select) {--viewport-margin: 1em;max-block-size: calc(100% - var(--viewport-margin));position-try-fallbacks: flip-block,flip-inline,flip-block flip-inline;@supports (max-block-size: stretch) {max-block-size: stretch;margin-block-end: var(--viewport-margin);}}</code></pre>
<p>This replaces the UA default <code>position-try-fallbacks</code>, which were specific about the positioning, with these <code>flip-*</code> values that achieve the same thing. However, the <code>flip-*</code> values come with <em>dark magic</em>.</p>
<p>When the flips take effect, it tries to flip other styles too. This works with some properties, but not others. <a href="https://drafts.csswg.org/css-anchor-position-1/#execute-a-try-tactic">Here's the spec</a>, good luck!</p>
<p>Margins are among the things it does work for, so when the picker flips above the button, our <code>margin-block-end</code> is treated as a <code>margin-block-start</code>. Spooky, yet convenient!</p>
<p>Here's the result:</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/4-av1-Cy3gA8Gl.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/4-avc-tG07Ckdu.mp4" type="video/mp4"/> </video></figure>
<p><a href="https://github.com/w3c/csswg-drafts/issues/13541#issuecomment-4732677022">The CSS Working Group has resolved to change the <code>position-try-fallbacks</code> defaults</a> for select pickers to something similar to the above, so the above override won't be needed in future.</p>
<p>Anyway, that's that problem sorted, but we still have work to do.</p>
<p>If you open the picker and drag it to the viewport edge, it gets really really small - unusably small, before it flips position. Chrome sets a default <code>min-block-size</code> of <code>1lh</code>, so let's just make that bigger!</p>
<pre><code>.custom-select::picker(select) {min-block-size: 12em;}</code></pre>
<p>But no, that creates another issue:</p>
<p>Toggle small picker</p>
<p>When the picker has only a few options, its full size is smaller than our minimum, so it looks kinda bad.</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/5-av1-Bjo6vmXk.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/5-avc-CaUkQEvj.mp4" type="video/mp4"/> </video></figure>
<p>What we want is for our minimum size to be like <code>min(fit-content, 12em)</code>, but <code>min()</code> doesn't allow intrinsic sizes like <code>fit-content</code>. Enter <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc-size"><code>calc-size()</code></a> - this was the bit <a href="https://github.com/w3c/csswg-drafts/issues/13617#issuecomment-4025033386">Ian Kilpatrick unlocked for me</a>:</p>
<pre><code>.custom-select::picker(select) {min-block-size: calc-size(fit-content, min(size, 12em));}</code></pre>
<p><code>calc-size()</code> lets us state an intrinsic size in the first argument, then perform a calculation with it in the second argument, where the <code>size</code> keyword represents the intrinsic size. Yeah, it's a little weird, but it works! Well, it works in Chrome. It isn't yet supported in Firefox (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=calc-size">ticket</a>) or Safari (<a href="https://bugs.webkit.org/show_bug.cgi?id=274177">ticket</a>), so we can use a bit of a hack in the meantime:</p>
<pre><code>.custom-select::picker(select) {--min-size: 12em;min-block-size: var(--min-size);/* The calc-size way… */@supports (min-block-size: calc-size(fit-content, min(size, 1px))) {min-block-size: calc-size(fit-content, min(size, var(--min-size)));}/* The hacky fallback… */@supports not (min-block-size: calc-size(fit-content, min(size, 1px))) {&amp;:not(:has(:where(option:nth-of-type(4))),:has(:where(optgroup:nth-of-type(2)))) {min-block-size: 0;max-block-size: fit-content;}}}</code></pre>
<p>Ok, that's a lot. Here's what it's doing:</p>
<ol> <li>Set a minimum block size of <code>12em</code> from <code>--min-size</code>.</li> <li>If <code>calc-size()</code> is supported, use it as before.</li> <li>Otherwise, if the picker has fewer than 4 options and fewer than 2 optgroups, remove the minimum block size, and prevent it from shrinking when it hits the edge of the viewport.</li> </ol>
<p>And here's the result:</p>
<p>Toggle small picker</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/6-av1-BpG94YdS.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/6-avc-BNjWLe8K.mp4" type="video/mp4"/> </video></figure>
<p>The last issue to tackle is preventing the picker from getting too <em>big</em>. Right now, it will always grow to fill the anchor positioning cell, which can end up feeling too tall. To solve this, we set a maximum.</p>
<p>However, we already used <code>max-block-size</code> to stop the picker hitting the edge of the viewport, so we need to use <code>min()</code> to allow for two max-sizes. One of the max sizes is <code>max-block-size: stretch</code>, so we need to use <code>calc-size()</code> again, which allows the intrinsic <code>stretch</code> size to be used in the <code>min()</code> calculation.</p>
<pre><code>.custom-select::picker(select) {--max-size: 30em; --viewport-margin: 1em;max-block-size: calc(100% - var(--viewport-margin)); max-block-size: min(100% - var(--viewport-margin), var(--max-size)); position-try-fallbacks:flip-block,flip-inline,flip-block flip-inline;@supports (max-block-size: stretch) { @supports (max-block-size: calc-size(stretch, min(size, 1px))) { max-block-size: stretch; max-block-size: calc-size(stretch, min(size, var(--max-size))); margin-block-end: var(--viewport-margin);}}</code></pre>
<p>And here's the final result:</p>
<p>Toggle small picker</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/7-av1-BkpJ_nbL.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/7-avc-BsKt9xTR.mp4" type="video/mp4"/> </video></figure>
<p>Because we're using <code>calc-size()</code> for the fix, which isn't supported in Safari, Safari is now using the <code>100%</code> fallback as well as Firefox, which is <em>almost perfect</em>, but not quite. Have you spotted the imperfection? Here's the issue:</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/8-av1-DrCf40eg.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/8-avc-ZaH3wfNk.mp4" type="video/mp4"/> </video></figure>
<p>Once we get to the minimum height, the picker will move towards the edge of the viewport before flipping, whereas in Chrome which uses <code>calc-size()</code> + <code>stretch</code>, it flips as soon as it hits the minimum height. It's a minor thing, but it'll be nicer when all browsers support <code>calc-size()</code>.</p>
<p>Here's the full CSS for the picker, which adds the margin to the viewport, applies a minimum size, and a maximum size, all in one place to copy-paste and for LLMs to steal:</p>
<pre><code>.custom-select::picker(select) {--viewport-margin: 1em;--min-size: 12em;--max-size: 30em;min-block-size: var(--min-size);max-block-size: min(100% - var(--viewport-margin), var(--max-size));position-try-fallbacks:flip-block,flip-inline,flip-block flip-inline;@supports (min-block-size: calc-size(fit-content, min(size, 1px))) {min-block-size: calc-size(fit-content, min(size, var(--min-size)));max-block-size: calc-size(stretch, min(size, var(--max-size)));margin-block-end: var(--viewport-margin);}@supports not (min-block-size: calc-size(fit-content, min(size, 1px))) {&amp;:not(:has(:where(option:nth-of-type(4))),:has(:where(optgroup:nth-of-type(2)))) {min-block-size: 0;max-block-size: fit-content;}}}</code></pre>
<p>And one last time:</p>
<p>Toggle small picker</p>
<figure><video controls="" muted=""> <source src="https://jakearchibald.com/c/7-av1-BkpJ_nbL.mp4" type="video/webm; codecs=av01.0.08M.08.0.110.01.01.01.1"/> <source src="https://jakearchibald.com/c/7-avc-BsKt9xTR.mp4" type="video/mp4"/> </video></figure>
<p>This doesn't work in the current version of Safari (26.5), but it does work in Safari Technology Preview, so it should be supported by the time Safari ships custom select.</p>
<p>If the CSS above looks scary, it's mostly due to fallbacks for things browsers don't support yet, and a workaround for something the CSS Working Group will change. Eventually we'll be able to do the same thing with:</p>
<pre><code>.custom-select::picker(select) {min-block-size: calc-size(fit-content, min(size, 12em));max-block-size: calc-size(stretch, min(size, 30em));margin-block-end: 1em;}</code></pre>
<p>Well, not quite. The way the picker reacts to scrolling seems weird to me, and it's inconsistent across browsers and devices. <a href="https://github.com/w3c/csswg-drafts/issues/14112">I've filed a CSSWG issue to discuss it</a>, because none of the behaviours seem right to me.</p>
<p>Hello, I'm Jake and that's me there. The one that isn't a cat. I'm a developer of sorts, working on <a href="https://www.firefox.com/">Firefox</a>.</p>
<p>Feel free to <a href="mailto:jaffathecake@gmail.com">throw me an email</a>, unless you're a recruiter, or someone trying to offer me 'sponsored content' for this site, in which case write your request on a piece of paper, and fling it out the window.</p>
