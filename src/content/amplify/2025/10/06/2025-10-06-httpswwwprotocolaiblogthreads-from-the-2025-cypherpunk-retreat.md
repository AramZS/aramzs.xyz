---
author: Will Scott
cover_image: 'https://protocol.ai/images/blog/og/cyber-punk-retreat.jpg'
date: '2025-10-06T13:56:27.939Z'
dateFolder: 2025/10/06
description: >-
  Key takeaways from the Cypherpunk Retreat, where 100 leading builders advanced
  privacy-tech coordination.
isBasedOn: 'https://www.protocol.ai/blog/threads-from-the-2025-cypherpunk-retreat/'
link: 'https://www.protocol.ai/blog/threads-from-the-2025-cypherpunk-retreat/'
slug: 2025-10-06-httpswwwprotocolaiblogthreads-from-the-2025-cypherpunk-retreat
tags:
  - privacy
title: Threads From
---
<p>Last week, <a href="http://protocol.ai">Protocol Labs</a> and <a href="https://web3privacy.info/">Web3Privacy Now</a> hosted a <a href="https://cypherpunk.camp/">retreat</a> outside of Berlin for 100 leading builders in the privacy-tech space. Conversations ranged across secure communications, decentralized identity, and trusted computing. The bulk of the time was spent in smaller groups working on immediate coordination problems, and the event also provided an opportunity for projects to share and better understand each other's roadmaps.</p>
<p>The retreat was designed to surface issues and align projects. We presented research, discussed assumptions, and found areas to collaborate on accelerating privacy in our systems. The following is a brief summary of the opportunities and discussions from the retreat.</p>
<h2> Secure Communications Adoption</h2>
<p><strong>P2P Interop/Bootstrapping</strong><br/>
 One coordination issue several projects were hoping to advance in Berlin was on constructing a larger anonymity set for peer-to-peer networks. The centralization of DHT bootstrapping/introduction points continues to be one of the most common ways protocols are finding themselves blocked or surveilled. Different protocols had different threat models, where for some the enumeration of users is a primary concern (like wallets), while for others it is the resilience against network censors.</p>
<p>Through several sessions, participants approached some design on what could help nodes look similar, and what sort of deniable introductions could allow nodes to look “generic” and difficult to probe by an active adversary without a direct introduction.</p>
<p><strong>Dweb Server</strong><br/>
 One conversation that has already produced results focused on making it easier to publish content privately by packaging a web server with a Tor onion service. The Internet Archive is interested in how a larger number of entities can host slices of archival data with minimal liability. The initial demonstration and thought process has centered around the following repository:</p>
<p>In addition to the direct node software, there are a set of questions for how nodes should advertise, and how discovery/routing for such a system can work that the group is continuing to think about.</p>
<h2> Decentralized Identity</h2>
<p><strong>AT Proto</strong><br/>
 Two immediate extensions to <a href="https://atproto.com/">AT Proto</a> revolve around handling payments with an experiment emerging using <a href="https://cashu.space/">cashu</a>, and bridging the model to private group messaging with work being done by <a href="https://www.germnetwork.com/">germ</a>.</p>
<p>In addition, a larger question was considered around how different DID users can move towards interoperability and extensibility. The group identified grants that are available for conformance testing which can help bridge “equivalent DIDs” but also came to the conclusion that experimenting with extending DIDs to other domains, like “objects” can be a place to test interop strategies with lower risk.</p>
<p><strong>Jurisdictions</strong><br/>
 A systematic risk is the centralization of physical infrastructure in the US, which has led to a push for more operators in more places. In addition to the <a href="https://www.eurosky.social/">eurosky.social</a> project that will next convene in November, much of the conversation in Berlin was around the costs of liability around moderation and abuse handling that comes with operating in different jurisdictions. Getting clarity on jurisdictions with low burdens for hosting will be important for prominent platforms to feel comfortable expanding their operations. Several countries in the EU are working towards gaining that clarity. Once they land that, we must have visibility across their implementation to see how well those regulations hold up in practice.</p>
<p><strong>Wallet Privacy</strong><br/>
 Most wallets today leak information about the user to the RPC provider that they use as a backend. A user fully protecting their privacy today must run their own desktop node software along with network anonymity tooling, which rarely exists in browsers or mobile wallets.</p>
<p>In Berlin, a set of conversations considered how additional networking tools between users and RPC, or cryptographic techniques can improve this situation. Two of the efforts that crystallized at the retreat were a push around private identity mechanisms (how to get past passkeys as the local identity, which is being made more possible by things like <a href="https://blogs.igalia.com/jfernandez/2025/08/25/ed25519-support-lands-in-chrome-what-it-means-for-developers-and-the-web/">ed25519 support</a>); and on better conformance/interoperability testing so that not every wallet needs to fully reinvent a privacy story (A need identified and pushed by <a href="https://pse.dev/">PSE</a>). Both efforts highlight how coordinated work on identity and interoperability can lower barriers for developers and strengthen privacy guarantees for users.</p>
<p>We recognized that much of the benefit and current adoption here comes from enterprises as a way to better harden their software and operational supply chains. The group strategized on ways to better leverage this need into acceleration of the tech stack, and on whether it was enough to warrant a user-facing push and attempt at broader adoption. There will be further exploration of this landscape turned into a brief position piece for how that adoption might occur.</p>
<h2> Conclusion</h2>
<p>The conversations in Berlin were a first — though nonetheless exciting — step in the greater goal of establishing a fully private, decentralized internet. We plan to continue the conversation in Buenos Aires, during the <a href="https://luma.com/u2sw5kpv?tk=UEhpqh">Ethereum Cypherpunk Congress</a>. If you’re building in this space and are keen to contribute to the ongoing work, you can go deeper into the research <a href="https://anonymity.dev/">here</a>.</p>
