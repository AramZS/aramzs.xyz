---
author: Barry Pollard
cover_image: 'https://www.htmhell.dev/images/og/advent25_3.png?s=171224'
date: '2025-12-04T05:54:21.292Z'
dateFolder: 2025/12/04
description: 'A collection of bad practices in HTML, copied from real websites.'
isBasedOn: 'https://htmhell.dev/adventcalendar/2025/3/'
link: 'https://htmhell.dev/adventcalendar/2025/3/'
slug: 2025-12-04-httpshtmhelldevadventcalendar20253
tags:
  - code
title: Speculation rules improvements
---
<p>The <a href="https://developer.mozilla.org/docs/Web/API/Speculation_Rules_API">Speculation Rules API</a> allows you to speed up future navigations by prefetching or even prerendering URLs in advance of a user actually clicking a link. When the link is clicked, the speculation is used, and the user experiences a faster load than if no speculation was used.</p>
<p><a href="https://schepp.dev/">Schepp</a> covered <a href="https://htmhell.dev/adventcalendar/2024/28/">the API in last year's post</a> and discussed the <code>eagerness</code> value which allowed you to, for example, hover over a link to speculatively prerender it with the simple addition of this rule to your HTML:</p>
<pre><code>&lt;script type="speculationrules"&gt;<br/>{<br/>  "prerender": [{<br/>    "where": { "href_matches": "/*" },<br/>    "eagerness": "moderate"<br/>  }]<br/>}<br/>&lt;/script&gt;</code></pre>
<p>This hover technique is a common functionality offered by libraries, plugins, and frameworks, but now this is baked right into the browser. Chromium-based browsers only for now, but it is being worked on by Safari and Firefox, and as a progressive enhancement, nothing is broken on non-supporting browsers — they just don't benefit from the performance improvement.</p>
<p>Using mouse hover as a signal works well on desktop, but what about mobile, where "hover" is not really a thing? At least in browser terms — I'm sure many of us have hovered over a link without fingers, but as that is not detected by the browser as an event, we can't act upon it.</p>
<p>Well, solving that is just one of many improvements the API has seen in the last year that we'll cover in this post.</p>
<h2>Improved mobile viewport heuristics</h2>
<p>Since hover does not exist, we have updated the <code>eagerness: moderate</code> on mobile to instead look at the following heuristics:</p>
<ul><li>Anchor links within 30% vertical distance from the previous pointer down.</li><li>Anchor links at least 0.5× as big as the largest anchor in the viewport.</li><li>The browser waits 500 milliseconds after the user stopped scrolling.</li></ul>
<p>The aim is to avoid, as much as possible, over-speculating links that users are less likely to click. For example, because they are still scrolling, or they are very small links (terms and conditions and the like!).</p>
<p>You can see this in action in the following video where the <a href="https://almanac.httparchiv.org">Web Almanac</a> prerenders same-origin links with <code>moderate</code> eagerness:</p>
<figure><video autoplay="" controls="" loop="" muted="" playsinline=""><source src="https://htmhell.dev/images/advent2025/speculation-rules-mobile-viewport-demo.mp4"/></video><figcaption><p>An example of scrolling down a mobile page triggering speculations.</p></figcaption></figure>
<p>In the video, you can see that as you scroll down the page, links are being successfully prerendered, ready for the user to browse to the page.</p>
<p><strong>Note:</strong> Speculating has a cost. To both your users and for sites with potential increased traffic and resulting infrastructure usage. Always weigh those costs against the benefit to the user. Additionally, the are risks for more complex sites for speculating. See the <a href="https://developer.chrome.com/docs/web-platform/implementing-speculation-rules">Guide to implementing speculation rules for more complex sites</a> for more information.</p>
<p>To conserve memory, Chrome keeps up to two speculations in memory at a time. As the user scrolls further and new links — which are more likely to be clicked on — enter the viewport, the old prerenders are cancelled. These links can be re-speculated, for example, when the user scrolls back up, in which case they can be fetched from the HTTP cache. That way, they prerender even faster.</p>
<h2><code>eager</code> eagerness improvements</h2>
<p>The <code>eager</code> value has also been changed. It now offers an option somewhere between <code>immediate</code>, where links are speculated as soon as possible, and <code>moderate</code>.</p>
<p>On desktop, <code>moderate</code> rules trigger after a 10 millisecond hover. On mobile, we consider <em>all</em> links in the viewport after the user has stopped scrolling for 100 milliseconds, rather than the more restrictive set of heuristics above.</p>
<p>One common technique is to prefetch the HTML document with <code>eager</code> value as that is often relatively cheap. Then upgrade this <code>prefetch</code> to a full <code>prerender</code> on <code>moderate</code> when you have more signals that the users may click on the link, and so think it's worthwhile to speculatively start to render the page in full, as prerender has more costs including downloading subresources and using memory and CPU needed to render the page.</p>
<pre><code>&lt;script type="speculationrules"&gt;<br/>{<br/>  "prefetch": [{<br/>    "where": { "href_matches": "/*" },<br/>    "eagerness": "eager"<br/>  }],<br/>  "prerender": [{<br/>    "where": { "href_matches": "/*" },<br/>    "eagerness": "moderate"<br/>  }]<br/>}<br/>&lt;/script&gt;</code></pre>
<p>In addition you can also restrict the links considered for speculating using the <code>where</code> object.</p>
<h2>Further improvements to the API</h2>
<p>I'll close out with a sneak peek into the future, as one further improvement being worked on is a middle ground between the <code>prefetch</code> and <code>prerender</code>. This is useful for those sites concerned with any unintended consequences with fully prerendering a page.</p>
<p>Executing JavaScript may trigger analytics, change state, or cause other changes that should not happen until the page is actually viewed. While it is possible to <a href="https://developer.chrome.com/docs/web-platform/prerender-pages#detect-prerender-in-javascript">make JavaScript prerender-aware</a>, or <a href="https://developer.chrome.com/docs/web-platform/prerender-pages#hold-back-other-content">holdback scripts until the page is navigated to</a>, this can involve a lot of efforts, particularly for large sites with lots of dependencies managed by many teams.</p>
<p>To help with this, a new <strong>Prender Until Script</strong> option is currently available behind a flag in Chrome (<code>chrome://flags/#prerender-until-script</code>). As its name suggests, it will start prerendering a page, but pause when it encounters a synchronous <code>&lt;script&gt;</code> element. Scripts with the <code>async</code> or <code>defer</code> attribute (or <code>module</code> scripts which are <code>defer</code> by default) will be downloaded but not executed until the page is navigated to.</p>
<p>This means:</p>
<ul><li>Pages without any JavaScript can be fully prerendered.</li><li>Pages with only async/deferred JavaScript can be fully prerendered, with JavaScript executed on navigation.</li><li>Pages with only sync <code>&lt;script&gt;</code> JavaScript can start prerender, but pause before any <code>&lt;script&gt;</code> causes any intended consequences. They will continue to download subresources (thanks to the <a href="https://web.dev/articles/preload-scanner">preload scanner</a>), so they still have a significant performance benefit over <code>prefetch</code>.</li></ul>
<p>After enabling the flag, you can use this new mode in exactly the same way as <code>prefetch</code> and <code>prerender</code>:</p>
<pre><code>&lt;script type="speculationrules"&gt;<br/>{<br/>  "prerender_until_script": [{<br/>    "where": { "href_matches": "/*" },<br/>    "eagerness": "moderate"<br/>  }]<br/>}<br/>&lt;/script&gt;</code></pre>
<p>This enhancement should be released next year. In the meantime, have a play and <a href="https://bsky.app/profile/tunetheweb.com">let me know</a> how you get on!</p>
<h2>Conclusion</h2>
<p>The Speculation Rules API continues to improve with new options and features to help site owners deliver fast, HTML-driven websites!</p>
<p>We've even <a href="https://github.com/matuzo/HTMHell/pull/225">added speculation rules to this site</a>. As a light, static, HTML-driven site, it's the perfect type of site for this API. It was already a very fast site, but the addition of this API should make it even faster, especially on slower networks.</p>
<p>Finally, with our first signs of cross-browser adoption of the API, I'd speculate (boom! boom!) 2026 will be another bumper year for the API and for users of sites that implement it.</p>
<h2>About Barry Pollard</h2>
<p>Barry Pollard is a Developer Relations Engineer on the Google Chrome team working on making the web go faster.</p>
<p>Bluesky: <a href="https://bsky.app/profile/tunetheweb.com">@tunetheweb.com</a><br/>
Mastodon: <a href="https://mastodon.social/@tunetheweb">@tunetheweb@mastodon.social</a></p>
