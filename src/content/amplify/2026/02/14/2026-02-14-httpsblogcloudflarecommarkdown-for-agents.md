---
author: Will Allen
cover_image: >-
  https://cf-assets.www.cloudflare.com/zkvhlag99gkb/6Df02zjRb4inGPazW51EyD/278afaa16719f1080f12936c35a6c0ef/BLOG-3162_OG.png
date: '2026-02-15T00:58:01.885Z'
dateFolder: 2026/02/14
description: >-
  The way content is discovered online is shifting, from traditional search
  engines to AI agents that need structured data from a Web built for humans.
  It’s time to consider not just human visitors, but start to treat agents as
  first-class citizens. Markdown for Agents automatically converts any HTML page
  requested from our network to markdown.
isBasedOn: 'https://blog.cloudflare.com/markdown-for-agents/'
link: 'https://blog.cloudflare.com/markdown-for-agents/'
slug: 2026-02-14-httpsblogcloudflarecommarkdown-for-agents
tags:
  - ai
  - tech
title: Introducing Markdown for Agents
---
<p>5 min read</p>
<figure><img alt="" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/rzmAhLxuiqzCffB9yZrdf/91858defbc03196c5f074a26117248f9/BLOG-3162_1.png"/></figure>
<p>The way content and businesses are discovered online is changing rapidly. In the past, traffic originated from traditional search engines, and SEO determined who got found first. Now the traffic is increasingly coming from AI crawlers and agents that demand structured data within the often-unstructured Web that was built for humans.</p>
<p>As a business, to continue to stay ahead, now is the time to consider not just human visitors, or traditional wisdom for SEO-optimization, but start to treat agents as first-class citizens.</p>
<p>Feeding raw HTML to an AI is like paying by the word to read packaging instead of the letter inside. A simple <code>## About Us</code> on a page in markdown costs roughly 3 tokens; its HTML equivalent – <code>&lt;h2 class="section-title" id="about"&gt;About Us&lt;/h2&gt;</code> – burns 12-15, and that's before you account for the <code>&lt;div&gt;</code> wrappers, nav bars, and script tags that pad every real web page and have zero semantic value.</p>
<p>This blog post you’re reading takes 16,180 tokens in HTML and 3,150 tokens when converted to markdown. <b>That’s a 80% reduction in token usage.</b></p>
<p><a href="https://en.wikipedia.org/wiki/Markdown"><u>Markdown</u></a> has quickly become the <i>lingua franca</i> for agents and AI systems as a whole. The format’s explicit structure makes it ideal for AI processing, ultimately resulting in better results while minimizing token waste.</p>
<p>The problem is that the Web is made of HTML, not markdown, and page weight has been <a href="https://almanac.httparchive.org/en/2025/page-weight#page-weight-over-time"><u>steadily increasing</u></a> over the years, making pages hard to parse. For agents, their goal is to filter out all non-essential elements and scan the relevant content.</p>
<p>The conversion of HTML to markdown is now a common step for any AI pipeline. Still, this process is far from ideal: it wastes computation, adds costs and processing complexity, and above all, it may not be how the content creator intended their content to be used in the first place.</p>
<p>What if AI agents could bypass the complexities of intent analysis and document conversion, and instead receive structured markdown directly from the source?</p>
<p>Cloudflare's network now supports real-time content conversion at the source, for <a href="https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/"><u>enabled zones</u></a> using <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation"><u>content negotiation</u></a> headers. Now when AI systems request pages from any website that uses Cloudflare and has Markdown for Agents enabled, they can express the preference for text/markdown in the request. Our network will automatically and efficiently convert the HTML to markdown, when possible, on the fly.</p>
<p>Here’s how it works. To fetch the markdown version of any page from a zone with Markdown for Agents enabled, the client needs to add the <b>Accept</b> negotiation header with <code>text</code><code>/markdown</code> as one of the options. Cloudflare will detect this, fetch the original HTML version from the origin, and convert it to markdown before serving it to the client.</p>
<p>Here's a curl example with the Accept negotiation header requesting a page from our developer documentation:</p>
<pre><code>curl https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/ \
  -H "Accept: text/markdown"</code></pre>
