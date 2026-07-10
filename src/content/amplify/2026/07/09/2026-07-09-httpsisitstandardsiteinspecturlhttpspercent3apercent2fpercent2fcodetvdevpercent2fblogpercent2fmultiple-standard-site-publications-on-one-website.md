---
author: isitstandard.site
cover_image: 'https://isitstandard.site/og.png'
date: '2026-07-09T16:44:24.824Z'
dateFolder: 2026/07/09
description: >-
  standard.site validation for
  https://codetv.dev/blog/multiple-standard-site-publications-on-one-website
isBasedOn: >-
  https://isitstandard.site/inspect?url=https%3A%2F%2Fcodetv.dev%2Fblog%2Fmultiple-standard-site-publications-on-one-website
link: >-
  https://isitstandard.site/inspect?url=https%3A%2F%2Fcodetv.dev%2Fblog%2Fmultiple-standard-site-publications-on-one-website
slug: >-
  2026-07-09-httpsisitstandardsiteinspecturlhttpspercent3apercent2fpercent2fcodetvdevpercent2fblogpercent2fmultiple-standard-site-publications-on-one-website
tags:
  - decentralization
title: How to publish multiple Standard Site publications on one domain
---
<ul><li><details><summary>▶PASS</summary><p>A document page declares its AT-URI with <code>&lt;link rel="site.standard.document" href="at://…"&gt;</code> in its <code>&lt;head&gt;</code>. The tag is required when the inspected URL falls under a publication root (it's a document URL) and not applicable when the URL is the publication root itself. A missing tag on a document URL prevents Bluesky and other clients from rendering the standard.site link card.</p></details></li><li><details><summary>▶PASS</summary></details></li><li><details><summary>▶PASS</summary><p>With the PDS known, a verifier fetches the record via <code>com.atproto.repo.getRecord</code>. A <code>RecordNotFound</code> response means the page advertises an AT-URI whose record doesn't exist — typically the record was deleted or recreated under a new rkey while the page's link tag went stale.</p></details></li><li><details><summary>▶PASS</summary><p>AT-URIs follow the shape <code>at://{did}/{collection}/{rkey}</code>. A malformed URI can't be parsed, so the DID, the PDS, and the record are all unreachable.</p></details></li><li><details><summary>▶PASS</summary><p>The publication AT-URI's collection segment must be <code>site.standard.publication</code>. The publication URI comes from the document record's <code>site</code> field (or, less commonly, a publication link tag on the page) — either way the reference must not resolve to a record of the wrong type.</p></details></li><li><details><summary>▶PASS</summary><p>Same DID-to-PDS resolution as the document, but for the publication record. Often the same PDS as the document (since they should share a DID), but they could in principle live on different servers if the PLC service entry changed between record creations.</p></details></li><li><details><summary>▶PASS</summary><p>With the PDS known, a verifier fetches the record via <code>com.atproto.repo.getRecord</code>. A <code>RecordNotFound</code> response means the referenced publication doesn't exist — a stale link tag, a stale <code>document.site</code> field, or a stale .well-known file pointing at a deleted or recreated record. Verification can't proceed without the record.</p></details></li><li><details><summary>▶PASS</summary><p>The document's <code>site</code> field points to a publication record. For the verification chain to be meaningful, both records must live on the same identity (DID). Without this constraint a document on user A's PDS could freely claim a publication on user B's PDS — freeriding on B's ownership proofs to make A's content look authoritative.</p></details></li><li><details><summary>▶PASS</summary><p>The publication record claims to live at a URL. Its proof of ownership is a static file whose body must equal the AT-URI of the resolved publication record. For an apex publication the file lives at <code>/.well-known/site.standard.publication</code>; for a subpath publication the URL pathname is appended (e.g. publication.url = <code>https://example.com/blog/</code> → <code>/.well-known/site.standard.publication/blog/</code>). Without this round-trip, anyone could publish a publication record pointing at any URL they don't own.</p></details></li><li><details><summary>▶PASS</summary><p>A document's canonical URL is <code>publication.url</code> + <code>document.path</code>. It should equal the inspected URL. A mismatch means the document advertises itself under a different URL — possibly a typo, a path change, or a stale share link. Trailing slashes are normalized before comparing, since the spec discourages them but implementations might be inconsistent.</p></details></li><li><details><summary>▶PASS</summary><p>A document's <code>path</code> is appended to the publication <code>url</code> to build the canonical URL, and the lexicon says to prepend it with a leading slash (e.g. <code>/blog/getting-started</code>). A path without one still resolves once normalized, but doesn't match the documented format.</p></details></li><li><details><summary>▶PASS</summary><p>standard.site discourages a trailing slash on a publication's <code>url</code>, and advises validators to trim one before comparing — so a trailing slash won't break verification, but the record reads cleaner without it (prefer <code>https://example.com/blog</code> over <code>https://example.com/blog/</code>).</p></details></li></ul>
<h2>Document</h2>
<dl><dd><code>/multiple-standard-site-publications-on-one-website</code></dd><dd>How CodeTV is publishing each of our series on atproto as its own Standard Site publication.</dd></dl>
<details><summary>Raw document record JSON</summary><pre>{
  "uri": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.document/3mo7dqus5rp2r",
  "pds": "https://rooter.us-west.host.bsky.network",
  "record": {
    "uri": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.document/3mo7dqus5rp2r",
    "cid": "bafyreigff6h4jqxjrr2pfxccnbu3jjmse2q3ld44h4g2havdmpcqqhospe",
    "value": {
      "path": "/multiple-standard-site-publications-on-one-website",
      "site": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26",
      "$type": "site.standard.document",
      "title": "How to publish multiple Standard Site publications on one domain",
      "description": "How CodeTV is publishing each of our series on atproto as its own Standard Site publication.",
      "publishedAt": "2026-06-13T15:50:00-07:00",
      "contributors": [
        {
          "did": "did:plc:ga3wlji66r5mxqch6wh7nq4v",
          "role": "author",
          "displayName": "Jason Lengstorf"
        }
      ]
    }
  }
}</pre></details>
<details><summary>Raw publication record JSON</summary><pre>{
  "uri": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26",
  "pds": "https://rooter.us-west.host.bsky.network",
  "record": {
    "uri": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26",
    "cid": "bafyreigzyoszip4blfkqg2egp7n23p34sqfuyredarkqqr6a75klza6p2i",
    "value": {
      "url": "https://codetv.dev/blog",
      "icon": {
        "ref": {
          "$link": "bafkreica57obizixgigeyax4kspeoqup4pn4hcgichrdny2dyvqgc7yhwy"
        },
        "size": 37669,
        "$type": "blob",
        "mimeType": "image/jpeg"
      },
      "name": "CodeTV Blog",
      "$type": "site.standard.publication",
      "createdAt": "2024-06-26T19:00:00.000Z",
      "description": "tv for developers — and sometimes also blog posts",
      "preferences": {
        "showInDiscover": true
      }
    }
  },
  "iconUrl": "https://rooter.us-west.host.bsky.network/xrpc/com.atproto.sync.getBlob?did=did%3Aplc%3Arwwdbpl76rghy7d5z4sd2ozp&amp;cid=bafkreica57obizixgigeyax4kspeoqup4pn4hcgichrdny2dyvqgc7yhwy"
}</pre></details>
<h2>Link tags found</h2>
<pre>[
  {
    "rel": "site.standard.document",
    "href": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.document/3mo7dqus5rp2r"
  }
]</pre>
<h2>.well-known body</h2>
<pre>at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26</pre>
<h2>Sequence</h2>
<figure><svg class="block" height="440" role="img" viewbox="0 0 760 440" width="760"><title>Sequence diagram of the verification: 6 network step(s) between isitstandard.site and 3 host(s)</title><defs><marker id="arr-req" markerheight="6" markerwidth="6" orient="auto" refx="8" refy="5" viewbox="0 0 10 10"><path class="fill-gray-700" d="M0,0 L10,5 L0,10 z"></path></marker><marker id="arr-ok" markerheight="6" markerwidth="6" orient="auto" refx="8" refy="5" viewbox="0 0 10 10"><path class="fill-emerald-600" d="M0,0 L10,5 L0,10 z"></path></marker><marker id="arr-fail" markerheight="6" markerwidth="6" orient="auto" refx="8" refy="5" viewbox="0 0 10 10"><path class="fill-red-500" d="M0,0 L10,5 L0,10 z"></path></marker></defs><rect class="fill-gray-100 stroke-gray-300" height="26" rx="4" width="158" x="16" y="4"></rect><text class="text-xs font-medium fill-gray-800" text-anchor="middle" x="95" y="21">isitstandard.site</text><line class="stroke-gray-300" stroke-dasharray="3 4" stroke-width="1" x1="95" x2="95" y1="34" y2="436"></line><rect class="fill-emerald-600" height="26" rx="4" width="158" x="206" y="4"></rect><text class="text-xs font-medium fill-white" text-anchor="middle" x="285" y="21">codetv.dev</text><line class="stroke-gray-300" stroke-dasharray="3 4" stroke-width="1" x1="285" x2="285" y1="34" y2="436"></line><rect class="fill-gray-100 stroke-gray-300" height="26" rx="4" width="158" x="396" y="4"></rect><text class="text-xs font-medium fill-gray-800" text-anchor="middle" x="475" y="21">plc.directory</text><line class="stroke-gray-300" stroke-dasharray="3 4" stroke-width="1" x1="475" x2="475" y1="34" y2="436"></line><rect class="fill-gray-100 stroke-gray-300" height="26" rx="4" width="158" x="586" y="4"></rect><text class="text-xs font-medium fill-gray-800" text-anchor="middle" x="665" y="21">rooter.us-we…bsky.network</text><line class="stroke-gray-300" stroke-dasharray="3 4" stroke-width="1" x1="665" x2="665" y1="34" y2="436"></line><g><title>1. GET page, scan for link tags
→ https://codetv.dev/blog/multiple-standard-site-publications-on-one-website
← 1 standard.site link tag(s) (57 ms)</title><text class="text-[10px] fill-gray-400" text-anchor="end" x="83" y="74">1</text><text class="text-[11px] fill-gray-600" text-anchor="middle" x="190" y="57">GET page, scan for link tags</text><line class="stroke-gray-700" marker-end="url(#arr-req)" stroke-width="1.2" x1="95" x2="285" y1="62" y2="62"></line><line class="stroke-emerald-600" marker-end="url(#arr-ok)" stroke-dasharray="5 3" stroke-width="1.2" x1="285" x2="95" y1="78" y2="78"></line><text class="text-[11px] font-mono fill-gray-600" text-anchor="middle" x="190" y="91">1 standard.site link tag(s) (57 ms)</text></g><g><title>2. resolve document DID → PDS
→ did:plc:rwwdbpl76rghy7d5z4sd2ozp
← https://rooter.us-west.host.bsky.network (47 ms)</title><text class="text-[10px] fill-gray-400" text-anchor="end" x="83" y="138">2</text><text class="text-[11px] fill-gray-600" text-anchor="middle" x="285" y="121">resolve document DID → PDS</text><line class="stroke-gray-700" marker-end="url(#arr-req)" stroke-width="1.2" x1="95" x2="475" y1="126" y2="126"></line><line class="stroke-emerald-600" marker-end="url(#arr-ok)" stroke-dasharray="5 3" stroke-width="1.2" x1="475" x2="95" y1="142" y2="142"></line><text class="text-[11px] font-mono fill-gray-600" text-anchor="middle" x="285" y="155">https://rooter.us-west.host.bsky.network (47 ms)</text></g><g><title>3. getRecord site.standard.document
→ at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.document/3mo7dqus5rp2r
← bafyreigff6h4jqxjrr2pfxccnbu3jjmse2q3ld44h4g2havdmpcqqhospe (62 ms)</title><text class="text-[10px] fill-gray-400" text-anchor="end" x="83" y="202">3</text><text class="text-[11px] fill-gray-600" text-anchor="middle" x="380" y="185">getRecord site.standard.document</text><line class="stroke-gray-700" marker-end="url(#arr-req)" stroke-width="1.2" x1="95" x2="665" y1="190" y2="190"></line><line class="stroke-emerald-600" marker-end="url(#arr-ok)" stroke-dasharray="5 3" stroke-width="1.2" x1="665" x2="95" y1="206" y2="206"></line><text class="text-[11px] font-mono fill-gray-600" text-anchor="middle" x="380" y="219">bafyreigff6h4jqxjrr2pf…ld44h4g2havdmpcqqhospe (62 ms)</text></g><g><title>4. resolve publication DID → PDS
→ did:plc:rwwdbpl76rghy7d5z4sd2ozp
← https://rooter.us-west.host.bsky.network (21 ms)</title><text class="text-[10px] fill-gray-400" text-anchor="end" x="83" y="266">4</text><text class="text-[11px] fill-gray-600" text-anchor="middle" x="285" y="249">resolve publication DID → PDS</text><line class="stroke-gray-700" marker-end="url(#arr-req)" stroke-width="1.2" x1="95" x2="475" y1="254" y2="254"></line><line class="stroke-emerald-600" marker-end="url(#arr-ok)" stroke-dasharray="5 3" stroke-width="1.2" x1="475" x2="95" y1="270" y2="270"></line><text class="text-[11px] font-mono fill-gray-600" text-anchor="middle" x="285" y="283">https://rooter.us-west.host.bsky.network (21 ms)</text></g><g><title>5. getRecord site.standard.publication
→ at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26
← bafyreigzyoszip4blfkqg2egp7n23p34sqfuyredarkqqr6a75klza6p2i (58 ms)</title><text class="text-[10px] fill-gray-400" text-anchor="end" x="83" y="330">5</text><text class="text-[11px] fill-gray-600" text-anchor="middle" x="380" y="313">getRecord site.standard.publication</text><line class="stroke-gray-700" marker-end="url(#arr-req)" stroke-width="1.2" x1="95" x2="665" y1="318" y2="318"></line><line class="stroke-emerald-600" marker-end="url(#arr-ok)" stroke-dasharray="5 3" stroke-width="1.2" x1="665" x2="95" y1="334" y2="334"></line><text class="text-[11px] font-mono fill-gray-600" text-anchor="middle" x="380" y="347">bafyreigzyoszip4blfkqg…yredarkqqr6a75klza6p2i (58 ms)</text></g><g><title>6. GET .well-known publication
→ https://codetv.dev/.well-known/site.standard.publication/blog
← at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26 (38 ms)</title><text class="text-[10px] fill-gray-400" text-anchor="end" x="83" y="394">6</text><text class="text-[11px] fill-gray-600" text-anchor="middle" x="190" y="377">GET .well-known publication</text><line class="stroke-gray-700" marker-end="url(#arr-req)" stroke-width="1.2" x1="95" x2="285" y1="382" y2="382"></line><line class="stroke-emerald-600" marker-end="url(#arr-ok)" stroke-dasharray="5 3" stroke-width="1.2" x1="285" x2="95" y1="398" y2="398"></line><text class="text-[11px] font-mono fill-gray-600" text-anchor="middle" x="190" y="411">at://did:plc:rwwdbpl76…lication/3mnq7zoyzrp26 (38 ms)</text></g></svg></figure><details><summary>Raw trace info</summary><pre>[
  {
    "id": "fetch-page",
    "to": "site",
    "label": "GET page, scan for link tags",
    "detail": "https://codetv.dev/blog/multiple-standard-site-publications-on-one-website",
    "outcome": "ok",
    "response": "1 standard.site link tag(s)",
    "durationMs": 57
  },
  {
    "id": "resolve-doc-did",
    "to": "identity",
    "label": "resolve document DID → PDS",
    "detail": "did:plc:rwwdbpl76rghy7d5z4sd2ozp",
    "outcome": "ok",
    "response": "https://rooter.us-west.host.bsky.network",
    "durationMs": 47
  },
  {
    "id": "get-doc-record",
    "to": "doc-pds",
    "label": "getRecord site.standard.document",
    "detail": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.document/3mo7dqus5rp2r",
    "outcome": "ok",
    "response": "bafyreigff6h4jqxjrr2pfxccnbu3jjmse2q3ld44h4g2havdmpcqqhospe",
    "durationMs": 62
  },
  {
    "id": "resolve-pub-did",
    "to": "identity",
    "label": "resolve publication DID → PDS",
    "detail": "did:plc:rwwdbpl76rghy7d5z4sd2ozp",
    "outcome": "ok",
    "response": "https://rooter.us-west.host.bsky.network",
    "durationMs": 21
  },
  {
    "id": "get-pub-record",
    "to": "pub-pds",
    "label": "getRecord site.standard.publication",
    "detail": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26",
    "outcome": "ok",
    "response": "bafyreigzyoszip4blfkqg2egp7n23p34sqfuyredarkqqr6a75klza6p2i",
    "durationMs": 58
  },
  {
    "id": "fetch-well-known",
    "to": "site",
    "label": "GET .well-known publication",
    "detail": "https://codetv.dev/.well-known/site.standard.publication/blog",
    "outcome": "ok",
    "response": "at://did:plc:rwwdbpl76rghy7d5z4sd2ozp/site.standard.publication/3mnq7zoyzrp26",
    "durationMs": 38
  }
]</pre></details>
