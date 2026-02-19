---
author: Ashley Wolf
cover_image: >-
  https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png
date: '2026-02-18T17:39:22.498Z'
dateFolder: 2026/02/18
description: >-
  As contribution friction drops, maintainers are adapting with new trust
  signals, triage approaches, and community-led solutions.
isBasedOn: >-
  https://github.blog/open-source/maintainers/welcome-to-the-eternal-september-of-open-source-heres-what-we-plan-to-do-for-maintainers/
link: >-
  https://github.blog/open-source/maintainers/welcome-to-the-eternal-september-of-open-source-heres-what-we-plan-to-do-for-maintainers/
slug: >-
  2026-02-18-httpsgithubblogopen-sourcemaintainerswelcome-to-the-eternal-september-of-open-source-heres-what-we-plan-to-do-for-maintainers
tags:
  - tech
title: >-
  Welcome to the Eternal September of open source. Here’s what we plan to do for
  maintainers.
---
<figure><img alt="Mona floats above green geometric blocks that include a GitHub invertocat logo in a decorative scene." sizes="auto, (max-width: 1600px) 100vw, 1600px" src="https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png?w=1600" srcset="https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png?w=1600 1600w, https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png?w=800 800w, https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png?w=400 400w, https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png?w=1032 1032w, https://github.blog/wp-content/uploads/2026/01/generic-github-invertocat-mona-logo.png?w=516 516w"/><figcaption>Mona floats above green geometric blocks that include a GitHub invertocat logo in a decorative scene.</figcaption></figure>
<p>Open collaboration runs on trust. For a long time, that trust was protected by a natural, if imperfect filter: friction.</p>
<p>If you were on <a href="https://en.wikipedia.org/wiki/Usenet">Usenet</a> in 1993, you’ll remember that every September a flood of new university students would arrive online, unfamiliar with the norms, and the community would patiently onboard them. Then mainstream dial-up ISPs became popular and a continuous influx of new users came online. It became <a href="https://en.wikipedia.org/wiki/Eternal_September">the September that never ended</a>.</p>
<p>Today, open source is experiencing its own Eternal September. This time, it’s not just new users. It’s the sheer volume of contributions.</p>
<h2>When the cost to contribute drops</h2>
<p>In the era of mailing lists contributing to open source required real effort. You had to subscribe, lurk, understand the culture, format a patch correctly, and explain why it mattered. The effort didn’t guarantee quality, but it filtered for engagement. Most contributions came from someone who had genuinely engaged with the project.</p>
<p>It also excluded people. The barrier to entry was high. Many projects worked hard to lower it in order to make open source more welcoming.</p>
<p>A major shift came with the pull request. Hosting projects on GitHub, using pull requests, and labeling “Good First Issues” reduced the friction needed to contribute. Communities grew and contributions became more accessible.</p>
<p>That was a good thing.</p>
<p>But friction is a balancing act. Too much keeps people and their ideas out, too little friction can strain the trust open source depends on.</p>
<p>Today, a pull request can be generated in seconds. Generative AI makes it easy for people to produce code, issues, or security reports at scale. The cost to create has dropped but the cost to review has not.</p>
<p>It’s worth saying: most contributors are acting in good faith. Many want to help projects they care about. Others are motivated by learning, visibility, or the career benefits of contributing to widely used open source. Those incentives aren’t new and they aren’t wrong.</p>
<p>The challenge is what happens when low-quality contributions arrive at scale. When volume accelerates faster than review capacity, even well-intentioned submissions can overwhelm maintainers. And when that happens, trust, the foundation of open collaboration, starts to strain.</p>
<h2>The new scale of noise</h2>
<p>It is tempting to frame “low-quality contributions” or “AI slop” contributions as a unique recent phenomenon. It isn’t. Maintainers have always dealt with noisy inbound.</p>
<ul> <li>The Linux kernel operates under a “<a href="https://lwn.net/Articles/798230/">web of trust</a>” philosophy and formalized its <a href="https://www.kernel.org/doc/html/latest/process/submitting-patches.html">SubmittingPatches</a> guide and introduced the Developer Certificate of Origin (DCO) in 2004 for a reason.</li> <li>Mozilla and GNOME built formal triage systems around the reality that most incoming bug reports needed filtering before maintainers invested deeper time.</li> <li>Automated scanners: Long before GenAI, maintainers dealt with waves of automated security and code quality reports from commercial and open source scanning tools.</li> </ul>
<p>The question from maintainers has often been the same: “<em>Are you really trying to help me, or just help yourself?</em>“</p>
<p>Just because a tool—whether a static analyzer or an LLM—makes it easy to generate a report or a fix, it doesn’t mean that contribution is valuable to the project. The ease of creation often adds a burden to the maintainer because there is an imbalance of benefit. The contributor maybe gets the credit (or the CVE, or the visibility), while the maintainer gets the maintenance burden.</p>
<p>Maintainers are feeling that directly. For example:</p>
<ul> <li>curl <a href="https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/">ended its bug bounty program</a> after AI-generated security reports exploded, each taking hours to validate.</li> <li>Projects like Ghostty are moving to <a href="https://github.com/ghostty-org/ghostty/blob/main/CONTRIBUTING.md">invitation-only contribution models</a>, requiring discussion before accepting code contributions.</li> <li>Multiple projects are adopting explicit rules about AI-generated contributions.</li> </ul>
<p>These are rational responses to an imbalance.</p>
<h2>What we’re doing at GitHub</h2>
<p>At GitHub, we aren’t just watching this happen. Maintainer sustainability is foundational to open source, and foundational to us. As the home of open source, we have a responsibility to help you manage what comes through the door.</p>
<p>We are approaching this from multiple angles: shipping immediate relief now, while building toward longer-term, systemic improvements. Some of this is about tooling. Some is about creating clearer signals so maintainers can decide where to spend their limited time.</p>
<h2>Features we’ve already shipped</h2>
<ul> <li><strong><a href="https://github.blog/changelog/2026-02-13-new-repository-settings-for-configuring-pull-request-access/">Repo-level pull request controls</a></strong>: Gives maintainers the option to limit pull request creation to collaborators or disable pull requests entirely. While the introduction of the pull request was fundamental to the growth of open source, maintainers should have the tools they need to manage their projects.</li> <li><strong><a href="https://github.blog/changelog/2026-02-05-pinned-comments-on-github-issues/">Pinned comments on issues</a></strong>: You can now pin a comment to the top of an issue from the comment menu.</li> <li><strong><a href="https://github.blog/changelog/2026-02-05-pinned-comments-on-github-issues/">Banners to reduce comment noise</a></strong>: Experience fewer unnecessary notifications with a banner that encourages people to react or subscribe instead of leaving noise like “+1” or “same here.”</li> <li><strong><a href="https://github.blog/changelog/2026-02-05-improved-pull-request-files-changed-february-5-updates/">Pull request performance improvements</a></strong>: Pull request diffs have been optimized for greater responsiveness and large pull requests in the new files changed experience respond up to 67% faster.</li> <li><strong>Faster issue navigation</strong>: Easier bug triage thanks to significantly improved speeds when browsing and navigating issues as a maintainer.</li> <li><strong><a href="https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-repository">Temporary interaction limits</a></strong>: You can temporarily enforce a period of limited activity for certain users on a public repository.</li> </ul>
<p>Plus, coming soon:<strong> pull request deletion from the UI</strong>. This will remove spam or abusive pull requests so repositories can stay more manageable.</p>
<p>These improvements focus on reducing review overhead.</p>
<h2>Exploring next steps</h2>
<p>We know that walls don’t build communities. As we explore next steps, our focus is on giving maintainers more control while helping protect what makes open source communities work.</p>
<p>Some of the directions we’re exploring in consultation with maintainers include:</p>
<ul> <li><strong>Criteria-based gating</strong>: Requiring a linked issue before a pull request can be opened, or defining rules that contributions must meet before submission.</li> <li><strong>Improved triage tools</strong>: Potentially leveraging <a href="https://github.github.com/gh-aw/">automated triage</a> to evaluate contributions against a project’s own guidelines (like <code>CONTRIBUTING.md</code>) and surface which pull requests should get your attention first.</li> </ul>
<p>These tools are meant to support decision-making, not replace it. Maintainers should always remain in control.</p>
<p>We are also aware of tradeoffs. Restrictions can disproportionately affect first-time contributors acting in good faith. That’s why these controls are optional and configurable.</p>
<h2>The community is building ladders</h2>
<p>One of the things I love most about open source is that when the community hits a wall, people build ladders. We’re seeing a lot of that right now.</p>
<p>Maintainers across the ecosystem are experimenting with different approaches. Some projects have moved to invitation-only workflows. Others are building custom GitHub Actions for contributor triage and reputation scoring.</p>
<p>Mitchell Hashimoto’s <a href="https://github.com/mitchellh/vouch">Vouch</a> project is an interesting example. It implements an explicit trust management system where contributors must be vouched for by trusted maintainers before they can participate. It’s experimental and some aspects will be debated, but it fits a longer lineage, from Advogato’s trust metric to Drupal’s credit system to the Linux kernel’s <code>Signed-off-by</code> chain.</p>
<p>At the same time, many communities are investing heavily in education and onboarding to widen who can contribute while setting clearer expectations. The Python community, for example, emphasizes contributor guides, mentorship, and clearly labeled entry points. Kubernetes pairs strong governance with extensive documentation and contributor education, helping new contributors understand not just how to contribute, but what a useful contribution looks like.</p>
<p>These approaches aren’t mutually exclusive. Education helps good-faith contributors succeed. Guardrails help maintainers manage scale.</p>
<p>There is no single correct solution. That’s why we are excited to see maintainers building tools that match their project’s specific values. The tools communities build around the platform often become the proving ground for what might eventually become features. So we’re paying close attention.</p>
<h2>Building community, not just walls</h2>
<p>We also need to talk about incentives. If we only build blocks and bans, we create a fortress, not a bazaar.</p>
<p>Right now, the concept of “contribution” on GitHub still leans heavily toward code authorship. In WordPress, they use manually written “props” credit given not just for code, but for writing, reproduction steps, user testing, and community support. It recognizes the many forms of contribution that move a project forward.</p>
<p>We want to explore how GitHub can better surface and celebrate those contributions. Someone who has consistently triaged issues or merged documentation PRs has proven they understand your project’s voice. These are trust signals we should be surfacing to help you make decisions faster.</p>
<h2>Tell us what you need</h2>
<p>We’ve opened a community discussion to gather feedback on the directions we’re exploring: <a href="https://github.com/orgs/community/discussions/185387">Exploring Solutions to Tackle Low-Quality Contributions on GitHub</a>.</p>
<p>We want to hear from you. Share what is working for your projects, where the gaps are, and what would meaningfully improve your experience maintaining open source.</p>
<p>Open source’s Eternal September is a sign of something worth celebrating: more people want to participate than ever before. The volume of contributions is only going to grow — and that’s a good thing. But just as the early internet evolved its norms and tools to sustain community at scale, open source needs to do the same. Not by raising the drawbridge, but by giving maintainers better signals, better tools, and better ways to channel all that energy into work that moves their projects forward.</p>
<p>Let’s build that together.</p>
