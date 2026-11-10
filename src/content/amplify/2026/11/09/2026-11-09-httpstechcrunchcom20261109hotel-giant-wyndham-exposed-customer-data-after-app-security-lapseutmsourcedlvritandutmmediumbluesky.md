---
author: Zack Whittaker
cover_image: >-
  https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=1200,843
date: '2026-11-09T23:06:19.455Z'
dateFolder: 2026/11/09
description: >-
  Exclusive: Wyndham left a hardcoded credential in its customer app, allowing
  anyone to access customer data. The hotel giant wouldn't say if it has the
  ability to check for any past unauthorized access.
isBasedOn: >-
  https://techcrunch.com/2026/11/09/hotel-giant-wyndham-exposed-customer-data-after-app-security-lapse/?utm_source=dlvr.it&utm_medium=bluesky
link: >-
  https://techcrunch.com/2026/11/09/hotel-giant-wyndham-exposed-customer-data-after-app-security-lapse/?utm_source=dlvr.it&utm_medium=bluesky
slug: >-
  2026-11-09-httpstechcrunchcom20261109hotel-giant-wyndham-exposed-customer-data-after-app-security-lapseutmsourcedlvritandutmmediumbluesky
tags:
  - tech
  - infosec
title: Hotel giant Wyndham exposed customer data after app security lapse
---
<figure><img alt="" sizes="(max-width: 1024px) 100vw, 1024px" src="https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg" srcset="https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg 1665w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=150,105 150w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=300,211 300w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=768,540 768w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=680,478 680w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=1200,843 1200w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=1280,899 1280w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=430,302 430w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=720,506 720w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=900,632 900w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=800,562 800w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=1536,1079 1536w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=668,469 668w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=534,375 534w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=878,617 878w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=708,498 708w, https://techcrunch.com/wp-content/uploads/2026/11/wyndham-967205948.jpg?resize=50,35 50w"/><figcaption>Image Credits: Michael Nagle / Bloomberg / Getty Images</figcaption></figure>
<p>Hotel and resort giant Wyndham has acknowledged a cybersecurity incident after a good-faith security researcher discovered a bug that allowed anyone to access customers’ personal information.</p>
<p>Security researcher Robert Wiggins at <a href="https://www.what-security.co.uk/">What Security</a> exclusively told TechCrunch that he found a password inside the source code of Wyndham’s Android app, which granted access to an internal company database, hosted by tech company Salesforce.</p>
<p>Wiggins told TechCrunch that the credential exposed personal information including customer names, email addresses, and Wyndham member number. The database also stores customer login tokens (<a href="https://stackabuse.com/understanding-json-web-tokens-jwt/">called JWTs</a>) that keep customers logged-in to their apps without having to repeatedly enter their own passwords. The database also contained Wyndham files and documents.</p>
<p>According to Wiggins, the database had millions of entries, but he was unable to determine an accurate number of exposed customer records. Wyndham <a href="https://www.prnewswire.com/news-releases/wyndham-rewards-opens-the-door-to-extraordinary-escapes-with-debut-of-homes--havens-302923635.html">touts</a> some 129 million enrolled rewards members.</p>
<p>The researcher said Wyndham has no way to report security flaws, and asked for TechCrunch’s help in alerting the company. Soon after TechCrunch made contact with Wyndham’s cybersecurity staff, the exposed credential was revoked, preventing any further access to the database.</p>
<p>“Our team has taken steps to address the issue,” a Wyndham spokesperson told TechCrunch. “Our security teams have no evidence of any unauthorized access,” the statement added, without providing any further details about the claim.</p>
<p>Wyndham’s spokesperson would not say, when asked, whether the company had the technical means, such as server logs, to determine if anyone had access to the customer database prior to Wiggins’ discovery.</p>
<p>After the midterms, is the AI industry in for a rough two years? | Equity Podcast</p>
<p>0 seconds of 31 minutes, 38 secondsVolume 0%</p>
<p>Press shift question mark to access a list of keyboard shortcuts</p>
<p>Keyboard ShortcutsEnabledDisabled</p>
<p>Shortcuts Open/Close/ or ?</p>
<p>Play/PauseSPACE</p>
<p>Increase Volume↑</p>
<p>Decrease Volume↓</p>
<p>Seek Forward→</p>
<p>Seek Backward←</p>
<p>Captions On/Offc</p>
<p>Fullscreen/Exit Fullscreenf</p>
<p>Mute/Unmutem</p>
<p>Decrease Caption Size-</p>
<p>Increase Caption Size+ or =</p>
<p>Seek %0-9</p>
<p>00:00</p>
<p>31:38</p>
<p>31:38</p>
<p>TechCrunch also asked Wyndham whether it planned to notify customers whose information was exposed, or disclose the incident to U.S. regulators, such as filing notice with the U.S. Securities and Exchange Commission, as public companies are required to do for material cybersecurity incidents. Wyndham would not say.</p>
<p>Wyndham’s spokesperson also would not say for how long the password was embedded in its customer app, or how Wyndham plans to ship a long-term fix for the app.</p>
<p>App and software developers generally avoid including passwords or credentials in publicly released software and apps — a process known as “hardcoding” — as anyone with a copy of the software can extract the password and use it to access its associated server or database. Given the simplicity with which credentials can be abused by anyone, many cases of hardcoded credentials are automatically scored with a maximum vulnerability severity rating.</p>
<p>For Wiggins, this is his second public discovery of hardcoded credentials in two weeks, after finding a <a href="https://techcrunch.com/2026/10/30/applebees-exposed-customers-personal-data-after-leaving-database-password-in-app/">near-identical vulnerability in Applebee’s app</a> that exposed customer data. Wiggins relied on AI tools for both discoveries, which make it easier to identify simple security weaknesses, such as hardcoded credentials, by scouring thousands of lines of decompiled app code every second.</p>
<p>When asked about Wyndham’s response, Wiggins told TechCrunch that he was glad the company fixed the issue, but noted that without visibility into any past activity, someone with malicious intent could have leaked large amounts of customers’ personal information.</p>
<p>The company would not say whether it planned to set up a vulnerability disclosure program to allow outside security researchers and hackers to privately report security vulnerabilities.</p>
<p>Michael Francess, Wyndham’s cybersecurity director who responded to the incident, told TechCrunch that researchers can alert <a href="mailto:security@wyndham.com">security@wyndham.com</a> with details of potential security issues. The company’s spokesperson would not say say whether it plans to change its website to allow researchers to alert the company.</p>
<p>This is the latest known security incident at Wyndham in recent years. In 2024, a security researcher found <a href="https://techcrunch.com/2024/05/22/spyware-found-on-hotel-check-in-computers/">several Wyndham hotel check-in desks</a> were running remote-access spyware that was leaking screenshots of guest records and booking information to the open web.</p>
<p>Soon after our reporting, the spyware app found on the hotel computers, called pcTattletale, <a href="https://techcrunch.com/2024/05/25/spyware-app-pctattletale-was-hacked-and-its-website-defaced/">was hacked</a> and its banks of customer data stolen, forcing the company’s owner, Bryan Fleming, to shut down the company. Fleming, a former resident of Michigan, was later arrested by federal authorities and <a href="https://techcrunch.com/2026/04/06/convicted-spyware-maker-bryan-fleming-avoids-jail-at-sentencing/">convicted</a> of making, selling, and advertising unlawful spyware.</p>
