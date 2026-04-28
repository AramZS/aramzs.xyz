---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3A6lowz3oa4ctkcuvditg4fb7c/3mjyobe5jss2k/3mkiaduggkc2c/opengraph-image?edc23816ae45539e
date: '2026-04-27T14:37:06.586Z'
dateFolder: 2026/04/27
description: >-
  A Transparency Log is a scalable, efficient way to keep an append-only record
  of things that happened.
isBasedOn: 'https://warplog.leaflet.pub/3mkiaduggkc2c'
link: 'https://warplog.leaflet.pub/3mkiaduggkc2c'
slug: 2026-04-27-httpswarplogleafletpub3mkiaduggkc2c
tags:
  - tech
  - tools for knowledge
title: WTF is a Transparency Log? A Brief Primer.
---
<p>Transparency Logs are a new piece of fundamental digital infrastructure that can be used to create honest and auditable public distribution of information.</p>
<p>A Transparency Log is a scalable, efficient way to keep an append-only record of things that happened. Importantly, they are designed in way that other people can easily verify that the log has been append-only at all times.</p>
<p>The name "Transparency Log" is descriptive of the main application: these append-only publicly verifiable logs are a way to make information become witnessable and nonrepudiable. These are useful properties for making open, transparent publications of information.</p>
<p>Transparency Logs also offer a feature called an "inclusion proof", which is a document that proves some piece of content was observed by the log, at a particular index in the log sequence. These "inclusion proofs" are something that can be distributed independent of the whole log,and verified without consulting the whole log. This has many applications, including making it possible for people to exchange inclusion proofs for a log entry in order to ensure that they are both seeing the same thing from the log.</p>
<p>Transparency Logs are a general category, but almost all are built on a structure called a Merkle Tree. Furthermore, modern ones also typically use a specific pattern of optimized and easily-scaled access called "tiles". These two implementation details are widely adopted because they are the basis for features like the inclusion proofs, and because scaling these logs is valuable.</p>
<p>No person is an island, and no system truly stands alone. We are always embedded in a context, and consequences for bad actions happen in context.</p>
<p>Transparency Logs aren't about preventing bad behavior -- not directly, anyway. They're about making it possible to detect and to expose bad behavior if it happens.</p>
<p>In other words: they're about deterrence!</p>
<p>The cryptographic components of a transparency log mean that any time someone is shown a proof that some entry is in the log, they can also show that proof to others. This means that logs themselves can be held accountable if they were to send differing claims of log entries to different people.</p>
<p>The overall append-only nature of the log is also easily monitored. Once anyone witnesses the latest state of the log, they have enough information that (similar to how this works for single entries) they can show that observation to others.</p>
<p>Then, if the log ever tried "forget" the most recent entries, and either deny those ever happened, or make the log move forward with different entries instead... any person who witnessed the "forgotten" entries can call the bluff.</p>
<p>The ease with which this kind of witnessing and observation-sharing can happen on a transparency log means that once information is published in such a log, we can be pretty sure that everyone seeing it is seeing the same story.</p>
<p>This is a more technical question, relevant if you want to know how the insides of a Transparency Log work, and why they scale the way they do.</p>
<p>A merkle tree is one of the main cryptographic primitives used in the internal construction of a transparency log.</p>
<p>If you're a software engineer, you've likely already encountered merkle trees in one way or another. For example, Git can be considered a merkle tree. The <a href="https://en.wikipedia.org/wiki/Merkle_tree">Wikipedia description of Merkle trees</a> is also a great reference.</p>
<p>In transparency logs, we tend to use specifically binary merkle trees, with data only in the leaf nodes, such that all intermediate nodes up the tree are recalculable.</p>
<p>You can find more technical detail about the exact structure used in <a href="https://datatracker.ietf.org/doc/html/rfc6962#section-2.1">section 2.1 of RFC6962</a>. (But note: that RFC as a whole is about the more specific subject of Certificate Transparency, much of which predates modern Transparency Logs or is focused on certificates as used in web security, and is not relevant. It's really only Section 2.1 that's the recommended reading and applicable to Transparency Logs.)</p>
<p>That depends! Transparency Logs can be used in many ways.</p>
<p>Broadly speaking, you can log whatever you want.</p>
<p>Different log implementations also include some different pieces of data on their own. For example, Sigsum (one implementation of Transparency Logging) includes timestamps in their log entries; whereas Tessera (another implementation of Transparency Logging) imposes no structure at all, and it's completely up to you to decide what you want to log.</p>
<p>As a general pattern, systems are usually designed to log the hash of some other content. This is because to keep a Transparency Log efficient, we usually prefer small entries. Some Transparency Logs allow arbitrary content up to a fixed size (but usually a small size -- for example a uint16 size is a typical implementation constraint choice). Others enforce the idea of submitting a hash (SigSum takes this approach).</p>
<p>Transparency Logs do not necessarily store significant amounts of content, themselves. The Tessera implementation does store entries submitted to it. Others, like SigSum, very explicitly avoid offering any storage capability at all. (Reasons for not offering storage can include performance and hosting cost reasons, but can also include policy reasons: if an intention is to offer a Transparency Log as a public service, re-hosting user-generated content opens the door to various moderation issues -- which can result in very undesired issues in a system that's all about permanent records!)</p>
<p>Logging a hash of content rather than the content itself is a common and simple trick that gets the upsides of the log -- it still becomes a witnessable and nonrepudiable record -- without actually storing the content directly in the log.</p>
<p>"Witnessing" and "Monitoring" are two different words you might have heard used relating to Transparency Logs, and they're similar -- but not quite the same. They describe two different roles in a Transparency Log's ecosystem, and they're both about observing a log, but they're distinct terms for some good reasons.</p>
<p>Witnessing is specifically: the act of observing a log's latest states, and ensuring that the log has been faithfully append-only from what was previously seen. There's also a <a href="https://c2sp.org/tlog-witness">standard for witnesses to issue digitally signed claims</a>, which logs can use and show as evidence to others that they've been witnessed. And most logs do this: a log's append-only nature is only as trustworthy as its witnesses.</p>
<p>The reason that witnessing is pretty specific is because this is something that can be done automatically, and also because it can be done cheaply. It requires very little storage, very little bandwidth, very little compute -- and, it doesn't even require specific knowledge of the log's content in order to verify that the log has been append-only, which means witnessing is general to any transparency log, too. All this adds up to witnessing being both so cheap and so standardized that witnessing can be public infrastructure. Which is a very excellent thing, considering the whole point of Transparency Logs is to have them be witnessed by many people!</p>
<p>Monitoring means... everything else!</p>
<p>Monitoring can include diving into the contents of a log, looking for (and possibly alerting on) some patterns of data; etc. Monitoring is not quite as specifically formalized as witnessing, because monitoring often is domain-specific in some way: it knows things about the information being logged, and is ends up designed around that knowledge. As a general rule, though, monitoring is distinguished by being usually somewhat more expensive to do than witnessing, by sheer nature of the fact it usually involves actually looking at log contents.</p>
<p>An implementation detail. But a cool one.</p>
<p>"Tiled" logs have their data split up into files, in a particular and deterministic way, such that the entire log can be hosted as plain static files. Or, thus, also very trivially hosted with a plain static web server.</p>
<p>At the same time, the boundaries of which parts of the log go into which files are carefully set up so that reading for specific entries in the log requires at most logarithmic reads.</p>
<p>And each file in a tile design is write-once. So, they're easy to update atomically, and they can also be read without any complex or speed-limiting synchronization.</p>
<p>AND they're trivial to mirror. It's just a matter of "copy the files".</p>
<p>tl;dr: Tiled logs are really neat because they're operationally really simple ("Look, no databases!"), it's incredibly easy to scale up their reads (by either mirroring or simple HTTP caching), and for all that, they just... don't really have any significant drawbacks.</p>
<p>So, most modern Transparency Logs are of the tiled design.</p>
<p>I'm glad you asked!</p>
<p>... I'll update this section over time with more links.</p>
<p>(One of the downsides of exciting new areas of technology is that there's sometimes a lot more work going on than there is easily-shareable explanations of it. This is definitely true of Transparency Logs right now.)</p>
<p>Here's a couple random starters, though:</p>
<p>There are several different implementations, and rather than trying to explain them, I'll just quickly list some names, and let you do your own research: Tessera, Sigsum, SigStore, Trillian, and the Go SumDB -- all of these are Transparency Logs: some of them as things you can use directly as products, and some as code and libraries to build your own.</p>
<p>And to meet people in the community: there is a <a href="https://transparency.dev/slack/">Transparency-Dev Slack</a>!</p>
<p>That's all for now.</p>
<p>I hope this was a useful resource to get you started! o/</p>
