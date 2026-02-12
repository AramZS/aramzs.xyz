---
author: Barry Schwartz
cover_image: 'https://images.seroundtable.com/bing-ai-analytics-1770749672.jpg'
date: '2026-02-11T15:00:25.686Z'
dateFolder: 2026/02/11
description: >-
  A couple of weeks ago I reported Bing was beta testing a new AI performance
  report within Bing Webmaster Tools.  These reports are now available as a
  public preview for all to see.  Plus, Bing Webmaster Tools has a whole new
  slick design.
isBasedOn: >-
  https://www.seroundtable.com/bing-webmaster-tools-ai-performance-report-40911.html
link: >-
  https://www.seroundtable.com/bing-webmaster-tools-ai-performance-report-40911.html
slug: >-
  2026-02-11-httpswwwseroundtablecombing-webmaster-tools-ai-performance-report-40911html
tags:
  - ai
  - seo
title: Bing Webmaster Tools Rolls Out AI Performance Report (With New Design)
---
<figure><img alt="Bing Ai Analytics" src="https://images.seroundtable.com/bing-ai-analytics-1770749672.jpg"/><figcaption>Bing Ai Analytics</figcaption></figure>
<p>A couple of weeks ago, I reported that Bing was beta testing a new <a href="https://www.seroundtable.com/bing-webmaster-tools-ai-performance-report-40829.html">AI performance report within Bing Webmaster Tools</a>. These reports are now available as a public preview for all to see.</p>
<p>Plus, Bing Webmaster Tools has a whole new slick design. I actually like it a lot.</p>
<p>Microsoft's Krishna Madhavan, Meenaz Merchant, Fabrice Canel, and Saral Nigam <a href="https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview">announced</a>:</p>
<blockquote>We are happy to introduce AI Performance in Bing Webmaster Tools, a new set of insights that shows how publisher content appears across Microsoft Copilot, AI-generated summaries in Bing, and select partner integrations. For the first time, you can understand how often your content is cited in generative answers, with clear visibility into which URLs are referenced and how citation activity changes over time.</blockquote>
<p>I was not able to show you what that report looked like, until now, because now anyone can see it at <a href="https://www.bing.com/webmasters/aiperformance">bing.com/webmasters/aiperformance</a>. Here is a screenshot:</p>
<figure><a href="https://images.seroundtable.com/bing-ai-performance-dashboard-1770749809.png"><img alt="Bing Ai Performance Dashboard" src="https://images.seroundtable.com/bing-ai-performance-dashboard-1770749809.png"/></a><figcaption>Here is what you see:</figcaption></figure>
<ul><li>Total Citations: Shows the total number of citations that are displayed as sources in AI-generated answers during the selected time frame. This highlights how often your content is referenced by AI systems, without indicating placement or presentation within a specific answer.</li> <li>Average Cited Pages: Shows the average number of unique pages from your site that are displayed as sources in AI-generated answers per day over the selected time range. Because the data is aggregated across supported AI surfaces, average cited pages reflect overall citation patterns and does not indicate ranking, authority, or the role of any page within an individual answer.</li> <li>Grounding queries: Shows the key phrases the AI used when retrieving content that was referenced in AI-generated answers. The data shown represents a sample of overall citation activity. We will continue to refine this metric as additional data is processed.</li> <li>Page-level citation activity: Shows citation counts for specific URLs from your site, making it easy to see which individual pages are most often referenced across AI-generated answers during the selected date range. This reflects how often pages are cited, not page importance, ranking, or placement.</li> <li>Visibility trends over time: The timeline shows how citation activity for your site changes over time across supported AI experiences, making it easier to spot trends at a glance.</li></ul>
<p>And nope, no click data, as I said a couple of weeks ago.</p>
<p>The grounding queries is confusing folks - but those do not seem to be the actual queries users are searching but what Bing uses to "retrieving content that was referenced in AI-generated answers." So Copilot takes your long query and then breaks it down into shorter ones, it is probably that. But it also seems like that metric is stil being refined by Bing.</p>
<p>Plus, this data is not in the API yet. Fabrice Canel from Microsoft said on <a href="https://x.com/facan/status/2021517268329664620">X</a>, "With this preview, the data is not yet available via the API. Enabling data in our API is on our backlog, and we’ll take your feedback along with others, into account when prioritizing next release."</p>
<p>Fabrice Canel from Microsoft said on <a href="https://x.com/facan/status/2021287931625996348">X</a>, "We just dropped the AI Performance report into public preview in Bing Webmaster Tools." He did hint that more data is coming, he said, "It's just a preview, you will get more in 2026."</p>
<p>Some industry reaction:</p>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021278978611253753">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1939273879274287104/XDnMSJi5.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/glenngabe">Glenn Gabe</a></span>
<span><a href="https://twitter.com/glenngabe">@glenngabe</a></span>
</div>
<div>
<a href="https://twitter.com/glenngabe/status/2021278978611253753">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>OK, they are rolling it out. Here's the announcement:  Introducing AI Performance in Bing Webmaster Tools Public Preview <a href="https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" rel="nofollow">blogs.bing.com/webmaster/Febr…</a></p><img src="https://pbs.twimg.com/media/HA0GZrPaAAEAxbb.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770745436000">
<span>
<a href="https://twitter.com/glenngabe/status/2021278978611253753">Posted Feb 10, 2026 at 5:43PM</a>
</span>
</footer>
</article>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021290549412757939">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1829625956878716928/Ia1gKBAt.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/wilreynolds">Wil Reynolds</a></span>
<span><a href="https://twitter.com/wilreynolds">@wilreynolds</a></span>
</div>
<div>
<a href="https://twitter.com/wilreynolds/status/2021290549412757939">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>Bing is now giving you grounding queries in Bing Webmaster tools!!  Just confirmed, now I gotta understand what we're getting from them, what it means and how to use it.  <a href="https://t.co/BsEw4RbAJj" rel="nofollow">https://t.co/BsEw4RbAJj</a> </p><p>Great work <a href="https://twitter.com/facan">@facan</a> and team.  I remember when <a href="https://twitter.com/rustybrick">@rustybrick</a> showed that this might be coming 2.5 or so years ago!  Thank you!<br/></p><img src="https://pbs.twimg.com/media/HA0QvWkawAAtFu_.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770748195000">
<span>
<a href="https://twitter.com/wilreynolds/status/2021290549412757939">Posted Feb 10, 2026 at 6:29PM</a>
</span>
</footer>
</article>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021285617532129700">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/2055434103/Bear.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/facan">Fabrice Canel</a></span>
<span><a href="https://twitter.com/facan">@facan</a></span>
</div>
<div>
<a href="https://twitter.com/facan/status/2021285617532129700">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>We're excited to share new insights that bring more transparency to the web ecosystem. Publishers can now see how their content shows up in the AI era URLs, grounding queries, and page‑level performance.<br/>GEO meets SEO, power your strategy with real signals<br/><a href="https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" rel="nofollow">blogs.bing.com/webmaster/Febr…</a></p>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021269521625936373">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1858630245018202113/FJ6Uj9eA.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/BingWMC">Microsoft Bing Webmaster Team</a></span>
<span><a href="https://twitter.com/BingWMC">@BingWMC</a></span>
</div>
<div>
<a href="https://twitter.com/BingWMC/status/2021269521625936373">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>We’re excited to launch the public preview of AI Performance in BWT! See when your content appears in Copilot, Bing AI answers, and select partner experiences - including when pages are cited, top referenced URLs, and grounding queries. GEO meets SEO!<br/><a href="https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" rel="nofollow">blogs.bing.com/webmaster/Febr…</a></p><img src="https://pbs.twimg.com/media/HAz9lzDa0AAmwaP.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770743181000">
<span>
<a href="https://twitter.com/BingWMC/status/2021269521625936373">Posted Feb 10, 2026 at 5:06PM</a>
</span>
</footer>
</article>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770747019000">
<span>
<a href="https://twitter.com/facan/status/2021285617532129700">Posted Feb 10, 2026 at 6:10PM</a>
</span>
</footer>
</article>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021276348778705070">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1899549312226603008/cI5OdqfN.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/imnotadoctor">imnotadoctor</a></span>
<span><a href="https://twitter.com/imnotadoctor">@imnotadoctor</a></span>
</div>
<div>
<a href="https://twitter.com/imnotadoctor/status/2021276348778705070">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>Getting our first look at real 1st party AI performance data from Bing/CoPilot. </p><p>I really hope Google / GPT follows. We need this sort of reporting.</p><p><a href="https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" rel="nofollow">blogs.bing.com/webmaster/Febr…</a></p><p>I just wish Bing/CoPilot actually had users like Google / GPT.</p><img src="https://pbs.twimg.com/media/HA0D94oasAAKz0w.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770744809000">
<span>
<a href="https://twitter.com/imnotadoctor/status/2021276348778705070">Posted Feb 10, 2026 at 5:33PM</a>
</span>
</footer>
</article>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021323481992802415">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1803039284108083200/i0blVR4I.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/aleyda">Aleyda Solis 🕊️</a></span>
<span><a href="https://twitter.com/aleyda">@aleyda</a></span>
</div>
<div>
<a href="https://twitter.com/aleyda/status/2021323481992802415">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>🚨 Microsoft is Introducing AI Performance in <a href="https://twitter.com/bing">@bing</a>  Webmaster Tools: A new set of insights that shows how sites content appears across Microsoft Copilot, AI-generated summaries in Bing, and select partner integrations 👇 </p><p>This is the first official AI search visibility dashboard directly provided by platforms 👏 This is what you can see in it: </p><p><ul><br/><li><br/>Total Citations</li></ul></p><p>Shows the total number of citations that are displayed as sources in AI-generated answers. </p><p><br/><li><br/>Average Cited Pages</li></p><p>Shows the average number of unique pages from your site that are displayed as sources in AI-generated answers per day over the selected time range. </p><p><br/><li><br/>Grounding queries</li></p><p>Shows the key phrases the AI used when retrieving content that was referenced in AI-generated answers. </p><p><br/><li><br/>Page-level citation activity</li></p><p>Shows citation counts for specific URLs from your site, making it easy to see which individual pages are most often referenced across AI-generated answers.</p><p><br/><li><br/>What's not included? No intent or sentiment analysis, or an extract of the answers to check. Also, no data from other brands/sites, only yours. </li></p><p><br/><br/>There's room to improve/expand of course, but I'm thankful for this first step. </p><p>Go to Bing Webmaster tools and check it out 😎🙌</p><p>--- I want to thank <a href="https://twitter.com/facan">@facan</a> and team for the fantastic effort in the right direction to give official AI Search data to sites 🙏</p><p>Hopefully more platforms like Google and ChatGPT/OpenAI take note!</p><p>Announcement: <a href="https://t.co/fDpKjYqydg" rel="nofollow">https://t.co/fDpKjYqydg</a><br/></p><img src="https://pbs.twimg.com/media/HA0uw_7aYAAIXpU.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770756047000">
<span>
<a href="https://twitter.com/aleyda/status/2021323481992802415">Posted Feb 10, 2026 at 8:40PM</a>
</span>
</footer>
</article>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021356765950955675">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1740422795962580992/WaR6FeI-.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/KorayGubur">Koray Tuğberk GÜBÜR</a></span>
<span><a href="https://twitter.com/KorayGubur">@KorayGubur</a></span>
</div>
<div>
<a href="https://twitter.com/KorayGubur/status/2021356765950955675">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>Microsoft Bing Webmaster Tools has always been more useful and efficient than Google Search Console, and once again, they’ve proven their commitment to transparency.</p><p>Microsoft Bing has just launched the AI Performance Dashboard, which introduces “citations” and “cited pages” reporting. This offers a fresh and much-needed way to understand how SEO actually contributes to what many now call GEO, AEO, SXO, or whatever new acronym is trending.</p><p>Going forward, search performance dashboards will focus less on clicks, positions, and individual queries, and more on topics, visibility, and overall exposure.</p><p>We’re moving toward an “estate-based performance” mindset rather than hyper-precise, keyword-level rank tracking.</p><p>And as always, semantics and topical authority sit right at the center of this transition.</p><p>If you want to stay ahead of where search is going:</p><p>👉 <a href="https://t.co/pbnF18gPmh" rel="nofollow">https://t.co/pbnF18gPmh</a><br/></p><img src="https://pbs.twimg.com/media/HA1MnnnXAAANrz5.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770763982000">
<span>
<a href="https://twitter.com/KorayGubur/status/2021356765950955675">Posted Feb 10, 2026 at 10:53PM</a>
</span>
</footer>
</article>
<article class="rw-embedded-tweet" data-rw-tweet-id="2021541455362232550">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1931270500325445632/mzvOB-w9.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/NikkiPilkington">Nikki Pilkington - non-wanky SEO</a></span>
<span><a href="https://twitter.com/NikkiPilkington">@NikkiPilkington</a></span>
</div>
<div>
<a href="https://twitter.com/NikkiPilkington/status/2021541455362232550">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>Google Search Console : We've given users a new favicon and custom citations.</p><p>Bing Webmaster Tools: Hold my beer...</p><img src="https://pbs.twimg.com/media/HA31IAEW4AAluju.jpg"/>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1770808016000">
<span>
<a href="https://twitter.com/NikkiPilkington/status/2021541455362232550">Posted Feb 11, 2026 at 11:06AM</a>
</span>
</footer>
</article>
<p>Forum discussion at <a href="https://x.com/facan/status/2021287931625996348">X</a>.</p>
