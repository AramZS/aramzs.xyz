---
author: stream.place
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A2zmxikig2sj7gqaezl5gntae/3lusxwydhqs2i/3micfu6ifyk2a/opengraph-image?e2bb7203df6d3028
date: '2026-03-31T04:15:45.815Z'
dateFolder: 2026/03/31
description: omg vod vod vod vod vod!!!!
isBasedOn: 'https://blog.stream.place/3micfu6ifyk2a?auth_completed=true'
link: 'https://blog.stream.place/3micfu6ifyk2a?auth_completed=true'
slug: 2026-03-31-httpsblogstreamplace3micfu6ifyk2aauthcompletedtrue
tags:
  - tech
  - decentralization
title: Streamplace VOD JAM
---
<p>ATmosphereConf 2026 was recorded live on <a href="https://stream.place">Streamplace</a>. All talks are now available as VODs stored on our new beta Video on Demand service. But there's no frontend yet. That's where you come in.</p>
<p>In a world where Streamplace and the AT Protocol are successful, there won't be just one app or website for everyone's content. Solving video for everybody forever means: many apps, many websites, thousands of unique experiences for every situation. We want your take!</p>
<p>DURATION: <a href="https://countdown.stream.place/2026-04-13T06:59:59.999Z">Submissions will close in two weeks: Sun Apr 12, at 11:59 PDT</a>.</p>
<p>REQUIREMENTS: Your app or website has to show the AtmosphereConf VODs, one way or another. Websites must be accessible on the public internet. Native apps must have clear instructions for building and installation. Within those parameters, get creative!</p>
<p>SUBMISSION:</p>
<ul><li><p data-index="6.2">If you're working as part of a team, make sure to tag all your team members in the submission!</p></li><li><p data-index="6.3">If you use AI to help create the app, please let us know what you used, either in the README or in the commit descriptions.</p></li></ul>
<p>PRIZE: All valid submissions will receive a VOD badge that may be equipped to show up next to your name in Streamplace chat from now until the end of time. Show off that you were here when it all started!</p>
<p>We wanted to get the VODs out as quickly as possible, but they're rough at the moment; the timestamps need to get sliced nicely. We'll be cleaning them up over the course of the jam — by the end we'll have working apps with clean video! Other things that will be added as we go:</p>
<p>We'll update this post as we get things polished.</p>
<p>Every talk is a <code>place.stream.video</code> record in the <code>did:plc:rbvrr34edl5ddpuwcubjiost</code> repository (<a href="https://bsky.app/profile/stream.place">@stream.place</a>). You can list them all <a href="https://pds.ls/at://did:plc:rbvrr34edl5ddpuwcubjiost/place.stream.video">on pds.ls</a>.</p>
<p>Each record looks like this:</p>
<pre><code>{
  "$type": "place.stream.video",
  "title": "How Streamplace Works: VODs",
  "source": {
    "ref": "bafkr4igmxmm3dei6tsgmwmfyuyyas74dlmminco5zfhad3lcinm3q3aa4e",
    "size": 1448011796,
    "$type": "place.stream.muxl.defs#archiveBlob",
    "mimeType": "video/mp4"
  },
  "creator": "did:plc:jcahd7fl7h23c24ftxuhkhiw",
  "duration": 2019548316666,
  "createdAt": "2026-03-28T23:44:48Z",
  "livestream": {
    "cid": "bafyreifdrkhtt2gpeqxq26aqb64rfsxhc6eysfjksldkaw6os4ihck4za4",
    "uri": "at://did:plc:jcahd7fl7h23c24ftxuhkhiw/place.stream.livestream/3mi5stzyxji2e"
  }
}</code></pre>
<p>Key fields:</p>
<p>The <code>livestream</code> field links back to the original <code>place.stream.livestream</code> record if you want additional context about the stream.</p>
<p>We have a beta service set up for this at <code>vod-beta.stream.place</code>, and the data structures and XRPC endpoints may change as we move toward generally-available VOD. The primary XRPC that you'll need is <code>place.stream.playback.getVideoPlaylist</code>, which returns a standard HLS CMAF playlist.</p>
<p>Given a record URI like <code>at://did:plc:rbvrr34edl5ddpuwcubjiost/place.stream.video/3mi2ikg6gij26</code>, you'll want to hit:</p>
<pre><code>
https://vod-beta.stream.place/xrpc/place.stream.playback.getVideoPlaylist?uri=at://did:plc:rbvrr34edl5ddpuwcubjiost/place.stream.video/3mi2ikg6gij26

</code></pre>
<p>Good luck and happy vodding!</p>
