---
author: Ben Werdmuller
cover_image: >-
  https://images.unsplash.com/photo-1548192746-dd526f154ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGluZGllfGVufDB8fHx8MTc0OTY5ODcxM3ww&ixlib=rb-4.1.0&q=80&w=2000
date: '2026-05-12T05:47:49.975Z'
dateFolder: 2026/05/12
description: >-
  "When you all give us your hard-earned money, we feel a deep responsibility to
  use it as well, and as efficiently, as possible." A responsibility A New
  Social lives up to in spades.
isBasedOn: >-
  https://werd.io/bridging-feels-seamless-behind-the-scenes-its-a-technical-marvel/
link: >-
  https://werd.io/bridging-feels-seamless-behind-the-scenes-its-a-technical-marvel/
slug: >-
  2026-05-12-httpswerdiobridging-feels-seamless-behind-the-scenes-its-a-technical-marvel
tags:
  - tech
title: 'Bridging feels seamless. Behind the scenes, it''s a technical marvel'
---
<p>I’ve been in awe of <a href="https://snarfed.org/?ref=werd.io">Ryan Barrett</a> since I first met him over a decade ago. He cofounded <a href="https://cloud.google.com/appengine?ref=werd.io">Google App Engine</a> and led engineering at <a href="https://www.color.com/?ref=werd.io">Color Health</a>. His <a href="https://fed.brid.gy/?ref=werd.io">Bridgy</a> tool, which allows people on different protocols and networks to follow and converse with each other, is now the basis of <a href="https://anew.social/?ref=werd.io">A New Social</a>, the open social web non-profit that he runs with <a href="https://augment.ink/?ref=werd.io">Anuj Ahooja</a>. (Disclosure: I’m on the board.)</p>
<p>This post about how he reduced Bridgy costs is brilliantly detailed. It’s a good look into what’s involved when you need to refactor and reduce cost at scale — and what’s remarkable is how effective this work actually was.</p>
<blockquote>“The end result of all of this is that we grew from 2k users to almost 150k, added a ton of heavy new functionality, and still managed to optimize and cut down costs from $.15 per active user per month to just $.03 or so.”</blockquote>
<p>But it didn’t come easily. When you’re connected to the kinds of firehoses that Bridgy needs to be, and serving the kind of traffic it’s starting to handle, every optimization really counts. Because it’s open-source, you can <a href="https://github.com/snarfed/arroba/issues/88?ref=werd.io">dig down into individual optimizations</a> and follow along each exploration. It’s painstaking work and a demonstration of their commitment to financial responsibility. Try vibe coding <em>that</em>.</p>
<p>Bridgy (and its parent A New Social) exists to help make the individual protocols less important: everyone should be able to collaborate with everyone else regardless of which platform they’re using. It’s the kind of thing that feels easy in the moment — but as this post proves, it’s far from simple under the hood.</p>
