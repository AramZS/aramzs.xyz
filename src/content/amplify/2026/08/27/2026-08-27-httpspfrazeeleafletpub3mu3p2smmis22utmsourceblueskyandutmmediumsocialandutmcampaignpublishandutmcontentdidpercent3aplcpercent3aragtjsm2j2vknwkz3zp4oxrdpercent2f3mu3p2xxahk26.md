---
author: Paul's Leaflets
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Aragtjsm2j2vknwkz3zp4oxrd/3ly4hnkatvc2p/3mu3p2smmis22/opengraph-image-1qv6ug?3525228eea30403c
date: '2026-08-27T21:42:19.835Z'
dateFolder: 2026/08/27
description: >-
  Nitter gets a cease & desist from X while the atproto makes the Internet more
  open.
isBasedOn: >-
  https://pfrazee.leaflet.pub/3mu3p2smmis22?utm_source=bluesky&utm_medium=social&utm_campaign=publish&utm_content=did%3Aplc%3Aragtjsm2j2vknwkz3zp4oxrd%2F3mu3p2xxahk26
link: >-
  https://pfrazee.leaflet.pub/3mu3p2smmis22?utm_source=bluesky&utm_medium=social&utm_campaign=publish&utm_content=did%3Aplc%3Aragtjsm2j2vknwkz3zp4oxrd%2F3mu3p2xxahk26
slug: >-
  2026-08-27-httpspfrazeeleafletpub3mu3p2smmis22utmsourceblueskyandutmmediumsocialandutmcampaignpublishandutmcontentdidpercent3aplcpercent3aragtjsm2j2vknwkz3zp4oxrdpercent2f3mu3p2xxahk26
tags:
  - tech
  - decentralization
title: SELECT * FROM internet.blogposts
---
<p>Nitter gets a cease &amp; desist from X while the atproto makes the Internet more open.</p>
<blockquote data-index="1">There are cries from the heart .. for my friendship, that relationship to another person, to transcend documents and sites. ..Then any other site or program can use that information.</blockquote>
<p>It seems appropriate as <a href="https://techcrunch.com/2026/08/25/x-sends-cease-and-desist-to-open-source-project-nitter-over-alleged-scraping/">X is sending cease-and-desist letters to Nitter</a> to remember TBL's essay. Nitter is - was - a simple frontend to X which allows users to view tweets without logging in. Even that small use of proxying to the pages is enough to receive threats of legal action.</p>
<p>Twitter's API in 2007 was famously open, which meant thousands of developers building clients, tools, and analytics for free. So, what happened? Why was it pulled? Simple: the network won. The developers stopped being an asset, and the API progressively closed. Rate limits, pricing tiers, login requirements, then technical blocks on the workarounds, and now letters from lawyers. Meta ran the same playbook a decade ago and it's now hard to remember there was ever a Facebook or Instagram API worth building on.</p>
<p>This is why Brewster Kahle, founder of the Internet Archive, has been calling for over a decade for us to <a href="https://blog.archive.org/2015/02/11/locking-the-web-open-a-call-for-a-distributed-web/">lock the Web open</a>.</p>
<p>Nitter started off using X's APIs. When that closed, it read public web pages. And now that there's nothing left to close, the demand is that the source code come down. A program that displays public posts is being treated as a circumvention device under computer-crime statutes.</p>
<p>We have a walled garden problem. It isn't going to change, and the only option in front of us is to start fresh.</p>
<p>The good news is, <a href="https://atproto.com/">atproto</a> continues to <a href="https://npmx.dev/package-stats/@atproto/syntax/v/0.7.5?end=2026-08-26&amp;start=2025-08-28&amp;granularity=monthly">grow</a>, <a href="https://activitypub.rocks/">activitypub</a> remains resilient, and our community is full of believers and builders in the open social web. Since I work on atproto, that's what I'll talk about next.</p>
<pre><code>SELECT * FROM internet.blogposts</code></pre>
<p>The walled garden problem is downstream of a simple question: how do I <code>SELECT * FROM internet</code>?</p>
<p>If you've never written database code, <code>SELECT * FROM users</code> is how you ask a database for everything it knows about its users. Once you have it you can filter it, sort it, and join it against anything else you've got.</p>
<p>The web doesn't historically work that way. The web is a few dozen companies, each holding a filing cabinet, each with a receptionist posted out front. He'll read you one file at a time, but only files you can name, as fast as he cares to read, and as long as his boss allows.</p>
<p>Nitter was a lightweight X reader that worked fine right up until X turned off the access it depended on. Every API (the "receptionist") is a business decision that hasn't been reversed yet.</p>
<p>But Impermanence isn't the only problem. Even a permanent, free, generously rate-limited API wouldn't be enough. Applications need much more meaningful access than APIs can provide.</p>
<ul><li><p data-index="15.0">You can only ask questions someone already thought to answer. An API is a fixed menu. It gives you <code>getPosts(user)</code> and <code>getFollowers(user)</code>. If your product idea needs "posts from people my followers follow, ranked by how often they get quoted," there is no endpoint for that, and there never will be, because nobody at that company is building for your product.</p></li><li><p data-index="15.1">Even the right questions come back in the wrong shape. Followers come 100 at a time. A two-million-follower account is 20,000 round trips. At any polite rate limit that's hours of work to answer one question about one user — so anything interactive, anything that has to feel instant, is off the table before you start.</p></li><li><p data-index="15.2">You can't join across "cabinets". The interesting questions are almost always cross-service: this person's posts against that person's photos against a third service's reviews. Two receptionists in two buildings can't cross-reference anything, and neither can you.</p></li><li><p data-index="15.3">You can't index data you don't hold. Search, ranking, recommendations, feeds, moderation tooling — all of it is built on indexes over the whole corpus, laid out for the specific questions your product asks. You cannot build an index through a keyhole.</p></li></ul>
<p>To actually build a service, we need the whole dataset rather than a view onto it; we need it live, arriving as it changes instead of polled for; we need to index it however my product demands; we need to write back into it; and we need all of that guaranteed in a way no single company's quarterly priorities can revoke.</p>
<p>Desktop apps handle this by sharing the filesystem. Internet apps don't use files; they use databases. We need to share the database.</p>
<p>As a user, I don't want to be locked into an app anymore than I'd want to be locked in the trunk of a car. I want an actual free market.</p>
<p>So then, here's another set of needs.</p>
<ul><li><p data-index="20.1">The export of living (not dead) data between services.</p><ul><li><p data-index="20.1.1">If data is no longer operable - capable of additional operations by participants in the network - then it's a static archive and useless to another application.</p></li></ul></li></ul>
<p>If we want data to remain operable even outside of its original service, then we need to share the database.</p>
<p>These are all issues atproto is designed to solve, including open data access, account migration, and a live firehose of network activity.</p>
<p>How do we share the database? We don't. We share a lot of them. We create a whole network of personal data servers (PDS) which applications interact with.</p>
<figure><img alt="" src="https://pfrazee.leaflet.pub/api/atproto_images?did=did:plc:ragtjsm2j2vknwkz3zp4oxrd&amp;cid=bafkreie3w6bryuanhp34bvwyhskm22izux57tqvwmon3l3fvks57ovujcm&amp;width=1200&amp;v=1"/></figure>
<p>How do we handle apps sending complex <code>SELECT *</code> queries to our personal data servers? We don't. We replicate the data on logs. We have each application aggregate copies of the data to query locally.</p>
<figure><img alt="" src="https://pfrazee.leaflet.pub/api/atproto_images?did=did:plc:ragtjsm2j2vknwkz3zp4oxrd&amp;cid=bafkreiaatxlkd6e64jg56sqv272is3ahcshduxj2unposaoemtxqqr3tcu&amp;width=1200&amp;v=1"/></figure>
<p>How do we have apps write to those databases? In this case- we do! We have the apps send writes to the PDS, which in turn replicate back out to the other apps.</p>
<figure><img alt="" src="https://pfrazee.leaflet.pub/api/atproto_images?did=did:plc:ragtjsm2j2vknwkz3zp4oxrd&amp;cid=bafkreibhjmomqso5dtg6zxalcn7rmxde624hjbcld23z5kegym4prlq25m&amp;width=1200&amp;v=1"/></figure>
<p>This last one is the core of the intuition about atproto: the write/ingest loop. Almost every atproto app has code that looks like this:</p>
<pre><code>// write
pds.putRecord(post)

