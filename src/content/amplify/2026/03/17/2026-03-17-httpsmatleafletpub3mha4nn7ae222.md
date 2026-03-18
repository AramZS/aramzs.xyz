---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Atas6hj2xjrqben5653v5kohk/3m2cfka6wcs2o/3mha4nn7ae222/opengraph-image?e2bb7203df6d3028
date: '2026-03-17T05:01:04.118Z'
dateFolder: 2026/03/17
description: a short story of scams & a devops eng. worst nightmare
isBasedOn: 'https://mat.leaflet.pub/3mha4nn7ae222'
link: 'https://mat.leaflet.pub/3mha4nn7ae222'
slug: 2026-03-17-httpsmatleafletpub3mha4nn7ae222
tags:
  - infosec
  - decentralization
title: 'oops! your pds is gone :('
---
<blockquote data-index="0">❕ Note: Bluesky has banned <code>*.hf.space</code> from their relays, seemingly just before the writing of this post.</blockquote>
<p>sigh, we've all seen them. the inauthentic fundraising spam&amp;scam bots have taken over Bluesky. but today, I decided to do some research into a specific tactic these scammers were using.</p>
<h1 data-index="2">HuggingFace Spaces</h1>
<p>One of my posts was auto-reposted by an account with a domain ending in <code>.hf.space</code>, I knew this was a HuggingFace domain, so I looked into this one.</p>
<p>the huggingface spaces domain system gets provisioned as follows: <code>{user}-{repo}.hf.space</code></p>
<p><a href="https://huggingface.co/spaces/salu51/qqq/tree/main">here</a> is an example of one of these repos. its just a Dockerfile with some default README.</p>
<p>this <a href="https://huggingface.co/spaces/salu51/qqq/blob/main/Dockerfile">Dockerfile</a> includes eeeeeeeverything you need to run a PDS. including the PDS secrets...</p>
<figure><img src="https://mat.leaflet.pub/api/atproto_images?did=did:plc:tas6hj2xjrqben5653v5kohk&amp;cid=bafkreien6v2ugb24efdlyf5axhe5cbwy46zriemoquziiyyq4r2fjubxsa"/></figure>
<p>the first thing I noticed was the PLC signing key. using <a href="https://boat.kelinci.net/">boat</a>, I was able to change one of the spam account's handles to <a href="https://pdsls.dev/at://did:plc:zkbo2rmmthlbhjpahudb2xjg#logs">something else</a>.</p>
<figure><img src="https://mat.leaflet.pub/api/atproto_images?did=did:plc:tas6hj2xjrqben5653v5kohk&amp;cid=bafkreidos3ttu3otaqaiu3jwub5rhqyqu45chiv2eyzmsuwxd6cpt26vma"/><figcaption>you can of course do more than just that with the PLC key, repo signing key, JWT secret, and PDS admin password.</figcaption></figure>
<p>so...</p>
<p>I made a set of tools to 1. empty all of the repos in a PDS, 2. generate a new rotation key and remove all other rotation keys (for all repos in a PDS), 3. post to all accounts on a PDS, 4. reset all passwords and set new ones on a PDS, 5. takedown all repos on a PDS. you can do all of this with just these secrets!!</p>
<p>and...</p>
<p>I made a script that watches the PDS for new accounts, and then automatically resets the password and performs a takedown with the PDS admin password.</p>
<figure><img src="https://mat.leaflet.pub/api/atproto_images?did=did:plc:tas6hj2xjrqben5653v5kohk&amp;cid=bafkreifiabfpfnhkije47hkxvs2a7wecxzjlltkx42qbew4bnguak6howe"/><figcaption>this was, safe to say, very fun to watch the new accounts roll in and automatically get taken down.</figcaption></figure>
<p>eventually I built out a way to discover new <code>.hf.space</code> PDSs and automatically run all the tools &amp; start watching for new accounts to autotakedown.</p>
<p>now thankfully as stated at the top of the post, Bluesky has now banned HuggingFace spaces from showing up on the relay. so this specific method of hosting spam&amp;scam won't work anymore, and neither will my trolling :(</p>
<p>anyways, don't post your keys online dummies &gt;_&gt;</p>
