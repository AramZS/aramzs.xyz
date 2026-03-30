---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Aeob75vcjtmbaef2tn4evc4sl/3mbtqd53d3c2s/3mburumcnbs2m/opengraph-image?e2bb7203df6d3028
date: '2026-03-29T23:49:46.185Z'
dateFolder: 2026/03/29
description: >-
  How do you prove someone writes for a publication when there is no central
  authority to ask? This is the question I have been stuck on but may have a
  solution for.
isBasedOn: 'https://dad.leaflet.pub/3mburumcnbs2m'
link: 'https://dad.leaflet.pub/3mburumcnbs2m'
slug: 2026-03-29-httpsdadleafletpub3mburumcnbs2m
tags:
  - decentralization
title: The Complexity of Implementing Publication Authors for Standard.site
---
<p>Publications often have multiple contributors like, staff writers, guest columnists, one-time collaborators. On a traditional platform, adding someone to the masthead is trivial. Substack could implement this in an afternoon (and they have). They control the database. Authorization is just a row in a table.</p>
<p>Decentralized publishing does not have that luxury. Data lives across multiple repos controlled by different parties. Authorization must be publicly verifiable without relying on any single application. When a writer leaves a publication, their content must remain theirs while the publication retains its editorial record. A simple feature becomes a protocol design problem.</p>
<p>While I am a core team member of <a href="https://standard.site/?utm_source=dad.leaflet.pub">Standard.site</a>, this post does not represent the official position of the project. I am exploring these ideas as part of my research for <a href="https://offprint.app/?utm_source=dad.leaflet.pub">Offprint</a> a publishing platform I am building on AT Protocol and more specifically as a response to the following post by</p>
<p>@tylerjfisher.com</p>
<p>:</p>
<p>Which is proposing a new <code>site.standard.author</code> lexicon definition to allow documents to reference authors.</p>
<p><a data-index="5" href="https://tangled.org/standard.site/lexicons/pulls/1">This adds a `site.standard.author` lexicon and an optional array of references in `site.standard.document` to the author lexicon. ``` { "lexicon": 1, "id": "site.standard.author", "defs": { "main": { "type": "record", "key": "tid", "record": { "type": "object", "properties": { "name": { "type": "string", "required": true, "description": "Full name of the author." }, "title": { "type": "string", "maxLength": 1280, "maxGraphemes": 128, "description": "Author's title as it relates to the organization. e.g. Executive Editor." }, "bio": { "type": "string", "maxLength": 3000, "maxGraphemes": 300, "description": "A short biography of the author." }, "image": { "type": "blob", "maxSize": 1000000, "accept": [ "image/*" ], "description": "Optional image to use in reference to the author. Less than 1MB is size." }, "atprotoIdRef": { "type": "ref", "ref": "com.atproto.repo.strongRef", "description": "Optional strong reference to an ATProto did representing the author." } }, "required": [ "name" ] } } } } ```</a></p>
<p>This leaflet proposes a solution for how publications and authors can establish verifiable relationships, separating contributor access from document acceptance to ensure writers retain ownership while publications maintain editorial control.</p>
<p>To make this work, we need to consider four things: permissions, verification, ownership, and persistence.</p>
<p>The first consideration is access control. A publication needs to declare who can contribute, but that declaration must be publicly verifiable. In a centralized system, the platform is the authority. In a decentralized system, the authorization relationship must exist in the data itself.</p>
<p>We solve this with contributor records. A publication maintains a list of authorized contributors in its own repo. Each record includes the contributor's DID and their role. When a document claims association with a publication, any AppView can verify the claim by checking whether a corresponding contributor record exists on the owners PDS/collection.</p>
<p>This mirrors how Bluesky handles lists and labelers. The authorizing party maintains the list. The AppView validates at index time.</p>
<p>Authorization and acceptance are different concepts. A contributor record answers "can this person submit work?" An acceptance record answers "is this specific document officially part of the publication?"</p>
<p>The distinction matters for guest contributors. A publication might invite someone to write a single article. They need temporary authorization to submit, but the article itself should remain part of the publication permanently. Conflating these creates problems when access changes.</p>
<p>The solution is a separate acceptance lexicon. When a publication accepts a document, it creates a record pointing to that document's AT URI. This record is independent of contributor status. Revoke the contributor, the acceptance persists.</p>
<p>Documents live on the author's repo. This is non-negotiable for data sovereignty. Writers keep their work regardless of their relationship with any publication.</p>
<p>The publication field on a document is a claim, not a fact. The document says "I belong to this publication." The publication's acceptance record says "we confirm this document is ours." Both must exist for the relationship to be valid.</p>
<p>This bidirectional confirmation prevents unauthorized claims. Anyone can set a publication URI on their document. Without a matching acceptance record, the claim is unverified. AppViews can filter accordingly.</p>
<p>The architecture must handle relationship changes gracefully while preserving editorial integrity.</p>
<p>When a contributor is removed, their previously accepted documents remain in the publication. The acceptance records persist. The contributor record is deleted. New submissions are no longer authorized, but existing work stays. When a publication dissolves, documents remain on author repos. Authors retain their work and can republish elsewhere.</p>
<p>Acceptance records should use a strongRef rather than a standard ref. A strongRef includes both the AT-URI and the CID, locking the reference to a specific version of the document. This preserves exactly what the publication endorsed at the time of acceptance, not whatever the document contains after subsequent edits.</p>
<p>PDSes do not store historical versions. When a document is updated, the previous version is gone. AppViews must fetch the current record, compare its CID against the strongRef, and reject the content if they differ. There is no fallback. Publications that want to guarantee access to accepted versions must archive documents at acceptance time on their own infrastructure.</p>
<p>When an author deletes a document, the acceptance record points to nothing retrievable. AppViews should remove these from active indexes. Publications can retain orphaned records for audit purposes or delete them based on their data retention policies.</p>
<p>This is not a final spec. It is a starting point for discussion. The core insight is that contributor access and document acceptance are separate concerns that require separate records. That separation is what makes the rest of the architecture possible.</p>
<p>I will be implementing this for Offprint over the coming months. If you are working on similar problems or see gaps in this proposal, I would love to hear from you.</p>
<blockquote data-index="29">📢 Keep in mind that while the implementation may differ in the end, the four core considerations (permissions, verification, ownership, and persistence) are the important part.</blockquote>
<p>I also want to thank everyone who contributes to Standard.site. For those exploring new features, my suggestion is to experiment locally in your own lexicon namespace first. Once you have something working, propose it to the wider community. Convergence on common implementations happens naturally when people have seen what works. Standards emerge from successful experiments, not the other way around.</p>
