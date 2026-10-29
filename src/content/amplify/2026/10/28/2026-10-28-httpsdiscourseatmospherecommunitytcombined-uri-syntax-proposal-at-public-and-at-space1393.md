---
author: Atmosphere Community
cover_image: >-
  https://discourse.atmosphere.community/uploads/default/original/2X/1/1c1224f3530f226b0ffd140f29db4792243b949b.png
date: '2026-10-28T17:08:01.791Z'
dateFolder: 2026/10/28
description: >-
  Hey folks,  We have a new URI syntax proposal which could resolve open issues
  with both regular regular at:// syntax (at the IETF), and the proposed space
  URIs.  For spaces we would use: 
  at:space/<space-account>/<space-type>/<skey>/<repo-account>/<collection>/<rkey> 
  at:space/did:plc:735r43lcgemuv2woqpvx3lso/space/my.bulletin.board/self/did:plc:735r43lcgemuv2woqpvx3lso/my.bulletin.post/3mtiiz6ci6c2j 
  And for regular atproto data:  at:public/<account>/<collection>/<rkey> 
  at:public/did:plc:vwzwg...
isBasedOn: >-
  https://discourse.atmosphere.community/t/combined-uri-syntax-proposal-at-public-and-at-space/1393
link: >-
  https://discourse.atmosphere.community/t/combined-uri-syntax-proposal-at-public-and-at-space/1393
slug: >-
  2026-10-28-httpsdiscourseatmospherecommunitytcombined-uri-syntax-proposal-at-public-and-at-space1393
tags:
  - decentralization
title: 'Combined URI Syntax Proposal (at:public and at:space)'
---
<h2> post by bnewbold.net 5 mins ago </h2>
<p>Hey folks,</p>
<p>We have a new URI syntax proposal which could resolve open issues with both regular regular <code>at://</code> syntax (at the IETF), and the proposed space URIs.</p>
<p>For spaces we would use:</p>
<pre><code data-highlighted="yes">at:space/&lt;space-account&gt;/&lt;space-type&gt;/&lt;skey&gt;/&lt;repo-account&gt;/&lt;collection&gt;/&lt;rkey&gt;

at:space/did:plc:735r43lcgemuv2woqpvx3lso/space/my.bulletin.board/self/did:plc:735r43lcgemuv2woqpvx3lso/my.bulletin.post/3mtiiz6ci6c2j
</code></pre>
<p>And for regular atproto data:</p>
<pre><code data-highlighted="yes">at:public/&lt;account&gt;/&lt;collection&gt;/&lt;rkey&gt;

at:public/did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.post/3k5nobkf2w72g
</code></pre>
<p>For public data URIs, the existing ‘at://’ syntax would be supported indefinitely (“MUST”) as a legacy format, so all the billions of existing records would be fully supported. In the new format, we can debate whether ‘public’ is the best word to use (maybe ‘repo’?). And there would be no urgency to specify or implement the public URI syntax.</p>
<p>For spaces, if we go with this syntax for the upcoming “beta” launch, we could avoid ever needing more than one syntax for space data. This new syntax also has some advantages: the ‘space’ part moves “to the left” and is more visually distinct, while still clearly being under the overall ‘at:’ namespace.</p>
<p>Basically the current ‘at://’ format would end up as a “v0” that is limited to public data references, and has syntax problems with the broader web ecosystem. The new “v1” format would be more general-purpose, visually expressive, and integrate better outside the atproto ecosystem.</p>
<p>We want to have strong confidence that the overall pattern makes sense and would likely be adopted for public URIs to make that commitment though. We have proposed this on the IETF WG mailing list (<a href="https://mailarchive.ietf.org/arch/msg/atp/qdQW8uhv_eIKkTAq0DB8On-Ijfg/">link</a>), and that is the best place to leave formal feedback if you have it. But we are also looking for feedback here from the atmosphere developer ecosystem, if you are unwilling or uninterested in the IETF process.</p>
<p>Specific questions for feedback:</p>
<ul> <li> <p>are folks willing to let go of the nice ‘at://’ prefix?</p> </li> <li> <p>is it worth the disruption and friction of supporting two syntaxes (“valid URI” and “legacy non-URI”) indefinitely?</p> </li> <li> <p>are there any firm counter-proposals waiting in the wings?</p> </li> <li> <p>any strong aesthetic or conceptual objections to this new syntax?</p> </li> </ul>
