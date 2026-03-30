---
author: Wisp.place Docs
cover_image: null
date: '2026-03-30T04:33:53.861Z'
dateFolder: 2026/03/30
description: Decentralized static site hosting on the AT Protocol
isBasedOn: 'https://docs.wisp.place/'
link: 'https://docs.wisp.place/'
slug: 2026-03-30-httpsdocswispplace
tags:
  - tech
  - indieweb
  - decentralization
title: Wisp.place Documentation
---
<p><strong>Decentralized static site hosting on the AT Protocol.</strong></p>
<p>Wisp.place enables you to host static websites directly in your AT Protocol repository. Your Personal Data Server (PDS) holds the cryptographically signed manifest and files as the authoritative source of truth, while hosting services index and serve them with CDN-like performance.</p>
<h3>Using the Web Interface</h3>
<p>Visit <a href="https://wisp.place">https://wisp.place</a> and sign in with your AT Protocol account to deploy sites through the browser.</p>
<h3>Using the CLI</h3>
<figure><figcaption>Terminal window</figcaption><pre data-language="bash"><code>curl -L https://sites.wisp.place/nekomimi.pet/wisp-cli-binaries/wisp-cli-x86_64-linux -o wisp-cli./wisp-cli your-handle.bsky.social --path ./my-site --site my-site</code></pre></figure>
<p>Your site will be available at:</p>
