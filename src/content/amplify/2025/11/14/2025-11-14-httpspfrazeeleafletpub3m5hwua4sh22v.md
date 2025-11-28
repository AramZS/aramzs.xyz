---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Aragtjsm2j2vknwkz3zp4oxrd/3ly4hnkatvc2p/3m5hwua4sh22v/opengraph-image?04f9dc33b3d4fbe5
date: '2025-11-14T12:51:11.856Z'
dateFolder: 2025/11/14
description: >-
  There's a surprisingly nuanced discussion in development about the political
  economy of clients and servers in the Atmosphere
isBasedOn: 'https://pfrazee.leaflet.pub/3m5hwua4sh22v'
link: 'https://pfrazee.leaflet.pub/3m5hwua4sh22v'
slug: 2025-11-14-httpspfrazeeleafletpub3m5hwua4sh22v
tags:
  - code
  - decentralization
title: The politics of purely client-side apps
---
<p>There's a surprisingly nuanced discussion in development about the political economy of clients and servers in the Atmosphere</p>
<p>You make a post on Bluesky. How does it happen?</p>
<p>Option 1:</p>
<p>Option 2:</p>
<p>Both of these are now possible in the Atmosphere, but which of these options is the "good one"? It turns out, that's a pretty nuanced question.</p>
<h2 data-index="6">Option 1 - PDS proxies all traffic</h2>
<p>Option 1 is the "PDS proxies all traffic" philosophy. In this model, the client logs into the PDS and then sends all traffic to the Atmosphere by proxying through the PDS.</p>
<p>This has some interesting consequences:</p>
<p>1. The client mutates records by directly writing them to the PDS</p>
<p>2. The PDS is able to intercept and modify traffic to apps</p>
<p>3. There's no opportunity for server-side computation within the lifetime of a transaction</p>
<p>Points 1 &amp; 2 have positive political implications. The ability to write directly to a PDS means that third-party "pure clients" (no backend of their own) have a lot of freedom in how they operate. Then the ability to intercept and modify traffic means that a PDS can make decisions on behalf of their users which might be contrary to the application's decisions. These are both good balances against the power of an app.</p>
<p>Point 3 just sucks though. What's not obvious about Option 1's flow is that the time between "200 OK" and "Bluesky servers index the record" is indeterminate. The 200 OK ends the transaction from the client's perspective, so now the client is going to struggle to show the user the actions they just took.</p>
<p>Right now, the PDS takes advantage of traffic interception to modify <code>getPostThread</code> and inject the user's recent posts. That does work, but it means the PDS has Bluesky business logic baked in. Not only is that a conceptual violation of the PDS -- which is supposed to be generic -- but it's an option that's not available to every app.</p>
<h2 data-index="15">Option 2 - App server speaks to PDS</h2>
<p>Option 2 is the "App server speaks to PDS" philosophy. In this model, the client logs into the app, which in turn logs into the PDS, and then the client speaks entirely to the app. The app then talks to the PDS directly to modify requests.</p>
<p>This basically removes all 3 of the consequences in Option 1. There's no problem of ensuring actions are immediately visible to users after a transaction, but now the client isn't in communication with the PDS so the political power of the PDS is reduced.</p>
<h2 data-index="18">Which should we do here?</h2>
<p>Ultimately, the Atmosphere community is going to need to align on one of these two methods. The Bluesky app still uses Option 1, but now that OAuth is here the guidance we've been giving is Option 2. Is that the right call?</p>
<p>I'm really torn on this. I'm going to just dump an assortment of thoughts, some of which are contradictory.</p>
<ul><li><p data-index="21.1">It sucks when you're building purely client-side and can't do exactly what you want to do, or can't make your customizations perform well</p> </li><li><p data-index="21.5">It's currently too expensive to build full network app servers in the Atmosphere</p> </li><li><p data-index="21.7">The role of the PDS within the political economy of the atmosphere is still not totally clear, but acting as some kind of counterbalance to applications is a really promising idea if we could get more clarity on how that will work</p> </li></ul>
<p>My gut says we should be leaning towards Option 2 because it's clearer and because it enables app developers to do more. To handle the costs I'm inclined to think that Bluesky's servers should be available almost like a cloud service, which would drive down costs a lot and generally increase the ability for third-party apps to implement new or different behaviors. This would essentially transfer the political power of the PDS (ie to intercept and modify traffic) over to the third-party applications.</p>
<p>Just some thoughts.</p>
