---
author: Mo's Blog
cover_image: 'https://bear-images.sfo2.cdn.digitaloceanspaces.com/herman-1683556668-0.png'
date: '2025-10-29T10:55:11.451Z'
dateFolder: 2025/10/29
description: >-
  So, your previously non-programming boss just started opening PRs with the
  help of LLMs. I think it's a net positive.

  But it brings challenges to existing s...
isBasedOn: 'https://mo42.bearblog.dev/help-my-boss-started-programming-with-llms/'
link: 'https://mo42.bearblog.dev/help-my-boss-started-programming-with-llms/'
slug: 2025-10-29-httpsmo42bearblogdevhelp-my-boss-started-programming-with-llms
tags:
  - ai
  - tech
  - labor
  - ai-created-labor
title: 'Help, My Boss Started Programming with LLMs'
---
<p>So, your previously non-programming boss just started opening PRs with the help of LLMs. I think it's a net positive. But it brings challenges to existing software development practice.</p>
<p>Based on some early experiences, a few obvious things happen when leaders and non-engineers start submitting PRs: There's more to review. More PRs and more lines changed. There's faster iteration as a sales representative might be patching small annoyances directly. And there will be more opinions hitting the codebase. I value them.</p>
<p>The challenges, however, aren't messy diffs, inconsistent style, or bad variable names. Such should be automatically checked and fixed anyway. The danger lies in losing the implicit architecture that holds the system together.</p>
<p>I strive to a state where an engineering team shares a mental model of the codebase. For example, we envision the codebase as a tree. Then, it's easy to replace components without touching the rest. If that structure turns into a graph, every change ripples to other places, breaking assumptions and spawning bugs.</p>
<p>A person from outside the engineering team, powered by an LLM, might not share this implicit understanding. So, proposed features might technically work but still violate the design's intent. Reviewers then have to catch those issues, slowing down development. They might frustrate your boss, who wonders why their working feature isn't merged yet. If not properly addressed, they might look for other reviewers. For an agreeable junior developer who doesn't yet have the confidence to push back. Then, in larger teams, the codebase will degrade as seniors might not be able to oversee all the changes. Soon, the carefully envisioned structure breaks, slowing down further changes and keeping the team busy fighting bugs.</p>
<p>Despite the risks, I see this as progress. If I were to start a software company today, everyone would get access to the repository. Sales, finance, and support will be invited to contribute. I think the closer people are to real problems, the better their ideas for solutions. But engineers need to address the downsides openly. There's more to software development than producing a working solution. Someone needs to safeguard design intent and maintainability. Maybe as LLMs democratize coding, existing developers need to evolve into architects who curate the structure of a codebase.</p>
