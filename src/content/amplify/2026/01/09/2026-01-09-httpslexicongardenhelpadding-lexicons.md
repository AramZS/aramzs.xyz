---
author: Lexicon Garden
cover_image: 'https://lexicon.garden/static/logo-1024x1024.jpg'
date: '2026-01-09T19:49:48.797Z'
dateFolder: 2026/01/09
description: 'ATProtocol Lexicon discovery, documentation, and management'
isBasedOn: 'https://lexicon.garden/help/adding-lexicons'
link: 'https://lexicon.garden/help/adding-lexicons'
slug: 2026-01-09-httpslexicongardenhelpadding-lexicons
tags:
  - decentralization
title: Adding Lexicons to Lexicon Garden
---
<p>This guide walks you through the process of creating, validating, and publishing lexicon schemas.</p>
<h2>Overview</h2>
<ol> <li>Schemas are stored in your PDS under the <code>com.atproto.lexicon.schema</code> collection, with the NSID as the rkey.</li> <li>A DNS entry is used to resolve lexicon NSIDs to the repository containing the lexicon schema definitions.</li> </ol>
<h2>Prerequisites</h2>
<ul> <li>An ATProtocol PDS (Bluesky account or self-hosted)</li> <li>Your lexicon schema JSON files</li> <li>DNS control for your domain (for authority verification)</li> <li>The <code>goat</code> CLI tool (recommended)</li> </ul>
<h2>Step 1: Define Your Lexicon</h2>
<p>Create your lexicon schema following the NSID naming convention (reverse domain notation):</p>
<ul> <li><code>com.example.myapp.record</code> for records</li> <li><code>com.example.myapp.defs</code> for shared definitions</li> </ul>
<p>See the <a href="https://atproto.com/specs/lexicon">ATProtocol Lexicon Specification</a> for schema structure details.</p>
<h2>Step 2: Validate Your Lexicon</h2>
<p>Use <code>goat</code> to validate your lexicon schema:</p>
<pre><code data-highlighted="yes">goat lex validate ./lexicons/com.example.myapp.record.json</code></pre>
<p>This ensures the schema definition is valid and adheres to the ATProtocol lexicon spec. Fix any validation errors before proceeding.</p>
<h2>Step 3: Lint Your Lexicon</h2>
<p>Use <code>goat</code> to lint your lexicon for best practices:</p>
<pre><code data-highlighted="yes">goat lex lint ./lexicons/com.example.myapp.record.json</code></pre>
<p>Address any warnings or suggestions to ensure your lexicon follows best practices.</p>
<h2>Step 4: Set Up DNS for Authority</h2>
<p>Lexicon resolution uses DNS TXT records to link NSID namespaces to repositories. The authority domain is derived by removing the final NSID segment (the method/record name) and reversing the remaining parts<sup><a href="https://lexicon.garden/help/adding-lexicons/#fn-1">[1]</a></sup>.</p>
<h3>Understanding NSID Authority</h3>
<p>For an NSID like <code>com.example.feed.post</code>:</p>
<ul> <li>The final segment <code>post</code> is the record/method name</li> <li>The authority is <code>com.example.feed</code></li> <li>Reversed, this becomes the domain <code>feed.example.com</code></li> <li>The DNS TXT record goes at <code>_lexicon.feed.example.com</code></li> </ul>
<h3>Each Namespace Depth Needs Its Own DNS Entry</h3>
<p>Resolvers do not recurse up or down the DNS hierarchy<sup><a href="https://lexicon.garden/help/adding-lexicons/#fn-1">[1]</a></sup>. If a DNS lookup fails, resolution fails entirely. This means <strong>each unique namespace prefix requires its own DNS entry</strong>:</p>
<table> <tr> <th>NSID</th> <th>Authority</th> <th>DNS Entry</th> </tr> <tbody> <tr> <td><code>com.example.post</code></td> <td><code>com.example</code></td> <td><code>_lexicon.example.com</code></td> </tr> <tr> <td><code>com.example.feed.post</code></td> <td><code>com.example.feed</code></td> <td><code>_lexicon.feed.example.com</code></td> </tr> <tr> <td><code>com.example.feed.like</code></td> <td><code>com.example.feed</code></td> <td><code>_lexicon.feed.example.com</code></td> </tr> <tr> <td><code>com.example.graph.follow</code></td> <td><code>com.example.graph</code></td> <td><code>_lexicon.graph.example.com</code></td> </tr> </tbody> </table>
<p>Notice that <code>com.example.feed.post</code> and <code>com.example.feed.like</code> share the same authority (they differ only in the final segment), so they use the same DNS entry and are stored in the same repository with different rkeys.</p>
<h3>Creating DNS Entries</h3>
<p>For each unique namespace depth, add a <code>_lexicon</code> TXT record pointing to your DID:</p>
<pre><code data-highlighted="yes">_lexicon.example.com      TXT "did=did:plc:abc123..."
_lexicon.feed.example.com TXT "did=did:plc:abc123..."</code></pre>
<p>The <code>did=</code> prefix is required. Lexicon Garden displays an authority badge for schemas published by the verified domain authority.</p>
<h2>Step 5: Publish Your Schema</h2>
<p>Use <code>goat</code> to publish your lexicons:</p>
<pre><code data-highlighted="yes">goat lex publish ./lexicons</code></pre>
<p>Publishing with <code>goat</code> includes:</p>
<ul> <li>Checking the necessary DNS entries for lexicon resolution</li> <li>Validating the lexicon schema</li> <li>Creating the record in your repository</li> </ul>
<h2>Step 6: Verify on Lexicon Garden</h2>
<ol> <li>Search for your NSID on Lexicon Garden</li> <li>Check that the authority badge appears</li> <li>View the Documentation and Graph tabs to ensure everything looks correct</li> </ol>
<h3>Caching and Propagation</h3>
<p>Lexicon Garden caches identity and authority data. It can take up to 24 hours for changes to be fully reflected. If your lexicon or authority badge doesn't appear immediately:</p>
<ul> <li><strong>DNS propagation</strong>: Lexicon Garden uses Google (<code>8.8.8.8</code>) and Cloudflare (<code>1.1.1.1</code>) nameservers for resolving identities and lexicon authorities. New DNS records may take time to propagate to these resolvers.</li> <li><strong>Identity caching</strong>: DID resolution results are cached for 12 hours.</li> <li><strong>Schema indexing</strong>: New schemas are indexed as they appear on TAP, which depends on your PDS syncing with the relay.</li> </ul>
