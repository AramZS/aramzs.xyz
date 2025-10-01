---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Afpruhuo22xkm5o7ttr2ktxdo/underreacted/3m23gqakbqs2j/opengraph-image?04f9dc33b3d4fbe5
date: '2025-10-01T03:19:41.162Z'
dateFolder: 2025/09/30
description: >-
  i've been bitching about the Discover feed and how it isn't getting much
  better while the alternatives don't get the same amount of data (no "show
  more/less" buttons, no "seen" tracking) and thus are at a disadvantage.
isBasedOn: 'https://underreacted.leaflet.pub/3m23gqakbqs2j'
link: 'https://underreacted.leaflet.pub/3m23gqakbqs2j'
slug: 2025-09-30-httpsunderreactedleafletpub3m23gqakbqs2j
tags:
  - tech
  - social media
  - decentralized
title: we can just do things
---
<p>"you can just do things".</p>
<p>but also, "we".</p>
<p>i've been bitching about the Discover feed and how it isn't getting much better while the alternatives don't get the same amount of data (no "show more/less" buttons, no "seen" tracking) and thus are at a disadvantage. and then <a href="https://bsky.app/profile/gracekind.net">Grace</a> just went ahead and added the "show more/less" buttons to third-party feeds in a <a href="https://github.com/bluesky-social/social-app/pull/8672">pull request</a>.</p>
<figure><img alt="Grace's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:p572wxnsuoogcrhlfrlizlrb/bafkreicsvua5wy6s5qyclq6fswttccfnpltfrbfzsvli7wdptat4jpxlse@jpeg"/><figcaption>Grace's avatar</figcaption></figure>
<pre><p>You can just do things</p></pre>
<figure><img alt="Bluesky's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:z72i7hdynmk6r22z27h6tvur/bafkreihagr2cmvl2jt4mgx3sppwe2it3fwolkrbtjrhcnwjk4jdijhsoze@jpeg"/><figcaption>Bluesky's avatar</figcaption></figure>
<pre>If you're a custom feed creator, you can now enable "show more" and "show less" buttons in your feeds. This gives people using your feed a simple way to tell you what they love — and what they want less of.</pre>
<figure><img alt='A screenshot of the post menu with "Show more like this" and "Show less like this" highlighted' src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:z72i7hdynmk6r22z27h6tvur/bafkreibleheqfx4psrnnqz2rqwntn6lanxejs6mwaxdjcxjs2wyq6vyugm@jpeg"/><figcaption>A screenshot of the post menu with "Show more like this" and "Show less like this" highlighted</figcaption></figure>
<p>i've also been bitching about how Discover feed is serving me too much stuff i don't want, and then <a href="https://bsky.app/profile/spacecowboy17.bsky.social">spacecowboy</a> showed different configurations of the For You feed, and how they can be tested in an <a href="https://bsky.app/profile/spacecowboy17.bsky.social/post/3lzwtakqgcs2n">interactive debugger</a>. no one is making spacecowboy work on the For You feed, but apparently it is fun enough that they run whole-ass AB experiments as if this one-person show is a social media company.</p>
<figure><img alt="spacecowboy's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:3guzzweuqraryl3rdkimjamk/bafkreihe3rruxnl42vj3xbbur3n4sxvcwtsvn7ozikpqfz7foa3rthcjge@jpeg"/><figcaption>spacecowboy's avatar</figcaption></figure>
<pre><p>7 days later and we have some results from the experiment. When we demote popular posts we see:
- 8.26% fewer "show less like this" (3340 -&gt; 3064)
- 0.24% more posts in For You were liked (242438 -&gt; 243024)
- 2.43% more feed loads (438867 -&gt; 449537)

Per user and per request metrics:</p></pre>
<figure><img alt="Post image" src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:3guzzweuqraryl3rdkimjamk/bafkreibtw2x7l62gz6i4io4jzsqclkuxuxk3b6x2kdqaiksxpxb5nfafjq@jpeg"/><figcaption>Post image</figcaption></figure>
<pre>I started a new For You experiment today that gives less priority to popular posts.

50% of the users on a given day will see popular posts demoted: score = score / power(popularity, 0.2)

50% will see no change (control arm).

