---
author: locket.computer
cover_image: null
date: '2026-03-29T06:41:22.858Z'
dateFolder: 2026/03/29
description: I also wanted to make more concrete the abstractions of social media.
isBasedOn: 'https://locket.computer/about'
link: 'https://locket.computer/about'
slug: 2026-03-29-httpslocketcomputerabout
tags:
  - tech
  - decentralization
title: Locket
---
<h1>About Locket</h1>
<p><strong>Locket is exploring atproto IRL.</strong></p>
<h2>Ok, but what <em>is</em> this?</h2>
<p>Locket is an attempt to bring atproto into the physical world at Atmosphere Conf 2026.</p>
<p>This all started with a bit of a silly question: could you hold a PDS in your hands? Could you move from nebulous whispy clouds of abstract data storage to something more tangible.</p>
<p>I also wanted to make more concrete the abstractions of social media. So many sharp minds from the atproto ecosystem are gathering togther in a single time and place, shouldn't we be able to capture that in a way that feels both personal and connected to our online selves?</p>
<p>So Locket is a portable PDS purpose built to exist in the inhospitable environment of conference wifi and an exceedingly non-redundant power supply. It's also a kind of game to encourage people to meet and then take that meeting with them forever. And it's an exercise in on-the-fly interoperability that works with <a href="https://youandme.at/">You &amp; Me</a>.</p>
<h2>The Highfive</h2>
<p>A handshake felt too formal, a hug too intimate, a highfive was just right. So what's actually happening when you scan someone's QR code and log into the Atmosphere?</p>
<p>The person who scans the code gets a new record added to their PDS of the <a href="https://lexicon.garden/lexicon/did:plc:zfgfhm7mpslcdc3mk3z6sebw/at.youandme.connection/docs">at.youandme.connection</a> Lexicon type. This means that all your connections made via <a href="http://youandme.at/">You &amp; Me</a> will also show up here. Interoperability!</p>
<h2>The Miniature</h2>
<p>While it's certainly nice to know that a succesful highfive results in a few records added to the Atmosphere, I also wanted to generate a bit of a takeaway. Actual lockets contain <a href="https://en.wikipedia.org/wiki/Portrait_miniature"><em>portrait miniatures</em></a> to carry a memory, Locket generates a miniature to memorialize each highfive.</p>
<p>Every highfive is unique, and since a highfive is composed of a connection between two people, that seemed like it would be enough to generate something symbolic.</p>
<p>Enter the aperiodic monotile, <a href="https://www.smithsonianmag.com/smart-news/at-long-last-mathematicians-have-found-a-shape-with-a-pattern-that-never-repeats-180981899/">a seemingly simple shape that forms a pattern that never repeats</a>. In much the same way that no man enters the same river twice, every high five is unique — now you have a tiny little proof!</p>
<p>A <code>at.youandme.connection</code> will always generate the same miniature, and due to the non-repeating nature of the "einstein tile" every miniature should be unique to that highfive. Kind of like real life.</p>
<h2>The Device</h2>
<p>A Raspberry Pi Zero 2 WH sandwiched between a PiSugar 3 (for power) and a Waveshare 2.13" e-ink display. I love e-ink displays and I'm always looking for something to do with them and this felt like a fun use.</p>
<p>I tried to build a minimum viable PDS in a weekend but realized I was going to spend as much time debugging as I would building so I just used Hailey's excellent <a href="https://github.com/haileyok/cocoon">Cocoon</a> instead. It's basically perfect and runs like a champ even given the hardware constraints of a computer you wear like a necklace.</p>
<h2>Credits</h2>
<ul>
<li><strong>Built by</strong>: <a href="https://bsky.app/profile/did:plc:lysqukqdu6hsrhet5v2brjgo">Jim Ray</a> (with Claude, natch)</li>
<li><strong>PDS</strong>: <a href="https://github.com/haileyok/cocoon">Cocoon</a> by Hailey</li>
<li><strong>Connection Lexicon</strong>: <a href="https://lexicon.garden/lexicon/did:plc:zfgfhm7mpslcdc3mk3z6sebw/at.youandme.connection/docs">at.youandme.connection</a></li>
<li><strong>Tiling algorithm</strong>: Adapted from <a href="https://github.com/isohedral/hatviz">hatviz</a> by Craig S. Kaplan (BSD-3-Clause), based on Smith, Myers, Kaplan &amp; Goodman-Strauss, "An aperiodic monotile" (2023)</li>
<li><strong>AT Protocol</strong>: <a href="https://atproto.com/">atproto.com</a></li>
</ul>
<p><a href="https://locket.computer/">Back to Locket</a></p>
