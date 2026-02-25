---
author: Agent Skills
cover_image: >-
  https://agent-skills.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DDocumentation%26title%3DWhat%2Bare%2Bskills%253F%26description%3DAgent%2BSkills%2Bare%2Ba%2Blightweight%252C%2Bopen%2Bformat%2Bfor%2Bextending%2BAI%2Bagent%2Bcapabilities%2Bwith%2Bspecialized%2Bknowledge%2Band%2Bworkflows.%26primaryColor%3D%25237f7f7f%26lightColor%3D%2523bfbfbf%26darkColor%3D%2523404040%26backgroundLight%3D%2523ffffff%26backgroundDark%3D%25230d0d0f&w=1200&q=100
date: '2026-02-24T23:43:49.098Z'
dateFolder: 2026/02/24
description: >-
  Agent Skills are a lightweight, open format for extending AI agent
  capabilities with specialized knowledge and workflows.
isBasedOn: 'https://agentskills.io/what-are-skills'
link: 'https://agentskills.io/what-are-skills'
slug: 2026-02-24-httpsagentskillsiowhat-are-skills
tags:
  - ai
  - code
title: What are skills?
---
<p>At its core, a skill is a folder containing a <code>SKILL.md</code> file. This file includes metadata (<code>name</code> and <code>description</code>, at minimum) and instructions that tell an agent how to perform a specific task. Skills can also bundle scripts, templates, and reference materials.</p>
<pre><code>my-skill/
├── SKILL.md          # Required: instructions + metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources
</code></pre>
<p> Skills use <strong>progressive disclosure</strong> to manage context efficiently:</p>
<ol> <li> <strong>Discovery</strong>: At startup, agents load only the name and description of each available skill, just enough to know when it might be relevant. </li> <li> <strong>Activation</strong>: When a task matches a skill’s description, the agent reads the full <code>SKILL.md</code> instructions into context. </li> <li> <strong>Execution</strong>: The agent follows the instructions, optionally loading referenced files or executing bundled code as needed. </li> </ol>
<p>This approach keeps agents fast while giving them access to more context on demand.  Every skill starts with a <code>SKILL.md</code> file containing YAML frontmatter and Markdown instructions:</p>
<pre><code>---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents.
---

# PDF Processing

## When to use this skill
Use this skill when the user needs to work with PDF files...

## How to extract text
1. Use pdfplumber for text extraction...

## How to fill forms
...
</code></pre>
<p>The following frontmatter is required at the top of <code>SKILL.md</code>:</p>
<ul> <li><code>name</code>: A short identifier</li> <li><code>description</code>: When to use this skill</li> </ul>
<p>The Markdown body contains the actual instructions and has no specific restrictions on structure or content. This simple format has some key advantages:</p>
<ul> <li> <strong>Self-documenting</strong>: A skill author or user can read a <code>SKILL.md</code> and understand what it does, making skills easy to audit and improve. </li> <li> <strong>Extensible</strong>: Skills can range in complexity from just text instructions to executable code, assets, and templates. </li> <li> <strong>Portable</strong>: Skills are just files, so they’re easy to edit, version, and share. </li> </ul>
<p><a href="https://agentskills.io/home"><figure></figure></a><a href="https://agentskills.io/specification"><figure></figure></a></p>
