---
author: we-have-a-problem.com
cover_image: null
date: '2026-10-21T06:25:25.621Z'
dateFolder: 2026/10/21
description: eMudhra Intermediate CA Compromise
isBasedOn: 'https://emudhra.we-have-a-problem.com/'
link: 'https://emudhra.we-have-a-problem.com/'
slug: 2026-10-21-httpsemudhrawe-have-a-problemcom
tags:
  - tech
  - infosec
title: eMudhra Intermediate CA Compromise
---
<p>The private keys of eight eMudhra intermediate CA certificates have been compromised. They chain to roots trusted by the Mozilla, Microsoft, Apple and Chrome root programs and by many downstream trust stores.</p>
<h2>How do we know?</h2>
<p>To demonstrate that the keys are compromised, the original reporter Wayne signed the following message with the private key of each of the eight intermediate CAs and reported it to the Root Program Teams on the 17th of October:</p>
<blockquote><p>We have a problem here - Wayne</p></blockquote>
<p><a href="https://emudhra.we-have-a-problem.com/proof.zip">proof.zip</a> contains the message, and for each intermediate the certificate, its public key and a signature on the message. To verify with OpenSSL:</p>
<pre>openssl x509 -in EM-DV-TLS-CA-G3B.crt.pem -noout -pubkey | diff - EM-DV-TLS-CA-G3B.pub.pem
openssl dgst -sha384 -verify EM-DV-TLS-CA-G3B.pub.pem -signature EM-DV-TLS-CA-G3B.sig message.txt</pre>
<h2>What actions have been taken?</h2>
<p>The root programs and many downstream trust stores have taken action to protect their users. The certificates have been blocked in Firefox and Chrome since the 17th of October, in Apple devices since the 19th and in Microsoft since the 20th.</p>
<p>The issue was responsibly disclosed to downstream trust stores on the 19th of October. Many have already released updates or are in the process of releasing updates.</p>
<h2>What are the consequences?</h2>
<p>An attacker with the private key of any of the compromised intermediate CAs could impersonate any website or service.</p>
<p>This has already been remediated by Mozilla, Microsoft, Apple, and Chrome for their users through their tools for distributing revocation information such as <a href="https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/">OneCRL</a>, <a href="https://hacks.mozilla.org/2025/08/crlite-fast-private-and-comprehensive-certificate-revocation-checking-in-firefox/">CRLite</a> and <a href="https://www.chromium.org/Home/chromium-security/crlsets/">CRLSets</a>.</p>
<p>The CA has also revoked the compromised intermediate certificates. However, many other clients do not consume revocation information and require software updates to ensure they no longer trust the compromised intermediates.</p>
<h2>Does your client still trust the compromised intermediates?</h2>
<table> <tr><th>Intermediate CA</th><th>Chains to</th><th>Result</th></tr> <tbody><tr><td><a href="https://dv-g3b-emudhra.we-have-a-problem.com/">CN=EM DV TLS CA - G3B, O=eMudhra BV, C=NL</a></td><td>emSign Root TLS CA - G3</td><td>checking…</td></tr><tr><td><a href="https://dv-g3c-emudhra.we-have-a-problem.com/">CN=EM DV TLS CA - G3C, O=eMudhra Inc, C=US</a></td><td>emSign Root TLS CA - G3</td><td>checking…</td></tr><tr><td><a href="https://ov-g3b-emudhra.we-have-a-problem.com/">CN=EM OV TLS CA - G3B, O=eMudhra BV, C=NL</a></td><td>emSign Root TLS CA - G3</td><td>checking…</td></tr><tr><td><a href="https://ov-g3c-emudhra.we-have-a-problem.com/">CN=EM OV TLS CA - G3C, O=eMudhra Inc, C=US</a></td><td>emSign Root TLS CA - G3</td><td>checking…</td></tr><tr><td><a href="https://ev-g3b-emudhra.we-have-a-problem.com/">CN=EM EV TLS CA - G3B, O=eMudhra BV, C=NL</a></td><td>emSign Root TLS CA - G3</td><td>checking…</td></tr><tr><td><a href="https://ev-g3c-emudhra.we-have-a-problem.com/">CN=EM EV TLS CA - G3C, O=eMudhra Inc, C=US</a></td><td>emSign Root TLS CA - G3</td><td>checking…</td></tr><tr><td><a href="https://dv-g3b-aaa-emudhra.we-have-a-problem.com/">CN=EM DV TLS CA - G3B, O=eMudhra BV, C=NL</a></td><td>AAA Certificate Services</td><td>checking…</td></tr><tr><td><a href="https://dv-g3c-aaa-emudhra.we-have-a-problem.com/">CN=EM DV TLS CA - G3C, O=eMudhra Inc, C=US</a></td><td>AAA Certificate Services</td><td>checking…</td></tr><tr><td><a href="https://ov-g3b-aaa-emudhra.we-have-a-problem.com/">CN=EM OV TLS CA - G3B, O=eMudhra BV, C=NL</a></td><td>AAA Certificate Services</td><td>checking…</td></tr><tr><td><a href="https://ov-g3c-aaa-emudhra.we-have-a-problem.com/">CN=EM OV TLS CA - G3C, O=eMudhra Inc, C=US</a></td><td>AAA Certificate Services</td><td>checking…</td></tr><tr><td><a href="https://ev-g3b-aaa-emudhra.we-have-a-problem.com/">CN=EM EV TLS CA - G3B, O=eMudhra BV, C=NL</a></td><td>AAA Certificate Services</td><td>checking…</td></tr><tr><td><a href="https://ev-g3c-aaa-emudhra.we-have-a-problem.com/">CN=EM EV TLS CA - G3C, O=eMudhra Inc, C=US</a></td><td>AAA Certificate Services</td><td>checking…</td></tr></tbody> </table>
<p>Run again</p>
<h2>What actions can users take?</h2>
<p>Users should update their browsers and operating systems to the latest versions as soon as possible.</p>
<h3>What about developer software and packages?</h3>
<table> <tr><th>Software</th><th>Patched version</th></tr> <tbody> <tr><td>Go</td><td><a href="https://groups.google.com/g/golang-announce/c/66pojueaQek">1.27.3, 1.26.10</a></td></tr> <tr><td>Electron</td><td><a href="https://github.com/electron/electron/releases/tag/v44.9.1">44.9.1, 43.8.1, 42.11.16</a></td></tr> <tr><td>Python certifi</td><td><a href="https://github.com/certifi/python-certifi/releases/tag/2026.10.19">2026.10.19</a></td></tr> <tr><td>Rust webpki-roots / webpki-root-certs</td><td><a href="https://github.com/rustls/webpki-roots/releases/tag/v%2F1.0.10">1.0.10</a></td></tr> <tr><td>Homebrew ca-certificates</td><td><a href="https://github.com/Homebrew/homebrew-core/blob/d02b8762f4a29859c47a635a0d2683223fea9812/Formula/c/ca-certificates.rb">2026-09-25_1</a></td></tr> <tr><td>Node.js</td><td><a href="https://github.com/nodejs/node/pull/66871">pending</a></td></tr> <tr><td>Composer ca-bundle</td><td><a href="https://github.com/composer/ca-bundle/pull/154">pending</a></td></tr> <tr><td>NSS</td><td><a href="https://groups.google.com/a/mozilla.org/g/dev-tech-crypto/c/vSxZxnOMMvs">3.131.1</a></td></tr> </tbody> </table>
<p>Add more at <a href="https://github.com/galadran/we-have-a-problem.com">github.com/galadran/we-have-a-problem.com</a>.</p>
<h3>Are there workarounds for Linux?</h3>
<p>Until a distribution ships an updated <code>ca-certificates</code> package, expert users can distrust the affected roots in the system trust store. This is NOT recommended for ordinary users.</p>
<p>On Debian and Ubuntu, run as root:</p>
<pre>sed -i \
  -e 's|^mozilla/emSign_ECC_Root_CA_-_G3.crt|!&amp;|' \
  -e 's|^mozilla/Comodo_AAA_Services_root.crt|!&amp;|' \
  /etc/ca-certificates.conf &amp;&amp; update-ca-certificates</pre>
