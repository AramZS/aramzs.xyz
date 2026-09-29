---
author: Public Ledger of Credentials Organization
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Ai65vdx4ylh5ahdjyd7f2gpnp/3mukis7uxvs2a/3mwlphq42d227/opengraph-image-1qv6ug?c1d2f6c379aabdcf
date: '2026-09-28T20:44:59.238Z'
dateFolder: 2026/09/28
description: >-
  One year ago, Bluesky Social PBC announced their intention to facilitate the
  creation of an independent organization to operate the Public Ledger of
  Credenti…
isBasedOn: 'https://blog.plcred.org/3mwlphq42d227'
link: 'https://blog.plcred.org/3mwlphq42d227'
slug: 2026-09-28-httpsblogplcredorg3mwlphq42d227
tags:
  - tech
  - decentralization
title: First steps of the PLC organization
---
<p>One year ago, Bluesky Social PBC <a href="https://atproto.com/blog/plc-directory-org">announced</a> their intention to facilitate the creation of an independent organization to operate the Public Ledger of Credentials (PLC) directory.</p>
<p>We are happy to announce the Public Ledger of Credentials Organization now formally exists, and has taken the first administrative steps towards being able to independently operate the directory!</p>
<h3 data-index="2"><a href="https://blog.plcred.org/3mwlphq42d227/#what-is-the-plc-directory">What is the PLC directory?</a></h3>
<p>The PLC directory is a system that collects and distributes updates to AT Protocol accounts, which are identified by random-looking strings like did:plc:i65vdx4ylh5ahdjyd7f2gpnp. Updates include an account's handle (@plcred.org) and the choice of <a href="https://atproto.com/guides/self-hosting#pds">PDS</a> hosting that account's data.</p>
<p>These updates are signed with cryptographic keys that the directory does not control, so the directory server can't tamper with the information that is posted. For example, if a user signs up for Bluesky on <a href="https://bsky.app">bsky.app</a>, their account will initially be controlled by keys held on their behalf<sup>1</sup> by Bluesky Social PBC. If they sign up on <a href="https://mu.social">mu.social</a> or <a href="https://eurosky.tech">eurosky.tech</a>, they will initially use keys managed by the Eurosky PDS.</p>
<p>Users can update the keys that control their PLC identity at any time, and can replace them with keys generated on their own devices. It is also possible to create and register new account identifiers from scratch.</p>
<p>You can read more about the PLC system at <a href="https://web.plc.directory/">web.plc.directory</a>, and more about its use in the AT network in the <a href="https://atproto.com/guides/identity">Identity Protocol Documentation</a>.</p>
<h3 data-index="7"><a href="https://blog.plcred.org/3mwlphq42d227/#what-is-the-plc-organization">What is the PLC organization?</a></h3>
<p>The Public Ledger of Credential Organization is a registered <a href="https://en.wikipedia.org/wiki/Swiss_association">Swiss Association</a>, with the purpose of providing public identity infrastructure for users of Internet applications.</p>
<p>Roughly speaking, a Swiss association (or Verein in German) is an independent legal entity with legal capacity, governed by Swiss law. It has no owners or shareholders, is governed by its members according to its official objective and purpose, and does not exist for the economic benefit of its members.<sup>2</sup></p>
<p>The initial association and board members are:</p>
<p>Richard Barnes is a security researcher and protocol engineer who helped co-found Let's Encrypt and led security teams at Mozilla and Cisco.</p>
<p>Thyla van der Merwe is a cryptography and formal verification lead at Google who has contributed to cryptography standards at ISO and the IETF, particularly TLS 1.3.</p>
<p>Bryan Newbold (<a href="https://bsky.app/profile/did:plc:44ybard66vv44zksje25o7dz">@bnewbold.net</a>) is a protocol engineer at Bluesky Social PBC and contributor to the atproto working group at the IETF.</p>
<p>Wendy Seltzer (<a href="https://bsky.app/profile/wseltzer.bsky.social">@wseltzer.bsky.social)</a> is a lawyer and technologist who has worked with Internet governance and open standards at W3C, IETF, and ICANN.</p>
<p>Filippo Valsorda (<a href="https://bsky.app/profile/filippo.abyssdomain.expert">@filippo.abyssdomain.expert</a>), is a cryptography engineer, open source maintainer, and operator of <a href="https://tuscolo.sunlight.geomys.org/">other append-only-shaped critical Internet infrastructure</a>. In the interest of full disclosure, he is a tiny<sup>3</sup> investor in Bluesky Social PBC.</p>
<h3 data-index="16"><a href="https://blog.plcred.org/3mwlphq42d227/#whats-the-status-of-the-plc-organization">What's the status of the PLC organization?</a></h3>
<p>We have defined our statute, set up the digital tools necessary to operate, secured a bank account, and of course created a <a href="https://standard.site">standard.site</a> publication! This initial work has been funded by a relatively small bootstrap payment from Bluesky Social PBC.</p>
<p>The next major step for the organization is to get ready to take over the PLC directory assets and operations. As part of that we'll define the initial set of policies that will govern the directory once transferred.</p>
<p>Longer term, we intend to work on improving tools that provide users with visibility and control over their network identities, and to diversify our funding. Our intention is to mature into a small, reliable, and sustainable operation.</p>
<p>To keep up to date, subscribe with a <a href="https://standard.site">standard.site</a> reader or <a href="https://blog.plcred.org/rss">via RSS</a>.</p>
<p>If you wish to contact us, email <a href="mailto:hello@plcred.org">hello@plcred.org</a>.</p>
<p><a href="https://blog.plcred.org/3mwlphq42d227/#fnref-01a06826-bbaf-7bbf-8118-434e521e6d15">1.</a></p>
<p>Why? Because user custody of cryptographic keys has very sharp UX edges. Delegating the keys to your atproto PDS means you can get back in control of your PLC identity with e.g. an email-based password reset.</p>
<p><a href="https://blog.plcred.org/3mwlphq42d227/#fnref-01a06831-69d8-7bbf-8123-4a2f7be108d2">2.</a></p>
<p>Members are not the beneficiaries of the assets of the association: should it ever dissolve, they can't receive the assets and must instead allocate them consistently with the purpose of the association.</p>
