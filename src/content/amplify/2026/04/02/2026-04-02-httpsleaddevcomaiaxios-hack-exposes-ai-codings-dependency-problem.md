---
author: Chris Stokel-Walker
cover_image: 'https://leaddev.com/wp-content/uploads/2026/04/surveillance-4-2.webp'
date: '2026-04-02T11:59:08.261Z'
dateFolder: 2026/04/02
description: >-
  Attacks on popular AI-coding tools highlight the risks of dependency-heavy
  code and the need for stronger security safeguards.
isBasedOn: 'https://leaddev.com/ai/axios-hack-exposes-ai-codings-dependency-problem'
link: 'https://leaddev.com/ai/axios-hack-exposes-ai-codings-dependency-problem'
slug: 2026-04-02-httpsleaddevcomaiaxios-hack-exposes-ai-codings-dependency-problem
tags:
  - tech
title: Axios hack exposes AI-coding’s dependency problem
---
<figure><a href="https://leaddev.com/ai/axios-hack-exposes-ai-codings-dependency-problem"><img alt="surveillance-4-2" sizes="(max-width: 768px) 50vw, 
						(max-width: 1260px) 50vw,
						600px" src="https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,h_1024,w_1024/next/2026/04/surveillance-4-2.webp" srcset="https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,w_768/next/2026/04/surveillance-4-2.webp 768w, https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,h_300,w_300/next/2026/04/surveillance-4-2.webp 300w, https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,h_1024,w_1024/next/2026/04/surveillance-4-2.webp 1024w, https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,w_580/next/2026/04/surveillance-4-2.webp 580w, https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,w_275/next/2026/04/surveillance-4-2.webp 275w, https://res.cloudinary.com/leaddev/image/upload/f_auto/q_auto/dpr_auto/c_limit,h_100,w_100/next/2026/04/surveillance-4-2.webp 100w"/></a></figure>
<p>You have <strong>1</strong> article left to read this month before you need to <a href="https://leaddev.com/register">register</a> a free LeadDev.com account.</p>
<p><strong>Key takeaways:</strong></p>
<ul> <li><strong>AI-coding increases hidden risk</strong>. Developers inherit complex, dependency-heavy code they don’t fully understand.</li> <li>Supply chain attacks are spreading: one compromised package can impact thousands of projects and leak sensitive data.</li> <li><strong>Defenses lag behind</strong>. Without stronger guardrails and scrutiny, breaches are likely to recur.</li> </ul>
<p>It’s been a bad week for <a href="https://leaddev.com/ai/best-ai-coding-assistants">AI-coding tools</a>. Hackers have compromised the popular JavaScript library Axios by <a href="https://thehackernews.com/2026/03/axios-supply-chain-attack-pushes-cross.html">breaching its npm account</a>, injecting malicious code into a new release downloaded millions of times before being pulled.</p>
<p>It comes just days after a similar incident <a href="https://www.sonatype.com/blog/compromised-litellm-pypi-package-delivers-multi-stage-credential-stealer">involving LiteLLM’s PyPl package</a>, which ended up delivering a credential stealer into any projects it was used in.</p>
<p>The Axios attack gave intruders the ability to harvest sensitive developer <a href="https://leaddev.com/velocity/unlock-your-engineering-velocity-with-data">data</a> and potentially access downstream systems that relied on the package.</p>
<p>Axios is one of the most widely used open-source modules in the JavaScript and AI development ecosystems. The breach affected thousands of projects, opening up debate about the fragility of modern <a href="https://leaddev.com/software-quality/supply-chain-data-infrastructure-pipeline">software supply chains</a>, particularly as <a href="https://leaddev.com/ai/your-ai-coding-tools-buying-checklist-for-2026">AI-coding tools</a> detach developers from what they’re shipping.</p>
<p>It’s easy to lay the blame at the door of the project, but it would be incorrect to do so, said Justin Cappos, professor at New York University’s Tandon School of Engineering.</p>
<p>“This is an extremely sophisticated attack put on by nation-state-level actors that seems to have a financial motivation,” he said. Cappos pointed out that “this is the kind of issue most projects could have fallen for. It’s very difficult to protect against.”</p>
<p>The breach underscores how deeply embedded <a href="https://leaddev.com/hiring/open-source-is-a-talent-strategy">open-source</a> dependencies have become in the AI development process – and how much risk that creates.</p>
<p>“Before AI, the developer role was clearly defined,” said Bob Huber, chief security officer at Tenable. “With the <a href="https://leaddev.com/ai/ai-is-helping-your-boss-code-again">advent of AI</a>, everyone is a developer, or <a href="https://leaddev.com/culture/vibe-coding-brought-back-love-programming">vibe coder</a>, and they aren’t trained in proper development, <a href="https://leaddev.com/culture/why-security-everyones-responsibility">security</a> standards, and best practices, which exposes organizations to greater risk.”</p>
<p>That worries Huber. “We are accelerating development <a href="https://leaddev.com/velocity/engineering-owns-velocity">velocity</a> while simultaneously losing visibility into our software supply chain,” he said.</p>
<p>Part of the problem are the ‘kitchen sink’ tendencies of AI-coding tools to overengineer solutions, along with their reliance on dependencies that run smoothly when they’re working, but open you up to issues when they don’t.</p>
<p>“When you install and configure AI components, it installs all kinds of required dependencies, and the <a href="https://leaddev.com/leadership/take-the-fear-out-of-vibe-coding">vibe coders</a> in your organization have no idea what those things are, what they do, or how to secure them,” said Huber.</p>
<h2> <strong>AI-coding’</strong>s major <strong>dependency problem</strong></h2>
<p>“AI does seem to add dependencies that aren’t needed and dependencies are at risk,” said Cappos. It seems to do so for convenience sake, but it can also come at a cost, as evidenced in this case.</p>
<p>Huber doesn’t forswear dependencies altogether, nor does he begrudge AI-coding tools’ reliance on them. “I don’t discourage using npm packages or <a href="https://leaddev.com/software-quality/12-things-consider-when-assessing-open-source-software">open-source software</a> because they’re invaluable tools that drive innovation,” he said.</p>
<p>However, there needs to be a rethink in how AI-coding tools are used, and how dependency-heavy packages like npm are integrated into day-to-day live code.</p>
<p>“To maintain <a href="https://leaddev.com/technical-direction/trust-in-ai-coding-tools-is-plummeting">trust</a> in these systems, we must exercise caution and implement rigorous <a href="https://leaddev.com/software-quality/how-combat-generative-ai-security-risks">security guardrails</a> to prevent the installation of malicious code,” Huber said.</p>
<p>That’s because, on the other side of the equation, bad actors have recognized the power they can wield by compromising packages like npm.</p>
<p>“I think attackers have wised up to the fact that if they can get into some of these important packages, you get hundreds of millions of downloads, potentially, of a piece of software,” said Cappos.</p>
<p>More work is needed to fund the projects that are used for free by millions of people, as well as to train devs to check twice, and deploy once. As Cappos explained: “there’s nothing fundamentally that we’re doing as defenders to prevent this happening again.”</p>
