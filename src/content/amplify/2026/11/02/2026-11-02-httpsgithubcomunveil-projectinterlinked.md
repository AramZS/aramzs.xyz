---
author: 'https://github.com/unveil-project/'
cover_image: >-
  https://opengraph.githubassets.com/eb54242737e0adfa39ac2b2845704d4171d31c64877807fb382f61db56fdd51d/unveil-project/interlinked
date: '2026-11-02T06:23:52.102Z'
dateFolder: 2026/11/02
description: >-
  Detect AI-agent-written PR descriptions . Contribute to
  unveil-project/interlinked development by creating an account on GitHub.
isBasedOn: 'https://github.com/unveil-project/interlinked'
link: 'https://github.com/unveil-project/interlinked'
slug: 2026-11-02-httpsgithubcomunveil-projectinterlinked
tags:
  - ai
title: interlinked
---
<div id="notebook-container"><article class="markdown-body entry-content container-lg"><p>
<themed-picture><figure><picture>
<source media="(prefers-color-scheme: dark)" srcset="https://github.com/unveil-project/interlinked/raw/main/.github/assets/logo-dark.svg"/>
<img alt="interlinked logo" src="https://github.com/unveil-project/interlinked/raw/main/.github/assets/logo-light.svg"/>
</picture></figure></themed-picture>
</p>
<div class="markdown-heading"><a class="anchor" href="#interlinked" id="user-content-interlinked"></a></div>
<p>
<a href="https://www.npmjs.com/package/@unveil/interlinked"><figure><img alt="npm version" src="https://camo.githubusercontent.com/6bcdb3f27db704f1eae80d08177d366838030fa2d1944fe89d36eb23e6ac84e2/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f40756e7665696c2f696e7465726c696e6b65643f636f6c6f723d386235636636"/></figure></a>
<a href="https://camo.githubusercontent.com/fe31a2e73a60d6feb20b8aafcbf851e1116f33ecbbcdf3330bce58613697042c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646570656e64656e636965732d302d333339393333"><figure><img alt="Zero dependencies" src="https://camo.githubusercontent.com/fe31a2e73a60d6feb20b8aafcbf851e1116f33ecbbcdf3330bce58613697042c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646570656e64656e636965732d302d333339393333"/></figure></a>
<a href="https://github.com/unveil-project/interlinked/blob/main/packages/interlinked/package.json"><figure><img alt="MIT license" src="https://camo.githubusercontent.com/b8cadaa967891081f8f165695470689986c028821dd8a040132f6e661795dc0d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c7565"/></figure></a>
</p>
<p>Detects AI-agent-written text in pull request descriptions, issues and comments. It reads text the way <a href="https://agentscan.tools">AgentScan</a> reads accounts, and labels it organic or automation, with how confident it is. Text that's too short to judge gets insufficient data.</p>
<p>No model is involved. The label comes from signals in the text's structure and style, so treat it as a hint, not a verdict.</p>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto"><pre>pnpm add @unveil/interlinked</pre><div class="zeroclipboard-container">
<clipboard-copy class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 d-flex flex-justify-center flex-items-center">
</clipboard-copy>
</div></div>
<div class="highlight highlight-source-ts notranslate position-relative overflow-auto"><pre><span class="pl-k">import</span> <span class="pl-kos">{</span> <span class="pl-s1">analyzeText</span> <span class="pl-kos">}</span> <span class="pl-k">from</span> <span class="pl-s">'@unveil/interlinked'</span>

