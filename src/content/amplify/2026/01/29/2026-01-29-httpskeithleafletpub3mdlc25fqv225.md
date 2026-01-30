---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A5qartdsce62n2wfyvtocmoob/3mdlag6wb3s2k/3mdlc25fqv225/opengraph-image?e2bb7203df6d3028
date: '2026-01-30T00:43:15.927Z'
dateFolder: 2026/01/29
description: not saying that it's perfect (it's not)
isBasedOn: 'https://keith.leaflet.pub/3mdlc25fqv225'
link: 'https://keith.leaflet.pub/3mdlc25fqv225'
slug: 2026-01-29-httpskeithleafletpub3mdlc25fqv225
tags:
  - social media
  - decentralization
title: 'labels: content moderation that doesn''t suck'
---
<p>i just added label support to <a href="https://pollen.place">pollen</a> (does not load right now 😅 - it's a tumblr-esque microblog. might just be for me. idk!) and the way <a href="https://atproto.com/">atproto</a> handles moderation is genuinely clever. it's composable in a way that actually makes sense.</p>
<p>labels are just metadata</p>
<p>a label is someone saying "this thing has this property" at a specific time:</p>
<pre><code>{
  src: "did:plc:ar7c4by46qjdydhdevvrndac",  // who applied it
  uri: "at://did:plc:someone/app.bsky.feed.post/abc123",  // what
  val: "porn",  // the label
  neg: false,  // true = remove this label
  cts: "2024-01-01T00:00:00Z"
}
</code></pre>
<p>that's it. the <a href="https://atproto.com/specs/label">label spec</a> has all the details but the core idea is really simple.</p>
<p>you pick your labelers</p>
<p>that src field is a DID, the labeler's identity. bluesky runs one at <a href="https://bsky.app/profile/moderation.bsky.app">mod.bsky.app</a> but anyone can run one.</p>
<p>you know those labels on bluesky showing posting frequency or which network someone bridged from? same exact system. someone runs a labeler that watches for whatever criteria and applies labels. you subscribe, you see them.</p>
<p><a href="https://bsky.app/profile/profile-labels.bossett.social">profile labeller</a> (flags rapid posters, bridged accounts, incomplete profiles)? labeler. <a href="https://bsky.app/profile/xblock.aendra.dev">xblock</a> (hides screenshots from twitter and threads)? also a labeler. for something like pollen, you could imagine labelers for common tumblr-style needs: flagging unsourced art reposts, marking accounts that don't tag their content, hiding screenshots from other platforms. the serious moderation stuff and the community norms stuff run on identical infrastructure. i love this.</p>
<p>in your settings you pick which labelers to trust and what each label should do.</p>
<p>three things labels can do</p>
<p>labels can be negated with neg: true if someone made a mistake. they can also expire, which matters because posting behavior yesterday shouldn't follow you forever.</p>
<p>subscribing to the stream</p>
<p>labelers expose a websocket:</p>
<pre><code>wss://mod.bsky.app/xrpc/com.atproto.label.subscribeLabels
</code></pre>
<p>labels stream in as they're applied. it's <a href="https://cbor.io/">cbor</a>-encoded, not json, which confused me for about an hour until i found <a href="https://github.com/kriszyp/cbor-x">cbor-x</a>. i honestly don't know what cbor is. you can pass a cursor to resume where you left off. <a href="https://docs.bsky.app/docs/api/com-atproto-label-subscribe-labels">subscription docs here</a>.</p>
<p>the same system powers "this is csam, filter it" and "this person uses arch linux, lol". that's good design.</p>
<p>what i could have done with this in the past</p>
<p>i spent five years at 🎏 glitch (rip), and content moderation was a constant headache no matter the size of the company. small team, endless scammers, crypto spam, phishing sites, the occasional person hosting malware. we built our own moderation tools, hired people, and still couldn't keep up.</p>
<p>with something like these labels, we could have done what we were already doing (running our own moderation, flagging spam and scams) but also subscribed to community efforts. imagine a labeler run by security researchers flagging known phishing kits. or a community-maintained list of crypto scam templates. we wouldn't have to trust them blindly—we could evaluate the labeler's track record and decide how to handle each label type.</p>
<p>we built some of this internally (flagging patterns across projects, sharing signals between moderation decisions) but it was bespoke and isolated. creating screenshots of projects when they load and comparing them to other scams. those are things that at the least we could have been open-sourcing to the rest of the community.</p>
