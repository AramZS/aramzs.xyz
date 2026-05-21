---
author: audreyt.org
cover_image: 'https://pi.audreyt.org/og-pi-ds4.jpg'
date: '2026-05-20T22:43:52.500Z'
dateFolder: 2026/05/20
description: >-
  Run a frontier model on your own machine with stable, contestable decision
  traces. Full install, steering, reproducibility, and tuning guide.
isBasedOn: 'https://pi.audreyt.org/'
link: 'https://pi.audreyt.org/'
slug: 2026-05-20-httpspiaudreytorg
tags:
  - ai
  - tech
title: Invite the frontier model onto your MacBook
---
<p>Run the 284‑billion-parameter DeepSeek V4 Flash on your own 96‑GB Apple Silicon Mac — no cloud calls, no API fees, no per‑token billing, no rate limits. The model’s directional steering dial stays in your hands. Stable seeds and tool-call IDs make decision traces repeatable, comparable, and contestable.</p>
<h2>  You don’t need to read the whole thing, <em>start here</em> </h2>
<h3>What is this?</h3>
<p><strong>pi-ds4</strong> runs a local inference server called <code>ds4-server</code> on your Mac, loading the <code>deepseek-v4-flash</code> AI model and exposing OpenAI <em>and</em> Anthropic API endpoints simultaneously on <code>127.0.0.1:8000</code>. The whole thing happens <em>entirely on your own machine</em> — no cloud, no API account, no per-token billing, none of the “sorry, I can’t respond to that” gates that cloud services routinely apply.</p>
<p>pi is its most convenient frontend, hence the name pi-ds4. But if you’re already using <strong>Codex CLI</strong>, <strong>Claude Code</strong>, <strong>OpenClaw</strong> or <strong>Hermes Agent</strong>, you can point any of them at this local server and use pi-ds4 as your local backend — all four shells are just an env-var or config-section change away. See <a href="https://pi.audreyt.org/#shells">Chapter 8</a>.</p>
<h3>Why the single-machine, single-stream shape matters</h3>
<p>Most hosted inference gets its throughput from batch size &gt; 1: one accelerator serving many people’s requests at once. That is efficient, but awkward for decision traces that must be inspected later — routing, scheduling, hidden seeds, and even tool-call IDs are often not things you can pin down. pi-ds4 takes the opposite trade: one machine, one user, one stream. By default <code>DS4_REPRODUCIBLE=1</code> injects seed <code>42</code>, and seeded ds4 requests also produce stable <code>call_…</code> / <code>toolu_…</code> tool IDs.</p>
<p>This does not make the model “always right”. It makes the answer, reasoning fragments, tool calls, and tool results form a replayable record. For public decisions, research interviews, procurement evaluation, or any setting that needs contestability and auditability, that shape matters: the same input can be rerun, a changed trace can be diffed, and a specific tool call can be named precisely.</p>
<p>It boils down to one pi command: <code>pi install github.com/audreyt/pi-ds4</code>. The <em>precondition</em> is that you already have <code>pi</code> on your machine — if <code>pi --version</code> returns <code>command not found</code>, head to <a href="https://github.com/earendil-works/pi">earendil-works/pi</a> first, follow its install steps, then come back. After that, the extension’s first launch will spend an hour or two downloading and compiling everything; subsequent launches are fast.</p>
<h3>Glossary at a glance</h3>
<dl> <dd>A command-line tool built by Earendil that lets you talk to AI inside your terminal. “pi” is the tool’s name, not the mathematical constant.</dd> <dd>The extension that glues pi and ds4 together. This guide covers Audrey Tang’s fork; see Chapter 3 for what differs from upstream.</dd> <dd>284 billion weight parameters — the scale of today’s open-weights frontier models. Only 13 B are activated per token via a Mixture-of-Experts (MoE) routing.</dd> <dd>Compresses the weights to fewer bits per parameter. The IQ2XXS-w2Q2K imatrix recipe used here averages about 2 bits per weight (routed experts use the tighter IQ2XXS quant, while attention/output/embedding stay at Q8_0), with an importance-matrix calibration on top, shrinking the model from its native FP8 size (~284 GB, equivalent to a Q8_0 GGUF) down to ~87 GB — the lever that lets it fit on a Mac.</dd> <dd>A run-time nudge to a few internal directions — no retraining — that lets the model approach contested questions in a deliberative register rather than a closed-form answer. See Chapter 4.</dd> </dl>
<h3>What does it cost me?</h3>
<ul> <li><strong>Hardware:</strong> an Apple Silicon Mac with at least 96 GB of RAM (M2 Ultra, M3 Max+, M4 Pro+, or M5). Macs in the 96–127 GB range need to raise Metal wired memory first (see the <a href="https://pi.audreyt.org/#ram96">§1.1 callout</a>); 128 GB+ Macs install directly and have headroom to run more apps alongside ds4-server. <a href="https://pi.audreyt.org/#otherhw">NVIDIA DGX Spark and other 128-GB unified-memory boxes</a> can run <em>the same ds4 engine</em> — <code>audreyt/ds4</code>’s Makefile auto-builds the CUDA path on Linux, and pi-ds4’s lifecycle wrapper (<code>ds4-watchdog.sh</code>) now handles both BSD and GNU userlands, so <code>pi install</code> works on DGX Spark too; you can still run ds4-server by hand if you’d rather skip the wrapper.</li> <li><strong>Disk:</strong> at least 120 GB of free space.</li> <li><strong>Time:</strong> the first install downloads a 87-GB model file — about 1–3 hours depending on bandwidth.</li> <li><strong>Not required:</strong> a GPU, a paid API, an account login, or sending any data to the cloud.</li> </ul>
<h3>Which reader are you?</h3>
<p> <a href="https://pi.audreyt.org/#shells">  Point Codex CLI / Claude Code / OpenClaw / Hermes at pi-ds4 as backend — Chapter 8.  </a> </p>
