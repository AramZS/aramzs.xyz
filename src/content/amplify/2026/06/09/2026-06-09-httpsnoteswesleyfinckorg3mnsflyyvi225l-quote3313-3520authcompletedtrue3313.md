---
author: wesleyfinck.org
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3A6z5botgrc5vekq7j26xnvawq/3ly4c4cmyn22t/3mnsflyyvi225/l-quote/3_313-3_520/opengraph-image-mavbvv?ca1349da4aab7657
date: '2026-06-09T05:35:23.536Z'
dateFolder: 2026/06/09
description: a mini proposal for a shared bookmark lexicon
isBasedOn: >-
  https://notes.wesleyfinck.org/3mnsflyyvi225/l-quote/3_313-3_520?auth_completed=true#3_313
link: >-
  https://notes.wesleyfinck.org/3mnsflyyvi225/l-quote/3_313-3_520?auth_completed=true#3_313
slug: >-
  2026-06-09-httpsnoteswesleyfinckorg3mnsflyyvi225l-quote3313-3520authcompletedtrue3313
tags:
  - tech
  - social media
  - decentralization
title: Standardizing Bookmarks in the Atmosphere
---
<figure><img alt="sewn DIY bookmarks on a wooden surface" src="https://notes.wesleyfinck.org/api/atproto_images?did=did:plc:6z5botgrc5vekq7j26xnvawq&amp;cid=bafkreic4323744mltqrqwy5djec4ur6wpblp35lh7fockgeyjfzoobxrmm&amp;v=1"/><figcaption>sewn DIY bookmarks on a wooden surface</figcaption></figure>
<p>Shared purpose, different styles (<a href="https://p.kagi.com/proxy/fabric-bookmark-rainbow-tassels.jpg?c=T15SdBDlORJmu7UaRtns4aZ8jTIshxEgJl-pZN0aPxNqwmjLse7SRdEhMkqRZdpW1GSVpwvl7OCK1m_MkDsneKTvIW6cUtYDh7taNoqrMXI0-DSXOGVcQZwITGQUzoNrT3FkMNeGsgO66EUsZpC_Fg%3D%3D">source</a>)</p>
<p>Since the beginning of Semble, we've been thinking about standardization and sharing lexicons. Some of the main actions in the app are common across many apps: saving and organizing links. However, I've hesitated to move forward on the standardization effort for two main reasons.</p>
<p>Firstly, that kind of coordination work is hard, it requires consistent effort and someone needs to be accountable for moving the needle. Personally, I'm much more interested in focusing my efforts on Semble as a product and continuing to improve the experience for our users (I'm not particularly keen to be the main driver of bookmark standardization). Let's be real, standard.site probably wouldn't have happened the way it did if it weren't for the leadership of</p>
<p>@aka.dad</p>
<p>(special props for driving the website and branding!),</p>
<p>@brookie.blog</p>
<p>&amp;</p>
<p>@awarm.space</p>
<p>. Who's going to lead the way for bookmarks?</p>
<p>Secondly, despite bookmarking seeming like an easy thing to standardize, it's actually not so obvious. <a href="https://donohoe.dev/2026/bookmark-lexicons-atproto">What a bookmark </a><a href="https://donohoe.dev/2026/bookmark-lexicons-atproto">is</a> (nice set of questions by</p>
<p>@donohoe.dev</p>
<p>) depends on context, and context is often in tension with the generalizations needed for standardization.</p>
<p>With that said, the success of</p>
<p>@standard.site</p>
<p>has been inspiring. Additionally, Bluesky's willingness to directly support community initiatives like that (both in adopting it for their <a href="https://atproto.com/blog/new-site-2026">own docs</a> as well as the <a href="https://bsky.app/profile/bsky.app/post/3mmwmla3xph26">link embeds</a> in posts) means there is good reason to work towards shared lexicons.</p>
<p>Standard.site did something clever and very pragmatic: they define a <code>content</code> property on the <code>site.standard.document</code> leaving the actual shape of the documents content up to the app that implements it. This is great because each long-form writing app will have different needs based on the kind of writing experience and feature they are going for.</p>
<figure><img alt="screenshot of the standard.site docs, with the content property definition highlighted" src="https://notes.wesleyfinck.org/api/atproto_images?did=did:plc:6z5botgrc5vekq7j26xnvawq&amp;cid=bafkreiavvvoy4thuybborjpb2wtej5hgx3llm5b7jybftehc3y5dgba4jm&amp;v=1"/><figcaption>screenshot of the standard.site docs, with the content property definition highlighted</figcaption></figure>
<p>There are only three properties that must be included for the record to be a valid <code>site.standard.document</code> record:</p>
<figure><img alt="screenshot of the standard.site docs showing the 3 required properties of a standard.site document." src="https://notes.wesleyfinck.org/api/atproto_images?did=did:plc:6z5botgrc5vekq7j26xnvawq&amp;cid=bafkreihyp7g4nzhaoefytttjre5g7oekk4pinlstgvyebxfqhwt6ajz3om&amp;v=1"/><figcaption>screenshot of the standard.site docs showing the 3 required properties of a standard.site document.</figcaption></figure>
<p>Why not do something similar for bookmarks: define the minimal set of required properties, and leave additional details up to specific apps? Some apps may have overlapping metadata needs, and they can agree on shared lexicons for properties of records, but only if desired.</p>
<p>Let's explore what those lexicons could look like. I'm going to use typescript as lexicon pseudo-code for readability.</p>
<pre><code>interface RequiredBookmarkProperties {
	url: string,
	createdAt: Date
}

