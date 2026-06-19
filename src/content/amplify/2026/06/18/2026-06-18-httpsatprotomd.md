---
author: atproto.md
cover_image: 'https://atproto.md/og.png'
date: '2026-06-18T22:45:19.485Z'
dateFolder: 2026/06/18
description: >-
  AT Protocol data as clean Markdown. Any collection on any PDS — first-party
  Bluesky or third-party lexicons.
isBasedOn: 'https://atproto.md/'
link: 'https://atproto.md/'
slug: 2026-06-18-httpsatprotomd
tags:
  - ai
  - decentralization
title: atproto.md — AT Protocol data as Markdown
---
<p>atproto.mdread-only · markdown · no-auth live</p>
<p>~ ▸curl atproto.md/at://{actor}/{collection}/{rkey}</p>
<h1>atproto.md</h1>
<p>AT Protocol data as clean Markdown. Any collection on any PDS — first-party Bluesky or third-party lexicons. No auth, no API key.</p>
<h2>routes</h2>
<p>GET/at://{actor}</p>
<p>Repo overview — every collection in the repo.</p>
<p><a href="https://atproto.md/at://bsky.app">/at://bsky.app</a></p>
<p>GET/at://{actor}/{collection}</p>
<p>List records in any collection on any PDS. Paginated.</p>
<p><a href="https://atproto.md/at://bsky.app/app.bsky.feed.post">/at://bsky.app/app.bsky.feed.post</a></p>
<p>GET/at://{actor}/{collection}/{rkey}</p>
<p>Fetch a single record by rkey.</p>
<p><a href="https://atproto.md/at://bsky.app/app.bsky.actor.profile/self">/at://bsky.app/app.bsky.actor.profile/self</a></p>
<p>GET/backlinks/{at-uri-or-did-or-url}new</p>
<p>Who links to a target — likes, reposts, replies, follows, or any lexicon.</p>
<p><a href="https://atproto.md/backlinks/at://did:plc:btxrwcaeyodrap5mnjw2fvmz/site.standard.document/3md4qsktbms24">/backlinks/at://…/site.standard.document/3md4qsktbms24</a></p>
<p>GET/discover/{collection}new</p>
<p>Every repo on the network using a lexicon.</p>
<p><a href="https://atproto.md/discover/site.standard.document">/discover/site.standard.document</a></p>
<p>GET/lexicon/{nsid}new</p>
<p>Resolve a Lexicon schema by NSID — DNS <code>_lexicon</code> TXT → DID → schema record.</p>
<p><a href="https://atproto.md/lexicon/app.bsky.feed.post">/lexicon/app.bsky.feed.post</a></p>
<p>GET/plc/audit/{actor}new</p>
<p>PLC audit log — PDS migrations, handle changes, and key rotations over time.</p>
<p><a href="https://atproto.md/plc/audit/bsky.app">/plc/audit/bsky.app</a></p>
<p>GET/plc/data/{actor}new</p>
<p>Current PLC state — active PDS, handles, signing key, and rotation keys.</p>
<p><a href="https://atproto.md/plc/data/bsky.app">/plc/data/bsky.app</a></p>
<p>GET/plc/last/{actor}new</p>
<p>The most recent PLC operation and the state it established.</p>
<p><a href="https://atproto.md/plc/last/bsky.app">/plc/last/bsky.app</a></p>
<p>GET/resolve/{actor}</p>
<p>Full identity chain — handle → DID → DID document → PDS endpoint.</p>
<p><a href="https://atproto.md/resolve/bsky.app">/resolve/bsky.app</a></p>
<h2>try it</h2>
<pre><code># resolve a profile~ ▸ curl https://atproto.md/at://bsky.app/app.bsky.actor.profile/self # find everyone using a lexicon~ ▸ curl https://atproto.md/discover/site.standard.document # latest posts~ ▸ curl "https://atproto.md/at://bsky.app/app.bsky.feed.post?limit=5"
</code></pre>
<h2>for llm agents</h2>
<p><a href="https://atproto.md/skill.md">/skill.md</a>· <a href="https://atproto.md/llms.txt">/llms.txt</a>·MCP at /mcp</p>
<pre><code># install the MCP server in Claude Code~ ▸ claude mcp add --transport http atproto-md https://atproto.md/mcp # or save the skill as a slash command~ ▸ curl -s https://atproto.md/skill.md &gt; ~/.claude/commands/atproto.md
</code></pre>
