---
author: ietf.org
cover_image: ''
date: '2026-04-07T15:37:09.694Z'
dateFolder: 2026/04/07
description: Search IETF mail list archives
isBasedOn: 'https://mailarchive.ietf.org/arch/msg/dnsop/aLACo0YpxJezsvlXZipp9aL0mFs/'
link: 'https://mailarchive.ietf.org/arch/msg/dnsop/aLACo0YpxJezsvlXZipp9aL0mFs/'
slug: 2026-04-07-httpsmailarchiveietforgarchmsgdnsopalaco0ypxjezsvlxzipp9al0mfs
tags:
  - tech
  - privacy
  - decentralization
title: '[DNSOP] Advice sought: DNS record type for FedCM well-known file delegation'
---
<pre>Hi DNSOP,
The W3C Federated Identity CG/WG is working on FedCM (Federated Credential Management), a browser API for federated authentication. The spec currently requires Identity Providers to host a .well-known/web-identity file at the registrable domain (apex). This requirement is privacy driven - in order to ensure Identity Providers are unaware of Relying Parties until user consent is granted, Identity Providers must not be permitted to use per-Relying Party configuration files. In other words, each registrable domain must have a single configuration file. Hosting a file at the apex is operationally problematic when the apex is operated by a different service than the authentication service — a common setup where <a href="http://login.example.com">login.example.com</a> CNAMEs to a white-label auth provider while the apex serves a marketing site, storefront, etc.
We're considering using DNS to let IDPs indicate where the well-known data lives. We have four candidate approaches and would appreciate guidance on which is most appropriate, or if another pattern is appropriate:
Option A: SVCB with embedded data — Query _web-identity.&lt;registrable-domain&gt; for an SVCB record whose SvcParams carry the well-known data directly (custom keys like accounts-endpoint, login-url). Eliminates the HTTP round-trip entirely. Requires IANA registration of new SvcParamKeys per RFC 9460.
Option B: SVCB for delegation — Query _web-identity.&lt;registrable-domain&gt; for an SVCB record; use TargetName to identify the subdomain, then fetch .well-known/web-identity from that host over HTTPS.
Option C: Fixed subdomain — No DNS lookup; always fetch from web-identity.&lt;registrable-domain&gt;, which the IDP points (e.g., via CNAME) to their infrastructure.
Option D: TXT record — Query _web-identity.&lt;registrable-domain&gt; for a TXT record containing sub=login, then fetch the well-known file from login.&lt;registrable-domain&gt;.
Our key questions:

  1.
Is SVCB appropriate here? We're not doing service binding in the traditional sense (ALPN negotiation, ECH, etc.) — we'd either be using TargetName purely for delegation (Option B) or embedding application-layer metadata in custom SvcParams (Option A). Is this a reasonable use of SVCB, or a misuse of the record type?
  2.
TXT vs SVCB pragmatics. TXT at an underscore-prefixed name (à la DMARC _dmarc, MTA-STS _mta-sts) is universally supported by registrars today. SVCB support is still limited. Given that a goal is broad deployability (including small organizations managing DNS through commodity registrars), does the group have a view on whether new protocols should prefer SVCB over TXT for simple delegation, or is TXT still the practical choice?
  3.
Naming convention. Is _web-identity.&lt;domain&gt; an appropriate underscore name? Any conflicts or conventions we should be aware of? Should we register in the Underscored and Globally Scoped DNS Node Names registry (RFC 8552)?
  4.
Embedding data in DNS vs delegation. Option A puts application data (URL paths) directly in DNS records, avoiding an HTTP fetch. Is there precedent or guidance for/against this pattern? We're aware of the 65535-byte practical limit on DNS responses, but the data here is small (two short paths).

Relevant links:

  *   Spec: <a href="https://fedidcg.github.io/FedCM/">https://fedidcg.github.io/FedCM/</a>
  *   Issue: <a href="https://github.com/w3c-fedid/FedCM/issues/809">https://github.com/w3c-fedid/FedCM/issues/809</a>
  *   PR with options: <a href="https://github.com/w3c-fedid/FedCM/pull/821">https://github.com/w3c-fedid/FedCM/pull/821</a>

Thanks for any guidance.

</pre>
