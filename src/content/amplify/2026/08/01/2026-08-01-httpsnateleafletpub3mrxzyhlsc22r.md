---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Axbtmt2zjwlrfegqvch7fboei/3lxksvuhk3s2j/3mrxzyhlsc22r/opengraph-image-1qv6ug?f56b674a1cd0255e
date: '2026-08-01T13:11:37.280Z'
dateFolder: 2026/08/01
description: (eventually) trying to make operating atproto infra cheaper
isBasedOn: 'https://nate.leaflet.pub/3mrxzyhlsc22r'
link: 'https://nate.leaflet.pub/3mrxzyhlsc22r'
slug: 2026-08-01-httpsnateleafletpub3mrxzyhlsc22r
tags:
  - tech
  - decentralization
title: saving >$400/mo on atproto infra
---
<blockquote data-index="0">so, i work for a startup and they pay me to maintain open source. the stability and freedom to explore hobby projects (that maybe feed back into work™️) is a privilege i don't take for granted</blockquote>
<p>i am a chronic maker of things. when things go well, they cross-pollinate in constructive ways... but things don't always go well (or at least, go well fast enough). or even if they do go well, there's some lurking untenable nature to the things that i am blind to.</p>
<p>lately, atproto libraries and services have been the things i make<sup>1</sup> outside of work. for a while, i didn't have that many things, so i wasn't too worried about a <a href="https://fly.io">fly.io</a> machine here, a hetzner node there. i have a history w <a href="https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac">IaC</a> and claude knows its HCL very well, so its almost too easy to spin up new stuff.</p>
<p>of course, this mode of excess has a practical limit for those with normal finances. i am from a middle-class <a href="https://en.wikipedia.org/wiki/Menominee,_Michigan">michigan</a> family, my only money is from my startup tech job at <a href="https://prefect.io">prefect.io</a>. i have disposable income, but not quite as much as i was beginning to spend on compute and storage for atproto stuff.</p>
<p>this is a short recap of my excess, audit and reduction of costs</p>
<p>i already had a fair number of web apps up on the internet:</p>
<p>at the time, the most expensive 2 were</p>
<p>so about $50/mo in total. not horrendous</p>
<p>but then..</p>
<p>i just start deploying all sorts of shit</p>
<figure><img alt="his greed sickens me, atproto projects" src="https://nate.leaflet.pub/api/atproto_images?did=did:plc:xbtmt2zjwlrfegqvch7fboei&amp;cid=bafkreibonhxufcp2dnl3hnxqmbbgn2mo73mrek5ps2jvcc6bjc5a6eninm&amp;width=1200&amp;v=1"/><figcaption>his greed sickens me, atproto projects</figcaption></figure>
<p>in late feb, <a href="https://nate.leaflet.pub/3mfg72xdkec2r">i deploy my first relay and jetstream instance</a><sup>2</sup> (reading back through that, wow have i learned a lot about atproto sync since then!) and about a week later, i deploy <a href="https://zlay.waow.tech">zlay.waow.tech</a><sup>3</sup> (an instance of my <a href="https://tangled.org/zat.dev/zlay">zig relay</a>). both of these are deployed on Hetzner nodes in the USA<sup>4</sup>. this will become important later</p>
<p>so now i had relays, so i wanted to see how well they're doing!</p>
<figure><img alt="asia.firehose.network	by	@sri.xyz	events:	1360041	users:	199766	100,00%
europe.firehose.network	by	@sri.xyz	events:	1360011	users:	199766	100,00%
northamerica.firehose.network	by	@sri.xyz	events:	1359737	users:	199753	99,99%
relay.xero.systems	by	@besaid.zone	events:	1360132	users:	199719	99,98%
relay1.us-east.bsky.network	by	@bsky.app	events:	1360308	users:	199712	99,97%
bsky.network	by	@bsky.app	events:	1360280	users:	199709	99,97%
relay1.us-west.bsky.network	by	@bsky.app	events:	1360258	users:	199705	99,97%
relay3.fr.hose.cam	by	@bad-example.com	events:	1360043	users:	199702	99,97%
relay.fire.hose.cam	by	@bad-example.com	events:	1359976	users:	199701	99,97%
jetstream1.us-east.bsky.network	by	@bsky.app	events:	1403667	users:	199690	99,96%
jetstream2.us-east.bsky.network	by	@bsky.app	events:	1403631	users:	199685	99,96%
jetstream1.us-west.bsky.network	by	@bsky.app	events:	1403569	users:	199674	99,95%
jetstream2.us-west.bsky.network	by	@bsky.app	events:	1402306	users:	199540	99,89%
demo.tiny.hose.cam	by	@bad-example.com	events:	1351385	users:	199053	99,64%
atproto.africa	by	@blackskyweb.xyz	events:	1324455	users:	197410	98,82%
relay.upcloud.world	by	@upcloud.com	events:	866178	users:	130421	65,29%
jetstream.fire.hose.cam	by	@bad-example.com	events:	731657	users:	124255	62,20%
relay.feeds.blue	by	@mackuba.eu	events:	7984	users:	715	0,36%" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:oio4hkxaop4ao4wz2pp3f4cr/bafkreibdofpacjraekzy6wobuiu5lg5quxoksgjfqvwwtwybgn2zxlmq3a"/><figcaption>asia.firehose.network by @sri.xyz events: 1360041 users: 199766 100,00% europe.firehose.network by @sri.xyz events: 1360011 users: 199766 100,00% northamerica.firehose.network by @sri.xyz events: 1359737 users: 199753 99,99% relay.xero.systems by @besaid.zone events: 1360132 users: 199719 99,98% relay1.us-east.bsky.network by @bsky.app events: 1360308 users: 199712 99,97% bsky.network by @bsky.app events: 1360280 users: 199709 99,97% relay1.us-west.bsky.network by @bsky.app events: 1360258 users: 199705 99,97% relay3.fr.hose.cam by @bad-example.com events: 1360043 users: 199702 99,97% relay.fire.hose.cam by @bad-example.com events: 1359976 users: 199701 99,97% jetstream1.us-east.bsky.network by @bsky.app events: 1403667 users: 199690 99,96% jetstream2.us-east.bsky.network by @bsky.app events: 1403631 users: 199685 99,96% jetstream1.us-west.bsky.network by @bsky.app events: 1403569 users: 199674 99,95% jetstream2.us-west.bsky.network by @bsky.app events: 1402306 users: 199540 99,89% demo.tiny.hose.cam by @bad-example.com events: 1351385 users: 199053 99,64% atproto.africa by @blackskyweb.xyz events: 1324455 users: 197410 98,82% relay.upcloud.world by @upcloud.com events: 866178 users: 130421 65,29% jetstream.fire.hose.cam by @bad-example.com events: 731657 users: 124255 62,20% relay.feeds.blue by @mackuba.eu events: 7984 users: 715 0,36%</figcaption></figure>
<p>but i didn't really understand how exactly it worked. "% of max what?" etc. plus it was in ruby 🫪 so i made my own!</p>
<p>(fun fact, you can listen to the relays on <a href="https://plyr.fm/radio/firehose">plyr.fm/radio/firehose</a>)</p>
<p>then, got nerdsniped by</p>
<p>@brookie.blog</p>
<p>and</p>
<p>@bnewbold.net</p>
<p>talking about how an independent typeahead would be great but maybe hard</p>
<figure><img alt="another one, DJ khaled" src="https://nate.leaflet.pub/api/atproto_images?did=did:plc:xbtmt2zjwlrfegqvch7fboei&amp;cid=bafkreievbmyubcch7icv6ra4fa5afpbcyuinpmf2ynaycrtivm7t3cmopu&amp;width=1200&amp;v=1"/><figcaption>another one, DJ khaled</figcaption></figure>
<p>at first, i underestimated this one. oh "just listen to the firehose, index people as they do stuff" i say! "just use a single fly machine and <a href="https://turso.tech">turso.tech</a>!" i say. just "copy all bluesky's moderation decisions" i say! we'll come back to this one as well :/</p>
<p>i then deploy <a href="https://tangled.org/zzstoatzz.io/my-prefect-server">tangled.org/zzstoatzz.io/my-prefect-server</a> to (yet another US node! on) Hetzner to manage all of my cron jobs, which were then simply grabbing stuff from github to build a lil dashboard to keep track of OSS triage and such. we'll also come back to this</p>
<p>atmosphere conf happens in late march, which is invigorating and makes me want to get even more involved with more things</p>
<p>while literally at the conference in Vancouver, I:</p>
<p>jeez. even writing this out is painful. it snowballed so badly. april and may, i finally slow down but haven't audited my costs yet.</p>
<p>a warning shot comes in late may, as <a href="https://pckt.blog/b/waow-tech/typeahead-more-like-typebehind-amirite-tzgmqge">typeahead gets overwhelmed and i realize</a> that i should not just throw more compute at it. this is the beginning of a good trend but i needed to come to jesus first.</p>
<p>on june 16th, i finally realize<sup>5</sup> that i really really need to know the scope and scale of my spending, as at this point its spread across <a href="https://fly.io/">fly.io</a>, <a href="https://www.hetzner.com/cloud/?mtm_campaign=18516154988&amp;mtm_source=google&amp;mtm_keyword=hetzner&amp;mtm_medium=Brand_Search&amp;mtm_content=626192232399&amp;gad_source=1&amp;gad_campaignid=18516154988&amp;gclid=CjwKCAjwj7HTBhBiEiwA8s35Or6YqTv-jtYhoiugvg9rxr18iYGRX0aUbbrbjBpipHXclROy1W4T6BoCoTYQAvD_BwE">hetzner</a>, <a href="https://neon.com/">neon</a> and <a href="https://turso.tech/">turso</a> and i know its getting to be a lot.</p>
<p>so.... yea i was at about $709/mo on atproto projects</p>
<figure><img alt="michael scott grimace meme" src="https://nate.leaflet.pub/api/atproto_images?did=did:plc:xbtmt2zjwlrfegqvch7fboei&amp;cid=bafkreiataak2aypaywo6s7dzb7yrhuk5v52tnw3utzn7tudjbfefqkvm6m&amp;width=1200&amp;v=1"/><figcaption>michael scott grimace meme</figcaption></figure>
<p>yes i know! i know. its bad. like 0th world, 99.9th percentile bad. believe it or not, i am mostly quite frugal in my life. i think this just got so out of hand because of my frenetic excitement about atproto, the fact that the the costs were spread across platforms, and because of some serious blind spots i'll get to in just a second.</p>
<p>worse yet, i/others had actually started to use these things! especially in the case of typeahead, plyr.fm, pub-search and my relays (which had <a href="https://atproto.com/specs/sync#record-level-synchronization">listReposByCollection</a>, unlike most indie relays). so just saying "sorry y'all" and taking stuff offline felt not ok.</p>
<p>unfortunately, a huge chunk of this was entirely avoidable<sup>6</sup>.</p>
<figure><img src="https://nate.leaflet.pub/api/atproto_images?did=did:plc:xbtmt2zjwlrfegqvch7fboei&amp;cid=bafkreieinqjwk7omyobmwm4ec7xfn5ynda67ooo3wznmwho32bbg7lw6jq&amp;width=1200&amp;v=1"/><figcaption>guess what those top 3 have in common?</figcaption></figure>
<p>yep. <a href="https://lowendtalk.com/discussion/165248/why-is-hosting-so-much-cheaper-in-the-eu-where-the-hell-is-my-us-hetzner">US hetzner nodes</a>. biiiiiiiiiiiiiig old blind spot. not ideal</p>
<p>on june 17th, i migrated my 3 hetzner nodes to <code>fsn1</code> (Falkenstein, Germany), immediately cutting $352 dollars off my monthly bill.</p>
<p>just moving them to the EU saves 70% on their compute spend on the spot, and also the bandwidth budget goes from 3TB to 20TB a month. relays, since they subscribe to all ~3k PDS hosts and broadcast the firehose, were exceeding that 3TB every month, causing overages.</p>
<p>there's a long tail of pretty cheap stuff, some were old <a href="https://fly.io">fly.io</a> things i just deleted, some were expensed work-related things.</p>
<p>this was a serious wake up call for me! i had been less rigorous at deployment time than i ought have been. i think it was a combo of</p>
<p>so i was down to ~$350/mo, which is still a lot. so i kept going</p>
<p>typeahead and pub-search were next, which are similarly structured.</p>
<p>both ingest the firehose to get updates, had a poor fly.io machine doing <code>O(corpus)</code> work per query, and using turso (read as SaaS for globally replicated SQLite) for persistence, cloudflare for pages and handling requests to the backend</p>
<p>typeahead is almost inherently work-intensive, as it intends to be a full-network actor index that's constantly trying to keep up with account status commits and moderation decisions.</p>
<p>pub-search also bc <a href="https://standard.site">standard.site</a> is <a href="https://bsky.app/profile/zzstoatzz.io/post/3mn4baqvpoc26">kinda popping off</a> and indexing those records<sup>8</sup> and offering fast/durable keyword and semantic search of the actual post content at scale is non-trivial.</p>
<blockquote data-index="94">i use this (made-up) phrase loosely to refer to @bad-example.com 's pattern of serving network scale services off their raspberry pis at home, ie communal services via home infra</blockquote>
<p>well actually, typeahead had this shape until that <a href="https://pckt.blog/b/waow-tech/typeahead-more-like-typebehind-amirite-tzgmqge">warning shot / response</a> i mentioned. i realized that there was more of a <a href="https://www.databricks.com/blog/what-is-lambda-architecture">lambda pattern</a> thing i could do<sup>9</sup>, where i can avoid doing corpus-proportional work<sup>10</sup> by doing periodic index preparation "offline", and having a live overlay to keep what i serve up to date.</p>
<p>and i thought</p>
<blockquote data-index="100">huh, if only i knew a way to do periodic jobs that could keep my indices fresh</blockquote>
<p>i literally have spent the last 4 years maintaining prefect, which helps people define and run periodic jobs. of course, there are so many options here, but its not every day that a truly motivating dogfooding use case for your occupational focus appears naturally out of your hobby horse..</p>
<p>so naturally i:</p>
<p>i now spend about $250/mo out of pocket on atproto projects<sup>12</sup></p>
<figure><img alt="uv run 'https://mirror.tangled.network/xrpc/sh.tangled.git.temp.getBlob?path=chart-atproto-costs&amp;ref=main&amp;repo=did%3Aplc%3Atkowbclf3uysajev6yeuiosc'" src="https://nate.leaflet.pub/api/atproto_images?did=did:plc:xbtmt2zjwlrfegqvch7fboei&amp;cid=bafkreiblvco5hjdghsnjxxo4dtbxlhi5662caawqg3vysdg6mtzeohhuru&amp;width=1200&amp;v=1"/><figcaption>uv run 'https://mirror.tangled.network/xrpc/sh.tangled.git.temp.getBlob?path=chart-atproto-costs&amp;ref=main&amp;repo=did%3Aplc%3Atkowbclf3uysajev6yeuiosc'</figcaption></figure>
<p>which i now track and <a href="https://pds.ls/at://did:plc:xbtmt2zjwlrfegqvch7fboei/io.zzstoatzz.cost.snapshot">publish to my PDS</a> (thinking that someday i'd like to solicit donations for public infra, and having an auditable history feels like a good way to stay reputable for donors)</p>
<figure><img src="https://nate.leaflet.pub/api/atproto_images?did=did:plc:xbtmt2zjwlrfegqvch7fboei&amp;cid=bafkreidwhobd34pw5ock7p36i37r4akwgpxgfuuxg4ermrqgwytssmgtqm&amp;width=1200&amp;v=1"/></figure>
<p>compute heavy index maintenance for typeahead and pub-search now happen on my laptop at home<sup>13</sup>, which gets sent work from my zig prefect server running on a small EU hetzner node, and publishes snapshots to R2 that a now slim <a href="https://fly.io">fly.io</a> backend can surface to the edge to satisfy the needs of the blogosphere and actor searches.</p>
<p>i still have a ton of headroom on my machine (which someday soon i'd like to move to a proper homelab situation), and my IO isn't crazy either (under the ~1TB ISP limit by a lot), so future compute heavy stuff can really just go on my machine for now. of course, power outages will be a thing, but i've decent fallbacks<sup>14</sup> for that.</p>
<p>i am running out of steam here. all this steeping in my own embarrassment at excess makes me want to go for a walk on the 606 or play guitar or make 3 quesadillas and eat them over the cutting board.</p>
<p>however, i'm pleased w some of the outcomes of all of this:</p>
<ul><li><p data-index="121.3">i have learned how to make network-scale, community services much cheaper. not only have i learned how, but i've also drastically increased my intolerance for waste (energy and money). e.g. no more sugary deployment patterns for big stuff, no more python runtimes where zig will do etc</p></li></ul>
<p>everything i mention here, i'll continue to maintain and make cheaper as long as i can. i have much to learn about databases, and i am starting to see why apparently every bluesky team member is working on databases somehow<sup>16</sup>. also kafka probably</p>
<p>if you'd like to sponsor future work (e.g. permissioned data might be a significant boon for the economic viability of atproto, and <a href="https://pds.zat.dev">pds.zat.dev</a> already implements spaces along with</p>
<p>@trezy.codes</p>
<p>@ngerakines.me</p>
<p>and</p>
<p>@chadtmiller.com</p>
<p>projects [<a href="https://happyview.dev/">happyview</a>, <a href="https://tangled.org/ngerakines.me/atproto-crates/tree/main/crates/atproto-pds">atproto-pds</a>, <a href="https://tangled.org/chadtmiller.com/pds.js">pds.js</a>], so that apps can explore permissioned data UX now) then please reach out! i currently work at prefect as i mentioned, and have chosen to pay for these things out of pocket of my own volition bc i care about atproto, but am interested in doing atproto-stuff full time sustainably.</p>
