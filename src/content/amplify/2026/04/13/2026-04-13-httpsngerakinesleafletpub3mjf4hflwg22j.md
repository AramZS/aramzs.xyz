---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Acbkjy5n7bk3ax2wplmtjofq2/3lqpqvbdoas2z/3mjf4hflwg22j/opengraph-image?e2bb7203df6d3028
date: '2026-04-13T15:05:14.638Z'
dateFolder: 2026/04/13
description: >-
  attested.network is an open spec for decentralized proof of payments on
  ATProtocol, built on what we learned making atprotofans.com. It formalizes the
  three-party attestation model and opens it up for any app to implement.
isBasedOn: 'https://ngerakines.leaflet.pub/3mjf4hflwg22j'
link: 'https://ngerakines.leaflet.pub/3mjf4hflwg22j'
slug: 2026-04-13-httpsngerakinesleafletpub3mjf4hflwg22j
tags:
  - code
  - tech
  - decentralization
title: 'Introducing attested.network: Proof of Payment for ATProtocol'
---
<p>attested.network is an open spec for decentralized proof of payments on ATProtocol, built on what we learned making atprotofans.com. It formalizes the three-party attestation model and opens it up for any app to implement.</p>
<p>Last year, Devin and I built <a href="https://atprotofans.com/">atprotofans.com</a> to test out payments on ATProtocol. The idea was simple: when someone pays a creator, a proof-of-payment record is added to the payer’s repository. That record belongs to the payer, not the payment platform. The creator gets a matching attestation in their own repo. If either party changes services, the connection stays intact.</p>
<p>We kept the feature set small on purpose: one-time payments through Stripe, a supporter record, a creator proof, and a broker proof. We knew the name was temporary and the scope was limited by design. Our goal was to see if people cared about portable, verifiable payments on the protocol. They did, and the response showed us it was worth continuing.</p>
<p>The lessons from building ATProtoFans and my experience building web platforms have shaped this work, and I’m ready to share what I have so far.</p>
<p><a href="https://attested.network/">attested.network</a> is an open spec for decentralized, cryptographically verifiable proof of payments on ATProtocol. It builds on the core ideas from ATProtoFans and makes them available for any application to use. While ATProtoFans was a single service writing records to your repo, attested.network is a specification that lets any payment service do the same and have the results independently verified.</p>
<p>The spec uses <a href="https://badge.blue/">badge.blue</a>’s CID-first attestation framework. Each proof is content-addressed and tied to the repository DID where it lives. If you copy a record to another repo, the CID changes and verification fails automatically. This is the same basic approach we used in ATProtoFans, but now it’s formalized.</p>
<p>The biggest change is in the structure of payment and payment proof records. ATProtoFans only supported one-time payments. The new spec adds recurring and scheduled payment types. This spec describes several records that can be used as-is and immediately, but also create a shape that supports other types of payments and their relationships with brokers, payment providers, observers, and payment recipients.</p>
<p>Payment records can now include an <code>entitlements</code> array that uses strongRefs to point to what the payer receives after paying. The referenced records can use any lexicon. This feature connects payments to things like event tickets on Smoke Signal, premium content, or anything else an app wants to restrict based on proof of payment.</p>
<p>In ATProtoFans, the service acted as both payment processor and broker. Now, those roles are separate. Any entity can be a broker, whether it’s running Stripe transactions, handling peer-to-peer cash, or witnessing other exchanges. The broker’s job is to facilitate and attest. The ecosystem no longer relies on a single service.</p>
<p>ATProtoFans was public-only because ATProtocol didn’t yet have a concrete direction for permissioned data. attested.network is designed to support both public repos and <a href="https://dholms.leaflet.pub/3mhj6bcqats2o">Permissioned Data Spaces</a>. The attestation process is the same in both cases; the broker also manages space creation and access permissions when needed.</p>
<p>Trust is now configurable. Apps can choose strict verification, which requires both creator and trusted broker proofs; creator-trusted, which accepts anything the creator vouches for; or federated, which accepts proofs from a set of trusted brokers. Different apps have different needs.</p>
<p>The core of the spec is a three-party attestation model. When a payment happens, three repositories each get records. The payer’s repo gets the payment record, which includes a <code>signatures</code> array that references proof records. The recipient’s repo gets a proof record with a CID based on the payment record and the payer’s DID. The broker’s repo gets its own independent proof.</p>
<p>Any application can verify a payment by fetching the payment record, getting the referenced proofs, recomputing the CIDs, and making sure everything matches. There’s no need for API calls to a payment platform or trust in a single database.</p>
<p>Payment initiation uses DID document service endpoints. Recipients list which payment servicers they use. The payer’s client resolves those DIDs, the payer chooses a servicer, and the client starts the process with authenticated XRPC calls. The servicer returns a token and a URL. The payer finishes payment in their browser, and the client checks for completion.</p>
<p>The spec is still a draft. I’m sharing it now because I want feedback from people building on ATProtocol, especially those interested in commerce, subscriptions, or access control. The lexicon defines four record types (<code>network.attested.payment.oneTime</code>, <code>recurring</code>, <code>scheduled</code>, and <code>proof</code>) and three XRPC methods (<code>initiate</code>, <code>status</code>, and <code>lookup</code>).</p>
<p>If you want to implement a broker, add payment verification to your app, or just learn how it works, the site has guides for each role: <a href="https://attested.network/brokers.html">brokers</a>, <a href="https://attested.network/app-developers.html">app developers</a>, <a href="https://attested.network/recipients.html">recipients</a>, and <a href="https://attested.network/payers.html">payers</a>. There’s also a <a href="https://attested.network/scenarios.html">scenarios page</a> with real examples.</p>
<p>Come join the <a href="https://discourse.atprotocol.community/c/wg/attested-network/38">Attested Network Working Group</a> on discourse to talk about it.</p>
