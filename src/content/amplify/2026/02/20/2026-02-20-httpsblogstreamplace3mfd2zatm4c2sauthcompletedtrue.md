---
author: stream.place
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A2zmxikig2sj7gqaezl5gntae/3lusxwydhqs2i/3mfd2zatm4c2s/opengraph-image?e2bb7203df6d3028
date: '2026-02-21T00:54:12.080Z'
dateFolder: 2026/02/20
description: >-
  DASL gives us DRISL for deterministic serialization of structured data and
  CIDs for content identifiers. But MP4 files — the dominant container format
  for video — resist content-addressing entirely.
isBasedOn: 'https://blog.stream.place/3mfd2zatm4c2s?auth_completed=true'
link: 'https://blog.stream.place/3mfd2zatm4c2s?auth_completed=true'
slug: 2026-02-20-httpsblogstreamplace3mfd2zatm4c2sauthcompletedtrue
tags:
  - tech
  - decentralization
title: 'S2PA and MUXL: Bringing Video to Content-Addressed Systems'
---
<p>Video is the most important media format on the web, but content-addressed systems don't really know what to do with it.</p>
<p><a href="https://dasl.ing/">DASL</a> gives us <a href="https://dasl.ing/drisl.html">DRISL</a> for deterministic serialization of structured data and <a href="https://dasl.ing/cid.html">CIDs</a> for content identifiers. But MP4 files — the dominant container format for video — resist content-addressing entirely. Run the same video through ffmpeg twice with identical settings and you'll get different bytes. Different bytes means different hashes. Different hashes means no stable CID.</p>
<p>Meanwhile, the Coalition for Content Provenance and Authenticity (C2PA) has developed useful techniques for embedding signed provenance metadata inside media files, but their design assumes a certificate-authority model that doesn't align with decentralized identity systems. X.509 certificates. The whole PKI stack. That doesn't fit systems built on decentralized identity — atproto, IPFS, web3, anything using DIDs and secp256k1 keypairs.</p>
<p>We've been shipping workarounds for both problems in Streamplace since launch. Now we're formalizing them into two specifications: S2PA and MUXL.</p>
<h3 data-index="4">Two specs, opposite directions</h3>
<p>Here's the elegant part: S2PA and MUXL solve complementary problems by moving in opposite directions from C2PA.</p>
<p>S2PA is a superset of C2PA. It adds capabilities above C2PA: secp256k1 signing (<code>ES256K</code>), DID-based identity (<code>did:key</code>, <code>did:plc</code>, <code>did:web</code>), and verification that resolves through DID documents rather than certificate authorities. This opens C2PA's provenance model to applications that don't have — and don't want — a certificate authority.</p>
<p>MUXL is a strict subset of C2PA. It constrains C2PA below: a canonical form for MP4 files with deterministic behavior specified all the way down to individual atoms. Atom ordering. Timestamp bases. Chunk layout. Metadata fields. Same logical content → same bytes → same CID.</p>
<p>One expands the identity model upward. The other locks down the container format downward. Together they extend DASL to cover video.</p>
<h3 data-index="9">The problem with MP4</h3>
<p>MP4 is a container format, not a codec. It's a box-based structure (Apple calls them "atoms," ISO calls them "boxes") that can hold nearly anything: video, audio, subtitles, chapters, metadata.</p>
<p>There's no canonical ordering of atoms. No required timestamp base. Metadata fields are optional and inconsistently populated. Two muxers can produce functionally identical MP4 files — same video frames, same audio samples, same duration — that differ at the byte level. For content-addressing, this is fatal. A CID is a hash of bytes. If the bytes aren't stable, the CID isn't stable.</p>
<p>MUXL defines the "right answer" for all of this: a deterministic canonical form for the ISO Base Media File Format. Given the same logical content, a MUXL-compliant muxer produces identical bytes every time, on every platform.</p>
<p>The reference implementation will be written in Rust and compile to WASM, providing deterministic execution through the <a href="https://github.com/WebAssembly/profiles/blob/main/proposals/profiles/Overview.md">WASM 3.0 deterministic profile</a>. The core operations are:</p>
<p>These operations enable cryptographically verifiable video primitives that are maximally easy to work with. Livestreams can pass around tiny one-second MP4 files. After a six-hour stream, you have one six-hour MP4 file on your computer. Cryptographic security is preserved throughout the process. The patterns established here may also lay a trusted foundation for more radical changes to the video, such as bitexact verifiable transcoding.</p>
<p>C2PA is a good idea compromised by some outdated thinking.</p>
<p>The Coalition — Adobe, Microsoft, Intel, BBC, others — designed a system for embedding signed provenance chains inside media files. Who created this? Who edited it? What tool was used? Each claim is signed, and the signatures chain back to a certificate authority. It's a reasonable model for institutional media: newsrooms, stock photo agencies, enterprise content management.</p>
<p>But it assumes you have an X.509 certificate from a recognized CA. That you're operating within the existing PKI hierarchy. That trust flows from the top down.</p>
<p>Decentralized systems work differently. The AT Protocol uses did:plc identifiers and secp256k1 keypairs. Bluesky users don't have certificates; they have DIDs. There's no certificate authority to appeal to — identity is cryptographic and self-sovereign.</p>
<p>S2PA bridges this gap. It's C2PA plus:</p>
<p>The Streamplace fork of c2pa-rs already implements this. Every livestream segment on Streamplace gets a C2PA manifest signed with the streamer's DID. The spec work formalizes what's already in production.</p>
<p>With S2PA and MUXL together, you can:</p>
<p>Generate stable CIDs for video. A video file can have a canonical DASL CID that doesn't depend on which encoder produced it or what platform you're on. Same content, same hash, everywhere.</p>
<p>Verify video authorship without CAs. A signed video can prove it came from a specific DID — and you can verify that without trusting any certificate authority, just by resolving the DID.</p>
<p>Content-address live streams. Streamplace already does this: each 1-second segment is a canonical MP4 with an S2PA manifest. The segments are independently verifiable and content-addressable.</p>
<p>Both specs are in active development. S2PA is mostly documentation of existing implementation. MUXL will require more low-level video engineering work to canonicalize a "right answer" down to the level of individual atoms.</p>
<p>We're also working on integration with content identification standards — perceptual hashing, semantic identification, and "soft binding" between content and external manifests in collaboration with ISCC and Hypha.</p>
<p>The specs will be submitted as candidate DASL specifications. The goal is a media standard that's the obvious solution for all media in decentralized social.</p>
<p>Streamplace is the livestreaming platform for the AT Protocol. If you're building on Bluesky, IPFS, or any content-addressed system and need video support, reach out — or just <a href="https://stream.place/">start streaming</a>.</p>
