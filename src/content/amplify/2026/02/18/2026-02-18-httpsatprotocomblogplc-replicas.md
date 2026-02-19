---
author: AT Protocol
cover_image: 'https://atproto.com/default-social-card.png'
date: '2026-02-19T03:47:41.498Z'
dateFolder: 2026/02/18
description: 'Introducing a self-hostable did:plc read-replica service'
isBasedOn: 'https://atproto.com/blog/plc-replicas'
link: 'https://atproto.com/blog/plc-replicas'
slug: 2026-02-18-httpsatprotocomblogplc-replicas
tags:
  - tech
  - social media
  - decentralization
title: PLC Read Replicas
---
<figure></figure><p>Introducing a self-hostable did:plc read-replica service.</p>
<h1>PLC Read Replicas</h1>
<p>Today we're releasing a reference implementation of a PLC directory read-replica service. What does that mean, and how does it make the atproto ecosystem more resilient and trustworthy?</p>
<p>First, what is PLC? <code>did:plc</code> is the Decentralized Identifier (DID) method used by the majority of accounts on atproto. DID is a <a href="https://www.w3.org/TR/did-1.1/">W3C standard</a> for persistent identifiers that map to a "DID document". For atproto users, that DID document declares your signing keys, handle, and PDS host. <code>did:plc</code> currently relies on the <a href="https://web.plc.directory/">PLC directory</a> to maintain these mappings.</p>
<p>Migrating your atproto presence from one PDS host to another involves updating the contents of your DID document, while maintaining the same identifier string (which is what makes it so seamless). PLC makes these updates possible even if your previous PDS host isn't cooperating - even if it becomes actively <a href="https://www.da.vidbuchanan.co.uk/blog/adversarial-pds-migration.html">adversarial</a>. This idea is central to the "credible exit" promises of the AT Protocol.</p>
<p>But what if your adversary is the PLC directory itself?</p>
<p>We try to mitigate this possibility on several fronts:</p>
<ul> <li>Self-authenticating cryptographic mechanisms (this is the core of PLC, and has been present since its introduction in late 2022)</li> <li>Working towards independent governance (see: <a href="https://docs.bsky.app/blog/plc-directory-org">Creating an Independent PLC Directory Organization</a>)</li> <li>WebPKI-inspired transparency logging (watch this space!)</li> </ul>
<p>And, the subject of this article - Read Replicas.</p>
<p>Although PLC is built on self-authenticated data, we trust the central <a href="http://plc.directory">plc.directory</a> instance to:</p>
<ul> <li>Reliably and accurately respond to resolution queries for a given DID</li> <li>Accept valid PLC operations</li> <li>Accurately report the timestamps and order of operations</li> </ul>
<p>A read replica is a service that maintains a full, independently-queryable copy of the PLC directory's data by syncing from the primary instance. Additionally, a read replica should audit the synced data in real-time - verifying all operation hashes, signatures, and timestamp constraints, and rejecting any that do not pass validation. This does not catch <em>all</em> <em>possible</em> types of misbehaviour from the primary instance, but it makes it more accountable.</p>
<p>For example, if the primary instance decided to roll back a DID to an earlier state by deleting an update operation and pretending it never existed, the replicas would still have a copy of the deleted data. Every replica instance acts as a "witness" of the primary, and they collectively hold evidence that the primary instance has misbehaved. Third parties can also query public replicas to see the evidence for themselves.</p>
<p>Aside from the boost in accountability (which benefits the whole atproto ecosystem), there are several operational benefits to running your own PLC replica service:</p>
<ul> <li><strong>Availability:</strong> if the primary PLC instance has an outage, you can still resolve DIDs via your own replica.</li> <li><strong>Rate-limit flexibility:</strong> If you've ever made millions of rapid DID lookups at plc.directory, you might have run into rate limits. By running your own replica, you can define your own rate limit policies (as long as your infrastructure can keep up!)</li> </ul>
<p>Bluesky PBC will be running replica instances internally to achieve these same benefits.</p>
<p>Since its introduction, PLC has supported bulk export of all operations via the <code>/export</code> endpoint. This enables point-in-time snapshots and audits of the state of the directory. It is possible to poll <code>/export</code> to achieve close-to-real-time sync, but the API had some sharp edges that made it suboptimal for live-replica use cases.</p>
<p>In PLC spec version 0.3.0, we <a href="https://github.com/bluesky-social/atproto/discussions/4508">introduced</a> a new <code>/export/stream</code> websocket endpoint, which allows for real-time sync of new operations without needing to poll, as well as improving the behaviour of the paginated <code>/export</code> endpoint.</p>
<p>Our replica service ingests from either the paginated or the streaming API (for backfill and live-tailing respectively,) switching between the two automatically.</p>
<p>The replica implementation makes use of the <a href="https://github.com/did-method-plc/go-didplc">go-didplc</a> library for operation validation, which notably is a different codebase to the TypeScript <a href="https://github.com/did-method-plc/did-method-plc/">implementation</a> of the reference PLC directory. Having two implementations of the same spec makes us more confident in the spec, and allows us to test the two against each other.</p>
<p>When you submit an operation to the central PLC directory, once the HTTP request succeeds then the update is immediately visible to subsequent queries, both from yourself and other clients on the network.</p>
<p>For example, if a PDS updates a user’s handle and emits an <code>#identity</code> event on the firehose, a consuming relay may try to re-resolve the user’s DID document. If the relay queries the central PLC directory, it’ll see the updated DID. If it queries a replica, it <em>might</em> see stale data (and then cache it).</p>
<p>The replica should be no more than a few hundred milliseconds behind the primary (network-latency permitting), but any latency above 0 could surface race conditions for clients that weren’t expecting this possibility.</p>
<p>This means a replica service might not be a direct drop-in replacement for some scenarios, <em>yet</em>.</p>
<p>We hope to improve this situation through some combination of:</p>
<ul> <li>Finding sensible workaround strategies for clients (e.g. delayed/deferred requests, retry strategies)</li> <li>Improving the protocol/APIs to ensure clients know what version of the DID document to expect, and have an efficient way to wait for it to be resolvable (which could involve embedding a cid or timestamp in <code>#identity</code> events, and creative use of HTTP cache-related headers)</li> </ul>
<p>See <a href="https://github.com/did-method-plc/go-didplc/tree/main/cmd/plc-replica#did-document-format-differences">here</a> for technical details.</p>
<p>Check out the <a href="https://github.com/did-method-plc/go-didplc/tree/main/cmd/plc-replica">docs</a> for deployment details. This is new software so there may be some teething issues, but we aim to be responsive to bug reports, including incompatibility issues with other atproto software.</p>
<p>At time of writing, you'll need approximately 150GB of free disk space to sync the whole directory. This number will go up slowly over time.</p>
<p>While our reference implementation is focused on correctness and scalable performance, there are other plc replica/mirroring tools developed by the community that may offer more compact on-disk representations via compression, spam filtering, or other tricks. These approaches may be more appropriate for deployment on resource-constrained systems:</p>
