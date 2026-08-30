---
author: David Dalcu
cover_image: 'https://mlxserve.com/appiconb.png'
date: '2026-08-29T23:52:14.814Z'
dateFolder: 2026/08/29
description: >-
  S-tier rankings of local LLMs on Apple Silicon. Pick your Mac's memory, see
  what fits, vote with your Google account.
isBasedOn: 'https://mlxserve.com/llm-tier-list/'
link: 'https://mlxserve.com/llm-tier-list/'
slug: 2026-08-29-httpsmlxservecomllm-tier-list
tags:
  - ai
  - tech
title: The local LLM tier list.
---
<p>Community · Tier list</p>
<p>Community-voted rankings of the LLMs that run locally on Apple Silicon — auto-updated from Hugging Face, filtered to your Mac's unified memory. One Google account, one vote per model.</p>
<h2>Quant playground.</h2>
<p>Build a setup the way you'd build a quant: pick a Mac, pick a model, drop it to 3-bit, quantize the KV cache, switch on speculative decoding. Every number is computed live from a roofline model fitted to <a href="https://mlxserve.com/#performance">our own published benchmarks</a>. No download, no waiting.</p>
<p>M1M2M3M5</p>
<p>BaseProUltra</p>
<p>36 GB48 GB128 GB</p>
<p>40-core GPU · 546 GB/s memory bandwidth</p>
<p>2-bitMixedbf16</p>
<p>4K128K</p>
<p>PLDDrafter</p>
<p>35 of 57 · 4-bit costs 2.0 pts · bar ends at the best open-weights score</p>
<p>16.5 GB weights + 1.7 GB KV @ 8K + 2.4 GB runtime = 20.5 GB of 51 GB usable</p>
<p>Fits comfortably, 30.5 GB to spare. A full 8K prompt starts answering in ~37.1s.</p>
<p><code>mlx-serve run qwen3.6-27b --ctx-size 8192</code></p>
<p>Decode is modelled as bandwidth-bound (active weights + KV read per token), prefill as compute-bound (2·active params per token), fitted to our M4 Max benchmark runs and re-checked against them on every build. Expect ±10% on decode and ±25% on prefill; a real checkpoint's mileage moves with its converter. M5 puts a Neural Accelerator in every GPU core: we have measured its speculative-decoding lane but not general prefill, so M5 prompt figures are the one extrapolation here. Intelligence is the <a href="https://artificialanalysis.ai/models/open-source">Artificial Analysis Intelligence Index</a> (snapshot 2026-08-05) scaled by a quantization-quality curve; models AA hasn't scored are marked <b>est</b> and inferred from scale alone (±10 points). <b>This data is hard to keep current.</b> New Macs ship, Artificial Analysis re-bases its index, and better quants land constantly. If a number here is wrong, a pull request to fix it would be appreciated: <a href="https://github.com/ddalcu/mlx-serve/edit/main/website/llm-tier-list/index.html">edit this page on GitHub</a>. The chip table, the AA scores and the model list are all in that one file.</p>
<h2>Not yet ranked</h2>
<p>Models with no published Artificial Analysis score. Real enough to run, not yet measured, so they aren't placed on a guess. Vote them up anyway: your votes are what will rank this board. Same hardware filters as above; rows hold their position while you vote.</p>
