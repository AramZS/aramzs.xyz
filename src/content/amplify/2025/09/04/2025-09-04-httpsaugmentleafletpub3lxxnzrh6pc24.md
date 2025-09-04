---
author: Anuj Ahooja
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Axgvzy7ni6ig6ievcbls5jaxe/augment/3lxxnzrh6pc24/opengraph-image?04f9dc33b3d4fbe5
date: '2025-09-04T11:54:40.139Z'
dateFolder: 2025/09/04
description: Competing AT platforms are using different lexicons. Should we be worried?
isBasedOn: 'https://augment.leaflet.pub/3lxxnzrh6pc24'
link: 'https://augment.leaflet.pub/3lxxnzrh6pc24'
slug: 2025-09-04-httpsaugmentleafletpub3lxxnzrh6pc24
tags:
  - social media
  - decentralization
title: The Lexicon Interop Problem
---
<p>In a <a href="https://go.bsky.app/redirect?u=https%3A%2F%2Fconnectedplaces.leaflet.pub%2F3lxx2rk4pv22r">recent Leaflet</a>, <a href="https://bsky.app/profile/laurenshof.online">@laurenshof.online</a> highlighted a looming problem around lexicon alignment that's been bothering me for the last little while.</p>
<blockquote data-index="2">That both platforms (as well as Skylights.my, another culture view platform) use their own lexicons effectively leads to a splitting of the community over the platforms: you cannot see a review someone made on BookHive if you use the Popfeed app.</blockquote>
<p>So, here we are, on a protocol that enables interoperability while also providing tools for platforms to enclose their users in their own standards.</p>
<p>Okay, but that's unfair. The concept of lexicons is quite powerful, and, due to the open nature of the protocol, allows a user or a developer to change their minds. It's a flexible format that ensures the developer community isn't confined to unnecessarily built walls. I'm glad they exist in the way that they do, even if I'm about to call out some risks down the line.</p>
<p>This piece is also not to say that lexicons should be enforced standards. But, hopefully, by the end of this post, it will become clearer why discussing this is worthwhile now.</p>
<p>Since a user can provide a platform with access to certain parts of their data, migrations are still possible. The platform they want to migrate to can convert that data into its own lexicon, and the user can pick up where they left off from a content perspective.</p>
<p>Similarly, if a platform builder realizes that the ecosystem is coalescing around a single lexicon, they can work toward compatibility by storing it in both formats. They can even decide to migrate everyone to the standardized lexicon if they find it to be sufficient for their needs. There are a lot of options here.</p>
<p>Every decision being made today is not final, and that's beautiful. Love me a standard with two-way doors already built in.</p>
<p>Now, let's address the concerns.</p>
<p>While a user can migrate their content into a platform that uses a different lexicon, they cannot continue sharing that content with the audience they were sharing with on their original platform.</p>
<p>Now, a simple fix for that would be for their new platform to use the same migration conversion toolset to convert back into the other platform's lexicon when posting, but you can imagine how that gets messy as more lexicons come into play.</p>
<p>This also becomes complicated when client developers start thinking about how to combine specific types of content into a user-facing app, like a newsreader, for instance.</p>
<p>Let's take the platform we're currently on. Leaflet is, to once again oversimplify, a publishing platform. We're blogging here! There are (significantly more than) dozens of us!</p>
<p>However, Leaflet is not, and will not be, the only blogging platform that exists on ATProto.</p>
<p>Leaflet and Offprint both use their own lexicons. Ghost uses ActivityPub and publishes via the ActivityStreams Article type, then Bridgy Fed just converts it to a link in a Bluesky post because there's no standardized lexicon for longform yet.</p>
<p>In other words, there are (at least) <a href="https://xkcd.com/927/">fifteen</a> three competing standards for how longform shows up in ATProto.</p>
<p>So, if I want to build an ATProto client that's focused on longform content, I suddenly have to adopt all of these different lexicons, and add new ones as new platforms go live. Yikes?</p>
<p>I want Leaflet and Offprint to focus on the publishing experience. I want aggregation clients help discover and read publications across the ATProto ecosystem regardless of where it's being written. The whole point of protocols is choice, and I hope we find a way to make sure that those choices remain available on-protocol.</p>
<p>The good news is, the foundation for solving these problems already exists in <a href="https://bsky.app/profile/lexicon.community">@lexicon.community</a>. This is a grassroots working group that grew from ATProto developers with similar concerns. It has some of the most brilliant folks in the space, and they've already made headway in helping with standardization.</p>
<p>But, I also believe this messy phase of lexicons is important. What I don't want is top-down standards that make decisions for problems that don't exist yet, even if it is a grassroots effort.</p>
<p>The right approach here, in my opinion, is for developers to start with their own lexicons if a standard doesn't exist, and, over time, connect with other developers working on similar platforms on an interoperable lexicon. Perhaps that discussion can be facilitated by lexicon.community if it helps.</p>
<p>Another approach is services that bridge lexicons, but that sounds like hell, and I want that to be a fallback when services refuse to interoperate. Bridges when adversarial interoperability is necessary, collaboration as a best case.</p>
<p>And it's all possible because none of this was ever a one-way door in the first place.</p>
<p>I think the question this raises is, when is the right time for us move from messy-lexicon phase to interop-lexicon phase? I don't know the answer to that question, but if I were to put a stake down for conversation's sake: two is time for consideration, three is time for conversation, and four should make the shape of a standard obvious enough to take action. You can change my mind on this, but that's where I'm starting.</p>
<p>For now, I think I'm going to go down a rabbit hole. I'm going to start doing more tracking of which lexicons are being used, figure out which ones have similar use cases and have similar shapes, and perhaps even map them to ActivityStreams since that'll help with bridging back and forth as well. Might even help with what a standard lexicon can look like.</p>
<p>It's messy, it's good, and we need this. But maybe organizing the chaos a little bit may help. We'll see.</p>
<p>Man, I was going to make this a skeet. Instead I just gave myself some homework? Someone save me from myself.</p>
