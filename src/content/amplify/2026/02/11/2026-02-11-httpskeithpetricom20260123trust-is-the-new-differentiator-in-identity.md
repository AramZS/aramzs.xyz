---
author: Keith Petri
cover_image: ''
date: '2026-02-11T22:42:53.080Z'
dateFolder: 2026/02/11
description: >-
  Identity in adtech tends to move in cycles. We convince ourselves there is
  going to be one ID to rule them all.
isBasedOn: 'https://keithpetri.com/2026/01/23/trust-is-the-new-differentiator-in-identity/'
link: 'https://keithpetri.com/2026/01/23/trust-is-the-new-differentiator-in-identity/'
slug: >-
  2026-02-11-httpskeithpetricom20260123trust-is-the-new-differentiator-in-identity
tags:
  - ad tech
title: Trust is the New Differentiator in Identity
---
<figure><img alt="" src="https://keithpetri.com/wp-content/uploads/2026/01/ID5-True-Data-cTV-KP-small-1360x445.png"/></figure>
<p>Identity in adtech tends to move in cycles. We convince ourselves there is going to be one ID to rule them all. Then reality sets in and we swing back to a messy mix of signals held together by syncs, bridges, and enrichment layers.</p>
<p>The <a href="https://www.adexchanger.com/identity/alt-identity-provider-id5-buys-truedata-marking-its-first-ever-acquisition/">acquisition of TrueData by ID5</a> feels like another turn of that wheel, but this one matters more. This is not ID5 trying to be a cleaner cookie replacement. It is ID5 stepping into a much more structural role. Device-level identity on the front end, a deterministic graph behind it, and a clearer point of view on how identity shows up in the bidstream.</p>
<p>This article breaks down what the deal actually changes, why it matters for publishers and ad platforms, and how it complicates ID5’s position with some of its own strategic stakeholders.</p>
<p><strong>From an Identifier to a Spine</strong></p>
<p>ID5’s original value proposition was deliberate. It offered publishers a stable device-level ID that could be broadcast publicly across the ecosystem and decrypted only by licensed partners. It was free for publishers to deploy, easy to pass through open-standard pipes, and reasonable for platforms to license and decision against.</p>
<p>Business Insider’s coverage of ID5’s Series B centered on this story: tens of thousands of publisher properties running the ID, hundreds of integrations, and a business model built around licensing the identifier to intermediaries.</p>
<p>TrueData changes the company’s profile.</p>
<p>TrueData brings a deterministic identity graph built on hashed PII, with linkages across MAIDs, cookies, IPs, and alternative IDs; importantly, ID5 was just one of many IDs supported.</p>
<p>Once those two assets are combined, the relationship with the market changes.</p>
<p>You now have:</p>
<ul> <li>An identifier that lives natively in the bidstream</li> <li>A graph that resolves people, devices, and households behind the scenes</li> <li>A workflow that carries PII-based linkages into an execution layer directly actioned upon for targeting, sequencing, frequency, optimization, and measurement</li> </ul>
<p>This is no longer a service that politely connects signals across the buy and sell sides. It is an owned, operated identity spine.</p>
<p>Before the acquisition, TrueData showed up inside platforms like Permutive, Optable, and ArcSpan. ID5 showed up in many of the same places. The surface area looked similar, but the motivations were different. One enabled identity workflows. The other broadcast an ID.</p>
<p>Post-acquisition, that distinction collapses. The combined entity is now structurally incentivized to deliver identity as a service directly to publishers, brands, and retailers.</p>
<p>Mathieu Roche, ID5’s CEO, shared the company’s motivation behind the transaction. “Most clients don’t use the ID5 ID in isolation. They plug it into a broader graph, because that’s where real decisions get made. The easiest way to drive adoption is to have the ID show up inside workflows that already exist. Historically, that meant either observing it in live traffic or relying on indirect, statistical connections. Bringing ID5 and TrueData together changes that. It allows the ID5 ID to be delivered as part of a holistic graph from day one. That doesn’t mean we’re trying to force a bundled approach. We’re agnostic to whether a client uses their own graph, licenses another provider, or chooses to leverage the combined offering we now support. Our focus is simple: making sure the ID5 ID shows up wherever identity actually informs activation, optimization, and measurement.”</p>
<p>It is no longer a neutral, industry-agnostic ID that publishers, brands, retailers, and ad platforms simply plug into their own systems. It has become a first-class identity asset that now competes with many of the graphs and products that previously treated it as an input.</p>
<p><strong>Household IP and the Forcing Function of CTV</strong></p>
<p>The identity debate often gets framed as deterministic versus probabilistic, or precision versus scale. In practice, it comes down to something simpler. Whoever sustains higher match rates and can reliably surface residual identifiers inside shrinking signal pools will win.</p>
<p>Roche has been explicit about this. Fragmentation destroys usable identity. Every hop from CRM to onboarding partner to graph to ID vendor to DSP to publisher compounds loss. Inference fills gaps. Integrity erodes.</p>
<p>CTV exposes that fragility.</p>
<p>Recent benchmarks show IP-to-postal and IP-to-email accuracy well below thresholds anyone would accept in isolation. Agreement across providers is weak. And the situation gets worse as the ecosystem shifts from IPv4 to IPv6, where address rotation, privacy extensions, and carrier-level reassignment undermine the assumption that an IP can anchor a household.</p>
<p>IPv6 now accounts for close to half of global internet traffic, but effective coverage and signal density vary widely by region, ISP, and network architecture. In practice, this shows up as rotated prefixes, mixed IPv4 and IPv6 environments, and reassigned addresses that quietly break targeting, frequency, reach, and attribution.</p>
<p>CTV is not the only device impacted by this, but it is the one that makes the problem impossible to ignore.</p>
<p>TV is one screen in a household, not the only one. Outcomes rarely happen there. They happen on phones, laptops, and in stores. Without a durable way to connect those exposures, CTV becomes a silo.</p>
<p>This is where TrueData changes the equation for ID5.</p>
<p>Hashed emails provide a stable user-level anchor that can bridge browsers, MAIDs, and CTV environments. When those anchors train ID5’s probabilistic device-resolution layer, the system learns from grounded relationships instead of brittle IP heuristics.</p>
<p>ID5 could not do this on its own. TrueData makes cross-device resolution possible. That is the real shift.</p>
<p><strong>Why CTV Forces a Device-Level Identifier</strong></p>
<p>CTV also exposes another structural issue: there is no single CTV environment.</p>
<p>Unlike mobile, where two operating systems dominate, CTV is a patchwork of hardware manufacturers, operating systems, and app containers. Samsung TVs run Tizen. LG runs webOS. Roku operates its own OS. Amazon Fire TV and Android TV fork Android in different ways. Apple TV runs tvOS. Each exposes a different advertising identifier, with different reset behaviors, privacy controls, and API access.</p>
<p>Even identical apps behave differently depending on where they run. Disney+ on Android TV running natively on an LG panel surfaces a different device signal than Disney+ running inside a Roku app on that same TV. The content is the same. The user is the same. The identity is not.</p>
<p>This fragmentation is why CTV cannot rely on device IDs alone, and why IP has quietly become a crutch. But IP does not survive modern network behavior, and it collapses entirely under IPv6, mobile broadband, and carrier-level reassignment.</p>
<p>It also explains why TV cannot be treated as a silo. TV is one screen in a household, not the only one. Outcomes rarely happen there. They happen on phones, laptops, and in stores. Without cross-device resolution, reach is overstated, frequency is wrong, and attribution breaks.</p>
<p>This is where ID5’s expansion into a device-level identifier for CTV becomes a natural evolution, not a product grab.</p>
<p>That shift is already showing up in market deployments. Rakuten TV recently announced the <a href="https://www.advanced-television.com/2026/01/21/rakuten-tv-partners-with-id5/">integration of ID5 IDs directly into its CTV inventory</a>, positioning identity as a way to unlock addressability, cross-device measurement, and more actionable demand across FAST and AVOD environments. The partnership signals that premium CTV platforms are actively seeking identity layers that can operate across fragmented operating systems while still integrating cleanly into programmatic workflows.</p>
<p>ID5 could not solve this with a device-level identifier alone. Hashed emails provide a stable, user-level anchor that can bridge across CTV operating systems, apps, browsers, and devices. When those anchors train ID5’s probabilistic resolution, the system learns from grounded relationships and extrapolates to scale without letting accuracy degrade.</p>
<p><strong>ID5’s Stakeholders + Incentives</strong></p>
<p>This part of the story is easy to miss but important.</p>
<p>TransUnion participated in ID5’s Series B. Experian Ventures invested in TrueData and, depending on the terms of the transaction, now holds indirect exposure to the combined company. Both operate large marketing-services businesses built on their own identity graphs. Both sell onboarding, CTV identity, and measurement products that overlap with parts of ID5’s expanded footprint.</p>
<p>Before the acquisition, the stack was modular. ID5 provided an ID. The bureaus provided the graph. Everyone stayed in their lane.</p>
<p>After the acquisition, those lanes blur.</p>
<p>The same dynamic shows up with LiveRamp. Historically, LiveRamp has been vocal in its opposition to fingerprinting and statistical representations of device configuration. That tension defined much of its relationship with ID5. TrueData, however, maintains a bidirectional relationship with LiveRamp. How that philosophy reconciles inside a single entity will matter.</p>
<p>This is classic co-opetition. Alignment at the infrastructure layer. Tension at the commercial layer. We have seen this movie before with UID2 governance, ATS, and clean rooms.</p>
<p><strong>Ubiquity and Market Validation</strong></p>
<p>The combined entity is also exposed to the volatility publishers face today.</p>
<p>Unlike The Trade Desk with UID2, Viant with Direct Access, or LiveRamp with deep agency commitments, ID5 does not control media dollars to force adoption. That makes validation from agencies and buyers existential.</p>
<p>This is why the <a href="https://www.adweek.com/adweek-wire/id5-integrates-into-horizon-medias-newly-launched-horizonos/">recent Horizon Media announcement</a> matters. It signals a shift from ecosystem plumbing to buyer-facing outcomes. ID5 is no longer just trying to exist everywhere. It is trying to be ubiquitous.</p>
<p>TrueData makes that ambition possible. It also raises the stakes.</p>
<p><strong>OG ID5 vs Enriched ID5: Drawing the Line</strong></p>
<p>The most important technical question in this deal is straightforward: will ID5 express deterministic enrichment through a distinct identifier, or through bridged and appended versions of clustered ID5 IDs?</p>
<p>If enriched and non-enriched associations exist for the same impression opportunity, transparency is non-negotiable.</p>
<p>First, a clear provenance signal, aligned with OpenRTB 2.6, that indicates whether the ID reflects ID5 observed on the local device or a bridged or inferred ID5 representing a deterministically linked cluster based on TrueData’s knowledge graph.</p>
<p>Second, a mechanism that allows ad platforms to separate “plain” ID5 from “enriched” ID5 so measurement integrity is preserved.</p>
<p>Without these safeguards, buyers are exposed to misaligned identity claims, especially as bidstream enrichment becomes a lever for yield. ID5 has an opportunity to lead by drawing clear lines instead of blurring them.</p>
<p>There is a deeper risk beneath the consolidation. If ID5 becomes both the resolution layer and the measurement layer, imprecision in the graph becomes invisible. The system validates its own assumptions. Performance looks strong because grading mirrors the join logic upstream. What you get is coherence, not accuracy.</p>
<p>This risk already exists in the market. What changes here is that ID5 now has the ability to confront it directly and use transparency as a point of differentiation. As an identity spine operating in the open bidstream, ID5 can choose transparency over opacity. Ad platforms do not need another black box. They need identity that can explain itself, segment itself, and be independently challenged.</p>
<p><strong>Scaling Identity Without Losing Trust</strong></p>
<p>Identity is consolidating again, but this time the stakes are higher. The industry is moving toward fewer, stronger spines rather than dozens of partial graphs. ID5’s move is part of that shift.</p>
<p>TrueData gives ID5 what it never had: cross-device reach, deterministic grounding, and a path to ubiquity. What it does not automatically provide is trust. That has to be earned. The winners in this next phase will not be the systems that look the cleanest internally, but the ones most willing to expose themselves to external truth. If ID5 embraces that role, this deal becomes more than an acquisition. It becomes a model for how identity can scale without asking buyers to suspend disbelief.</p>
