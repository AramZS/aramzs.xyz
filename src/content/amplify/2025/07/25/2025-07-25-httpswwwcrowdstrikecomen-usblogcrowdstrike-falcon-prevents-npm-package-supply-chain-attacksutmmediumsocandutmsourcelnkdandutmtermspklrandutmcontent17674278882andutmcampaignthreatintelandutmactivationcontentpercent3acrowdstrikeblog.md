---
author: Veronica Tecan
cover_image: 'https://assets.crowdstrike.com/is/image/crowdstrikeinc/WebShareDefaultImage'
date: '2025-07-25T16:07:25.304Z'
dateFolder: 2025/07/25
description: >-
  CrowdStrike Falcon prevents supply chain attacks involving compromised NPM
  packages. Learn more about recent attacks.
isBasedOn: >-
  https://www.crowdstrike.com/en-us/blog/crowdstrike-falcon-prevents-npm-package-supply-chain-attacks/?utm_medium=soc&utm_source=lnkd&utm_term=spklr&utm_content=17674278882&utm_campaign=threat+intel&utm_activation=content%3A+crowdstrike+blog
link: >-
  https://www.crowdstrike.com/en-us/blog/crowdstrike-falcon-prevents-npm-package-supply-chain-attacks/?utm_medium=soc&utm_source=lnkd&utm_term=spklr&utm_content=17674278882&utm_campaign=threat+intel&utm_activation=content%3A+crowdstrike+blog
slug: >-
  2025-07-25-httpswwwcrowdstrikecomen-usblogcrowdstrike-falcon-prevents-npm-package-supply-chain-attacksutmmediumsocandutmsourcelnkdandutmtermspklrandutmcontent17674278882andutmcampaignthreatintelandutmactivationcontentpercent3acrowdstrikeblog
tags:
  - tech
  - infosec
title: >-
  CrowdStrike Falcon Prevents Supply Chain Attack Involving Compromised NPM
  Packages
