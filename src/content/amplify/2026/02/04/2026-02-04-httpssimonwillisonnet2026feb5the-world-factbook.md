---
author: Simon Willison
cover_image: 'https://static.simonwillison.net/static/2025/factbook-2020-card.jpg'
date: '2026-02-05T02:23:43.437Z'
dateFolder: 2026/02/04
description: >-
  Somewhat devastating news today from the CIA: One of CIA’s oldest and most
  recognizable intelligence publications, The World Factbook, has sunset.
  There's not even a hint as to why they …
isBasedOn: 'https://simonwillison.net/2026/Feb/5/the-world-factbook/'
link: 'https://simonwillison.net/2026/Feb/5/the-world-factbook/'
slug: 2026-02-04-httpssimonwillisonnet2026feb5the-world-factbook
tags:
  - media
  - politics
  - baselines
title: Spotlighting The World Factbook as We Bid a Fond Farewell
---
<p><strong><a href="https://www.cia.gov/stories/story/spotlighting-the-world-factbook-as-we-bid-a-fond-farewell/">Spotlighting The World Factbook as We Bid a Fond Farewell</a></strong> (<a href="https://news.ycombinator.com/item?id=46891794">via</a>) Somewhat devastating news today from the CIA:</p>
<blockquote> <p>One of CIA’s oldest and most recognizable intelligence publications, The World Factbook, has sunset.</p> </blockquote>
<p>There's not even a hint as to <em>why</em> they decided to stop maintaining this publication, which has been their most useful public-facing initiative since 1971 and a cornerstone of the public internet since 1997.</p>
<p>In a bizarre act of cultural vandalism they've not just removed the entire site (including the archives of previous versions) but they've also set every single page to be a 302 redirect to their closure announcement.</p>
<p>The Factbook has been released into the public domain since the start. There's no reason not to continue to serve archived versions - a banner at the top of the page saying it's no longer maintained would be much better than removing all of that valuable content entirely.</p>
<p>Up until 2020 the CIA published annual zip file archives of the entire site. Those are available (along with the rest of the Factbook) <a href="https://web.archive.org/web/20260203124934/https://www.cia.gov/the-world-factbook/about/archives/">on the Internet Archive</a>.</p>
<p>I downloaded the 384MB <code>.zip</code> file for the year 2020 and extracted it into a new GitHub repository, <a href="https://github.com/simonw/cia-world-factbook-2020/">simonw/cia-world-factbook-2020</a>. I've enabled GitHub Pages for that repository so you can browse the archived copy at <a href="https://simonw.github.io/cia-world-factbook-2020">simonw.github.io/cia-world-factbook-2020/</a>.</p>
<figure><img alt="Screenshot of the CIA World Factbook website homepage. Header reads &quot;THE WORLD FACTBOOK&quot; with a dropdown labeled &quot;Please select a country to view.&quot; Navigation tabs: ABOUT, REFERENCES, APPENDICES, FAQs. Section heading &quot;WELCOME TO THE WORLD FACTBOOK&quot; followed by descriptive text: &quot;The World Factbook provides information on the history, people and society, government, economy, energy, geography, communications, transportation, military, and transnational issues for 267 world entities. The Reference tab includes: a variety of world, regional, country, ocean, and time zone maps; Flags of the World; and a Country Comparison function that ranks the country information and data in more than 75 Factbook fields.&quot; A satellite image of Earth is displayed on the right. Below it: &quot;WHAT'S NEW :: Today is: Wednesday, February 4.&quot; Left sidebar links with icons: WORLD TRAVEL FACTS, ONE-PAGE COUNTRY SUMMARIES, REGIONAL AND WORLD MAPS, FLAGS OF THE WORLD, GUIDE TO COUNTRY COMPARISONS. Right side shows news updates dated December 17, 2020 about Electricity access and new Economy fields, and December 10, 2020 about Nepal and China agreeing on the height of Mount Everest at 8,848.86 meters. A &quot;VIEW ALL UPDATES&quot; button appears at the bottom." src="https://static.simonwillison.net/static/2025/factbook-2020.jpg"/></figure>
<p>Here's a neat example of the editorial voice of the Factbook from the <a href="https://simonw.github.io/cia-world-factbook-2020/docs/whatsnew.html">What's New page</a>, dated December 10th 2020:</p>
<blockquote> <p>Years of wrangling were brought to a close this week when officials from Nepal and China announced that they have agreed on the height of Mount Everest. The mountain sits on the border between Nepal and Tibet (in western China), and its height changed slightly following an earthquake in 2015. The new height of 8,848.86 meters is just under a meter higher than the old figure of 8,848 meters. <em>The World Factbook</em> rounds the new measurement to 8,849 meters and this new height has been entered throughout the <em>Factbook</em> database.</p> </blockquote>
