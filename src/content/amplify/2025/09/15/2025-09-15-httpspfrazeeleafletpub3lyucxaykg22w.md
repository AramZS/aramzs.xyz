---
author: Paul Frazee
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Aragtjsm2j2vknwkz3zp4oxrd/Paul's%2520Leaflets/3lyucxaykg22w/opengraph-image?04f9dc33b3d4fbe5
date: '2025-09-15T12:35:59.068Z'
dateFolder: 2025/09/15
description: 'It should be called an API server, App server, or backend.'
isBasedOn: 'https://pfrazee.leaflet.pub/3lyucxaykg22w'
link: 'https://pfrazee.leaflet.pub/3lyucxaykg22w'
slug: 2025-09-15-httpspfrazeeleafletpub3lyucxaykg22w
tags:
  - code
  - tech
  - decentralization
title: We probably need to rename the AppView
---
<p>I'm firing this post off as I'm late to breakfast so this will be quick.</p>
<p>Lately I've been trying to compress the ideas of AT a bit, because its lego-pieces modularity is wonderful but not exactly conducive to fast learning.</p>
<p>When I boil it down it comes to this:</p>
<figure><img src="https://pfrazee.leaflet.pub/api/atproto_images?did=did:plc:ragtjsm2j2vknwkz3zp4oxrd&amp;cid=bafkreihx5gnimoktlouqqohuhex57az7l3vuqr6nvbpvfnrvgqcalhalvi"/></figure>
<p>The name AppView came from a database processing ETL mindset, like a materialized view in postgres. It was from very early days. It was meant to describe how applications aggregate data from the network rather than containing their own data; it felt important to distinguish the app was not the primary source of the data but rather a secondary view.</p>
<p>At this point, it seems better to just call it an App and then explain that the data gets stored in the PDS, like a kind of universal cloud filesystem or datastore.</p>
<p>We also need to talk about the confusion about frontend vs backend in all this. The end-user experience of "app" tends to be the frontend. This means frontends that use the bluesky backend are running into some wonky challenges about what they meaningfully own, eg whether they fully control moderation or not.</p>
