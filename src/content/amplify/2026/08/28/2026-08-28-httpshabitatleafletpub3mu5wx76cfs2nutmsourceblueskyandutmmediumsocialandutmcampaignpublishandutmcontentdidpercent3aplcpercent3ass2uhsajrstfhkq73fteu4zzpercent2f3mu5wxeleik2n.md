---
author: 'building [at] habitat'
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Ass2uhsajrstfhkq73fteu4zz/3mdehxyuunk2g/3mu5wx76cfs2n/opengraph-image-1qv6ug?3525228eea30403c
date: '2026-08-28T18:15:13.212Z'
dateFolder: 2026/08/28
description: 'The one where we don''t release an API :)'
isBasedOn: >-
  https://habitat.leaflet.pub/3mu5wx76cfs2n?utm_source=bluesky&utm_medium=social&utm_campaign=publish&utm_content=did%3Aplc%3Ass2uhsajrstfhkq73fteu4zz%2F3mu5wxeleik2n
link: >-
  https://habitat.leaflet.pub/3mu5wx76cfs2n?utm_source=bluesky&utm_medium=social&utm_campaign=publish&utm_content=did%3Aplc%3Ass2uhsajrstfhkq73fteu4zz%2F3mu5wxeleik2n
slug: >-
  2026-08-28-httpshabitatleafletpub3mu5wx76cfs2nutmsourceblueskyandutmmediumsocialandutmcampaignpublishandutmcontentdidpercent3aplcpercent3ass2uhsajrstfhkq73fteu4zzpercent2f3mu5wxeleik2n
tags:
  - tech
  - decentralization
title: 'Habitat''s road to release: 04 Chalk'
---
<p>The one where we don't release an API :)</p>
<p>Today, Habitat is sharing Chalk, a document editor built on top of <a href="https://github.com/bluesky-social/proposals/tree/main/0016-permissioned-data">atproto spaces</a> and our API for <a href="https://habitat.leaflet.pub/3mtmqvao7oc2q">relationship-based access control</a>. We built Chalk because we wanted to demonstrate how atproto spaces can support rich permission-ing beyond big-web <a href="https://dholms.leaflet.pub/3mu3p3ldwrc26#design-goals">social use cases</a> that they were designed for. At Habitat, we're interested in enabling the organizations to own the data underneath the tools they use to communicate and collaborate. We think the future of these tools will be similarly ~atmospheric~, in the sense that data from one may be reused and remixed in others. However, these workplace tools need fine-grained permissions and access controls over small artifacts such as documents, pages, calendar invites, etc.</p>
<p>As an early proof of concept that spaces can support this, we prototyped <a href="https://chalk.habitat.network/">Chalk</a>, a collaborative document editor that embraces atproto's data ownership model. Each user contributes changes to their own PDS space repo and our AppView uses spaces to sync and merge those changes into a shared document. Importantly, all of the information needed by the AppView is written into the space. This means other AppViews can use the same data to interoperate, enabling cross app collaborative editing.</p>
<p>Screenshot of Chalk:</p>
<p>Chalk utilizes a couple technologies including some of our own recent releases:</p>
<p>We think of spaces as encapsulating a permission boundary. Since every doc has its own readers and writers, we create a new space per doc.</p>
<p>Example view of a space</p>
<figure><img alt="An example doc space with members and repos" src="https://habitat.leaflet.pub/api/atproto_images?did=did:plc:ss2uhsajrstfhkq73fteu4zz&amp;cid=bafkreic6jr2hm4ssvxexnhv5ek66wdytnkcgykmbyf6plosprg5hmi2y2i&amp;width=1200&amp;v=1"/><figcaption>An example doc space with members and repos</figcaption></figure>
<p>Using our ReBAC API, we can specify which users have permission to write into the space + add other collaborators ("editors") and which users can only read from the space ("viewers"). Since this information is encoded as "relation" records in the space itself, AppViews can crawl that information and enforce those same rules at request time. Of course, even if an AppView doesn't enforce write rules, the underlying space itself is well permissioned and will only expose repos of members with sufficent roles.</p>
<p>A writer relation to a doc</p>
<figure><img alt="Example relation record granting a user permission to write into the space" src="https://habitat.leaflet.pub/api/atproto_images?did=did:plc:ss2uhsajrstfhkq73fteu4zz&amp;cid=bafkreihut6rk6lkyzfio76yaoc7vigqbqcccyrzrlwml2mvxfahx6dnmuy&amp;width=1200&amp;v=1"/><figcaption>Example relation record granting a user permission to write into the space</figcaption></figure>
<p>Our ReBAC API also partially solves the <a href="https://discourse.atmosphere.community/t/discoverability-of-spaces-at-the-protocol-level-for-permissioned-spaces/1072/4">space discovery</a> problem with <code>network.habitat.relationship.listRelatedSpaces</code> so users can see which docs they've been granted access to in their home page.</p>
<p>"Shared with me" view in Chalk</p>
<figure><img alt="Screenshot from Chalk's home page that lists all the docs a user has permission to" src="https://habitat.leaflet.pub/api/atproto_images?did=did:plc:ss2uhsajrstfhkq73fteu4zz&amp;cid=bafkreib5zhk63mpeem5nrl5tzmnmaxddkg2wc6o5rhdceexi7bakin253u&amp;width=1200&amp;v=1"/><figcaption>Screenshot from Chalk's home page that lists all the docs a user has permission to</figcaption></figure>
<p>Whenever a user wants to contribute to a doc, they write a Yjs CRDT update diff into their repo within the doc's space. An AppView that syncs that space will be notified whenever there are new updates. The AppView can construct the full doc from each of these diffs and serve it to the user.</p>
<figure><img alt="An example CRDT update record a user writes into their own repo in a doc space" src="https://habitat.leaflet.pub/api/atproto_images?did=did:plc:ss2uhsajrstfhkq73fteu4zz&amp;cid=bafkreiaxocjlff7qsh7e4dh2o5ixtrhbajuiixpl6ff6uihxotruwaodui&amp;width=1200&amp;v=1"/><figcaption>An example CRDT update record a user writes into their own repo in a doc space</figcaption></figure>
<p>Since the spaces sync protocol notifies registered AppViews for updates, an AppView can subscribe to updates from all editors in the space including those from other AppViews! Each PDS can't guarantee timely delivery of these notifications though. We're currently using Cloudflare Durable Objects to paper over the realtime updates within our AppView. However, we're thinking about building realtime pubsub rooms around spaces that all AppViews could subscribe to (more on that in future posts 👀).</p>
<p>Head on over to <a href="https://chalk.habitat.network">https://chalk.habitat.network</a> and sign in with your regular atproto account. You can inspect the records being written at <a href="https://home.habitat.network">https://home.habitat.network</a>. Let us know about any issues, questions, or any ideas around Chalk, spaces, ReBAC etc on our Discord: <a href="https://discord.gg/dCQ6YUMGPx">https://discord.gg/dCQ6YUMGPx</a></p>
<p>Excited to keep the discussion going and continue our road to release series with more mini launches like this!</p>
<p>-Habitat team 📑</p>
