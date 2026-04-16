---
author: Bartek Perz
cover_image: >-
  https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?fit=1920%2C1080
date: '2026-04-15T18:45:03.629Z'
dateFolder: 2026/04/15
description: >-
  Learn about the productivity tool one GitHub engineer built, and how AI
  supported the development process.
isBasedOn: >-
  https://github.blog/ai-and-ml/github-copilot/build-a-personal-organization-command-center-with-github-copilot-cli/
link: >-
  https://github.blog/ai-and-ml/github-copilot/build-a-personal-organization-command-center-with-github-copilot-cli/
slug: >-
  2026-04-15-httpsgithubblogai-and-mlgithub-copilotbuild-a-personal-organization-command-center-with-github-copilot-cli
tags:
  - ai
title: Build a personal organization command center with GitHub Copilot CLI
---
<figure><img alt="Thumbnail showing 'My AI command center'" sizes="auto, (max-width: 1600px) 100vw, 1600px" src="https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?w=1600" srcset="https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?w=1600 1600w, https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?w=800 800w, https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?w=400 400w, https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?w=1032 1032w, https://github.blog/wp-content/uploads/2026/04/command-cecnter.png?w=516 516w"/><figcaption>Thumbnail showing 'My AI command center'</figcaption></figure>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/BDZKubrUO1M?feature=oembed&amp;autoplay=1" type="video/mp4"/></div></figure>
<p>What if you could remove the struggle of context switching across several apps, bringing them together into one place?</p>
<p>Meet <a href="https://github.com/brittanyellich">Brittany Ellich</a>, Staff Software Engineer, and the productivity tool she built to streamline her work. We sat down with Brittany to learn about this project–what she built, how she did it, and how AI supported the development process from ideation to implementation. Brittany created a visual home that fits how she learns and thinks, all inspired by the <a href="https://github.com/features/copilot/cli?utm_source=blog-command-center-cta&amp;utm_medium=blog&amp;utm_campaign=dev-pod-copilot-cli-2026">GitHub Copilot CLI</a>.</p>
<p><em>Visual learner? Watch the video above!</em></p>
<h2>Q &amp; A</h2>
<p><strong>What is your role at GitHub?</strong></p>
<p>I’m a staff software engineer on the billing team at GitHub. My day-to-day work mostly consists of working on metered billing, so things like keeping records of Actions minutes, storage amounts, and copilot usage. I passionately dogfood everything that comes out of the Copilot org. I’m also an open source contributor to ATProto projects and built Open Social for applications built on the AT Protocol.</p>
<p><strong>What did you build?</strong></p>
<p>I built a personal organization command center to solve a simple problem: digital fragmentation. My goal was to take everything scattered across a dozen different apps and unify them into one calm, central space.</p>
<p><strong>How long did v1 take to make?</strong></p>
<p>I use a plan-then-implement workflow when building systems, leveraging AI for planning and Copilot for implementation. For v1, this approach let me move from idea to a working tool in a single day alongside my other regular work.</p>
<p>While planning, I have Copilot interview me with questions about how something should work until we have a plan that I think is adequate. That way, there’s less guesswork about what I want done and implementation goes more smoothly. Copilot will implement the work based on the plan that we put together.</p>
<p><strong>What’s your favorite tool stack to build with?</strong></p>
<p>I like working in agent mode in VS Code for synchronous development, typically with up to 2 non-competing agent workflows going at a time, and Copilot Cloud Agent for asynchronous development. I typically try to keep a few asynchronous tasks flowing with Copilot Cloud Agent, like bug fixes or tech debt changes that have been well-scoped, while I’m focusing on the work that needs more oversight in VS Code.</p>
<p><strong>Follow-up loaded question: Do you care what tech stack your apps use now?</strong></p>
<p>Not really. I’ve always wanted to build an Electron app and this is technically my first one, but I can’t say I learned a ton about Electron during this process since it was almost completely built by Agent Mode. That said, I went in and simplified the repo significantly to make it publicly accessible which required a lot more hands-on work (agents seem to like adding code but are much less enthusiastic about removing code) and felt pretty comfortable reading through the repo and making changes despite not having a ton of familiarity with Electron apps.</p>
<p><strong>What’s your one-line takeaway for other builders?</strong></p>
<p>Go build something! Building solutions from scratch has never been easier, and it’s helpful for learning how to work with new AI tools.</p>
<p><strong>How do you keep up with news and changes in the industry?</strong></p>
<p>I stay on top of industry news through articles, podcasts, and social media. I read articles that are shared internally on GitHub’s Slack, and I read the GitHub blog. We have a ton of great engineers who are great at curating useful resources and sharing them with the team. There are a few podcasts that I like for keeping up with things, like How I AI and Last Week in AI. On social media, I’m active on Bluesky and have had a ton of great conversations with other engineers there.</p>
<h2>Try Brittany’s approach</h2>
<p>Brittany’s project is a good reminder that the most useful projects often start as small fixes for everyday problems.</p>
<p>While you can use your own stack for this, if you’d like to try something similar, here are the tools Brittany used:</p>
<ul> <li><a href="https://www.electronjs.org/">Electron</a>: Cross-platform desktop application framework</li> <li><a href="https://vite.dev/">Vite</a>: Build tool with hot module replacement</li> <li><a href="https://tailwindcss.com/">Tailwind</a>: CSS utility framework</li> </ul>
<p>All of these are open source, and GitHub Copilot can help you get started with them quickly!</p>
<p>If you’d like her exact solution, you can clone Brittany’s repository to get up and running right away. You’ll need the following on your machine:</p>
<ul> <li>Node.js (v18 or higher)</li> <li>A Microsoft 365 account (for calendar sync)</li> <li>An <a href="https://elevenlabs.io/">ElevenLabs</a> account (for voice assistant setup)</li> </ul>
<p>There are more detailed instructions in her repository <a href="https://github.com/brittanyellich/command-center-lite/blob/main/README.md">README file</a>!</p>
