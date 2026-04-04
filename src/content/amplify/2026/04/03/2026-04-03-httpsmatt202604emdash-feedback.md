---
author: Matt
cover_image: >-
  https://jetpack.com/redirect/?source=sigenerate&query=t%3DeyJpbWciOiJodHRwczpcL1wvbWEudHRcL2ZpbGVzXC8yMDIxXC8wNVwvUGhvdG8tb24tMjAyMC0xMC0yOC1hdC0yLjA1LVBNLTEtMTAyNHg2ODIuanBnIiwidHh0IjoiRW1EYXNoIEZlZWRiYWNrIiwidGVtcGxhdGUiOiJmdWxsc2NyZWVuIiwiZm9udCI6IiIsImJsb2dfaWQiOjEwNDc4NjV9.HVLctx38IbN8a85SQpXZKZ8Eyl0CCY2Uz7F--TlE80wMQ
date: '2026-04-03T11:47:15.280Z'
dateFolder: 2026/04/03
description: >-
  So, two other Matts at Cloudflare announced EmDash — the spiritual successor
  to WordPress that solves plugin security. (Is it nominative determinism or a
  simulation glitch that everyone trying to t…
isBasedOn: 'https://ma.tt/2026/04/emdash-feedback/'
link: 'https://ma.tt/2026/04/emdash-feedback/'
slug: 2026-04-03-httpsmatt202604emdash-feedback
tags:
  - code
  - tech
title: EmDash Feedback
---
<p>(Is it <a href="https://en.wikipedia.org/wiki/Nominative_determinism">nominative determinism</a> or a simulation glitch that everyone trying to terraform the web has some variation of “Matthew” in their name? I was in a call set up by Matthew Prince, talking to Matt Taylor and Matt Kane, with my right hand there, <a href="https://matiasventura.com/">Matías</a>.)</p>
<p>First, I’m going to tell you why this isn’t spiritually tied to WordPress at all, then why they haven’t solved plugin security, and finally offer some suggestions.</p>
<h2>The Spirit of WordPress</h2>
<p>WordPress exists to democratize publishing. That means we put it <a href="https://ma.tt/2026/03/wordpress-everywhere/">everywhere</a>. You can run WordPress on a Raspberry Pi, on your phone, on your desktop, on a random web host in Indonesia charging 99 cents a month, and you can run it scaled up on AWS or across multiple datacenters.</p>
<p>The same code. When you download <a href="https://wordpress.org/playground/">WordPress Playground</a> you’re running the same code that’s being attacked a thousand times a second at <a href="https://www.whitehouse.gov/">WhiteHouse.gov</a>. That’s what we mean when we say <em>democratization</em>.</p>
<p>It’s all built on open source and web standards. You can run it anywhere; there’s no lock-in.</p>
<p>That’s why we do what we do. It’s really hard. You can come after our users, but please don’t claim to be our spiritual successor without understanding our spirit.</p>
<h2>The Spirit of EmDash</h2>
<p>I think EmDash was created to sell more Cloudflare services. And that’s okay! It can kinda run on Netlify or Vercel, but good stuff works best on Cloudflare. This is where I’m going to stop and say, I really like Cloudflare! I think they’re one of the top engineering organizations on the planet; they run incredible infrastructure, and their public stock is one of the few I own. And I love that this is open source! That’s more important than anything. I will never belittle a fellow open source CMS; I only hate the proprietary ones.</p>
<p>If you want to adopt a CMS that will work seamlessly with Cloudflare and make it hard for you to ever switch vendors, EmDash is an incredible choice.</p>
<h2>Claimed Plugin Security</h2>
<p>In another example of them not understanding the spirit of WordPress, the fact that plugins can change every aspect of your WordPress experience is a feature, not a bug! And their sandboxing breaks down as soon as you look at what most WordPress plugins do.</p>
<p>I know we get a bad rep because there are 62k plugins with wildly variable engineering quality, and more every day, and when one installed on 0.01% of our user base has a vulnerability, a bunch of websites write breathless articles that get clicks saying “122,000 WordPress Sites Vulnerable!”</p>
<p>That, by the way, I think we’ll be able to fix in the next 18 months with AI. The plugin security <strong>only</strong> works on Cloudflare.</p>
<h2>Critical Feedback</h2>
<p>As I said, we had a call with Cloudflare on March 23rd, where they asked for feedback on this thing they built but didn’t tell us the name, said it would probably launch in their developer week towards the end of April, and some top colleagues and I offered to help. I wish I could say the things I’m saying in this blog post on that call, and if they had just shared the announcement post I could have, but in the spirit of open source here’s what I would have said:</p>
<ol> <li>If they had said the name I would have asked if they had any other options because I have an <a href="https://emdash.codes/">amazing colleague named Emdash</a> who is doing some of the most exciting stuff with WordPress and AI. (BTW I think our Em will have more impact on the web than this in five years.)</li> <li>I actually think the product is very solid, there’s some excellent engineering, migration tools, it’s very fast, and the Astro integration is nice.</li> <li>I’d be surprised if this doesn’t get tens of thousands of sites on it.</li> <li>The UI is in the <a href="https://en.wikipedia.org/wiki/Uncanny_valley">uncanny valley</a> of being sorta-WordPress sorta-not. I know it wasn’t a weekend vibecode project, but it has some of that smell. Stuff breaks at the edges.</li> <li>I think using TinyMCE is a regression, and they should adopt <a href="https://github.com/wordpress/gutenberg">Gutenberg</a>, which we licensed and created to be used by other CMSes.</li> <li><a href="https://github.com/emdash-cms/emdash/tree/main/skills">The Skills are amazing</a>, a brilliant strategy, and we need to do the same as soon as possible. I’ve been working on something similar and got some good ideas from their implementation.</li> <li>I’m not going to say which parts, but they copied a lot of things we’re planning to kill. Build from first principles. Make it better. Skate to where the puck is going.</li> </ol>
<p>There’s a new CMS every other day. And that’s great! I love building CMSes and I totally get why other people do, too.</p>
<h2>In Conclusion</h2>
<p>Some day, there may be a spiritual successor to WordPress that is even more open. When that happens, I hope we learn from it and grow together. Until then, please keep the WordPress name out of your mouth.</p>
