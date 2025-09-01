---
author: Malte UblCTO
cover_image: >-
  https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2iGBNwQVNfm2vkNOkWvBHC/541447e0fc86e96d884587d080b23f43/image.png
date: '2025-09-01T16:26:39.412Z'
dateFolder: 2025/09/01
description: >-
  llms.txt is an emerging standard for making content such as docs available for
  direct consumption by AIs. We’re proposing a convention to include such
  content directly in HTML responses.
isBasedOn: 'https://vercel.com/blog/a-proposal-for-inline-llm-instructions-in-html'
link: 'https://vercel.com/blog/a-proposal-for-inline-llm-instructions-in-html'
slug: 2025-09-01-httpsvercelcombloga-proposal-for-inline-llm-instructions-in-html
tags:
  - ai
title: A proposal for inline LLM instructions in HTML based on llms.txt
---
<p>How do you tell an AI agent what it needs to do when it hits a protected page? Most systems rely on external documentation or pre-configured knowledge, but there's a simpler approach.</p>
<p>What if the instructions were right there in the HTML response?</p>
<p><a data-zone="null" href="https://llmstxt.org/">llms.txt</a> is an emerging standard for making content such as docs available for direct consumption by AIs. We’re proposing a convention to include such content directly in HTML responses as <code>&lt;script type="text/llms.txt"&gt;</code>.</p>
<p>Vercel protects preview deployments behind <a data-zone="null" href="https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication">Vercel Authentication</a> by default. This prevents random users from accessing your private, under-development software. However, it also prevents coding agents like Cursor, Devin, or Claude Code from being able to directly access your deployments.</p>
<p>We already <a data-zone="null" href="https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation">provide various mechanisms for automated software to access protected URLs</a>, and additionally <a data-zone="null" href="https://vercel.com/docs/mcp/vercel-mcp">we introduced an MCP server</a> with functions such as <code>get_access_to_vercel_url</code> or <code>web_fetch_vercel_url</code> to directly help the agent to access the deployments.</p>
<blockquote><p data-version="v1"><i><b>But how does the agent know these methods exist?</b></i></p></blockquote>
<p>This is when we had the idea: Why don’t we just put instructions for agents directly into the HTML of the HTTP 401 response that explains how to access a deployment when they don’t have access.</p>
<p>We suggest using:</p>
<p>to inline instruction to an LLM directly in the HTML.</p>
<p>Browsers ignore script elements with an unknown type. This ensures that the content has no impact on rendering in regular browsers.</p>
<p>Script elements are legal inside <code>&lt;head&gt;</code> and hence can be placed near the top of the document where LLMs are most likely to notice them. Unlike browsers, LLMs won't ignore them.</p>
<p>Unknown script elements can contain any content (except for <code>&lt;/script&gt;</code>) which makes them great containers for markdown or other formats designed for LLMs.</p>
<p><a data-zone="null" href="https://llmstxt.org/">llms.txt</a> has found adoption for publishing LLM-targeted content in a discoverable fashion on the web, and this is meant to fit right in. <a data-zone="null" href="https://agents.md/">AGENTS.md</a> is another related standard in this space meant for agent-directed context of a repository. As it is currently used for in-repository use-cases while llms.txt is concerned with web publishing, we decided to align with llms.txt.</p>
<p>We recently shipped this on our default <code>401</code> page for deployments.</p>
<p>These are the instructions we use:</p>
<p>You can try it yourself by running <code>curl -i https://access-test.vercel.app/ | less</code></p>
<p>Many applications are starting to build MCP servers now, but MCP itself lacks a discovery mechanism. <code>&lt;script type="text/llms.txt"&gt;</code> might be useful to hint to LLMs trying to navigate a site or app that there's an MCP server available that could help them move forward.</p>
<p>We think the "How do I get access to this?" use case likely applies to many platforms. More generically, one of the DX features of Vercel has been to automatically link from error messages into our observability experience to investigate the error. Such error pages can use <code>&lt;script type="text/llms.txt"&gt;</code> to directly point the agent towards the MCP service that can help investigate the issue.</p>
<p>One of the great things about LLMs is that they are flexible and can adapt to new environments without specific training. When we shipped our first <code>&lt;script type="text/llms.txt"&gt;</code>, it worked right away.</p>
<p>There was no need to talk to an LLM provider like OpenAI or Anthropic. In fact, the proposal has ephemeral discovery built-in, making it even more seamless than the <a data-zone="null" href="https://llmstxt.org/">baseline llms.txt format</a>.</p>
<p><code>&lt;script type="text/llms.txt"&gt;</code> doesn't need to be a formal standard. You can just start using it now.</p>