<p>On Alpine, run as root:</p>
<pre>apk add ca-certificates &amp;&amp;
sed -i -e 's|^mozilla/emSign_ECC_Root_CA_-_G3.crt|!&amp;|' \
  /etc/ca-certificates.conf &amp;&amp; update-ca-certificates</pre>
<p>On Fedora, RHEL, CentOS Stream, Rocky Linux, AlmaLinux and Amazon Linux 2023, run as root:</p>
<pre>d=/etc/pki/ca-trust/source/blocklist; [ -d $d ] || d=/etc/pki/ca-trust/source/blacklist
trust extract --overwrite --format=pem-bundle \
  --filter='pkcs11:object=Comodo%20AAA%20Services%20root;type=cert' \
  $d/Comodo_AAA_Services_root.pem &amp;&amp;
trust extract --overwrite --format=pem-bundle \
  --filter='pkcs11:object=emSign%20ECC%20Root%20CA%20-%20G3;type=cert' \
  $d/emSign_ECC_Root_CA_-_G3.pem &amp;&amp;
update-ca-trust</pre>
<p>On openSUSE and SLES, run as root:</p>
<pre>d=/etc/pki/trust/blocklist; [ -d $d ] || d=/etc/pki/trust/blacklist
trust extract --format=pem-bundle \
  --filter='pkcs11:object=Comodo%20AAA%20Services%20root;type=cert' \
  $d/Comodo_AAA_Services_root.pem &amp;&amp;
trust extract --format=pem-bundle \
  --filter='pkcs11:object=emSign%20ECC%20Root%20CA%20-%20G3;type=cert' \
  $d/emSign_ECC_Root_CA_-_G3.pem &amp;&amp;
update-ca-certificates</pre>
<p>On Arch Linux, run as root:</p>
<pre>trust extract --format=pem-bundle \
  --filter='pkcs11:object=emSign%20ECC%20Root%20CA%20-%20G3;type=cert' \
  /etc/ca-certificates/trust-source/blocklist/emSign_ECC_Root_CA_-_G3.pem &amp;&amp;
update-ca-trust</pre>
<h2>What actions can trust store operators take?</h2>
<p>Please see <a href="https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE">this thread</a> in Mozilla's dev-security-policy forum.</p>
<h2>Which intermediates were compromised?</h2>
<p>Fingerprints, SPKI hashes, serial numbers and CCADB record IDs for the eight intermediates, including the Sectigo cross-signs, are in <a href="https://emudhra.we-have-a-problem.com/affected-certificates.json">affected-certificates.json</a>.</p>
<p>Site published by <a href="https://github.com/dennisjackson">Dennis Jackson</a>. The source is on <a href="https://github.com/galadran/we-have-a-problem.com">GitHub</a> and PRs are welcome.</p>
