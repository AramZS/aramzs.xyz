---
author: David Valdman
cover_image: 'https://dmvaldman.github.io/assets/img/alignment-game/athens.jpg'
date: '2026-01-16T23:21:40.189Z'
dateFolder: 2026/01/16
description: A game to align people and priorities
isBasedOn: 'https://dmvaldman.github.io/alignment-game/'
link: 'https://dmvaldman.github.io/alignment-game/'
slug: 2026-01-16-httpsdmvaldmangithubioalignment-game
tags:
  - labor
title: The Alignment Game
---
<p><em>TLDR; I made a game to align people and priorities in a <a href="https://docs.google.com/spreadsheets/d/1BYh9ZtEv4k7xoSXmtf1qCP8bYHBCZLEuTVHsTDPQM1M/edit?gid=2033972304#gid=2033972304">Google Sheet</a></em></p>
<p>At work as an “executive” I found myself often focused on issues of “alignment,” especially among the other execs. It just turns out as an organization grows, it operates on fractured sets of implicit assumptions. I found there is often little disagreement on <em>what</em> the problems are, but plenty of disagreement on <em>which</em> were more important. People then carry these differences into decision making without revealing their working assumptions, cascading tradeoffs are made and efforts diverge. There was an incredible sense of clarity when everyone could agree on what’s most important in unison, and I wanted to get there.</p>
<p>I started by doing the exercise of stack ranking priorities. Sometimes this would just be finger to the wind thinking about issues, sometimes this would mean months of work to assess impact rigorously. I would challenge others in the company to make their own stack rankings. We’d then discuss the differences and try to converge on a shared ordering. This was an incredibly fruitful exercise that led to great conversations. With more than two people though, as with an exec team, there was a need for more process.</p>
<p>It turns out there’s a whole branch of mathematics called <a href="https://en.wikipedia.org/wiki/Social_choice_theory">voting theory</a> all about how to get a plurality of people to agree on a single thing. The concepts of <a href="https://en.wikipedia.org/wiki/Instant-runoff_voting">run-off elections</a>, <a href="https://en.wikipedia.org/wiki/Divide_and_choose">“I cut, you choose”</a> division algorithms, and <a href="https://en.wikipedia.org/wiki/National_Resident_Matching_Program#Matching_algorithm">how medical schools select students</a> through ranked preferences are all facets of voting theory.</p>
<p>In my situation, we had a half dozen stack ranked lists of priorities and we wanted to align people on a single ordering. Turns out, there is <a href="https://en.wikipedia.org/wiki/Condorcet_paradox">no algorithm</a> that always works! You can always find yourself in a situation where more than half of people want A over B, some other half want B over C, and some other half want C over A, so a majority are upset with any outcome. Each ranking algorithm makes certain tradeoffs.</p>
<h2>Kemeny Ranking</h2>
<p>The <a href="https://en.wikipedia.org/wiki/Kemeny_method">Kemeny-Young method</a> is a ranking algorithm that finds the ordering which minimizes total disagreement across all voters. A disagreement is any time one voter chooses A over B and another chooses B over A. One of the voters would need to swap their preferences in order to align, and the Kemeny Young method finds the ordering requiring the fewest swaps.</p>
<p>The downsides of the Kemeny Young method come down to it being the “compromise solution.” Half of people may think A is most important and B least, and another half would invert that, and the Kemeny Young method would put it in the middle and upset everyone. Something to be cognizant of. The important bit is not to use the ordering as marching orders, but as a tool for conversation.</p>
<p>The benefits of Kemeny Young lies in its interpretability. Because it works by counting pairwise disagreements, you get a natural measure of which items are contentious, as well as which voters are misaligned. It can be said of any two people: “You need to change your mind on X things to align with one another” and between any two priorities: “X voters disagreed on this prioritization.” This makes it easy to identify where consensus already exists versus what we need to debate.</p>
<h2>Playing the Game</h2>
<p>We had great success playing the game. Each person would make their ranking in private, we’d gather them all, churn through an algorithm and immediately all implicit tradeoffs are surfaced. We would then meet pairwise to try to align our priorities. This worked especially well at company off-sites and quarterly planning cycles.</p>
<p>I’ve since turned the process into a <a href="https://docs.google.com/spreadsheets/d/1BYh9ZtEv4k7xoSXmtf1qCP8bYHBCZLEuTVHsTDPQM1M/edit?gid=2033972304#gid=2033972304">Google Sheet</a>. Try it at work or in your personal life!</p>
