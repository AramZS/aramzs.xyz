---
author: bmannconsulting.com
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3A2cxgdrgtsmrbqnjkwyplmp43/3lxsr74rnk22h/3mnnwcdentk2c/opengraph-image-vzkbb4?edc23816ae45539e
date: '2026-06-07T00:58:21.220Z'
dateFolder: 2026/06/06
description: Excitedly trying out Skyreader's new link blog and opinions on link blogging
isBasedOn: 'https://blog.bmannconsulting.com/3mnnwcdentk2c?auth_completed=true'
link: 'https://blog.bmannconsulting.com/3mnnwcdentk2c?auth_completed=true'
slug: 2026-06-06-httpsblogbmannconsultingcom3mnnwcdentk2cauthcompletedtrue
tags:
  - tech
  - blogging
  - decentralization
title: 'Hark, a link blog!'
---
<p>Storing and sharing links is something that I've been doing in parallel with blogging for like 25 years. Sometimes it's just a link, and sometimes sharing a link turns into a full blog post.</p>
<p>My last spate of dedicated ink share was my "journal" format, which are microblog length posts on my own site at <a href="https://bmannconsulting.com/journal/">https://bmannconsulting.com/journal/</a><sup>1</sup>, but regular old Bluesky posts have been sucking up my microblog energy.</p>
<p>For a while I used</p>
<p>@micro.blog</p>
<p>to syndicate those journal posts, I made some custom RSS feeds and cross posted them with</p>
<p>@fedica.com</p>
<p>, which can suck them in and then auto schedule and cross post them<sup>2</sup>.</p>
<p>Recently, my link blogging energy has been going into</p>
<p>@semble.so</p>
<p>Just realized I just crossed over 500 links stored!</p>
<p>BTW, I still very much use the <a href="https://bmannconsulting.com/notes/">digital garden notes on my site</a>. The home page shows the ten most recently modified local notes, so you can see I've done a bunch of home lab stuff recently:</p>
<figure><img alt='Screenshot of the home page of https://bmannconsulting.com - section is titled Digital Garden and says "These are the ten most recently modified local notes" and then a list of ten links related to home lab setups.' src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreibhp4ldpzrazwcpsyue57ov2vtcnzhkgt2pw2hsy4gcxc4hq5nu4q&amp;v=1"/><figcaption>Screenshot of the home page of https://bmannconsulting.com - section is titled Digital Garden and says "These are the ten most recently modified local notes" and then a list of ten links related to home lab setups.</figcaption></figure>
<p>I've lobbied the Semble team for link blog support — I'm already writing a note for close to 100% of the links I store. Here's <a href="https://bmannconsulting.com/notes/using-semble-for-link-blogging/">my write up from April</a>, plus I made a Link Blogging collection on Semble, since apparently the format is not that well known any more:</p>
<p>I had tried Skyreader but mostly I've fallen off the RSS bandwagon, and of course have been enjoying our Atmosphere subscriptions through</p>
<p>@standard.site</p>
<p>. <a href="https://skyreader-dev.leaflet.pub/3mnnmkh7vxk22">Skyreader's recent update</a> adds Standard Site discovery and subscribing AND LINK BLOGGING!</p>
<p>So I tried it all out and only then went back and read the announce post, and realized that Skyreader dev</p>
<p>@disnetdev.com</p>
<p>had put all my blogs right in the article:</p>
<figure><img alt="Screenshot of the article https://skyreader-dev.leaflet.pub/3mnnmkh7vxk22 which has an image of my @bmann.ca account" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreiarytbgxbqw7rppplsajo7ljfcnp6qdjzwtci6n45bfarmqalf2ge&amp;v=1"/><figcaption>Screenshot of the article https://skyreader-dev.leaflet.pub/3mnnmkh7vxk22 which has an image of my @bmann.ca account</figcaption></figure>
<p>And, uh, since I write for so many other spaces<sup>3</sup>, have this backlog of links in Semble, and so on...my poor blogs<sup>4</sup> are a little empty<sup>5</sup>.</p>
<p>Because I've been link blogging and RSS consuming for a long time, I have opinions about link blogs!</p>
<p>I took a look at the RSS format, and here's my entry where I share the Skyreader announcement announcement.</p>
<p>The <code>&lt;link&gt;</code> item contains a link to my commentary on my Skyreader link blog, and then has a link at the bottom of the entry of the thing I'm adding commentary about.</p>
<pre><code>&lt;item&gt;
  &lt;title&gt;Skyreader update - Linkblogs, standard.site, and discussions&lt;/title&gt;
  &lt;link&gt;https://linkblogs.skyreader.app/did%3Aplc%3A2cxgdrgtsmrbqnjkwyplmp43/mq2zdjsuezhmjemljb&lt;/link&gt;
  &lt;guid isPermaLink="false"&gt;at://did:plc:2cxgdrgtsmrbqnjkwyplmp43/site.standard.document/mq2zdjsuezhmjemljb&lt;/guid&gt;
  &lt;pubDate&gt;Sat, 06 Jun 2026 23:25:04 GMT&lt;/pubDate&gt;
  &lt;description&gt;&lt;![CDATA[&lt;p&gt;I’ve just been excitedly using the new Skyreader discover feature to properly add the many people I want to be following and THEN reading the updates post to find that I’m being used as an example 😄 

I’ve been bugging @semble.so to enable link blogging there, too!

Great work @disnet.dev (please add mention support!)&lt;/p&gt;
&lt;blockquote&gt;Making Skyreader more social. Everyone gets a linkblog! Find your people.&lt;/blockquote&gt;
&lt;p&gt;&lt;a href="https://skyreader-dev.leaflet.pub/3mnnmkh7vxk22"&gt;Read the full article on skyreader-dev.leaflet.pub&lt;/a&gt;&lt;/p&gt;]]&gt;&lt;/description&gt;
&lt;/item&gt;</code></pre>
<p>That's not how link blogs should work! I'm basically saying "go read this thing" plus a few comments on this. The <code>&lt;link&gt;</code> should be the link of the thing I'm making commentary on, and you can have a subtle permalink to my commentary in the footer. It's quite literally a feed of links to elsewhere, not just another blog RSS.</p>
<p>One of the most famous / longest running link blogs is John Gruber's <a href="https://daringfireball.net">Daring Fireball</a>. Here's a recent post, where the link-being-talked-about is right at the top. The star is the permalink for the comment on his site:</p>
<figure><img src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreibxejr2fhmcyxfhqlhe5kn7hidnkv6er5ckhen6zhno3fldcti474&amp;v=1"/><figcaption>And here's the feed source for that entry:</figcaption></figure>
<pre><code>&lt;entry&gt;
&lt;title&gt;Nieman Journalism Lab: Twitter/X Punishes Accounts That Post Links&lt;/title&gt;
&lt;link rel="alternate" type="text/html" href="https://www.niemanlab.org/2026/04/do-links-hurt-news-publishers-on-twitter-our-analysis-suggests-yes/"/&gt;
&lt;link rel="shorturl" type="text/html" href="http://df4.us/x91"/&gt;
&lt;link rel="related" type="text/html" href="https://daringfireball.net/linked/2026/06/05/nieman-journalism-lab-twitter-links"/&gt;
&lt;id&gt;tag:daringfireball.net,2026:/linked//6.43093&lt;/id&gt;
&lt;published&gt;2026-06-05T20:46:56Z&lt;/published&gt;
&lt;updated&gt;2026-06-05T20:46:57Z&lt;/updated&gt;
&lt;author&gt;
&lt;name&gt;John Gruber&lt;/name&gt;
&lt;uri&gt;http://daringfireball.net/&lt;/uri&gt;
&lt;/author&gt;
&lt;content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"&gt;
&lt;![CDATA[ &lt;p&gt;Laura Hazard Owen, writing for Nieman Journalism Lab back in April:&lt;/p&gt; &lt;blockquote&gt; &lt;p&gt;I used Claude to help me scrape the 200 most recent tweets from 18 large publishers’ X accounts and track the engagement (likes + comments + retweets) on each. Six of those publishers have paywalls: &lt;a href="https://x.com/business"&gt;Bloomberg&lt;/a&gt;, &lt;a href="https://x.com/cnn"&gt;CNN&lt;/a&gt;, &lt;a href="https://x.com/Forbes"&gt;Forbes&lt;/a&gt;, &lt;a href="https://x.com/nytimes"&gt;The New York Times&lt;/a&gt;, &lt;a href="https://x.com/WSJ"&gt;The Wall Street Journal&lt;/a&gt;, and &lt;a href="https://x.com/washingtonpost"&gt;The Washington Post&lt;/a&gt;. Nine don’t: &lt;a href="https://x.com/AJEnglish"&gt;Al Jazeera English&lt;/a&gt;, &lt;a href="https://x.com/AP"&gt;AP&lt;/a&gt;, &lt;a href="https://x.com/BBCNews"&gt;BBC&lt;/a&gt;, &lt;a href="https://x.com/BreitbartNews"&gt;Breitbart News&lt;/a&gt;, &lt;a href="https://x.com/CBSNews"&gt;CBS News&lt;/a&gt;, &lt;a href="https://x.com/realDailyWire"&gt;Daily Wire&lt;/a&gt;, &lt;a href="https://x.com/FoxNews"&gt;Fox News&lt;/a&gt;, &lt;a href="https://x.com/NBCNews"&gt;NBC News&lt;/a&gt;, and &lt;a href="https://x.com/Reuters"&gt;Reuters&lt;/a&gt;. The last three accounts I looked at — &lt;a href="https://x.com/LeadingReport"&gt;Leading Report&lt;/a&gt;, &lt;a href="https://x.com/unusual_whales"&gt;unusual_whales,&lt;/a&gt; and &lt;a href="https://x.com/GlobeEyeNews"&gt;Globe Eye News&lt;/a&gt; — are not news publishers, but aggregate breaking news in tweets without links. (Here, for example, is an example of a Leading Report &lt;a href="https://x.com/LeadingReport/status/2041534947249242192"&gt;tweet&lt;/a&gt;: “BREAKING: Iran has halted direct talks with the US, per WSJ.” They’re sometimes referred to as engagement-maxing accounts.&lt;/p&gt; &lt;p&gt;These charts make it pretty clear that links in tweets hurt engagement. The connection was so apparent in my analysis that a graph including all 18 publishers is almost unreadable: The traditional, link-loving publishers are clustered in the bottom left corner (lots of links, little engagement) in a nearly indistinguishable mass of bubbles, no matter how large their followings are.&lt;/p&gt; &lt;/blockquote&gt; &lt;p&gt;Musk’s Twitter/X is not an aggregator for news. It’s a walled garden. But the type of garden where you need to keep your eyes open and your hand on your wallet. Sometimes it’s fun to visit a seedy neighborhood. But let’s not pretend it isn’t a seedy neighborhood just because, long ago, it used to be nice.&lt;/p&gt; &lt;div&gt; &lt;a title="Permanent link to ‘Nieman Journalism Lab: Twitter/X Punishes Accounts That Post Links’" href="https://daringfireball.net/linked/2026/06/05/nieman-journalism-lab-twitter-links"&gt;&amp;nbsp;★&amp;nbsp;&lt;/a&gt; &lt;/div&gt; ]]&gt;
&lt;/content&gt;
&lt;/entry&gt;</code></pre>
<p>Technically a bunch of links, but the first one goes to the article itself, and then the permalink is further down.</p>
<p>Aside from my rant here of how it should work, let's talk to</p>
<p>@fedica.com</p>
<p>to get this working really well with their <a href="https://fedica.com/social-media/how-to-setup-rss-feeds">RSS ingestion</a>.</p>
<p>A few other requests:</p>
<p>I'm already a sponsor, what are you waiting for dear reader and future link-blogger???</p>
