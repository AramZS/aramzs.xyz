---
author: Nick The Sick
cover_image: >-
  https://pckt-blog-media.s3.us-east-2.amazonaws.com/cover_image/71aa2d5b-4a63-448b-b2c0-a35cd93c5fd8/image.webp
date: '2026-04-02T12:12:21.116Z'
dateFolder: 2026/04/02
description: >-
  This is a write up of the talk that I did at ATmosphereConf 2026 in Vancouver
  on March 29th, 2026. You can watch the presentation here:The OpportunityWhat
  AT...
isBasedOn: 'https://nick-the-sick.pckt.blog/the-design-philosophy-of-bookhive-s23cz85'
link: 'https://nick-the-sick.pckt.blog/the-design-philosophy-of-bookhive-s23cz85'
slug: 2026-04-02-httpsnick-the-sickpcktblogthe-design-philosophy-of-bookhive-s23cz85
tags:
  - code
  - decentralization
title: The Design Philosophy of BookHive
---
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/199b4885-dcdc-4f2e-9d62-3a927d9daaa6/image.webp"/></figure>
<p>This is a write up of the talk that I did at ATmosphereConf 2026 in Vancouver on March 29th, 2026. You can watch the presentation here:</p>
<p><a data-non-content="true" href="https://atmosphereconf.org/event/q4QdXj7"><figure><img alt="ATmosphereConf 2026" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/03f451b9-2319-4133-a49d-bcfe13b67af0/blue-goose-og.png"/><figcaption><a href="https://atmosphereconf.org/event/q4QdXj7">ATmosphereConf 2026</a></figcaption></figure></a></p>
<p>What <em>ATProto</em> represents is a trend reversal, the web started as open, and became progressively more closed down. There has been multiple attempts of this, but none have garnered this much traction, let’s leverage it!</p>
<ul><li>Social Networks, in particular, have become data silos</li><li>If you don’t pay for it, you are the product</li><li>User agency is at an all-time low, users are forced through upgrades, with no other recourse<ul><li>Closing down of APIs, especially with AI, <strong>data is seen as a moat</strong></li></ul></li></ul>
<p>But, of course that is part of why you are all here, to see an open web, based on user agency. I think we often forget that the web came with this idea of a user-agent, allowing users to customize their experience according to their needs. It largely didn’t pan out because of the complexity of sharing data, it naturally led to the rise of locked down APIs.</p>
<h2>BookHive</h2>
<p>BookHive is an open source, open data alternative to Goodreads. You can track your books, organize your shelves and connect with others who read the same books as you.</p>
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/a649d7b9-681c-4635-9063-d3fe645548ff/image.webp"/></figure>
<p>When building BookHive, my thinking was all about storing the <em>maximally useful data</em> in the user’s PDS. This means, data the user &amp; other applications can leverage to be <em>in service of the user</em>.</p>
<h2>The PDS is not just a database</h2>
<p>If you think about what would be needed to store the data for BookHive, all that you really would need is some sort of identifier for the book, the user's status (reading, read, want to read), and some timestamps. That is the <em>minimal representation</em> of the book, and often what you'd find stored in a database for this sort of application. But, ATProto should not be about the <em>minimal</em> it should be about the <em>maximally useful representation</em>. It is the user's data, give everything that you can to them, to provide them with agency over that data.</p>
<p>We have an opportunity to build social software where the data actually belongs to people: let's not waste it by storing opaque identifiers. The PDS should not be treated just as some datastore, it is more than that, it should be an interface of user-agency. Everything you provide the user gives them more freedom, so give them all you can!</p>
<p>A thought experiment: If BookHive disappeared tomorrow, is the data in your PDS still meaningful?</p>
<p>Yes, you will have everything you need to display a book’s data; especially, now that we have “catalogs"</p>
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/688357a7-108d-4623-952c-bff1275ebe5b/image.webp"/></figure>
<p>A catalog is a central store of book data under the <code>@bookhive.buzz</code> service account. This means all book data is <strong>on-protocol</strong>, everything on BookHive can be reconstructed purely from data available within the network. This works by leveraging a URI to point from a user's book record to the @bookhive.buzz catalog book through a <code>hiveBookUri</code></p>
<p>Proof that the open-data, open-source approach works:</p>
<p>Popfeed.social can interoperate with our lexicon, because all of the data is already in the user’s PDS, fully self-contained</p>
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/56f3f996-8247-45cd-bdc3-33da1d2be4e9/image.webp"/></figure>
<p>Users are able to display their library on personal websites, without any interaction with BookHive APIs. Like <a href="https://bsky.app/profile/tijs.org">@Tijs Teulings 🦑</a> was able to make a completely alternative frontend for managing BookHive books.</p>
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/cc861fcf-9d59-4ade-8e39-5001bad67b7d/image.webp"/></figure>
<p>This only works because BookHive stores the <em>maximally useful data</em> in service of the user.</p>
<ol start="1"><li><strong>Store what's useful to the user, not just what's useful to you.</strong> Include enough context that the record is self-describing. The <strong>PDS is not just a database</strong>.</li></ol>
<ol start="2"><li><strong>Use standard identifiers. Publish open datasets on-protocol.</strong> ISBNs, DOIs, URLs -- anything that lets other apps cross-reference. It's actually <em>very hard</em> to get a good book dataset. Your enrichment work can benefit everyone.</li></ol>
<ol start="3"><li><strong>The "day after" test.</strong> If your service shuts down tomorrow, is the user's PDS data still valuable? If not, rethink what you're storing.</li></ol>
<p><strong>Empower Users</strong></p>
<p><strong>Be their agent</strong></p>
<p><strong>Open Data</strong></p>
<p><strong>Open Source</strong></p>
