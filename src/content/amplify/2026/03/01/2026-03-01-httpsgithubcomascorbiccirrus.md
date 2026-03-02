---
author: 'https://github.com/ascorbic/'
cover_image: >-
  https://opengraph.githubassets.com/35ed66b88a650e88a56ff27d62ada956d1887823281a0742b832aa1bdf7b4afb/ascorbic/cirrus
date: '2026-03-01T05:32:52.849Z'
dateFolder: 2026/03/01
description: A single-user ATProto PDS that runs on a Cloudflare Worker - ascorbic/cirrus
isBasedOn: 'https://github.com/ascorbic/cirrus'
link: 'https://github.com/ascorbic/cirrus'
slug: 2026-03-01-httpsgithubcomascorbiccirrus
tags:
  - code
  - decentralization
title: >-
  GitHub - ascorbic/cirrus: A single-user ATProto PDS that runs on a Cloudflare
  Worker
---
<h1>ascorbic/cirrus</h1>
<p>main</p>
<p>Go to file</p>
<p>Code</p>
<p>Open more actions menu</p>
<h1>☁️</h1>
<h1>CIRRUS</h1>
<p><em>The lightest PDS in the Atmosphere</em></p>
<p>A single-user <a href="https://atproto.com">AT Protocol</a> Personal Data Server (PDS) that runs on a Cloudflare Worker.</p>
<h2>Why run your own PDS?</h2>
<p>A PDS is where Bluesky data lives – posts, follows, profile, and media. Running a personal PDS provides:</p>
<ul> <li><strong>Independence from platform changes</strong> – If Bluesky's ownership or policies change, the account remains under full control. No billionaire can take it away.</li> <li><strong>Network resilience</strong> – A diverse ecosystem of PDS providers makes the AT Protocol network stronger. More independent servers mean no single point of failure.</li> <li><strong>Data sovereignty</strong> – The repository lives on infrastructure under direct control</li> <li><strong>Portability</strong> – Move between hosting providers without losing followers or identity</li> </ul>
<h2>Architecture</h2>
<p>This implementation uses Cloudflare Workers with Durable Objects and R2:</p>
<ul> <li><strong>Worker</strong> – Stateless edge handler for routing, authentication, and DID document serving</li> <li><strong>Durable Object</strong> – Single-instance SQLite storage for your AT Protocol repository</li> <li><strong>R2</strong> – Object storage for blobs (images, videos)</li> </ul>
<p>The result is a PDS that runs at the edge with no servers to manage, automatic scaling, and pay-per-use pricing.</p>
<h2>Quick Start</h2>
<pre>npm create pds</pre>
<p>This scaffolds a new project, installs dependencies, and runs the setup wizard. See the <a href="https://github.com/ascorbic/cirrus/blob/main/packages/pds">PDS package documentation</a> for detailed setup and configuration.</p>
<h2>Before You Get Started</h2>
<p>Before running your PDS, you'll need:</p>
<ol> <li><strong>A Cloudflare account</strong> – Sign up at <a href="https://cloudflare.com">cloudflare.com</a> if you don't have one</li> <li><strong>Your domain added to Cloudflare</strong> – Add the domain you plan to use for your PDS to your Cloudflare account: <ul> <li>Log into the Cloudflare dashboard</li> <li>Click "Add a site" and enter your domain</li> <li>Follow the instructions to update your domain's nameservers to point to Cloudflare</li> <li>Wait for DNS propagation (usually a few minutes, can take up to 24 hours)</li> </ul> </li> </ol>
<p>Once your domain is active in Cloudflare, you can proceed with the setup wizard.</p>
<h2>Packages</h2>
<table> <tr> <th>Package</th> <th>Description</th> </tr> <tbody> <tr> <td><a href="https://github.com/ascorbic/cirrus/blob/main/packages/pds"><code>@getcirrus/pds</code></a></td> <td>The PDS implementation – handles repository operations, federation, OAuth, and the CLI</td> </tr> <tr> <td><a href="https://github.com/ascorbic/cirrus/blob/main/packages/oauth-provider"><code>@getcirrus/oauth-provider</code></a></td> <td>OAuth 2.1 provider for "Login with Bluesky"</td> </tr> <tr> <td><a href="https://github.com/ascorbic/cirrus/blob/main/packages/create-pds"><code>create-pds</code></a></td> <td>Scaffolding CLI to create new PDS projects</td> </tr> </tbody> </table>
<h2>Status</h2>
<p>⚠️ <strong>This is experimental beta software under active development.</strong> While the core features are functional and account migration has been tested, this PDS implementation is still being refined. Breaking changes may occur, and not all edge cases have been discovered. Consider backing up important data before migrating a primary account.</p>
<p>Core features currently working:</p>
<ul> <li>Repository operations (create, read, update, delete records)</li> <li>Federation (sync, firehose, blob storage)</li> <li>OAuth 2.1 provider (PKCE, DPoP, PAR)</li> <li>Account migration from existing PDS (tested and verified)</li> <li>Account migration to another PDS (stateless token generation)</li> <li>Passkey authentication for passwordless login</li> </ul>
<p>See the <a href="https://github.com/ascorbic/cirrus/blob/main/packages/pds">PDS documentation</a> for current limitations and roadmap.</p>
<h2>Key Safety</h2>
<p>Your signing key controls your identity. Cloudflare secrets cannot be retrieved after they're set, so backing up your key during setup is critical.</p>
<h3>During Setup</h3>
<p>When you run <code>pds init</code>, you'll be prompted to back up your signing key. Store it somewhere safe – a password manager, encrypted backup, or similar.</p>
<h3>Key Recovery</h3>
<p>If you've cloned to a new machine and see the "Key Recovery Required" error:</p>
<ol> <li><strong>Restore from backup</strong> – If you backed up your key (recommended), add it to <code>.dev.vars</code>: <pre><code>SIGNING_KEY=your-backed-up-key-here
</code></pre> </li> <li><strong>Run init again</strong> – <code>pds init</code> will detect the local key and continue</li> </ol>
<h3>If You've Lost Your Key</h3>
<p><strong>For did:web users:</strong></p>
<ul> <li>Generate a new key by clearing <code>.dev.vars</code> and re-running <code>pds init</code></li> <li>Old signatures become unverifiable – followers may see warnings</li> <li>Your identity continues, but there's no cryptographic proof of continuity</li> </ul>
<p><strong>For did:plc users:</strong></p>
<ul> <li>If you have a recovery key registered with PLC, you can rotate to a new signing key</li> <li>Without a recovery key, you'll need to start a new identity</li> <li>See the <a href="https://github.com/did-method-plc/did-method-plc">AT Protocol PLC documentation</a> for recovery operations</li> </ul>
<h2>Requirements</h2>
<ul> <li>Cloudflare account with R2 enabled</li> <li>A domain you control (for your handle and DID)</li> </ul>
<h2>Resources</h2>
<ul> <li><a href="https://atproto.com">AT Protocol Documentation</a></li> <li><a href="https://bsky.app">Bluesky</a></li> <li><a href="https://developers.cloudflare.com/workers/">Cloudflare Workers</a></li> </ul>
<h2>License</h2>
<p>MIT. © Matt Kane (@ascorbic)</p>