// ingest
onPut(‘app.bsky.feed.post’, evt =&gt; {
  mydb.put(‘posts’, {...})
})
</code></pre>
<p>Rather than waiting for the ingest to come back over the wire, you can use a "short circuit" so your app's database can update more quickly. The 200 OK from the PDS is a transactional go-ahead.</p>
<figure><img alt="" src="https://pfrazee.leaflet.pub/api/atproto_images?did=did:plc:ragtjsm2j2vknwkz3zp4oxrd&amp;cid=bafkreiapqk2if2mxodw5cnawe5ybzplivctzcnvhky7pnc27ilsnvxvple&amp;width=1200&amp;v=1"/></figure>
<p>And so the more efficient pattern looks more like this:</p>
<pre><code>// write
pds.putRecord(post)
mydb.put(‘posts’, {...}) // ← optimistic

// ingest
onPut(‘app.bsky.feed.post’, evt =&gt; {
  mydb.put(‘posts’, {...})
})</code></pre>
<p>Yes. The network exists. It's live, it's public, and you can read all of it right now — from a laptop, without asking anyone's permission. This is exactly how <a href="https://bsky.app">Bluesky</a>, <a href="https://tangled.org/">Tangled</a>, <a href="https://leaflet.pub/">Leaflet</a>, and a <a href="https://atstore.fyi/">bunch of others</a> work now.</p>
<figure><img alt="" src="https://pfrazee.leaflet.pub/api/atproto_images?did=did:plc:ragtjsm2j2vknwkz3zp4oxrd&amp;cid=bafkreihgsjuqllpenulpo57owql6fp3sk5m6du5kd6c2d5ofhn5ukalyua&amp;width=1200&amp;v=1"/></figure>
<p>Let me hit you with some stats. At time of writing, there are:</p>
<p>It's never been easier to tap into the data with the new <a href="https://bsky.network/">jetstream service</a>.</p>
<pre><code>import { Jetstream, isCreate } from '@bsky/jetstream';
import { app } from '@bsky/sdk/lexicons';

const jetstream = new Jetstream('https://jetstream.us-east.bsky.network');
const collections = [app.bsky.graph.follow, app.bsky.feed.repost, app.bsky.feed.post];

for await (const event of jetstream.live({ collections })) {
  if (isCreate(event, app.bsky.graph.follow)) {
    console.log(`🌱  ${event.did}  follows  ${event.commit.record.subject}`);
  } else if (isCreate(event, app.bsky.feed.repost)) {
    console.log(`♻️  ${event.did}  reposts  ${event.commit.record.subject.uri}`);
  } else if (isCreate(event, app.bsky.feed.post) &amp;&amp; event.commit.record.reply) {
    console.log(`💭  ${event.did}  replies  ${event.commit.record.reply.parent.uri}`);
  }
}</code></pre>
<p>If you want a fast way to get into it, <a href="https://bsky.network/">try it out here</a>.</p>
<p>And, oh, if you're looking specifically for blogposts on atproto, you probably want to use <a href="https://standard.site/">standard.site</a>.</p>
