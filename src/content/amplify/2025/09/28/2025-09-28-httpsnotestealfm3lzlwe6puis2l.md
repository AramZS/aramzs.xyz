---
author: teal.fm
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Aiwhuynr6mm6xxuh25o4do2tx/Teal%2520Notes/3lzlwe6puis2l/opengraph-image?04f9dc33b3d4fbe5
date: '2025-09-28T17:09:31.096Z'
dateFolder: 2025/09/28
description: 'what we''re doing now, and where we are going from here'
isBasedOn: 'https://notes.teal.fm/3lzlwe6puis2l'
link: 'https://notes.teal.fm/3lzlwe6puis2l'
slug: 2025-09-28-httpsnotestealfm3lzlwe6puis2l
tags:
  - code
  - music
  - decentralization
title: how i'm feeling now
---
<figure><img alt="matprotocol's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:tas6hj2xjrqben5653v5kohk/bafkreifikgubrjlqzu7zst2yiwizjouvu6yoocnbumiywov7idd3g5agxu@jpeg"/><figcaption>matprotocol's avatar</figcaption></figure>
<p>On Friday, September 19th of 2025, I (<a href="https://bsky.app/profile/did:plc:tas6hj2xjrqben5653v5kohk">@mmatt.net</a>) sent out a Bluesky post asking for community feedback on how exactly the public listens to their music nowadays. I also sent a similar line of questioning to my friends at <a href="https://bsky.app/profile/gusic.opn.haus">@gusic.opn.haus</a>. These antics all have the goal of: let's get people tracking on Teal.</p>
<p>Community member <a href="https://bsky.app/profile/did:plc:rnpkyqnmsw4ipey6eotbdnnf">@baileytownsend.dev</a> has been tracking his music listening habits on Teal since <a href="https://pdsls.dev/at://did:plc:rnpkyqnmsw4ipey6eotbdnnf/fm.teal.alpha.feed.play">around May of this year</a>, using our work-in-progress tracking solution: piper [<a href="https://github.com/teal-fm/piper">github</a>, <a href="https://tangled.org/@teal.fm/piper">tangled</a>]. Piper has been built up by Bailey, <a href="https://bsky.app/profile/did:plc:k644h4rq5bjfzcetgsa6tuby">Natalie</a>, and Loveless to be our first party tracking solution. Right now, it currently supports Spotify and (experimental) <a href="https://Last.fm">Last.fm</a> syncing. I'll let one of them do the talking on the technical details about piper (I know about as much <code>go</code> as I know Spanish) on a later note, but for now what you need to know is that it polls your streaming service of choice for what you are listening to and makes a <a href="https://Teal.fm">Teal.fm</a> record (<code>fm.teal.alpha.feed.play</code>) for what you're currently listening to.</p>
<p>I want to open up a public instance of piper for everyone to use to start tracking their listening now while we are getting the frontend application ready to use.</p>
<p>Before we get too into the weeds, let's back up and explain how <a href="https://Teal.fm">Teal.fm</a> works.</p>
<p>Teal is built in three parts.</p>
<p>1. The Frontend Application</p>
<ul><li><p data-index="8.0">This will be the <a href="https://bsky.app">bsky.app</a> of Teal. You'll be able to view your profile with your plays, along with other profiles. You'll be able to make posts with songs, interact with other posts (likes/reposts/comments), view your timeline, etc. This will be what replaces the current landing page at <a href="https://teal.fm">teal.fm</a>, and will also be our mobile app.</p> </li></ul>
<p>2. Our AppView/API</p>
<ul><li><p data-index="10.0">Handles everything to get data from our database &amp; your PDS, onto your screen through the Frontend Application.</p> </li></ul>
<p>3. The Song Tracker / Stamper / Song Ingest</p>
<ul><li><p data-index="12.0">This is the part that actually tracks what you are listening to. In the future, this (referring to piper) may be integrated into the Frontend Application so that you have a seamless experience connecting your accounts.</p> </li><li><p data-index="12.1">Piper is our first party effort at this. However, anyone is more then welcome to build one for themselves. All it takes is 1. a way to programmatically pick up to what you are listening to, and 2. a way to create a <code>fm.teal.alpha.feed.play</code> record on your PDS. Your PDS and our AppView take care of the rest. </p> </li></ul>
<h3 data-index="13">i finally understand: Now, did the audience help answer your question?</h3>
<p>Yes! Thank you everyone for the responses on my original post, I really appreciate it! Here are the main things I've gathered.</p>
<p>1. Spotify Support</p>
<p>2. YouTube Music / Tidal Support</p>
<ul><li><p data-index="18.0">A lot of y'all use YouTube Music and Tidal. At this time, both of these services' API aren't friendly enough to provide us with the data we need for tracking your listening. Tidal has native <a href="https://Last.fm">Last.fm</a> support, which means you can use piper's <a href="https://Last.fm">Last.fm</a> syncing to get tracking from Tidal. YouTube on the other hand has nothing of the sort. The best way to go about tracking your listening on YouTube is by using a web browser and the <a href="https://webscrobbler.com/">WebScrobbler extension</a>.</p> </li></ul>
<p>3. Apple Music Support</p>
<ul><li><p data-index="20.0">I really want Apple Music support on piper. Luckily enough, Bailey has guided me in the right direction with the MusicKit documentation to where Apple Music support should be coming soon to piper. No promises haha, but everything is pointing in the direction of this being possible!</p> </li></ul>
<p>4. (lovingly) You Guys Are Nerds</p>
<ul><li><p data-index="22.0">A significant portion of the replies here have made me realize, (in a very positive tone) you guys are nerds! I mean, I can't say much because I'm the huge nerd who wanted this project to exist, but y'all surprised me here!</p> </li><li><p data-index="22.1">Quite a bit of repliers use modified Streaming Service clients, local files on various media server software and local music software, Linux &amp; Android, internet radios, etc. etc.</p> </li><li><p data-index="22.2">Any non-streaming service stuff is outside of the scope of piper BUT, making some of these work isn't outside of our thought bubble, just might be the lowest on the priority. Foobar2000/MusicBee/Jellyfin plugins are doable. A lot of the other stuff would either require modifying the client itself, or using a Desktop Application to listen to your system's "Now Playing" status. This stuff, again, wouldn't be immediately ignored by us, but it's just the lowest priority.</p> </li><li><p data-index="22.3">The best part of Teal is how incredibly open ATProto is. If we don't make a way to track your music from your favorite niche music software, you are more then welcome to make your own! You don't need our approval or verification to make additions to your own listening history.</p> </li></ul>
<p>5. WebScrobbler</p>
<ul><li><p data-index="24.0">Mentioned above, WebScrobbler is a browser extension for submitting your listening status to services like <a href="https://Last.fm">Last.fm</a> or <a href="https://listenbrainz.org/">ListenBrainz</a>. We have been thinking about trying our hand at getting Teal added as a service to the extension! It would vastly improve the number of services you can submit to, such as YouTube, Soundcloud, Bandcamp streaming, and more. I personally use WebScrobbler all the time for watching music videos on YouTube and listening to tunes on Soundcloud. Should be easy enough, especially if we implement compatible <a href="https://Last.fm">Last.fm</a> / ListenBrainz API routes into piper.</p> </li></ul>
<p>6. Compatible <a href="https://Last.fm">Last.fm</a> / ListenBrainz API routes</p>
<ul><li><p data-index="26.0">These routes would make it easier to integrate Teal into existing plugins, services, and applications. This has been something we've been wanting to add to Teal since day one, so these will be coming sooner or later.</p> </li></ul>
<h3 data-index="27">forever: Our priorities as of now, and where we're going.</h3>
<p>In regards to piper, our priority right now is:</p>
<p>1. Apple Music</p>
<p>2. <a href="https://Last.fm">Last.fm</a> / ListenBrainz API compatibility</p>
<p>3. WebScrobbler support (not apart of piper, but y'know)</p>
<p>5. everything else.</p>
<p>In regards to the project as a whole:</p>
<p>1. Get a public piper instance running &amp; getting everyone to start tracking.</p>
<p>2. Refine frontend experience to focus on music tracking/statistics, and make it available to use to everyone on the web.</p>
<p>3. Roll out the Social Side.</p>
<h3 data-index="40">anthems: From the heart, to the reader.</h3>
<p>Thank you for reading the first Teal Note, I really appreciate it! Thank you for replying to my post, I appreciate it a ton! And most importantly, thank you for caring about Teal.fm. I see your pleads for the best place for tracking and sharing music! With both me and Natalie being occupied full time (me: full time student &amp; part time retail, Natalie: full time <a href="https://stream.place">@stream.place</a>) it may take a while for the visions of Teal to truly come to fruition, but this limbo of waiting will hopefully be worth it.</p>
<p>With Love,</p>
<p>Matt M.</p>
