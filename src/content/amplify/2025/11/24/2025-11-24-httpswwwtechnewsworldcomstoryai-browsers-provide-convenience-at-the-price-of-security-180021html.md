---
author: publisher
cover_image: >-
  https://www.technewsworld.com/wp-content/uploads/sites/3/2025/11/AI-browsers.jpg
date: '2025-11-24T16:34:55.501Z'
dateFolder: 2025/11/24
description: >-
  As AI browsers gain the ability to summarize, act, and automate tasks, they
  introduce new risks tied to hidden instructions, credential access, and
  autonomous behavior that traditional browsers don’t carry.
isBasedOn: >-
  https://www.technewsworld.com/story/ai-browsers-provide-convenience-at-the-price-of-security-180021.html
link: >-
  https://www.technewsworld.com/story/ai-browsers-provide-convenience-at-the-price-of-security-180021.html
slug: >-
  2025-11-24-httpswwwtechnewsworldcomstoryai-browsers-provide-convenience-at-the-price-of-security-180021html
tags:
  - ai
  - tech
title: AI Browsers Provide Convenience at the Price of Security
---
<figure><img alt="Smartphone screen showing a folder labeled AI Browsers with app icons for Comet, Atlas, Opera Neon, SigmaAI Browser, and Fellou." src="https://www.technewsworld.com/wp-content/uploads/sites/3/2025/11/AI-browsers.jpg"/><figcaption>Smartphone screen showing a folder labeled AI Browsers with app icons for Comet, Atlas, Opera Neon, SigmaAI Browser, and Fellou.</figcaption></figure>
<p>AI browsers, like Perplexity’s Comet and Brave’s Leo, can offer conveniences not found in conventional browsers, but they also pose potentially higher risks.</p>
<p>“The ability to quickly gather and summarize available information without having to invest hours of clicking and reading is incredibly valuable,” observed Andy Bennett, CISO of <a href="https://www.apollo-is.com">Apollo Information Systems</a>, a provider of cybersecurity and IT solutions, in Dallas.</p>
<p>“At the same time, AI browsers bring analysis and enable the user to glean insights that would normally take a lot of time or be missed altogether,” he told TechNewsWorld. “AI can help find information across a broader number of sources than a user can physically or manually process in a traditional browser experience.”</p>
<p>But with that great power comes great risk, as researchers at Brave explained in a blog post:</p>
<p>“Instead of just asking ‘Summarize what this page says about London flights,’ you can command: ‘Book me a flight to London next Friday.’ The AI doesn’t just read, it browses and completes transactions autonomously.”</p>
<p>They went on to note: “This kind of agentic browsing is incredibly powerful, but it also presents significant security and privacy challenges. As users grow comfortable with AI browsers and begin trusting them with sensitive data in logged-in sessions — such as banking, health care, and other critical websites — the risks multiply.”</p>
<p>“What if the model hallucinates and performs actions you didn’t request?” they asked. “Or worse, what if a benign-looking website or a comment left on a social media site could steal your login credentials or other sensitive data by adding invisible instructions for the AI assistant?”</p>
<h3>Hidden Instructions Risk</h3>
<p>The researchers actually found a “hidden instructions” vulnerability in the Comet browser. When told to summarize a web page, the browser feeds the page into its large language model (LLM) without distinguishing between the user’s instructions and untrusted content on the page. “This allows attackers to embed indirect prompt injection payloads that the AI will execute as commands,” they explained.</p>
<p>“Prompt injection is a concern for all AI agents, but a particularly acute one for AI browsers,” observed Lionel Litty, CISO and chief security architect at <a href="https://www.menlosecurity.com/">Menlo Security</a>, a browser security provider, in Mountain View, Calif.</p>
<p>“That is because web content is inherently untrusted and often aggregated from many sources,” he told TechNewsWorld. “Even when visiting a trusted e-commerce site, the content the AI browser sees may include reviews from customers and ads from third parties, all possible sources of prompt injection.”</p>
<p>“In general, network tools are ill-positioned to address prompt injection, as they have a very limited understanding of browsing activities,” he added. “Solutions are needed that understand the full context of the browsing session and can proactively protect the agent by adding hard guardrails.”</p>
<h3>Trading Accusations</h3>
<p>Security was cited among the reasons Amazon ordered Perplexity to remove the internet retailer from the Comet experience.</p>
<p>“Perplexity’s Terms of Use and Privacy Notice grant it broad rights to collect passwords, security keys, payment methods, shopping histories, and other sensitive data from customers accessing the Amazon Store or other third-party websites, while disclaiming any responsibility for data security,” Amazon wrote in a “Cease and Desist” letter sent to Perplexity.</p>
<p>“At the same time,” it continued, “Perplexity is intentionally evading Amazon’s identification of the Comet AI agent when it accesses the Amazon Store, and thereby directly interfering with Amazon’s efforts to manage security risks. This is particularly troubling given recent reports showing that Comet AI is vulnerable to prompt injection attacks, phishing, scams, and other forms of cyberattacks.”</p>
<p>Perplexity countered that Amazon’s real goal is to safeguard its lucrative ad-driven business model. When an AI agent is tasked simply with buying the cheapest laundry detergent, it skips the sponsored results, upsells, and confusing offers that generate revenue for Amazon, it contended. Perplexity compared the situation to a store that only allows customers to hire a personal shopper who works exclusively for the store, not a true personal shopper, but a sales associate.</p>
<figure><a href=""><img alt="Top 5 AI strategies redefining customer experience" src="https://www.ectnews.com/wp-content/uploads/sites/6/2025/11/nice-q425-970x250-rpcsstrat.jpg"/></a><figcaption>Top 5 AI strategies redefining customer experience</figcaption></figure>
<p>AI browsers pose risks that traditional browsers do not. “Traditional browsers don’t try to interpret a page or act on it,” explained Dan Pinto, CEO and co-founder of <a href="https://fingerprint.com">Fingerprint</a>, a device intelligence and browser fingerprinting company, in Chicago.</p>
<p>“With AI browsers, the AI assistant becomes part of the browsing experience,” he told TechNewsWorld. “This means it will interpret a page and act on cleverly hidden instructions because that’s what it was designed to do.”</p>
<p>Traditional browsers render content while AI browsers interpret it, explained Dylan Dewdney, co-founder and CEO of <a href="https://kuvi.ai">Kuvi.ai</a>, an embedded software products provider.</p>
<p>“That interpretive layer is the threat multiplier,” he told TechNewsWorld. “A normal browser might load a malicious site, but an AI browser can be socially engineered, tricked, or linguistically coerced into taking actions on your behalf, including actions you didn’t authorize or even understand. It’s less like hacking a browser and more like hacking the assistant you delegated decision-making to.”</p>
<h3>More Dangerous Than Your Average Web Browser</h3>
<p>Pinto added that, in many cases, attacks launched via AI browsers are more harmful than those targeting traditional browsers.</p>
<p>“The danger is that the AI assistant may take action on your behalf — such as clicking on malicious links, filling out forms, and sending valuable personal information — all without your knowledge,” he said. “Once an attacker can influence that automation, things escalate quickly, and the user may never see a single red flag.”</p>
<p>Jon Knisley, head of process AI at <a href="https://www.abbyy.com">Abbyy</a>, a global intelligent automation company, maintained that it’s a one-two punch that makes AI browsers more dangerous than their conventional kin. “The autonomous nature of AI browsers and deeper integration with user resources expand their impact radius,” he told TechNewsWorld.</p>
<p>“With access to user data across emails and documents, a successful attack can compromise an entire workflow compared to a local browser session,” he said. “Plus, agents lack the ‘common sense’ filter that can interrupt a more traditional social engineering or phishing attack.”</p>
<p>Dewdney explained that AI-enabled browsing collapses the gap between reading and acting. “A malicious prompt doesn’t just show up on your screen. It can actually trigger actions, automate workflows, access accounts, or exfiltrate data,” he said. “Once an attacker hijacks the ‘interpretation layer,’ the blast radius is significantly larger. With human users, there’s friction. With agents, there’s speed and obedience.”</p>
<p>Giving an agentic browser access to passwords, usernames, and other credentials also makes them potentially more dangerous to users, added Nick Muy, CISO of <a href="https://www.scrut.io">Scrut Automation</a>, a cybersecurity and compliance automation company, headquartered in Milpitas, Calif. He cautioned users not to store usernames, passwords, and other credentials directly in a browser.</p>
<p>“Require the browser to authenticate with a third-party app like <a href="https://1password.com/">1Password</a>,” he told TechNewsWorld. “Still, there’s a lot of risk with giving the browser access to anything.”</p>
<h3>One Click From Chaos</h3>
<p>Pinto noted that the online community is watching the first wave of attacks, shaped entirely around how AI assistants or agents see the web, not how humans do.</p>
<p>“That means defenses have to adapt as well,” he said. “The more authorization AI assistants have to act on users’ behalf, the more important it becomes to have systems that can recognize when something about a device, a session, or a user’s behavior doesn’t make sense, not just if it’s a human or not.”</p>
<p>“That extra layer of information,” he continued, “can help keep accounts protected without hindering this new way that legitimate users are interacting with the web.”</p>
<p>“We’re entering an era where language is an attack vector,” added Dewdney.</p>
<p>“Security models built for humans don’t map cleanly onto systems that reason, summarize, and act,” he explained. “The long-term solution will be a mix of cryptographic verifiability — attesting to the integrity of content — agent sandboxing and decentralized identity frameworks.”</p>
<p>“Until then, users should treat AI browsers the way early internet users treated email attachments — powerful, convenient, and one careless click away from chaos,” he said.</p>
<figure><img alt="John P. Mello Jr." src="https://www.technewsworld.com/wp-content/uploads/sites/3/2025/11/John-P.-Mello-Jr..jpg"/><figcaption>John P. Mello Jr.</figcaption></figure>
