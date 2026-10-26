---
author: AT Protocol
cover_image: 'https://atproto.com/default-social-card.png'
date: '2026-10-25T20:50:00.895Z'
dateFolder: 2026/10/25
description: >-
  Bluesky Social PBC have given a grant to Emelia Smith, an Invited Expert with
  the FedID Working Group, to work on FedCM with the goal of making FedCM really
  work for the decentralized web.
isBasedOn: 'https://atproto.com/blog/working-to-decentralize-fedcm'
link: 'https://atproto.com/blog/working-to-decentralize-fedcm'
slug: 2026-10-25-httpsatprotocomblogworking-to-decentralize-fedcm
tags:
  - tech
  - identity
  - decentralization
title: Working to Decentralize FedCM
---
<p><em>This is a guest post from <a href="https://bsky.app/profile/did:plc:5w4eqcxzw5jv5qfnmzxcakfy">Emelia Smith</a>, <a href="https://decentralizing-fedcm.leaflet.pub/">originally published on the Decentralizing FedCM blog</a>. Emelia is a familiar face not just in the atproto ecosystem but across the decentralized social web and has worked particularly hard at making authentication work on atproto. We’re excited to sponsor Emelia’s work on FedCM for the entire open social web!</em></p>
<p>Over the past few months, there’s been growing interest from the open social web community in <a href="https://w3c-fedid.github.io/FedCM/">FedCM</a>, a new standard from the <a href="https://www.w3.org/groups/wg/fedid">FedID Working Group</a> at the W3C.</p>
<p>FedCM, or Federated Credential Management API, is a new web API that allows for federated identity, such as when you “Sign in with an Identity Provider”, where the browser mediates the entire process between an authorization server and the web application. That means the browser remembers your logins, and you don’t need to do OAuth/OIDC redirects.</p>
<p>An early implementation is available in Google Chrome (<a href="https://developer.chrome.com/docs/identity/fedcm/overview#fedcm_ui_modes">video demo</a>). Essentially, you ask the browser, “Hey, can you give me a credential for an account at this Provider?” and as long as you’ve authenticated at that Provider’s authorization servers, you’ll be presented a list of your accounts to choose from by the browser, without leaving the page, and then you’re authenticated!</p>
<p>Why? Because it was designed for a web application that has relationships to a known set of authorization servers. In the open social web, there are countless authorization servers and countless applications: anyone can host their own!</p>
<p>Usually, authorization servers in the open social web are for use with one or more protocols, e.g., AT Protocol, ActivityPub, Solid, or IndieAuth. So rather than asking the browser, “Hey, can you give me a credential for an account at this Provider?”, we instead want to say, “Hey, browser, can you give me a credential for an account that supports this protocol?”</p>
<p>Work was started in the <a href="https://www.w3.org/community/fed-id/">FedID Community Group</a> (not the FedID Working Group) on <a href="https://github.com/w3c-fedid/idp-registration/issues/1">Identity Provider Registration</a> which would allow us to answer this question. It’s currently a <a href="https://github.com/w3c-fedid/Administration/blob/main/proposals-CG-WG.md">Stage 1 proposal</a>, which means it’s in incubation, and competing proposals may happen.</p>
<p>However, as this proposal was from the Community Group rather than the Working Group, we needed someone to act as the Working Group’s champion to advocate with browser implementers to actually implement this new proposal.</p>
<p>Over the past few months, I realized that for FedCM to really benefit the open social web, we needed someone on the Working Group dedicated to pushing for the needs of the decentralized web.</p>
<p>In January, I applied for <a href="https://www.w3.org/invited-experts/">Invited Expert</a> status at the FedID Working Group. I also started a conversation with <a href="https://bsky.app/profile/bnewbold.net">Bryan Newbold</a> at <a href="https://blueskyweb.xyz">Bluesky Social PBC</a>, suggesting that I was well-positioned to be that advocate. But, in order to do that work, I’d need funding.</p>
<p>Bluesky is one of the few organizations that could actually fund this work, since most other decentralized web projects don’t have much funding.</p>
<p>In the past, I’ve worked on both <a href="https://activitypub.rocks/">ActivityPub</a> and <a href="https://solidproject.org/">Solid</a> and contributed to <a href="https://indieauth.spec.indieweb.org/">IndieAuth</a> (by way of co-authoring the <a href="https://www.ietf.org/archive/id/draft-ietf-oauth-client-id-metadata-document-01.html">Client ID Metadata Document internet</a> draft with <a href="https://aaronparecki.com/">Aaron Parecki</a>, which was adopted by IndieAuth). I’ve worked a lot with OAuth and OIDC throughout my professional career as a software engineer and know the problem space really well.</p>
<p>After a week or two, my application to be an Invited Expert was approved by the W3C, allowing me to work directly with the FedID Working Group, even though I’m not a W3C member.</p>
<p>After some back-and-forth and some calls with <a href="https://bsky.app/profile/divy.zone">Devin Ivy</a> at Bluesky, we reached an agreement on a grant from Bluesky Social PBC to fund my work on FedCM and related standards. The grant is for $39,000 over 12 months, paid out monthly.</p>
<p>The grant ensures my independence from Bluesky, and specifically requires me to liaise with communities working on IndieAuth, Solid, and AT Protocol, as well as other groups whose work intersects with federated and decentralized identity. All my technical contributions, positions, and votes within the FedID WG are my own and are not influenced or directed by Bluesky.</p>
<p>I’ve already started advocating for the needs of federated and decentralized communities, first with a call for participation on the <a href="https://lists.w3.org/Archives/Public/public-fed-id/2026Feb/0003.html">mailing list</a>, although, unfortunately, due to a scheduling conflict, I wasn’t able to make the <a href="https://github.com/w3c-fedid/meetings/blob/main/2026/2026-02-24-FedCM-notes.md">meeting</a>. The concerns raised so far are:</p>
<ul> <li>We shouldn’t use silent registration, as there was some blowback on creating passkeys without a prompt.</li> <li>How do we solve revocation?</li> <li>Preventing abuse of Identity Provider Registration.</li> <li><em>“We’ve not had anybody use it yet. That is the biggest blocker”</em>.</li> <li>Adoption is a chicken and egg problem between Authorization Servers and Relying Parties (web apps).</li> </ul>
<p>When that meeting happened, we hadn’t yet signed the grant, so attendees didn’t know how serious the Bluesky team are about making FedCM work for decentralized web.</p>
<p>This <a href="https://decentralizing-fedcm.leaflet.pub">leaflet publication</a> is going to be updated roughly every two months with reports on the progress we’re making with:</p>
<ul> <li>A summary of key topics discussed, decisions made, and milestones reached.</li> <li>A description of my contributions and activities within the working group.</li> <li>An account of any cross-community coordination efforts undertaken.</li> <li>Identification of open questions, emerging issues, areas of concern, or other standardization efforts relevant to the broader federated and decentralized identity ecosystem.</li> </ul>
<p>Sometimes the report may contain topics related to additional specifications that enable the FedCM ecosystem and decentralized authorization.</p>
<p>The next FedID WG/CG Meeting is on <a href="https://www.w3.org/events/meetings/b2f840e0-5593-4164-908e-dfaf26e8b3b7/20260310T080000/">March 10th, 2026</a>, if you’re interested in this work, please do attend!</p>
<p>So stay tuned!</p>
