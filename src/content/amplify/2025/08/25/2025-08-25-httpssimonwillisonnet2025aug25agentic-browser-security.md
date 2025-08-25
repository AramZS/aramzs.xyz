---
author: Simon Willison
cover_image: null
date: '2025-08-25T09:45:17.743Z'
dateFolder: 2025/08/25
description: >-
  The security team from Brave took a look at Comet, the LLM-powered "agentic
  browser" extension from Perplexity, and unsurprisingly found security holes
  you can drive a truck through. The vulnerability …
isBasedOn: 'https://simonwillison.net/2025/Aug/25/agentic-browser-security/'
link: 'https://simonwillison.net/2025/Aug/25/agentic-browser-security/'
slug: 2025-08-25-httpssimonwillisonnet2025aug25agentic-browser-security
tags:
  - ai
  - tech
  - infosec
title: 'Agentic Browser Security: Indirect Prompt Injection in Perplexity Comet'
---
<p><strong><a href="https://brave.com/blog/comet-prompt-injection/">Agentic Browser Security: Indirect Prompt Injection in Perplexity Comet</a></strong>. The security team from Brave took a look at Comet, the LLM-powered "agentic browser" extension from Perplexity, and unsurprisingly found security holes you can drive a truck through.</p>
<blockquote> <p>The vulnerability we’re discussing in this post lies in how Comet processes webpage content: when users ask it to “Summarize this webpage,” Comet feeds a part of the webpage directly to its LLM without distinguishing between the user’s instructions and untrusted content from the webpage. This allows attackers to embed indirect prompt injection payloads that the AI will execute as commands. For instance, an attacker could gain access to a user’s emails from a prepared piece of text in a page in another tab.</p> </blockquote>
<p>Visit a Reddit post with Comet and ask it to summarize the thread, and malicious instructions in a post there can trick Comet into accessing web pages in another tab to extract the user's email address, then perform all sorts of actions like triggering an account recovery flow and grabbing the resulting code from a logged in Gmail session.</p>
<p>Perplexity attempted to mitigate the issues reported by Brave... but an update to the Brave post later confirms that those fixes were later defeated and the vulnerability remains.</p>
<p>Here's where things get difficult: Brave themselves are developing an agentic browser feature called Leo. Brave's security team describe the following as a "potential mitigation" to the issue with Comet:</p>
<blockquote> <p>The browser should clearly separate the user’s instructions from the website’s contents when sending them as context to the model. The contents of the page should always be treated as untrusted.</p> </blockquote>
<p>If only it were that easy! This is the core problem at the heart of prompt injection which we've been talking about for <a href="https://simonwillison.net/series/prompt-injection/">nearly three years</a> - to an LLM the trusted instructions and untrusted content are concatenated together into the same stream of tokens, and to date (despite many attempts) nobody has demonstrated a convincing and effective way of distinguishing between the two.</p>
<p>There's an element of "those in glass houses shouldn't throw stones here" - I strongly expect that the <em>entire concept</em> of an agentic browser extension is fatally flawed and cannot be built safely.</p>
<p>One piece of good news: this <a href="https://news.ycombinator.com/item?id=45004846">Hacker News conversation</a> about this issue was almost entirely populated by people who already understand how serious this issue is and why the proposed solutions were unlikely to work. That's new: I'm used to seeing people misjudge and underestimate the severity of this problem, but it looks like the tide is finally turning there.</p>
