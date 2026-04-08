---
author: AT Protocol
cover_image: 'https://atproto.com/default-social-card.png'
date: '2026-04-07T15:38:07.392Z'
dateFolder: 2026/04/07
description: A specification for human-friendly account identifiers.
isBasedOn: 'https://atproto.com/specs/handle#dns-txt-method'
link: 'https://atproto.com/specs/handle#dns-txt-method'
slug: 2026-04-07-httpsatprotocomspecshandledns-txt-method
tags:
  - tech
  - decentralization
title: Handle
---
<figure></figure><p>A specification for human-friendly account identifiers.</p>
<h1>Handles</h1>
<p>DIDs are the long-term persistent identifiers for accounts in atproto, but they can be opaque and unfriendly for human use. <strong>Handles</strong> are mutable and human-friendly account usernames, in the form of a DNS hostname. For example, <code>user.example.com</code>. Handles must be bi-directionally linked to a DID: the DID document must claim the handle, and the handle must resolve to the DID identifier. Two methods of resolving handles to DID are supported: one using TXT DNS records, and the other using an HTTPS <code>/.well-known/</code> URL path.</p>
<p>The definition of "hostnames" (as a subset of all possible "DNS names") has evolved over time and across several IETF RFCs. Some relevant documents are <a href="https://www.rfc-editor.org/rfc/rfc1035">RFC-1035</a>, <a href="https://www.rfc-editor.org/rfc/rfc3696">RFC-3696</a> section 2, and <a href="https://www.rfc-editor.org/rfc/rfc3986">RFC-3986</a> section 3. Almost every valid "hostname" is also a valid handle, though there are a small number of exceptions (described below).</p>
<p>Lexicon string format type: <code>handle</code></p>
<p>To synthesize other standards, and define "handle" syntax specifically:</p>
<ul> <li>The overall handle must contain only ASCII characters, and can be at most 253 characters long (in practice, handles may be restricted to a slightly shorter length)</li> <li>The overall handle is split in to multiple segments (referred to as "labels" in standards documents), separated by ASCII periods (<code>.</code>)</li> <li>No proceeding or trailing ASCII periods are allowed, and there must be at least two segments. That is, "bare" top-level domains are not allowed as handles, even if valid "hostnames" and "DNS names." "Trailing dot" syntax for DNS names is not allowed for handles.</li> <li>Each segment must have at least 1 and at most 63 characters (not including the periods). The allowed characters are ASCII letters (<code>a-z</code>), digits (<code>0-9</code>), and hyphens (<code>-</code>).</li> <li>Segments can not start or end with a hyphen</li> <li>The last segment (the "top level domain") can not start with a numeric digit</li> <li>Handles are not case-sensitive, and should be normalized to lowercase (that is, normalize ASCII <code>A-Z</code> to <code>a-z</code>)</li> </ul>
<p>To be explicit (the above rules already specify this), no whitespace, null bytes, joining characters, or other ASCII control characters are allowed in the handle, including as prefix/suffix.</p>
<p>Modern "hostnames" (and thus handles) allow ASCII digits in most positions, with the exception that the last segment (top-level domain, TLD) cannot start with a digit.</p>
<p>IP addresses are not valid syntax: IPv4 addresses have a final segment starting with a digit, and IPv6 addresses are separated by colons (<code>:</code>).</p>
<p>A reference regular expression (regex) for the handle syntax is:</p>
<pre><code>/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/
</code></pre>
<figure></figure><p>CopyCopied!</p>
<p>"Reserved" top-level domains should not fail syntax validation (eg, in atproto Lexicon validation), but they must immediately fail any attempt at registration, resolution, etc. See also: <a href="https://en.wikipedia.org/wiki/Top-level_domain#Reserved_domains">https://en.wikipedia.org/wiki/Top-level_domain#Reserved_domains</a></p>
<p><code>.local</code> hostnames (for mDNS on local networks) should not be used in atproto.</p>
<p>The <code>.onion</code> TLD is a special case for Tor protocol hidden services. Resolution of handles via Tor would require ecosystem-wide support, so they are currently disallowed.</p>
<p>To summarize the above, the initial list of disallowed TLDs includes:</p>
<ul> <li><code>.alt</code></li> <li><code>.arpa</code></li> <li><code>.example</code></li> <li><code>.internal</code></li> <li><code>.invalid</code></li> <li><code>.local</code></li> <li><code>.localhost</code></li> <li><code>.onion</code></li> </ul>
<p>The <code>.test</code> TLD is intended for examples, testing, and development. It may be used in atproto development, but should fail in real-world environments.</p>
<p>The <code>.invalid</code> TLD should only be used for the special <code>handle.invalid</code> value (see below). This value is syntactically valid in the Lexicon schema language, but should not be accepted as a valid handle in most contexts.</p>
<p>Syntactically valid handles (which may or may not have existing TLDs):</p>
<pre><code>jay.bsky.social
8.cn
name.t--t        // not a real TLD, but syntax ok
XX.LCS.MIT.EDU
a.co
xn--notarealidn.com
xn--fiqa61au8b7zsevnm8ak20mc4a87e.xn--fiqs8s
xn--ls8h.test
example.t        // not a real TLD, but syntax ok
</code></pre>
<figure></figure><p>CopyCopied!</p>
<p>Invalid syntax:</p>
<pre><code>jo@hn.test
💩.test
john..test
xn--bcher-.tld
john.0
cn.8
www.masełkowski.pl.com
org
name.org.
</code></pre>
<figure></figure><p>CopyCopied!</p>
<p>Valid syntax, but must always fail resolution due to other restrictions:</p>
<pre><code>2gzyxa5ihm7nsggfxnu52rck2vv4rvmdlkiu3zzui5du4xyclen53wid.onion
laptop.local
blah.arpa
</code></pre>
<figure></figure><p>CopyCopied!</p>
<p>Handles have a limited role in atproto, and need to be resolved to a DID in almost all situations. Resolution mechanisms must demonstrate a reasonable degree of authority over the domain name at a point in time, and need to be relatively efficient to look up. There are currently two supported resolution mechanisms: one using a TXT DNS record containing the DID, and another over HTTPS at a special <code>/.well-known/</code> URL.</p>
<p>Clients can rely on network services (eg, their PDS) to resolve handles for them, using the <code>com.atproto.identity.resolveHandle</code> endpoint, and don't usually need to implement resolution directly themselves.</p>
<p>The DNS TXT method is the recommended and preferred resolution method for individual handle configuration, but services should fully support both methods. The intended use-case for the HTTPS method is existing large-scale web services which may not have the infrastructure to automate the registration of thousands or millions of DNS TXT records.</p>
<p>Handles should not be trusted or considered valid until the DID is also resolved and the current DID document is confirmed to link back to the handle. The link between handle and DID must be confirmed bidirectionally, otherwise anybody could create handle aliases for third-party accounts.</p>
<p>For this resolution method, a DNS TXT record is registered for the <code>_atproto</code> sub-domain under the handle hostname. The record value should have the prefix <code>did=</code>, followed by the full DID. This method aligns with <a href="https://www.rfc-editor.org/rfc/rfc1464.html">RFC-1464</a>, "Using the Domain Name System To Store Arbitrary String Attributes".</p>
<p>For example, the handle <code>user.example.com</code> would have a TXT record on the name <code>_atproto.user.example.com</code>, and the value would look like <code>did=did:plc:ewvi7nxzyoun6zhxrhs64oiz</code>.</p>
<p>Any TXT records with values not starting with <code>did=</code> should be ignored. Only a single valid record should exist at any point in time. If multiple valid records with different DIDs are present, resolution should fail. In this case resolution can be re-tried after a delay, or using a recursive resolver.</p>
<p>Note that very long handles can not be resolved using this method if the additional <code>_atproto.</code> name segment pushes the overall name over the 253 character maximum for DNS queries. The HTTPS method will work for such handles.</p>
<p>DNSSEC is not required.</p>
<p>For this resolution method, a web server at the handle domain implements a special well-known endpoint at the path <code>/.well-known/atproto-did</code>. A valid HTTP response will have an HTTP success status (2xx), <code>Content-Type</code> header set to <code>text/plain</code>, and include the DID as the HTTP body with no prefix or wrapper formatting.</p>
<p>For example, the handle <code>user.example.app</code> would be resolved by an GET request to <code>https://user.example.app/.well-known/atproto-did</code>, and a valid response would look like:</p>
<pre><code>HTTP/1.1 200 OK
Content-Length: 33
Content-Type: text/plain
Date: Wed, 14 Jun 2023 00:47:21 GMT

