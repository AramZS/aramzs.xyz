---
author: happyview.dev
cover_image: 'https://happyview.dev/img/og.png'
date: '2026-07-02T15:12:22.557Z'
dateFolder: 2026/07/02
description: 'Service identity, permissioned spaces, and new blob utilities.'
isBasedOn: 'https://happyview.dev/blog/happyview-2.10'
link: 'https://happyview.dev/blog/happyview-2.10'
slug: 2026-07-02-httpshappyviewdevbloghappyview-210
tags:
  - code
  - decentralization
title: HappyView v2.10
---
<p>Service identity, permissioned spaces, and new blob utilities.</p>
<p>This one's been a long time coming. HappyView finally has a real AT Protocol identity, can do service proxying, and permissioned spaces got a big update to match the official spec.</p>
<p>When a user's PDS routes a request to your AppView, it resolves the destination by looking up your DID. Without a service identity, that lookup fails and standard atproto routing can't reach you.</p>
<p>HappyView offers three modes:</p>
<ul> <li><strong>Domain identity (did:web)</strong> - Your domain name becomes your identity. HappyView generates a signing keypair and serves a DID document at <code>/.well-known/did.json</code> automatically. The simplest option.</li> <li><strong>Network identity (did:plc)</strong> - Registers a new identity in the PLC directory. This is the most durable option — it survives domain changes if you ever need to migrate.</li> <li><strong>Linked account</strong> - Link your AppView to an existing AT Protocol account.</li> </ul>
<p>With a service identity in place, HappyView can act as a service proxy. A PDS sends a request with an <code>atproto-proxy</code> header pointing at your AppView, HappyView verifies the caller via service auth, runs your XRPC handler, and responds. This is how atproto apps are <em>supposed</em> to work! Up to this point HappyView only supported direct connections via DPoP.</p>
<p>Full docs: <a href="https://happyview.dev/getting-started/service-identity">Service Identity</a>.</p>
<p>This is the big one. The spaces implementation now aligns with <a href="https://github.com/bluesky-social/proposals/pull/94">Dan's proposal</a>, and if you were using the experimental spaces API before, this is a breaking change.</p>
<p>Endpoints moved from <code>dev.happyview.space.*</code> to two namespaces:</p>
<ul> <li><strong><code>com.atproto.space.*</code></strong> - protocol-level routes (queries, data access, credentials)</li> <li><strong><code>com.atproto.simplespace.*</code></strong> - management routes (create/update/delete spaces, membership)</li> </ul>
<p>The old <code>dev.happyview.space.*</code> endpoints will work as aliases until HappyView v3.</p>
<p>The old <code>accessMode</code> / <code>appAllowlist</code> / <code>appDenylist</code> system is gone.</p>
<p><strong>Mint policy</strong> controls who can create permissioned repos in a space:</p>
<ul> <li><code>member-list</code> (default) - only members</li> <li><code>public</code> - anyone</li> <li><code>managing-app</code> - only the managing app</li> </ul>
<p><strong>App access</strong> controls which third-party apps can interact with the space:</p>
<ul> <li><code>open</code> (default) - any app</li> <li><code>allowList</code> - only explicitly listed apps</li> </ul>
<p>Also, <code>getMemberGrant</code> is now <code>getDelegationToken</code> (and it's a <code>GET</code>, not a <code>POST</code>).</p>
<ul> <li><strong>Authority DID</strong> replaces <code>owner_did</code>. There's also a new <code>creator_did</code> for tracking who originally created the space</li> <li><strong><code>read_self</code> access level</strong> - members can only read their own data within the space</li> <li><strong>Deniable commit signatures</strong> - per-user repo state uses LtHash (homomorphic set-hash) with deniable signatures. The user signs context (space + rev + random input keying material), not content</li> <li><strong>Record operation log</strong> - <code>listRepoOps</code> returns the oplog for sync</li> <li><strong>Write notifications</strong> - <code>registerNotify</code>, <code>notifyWrite</code>, <code>notifySpaceDeleted</code></li> </ul>
<p>Full docs: <a href="https://happyview.dev/experimental/spaces">Permissioned Spaces</a>.</p>
<p>Two new Lua functions — <code>atproto.blob_download</code> and <code>atproto.blob_upload</code> — let scripts perform some new magic. For example, you can migrate a blob one PDS to another in just a couple of lines:</p>
<figure><pre><code>local downloaded = atproto.blob_download(source_did, old_cid)
local uploaded = atproto.blob_upload(downloaded.handle, downloaded.mimeType)
local new_blob_ref = uploaded.blob</code></pre></figure>
<p>Full docs: <a href="https://happyview.dev/api-reference/lua/atproto-api#atprotoblob_download">atproto API (<code>blob_download</code> / <code>blob_upload</code>)</a>.</p>
<p>All HappyView tables are now prefixed with <code>happyview_</code> (e.g. <code>records</code> -&gt; <code>happyview_records</code>) so they won't collide with your own tables if you're sharing a database. Existing databases are migrated automatically.</p>
<p>If you use <code>db.raw()</code> in Lua scripts to query HappyView tables directly, you'll need to update your queries to use the prefixed names.</p>
<ul> <li><strong>Setup wizard hardening</strong> - the setup flow handles edge cases better, especially around re-auth and preventing unauthenticated redirects</li> <li><strong>Dynamic cookie security</strong> - cookies now set their security flags based on the request context, which fixes some issues with service proxying behind a reverse proxy</li> <li><strong>Bluesky PDS scope handling</strong> - fixed a compat issue with the scope format Bluesky's PDS returns during OAuth</li> </ul>
<p>Full changelog is on <a href="https://github.com/gamesgamesgamesgamesgames/happyview/releases/tag/v2.10.0">GitHub</a>. If you have questions, feature requests, or just need a little help, join the <a href="https://cartridge.dev">Cartridge</a> <a href="https://discord.gg/BUPnjaBwRZ">Discord Server</a> and hop into the <code>#happyview</code> channel.</p>
