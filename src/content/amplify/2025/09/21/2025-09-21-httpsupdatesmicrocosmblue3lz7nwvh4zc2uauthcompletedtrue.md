---
author: microcosm.blue
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Alulmyldiq4sb2ikags5sfb25/microcosm/3lz7nwvh4zc2u/opengraph-image?04f9dc33b3d4fbe5
date: '2025-09-21T15:31:05.095Z'
dateFolder: 2025/09/21
description: >-
  Contingency planning: what's our credible failover for the centralized
  underpinning of ATProto identities?
isBasedOn: 'https://updates.microcosm.blue/3lz7nwvh4zc2u?auth_completed=true'
link: 'https://updates.microcosm.blue/3lz7nwvh4zc2u?auth_completed=true'
slug: 2025-09-21-httpsupdatesmicrocosmblue3lz7nwvh4zc2uauthcompletedtrue
tags:
  - tech
  - baselines
  - social media
title: Adversarial PLC directory migration
---
<p>Every <a href="https://atproto.com/">ATProto</a> account is identified by a "DID", a <a href="https://www.w3.org/TR/did-1.0/">Decentralized Identifier</a>. Just two DID flavours <a href="https://atproto.com/specs/did#blessed-did-methods">are blessed</a>, <code>did:web</code> and <code>did:plc</code>, and close to 100% of accounts use <code>plc</code>. PLC <a href="https://github.com/did-method-plc/did-method-plc/pull/74">stands</a> for Public Ledger of Credentials. The ledger is a centralized log of identity operations.</p>
<p>Stay with me: the centralized decentralized identity ledger underpinning ~all ATProto accounts today is a web service under the sole control of Bluesky Social PBC.</p>
<p>If Bluesky closed public access to their PLC service tomorrow, everything in the ATmosphere would fall apart: app logins fail, relays grind to a halt, media and records become unfetchable[2, 3].</p>
<h3 data-index="4">Non-adversarial migration</h3>
<p>Bluesky wants to release control of PLC to an alternative entity:</p>
<blockquote data-index="6">We are enthusiastic about the prospect of moving governance of the <code>did:plc</code> method, and operation of registry servers, out of the sole control of Bluesky Social PBC.</blockquote>
<p>This is likely to happen and that's a good thing. Like for <a href="https://en.wikipedia.org/wiki/Domain_Name_System">DNS</a> and <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">TLS</a>, maybe top-down authority with reasonable governance™ will work out in practice[4] for PLC.</p>
<p>But this move hasn't happened yet[5]. We should probably have some contingency plans read in case the company (or its successor) <a href="https://bsky.app/profile/pfrazee.com/post/3kqvvohbe462s">becomes an adversary</a>.</p>
<p>The credible exit narrative for PLC goes roughly: to ditch Bluesky, the rest of the ATmosphere can just™ switch over to someone else's mirror. [<a href="https://en.wikipedia.org/wiki/Template:Who">who?</a>]</p>
<p>The mirror situation right now is, to be frank, a little worrying:</p>
<p>We need more! It's not a demanding task! Janet and Jackson are a 2011 Raspberry Pi and SSD, who just started mirroring PLC:</p>
<figure><img alt='A black 2.5" Samsung SSD with googly eyes lies appears to look at the raspberry pi original model b, who also has googly eyes on its protruding SSD. the pi has a bright green power cable, a purple network cable, and a black USB cable joining it to the SSD.

