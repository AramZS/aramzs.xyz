---
author: 50 Shades of Protocol
cover_image: >-
  https://pckt-blog-media.s3.us-east-2.amazonaws.com/cover_image/ca2568bc-5e23-4819-b387-389a412aa31e/amtosphere-in-a-box.webp
date: '2026-09-23T16:58:30.675Z'
dateFolder: 2026/09/23
description: >-
  This has been the year of ATprotocol development for me, starting with
  Stratos, A social-app fork and then starting my own business focused on
  building local fi...
isBasedOn: 'https://50-shades.pckt.blog/atmosphere-in-a-box-all-your-sandbox-needs-dwkr23r'
link: 'https://50-shades.pckt.blog/atmosphere-in-a-box-all-your-sandbox-needs-dwkr23r'
slug: >-
  2026-09-23-https50-shadespcktblogatmosphere-in-a-box-all-your-sandbox-needs-dwkr23r
tags:
  - tech
  - decentralization
title: Atmosphere in a Box - All your sandbox needs
---
<p>This has been the year of ATprotocol development for me, starting with <a href="https://chipnick.com/stratos-lets-get-technical/">Stratos</a>, A <a href="https://github.com/NorthskySocial/northsky-social-app">social-app fork</a> and then starting <a href="https://eskahlay.com">my own business</a> focused on building local first decentralized tech on protocol. For every project I'm doing some pretty intense testing with a variety of tools and apparatuses for exhaustive testing to confirm everything functions. For some things I'm working on I need a large number of PDS users which has occasionally been noticed.</p>
<p>Hey, this is still yours? Do you have a spam problem there, or is this all testing accounts?</p>
<figure><img alt="Image from post" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:oio4hkxaop4ao4wz2pp3f4cr/bafkreidzbz2ipu7cmxwuhpir3uxccu4bojwvrn7f5mwwy7ortvxzxblr2q"/><figcaption>Image from post</figcaption></figure>
<figure><img alt="Image from post" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:oio4hkxaop4ao4wz2pp3f4cr/bafkreiev3wqu6auf5jxj4qfclpzk4qnqijxscnm7negoicp56u23in73qy"/><figcaption>Image from post</figcaption></figure>
<p>In case anyone was wondering why I asked this</p>
<figure><img alt="Lexicon metrics from lexicon.garden showing roughly 40k records on the firehose for a lexicon not mentioned. " src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:lrphxvv25aibthe7xoc2eeyy/bafkreifvhgy7jkefv34xj5aixorf2ldx6ntu2cx326wt3to5uncksgkjwq"/><figcaption>Lexicon metrics from lexicon.garden showing roughly 40k records on the firehose for a lexicon not mentioned. </figcaption></figure>
<p>How does one prevent a fuckload of test accounts records from getting pulled into the relay. Kinda want to avoid getting my local pds banned or something.</p>
<p>And earlier this year while doing some intense load testing of Stratos to resolve bottlenecks I unintentionally generated 200k+ records causing an unusual spike in network metrics all because I was using a development pds that was on the relay.</p>
<p>Even when using a PDS that is not on the network, creating these dids would end up in the PLC effectively polluting it. So when I need one or more PDS, am doing some testing that requires quite a few users or creating lots of records, I needed a way to do it in a way that was offline.</p>
<p>But then when I do it offline, OAuth rears its magnificently hideous head and reminds me that I need SSL to function and localhost only gets me so far so then I'm using ngrok that requires I injected a header to bypass the consent screen which I drop in favor of cloudflare ssl tunnels which requires I do a little chicken dance to get the tunnel ready before I start everything else and remember what chicken-hamburger-dance and floating-tulip-butt refer to.</p>
<p>In the end I sat down, created a bunch of docker compose files with some scripts and ended up with a local private environment where I can run my own PLC with however many PDS instances I need with TLS. The result of that?</p>
<p><a href="https://tangled.org/kandake.africa/atmosphereinabox">Atmosphere In a Box</a> is quite simply, a sandbox for developing ATprotocol services without needing any external dependencies like a PDS or PLC. It's built with CoreDNS and Caddy to handle the networking then a PLC and as many PDS as you need run on top.</p>
<p>It's setup to use a deno cli rather than the messy scripts that once existed which means that to setup the base you simply run:</p>
<pre><code>deno task install
deno task sandbox create --pds 3 --users-per-pds 2
deno task sandbox up --build
deno task sandbox seed</code></pre>
<p>And you've now got your local sandbox! You can either run a separate compose stack and bridge it over the atmosbox network or add services directly into the stack. I've included an oauth app based off a bluesky cookbook since you'll likely want to access through a web browser. To use that you instead run the following create command which uses a pre defined template (you can create your own) then start it:</p>
<pre><code>deno task sandbox create --pds 1 --users-per-pds 1 --preset external-access</code></pre>
<p>Since this is a private network with TLS it does mean that to access in a web browser you have to do two things:</p>
<ol start="1"><li>Trust the generated CA (or bring your own)</li><li>route atmosbox.test and atmosbox.internal to CoreDNS or just add all the hostnames to your hosts file pointing to the relay IP that routes the requests. </li></ol>
<p>Then you can access the services locally.</p>
<p>I've been using this setup and it has been working really well for me as I have integration tests and others that are running locally with it. The next step is to add it into CI so I can run automated tests without worrying about the availability of an external service.</p>
