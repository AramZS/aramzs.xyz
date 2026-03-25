---
author: Ishaan Jhaveri
cover_image: >-
  https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/c77e4352-557b-42e6-8f77-5d5a933d84c4/Gemini_Generated_Image_vlwp3avlwp3avlwp.png?t=1774192025
date: '2026-03-24T15:42:54.277Z'
dateFolder: 2026/03/24
description: >-
  Step-by-step instructions for how to index a private dataset of images (or
  videos) and run reverse image search queries against it.
isBasedOn: >-
  https://indicator.media/p/the-indicator-guide-to-building-your-own-reverse-image-search-engine
link: >-
  https://indicator.media/p/the-indicator-guide-to-building-your-own-reverse-image-search-engine
slug: >-
  2026-03-24-httpsindicatormediapthe-indicator-guide-to-building-your-own-reverse-image-search-engine
tags:
  - code
  - tech
  - journalism
title: The Indicator Guide to building your own reverse image search engine
---
<figure><img alt="The Indicator Guide to building your own reverse image search engine" src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,onerror=redirect/uploads/asset/file/c77e4352-557b-42e6-8f77-5d5a933d84c4/Gemini_Generated_Image_vlwp3avlwp3avlwp.png"/></figure>
<p><a href="https://x.com/ishaan_jhavs?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media"><em>Ishaan Jhaveri</em></a><em> investigates visual stories using open-source and computational techniques. He’s currently a computational reporter and producer with the </em><a href="https://www.youtube.com/playlist?list=PLz_B0PFGIn4fa8LK1lptsvoA_spfJhzda&amp;utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media"><em>BBC’s Eye Investigations</em></a><em> team in London and previously </em><a href="https://www.nytimes.com/by/ishaan-jhaveri?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media"><em>worked</em></a><em> as a reporter on the New York Times’ Visual Investigations team in New York.</em></p>
<p>Reverse image search is a core technique in digital investigations. It is used by fact-checkers and journalists all over the world to identify <a href="https://www.altnews.in/operation-sindoor-old-footage-of-russian-jet-shot-shared-as-india-brought-down-t-pakistani-fighter-jets/?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media">old footage being shared</a> in misleading contexts, as part of <a href="https://x.com/trbrtc/status/1570099805417881602?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media">geolocation</a>, and was even used last year by Sherwood News to <a href="https://sherwood.news/power/shop-this-look-buy-cheap-faux-gold-dupes-of-oval-office-decor/?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media">try to match the faux gold decor</a> that was installed in a recent Oval Office refresh.</p>
<p>In 2019, Aric Toler <a href="https://www.bellingcat.com/resources/how-tos/2019/12/26/guide-to-using-reverse-image-search-for-investigations/?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media">published</a> a comprehensive reverse image search guide for Bellingcat, much of which remains relevant. It identified the relative strengths of reverse image search engines developed by Google, Bing, Yandex and TinEye. Bellingcat’s guide and the examples and tools cited above focus on reverse image searching <em>against the public internet</em> — looking only on publicly available, openly indexable websites for images that are visually similar to a query image. But this is not the only use case for reverse image search.</p>
<p>What if you have a proprietary dataset of images, or you’ve collected images from a source that’s not indexed by popular reverse image search sites? Or what if you need to constrain the universe of results returned for an image search?</p>
<p>In this guide I will show step-by-step instructions for using two tools that allow you to index a dataset of images (or videos) of any size and run reverse image search queries against it. Both approaches keep all data (indexed data + query data) private and run all processing locally on your computer. One tool is free but requires light coding (that an LLM could easily help with); the other is code-free and allows 40 free searches before charging $49/month.</p>
<p>The approaches I explain in this guide help filter large troves of images into much smaller sets of results that you can then manually peruse. I’ve used them to <a href="https://www.nytimes.com/2022/12/22/video/russia-ukraine-bucha-massacre-takeaways.html?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media">search</a> images scraped from Russian social media sites to identify soldiers active in the ongoing invasion of Ukraine; to compare features inside buildings that are used by people for illegal activities to images scraped from local housing catalogs; and to <a href="https://www.nytimes.com/2023/05/06/us/politics/jack-teixeira-leaks-discord-messages.html?utm_campaign=the-indicator-guide-to-building-your-own-reverse-image-search-engine&amp;utm_medium=referral&amp;utm_source=indicator.media">match</a> Discord users to Steam users by their profile pictures.</p>
<p>You don't need advanced technical skills to do the same. Here’s how.</p>
<h2>Upgrade to read the rest</h2>
<p>Become a paying member of Indicator to access all of our content and our monthly members-only workshop. Support independent media while building your skills.</p>
<p><a href="https://indicator.media/upgrade">Upgrade</a></p>
<h4>A membership gets you:</h4>
<ul><li>Everything we publish, plus archival content, including the Academic Library</li><li>Detailed resources like, "The Indicator Guide to connecting websites together using OSINT tools and methods"</li><li>Live monthly workshops and access to all recordings and transcripts</li></ul>
