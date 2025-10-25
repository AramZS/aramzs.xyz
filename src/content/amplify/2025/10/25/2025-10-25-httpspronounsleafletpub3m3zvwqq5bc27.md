---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Awkoofae5uytcm7bjncmev6n6/3m3zicy5s422v/3m3zvwqq5bc27/opengraph-image?04f9dc33b3d4fbe5
date: '2025-10-25T17:45:19.916Z'
dateFolder: 2025/10/25
description: and general updates on the current state of the labeler
isBasedOn: 'https://pronouns.leaflet.pub/3m3zvwqq5bc27'
link: 'https://pronouns.leaflet.pub/3m3zvwqq5bc27'
slug: 2025-10-25-httpspronounsleafletpub3m3zvwqq5bc27
tags:
  - social media
  - decentralization
title: The Joy of Labeling
---
<p>Developer of <a href="https://bsky.app/profile/pronouns.diy">@pronouns.diy</a> here. You can also find me on Bluesky as <a href="https://bsky.app/profile/juli.ee">@juli.ee</a>. I've been maintaining the Pronouns labeler for over a year and I wanted to give a recap as well as clarify a few things on its current modus operandi.</p>
<p>If you don't know already, Bluesky is built on top of a protocol called AT Protocol (a.k.a. atproto). We're trying to be decentralized, we do things differently here, it's not just Twitter 2.0 (hopefully). I'm not going to explain all this here, but its <a href="https://atproto.com/articles/atproto-ethos">ethos</a> is important to me and has influenced the way I approach my projects. This labeler is currently only used on Bluesky, but it could be used by any other atproto app in the future.</p>
<p>AT Protocol let's say it's basically uh... what if you had one account to manage all your social media activity (and potentially more), your identity was verifiable, not just based on arbitrary trust, and you could migrate to a new host if the current one turns against you. And so the posts, media, and even labels will follow you regardless of where you go. No more losing everything the moment one business shuts down or... the Mastodon admin polycule falls apart.</p>
<p>Let's start by sharing some numbers:</p>
<p>This will include some deleted accounts, and will have overwritten labels, realistically the actual numbers are a bit lower. Bluesky never published stats and this is just going off my local database. I just wanted to give you an idea of the scale.</p>
<h3 data-index="7">I'm the pronouns CEO.</h3>
<p>But I shouldn't be.</p>
<p>See, a lot of trust is extended to me, this single individual, to manage what is actually a "moderation service". The same thing that can hide adult content from you. I have the same powers, and by design, they cannot be removed. I can even <code>!hide</code>:</p>
<p>This article I wrote was my attempt at giving spotlight to the potential attack surface if a developer went rogue. I'm not just the pronouns labeler dev, I've done a few other apps you might have used like <a href="https://cleanfollow-bsky.pages.dev/">cleanfollow</a> or <a href="https://pdsls.dev/">PDSls</a>. To give myself some credit, I've been very transparent when it comes to how I run my services. The tongue in cheek tone was taken too seriously by some, but I will continue to give one promise:</p>
<p>I care a lot about the success of the protocol Bluesky is built on. If I messed around and broke the trust people extend to me, I would damage its reputation (as well as mine). OAuth scopes are in the work and will alleviate some of those issues. I'm unsure what will happen to labelers, they have not gotten much love recently.</p>
<p>The quirks it comes with can be jarring. Many have noticed it was possible to hide everyone with a certain set of pronouns by toggling the visibility settings on the labeler's profile:</p>
<figure><img alt="he/him: Hide
it/its: Show badge
they/them: Hide
she/her: Hide" src="https://pronouns.leaflet.pub/api/atproto_images?did=did:plc:wkoofae5uytcm7bjncmev6n6&amp;cid=bafkreica3coqrdyj3lh2pgafnx7vxxepi7yhxge2teyu5dqh2s7js2k7x4"/><figcaption>he/him: Hide it/its: Show badge they/them: Hide she/her: Hide</figcaption></figure>
<p>I cannot disable this, neither can you. You have no control over how much permissions are given to a labeler. Arguably, Bluesky never intended for labelers to be used in such ways, but here we are, most of the popular labelers are "informational", they show your <a href="https://bsky.app/profile/did:plc:pbmxe3tfpkts72wi74weijpo">timezone</a>, <a href="https://bsky.app/profile/did:plc:2qawvcwumvgxmed6iy6pmt6l">fursona</a>, or even your <a href="https://bsky.app/profile/did:plc:fqfzpua2rp5io5nmxcixvdvm">inevitable fate</a>. It's not a very elegant solution to mix this with moderation tools.</p>
<p>And many have asked: Why should I use a labeler to share my pronouns when I can just add them to my bio?</p>
<p>I would recommend you still do since many are not subscribed to the labeler. It's entirely opt-in. Obviously the main appeal here is the way they show up on posts before you've even clicked on the user's profile, conveniently reminding you before you might reply to them.</p>
<figure><img alt="bluesky post with the any/all and she/her labels shown under the display name" src="https://pronouns.leaflet.pub/api/atproto_images?did=did:plc:wkoofae5uytcm7bjncmev6n6&amp;cid=bafkreig6bair5gsnrvf6bb7ztmbnsfl5iztsv43bgxlf566ew6ypguhg34"/><figcaption>bluesky post with the any/all and she/her labels shown under the display name</figcaption></figure>
<p>Still, it would be nice to have a more native feature that didn't require some external tool made by some random French girl and instead would just have you set them directly on your Bluesky profile. And it turns out... at the "protocol" level, <a href="https://pdsls.dev/at://did:plc:4v4y5r3lwsbtmsxhile2ljac/com.atproto.lexicon.schema/app.bsky.actor.profile#schema">we got a field</a>:</p>
<figure><img alt="pronouns string
Free-form pronouns text" src="https://pronouns.leaflet.pub/api/atproto_images?did=did:plc:wkoofae5uytcm7bjncmev6n6&amp;cid=bafkreiapttnmstpwhcznrwykgwgulurk3ifvawhm5nma2vfpwmbmgnzjiy"/><figcaption>But no client implementation yet. And it remains to be seen if it is anymore convenient than having pronouns in the bio.</figcaption></figure>
<p>There is also the problem of including all possible pronouns one might want. I cannot design the labeler to customize the values of the labels for each user. I have to manually add them. For months, I would accept requests, and we ended up with the list we have now. I am not going to add more. I decided a while back it wasn't worth the effort if it was only going to be used by a dozen people. It's not that I don't think they're valid pronouns, it's just not something I want to continue doing. A free-form text field is a lot more likely to suit everyone's needs. It's also a lot easier to reuse across apps than a labeler.</p>
<p>There is something to be said about the ability to tag your account with general informations you might want any app to use, but I don't think it's what labelers are for.</p>
<h3 data-index="24">So we need to overcome the need for the Pronouns Labeler.</h3>
<p>Like seriously I don't want to wake up one day and be in the hands of a thing that manages pretty sensitive informations for god knows how many people. It's already too much. And as we've determined, it's not even a good way of going about it!</p>
<p>I'm unlikely to take it down until there is a proper alternative, but I also have had a bit of a complicated relationship with it. Anyone who has managed a project used by this many people must know what I went through. I'm doing it for free, I don't really have a reason to put more energy towards it while I'm too busy with other projects.</p>
<p>Recently, some people have complained about the way I went about showcasing the <code>!hide</code> label, because I actually labeled one of my own alt account with it, took the screenshot in the article I linked above, and didn't remove it. Apparently that's a breach of trust or some consent issue. I don't care. I think it's silly and I have more important things to worry about.</p>
<p>In a nutshell, a simple pronouns field in the profile, that can be in some way shown when scrolling a feed, let's say with a clickable badge maybe, or showing it when the post composer is opened before replying to a user, would be a more complete solution. It wouldn't require subscribing to any third party service to see them, or extend the trust to anybody else, it's also easier to update and customize.</p>
<p>But I'm not the one to bug about this, I don't work for Bluesky.</p>
<p>I just wanted to leave some words. I'm not going to be actively maintaining the labeler anymore, but it will continue operating for now. I appreciate all the kind words I've received. I didn't do this alone, friends have helped, and I am grateful for everyone involved.</p>
