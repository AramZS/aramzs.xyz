---
author: bmannconsulting.com
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3A2cxgdrgtsmrbqnjkwyplmp43/3lxsr74rnk22h/3mpsppyyr2s2d/opengraph-image-vzkbb4?fd8e2a086108174f
date: '2026-07-04T12:25:29.408Z'
dateFolder: 2026/07/04
description: >-
  In which I agentic code Ghost to Offprint script and fall into the future of
  networked code sharing with Vit
isBasedOn: 'https://blog.bmannconsulting.com/3mpsppyyr2s2d'
link: 'https://blog.bmannconsulting.com/3mpsppyyr2s2d'
slug: 2026-07-04-httpsblogbmannconsultingcom3mpsppyyr2s2d
tags:
  - ai
  - tech
  - decentralization
title: 'Building GhostOff and our networked, personalized software futures'
---
<p>I made a Ghost blog export to offprint script that I call "GhostOff" and it's available on Tangled:</p>
<p>This also happens to be one of my first experiments with agentic coding<sup>1</sup>.</p>
<p>I spent an hour or so in plan mode<sup>2</sup>, explaining how it should work, detailing the <code>.env</code> file and credentials that would be needed, requiring the use of the <a href="https://tangled.org/mary.my.id/atcute">atcute</a> library by</p>
<p>@mary.my.id</p>
<p>, attaching the <a href="https://lexicon.garden/help/mcp">Lexicon Garden MCP server</a><sup>3</sup>, and preparing a test account and test</p>
<p>@offprint.app</p>
<p>publication. The Ghost Content API is pretty standardized. I walked through some of the things in <a href="https://ghost.org/help/cards/">Ghost Cards</a> that might not have offprint block equivalents<sup>4</sup>.</p>
<p>And it worked pretty great first try in build mode. It built everything and then ran the script to test it with the credentials in the env file, downloaded the Ghost posts, and wrote them out as atproto native posts. It verified that the records validated. There are only 26 posts in on the <a href="https://atprotocol.dev">atprotocol.dev</a> Ghost blog, and it ported them all to Offprint! Amazing!<sup>5</sup></p>
<figure><img alt="Screenshot of the ported posts in Skyreader" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreibkgcjc7m5wrcs34y6e3ocalzqk3mwlala4xgofecjrakvercb22e&amp;v=1"/><figcaption>Screenshot of the ported posts in Skyreader</figcaption></figure>
<p>There was some confusion about <code>standard.site</code> wrappers then containing <code>app.offprint.content</code> containers and the block structure. At one point it decided to write everything as leaflet lexicon items instead. Yes, the standard site wrapper vs content types is confusing for everyone.</p>
<p>I tweaked a few things and ran the script a couple of more times. I'm...done???</p>
<p>One of the suggestions on what to do next was moving to OAuth. OAuth??? For a CLI tool???</p>
<p>This is in fact totally possible, and there are lots of very nice auth / CLI / website flows. But maybe tricky? I vaguely remembered that atproto needs 127.0.0.1 rather than just "localhost". Made a plan, told it to go ahead, asked it to write some docs about how to test it manually.</p>
<p>And now we don't need an app password, and we don't need to include a PDS endpoint because it looks it up from the handle.</p>
<p>And that's it. It works and we can start mass exporting Ghost blogs to <a href="https://offprint.app">Offprint</a>: GhostOff indeed!</p>
<p>Of course, a CLI script that no one knows about that has to be downloaded from a git forge doesn't solve much of anything in bring people to the Atmosphere. Even with the magic of OAuth, and maybe expanding that <code>localhost</code> trick to gather env variables - enter in your Ghost API key, select or create the publication you want to import to, add support for</p>
<p>@pckt.blog</p>
<p>@leaflet.pub</p>
<p>.</p>
<p>Something that is a desktop app would probably be more accessible. Yeah, it could be a website too.</p>
<p>Substack is a much juicier target, at least for those that aren't actively running monetized newsletters.</p>
<p>I have an Instagram export sitting around somewhere. And a really giant Flickr export…</p>
<p>All of the above sounds like a lot of work. And people might send me PRs, or give me user feedback, or report bugs. Or advocate that I should add supporting their flavour of Markdown to my roadmap which if I build or accept a PR for, I am cursed to maintain forever in "my" codebase.</p>
<p>Nah. I ain't doing all that. Just fork it and tinker with it on your own.</p>
<p>But I actually think the future is way more amazing, and</p>
<p>@v-it.org</p>
<p>is a glimpse in that direction.</p>
<blockquote data-index="23">a codebase is not a distribution artifact. a codebase is a living organism that can adapt to each install, and it deserves a living ecosystem.<br/><br/>the future is not “one repo, one roadmap.” the future is millions of personalized codebases—each one evolving continuously, shaped by its caretakers’s needs, values, constraints, and taste.<br/><br/>vit is the mechanism for that future.</blockquote>
<p>What do I think this means? Well, I've started using the phrase "infinite forks". And it scares me. I got my start in open source in Drupal. "Don't hack core". Forking core is bad and hard. We go farther when we collect in a repo and work on one codebase together.</p>
<p>So we get our current picture. Not decentralized git, but centralized git forges where we collect issues and discussions and of course the little images of avatars that are people that sometimes come into the real world so you can hug them. And it's been good. It's been great.</p>
<p>But only for coders. For Open Sourcerers. And forks are bad because software is hard.</p>
<p>I've been writing about <a href="https://bmannconsulting.com/notes/networkedorgs/">Networked Orgs</a> for 4 years. Vit feels a lot like this shape of things. Not a git forge single repo hub, with a couple of branches and forks as spokes, downstream/upstream. It is, as described by vit, searching your trusted network for capabilities you can integrate. Evolving constantly.</p>
<figure><img alt="diagram of source code movement today, and with vit an interconnected network" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreia3eukhpzqlv72n3cisje6zbh42hofzekmtq7w43ert3rwppzi75i&amp;v=1"/><figcaption>So, uh, I made a beacon for the ghostoff project and published some caps. I think this is important and we need more people to come try things out.</figcaption></figure>
<p><sup>7</sup></p>
<pre><code>bmann% vit vet ghost-content-export
=== v̇it cap review ===
Review this cap carefully before trusting it.

  Ref:     ghost-content-export
  Title:   Ghost Content API Export
  Author:  did:plc:2cxgdrgtsmrbqnjkwyplmp43

  Fetches public Ghost CMS posts via the Content API 
  and caches them locally for further processing.

