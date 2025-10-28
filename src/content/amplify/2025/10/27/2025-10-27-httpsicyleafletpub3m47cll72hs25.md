---
author: Anirudh Oppiliappan
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Ahwevmowznbiukdf6uk5dwrrq/3lrjchlkhcc2u/3m47cll72hs25/opengraph-image?04f9dc33b3d4fbe5
date: '2025-10-27T21:37:49.494Z'
dateFolder: 2025/10/27
description: on tangled's existence and direction
isBasedOn: 'https://icy.leaflet.pub/3m47cll72hs25'
link: 'https://icy.leaflet.pub/3m47cll72hs25'
slug: 2025-10-27-httpsicyleafletpub3m47cll72hs25
tags:
  - tech
  - social media
  - decentralization
title: building for the future
---
<p>We set out to build <a href="https://tangled.org">Tangled</a> for one simple reason: the existing options just… suck. Some more, some less—but they all do in their own ways.</p>
<ul><li><p data-index="2.2">Sourcehut? So opinionated it alienates about 98% of potential contributors. Pretty great if you really love email, I guess.</p> </li><li><p data-index="2.3">Forgejo/Gitea? Nice, sure. You can self-host—but without a shared identity, I still need to create an account on your instance just to send a PR.</p> </li><li><p data-index="2.4">Radicle? Honestly, it’s amazing. Purely technically, Radicle is far ahead of anything else, Tangled included. But the world—at present—just isn’t ready for full-on P2P.</p> </li></ul>
<p>However, I realize these are good enough for a lot of people—and that's fine! After all, Tangled is a forge that we (Akshay and I) wanted to see exist. We're building Tangled modelled after our version of an ideal code forge—one that we foresee existing well into the future.[0] Below, I'll try to outline the ideals that shaped Tangled and our justifications for them.</p>
<h3 data-index="5">the future is decentralized</h3>
<p>A good exercise to perform whenever the decentralization word is used is to define what exactly you mean by it in this context. In Tangled's case, we wanted:</p>
<ul><li><p data-index="7.0">user's to own their data: both the git repositories, and the surrounding social data like issues, pulls, etc. …</p> </li><li><p data-index="7.2">all while sharing a central identity—i.e., I shoudn't have to create an account on your self-hosted "instance" to send a patch, open an issue, etc.</p> </li></ul>
<p>Having laid all of this out, it became exceedingly obvious that the AT Protocol would be a perfect fit. Mind, a lot of the following assumes a cursory understanding of AT; I'd recommend giving the <a href="https://atproto.com/">AT docs</a> a skim if you're new here! Anywho:</p>
<ul><li><p data-index="9.0">Users can own their data? Yep, issues, pulls, follows, stars, etc. etc. all live as <code>sh.tangled.*</code> records in their Personal Data Servers. Check (minus the git repos, but we'll get to that).</p> </li><li><p data-index="9.1">Global discovery of said data (over relays) allows for "no missed replies", consequently letting us build a centralized-esque experience. So, no compromise on UX? Check.</p> </li></ul>
<p>Now for the bit about git repos. Naturally, we want users to be able to host them on their own servers as they would Forgejo/similar. To address this, we designed "knots". Knots are lightweight, headless servers that deal with git repository operations and associated role-based access control (granting push access, for example). Knots are designed for easy self-hosting.</p>
<p>And how do knots fit into the AT architecture of appviews/relays/PDS…?</p>
<p>It helps to realise that AT is really just a hyper-composable distributed system. Appviews are just indexers[1] over a set of records that they care about. In this case, knots index records for SSH public keys, repo collaborators, pulls, and more. In the traditional sense of an "appview", knots I suppose, would be an extension of Tangled's appview.[2]</p>
<p>Lastly, AT enables us to build an <a href="https://en.wikipedia.org/wiki/Object-capability_model">object-capability model</a> thanks to globally unique DIDs and PDS-based auth. There's a lot to unpack here, but I'll save the details for a future post.</p>
<p>With that overly wordy AT evangelism out of the way, let's talk about the tech stack that all this is built on. I mean, it's simple (as it should be).</p>
<p>Go is the language of choice, for everything. Extremely easy to write and maintain, strong concurrency primitives and very solid stdlib. We stick to using libraries that don't deviate from standard interfaces—like go-chi + net/http instead of echo or fiber. Go is an internet programming language:</p>
<blockquote data-index="18">I consider Go not to be a systems programming language — a title much better earned by languages like C and Rust. Rather, Go is the best-in-class for a new breed of software: an Internet programming language.</blockquote>
<blockquote data-index="19">The wealth of network protocols implemented efficiently, concisely, and correctly in its standard library, combined with its clever mixed cooperative/pre-emptive multitasking model, make it very easy to write scalable internet-facing software.</blockquote>
<p>Go is very easy to cross-compile, supports a large variety of platforms and <a href="https://go.dev/blog/compat">promises backward compatibility</a>, indefinitely. These are all very strong signals for a language to build software that'll last well into the future, and is easy to build &amp; run by users.</p>
<p>As for the frontend, we chose <a href="https://htmx.org/">htmx</a> and <a href="https://tailwindcss.com/">Tailwind</a>. htmx due to its sheer simplicity &amp; speed; we will likely never build a first-party SPA in a JS framework du jour.[3] We strive our hardest to implement UI elements in plain HTML/CSS without reaching for JS.</p>
<p>Tailwind will likely be a controversial choice here and I'll admit: we did initially choose it for faster iteration on the UI. Regardless, I'm certain Tailwind is here to stay and I say so because conceptually, it is rather simple! If it does go away, I'm very positive we'll have a drop-in replacement rather quickly.</p>
<p>And finally, sqlite. We currently use this for all services: the appview, knots and spindles. sqlite fits perfectly given the deployment scenarios we're targeting for knots and spindles—it's just a file! I too am all-in on server-side sqlite (we use &amp; recommend litestream for backups/replication).</p>
<p>We have discussed a possible rewrite of the knotserver code base in Rust. I'm all for this, but the Go version of the knotserver will likely always be maintained. Once we graduate Tangled out of alpha, we plan to formally spec out knots and spindles so alternative implementations can be easily built.[4]</p>
<h3 data-index="30">the future is (probably?) jujutsu</h3>
<p>I say "probably" because it's unlikely that it may ever fully replace git. That said, I think the general trajectory that the industry is heading towards is some kind of patch-based contribution and review system. Today, writing code is the easy part—the real bottleneck lies in the collaboration primitives. Being able to review code efficiently, structure changes easily without having to faff about with git rebase -i are key.</p>
<p>I also suspect that as coding agents continue to rise, we'll see a parallel rise in review agents (already plenty of early examples exist). Being able to quickly interdiff between two sets of changes will make these agents significantly more effective.</p>
<p>Fundamentally, though, Jujutsu remains the tool of choice here. Its growing popularity will likely drive this broader shift toward "stacked diffs" as the fundamental unit of contribution and review. As a platform, Tangled will be focused on innovating and refining these collaboration paradigms.</p>
<h3 data-index="35">the future is for the people</h3>
<p>One of our core beliefs from the very beginning was that indie devs and open source communities are a critically underserved group on platforms like GitHub.</p>
<p>A common misconception that people have is that their repository will somehow be more popular when hosted on GitHub; however, GitHub's repository discovery story is greatly oversold. Most, if not all popular repos gain traction due to being shared elsewhere! If you're an indie dev, your open source project will likely never be found "on platform", unless it's got a bunch of stars/forks for it to show up.[5] It's inherently a "rich-get-richer" model.</p>
<p>Further, GitHub is hyper-enterprise. Pricing, feature-gates, and the general product roadmap are driven by enterprise contracts. Individuals and community needs are a distant afterthought.</p>
<p>These are issues that Tangled plans to address longterm. Tangled will be for the people, not enterprise. That's simply not going to be our focus. We've also got several ideas for how to solve on-platform discovery in ways that are fairer for everyone. Our approach to monetization will be centered on individuals and the community: reinforcing virtuous cycles of participation, with optional subscriptions enhancing the experience rather than restricting it.[6]</p>
<p>Finally, Tangled will always remain open source in its entirety. You will always have a say in shaping it.</p>
<p>There's a lot of work to be done yet, but we're giddy about what lies ahead. See you on the atmosphere!</p>
<p>[0]: I'm being intentionally vague here—a decade seems rather long, but simultaneously not long enough; who knows what code forges will look like with the likelihood of AGI being right around the corner?</p>
<p>[1]: By "indexer", I mean they subscribe to the relay for a set of records and act on them.</p>
<p>[2]: In fact, I'd even argue that there is no "appview". There are only AT indexers; but I'll leave that discussion for another day.</p>
<p>[3]: I'm not against SPAs, I just think the JS ecosystem has yet to figure out bitrot. It is simply not future-facing enough. Happy to support third-party implementations, however!</p>
<p>[4]: Might take a while, but don't let that stop you!</p>
<p>[5]: I realize that our current "Trending" section on the timeline is essentially the same thing; we will improve this!</p>
