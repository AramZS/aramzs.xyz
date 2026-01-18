---
author: standard.site
cover_image: 'https://standard.site/opengraph-image.png?opengraph-image.0bc2eb7c.png'
date: '2026-01-02T14:39:18.406Z'
dateFolder: 2026/01/02
description: >-
  Standard.site provides shared lexicons for long-form publishing on AT
  Protocol. Making content easier to discover, index, and move across the
  ATmosphere.
isBasedOn: 'https://standard.site/'
link: 'https://standard.site/'
slug: 2026-01-02-httpsstandardsite
tags:
  - code
  - decentralization
title: Standard.site - One schema. Every platform.
---
<h2>Definitions</h2>
<p>We currently define two main lexicons that cover the core building blocks of long-form platforms: where content lives, and what it contains.</p>
<p>Modularity. Each lexicon is independent. Use them together for full support, or implement only what your platform requires.</p>
<h2>Verification</h2>
<p>Standard.site records point to domain names and webpages. We need a way for those to point back to the record. This is done through a .well-known route for publications and HTML link tags for documents.</p>
<p>Add a /.well-known/site.standard.publication endpoint to your domain. The response should be the AT-URI of your publication record.</p>
<p>This confirms the link between the publication and the domain.</p>
<p>Add a &lt;link&gt; tag in the document's &lt;head&gt; that references its AT-URI.</p>
<pre><code>&lt;link rel="site.standard.document" href="at://did:plc:xyz789/site.standard.document/rkey"&gt;</code></pre>
<h2>Questions</h2>
<p>Common questions about Standard.site, its governance, and implementation. If something is missing ask us on Bluesky.</p>