// standard properties usually included as URL metadata (to be finalized, this is just an example)
interface OptionalBookmarkProperties {
	title: string,
	description: string,
	image: string, // url for the thumbnail image
	siteName: string,
	tags: string[],
	canonicalUri: string, //e.g. the url with referal params stripped OR an aturi of the canonical atproto record (if there is one)
	content: BookmarkContent
}

// this is how any app can define properties specific to their needs
interface BookmarkContent {
	$type: string,
	[key: string]: any,
}

export type Bookmark = RequiredBookmarkProperties &amp; Partial&lt;&lt;OptionalBookmarkProperties&gt;;
</code></pre>
<p>What this means is that everyone using this shared lexicon agrees what a basic bookmark is: a URL.</p>
<p>Now there is one caveat here: app views would need to implement a way to display/edit these bookmark records regardless of which optional properties or custom content is included. For example, a bookmarking app that expects every bookmark to have a title and description in the record would need to update to be able to handle bookmark records that don't include those properties.</p>
<p>I can think of three potential ways to do this:</p>
<p>(1) supplement the bookmark with the metadata at the AppView layer: the app view recognizes which properties aren't provided and fetches them directly, storing those values in the AppView database. This is effectively what Semble does for margin bookmarks (e.g. including the <code>type</code> property of the link). Editing here becomes tricky, and perhaps it's best to not allow editing of bookmarks and handle it similarly as option (2).</p>
<p>(2) treat as external link and display only (no editing): if an app view requires specific properties to fully display the bookmark, the app could instead show it as an external link. This would be similar to how</p>
<p>@leaflet.pub</p>
<p>shows standard site document with content not defined by <code>pub.leaflet.content</code>. The leaflet viewer treats these as external links, rather than rendering them in their own document viewer. Additionally, leaflet doesn't allow users to edit those documents within leaflet, the author would have to go to a different app that supports editing functionality for that specific content type.</p>
<figure><img alt="screenshot of the leaflet trending feed, showing a post that is an external link, since the document has a different content type from leaflet's." src="https://notes.wesleyfinck.org/api/atproto_images?did=did:plc:6z5botgrc5vekq7j26xnvawq&amp;cid=bafkreibqdhkzndfvkh4fy5t4bn2fbvjt4tere422trbsajdldifdu42che&amp;v=1"/><figcaption>screenshot of the leaflet trending feed, showing a post that is an external link, since the document has a different content type from leaflet's.</figcaption></figure>
<p>(3) Ignore bookmarks from other AppViews: an app could render only bookmarks with certain properties and not render any others. IMO this is not ideal since it breaks the contract with the user who expects a bookmarking app to show them all of their bookmarks of the same record lexicon, regardless of the content.</p>
<p>I think it's worth calling attention to the UX challenge around handling bookmarks with divergent custom properties. In standard.site readers, it's straightforward: treat them as external links. This is fine for most people, because people aren't writing long form posts from various standard.site apps, which means they won't be in a situation where they are looking at their</p>
<p>@pckt.blog</p>
<p>post from the leaflet reader wondering why they can't edit it directly in leaflet.</p>
<p>With bookmarking, it's more challenging because bookmark authoring is likely to originate in multiple apps because it's a common low-effort action. Someone might use</p>
<p>@semble.so</p>
<p>as their primary bookmarking app, but maybe they also use the</p>
<p>@margin.at</p>
<p>browser extension to bookmark links. Now they have two apps that display all their bookmarks, but some would have the content property with <code>$type = network.cosmik.card</code> and other with <code>$type = at.margin.bookmark</code> (assuming both apps adopt some version of the above proposed lexicon). Additionally, maybe this person also uses</p>
<p>@sill.social</p>
<p>and then their bookmarks from there end up with the content property of <code>$type = community.lexicon.bookmarks.bookmark</code>. Now they have three different bookmark content types to manage.</p>
<p>Displaying these different types isn't so difficult (see above 3 proposals), but there is a trade-off here for modifying the content of the bookmarks (e.g. editing the tags, changing the title, updating the thumbnail url, etc.): more cognitive overhead for the user or more maintenance burden for the developers. Either apps can direct the user to the appropriate app or the developers allow editing that is aware of the content type.</p>
<p>Of course, this problem would not exist if there was one canonical bookmark lexicon with no custom properties that everyone adopts, but I honestly don't see that happening nor do I think it should. The flexibility of custom content properties is a good thing: apps should be able to define data entities specific to their context. The protocol should not get in the way of building products tailored for specific use-cases. Interoperability is a means, not an end.</p>
<p>I hope this helps identify the key questions around standardizing bookmarks in the atmosphere. I'd love any feedback or comments.</p>
<p>In the meantime, which lexicon will you use to bookmark this post? 😜</p>
