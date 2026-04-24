---
author: IAB Tech Lab
cover_image: 'https://iabtechlab.com/wp-content/uploads/2025/11/Deals-API-2.png'
date: '2026-04-23T20:43:19.943Z'
dateFolder: 2026/04/23
description: >-
  The Deals API version 1.0 streamlines operations by clarifying the high-level
  terms of a negotiated deal. In Public Comment until Jan 31, 2026
isBasedOn: 'https://iabtechlab.com/standards/dealsapi/'
link: 'https://iabtechlab.com/standards/dealsapi/'
slug: 2026-04-23-httpsiabtechlabcomstandardsdealsapi
tags:
  - ad tech
title: Deals API Specification
---
<p>The Deals API streamlines operations by clarifying the high-level terms of each deal, significantly reducing manual data entry and supporting automated configuration. It further enhances visibility into Curated Deals, offering transparency not currently present in the bid stream.</p>
<p><em><strong>Version 1.0 was in Public Comment until January 31, 2026 and Finalized on Feb 6, 2026</strong></em></p>
<p>The core goals of Version 1 of the Deals API are as follows:</p>
<ul><li>Decrease manual entry of deal information across systems by providing a way for the terms of a deal to be input and sent to the system that will deliver the deal to review and accept.</li><li>Describe what the selling system deal includes at a high level</li><li>Know which parties were involved in curating and selling the package</li></ul>
<p>Future iterations may include discoverability features, bi-directional communications, or Deal proposals, revisions, or negotiations.</p>
<h3><strong>What it is</strong></h3>
<ul><li>An API that provides subscribers with static information about a given Deal that outlines the tenets of the Deal.</li><li>This MVP is a one-party design for the origin system to PUSH information about the deal into the receiving system(s) from the system where it was created (e.g. SSP → DSP). It also allows the same system to query the receiving system for the Deal status after initial deal send. </li><li>Version 1.0 of this API does not support differential overrides</li></ul>
<figure><img alt="Complex error prone Deals workflow without an API" sizes="(max-width: 1024px) 100vw, 1024px" src="https://iabtechlab.com/wp-content/uploads/2025/12/Without-Deals-API.png" srcset="https://iabtechlab.com/wp-content/uploads/2025/12/Without-Deals-API-1024x484.png 1024w, https://iabtechlab.com/wp-content/uploads/2025/12/Without-Deals-API-300x142.png 300w, https://iabtechlab.com/wp-content/uploads/2025/12/Without-Deals-API-768x363.png 768w, https://iabtechlab.com/wp-content/uploads/2025/12/Without-Deals-API-169x80.png 169w, https://iabtechlab.com/wp-content/uploads/2025/12/Without-Deals-API.png 1507w"/><figcaption>Complex error prone Deals workflow without an API</figcaption></figure>
<h3>Deal Workflow with the Deals API</h3>
<figure><img alt="" sizes="(max-width: 1024px) 100vw, 1024px" src="https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API.png" srcset="https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API-1024x432.png 1024w, https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API-300x127.png 300w, https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API-768x324.png 768w, https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API-1536x648.png 1536w, https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API-190x80.png 190w, https://iabtechlab.com/wp-content/uploads/2025/12/With-Deals-API.png 1540w"/></figure>
<h3><strong>What it isn’t</strong></h3>
<ul><li>This is a separate API that is <b>NOT included</b> in OpenRTB Request/Response</li><li>Does not include real-time information contained in the bid request or determine whether or not a deal applies. Implementers are strongly encouraged to validate the conditions laid out in this deal with OpenRTB requests to ensure their expectations are being met.</li><li>The MVP of this API does NOT support proposals, revisions, or negotiations. It is assumed those are known to implementers a priori. </li><li>The MVP is not meant to support discoverability in deal marketplaces. </li></ul>
<figure><img alt="Member Perspective on the Evolution of Curation by Onetag" sizes="(max-width: 1201px) 100vw, 1201px" src="https://iabtechlab.com/wp-content/uploads/2025/09/Onetag-2.png" srcset="https://iabtechlab.com/wp-content/uploads/2025/09/Onetag-2.png 1201w, https://iabtechlab.com/wp-content/uploads/2025/09/Onetag-2-300x157.png 300w, https://iabtechlab.com/wp-content/uploads/2025/09/Onetag-2-1024x536.png 1024w, https://iabtechlab.com/wp-content/uploads/2025/09/Onetag-2-768x402.png 768w, https://iabtechlab.com/wp-content/uploads/2025/09/Onetag-2-153x80.png 153w"/><figcaption><a href="https://iabtechlab.com/the-evolution-of-curation-from-static-deals-to-real-time-precision/">Member Perspective on the Evolution of Curation by Onetag</a></figcaption></figure>
<figure><img alt="What's the Deal ID with Curation Webinar Replay with Hillary Slattery and Chris Kane" sizes="(max-width: 1000px) 100vw, 1000px" src="https://iabtechlab.com/wp-content/uploads/2025/08/Curation-Replay-Webinar-1000x500-1.png" srcset="https://iabtechlab.com/wp-content/uploads/2025/08/Curation-Replay-Webinar-1000x500-1.png 1000w, https://iabtechlab.com/wp-content/uploads/2025/08/Curation-Replay-Webinar-1000x500-1-300x150.png 300w, https://iabtechlab.com/wp-content/uploads/2025/08/Curation-Replay-Webinar-1000x500-1-768x384.png 768w, https://iabtechlab.com/wp-content/uploads/2025/08/Curation-Replay-Webinar-1000x500-1-160x80.png 160w"/><figcaption><a href="https://iabtechlab.com/standards/supply-chain-foundations/webinar-replay-whats-the-deal-id-with-curation/">What's the Deal ID with Curation Webinar Replay with Hillary Slattery and Chris Kane</a></figcaption></figure>
