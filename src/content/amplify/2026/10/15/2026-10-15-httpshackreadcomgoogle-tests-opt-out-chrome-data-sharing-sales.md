---
author: Deeba Ahmed
cover_image: >-
  https://hackread.com/wp-content/uploads/2026/08/google-tests-opt-out-chrome-data-sharing-sales.jpg
date: '2026-10-15T18:19:02.286Z'
dateFolder: 2026/10/15
description: >-
  Google is testing Global Privacy Control in Chrome Canary, letting users ask
  websites not to sell or share their data or use it for targeted advertising
  online.
isBasedOn: 'https://hackread.com/google-tests-opt-out-chrome-data-sharing-sales/'
link: 'https://hackread.com/google-tests-opt-out-chrome-data-sharing-sales/'
slug: 2026-10-15-httpshackreadcomgoogle-tests-opt-out-chrome-data-sharing-sales
tags:
  - tech
  - privacy
title: Google Tests Built-In Opt-Out in Chrome for Data Sharing and Sales
---
<p>Google is trialling a built-in control that lets people send websites a request to opt out of the sale or sharing of their personal information. Windows Report’s team spotted the new Global Privacy Control (GPC) setting in <a data-id="57299" data-type="post" href="https://hackread.com/google-chrome-will-warn-users-man-middle-attack/">Chrome Canary</a> and shared their finding with Hackread.com.</p>
<p>The experimental feature is present in Chrome Canary on Android, Windows, macOS, Linux, and ChromeOS. However, Windows Report observed the user-facing Settings toggle only on Android, where it is not yet fully connected to Chrome’s underlying GPC signal.</p>
<p>GPC acts like a digital privacy signal that a browser sends when a user visits a website. It tells websites that the user wants to opt out of certain uses of their personal data, such as its sale or sharing. The GPC specification is designed to communicate privacy requests such as “Do Not Sell or Share” under laws including the California Consumer Privacy Act (<a href="https://oag.ca.gov/privacy/ccpa">CCPA</a>).</p>
<h3><strong>Testing Begins on Mobile Devices</strong></h3>
<p>The Universal Opt Out Settings flag is visible in recent Chrome Canary builds on <a href="https://hackread.com/android-apps-magicad-trojan-official-stores/">Android</a>, Windows, macOS, Linux and ChromeOS. However, Windows Report’s testing found that the new user-facing Settings toggle is currently appearing first on Android.</p>
<p>CompareBrowsers</p>
<p>To test the feature, users must download <a href="https://www.google.com/intl/en_pk/chrome/canary/">Chrome Canary</a>, Google’s experimental browser for testing early updates. They can then open <code>chrome://flags</code>, enable the flag named Universal Opt Out Settings, and relaunch <a href="https://hackread.com/google-chrome-update-infostealer-cookie-theft/">Chrome.</a> The new option appears under Chrome’s Privacy and security section.</p>
<p>However, the feature is not fully connected yet. Turning on the visible toggle does not currently cause Chrome to send the underlying GPC signal. Windows Report <a href="https://windowsreport.com/chrome-tests-global-privacy-control-setting-to-opt-out-of-data-sharing/">found</a> that users must also enable a second experimental flag, called Force Global Privacy Control signal, for Chrome to send the Sec-GPC: 1 signal to websites. This indicates that Google is still connecting the new user-facing control to Chrome’s underlying GPC implementation.</p>
<h3><strong>What Users Should Expect</strong></h3>
<figure data-pk-uuid="qft05u207"><figure><a href="https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary.png"><img alt="" data-id="148764" sizes="(max-width: 768px) 100vw, 768px" src="https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary.png" srcset="https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary.png 768w, https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-300x200.png 300w, https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-380x253.png 380w"/></a><figcaption>(Credit: Windows Report) </figcaption></figure><figure><a href="https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-1.png"><img alt="" data-id="148765" sizes="(max-width: 586px) 100vw, 586px" src="https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-1.png" srcset="https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-1.png 586w, https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-1-300x256.png 300w, https://hackread.com/wp-content/uploads/2026/08/Google-Tests-Global-Privacy-Control-Setting-in-Chrome-Canary-1-380x324.png 380w"/></a><figcaption>(Credit: Windows Report)</figcaption></figure></figure>
<p>Chrome warns users that “depending on the laws in your region,” the opt-out request may affect the sale or sharing of their data or how their data is used for targeted advertising. The setting is not a tracker blocker and does not guarantee the same response from every website. Businesses covered by applicable privacy laws may be required to honor the signal, while its effect elsewhere depends on whether a <a href="https://chromium.googlesource.com/chromium/src/%2B/main/chrome/browser/flag_descriptions.h">website supports GPC</a>.</p>
<p>CompareBrowsers</p>
<p>The feature is experimental, and Google hasn’t announced when, or if, the toggle will reach stable Chrome. Its design and behavior could change before any wider rollout.</p>
