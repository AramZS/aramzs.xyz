---
author: grjte.sh
cover_image: >-
  https://whtwnd.com/api/og?title=Exploring%20the%20AT%20Protocol%20as%20a%20legibility%20layer%20for%20local-first%20software&displayname=grjte&handle=@grjte.sh&avatar=https://cdn.bsky.app/img/avatar/plain/did:plc:i33pmi3u2m64jqg7incozp3p/bafkreigvrlqadv6d5yca2dph4sdcqzusol6gwatsb4v2uwfop5dr6h6fzu@jpeg
date: '2026-02-20T13:24:32.036Z'
dateFolder: 2026/02/20
description: >-
  Check out the project at https://notebook.groundmist.xyzCross-posted to
  https://baincapitalcrypto.com/atproto-for-local-first-legibility/


  Some people like vim and some people like emacs and some people like something
  else, and why not have our documents able to be edited in all of those
  programs?


  ...
isBasedOn: 'https://whtwnd.com/grjte.sh/3lndyhyvqdc2w'
link: 'https://whtwnd.com/grjte.sh/3lndyhyvqdc2w'
slug: 2026-02-20-httpswhtwndcomgrjtesh3lndyhyvqdc2w
tags:
  - tech
  - decentralization
title: Exploring the AT Protocol as a legibility layer for local-first software
---
<p><em>Check out the project at <a href="https://notebook.groundmist.xyz">https://notebook.groundmist.xyz</a><br/>
Cross-posted to <a href="https://baincapitalcrypto.com/atproto-for-local-first-legibility/">https://baincapitalcrypto.com/atproto-for-local-first-legibility/</a></em></p>
<blockquote> <h3>Some people like vim and some people like emacs and some people like something else, and why not have our documents able to be edited in all of those programs?</h3> </blockquote>
<p>This is the second in a <a href="https://groundmist.xyz">series of explorations</a> around the possibilities we can unlock by connecting the <a href="https://inkandswitch.com/local-first/">local-first software</a> paradigm to the <a href="https://atproto.com/">AT Protocol</a> (atproto). My motivation behind this exploration is captured well by a recent quote from Seph Gentle on the <a href="https://www.localfirst.fm/21">localfirst.fm podcast</a>. As he points out, we're accustomed to editing code across many editors--vim, emacs, and others--but in other disciplines our documents and data remain tied to single applications. The dream is to expand this editor flexibility to all of our data.</p>
<p>One of the most interesting features of the decentralized AT Protocol (atproto) is the flexibility it enables around how to interact with user data. The protocol has been designed to support and promote interoperation, enabling anyone to build a wide variety of different views over any of the public <a href="https://atproto.com/guides/data-repos">data repositories</a> hosted in atproto Personal Data Servers (PDSes). These interfaces are known as <a href="https://atproto.com/guides/glossary#app-view">"AppViews"</a> because they provide just one of many possible views of the canonical data from the repo.</p>
<blockquote> <p>An AppView is an application in the <a href="https://atproto.com/guides/glossary#atmosphere">Atmosphere</a>. It's called an "AppView" because it's just one view of the network. The canonical data lives in <a href="https://atproto.com/guides/glossary#data-repo">data repos</a> which is hosted by <a href="https://atproto.com/guides/glossary#pds-personal-data-server">PDSes</a>, and that data can be viewed many different ways.</p> </blockquote>
<p><em><a href="https://atproto.com/guides/glossary#app-view">https://atproto.com/guides/glossary#app-view</a></em></p>
<p>For example, different views of content I've recently curated and published to my data repo can be seen at <a href="https://library.groundmist.xyz/grjte.sh">my public Groundmist Library page</a> or in the "inputs" window on <a href="https://grjte.sh">my personal website</a>. In addition to enabling different ways of interacting with data that originates in a single application, the atproto design enables AppViews to compose data from multiple application sources.</p>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreicnyae3a7uyy4bcailcv7npjeitr4n6d3re6osaf5nhaifha2zmz4"/></figure>
<p><em>The Groundmist Library AppView is on the left; on the right, my personal website provides a different AppView of the same public data from my PDS.</em></p>
<p>The AT Protocol design offers a powerful and flexible model for interacting with user-owned data. However, it was built for large-scale social applications, and all of the data on the protocol is public. For interacting with my own personal private data, I've been inspired by the local-first software movement, which also prioritises user ownership and control over data. The local-first software ideals include additional benefits like offline access, spinner-free interactions, and seamless collaboration. Unfortunately, the local-first software model doesn't currently support data reuse with the ease and flexibility of the AT Protocol.</p>
<blockquote> <p>“Local-first software” [is] a set of principles for software that enables both collaboration <em>and</em> ownership for users. Local-first ideals include the ability to work offline and collaborate across multiple devices, while also improving the security, privacy, long-term preservation, and user control of data.</p> </blockquote>
<p>For my next experiment combining local-first software with atproto, I wanted to explore the possibility of enabling local-first AppViews for local-first data, similar to atproto's AppViews for public data, but without taking the data or associated software out of the local-first context.</p>
<p>To build a local-first AppView, I applied atproto's Lexicon schema system to local-first software, since Lexicon is one of the main mechanisms for atproto's interoperability. It provides a global network for agreeing on data semantics and structure that is separate from the data itself, which means it can be used even when the data isn't available on the AT Protocol.</p>
<p>The project includes a <a href="https://editor.groundmist.xyz">local-first markdown editor</a> that uses a public lexicon to define the document schema. The editor includes the ability to publish documents to your atproto PDS. I accompanied it with a <a href="https://notebook.groundmist.xyz">public AppView</a> for reading the published documents. These local-first markdown files could alternatively be edited in any other AppView that uses the same lexicon.<sup><a data-footnote-ref="" href="https://whtwnd.com/grjte.sh/3lndyhyvqdc2w/#user-content-fn-1">1</a></sup></p>
<h2>Lexicons enable interoperability</h2>
<h3>What is Lexicon?</h3>
<p>Lexicon is atproto's schema system. It specifies a schema definition language alongside usage and publishing guidelines that enable a global schema network.</p>
<blockquote> <p>A global schemas network called Lexicon is used to unify the names and behaviors of the calls across the servers. ... While the Web exchanges documents, the AT Protocol exchanges schematic and semantic information, enabling the software from different organizations to understand each others' data.</p> </blockquote>
<p>The schema definition language provides a way to agree on semantics and behaviours and makes it simple for developers to introduce new schemas or safely reuse existing ones. Lexicons are JSON files associated with a single namespace identifier (NSID), such as <em>app.bsky.feed.post</em>. These NSIDs are used for organizing data within the PDS or retrieving data from collections, which are identified by the NSID.</p>
<blockquote> <p>The basic structure and semantics of an NSID are a fully-qualified hostname in Reverse Domain-Name Order, followed by a simple name. The hostname part is the <strong>domain authority,</strong> and the final segment is the <strong>name</strong>.</p> </blockquote>
<p>Below is an example of a schema for <em>record</em> lexicon type from the atproto <a href="https://atproto.com/guides/lexicon">docs</a>. Other types include <em>query</em>, <em>procedure</em>, and <em>subscription</em>.</p>
<pre><code>{
  "lexicon": 1,
  "id": "com.example.follow",
  "defs": {
    "main": {
      "type": "record",
      "description": "A social follow",
      "record": {
        "type": "object",
        "required": ["subject", "createdAt"],
        "properties": {
          "subject": { "type": "string" },
          "createdAt": {"type": "string", "format": "datetime"}
        }
      }
    }
  }
}

