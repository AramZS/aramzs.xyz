---
author: Jacob O'Bryant
cover_image: >-
  https://platypub.sfo3.cdn.digitaloceanspaces.com/631c0b26-3bd1-4363-818c-5f6faea222d6
date: '2022-11-08T18:49:38.000Z'
dateFolder: 2022/11/08
description: >-
  Yakread is a new web-based reader app designed to help users easily access and
  read various types of content in one place. The app aims to provide a balanced
  reading experience akin to scrolling through social media, with features for
  importing bookmarks, subscriptions, books, and social media content. The
  creator's goal is to support an unbundled media ecosystem by offering a
  seamless, personalized reading experience and encouraging interoperable
  services.
isBasedOn: 'https://tfos.co/p/introducing-yakread/'
link: 'https://tfos.co/p/introducing-yakread/'
slug: 2022-11-08-httpstfoscopintroducing-yakread
tags:
  - favorite
title: 'Introducing Yakread: a simple reader app for the unbundled web'
---
<p>About three months ago I started building <a href="https://yakread.com/">Yakread</a>, a web-based reader app. It has about 25 daily active users currently, and I've been enjoying it quite a bit myself. There are still core features to add and bugs to fix, and as such I haven't focused too much on growth yet. But it is about time I wrote an official launch post!</p>
<figure><img alt="A simplified example screenshot of the Yakread app" src="https://platypub.sfo3.cdn.digitaloceanspaces.com/002f88fb-ee76-448f-bf7f-73afe7661e09"/></figure>
<p>My largest personal motivation for building Yakread is that I wanted to spend more time reading long-form content. I saved bookmarks but never read them; I subscribed to newsletters, but they mostly piled up in my inbox; I bought books for my e-ink reader but rarely finished any. The one thing I did read consistently was my Twitter feed. I designed Yakread to bring balance to my reading: I want the same effortless experience of scrolling through Twitter, but with more meat.</p>
<p>With that context in mind, let me tell you about some of the things Yakread does!</p>
<h3>How it works</h3>
<p>Yakread understands four types of content sources, and it has integrations for each:</p>
<ul> <li>Bookmarks: you can import these from Pocket and Instapaper.</li> <li>Subscriptions: you can subscribe to RSS feeds, and you get a @yakread.com email address with which you can sign up for newsletters.</li> <li>Books: you can upload DRM-free epub files.</li> <li>Social: you can connect to your Twitter account and import tweets from everyone you follow.</li> </ul>
<p>This week I'll be adding social integrations for Mastodon (ActivityPub, really) and Discord. After Bluesky's app launches, I'd like to integrate with their <a href="https://atproto.com/">AT protocol</a> too. I'm sure there'll be plenty more integrations as time goes on (and as I get requests from users). I want Yakread to work with everything.</p>
<p>With all your content in one place, Yakread is then able to provide a single feed—the home feed, pictured above. It works like so:</p>
<ol> <li>All your content gets formatted into medium-sized chunks. Tweets (and other social posts in the future) are bundled together in batches of 35, while books are split apart into chapters or sections. Bookmarks and newsletter/RSS posts are left as-is.</li> <li>Yakread selects five of these posts somewhat randomly (there is a ranking algorithm involved, but it isn't particularly sophisticated yet) and presents them to you as links (again, shown in the screenshot above). All you have to do is pick one of the links to read next.</li> <li>The post you select is displayed within Yakread. You read to the end, and then you get a new batch of links:</li> </ol>
<figure><img src="https://platypub.sfo3.cdn.digitaloceanspaces.com/686e0f89-2b24-498e-b06f-7233517c0d0d"/></figure>
<p>Like I said: effortless.</p>
<p>In addition to the default home feed, you also get a chronological feed for each of the four content types; e.g. you can click on "Social" to get a feed of tweets (again, with Mastodon and Discord coming soon):</p>
<figure><img alt="Image" src="https://pbs.twimg.com/media/FgsXXOCaUAEdDSL?format=jpg&amp;name=large"/></figure>
<p>The idea is to provide an effortless, algorithmically-driven default experience, but give people tools to introduce as much manual curation into their experience as they want. For example, another feature I'm planning to add soon is "priority subscriptions," where you can opt to get a notification whenever a particular newsletter or RSS feed has a new post. I'd even be interested in letting 3rd parties supply their own ranking algorithms for the home feed, if there's actually sufficient demand for it.</p>
<h3>The unbundled web</h3>
<p>Beyond my own personal needs, I want Yakread to help support an unbundled media ecosystem with lots of competition and innovation. In my model of the world, there are three main functions: reading, publishing, and discussion. I think these functions should be carried out by a variety of interchangeable services instead of being glued together in the form of giant social media platforms.</p>
<p>In fact, this kind of thing already exists. You could publish a newsletter on Ghost, I could read it in Gmail, and we could discuss it on Discord. What I'm saying is that we should push this model as far as we can. We need more people developing standalone reading apps, publishing platforms, and discussion communities—and we need to look for ways to make these services work well together. Even more important, we need early adopters to shift their own workflows into this unbundled ecosystem, spread the word about useful tools they find, and look for gaps where more work is needed.</p>
<p>So Yakread is my own contribution to this domain. You should <a href="https://yakread.com/">try it out</a>! Though it's not the only snazzy reading app out there: I'd also recommend checking out <a href="https://hq.getmatter.com/">Matter</a>, <a href="https://readwise.io/read">Readwise Reader</a>, <a href="https://feedbin.com/">Feedbin</a>, and <a href="https://mailbrew.com/">Mailbrew</a>, to name a few. There are similarly plenty of options for publishing and discussion. It's an exciting time!</p>
<p>A note about building interoperable services: protocols like RSS and ActivityPub are important, but I see them as implementation details. One reason I like the reading-publishing-discussion model is that it isn't tied to any specific protocol. It's focused on people, use cases, and interoperability <em>in general</em>. Protocols are simply a means to those ends. I think this framing will make it easier to deal with some of <a href="https://mignano.medium.com/the-standards-innovation-paradox-e14cab521391">the downsides</a> of building for protocols.</p>
<h3>The Sample</h3>
<p>If you're already familiar with my work, it's probably because of <a href="https://thesample.ai/">The Sample</a>. For the benefit of everyone else, The Sample is a newsletter aggregator I worked on full-time from February 2021 until a few months ago when I started building Yakread. It's driven over 45,000 signups for participating newsletters in that time, and lately on a good month I make about $1,000 from it after expenses.</p>
<p>The Sample was actually meant to fulfill a <em>fourth</em> part of my unbundled model: aggregation. The idea was to create a standalone network decoupled from any particular publishing platform or reading app. However, long-term user retention just isn't there. Numbers-wise, The Sample had been on a plateau for over a year when I started working on Yakread, and I ran out of ideas for fixing it or working around it.</p>
<p>I still like the idea of standalone aggregation services, but I think there's a much larger immediate need for a reading app like Yakread. And in fact, Yakread is (or will be) more-or-less a superset of The Sample: while The Sample handles newsletter discovery, Yakread handles discovery <em>and</em> all other parts of the reading experience. I'd even be interested in making Yakread double as a discovery service for other reader apps which don't yet have their own recommendation features built in—I'm having a chat about that with the founders of one such reader app in a few days, in fact.</p>
<p>The Sample will keep running for the foreseeable future (it is paying all my operational costs after all!), but it is in maintenance mode. I might merge it into Yakread when the latter is mature enough.</p>
<h3>Future plans</h3>
<p>I'm doing a little bit of marketing for Yakread (and my work on <a href="https://tfos.co/">tools for online speech</a> in general) in the form of writing weekly. That's why this post exists! But primarily I'm continuing to improve Yakread's core features: first by addressing my own needs, and second by addressing user feedback. Within a month or so, I plan to add in monetization (it'll be a mix of ads and paid plans) and growth features (e.g. a referral system, similar to the one The Sample has). Then I'll push as hard as I can to make this thing grow enough to actually provide a livable income.</p>
<p>If I reach that milestone, the sky's the limit. I spend one day per week on various open-source projects, and it just so happens that I have apps for <a href="https://github.com/jacobobryant/platypub#platypub">publishing</a> and <a href="https://biffweb.com/docs/tutorial/build-a-forum/">discussion</a> in the works. I would love to hire one person each to work on those apps and Yakread, while I take on a supportive/managerial role. Maybe even have someone work on an aggregator/indexer, to make it easier for publishing/reading/discussion apps to interoperate.</p>
<p>If I'm able to do that profitably, it would be a powerful way to push forward the unbundled ecosystem. With a single organization developing each of the components, we can ensure they work together seamlessly; and by keeping the components as separate, interchangeable apps, we can ensure that anyone can extend and improve on our work.</p>
<figure><img src="https://platypub.sfo3.cdn.digitaloceanspaces.com/8c8002f8-eb10-4c65-abed-dc57c4c8fde6"/></figure>
<p>Weekly updates on my work building towards a better information environment.</p>
