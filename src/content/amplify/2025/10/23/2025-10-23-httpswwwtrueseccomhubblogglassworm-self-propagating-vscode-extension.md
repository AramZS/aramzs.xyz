---
author: Hjalmar Desmond
cover_image: >-
  https://www.truesec.com/wp-content/uploads/2025/10/Firefly-a-cyber-tech-inspired-background-image-representing-the-concept-of-AI-colorscheme-is-teal-a.jpg
date: '2025-10-23T14:44:34.743Z'
dateFolder: 2025/10/23
description: >-
  Seven OpenVSX extensions were compromised on October 17, 2025, with 35,800
  total downloads, and ten extensions were still actively distributing malware
isBasedOn: 'https://www.truesec.com/hub/blog/glassworm-self-propagating-vscode-extension'
link: 'https://www.truesec.com/hub/blog/glassworm-self-propagating-vscode-extension'
slug: >-
  2025-10-23-httpswwwtrueseccomhubblogglassworm-self-propagating-vscode-extension
tags:
  - infosec
title: GlassWorm – Self-Propagating VSCode Extension Worm
---
<p>GlassWorm is the first self-propagating worm targeting VS Code extensions on OpenVSX marketplace. The attack uses invisible Unicode characters to hide malicious code from code editors and review processes, combined with blockchain-based command and control infrastructure on the Solana blockchain that cannot be taken down.</p>
<figure><img alt="glassworm" sizes="(max-width: 1920px) 100vw, 1920px" src="https://www.truesec.com/wp-content/uploads/2025/10/Firefly-a-cyber-tech-inspired-background-image-representing-the-concept-of-AI-colorscheme-is-teal-a-1920x1080.jpg" srcset="https://www.truesec.com/wp-content/uploads/2025/10/Firefly-a-cyber-tech-inspired-background-image-representing-the-concept-of-AI-colorscheme-is-teal-a-1920x1080.jpg 1920w, https://www.truesec.com/wp-content/uploads/2025/10/Firefly-a-cyber-tech-inspired-background-image-representing-the-concept-of-AI-colorscheme-is-teal-a-960x540.jpg 960w, https://www.truesec.com/wp-content/uploads/2025/10/Firefly-a-cyber-tech-inspired-background-image-representing-the-concept-of-AI-colorscheme-is-teal-a-480x270.jpg 480w, https://www.truesec.com/wp-content/uploads/2025/10/Firefly-a-cyber-tech-inspired-background-image-representing-the-concept-of-AI-colorscheme-is-teal-a-1440x810.jpg 1440w"/></figure>
<p>Seven OpenVSX extensions were compromised on October 17, 2025, with 35,800 total downloads, and ten extensions were still actively distributing malware two days later. The malware harvests NPM, GitHub, and Git credentials, targets 49 different cryptocurrency wallet extensions, deploys SOCKS proxy servers turning developer machines into criminal infrastructure, and installs hidden VNC servers for complete remote access. The stolen credentials are used to automatically compromise additional packages and extensions, creating exponential spread through the developer ecosystem. It uses Google Calendar as backup C2 server. This means Glassworm is using a triple layer C2 set up with the Solana blockchain, the use of a direct IP connection and Google Calendar, making it very robust.</p>
<p>On October 19, a new infected extension was detected in Microsoft’s VSCode marketplace and it’s stiill active. [1]</p>
<p><strong>OpenVSX Extensions (with malicious versions): </strong></p>
<p>codejoy.codejoy-vscode-extension@1.8.3</p>
<p>codejoy.codejoy-vscode-extension@1.8.4</p>
<p>l-igh-t.vscode-theme-seti-folder@1.2.3</p>
<p>kleinesfilmroellchen.serenity-dsl-syntaxhighlight@0.3.2</p>
<p>JScearcy.rust-doc-viewer@4.2.1</p>
<p>SIRILMP.dark-theme-sm@3.11.4</p>
<p>CodeInKlingon.git-worktree-menu@1.0.9</p>
<p>CodeInKlingon.git-worktree-menu@1.0.91</p>
<p>ginfuru.better-nunjucks@0.3.2</p>
<p>ellacrity.recoil@0.7.4</p>
<p>grrrck.positron-plus-1-e@0.0.71</p>
<p>jeronimoekerdt.color-picker-universal@2.8.91</p>
<p>srcery-colors.srcery-colors@0.3.9</p>
<p>sissel.shopify-liquid@4.0.1</p>
<p>TretinV3.forts-api-extention@0.3.1</p>
<p><strong>Microsoft VSCode Extensions:</strong></p>
<p>cline-ai-main.cline-ai-agent@3.1.3</p>
<p>This is an active campaign.</p>
<ul> <li>Make an audit of your installed extensions. Check for abnormal activity such as suspicious network connections, vulnerable dependencies and strange API usage.</li> <li>Scan new extensions before you install them.</li> <li>Only install extensions you need, and remove extensions that are no longer in use. Each installed extension extends your attack surface.</li> <li>Evaluate extensions before installing them, check for reviews, extension history, publisher reputation etc.</li> <li>Be careful when using auto-update, a compromised extension might install malware when auto-update is turned on.</li> <li>Keep an extension inventory.</li> <li>Consider a centralized allowlist for VSCode extensions.</li> </ul>
<p>217.69.3.218 (primary C2 server)</p>
<p>140.82.52.31:80/wall (exfiltration endpoint)</p>
<p>Solana Wallet: 28PKnu7RzizxBzFPoLp69HLXp9bJL3JFtT2s5QzHsEA2</p>
<p>49CDiVWZpuSW1b2HpzweMgePNg15dckgmqrrmpihYXJMYRsZvumVtFsDim1keESPCrKcW2CzYjN3nSQDGG14KKFM</p>
<p>https://calendar.app.google/M2ZCvM8ULL56PD1d6</p>
<p>Organizer: uhjdclolkdn@gmail.com</p>
<p>http://217.69.3.218/qQD%2FJoi3WCWSk8ggGHiTdg%3D%3D</p>
<p>http://217.69.3.218/get_arhive_npm/</p>
<p>http://217.69.3.218/get_zombi_payload/qQD%2FJoi3WCWSk8ggGHiTdg%3D%3D</p>
<p>HKCU\Software\Microsoft\Windows\CurrentVersion\Run</p>
<p>HKLM\Software\Microsoft\Windows\CurrentVersion\Run</p>
<p>[1] <a href="https://www.koi.ai/blog/glassworm-first-self-propagating-worm-using-invisible-code-hits-openvsx-marketplace">https://www.koi.ai/blog/glassworm-first-self-propagating-worm-using-invisible-code-hits-openvsx-marketplace</a></p>
