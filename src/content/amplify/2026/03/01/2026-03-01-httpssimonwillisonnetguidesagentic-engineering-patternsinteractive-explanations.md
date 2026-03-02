---
author: Simon Willison
cover_image: null
date: '2026-03-01T05:34:28.026Z'
dateFolder: 2026/03/01
description: >-
  For a lot of things this doesn't matter: if the code fetches some data from a
  database and outputs it as JSON the implementation details are likely simple
  enough that we don't need to care.
isBasedOn: >-
  https://simonwillison.net/guides/agentic-engineering-patterns/interactive-explanations/
link: >-
  https://simonwillison.net/guides/agentic-engineering-patterns/interactive-explanations/
slug: >-
  2026-03-01-httpssimonwillisonnetguidesagentic-engineering-patternsinteractive-explanations
tags:
  - ai
title: >-
  Interactive explanations - Agentic Engineering Patterns - Simon Willison's
  Weblog
---
<h2>Interactive explanations</h2>
<p>When we lose track of how code written by our agents works we take on <strong>cognitive debt</strong>.</p>
<p>For a lot of things this doesn't matter: if the code fetches some data from a database and outputs it as JSON the implementation details are likely simple enough that we don't need to care. We can try out the new feature and make a very solid guess at how it works, then glance over the code to be sure.</p>
<p>Often though the details really do matter. If the core of our application becomes a black box that we don't fully understand we can no longer confidently reason about it, which makes planning new features harder and eventually slows our progress in the same way that accumulated technical debt does.</p>
<p>How do we pay down cognitive debt? By improving our understanding of how the code works.</p>
<p>One of my favorite ways to do that is by building <strong>interactive explanations</strong>.</p>
<p>In <a href="https://minimaxir.com/2026/02/ai-agent-coding/">An AI agent coding skeptic tries AI agent coding, in excessive detail</a> Max Woolf mentioned testing LLMs' Rust abilities with the prompt <code>Create a Rust app that can create "word cloud" data visualizations given a long input text</code>.</p>
<p>This captured my imagination: I've always wanted to know how word clouds work, so I fired off an <a href="https://simonwillison.net/2025/Nov/6/async-code-research/">asynchronous research project</a> - <a href="https://github.com/simonw/research/pull/91#issue-4002426963">initial prompt here</a>, <a href="https://github.com/simonw/research/tree/main/rust-wordcloud">code and report here</a> - to explore the idea.</p>
<p>This worked really well: Claude Code for web built me a Rust CLI tool that could produce images like this one:</p>
<figure><img alt="A word cloud, many words, different colors and sizes, larger words in the middle." src="https://raw.githubusercontent.com/simonw/research/refs/heads/main/rust-wordcloud/wordcloud.png"/><figcaption>But how does it actually work?</figcaption></figure>
<p>Claude's report said it uses "<strong>Archimedean spiral placement</strong> with per-word random angular offset for natural-looking layouts". This did not help me much!</p>
<p>I requested a <a href="https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/">linear walkthrough</a> of the codebase which helped me understand the Rust code in more detail - here's <a href="https://github.com/simonw/research/blob/main/rust-wordcloud/walkthrough.md">that walkthrough</a> (and <a href="https://github.com/simonw/research/commit/2cb8c62477173ef6a4c2e274be9f712734df6126">the prompt</a>). This helped me understand the structure of the Rust code but I still didn't have an intuitive understanding of how that "Archimedean spiral placement" part actually worked.</p>
<p>So I asked for an <strong>animated explanation</strong>. I did this by pasting a link to that existing <code>walkthrough.md</code> document into a Claude Code session along with the following:</p>
<p>You can <a href="https://tools.simonwillison.net/animated-word-cloud">play with the result here</a>. Here's an animated GIF demo:</p>
<figure><img alt="Words appear on the word cloud one at a time, with little boxes showing where the algorithm is attempting to place them - if those boxes overlap an existing word it tries again." src="https://static.simonwillison.net/static/2026/animated-word-cloud-demo.gif"/><figcaption>This was using Claude Opus 4.6, which turns out to have quite good taste when it comes to building explanatory animations.</figcaption></figure>
<p>If you watch the animation closely you can see that for each word it attempts to place it somewhere on the page by showing a box, run checks if that box intersects an existing word. If so it continues to try to find a good spot, moving outward in a spiral from the center.</p>
<p>I found that this animation really helped make the way the algorithm worked click for me.</p>
<p>I have long been a fan of animations and interactive interfaces to help explain different concepts. A good coding agent can produce these on demand to help explain code - its own code or code written by others.</p>
