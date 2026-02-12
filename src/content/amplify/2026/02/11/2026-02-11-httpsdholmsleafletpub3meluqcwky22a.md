---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Ayk4dd2qkboz2yv6tpubpc6co/3m6zrpzbs3s2y/3meluqcwky22a/opengraph-image?e2bb7203df6d3028
date: '2026-02-11T18:54:23.099Z'
dateFolder: 2026/02/11
description: >-
  The first in a series of posts about major design decisions along the way to a
  permissioned data protocol for atproto.
isBasedOn: 'https://dholms.leaflet.pub/3meluqcwky22a'
link: 'https://dholms.leaflet.pub/3meluqcwky22a'
slug: 2026-02-11-httpsdholmsleafletpub3meluqcwky22a
tags:
  - code
  - tech
  - privacy
  - decentralization
title: 'Permissioned Data Diary 1: To Encrypt or Not to Encrypt'
---
<p>The first in a series of posts about major design decisions along the way to a permissioned data protocol for atproto.</p>
<p>We’re working on permissioned data for atproto! The design space is still open, but we’re starting to gain confidence in a few core ideas that help structure the solution. We have a rough goal of having a rough proposal by AtmosphereConf (statements I won’t regret for 500, please).</p>
<p>I wanted to write up and explain some of our design decisions in a series of posts as we go along. This is the first in that series and is about our decision to not design an end-to-end encrypted (E2EE) system.</p>
<p>But first, let’s discuss what “permissioned data” actually is. Permissioned data is a broad term, it covers many different social modalities &amp; data flows. In its most basic sense, it means “not public”. In other words, data that lives on your PDS but isn't broadcasted out over the firehose and is only accessible to users and services that have been explicitly granted permission.</p>
<p>Some non-exhaustive examples:</p>
<h2 data-index="5">DMs are different</h2>
<p>DMs are the clear outlier of that group. Every state of the art messaging app has converged on E2EE as table stakes. Signal did it, WhatsApp adopted the Signal Protocol, iMessage has it, even Facebook rolled it out on Messenger. If you’re building a messaging product in 2026 and it’s not E2EE, you have some explaining to do.</p>
<p>But looking at the rest of the list, nobody expects a private subreddit to be E2EE or for their Patreon subscription to function by negotiating key material with every paid subscriber.</p>
<p>The threat models are different. When you send a DM, you’re thinking about confidentiality in the classic sense. You want to be certain that only you and the person(s) you’re talking to can read the message. The adversaries you’re worried about are the server operator, a state actor with a subpoena, or a hacker who compromises the infrastructure.</p>
<p>However, when you post in a private subreddit with 50,000 members, you’re not worried about the server operator reading your post. Your goal isn’t to keep the content secret, it’s to keep unauthorized users from viewing the content. In other words, you’re thinking about access control, not encryption.</p>
<h2 data-index="10">Apps need to see the data</h2>
<p>In fact, in many cases you want the server to read your post.</p>
<p>One of our fundamental design postures with atproto is to take “no steps backward”. We want to enable social experiences that feel as good or better than traditional social networks, in a decentralized manner.</p>
<p>At this point, users expect to be able to search within a group, get notifications, see aggregate views (“trending in this community”), have sensible moderation tooling, get recommendations, and more. All of these features require backend services to read, process, and index the data.</p>
<p>In an E2EE system, only clients get access to the underlying data and then have to construct indexes locally on the client. This works well for DMs and some limited social experiences. But modern big world social really can’t be done solely in the client. The reasoning here is actually pretty similar to the reasoning for why atproto isn’t a p2p protocol - it really benefits from having modern backend infrastructure.</p>
<h2 data-index="15">E2EE is hard</h2>
<p>As much as I would like to spend my next year working on an <a href="https://datatracker.ietf.org/doc/rfc9420/">MLS implementation</a> and the ensuing key management issues (not being sarcastic), the reality is that E2EE is hard. And this inherent complexity isn’t something that the protocol team at Bluesky can just handle - it gets pushed out to every dev trying to build a client that works with encrypted data. And boy howdy if you thought OAuth was a pain.</p>
<p>Real humans lose devices, get new phones, forget passwords, and have exactly zero interest in managing cryptographic key material. The messaging apps that have made E2EE work have poured massive amounts of effort into making key management invisible, and it’s still a source of friction. Now extend that to every group, forum, newsletter, and private account across an open ecosystem of heterogeneous clients.</p>
<p>There are also just inherent scaling limitations to E2EE systems. The state of the art for group E2EE (MLS &amp; friends) is actually really good at this stuff and can scale to thousands of members. The last I checked, current algorithms were designed for (theoretically) going up to 50k participants but most implementations cap the group size much lower than that (like 2-10k). That’s good, but many permissioned spaces on the internet are much bigger than that. We want to design for spaces that can scale up to hundreds of thousands or millions of members.</p>
<h2 data-index="19">Layering encryption on top</h2>
<p>All that being said, this isn’t an either/or decision. Permissioned data and E2EE aren’t actually competing approaches - they operate at different layers.</p>
<p>Permissioned data is about access and data flow. Who is allowed to see this data? How does it get from point A to point B? How do applications and services engage with data on behalf of their users? What is the addressing space for non-public data?</p>
<p>E2EE is about cryptographic confidentiality. It ensures that even if someone intercepts the data or compromises the infrastructure, they can’t read it.</p>
<p>You can layer the second on top of the first. Messaging certainly benefits from E2EE. But other social modalities can benefit from it in certain contexts as well. I’d love to see an E2EE forum or community space emerge at some point. Ultimately it’s each application’s prerogative to determine what the threat model is for its social modality and to adopt the relevant security posture.</p>
<p>For this project, we’re going to be focusing on designing a permissioning and data protocol that enables modern big world social and scales to millions of users. Stay tuned for more updates as we continue our work on this!</p>
