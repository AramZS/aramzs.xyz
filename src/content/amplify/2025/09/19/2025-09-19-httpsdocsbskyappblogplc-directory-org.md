---
author: bsky.app
cover_image: 'https://docs.bsky.app/img/social-card-default.png'
date: '2025-09-19T11:31:29.025Z'
dateFolder: 2025/09/19
description: >-
  The Bluesky Social app is built on an open network protocol that refers to
  each user by a unique Decentralized Identifier, or DID (a W3C standard). The
  most popular supported DID method was developed in-house by Bluesky Social,
  and is called "Public Ledger of Credentials", or PLC. The PLC identity system
  currently relies on a global directory service to distribute identity updates,
  and that directory service has been operated by Bluesky as well.
isBasedOn: 'https://docs.bsky.app/blog/plc-directory-org'
link: 'https://docs.bsky.app/blog/plc-directory-org'
slug: 2025-09-19-httpsdocsbskyappblogplc-directory-org
tags:
  - tech
  - social media
  - decentralization
title: >-
  Creating an Independent Public Ledger of Credentials (PLC) Directory
  Organization
---
<p><a href="https://docs.bsky.app/blog/plc-directory-org#__docusaurus_skipToContent_fallback">Skip to main content</a></p>
<p><a href="https://docs.bsky.app/"><figure><img alt="Bluesky Logo" src="https://docs.bsky.app/img/favicon.png"/></figure><b>Bluesky</b></a><a href="https://docs.bsky.app/docs/get-started">Docs</a><a href="https://docs.bsky.app/blog">Blog</a><a href="https://docs.bsky.app/showcase">Showcase</a></p>
<p><a href="https://github.com/bluesky-social">GitHub</a></p>
<aside>Recent posts<br/><h3>2025</h3><ul><li><a href="https://docs.bsky.app/blog/plc-directory-org">Creating an Independent Public Ledger of Credentials (PLC) Directory Organization</a></li><li><a href="https://docs.bsky.app/blog/oauth-improvements">OAuth Improvements</a></li><li><a href="https://docs.bsky.app/blog/account-management">Network Account Management</a></li><li><a href="https://docs.bsky.app/blog/relay-sync-updates">Relay Updates for Sync v1.1</a></li><li><a href="https://docs.bsky.app/blog/2025-protocol-roadmap-spring">2025 Protocol Roadmap (Spring and Summer)</a></li><li><a href="https://docs.bsky.app/blog/api-v0-14-0-release-notes">@atproto/api v0.14.0 release notes</a></li><li><a href="https://docs.bsky.app/blog/looking-back-2024">Looking Back At 2024 AT Protocol Development</a></li></ul><h3>2024</h3><ul><li><a href="https://docs.bsky.app/blog/relay-ops">Relay Operational Updates</a></li><li><a href="https://docs.bsky.app/blog/jetstream">Introducing Jetstream</a></li><li><a href="https://docs.bsky.app/blog/pinned-posts">Lexicons, Pinned Posts, and Interoperability</a></li><li><a href="https://docs.bsky.app/blog/oauth-atproto">OAuth for AT Protocol</a></li><li><a href="https://docs.bsky.app/blog/ts-api-refactor">Typescript API Package Auth Refactor</a></li><li><a href="https://docs.bsky.app/blog/label-grants">Labeling Services Microgrants</a></li><li><a href="https://docs.bsky.app/blog/2024-protocol-roadmap">2024 Protocol Roadmap</a></li><li><a href="https://docs.bsky.app/blog/atproto-grants-recipients">Meet the second batch of AT Protocol Grant Recipients</a></li><li><a href="https://docs.bsky.app/blog/blueskys-moderation-architecture">Bluesky's Moderation Architecture</a></li><li><a href="https://docs.bsky.app/blog/atproto-grants">Announcing AT Protocol Grants</a></li><li><a href="https://docs.bsky.app/blog/skygaze-hackathon">Skygaze Hackathon</a></li><li><a href="https://docs.bsky.app/blog/self-host-federation">Early Access Federation for Self-Hosters</a></li></ul><h3>2023</h3><ul><li><a href="https://docs.bsky.app/blog/feature-bridgyfed">Featured Community Project: Bridgy Fed</a></li><li><a href="https://docs.bsky.app/blog/repo-export">Download and Parse Repository Exports</a></li><li><a href="https://docs.bsky.app/blog/building-on-atproto">Building on the AT Protocol</a></li><li><a href="https://docs.bsky.app/blog/protocol-roadmap">2023 Protocol Roadmap</a></li><li><a href="https://docs.bsky.app/blog/bgs-and-did-doc">Bluesky BGS and DID Document Formatting Changes</a></li><li><a href="https://docs.bsky.app/blog/rate-limits-pds-v3">Rate Limits, PDS Distribution v3, and More</a></li><li><a href="https://docs.bsky.app/blog/repo-sync-update">Updates to Repository Sync Semantics</a></li><li><a href="https://docs.bsky.app/blog/create-post">Posting via the Bluesky API</a></li><li><a href="https://docs.bsky.app/blog/feature-skyfeed">Featured Community Project: Skyfeed</a></li><li><a href="https://docs.bsky.app/blog/call-for-developers">Bluesky Call for Developers</a></li><li><a href="https://docs.bsky.app/blog/federation-sandbox">Federation Developer Sandbox Guidelines</a></li><li><a href="https://docs.bsky.app/blog/block-implementation">Why are blocks on Bluesky public?</a></li></ul></aside>
<h1>Creating an Independent Public Ledger of Credentials (PLC) Directory Organization</h1>
<p>September 19, 2025 · 2 min read</p>
<p>The Bluesky Social app is built on an open network protocol that refers to each user by a unique Decentralized Identifier, or DID (<a href="https://www.w3.org/TR/did-1.0/">a W3C standard</a>). The most popular supported DID method was developed in-house by Bluesky Social, and is called "Public Ledger of Credentials", or <a href="https://web.plc.directory/">PLC</a>. The PLC identity system currently relies on a global directory service to distribute identity updates, and that directory service has been operated by Bluesky as well.</p>
<p>Until now.</p>
<p>As the next step of maturing governance of the PLC identity system, Bluesky Social PBC is supporting the creation of an independent organization to operate the directory. The organization will set policies and rate-limits, hold any related intellectual property, and coordinate future evolution and development of the system. While Bluesky and the AT network are the largest use case for the PLC system today, it is a general-purpose technology, and will be developed and operated as a vendor- and application-neutral public good.</p>
<p>After considering several jurisdictions, legal structures, and potential parent organizations, the new entity will form as a Swiss Association. In a period of international uncertainty around Internet governance, Switzerland provides a credibly neutral and stable global home. This entity will have the independence and flexibility to transform itself into another legal structure as it evolves. Initial board members and other logistical details are still being finalized.</p>
<p>We do not expect this organization to be the final governance structure for PLC, and we do not expect a single global directory to be the final technical architecture for the system. But as the AT network grows and diversifies, it becomes increasingly important for the identity system to have a clear path toward independence. It is also our hope that a more neutral and independent PLC identity system will find use by other projects in the broader open web ecosystem.</p>
<p>You can read more about the PLC identity system at <a href="https://web.plc.directory/">web.plc.directory</a>, and more about its use in the AT network in the <a href="https://atproto.com/guides/identity">Identity Protocol Documentation</a>.</p>
<p><b>Tags:</b></p>
<ul><li><a href="https://docs.bsky.app/blog/tags/plc">plc</a></li></ul>
<p><a href="https://github.com/bluesky-social/bsky-docs/tree/main/blog/2025-09-19-plc-directory-org.md">Edit this page</a></p>
<p><a href="https://docs.bsky.app/blog/oauth-improvements">Older postOAuth Improvements</a></p>
<p>Docs</p>
<ul><li><a href="https://docs.bsky.app/docs/category/starter-templates">Starter Templates</a></li><li><a href="https://atproto.com">AT Protocol</a></li></ul>
<p>Community</p>
<ul><li><a href="https://bsky.app/profile/bsky.app">Bluesky</a></li><li><a href="https://twitter.com/bluesky">Twitter</a></li><li><a href="https://discord.gg/3srmDsHSZJ">Community-run Discord</a></li><li><a href="https://docs.bsky.app/docs/support/mailing-list">Mailing List</a></li></ul>
<p>More</p>
<ul><li><a href="https://docs.bsky.app/blog">Blog</a></li><li><a href="https://github.com/bluesky-social/atproto/discussions">GitHub Discussions</a></li><li><a href="https://github.com/bluesky-social">GitHub</a></li></ul>
<p>Copyright © 2025 Bluesky, PBC.</p>
