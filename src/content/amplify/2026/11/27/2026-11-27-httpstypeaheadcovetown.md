---
author: typeahead.cove.town
cover_image: 'https://typeahead.cove.town/og.png'
date: '2026-11-27T15:49:32.415Z'
dateFolder: 2026/11/27
description: Handle typeahead for atproto.
isBasedOn: 'https://typeahead.cove.town/'
link: 'https://typeahead.cove.town/'
slug: 2026-11-27-httpstypeaheadcovetown
tags:
  - code
  - tech
  - decentralization
title: tern · typeahead for atproto
---
<div><section aria-labelledby="use">
<h2>API</h2>
<p>
<span>GET</span>
<code>https://typeahead.cove.town/xrpc/town.cove.actor.searchActorsTypeahead</code>
<button type="button">Copy</button>
</p>
<ul>
<li><code>q</code> search text, like <code>jay</code> or <code>jay graber</code></li>
<li><code>limit</code> 1 to 100, default 10</li>
</ul>
<pre><code>curl 'https://typeahead.cove.town/xrpc/town.cove.actor.searchActorsTypeahead?q=jay&amp;limit=2'</code></pre>
<pre><code>{
  "actors": [
    {
      "did": "did:plc:oky5czdrnfjpqslsw2a5iclo",
      "handle": "jay.bsky.team",
      "displayName": "Jay 🦋",
      "avatar": "https://cdn.bsky.app/img/avatar/plain/…"
    },
    …
  ]
}</code></pre>
<p>Also available as <code>app.bsky.actor.searchActorsTypeahead</code>.</p>
<p>
      Search client attribution is powered by <code>Referer</code> for browser based apps, and <code>User-Agent</code> for any other apps.
      Use a format like <code>MyApp/1.0 (+https://myapp.example)</code> and it'll show up as <code>myapp.example</code> under Apps.
    </p>
</section>
</div>
