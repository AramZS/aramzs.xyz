---
author: Trezy
cover_image: null
date: '2026-01-26T23:19:53.068Z'
dateFolder: 2026/01/26
description: >-
  Game platforms hold too much power over developers. We want to change that by
  decentralizing games with ATProto — devs own their data, players own their
  progress, and no payment processor can take it away.
isBasedOn: 'https://birb.house/blog/the-future-of-games-on-atproto'
link: 'https://birb.house/blog/the-future-of-games-on-atproto'
slug: 2026-01-26-httpsbirbhouseblogthe-future-of-games-on-atproto
tags:
  - tech
  - gaming
  - social media
  - decentralization
title: Building the Future of Games on ATProto
---
<figure><img alt="Several clusters of chess pawns are set in circles on a tabletop. The circles are connected by various lines." data-nimg="fill" sizes="70vw" src="https://birb.house/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fss0m9kc91bgi%2F24m1bB8Myuu5GrcPSku6Dk%2F58dd8f74ab2e553e28a367c3e9f464e1%2Fsocial-networking-concept-people-connected-togeth-2026-01-05-05-24-42-utc__1_.jpg%3Ffm%3Dwebp%26q%3D75%26w%3D4000%26f%3Dcenter&amp;w=3840&amp;q=75" srcset="https://birb.house/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fss0m9kc91bgi%2F24m1bB8Myuu5GrcPSku6Dk%2F58dd8f74ab2e553e28a367c3e9f464e1%2Fsocial-networking-concept-people-connected-togeth-2026-01-05-05-24-42-utc__1_.jpg%3Ffm%3Dwebp%26q%3D75%26w%3D4000%26f%3Dcenter&amp;w=640&amp;q=75 640w,"/><figcaption>Social Gaming</figcaption></figure>
<p>At Birbhouse Games, we've always believed developers deserve real control over their work. But lately, we've been grappling with a bigger question: what does "control" actually mean when your game's information lives across dozens of platforms, none of which you truly own?</p>
<p>Last year, I started a project to answer that question. I've been storing video game data on ATProto — the decentralized protocol behind <a href="https://bsky.app/">Bluesky</a> — and now I'm ready to share what we're building.</p>
<p>I've <a href="https://discourse.atprotocol.community/t/introducing-the-pentaract-a-comprehensive-set-of-video-game-lexicons-for-atproto/453">posted the technical details</a> on the <a href="https://discourse.atprotocol.community/">ATProtocol Community forums</a>, but this post is for game developers who want to understand why this matters for their work.</p>
<h4>The Problem We're Solving</h4>
<p>Right now, publishing a game means scattering your data across the internet:</p>
<ul><li><p><b>Stores</b>: Steam, Epic Games Store, GOG, Humble, Itch.io</p></li><li><p><b>Aggregators</b>: IGDB, IMDB</p></li><li><p><b>The rest of the web</b>: Countless websites, blogs, and wikis creating their own entries, pulling information from who-knows-where</p></li></ul>
<p>You don't own any of these entries. You can't guarantee they're accurate. And when you need to update something — correct a release date, update your game's description, fix a developer's deadname in the credits — you're stuck doing it in a dozen places. Or more realistically, you update it in a few places and hope the rest of the internet catches up.</p>
<p>Here's the kicker: all of this can vanish or change without your input. Payment processors can pressure platforms. Platforms can change their rules. Your hard work becomes subject to someone else's decisions.</p>
<p>We think there's a better way.</p>
<h4>Understanding the Foundation: ATProto Basics</h4>
<p>Before diving into solutions, let's cover a couple of key concepts that make this work.</p>
<p><b>ATProto is distributed and decentralized.</b> Think of it less like a single service (like Steam) and more like email — lots of different servers all talking to each other using the same language. The technology is broken into many parts that work together to form the entire ATProto network, and anyone can run their own piece of it.</p>
<p><b>Personal Data Servers (PDS)</b> are where your data lives. Your bio, avatar, posts, images, likes — everything you create on the network gets stored on a PDS. Most people let Bluesky manage their PDS, but here's what matters: you can migrate from one PDS to another, or even host your own. Your data isn't locked to a single company.</p>
<p><b>Lexicons</b> are just specifications for data structures. You can store anything in your PDS, but without a lexicon, other applications won't understand it. By defining a lexicon for video game data, we create a shared language that lets applications across the network read and display your game information consistently.</p>
<p>Think of lexicons like file formats: a <code>.jpg</code> is understood by every image viewer because everyone agrees on what the format means. Lexicons do the same thing for data on ATProto.</p>
<h4>Data Sovereignty: Your Game, Your Rules</h4>
<p>Here's where it gets interesting.</p>
<p>In ATProto, accounts aren't just for individuals. An account can represent a person like <a href="https://bsky.app/profile/matttwood.dev">Matt Wood</a>, a studio like <a href="https://bsky.app/profile/doubledaggerstudio.bsky.social">Double Dagger Studio</a>, or even a game itself like <a href="https://bsky.app/profile/littlekittybigcity.bsky.social"><i>Little Kitty, Big City</i></a> (if you haven't, please go play it; it's delightful).</p>
<p>Imagine creating a Bluesky account for your game that becomes the <b>source of truth</b> for all its information. Every store listing, every review site, every blog post could pull directly from your authoritative source. Update your game's description once, and it propagates everywhere. Fix a credit, add a new feature, adjust your release date — all from one place you control.</p>
<p>Or house all your games' data in your studio account. It's your choice.</p>
<blockquote><p>"Imagine if you will, not only being able to publish / sell / distribute your games all on your own, a la Itch, EXCEPT YOU OWN + HOST + CONTROL EVERYTHING, and a payment processor can't just come after the platform to de-list you but ALSO, you can host the presskit and credits and update them regularly. You could fetch updated credits into your games to keep the credits accurate and fix any developers deadnames and such. And you're in complete control as the developer or publisher."</p></blockquote>
<p>This isn't just about convenience. It's about <b>ownership</b> in a meaningful sense.</p>
<h4>Beyond Data: Distributed Infrastructure</h4>
<p>But data sovereignty is just the beginning. The decentralized nature of ATProto opens up possibilities that centralized platforms simply can't offer.</p>
<h5>Player-Owned Game Data</h5>
<p>Achievements and save games could live in <b>player repositories</b> instead of developer servers. No more lost progress when a game's servers shut down. No more platform-locked achievements that disappear when you switch from Xbox to PlayStation.</p>
<blockquote><p>"Game activity in the PDS means a game can go away and be revived later and I still have all my save slots. I can bring my save slots cross platform."</p></blockquote>
<p>For competitive games that need verification, those entities can be stored in the developer or game's repository and validated by separate system — maintaining integrity without centralization.</p>
<h5>Dynamic Credits Systems</h5>
<p>We're exploring game engine SDKs that let you fetch credits directly from ATProto. Update your credits once, and they update in every game that pulls from your source. No more shipping patches just to fix credit listings.</p>
<h5>Developer-Owned Modding</h5>
<blockquote><p>"I would like a Steam Workshop where every modder gets to host their own mods. Then every player can label the mods so others can find them, use the labels to establish compatibility and so on."</p></blockquote>
<p>A decentralized modding system where mod authors truly own their work, control their versioning, and can't be arbitrarily removed from a platform. Players can discover and organize mods through community labeling without needing a central authority.</p>
<h4>What We're Building: The Pentaract Project</h4>
<p>This isn't just theoretical. We're actively building the infrastructure to make this real.</p>
<h5>The Lexicons</h5>
<p>We're creating comprehensive lexicons for:</p>
<ul><li><p><b>Games and their offshoots</b>: Core game data, expansions, DLCs, updates, mods</p></li><li><p><b>Meta entities</b>: Achievements, high scores, reviews, ratings</p></li><li><p><b>Related entities</b>: Credits, press kits, and more</p></li></ul>
<p>We're also thinking about edge cases like speedrunning data, completion times, record times, and platforms like Retro Achievements that retroactively add achievements to older games.</p>
<h5>The Applications</h5>
<p><b>The Pentaract</b> is our IGDB alternative — a website that pulls game data directly from ATProto. Instead of a centralized database controlled by one company, it's a window into the decentralized network where developers control their own information.</p>
<p>We're also planning to develop <b>game engine SDKs</b> for Unity, Unreal, and Godot (with more to come) that let developers easily store and retrieve data like credits, achievements, and save states.</p>
<h5>The Infrastructure</h5>
<p>We're exploring what game distribution looks like on ATProto — how to distribute binaries, handle mods, and yes, even how to build decentralized stores.</p>
<p>These are big questions without easy answers, but that's what makes them worth pursuing.</p>
<h4>This Is Already Happening</h4>
<p>This might sound futuristic, but there's already real momentum. I run the <a href="https://bsky.app/profile/did:plc:il7eua5zbt4s2ly2jskjfz2t/lists/3l6zmncq4jx2s">Games Industry Labeler</a> on Bluesky, and the numbers tell a story:</p>
<ul><li><p><b>6,062 game developers </b>on the platform</p></li><li><p><b>450 game studios</b></p></li><li><p><b>96 games </b>with their own accounts</p></li><li><p><b>33 publishers</b></p></li><li><p><b>44 game publications</b></p></li><li><p><b>152 game journalists</b></p></li><li><p><b>484 games media </b>(YouTubers, bloggers, independent creators)</p></li></ul>
<p>That's only counting the accounts that have found the labeler and requested labels. There are at least tens of thousands of other accounts that haven't been counted.</p>
<p>The games industry is already building on ATProto. We're just giving them the tools to do more with it.</p>
<h4>Join the Conversation</h4>
<p>This aligns perfectly with our mission at Birbhouse Games: using web technologies to empower developers and transform the industry. We've spent years exploring what's possible when you build games with web tech. Now we're extending that vision to how games are distributed, discovered, and owned.</p>
<p>But we can't build this alone. We need your perspective.</p>
<p><b>What problems are you facing with current platforms?</b> Where do you feel like you've lost control? What would make you trust a decentralized distribution system?</p>
<p><b>What would you want from game lexicons?</b> What data matters most? What are we missing?</p>
<p>This is about building something better together — not just for studios like ours, but for every developer who's ever felt frustrated by the platforms they depend on.</p>
<p><b>Resources:</b></p>
<p><b>Let's talk:</b></p>
<p>The future of game distribution doesn't have to be controlled by a handful of platforms. Let's build something better.</p>