---
<p>Recently, five popular NPM (Node Package Manager) packages were compromised and modified to deliver a malicious DLL, dubbed “<a data-tracked="true" href="https://malpedia.caad.fkie.fraunhofer.de/details/win.scavenger?utm_medium=soc&amp;utm_source=lnkd&amp;utm_term=spklr&amp;utm_content=17674278882&amp;utm_campaign=threat+intel&amp;utm_activation=content%3A+crowdstrike+blog">Scavenger</a>”. The malware pushed via these compromised NPM packages executes in two stages: an initial first-stage loader, followed by a second-stage infostealer.</p>
<p>NPM is the package manager for the Node.js JavaScript platform, which allows developers to share and manage JavaScript libraries and tools. By compromising these packages, attackers are able to perform supply chain attacks that have widespread impact and can be challenging to identify.</p>
<p>Here, we outline this attack and explain how the CrowdStrike Falcon® platform detects and successfully prevents the malicious NPM packages and Scavenger malware observed within this campaign.</p>
<h2>Supply Chain Attack Overview</h2>
<p>On July 18, 2025, an unknown adversary was observed modifying the contents of multiple NPM packages to further actions on objectives. This access was made possible following a successful credential phishing campaign targeting an NPM package maintainer that leveraged a spoofed login page and typosquatted domain of the NPM website.</p>
<p>In all, five NPM packages maintained by the compromised account were modified and malicious versions of those packages were published the same day. The most popular package, <code>eslint-config-prettier</code>, has over 30 million downloads per week, and its compromise was assigned <a data-tracked="true" href="https://nvd.nist.gov/vuln/detail/CVE-2025-54313?utm_medium=soc&amp;utm_source=lnkd&amp;utm_term=spklr&amp;utm_content=17674278882&amp;utm_campaign=threat+intel&amp;utm_activation=content%3A+crowdstrike+blog">CVE-2025-54313</a> with a CVSS severity rating of High.</p>
<p>The following specific packages and their associated versions were published as part of this campaign:</p>
<ul><li data-tracked="true"><code>eslint-config-prettier</code> (8.10.1, 9.1.1, 10.1.6, 10.1.7)</li><li data-tracked="true"><code>eslint-plugin-prettier</code> (4.2.2, 4.2.3)</li><li data-tracked="true"><code>synckit</code> (0.11.9)</li><li data-tracked="true"><code>@pkgr/core</code> (0.2.8)</li><li data-tracked="true"><code>napi-postinstall</code> (0.3.1)</li></ul>
<p>The altered packages included the install script <code>install.js</code> and the Scavenger DLL <code>node-gyp.dll</code>. The script is executed upon installation of the packages and spawns <code>rundll32.exe</code> to load the DLL <code>node-gyp.dll</code>.</p>
<p>The Scavenger DLL reads and exfiltrates the contents of the user’s NPM configuration file <code>.npmrc</code>, which often contains NPM authentication and access tokens. Additionally, the Scavenger DLL writes a second-stage infostealer payload to disk, which ultimately targets the victims' browser data, including visited URLs and cached content.</p>
<p>The affected packages have been deprecated on the NPM repository, and clean versions have been published by the maintainer.</p>
<h2>Falcon Platform Prevents Scavenger Malware</h2>
<p>CrowdStrike employs a layered approach for malware detection using machine learning and indicators of attack (IOAs). The Falcon platform prevented this attack in its initial stage by detecting and quarantining the Scavenger DLL. The <code>rundll32.exe</code> process spawned by <code>install.js</code> was also prevented by behavior-based detections (IOAs).</p>
<p>Customers should ensure their prevention policies are properly configured with the <code>Suspicious Processes</code> toggle enabled.</p>
<figure><img alt="Figure 1. Scavenger DLL node-gyp.dll is identified as malicious and quarantined by machine learning detections" src="https://www.crowdstrike.com/en-us/blog/crowdstrike-falcon-prevents-npm-package-supply-chain-attacks/_jcr_content/root/container/container/container/image/.coreimg.png/1753302819397/blog-npm-1.png"/><figcaption>Figure 1. Scavenger DLL node-gyp.dll is identified as malicious and quarantined by machine learning detections</figcaption></figure>
<figure></figure><figure><img alt="Figure 2. The rundll32.exe process attempting to execute the Scavenger DLL is prevented by IOAs" src="https://www.crowdstrike.com/en-us/blog/crowdstrike-falcon-prevents-npm-package-supply-chain-attacks/_jcr_content/root/container/container/container/image_copy/.coreimg.png/1753302819412/blog-npm-2.png"/><figcaption>Figure 2. The rundll32.exe process attempting to execute the Scavenger DLL is prevented by IOAs</figcaption></figure>
<figure></figure><p>As indicated within the images above, the Falcon platform successfully blocks multiple steps within the attack’s kill chain, ensuring no malicious actions are performed on a victim host.</p>
<h2>Indicators of Compromise</h2>
<table><tbody><tr><td><code>32d0dbdfef0e5520ba96a2673244267e204b94a49716ea13bf635fa9af6f66bf</code></td><td>Package installation script <code>install.js</code></td></tr><tr><td><code>c68e42f416f482d43653f36cd14384270b54b68d6496a8e34ce887687de5b441</code></td><td>First-stage Scavenger loader SHA256 hash</td></tr><tr><td><code>5bed39728e404838ecd679df65048abcb443f8c7a9484702a2ded60104b8c4a9</code></td><td>Second-stage Scavenger stealer SHA256 hash</td></tr><tr><td><code>firebase[.]su</code></td><td>Scavenger C2 domain</td></tr><tr><td><code>dieorsuffer[.]com</code></td><td>Scavenger C2 domain</td></tr><tr><td><code>smartscreen-api[.]com</code></td><td>Scavenger C2 domain</td></tr><tr><td><code>https[:]//firebase[.]su/c/k2</code></td><td>Scavenger C2 URL</td></tr><tr><td><code>https[:]//dieorsuffer[.]com/c/k2</code></td><td>Scavenger C2 URL</td></tr><tr><td><code>https[:]//smartscreen-api[.]com/c/k2</code></td><td>Scavenger C2 URL</td></tr></tbody></table>
<p>To hunt on the IOCs listed above, the following LogScale query may be used:</p>
<pre><code>case { 
    in("DomainName", values=["npnjs.com", "dieorsuffer.com", "smartscreen-api.com"]); 
    in("destination.domain", values=["npnjs.com", "dieorsuffer.com", "smartscreen-api.com"]);
    in("url.original", values=["https://firebase.su/c/k2", "https://dieorsuffer.com/c/k2", "https://smartscreen-api.com/c/k2"]);
    in("SHA256HashData", values=["c68e42f416f482d43653f36cd14384270b54b68d6496a8e34ce887687de5b441", "5bed39728e404838ecd679df65048abcb443f8c7a9484702a2ded60104b8c4a9", "32d0dbdfef0e5520ba96a2673244267e204b94a49716ea13bf635fa9af6f66bf"]);
}</code>
</pre>
<p>Additionally, the following LogScale query may be leveraged to further hunt on this threat:</p>
<pre><code>#event_simpleName=ProcessRollup2 event_platform=Win 
| ParentBaseFileName=/node/i
| FileName=/rundll32\.exe/i
| CommandLine=/node-gyp.dll,main/i
| table([@timestamp, cid, aid, ComputerName, CommandLine])</code>
</pre>
<h2>Conclusion</h2>
<p>Threat actors often abuse the NPM repository by uploading malicious packages or compromising existing ones in supply chain attacks. NPM maintainer accounts have become an attractive target for attackers, as the poisoning of legitimate, popular packages to deploy malware provides access to numerous organizations. Falcon platform customers are protected against this supply chain attack that resulted in the Scavenger malware family being deployed to victim machines.</p>