did:plc:ewvi7nxzyoun6zhxrhs64oiz
</code></pre>
<figure></figure><p>CopyCopied!</p>
<p>The response <code>Content-Type</code> header does not need to be strictly verified.</p>
<p>The web server's response body should not contain any prefix or suffix whitespace, but clients should strip small amounts of prefix or suffix whitespace from the response body before attempting to parse as a DID.</p>
<p>Secure HTTPS on the default port (443) is required for all real-world handle resolutions. Unsecured HTTP can only be used for local development and testing.</p>
<p>HTTP redirects (eg, 301, 302) are allowed, up to a reasonable number of redirect hops.</p>
<p>If the handle for a known DID is confirmed to no longer resolve, it should be marked as invalid. In API responses, the special handle value <code>handle.invalid</code> can be used to indicate that there is no bi-directionally valid handle for the given DID. This handle can not be used in most situations (search queries, API requests, etc).</p>
<p>It is ok to attempt both resolution methods in parallel, and to use the first successful result available. If the two methods return conflicting results (aka, different DIDs), the DNS TXT result should be preferred, though it is also acceptable to record the result as ambiguous and try again later.</p>
<p>It is considered a best practice for services to cache handle resolution results internally, up to some lifetime, and re-resolve periodically. DNS TTL values provide a possible cache lifetime, but are probably too aggressive (aka, too short a lifetime) for the handle resolution use case.</p>
<p>Use of a recursive DNS resolver can help with propagation delays, which are important for the use case of an account changing their handle and waiting for confirmation.</p>
<p>With both techniques, it is beneficial to initiate resolution requests from a relatively trusted network environment and configuration. Running resolution requests from multiple regions and environments can help mitigate (though not fully resolve) concerns about traffic manipulation or intentionally segmented responses.</p>
<p>Handles may be prefixed with the "at" symbol (like <code>@user.example.com</code>) in user interfaces, but this is not a valid syntax for a handle in records, APIs, and other back-end contexts.</p>
<p>Internationalized Domain Names ("IDN", or "punycode") are not directly relevant to the low-level handle syntax. In their encoded form, IDNs are already valid hostnames, and thus valid handles. Such handles must be stored and transmitted in encoded ASCII form. Handles that "look like" IDNs, but do not parse as valid IDNs, are valid handles, just as they are valid hostnames. Applications may, optionally, parse and display IDN handles as Unicode.</p>
<p>Handles are not case-sensitive, which means they can be safely normalized from user input to lower-case (ASCII) form. Only normalized (lowercase) handles should be stored in records or used in outbound API calls. Applications should not preserve user-provided case information and attempt to display handles in anything other than lower-case. For example, the handle input string <code>BlueskyWeb.xyz</code> should be normalized, stored, and displayed as <code>blueskyweb.xyz</code>. Long all-lowercase handles can be a readability and accessibility challenge. Sub-domain separation (periods), hyphenation, or use of "display names" in application protocols can all help.</p>
<p>Very long handles are known to present user interface challenges, but they are allowed in the protocol, and application developers are expected to support them.</p>
<p>Handles which look similar to a well-known domain present security and impersonation challenges. For example, handles like <code>paypa1.com</code> or <code>paypal.cc</code> being confused for <code>paypal.com</code>. Very long handles can result in similar issues when truncated at the start or end (<code>paypal.com…</code>).</p>
<p>Handles should generally not be truncated to local context. For example, the handle <code>@alice.example.com</code> should not be displayed as <code>@alice</code>, even in the local context of an <code>example.com</code> service.</p>
<p>Providers of handle "namespaces" (eg, as subdomains on a registered domain) may impose any additional limits on handles that they wish. It is recommended to constrain the allowed segment length to something reasonable, and to reserve a common set of segment strings like <code>www</code>, <code>admin</code>, <code>mail</code>, etc. There are multiple public lists of "commonly disallowed usernames" that can be used as a starting point.</p>
<p>From a practical standpoint, handles should be limited to at most 244 characters, fewer than the 253 allowed for DNS names. This is because DNS verification works with the prefix <code>_atproto.</code>, which adds 9 characters, and that overall name needs to be valid.</p>
<p>Handle hostnames are expected to be mainstream DNS domain names, registered through the mainstream DNS name system. Handles with non-standard TLDs, or using non-standard naming systems, will fail to interoperate with other network services and protocol implementations in the atproto ecosystem.</p>
<p>PDS implementations hosting an account <em>may</em> prevent repo mutation if the account's handle can no longer be verified (aka, <code>handle.invalid</code> situation). Other network services should generally continue to display the content (to prevent breakage), possibly with a contextual note or warning indicator.</p>
<p>Interop test vectors are available from the <a href="https://github.com/bluesky-social/atproto-interop-tests">atproto-interop-tests</a> repository.</p>
<p>The handle syntax is relatively stable.</p>
<p>It is conceivable that <code>.onion</code> handles would be allowed at some point in the future.</p>
