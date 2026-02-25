---
author: 'https://julien.danjou.info/about'
cover_image: 'https://julien.danjou.info/og/open-source-after-the-extraction.png'
date: '2026-02-24T18:16:30.727Z'
dateFolder: 2026/02/24
description: >-
  The old open source deal is dead. What replaces it isn't a fix, it's a
  transformation. Open source stops being a community and becomes a supply
  chain.
isBasedOn: 'https://julien.danjou.info/blog/open-source-after-the-extraction/'
link: 'https://julien.danjou.info/blog/open-source-after-the-extraction/'
slug: 2026-02-24-httpsjuliendanjouinfoblogopen-source-after-the-extraction
tags:
  - tech
title: 'Open Source After the Extraction — jd:/dev/blog'
---
<figure></figure><p>February 24, 2026  · </p>
<figure></figure><p>4 min read   </p>
<figure></figure><p>#263 </p>
<p>The old open source deal is dead. What replaces it isn't a fix, it's a transformation. Open source stops being a community and becomes a supply chain.</p>
<p><a href="https://julien.danjou.info/tags/open-source"> open-source </a><a href="https://julien.danjou.info/tags/ai"> ai </a></p>
<p>In the <a href="https://julien.danjou.info/blog/open-source-is-getting-used-to-death">first part</a> of this series, I laid out how AI broke the implicit deal that sustained open source for 30 years. Usage up, engagement gone, economics collapsing.</p>
<figure><img alt="An empty library where robotic arms sort through books (no readers in sight)" src="https://julien.danjou.info/images/blog/open-source-after-the-extraction/empty-library.png"/></figure>
<p>So what happens next? Open source doesn’t vanish. But it doesn’t recover either. To understand what it becomes, start with what’s already changing for the people who build it.</p>
<figure></figure><p>contents</p>
<ol><li><a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#240-million-downloads-zero-feedback">240 million downloads, zero feedback</a></li><li><a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#the-middle-collapses">The middle collapses</a></li><li><a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#the-twist-nobody-sees-coming">The twist nobody sees coming</a></li><li><a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#whats-left">What’s left</a></li></ol>
<h2>240 million downloads, zero feedback<a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#240-million-downloads-zero-feedback">#</a></h2>
<p>I maintain <a href="https://github.com/jd/tenacity">tenacity</a>, a retry library for Python. 240 million downloads last month. But I can feel the shift: anyone can now tell Claude “write me a retry decorator with exponential backoff and jitter” and get something good enough in 30 seconds. The library isn’t competing with other libraries anymore. It’s competing with generating the code on the fly.</p>
<p>I started <a href="https://awesomewm.org">awesome</a> in 2007 because I wanted a tiling window manager that didn’t suck. Nobody was paying me. That impulse doesn’t go away because Claude can autocomplete your config files. But here’s the thing: I kept maintaining it because people <em>used</em> it. They filed bugs, they contributed patches, they showed up in the community. That feedback loop is what made the work feel worth doing.</p>
<p>If users stop showing up (because they generated their own config, their own tool, their own solution) that loop breaks. Starting a project still feels great. Maintaining one nobody engages with doesn’t. And when code is a commodity, a project needs <em>vision</em> to stand out: a point of view, a design philosophy, an opinionated take on how things should work. Open source used to reward craft. Now it rewards product thinking. Not everyone wants to be a product person.</p>
<h2>The middle collapses<a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#the-middle-collapses">#</a></h2>
<p><a href="https://tailwindcss.com/">Tailwind</a> is the poster child (80% revenue drop despite growing usage) but think of every well-crafted open source project sustained by one person or a small team selling docs, courses, or sponsorships. That entire tier is in trouble.</p>
<p>Companies like <a href="https://redis.io/">Redis</a> or <a href="https://www.elastic.co/">Elastic</a> can adapt because they have real revenue and can change their licenses: <a href="https://redis.io/blog/redis-adopts-dual-source-available-licensing/">Redis switched to dual licensing</a>, <a href="https://www.elastic.co/blog/elasticsearch-is-open-source-again">Elastic went SSPL then came back</a>, <a href="https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license">HashiCorp moved to BSL</a>. Some mid-tier projects get absorbed into corporate ecosystems: <a href="https://vercel.com">Vercel</a> backs <a href="https://nextjs.org/">Next.js</a>, <a href="https://astro.build/blog/supporting-the-future-of-astro/">Cloudflare acquires Astro</a>. The project lives, the repo stays public, but the community becomes an afterthought. It’s corporate R&amp;D with a GitHub URL.</p>
<p>And new licenses are emerging to fight back. The <a href="https://polyformproject.org/licenses/shield/1.0.0/">PolyForm Shield</a> restricts competitors from using your code. The <a href="https://www.licenses.ai/">Responsible AI License (RAIL)</a> adds behavioral restrictions on AI use. Some projects are experimenting with clauses that explicitly prohibit feeding code into training datasets: you can use my code, but you can’t feed it to a model that will help your users bypass me entirely.</p>
<p>Whether these licenses will hold up in court is untested. But the fact that they’re emerging tells you something. When maintainers start lawyering up, the community era is over. The solo maintainer doesn’t have Redis’s resources to pivot. They either stop, or <a href="https://steipete.me/posts/2026/openclaw">get acqui-hired by the companies that need their work</a>.</p>
<h2>The twist nobody sees coming<a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#the-twist-nobody-sees-coming">#</a></h2>
<p>Here’s the thing that makes this hard to see clearly: open source looks <em>healthier</em> than ever from the outside.</p>
<p>Corporate open source output is actually <em>increasing</em>. <a href="https://opensource.fb.com/">Meta</a> open-sources <a href="https://pytorch.org/">PyTorch</a> and <a href="https://llama.meta.com/">Llama</a> to commoditize the AI stack and set the standards others build on. <a href="https://opensource.google/">Google</a> does the same with <a href="https://kubernetes.io/">Kubernetes</a> and <a href="https://go.dev/">Go</a>. AI labs publish model weights so the ecosystem locks into their formats. More code than ever is landing in public repos.</p>
<p>But the word “open” is doing a lot of heavy lifting. These projects are strategic assets with public URLs. There’s no community, just suppliers and consumers. <a href="https://kernel.org">Linux</a>, <a href="https://curl.se/">curl</a>, <a href="https://www.postgresql.org/">PostgreSQL</a> get funded not because people care, but because they’re supply chain dependencies (professionalized maintainers on corporate payrolls, a trend building for over 20 years). The corporate-backed projects were never communities to begin with.</p>
<p>Open source isn’t dying. It’s being industrialized. The old open source was a community. People showed up because they cared. They contributed because they were proud. They maintained because they were recognized. The economics were messy and implicit, but they were human. The new open source is a supply chain.</p>
<h2>What’s left<a href="https://julien.danjou.info/blog/open-source-after-the-extraction/#whats-left">#</a></h2>
<p>I’ve been in open source for over 20 years. The thing I loved about it was never the code. It was the bug reports that turned into conversations. The patches from strangers who cared. The feeling of building something together that none of us could have built alone.</p>
<p>Some will argue AI lowers the barrier to contribute, that agents filing PRs and writing docs keeps the ecosystem healthy. Maybe. But a pull request from a bot isn’t the same as a patch from someone who cared enough to read your code and understand your design. The mechanical contribution survives. The human connection doesn’t.</p>
<p>The open source that comes next will produce good software. Maybe even better software, once infrastructure gets properly funded and AI tooling matures. But it’ll be lonelier. More transactional. Less weird.</p>
<p>The code will keep flowing. The community won’t.</p>
<aside> <h3> &gt; Stay in the loop </h3> <p> Get new posts delivered to your inbox. No spam, unsubscribe anytime. </p> <p> Join 500+ developers and engineering leaders. </p> <figure></figure> Subscribe    or follow via <a href="https://julien.danjou.info/rss.xml"> <figure></figure> RSS </a> </aside>
<p>share:     </p>
<figure></figure><h2><figure></figure> Related posts</h2>
<figure><a href="https://julien.danjou.info/blog/open-source-is-getting-used-to-death"><img alt="Open Source Is Getting Used to Death" src="https://julien.danjou.info/images/blog/open-source-used-to-death/robots-lib.png"/></a></figure>
<figure></figure><p>Feb 17, 2026  ·</p>
<figure></figure><p>5 min read</p>
<h3> <a href="https://julien.danjou.info/blog/open-source-is-getting-used-to-death"> Open Source Is Getting Used to Death </a> </h3>
<p>AI broke the implicit deal that sustained open source for 30 years. Usage is up. Engagement is gone. The economics don't work anymore.</p>
<p><a href="https://julien.danjou.info/blog/open-source-is-getting-used-to-death"> Read more → </a> </p>
<figure><a href="https://julien.danjou.info/blog/how-entire-works-under-the-hood"><img alt="How Entire Works Under the Hood" src="https://julien.danjou.info/images/blog/entire/repo.png"/></a></figure>
<figure></figure><p>Feb 12, 2026  ·</p>
<figure></figure><p>6 min read</p>
<h3> <a href="https://julien.danjou.info/blog/how-entire-works-under-the-hood"> How Entire Works Under the Hood </a> </h3>
<p>I dug into Entire's open source Checkpoints CLI. It's a clever abuse of git internals — shadow branches, orphan metadata, and a session state machine. Here's how it works.</p>
<p><a href="https://julien.danjou.info/blog/how-entire-works-under-the-hood"> Read more → </a> </p>
<p><a href="https://julien.danjou.info/blog/open-source-is-getting-used-to-death"><figure></figure> prev Open Source Is Getting Used to Death</a></p>
