---
author: Ax Sharma
cover_image: 'https://www.bleepstatic.com/content/hl-images/2025/09/04/Google-headpic.jpg'
date: '2026-07-28T19:59:35.450Z'
dateFolder: 2026/07/28
description: >-
  From August 3, 2026, Google will use IP addresses from UK, EEA and Switzerland
  users for ad measurement and personalization. It lands as the ICO weighs new
  consent rules, and years after Google itself called using such signals to
  identify devices "wrong."
isBasedOn: >-
  https://www.bleepingcomputer.com/news/security/google-to-use-uk-and-eu-user-ip-addresses-for-ad-personalization/
link: >-
  https://www.bleepingcomputer.com/news/security/google-to-use-uk-and-eu-user-ip-addresses-for-ad-personalization/
slug: >-
  2026-07-28-httpswwwbleepingcomputercomnewssecuritygoogle-to-use-uk-and-eu-user-ip-addresses-for-ad-personalization
tags:
  - ad tech
  - privacy
title: Google to use UK and EU user IP addresses for ad personalization
---
<p>By</p>
<h6><a href="https://www.bleepingcomputer.com/author/ax-sharma/">Ax Sharma</a></h6>
<ul><li>June 17, 2026</li> <li>05:02 PM</li> <li><a href="https://www.bleepingcomputer.com/news/security/google-to-use-uk-and-eu-user-ip-addresses-for-ad-personalization/#comment_form">0</a></li> </ul>
<figure><img alt="Google" src="https://www.bleepstatic.com/content/hl-images/2025/09/04/Google-headpic.jpg"/><figcaption>Google has begun notifying advertisers that it will start using IP addresses for ad measurement and personalization across the European Economic Area (EEA), the UK and Switzerland on or shortly after August 3, 2026.</figcaption></figure>
<p>IP addresses are received by online services on nearly every request, and the practice is routine across much of the world. But doing it in the UK and EU, where an IP address is regulated personal data, is new.</p>
<h2>What's changing</h2>
<p>Google already receives these IP addresses to route traffic and deliver ads, through customer tags, SDKs, HTTP calls and uploads.</p>
<figure><a href="https://www.wiz.io/lp/mcp-prompt-playbook-for-soc-teams?utm_source=bleepingcomputer&amp;utm_medium=display&amp;utm_campaign=FY27Q2_INB_FORM_MCP-Prompt-Playbook-SOC&amp;sfcid=701Vh00000c1WePIAU&amp;utm_term=FY27-bleepingcomputer-article-970x250-June&amp;utm_content=MCP-Playbook-SOC"><img alt="image" src="https://www.bleepstatic.com/c/w/mcp-playbook-970.jpg"/></a></figure>
<p>What changes on August 3 is the purpose: the same addresses will be used to identify devices for measurement and ad personalization, which is the use that triggers consent requirements under UK and EU law.</p>
<p>Google will also register under the IAB Europe Transparency and Consent Framework (TCF) for <a href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/#:~:text=scanning%20device%20characteristics-,Feature,-3">Feature 3</a>, "Identify devices based on information transmitted automatically."</p>
<p>Under the framework, Feature 3 is the method for distinguishing a device from the data it sends automatically, including the IP address.</p>
<p>It is not a consent step in itself: it attaches to the personalization purposes, which require user consent rather than legitimate interest.</p>
<figure><img alt="Google to use IP address for UK, EEA and Switzerland users for ad personalisation" src="https://www.bleepstatic.com/images/news/u/1164866/2026/Jun/google-ads-uk-ip-address/google-ad-uk-changes.jpg"/><figcaption>Google's email notification sent June 17, 2026 to advertisers</figcaption></figure>
<p>The company frames the change around privacy-enhancing technologies, or PETs, listing on-device processing, trusted execution environments and secure multi-party computation.</p>
<p>Some personalization features will not arrive until later this year or early next, at which point Google says it will let users on its own properties make a choice about IP-based personalization.</p>
<h2>Why it matters</h2>
<p>Google has used IP signals in advertising elsewhere in the world <a href="https://support.google.com/marketingplatform/answer/15732590?hl=en">for a while</a> to fight spam and fraud, and maintained that IP is already common across the ads ecosystem.</p>
<p>The EEA, the UK and Switzerland are different, however, because an IP address is personal data under <a href="https://gdpr-info.eu/recitals/no-30/">GDPR</a>, and using one to identify a device is a building block of fingerprinting, the practice of tracking a device when cookies are blocked or cleared.</p>
<p>Google itself once took that view.</p>
<p>In 2019, its then Chrome engineering director Justin Schuh <a href="https://blog.google/products-and-platforms/products/chrome/building-a-more-private-web/">wrote that</a> fingerprinting subverts user choice and is wrong, because users cannot clear it the way they can clear cookies.</p>
<p>Google <a href="https://www.adexchanger.com/data-privacy-roundup/does-googles-u-turn-on-fingerprinting-open-new-opportunities-or-is-it-irresponsible/">reversed that stance</a> in December 2024, dropping its prohibition on fingerprinting for advertisers.</p>
<p>The UK's Information Commissioner's Office (ICO) called the reversal "<a href="https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/">irresponsible</a>" within a day.</p>
<p>The timing now is the awkward part. On May 18, 2026, the ICO <a href="https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/05/our-advice-to-government-on-potential-changes-to-online-advertising-rules/">published</a> advice to the UK government on changing the consent rules for online advertising.</p>
<p>Its preferred approach would allow some advertising without consent only where it is based on the context being viewed, not a person's activity over time, and would keep consent mandatory for tracking that profiles people across services.</p>
<p>IP-based personalization across surfaces sits on the consent-required side of that line.</p>
<p>The ICO has stressed that nothing has changed yet and existing rules still apply.</p>
<p>Google's customer email pushes the compliance burden onto advertisers, reminding them they remain bound by its <a href="https://www.google.com/about/company/user-consent-policy/">EU User Consent Policy</a> and must obtain valid consent from users in the affected regions.</p>
<h2>What users can do</h2>
<p>The user-facing choice over IP-based personalization will not arrive until later in Google's rollout.</p>
<p>Until then, the available controls are the familiar ones: declining non-essential cookies and consent prompts, and reviewing the ad personalization settings under your Google account at myadcenter.google.com.</p>
<p>Whether that squares with the ICO's May advice, which would keep consent mandatory for cross-service profiling, is the question Google's rollout now raises.</p>
<figure><a href="https://hubs.li/Q04jQ9z40"><img alt="article image" data-src="https://www.bleepstatic.com/c/p/bas-report.jpg" src="https://www.bleepstatic.com/c/p/bas-report.jpg"/></a><figcaption><a href="https://hubs.li/Q04jQ9z40">article image</a></figcaption></figure>
<p><a href="https://www.bleepingcomputer.com/news/software/brave-software-releases-origin-for-a-paid-bloat-free-browsing-experience/">Brave Software releases Origin for a paid, bloat-free browsing experience</a></p>
