---
author: npm
cover_image: 'https://static-production.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
date: '2025-07-28T16:46:42.895Z'
dateFolder: 2025/07/28
description: >-
  Readwise MCP. Latest version: 0.0.4, last published: 7 days ago. Start using
  @readwise/readwise-mcp in your project by running `npm i
  @readwise/readwise-mcp`. There are no other projects in the npm registry using
  @readwise/readwise-mcp.
isBasedOn: 'https://www.npmjs.com/package/@readwise/readwise-mcp'
link: 'https://www.npmjs.com/package/@readwise/readwise-mcp'
slug: 2025-07-28-httpswwwnpmjscompackagereadwisereadwise-mcp
tags:
  - ai
  - code
title: Readwise MCP
---
<p>The <a href="https://modelcontextprotocol.io">Model Context Protocol (MCP)</a> standardizes how applications provide context to Large Language Models (LLMs), ensuring a clean separation between context management and direct LLM interaction.</p>
<p>This project is a local <a href="https://spec.modelcontextprotocol.io">MCP server</a> designed to act as a bridge between LLM clients (such as <a href="https://claude.ai">Claude</a>) and <a href="https://readwise.io">Readwise</a>.</p>
<h2>Installation in Claude</h2>
<ol start="0"> <li>Please make sure you have <a href="https://nodejs.org/en/download">Node</a> installed.</li> <li>Open Claude desktop app.</li> <li>Navigate to Settings &gt; Developer.</li> <li>Click <code>Edit Config</code>.</li> <li>Add the following entry to the <code>claude_desktop_config.json</code> file, replacing <code>ACCESS_TOKEN</code> value with your <a href="https://readwise.io/access_token">Readwise Access Token</a>.</li> </ol>
<pre><code>{
  "mcpServers": {
    "Readwise MCP": {
      "command": "npx",
      "args": [
        "-y",
        "@readwise/readwise-mcp"
      ],
      "env": {
        "ACCESS_TOKEN": "XXXXXXXXX"
      }
    }
  }
}
</code></pre>
<h3>Known Issues</h3>
<p>When using this MCP server, you may occasionally encounter MCP errors during your conversations with Claude. If you experience such errors, we recommend trying to switch between different Claude models (e.g., from Claude 3.5 Haiku to Claude 3.7 Sonnet) as this often resolves the issue.</p>
<h2>Readme</h2>
<h3>Keywords</h3>
<p>none</p>