"popularity" is the number of likes and reposts a post has.</pre>
<p>and then i was bitching for a thousandth time that For You isn't getting the "seen" data so i can't use it as a replacement for Discover because it keeps showing the same posts over and over.</p>
<p>and then i remembered that i, too, can do things, so <a href="https://github.com/bluesky-social/social-app/pull/9094">i did it</a>. it took me one hour. i hope it'll make the For You feed usable for me.</p>
<p>i, too, can do things! a week ago, i wrote <a href="https://overreacted.io/open-social/">an article</a>. i wanted to write it a year ago but the momentum wasn't quite there and i was paralyzed by being on the inside. but now that i'm on the outside, i can see people just doing things, and that atmosphere is contagious.</p>
<p>in fact the reason the article blew up is because it showed people just doing things. what, you can just invent a layer of the internet?</p>
<p>in this economy?</p>
<p>today i wanted to spin up an atproto app and i'm not a backend person so i <a href="https://bsky.app/profile/danabra.mov/post/3m22sube6mc2x">asked</a> and got a lot of replies. then <a href="https://bsky.app/profile/samuel.bsky.team">Samuel</a> just made a template for me and anyone who wants to spin up an atproto app.</p>
<figure><img alt="Samuel's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:p2cp5gopk7mgjegy6wadk3ep/bafkreiay6d5brllqifc22dhndbz7valzwys6igjsibpruk5y7zbx75ljdq@jpeg"/><figcaption>Samuel's avatar</figcaption></figure>
<pre><p>ok I have something easier than a blog post: a Railway template you can just deploy straight away:</p></pre>
<figure><a href="https://railway.com/deploy/atproto-statusphere-app?referralCode=e99Eop"><img alt="Deploy atproto statusphere app" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:p2cp5gopk7mgjegy6wadk3ep/bafkreigaeongof7mse3qdtx36ijwpx5aeqqclvcaabsvon7cq6ssbnwr6i@jpeg"/><h4>Deploy atproto statusphere app</h4><p>Deploy atproto statusphere app on Railway with one click, start for free. A minimal demo of an end-to-end atproto application</p></a><figcaption><a href="https://railway.com/deploy/atproto-statusphere-app?referralCode=e99Eop">Deploy atproto statusphere app</a></figcaption></figure>
<p>he didn't have to do it, it's not like his job or anything. i just asked and he spent an hour and did it. the ball is now in my court. i want to add leaflet comments to my blog or something like that. i'll have to learn to deploy backend and shit but why not. i can just do things</p>
<p>you can just do things.</p>
<p>but also, we.</p>
<p>it is the same thing (just do the thing!) but compounding. i'll do this and then you'll riff on it and then i'll riff on that, and so on.</p>
<p>we have a shared space for this now, the atmosphere, and we can be playful and fail and experiment and make unreasonable things. we can make new apps that riff on each other's ideas, we can help the next person get started, we can learn to make backends, we can fix pet bugs or make alternative feeds or open source new platforms</p>
<figure><img alt="Chad's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:bcgltzqazw5tb6k2g3ttenbj/bafkreig5bcb7dl7aphw6eg4e7kjkvpdshfexdvk7jldg53ypre6ecdhesu@jpeg"/><figcaption>Chad's avatar</figcaption></figure>
<pre><p>Excited to open source <a href="https://bsky.app/profile/did:plc:dzmqinfp7efnofbqg5npjmth">@slices.network</a> today! This is alpha software and the hosted instance is managed via a waitlist so bear with me! Looking to start onboarding folks and testing more broadly. Come join the discord <a href="https://discord.gg/NqSd3eW8S8">discord.gg/NqSd3eW8S8</a>!

<a href="https://tangled-search.bigmoves.deno.net/share-repo/at%3A%2F%2Fdid%3Aplc%3Adzmqinfp7efnofbqg5npjmth%2Fsh.tangled.repo%2F3m232u6xrq222">tangled-search.bigmoves.deno.net/share-repo/a...</a></p></pre>
<figure><a href="https://tangled-search.bigmoves.deno.net/share-repo/at%3A%2F%2Fdid%3Aplc%3Adzmqinfp7efnofbqg5npjmth%2Fsh.tangled.repo%2F3m232u6xrq222"><img alt="slices by @slices.network" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:bcgltzqazw5tb6k2g3ttenbj/bafkreiagf5d3ygeaabo45jag5kgt2su7j4owxe2mjmvl7dkojwmul4whzm@jpeg"/><h4>slices by @slices.network</h4><p>Highly ambitious ATProtocol AppView service and sdks</p></a><figcaption><a href="https://tangled-search.bigmoves.deno.net/share-repo/at%3A%2F%2Fdid%3Aplc%3Adzmqinfp7efnofbqg5npjmth%2Fsh.tangled.repo%2F3m232u6xrq222">slices by @slices.network</a></figcaption></figure>
