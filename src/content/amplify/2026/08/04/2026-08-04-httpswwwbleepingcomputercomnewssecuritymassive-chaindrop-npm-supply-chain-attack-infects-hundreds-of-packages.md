---
author: Bill Toulas
cover_image: 'https://www.bleepstatic.com/content/hl-images/2026/05/18/NPM-worms.jpg'
date: '2026-08-04T16:40:52.937Z'
dateFolder: 2026/08/04
description: "Self-propagating malware named 'ChainDrop' has compromised more than\_1,300 packages with a combined 2 billion monthly downloads\_on the Node Package Manager (npm) registry."
isBasedOn: >-
  https://www.bleepingcomputer.com/news/security/massive-chaindrop-npm-supply-chain-attack-infects-hundreds-of-packages/
link: >-
  https://www.bleepingcomputer.com/news/security/massive-chaindrop-npm-supply-chain-attack-infects-hundreds-of-packages/
slug: >-
  2026-08-04-httpswwwbleepingcomputercomnewssecuritymassive-chaindrop-npm-supply-chain-attack-infects-hundreds-of-packages
tags:
  - infosec
title: Massive ChainDrop npm supply-chain attack infects hundreds of packages
---
<p>By</p>
<h6><a href="https://www.bleepingcomputer.com/author/bill-toulas/">Bill Toulas</a></h6>
<ul><li>August 4, 2026</li> <li>11:24 AM</li> <li><a href="https://www.bleepingcomputer.com/news/security/massive-chaindrop-npm-supply-chain-attack-infects-hundreds-of-packages/#comment_form">0</a></li> </ul>
<figure><img alt="Massive ChainDrop npm supply-chain attack infects hundreds of packages" src="https://www.bleepstatic.com/content/hl-images/2026/05/18/NPM-worms.jpg"/><figcaption>Self-propagating malware named 'ChainDrop' has compromised more than 1,300 packages with a combined 2 billion monthly downloads on the Node Package Manager (npm) registry.</figcaption></figure>
<p>Infected packages include very popular ones such as Keyv and Cacheable, flat-cache and file-entry-cache, all caching utilities from the same maintainer.</p>
<p>The supply-chain attack started after the threat actor compromised the GitHub account of Keyv’s maintainer, and quickly spread to packages associated with major organizations such as Deliveroo, Ornikar, OneReach, Picsart, Qlik, and ServiceTitan.</p>
<figure><a href="https://www.wiz.io/lp/ai-security-starter-pack?utm_source=bleepingcomputer&amp;utm_medium=display&amp;utm_campaign=FY27Q2_INB_FORM_AI-Security-Starter-Kit&amp;sfcid=701Vh00000cn7aRIAQ&amp;utm_term=FY27-bleepingcomputer-article-970x250-August&amp;utm_content=AI-Security-Bundle"><img alt="image" src="https://www.bleepstatic.com/c/w/w-ai-security.jpg"/></a></figure>
<p>Multiple application security companies spotted the attack and discovered that it deployed a Shai-Hulud-based worm named ChainDrop.</p>
<p>A report from Aikido says "at least 868 packages (across 1381 versions) have been compromised by the worm."</p>
<p>The researchers say that the attacker pushed malicious files directly to the projects’ main branches and then generated new package releases.</p>
<p>Because the packages were built and published through their legitimate GitHub Actions workflows, the compromised npm releases carried valid provenance information.</p>
<p>The poisoned packages contain two files: the <code>setup.mjs</code> payload dropper and the <code>Math_Symbol.js</code> script for stealing sensitive information, as well as a <code>"preinstall": "node setup.mjs"</code> entry in their <code>package.json </code>configuration file.</p>
<p>"Anyone who ran <code>npm install</code> against an affected version would have had <code>setup.mjs</code> execute automatically before their install completed," <a href="https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack">Aikido researchers warn</a>.</p>
<p>The <code>setup.mjs</code> dropper downloads the Bun JavaScript runtime from the official GitHub release to execute <code>Math_Symbol.js,</code> the malicious payload with infostealing capabilities.</p>
<pre><code>execFileSync(&lt;bun binary&gt;, ['&lt;script_dir&gt;/Math_Symbol.js'], {
  stdio: 'inherit',
  cwd: &lt;script_dir&gt;
})</code></pre>
<p>After downloading the Bun executable to run the infostealer script, <code>setup.mjs</code> deletes the temporary runtime directory.</p>
<p>Aikido notes that the infostealer collects developer and cloud credentials from the compromised environment and encrypts them before sending them to a public GitHub repository with the description "Shai-Hulud: Here We Go Again."</p>
<p>The malicious JavaScript is heavily obfuscated and includes self-spreading capabilities that allow it to infect packages from other maintainers that used a previously compromised package.</p>
<p>While Aikido found that the Bun executable launched the Math_Symbol.js script, BleepingComputer has also seen compromised npm packages containing the <code>math_init.js </code>script.</p>
<figure><img alt="Obfuscated math_init.js / Math_Symbol.js script" src="https://www.bleepstatic.com/images/news/u/1100723/ChainDrop_math_initJS.png"/><figcaption>Obfuscated math_init.js / Math_Symbol.js script source: BleepingComputer</figcaption></figure>
<p>Every token is first validated in real-time against <em>registry.npmjs[.]org/-/whoami</em> before being stolen.</p>
<p>The malware searches infected development systems and CI/CD runners for credentials that could grant it access to additional source code repositories and npm packages, and collects the following types of data:</p>
<ul><li>The complete process environment.</li> <li>Local configuration and credential files.</li> <li>GitHub PATs, workflow tokens, and other <code>ghp_</code>, <code>gho_</code>, and <code>ghs_</code> tokens.</li> <li>npm tokens beginning with <code>npm_</code>.</li> <li>GitHub Actions secrets, including code designed to extract <code>"isSecret":true</code> values from a self-hosted runner.</li> <li>AWS credentials, SSM Parameter Store values using <code>WithDecryption: true</code>, and Secrets Manager secrets.</li> <li>Kubernetes secrets from accessible namespaces.</li> <li>HashiCorp Vault tokens and KV secrets.</li> <li>Database credentials, private keys, Stripe, Slack, Twilio, Azure, and GCP credentials.</li> </ul>
<p>According to cloud security company Wiz, the ‘npm-cache[.]com’ domain is also being used for exfiltrating data and should be treated as a strong indicator of compromise.</p>
<p>If an affected package version was installed, system administrators should treat the developer workstation or CI/CD runner as compromised even if the package was subsequently removed.</p>
<p>In such instances, it is recommended to rebuild systems from safe backups or from scratch, rotate all tokens that were accessible from the impacted environment, and review logs for unauthorized access and repositories for unexpected commits or changes.</p>
<p>As the attack is still unfolding, the number of packages and exact malicious versions is expected to grow, so it is important to continue using dependency allowlisting, integrity checks, and provenance controls.</p>
<p>A list of compromised npm packages is available from <a href="https://www.wiz.io/blog/keyv-and-cacheable-npm-supply-chain-attack">Wiz</a>, <a href="https://www.stepsecurity.io/blog/chaindrop-npm-worm">StepSecurity</a>, <a href="https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack">Aikido</a>, <a href="https://socket.dev/supply-chain-attacks/keyv-and-cacheable-compromise">Socket</a>, and <a href="https://www.ox.security/blog/a-new-infostealer-worm-hits-npm-affecting-keyv-and-cacheable">Ox Security</a>. The security companies also provide a list of indicators of compromise that include hashes for malicious files and artifacts, and network data.</p>
<figure><a href="https://hubs.li/Q04jQ9z40"><img alt="article image" data-src="https://www.bleepstatic.com/c/p/bas-report.jpg" src="https://www.bleepstatic.com/c/p/bas-report.jpg"/></a><figcaption><a href="https://hubs.li/Q04jQ9z40">article image</a></figcaption></figure>