<p>Or if you’re building an AI Agent using Workers, you can use TypeScript:</p>
<pre><code>const r = await fetch(
  `https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/`,
  {
    headers: {
      Accept: "text/markdown, text/html",
    },
  },
);
const tokenCount = r.headers.get("x-markdown-tokens");
const markdown = await r.text();</code></pre>
<p>We already see some of the most popular coding agents today – like Claude Code and OpenCode – send these accept headers with their requests for content. Now, the response to this request is formatted in markdown. It's that simple.</p>
<pre><code>HTTP/2 200
date: Wed, 11 Feb 2026 11:44:48 GMT
content-type: text/markdown; charset=utf-8
content-length: 2899
vary: accept
x-markdown-tokens: 725
content-signal: ai-train=yes, search=yes, ai-input=yes

---
title: Markdown for Agents · Cloudflare Agents docs
---

## What is Markdown for Agents

The ability to parse and convert HTML to Markdown has become foundational for AI.
...
</code></pre>
<p>Note that we include an <code>x-markdown-tokens</code> header with the converted response that indicates the estimated number of tokens in the markdown document. You can use this value in your flow, for example to calculate the size of a context window or to decide on your chunking strategy.</p>
<p>Here’s a diagram of how it works:</p>
<figure><img alt="BLOG-3162 2" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/6Zw1Q5kBBqTrouN1362H5I/3080d74a2a971be1f1e7e0ba79611998/BLOG-3162_2.png"/><figcaption>BLOG-3162 2</figcaption></figure>
<p>During our last Birthday Week, Cloudflare <a href="https://blog.cloudflare.com/content-signals-policy/"><u>announced</u></a> Content Signals — <a href="http://contentsignals.org"><u>a framework</u></a> that allows anyone to express their preferences for how their content can be used after it has been accessed.</p>
<p>When you return markdown, you want to make sure your content is being used by the Agent or AI crawler. That’s why Markdown for Agents converted responses include the <code>Content-Signal: ai-train=yes, search=yes, ai-input=yes</code> header signaling that indicates content can be used for AI Training, Search results and AI Input, which includes agentic use. Markdown for Agents will provide options to define custom Content Signal policies in the future.</p>
<p>Check our dedicated <a href="https://contentsignals.org/"><u>Content Signals</u></a> page for more information on this framework.</p>
<p>We enabled this feature in our <a href="https://developers.cloudflare.com/"><u>Developer Documentation</u></a> and our <a href="https://blog.cloudflare.com/"><u>Blog</u></a>, inviting all AI crawlers and agents to consume our content using markdown instead of HTML.</p>
<p>Try it out now by requesting this blog with <code>Accept: text/markdown</code>.</p>
<p>The result is:</p>
<pre><code>---
description: The way content is discovered online is shifting, from traditional search engines to AI agents that need structured data from a Web built for humans. It’s time to consider not just human visitors, but start to treat agents as first-class citizens. Markdown for Agents automatically converts any HTML page requested from our network to markdown.
title: Introducing Markdown for Agents
image: https://blog.cloudflare.com/images/markdown-for-agents.png
---

# Introducing Markdown for Agents

The way content and businesses are discovered online is changing rapidly. In the past, traffic originated from traditional search engines and SEO determined who got found first. Now the traffic is increasingly coming from AI crawlers and agents that demand structured data within the often-unstructured Web that was built for humans.

