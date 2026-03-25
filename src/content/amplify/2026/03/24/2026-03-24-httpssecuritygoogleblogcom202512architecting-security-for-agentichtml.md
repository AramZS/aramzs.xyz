---
author: Posted Nathan Parker & Chrome Security Team
cover_image: >-
  https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYIUyQJtaAY06QUHFJwNJq_G2-GyovxH4kqwBEFS_WweUghi5Qkid_Mrt9Qa65XBQ254P_EMWHpRQWIV17U_oQgEyStBSHWel9v8hHlWeP4ncr9BBtfD6QUhjhPlcISln2jWWNWgf2Ol-P/s1600/googlelogo_color_200x200.png
date: '2026-03-24T21:19:37.407Z'
dateFolder: 2026/03/24
description: >-
  Chrome has been advancing the web’s security for well over 15 years, and we’re
  committed to meeting new challenges and opportunities with AI.
isBasedOn: 'https://security.googleblog.com/2025/12/architecting-security-for-agentic.html'
link: 'https://security.googleblog.com/2025/12/architecting-security-for-agentic.html'
slug: >-
  2026-03-24-httpssecuritygoogleblogcom202512architecting-security-for-agentichtml
tags:
  - ai
  - code
title: Architecting Security for Agentic Capabilities in Chrome
---
<div><noscript>
<span>Posted by Nathan Parker, Chrome security team</span>
<p>
Chrome has been advancing the web’s security for well over 15 years, and we’re committed to meeting new challenges and opportunities with AI. Billions of people trust Chrome to keep them safe by default, and this is a responsibility we take seriously. Following the <a href="https://blog.google/products/chrome/new-ai-features-for-chrome/">recent launch of Gemini in Chrome</a> and the <a href="https://www.youtube.com/watch?v=khX5-VHoYds&amp;t=206s">preview of agentic capabilities</a>, we want to share our approach and some new innovations to improve the safety of agentic browsing. 
</p>
<p>
The primary new threat facing all agentic browsers is <a href="https://storage.googleapis.com/deepmind-media/Security%20and%20Privacy/Gemini_Security_Paper.pdf">indirect prompt injection</a>. It can appear in malicious sites, third-party content in iframes, or from user-generated content like user reviews, and can cause the agent to take unwanted actions such as initiating financial transactions or exfiltrating sensitive data. Given this open challenge, we are investing in a <a href="https://security.googleblog.com/2025/06/mitigating-prompt-injection-attacks.html">layered defense</a> that includes both deterministic and probabilistic defenses to make it difficult and costly for attackers to cause harm. 
</p>
<p>
Designing safe agentic browsing for Chrome has involved deep collaboration of security experts across Google. We built on Gemini's <a href="https://deepmind.google/blog/advancing-geminis-security-safeguards/">existing protections</a> and <a href="https://storage.googleapis.com/gweb-research2023-media/pubtools/1018686.pdf">agent security principles</a> and have implemented several new layers for Chrome.
</p>
<p>
We’re introducing a<strong> user alignment critic</strong> where the agent’s actions are vetted by a separate model that is isolated from untrusted content. We’re also extending Chrome’s<strong> origin-isolation capabilities</strong> to constrain what origins the agent can interact with, to just those that are relevant to the task. Our layered defense also includes <strong>user confirmations</strong> for critical steps, <strong>real-time detection of threats</strong>, and <strong>red-teaming and response</strong>. We’ll step through these layers below.
</p>
<h3>Checking agent outputs with User Alignment Critic </h3>
<p>
The main planning model for Gemini uses page content shared in Chrome to decide what action to take next. Exposure to untrusted web content means it is inherently vulnerable to indirect prompt injection. We use techniques like <a href="https://arxiv.org/abs/2403.14720">spotlighting</a> that direct the model to strongly prefer following user and system instructions over what’s on the page, and we’ve upstreamed known attacks to train the Gemini model to avoid falling for them. 
</p>
<p>
To further bolster model alignment beyond spotlighting, we’re introducing the <em>User Alignment Critic</em> — a separate model built with Gemini that acts as a high-trust system component. This architecture is inspired partially by the <a href="https://simonwillison.net/2023/Apr/25/dual-llm-pattern/">dual-LLM pattern</a> as well as <a href="https://arxiv.org/abs/2503.18813">CaMeL research</a> from Google DeepMind.
</p>
<p>
<em>A flow chart that depicts the User Alignment Critic: a trusted component that vets each action before it reaches the browser.</em>
</p>
<p>
The User Alignment Critic runs after the planning is complete to double-check each proposed action. Its primary focus is task alignment: determining whether the proposed action serves the user’s stated goal. If the action is misaligned, the Alignment Critic will veto it. This component is architected to see only metadata about the proposed action and not any unfiltered untrustworthy web content, thus ensuring it cannot be poisoned directly from the web. It has less context, but it also has a simpler job — just approve or reject an action.
</p>
<p>
This is a powerful, extra layer of defense against both goal-hijacking and data exfiltration within the action step. When an action is rejected, the Critic provides feedback to the planning model to re-formulate its plan, and the planner can return control to the user if there are repeated failures. 
</p>
<h3>Enforcing stronger security<strong> bound</strong>aries with Origin Sets </h3>
<p>
<a href="https://www.chromium.org/Home/chromium-security/site-isolation/">Site Isolation</a> and the <a href="https://web.dev/articles/same-origin-policy">same-origin policy</a> are fundamental boundaries in Chrome’s security model and we’re carrying forward these concepts into the agentic world. By their nature, agents must operate across websites (e.g. collecting ingredients on one site and filling a shopping cart on another). But if an unrestricted agent is compromised and can interact with arbitrary sites, it can create what is effectively a Site Isolation bypass. That can have a severe impact when the agent operates on a local browser like Chrome, with logged-in sites vulnerable to data exfiltration. To address this, we’re extending those principles with <em>Agent Origin Sets</em>. Our design architecturally limits the agent to only access data from origins that are related to the task at hand, or data that the user has chosen to share with the agent. This prevents a compromised agent from acting arbitrarily on unrelated origins.
</p>
<p>
For each task on the web, a trustworthy <em>gating function</em> decides which origins proposed by the planner are relevant to the task. The design is to separate these into two sets, tracked for each session:
</p>
<ul>
<li><strong>Read-only origins</strong> are those from which Gemini is permitted to consume content. If an iframe’s origin isn’t on the list, the model will not see that content.</li>
<li><strong>Read-writable origins </strong>are those on which the agent is allowed to actuate (e.g., click, type) in addition to reading from. </li>
</ul>
<p>
This delineation enforces that only data from a limited set of origins is available to the agent, and this data can only be passed on to the writable origins. This bounds the threat vector of cross-origin data leaks. This also gives the browser the ability to enforce some of that separation, such as by not even sending to the model data that is outside the readable set. This reduces the model’s exposure to unnecessary cross-site data. Like the Alignment Critic, the gating functions that calculate these origin sets are not exposed to untrusted web content. The planner can also use context from pages the user explicitly shared in that session, but it cannot add new origins without the gating function’s approval. Outside of web origins, the planning model may ingest other non-web content such as from tool calls, so we also delineate those into read-vs-write calls and similarly check that those calls are appropriate for the task.
</p>
<div><a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghyphenhyphenn4DpTjbnJ-VbmzsZDkXeH_6UuBKqmwMaLUPxclu_fmX_-pQaXZ0hmBDvPrBSGX8KeAtdPAasNQRzJuQyG7uMboFixcv4RM-hbJACo263iJ8Cr04JE1PaST2Tcb3x1KfB9ETFj9rYhgpeQO-yXAO7OBHIzzXpaJue0mfqDfqlE6eRYleLz2Y0ZG7MOTu/s1600/Chrome_Agent-Safety_Blog_Read-Writable-Origins.png"><img alt="" border="0" data-original-height="1350" data-original-width="2500" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghyphenhyphenn4DpTjbnJ-VbmzsZDkXeH_6UuBKqmwMaLUPxclu_fmX_-pQaXZ0hmBDvPrBSGX8KeAtdPAasNQRzJuQyG7uMboFixcv4RM-hbJACo263iJ8Cr04JE1PaST2Tcb3x1KfB9ETFj9rYhgpeQO-yXAO7OBHIzzXpaJue0mfqDfqlE6eRYleLz2Y0ZG7MOTu/s1600/Chrome_Agent-Safety_Blog_Read-Writable-Origins.png"/></a></div>
<p>
<em>Iframes from origins that aren’t related to the user’s task are not shown to the model.</em>
</p>
<p>
Page navigations can happen in several ways: If the planner decides to navigate to a new origin that isn’t yet in the readable set, that origin is checked for relevancy by a variant of the User Alignment critic before Chrome adds it and starts the navigation. And since model-generated URLs could exfiltrate private information, we have a deterministic check to restrict them to known, public URLs. If a page in Chrome navigates on its own to a new origin, it’ll get vetted by the same critic.
</p>
<p>
Getting the balance right on the first iteration is hard without seeing how users’ tasks interact with these guardrails. We’ve initially implemented a simpler version of origin gating that just tracks the read-writeable set. We will tune the gating functions and other aspects of this system to reduce unnecessary friction while improving security. We think this architecture will provide a powerful security primitive that can be audited and reasoned about within the client, as it provides guardrails against cross-origin sensitive data exfiltration and unwanted actions.
</p>
<h3>Transparency and control for sensitive actions</h3>
<p>
We designed the agentic capabilities in Chrome to give the user both transparency and control when they need it most. As the agent works in a tab, it details each step in a work log, allowing the user to observe the agent's actions as they happen. The user can pause to take over or stop a task at any time. 
</p>
<p>
This transparency is paired with several layers of deterministic and model-based checks to trigger user confirmations before the agent takes an impactful action. These serve as guardrails against both model mistakes and adversarial input by putting the user in the loop at key moments.
</p>
<p>
First, the agent will require a user confirmation before it navigates to certain sensitive sites, such as those dealing with banking transactions or personal medical information. This is based on a deterministic check against a list of sensitive sites. Second, it’ll confirm before allowing Chrome to sign-in to a site via Google Password Manager – the model does not have direct access to stored passwords. Lastly, before any sensitive web actions like completing a purchase or payment, sending messages, or other consequential actions, the agent will try to pause and either get permission from the user before proceeding or ask the user to complete the next step. Like our other safety classifiers, we’re constantly working to improve the accuracy to catch edge cases and grey areas.  
</p>
<p>
<em>Illustrative example of when the agent gets to a payment page, it stops and asks the user to complete the final step.  </em>
</p>
<h3>Detecting “social engineering” of agents </h3>
<p>
In addition to the structural defenses of alignment checks, origin gating, and confirmations, we have several processes to detect and respond to threats. While the agent is active, it checks every page it sees for indirect prompt injection. This is in addition to Chrome’s <a href="https://blog.google/products/chrome/google-chrome-safe-browsing-real-time/">real-time scanning with Safe Browsing</a> and <a href="https://security.googleblog.com/2025/05/using-ai-to-stop-tech-support-scams-in.html">on-device AI</a> that detect more traditional scams. This prompt-injection classifier runs in parallel to the planning model’s inference, and will prevent actions from being taken based on content that the classifier determined has intentionally targeted the model to do something unaligned with the user’s goal. While it cannot flag everything that might influence the model with malicious intent, it is a valuable layer in our defense-in-depth.
</p>
<h3>Continuous auditing, monitoring, response </h3>
<p>
To validate the security of this set of layered defenses, we’ve built automated red-teaming systems to generate malicious sandboxed sites that try to derail the agent in Chrome. We start with a set of diverse attacks crafted by security researchers, and expand on them using LLMs following a <a href="https://storage.googleapis.com/deepmind-media/Security%20and%20Privacy/Gemini_Security_Paper.pdf">technique</a> we adapted for browser agents. Our continuous testing prioritizes defenses against broad-reach vectors such as user-generated content on social media sites and content delivered via ads. We also prioritize attacks that could lead to lasting harm, such as financial transactions or the leaking of sensitive credentials. The attack success rate across these give immediate feedback to any engineering changes we make, so we can prevent regressions and target improvements. Chrome’s auto-update capabilities allow us to get fixes out to users very quickly, so we can stay ahead of attackers.
</p>
<h3>Collaborating across the community</h3>
<p>
We have a long-standing commitment to working with the broader security research community to advance security together, and this includes agentic safety. We’ve updated our Vulnerability Rewards Program (VRP) guidelines to clarify how external researchers can focus on agentic capabilities in Chrome. We want to hear about any serious vulnerabilities in this system, and will pay up to $20,000 for those that demonstrate breaches in the <a href="https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/faq.md#ai-features">security boundaries</a>. The full details are available in <a href="https://bughunters.google.com/about/rules/chrome-friends/5745167867576320/chrome-vulnerability-reward-program-rules">VRP rules</a>.
</p>
<h3>Looking forward</h3>
<p>
The upcoming introduction of agentic capabilities in Chrome brings new demands for browser security, and we've approached this challenge with the same rigor that has defined Chrome's security model from its inception. By extending some core principles like origin-isolation and layered defenses, and introducing a trusted-model architecture, we're building a secure foundation for Gemini’s agentic experiences in Chrome. This is an evolving space, and while we're proud of the initial protections we've implemented, we recognize that security for web agents is still an emerging domain. We remain committed to continuous innovation and collaboration with the security community to ensure Chrome users can explore this new era of the web safely.
</p>
<span itemprop="author" itemscope="itemscope" itemtype="http://schema.org/Person">
<meta content="https://plus.google.com/116899029375914044550" itemprop="url"/>
</span>
</noscript>
</div>
