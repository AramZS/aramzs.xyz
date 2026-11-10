---
author: Michael Kan
cover_image: >-
  https://i.pcmag.com/imagery/articles/04UvUhTtquz33hIXPlERkh7-1.fit_lim.size_1200x630.v1793889441.jpg
date: '2026-11-09T18:51:58.946Z'
dateFolder: 2026/11/09
description: >-
  Evidence has emerged that White House staffers are using an app loaded with
  residential proxy services, which often sell IP addresses to anyone, including
  hackers.
isBasedOn: >-
  https://www.pcmag.com/news/white-house-network-possibly-exposed-to-hackers-via-proxy-services
link: >-
  https://www.pcmag.com/news/white-house-network-possibly-exposed-to-hackers-via-proxy-services
slug: >-
  2026-11-09-httpswwwpcmagcomnewswhite-house-network-possibly-exposed-to-hackers-via-proxy-services
tags:
  - tech
  - infosec
  - politics
  - baselines
title: White House Network Possibly Exposed to Hackers Via Proxy Services
---
<figure><img alt="White House" sizes="(max-width: 1200px) 100vw, (min-width: 850px) 850px" src="https://i.pcmag.com/imagery/articles/04UvUhTtquz33hIXPlERkh7-1.fit_lim.size_1600x900.v1793889441.jpg" srcset="https://i.pcmag.com/imagery/articles/04UvUhTtquz33hIXPlERkh7-1.fit_lim.size_400x250.v1793889441.jpg 400w, https://i.pcmag.com/imagery/articles/04UvUhTtquz33hIXPlERkh7-1.fit_lim.size_850x490.v1793889441.jpg 800w, https://i.pcmag.com/imagery/articles/04UvUhTtquz33hIXPlERkh7-1.fit_lim.size_1600x900.v1793889441.jpg 1600w"/><figcaption>(Photo by Mehmet Eser/Anadolu via Getty Images)</figcaption></figure>
<p>White House staffers might be using a Windows app that can also secretly give cybercriminals a way to route traffic through West Wing internet addresses.</p>
<p>Two cybersecurity providers have uncovered evidence that numerous residential <a href="https://www.pcmag.com/picks/the-best-proxies">proxy services</a> have access to the White House’s network. That’s concerning because <a href="https://www.pcmag.com/explainers/7-reasons-to-use-a-proxy-server-instead-of-a-vpn">proxy services</a> sell access to IP addresses in different parts of the world.</p>
<p>It's also alarming because cybercriminals regularly use proxy services to stage and hide their hacking activities by exploiting IP addresses that may be associated with a legitimate user’s residence, office, or even a government agency. In addition, consumer devices, including <a href="https://www.pcmag.com/news/samsung-blocks-tv-apps-that-let-others-use-your-internet-connection">smart TVs</a> and <a href="https://www.pcmag.com/news/us-helps-shut-down-proxy-service-used-to-hack-thousands-of-routers">routers</a>, can be secretly ensnared by such proxy services via malware or shady third-party software development kits (SDKs).</p>
<p>The evidence initially came from the cybersecurity vendor Layer 3 Intel, which was examining the network block <a href="https://layer3intel.com/context/AS2650">AS2650</a>, dedicated to the White House. Layer 3 Intel discovered internet traffic exiting the AS2650 network from at least 28 known residential proxy services between Oct. 5 and Nov. 3.</p>
<p>“Most of the activity happens in the evening, Eastern time: about half of it falls between 5 p.m. and midnight, and almost none happens in the early morning,” Layer 3 Intel <a href="https://layer3intel.com/blog/residential-proxies-white-house-network">wrote</a> in its report. “That pattern suggests a person rather than a public guest Wi-Fi network: someone regularly on the White House network late into the evening, whose device is infected with a proxy.”</p>
<p>Synthient, another company that tracks residential proxies, has also uncovered evidence linking the suspicious White House proxy traffic to Rave.io, a service that lets you watch <a href="https://www.pcmag.com/picks/the-best-video-streaming-services">streaming services</a> together with friends. Rave.io supports macOS, Windows, Android, and iOS. But according to Synthient, the Rave app appears to also be installed with 12 proxy-related SDKs.</p>
<p>“Synthient has the ability to detect the device on a per-session basis, which reveals a number of Windows 10 and Windows 11 devices beaconing to known proxy providers like Geonode, Infatica, and Mellowtel,” the company <a href="https://x.com/synthient/status/2118204377613914516">said</a>.</p>
<p>The Infatica mention is notable because the proxy service comes from a Russian man named Vladimir Fomenko, who ran a hosting service that Russia’s state security services used to compromise election database systems in Arizona and Illinois in 2016, <a href="https://krebsonsecurity.com/2026/11/want-to-rent-an-internet-address-at-the-white-house/">according</a> to cybersecurity journalist Brian Krebs. Infatica's marketing touts access to over 40 million IP addresses.</p>
<p>Synthient adds: “Some of the proxy resellers are observed selling bandwidth for as low as 30 cents per GB or $4 per hour. With zero KYC (Know Your Customer)."</p>
<p>Rave and the White House didn’t immediately respond to a request for comment.</p>
