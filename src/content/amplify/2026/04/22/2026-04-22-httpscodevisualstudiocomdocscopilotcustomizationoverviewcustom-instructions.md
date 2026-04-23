---
author: Microsoft
cover_image: >-
  https://code.visualstudio.com/opengraphimg/generated/docs/copilot/customization/overview.webp
date: '2026-04-22T16:12:27.862Z'
dateFolder: 2026/04/22
description: >-
  Get started customizing AI in VS Code with custom instructions, prompt files,
  custom agents, MCP servers, and more to align AI responses with your coding
  practices.
isBasedOn: >-
  https://code.visualstudio.com/docs/copilot/customization/overview#_custom-instructions
link: >-
  https://code.visualstudio.com/docs/copilot/customization/overview#_custom-instructions
slug: >-
  2026-04-22-httpscodevisualstudiocomdocscopilotcustomizationoverviewcustom-instructions
tags:
  - ai
title: Customize AI in Visual Studio Code
---
<p>Visual Studio Code gives you several ways to teach the AI about your codebase, coding standards, and workflows. This article introduces the customization options and helps you get started.</p>
<p>To access customizations, select the <strong>Configure Chat (gear icon)</strong> in the Chat view to open the <a href="https://code.visualstudio.com/docs/copilot/customization/overview/#_chat-customizations-editor">Chat Customizations editor</a>.</p>
<figure><img alt="Screenshot of the Chat Customizations editor, showing the sidebar with customization categories and the main view listing custom agents." src="https://code.visualstudio.com/assets/docs/copilot/customization/chat-customizations-editor.png"/><figcaption>Screenshot of the Chat Customizations editor, showing the sidebar with customization categories and the main view listing custom agents.</figcaption></figure>
<p>The following sections describe common customization scenarios and which options to use for each one.</p>
<p>Use <a href="https://code.visualstudio.com/docs/copilot/customization/custom-instructions">custom instructions</a> to share project-wide rules and conventions with the AI. Always-on instructions apply to every request, while file-based instructions target specific file types or folders. For example, enforce ESLint rules across all files and apply React patterns only in <code>.tsx</code> files.</p>
<p>Create <a href="https://code.visualstudio.com/docs/copilot/customization/prompt-files">prompt files</a> for repeatable tasks you run often, like scaffolding a component or preparing a pull request.</p>
<p>For more complex multi-step workflows that involve scripts and external tools, package them as <a href="https://code.visualstudio.com/docs/copilot/customization/agent-skills">agent skills</a>.</p>
<p>Create <a href="https://code.visualstudio.com/docs/copilot/customization/custom-agents">custom agents</a> that adopt specific personas, such as security reviewer, database admin, or planner. Each agent defines its own behavior, available tools, and language model preferences. Choose different <a href="https://code.visualstudio.com/docs/copilot/customization/language-models">language models</a> for different tasks, or bring your own API key to access additional models.</p>
<p>Install <a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins">agent plugins</a> (preview) to add pre-packaged bundles of customizations from plugin marketplaces. A single plugin can provide slash commands, skills, custom agents, hooks, and MCP servers.</p>
<p>Add <a href="https://code.visualstudio.com/docs/copilot/customization/mcp-servers">MCP servers</a> to give the AI access to databases, APIs, and other services through the <a href="https://modelcontextprotocol.io/">Model Context Protocol</a>. Use <a href="https://code.visualstudio.com/docs/copilot/customization/hooks">hooks</a> to run shell commands at key lifecycle points, such as running a formatter after every file edit or enforcing security policies.</p>
<p>Implement AI customizations incrementally. Start with the basics and add more as needed. For a hands-on walkthrough, see the <a href="https://code.visualstudio.com/docs/copilot/guides/customize-copilot-guide">Customize AI for your project</a> guide.</p>
<ol> <li> <p><strong>Initialize your project</strong>: type <code>/init</code> in chat to generate a <code>.github/copilot-instructions.md</code> file with coding standards tailored to your codebase.</p> </li> <li> <p><strong>Add targeted rules</strong>: create file-based <code>*.instructions.md</code> files for specific parts of your codebase, such as language conventions or framework patterns.</p> </li> <li> <p><strong>Automate repetitive tasks</strong>: create prompt files for common workflows and add MCP servers to connect external services.</p> </li> <li> <p><strong>Create specialized workflows</strong>: build custom agents for specific roles. Package reusable capabilities as agent skills to share across tools.</p> </li> <li> <p><strong>Generate customizations with AI</strong>: type <code>/create-prompt</code>, <code>/create-instruction</code>, <code>/create-skill</code>, <code>/create-agent</code>, or <code>/create-hook</code> in chat to generate customization files with AI assistance.</p> </li> </ol>
<p>In monorepo setups, you might open a subfolder of a repository in VS Code rather than the repo root. By default, Visual Studio Code only discovers customization files within your open workspace folder(s). Enable the    chat.useCustomizationsInParentRepositories  </p>
<figure></figure><p>  Open in VS Code Open in VS Code Insiders   setting to also discover customizations from the parent repository.</p>
<p>When this setting is enabled, VS Code walks up the folder hierarchy from each workspace folder until it finds a <code>.git</code> folder. If found, it collects customizations from all folders between the workspace folder and the repository root (inclusive). This applies to all customization types: always-on instructions (<code>copilot-instructions.md</code>, <code>AGENTS.md</code>, <code>CLAUDE.md</code>), file-based instructions, prompt files, custom agents, agent skills, and hooks.</p>
<p>For example, consider the following monorepo structure:</p>
<pre data-lang="text"><code>my-monorepo/              # repo root (has .git folder)
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   │   └── style.instructions.md
│   ├── prompts/
│   │   └── review.prompt.md
│   └── agents/
│       └── reviewer.agent.md
├── packages/
│   └── frontend/          # opened as workspace folder
│       └── src/
</code></pre>
<p>If you open only <code>packages/frontend/</code> in VS Code and enable the setting, VS Code discovers the customization files at the repo root, such as <code>copilot-instructions.md</code>, <code>style.instructions.md</code>, <code>review.prompt.md</code>, and <code>reviewer.agent.md</code>.</p>
<p>Conditions for parent repository discovery:</p>
<ul> <li>The workspace folder does not contain a <code>.git</code> folder (it is not itself a repository root).</li> <li>A parent folder contains a <code>.git</code> folder.</li> <li>The parent repository folder is <a href="https://code.visualstudio.com/docs/editing/workspaces/workspace-trust">trusted</a>. VS Code prompts you to trust the parent folder when the workspace is opened.</li> </ul>
<figure></figure><p>The Chat Customizations editor provides a centralized UI for creating and managing all your chat customizations in one place. The editor organizes the different customization types into separate tabs and provides an embedded code editor for editing customization files with syntax highlighting and validation.</p>
<p>You can create new customizations from scratch by editing the corresponding Markdown, or use AI to generate initial content based on your specific project.</p>
<p>To add MCP servers and agent plugins, you can browse the corresponding marketplace directly from the editor, install new items, and manage existing ones.</p>
<p>To open the Chat Customizations editor, select the <strong>Configure Chat (gear icon)</strong> in the Chat view or run <strong>Chat: Open Chat Customizations</strong> from the Command Palette (⇧⌘P).</p>
<p>You can configure customization for different <a href="https://code.visualstudio.com/docs/copilot/agents/overview#_types-of-agents">agent types</a>: local agents, Copilot CLI, and the Claude agent. Select the agent type from the dropdown at the top of the editor to view and manage customizations for that agent type.</p>
<p>If your customizations aren't being applied or cause unexpected behavior, select the ellipsis (<strong>...</strong>) menu in the Chat view and select <strong>Show Agent Debug Logs</strong> to <a href="https://code.visualstudio.com/docs/copilot/troubleshooting">troubleshoot agent issues</a>.</p>
<ul> <li><a href="https://code.visualstudio.com/docs/copilot/concepts/customization">Customization concepts</a></li> </ul>
