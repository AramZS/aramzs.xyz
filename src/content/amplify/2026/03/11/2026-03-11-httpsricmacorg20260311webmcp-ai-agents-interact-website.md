---
author: Richard MacManus
cover_image: >-
  https://ricmac.org/wp-content/uploads/2026/03/jelle-taman-60WkGpWyadY-unsplashb.jpg
date: '2026-03-11T13:10:04.255Z'
dateFolder: 2026/03/11
description: >-
  What happens when a website exposes tools to AI agents? To experiment, I
  implemented WebMCP on my personal site using two simple browser-side tools.
isBasedOn: 'https://ricmac.org/2026/03/11/webmcp-ai-agents-interact-website/'
link: 'https://ricmac.org/2026/03/11/webmcp-ai-agents-interact-website/'
slug: 2026-03-11-httpsricmacorg20260311webmcp-ai-agents-interact-website
tags:
  - ai
  - tech
title: 'Implementing WebMCP: letting AI agents interact with my website'
---
<figure><img alt="canary" sizes="(max-width: 1280px) 100vw, 1280px" src="https://ricmac.org/wp-content/uploads/2026/03/jelle-taman-60WkGpWyadY-unsplashb.jpg" srcset="https://ricmac.org/wp-content/uploads/2026/03/jelle-taman-60WkGpWyadY-unsplashb.jpg 1280w, https://ricmac.org/wp-content/uploads/2026/03/jelle-taman-60WkGpWyadY-unsplashb-300x169.jpg 300w, https://ricmac.org/wp-content/uploads/2026/03/jelle-taman-60WkGpWyadY-unsplashb-1024x576.jpg 1024w, https://ricmac.org/wp-content/uploads/2026/03/jelle-taman-60WkGpWyadY-unsplashb-768x432.jpg 768w"/></figure>
<p>One of the most interesting ideas emerging in the <a href="https://ricmac.org/2026/02/26/web-ai-stack/">Web AI ecosystem</a> is that websites themselves can expose capabilities directly to AI agents. Instead of scraping pages or relying entirely on APIs, an agent can interact with a site through structured tools defined by the site owner. I love this, because it gives power (or, ahem, <em>agency</em>) back to website owners.</p>
<p>Structured tooling is a core idea behind <a href="https://ricmac.org/2025/03/13/mcp-the-missing-link-between-ai-agents-and-apis/">Model Context Protocol</a> (MCP): websites or applications publish capabilities — such as searching content or performing actions — and AI systems can call those capabilities as tools.</p>
<p>In the browser environment, that idea is evolving into <a href="https://github.com/webmachinelearning/webmcp">WebMCP</a>: a model where web pages expose MCP tools directly to the browser so that AI assistants running there can interact with them.</p>
<p>But WebMCP is still very early. It isn’t a formal web standard yet and is currently being discussed in <a href="https://webmachinelearning.github.io/webmcp/">a W3C community group</a> exploring how AI agents could interact with web pages. So one of the most practical ways to experiment with this architecture today is through <a href="https://mcp-b.ai/">MCP-B</a> (the “B” stands for “browser”), an extension that acts as a bridge between web pages and MCP-compatible AI agents.</p>
<p>However, things are moving fast. Last month, Google released an experimental implementation of WebMCP-style browser tooling <a href="https://developer.chrome.com/blog/webmcp-epp">as an early preview</a> in its Chrome Canary development browser. So once a version of this is released more widely in Chrome and other browsers, you won’t need a browser extension to run WebMCP on your website.</p>
<figure><a href="https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example1.png"><img alt="WebMCP on my website, via Chrome Canary early preview" sizes="(max-width: 1386px) 100vw, 1386px" src="https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example1.png" srcset="https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example1.png 1386w, https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example1-300x173.png 300w, https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example1-1024x591.png 1024w, https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example1-768x443.png 768w"/></a><figcaption>WebMCP on my website, via Chrome Canary early preview (click to view full image).</figcaption></figure>
<p>For now, there are two different approaches to implementing WebMCP:</p>
<ul> <li>MCP-B, which acts as a bridge for today’s browsers.</li> <li>WebMCP in Chrome Canary, an early preview of native browser support.</li> </ul>
<p>I tested both approaches on my personal site, ricmac.org, and I’ll describe my findings in this post. Together, they offer a glimpse of how websites may soon become AI-interactive surfaces rather than passive pages.</p>
<h2>MCP-B: a bridge for today’s browsers</h2>
<p>You can think of MCP-B as a kind of polyfill for WebMCP. It enables web pages to register MCP tools using JavaScript, while the extension — which works with Chrome, Edge and Firefox — handles the communication between those tools and an AI agent.</p>
<p>In other words:</p>
<ul> <li>The web page defines the tools; and</li> <li>The extension exposes them to the agent.</li> </ul>
<p>For my experiment on ricmac.org, a WordPress site, I implemented two simple tools:</p>
<ol> <li><strong>subscribe_newsletter</strong>: Subscribes an email address to updates via my site’s Jetpack email subscription system.</li> <li><strong>find_in_article</strong>: Searches the current page for a relevant paragraph and highlights it.</li> </ol>
<p>I chose those two use cases because they would show off the ability of WebMCP to <strong>take browser actions on my website</strong>. This is different to <a href="https://ricmac.org/2026/03/06/building-ask-ricmac-my-first-experiment-in-the-web-ai-stack/">how my <em>Ask Ricmac</em> chatbot works</a>, which is by calling an MCP server running in Cloudflare Workers — in other words, the AI functionality runs in the server and is sent back to my website. But with WebMCP, an agent can interact with the website itself, in the browser, in order to accomplish a task: in this case, subscribing to my site via email and/or searching an open article.</p>
<figure><a href="https://ricmac.org/wp-content/uploads/2026/03/mcp-b-example1.png"><img alt="MCP-B example" sizes="(max-width: 1530px) 100vw, 1530px" src="https://ricmac.org/wp-content/uploads/2026/03/mcp-b-example1.png" srcset="https://ricmac.org/wp-content/uploads/2026/03/mcp-b-example1.png 1530w, https://ricmac.org/wp-content/uploads/2026/03/mcp-b-example1-300x157.png 300w, https://ricmac.org/wp-content/uploads/2026/03/mcp-b-example1-1024x535.png 1024w, https://ricmac.org/wp-content/uploads/2026/03/mcp-b-example1-768x402.png 768w"/></a><figcaption>Using the MCP-B extension on my website.</figcaption></figure>
<p>Sidenote: these two use cases are relatively simple examples that allowed me to understand WebMCP from a web publisher perspective. For a deeper developer dive, I recommend <a href="https://www.arcade.dev/blog/web-mcp-alex-nahas-interview">RL Nabors’ interview with MCP-B creator Alex Nahas</a>, which gets into the technical weeds more than this post will do.</p>
<p>So, how does MCP-B work? The WebMCP tools are defined directly in the browser using the <code>navigator.modelContext.registerTool()</code> interface. The web page describes the tool’s name, purpose and input schema, and then provides an execution function.</p>
<p>Conceptually it looks like this:</p>
<pre>navigator.modelContext.registerTool({
  name: "find_in_article",
  description: "Find the most relevant paragraph in the current article",
  inputSchema: {...},
  execute(args) { ... }
})</pre>
<p>When the MCP-B extension is installed, it listens for these tool registrations and exposes them to a connected AI agent.</p>
<p>The interesting part is where the logic runs. Unlike traditional MCP servers — which run in a backend environment — these tools run inside the web page itself. That means they have direct access to the DOM, allowing the AI assistant to interact with the page’s content and interface. Because the tools run inside the page context, an AI assistant can only invoke capabilities that the page itself explicitly registers.</p>
<p>For example, the find_in_article tool I implemented scans paragraph elements in the page, identifies the best match for a query, and then visually highlights the result. From the user’s perspective, the AI assistant can point to a specific part of the article, rather than the user having to scroll down the page and find the relevant section manually.</p>
<p>This architecture effectively turns a normal website into an interactive surface that AI agents can operate on.</p>
<p>However, MCP-B is ultimately a workaround and depends on a browser extension. The long-term goal is to make this capability native to the browser. That’s where WebMCP comes in.</p>
<h2>WebMCP in Chrome Canary</h2>
<p>Google’s Chrome team has begun experimenting with native browser support for WebMCP, currently available as an early preview in Chrome Canary.</p>
<p>Where MCP-B relies on an extension bridge, WebMCP moves the functionality directly into the browser runtime.</p>
<p>The conceptual model remains the same:</p>
<ul> <li>Web pages register tools; and</li> <li>The browser exposes those tools to an AI system.</li> </ul>
<p>But in the native implementation, the browser itself becomes the mediator rather than an extension.</p>
<figure><a href="https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example2.png"><img alt="WebMCP in Chrome Canary" sizes="auto, (max-width: 1502px) 100vw, 1502px" src="https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example2.png" srcset="https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example2.png 1502w, https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example2-300x160.png 300w, https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example2-1024x545.png 1024w, https://ricmac.org/wp-content/uploads/2026/03/webmcp-canary-example2-768x409.png 768w"/></a><figcaption>In this example of WebMCP in Chrome Canary, I was able to do both ‘find in page’ and ’email subscribe’ in a single prompt.</figcaption></figure>
<p>From the website developer’s perspective, the code looks almost identical to the MCP-B version. The same <code>navigator.modelContext.registerTool()</code> interface is used to declare capabilities. The difference is what happens after registration.</p>
<p>In the WebMCP model:</p>
<ol> <li>The page registers its tools;</li> <li>The browser makes those tools available to the assistant running in the browser environment; and</li> <li>The assistant can invoke them directly.</li> </ol>
<p>This architecture treats web pages almost like mini MCP servers embedded in the browser environment.</p>
<p>For my ricmac.org prototype, I reused the same two tools — email subscription and article search — and tested them inside Chrome Canary with WebMCP enabled.</p>
<p>The result was effectively the same user experience as MCP-B:</p>
<ul> <li>The AI assistant could ask the page to search for a passage.</li> <li>The page highlighted the relevant section.</li> <li>The assistant could initiate an email subscription flow.</li> </ul>
<p>But the underlying architecture was cleaner. There was no extension bridge and no separate bridge process required. The browser itself handled exposing the page’s tools to the assistant.</p>
<h2>Why this matters for the web</h2>
<p>These early experiments hint at a larger shift in how websites may evolve in an AI-native web.</p>
<p>Today’s web pages are primarily designed for human readers. AI systems interact with them indirectly — through scraping, APIs, or retrieval pipelines.</p>
<p>WebMCP introduces a different model: sites can explicitly expose capabilities designed for AI agents.</p>
<p>In practice this means a website might publish tools such as:</p>
<ul> <li>search this article</li> <li>retrieve structured data from this page</li> <li>perform a transaction</li> <li>subscribe to updates</li> <li>navigate a site’s content</li> </ul>
<p>Instead of parsing HTML, the agent calls a well-defined capability. This avoids brittle scraping logic and gives site owners control over what capabilities are exposed.</p>
<p>From a developer perspective, this resembles how the web evolved with JavaScript APIs. Over time, browsers standardized interfaces for things like geolocation, notifications, and storage. WebMCP could become a similar layer for AI interaction.</p>
<p>If that happens, websites won’t just present information, but will also expose agent-accessible functionality.</p>
<h2>A small step toward an AI-native web</h2>
<p>My implementation on ricmac.org is a small experiment — just two simple tools running in the browser. But it illustrates a key idea: websites can participate directly in the AI ecosystem without requiring complex backend infrastructure.</p>
<p>Using MCP-B, that capability is already possible today through a browser extension bridge. With Chrome Canary’s WebMCP preview, we can also see how the same idea might work when it becomes a native browser feature.</p>
<p>Whether WebMCP becomes a widely adopted standard remains to be seen. But the direction is clear: the boundary between web pages and AI systems is starting to blur. Certainly, this kind of technology will reshape how websites are built in the years ahead.</p>
<p>If you have the MCP-B browser extension installed and/or you have Chrome Canary, do test this WebMCP functionality on my website. I’d love your feedback, so please leave a comment on this post or tag me on <a href="https://mastodon.social/@ricmac">Mastodon</a>, <a href="https://bsky.app/profile/ricmac.cybercultural.com">Bluesky</a> or <a href="https://www.linkedin.com/in/ricmac">LinkedIn</a>.</p>
<p><em>Photo of canary by Jelle Taman on <a href="https://unsplash.com/photos/yellow-and-black-bird-on-gray-rock-60WkGpWyadY?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>.</em></p>
