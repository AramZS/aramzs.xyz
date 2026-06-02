---
author: William Zujkowski
cover_image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=630'
date: '2026-06-02T00:16:15.568Z'
dateFolder: 2026/06/01
description: >-
  How I built Tsundoku — a curated digital bookshelf with multi-source
  enrichment, free reading links, and a static-site architecture that serves
  3,500+ books without a database.
isBasedOn: >-
  https://williamzujkowski.github.io/posts/2026-02-23-building-tsundoku-digital-bookshelf/
link: >-
  https://williamzujkowski.github.io/posts/2026-02-23-building-tsundoku-digital-bookshelf/
slug: >-
  2026-06-01-httpswilliamzujkowskigithubioposts2026-02-23-building-tsundoku-digital-bookshelf
tags:
  - code
title: 'Building a 3,500-Book Digital Library with Astro and Six APIs'
---
<p>The Japanese word <em>tsundoku</em> (積ん読) describes the habit of acquiring books and letting them pile up unread. I have this problem. So I built a website for it.</p>
<p><a href="https://github.com/williamzujkowski/tsundoku">Tsundoku</a> is a curated digital bookshelf — 3,534 books across 29 categories, with search, reading progress tracking, author pages with Wikipedia bios, and free reading links. It’s a static site built with Astro 6 and Svelte 5, backed by a Python enrichment pipeline that pulls from six different APIs.</p>
<h2>Why I Built This</h2>
<p>I maintain a CSV of books I’ve read, want to read, or find interesting. The spreadsheet grew to 3,500+ entries. Goodreads felt wrong: I don’t want social features, and I don’t want Amazon owning my reading data. I wanted something I controlled that could also surface free, legal reading options for public domain works.</p>
<p>The constraints were clear: no database, no backend, no hosting costs beyond a static file server. Everything had to be pre-built at compile time.</p>
<h2>The Enrichment Pipeline</h2>
<p>The core of the project isn’t the website. It’s the Python pipeline that turns a CSV of titles and ISBNs into a rich dataset. Each book gets enriched from six sources:</p>
<p><strong>Open Library</strong> provides the backbone — metadata, subject classifications, cover images, and first-publish dates. Their API is free, no key required, and handles about 80% of lookups correctly. The remaining 20% is where things get interesting.</p>
<p><strong>Google Books</strong> fills metadata gaps — descriptions, page counts, and alternative ISBNs that Open Library doesn’t have. Rate limits are generous (1,000 requests/day without a key) but you’ll hit them on a full 3,500-book run. I added exponential backoff and a local cache that persists across runs.</p>
<p><strong>Wikipedia</strong> provides author biographies and portrait images. The MediaWiki API is powerful but returns deeply nested JSON that requires careful parsing. About 15% of authors have disambiguation pages instead of direct articles; the pipeline handles this by checking for the <code>(author)</code> or <code>(writer)</code> suffix variants.</p>
<p><strong>Project Gutenberg</strong> links to free ebook downloads. Their catalog is a CSV dump, not an API, so I load the entire catalog (~70,000 entries) into memory and match by title and author. Fuzzy matching catches “The Art of War” vs “Art of War, The” but still misses about 5% of valid matches where titles differ significantly between editions.</p>
<p><strong>LibriVox</strong> provides free audiobook links. Their API is XML-based (not JSON), which means a different parsing path. Coverage is smaller than Gutenberg — about 20,000 titles — but the audiobook links are surprisingly popular with users.</p>
<p><strong>HathiTrust</strong> verifies copyright status. A book marked “public domain” in one source might be “in-copyright” in another due to different edition dates. HathiTrust’s rights API provides the most authoritative US copyright determination.</p>
<h2>Data Conflicts Are the Hard Problem</h2>
<p>Six APIs give six different opinions about the same book. The pipeline’s conflict resolution rules took more iteration than the API integrations themselves:</p>
<ul> <li><strong>Publish dates</strong>: Open Library says “The Art of War” was published in -500. Google Books says 2003 (the translation). The pipeline uses the earliest date from Open Library but flags anything before year 0 for manual review.</li> <li><strong>Page counts</strong>: A hardcover and paperback of the same book have different page counts. I take the median across sources, which is wrong for anthologies but right for most single-author works.</li> <li><strong>Author names</strong>: “Mark Twain” vs “Samuel Clemens” vs “Twain, Mark.” I normalize to “First Last” format and deduplicate by checking Wikipedia for canonical names.</li> <li><strong>Cover images</strong>: Open Library covers range from high-quality scans to blurry thumbnails. The pipeline scores covers by resolution and prefers Google Books covers when Open Library’s is below 200px wide.</li> </ul>
<p>The pipeline logs every conflict to a <code>conflicts.jsonl</code> file. After each full run, I review the top conflicts manually — usually about 50-80 entries need human judgment.</p>
<h2>Static Site Architecture</h2>
<p>The website generates 5,178 static pages — 3,534 book pages, 1,615 author pages, and 29 category pages. Astro’s content collections handle this cleanly. Each book is a JSON entry in a collection, and Astro generates a page for each one at build time. The full build takes about 28 seconds on my M1 MacBook — roughly 185 pages per second.</p>
<p>Search uses Pagefind, which builds a client-side search index at compile time. The index for 3,534 books is about 400KB compressed — small enough to load on first search interaction without noticeable delay.</p>
<p>Reading progress is stored in <code>localStorage</code> — no account needed, no server, completely private. The downside is it doesn’t sync across devices, but that’s a tradeoff I’m comfortable with.</p>
<h2>What I’d Do Differently</h2>
<p><strong>The CSV format is limiting.</strong> As the enrichment pipeline grew, the input CSV became a bottleneck. Fields like “reading notes” and “personal rating” don’t fit cleanly into flat columns. I should have started with JSON or YAML input from day one.</p>
<p><strong>Cover image quality is inconsistent.</strong> Despite the resolution scoring, about 10% of books have low-quality or missing covers. A future version should generate placeholder covers with the title and author name when no good image exists.</p>
<p><strong>Category taxonomy is manual.</strong> I hand-assign categories from a fixed list of 29. Some books belong in multiple categories. A proper tagging system would be more flexible than single-category assignment.</p>
<h2>The Numbers</h2>
<ul> <li>3,534 books across 29 categories</li> <li>1,615 unique authors with Wikipedia bios</li> <li>~40% of books link to free reading options (Gutenberg/LibriVox)</li> <li>5,178 static pages generated in 28 seconds</li> <li>6 API sources with exponential backoff and local caching</li> <li>~50-80 manual conflict reviews per full enrichment run</li> </ul>
<p>The repo is at <a href="https://github.com/williamzujkowski/tsundoku">github.com/williamzujkowski/tsundoku</a>. The enrichment pipeline is reusable: if you have a CSV of books, you can build your own digital bookshelf.</p>
