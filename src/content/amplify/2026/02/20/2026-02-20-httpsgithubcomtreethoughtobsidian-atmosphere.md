---
author: 'https://github.com/treethought/'
cover_image: >-
  https://opengraph.githubassets.com/bb795953025977821258c165dcff15e4207b344917656266e42c36dd5ca403de/treethought/obsidian-atmosphere
date: '2026-02-20T15:41:14.804Z'
dateFolder: 2026/02/20
description: >-
  Surf the atmosphere from the coziness of your vault -
  treethought/obsidian-atmosphere
isBasedOn: 'https://github.com/treethought/obsidian-atmosphere'
link: 'https://github.com/treethought/obsidian-atmosphere'
slug: 2026-02-20-httpsgithubcomtreethoughtobsidian-atmosphere
tags:
  - decentralization
title: >-
  GitHub - treethought/obsidian-atmosphere: Surf the atmosphere from the
  coziness of your vault
---
<h1>treethought/obsidian-atmosphere</h1>
<p>main</p>
<p>Go to file</p>
<p>Code</p>
<p>Open more actions menu</p>
<h1>obsidian-atmosphere</h1>
<p>Obsidian plugin for AT Protocol integrations, including bookmarking platforms and standard.site publishing.</p>
<p>Surf the atmosphere from the coziness of your vault.</p>
<figure><a href="https://github.com/treethought/obsidian-atmosphere/blob/main/bookmarks.png"><img alt="" src="https://github.com/treethought/obsidian-atmosphere/raw/main/bookmarks.png"/></a></figure>
<figure><a href="https://github.com/treethought/obsidian-atmosphere/blob/main/standard.site.png"><img alt="" src="https://github.com/treethought/obsidian-atmosphere/raw/main/standard.site.png"/></a></figure>
<h2>Features</h2>
<h3>Bookmarking &amp; Knowledge Networks</h3>
<p>View and manage bookmarks from AT Protocol platforms:</p>
<ul> <li><a href="https://semble.so">Semble</a> (<code>network.cosmik.*</code>) - Collections and cards with notes</li> <li><a href="https://margin.at">Margin</a> (<code>at.margin.*</code>) - Bookmarks with collections and tags</li> <li><a href="https://kipclip.com">Kipclip</a> and community bookmarks (<code>community.lexicon.bookmarks.*</code>) - Community bookmarks lexicon (supports kipclip tags)</li> </ul>
<h3>Publishing &amp; Reading</h3>
<ul> <li><strong>Publish documents</strong> - Publish Obsidian notes to <a href="https://standard.site/">standard.site</a> publications like <a href="https://leaflet.pub">leaflet.pub</a> and <a href="https://pckt.blog">pckt.blog</a></li> <li><strong>Blog feed</strong> - Browse and clip documents from subscribed standard.site publications to your vault</li> </ul>
<h2>Installation</h2>
<p>Official release in Obsidian plugin directory is under review. For now, install with BRAT:</p>
<ol> <li>Install the <a href="https://github.com/TfTHacker/obsidian42-brat">BRAT plugin</a> from Community Plugins</li> <li>Open BRAT settings</li> <li>Click "Add Beta plugin"</li> <li>Enter: <code>https://github.com/treethought/obsidian-atmosphere</code></li> <li>Enable the plugin in Community Plugins</li> </ol>
<h2>Setup</h2>
<h3>Authentication</h3>
<ol> <li>Open Settings &gt; Atmosphere</li> <li>Enter your AT Protocol handle (e.g., <code>user.bsky.social</code>)</li> <li>Create an app password at <a href="https://bsky.app/settings/app-passwords">bsky.app/settings/app-passwords</a></li> <li>Enter the app password</li> <li>Save settings</li> </ol>
<h2>Commands</h2>
<table> <tr> <th>Command</th> <th>Description</th> </tr> <tbody> <tr> <td><strong>Open bookmarks</strong></td> <td>Opens the bookmarks view showing items from Semble, margin.at, and bookmarks lexicon</td> </tr> <tr> <td><strong>Publish document</strong></td> <td>Publishes the active note to a standard.site publication</td> </tr> </tbody> </table>
<p>Access commands via the command palette (Ctrl/Cmd + P) or ribbon icons.</p>
<h2>Settings</h2>
<table> <tr> <th>Setting</th> <th>Description</th> <th>Default</th> </tr> <tbody> <tr> <td><strong>Handle</strong></td> <td>Your AT Protocol handle or DID (e.g., <code>user.bsky.social</code>)</td> <td>-</td> </tr> <tr> <td><strong>App password</strong></td> <td>App password from bluesky settings</td> <td>-</td> </tr> <tr> <td><strong>Clip directory</strong></td> <td>Directory in your vault where clipped documents are saved</td> <td><code>AtmosphereClips</code></td> </tr> </tbody> </table>
<h2>Usage</h2>
<h3>Browsing Bookmarks</h3>
<p>Switch between sources (Semble, Margin, Bookmarks) and filter by collections or tags. Supports adding cards to collections and creating collections collections, tags, and notes (for Semble).</p>
<h3>Publishing Documents</h3>
<p>Open a note and run "Publish document" command. After selecting one of your existing standard.site publication, your note will be converted to the applicable format (for leaflet or pckt), published, and update your note's properties with publication url, AT uris, etc.</p>
<h3>Reading &amp; Clipping</h3>
<p>Opening the feed will present your standard.site publications. Click a publication to view it's published documents to either view in browser or clip to your vault.</p>
<h2>Supported Rich Content Formats</h2>
<ul> <li><strong>Leaflet</strong> - Rich blog posts with markdown support</li> <li><strong>Pckt</strong> - Lightweight blogging format</li> </ul>
<h2>Network Use</h2>
<p>This plugin connects to AT Protocol services to fetch and manage your bookmarks.</p>
