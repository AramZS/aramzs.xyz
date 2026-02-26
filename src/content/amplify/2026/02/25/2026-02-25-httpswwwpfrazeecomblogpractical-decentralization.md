---
author: Paul Frazee
cover_image: 'https://pfrazee.com/static/images/practical-decentralization/card.png'
date: '2026-02-25T17:25:56.587Z'
dateFolder: 2026/02/25
description: >-
  The point of decentralization is to guarantee the rights of individuals and
  communities on the Internet. Pulling that off is a balancing act between
  practicality and ideology.
isBasedOn: 'https://www.pfrazee.com/blog/practical-decentralization'
link: 'https://www.pfrazee.com/blog/practical-decentralization'
slug: 2026-02-25-httpswwwpfrazeecomblogpractical-decentralization
tags:
  - tech
  - decentralization
title: Practical Decentralization
---
<p><a href="https://atproto.com">The AT protocol</a> tends to get compared to two different technologies: ActivityPub and Nostr. Both are good examples of "federated hosts" and "magical meshes," respectively.</p>
<p>Atproto draws inspiration from both of those models, but it works like neither. This can lead to some confusion that I think we can clear up.</p>
<p>I've done my best to correctly describe each protocol, but if any of my information is out of date, please let me know so I can correct.</p>
<h2>The purpose of protocols</h2>
<p>The point of decentralization is to guarantee the rights of individuals and communities on the Internet.</p>
<p>It's often noted, the average user doesn't care about decentralization. That's true: what they care about is what their algorithm does, or what moderation does, or whether their data is getting tracked, and so on.</p>
<p>Who has the right to…</p>
<ul><li>Host (or unhost) the data</li><li>Platform (or deplatform) user speech</li><li>Write new applications or features</li><li>Implement feed and search algorithms</li><li>Collect user behavior</li><li>Place ads</li><li>etc</li></ul>
<p>We use protocols to structure who can do what. Protocol designs are often about the how, but the consequence of the how is an authority model.</p>
<h2>The common models</h2>
<p>The two common protocol models are “federated hosts” and “magical meshes.”</p>
<figure><img alt="fed-and-mesh.png" data-nimg="1" src="https://www.pfrazee.com/_next/image?url=%2Fstatic%2Fimages%2Fpractical-decentralization%2Ffed-and-mesh.png&amp;w=3840&amp;q=75" srcset="https://www.pfrazee.com/_next/image?url=%2Fstatic%2Fimages%2Fpractical-decentralization%2Ffed-and-mesh.png&amp;w=1920&amp;q=75 1x,"/></figure>
<p>The “federated hosts” model is what people think of with federation. The most notable examples are email and Activity Pub. They typically involve messages being passed between servers.</p>
<p>The “magical mesh” model is what people think of with p2p and blockchains. The most notable examples are BitTorrent, Bitcoin, Ethereum, IPFS, SSB, and Nostr. They involve data being synced between user devices.</p>
<ul><li><strong>Federated Hosts</strong>: Email, ActivityPub</li><li><strong>Magical Meshes</strong>: BitTorrent, Bitcoin, Ethereum, IPFS, SSB, Nostr</li></ul>
<p>If these are the common models, then which one is atproto? The answer is both. Or neither. It depends on how you look at it.</p>
<h2>Balancing ideology and practicality</h2>
<p>I've been trying to coin a term for the decentralization as a practice: <a href="https://github.com/pfrazee/infocivics">Information Civics</a>, a marriage of software engineering and civic design. <sup>1</sup></p>
<p>Info civics is a practice of tensions:</p>
<ul><li>On the one hand, you need to achieve your ideological aims; you need to create a protocol that guarantees individual and community rights.</li><li>On the other hand, you need to produce usable software; you need it to perform well, fit the use case, and resolve problems as they arise.</li></ul>
<p>The initial atproto team spent 25 collective years on magical meshes, including IPFS, Dat, SSB, and Filecoin. As much as we loved them, we couldn't get past the problems of usable software.<sup>2</sup></p>
<p>Good protocol design requires balancing the tensions of ideology and practicality.</p>
<p>A logical extension of personal computing is a belief that everyone ought to possess maximal personal rights and make all decisions on their own.</p>
<p>This view runs into scale problems. One-way broadcast is relatively easy to make perform well and the shape of the problem supports low-coordination meshes (BitTorrent). Likewise, small-group chat and productivity software is amenable to peer-to-peer exchanges. Beyond that? It's not a great story.</p>
<p>As the number of interacting users increases, the personal computing metaphor becomes less applicable. You inevitably need to maintain indexes of aggregate data on behalf of the users. Once you introduce shared resources (the indexes) then you need to govern those resources. This is where pure p2p falls down; it has no answer for the governance of shared resources. <sup>3</sup></p>
<h2>Power</h2>
<p>Federation creates freedom to choose between competing instances. This is partially a freedom of association, but the substantive right is choice. It's a free market solution to governance problems — which is good. The more important thing is, federation works more reliably. Email and ActivityPub are immensely more viable than the magical meshes for large scale social computing.</p>
<p>But, you have the power problem. Popular instances become runaway winners.</p>
<p>The ability to migrate between hosts puts pressure on the hosts to keep users happy. Unfortunately, email doesn't have account migration, and ActivityPub can't migrate all activity (though I believe they're working on it).</p>
<p>Also: Traditional federation lacks modularity. Hosting, distribution, moderation, algorithms, and business logic are located in the hosting instance. This creates a weak separation of powers. Ideally, users reduce the power of a popular instance by devolving specific functions to other providers. We want to preserve rights in the default course of operation; separating powers helps achieve that.</p>
<h2>The magical federated mesh</h2>
<p>The atproto is both models and neither. More specifically, it's a hybrid.</p>
<figure><img alt="magical-federated-mesh.png" data-nimg="1" src="https://www.pfrazee.com/_next/image?url=%2Fstatic%2Fimages%2Fpractical-decentralization%2Fmagical-federated-mesh.png&amp;w=3840&amp;q=75" srcset="https://www.pfrazee.com/_next/image?url=%2Fstatic%2Fimages%2Fpractical-decentralization%2Fmagical-federated-mesh.png&amp;w=1920&amp;q=75 1x,"/></figure>
<p>We took all our prior work on p2p and moved it onto servers to create atproto.<sup>4</sup> It was the most practical approach we could find for decentralization.</p>
<p>Practicality:</p>
<ul><li>The use of servers simplifies operational challenges that are common with p2p or blockchains, like reliable uptime, device sync, and key management.</li><li>Building for large aggregating indexes enabled the UX people expect from public social media.</li></ul>
<p>Ideology:</p>
<ul><li>User-addressed content ensures smooth migrations from popular hosts.</li><li>A shared data space enables modularity, separating powers away from the popular hosts.</li></ul>
<p>What does this mean in practice?</p>
<p>Last fall the Bluesky team discovered a <a href="https://pfrazee.leaflet.pub/3lz4sgu7iec2k">lingering TODO in our moderation stack</a> which meant that suspensions were <em>unhosting</em> users (at the PDS level) when we meant to be <em>filtering</em> them (removing from the Bluesky app). We've since made progress on fixing that — there are still some cases to resolve.</p>
<p>Here's what matters:</p>
<p>Users on other PDS hosts weren't affected by this mistake. Bluesky had no ability to unhost those users, because we never hosted them in the first place. Their right to hosting was protected.</p>
<p>This is the specific goal of decentralization. It devolves power away from businesses and into the hands of individuals and communities.</p>
<h2>Atproto, the secret third model</h2>
<p>Our near-miss similarity to the two common models of decentralization is at least partially why we catch heat from them. We're really similar, but we introduced changes that remove the legible markers of each technology: multiple app instances in the case of federation, and an absence of servers in the case of magical meshes.</p>
<p>What is the purpose of protocols? To guarantee the rights of individuals and communities.</p>
<p>I want there to be more Bluesky competitors on atproto, but I'm way less fussed about that than I am over self-hosting the accounts and a plurality of different types of apps. We intentionally made self-hosting cheap to do, because we knew that the PDS would actively take power away from the applications. More Bluesky app instances would counteract our ability to control reach in the microblogging usecase, which is also important, but the costs are high enough for full-network apps that I get why it's slow to happen. Shout out to Blacksky, Northsky, Eurosky, and others for taking that on.</p>
<p>There are still challenges in front of atproto. Bluesky is still too large of a player. We need to finish moving PLC into an independent org (we're close!). Relays are now cheap, but large scale “appviews” — the aggregating backends of apps — are still a bit too expensive and a bit too difficult to write, and we've been jammed up on open-sourcing our high scale backend. The revenue story is still unsolved.</p>
<p>Do I worry about those problems? Of course I do. But am I confident we'll solve them? Absolutely.</p>
<p>Atproto isn't federation. It isn't p2p. It isn't blockchains. It's a direct attempt at practical decentralization, tradeoffs and all. We sacrificed properties of the magical mesh to hit the performance needs, and we broke from the history of federation to get the guarantees we wanted.</p>
<p>Those were the trades we made, and I think they were the right ones.</p>
<p><strong>1</strong> It's obvious that the technologies have ideological angles:</p>
<ul><li>Magical meshes: libertarian, individualist, anarchist.</li><li>Federated hosts: market choice, collectivism.</li></ul>
<p>If you break them down, you can figure out the assignment of rights in each of these systems. For bonus points, you can even try to figure out <a href="https://paulfrazee.medium.com/the-rules-to-make-the-rules-be0c3b9d92b6">who has the right to change a blockchain's protocol</a>.</p>
<p><strong>2</strong> I wrote a <a href="https://github.com/beakerbrowser/beaker/blob/master/archive-notice.md">pretty extensive post-mortem on Beaker Browser</a>.</p>
<p><strong>3</strong> Blockchains try to solve the governance question. They maintain individual rights within collective resources by leveraging code-as-law. That makes them inherently interesting from an infocivics perspective, but unfortunately they can only govern the state of shared ledgers, and barring more advances in ZK proofs they can't govern the derived data which an index maintains.</p>
<p>Put another way, most people accessed Ethereum via Infura, and Infura is not on-chain. Blockchains also have yet to solve their write throughput and transaction cost problems, and until that's resolved they're not ready for prime-time.</p>
<p><strong>4</strong> The primary interface to atproto is the data space, addressed by <code>at://</code> URIs. Like a magical mesh, the data space is addressed by the user — not by the host. Despite the fact I don't run my own server, my content is addressed under <code>at://pfrazee.com/...</code>. This abstracts the host, and consequently enables full and (relatively) painless account migrations.</p>
<p>Atproto then signs that content and broadcasts it as widely as possible. Whether from my hosting server of via a relay, the receivers build a cache of the activity in the shared data space. This enables modularity. Various services — algorithms, moderators, apps, etc — can easily coordinate on the shared data space.</p>
