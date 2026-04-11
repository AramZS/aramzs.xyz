---
author: Sergiu Gatlan
cover_image: 'https://www.bleepstatic.com/content/hl-images/2025/08/07/Microsoft.jpg'
date: '2026-04-10T11:58:38.003Z'
dateFolder: 2026/04/10
description: >-
  Microsoft has suspended developer accounts used to maintain multiple
  high-profile open-source projects without proper notification and no way to
  quickly reinstate them, effectively blocking them from publishing new software
  builds and security patches for Windows users.
isBasedOn: >-
  https://www.bleepingcomputer.com/news/microsoft/microsoft-suspends-dev-accounts-for-high-profile-open-source-projects/
link: >-
  https://www.bleepingcomputer.com/news/microsoft/microsoft-suspends-dev-accounts-for-high-profile-open-source-projects/
slug: >-
  2026-04-10-httpswwwbleepingcomputercomnewsmicrosoftmicrosoft-suspends-dev-accounts-for-high-profile-open-source-projects
tags:
  - tech
title: Microsoft suspends dev accounts for high-profile open source projects
---
<p>By</p>
<h6><a href="https://www.bleepingcomputer.com/author/sergiu-gatlan/">Sergiu Gatlan</a></h6>
<ul><li>April 9, 2026</li> <li>02:46 AM</li> <li><a href="https://www.bleepingcomputer.com/news/microsoft/microsoft-suspends-dev-accounts-for-high-profile-open-source-projects/#comment_form">0</a></li> </ul>
<figure><img alt="Microsoft" src="https://www.bleepstatic.com/content/hl-images/2025/08/07/Microsoft.jpg"/></figure>
<p>Microsoft has suspended developer accounts used to maintain multiple high-profile open-source projects without proper notification and no way to quickly reinstate them, effectively blocking them from publishing new software builds and security patches for Windows users.</p>
<p>The list of affected projects includes, but is not limited to, Virtual Private Network (VPN) software WireGuard, on-the-fly encryption (OTFE) utility VeraCrypt, the MemTest86 Random Access Memory (RAM) testing and diagnosis tool, and the Windscribe VPN software.</p>
<p>"Microsoft terminated the account I have used for years to sign Windows drivers and the bootloader. [..] Microsoft did not send me any emails or prior warnings. I have received no explanation for the termination and their message indicates that no appeal is possible," <a href="https://sourceforge.net/p/veracrypt/discussion/general/thread/9620d7a4b3/#3470">VeraCrypt developer Mounir Idrassi said</a> last week.</p>
<figure><a href="https://www.adaptivesecurity.com/demo/security-awareness-training?utm_source=display_network&amp;utm_medium=paid_display&amp;utm_campaign=2026_04_display_bleepingcomputer&amp;utm_id=701Rd00000fE8REIA0&amp;utm_content=970x250"><img alt="Wiz" src="https://www.bleepstatic.com/c/a/as-tour-the-platform-970-x250.jpg"/></a></figure>
<p>"I have tried to contact Microsoft through various channels but I have only received automated replies and bots. I was unable to reach a human. [..] I cannot publish Windows updates. Linux and macOS updates can still be done but Windows is the platform used by the majority of users and so the inability to deliver Windows releases is a major blow to the project."</p>
<p>The same experience was shared by developers behind other widely used projects, including <a href="https://x.com/EdgeSecurity/status/2041872931576299888">WireGuard</a> maintainer <a href="https://news.ycombinator.com/item?id=47687884">Jason A. Donenfeld</a> and the dev teams for <a href="https://x.com/windscribecom/status/2041929519628443943">Windscribe</a> and <a href="https://x.com/PassMarkInc/status/2041996392072409191">MemTest86</a>, all of whom said they've been trying to contact a human at Microsoft Support for weeks without success.</p>
<p>"No warning at all, no notification. One day I sign in to publish an update, and yikes, account suspended. Currently undergoing some sort of 60 days appeals process, but who knows," Donenfeld said. "That's kind of crazy: what if there were some critical RCE in WireGuard, being exploited in the wild, and I needed to update users immediately?"</p>
<figure><img alt="Microsoft account suspension message" src="https://www.bleepstatic.com/images/news/u/1109292/2026/WireGuard_Microsoft_account_suspensin.jpg"/><figcaption>Microsoft account suspension message (Jason A. Donenfeld)</figcaption></figure>
<p>​However, after <a href="https://techcrunch.com/2026/04/08/wireguard-vpn-developer-cant-ship-software-updates-after-microsoft-locks-account/">TechCrunch</a> <a href="https://techcrunch.com/2026/04/08/veracrypt-encryption-software-windows-microsoft-lock-boot-issues/">reported</a> on the issue on Wednesday, Microsoft Vice President Scott Hanselman said the developer accounts were automatically suspended because they failed the "mandatory account verification for all partners in the Windows Hardware Program who have not completed account verification since April 2024" that the company had been emailing "everyone" about since October 2025.</p>
<p>As explained in a <a href="http://techcommunity.microsoft.com/blog/hardware-dev-center/action-required-account-verification-for-windows-hardware-program-begins-october/4455452">Hardware Dev Center article published on October 1</a>, the account verification process began on October 16 and would trigger an automatic suspension from the Windows Hardware Program if partners failed to complete it within 30 days.</p>
<p>"Account verification for the Windows Hardware Program has now concluded," Microsoft said in a March 30 update. "Accounts that did not successfully complete account verification and received a Rejected verification status have been suspended from the Windows Hardware Program, and submissions from these accounts are no longer permitted."</p>
<p>While BleepingComputer has yet to receive a reply after reaching out to a Microsoft spokesperson for more details, <a href="https://x.com/shanselman/status/2041974138253013205">Hanselman said</a> that the issue will be addressed "in a bit."</p>
<p>This was confirmed by <a href="https://sourceforge.net/p/veracrypt/discussion/general/thread/9620d7a4b3/#0022/64ca">Idrassi</a> and <a href="https://x.com/windscribecom/status/2042038700666757583">Windscribe</a>, with the former confirming that Hanselman reached out to help reinstate the suspended Partner Center account and stating that "social media postings and interview with journalists helped trigger a response from Microsoft."</p>
<figure><a href="https://hubs.li/Q048zztN0"><img alt="tines" data-src="https://www.bleepstatic.com/c/p/picus-whitepaper.jpg" src="https://www.bleepstatic.com/c/p/picus-whitepaper.jpg"/></a></figure>
<p>Automated pentesting proves the path exists. BAS proves whether your controls stop it. Most teams run one without the other.</p>
<p>This whitepaper maps six validation surfaces, shows where coverage ends, and provides practitioners with three diagnostic questions for any tool evaluation.</p>
<p><a href="https://www.bleepingcomputer.com/news/microsoft/new-kb5085516-emergency-update-fixes-microsoft-account-sign-in/">New KB5085516 emergency update fixes Microsoft account sign-in</a></p>
