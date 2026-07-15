---
author: Swati Khandelwal
cover_image: >-
  https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKr3KoscB_oGLqU5_JV16DIaB7jXY1ko8PiJDTuwrxbHcZV2DYJpfkx8lqwNbscwTSTVQUMwd8vBf-nI13mQE7vzzmUzwKF3BF6q7s5Lnq7kG7CovDsKaHYlvKpEXo2cvNk4mA27BdJSI6buZLqtVCKhYQ31GOaozmEHQecUa9Zdt-jwFJIZ0OCvlF27_p/s1700-e365/smart-tv.jpg
date: '2026-07-14T22:33:27.394Z'
dateFolder: 2026/07/14
description: >-
  A reverse-engineered Bright Data SDK turns apps into web-scraping proxies,
  bypassing VPNs on iOS and allowing up to 200 GB a month.
isBasedOn: >-
  https://thehackernews.com/2026/06/free-apps-are-quietly-turning-smart-tvs.html?m=1
link: >-
  https://thehackernews.com/2026/06/free-apps-are-quietly-turning-smart-tvs.html?m=1
slug: >-
  2026-07-14-httpsthehackernewscom202606free-apps-are-quietly-turning-smart-tvshtmlm1
tags:
  - ai
  - tv
  - ad tech
  - privacy
