---
author: DASL
cover_image: 'https://dasl.ing/bdasl.png'
date: '2026-01-23T18:43:19.784Z'
dateFolder: 2026/01/23
description: >-
  BDASL extends DASL CIDs with a new hash type that works better for large files
  but isn't         available by default in browsers, and therefore not an
  appropriate option in most         situations. BDASL also supports streaming
  verification.
isBasedOn: 'https://dasl.ing/bdasl.html'
link: 'https://dasl.ing/bdasl.html'
slug: 2026-01-23-httpsdaslingbdaslhtml
tags:
  - tech
  - decentralization
title: Big DASL (BDASL)
---
<h2>Introduction</h2>
<p>BDASL extends DASL CIDs by adding BLAKE3 support ([<a href="https://dasl.ing/bdasl.html#ref-blake3">blake3</a>]). BLAKE3 is a powerful hashing framework that works well for progressive verification of large streams. Unfortunately, it isn't available in browser (and neither is streaming hashing in general) which makes it inappriopriate for inclusion as the primary hash function in DASL CIDs.</p>
<p>It is recommended to avoid using BDASL CIDs in arbitrary open environments, and rather to focus on using such CIDs in specific cases in which participants are likely to know how to handle them.</p>
<h2>Parsing BDASL CIDs</h2>
<p>All the parsing works the same as for DASL CIDs ([<a href="https://dasl.ing/bdasl.html#ref-cid">cid</a>]) with one modification.</p>
<p>In the steps to <a href="https://dasl.ing/cid.html#decode-a-cid">decode a CID</a>, the hash type may also be equal to <code>0x1e</code> (BLAKE3) ([<a href="https://dasl.ing/bdasl.html#ref-blake3">blake3</a>]).</p>
<h2>Streaming Verification</h2>
<p>Some content is big. While this produces challenges in all contexts, it creates specific issues with content addressing. When retrieving content-addressed data, verifying the retrieval typically requires having all the bytes available. Not only may this be resource-intensive, it is also impractical: imagine watching a multi-hour video only to be told <em>when you're almost done watching the whole thing</em>, which is to say when the last bytes are buffered, that you got the wrong, possibly fraudulent video.</p>
<p>Streaming verification is a process that makes it possible to verify data incrementally or partially. The high level use cases for this are two-fold:</p>
<ul> <li> Check as you go: you stream data (presumably from the beginning) and the receiver is able to ensure that the data is correct in incremental chunks. </li> <li> Check within ranges: the receiver retrieves arbitrary (or near-arbitrary) subsets of the sender's data, and is able to verify the retrieved chunks without seeing the whole thing or even the bytes that came before a given chunk. </li> </ul>
<p>This makes certain usages possible. Checking as you go, you can watch a video and verify it in flight, knowing that you're retrieving the rigth, untampered resource as you go. Using ranges, you can query a remote petabyte-scale database simply by seeking inside its on-disk representation (with no server more specific than a range-capable HTTP server), while only sending the necessary data over the wire and verifying it as it comes.</p>
<p>It's important to keep in mind that streaming verification typically requires sidecar that provides information about the hash tree that describes the remote resource. This kind of sidecar incurs an overhead, but the overhead is justified by the streaming benefits.</p>
<p>The [<a href="https://dasl.ing/bdasl.html#ref-blake3">blake3</a>] spec outlines <i>Streaming Verification</i>, a process that allows the sender and receiver of a CID to incrementally verify data as it is being transferred. Applying this technique to CIDs is the core benefit of BDASL, which is well-suited to both fetching byte ranges within a CID, and verifying data where the cost of faulty transmission will impact the performance of an application. Verified streaming incurs minimal overhead on payloads of all sizes, and scales linearly as a small percentage of the size of the CID being verified.</p>
<p>Streaming verification rounds to the nearest kilobyte for verification. For more details and a reference implementation, see [<a href="https://dasl.ing/bdasl.html#ref-iroh-blobs">iroh-blobs</a>].</p>
<h2>Verifying HTTP Range Requests</h2>
<p>[<a href="https://dasl.ing/bdasl.html#ref-rfc9110">rfc9110</a>] defines HTTP range requests for fetching a single contiguous set of bytes from a larger source held by a server. Range requests use a <code>Range</code> header: <code>Range: bytes={start}-{end}</code> Both start and end values are optional, and when missing indicate the first and last byte, respectively. Both are integers that map to bytes, with 0 indexing the first byte. The end integer is inclusive, such that ranging over the first 500 bytes would require a range specifier of <code>0-499</code>.</p>
<p>In this context, the HTTP server is <em>trusted</em>: the client is getting bytes back the integrity of which it cannot verify and has to trust the server to be correctly performing verification on behalf of the user, to not be malicious, to not introduce errors, and ultimately to serve as the authority for that content ([<a href="https://dasl.ing/bdasl.html#ref-ipfs-principles">ipfs-principles</a>]). Being able to support <em>trustless</em> fetching requires the abilty to use verified streaming directly as described below.</p>
<h3>Fufilling Range Requests</h3>
<p>Under the hood, streaming verification works by verifying <em>chunks</em> of a certain size. The chunks are the smallest level of granularity that can be verified. If the chunk size is 1024 bytes and the client requests range 900-1299, then the client needs to fetch two chunks (0-1023 and 1024-2047) for a total of 2048 bytes, verify those two chunks, and then return the subset of data corresponding to the requested range.</p>
<p>For a given byte range <code>(start: Option&lt;u64&gt;, end: Option&lt;u64&gt;)</code>, that byte range is mapped to a chunk range, which is the set of chunks that fully contains the set of bytes in the HTTP range request. The chunk range corresponding to a given byte range is calculated as follows:</p>
<p><i>Start Chunk</i>:</p>
<ul> <li>If <code>start</code> is a number s, use <code>⌈s / 1024⌉</code> (ceiling division).</li> <li>If <code>start</code> is empty, there is no lower bound, so begin the request from byte 0.</li> </ul>
<p><i>End Chunk</i>:</p>
<ul> <li>If <code>end</code> is a number s, use <code>⌈s / 1024⌉</code> (ceiling division).</li> <li>If <code>end</code> is empty, no upper bound, so request to the end of the byte array.</li> </ul>
<p>From here, construct a verified range request in accordance with the verified streaming protocol, as chunks arrive, check if the chunk responded intersects with either start or end chunks.</p>
<ul> <li>Truncate the start chunk to match the byte offset of the request.</li> <li>Truncate the end chunk to match the byte offset of end of the request.</li> <li>Any non start or end chunks are interior to the range, and returned as whole chunks.</li> </ul>
<h3>Example</h3>
<p>For a request of <code>Range: bytes=500-1600</code> two chunks will be retrieved, chunk 0 and chunk 1.</p>
<ul> <li> <b>Chunk 0</b> (offset 0, 1024 bytes): <ul> <li>Intersection: <code>[500, 1024)</code></li> <li>Extracted: <code>chunk_data[500..1024]</code> (524 bytes)</li> </ul> </li> <li> <b>Chunk 1</b> (offset 1024, 1024 bytes): <ul> <li>Intersection: <code>[1024, 1600)</code></li> <li>Extracted: <code>chunk_data[0..577]</code> (577 bytes)</li> </ul> </li> </ul>
<h2>References</h2>
<dl><dd>J-P. Aumasson, S. Neves, J. O'Connor, Z. Wilcox. <a href="https://www.ietf.org/archive/id/draft-aumasson-blake3-00.html">The BLAKE3 Hashing Framework</a>. July 2024. URL: <a href="https://www.ietf.org/archive/id/draft-aumasson-blake3-00.html">https://www.ietf.org/archive/id/draft-aumasson-blake3-00.html</a></dd><dd>Robin Berjon &amp; Juan Caballero. <a href="https://dasl.ing/cid.html">Content IDs (CIDs)</a>. 2026-01-23. URL: <a href="https://dasl.ing/cid.html">https://dasl.ing/cid.html</a></dd><dt>[ipfs-principles]</dt><dd>Robin Berjon. <a href="https://specs.ipfs.tech/architecture/principles/">IPFS Principles</a>. march 2023. URL: <a href="https://specs.ipfs.tech/architecture/principles/">https://specs.ipfs.tech/architecture/principles/</a></dd><dd>HTTP Semantics (Range Requests: Section 14) <a href="https://www.rfc-editor.org/rfc/rfc9110.html#section-14">RFC 9110</a></dd></dl>
