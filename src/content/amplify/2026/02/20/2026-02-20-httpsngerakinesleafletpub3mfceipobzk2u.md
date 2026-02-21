---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Acbkjy5n7bk3ax2wplmtjofq2/3lqpqvbdoas2z/3mfceipobzk2u/opengraph-image?e2bb7203df6d3028
date: '2026-02-20T21:27:12.526Z'
dateFolder: 2026/02/20
description: >-
  A deep dive into Content Identifiers, the self-describing cryptographic
  fingerprints that form the foundation of ATProtocol’s data model.
isBasedOn: 'https://ngerakines.leaflet.pub/3mfceipobzk2u'
link: 'https://ngerakines.leaflet.pub/3mfceipobzk2u'
slug: 2026-02-20-httpsngerakinesleafletpub3mfceipobzk2u
tags:
  - tech
  - decentralization
title: 'CIDs: What You Need to Know and Why, Part 1'
---
<p>A Content Identifier, or CID, is a self-describing, deterministic, content-addressed identifier. This simple data structure contains a cryptographic fingerprint, identifies the hash algorithm used to produce it, and specifies how the data is serialized. While a URL answers “where can I find this?”, a CID answers “what is this?” The same bytes and parameters always produce the same CID. Even a single-bit change results in a completely different one.</p>
<p>Content-addressable storage lets you find information based on its content, not its name or location. In these systems, data goes through a cryptographic hash function to create a unique key called the "content address." You use this key to find and retrieve the data. Since the same content always gives the same key, duplicates are easy to spot, and any change creates a new key, which helps ensure data integrity. CIDs are a type of content address, but they also include extra details that explain how the address was made.</p>
<h3 data-index="3">History and Background</h3>
<p>The idea of identifying data by its hash is older than the web and is many of the systems and tools we use. Git, created in 2005, stores every commit, tree, and blob as objects identified by their SHA-1 hashes. BitTorrent uses content hashes to verify pieces across a distributed swarm. Both systems proved that content-addressed storage works at scale.</p>
<p>Both Git and BitTorrent use a single baked-in hash algorithm and a single data format. Where that becomes a problem (and it inevitably does) is upgrading. Git’s ongoing SHA-1 migration is a cautionary tale: a decade-long effort to move to SHA-256, complicated by the fact that SHA-1 was wired into the format at every level. There was no way for a Git object to announce which hash algorithm it used, because the system assumed there would be only one.</p>
<h4 data-index="7">IPFS and Protocol Labs</h4>
<p>The InterPlanetary File System emerged from Juan Benet’s work at Stanford, with a whitepaper published on arXiv in July 2014, and Protocol Labs was founded the same year as part of the Y Combinator S14 batch. The IPFS alpha shipped in early 2015.</p>
<p>Early IPFS used simple base58btc-encoded multihashes as identifiers like the <code>Qm...</code> strings that many developers still know. These worked well for IPFS’s first use case, which was content-addressed file storage. But as the project grew to link data formats such as Ethereum blocks, Git objects, and CBOR structures, identifiers needed to include format information alongside the hash. A plain multihash could tell you which hash algorithm was used, but not how to interpret the data it pointed to.</p>
<p>Protocol Labs started the Multiformats project around 2016. This is a group of self-describing protocols created to solve the “hardcoded assumptions” problem that affected earlier systems. The family includes three main parts.</p>
<p>Multihash wraps hash digests with a function code and length prefix, making the hash algorithm self-describing. Multicodec provides a table of type identifiers encoded as varint prefixes, making content formats self-describing. Multibase prefixes string-encoded data with a character indicating the base encoding, making the text representation self-describing.</p>
<p>All three follow the same design idea: each begins with its own decoding instructions. You don’t need any outside information.</p>
<p>In 2016-2017, from discussions in the ipfs/specs repository, multicodec and multihash were combined into a single compact identifier, the CID.</p>
<p>CIDv0 kept backward compatibility with existing IPFS multihashes. A CIDv0 is always in dag-pb format, always uses SHA-256, and is always encoded as base58btc. Since the hash function and codec were fixed, there was no need for extra fields to identify them.</p>
<p>CIDv1 added clear version, codec, and multibase fields, making identifiers fully self-describing and ready for future changes. A CIDv1 can use any hash function, any codec, and any base encoding. The identifier itself gives you all the information needed to decode it.</p>
<p>The canonical CID specification lives at <a href="https://github.com/multiformats/cid">multiformats/cid</a> on GitHub, licensed CC-BY 3.0 by Protocol Labs.</p>
<h4 data-index="22">IPLD: the data model layer</h4>
<p>IPLD, which stands for InterPlanetary Linked Data, formalized the data model for content-addressed linked data at about the same time. IPLD treats all hash-linked data structures—such as IPFS files, Ethereum state trees, and Git repositories—as parts of a single information space, with CIDs as the universal link type. When you follow a CID link, the codec tells you how to decode the target, and the multihash tells you how to verify it.</p>
<p>IPLD codecs such as DAG-CBOR and DAG-JSON were created to serialize IPLD data models with embedded CID links. DAG-CBOR became especially important because it is a deterministic subset of CBOR that directly supports CID links through a special CBOR tag. This enables the construction of authenticated data structures in which every node is both content-addressed and format-aware.</p>
<h4 data-index="26">How ATProtocol adopted CIDs</h4>
<p>When the Bluesky team designed ATProtocol in 2022–2023, they chose CIDs and DAG-CBOR for three interrelated reasons. First, content verification: any party can verify data integrity without trusting a server, because CIDs are computed from the data itself. Second, Merkle tree repositories: CID changes propagate from any modified record up to a signed root, so a single signature authenticates the entire repository. Third, account portability: repositories can be exported as self-verifying CAR files that any server can import and independently verify.</p>
<p>Jay Graber noted at a Protocol Labs event that the IPFS ecosystem already had tooling for working with DAGs and CAR files, making the adoption path practical rather than merely theoretical.</p>
<p>As of 2025–2026, ATProtocol’s data model formally aligns with DASL (Data-Addressed Structures &amp; Links), a specification at dasl.ing that defines a strict subset of IPLD CIDs for use in hash-linked data structures. DASL is the formalization of the constraints ATProtocol already enforced in practice.</p>
<h3 data-index="32">Multihash and Multicodec Primer</h3>
<p>Without self-description, you need extra information to understand a hash. Someone has to tell you, “this is a SHA-256 hash” or “this data is CBOR-encoded.” That outside context is fragile. If you lose it for any reason, such as a system upgrade, a protocol change, or incomplete documentation, the bytes become meaningless. You have a 32-byte value but no way to know what created it or what it refers to.</p>
<p>Multiformats fix this by letting the bytes include their own decoding instructions. A multihash tells you which hash algorithm and digest length it uses. A multicodec tells you its content type. There’s no need for an external registry, configuration file, or protocol negotiation.</p>
<h4 data-index="35">Unsigned varint encoding</h4>
<p>Both multihash and multicodec use unsigned varints to encode their type codes. This is an unsigned LEB128 encoding, limited to 9 bytes (63 bits of data). Each byte holds 7 bits of data, and the most significant bit (MSB) is a flag. If the MSB is 1, more bytes follow; if it is 0, this is the last byte. The bits are written least-significant-first.</p>
<pre><code>Value 1   (0x01):  0_0000001              → 0x01 (1 byte)
Value 127 (0x7F):  0_1111111              → 0x7F (1 byte)
Value 128 (0x80):  1_0000000 0_0000001    → 0x80 0x01 (2 bytes)
Value 300 (0x012C): 1_0101100 0_0000010   → 0xAC 0x02 (2 bytes)</code></pre>
<p>Values from 0 to 127 fit in a single byte. Values from 128 to 16,383 take two bytes. In theory, you need to handle multi-byte varints when parsing CIDs from any IPFS or IPLD sources.</p>
<p>In practice, for ATProtocol, you don’t need to worry about this. ATProtocol uses the CID version (0x01), the codecs (0x55, 0x71), the hash function (0x12), and the digest length (0x20), all of which fit in a single byte. No multi-byte varint decoding is needed. Every prefix is exactly one byte.</p>
<p>Multihash uses a TLV (type-length-value) format for hash digests. The structure is simple:</p>
<pre><code>&lt;hash-function-code (varint)&gt; &lt;digest-length (varint)&gt; &lt;digest-bytes&gt;</code></pre>
<p>A concrete SHA-256 multihash looks like this:</p>
<pre><code>12 20 6e6ff7950a36187a801613426e858dce686cd7d7e3c0fc42ee0330072d245c95
│  │  └── 32 bytes: the SHA-256 digest
│  └── 0x20 = 32: digest length in bytes
└── 0x12 = 18: SHA-256 hash function code</code></pre>
<p>Separating the hash function code from the digest length is done on purpose because it allows for truncated digests. For example, a SHA-512 hash shortened to 256 bits would use function code <code>0x13</code> (SHA-512) with length <code>0x20</code> (32 bytes) instead of <code>0x40</code> (64 bytes). The parser does not need to know that SHA-512 usually produces 64 bytes; the length field tells it exactly how many bytes to read.</p>
<p>The key hash function codes you’ll encounter:</p>
<pre><code>identity  0  (0x00) variable digest
sha1      17 (0x11) 20 byte digest
sha2-256  18 (0x12) 32 byte digest
sha2-512  19 (0x13) 64 byte digest
blake3    30 (0x1e) 32 byte digest</code></pre>
<p>The <code>identity</code> hash (0x00) is a special case where the “digest” is just the content itself. It is used for very small pieces of inlined data when the overhead of a real hash would exceed the data itself. It does not provide any security because it is just for convenience.</p>
<p>Multicodec is a shared lookup table of type identifiers, each encoded as an unsigned varint. The table is maintained in the <a href="https://github.com/multiformats/multicodec">multiformats/multicodec</a> repository on GitHub and covers categories ranging from CID versioning to IPLD codecs to multihash functions to serialization formats.</p>
<p>The first 127 entries (the single-byte varint range) are set aside for the most widely used codes. This is done on purpose so that the most common identifiers are also the shortest.</p>
<p>The codes relevant to ATProtocol:</p>
<p>Multicodec has two roles in CIDs: the same table is used for both the CID version byte and the content codec byte. The table is maintained by the community, with new entries added through pull requests. Codes in the “draft” column may change before they are finalized.</p>
<h4 data-index="57">How they compose in a CID</h4>
<p>A CIDv1 in binary is the concatenation of a version prefix, a codec identifier, and a multihash:</p>
<p>The first two fields are multicodec values. The last three fields together make up a multihash. So, the full structure is four varint prefixes followed by the raw digest bytes.</p>
<p>For an ATProtocol record CID:</p>
<p>Since all four prefix values are 127 or less, each one is a single byte. No extra varint processing is needed. The CID is always exactly 4 + 32 = 36 bytes.</p>
<h3 data-index="65">ATProtocol CIDs</h3>
<p>ATProtocol does not use the full CID specification. It defines a strict subset, following the DASL specification (dasl.ing/cid.html), that removes most of the general features and most of the parsing complexity found in the broader CID ecosystem.</p>
<p>CIDv0 identifiers (the <code>Qm...</code> strings from early IPFS) are never produced by ATProtocol and should be rejected during validation. CIDv0 was a backward-compatibility shim that let IPFS maintain interoperability with its existing content-addressed objects while transitioning to the richer CIDv1 format. ATProtocol had no legacy to maintain, so it adopted CIDv1 exclusively from the start.</p>
<p>CIDv1’s explicit version byte also allows for future format changes without confusion. If the protocol ever needs to change the CID format, the version field gives a clear way to migrate—parsers can check the first byte instead of using guesswork.</p>
<h4 data-index="71">SHA-256 only (for now)</h4>
<p>The hash function code must be <code>0x12</code> (SHA-256), and the digest must be exactly 32 bytes (<code>0x20</code>). The spec calls this a “stable requirement” and all repository nodes, records, and commits use SHA-256.</p>
<p>This choice is practical. SHA-256 is widely supported by hardware (like Intel SHA Extensions and ARM SHA-2 instructions), has strong security with no known practical attacks against collision resistance, and its 32-byte digests balance compact size with good collision resistance.</p>
<p>The DASL specification also allows BLAKE3 (<code>0x1e</code>) for streaming verification of large files, and this may be used for blob CIDs in the future. BLAKE3 is much faster than SHA-256 in software, especially for large files, and its tree-based design allows for parallel and incremental hashing. For now, though, SHA-256 is the only hash you’ll see in ATProtocol data.</p>
<h4 data-index="75">Two codecs: dag-cbor and raw</h4>
<p>ATProtocol uses exactly two content codecs.</p>
<p>dag-cbor (<code>0x71</code>) identifies structured data: records, MST nodes, and commit objects. When you encounter a CID with codec <code>0x71</code>, you know the bytes it points to should be decoded as deterministic CBOR with embedded CID links.</p>
<p>raw (<code>0x55</code>) identifies binary blobs: images, video, audio, or any other opaque byte sequence. When you encounter a CID with codec <code>0x55</code>, you know the bytes are unstructured — no CBOR decoding, no link extraction, just raw binary data.</p>
<p>The codec byte tells you exactly how to interpret the content. This is how the “self-describing” design of CIDs works. If a parser sees <code>0x71</code>, it can start a CBOR decoder right away; if it sees <code>0x55</code>, it can just pass the bytes through as-is.</p>
<h4 data-index="80">Base32 lowercase string encoding</h4>
<p>When CIDs are represented as strings in JSON API responses, in logs, in URLs, etc., ATProtocol uses lowercase base32 encoding with a <code>b</code> multibase prefix (RFC 4648 §6 alphabet). No base58btc, no base36, no hexadecimal.</p>
<p>This is why you see the distinctive prefixes that anyone familiar with Bluesky data will recognize. The base32 encoding of the four prefix bytes <code>0x01 0x71 0x12 0x20</code> (CIDv1, dag-cbor, SHA-256, and 32-byte digest) always gives the string <code>bafyrei</code>. The encoding of <code>0x01 0x55 0x12 0x20</code> (CIDv1, raw, SHA-256, and 32-byte digest) always gives <code>bafkrei</code>. The prefix is always the same because the first 4 bytes never change; only the 32-byte digest changes.</p>
<p>If you see a <code>bafyrei...</code> string, you’re looking at a record CID. If you see <code>bafkrei...</code>, it’s a blob.</p>
<p>You can see this in action by peaking at the CIDs of feed post commits coming through Jetstream:</p>
<h4 data-index="86">Fixed 36-byte binary size</h4>
<p>The arithmetic is simple: 1 byte (version) + 1 byte (codec) + 1 byte (hash function) + 1 byte (digest length) + 32 bytes (digest) = 36 bytes. Every ATProtocol CID, always.</p>
<p>This fixed size is useful in practice. You can use fixed-width database columns, pre-allocate buffers without checking lengths, and calculate storage overhead for indexes and Merkle trees exactly. The DASL spec suggests a <code>MAX_CID_BYTES</code> of 100 for future compatibility, but current ATProtocol CIDs are always 36 bytes.</p>
<h4 data-index="89">No chunking</h4>
<p>Unlike IPFS’s UnixFS, which splits large files into a Merkle DAG of smaller chunks (enabling incremental downloads and deduplication at the block level), ATProtocol hashes blobs in their entirety. A blob’s CID is the SHA-256 hash of the complete file contents. Period.</p>
<p>This makes verification much simpler. You have the blob bytes, you hash them, and you compare the result to the claimed CID. There is no need for DAG reconstruction, block ordering, or reassembly. The downside is that there is no built-in way to verify large files incrementally or as a stream. In the future, BLAKE3 and the BDASL (Big DASL) specification may help by offering tree-based hashing for large binary content.</p>
<p>ATProtocol’s CBOR serialization is now often called DRISL, which stands for Deterministic Representation for Interoperable Structures &amp; Links, instead of DAG-CBOR. The multicodec value (0x71) and the wire format stay the same. The difference is that DRISL refers to the specific rules ATProtocol adds to DAG-CBOR: no floating point numbers, certain map key ordering rules, and limits on which CBOR features are allowed. You’ll see both names in documentation and code, but they refer to the same bytes on the wire.</p>
<p>This explains what CIDs are, their history, how they are encoded, and the rules ATProtocol uses for them. In <a href="https://ngerakines.leaflet.pub/3mfczdeczuc2c">Part 2</a>, we’ll look at how ATProtocol uses CIDs in practice, including the versioning model that comes from the AT-URI/CID relationship, how to create CIDs step by step for records and blobs, and how CIDs move through repositories, the Merkle Search Tree, inter-record links, and the firehose sync protocol.</p>
<p>Except where otherwise noted, this content is licensed under a <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International license</a> with attribution going to <a href="https://ngerakines.me">Nick Gerakines</a>.</p>
