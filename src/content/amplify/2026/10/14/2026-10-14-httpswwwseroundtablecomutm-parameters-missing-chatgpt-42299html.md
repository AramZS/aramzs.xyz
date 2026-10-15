---
author: Barry Schwartz
cover_image: 'https://images.seroundtable.com/chatgpt-adobe-track-DvkGXAft.jpg'
date: '2026-10-14T15:03:08.093Z'
dateFolder: 2026/10/14
description: >-
  OpenAI seems to have removed or replaced the UTM parameters it placed on links
  within the ChatGPT results.  This makes it harder to know if a click came from
  ChatGPT versus some other platform. This seems to have started with the
  release of GPT‑6, which was a week ago.
isBasedOn: 'https://www.seroundtable.com/utm-parameters-missing-chatgpt-42299.html'
link: 'https://www.seroundtable.com/utm-parameters-missing-chatgpt-42299.html'
slug: 2026-10-14-httpswwwseroundtablecomutm-parameters-missing-chatgpt-42299html
tags:
  - ai
  - media
  - search
title: OpenAI Drops UTM Parameters From ChatGPT Results (GPT-6)
---
<figure><img alt="White Analytics" src="https://images.seroundtable.com/white-analytics-PO8kfnVd.jpg"/><figcaption>White Analytics</figcaption></figure>
<p>OpenAI seems to have removed or replaced the UTM parameters it placed on links within the ChatGPT results. This makes it harder to know if a click came from ChatGPT versus some other platform. This seems to have started with the release of <a href="https://openai.com/index/gpt-6-for-everyone/">GPT‑6</a>, which was a week ago.</p>
<p>As a reminder, in June, OpenAI added <a href="https://www.seroundtable.com/openai-chatgpt-analytics-update-39590.html">UTM tracking to ChatGPT links</a>, but now, in October, those were removed. We are not sure if it was directly intentional but Cedric Huesler from Adobe posted on <a href="https://www.linkedin.com/posts/cedrichuesler_chatgpt-didnt-stop-sending-visitors-it-share-7515970264514400256-RRow/">LinkedIn</a> saying, "GPT-6 opens links with window(.)open(url, “_blank”, “noopener,noreferrer”) and drops ?utm_source=chatgpt(.)com. There’s no tag and no referrer, so your analytics files the visit under direct."</p>
<p>Meaning, ChatGPT has changed how it passes the referrer to the website the referrer is coming from.</p>
<p>He shared this chart showing the drop-off in tracking:</p>
<figure><a href="https://images.seroundtable.com/chatgpt-adobe-track-DvkGXAft.jpg"><img alt="Chatgpt Adobe Track" src="https://images.seroundtable.com/chatgpt-adobe-track-DvkGXAft.jpg"/></a><figcaption><a href="https://images.seroundtable.com/chatgpt-adobe-track-DvkGXAft.jpg">Chatgpt Adobe Track</a></figcaption></figure>
<p>Cedric added, "To check, I looked at ~500 pages where ChatGPT drove 5%+ of visits, comparing Oct 9–13 with the week before:"</p>
<ul><li>ChatGPT: −31k visits a day. Direct: +26k a day on the same pages. Search: −7%, the same as everywhere else.</li> <li>Direct rose on 2 in 3 pages that lost ChatGPT traffic. The week before it was a coin flip, and search on those same pages rose on only 45%.</li> <li>The new direct visitors behave like ChatGPT visitors. On mobile, the share seeing the consent banner (new to the site) went from 36% to 44%. For ChatGPT visitors it’s 55%.</li></ul>
<p>Others are complaining about this too:</p>
<article class="rw-embedded-tweet" data-rw-tweet-id="2110277421220147284">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/464355272136216577/g-DDXaUc.jpeg"/>
</div>
<div>
<span><a href="https://twitter.com/sbillard">Sébastien Billard ✊Ⓥ🇺🇦</a></span>
<span><a href="https://twitter.com/sbillard">@sbillard</a></span>
</div>
<div>
<a href="https://twitter.com/sbillard/status/2110277421220147284">
<svg aria-label="X" fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p><p><a href="https://twitter.com/fomerino">@fomerino</a> <a href="https://twitter.com/lilyraynyc">@lilyraynyc</a> <a href="https://twitter.com/CyrusShepard">@CyrusShepard</a> <a href="https://twitter.com/rustybrick">@rustybrick</a> Since octobre 9th I also see a sharp drop in Chat GPT human traffic, and also a drop of Chatgpt-user robot traffic. OAi Search bot traffic has increased in the same time (sinc october 7th be precise). Am going to investigate the utm parameter.  </p></p>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1791964318000">
<span>
<a href="https://twitter.com/sbillard/status/2110277421220147284">Posted Oct 14, 2026 at 7:51AM</a>
</span>
</footer>
</article>
<p>Hat tip to <a href="https://www.linkedin.com/in/cheelo/">Chee Lo</a> who told me about this a couple of says ago.</p>
<p>Forum discussion at <a href="https://www.linkedin.com/posts/cedrichuesler_chatgpt-didnt-stop-sending-visitors-it-share-7515970264514400256-RRow/">LinkedIn</a>.</p>
