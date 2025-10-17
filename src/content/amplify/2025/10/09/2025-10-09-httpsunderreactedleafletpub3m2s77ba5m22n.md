---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Afpruhuo22xkm5o7ttr2ktxdo/underreacted/3m2s77ba5m22n/opengraph-image?04f9dc33b3d4fbe5
date: '2025-10-09T22:27:27.635Z'
dateFolder: 2025/10/09
description: 3. other tools might start using lexicons.
isBasedOn: 'https://underreacted.leaflet.pub/3m2s77ba5m22n'
link: 'https://underreacted.leaflet.pub/3m2s77ba5m22n'
slug: 2025-10-09-httpsunderreactedleafletpub3m2s77ba5m22n
tags:
  - code
  - decentralization
title: how to manage your AT Lexicons with lpm
---
<p>if you're writing an AT application you probably have a <code>lexicons</code> folder in your repo with all of your Lexicons in JSON.</p>
<p>it might look something like this</p>
<figure><img alt="a tree view of lexicon/ folder with a bunch of json in it" src="https://underreacted.leaflet.pub/api/atproto_images?did=did:plc:fpruhuo22xkm5o7ttr2ktxdo&amp;cid=bafkreihipol665tt6qznf23ehv2y654imiebolwk67xklojpeknj2ucvye"/><figcaption>this is fine and it works but it's a bit annoying to keep them up to date or even to find them in the first place.</figcaption></figure>
<p>luckily <a href="https://bsky.app/profile/tom.sherman.is">Tom Sherman</a> made a little utility called lpm that does this for you. it's prerelease software so maybe don't depend on it in "production" yet but i tried it and it seemed pretty solid.</p>
<pre><code>{
  "lexicons": [
    "app.bsky.actor.defs",
    "com.atproto.repo.uploadBlob",
    "com.atproto.repo.strongRef",
    "com.atproto.repo.putRecord",
    "com.atproto.repo.listRecords",
    "com.atproto.repo.listMissingBlobs",
    "com.atproto.repo.importRepo",
    "com.atproto.repo.getRecord",
    "com.atproto.repo.describeRepo",
    "com.atproto.repo.deleteRecord",
    "com.atproto.repo.defs",
    "com.atproto.repo.createRecord",
    "com.atproto.repo.applyWrites"
  ]
}</code></pre>
<p>now whenever i want to fetch them based on this file, i can do <code>lpm fetch</code> them again.</p>
<p>1. copy pasting json is kinda silly and it makes sense to have a package manager for that</p>
<p>2. this relies on <a href="https://atproto.com/specs/lexicon#lexicon-publication-and-resolution">Lexicon Resolution</a> which hopefully will lead more of the community to publish their lexicons via DNS so they can be resolved with other tooling, like <a href="https://resolve-lexicon.pages.dev/">resolve-lexicon</a> and equivalents</p>
<p>3. other tools might start using <code>lexicons.json</code> as source of truth for "which external lexicons are you depending on?" which might be handy! for example i might rely on this convention in <a href="https://tangled.org/@danabra.mov/typelex/issues/5">Typelex</a> where i need to know which lexicons are being vendored in</p>
<p>lpm is in an early phase right now but i think it's cool and i want more people to check it out. thank you for reading</p>
