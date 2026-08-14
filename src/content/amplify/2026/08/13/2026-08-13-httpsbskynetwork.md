---
author: bsky.network
cover_image: 'https://bsky.network/img/social-card-default.png'
date: '2026-08-13T20:53:47.926Z'
dateFolder: 2026/08/13
description: >-
  High scale open social, unlocked for every builder. Bluesky operates public
  infrastructure for the AT Protocol — Jetstream, Relay, and the Bluesky API —
  as open services anyone can build on.
isBasedOn: 'https://bsky.network/'
link: 'https://bsky.network/'
slug: 2026-08-13-httpsbskynetwork
tags:
  - code
  - tech
  - decentralization
title: 'Bluesky Protocol Services, from Bluesky PBC'
---
<figure><svg preserveaspectratio="xMaxYMid slice" viewbox="-640 0 1920 540">
<g>
<path class="line" d="M 1280,40 L 1180,40 C 1080,30 980,80 920,160 C 860,240 760,260 700,340 C 640,420 720,500 880,520 L 1280,520 Z"></path>
<path class="line" d="M 1280,90 L 1180,90 C 1090,80 1000,120 950,200 C 900,280 800,290 760,360 C 720,430 800,490 920,500 L 1280,500 Z"></path>
<path class="line" d="M 1280,140 L 1180,140 C 1100,135 1030,170 990,240 C 950,310 850,320 820,380 C 800,440 870,470 960,478 L 1280,478 Z"></path>
<path class="line bold" d="M 1280,190 L 1180,190 C 1110,190 1060,220 1030,280 C 1000,340 920,355 890,400 C 870,440 920,455 1000,460 L 1280,460 Z"></path>
<path class="line" d="M 1280,240 L 1180,240 C 1130,240 1090,260 1070,310 C 1050,360 1010,380 990,410 C 980,430 1010,440 1050,442 L 1280,442 Z"></path>
<path class="line" d="M 1280,290 L 1180,290 C 1150,290 1130,300 1115,330 C 1100,360 1080,380 1080,400 C 1080,415 1110,420 1140,420 L 1280,420 Z"></path>
<path class="line" d="M 1280,340 L 1180,340 C 1160,340 1145,350 1140,370 C 1135,390 1120,395 1130,400 L 1280,400 Z"></path>
<path class="line" d="M 540,540 C 600,520 700,510 760,480 C 820,450 880,440 920,440 C 1000,440 1080,448 1180,460 L 1280,472"></path>
<path class="line" d="M 600,540 C 660,530 740,520 780,500 C 820,480 860,470 900,470 C 1000,470 1080,478 1180,490 L 1280,502"></path>
<path class="line bold" d="M 670,540 C 730,535 800,528 830,520 C 860,510 880,505 900,505 C 1000,505 1080,512 1180,522 L 1280,532"></path>
<path class="line" d="M 480,0 C 520,40 600,60 680,40 C 760,20 820,40 900,30 L 1280,30"></path>
<path class="line" d="M 520,0 C 560,30 620,50 700,40 C 780,30 830,50 900,50 L 1280,50"></path>
</g>
<g style="color: var(--c-jetstream)">
<circle class="pin-ring" cx="980" cy="280" r="22"></circle>
<circle class="pin-ring" cx="980" cy="280" r="40" style="stroke-dasharray:2 4"></circle>
<circle class="pin warm" cx="980" cy="280" r="5.5"></circle>
</g>
<text class="label warm" x="998" y="278">RELAY · APPVIEW · JETSTREAM</text>
<g style="color: var(--c-relay)">
<circle class="pin cool" cx="1060" cy="120" r="3.2"></circle>
<circle class="pin cool" cx="1100" cy="150" r="3.2"></circle>
<circle class="pin cool" cx="1050" cy="180" r="3.2"></circle>
<circle class="pin cool" cx="1110" cy="200" r="3.2"></circle>
</g>
<text class="label cool" style="text-anchor:end" x="1140" y="138">PDS · ×1,206</text>
<g style="color: var(--c-api)">
<circle class="pin-ring" cx="1110" cy="430" r="14"></circle>
<circle class="pin mag" cx="1110" cy="430" r="3.8"></circle>
</g>
<text class="label mag" style="text-anchor:end" x="998" y="446">→ YOUR APP</text>
<text class="label" opacity="0.6" x="1080" y="244">+260</text>
<text class="label" opacity="0.6" x="1090" y="346">+180</text>
<text class="label" opacity="0.5" x="780" y="514">+080</text>
</svg></figure><h1>High scale open social<br/>unlocked for every builder.</h1>
<p><em>Billions</em> of interactions across millions of accounts, streaming to you in <em>realtime</em>.<br/>
What will <em>you</em> build on the <a href="https://atproto.com/guides/understanding-atproto"><em>Atmosphere</em></a>?</p>
<pre>import { Jetstream, isCreate } from '@bsky/jetstream';
import { app } from '@bsky/sdk/lexicons';

