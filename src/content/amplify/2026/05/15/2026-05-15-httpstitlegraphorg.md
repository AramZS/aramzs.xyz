---
author: The TitleGraph Project
cover_image: 'https://titlegraph.org/ogimage.png'
date: '2026-05-15T19:13:34.738Z'
dateFolder: 2026/05/15
description: >-
  An open, decentralized data schema built on the AT Protocol for syndicating
  streaming television metadata and VOD availability.
isBasedOn: 'https://titlegraph.org/'
link: 'https://titlegraph.org/'
slug: 2026-05-15-httpstitlegraphorg
tags:
  - tech
  - decentralization
title: The federated catalog standard for streaming television.
---
<p>TitleGraph is an open, decentralized data schema built on the AT Protocol. It provides a universal vocabulary for streaming networks to syndicate VOD catalogs, live broadcast events, and commercial availability windows.</p>
<h3>Separating the art from the commerce.</h3>
<p>Legacy entertainment metadata binds the creative work to its commercial distribution, creating fragmented, proprietary silos. TitleGraph introduces a strict architectural decoupling designed for the federated web.</p>
<p>Mapped strictly to <code>schema.org/CreativeWork</code>, this namespace defines the immutable, canonical record of the media: Movies, Series, Seasons, and Collections. It defines what the art is, universally.</p>
<p>Mapped to <code>schema.org/Offer</code> and <code>BroadcastEvent</code>, this namespace defines the commercial topology. It handles complex geo-fencing, spotbeams, blackout policies, and VOD pricing logic independent of the underlying asset.</p>
<h2>Built for the AT Protocol.</h2>
<p>By leveraging cryptographic DIDs and Personal Data Servers (PDS), streaming networks can cryptographically sign and syndicate their availability data to a global, decentralized firehose.</p>
<pre>"$type": "org.titlegraph.delivery.offer",
"entitlementRef": "at://did:plc:x/org.titlegraph.delivery.bundle/hbo",
"offerGeoEligibility": {
  "includes": { "countries": ["US", "CA"] },
  "excludes": { "postalCodes": ["90210"] }
},
"price": 14.99,
"currency": "USD"</pre>
