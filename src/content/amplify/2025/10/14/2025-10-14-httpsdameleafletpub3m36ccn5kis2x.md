---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Agq4fo3u6tqzzdkjlwzpb23tj/dame's%2520leaflets/3m36ccn5kis2x/opengraph-image?04f9dc33b3d4fbe5
date: '2025-10-14T21:09:21.855Z'
dateFolder: 2025/10/14
description: How and why I created a "decentralized" approach to paywalls
isBasedOn: 'https://dame.leaflet.pub/3m36ccn5kis2x'
link: 'https://dame.leaflet.pub/3m36ccn5kis2x'
slug: 2025-10-14-httpsdameleafletpub3m36ccn5kis2x
tags:
  - code
  - decentralization
title: Building an ATProto-based membership and feature gating system for Anisota
---
<figure><img src="https://dame.leaflet.pub/api/atproto_images?did=did:plc:gq4fo3u6tqzzdkjlwzpb23tj&amp;cid=bafkreibviard5hite7e7bkedu6isaggx5bpdvgefq5b5w5vkzbmif4xoue"/></figure>
<p><a href="https://anisota.net">Anisota</a> is one of the few ATProto/Bluesky projects currently offering a paid premium membership. The app has been on the market for over a month now and is bringing in around $300/month in MRR. This isn't anywhere near enough for it to be my full-time vocation, but it's an encouraging start and has the potential to be part of my path to an economically sustainable independent creative practice.</p>
<p>The ATProto community has been experiencing a lot of growth over the past 12 months with new projects popping up every week now, so I want to begin offering regular behind-the-scenes updates and data about my experience thus far in case it is helpful to other creators in the ecosystem.</p>
<p>I first started making ATProto-based creative projects around a year ago, and in that time I've learned a lot about what to do and what not to do. I've also seen a lot of unexplored concepts that I've begun testing and experimenting with to see what's possible. An example of this would be the membership gating functionality I built for Anisota. As far as I know this hasn't been done before, but I think it's worth having more folks tinkering on.</p>
<p>The app checks public ATProto records contained in the @anisota.net personal data server (PDS) to see if an account is a paid member or not and configures the app experience accordingly. When someone changes their membership level (upgrading, downgrading, etc), my payment processor sends this data to my backend which automatically updates the ATProto record.</p>
<figure><img src="https://dame.leaflet.pub/api/atproto_images?did=did:plc:gq4fo3u6tqzzdkjlwzpb23tj&amp;cid=bafkreifkupuyiasxgpxothcihdxk6mgkf3xgkvxefxb7egqhcjkzv2m4jy"/></figure>
<p>Anisota has several paid membership levels that people can subscribe to in order to unlock all of the app's features and remove the limitations that are set on guest accounts (free users). Under the hood, this entire gating mechanism and process is powered by the AT Protocol. The personal data server (PDS) for the @anisota.net brand account is the source of truth rather than a centralized private database.</p>
<p>The membership system is rooted in a series of Bluesky Account Lists that were created under the @anisota.net brand account.</p>
<p>When someone tries to access Anisota, the system checks to see if they are in any of the account lists and then configures the app experience based on their membership level. If the person's account doesn't appear in any of the lists, they get automatically added to the Caterpillar list which is the list of free guests.</p>
<p>When someone chooses to upgrade and support the app financially via membership, my payment processing platform (Stripe) communicates with my app's backend infrastructure so that the person's account gets moved from the Caterpillar list to the appropriate Member List (or gets removed from a Member List if they cancel or their plan expires).</p>
<p>By looking at the ATProto accounts referenced by these lists, anyone can see a complete picture of every user who has ever tried Anisota, as well as who is supporting it financially.</p>
<p>There are periodic membership checks under the hood as people use the app to ensure they're seeing what they should see... but ultimately the system isn't meant to be unhackable or like a fortress. That's by design.</p>
<p>If an enterprising tinkerer or hacker chooses to bypass my system and use the app's premium features long-term for free, then that's probably just bad karma for them cause I'm an independent artist just trying to make a living. Support my work instead! It's not expensive, helps ensure the app continues to live, and gives you a much better user experience. I might add additional security down the road if it becomes a problem, but for now it's fine.</p>
<p>And that's basically it. It's a relatively simple system and didn't take long to setup, and it's incredibly "ATProto-native". If you want to get an even clearer picture of the entire flow, keep reading for the granular details.</p>
<p>If you enjoyed this blog post, <a href="https://anisota.net">try Anisota</a> for yourself to experience social media in a dramatically different way. If you want to support my creative practice and see more of my work, consider <a href="https://anisota.net/settings/subscription">upgrading to a paid membership tier for Anisota</a> within the app's settings. &lt;3</p>
<p>P.S. I could have created a custom lexicon for the membership records, and I might in the future, but why complicate things unnecessarily? Also, by using Bluesky's list lexicon (app.bsky.graph.list), I could more easily take advantage of Bluesky's ecosystem and let people see these lists within the Bluesky app too.</p>
<p>The following is a more technical explainer for the nerds who are curious what's happening deeper below the surface. It was written by Claude who reviewed the codebase in Cursor and accurately describe the entire system in less than 2 minutes. I then reviewed and edited Claude's writing to ensure accuracy and contextual clarity.</p>
