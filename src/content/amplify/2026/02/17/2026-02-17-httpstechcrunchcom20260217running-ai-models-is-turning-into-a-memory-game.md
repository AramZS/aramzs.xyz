---
author: Russell Brandom
cover_image: 'https://techcrunch.com/wp-content/uploads/2009/01/samsung_50nm_dram.jpg?w=425'
date: '2026-02-17T17:04:48.562Z'
dateFolder: 2026/02/17
description: >-
  When we talk about the cost of AI infrastructure, the focus is usually on
  Nvidia and GPUs -- but memory is an increasingly important part of the
  picture.
isBasedOn: >-
  https://techcrunch.com/2026/02/17/running-ai-models-is-turning-into-a-memory-game/
link: >-
  https://techcrunch.com/2026/02/17/running-ai-models-is-turning-into-a-memory-game/
slug: >-
  2026-02-17-httpstechcrunchcom20260217running-ai-models-is-turning-into-a-memory-game
tags:
  - ai
  - tech
title: Running AI models is turning into a memory game
---
<figure><img alt="" sizes="(max-width: 425px) 100vw, 425px" src="https://techcrunch.com/wp-content/uploads/2009/01/samsung_50nm_dram.jpg" srcset="https://techcrunch.com/wp-content/uploads/2009/01/samsung_50nm_dram.jpg 425w, https://techcrunch.com/wp-content/uploads/2009/01/samsung_50nm_dram.jpg?resize=150,94 150w, https://techcrunch.com/wp-content/uploads/2009/01/samsung_50nm_dram.jpg?resize=300,188 300w, https://techcrunch.com/wp-content/uploads/2009/01/samsung_50nm_dram.jpg?resize=50,31 50w"/></figure>
<p>When we talk about the cost of AI infrastructure, the focus is usually on Nvidia and GPUs — but memory is an increasingly important part of the picture. As hyperscalers prepare to build out billions of dollars worth of new data centers, the price for DRAM chips has jumped <a href="https://datatrack.trendforce.com/Chart/content/4694/mainstream-dram-spot-price">roughly 7x in the last year</a>.</p>
<p>At the same time, there’s a growing discipline in orchestrating all that memory to make sure the right data gets to the right agent at the right time. The companies that master it will be able to make the same queries with fewer tokens, which can be the difference between folding and staying in business.</p>
<p><a href="http://Doug O'Laughlin">Semiconductor analyst Dan O’Laughlin</a> has an interesting look at the importance of memory chips on his Substack, where he talks with Val Bercovici, chief AI officer at Weka. They’re both semiconductor guys, so the focus is more on the chips than the broader architecture; the implications for AI software are pretty significant too.</p>
<p>I was particularly struck by this passage, in which Bercovici looks at the growing complexity of <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching">Anthropic’s prompt-caching documentation</a>:</p>
<blockquote> <p>The tell is if we go to Anthropic’s prompt caching pricing page. It started off as a very simple page six or seven months ago, especially as Claude Code was launching — just “use caching, it’s cheaper.” Now it’s an encyclopedia of advice on exactly how many cache writes to pre-buy. You’ve got 5-minute tiers, which are very common across the industry, or 1-hour tiers — and nothing above. That’s a really important tell. Then of course you’ve got all sorts of arbitrage opportunities around the pricing for cache reads based on how many cache writes you’ve pre-purchased.</p> </blockquote>
<p>The question here is how long Claude holds your prompt in cached memory: you can pay for a 5-minute window, or pay more for an hour-long window. It’s much cheaper to draw on data that’s still in the cache, so if you manage it right, you can save an awful lot. There is a catch though: every new bit of data you add to the query may bump something else out of the cache window.</p>
<p>This is complex stuff, but the upshot is simple enough: Managing memory in AI models is going to be a huge part of AI going forward. Companies that do it well are going to rise to the top.</p>
<p>And there is plenty of progress to be made in this new field. Back in October, I covered <a href="https://techcrunch.com/2025/10/23/tensormesh-raises-4-5m-to-squeeze-more-inference-out-of-ai-server-loads/">a startup called TensorMesh</a> that was working on one layer in the stack known as cache-optimization.</p>
<p>Techcrunch event</p>
<h3>TechCrunch Founder Summit 2026: Tickets Live</h3>
<h4>On <strong>June 23 in Boston</strong>, more than <strong>1,100 founders</strong> come together at <strong>TechCrunch Founder Summit 2026</strong> for a full day focused on growth, execution, and real-world scaling. Learn from founders and investors who have shaped the industry. Connect with peers navigating similar growth stages. Walk away with tactics you can apply immediately<br/><br/>Save <strong>up to $300</strong> on your pass or <strong>save up to 30% with group tickets for teams of four or more.</strong></h4>
<h3>TechCrunch Founder Summit: Tickets Live</h3>
<h4>On <strong>June 23 in Boston</strong>, more than <strong>1,100 founders</strong> come together at <strong>TechCrunch Founder Summit 2026</strong> for a full day focused on growth, execution, and real-world scaling. Learn from founders and investors who have shaped the industry. Connect with peers navigating similar growth stages. Walk away with tactics you can apply immediately<br/><br/>Save <strong>up to $300</strong> on your pass or <strong>save up to 30% with group tickets for teams of four or more.</strong></h4>
<p>Boston, MA | June 23, 2026</p>
<p><a data-ctatext="REGISTER NOW" data-destinationlink="https://techcrunch.com/events/techcrunch-founder-summit-2026/?utm_source=tc&amp;utm_medium=ad&amp;utm_campaign=tcfoundersummit2026&amp;utm_content=seb&amp;promo=tc_inline_seb&amp;display=" data-event="button" href="https://techcrunch.com/events/techcrunch-founder-summit-2026/?utm_source=tc&amp;utm_medium=ad&amp;utm_campaign=tcfoundersummit2026&amp;utm_content=seb&amp;promo=tc_inline_seb&amp;display=">REGISTER NOW</a></p>
<p>Opportunities exist in other parts of the stack. For instance, lower down the stack, there’s the question of how data centers are using the different types of memory they have. (The interview includes a nice discussion of when DRAM chips are used instead of HBM, although it’s pretty deep in the hardware weeds.) Higher up the stack, end users are figuring out how to structure their model swarms to take advantage of the shared cache.</p>
<p>As companies get better at memory orchestration, they’ll use fewer tokens and inference will get cheaper. Meanwhile, <a href="https://ramp.com/velocity/ai-is-getting-cheaper">models are getting more efficient at processing each token</a>, pushing the cost down still further. As server costs drop, a lot of applications that don’t seem viable now will start to edge into profitability.</p>
