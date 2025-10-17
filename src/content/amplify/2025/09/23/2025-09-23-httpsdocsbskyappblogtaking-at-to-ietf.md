---
author: bsky.app
cover_image: 'https://docs.bsky.app/img/social-card-default.png'
date: '2025-09-23T22:53:05.203Z'
dateFolder: 2025/09/23
description: >-
  Last week we posted two drafts to the IETF Data Tracker. This is the first
  major step towards standardizing parts of AT in an effort to establish
  long-term governance for the protocol.
isBasedOn: 'https://docs.bsky.app/blog/taking-at-to-ietf'
link: 'https://docs.bsky.app/blog/taking-at-to-ietf'
slug: 2025-09-23-httpsdocsbskyappblogtaking-at-to-ietf
tags:
  - tech
  - social media
  - decentralization
title: Taking AT to the IETF
---
<p><a href="https://docs.bsky.app/blog/taking-at-to-ietf#__docusaurus_skipToContent_fallback">Skip to main content</a></p>
<p><a href="https://docs.bsky.app/"><figure><img alt="Bluesky Logo" src="https://docs.bsky.app/img/favicon.png"/></figure><b>Bluesky</b></a><a href="https://docs.bsky.app/docs/get-started">Docs</a><a href="https://docs.bsky.app/blog">Blog</a><a href="https://docs.bsky.app/showcase">Showcase</a></p>
<p><a href="https://github.com/bluesky-social">GitHub</a></p>
<aside>Recent posts<br/><h3>2025</h3><ul><li><a href="https://docs.bsky.app/blog/taking-at-to-ietf">Taking AT to the IETF</a></li><li><a href="https://docs.bsky.app/blog/plc-directory-org">Creating an Independent Public Ledger of Credentials (PLC) Directory Organization</a></li><li><a href="https://docs.bsky.app/blog/oauth-improvements">OAuth Improvements</a></li><li><a href="https://docs.bsky.app/blog/account-management">Network Account Management</a></li><li><a href="https://docs.bsky.app/blog/relay-sync-updates">Relay Updates for Sync v1.1</a></li><li><a href="https://docs.bsky.app/blog/2025-protocol-roadmap-spring">2025 Protocol Roadmap (Spring and Summer)</a></li><li><a href="https://docs.bsky.app/blog/api-v0-14-0-release-notes">@atproto/api v0.14.0 release notes</a></li><li><a href="https://docs.bsky.app/blog/looking-back-2024">Looking Back At 2024 AT Protocol Development</a></li></ul><h3>2024</h3><ul><li><a href="https://docs.bsky.app/blog/relay-ops">Relay Operational Updates</a></li><li><a href="https://docs.bsky.app/blog/jetstream">Introducing Jetstream</a></li><li><a href="https://docs.bsky.app/blog/pinned-posts">Lexicons, Pinned Posts, and Interoperability</a></li><li><a href="https://docs.bsky.app/blog/oauth-atproto">OAuth for AT Protocol</a></li><li><a href="https://docs.bsky.app/blog/ts-api-refactor">Typescript API Package Auth Refactor</a></li><li><a href="https://docs.bsky.app/blog/label-grants">Labeling Services Microgrants</a></li><li><a href="https://docs.bsky.app/blog/2024-protocol-roadmap">2024 Protocol Roadmap</a></li><li><a href="https://docs.bsky.app/blog/atproto-grants-recipients">Meet the second batch of AT Protocol Grant Recipients</a></li><li><a href="https://docs.bsky.app/blog/blueskys-moderation-architecture">Bluesky's Moderation Architecture</a></li><li><a href="https://docs.bsky.app/blog/atproto-grants">Announcing AT Protocol Grants</a></li><li><a href="https://docs.bsky.app/blog/skygaze-hackathon">Skygaze Hackathon</a></li><li><a href="https://docs.bsky.app/blog/self-host-federation">Early Access Federation for Self-Hosters</a></li></ul><h3>2023</h3><ul><li><a href="https://docs.bsky.app/blog/feature-bridgyfed">Featured Community Project: Bridgy Fed</a></li><li><a href="https://docs.bsky.app/blog/repo-export">Download and Parse Repository Exports</a></li><li><a href="https://docs.bsky.app/blog/building-on-atproto">Building on the AT Protocol</a></li><li><a href="https://docs.bsky.app/blog/protocol-roadmap">2023 Protocol Roadmap</a></li><li><a href="https://docs.bsky.app/blog/bgs-and-did-doc">Bluesky BGS and DID Document Formatting Changes</a></li><li><a href="https://docs.bsky.app/blog/rate-limits-pds-v3">Rate Limits, PDS Distribution v3, and More</a></li><li><a href="https://docs.bsky.app/blog/repo-sync-update">Updates to Repository Sync Semantics</a></li><li><a href="https://docs.bsky.app/blog/create-post">Posting via the Bluesky API</a></li><li><a href="https://docs.bsky.app/blog/feature-skyfeed">Featured Community Project: Skyfeed</a></li><li><a href="https://docs.bsky.app/blog/call-for-developers">Bluesky Call for Developers</a></li><li><a href="https://docs.bsky.app/blog/federation-sandbox">Federation Developer Sandbox Guidelines</a></li><li><a href="https://docs.bsky.app/blog/block-implementation">Why are blocks on Bluesky public?</a></li></ul></aside>
<h1>Taking AT to the IETF</h1>
<p>September 23, 2025 · 3 min read</p>
<p>Last week we posted two drafts to the IETF Data Tracker. This is the first major step towards standardizing parts of AT in an effort to establish long-term governance for the protocol.</p>
<p>In particular, we’ve submitted two Internet-Drafts:</p>
<p><a href="https://datatracker.ietf.org/doc/draft-holmgren-at-repository/">Authenticated Transfer Repository and Synchronization</a>: a proposed standard that specifies the AT repository format and sync semantics</p>
<p><a href="https://datatracker.ietf.org/doc/draft-newbold-at-architecture/">Authenticated Transfer: Architecture Overview</a>: an informational draft that goes over the architecture of the broader network and describes how the repository fits into it.</p>
<p>Just today, we were approved for a Birds of a Feather (BOF) session at <a href="https://www.ietf.org/meeting/124/">IETF 124</a> in Montreal from November 1-7. Details on the BOF can be found <a href="https://datatracker.ietf.org/doc/bofreq-newbold-authenticated-transfer/">Here</a>.</p>
<p>A BOF is a part of the formal IETF process for forming a working group. It involves pulling together interested parties in order to determine if the IETF is a good fit for chartering a working group to work on a particular technology.</p>
<p>This is a “non-working group forming” BOF. The intention is to get feedback on both the charter for the WG and the drafts that we’ve submitted. If things go well, then we’d likely do an interim BOF between IETF 124 and 125 to actually form a working group.</p>
<h2>What We’re Planning to Bring (and What We’re Not)</h2>
<p>We’re specifically focusing on the repository and sync protocol. We’re not planning to bring Lexicon, AT’s particular OAuth profile, Auth scopes, PLC, the handle system, or other AT components to the IETF right now.</p>
<p>A few reasons for the narrow scope:</p>
<ul> <li>Working groups need focused charters, especially when bringing a new protocol to the IETF</li> <li>The repo and sync protocol is the most foundational part of AT and is therefore the most impactful to have under neutral governance</li> <li>The repo and sync protocol is the most “IETF-flavored” part of the stack, especially with its reliance on CBOR and WebSockets (both IETF specifications)</li> </ul>
<p>If things go well for both sides, we may consider rechartering the working group later. Whether or not a working group forms will not impact how new AT features such as private state are designed or rolled out.</p>
<h2>Why IETF?</h2>
<p>This is part of an ongoing effort to mature the governance of AT. (See also: the parallel work that we’re pushing forward on <a href="https://docs.bsky.app/blog/plc-directory-org">moving PLC to an independent organization</a>)</p>
<p>We want AT to have a neutral long-term home, and the IETF seems like a natural fit for several reasons. It’s the home of many internet protocols that you know and use every day: HTTP, TLS, SMTP, OAuth, WebSockets, and many others. The IETF has an open, consensus-driven process that anyone can participate in. And importantly, the IETF cares about both the decentralization of the internet while also keeping it functioning well in practice. This balance between idealism and pragmatism matches how we’ve approached the challenges of building a large-scale decentralized social networking protocol.</p>
<h2>What You Can Do</h2>
<p>Read the drafts! Take a look at what we’ve submitted and see what you think. We have a <a href="https://github.com/bluesky-social/ietf-drafts">public GitHub repo</a> where you can comment on the drafts and provide feedback. We’re hoping to iterate on the drafts at least once before the BOF and already have a few issues noted that we need to address.</p>
<p>If you’re planning to attend IETF 124 in Montreal, let us know! We’d love to connect with folks who are interested in this work.</p>
<p><b>Tags:</b></p>
<ul><li><a href="https://docs.bsky.app/blog/tags/updates">updates</a></li><li><a href="https://docs.bsky.app/blog/tags/ietf">ietf</a></li></ul>
<p><a href="https://github.com/bluesky-social/bsky-docs/tree/main/blog/2025-09-23-taking-at-to-ietf.md">Edit this page</a></p>
<p><a href="https://docs.bsky.app/blog/plc-directory-org">Older postCreating an Independent Public Ledger of Credentials (PLC) Directory Organization</a></p>
<ul><li><a href="https://docs.bsky.app/blog/taking-at-to-ietf#what-were-planning-to-bring-and-what-were-not">What We’re Planning to Bring (and What We’re Not)</a></li><li><a href="https://docs.bsky.app/blog/taking-at-to-ietf#why-ietf">Why IETF?</a></li><li><a href="https://docs.bsky.app/blog/taking-at-to-ietf#what-you-can-do">What You Can Do</a></li></ul>
<p>Docs</p>
<ul><li><a href="https://docs.bsky.app/docs/category/starter-templates">Starter Templates</a></li><li><a href="https://atproto.com">AT Protocol</a></li></ul>
<p>Community</p>
<ul><li><a href="https://bsky.app/profile/bsky.app">Bluesky</a></li><li><a href="https://twitter.com/bluesky">Twitter</a></li><li><a href="https://discord.gg/3srmDsHSZJ">Community-run Discord</a></li><li><a href="https://docs.bsky.app/docs/support/mailing-list">Mailing List</a></li></ul>
<p>More</p>
<ul><li><a href="https://docs.bsky.app/blog">Blog</a></li><li><a href="https://github.com/bluesky-social/atproto/discussions">GitHub Discussions</a></li><li><a href="https://github.com/bluesky-social">GitHub</a></li></ul>
<p>Copyright © 2025 Bluesky, PBC.</p>
