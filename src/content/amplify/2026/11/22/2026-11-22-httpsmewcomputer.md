---
author: mew.computer
cover_image: 'https://mew.computer/og/mew.jpg'
date: '2026-11-22T22:35:25.099Z'
dateFolder: 2026/11/22
description: 'A local agent harness you can inspect, modify, and run with any model.'
isBasedOn: 'https://mew.computer/'
link: 'https://mew.computer/'
slug: 2026-11-22-httpsmewcomputer
tags:
  - ai
title: Mew is an agent harness designed for your work.
---
<p>A local harness you can inspect, modify, and run with any model.</p>
<p>mew is experimental and under active development.</p>
<h2>Give it a task, and pick up from any client.</h2>
<p>Ask mew to explore a project, dig through docs, or make a change. It reads and searches files, checks that files have not changed before writing so outdated edits fail safely, and runs commands when the work calls for it.</p>
<p>A local background service runs your turns and saves your conversation history. Start a turn in the terminal, then attach to the same live session from the browser or desktop app. Follow along, answer questions, or steer a running turn without starting over.</p>
<h2>Bring in another agent.</h2>
<p>Give a subagent a focused task in its own context while the main thread keeps moving. Send a read-only researcher to find every caller of an API you are replacing, ask a reviewer to check a plan, or run several subagents in parallel.</p>
<p>Each subagent can carry its own instructions, model, tool list, and turn or time limits. Only the final answer returns to your conversation, while the full child transcript stays saved beneath the parent session.</p>
<h2>Make an agent for the job.</h2>
<p>Personas let you switch roles without rewriting your setup. Keep one for coding with shell access, one for research restricted to read-only tools, or one with no tools at all for conversation and writing.</p>
<p>Each persona can pin a model, choose which tools and external integrations it can reach, and adapt its instructions to the active model. For larger changes, start with the built-in planner to draft and review a plan, then switch to the builder to carry it out.</p>
<h2>Decide what needs approval.</h2>
<p>Every tool call passes through a permission check before it runs. Write rules by tool, command, or path, and keep file access and shell checks scoped to your workspace. Let tests run silently while pushing a branch or reading secret files still stops and asks.</p>
<p>Switch permission modes per session as the work changes, from strict prompts on every edit to automatic checks routed through a separate review model. Configured secrets are redacted from tool output before reaching the model.</p>
<h2>Pick up where you left off.</h2>
<p>Keep permanent project instructions on hand, and save repeatable workflows as skills that load only when a task calls for them. A release skill can spell out the exact checks to run before cutting a tag without crowding unrelated turns.</p>
<p>Every conversation saves locally as plain files alongside its history, todos, and active settings. Search past transcripts on disk, resume any session later, or connect external tools when you need more reach.</p>
<h2>Try mew in your project.</h2>
<p>Install the nightly build, connect a supported model provider, and open a session in your working directory.</p>
