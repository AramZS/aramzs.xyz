---
author: A. S. Md. Ferdousul Haque
cover_image: >-
  https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fjztqgee4m0p1uu93796j.png
date: '2026-07-22T18:43:43.159Z'
dateFolder: 2026/07/22
description: >-
  Agentic development is rapidly transforming the way developers design, build,
  and ship software....
isBasedOn: >-
  https://dev.to/ferdousulhaque/opencode-for-agentic-development-with-local-llms-2h4k
link: >-
  https://dev.to/ferdousulhaque/opencode-for-agentic-development-with-local-llms-2h4k
slug: >-
  2026-07-22-httpsdevtoferdousulhaqueopencode-for-agentic-development-with-local-llms-2h4k
tags:
  - ai
title: Opencode for Agentic Development with Local LLMs
---
<p>Agentic development is rapidly transforming the way developers design, build, and ship software. Tools like Opencode let developers pair powerful local LLMs with intelligent agents to automate coding tasks, refactor large codebases, and accelerate development—all while keeping data private and within your own machine.</p>
<p>If you want to get started with Opencode using local LLMs (like Llama, Mistral, Qwen, DeepSeek, Gemma), here’s a simple, practical guide. before that, let's know</p>
<h2>   Why OpenCode? </h2>
<ul> <li> <strong>Agentic workflows</strong> – AI agents that can modify your codebase intelligently.</li> <li> <strong>Local-first development</strong> – Integrate your own LLM running on GPU or CPU.</li> <li> <strong>Extensibility</strong> – Bring your own models, tools, and workflows.</li> <li> <strong>Security &amp; Privacy</strong> – No proprietary code leaves your machine.</li> </ul>
<h2>   Pre-requisites: </h2>
<ul> <li>Ollama</li> <li>GhostTTY</li> <li>Opencode</li> </ul>
<h3>   Install and Run a Local LLM </h3>
<ul> <li>Go to <a href="https://ollama.com">Ollama</a> and follow the steps to install on your OS</li> <li>Add the desired LLM that supports agentic flow e.g. qwen3:8B, llama3.1:8b and so on. Check on ollama site.</li> <li>Run the following to install Qwen LLM to your local environment </li> </ul>
<pre><code>ollama pull qwen3:8b
ollama list
ollama run qwen3:8b
</code></pre>
<ul> <li>Now add the following tweaking to increase context window for agents to work properly. </li> </ul>
<pre><code>ollama run &lt;model_name&gt;
&gt;&gt;&gt; /set parameter num_ctx 32768
&gt;&gt;&gt; /save &lt;model_name&gt;
</code></pre>
<h3>   Install Ghostty </h3>
<p>There are several TTY supported with opencode, I prefer ghostty which is very simple at the same time good UIUX. Follow instructions on <a href="https://ghostty.org/docs/install/binary">Ghostty</a> to install.</p>
<h3>   Install OpenCode </h3>
<p>Follow instructions on <a href="https://opencode.ai/docs/">OpenCode</a> to install.</p>
<h2>   Configuration </h2>
<p>Once the pre-requisite steps are done. Now comes the execution part. First we need to add the LLM to the OpenCode config <code>opencode.json</code> file located at <code>.config/opencode/opencode.json</code> to work on.</p>
<p>For more providers of opencode check <a href="https://opencode.ai/docs/providers/">here</a></p>
<pre><code>{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen3:8b": {
          "name": "qwen3:8b"
        }
      }
    }
  }
}
</code></pre>
<p>Once this is done, opencode is ready for action.</p>
<h2>   Execution </h2>
<p>Now let's build something. Follow the steps:</p>
<ul> <li>Open the ghostty terminal</li> <li>Create a directory for the application</li> <li>Run <code>opencode</code> inside the directory</li> </ul>
<figure><a href="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fvfaumxulwbqwc02mq84t.png"><img alt="OpenCode in Ghostty" src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fvfaumxulwbqwc02mq84t.png"/></a></figure>
<ul> <li>Select the model from <code>/models</code> </li> </ul>
<figure><a href="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxhuqf1f806b7xqrtixzu.png"><img alt="Select Local Model" src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxhuqf1f806b7xqrtixzu.png"/></a></figure>
<ul> <li>By using TAB of keyboard select the <code>BUILD AGENT</code> mode</li> <li>Give prompt for generating the code for new features or fix a bug in the application</li> </ul>
<h2>   Final Product </h2>
<p>I just build a tic-tac-toe game using the local LLM, although my CPUs are burning now 🔥 <a href="https://ferdousulhaque.github.io/tic-tac-toe/">Play here</a></p>
<figure><a href="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8m8s5ynfnvt4l8ghpg72.png"><img alt="Tic Tac Toe Game" src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8m8s5ynfnvt4l8ghpg72.png"/></a></figure>
<h2>   Benefits of Using Local LLMs </h2>
<ul> <li>Zero data leakage across the internet</li> <li>Better cost efficiency—no API billing</li> <li>Unlimited customization of models</li> <li>Offline development</li> <li>Faster iteration with GPU acceleration</li> </ul>
<p>Setting up Opencode with a local LLM unlocks a powerful, private, and fully autonomous coding partner. Whether you're building services, refactoring monoliths, or improving developer productivity, agentic development gives you a major edge.</p>
<p>If you're working with large codebases or exploring AI-powered software engineering, this setup is one of the best ways to get started.</p>
