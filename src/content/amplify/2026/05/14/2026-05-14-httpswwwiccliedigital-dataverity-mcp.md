---
author: Johnny Ryan
cover_image: 'https://www.iccl.ie/wp-content/uploads/2026/05/verity-card.png'
date: '2026-05-14T07:29:18.428Z'
dateFolder: 2026/05/14
description: >-
  We have developed an LLM MCP tool to minimise false LLM claims. It combines
  seven layers of checks in to one tool. You can use it with LM Studio.
isBasedOn: 'https://www.iccl.ie/digital-data/verity-mcp/'
link: 'https://www.iccl.ie/digital-data/verity-mcp/'
slug: 2026-05-14-httpswwwiccliedigital-dataverity-mcp
tags:
  - ai
  - tech
title: Verity MCP
---
<p>LLMs confidently claim things that are manifestly untrue. <a href="https://iccl.ie/enforce/">Enforce</a> has developed Verity, a tool that helps minimise false claims and fake sources from self-hosted LLMs. It can run on cheap, old hardware. We think it is the first MCP<sup data-mfn="1" data-mfn-post-scope="00000000000032390000000000000000_17662"><a href="javascript:void(0)">1</a></sup> that combines seven layers of checks in one tool: strict sourcing rules, cross-family LLM critics, NLI<sup data-mfn="2" data-mfn-post-scope="00000000000032390000000000000000_17662"><a href="javascript:void(0)">2</a></sup>, deterministic arithmetic recompute,<sup data-mfn="3" data-mfn-post-scope="00000000000032390000000000000000_17662"><a href="javascript:void(0)">3</a></sup> consistency sampling,<sup data-mfn="4" data-mfn-post-scope="00000000000032390000000000000000_17662"><a href="javascript:void(0)">4</a></sup> perplexity,<sup data-mfn="5" data-mfn-post-scope="00000000000032390000000000000000_17662"><a href="javascript:void(0)">5</a></sup> and identifies disputes among these many critics. It is not simply an LLM-as-judge.</p>
<p>Verity can also produce second opinions. If you have a spare old graphics card Verity can use it to produce opinions at the same time that your primary LLMs responds. Both answers are then considered by your primary LLM. Once adapted for your hardware, you can easily use Verity in LM Studio. We are also sharing our system prompts, which help minimise LLM mistakes separate to Verity.</p>
<p>Today, we are releasing Verity for anyone to use, test, adapt, and improve.</p>
<p><strong>Knowledge<br/>
</strong>Understanding of LM Studio.</p>
<p><strong>Software <br/>
</strong>Node.js v18+, <a href="https://lmstudio.ai/">LM Studio</a> v0.3.x+ running on port 1234, and <a href="https://ollama.com/">Ollama</a> (if using mixed GPUs). To insure claims by an LLM are tied to real online sources, install MCPs for searching and downloading sources and use our additional system prompt chunks.</p>
<p><strong>Hardware</strong><br/>
The reference machine is a 2021 PC with a 2025 primary GPU (Nvidia 5070ti 16GB) and a 2019 (AMD 5700xt 8GB) secondary GPU. Humble hardware running small models works well.</p>
<p><strong>Suggested LM Studio settings </strong>(for reference hardware and models) <br/>
<strong>Model settings</strong>: Unified KV cache on, K and V cache quant set to Q8, max CPU threads, max practical GPU offload. Offload KV cache to GPU on. Try mmap() on. Keep model in memory on. Flash attention on. <br/>
<strong>Inference settings</strong>: Top K sampling: 40. Temperature: 1. Presence penalty: 1.5. Top P sampling: .95.</p>
<p>VERIFICATION LAYERS</p>
<p>Seven blind spots. <br/>
Seven checks.</p>
<p>Verity combines multiple checks: strict sourcing rules, a stronger critic LLM, a smaller critic LLM built with a different scratch corpus (because LLMs trained on similar data tend to be wrong about the same things), an encoder transformer trained on entailment labels, a regex evaluator, a stochastic re-sampler, and a logprob analyser.</p>
<p>Built in prompt</p>
<p>The primary LLM is instructed to strictly source all facts. It will now claim only what it can validate with a working URL source. No more made up sources, and far fewer made up facts.</p>
<p>Critic A · LLM from a different family</p>
<p>An LLM from a different family to the primary LLM reads its answer with fresh eyes. It runs on the secondary GPU if available, and targets subtle code bugs, logic flaws, citation errors, off-by-ones.</p>
<p>Default LLM: IBM Granite 3.2 8B</p>
<p>Critic B · LLM from same family, different corpus</p>
<p>A smaller LLM that is four times faster than Critic A. Critic B is from the same family as Critic A, but trained from a different scratch corpus per IBM's release notes. It targets simple errors.</p>
<p>Default LLM: IBM Granite 3.2 2B</p>
<p>NLI claim-checker · NOT an LLM</p>
<p>A 0.4 B-parameter encoder transformer. It reads premise and claim pairs and evaluates: entailment/contradiction/neutral. It runs on the CPU.</p>
<p>DeBERTa-v3-large cross-encoder</p>
<p>Recompute arithmetic pass · NOT an LLM</p>
<p>Evaluates arithmetic, range enumerations, and unit conversions.</p>
<p>Deterministic regex + arithmetic</p>
<p><strong>/verifydeep</strong> and <strong>/verifydeeper</strong> add two more layers</p>
<p>Asks the primary LLM the same question 2 (deep) or 5 (deeper) times at temperature 0.7 and checks whether the original claims survive. Catches low-confidence guessing.</p>
<p>SelfCheckGPT-style divergence</p>
<p>Perplexity · Primary LLM logprobs</p>
<p>The primary LLM scores its own answer's tokens, revealing low-confidence predictions.</p>
<p>Token-entropy rescore</p>
<p>The reference design keeps four models loaded</p>
<p>See documentation for full list. Append one of these to any LM Studio message you want re-checked</p>
<table> <tr> <th>Command</th> <th>Effect</th> <th>Time</th> </tr> <tbody> <tr> <td><code>/verify</code></td> <td>Two critics + NLI + recompute</td> <td>~3–5 s</td> </tr> <tr> <td><code>/verifydeep</code></td> <td>Adds 2-sample consistency re-sampling and perplexity rescore.</td> <td>~20 s</td> </tr> <tr> <td><code>/verifydeeper</code></td> <td>5-sample consistency, plus regenerate-with-logprobs as a fallback</td> <td>~40 s</td> </tr> <tr> <td><code>/second</code></td> <td>Second opinion: two cross-family models answer in parallel; <br/> a third compares them</td> <td>~10 s</td> </tr> <tr> <td><code>/verify with context</code></td> <td>Critics receive earlier messages that contributed to the answer<br/> they are reviewing</td> <td>—</td> </tr> <tr> <td><code>/verify no-nli</code></td> <td>Skip the NLI claim-checker for speed</td> <td>—</td> </tr> <tr> <td><code>/verify as code</code></td> <td>Force the code-review critic prompt</td> <td>—</td> </tr> </tbody> </table>
<p>You can combine several. For example verifydeeper + as code + with context:</p>
<pre>/verifydeeper as code with context</pre>
<p>LM Studio system prompt</p>
<p>Required</p>
<p>Add this test to your LM Studio system prompt to ensure LM Studio uses Verity when you type /verify.</p>
<p>Treat /verify as a tool use trigger. You must always call verify_answer when this is in the user's question.</p>
<p>You can also use these prompt chunks to minimise spurious claims even when not using Verity</p>
<p>This part of our prompt text tells the primary LLM to only claim facts that it has found working sources to prove. This can cause several rounds of searching and fetching sources and dramatically improves LLM responses. However, there may be a speed cost. Responses that might have been quick but wrong are now often slower, but better.</p>
<p>All facts except the most trivial are to be verified. Do not fabricate. Provide URLs that are working (fetch them to check). When stating facts, provide in-line citation to the source in the following format &lt;source number&gt;, &lt;author&gt;, &lt;publisher&gt;, &lt;year&gt;, &lt;page number&gt;, &lt;url&gt;.</p>
<p>This part of our prompt text tells the primary LLM to proactively use Verity and to recognise user commands. If an issue is complicated then the critics will be asked to prepare a second opinion in parallel with the primary LLM.</p>
<p>If a question or task is complex, use /second at the start of the process.<br/>
After composing your answer, if you were uncertain about any specific claim (dates, numbers, citations, named entities), ask the user if you can use /verifydeeper automatically.</p>
<p>New + old GPU pair? Apple Silicon? Single card? The architecture adapts. Knobs are flagged in src/config.ts; the README walks through each common setup.</p>
