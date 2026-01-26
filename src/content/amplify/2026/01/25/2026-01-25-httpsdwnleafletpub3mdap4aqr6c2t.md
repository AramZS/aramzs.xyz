---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Aqvns4x6h3hl7cqygv5336grl/3lzsznxg5ms2i/3mdap4aqr6c2t/opengraph-image?e2bb7203df6d3028
date: '2026-01-25T22:37:04.516Z'
dateFolder: 2026/01/25
description: Backfill-friendly record design
isBasedOn: 'https://dwn.leaflet.pub/3mdap4aqr6c2t'
link: 'https://dwn.leaflet.pub/3mdap4aqr6c2t'
slug: 2026-01-25-httpsdwnleafletpub3mdap4aqr6c2t
tags:
  - code
  - decentralization
title: States with Timestamp
---
<p>Bluesky has been criticized for the fact that many things being centralized, In the development of AtmoType we considers decentralized more, so I came up with a idea to store "states with timestamp" in my AtmoType.</p>
<p>It's backfill-friendly, thus different AppView can have the same behaviour.</p>
<p>Take post interaction settings as an example, Bluesky uses an app.bsky.feed.threadgate record attached to your post, and in the record only presents the current state that who can reply, so when there's an AppView backfilling the whole record, some replies shall show or hide differently from other AppViews.</p>
<p>I decided to make the states as a list, containing an object showing what state it is and when it started, like this pseudo-code which implements the threadGate record to my version:</p>
<pre><code>{
  post: "at://redacted", // here links post
  log: [ // log that track the history of the threadgate
    {
      timestamp: "2026-01-25T11:11:11:111Z", // timestamp
      content: { allow: [] }, // allow no one to reply
    },
    {
      timestamp: "2026-01-25T22:22:22.222Z", // newer timestamp
      content: {}, // no limitations
    },
  ],
}</code></pre>
<p>Still a draft and needs someone brainstorming with me! Feel free to mention this post with your idea ;)</p>
<p><a data-index="8" href="https://at.zeoseven.com/@dwn/fffb5302">咱知道 Bluesky 被人批评说“很多东西都是去中心化的”，在 AtmoType 构思架构的时候也考虑到这么一点。于是就想到在 PDS（相当于分离的数据库）上存所谓“时序元数据”，也就是说提供日志式的数据来筛选不必要的评论https://at.zeoseven.com/@dwn/fffb5302</a></p>