</code></pre>
<p>The Lexicon system also includes structured guidelines for <a href="https://atproto.com/specs/lexicon#lexicon-publication-and-resolution">how Lexicons should be published and resolved</a>. This creates a global network of <em>accessible and discoverable</em> schematic information.</p>
<p>For example, the NSID of the primary lexicon for the <a href="https://library.groundmist.xyz">Groundmist Library</a> application is <em>xyz.groundmist.library.content</em>. The Lexicon record is published in Groundmist's PDS at <em>pds.groundmist.xyz</em> and a DNS TXT record for <em>_lexicon.library.groundmist.xyz</em> specifies Groundmist's DID so that the lexicon can be located.</p>
<h3>Three benefits of Lexicon</h3>
<p>The Lexicon system powers the interoperability of the AT Protocol. Lexicon creates a shared legibility layer between all servers on the network, which yields 3 major benefits:</p>
<ol> <li><strong>Interfaces can be produced independently of servers</strong>, enabling enormous flexibility for how we interact with our data.</li> <li><strong>Rendering code (HTML/JS/CSS) doesn't need to be exchanged.</strong> AppViews only need to know the data and the Lexicon schema definition (for understanding the data &amp; interacting with it correctly).</li> <li><strong>The application doesn't need a separate data store</strong> for simple AppViews displaying data from individual users. Creating and publishing these interfaces can be extremely fast and lightweight, since often no database or backend is needed.</li> </ol>
<p>This design enables high flexibility for interacting with user content. A multitude of different applications can be created for displaying or editing data from a user's PDS, and the consistency of the underlying data is coordinated by adherence to the public Lexicons.</p>
<h2>Does AI need schemas?</h2>
<p>Before discussing the application of this model for interoperability to the local-first software context, it's worth discussing the question of whether structured data still has value in a world of LLMs and sophisticated AI agents. Why not just let the models figure out what the data means and how to interact with it?</p>
<h3>AI still needs structured data</h3>
<p>Firstly, improved legibility improves the effectiveness of AI agents. Clear and consistent rules for understanding data semantics and structure make it easier for agents to interpret and work with the data in the ways that you expect and want. We get better results with less compute. In fact, Comind has begun exploring some of the benefits of using <a href="https://cameron.pfiffer.org/blog/lexicons-and-ai/">lexicons with AI</a>.</p>
<blockquote> <p>Funnily enough, it turns out that Lexicons have another advantage – specifying the public language by which agents on Comind communicate with one another. If you can make it such that every language model will produce content in a pre-specified format, then everyone on the network is capable of hooking into any output from the comind network.</p> </blockquote>
<p>It's still true that if all you ever want to do with your agents is let them read your data and create something new with it or provide insights, then letting the models "figure it out" is basically good enough. You might get better or faster results by having clearer semantics and structure, but you can still get where you want to go without it.</p>
<p>However, once we start imagining interactions that also modify our underlying data, reusing and changing it in different contexts, it becomes clear that we need some way for our agents and applications to coordinate.</p>
<h3>Avoiding data fragmentation</h3>
<p>Traditionally, reusing data often required exporting it from an application then importing it to a new application which has some custom importer code that processes the data so the new application can understand it. This results in a separate-but-similar data set for each application that interacts with the base data set. These separate near-duplicates naturally get out of sync and diverge from the base data set over time.</p>
<p>AT Protocol's design enables data reuse without this sort of duplication, fragmentation, or divergence, making it possible to interact with our data in whatever way we find most effective or interesting in any given moment. This is because the canonical data always lives in a single place (the data repo in the PDS), and there are clear semantic and schematic rules for the names and behaviours of data. Every record has a single source of truth and is accompanied by the rules for how to interact with it, since the NSID of its lexicon is the name of its collection.</p>
<p>If AI agents naively read and modify data sets, writing the results to a new location associated with the current task or application, then we see a resurgence of the same problem that atproto solved. Data is duplicated unnecessarily and gets out of sync (unless some sort of syncing system is introduced, which also requires coordination).</p>
<p>On the other hand, if AI agents read and modify data sets, writing back to a canonical location, then we need guarantees that when the data is modified the result still conforms to our expectations and the data will still be usable within its original context and any contexts that use the same data. A schema system enables us to use validation and have guarantees that when data is modified the result is still valid and legible, regardless of how many agents have interacted with the data or what they use it for.</p>
<h3>Humans still need legibility</h3>
<p>The final simple reason that using a system for legibility and coordination is still beneficial in an AI-dominated world is that at some point we may as humans want to read some of our data directly ourselves. As Andy Matuschak notes in a <a href="https://andymatuschak.org/files/2025-03-31.html">recent post</a> about generating malleable software with LLMs:</p>
<blockquote> <p>I think that our understanding bounds the complexity of systems we can create—even if an LLM is doing the programming. If we can’t really understand a system’s behavior, except through trial and error every time a change is made, problems and confusions will pile up. It will become more and more difficult to change the system predictably.</p> </blockquote>
<p>Using a consistent system means that no matter what interactions occur with AI agents, we can still understand, access, and analyse the output.</p>
<h2>Building a local-first "AppView"</h2>
<p>Although Bluesky is the most well-known social application on the AT Protocol, there is enormous scope for variety, recreating familiar settings or creating entirely new ones, all while leveraging the underlying network connections and the shared interoperability layer.</p>
<h3>Introducing WhiteWind</h3>
<p>One interesting project that has explored this area is <a href="https://whtwnd.com/">WhiteWind</a>, which is a blogging platform for markdown content that is built on top of the AT Protocol. WhiteWind brings the familiar blogging experience to atproto but additionally leverages the protocol's interoperability to add an interesting twist - comments on blog posts are also threads in Bluesky.</p>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreidqwdneklqpk6vavwokz5g2yhuqnoczp2cjw5d7ytrhzsg7omzwou"/></figure>
<p><em>A blog entry using the com.whtwnd.blog.entry lexicon, as displayed on WhiteWind.</em></p>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreiecwst3wxttuey3syewrcc6h2eyxgz5mncigret2v4ffuah4rdcda"/></figure>
<p><em>Comments on the WhiteWind blog are also threads on Bluesky.</em></p>
<h3>Privacy challenges</h3>
<p>WhiteWind demonstrates many of atproto's benefits, but it is also a case study in one of the challenges of building on the AT Protocol - all your WhiteWind entries are publicly readable, even if you haven't published them yet, since all data on atproto is public.</p>
<p>WhiteWind tries to work around this by adding a "visibility" field to the lexicon specifying whether data should be either public, viewable if you know the URL, or only for the logged-in author. The hope is that all AppViews will respect this field and that no person (or AI) will query and look at data where "visibility" isn't "public". Here is the <a href="https://github.com/whtwnd/whitewind-blog/blob/main/lexicons/com/whtwnd/blog/entry.json">WhiteWind blog entry lexicon</a>, showing this method of handling private/public data visibility:</p>
<pre><code>{
    "lexicon": 1,
    "id": "com.whtwnd.blog.entry",
    "defs": {
        "main": {
            "type": "record",
            "description": "A declaration of a post.",
            "key": "tid",
            "record": {
                "type": "object",
                "required": [
                    "content"
                ],
                "properties": {
                    "content": {
                        "type": "string",
                        "maxLength": 100000
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "datetime"
                    },
                    "title": {
                        "type": "string",
                        "maxLength": 1000
                    },
                    ...fields excluded for brevity...
                    "visibility": {
                        "type": "string",
                        "enum": [
                            "public",
                            "url",
                            "author"
                        ],
                        "default": "public",
                        "description": "Tells the visibility of the article to AppView."
                    }
                }
            }
        }
    }
}
</code></pre>
<p>Unfortunately, asking people to follow gentlemanly guidelines and "just not look" is the kind of request that good actors comply with and bad actors and agents ignore. We can't realistically expect compliance. However, a local-first AppView for editing could offer us a way to avoid the problem altogether!</p>
<h3>Introducing Groundmist Editor &amp; Notebook</h3>
<p>To explore this idea, I created <a href="https://notebook.groundmist.xyz">Groundmist Editor</a><sup><a data-footnote-ref="" href="https://whtwnd.com/grjte.sh/3lndyhyvqdc2w/#user-content-fn-2">2</a></sup> a simple local-first writing tool for drafting and collaborating on markdown documents and then publishing them when ready. It uses the WhiteWind blog entry lexicon <em>com.whtwnd.blog.entry</em>, making it simple to create alternate interfaces for interacting with the same local data or to create additional interfaces composing this data with other personal data, such as analysing the number of updates I made in a week against the amount of sleep I got.</p>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreihwbrxc23av5bsvp3mu5tdhae7ngsnkrtmvfjmyh3wautxrqfqbha"/></figure>
<p><em>Groundmist Editor is a local-first editor for publishing content to atproto using the WhiteWind blog entry lexicon.</em></p>
<p>To make publishing single documents effortless, I used atproto as a distribution layer by publishing documents to the user's atproto PDS, as I outlined in my <a href="https://whtwnd.com/grjte.sh/3lndb5weupc2r">previous post</a>.</p>
<p>Because I used the existing WhiteWind lexicon, documents are published to the <em>com.whtwnd.blog.entry</em> collection on atproto, which means that WhiteWind acts as a public AppView for published entries. This also means that Groundmist Editor functions as a private editor for drafting WhiteWind blog posts, instead of them being publicly retrievable from the user's PDS.</p>
<p>Because I wanted a simple and minimally-distracting interface for reading, I also created an alternative AppView for viewing published writing called <a href="https://notebook.groundmist.xyz">Groundmist Notebook</a>, which provides a basic view of the content without WhiteWind's interactivity features. All WhiteWind blog entries and all entries published from the Groundmist Editor can be read there in addition to on WhiteWind.</p>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreihsvea4vpzlorzmb35imgayr3ilwbqj5smtcw6n4dgz4d7worrifm"/></figure>
<p><em>Groundmist Notebook provides a simple alternative reader for content with the WhiteWind lexicon, including entries published from Groundmist Editor.</em></p>
<h3>The interoperable system</h3>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreifmqwbgblooev3c5eyeghazhqpymortks6qmfyfzq3o4mgid4b6q4"/></figure>
<p>The full setup for this exploration consists of one public lexicon (<em>com.whtwnd.blog.entry</em>, created by the WhiteWind team) and three public AppViews:</p>
<ol> <li><a href="https://editor.groundmist.xyz">Groundmist Editor</a>, the local-first AppView for drafting and collaborative editing (forked from the Ink &amp; Switch team's "tiny essay editor" then minimally modified)</li> <li><a href="https://whtwnd.com/">WhiteWind</a>, the original AppView for reading published content with this lexicon and interacting with it on Bluesky, created by the WhiteWind team</li> </ol>
<p>The diagram above shows what the system looks like with all three AppViews and the lexicon. Groundmist Editor uses a sync server (not shown) so that content can be shared between different devices by sharing the document link. Documents can be published to a user's data repo in their PDS with one click, as authorised by their atproto identity. From the PDS, the public data is displayed in both Groundmist Notebook and WhiteWind. All three of these AppViews share a single lexicon.</p>
<h2>Vision: an interoperable local-first ecosystem</h2>
<figure><img alt="" src="https://whtwnd.com/api/cache?did=did:plc:i33pmi3u2m64jqg7incozp3p&amp;cid=bafkreid4ga5fvqiwtt64jlp6ledlcrqlyce3rojkopsxrl76phk2c5jjyq"/></figure>
<p><em>An updated system diagram which includes Groundmist Library in addition to Groundmist Editor and imagines an additional local-first AppView associated with each app's lexicons. This begins to hint at the potential for interoperability and composibility enabled by using the Lexicon system for local-fist software.</em></p>
<h3>A first model for using local-first AppViews</h3>
<p>The Groundmist Editor/Notebook project demonstrates one model for using local-first AppViews: local-first software applications can provide AppViews of private data and be connected via a lexicon to public AppViews that display data that was published to the AT Protocol.</p>
<blockquote> <h3>Local-first software applications can provide AppViews of private data and be connected via a lexicon to public AppViews that display data that was published to the AT Protocol.</h3> </blockquote>
<p>This enables a private software layer for the AT Protocol that in the long run will offer better UX than simply adding private data to the PDS, since it offers benefits of local-first software such as low latency and offline capability.</p>
<h3>A second model for using local-first AppViews</h3>
<p>There's a second interesting model for using local-first AppViews, which is to have a local-first ecosystem where local-first applications are connected by shared lexicons and data sets but operate independently. In this world, <strong>local-first software applications can provide multiple AppViews for private data that <em>never gets published</em>.</strong> This enables the same interface flexibility for interacting with local-first data that we experience when interacting with public data on atproto. It offers a way to achieve the dream of collaboration over a data set without being required to use the same application or interaction mode.</p>
<blockquote> <h3>Local-first software applications can provide multiple AppViews for private data that <em>never gets published.</em> By using shared lexicons and data sets, independently operating local-first applications can form a local-first ecosystem.</h3> </blockquote>
<p>As a motivating example, one thing I particularly want is more flexibility when interacting with all of my linked notes and writing, which are currently spread across Obsidian and Logseq (and more). I like Logseq's structure (1 bullet point per line) for thinking, tracking my days, and connecting ideas, but I often want to write something longer form, which is better suited to Obsidian or a similar markdown editor. With the ease of creating LLM-generated software, I would ideally like to create custom personal interfaces for interacting with different types of writing and notes, while still keeping it in a unified home and having a single application that knows how to interact with all of it at once.</p>
<p>The Lexicon schema network offers a solution, since it could be used to provide a global layer that shares semantics and behaviour for local-first data and software. This would simplify creating new AppViews and ensure data consistency without requiring the data itself to be public or available. For general use, these interfaces will be local-first applications that can function offline, because Lexicon definitions are mainly needed when new AppViews are being created or at discrete update points.</p>
<p>This provides a public legibility layer over private data and enables the interoperability of the AT Protocol within the local-first software context.</p>
<h2>A note on schema lenses</h2>
<p>The idea of strictly using Lexicon for defining local-first data will inevitably be too restrictive in some cases. As applications develop and schemas change there are challenges around interacting with older and newer versions of data.</p>
<p>Additionally, a lexicon for public data may not match the one desired for private data. Even in the simple Groundmist Library application from <a href="https://whtwnd.com/grjte.sh/3lndb5weupc2r">my first Groundmist post</a> these types differed slightly, as I couldn't post the automerge urls of documents publicly to a user's PDS without making those documents editable to anyone (since it uses a version of Automerge without an authorization layer).</p>
<p>Ink &amp; Switch has done interesting work in this area with the <a href="https://inkandswitch.com/cambria">Cambria</a> project and their research into data lenses. In a case like this slight mismatch between public and private data, an ideal solution might be a publicly defined "data lens" that describes how to consistently transform a public lexicon to a private schema (e.g. add a field for the Automerge url).</p>
<p>The global schema network provided by Lexicon is extremely powerful, and exploring similar ways to manage and share data lenses would be an interesting area of future work. This idea of "Lexicon Lenses" is a project that the community has recently <a href="https://github.com/lexicon-community/governance/issues/14">begun to work on</a>.</p>
<h2>Conclusion</h2>
<p><a href="https://editor.groundmist.xyz">Groundmist Editor</a> explores the idea of flexible local-first AppViews over canonical data sets and the possibilities for interoperability, composability, and <em>doing more with our data</em> that we can unlock by leveraging atproto's global Lexicon network for local-first software. It's an example of how we can improve existing atproto applications and hints at how we could expand the world of local-first software into an interoperable ecosystem.</p>
<p>As a final note, you may have noticed that in order to realise these ideas about local-first AppViews and local-first data composability the legibility that I discussed in this post is required but not sufficient. We also need some way for local-first applications to locate and access these data sets. Groundmist is a series of progressive experiments combining the local-first software paradigm with the AT Protocol, and the next exploration will focus on this challenge.</p>
<p>If you're interested in these ideas or the possibilities of combining local-first software with the AT Protocol, please reach out to me on Bluesky.</p>
<p><em>Thanks to Goblin Oats and Blaine Cook for helpful feedback on this work.</em></p>
<ol> <li> <p>Note: I used the Automerge CRDT library for local-first data management. In addition to conforming to the lexicon, alternative local-first AppViews would need to be able to interoperate with these data structures, e.g. by also using Automerge. <a data-footnote-backref="" href="https://whtwnd.com/grjte.sh/3lndyhyvqdc2w/#user-content-fnref-1">↩</a></p> </li> <li> <p>Forked and modified from <a href="https://github.com/inkandswitch/tiny-essay-editor">https://github.com/inkandswitch/tiny-essay-editor</a>, an existing a local-first markdown editor <a data-footnote-backref="" href="https://whtwnd.com/grjte.sh/3lndyhyvqdc2w/#user-content-fnref-2">↩</a></p> </li> </ol>
