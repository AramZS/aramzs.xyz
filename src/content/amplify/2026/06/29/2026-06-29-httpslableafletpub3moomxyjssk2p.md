---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Abtxrwcaeyodrap5mnjw2fvmz/3lppk75kw7k26/3moomxyjssk2p/opengraph-image-vzkbb4?edc23816ae45539e
date: '2026-06-29T21:46:18.427Z'
dateFolder: 2026/06/29
description: >-
  Lab Notes 029: explaining how Standard Site works, how it compares to RSS, and
  its utility for readers and publishers
isBasedOn: 'https://lab.leaflet.pub/3moomxyjssk2p'
link: 'https://lab.leaflet.pub/3moomxyjssk2p'
slug: 2026-06-29-httpslableafletpub3moomxyjssk2p
tags:
  - tech
  - decentralization
title: 'What is Standard Site, and why is it useful?'
---
<figure><img alt="Three lil' guys gather around a standard site logo with wires coming out of it. The guys appear to be connecting the wires to something" src="https://lab.leaflet.pub/api/atproto_images?did=did:plc:btxrwcaeyodrap5mnjw2fvmz&amp;cid=bafkreidmziwusl4k5nhdf4ndzxvfmkonj3h7ilrtbd2sw6cjsnlw7uqiui&amp;v=1"/><figcaption>Three lil' guys gather around a standard site logo with wires coming out of it. The guys appear to be connecting the wires to something</figcaption></figure>
<p><a href="https://standard.site/">Standard Site</a>, launched at the beginning of this year, is a set of shared standards for publishing longform content on the internet, focused on interoperable content discovery and social features.</p>
<p>As the</p>
<p>@standard.site</p>
<p>ecosystem grows — from Bluesky's <a href="https://bsky.app/profile/bsky.app/post/3mmwmla3xph26">link card integration</a> to WordPress's <a href="https://activitypub.blog/2026/05/20/atmosphere-1-0-0-liftoff/">new plugin</a> to community <a href="https://standard-reader.app/">reader tools</a> emerging — more people are hearing about it and wondering:</p>
<p>What exactly is Standard Site, and what is it good for?</p>
<p>The easiest way to think about Standard Site is probably:</p>
<p>What if we had a way to write and follow publications on the internet, built on a large-scale social network graph?</p>
<p>It's a standard format for publishing and engaging with longform content on the internet (think: blogs!) in a way that's linked to your identity and easy to aggregate, built on AT Protocol.</p>
<p>Here's what happens when you publish something using Standard Site — a blog post in a Leaflet publication, for example:</p>
<ul><li><p data-index="10.2">services can crawl and index this data in different ways and do all sorts of cool things with it, like aggregate it for readers</p></li></ul>
<p>Writers: posts you publish live in a place you control. Readers: your subscriptions and recommends do too.</p>
<p>Per</p>
<p>@jimray.bsky.team</p>
<p>in <a href="https://lab.leaflet.pub/lish/uri/at%3A%2F%2Fdid%3Aplc%3Alysqukqdu6hsrhet5v2brjgo%2Fsite.standard.document%2F3mcxq7tyx522r">Let’s build an Atmospheric Web</a>, it's about enabling both ownership and distribution in the social web.</p>
<p>The basic problem RSS solves: given a blog (or podcast / website), what are its latest posts?</p>
<p>Standard Site is also about aggregating longform content on the internet. The two biggest differences are that with Standard Site, data is fundamentally associated with identity, and it's easy to index across the entire network.</p>
<p>With social primitives in Standard Site that don't exist in RSS, like recommends and subscribes, together with user identity, we can build up a really useful graph of social relationships around content. This makes it easy to, for example, see all the publications your friends subscribe to, or what posts they've most shared.</p>
<p>With the atproto firehose, we get a global distribution layer, compared to RSS where crawling and collection is more ad-hoc.</p>
<p>Jim also describes how atproto and RSS complement one another, and how new feed readers might enable richer social experiences, at <a href="https://lab.leaflet.pub/lish/uri/at%3A%2F%2Fdid%3Aplc%3Alysqukqdu6hsrhet5v2brjgo%2Fsite.standard.document%2F3mdecavhkns2t">What you can do with AT Protocol</a>.</p>
<p>Standard Site enables more flexible, composable experiences for readers and writers alike; lots of cool things are possible already:</p>
<ul><li><p data-index="23.2">People can subscribe to publications with their atproto account, as an alternative to email — and because subs are public, you can sign into any reader app and they'll be there</p></li></ul>
<p>Different apps can compete on different parts of the experience, and things like this become possible in Bluesky — or in any app:</p>
<p>As Standard Site becomes more ubiquitous, we get something like RSS but with full social context, including two-way relationships between readers and publishers, as well as exciting potential for things like communities within the broader social graph.</p>
<p>Readers get stronger signals for discovery and more ways to enter conversations. Publishers get stronger connections to their audience and more flexibility with things like memberships. For example, we could build ways to let your Bluesky followers get exclusive access to certain content, or members-only commenting permissions.</p>
<p>You can publish with</p>
<p>@leaflet.pub</p>
<p>— or other tools like</p>
<p>@pckt.blog</p>
<p>and</p>
<p>@offprint.app</p>
<p>— to publish to Standard Site out of the box.</p>
<p>If you have a self-hosted static site you can use</p>
<p>@sequoia.pub</p>
<p>to easily publish Standard Site records, or roll your own integration.</p>
<p>There are a few layers to how you can use Standard Site — you can use all of these, or just some:</p>
<ul><li><p data-index="34.1">content layer: the actual content you're publishing, which can be in any format; not required, but putting this on protocol enables things like richer search and backlinks</p></li></ul>
<p>To explore the ecosystem, check out:</p>
<p>Standard Site is a great example of what AT Protocol makes possible as a technology, and what the Atmosphere makes possible as an ecosystem — a collaboratively created and stewarded set of standards leading to the emergence of lots of useful things.</p>
<p>It's not just a theoretical spec but a pragmatic thing that's easy to integrate, and already being widely implemented.</p>
<p>Play around, explore the <a href="https://standard.site/docs/introduction/">docs</a>, and <a href="https://bsky.app/profile/standard.site">reach out</a> if you have questions!</p>