title: Free Apps Are Turning Smart TVs Into Web-Scraping Proxies for AI
---
<p>A researcher has reverse-engineered the iOS SDK that Bright Data embeds in consumer apps and documented how, with the user's consent, it can turn devices, including always-on smart TVs, into exit nodes that relay web-scraping traffic for a data business Bright Data markets heavily to the AI industry.</p>
<p>The company, the successor to Luminati, operates what it calls the largest residential proxy network in the world, advertised at more than 400 million residential IPs. Part of that supply comes from this SDK, shipped inside free apps behind an opt-in screen and described by Bright Data as a consent-sourced pool of 150 million-plus IPs.</p>
<p>The findings, published June 5 by <a href="https://blog.includesecurity.com/2026/06/the-smart-tv-in-your-livingroom-is-a-node-in-the-aiscraping-economy/">Include Security</a> and independent researcher Buchodi, matter because the scraping comes from the user's home IP, not the customer's. The immediate risk is not a hacked account or stolen data; it is that a home connection and its bandwidth get used as someone else's scraping infrastructure.</p>
<p>A connected TV is close to ideal for that: usually plugged in, on a fast connection, effectively unmetered, and unwatched.</p>
<p>The deepest technical evidence is from the iOS SDK; the smart-TV reach rests on Bright Data's platform support, its public partner list, and earlier reporting. The research found the peer channel that carries scraping jobs has no real authentication, and that on iOS, its traffic bypasses a configured VPN, which Bright Data says is an unintended bug it is fixing.</p>
<h2>Inside the peer tunnel</h2>
<p>When the app opens, the research found, the SDK fetches its instructions from a server that checks only the app's public ID and version, which means the same configuration can be pulled by anyone. From there, the server can direct the device to fetch pages from other websites, using the user's home internet connection to do it.</p>
<p>The research found that the channel that carries those jobs has none of the usual security checks on who connects.</p>
<figure><a href="https://thehackernews.uk/ai-sec-steps-m"><img alt="Cybersecurity" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOiMyCCf1EYE_bHjf0brGluP_B-LuW0397EZ_MqnCaore1VdPU69oSBHtIbTxjEMSfuT70kjN1ttpJZQyzDSzoC41U_vzqZeH7Tho9RqmAcVRaWwmfqDlsFiCw79vqvga6DdBZ7fHTnB3qrqlLQE0NRdoQixOli4OUj9tiZmxWStyjOLfLd_bjJ2qm6bdp/s300-e100/zz-m.png"/></a></figure>
<p>On iPhones, the research found that this traffic slips past a configured VPN, and that the SDK is built in a way that keeps part of its activity out of view of some standard tools used to monitor apps. Bright Data says the VPN behavior is an unintended bug rather than a deliberate attempt to hide the SDK, that VPN traffic holds no value for its network, and that it is updating the software to detect an active VPN and stop routing around it.</p>
<p>The research also found the device can keep relaying in the background while someone is watching the screen or on a call, as long as the battery is not low.</p>
<h2>The consent gap</h2>
<p>The research highlights a gap between how the opt-in screen describes the SDK and what its configuration permits. In Petflix, a Roku app, the screen tells users that Bright Data will "occasionally" use the device's free resources and IP address, and that no personal information is collected except the IP address.</p>
<p>The SDK's configuration, the research found, sets a maximum of 200 GB of Wi-Fi traffic a month. (Petflix runs on Roku, which Bright Data says it no longer supports; the wording is set by the SDK, not the platform.)</p>
<p>The research also found that in a few countries, including Uzbekistan and Oman, the configuration set far higher limits, with devices cleared to keep relaying almost until the battery ran flat. Bright Data says those were temporary legacy rules it has since removed.</p>
<p>The research found Bright Data exposes its list of app partners on a page anyone can open, naming makers of smart-TV apps such as PlayWorks Digital, CloudTV, and Longvision. The researcher is careful to note that being on the list only shows a company worked with Bright Data at some point, not that its app includes the SDK today. Each one would need to be checked on its own.</p>
<p>Bright Data disputes the characterization. In an email to The Hacker News, the company said its opt-in screen is explicit rather than buried in legal text, names Bright Data, links its privacy policy and license, and lets users opt out in two steps and keep using the app either way. It says the SDK reaches only approved domains, collects no personal data or browsing history, uses only the device's IP address, and runs on average around 50 MB a day on Wi-Fi, pausing when the device is busy or low on battery.</p>
<p>The company's CEO, Or Lenchner, said a device in its network "is a device whose owner said yes, understood what they were saying yes to, and can say no again at any moment with two steps." Bright Data also points to independent audits and certifications, including a PwC report, AppEsteem certification, and ISO and SOC 2 attestations, published in its <a href="https://brightdata.com/trustcenter">Trust Center</a>.</p>
<h2>An old model, pulled by AI demand</h2>
<p>None of this is new in shape, only in scale. Bright Data is the successor to Luminati, the paid proxy service that grew out of Hola VPN. In 2015, Hola was <a href="https://thehackernews.com/2015/05/hola-widely-popular-free-vpn-service.html">caught selling its free users' bandwidth</a> as exit nodes through Luminati, at $20 a gigabyte.</p>
<p>The same business model now runs on the always-on box in the living room, though Bright Data says today's SDK is opt-in and independently audited in ways the 2015 setup was not.</p>
<p>What changed is the buyer. Anti-bot defenses from Cloudflare, DataDome, and others block scrapers coming from datacenter IPs, so AI scrapers route through residential connections instead.</p>
<figure><a href="https://thehackernews.uk/sygnia-cyber-response-m-2"><img alt="Cybersecurity" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_71ojN7Xl8LKbEgZSpa-OVIcV_YUYvhU-gTSXBO8LSgv4WRU1XG8Vmmo7WhsxhJTsVDhh4jEmzz4LjKa8yYIIdXxIYBlCdLieSE1b8KH_hSUd5MdyarA8GQnjHkl3RYPYVyMTC4DKcqeOxzvOE9bSYAQ1NssztqRkDvA-viJk01RyqECPt426M73QZO4A/s1600/sy-m-2.jpg"/></a></figure>
<p>Krebs <a href="https://krebsonsecurity.com/2025/10/aisuru-botnet-shifts-from-ddos-to-residential-proxies/">reported in October 2025</a> that proxies from botnets like Aisuru are fueling large-scale AI data harvesting, and Google <a href="https://thehackernews.com/2026/01/google-disrupts-ipidea-one-of-worlds.html">dismantled the criminal IPIDEA proxy network</a> in January. Those operations hijack consumer devices; Bright Data says its exit nodes opt in through a consent screen. That consent is the line between the two, and whether it is meaningful is an open question.</p>
<p>Lowpass, syndicated by The Verge, <a href="https://www.lowpass.cc/p/smart-tv-web-scraping-ai-bright-data-proxy-networks">first surfaced</a> the smart-TV angle in February, and this is the technical teardown. Google, Amazon, and Roku have since restricted background proxy SDKs, and Bright Data dropped those platforms, though it still lists Samsung's Tizen and LG's webOS.</p>
<h2>What to do</h2>
<p>The traffic is easy to spot and block. On a home network, the simplest step is to block the web addresses the SDK uses to connect, with a router-level tool like Pi-hole or NextDNS.</p>
<p>The main ones are proxyjs.brdtnet.com, proxyjs.luminatinet.com, proxyjs.bright-sdk.com, clientsdk.bright-sdk.com, and clientsdk.brdtnet.com. According to the research, blocking these stops the device from acting as a relay without affecting Bright Data's paid service, which runs on separate addresses.</p>
<p>Companies that manage staff phones can also scan for apps that carry the SDK. One catch: on a mobile connection, the traffic sidesteps office Wi-Fi, so a network block alone will not always catch it. Bright Data could also change how the SDK connects in the future, which would mean any blocklist needs updating.</p>
<p><i>Updated on June 9 and June 16, 2026, to include Bright Data's response and a comment from its CEO, and to reflect later revisions to the source research.</i></p>