--- Text ---
This cap authenticates to a Ghost CMS instance 
using a Content API key, paginates through published posts, 
and writes the raw post data to a local directory. 
It handles pagination, rate limits, and featured image URLs 
so downstream steps can work with clean, cached JSON.
---

To trust this cap, run:

  vit vet ghost-content-export --trust</code></pre>
<p>I've got caps published to the network. If you want to add OAuth login for your CLI apps, this might work for you.<sup>8</sup></p>
<figure><img alt="A screenshot of pdsls a vit cap record https://pdsls.dev/at://did:plc:2cxgdrgtsmrbqnjkwyplmp43/org.v-it.cap/3mpsohtszms2x#info

ref:
&quot;atproto-oauth-cli&quot;
text:
&quot;This cap integrates @atproto/oauth-client-node into a Node.js CLI. It starts an ephemeral loopback server on 127.0.0.1 for the OAuth callback, stores session state in a local file with restricted permissions, restores the session on later runs, and uses DPoP-signed request handlers to read from and write to the user's AT Protocol PDS.&quot;
$type:
&quot;org.v-it.cap&quot;
title:
&quot;ATProto OAuth for CLI Apps&quot;
beacon:
&quot;vit:knot.commonscomputer.com//did:plc:mfquhie7kthb4ig453glwgdk&quot;
createdAt:
&quot;2026-07-04T08:48:40.093Z&quot;
description:
&quot;Adds OAuth login with a local loopback callback to Node.js CLI tools using AT Protocol.&quot; " src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreih7njjuqhtuc6plszryng6gsk5nr3t7y2h2a6w2hzixtimozo674m&amp;v=1"/><figcaption>Infinite forks. Hug your people. We can get through this together. Let's get busy internecting.</figcaption></figure>
