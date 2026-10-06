---
author: James Hercher
cover_image: >-
  https://www.adexchanger.com/wp-content/uploads/2026/10/Apple-who_stock-exchange_comic_400-detail.jpg
date: '2026-10-05T21:37:51.941Z'
dateFolder: 2026/10/05
description: >-
  Oh, what a tangled WebKit we weave. Earlier this week, AdExchanger reported
  that Apple’s iOS 27 update from two weeks ago quietly blocked a handful of
  programmatic data players – including The Trade Desk and its Unified ID 2.0
  initiative, LiveRamp, ID5, Permutive and Audigent – from collecting data or
  serving ads on Safari. (They […]
isBasedOn: >-
  https://www.adexchanger.com/privacy/apple-has-far-reaching-plans-to-block-hundreds-of-programmatic-data-companies-from-ios/
link: >-
  https://www.adexchanger.com/privacy/apple-has-far-reaching-plans-to-block-hundreds-of-programmatic-data-companies-from-ios/
slug: >-
  2026-10-05-httpswwwadexchangercomprivacyapple-has-far-reaching-plans-to-block-hundreds-of-programmatic-data-companies-from-ios
tags:
  - ad tech
title: >-
  Apple Has Far-Reaching Plans To Block Hundreds Of Programmatic Data Companies
  From iOS
---
<p><a href="https://www.adexchanger.com/#linkedin"></a><a href="https://www.adexchanger.com/#email"></a><a href="https://www.adexchanger.com/#x"></a><a href="https://www.adexchanger.com/#facebook"></a><a data-wpel-link="external" href="https://www.addtoany.com/share#url=https%3A%2F%2Fwww.adexchanger.com%2Fprivacy%2Fapple-has-far-reaching-plans-to-block-hundreds-of-programmatic-data-companies-from-ios%2F&amp;title=Apple%20Has%20Far-Reaching%20Plans%20To%20Block%20Hundreds%20Of%20Programmatic%20Data%20Companies%20From%20iOS%20%7C%20AdExchanger"></a></p>
<figure><img alt="Comic: Apple Who?" sizes="(max-width: 400px) 100vw, 400px" src="https://www.adexchanger.com/wp-content/uploads/2022/01/Apple-who_stock-exchange_comic_400.jpg" srcset="https://www.adexchanger.com/wp-content/uploads/2022/01/Apple-who_stock-exchange_comic_400.jpg 400w, https://www.adexchanger.com/wp-content/uploads/2022/01/Apple-who_stock-exchange_comic_400-300x269.jpg 300w"/><figcaption>Comic: Apple Who?</figcaption></figure>
<p>Oh, what a tangled WebKit we weave.</p>
<p>Earlier this week, <a data-wpel-link="internal" href="https://www.adexchanger.com/platforms/apples-latest-operating-system-blocks-the-trade-desk-from-serving-ads-on-safari/">AdExchanger reported</a> that Apple’s iOS 27 update from two weeks ago quietly blocked a handful of programmatic data players – including The Trade Desk and its Unified ID 2.0 initiative, LiveRamp, ID5, Permutive and Audigent – from collecting data or serving ads on Safari. (They were also blocked on other mobile browsers, since browsers must use WebKit to launch on Apple devices.)</p>
<p>Now, according to two sources with direct knowledge of the WebKit updates, the initial list has been scrapped in favor of an expansive library of hundreds of CDPs, ad tech and mar tech companies, data sellers and ID graph operators.</p>
<p>These companies will exist in a purgatorial state of potential exclusion from advertising to or accessing people on Apple phones and computers, according to the sources. And only Apple seems to know what will get an ad tech vendor blocked or unblocked.</p>
<p>The full list of potentially blocked companies exists in a private GitHub repo, so it cannot be observed without access. One person with access to the full list did briefly allow AdExchanger to observe the list and read names off of it, but would not share it or allow it to be documented. Okay.</p>
<p>AdExchanger has reached out to the companies initially blocked by WebKit for comment and to see if they were aware of the update, but did not hear back in time for publication.</p>
<h2><strong>New kids on the block list</strong></h2>
<p>The sources who spoke to AdExchanger said Apple’s original list of blocked ad tech and data vendors is now moot, having been replaced by a longer list of companies that can be dynamically blocked by Apple.</p>
<p>The new dynamic process that WebKit uses to identify and block vendors relies on a remote list that Apple devices regularly call upon. Previously, Apple would need to roll out a new version of iOS to add or remove vendors from its list of blocked companies; now, it can just happen on the fly.</p>
<p>And vendors may not even be aware that they have been added to the list, or whether they have graduated from the intermediary “potentially blocked” list to being actively blocked.</p>
<p>The two sources with knowledge of the matter believe that the original vendors (TTD, LiveRamp, ID5, et al.) remain in essentially the same boat as they were earlier this week. As in, they are still blocked for Apple devices with iOS 27 installed.</p>
<p>But, while Apple’s new privacy mandate may have begun by blocking a handful of scaled, bigger-name companies, this new list suggests it has in mind potentially much broader, category-wide bans on CDPs, DMPs, DSPs and all of the other three-letter acronyms of ad tech.</p>
<p>Dip into the <a data-wpel-link="external" href="https://github.com/WebKit/WebKit/commit/172f52ace994d118941140e575139d76fcb06e14">Apple WebKit GitHub update</a> that is pertinent to the recent change, and one can see buried in the code the assignations Apple’s engineers are making.</p>
<p>A few of the calls made to the WebKit’s new blocking “ContentRuleList” to discriminate between vendors include: “isRequestToKnownCrossSiteTracker,” “!supportsFingerprintingScriptRequests” and “!supportsTrackingPreventionContentRuleListRequests.”</p>
<p>So, put the word out. Apple is coming, and not just for The Trade Desk.</p>
<p>However, AdExchanger is trying to confirm whether any Google property, including “ad.doubleclick.net,” which is still the domain name for Google’s cookie ID pool, is listed among Apple WebKit’s probationary list of hundreds of data vendors. It could be the case that Google is exempt.</p>
<p>Watch this space for more developments.</p>
