---
author: Alexandre Plennevaux
cover_image: 'https://pixeline.be/assets/images/atmentions-hero.png'
date: '2026-06-26T16:11:00.219Z'
dateFolder: 2026/06/26
description: >-
  Webmentions for the ATmosphere — a tiny open-source widget that shows how the
  atproto network reacted to any page, with no accounts and no lock-in.
isBasedOn: 'https://pixeline.be/projects/atmentions/'
link: 'https://pixeline.be/projects/atmentions/'
slug: 2026-06-26-httpspixelinebeprojectsatmentions
tags:
  - code
  - tech
  - decentralization
title: ATmentions
---
<figure><img alt="ATmentions" src="https://pixeline.be/assets/images/atmentions-hero.png"/></figure>
<p><strong>Webmentions for the ATmosphere.</strong> Drop one tag on any page and show how the open atproto network reacted to it — Bluesky likes &amp; reposts, standard.site recommends, reads, Frontpage, Margin notes, Semble saves, and anything built next. No accounts, no tracking, no lock-in: it's as plug 'n play as a jquery plugin :-).</p>
<p>The widget is open-source and can be themed with CSS variables.</p>
<h2>See it live — three variants</h2>
<p>Live reactions to <a href="https://pixeline.be/rants/2023-05-17/we-need-to-stop-calling-entertainers-artists/">a recent article</a>, rendered in each variant:</p>
<p><strong>Default</strong> — <code>variant="default"</code>: a strip of chips, one per reaction type.</p>
<p><strong>Minimal</strong> — <code>variant="minimal"</code>: a single count that expands to the breakdown.</p>
<p><strong>Full</strong> — <code>variant="full"</code>: one row per type, tagged with the logo of the app it came from.</p>
<h2>Add it to your site</h2>
<pre><code>&lt;script type="module" src="https://cdn.jsdelivr.net/gh/pixeline/atmentions@v0.1.1/dist/atmentions.min.js"&gt;&lt;/script&gt;
&lt;atmentions-reactions data-url="https://your.site/post"&gt;&lt;/atmentions-reactions&gt;
</code></pre>
<p>Point <code>data-url</code> at the page you want reactions for — it's the only required attribute. Everything below is optional.</p>
<h3>Theme — the <code>variant</code> attribute</h3>
<p><code>variant</code> chooses the layout (default: <code>default</code>):</p>
<ul> <li><strong><code>variant="default"</code></strong> — a horizontal strip of chips, one per reaction type; click a chip to reveal who reacted.</li> <li><strong><code>variant="minimal"</code></strong> — a single <em>"◇ N ATmosphere reactions"</em> count that expands to the per-type breakdown. Best where space is tight.</li> <li><strong><code>variant="full"</code></strong> — one row per reaction type, each tagged with the <strong>logo of the app it came from</strong> (Bluesky, Margin, Semble, standard.site, Frontpage, standard-reader, pckt — name on hover). Click a row to see who.</li> </ul>
<pre><code>&lt;atmentions-reactions data-url="https://your.site/post" variant="full"&gt;&lt;/atmentions-reactions&gt;
</code></pre>
<h3>Light or dark — the <code>appearance</code> attribute</h3>
<p>Defaults to a light palette; add <code>appearance="dark"</code> for the dark one:</p>
<pre><code>&lt;atmentions-reactions data-url="https://your.site/post" appearance="dark"&gt;&lt;/atmentions-reactions&gt;
</code></pre>
<h3>What it matches reactions against</h3>
<ul> <li><strong><code>data-url</code></strong> <em>(required)</em> — the page's public URL. Matches URL-keyed reactions: Margin notes, Semble saves, Frontpage posts, Bluesky link cards.</li> <li><strong><code>data-aturi</code></strong> — your page's standard.site document AT-URI (<code>at://…/site.standard.document/…</code>). Matches recommends, reads, and other AT-URI-keyed reactions.</li> <li><strong><code>data-bsky</code></strong> <em>(advanced)</em> — an anchor Bluesky post AT-URI, to tie likes/reposts/replies to a specific post.</li> </ul>
<h3>Empty state</h3>
<ul> <li><strong><code>empty-text="…"</code></strong> — custom text when a page has no reactions yet (default: <em>"No ripples in the ATmosphere yet."</em>).</li> <li><strong><code>hide-empty</code></strong> — render nothing at all when there are no reactions, instead of the empty-state line.</li> </ul>
<h3>Colors — CSS variables</h3>
<p>The widget renders in a Shadow DOM, so your page's CSS can't leak in and break it — but these custom properties pass through. Set them on the element (or any ancestor):</p>
<pre><code>atmentions-reactions {
  --atmo-fg: #3d3c3c;       /* text + icon color    */
  --atmo-muted: #777;       /* secondary labels     */
  --atmo-accent: #f7b4ed;   /* hover / focus border */
  --atmo-bg: transparent;   /* chip / row background */
  --atmo-radius: 0.5rem;    /* corner rounding      */
}
</code></pre>
<p><a href="https://github.com/pixeline/atmentions">Source on GitHub →</a></p>
