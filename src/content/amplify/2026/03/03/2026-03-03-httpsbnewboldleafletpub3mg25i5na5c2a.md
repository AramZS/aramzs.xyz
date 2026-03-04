---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A44ybard66vv44zksje25o7dz/3m2x76zrtrs23/3mg25i5na5c2a/opengraph-image?e2bb7203df6d3028
date: '2026-03-03T06:44:08.507Z'
dateFolder: 2026/03/03
description: mini-proposal for referencing atproto blobs in AT-URIs
isBasedOn: 'https://bnewbold.leaflet.pub/3mg25i5na5c2a'
link: 'https://bnewbold.leaflet.pub/3mg25i5na5c2a'
slug: 2026-03-03-httpsbnewboldleafletpub3mg25i5na5c2a
tags:
  - code
  - decentralization
title: Blob AT-URIs
---
<figure><img src="https://bnewbold.leaflet.pub/api/atproto_images?did=did:plc:44ybard66vv44zksje25o7dz&amp;cid=bafkreield5fwjoy7zwmk5gxhnwg6s6lk5rbckxdluzjn4b4mizgid3hhua"/></figure>
<p>In atproto, "<a href="https://atproto.com/specs/blob">blobs</a>" are media files stored separately from repository records. They are content addressed (by CID), but published separately per account. That means they are identified in the network (and can be resolved/fetched) by a DID and a CID together.</p>
<p>There is a consistent way to reference blobs from within a data record: the <code>$type: blob</code> data type, which includes a cid-link. But sometimes it would be nice to reference them in a simple URI string There isn't a burning need for this right now, so who knows when this might get added to the specifications, but I have a simple proposal: treat the string "blob" like a pseudo-NSID.</p>
<p>That would mean AT-URIs like:</p>
<pre><code>at://did:plc:44ybard66vv44zksje25o7dz/blob/bafkreida2lp6lxyk4oswx3mgsuxfniiptoa753i7fe7of7guq2x5pmzb3u</code></pre>
<p>This isn't valid AT-URI syntax today, because the first path segment isn't an NSID. But it would be pretty simple to add exception to the spec for keywords like "blob". NSIDs require at least one period, so there is no ambiguity or change of confusion. The URI format wouldn't include the additional blob metadata (like mimetype or size), but I think that is fine.</p>
