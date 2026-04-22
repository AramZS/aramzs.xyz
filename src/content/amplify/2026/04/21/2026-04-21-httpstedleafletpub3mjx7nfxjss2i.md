---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Al5yz32nydpebjlcdfgycmf3x/3lylijxks5k2r/3mjx7nfxjss2i/opengraph-image?e2bb7203df6d3028
date: '2026-04-21T12:10:52.690Z'
dateFolder: 2026/04/21
description: >-
  This is a useful thought experiment even if it looks a bit silly on first
  read, since this is true for essentially all other systems. If your account
  host goes down, your account is boned.
isBasedOn: 'https://ted.leaflet.pub/3mjx7nfxjss2i'
link: 'https://ted.leaflet.pub/3mjx7nfxjss2i'
slug: 2026-04-21-httpstedleafletpub3mjx7nfxjss2i
tags:
  - tech
  - decentralization
title: Atmosphere Account Resilience
---
<p>These days I largely stay out of conversations about ActivityPub and atproto. Folks i respect like</p>
<p>@blaine.bsky.social</p>
<p>and</p>
<p>@thisismissem.social</p>
<p>have asserted that over time the paths that ActivityPub and atproto take will converge.</p>
<p>I think that arguing with one's metaphorical siblings is not fruitful and think it's more important to get folks using open social protocols in general.</p>
<p>Anyway, in a thread authored by my inability to follow my own advice, an conversationalist who asked to remain unnamed asserted an interesting claim:</p>
<blockquote data-index="3">But the really odd thing is, I had a similar experience with a (now former) long time mutual, where all I said was that I didn't think it would be possible to migrate 5-40 million active users within the Atmosphere if Bluesky's infrastructure disappeared.</blockquote>
<p>This is a useful thought experiment even if it looks a bit silly on first read, since this is true for essentially all other systems. If your account host goes down, your account is boned. For instance, this is enough of an issue in the Mastodon ecosystem that the <a href="https://joinmastodon.org/covenant">Mastodon server covenant</a> includes a 3 month notification period before shutting off a server:</p>
<blockquote data-index="5">Commitment to give users at least 3 months of advance warning in case of shutting down</blockquote>
<blockquote data-index="6">Sometimes services shut down, it is the cycle of life. But users must have the confidence that their account will not disappear overnight, so that they have time to export their data and find another server.</blockquote>
<p>This doesn't actually solve any problems in an exigent circumstance, but i think it's good to ask people to be nice.</p>
<p>What's more interesting to me is question in initial assertion. What would it take to rebuild the Atmosphere if Bluesky's servers got raptured tomorrow?</p>
<p>I think the floor for preservation would require 3 things, two of which we can do today.</p>
<ol start="1"><li><p data-index="10.1">Maintaining an up to date cache of the <code>app.bsky.graph.*</code> lexicons</p></li></ol>
<p>(and an optional 4th item, which is full backups of users accounts)</p>
<p>These top two items are things we can do today. Keeping a full backup of the PLC is feasible, and actively underway right now (see</p>
<p>@bad-example.com</p>
<p>'s <a href="https://plc.wtf/">https://plc.wtf/</a> ). Keeping a cached copy of the full follow graph is certainly feasible, and tools like <a href="https://github.com/bluesky-social/indigo/tree/main/cmd/tap">Tap</a>, <a href="https://tangled.org/ngerakines.me/ramjet">Ramjet</a>, or <a href="https://tangled.org/ptr.pet/hydrant">Hydrant</a> allow for both backfilling and maintaining up-to-date syncs of this subset of network traffic.</p>
<p>The third item is a gnarly problem. Bluesky <a href="https://whtwnd.com/bnewbold.net/3lj7jmt2ct72r">provides the ability for users to create and store their own account keys</a>, which would allow them to take control of their account details listed in the PLC.</p>
<p>However, vanishingly few users do, and awareness of this capability is low even among the tech literate userbase of bluesky. For users migrating away from Bluesky's PDS servers, PDS migration tools like <a href="https://pdsmoover.com/info">PDSMoover</a> and <a href="https://northskysocial.com/posts/migration">Northsky's</a> provide the ability to create these keys, but it's up to the users to keep and maintain them in.</p>
<p>So this is the unsolved problem that makes the initial assertion true for the vast majority of Bluesky's users.</p>
<p>There is absolutely a space for some project that would help users automatically create and store keys in whatever computing ecosystem they participate in (google, apple, firefox, 1password, etc), and restore or otherwise reassert control over their PLC identity.</p>
<p>For now, users who have created their own keys have recourse if Bluesky PBC's servers disappeared entirely, however unlikely that scenario is. But full restoration does take active work. Adding rotation keys, and maintaining active backups of the data stored in your PDS account.</p>
<p>But one of the things that's neat with atproto in this context is that there is a path, even if that path needs to be further surveying, engineering, and paving.</p>
