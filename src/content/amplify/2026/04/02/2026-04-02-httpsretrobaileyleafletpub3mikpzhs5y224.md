---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Arnpkyqnmsw4ipey6eotbdnnf/3lyiajoe55c2b/3mikpzhs5y224/opengraph-image?e2bb7203df6d3028
date: '2026-04-03T03:36:52.926Z'
dateFolder: 2026/04/02
description: 'A short write up about what Bailey had around his neck at #AtmosphereConf 2026'
isBasedOn: 'https://retrobailey.leaflet.pub/3mikpzhs5y224'
link: 'https://retrobailey.leaflet.pub/3mikpzhs5y224'
slug: 2026-04-02-httpsretrobaileyleafletpub3mikpzhs5y224
tags:
  - fun
  - code
  - tech
title: Badger Badger Badger
---
<p>In a stroke of genius</p>
<p>@brookie.blog</p>
<p>created my favorite atproto app to use irl, <a href="https://youandme.at/">youandme.at</a>. And she solved a problem for me, finding a cool way to show off physical hardware using atproto in a fun, interactive way. For those who don't know what <a href="https://youandme.at">youandme.at</a> is. It's a fun <a href="https://atproto.com/">atproto</a> app that when you meet someone, you each scan the QR code. It then makes a "connection" showing the person's handle and pfp from Bluesky, which is a great icebreaker if you know someone online, but may not irl.</p>
<figure><img src="https://retrobailey.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreihtfc2khnl7n6kt4ktogez756bydivkiiiy4jd56qfujzeh2earei"/></figure>
<p>The <a href="https://shop.pimoroni.com/products/badger-2350?variant=55801169707387">Badger 2350</a> is a little hardware device that is an eink badge meant to be taken to conferences, sit on your desk, or whatever made by the great folks at</p>
<p>@pimoroni.com</p>
<p>. The brains behind the badger is a <a href="https://www.raspberrypi.com/products/rp2350/">Raspberry Pi 2350</a>, or sometimes known by the dev board, the <a href="https://www.raspberrypi.com/products/raspberry-pi-pico/">Raspberry Pi Pico</a>. This little <a href="https://shop.pimoroni.com/products/raspberry-pi-pico-2-w?variant=54852252991867">$7</a> computer is called a microcontroller; it does not technically run a full operating system, but just a single program you put on it. And in this case, <a href="https://micropython.org/">MicroPython</a>, a subset/version of Python created to run on resource constrained devices and interact with low level hardware APIs. This firmware controls all the hardware. Pimoroni has also abstracted a lot of the hard stuff already and given it a sort of framework that handles the RTC, button presses, writing to the screen, LEDs, Wifi/Bluetooth, and the i2C port. I usually like to write my firmware for these kind of boards in rust, but I have to give it to Pimoroni. They know how to make something easy, fun, and educational. That's hard to beat. To add an app to the Badger 2350 it's as easy as connecting the badger to your computer, clicking a button on the back twice, and it shows up as an external drive, allowing you to edit the code on the device with your favorite editor.</p>
<figure><img src="https://retrobailey.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreiafqxfulwpotrsqvuzb3g4rqjslmcgpcctkwfjtlsh4wmyautaznm"/></figure>
<p>Adding a new app is as easy as adding a new folder, an icon, and a <code>__init__.py</code>. Can see the exact directions <a href="https://badgewa.re/docs/introduction/getting-started.md">here</a>. Once you do that, it should show up on the home page app selector.</p>
<figure><img src="https://retrobailey.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreicmrf4aeh2o4lnvv57occymrou6s622dh2drc7cytjykhoxdyklim"/></figure>
<p>So, like I said</p>
<p>@brookie.blog</p>
<p>really nailed the IRL social aspect of <a href="https://youandme.at">youandme.at</a>. Before I wanted to find some kind of fun "guest book" where folks could log in, write a lexicon to their repo, and it shows up on my badge. It was halfway done, overly complicated, and I had decided to focus on my at://advent workshop instead, which was the better choice' cause Brook knocked it out of the ballpark with <a href="https://youandme.at">youandme.at</a>. Every single person used it at Atmosphere Conf 2026.</p>
<p>So we ended up with this little guest book on my badge that showed who all scanned my <a href="https://youandme.at">youandme.at</a> qr code, as an added bonus, it showed them in order with the newest at the top. Thanks to my previous badger guest book app I had made, it was very easy to adapt it to work with <a href="https://youandme.at">youandme.at</a> and could hack that together pretty quickly.</p>
<figure><img src="https://retrobailey.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreid5o4ehnhzq74y6raw2oupomvrdixlvqrmj5pb3lqa4u4bxchctfi"/><figcaption>The up and down buttons let me scroll the guest book by advancing or going back with the cursors to constellation. Then, when I pressed the</figcaption></figure>
<p><code>B</code> button, it showed the QR code, which is a URL with your did like <code>https://youandme.at/connect?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf</code>. All the ✨atproto magic✨ of writing records happens on the person's phone who scans the qr code like it does on the web app.</p>
<figure><img src="https://retrobailey.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreid4jveyrokmh5jfkc2amubvbvaufqgijgdjcko5cufo2zwmyeoati"/></figure>
<p>The <code>at.youandme.connection</code> lexicon has a nice <code>subject</code> field in it which makes it super easy to get a list of dids that have scanned my badge via <a href="https://constellation.microcosm.blue/">constellation</a>. That lexicon looks like this:</p>
<p>And the constellation URL that returns the total count of how many people have scanned my badge and who it was</p>
<p><a href="https://constellation.microcosm.blue/xrpc/blue.microcosm.links.getBacklinks?subject=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;source=at.youandme.connection:subject">https://constellation.microcosm.blue/xrpc/blue.microcosm.links.getBacklinks?subject=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;source=at.youandme.connection:subject</a></p>
<p>To break that down:</p>
<p>This returns JSON with how many records have my did as the subject matching the above criteria, along with which records that is.</p>
<p>From here it was just using <a href="https://slingshot.microcosm.blue/">slingshot</a> (everybody tell</p>
<p>@bad-example.com</p>
<p>thank you) to grab something called a minidoc which is just a mini version of your <a href="https://atproto.com/specs/did#did-documents">did document</a> that has your handle in it, making it an easy single web request to go did -&gt; handle on a little resource constrained device. That URL is <code>https://slingshot.microcosm.blue/xrpc/blue.microcosm.identity.resolveMiniDoc?identifier=did:plc:rnpkyqnmsw4ipey6eotbdnnf</code></p>
<p>and the mini did looks like this</p>
<p>The whole thing ended up being about 215 loc since the Badger has a nice framework for the logic of the display, wifi, and web requests. Can see the whole program for it on this <a href="https://tangled.org/strings/did:plc:rnpkyqnmsw4ipey6eotbdnnf/3mikl2jgckf22">tangled string</a>.</p>
<p>Then to connect to the wifi I just cheated and ran a hotspot off my phone anytime I showed it off. Here's a picture of me cheeseing showing it off to fig.</p>
<figure><img src="https://retrobailey.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreifkyj6wwzawhcek5jtg4vkvpcth5u3a7vcggpbb3ttoz7a5nyjzxy"/></figure>
<p>I also was not the only one there with a cool Raspberry Pi eink badge,</p>
<p>@jimray.locket.computer</p>
<p>rolled up with a PDS in his shirt pocket 🤯. I even heard he migrated his account mid workshop.</p>
<figure><img alt="A tiny computer and epaper display attached to my shirt pocket. It shows a QR code and an aperiodic monotile. " src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:lysqukqdu6hsrhet5v2brjgo/bafkreifhpo3b4dzenn3cpgvngssgbabiufzdxwnkuwu5yj2po7wwqug3am"/><figcaption>A tiny computer and epaper display attached to my shirt pocket. It shows a QR code and an aperiodic monotile.</figcaption></figure>
<p>Thanks for reading! I hope y'all enjoyed this quick write up about it, and it was so great to meet everyone last week. Already can't wait for the next Atmosphere conf when we all get to hang out again. I will also keep my 👀 out for y'all to outdo me on a badge next year.</p>
