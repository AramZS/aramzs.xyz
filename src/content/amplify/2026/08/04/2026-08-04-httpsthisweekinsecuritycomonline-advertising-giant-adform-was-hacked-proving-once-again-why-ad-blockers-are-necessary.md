---
author: Zack Whittaker
cover_image: >-
  https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w1200/2026/08/david-pupaza-heNwUmEtZzo-unsplash-1.jpg
date: '2026-08-04T17:58:15.148Z'
dateFolder: 2026/08/04
description: >-
  The hacked digital advertiser was caught serving malicious ads that allowed
  hackers to steal a victim's cryptocurrency.
isBasedOn: >-
  https://this.weekinsecurity.com/online-advertising-giant-adform-was-hacked-proving-once-again-why-ad-blockers-are-necessary/
link: >-
  https://this.weekinsecurity.com/online-advertising-giant-adform-was-hacked-proving-once-again-why-ad-blockers-are-necessary/
slug: >-
  2026-08-04-httpsthisweekinsecuritycomonline-advertising-giant-adform-was-hacked-proving-once-again-why-ad-blockers-are-necessary
tags:
  - ad tech
  - infosec
title: >-
  Online advertising giant Adform was hacked, proving once again why ad blockers
  are necessary
---
<figure><img alt='a screenshot of red text from a browser console log, which reads "Failed to load resource: net::ERR_BLOCKED_BY_AD" signifying the use of an ad-blocker.' sizes="(min-width: 1200px) 920px, 92vw" src="https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w1140/2026/08/david-pupaza-heNwUmEtZzo-unsplash-2.jpg" srcset="https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w400/2026/08/david-pupaza-heNwUmEtZzo-unsplash-2.jpg 400w,
https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w750/2026/08/david-pupaza-heNwUmEtZzo-unsplash-2.jpg 750w,
https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w960/2026/08/david-pupaza-heNwUmEtZzo-unsplash-2.jpg 960w,
https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w1140/2026/08/david-pupaza-heNwUmEtZzo-unsplash-2.jpg 1140w"/><figcaption>a screenshot of red text from a browser console log, which reads "Failed to load resource: net::ERR_BLOCKED_BY_AD" signifying the use of an ad-blocker.</figcaption></figure>
<p>Online ads provider Adform was hacked. On July 27, the company began serving ads containing malicious code. The company <a href="https://web.archive.org/web/20260801102947/https://site.adform.com/media/zwkpcmh5/adform-annual-report-2025.pdf">says</a> in its latest annual report that its serves 1.5 billion ads to people's devices daily.</p>
<p>According to security researcher Kevin Beaumont, who <a href="https://doublepulsar.com/adform-compromised-to-serve-crypto-stealer-via-supply-chain-attack-2f1ec024f33e"><u>first revealed the incident</u></a>, some of the code that Adform used to load its ads on its customers' websites was maliciously altered. The code was designed to trigger when it loaded in a victim's web browser.</p>
<p>The malicious code replaced a victim's crypto wallet address in their computer's clipboard with crypto wallet addresses controlled by the hacker. The code replaces the crypto addresses in the clipboard every three seconds, all but guaranteeing that the victim will inadvertently paste in the attacker's crypto wallet address and send their crypto to the hacker instead of its intended destination.</p>
<p>Per Beaumont's blog:</p>
<blockquote>"This allows end user devices of downstream websites to be compromised with crypto stealing malware. Meaning if you visit <code>example.com</code> and they use Adform, <code>example.com</code> will compromise your device."</blockquote>
<p>If you've ever needed another reason to use an ad-blocker, this is it. By blocking ads, you can prevent pervasive tracking, surveillance, and yes, even malware, from landing on your computer.</p>
<p>Adform has now <a href="https://site.adform.com/resources/newsroom/security-incident-company-update/"><u>disclosed the breach</u></a>, but the company didn't say how it was initially compromised or how many people may have been affected. When I reached out to the company with questions about the incident, a spokesperson referred me instead to its public statement.</p>
<p>Per its statement, Adform said it was still investigating if the hackers also took information about which websites a person visited; Adform said the code suggests this was possible.</p>
<p>I went to check out Adform's statement but couldn't at first, in large part because my ad blocker (<a href="https://github.com/gorhill/uBlock"><u>uBlock Origin</u></a> on desktop; <a href="https://kaylees.site/wipr2.html"><u>Filtr/Wipr</u></a> on iPhone) prevented Adform's entire domain from loading. Even had I visited a website that contained the malicious Adform code, this shows my ad blocker would have prevented the code from loading.</p>
<p>Practice safe browsing, <a href="https://this.weekinsecurity.com/why-ad-blockers-are-a-top-security-and-privacy-defense-for-everyone/"><u>use an ad-blocker</u></a>.</p>
<p><em>Thank you so much for reading </em><a href="https://this.weekinsecurity.com/"><em><u>~this week in security~</u></em></a><em>! I hope you enjoyed and found this article helpful. If you like it, please </em><a href="https://this.weekinsecurity.com/online-advertising-giant-adform-was-hacked-proving-once-again-why-ad-blockers-are-necessary/#/share"><em>share</em></a><em> a link on your social media! Please email me with any feedback, questions, or comments about this article: </em><a href="mailto:this@weekinsecurity.com"><em><u>this@weekinsecurity.com</u></em></a><em>. </em></p>