<span class="pl-k">const</span> <span class="pl-kos">{</span> classification<span class="pl-kos">,</span> confidence<span class="pl-kos">,</span> signals <span class="pl-kos">}</span> <span class="pl-c1">=</span> <span class="pl-en">analyzeText</span><span class="pl-kos">(</span><span class="pl-s1">pr</span><span class="pl-kos">.</span><span class="pl-c1">body</span> <span class="pl-c1">??</span> <span class="pl-s">''</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
  <span class="pl-c">// Optional: the repo's PR or issue template, so its headings and</span>
  <span class="pl-c">// checklists don't count against the author.</span>
  template<span class="pl-kos">,</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span></pre><div class="zeroclipboard-container">
<clipboard-copy class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 d-flex flex-justify-center flex-items-center">
</clipboard-copy>
</div></div>
<p>You get the label back, how confident it is, and the signals behind it. For <a href="https://github.com/grafana/grafana/pull/135600">grafana/grafana#135600</a>:</p>
<div class="highlight highlight-source-js notranslate position-relative overflow-auto"><pre><span class="pl-kos">{</span>
  <span class="pl-c1">classification</span>: <span class="pl-s">'organic'</span><span class="pl-kos">,</span>
  <span class="pl-c1">confidence</span>: <span class="pl-c1">0.884</span><span class="pl-kos">,</span> <span class="pl-c">// 0.5 to 1, left out for insufficient data</span>
  <span class="pl-c1">signals</span>: <span class="pl-kos">[</span>
    <span class="pl-kos">{</span>
      <span class="pl-c1">id</span>: <span class="pl-s">'code-span-density'</span><span class="pl-kos">,</span>
      <span class="pl-c1">description</span>: <span class="pl-s">'wraps many names in inline `code` spans'</span><span class="pl-kos">,</span>
      <span class="pl-c1">hits</span>: <span class="pl-c1">2.19</span><span class="pl-kos">,</span>
      <span class="pl-c1">contribution</span>: <span class="pl-c1">0.25</span><span class="pl-kos">,</span> <span class="pl-c">// positive leans automation</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-kos">{</span>
      <span class="pl-c1">id</span>: <span class="pl-s">'template-checkboxes'</span><span class="pl-kos">,</span>
      <span class="pl-c1">description</span>: <span class="pl-s">'has a checkbox list'</span><span class="pl-kos">,</span>
      <span class="pl-c1">hits</span>: <span class="pl-c1">1</span><span class="pl-kos">,</span>
      <span class="pl-c1">contribution</span>: <span class="pl-c1">-</span><span class="pl-c1">0.13</span><span class="pl-kos">,</span> <span class="pl-c">// negative leans organic</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-kos">{</span>
      <span class="pl-c1">id</span>: <span class="pl-s">'contractions'</span><span class="pl-kos">,</span>
      <span class="pl-c1">description</span>: <span class="pl-s">"uses contractions (don't, it's, we'll)"</span><span class="pl-kos">,</span>
      <span class="pl-c1">hits</span>: <span class="pl-c1">3.77</span><span class="pl-kos">,</span>
      <span class="pl-c1">contribution</span>: <span class="pl-c1">-</span><span class="pl-c1">0.72</span><span class="pl-kos">,</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
  <span class="pl-kos">]</span><span class="pl-kos">,</span>
<span class="pl-kos">}</span></pre><div class="zeroclipboard-container">
<clipboard-copy class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 d-flex flex-justify-center flex-items-center">
</clipboard-copy>
</div></div>
<div class="markdown-heading"><h2 class="heading-element">Used by</h2><a class="anchor" href="#used-by" id="user-content-used-by"></a></div>
<ul>
<li><a href="https://github.com/MatteoGabriele/agentscan-text-action">AgentScan Text Action</a> runs interlinked on every pull request description and labels the ones that read as automated.</li>
</ul>
<div class="markdown-heading"><h2 class="heading-element">Development</h2><a class="anchor" href="#development" id="user-content-development"></a></div>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto"><pre>pnpm install
pnpm dev        <span class="pl-c"><span class="pl-c">#</span> build the library and start the site</span>
pnpm <span class="pl-c1">test</span>       <span class="pl-c"><span class="pl-c">#</span> run the library tests</span>
pnpm check      <span class="pl-c"><span class="pl-c">#</span> lint and format</span></pre><div class="zeroclipboard-container">
<clipboard-copy class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 d-flex flex-justify-center flex-items-center">
</clipboard-copy>
</div></div>
<div class="markdown-heading"><h2 class="heading-element">License</h2><a class="anchor" href="#license" id="user-content-license"></a></div>
<p><a href="https://github.com/unveil-project/interlinked/blob/main/packages/interlinked/package.json">MIT</a></p>
</article></div>
