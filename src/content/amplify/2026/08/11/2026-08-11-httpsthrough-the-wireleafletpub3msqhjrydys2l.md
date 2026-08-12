---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Aah4qt2skh2vxhbmymo4z24gy/3msjbu5kunc2w/3msqhjrydys2l/opengraph-image-1qv6ug?f56b674a1cd0255e
date: '2026-08-11T15:11:14.557Z'
dateFolder: 2026/08/11
description: >-
  Last weekend I was just scrolling and had an idle thought. A couple of times I
  started posts to say something like “I bet somebody could do something with
  this” but both disappeared mid-draft.
isBasedOn: 'https://through-the-wire.leaflet.pub/3msqhjrydys2l'
link: 'https://through-the-wire.leaflet.pub/3msqhjrydys2l'
slug: 2026-08-11-httpsthrough-the-wireleafletpub3msqhjrydys2l
tags:
  - tech
  - social media
  - decentralization
title: On making Meme Museum
---
<figure><img alt='An abstract, stylized graphic suggesting a wall in a museum. Two rectangles of slightly different sizes resemble matted, framed artwork. Below them, a brick-red curve resembling a velvet rope hanging from two black "stanchions." Maybe it also suggests a smiling face?' src="https://through-the-wire.leaflet.pub/api/atproto_images?did=did:plc:ah4qt2skh2vxhbmymo4z24gy&amp;cid=bafkreidmbvwkhpf6sfi7g34j5djueuxwunxcuoq55lr6fgw4yuhoe62ole&amp;width=1200&amp;v=1"/><figcaption>An abstract, stylized graphic suggesting a wall in a museum. Two rectangles of slightly different sizes resemble matted, framed artwork. Below them, a brick-red curve resembling a velvet rope hanging from two black "stanchions." Maybe it also suggests a smiling face?</figcaption></figure>
<p>Last weekend I was just scrolling and had an idle thought. A couple of times I started posts to say something like “I bet somebody could do something with this” but both disappeared mid-draft.<sup>1</sup> After the second one, I thought maybe I should just do it myself.</p>
<p>In short, the idea is something that helps you if you like to post memes to BlueSky. A little image gallery tool. A sort of a Meme Museum.</p>
<p>I registered <a href="https://meme-museum.at/">meme-museum.at</a> and started hashing it out with Claude. After a bit more than a dozen hours of fiddling, I may as well put it out there.</p>
<p>I'm not actually a person who posts a lot of memes, and a tool like this outside of an actual client has some friction, sure. But making it has been fun, and it gives me an excuse to talk about a tech thing that I think is super exciting, even inspiring, at a time when so much about tech is terrible.</p>
<p>The app is something that only makes sense in the context of the <a href="https://atmosphereaccount.com/">atmosphere</a>, the world of apps that take advantage of the AT Protocol, also known as atproto.</p>
<p>Atproto was designed to make BlueSky possible, but it's actually a generalization of a lot of best practices for building multi-user applications that can work at full web-scale. When developers realize how atproto is way more than social media, their eyes usually light up.</p>
<p>First, this app only makes sense in the atmosphere because I don't need any permission and I don't have to pay any fees to help people make BlueSky posts. Twitter and Reddit have jacked up their API fees in recent years, and Meta and TikTok are even more notoriously insular. There's just no way to make something like this for any of them.</p>
<p>With atproto, any web developer can get, for free, a sign-in system and a place to store stuff. If you don't build for the web, that may sound like no big deal, but trust me that it opens up an enormous range of possibility. The sign-in system works with static web pages, which means that the setup and ongoing maintenance are close to free.</p>
<p>You also get, for free, a way for people to “find their friends” if your app needs that. Anything social gets complicated for human reasons as well as for technical reasons, so I'm holding off for now.</p>
<p>Those kinds of features would take things beyond the static web page level, but even so, the likely technology cost could stay close to zero for quite a while.</p>
<p>When the cost of making and delivering apps drops so low, lots more people can bring their creativity to the mix. That's awesome!</p>
<p>Atproto also lowers the cost for people to try new apps. Logging in is a breeze; no new password to remember. It feels a lot like “sign in with Google”, which a lot of people are comfortable with. But if BlueSky turns evil and you want to exit, they don't own your account. There are multiple alternatives running today and BlueSky can't stop you from picking another one and taking all of your “stuff” with you. All the places you've been logging into with your atmosphere account will pick up on the change automatically.</p>
<p>If you spend some time building up your own meme gallery, every single client that people use to post to the Atmosphere could add a “pick one of your memes” feature in hours, not days. Microblogging clients like BlueSky, BlackSky, Mu.social… but also longform clients like Leaflet, Pckt and Offprint. Anything that can use an image! They don't have to pay me or even ask me and if I walk away, it still works.</p>
<p>Maybe memes aren't the killer app here, but <a href="https://variety.com/2026/digital/news/letterboxd-sales-talks-netflix-sony-paramount-1236806379/">the movie logging app Letterboxd is apparently up for sale</a>. If someone buys it and enshittifies it, that will be very frustrating for people who invested a lot of time curating their movies. If Letterboxd had been an atmosphere app, it would be no news at all.</p>
<p>It would be no news at all because everyone would still have their movie collection and could use other applications to manage and add to it.</p>
<p>Not only that, but creative developers could build completely different things to do with movies:</p>
<ul><li><p data-index="20.1">Finding showtimes needs a database, but someone could build an app that makes it easy for each theater to publish its showtimes to the atmosphere, making it super easy for anyone to make a database of them without having to crawl the web or develop business relationships to collect the data</p></li></ul>
<p>And, once you start thinking down this road, there are obvious opportunities with books, podcasts and surely lots more. All of this could break the stranglehold that big platforms have on our attention.</p>
<p>If you're newish to thinking about the Atmosphere, you may not realize that (for now) everything stored in your atmosphere account is public. In this possible world of personal atmosphere movie collections, Netflix (or whoever) could already have sucked up all that information, so there wouldn't be much to buy anyway.</p>
<p>It's understandable that you might not like that. Many people want privacy about their media choices. After all, back when actually legislating was a thing, the US Congress passed <a href="https://en.wikipedia.org/wiki/Video_Privacy_Protection_Act">a law limiting access to people's video rental history</a>. People are also just tired of big companies sucking up all their data and then holding it hostage to recurring fees or annoying advertising.</p>
<p>It's complicated, but Atmosphere architects are hashing out a solution which they call “<a href="https://github.com/bluesky-social/proposals/tree/main/0016-permissioned-data">permissioned data</a>.” Permissioned data will give people clear control over who has access to their data. It's not clear when that will be settled but there are a lot of smart people thinking about it and even putting the current thinking to the test in prototype software.</p>
<p>Besides privacy, permissioned data should open up more opportunities for monetization, like subscriber-only content. The power dynamics between creators, audiences, and middlemen will likely be a lot different.</p>
<p>I'm curious to see whether anyone actually wants to use Meme Museum. Like I said, it's not really something I need, but someone else does?</p>
<p>But I'm more curious to see if other people, especially less tech-oriented people see the broader potential. If something about this gets you thinking or raises questions, let me know!</p>
<p>And if you're interested in more technical details, I put that in <a href="https://through-the-wire.leaflet.pub/3msqkaw475s2q">a separate post</a>.</p>
<p>To be honest, I got hung up trying to figure out the right service-neutral way to say what anyone less fussy would just call a “BlueSky post” But it's important to recognize alternatives like BlackSky, Eurosky, and more. I'm looking forward to someone settling the vocab question for us!</p>
