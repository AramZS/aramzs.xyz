---
author: Tangled
cover_image: 'https://assets.tangled.network/blog/newsletter/02/og.png'
date: '2026-06-10T16:44:40.857Z'
dateFolder: 2026/06/10
description: 'Vouching, CI logs over SSH, and more'
isBasedOn: 'https://blog.tangled.org/newsletter-02/'
link: 'https://blog.tangled.org/newsletter-02/'
slug: 2026-06-10-httpsblogtangledorgnewsletter-02
tags:
  - code
title: Newsletter 02
---
<p><em>This was originally sent as an email.</em></p>
<p>Hello again, Tanglers! It's been a busy few weeks here at Tangled; so busy in fact that we missed last month's newsletter. :D We've shipped a lot, so let's get straight to it.</p>
<h2>Vouching and web-of-trust</h2>
<figure><img alt="vouching graphic" src="https://assets.tangled.network/vouch.png"/><figcaption>vouching graphic</figcaption></figure>
<p>You can now vouch for (or denounce) anyone you interact with on Tangled. Vouched users show a green shield beside their profile picture; denounced users get a red one. These "hats" appear at the points where it matters most — in issues, PRs, and comments — so you can make an informed call before spending time on a review. Vouching is web-of-trust scoped: you only see decisions made by you and the people you trust.</p>
<p>As always, vouch records are public AT Protocol records stored on your PDS.</p>
<p><a href="https://blog.tangled.org/vouching">Read more</a></p>
<h2>SSH log tailing</h2>
<figure><img alt="astral
projection" src="https://assets.tangled.network/blog/pty/astral-projection.webp"/><figcaption>astral projection</figcaption></figure>
<p>You can now tail CI logs right from your terminal! Push to a branch, and the remote now hands you an SSH command right in your terminal:</p>
<pre><code>λ jj git push -c @-
  -- snip --
remote: →  Browse CI logs in your terminal:
remote:    ssh -t -p 3333 tangled.org did:plc:j5hmlfdrwkvtxm7cjmu7j2is 796ecc5b0ce5381ed5b5021e7cc28b4b05e03c92
</code></pre>
<p>Paste that into a new shell and you're dropped into a full-blown TUI served over SSH — no installation required. It's built on <a href="https://github.com/charmbracelet/bubbletea">bubbletea</a> and <a href="https://github.com/charmbracelet/wish">wish</a>, so it themes with your terminal colors and handles ANSI escape codes correctly because it's writing to a real PTY.</p>
<p><a href="https://blog.tangled.org/ssh">Read more</a></p>
<h2>New PR page</h2>
<p>The pull request creation page got a significant refresh. Go check it out!</p>
<h2>New timeline and notification pages</h2>
<figure><img alt="timeline
graphic" src="https://assets.tangled.network/blog/newsletter/02/timeline.png"/><figcaption>We've rebuilt the timeline and notification pages from the ground up. The timeline page now splits Global and Following feeds, and includes new Notifications and Recents columns.</figcaption></figure>
<p>The dedicated Notifications page now splits "work" and "social" notifications into two separate feeds, helping declutter your inbox.</p>
<h2>AT Protocol progress</h2>
<p>We've made meaningful strides on our "ephemeral appview" goal — the milestone where anyone can run a fully backfilled Tangled appview with minimal compute.</p>
<ul> <li> <p><strong>Unified feed lexicon.</strong> We consolidated comment and reaction records into a pair of new lexicon types: <code>sh.tangled.feed.comment</code> and <code>sh.tangled.feed.reaction</code>.</p> </li> <li> <p><strong>PR record ingestion.</strong> Pull request records (<code>sh.tangled.repo.pull</code>) are now fully ingested through the firehose. Your agents can create pull requests by simply writing records to your (or their!?) PDS!</p> </li> <li> <p><strong>Repository renames.</strong> We teased this in our last newsletter: after switching to DIDs for repo identity, we needed to wire up the rest of the plumbing. That work is done. You can now rename a repository from the settings page. Repository migrations between knots are next on this list.</p> </li> </ul>
<h2>VM-based CI is in internal testing</h2>
<p>We're currently testing the new spindle engine backed by QEMU micro VMs, with special niceties for Nix. :^) We're not quite ready to open this up yet, but expect it to land for everyone in the coming weeks.</p>
<p>That's it for this issue! As always, you can reply to this email, or find us on <a href="https://chat.tangled.org">Discord</a>.</p>
<p>— Anirudh</p>
