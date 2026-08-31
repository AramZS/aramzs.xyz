---
author: Simon Willison
cover_image: 'https://static.simonwillison.net/static/2026/pelicans-in-her-piety.webp'
date: '2026-08-31T02:40:23.102Z'
dateFolder: 2026/08/30
description: >-
  OpenAI announced ChatGPT Work on July 9th, and have been furiously iterating
  on it ever since. It is an extraordinarily confusing and very powerful
  product. Here’s what I’ve figured out …
isBasedOn: 'https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/'
link: 'https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/'
slug: 2026-08-30-httpssimonwillisonnet2026aug30understanding-chatgpt-work
tags:
  - ai
title: Understanding ChatGPT Work
---
<h2>Understanding ChatGPT Work</h2>
<p>OpenAI <a href="https://openai.com/index/chatgpt-for-your-most-ambitious-work/">announced ChatGPT Work</a> on July 9th, and have been furiously iterating on it ever since. It is an extraordinarily confusing and very powerful product. Here’s what I’ve figured out about it so far.</p>
<h4>ChatGPT Work is actually two products <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#two-products">#</a></h4>
<p>The more interesting version of ChatGPT Work is the one that runs in the cloud. This can be accessed via <a href="https://www.chatgpt.com/">chatgpt.com</a> or through the ChatGPT mobile apps. Let’s call it <strong>Work Cloud</strong>.</p>
<p>If you install the ChatGPT desktop app—the app that used to be called Codex—you gain access to a thing called ChatGPT Work that can access files and run programs directly on your computer. Let’s call that one <strong>Work Local</strong>. This one feels more like regular Codex re-skinned to be less intimidating to non-software-developers.</p>
<p>For the rest of this article I’m going to talk exclusively about Work Cloud.</p>
<h4>Work is for paid subscribers only <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#work-is-for-paid-subscribers-only">#</a></h4>
<p>Right now, ChatGPT Work (in both flavors) is available only to $20/month and up subscribers. Free users and $8/month Go users do not have access.</p>
<h4>Work has features that aren’t available in Chat <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#work-has-features-that-aren-t-available-in-chat">#</a></h4>
<p>The interface for accessing Work is a tab selector, which presents it as an alternative to Chat:</p>
<figure><img alt="ChatGPT app header with a Chat and a Work tab" src="https://static.simonwillison.net/static/2026-08-30/IMG_7741.jpeg"/></figure>
<p>The obvious question is <em>when should I use Chat, and when should I use Work?</em></p>
<p>OpenAI’s <a href="https://learn.chatgpt.com/docs/get-started-with-work">official answer</a> to that question is:</p>
<blockquote> <p>Use Chat when you want an answer, explanation, brainstorm, or short draft. Use ChatGPT Work when you want ChatGPT to complete a task with a clear outcome, such as a brief, deck, analysis, recurring update, workflow, or file you can review and use.</p> </blockquote>
<p>I find that almost entirely useless, because I’ve been using regular ChatGPT Chat for all of those task categories for years!</p>
<p>The better question then is <em>what features does Work have that are missing from Chat?</em></p>
<p>After extensive experimentation I think I’ve mostly figured that out:</p>
<ul> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#model-selection">Options to use Luna and Terra in place of Sol</a></li> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#code-execution-with-internet-access-">A code execution environment with Internet access</a></li> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#a-full-headless-chrome-browser">A headless Chrome browser</a></li> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#a-persistent-shared-filesystem">A persistent filesystem shared between sessions</a></li> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#chatgpt-sites">The ability to publish ChatGPT Sites</a></li> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#sub-agents-with-sol-luna-and-terra">The ability to run sub-agent sessions with Sol, Luna, and Terra</a></li> <li><a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#scheduled-prompt-automations">Scheduled prompt automations</a></li> </ul>
<h4>Model selection <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#model-selection">#</a></h4>
<p>In Work, you get the option to pick GPT-5.6 Sol, Luna, or Terra, each with Light, Medium, High, Extra High, Max, or Ultra reasoning levels. You can also pick GPT-5.5 at Light, Medium, High, or Extra High.</p>
<p>These look to be the same models that are available through the OpenAI API.</p>
<p>Chat offers a different selection: 5.6 Instant, Medium, High, Extra High, and Pro. It doesn’t explain if those are Luna or Terra or Sol (I’m assuming Sol?). 5.6 Pro appears to be exclusive to Chat, with no equivalent in Work.</p>
<p>My current understanding from using Codex is that Ultra is a special mode that more eagerly delegates to sub-agents.</p>
<p>I believe ChatGPT Work sessions are billed against your Codex allowance, while ChatGPT Chat Sessions get their own, separate allowance. This may help explain the model availability differences.</p>
<h4>Code execution with Internet access! <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#code-execution-with-internet-access-">#</a></h4>
<p>As a long-time fan of the <a href="https://simonwillison.net/tags/code-interpreter/">Code Interpreter pattern</a>—pioneered by OpenAI in 2023—this is by far the most exciting feature of ChatGPT Work (Cloud) for me.</p>
<p>The code execution environment can now talk to the rest of the internet!</p>
<p>ChatGPT Chat can’t do this—if you ask it to install additional software packages or interact with websites or APIs that access will be blocked by the container proxy.</p>
<p>(Weirdly, back in January it <a href="https://simonwillison.net/2026/Jan/26/chatgpt-containers/">grew the ability to install packages</a>, but that doesn’t seem to work any more. I wish they had better changelogs!)</p>
<p>Claude’s equivalent container has allowed restricted internet access since it launched <a href="https://simonwillison.net/2025/Sep/9/claude-code-interpreter/">last September</a>. Claude can install packages from PYPI and NPM and clone repositories from GitHub. But that is about it: the allowlist of domains is very short.</p>
<p>ChatGPT Work allows a whole lot more than that. It can be configured with a specific list of allowed domains, but the default appears to be open to all.</p>
<p>This makes Work an incredibly useful tool. You can have it clone GitHub repositories, install their dependencies, then use them to interact with the rest of the web!</p>
<h4>A full, headless Chrome browser <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#a-full-headless-chrome-browser">#</a></h4>
<p>Another killer feature of ChatGPT Work is the browser tool. ChatGPT Work can launch a full Chrome instance, load websites, fill out forms, and take screenshots.</p>
<p>It can even run JavaScript against the DOM of those pages. I prompted:</p>
<blockquote> <p><code>Load simonwillison.net in your browser and extract the headings using JavaScript</code></p> </blockquote>
<p>ChatGPT Work fire up a browser instance and ran the code:</p>
<pre>await tab.playwright.evaluate(() =&gt; {
  return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"), heading =&gt; ({
    level: heading.tagName.toLowerCase(),
    text: heading.innerText.trim().replace(/\s+/g, " "),
    id: heading.id || null
  }));
});</pre>
<p>This feels a lot like my <a href="https://shot-scraper.datasette.io/en/stable/javascript.html">shot-scraper javascript</a> tool, only now I can access it on my phone!</p>
<h4>A persistent, shared filesystem <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#a-persistent-shared-filesystem">#</a></h4>
<p>ChatGPT Chat gets a fresh filesystem for each chat session. These cannot be accessed from any other session.</p>
<p>In ChatGPT Work each session gets its own scratch folder—named something like <code>/workspace/scratch/e00a0a017944</code>—but each of those are persisted across sessions, so you can access files from previous chats. I have 171 folders in <code>/workspace/scratch</code> right now!</p>
<p>As far as I can tell that <code>/workspace</code> volume is mounted to all Work sessions that are currently running—file edits from one can be instantly seen by the others. They don’t seem to share the same process space though, and localhost servers running in one can’t be accessed from another.</p>
<h4>ChatGPT Sites <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#chatgpt-sites">#</a></h4>
<p>ChatGPT Work has the ability to build <em>and deploy</em> entire websites, using Cloudflare Workers. These can have HTML and JavaScript and can run server-side features too, including stateful features on top of Cloudflare D1 and R2.</p>
<p>Here’s a simple site I built with this feature:</p>
<p><a href="https://london-pelicans-in-her-piety.simonw.chatgpt.site/">london-pelicans-in-her-piety.simonw.chatgpt.site</a></p>
<figure><img alt="Screenshot of a website homepage on a cream background. Top navigation bar: a circular logo reading &quot;P/P&quot; on the left, the links &quot;THE CENSUS&quot;, &quot;COLLECTIONS&quot; and &quot;METHOD&quot; in the center, and &quot;JSON ↓&quot; on the right. The left half is a hero section with small red capitals reading &quot;AN ICONOGRAPHIC CENSUS · GREATER LONDON&quot; above a large serif heading &quot;Pelicans in her piety&quot;, with &quot;piety&quot; set in red italics. Below it: &quot;Across London, an impossible bird bleeds for her young—in limewood, marble, mosaic, metal and glass. This is an evidence-backed census of where to find her.&quot; Two buttons follow: a solid black &quot;EXPLORE ALL 28&quot; and an outlined &quot;DOWNLOAD THE DATA&quot;. The right half is a photograph of an ornate dark carved wooden reredos in a church, with gilded urns and a crest on top, Corinthian columns, a gilded pelican with outspread wings at its center above inscribed panels, an altar with a brass cross and red flowers, embroidered banners on either side, and a black-and-white checkerboard floor with red carpet. Vertical text along the photo's right edge reads &quot;ST MARY ABCHURCH&quot; and a caption at its bottom reads &quot;Grinling Gibbons's reredos, St Mary Abchurch. Photograph: Diliff, CC BY-SA 3.0, via SPAB ↗&quot;. A statistics strip along the bottom shows &quot;28 FIXED SITES&quot;, &quot;4 COLLECTIONS&quot;, &quot;3 OPEN LEADS&quot; and &quot;2 KNOWN LOSSES&quot;." src="https://static.simonwillison.net/static/2026/pelicans-in-her-piety.webp"/><figcaption>My prompt was:</figcaption></figure>
<blockquote> <p><code>Figure out all of the places in London with a pelican in her piety, then turn that into a JSON file and build a ChatGPT sites site about them</code></p> </blockquote>
<p>(A pelican in her piety is a fascinating piece of <a href="https://devonchurchland.co.uk/blog/pelican-in-her-piety/#What-is-a-Pelican-In-Her-Piety">medieval Christian imagery</a>—once you know about them you’ll find them all over the place.)</p>
<p>These sites default to being private to the user that created them, but you can make them public and (on team plans) share them with other specific individuals.</p>
<h4>Sub-agents with Sol, Luna, and Terra <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#sub-agents-with-sol-luna-and-terra">#</a></h4>
<p>There’s not much to say about this one. ChatGPT Chat can’t run sub-agents. ChatGPT Work can. This is very much a power-user feature: if you are running a complex project that can benefit from multiple parallel agents working together, Work can do that.</p>
<h4>Scheduled prompt automations <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#scheduled-prompt-automations">#</a></h4>
<p>Another feature that seems to have migrated from regular ChatGPT to ChatGPT Work at some point. You can prompt ChatGPT Work like this:</p>
<blockquote> <p><code>run a search to see if Waymo have announced a launch date for Half Moon Bay every day at 8am</code></p> </blockquote>
<p>This will schedule a prompt to run on that frequency. These prompts can decide that nothing interesting has happened, or they can decide to notify you of some new information.</p>
<h4>Is this safe? <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#is-this-safe-">#</a></h4>
<p>An open question for me right now is how <em>safe</em> all of this stuff is.</p>
<p>My <a href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/">lethal trifecta model</a> warns about the risks inherent in any agent system that combines access to private data with exposure to untrusted content and a way to communicate stolen information back to an attacker.</p>
<p>ChatGPT Work combines all three!</p>
<p>I’d love to hear more from OpenAI about how they protect ChatGPT Work sessions against prompt injection attacks. I expect their answer is the same <a href="https://learn.chatgpt.com/docs/sandboxing/auto-review">auto-review mechanism</a> as Codex.</p>
<h4>OpenAI could make this a lot less confusing <a href="https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/#openai-could-make-this-a-lot-less-confusing">#</a></h4>
<p>Figuring this all out took way more work than it should have.</p>
<p>I think there are two key problems here:</p>
<ol> <li>OpenAI explain Work in terms of what it’s for, not what it actually does</li> <li>OpenAI still insist on hiding their system prompts and tools descriptions</li> </ol>
<p>If the ChatGPT Work documentation included the exact system prompt and tool descriptions used by the agent I wouldn’t have needed to write this post.</p>
