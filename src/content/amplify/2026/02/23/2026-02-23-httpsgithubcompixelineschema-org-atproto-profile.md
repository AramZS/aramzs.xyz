---
author: 'https://github.com/pixeline/'
cover_image: >-
  https://repository-images.githubusercontent.com/1163542408/251729ae-4324-4452-8aaa-e875ce10dd64
date: '2026-02-23T23:34:25.118Z'
dateFolder: 2026/02/23
description: >-
  Extend schema.org to enhance cards generated for URLs with atproto data, to
  create url cards with additional context like author DID/handle and
  feed/series pointers - pixeline/schema-org-atproto-pr...
isBasedOn: 'https://github.com/pixeline/schema-org-atproto-profile'
link: 'https://github.com/pixeline/schema-org-atproto-profile'
slug: 2026-02-23-httpsgithubcompixelineschema-org-atproto-profile
tags:
  - code
  - tech
  - decentralization
title: >-
  pixeline/schema-org-atproto-profile: Extend schema.org to enhance cards
  generated for URLs with atproto data, to create url cards with additional
  context like author DID/handle and feed/series pointers
---
<h2>Create list</h2>
<p><a data-hotkey=".,Mod+Alt+." href="https://github.dev/">Open in github.dev</a> <a data-hotkey="Shift+.,Shift+&gt;,&gt;" href="https://github.dev/">Open in a new github.dev tab</a> <a data-hotkey=",,Mod+Alt+," href="https://github.com/codespaces/new/pixeline/schema-org-atproto-profile?resume=1">Open in codespace</a></p>
<h1>pixeline/schema-org-atproto-profile</h1>
<p>main</p>
<p>t</p>
<p>Go to file</p>
<p>Code</p>
<p>Open more actions menu</p>
<h1>Schema.org atproto profile</h1>
<p>A minimal, additive Schema.org profile that adds atproto-flavoured metadata to web pages so atproto clients (Bluesky, etc.) can render richer URL cards.</p>
<p>This proposal was sparked by <a href="https://discourse.atprotocol.community/t/ideas-on-extending-open-graph-embed-displays-for-atproto/631/9">this discussion on the atproto community discourse</a></p>
<h2>Why</h2>
<p>Open Graph (OG) is widely used but effectively unmaintained. Schema.org JSON-LD is actively maintained, well-documented, and already embedded in millions of pages by CMSes and publishers today.</p>
<p>This repository proposes a tiny <strong>atproto-flavoured Article profile</strong> that:</p>
<ul> <li><strong>Publishers already emit</strong> Schema.org JSON-LD — adding a handful of <code>atproto:*</code> fields is a one-line CMS change.</li> <li><strong>Adds atproto identity + feed linkage</strong> via a small custom namespace (<code>atproto:</code>), without touching any standard Schema.org fields.</li> <li><strong>Stays fully backward-compatible</strong> — non-atproto consumers simply see a normal <code>Article</code> object and ignore the extra fields.</li> </ul>
<h2>Design</h2>
<p>The profile uses a dual <code>@context</code>:</p>
<pre>"@context": ["https://schema.org", { "atproto": "https://atproto.com/ns#" }]</pre>
<h3>Full JSON-LD example</h3>
<pre>{
  "@context": ["https://schema.org", { "atproto": "https://atproto.com/ns#" }],
  "@type": "Article",
  "headline": "How atproto handles identity",
  "description": "A deep dive into DIDs, handles, and the AT Protocol identity layer.",
  "datePublished": "2025-06-01",
  "image": [
    "https://example.com/images/atproto-identity.jpg"
  ],
  "author": {
    "@type": "Person",
    "name": "Alice Dubois",
    "url": "https://example.com/authors/alice",
    "image": "https://example.com/images/alice.jpg",
    "atproto:did": "did:plc:abc123xyz456",
    "atproto:handle": "alice.bsky.social"
  },
  "atproto:feed": "at://did:plc:abc123xyz456/app.bsky.feed.generator/atproto-news"
}</pre>
<h3>atproto-specific fields</h3>
<table> <tr> <th>Field</th> <th>Location</th> <th>Type</th> <th>Description</th> </tr> <tbody> <tr> <td><code>atproto:did</code></td> <td><code>author</code></td> <td>string</td> <td>The author's atproto DID (e.g. <code>did:plc:…</code>)</td> </tr> <tr> <td><code>atproto:handle</code></td> <td><code>author</code></td> <td>string</td> <td>The author's atproto handle (e.g. <code>alice.bsky.social</code>)</td> </tr> <tr> <td><code>atproto:feed</code></td> <td>root</td> <td>string</td> <td>Optional feed/series link. Must be either an <code>at://</code> URI (e.g. <code>at://did:plc:abc123xyz456/app.bsky.feed.generator/atproto-news</code>) or an absolute <code>http(s)://</code> URL (e.g. <code>https://bsky.app/profile/mackuba.eu/feed/atproto</code>).</td> </tr> </tbody> </table>
<h2>How clients use this</h2>
<ol> <li><strong>Detect the atproto namespace</strong> in <code>@context</code> — look for an object containing a key whose value starts with <code>https://atproto.com/ns</code>.</li> <li><strong>Resolve author identity</strong> — use <code>atproto:did</code> or <code>atproto:handle</code> for identity and follow actions.</li> <li><strong>Use standard avatar first</strong> — if <code>author.image</code> is present, use it directly.</li> <li><strong>Polyfill avatar resolution when missing</strong> — if <code>author.image</code> is absent, try resolver adapters (for example a Bluesky-compatible profile lookup today), cache results, and fail gracefully.</li> <li><strong>Link to a feed/series</strong> — use <code>atproto:feed</code> to add a "More from this series" action in the URL card; support both <code>at://</code> and <code>http(s)://</code>.</li> </ol>
<p>Clients that do not recognise these fields will simply skip them.</p>
<h2>Demo</h2>
<p><a href="https://pixeline.github.io/schema-org-atproto-profile/demo/">Live demo</a></p>
<p>The page contains:</p>
<ul> <li>A fake blog article with a concrete JSON-LD block using this profile.</li> <li>A rendered URL card built by <code>demo/card-demo.js</code> from the JSON-LD on the page.</li> <li>An <strong>atproto badge</strong> and extra identity line when atproto fields are present.</li> </ul>
<h2>Preview:</h2>
<figure><a href="https://github.com/pixeline/schema-org-atproto-profile/blob/main/demo/capture.jpg"><img alt="preview" src="https://github.com/pixeline/schema-org-atproto-profile/raw/main/demo/capture.jpg"/></a></figure>