const jetstream = new Jetstream('https://jetstream.us-east.bsky.network');
const collections = [app.bsky.graph.follow, app.bsky.feed.repost, app.bsky.feed.post];

for await (const event of jetstream.live({ collections })) {
  if (isCreate(event, app.bsky.graph.follow)) {
    console.log(`🌱  ${event.did}  follows  ${event.commit.record.subject}`);
  } else if (isCreate(event, app.bsky.feed.repost)) {
    console.log(`♻️  ${event.did}  reposts  ${event.commit.record.subject.uri}`);
  } else if (isCreate(event, app.bsky.feed.post) &amp;&amp; event.commit.record.reply) {
    console.log(`💭  ${event.did}  replies  ${event.commit.record.reply.parent.uri}`);
  }
}</pre>
<aside><h2>Less asking.<br/>More building.</h2><p>No API keys, no signup, no waiting to get started. <b>Free and open.</b></p><p>Lay foundations on top of an open network that can't be taken away.</p><a href="https://bsky.network/docs/jetstream">More examples →</a></aside>
<p><a href="https://bsky.network/docs/jetstream"><h3>Jetstream</h3>wss://jetstream.us-east.bsky.network<p>Replay data from the network or stream in real time. Slice the data you care about.</p>Learn More →</a><a href="https://bsky.network/docs/relay">wss://bsky.network<p>Sync the full Atmosphere in a zero trust setting. Build your own independent infrastructure.</p>Learn More →</a><a href="https://bsky.app"><figure><svg aria-label="Bluesky" class="friendlyWord" fill="none" role="img" viewbox="0 0 116 31" xmlns="http://www.w3.org/2000/svg">Bluesky<path d="M15.3666 11.4928C18.0902 12.4818 19.536 14.7668 19.536 17.3245C19.536 21.6557 16.6779 24.2816 11.1971 24.2816H0V0H10.8272C16.0391 0 18.5609 2.69417 18.5609 6.27503C18.5609 8.66227 17.4849 10.4015 15.3666 11.4928ZM10.491 3.78548H4.53936V10.1287H10.491C12.8111 10.1287 14.0552 8.90099 14.0552 6.85479C14.0552 4.9791 12.7774 3.78548 10.491 3.78548ZM4.53936 20.462H10.9617C13.5172 20.462 14.8958 19.2684 14.8958 17.1199C14.8958 14.8691 13.5844 13.7437 10.9617 13.7437H4.53936V20.462Z" fill="currentColor"></path><path d="M25.8299 24.2816H21.5932V0H25.8299V24.2816Z" fill="currentColor"></path><path d="M39.8775 16.5402V6.68427H44.1143V24.2816H40.012V21.7239C38.7007 23.7019 36.8849 24.6909 34.5648 24.6909C30.8997 24.6909 28.5123 22.44 28.5123 18.3476V6.68427H32.7491V17.6315C32.7491 19.8482 33.8251 20.9736 36.0107 20.9736C38.0618 20.9736 39.8775 19.4389 39.8775 16.5402Z" fill="currentColor"></path><path d="M63.3989 15.7899V16.813H50.4197C50.7224 19.8482 52.37 21.3487 54.9255 21.3487C56.8757 21.3487 58.1871 20.4962 58.8932 18.8251H62.9618C62.0539 22.4059 59.0277 24.6909 54.8918 24.6909C52.3027 24.6909 50.218 23.8383 48.6376 22.1672C47.0572 20.4962 46.2502 18.2794 46.2502 15.4829C46.2502 12.7206 47.0236 10.5038 48.604 8.79868C50.1844 7.12761 52.2355 6.27503 54.8246 6.27503C57.4473 6.27503 59.5321 7.16172 61.0788 8.90099C62.6256 10.6403 63.3989 12.9593 63.3989 15.7899ZM54.791 9.61716C52.4708 9.61716 50.8569 10.9813 50.4534 13.8119H59.1622C58.7923 11.2541 57.2456 9.61716 54.791 9.61716Z" fill="currentColor"></path><path d="M72.7892 24.7591C67.7455 24.7591 65.0891 22.747 64.8537 18.6887H68.9896C69.2249 20.8713 70.3009 21.6898 72.8564 21.6898C75.1429 21.6898 76.2862 20.9736 76.2862 19.5754C76.2862 18.3135 75.4792 17.6997 72.8901 17.2563L70.9062 16.9153C67.1066 16.2673 65.2236 14.494 65.2236 11.5952C65.2236 8.28713 67.8127 6.27503 72.4193 6.27503C77.3622 6.27503 79.9177 8.25302 80.0858 12.2431H76.0844C75.9835 10.0946 74.7394 9.34433 72.4193 9.34433C70.4018 9.34433 69.3931 10.0264 69.3931 11.3905C69.3931 12.6183 70.2673 13.1639 72.2848 13.5391L74.4704 13.8801C78.6735 14.6645 80.4893 16.2332 80.4893 19.2343C80.4893 22.7811 77.6648 24.7591 72.7892 24.7591Z" fill="currentColor"></path><path d="M99.0846 24.2816H94.2426L89.1989 16.0968L86.5762 18.7569V24.2816H82.4067V0H86.5762V13.9824L93.6374 6.68427H98.6811L92.1243 13.3344L99.0846 24.2816Z" fill="currentColor"></path><path d="M110.149 11.1177L111.562 6.68427H116L109.309 25.714C108.603 27.6579 107.728 29.0561 106.619 29.8405C105.509 30.6249 103.929 31 101.844 31C101.138 31 100.533 30.9659 99.9946 30.8977V27.5215H101.609C103.525 27.5215 104.467 26.3278 104.467 24.6909C104.467 23.8724 104.198 22.6788 103.66 21.1441L98.616 6.68427H103.189L104.601 11.0836C105.644 14.3916 106.551 17.6656 107.358 20.9054C108.098 18.1089 109.04 14.835 110.149 11.1177Z" fill="currentColor"></path></svg></figure></a><a href="https://bsky.network/docs/bluesky-api"><h3>Bluesky API</h3><p>Develop against Bluesky. Work with profiles, posts, threads, relationships, interactions, and feeds.</p>Learn More →</a><a href="https://endpoints.bsky.app/"><h3>HTTP Reference</h3><p>Browse every API endpoint used by Bluesky, with full request and response schemas.</p>Learn More →</a><a href="https://atproto.com">AT Protocol</a><a href="https://atproto.com/guides/tutorials"><h3>Tutorials</h3><p>Step-by-step guides for building on the AT Protocol — custom feeds, bots, and more.</p>Learn more →</a><a href="https://atproto.com/sdks"><p>Reference and community SDKs for TypeScript, Go, and many others.</p>Learn more →</a></p>
<blockquote>but <em>hooking people together</em>.</blockquote>
