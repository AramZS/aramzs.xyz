---
author: Rana Ahsan
cover_image: 'https://codesamplez.com/wp-content/uploads/2026/03/local-coding-agent.webp'
date: '2026-07-22T18:43:34.420Z'
dateFolder: 2026/07/22
description: >-
  Learn how to set up a local LLM for coding with Ollama, Continue.dev, and VS
  Code. Covers model selection, hardware planning + IDE integration
isBasedOn: 'https://codesamplez.com/productivity/local-ai-coding-agent'
link: 'https://codesamplez.com/productivity/local-ai-coding-agent'
slug: 2026-07-22-httpscodesamplezcomproductivitylocal-ai-coding-agent
tags:
  - ai
title: 'Local LLM for Coding: Free AI Coding Agent With Ollama + Claude'
---
<figure><img alt="Local Coding Agent" src="https://codesamplez.com/wp-content/uploads/2026/03/local-coding-agent-840x470.webp"/><figcaption>Local Coding Agent</figcaption></figure>
<p>If you’ve been curious about running a <strong>local LLM for coding</strong> but felt overwhelmed by the sheer number of models, runtimes, and configuration options, this guide is for you. Not the “tab-complete a for loop” kind of local. I’m talking full agentic coding — an AI agent that reads your repo, plans changes across multiple files, runs shell commands, executes tests, and iterates on errors. All on your machine. Zero API costs. Zero code leaving your network.</p>
<p>Programming</p>
<p>The stack we’re building: <strong>Ollama + Claude Code + an open-weight model.</strong> It takes about 15 minutes to get running.</p>
<p><strong>What is a local LLM?</strong></p>
<p>A local LLM for coding is a large language model running entirely on your own hardware — laptop, workstation, or home server — that provides AI-powered code generation, refactoring, and agentic multi-file editing without sending a single line of code to the cloud. It matters because it gives you complete privacy, zero recurring costs, and AI coding assistance that works even without internet.</p>
<p>Pro Tip: New to agentic coding? Consider going over <a href="https://codesamplez.com/productivity/ai-coding-agent">beginners guide to ai coding assistant setup</a> first.</p>
<p>Before we set anything up, let me be specific about what changes when you move agentic coding off the cloud.</p>
<p><strong>Privacy becomes real, not theoretical.</strong> Agentic coding tools read <em>everything</em> — your entire repo structure, environment files, config files, test output, shell history. With a cloud provider, all of that context ships to someone else’s servers. After Samsung’s engineers accidentally uploaded confidential source code to ChatGPT back in 2023, this stopped being a paranoia issue and became a policy issue at many companies. Running locally means your proprietary business logic stays on your machine. Period.</p>
<p><strong>Cost drops to zero.</strong> Claude Code on Anthropic’s API is powerful but expensive — heavy agentic sessions with Opus can burn through $5-15/hour easily. Locally? Your electricity bill goes up a few dollars, … for the entire month! The math is absurdly good once you have the hardware.</p>
<p><strong>Availability becomes unconditional.</strong> Flights, coffee shops with garbage Wi-Fi, AWS outages that take down half the internet — none of it matters. Your AI coding agent is always on.</p>
<p><strong>The quality tradeoff is shrinking fast.</strong> In 2023, local models were a joke for agentic work. In 2026, models like <a href="https://huggingface.co/Qwen/Qwen3.5-35B-A3B">Qwen 3.5</a> and <a href="https://ollama.com/library/glm-4.7-flash">GLM-4.7-Flash</a> genuinely handle multi-file edits, tool calling, and long-context planning. They won’t match Opus 4.6 on the hardest tasks, but for building features, fixing bugs, and scaffolding projects? They’re shockingly competent.</p>
<h3>Setting Expectations</h3>
<p>Here’s what nobody warns you about: <strong>a local model won’t feel exactly like Claude Opus or GPT-5 on day one.</strong> And that’s okay.</p>
<p>TechnologyNews</p>
<p><strong>Local models are best at:</strong> scaffolding new features, generating boilerplate, writing tests, fixing bugs with clear error messages, and iterating on code with feedback loops.</p>
<p><strong>They’re weaker at:</strong> massive architectural decisions across 20+ files, highly nuanced refactoring of complex legacy code, and tasks requiring enormous context windows.</p>
<p>The sweet spot for local agentic coding is tasks where you can describe what you want, let the agent take a first pass, review, and iterate. That covers probably 80% of daily development work.</p>
<p>This is where most people get stuck. Hundreds of models on <a href="https://huggingface.co">Hugging Face</a>, new ones every week, every Reddit thread recommending something different. Let me cut through the noise.</p>
<p>For agentic coding, your model needs three things:</p>
<p><strong>long context</strong> (~64K tokens minimum),</p>
<p><strong>tool calling support</strong> (so the agent can execute commands, read files, run tests), and</p>
<p><strong>strong instruction following</strong> (so it doesn’t go off the rails mid-task). Not every model delivers on all three.</p>
<h3>The Models Worth Running Right Now</h3>
<p><strong><a href="https://huggingface.co/Qwen/Qwen3.5-35B-A3B">Qwen 3.5 35B-A3B</a></strong> — My current daily driver. Released February 2026, this is a 35B parameter MoE model that only activates 3B parameters per token. That means it’s fast AND smart. It supports 256K context natively, has strong agentic capabilities, and its tool calling works reliably with Claude Code. Benchmarks back this up — the 35B-A3B model surpasses much larger predecessors like Qwen3-235B, as well as proprietary models like GPT-5 mini and Claude Sonnet 4.5 in categories including knowledge and visual reasoning. Runs comfortably on 32GB unified memory or a 24GB GPU. Apache 2.0 license, fully open for commercial use.</p>
<p><strong><a href="https://ollama.com/library/glm-4.7-flash">GLM-4.7-Flash</a></strong> — The best all-around model for 24GB VRAM setups. GLM-4.7-Flash dominates with a 30.1 Intelligence Index and won agentic coding challenges in recent independent testing. It handles planning, multi-step tool use, and code generation across multiple files with real consistency. If Qwen 3.5 35B doesn’t click for you, GLM-4.7-Flash is a rock-solid alternative.</p>
<p><strong><a href="https://ollama.com/library/qwen3-coder:30b">Qwen3-Coder 30B-A3B</a></strong> — Purpose-built for coding agents. It offers 30B total parameters with only 3.3B activated, with exceptional agentic capabilities for real-world software engineering tasks and native support for 256K tokens. Trained specifically on agentic coding workflows through reinforcement learning on SWE-Bench. If your work is purely code (no general reasoning, no docs), this specialist might outperform the generalists above.</p>
<p><strong><a href="https://ollama.com/library/gpt-oss:20b">GPT-OSS 20B</a></strong> — OpenAI’s open-weight model. Strong reasoning and tool calling capabilities. A solid option at ~13GB, it fits on more modest hardware while still handling agentic workflows.</p>
<h3>Match Your Hardware to a Local LLM Model</h3>
<p>No CPU-only options here — agentic coding needs responsive inference, and CPU-only speeds are too slow for the multi-turn, tool-calling loops that Claude Code runs. You need a GPU or Apple Silicon unified memory.</p>
<p>Here’s the straightforward mapping:</p>
<p><strong>The quick rule of thumb:</strong> Take your available memory, subtract 2-4GB for overhead, and that’s your model size budget at Q4 quantization.</p>
<blockquote> <p><strong>What’s Q4 quantization?</strong> Quantization compresses model weights from 16-bit floats to smaller integers, dramatically reducing memory usage. Q4_K_M is the sweet spot — it cuts memory by ~75% with minimal quality loss. Below Q3, quality degrades noticeably. Ollama handles quantization automatically when you pull a model, so you don’t need to worry about the details.</p> </blockquote>
<h2>Setup Guide: Ollama + Claude Code</h2>
<p>One path. No forks. Let’s get a working local AI coding agent in 15 minutes.</p>
<h3>Step 1: Install Ollama</h3>
<p><a href="https://ollama.com">Ollama</a> handles model downloads, GPU detection, quantization, and serves an API that Claude Code talks to. It’s the foundation.</p>
<p>Verify it’s working:</p>
<p><em>Alt text: Terminal commands showing Ollama installation on macOS, Linux, and Windows with version verification</em></p>
<p><strong>Important:</strong> Make sure you’re on Ollama v0.14.0 or later. In January 2026, Ollama added support for the Anthropic Messages API, enabling Claude Code to connect directly to any Ollama model. Older versions won’t work with Claude Code.</p>
<h3>Step 2: Pull a Coding Model</h3>
<p>Pick a model from the recommendations above based on your hardware. Here are the pull commands:</p>
<p>Quick sanity check — run it interactively to confirm it works:</p>
<p>If you get a sensible response, you’re golden. If it’s painfully slow or crashes, you need a smaller model for your hardware. Type <code>/bye</code> to exit the interactive session.</p>
<h3>Step 3: Install Claude Code</h3>
<p>Claude Code is Anthropic’s terminal-based agentic coding tool. It can read your repo, plan changes, edit files, run commands, and iterate — all from your terminal. And thanks to Ollama’s Anthropic API compatibility, it works with local models.</p>
<p>Verify the installation:</p>
<h3>Step 4: Connect Claude Code to Ollama</h3>
<p>This is the key step. You need to tell Claude Code to talk to your local Ollama server instead of Anthropic’s cloud API.</p>
<p><strong>Option A: The one-liner (easiest)</strong></p>
<p>If your Ollama is up to date, this single command handles everything:</p>
<p>That’s it. Ollama sets the environment variables and launches Claude Code pointed at your local model.</p>
<p><strong>Option B: Manual environment variables (if <code>ollama launch</code> isn’t available)</strong></p>
<p>Add these to your <code>~/.bashrc</code>, <code>~/.zshrc</code>, or run them before launching Claude Code:</p>
<p>Then launch Claude Code in your project directory:</p>
<p><strong>Option C: Persistent config (recommended for daily use)</strong></p>
<p>Add the settings to Claude Code’s config file at <code>~/.claude/settings.json</code>:</p>
<p>Now every time you run <code>claude</code>, it’ll automatically connect to Ollama. Switch models anytime with:</p>
<p><em>Alt text: Three methods for connecting Claude Code to Ollama — one-liner, environment variables, and persistent config file</em></p>
<h3>Step 5: Test It On a Real Task</h3>
<p>Navigate to a project directory and give Claude Code a real job:</p>
<p>Watch it work. Claude Code will read your codebase, plan the changes, edit files, run your test suite, and fix issues — all powered by your local model. No tokens leave your machine. No API bill at the end.</p>
<p><strong>If things feel slow:</strong> The first prompt after loading a model takes longer (cold start). Subsequent prompts are much faster. You can keep models loaded longer by setting <code>OLLAMA_KEEP_ALIVE=30m</code> (or <code>-1</code> for indefinitely).</p>
<p>Getting the agent running is step one. Getting it to produce code you actually want to use? That’s the craft. Here’s what I’ve learned through hundreds of hours of local agentic coding.</p>
<h3>Prompt Patterns That Work</h3>
<p>Local models have smaller effective context windows than cloud models. Every wasted token costs you speed. These patterns make the most of what you have.</p>
<p><strong>“Plan first, code second.”</strong> Instead of asking the agent to immediately start editing files, ask it to outline its approach. This catches wrong assumptions before they waste 200 lines of generation:</p>
<p><strong>Use a CLAUDE.md file.</strong> Drop a <code>CLAUDE.md</code> in your project root with context about your stack, conventions, and testing commands. Claude Code reads this automatically. This single file replaces a ton of repeated prompt context:</p>
<p><strong>Constrain the scope.</strong> Local models can wander. Be explicit about boundaries:</p>
<h3>Quality Controls (Your Safety Net)</h3>
<p>Local models hallucinate. Smaller models hallucinate more than larger ones. These guardrails have saved me countless hours.</p>
<p><strong>Always require tests.</strong> If the agent generates a function, it should also generate the test. If the test fails, it should fix the code. This feedback loop catches the majority of hallucinated APIs and wrong assumptions. Claude Code does this naturally when you ask — lean into it.</p>
<p><strong>Keep your CLAUDE.md’s test command current.</strong> If Claude Code knows how to run your tests (<code>pytest</code>, <code>npm test</code>, <code>cargo test</code>), it’ll run them automatically after making changes and self-correct failures. This is the single most impactful quality improvement you can make.</p>
<p><strong>Don’t trust, verify.</strong> Review every change before committing. I treat local LLM output the same way I treat a PR from a new team member — review it, test it, then merge it.</p>
<p><strong>Watch for hallucinated imports.</strong> The most common failure mode: the model imports a function or library that doesn’t exist. Including your <code>package.json</code> or <code>requirements.txt</code> context (via CLAUDE.md or direct mention) reduces this significantly.</p>
<p>I’ve hit every one of these problems. Here are the fixes.</p>
<p><strong>Claude Code says “connection refused”:</strong> Ollama isn’t running. Start it with <code>ollama serve</code> or check that the Ollama app is open. Verify with <code>curl http://localhost:11434</code> — you should see “Ollama is running.”</p>
<p><strong>Model is painfully slow or hangs:</strong> Your model is too large for your hardware. Run <code>ollama ps</code> to check memory usage. If the model is spilling to CPU (you’ll see partial GPU offload), try a smaller model. Also check that no other heavy processes are eating your VRAM (<code>nvidia-smi</code> on NVIDIA, Activity Monitor on Mac).</p>
<p><strong>Claude Code errors with “model not found”:</strong> The model name must exactly match what Ollama has. Run <code>ollama list</code> and use the exact name shown. Common mistake: pulling <code>qwen3.5</code> but specifying <code>qwen3.5:35b-a3b</code> (or vice versa).</p>
<p><strong>First prompt takes forever, then it’s fine:</strong> This is the cold start — model weights loading into memory. Set <code>OLLAMA_KEEP_ALIVE=30m</code> to keep the model loaded for 30 minutes between requests. For all-day coding, use <code>OLLAMA_KEEP_ALIVE=-1</code>.</p>
<p><strong>Agent makes changes to wrong files or goes off-script:</strong> Your context window might be overflowing. Reduce the scope of your prompts, use a CLAUDE.md to establish boundaries, and break large tasks into smaller steps. Also try a model with better agentic training — Qwen3-Coder 30B was specifically RL-trained for multi-step coding tasks.</p>
<p><strong>Hallucinated APIs — model suggests functions that don’t exist:</strong> Include your dependency files in context. Add to your CLAUDE.md: “Only use APIs from dependencies listed in package.json / requirements.txt.” Run type-checking (<code>tsc --noEmit</code>, <code>mypy</code>, <code>pyright</code>) on generated code as a filter.</p>
<p><strong><code>ollama launch claude</code> returns “unknown command”:</strong> Your Ollama version is too old. Update Ollama — the <code>launch</code> command requires v0.14.0+. After updating, restart Ollama.</p>
<p>Running locally doesn’t automatically make you bulletproof. Here’s what to lock down.</p>
<p><strong>Disable VS Code / editor telemetry.</strong> If you’re also using an IDE alongside Claude Code, many extensions phone home with usage data. Set <code>"telemetry.telemetryLevel": "off"</code> in VS Code settings.</p>
<p><strong>Keep Ollama on localhost.</strong> Ollama binds to <code>127.0.0.1:11434</code> by default — that’s safe. If you change it to <code>0.0.0.0:11434</code> for remote access, anyone on your network can hit the API. Use a firewall or bind to a specific interface.</p>
<p><strong>Disable nonessential traffic.</strong> Add <code>CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1</code> to your environment variables. This prevents Claude Code from sending any analytics or telemetry.</p>
<p><strong>Enable disk encryption.</strong> Conversation history and model weights live on your disk. FileVault (Mac), LUKS (Linux), or BitLocker (Windows) protect them if your machine is lost or stolen.</p>
<p><strong>Check your model license.</strong> Most models covered here (Qwen 3.5, GLM-4.7, Qwen3-Coder) use Apache 2.0 or similarly permissive licenses — free for commercial use, no strings attached. DeepSeek models have a revenue threshold. Always check the model card on Hugging Face before deploying in a commercial context.</p>