...</code></pre>
<p>If you’re building AI systems that require arbitrary document conversion from outside Cloudflare or Markdown for Agents is not available from the content source, we provide other ways to convert documents to Markdown for your applications:</p>
<ul><li><p>Workers AI <a href="https://celso-markdown-for-agents.preview.developers.cloudflare.com/workers-ai/features/markdown-conversion/"><u>AI.toMarkdown()</u></a> supports multiple document types, not just HTML, and summarization.</p></li><li><p>Browser Rendering <a href="https://celso-markdown-for-agents.preview.developers.cloudflare.com/browser-rendering/rest-api/markdown-endpoint/"><u>/markdown</u></a> REST API supports markdown conversion if you need to render a dynamic page or application in a real browser before converting it.</p></li></ul>
<p>Anticipating a shift in how AI systems browse the Web, Cloudflare Radar now includes content type insights for AI bot and crawler traffic, both globally on the <a href="https://radar.cloudflare.com/ai-insights#content-type"><u>AI Insights</u></a> page and in the <a href="https://radar.cloudflare.com/bots/directory/gptbot"><u>individual bot</u></a> information pages.</p>
<p>The new <code>content_type</code> dimension and filter shows the distribution of content types returned to AI agents and crawlers, grouped by <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types"><u>MIME type</u></a> category.</p>
<figure><img alt="BLOG-3162 3" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/7vQzvzHsTLPXGhoQK0Xbr5/183129a8947990bc4ee5bb5ca7ba71b5/BLOG-3162_3.png"/><figcaption>BLOG-3162 3</figcaption></figure>
<p>You can also see the requests for markdown filtered by a specific agent or crawler. Here are the requests that return markdown to OAI-Searchbot, the crawler used by OpenAI to power ChatGPT’s search:</p>
<figure><img alt="BLOG-3162 4" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/7Ah99DWLxnYjadW6xJhAXg/afef4a29ae504d4fe69df4f9823dd103/BLOG-3162_4.png"/><figcaption>BLOG-3162 4</figcaption></figure>
<p>This new data will allow us to track the evolution of how AI bots, crawlers, and agents are consuming Web content over time. As always, everything on Radar is freely accessible via the <a href="https://developers.cloudflare.com/api/resources/radar/"><u>public APIs</u></a> and the <a href="https://radar.cloudflare.com/explorer?dataSet=ai.bots&amp;groupBy=content_type&amp;filters=userAgent%253DGPTBot&amp;timeCompare=1"><u>Data Explorer</u></a>.</p>
<p>To enable Markdown for Agents for your zone, log into the Cloudflare <a href="https://dash.cloudflare.com/"><u>dashboard</u></a>, select your account, select the zone, look for Quick Actions and toggle the Markdown for Agents button to enable. This feature is available today in Beta at no cost for Pro, Business and Enterprise plans, as well as SSL for SaaS customers.</p>
<figure><img alt="BLOG-3162 5" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/1UqzmHrNa1UdCCI6eXIfmn/3da0ff51dd94219d8af87c172d83fc72/BLOG-3162_5.png"/><figcaption>BLOG-3162 5</figcaption></figure>
<p>You can find more information about Markdown for Agents on our<a href="https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/"> Developer Docs</a>. We welcome your feedback as we continue to refine and enhance this feature. We’re curious to see how AI crawlers and agents navigate and adapt to the unstructured nature of the Web as it evolves.</p>
<p>Cloudflare's connectivity cloud protects <a href="https://www.cloudflare.com/network-services/">entire corporate networks</a>, helps customers build <a href="https://workers.cloudflare.com/">Internet-scale applications efficiently</a>, accelerates any <a href="https://www.cloudflare.com/performance/accelerate-internet-applications/">website or Internet application</a>, <a href="https://www.cloudflare.com/ddos/">wards off DDoS attacks</a>, keeps <a href="https://www.cloudflare.com/application-security/">hackers at bay</a>, and can help you on <a href="https://www.cloudflare.com/products/zero-trust/">your journey to Zero Trust</a>.</p>
<p>Visit <a href="https://one.one.one.one/">1.1.1.1</a> from any device to get started with our free app that makes your Internet faster and safer.</p>
<p>To learn more about our mission to help build a better Internet, <a href="https://www.cloudflare.com/learning/what-is-cloudflare/">start here</a>. If you're looking for a new career direction, check out <a href="https://www.cloudflare.com/careers">our open positions</a>.</p>
