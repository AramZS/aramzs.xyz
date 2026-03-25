---
author: keytrace.dev
cover_image: ''
date: '2026-03-24T17:09:03.415Z'
dateFolder: 2026/03/24
description: >-
  Keytrace lets you cryptographically link your atproto/Bluesky account to
  external accounts across the web.
isBasedOn: 'https://keytrace.dev/blog/introducing-keytrace'
link: 'https://keytrace.dev/blog/introducing-keytrace'
slug: 2026-03-24-httpskeytracedevblogintroducing-keytrace
tags:
  - tech
  - identity
  - decentralization
title: Introducing Keytrace
---
<p><a href="https://keytrace.dev/blog"><figure></figure> Blog </a></p>
<p>Keytrace lets you cryptographically link your atproto/Bluesky account to external accounts across the web.</p>
<p>What problem does Keytrace solve? It asks: <em>how can you prove that you own another account on the internet</em>? I am <a href="https://github.com/orta">@orta</a> on GitHub, and <a href="https://npmx.dev/org/orta">@orta</a> on npm but I'm not @orta on linkedin - someone beat me there! So, it might be a good guess that I got an '@orta' account somewhere first but it's not that easy to claim a 4 character handle. You could know my website: <a href="https://orta.io/">orta.io</a> and then assume that the links on there are a good source of truth, but I could say anything I want on my website!</p>
<p>People who have used Bluesky might be aware of how handles work there, my handle on Bluesky (<a href="https://bsky.app/profile/orta.io">@orta.io</a>) is my website. To 'claim' that handle, I had to prove I owned the website via DNS. It's a bi-directional relationship where both point to each other.</p>
<p>Keytrace extends that type of relationship to other accounts on the internet: Reddit, GitHub, npm, Twitter/X, LinkedIn, Instagram, Mastodon and more. Keytrace will walk you through the process of making some form of user content to prove your ownership by linking back to your atproto/Bluesky account. Then Keytrace provides an open-source library to verify that connection and which can run from this website.</p>
<p>This idea is not new. Back in 2014, I signed up with Keybase and proved I owned my <a href="https://gist.github.com/orta/9589737/revisions">GitHub account</a> for them. But, I think it is worth talking about the changes I have made in architecting how Keytrace works.</p>
<p>Keybase was/is an extension of the <a href="https://en.wikipedia.org/wiki/Key_server_(cryptographic)">PGP Keyserver</a> concept, where you had a central place for people to put their public PGP keys, and the Keybase CLI (or website if you gave them your PGP private key) would be able to do a lot of interesting cryptography things. Keybase <a href="https://book.keybase.io">did a lot</a>. The part that I think really stuck around in people's minds is "<a href="https://book.keybase.io/account#proofs">Proofs</a>" which are bi-directional verified proofs:</p>
<figure><img alt="https://book.keybase.io/static/img/kb-three-accounts.png" src="https://book.keybase.io/static/img/kb-three-accounts.png"/></figure>
<p>Your PGP key was used to make a cryptographically signed message on the other account, and then separately Keybase's API would verify proofs by reading that website's public pages to compare the data.</p>
<p>Keytrace evolves this model:</p>
<ul><li>Data isn't stored on Keytrace's servers, so, no risk of me stopping the project</li><li>Data can be posted by other people's systems, anyone can verify a proof and create a claim</li><li>Keytrace's system for the proof verification is open-source and you can get it <a href="https://npmx.dev/package/@keytrace/runner">npm</a></li><li>The data is structured so that Keytrace can offer an API which only requires GET requests and the capacity to handle some web standards to prove that the data was 100% verified by Keytrace, and hasn't been touched since</li></ul>
<p>That said, I make a pretty big breaking change though:</p>
<ul><li>PGP isn't the primary identification around which the system is based, your atproto account (and by-proxy it's unique identifier (DID) is)</li></ul>
<p>PGP is well used in certain subsets of the net, but I'd like Keytrace to be more broadly available than focusing on just those folks. So, you can use Keytrace to put your public PGP keys on atproto - I have verified the same PGP key I use for Keybase! However, Keytrace is a bit more focused on user/developer convenience at the expense of being PGP-oriented.</p>
<p>With that said, I have a second, <a href="https://keytrace.dev/blog/how-keytrace-works">more technical write-up</a> so that people can audit the details, but you're welcome to verify, use and improve Keytrace with me!</p>
