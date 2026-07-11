---
author: ATProtocol Community
cover_image: >-
  https://discourse.atprotocol.community/uploads/default/original/1X/10981cfe13294bace2039b5c0a527d64a2f36c5b.png
date: '2026-07-10T06:50:26.404Z'
dateFolder: 2026/07/10
description: >-
  +1 for the single scheme (at:// with the /space/ segment). I’ve built this in
  HappyView, so I’ll try to speak to how it’s working.  First off, HappyView
  currently supports both formats. I built support for the ats:// based on Dan’s
  dev diaries, then added at:// after the proposal PR was closed. After building
  all of this out, I personally lean towards at://.  The /space/ disambiguator
  has worked well in HappyView: the parser decides space-vs-record on the
  literal space segment alone, with no net...
isBasedOn: 'https://discourse.atprotocol.community/t/bringing-back-at/944/20?u=bmann.ca'
link: 'https://discourse.atprotocol.community/t/bringing-back-at/944/20?u=bmann.ca'
slug: 2026-07-10-httpsdiscourseatprotocolcommunitytbringing-back-at94420ubmannca
tags:
  - tech
  - decentralization
title: 'Bringing back at://'
---
<p>+1 for the single scheme (<code>at://</code> with the <code>/space/</code> segment). I’ve built this in HappyView, so I’ll try to speak to how it’s working.</p>
<p>First off, HappyView currently supports <strong>both formats</strong>. I built support for the <code>ats://</code> based on Dan’s dev diaries, then added <code>at://</code> after the proposal PR was closed. After building all of this out, I personally lean towards <code>at://</code>.</p>
<p>The <code>/space/</code> disambiguator has worked well in HappyView: the parser decides space-vs-record on the literal <code>space</code> segment alone, with no network call, no lexicon resolution, and no DB lookup. Dan’s reasoning for it holds up. Being able to tell what’s on the other side of a URI without first resolving a lexicon makes the code a lot simpler.</p>
<p><a href="https://discourse.atprotocol.community/u/bnewbold.net">@bnewbold.net</a> and <a href="https://discourse.atprotocol.community/u/ngerakines.me">@ngerakines.me</a> are right that the two read paths barely share any machinery. Public and private records in HappyView are largely separate pipelines. But I don’t think that’s a problem with the scheme. They’re just different sync mechanisms and they were always going to be, regardless of what we call them. What a shared <code>at://</code> <em>does</em> give us is one namespace and one mental model, which still feels worthwhile to me.</p>
<p>Having built it both ways, spaces <em>do</em> feel like part of atproto regardless of which scheme we use. Same DIDs, same lexicons, same OAuth, same data model… Spaces are just a different sync mechanism behind a permission boundary. I’d rather the scheme say that plainly, and I think the <code>/space/</code> segment achieves that just fine without a separate scheme.</p>
