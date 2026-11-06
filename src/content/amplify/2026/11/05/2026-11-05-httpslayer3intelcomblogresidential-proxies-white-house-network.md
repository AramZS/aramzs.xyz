---
author: LAYER3 INTEL
cover_image: 'https://layer3intel.com/eop_proxy_activity.png'
date: '2026-11-05T14:13:28.074Z'
dateFolder: 2026/11/05
description: >-
  Our new Residential Proxy Observatory shows residential proxy traffic exiting
  the White House network: 236 times in 30 days, through 28 public proxy
  services.
isBasedOn: 'https://layer3intel.com/blog/residential-proxies-white-house-network'
link: 'https://layer3intel.com/blog/residential-proxies-white-house-network'
slug: 2026-11-05-httpslayer3intelcomblogresidential-proxies-white-house-network
tags:
  - infosec
title: Residential Proxies Detected on White House Network
---
<p>Our <a href="https://layer3intel.com/context">Residential Proxy Observatory</a>, launched earlier this week, is a first-of-its-kind interface that gives researchers a global view of residential proxy and anonymized internet activity.</p>
<p>While our team was looking through it, we noticed residential proxy exit activity on <a href="https://layer3intel.com/context/AS2650">AS2650</a>. AS2650 is registered to the Executive Office of the President, the federal agency that hosts the White House network. <a href="https://layer3intel.com/what-is-a-residential-proxy">Residential proxy services</a> sell access to everyday devices, letting customers send traffic through them so it appears to come from that device's network.</p>
<figure><img alt="Chart titled AS2650, day by day, covering October 5 to November 3, 2026: 236 observations, with one to three unique proxy exits on most days and a line of daily observations below" data-nimg="1" sizes="(max-width: 800px) 100vw, 760px" src="https://layer3intel.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feop_proxy_activity.01iwvfjkrr2z9.png&amp;w=3840&amp;q=75" srcset="https://layer3intel.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feop_proxy_activity.01iwvfjkrr2z9.png&amp;w=640&amp;q=75 640w,"/><figcaption>Confirmed residential proxy activity observed from the White House network, October 5 to November 3, 2026.</figcaption></figure>
<h2>What we observed</h2>
<p>From October 5 to November 3:</p>
<ul><li>Our residential proxy enumeration pipeline exited through the White House network <strong>236 separate times</strong>.</li><li>Those exits came from <strong>6 addresses</strong>, on <strong>26 of the 30 days</strong>.</li><li><strong>28 separate residential proxy services</strong> were able to exit through this network.</li></ul>
<p>To make sure this was not a fluke, we checked these addresses against other residential proxy detection services, such as Spur and Synthient. Their public IP context pages independently identify these addresses as residential proxy exits.</p>
<p>This is public access. Anybody can obtain it by signing up to a public residential proxy service, paying a few dollars and sending requests through it. We did not selectively target this network or try to make our probes exit from it. We caught this by chance, simply by requesting global rotating access through these services.</p>
<h2>Why this is concerning</h2>
<p>Most of the activity happens in the evening, Eastern time: about half of it falls between 5 p.m. and midnight, and almost none happens in the early morning. That pattern suggests a person rather than a public guest Wi-Fi network: someone regularly on the White House network late into the evening, whose device is infected with a proxy SDK. Our data shows the exits, not the device or the person behind them.</p>
<p>Past research has shown that poorly secured proxy SDKs can allow internal network access and lateral movement. This is how past botnets have spread. In <a href="https://synthient.com/blog/a-broken-system-fueling-botnets">A Broken System Fueling Botnets</a>, the researchers at Synthient documented how the Kimwolf botnet reached at least 2 million devices, mostly Android devices with an exposed ADB service, through residential proxy networks. If an SDK on this network has the same kind of flaw, anyone buying proxy access could use it to reach internal systems.</p>
<h2>No place is too remote</h2>
<p>The White House is not the only surprise in the observatory. Residential proxies also reach some of the most isolated places on the planet.</p>
<p><a href="https://layer3intel.com/context/country/SH">Saint Helena, Ascension and Tristan da Cunha</a> is the South Atlantic territory that includes the most remote inhabited island in the world. We recorded <strong>413 addresses</strong> and more than <strong>32,000 observations</strong> there, split between Starlink and the island's local internet provider, Sure Saint Helena.</p>
<p>We also recorded <strong>three observations</strong> from <a href="https://layer3intel.com/context/country/AQ">Antarctica</a>. All of them come from a Cloudflare WARP address that points to McMurdo Station.</p>
<p>Other remote places with activity:</p>
<ul><li><a href="https://layer3intel.com/context/country/PN">Pitcairn</a>: 1 Starlink address, 1 observation.</li><li><a href="https://layer3intel.com/context/country/NF">Norfolk Island</a>: 1 Norfolk Telecom address, 4 observations.</li><li><a href="https://layer3intel.com/context/country/SJ">Svalbard</a>: 1 Starlink address in Longyearbyen, 3 observations.</li><li>Also seen: <a href="https://layer3intel.com/context/country/FK">the Falklands</a> (388 addresses), <a href="https://layer3intel.com/context/country/IO">the Chagos Islands</a> (43), <a href="https://layer3intel.com/context/country/TK">Tokelau</a> (21) and <a href="https://layer3intel.com/context/country/GS">South Georgia</a> (7).</li></ul>
<p>Residential proxies have infected every corner of the world, and it looks like there is no place they cannot reach. Layer3 Intel tracks residential proxy and anonymization infrastructure worldwide. Even when the proxies hide in networks on the farthest corners of the planet, we can still observe them, leaving threat actors no place to hide.</p>
