---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A44ybard66vv44zksje25o7dz/3m2x76zrtrs23/3mimokt4o5c2f/opengraph-image?e2bb7203df6d3028
date: '2026-04-04T13:51:58.587Z'
dateFolder: 2026/04/04
description: Proposes some small additions to lexicon schema language.
isBasedOn: 'https://bnewbold.leaflet.pub/3mimokt4o5c2f'
link: 'https://bnewbold.leaflet.pub/3mimokt4o5c2f'
slug: 2026-04-04-httpsbnewboldleafletpub3mimokt4o5c2f
tags:
  - tech
  - decentralization
title: Expanding the Lexicon Language
---
<figure><img alt="pizza with apple slices cooking in an oven" src="https://bnewbold.leaflet.pub/api/atproto_images?did=did:plc:44ybard66vv44zksje25o7dz&amp;cid=bafkreicfetxeuexkl4maufnjep6jdrk32kpes3vkviwugfbml6schmdwhe"/><figcaption>I've got a bunch of protocol pizza thoughts bottled up. Time to get writing!</figcaption></figure>
<p>This one is about some simple additions to the lexicon schema language to make it more useful. These would not impact the data model, just schema validation. I think these would are probably un-controversial and would not be a heavy lift to get in. On the other hand they aren't aligned with current roadmap priorities (permissioned data and account experience), so I don't know when these would actually get consensus and make their way in to specs and reference implementations.</p>
<p>The lexicon language can currently define objects with specific field names, and has an escape hatch for <code>unknown</code> objects with arbitrary nested fields. It also allows defining arrays with elements of a known type. But there isn't a way to define an object with arbitrary fields but a constrained value type.</p>
<p>Eg, to have internationalized variants of a string value, you could today define an array of objects:</p>
<pre><code>[
  { "lang": "ja", "text": "「こんにちは世界」" },
  { "lang": "pt-BR", "text": "Olá, Mundo!" },
  { "lang": "en", "text": "Hello, World!" }
]</code></pre>
<p>That's a bit messy because you could end up with multiple elements with the same <code>lang</code> field. It would be nice to instead have the lang code be the key:</p>
<pre><code>{
  "ja": { "text": "「こんにちは世界」" },
  "pt-BR": { "text": "Olá, Mundo!" },
  "en": { "text": "Hello, World!" }
}</code></pre>
<p>The value could even be simple strings:</p>
<pre><code>{
  "ja": "「こんにちは世界」",
  "pt-BR": "Olá, Mundo!",
  "en": "Hello, World!"
}</code></pre>
<p>To support this, I propose a new <code>map</code> definition type:</p>
<pre><code>{
  "type": "map",
  "description": "Internationalized salutations",
  "keys": {
    "type": "string",
    "format": "language"
  }
  "values": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string"
      }
    }
  }
}</code></pre>
<p>Keys would always need to have a string representation, and would usually be <code>type: string</code> with optional constraints (format, size, known values, etc).</p>
<p>Values could be almost any lexicon definition type: <code>object</code>, <code>string</code>, <code>boolean</code>, <code>unknown</code>, <code>union</code>, etc.</p>
<p>The <code>map</code> itself could also have min/max size restrictions, which would apply to the number of fields. There could be a flag to specify whether values are nullable or not.</p>
<p>AT URIs (<code>at://</code>) can already be represented in lexicons using the string <code>format: at-uri</code> constraint. But there is a fair amount of optionality in AT URI syntax, and all of these are considered valid:</p>
<pre><code>at://handle.example.com
at://handle.example.com/com.example.blog.profile
at://handle.example.com/com.example.blog.profile/self
at://did:plc:abc123/com.example.blog.profile/self</code></pre>
<p>If we adopt my <a href="https://bnewbold.leaflet.pub/3m5jsx7qrws2n">record versioning proposal</a>, there might also be "strong refs" with the record CID as an extra field:</p>
<pre><code>at://did:plc:abc123/com.example.blog.profile/self/bafyreiarlrgo3wgrpetjottkvjepio7nt2x6yc4jtb3f56kif7r4nmm7q4</code></pre>
<p>The strong norm for AT URIs inside records, referencing other records, is to use a DID in the authority place, and have a full record reference (including collection and rkey). But this is not enforced by lexicon validation! At the same time, in XRPC endpoint parameters, it can be helpful to keep things flexible and allow handles in the authority section (so that the calling client does not need to do handle-to-DID resolution locally).</p>
<p>Sometimes you also only want to allow references to specific record types (eg, a specific collection NSID), or to at least hint which collection types are expected.</p>
<p>To support all this flexibility, I propose a new <code>at-uri</code> lexicon definition type. These would get represented in the data model as strings, and there is a minorly-breaking transition path where existing <code>format: at-uri</code> string definitions could be switched to <code>at-uri</code>.</p>
<pre><code>{
  "type": "at-uri",
  "description": "Reference to parent of a bsky post",
  "allowAuthorityHandle": false,
  "specificity": "record",
  "collections": [
    "app.bsky.feed.post",
  ]
}</code></pre>
<p>I'm not sure if the default should be as flexible as the current string format, or more conservative (require DID in authority, and require collection and rkey).</p>
<p>Having the collection array be fixed and closed might be too brittle: maybe there will be an <code>app.bsky.feed.postV2</code> in the future, and it would be allowed in this place. Maybe it should be "open" by default, or called <code>knownCollections</code>.</p>
<p>Record keys can currently have the following format types:</p>
<p>We could extend that with some other sting formats:</p>
<p>Would be good to double-check that the record key generic syntax is compatible with all these first.</p>
<p>The motivation is to allow more flexibility in the design of record key-spaces. For example, if "follow" graph relationships had <code>did</code> record key format, and there was a requirement to have the subject DID match the record key, then the "double follow" constraint would be much easier to enforce.</p>
