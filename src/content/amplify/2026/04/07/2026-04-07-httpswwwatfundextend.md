---
author: at.fund
cover_image: 'https://at.fund/opengraph-image'
date: '2026-04-07T15:52:52.123Z'
dateFolder: 2026/04/07
description: >-
  No VCs, no ads — just builders getting paid directly for the work you already
  rely on.
isBasedOn: 'https://www.at.fund/extend'
link: 'https://www.at.fund/extend'
slug: 2026-04-07-httpswwwatfundextend
tags:
  - tech
  - decentralization
title: fund.at.*
---
<p>Integrate funding discovery into your app — embeds and APIs for accessing fund.at records on the AT Protocol.</p>
<p>at.fund data is open. Builders, funding links, and endorsements on the network are accessible through our API — no authentication required. Build integrations, embed support buttons, or create your own tools on top of the <code>fund.at.*</code> lexicon.</p>
<h3>Embed a button</h3>
<p>Drop a support button into any page with a single iframe. Customize the styling to match your site.</p>
<h3>Query the API</h3>
<p>Resolve any handle, DID, or hostname to get identity, funding, and capabilities. Public endpoints — no auth needed.</p>
<p><a href="https://www.at.fund/spec"><h3>Read the Lexicon</h3><p>Full schema reference for the fund.at.* lexicon — record types, field semantics, and ATProto conventions.</p></a></p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://www.at.fund/embed/atprotocol.dev">View content ↗ </a></p></figure>
<p><code>GET /api/steward?uri=atprotocol.dev</code></p>
<pre>{
  "uri": "atprotocol.dev",
  "did": "did:plc:lehcqqkwzcwvjvw66uthu5oq",
  "handle": "atprotocol.dev",
  "tags": [
    "tool"
  ],
  "displayName": "AT Protocol Community",
  "contributeUrl": "https://opencollective.com/atprotocoldev",
  "source": "manual"
}</pre>
<pre>&lt;iframe
  src="https://at.fund/embed/atprotocol.dev"
  style="border: none; border-radius: 12px; width: 260px; height: 120px;"
  title="Support on at.fund"
&gt;&lt;/iframe&gt;</pre>
<p>Direct from the PDS</p>
<p>You can fetch fund.at records directly from the AT Protocol network. Each record is stored on the user's own PDS.</p>
<pre>// Fetch fund.at data directly from the AT Protocol network.
// Uses the Bluesky AppView as a public resolver — any compatible endpoint works.

async function getFundingInfo(handle) {
  // 1. Resolve handle → DID
  const resolve = await fetch(
    `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`
  )
  const { did } = await resolve.json()

  // 2. Resolve DID → PDS URL (from DID document)
  const plcRes = await fetch(`https://plc.directory/${did}`)
  const didDoc = await plcRes.json()
  const pds = didDoc.service?.find(s =&gt; s.id === '#atproto_pds')?.serviceEndpoint

  // 3. Fetch the funding record from their PDS
  const record = await fetch(
    `${pds}/xrpc/com.atproto.repo.getRecord?repo=${did}&amp;collection=fund.at.funding.contribute&amp;rkey=self`
  )
  const { value } = await record.json()

  return { did, pds, contributeUrl: value?.url }
}

// Usage
const info = await getFundingInfo('atprotocol.dev')
console.log(info.contributeUrl) // "https://..."</pre>
<p>GET<code>/api/steward</code></p>
<p>Thin resolution — identity + funding only. No capability discovery or transitive dependency resolution. Use /api/entry for full resolution including capabilities and dependencies.</p>
