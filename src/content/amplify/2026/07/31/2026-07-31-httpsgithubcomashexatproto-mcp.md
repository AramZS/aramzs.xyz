---
author: 'https://github.com/Ashex/'
cover_image: >-
  https://opengraph.githubassets.com/b9ab3124715be33c7182806be8294bc244c5bd829e2886bc7dd93df3948588d2/Ashex/atproto-mcp
date: '2026-07-31T22:18:18.049Z'
dateFolder: 2026/07/31
description: Contribute to Ashex/atproto-mcp development by creating an account on GitHub.
isBasedOn: 'https://github.com/Ashex/atproto-mcp'
link: 'https://github.com/Ashex/atproto-mcp'
slug: 2026-07-31-httpsgithubcomashexatproto-mcp
tags:
  - ai
title: atproto-mcp
---
<h1>atproto-mcp</h1>
<figure><a href="https://github.com/Ashex/atproto-mcp/actions/workflows/tests.yml"><img alt="Tests" src="https://github.com/Ashex/atproto-mcp/actions/workflows/tests.yml/badge.svg?branch=main"/></a></figure>
<p>MCP server providing a searchable knowledge base for the <a href="https://atproto.com/">AT Protocol</a> ecosystem — protocol documentation, lexicon schemas, Bluesky developer API docs, and cookbook examples — powered by <a href="https://github.com/neuml/txtai">txtai</a> semantic search.</p>
<h2>Data Sources</h2>
<table> <tr> <th>Source</th> <th>Repository</th> <th>Description</th> </tr> <tbody> <tr> <td><strong>AT Protocol Website</strong></td> <td><a href="https://github.com/bluesky-social/atproto-website">bluesky-social/atproto-website</a></td> <td>Protocol specs, guides, and blog posts from atproto.com</td> </tr> <tr> <td><strong>Bluesky API Docs</strong></td> <td><a href="https://github.com/bluesky-social/bsky-docs">bluesky-social/bsky-docs</a></td> <td>Developer docs from docs.bsky.app — tutorials, guides, advanced topics</td> </tr> <tr> <td><strong>AT Protocol Lexicons</strong></td> <td><a href="https://github.com/bluesky-social/atproto/tree/main/lexicons">bluesky-social/atproto</a></td> <td>JSON schemas defining all AT Protocol endpoints and record types</td> </tr> <tr> <td><strong>Cookbook</strong></td> <td><a href="https://github.com/bluesky-social/cookbook">bluesky-social/cookbook</a></td> <td>Example projects in Python, Go, TypeScript, and JavaScript</td> </tr> </tbody> </table>
<h2>Tools</h2>
<table> <tr> <th>Tool</th> <th>Description</th> </tr> <tbody> <tr> <td><code>search_atproto_docs</code></td> <td>Semantic search across all documentation sources</td> </tr> <tr> <td><code>get_lexicon</code></td> <td>Retrieve a specific lexicon by NSID (e.g. <code>app.bsky.feed.post</code>)</td> </tr> <tr> <td><code>list_lexicons</code></td> <td>List all lexicons, optionally filtered by namespace</td> </tr> <tr> <td><code>search_lexicons</code></td> <td>Semantic search within lexicon schemas</td> </tr> <tr> <td><code>get_cookbook_example</code></td> <td>Get a specific cookbook example by project name</td> </tr> <tr> <td><code>list_cookbook_examples</code></td> <td>List all cookbook examples, optionally by language</td> </tr> <tr> <td><code>search_bsky_api</code></td> <td>Semantic search within Bluesky API docs</td> </tr> <tr> <td><code>refresh_sources</code></td> <td>Force re-fetch repos and rebuild the index</td> </tr> </tbody> </table>
<h2>Prompts</h2>
<table> <tr> <th>Prompt</th> <th>Description</th> </tr> <tbody> <tr> <td><code>explain_lexicon</code></td> <td>Get a comprehensive explanation of a lexicon</td> </tr> <tr> <td><code>implement_feature</code></td> <td>Get implementation guidance with code examples</td> </tr> <tr> <td><code>debug_atproto</code></td> <td>Help debug AT Protocol / Bluesky API issues</td> </tr> <tr> <td><code>explore_namespace</code></td> <td>Explore all lexicons in a namespace</td> </tr> </tbody> </table>
<h2>Installation</h2>
<h3>Prerequisites</h3>
<ul> <li>Python 3.12+</li> <li><a href="https://docs.astral.sh/uv/">uv</a> (recommended) or pip</li> <li>Git (for cloning source repositories)</li> </ul>
<h3>Install from source</h3>
<pre>git clone https://github.com/ashex/atproto-mcp.git
cd atproto-mcp
uv sync</pre>
<h3>Run with uvx</h3>
<pre>uvx atproto-mcp</pre>
<h2>Configuration</h2>
<h3>VS Code / Copilot</h3>
<figure><a href="https://camo.githubusercontent.com/9866d638d870dce441367d87e7251f4fcabb2c10e3953cf077a5529da2bf9ded/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f56535f436f64652d496e7374616c6c5f415470726f746f5f4d43502d3030393846463f7374796c653d666c61742d737175617265266c6f676f3d76697375616c73747564696f636f6465266c6f676f436f6c6f723d666666666666"><img alt="Install in VS Code" data-canonical-src="https://img.shields.io/badge/VS_Code-Install_ATproto_MCP-0098FF?style=flat-square&amp;logo=visualstudiocode&amp;logoColor=ffffff" src="https://camo.githubusercontent.com/9866d638d870dce441367d87e7251f4fcabb2c10e3953cf077a5529da2bf9ded/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f56535f436f64652d496e7374616c6c5f415470726f746f5f4d43502d3030393846463f7374796c653d666c61742d737175617265266c6f676f3d76697375616c73747564696f636f6465266c6f676f436f6c6f723d666666666666"/></a></figure>
<p>Add to <code>.vscode/mcp.json</code> in your workspace:</p>
<pre>{
  "mcpServers": {
    "atproto": {
      "command": "uvx",
      "args": [
        "atproto-mcp"
        ]
    }
  }
}</pre>
<h3>Kiro Power</h3>
<ol> <li>Open <strong>Kiro → Powers</strong></li> <li>Select <strong>Import power from GitHub</strong></li> <li>Enter <code>https://github.com/ashex/atproto-mcp</code></li> </ol>
<h3>Claude Desktop</h3>
<p>Add to <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>:</p>
<pre>{
  "mcpServers": {
    "atproto": {
      "command": "uvx",
      "args": [
         "atproto-mcp"
      ]
    }
  }
}</pre>
<h3>MCPHub</h3>
<p>Add to <code>~/.config/mcphub/servers.json</code>:</p>
<pre>{
  "mcpServers": {
    "atproto": {
      "command": "uvx",
      "args": ["atproto-mcp"]
    }
  }
}</pre>
<h3>OpenCode</h3>
<p>Add to your <code>opencode.json</code>:</p>
<pre>{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "atproto": {
      "type": "local",
      "command": ["uvx", "atproto-mcp"]
    }
  }
}</pre>
<h2>Environment Variables</h2>
<table> <tr> <th>Variable</th> <th>Default</th> <th>Description</th> </tr> <tbody> <tr> <td><code>ATPROTO_MCP_CACHE_DIR</code></td> <td><code>~/.cache/atproto-mcp</code></td> <td>Where repos and the search index are stored</td> </tr> <tr> <td><code>ATPROTO_MCP_REFRESH_HOURS</code></td> <td><code>24</code></td> <td>Hours before re-fetching repositories</td> </tr> <tr> <td><code>ATPROTO_MCP_EMBEDDING_MODEL</code></td> <td><code>BAAI/bge-small-en-v1.5</code></td> <td>Sentence-transformers model for embeddings</td> </tr> </tbody> </table>
<h2>How It Works</h2>
<p>On first launch, the server:</p>
<ol> <li>Shallow clones the repos into <code>~/.cache/atproto-mcp/repos/</code></li> <li>Parses MDX docs, lexicon schemas, and cookbook examples into text chunks</li> <li>Indexes the chunks using txtai <strong>hybrid search</strong> (BM25 keyword + dense vectors from the <code>bge-small-en-v1.5</code> sentence-transformer, ~130MB, runs locally) — exact identifiers like NSIDs match reliably alongside semantic queries</li> <li>Index is persisted in <code>~/.cache/atproto-mcp/index/</code> for subsequent starts</li> </ol>
<p>On subsequent launches, the cached index loads in seconds. Repos older than 24 hours are automatically refreshed with <code>git pull</code>. If the refreshed repos differ from what the index was built from, the stale index keeps serving queries while a fresh one is rebuilt in the background and swapped in when ready.</p>
<h2>Development</h2>
<pre># Install in development mode
uv sync

# Run the server locally (stdio)
uv run atproto-mcp

# Test with the MCP Inspector
uv run mcp dev src/atproto_mcp/server.py

# Run with debug logging
ATPROTO_MCP_CACHE_DIR=/tmp/atproto-mcp uv run atproto-mcp</pre>
<h2>License</h2>
<p>MIT</p>