They lie on a light wooden surface under soft natural light.' src="https://updates.microcosm.blue/api/atproto_images?did=did:plc:lulmyldiq4sb2ikags5sfb25&amp;cid=bafkreihi3al4z7u4baohlfaey5zpn6qquaqfrz3qdnh7ngxirue4sytfpa"/><figcaption>A black 2.5" Samsung SSD with googly eyes lies appears to look at the raspberry pi original model b, who also has googly eyes on its protruding SSD. the pi has a bright green power cable, a purple network cable, and a black USB cable joining it to the SSD. They lie on a light wooden surface under soft natural light.</figcaption></figure>
<p>But what do we actually need from bigger mirrors to plausibly uphold that credible exit story? Janet and Jackson aren't quite it.</p>
<p>An adversarially migrated PLC directory represents a degraded state for the whole ATmosphere.</p>
<p>Multiple teams will likely run new authoritative directories that accept identity operations. This can work with the current PLC— identity ops self-certify so directories can forward them to each other—without changing anything in the reference implementation.</p>
<p>This multi-authority mode is not built into the current spec and is not robust. Fractures can arise over differing directory timestamps that directly determine the validity of a sequence of ops, so teams will need to take action together to resolve conflicts as they arise.</p>
<p>It will be urgent for the new authorities to work together toward either the creation of new centralized governance, or evolution of the PLC spec to accommodate a distributed authority mode, to get the ATmosphere back to a stable state.</p>
<p>PLC audit logs are self-certifying which means nobody, not even the directory operator, can modify or create new valid operations for your identity, unless they have access to one of your rotation keys.</p>
<p>However, the directory operator can take some malicious actions: omit operations from the end (say, undo adding a rotation key), alter a timestamp (reverse a nullification validity) or just refuse to acknowledge your existence at all. The impact from these actions could range from being locked out of apps to identity takeover.</p>
<p>Any PLC directory authority must demonstrate that they are able to govern with integrity, operate with full transparency, and have incentives aligned with all users in the larger ATmosphere.</p>
<p>This extends beyond an individual team and is contextual, intersecting with legal jurisdiction and political climate.</p>
<p>To minimize the risk of fracturing the ecosystem, any directory accepting identity operations should be exhaustively spec compliant. Today that means it should run the <a href="https://github.com/did-method-plc/did-method-plc/tree/main">reference PLC directory server code</a> [7 again, really].</p>
<p>Any disruption in service from a PLC directory can have wide impact across the ATmosphere, so a directory authority must show how they have minimized technical and operational risks to their service availability. Including but not limited to:</p>
<p>The current PLC spec leaves space for evolving into a more distributed architecture, it's an exciting space! That same flexibility is part of what would make adversarial migration today possible.</p>
<p>I have optimism that moves toward distributing the PLC will converge with independent operators' adversarial contingency plans.</p>
<p>This announcement is a big step in both commitment and progress toward PLC independence. While light on detail, it includes this encouraging forward-looking passage (emphasis added):</p>
<blockquote data-index="48">We do not expect this organization to be the final governance structure for PLC, and we do not expect a single global directory to be the final technical architecture for the system. But as the AT network grows and diversifies, it becomes increasingly important for the identity system to have a clear path toward independence.</blockquote>
<p>We still need more mirrors. We need log monitoring projects, and we need spec evolution. And we still need to be ready for adversarial migration.</p>
<p>Many many thanks to Ted Han, Rudy Fraser, Anirudh Oppiliappan, Akshay Oppiliappan, Ryan Barrett, Anuj Ahooja, and Bailey Townsend for the chats and feedback about this!</p>
<p>1. This post's structure shamelessly borrowed from <a href="https://bsky.app/profile/retr0.id">@retro.id</a>'s excellent <a href="https://www.da.vidbuchanan.co.uk/blog/adversarial-pds-migration.html">Adversarial ATProto PDS Migration</a> post. Read it and add a backup PLC rotation key to your identity!</p>
<p>2. Logins starting from your atproto handle require the DID doc from PLC to find your PDS. Relays require the DID doc to find your signing key to verify sync events. Fetching anything by at-uri requires, again, locating your PDS.</p>
<p>3. Sorry for the <a href="https://atproto.com/specs/did#blessed-did-methods">did:web</a> erasure. There are dozens of you and I love you. All your stuff would keep working just fine, you're perfect.</p>
<p>4. If you feel that DNS and TLS are examples of failures for being centralized, and if you feel similarly toward PLC: totally fair and i really do respect that position.</p>
<p>5. Breaking news! Still light on details, <a href="https://docs.bsky.app/blog/plc-directory-org">but Bluesky is taking steps toward</a> creating an independent Swiss Association to assume governance of PLC!</p>
<p>6. I took an <a href="https://bsky.app/profile/bad-example.com/post/3lylg226u5k2s">informal inventory on bluesky</a>, which incidentally led to <a href="https://bsky.app/profile/mia.pds.parakeet.at/post/3lyljcahvss2a">a 50% increase</a> in the total count.</p>
<p>7. This matters because "<a href="https://github.com/did-method-plc/go-didplc/pull/15#issuecomment-3272238018">In practice the reference implementation […] is more authoritative than the spec</a>". A PLC directory should run the most authoritatively-accepted implementation, which is currently, definitionally, Bluesky's typescript code</p>
<p>8. We haven't had <a href="https://github.com/did-method-plc/did-method-plc/blob/944a9ca36dd06b11630ec4d069c1b70fc6961ccf/README.md#possible-future-changes">audit log snapshots</a> or<a href="https://github.com/did-method-plc/did-method-plc/blob/944a9ca36dd06b11630ec4d069c1b70fc6961ccf/README.md#possible-future-changes"> automated third-party auditing</a> in much of a meaningful way for PLC so far. I've been working on <a href="https://tangled.org/@microcosm.blue/Allegedly">some related tooling</a>.</p>
