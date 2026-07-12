---
author: unthread.at
cover_image: null
date: '2026-07-11T22:19:28.619Z'
dateFolder: 2026/07/11
description: >-
  Atomizer is an open-source toolkit for bringing legacy platform data into the
  AT Protocol.
isBasedOn: 'https://unthread.at/@tynanpurdy.com/3mqfdhlwwr623'
link: 'https://unthread.at/@tynanpurdy.com/3mqfdhlwwr623'
slug: 2026-07-11-httpsunthreadattynanpurdycom3mqfdhlwwr623
tags:
  - tech
  - decentralization
title: 'Atomizer: AT Protocol-Native Data Import Infrastructure'
---
<h2>Technical Proposal</h2>
<h2>1. Overview</h2>
<p>Atomizer is an open-source toolkit for bringing legacy platform data into the AT Protocol. It has two parts: a website where a person can sign in with their atproto account, upload a platform data export (a "takeout"), and convert it into records on their PDS; and a set of libraries other developers can embed to add import and conversion features to their own atproto apps.</p>
<p>The design rests on three layers:</p>
<ul> <li><strong>Parsing</strong> — a single parser per platform, written once and compiled to multiple languages, turning a takeout into typed objects.</li> <li><strong>Canonical records</strong> — the parsed data stored faithfully on the user's PDS under a stable, versioned lexicon namespace, preserving the exported content (including media) rather than immediately reshaping it into some app's format.</li> <li><strong>Transformation</strong> — optional, community-defined lenses that map canonical records into target lexicons (for example <code>app.bsky.feed.post</code>) with enough bookkeeping to round-trip.</li> </ul>
<p>The organizing principle is that the import step should be lossless and neutral. No single "standard importer" decides what a Facebook post <em>becomes</em>; each consuming app chooses which lens to apply, and the original import is always preserved and auditable.</p>
<p>Infrastructure is hosted on atproto-native services where practical: source on <a href="http://tangled.org">tangled.org</a>, DNS managed programmatically through Marque, CI via Spindle, and canonical schemas published as records. Distribution uses the standard language package registries.</p>
<h2>2. Problem Statement</h2>
<p>Importing legacy data into atproto today is fragmented, lossy, and hard to share work on. Every platform exports in its own undocumented shape; existing importers transform straight into a target lexicon and discard whatever doesn't fit; each language re-implements the same parsing; and there's no common substrate for the community to contribute transformation rules against.</p>
<p>Atomizer addresses this by separating faithful capture from opinionated transformation, and by generating the parsing libraries for many languages from one source so the ecosystem isn't rebuilding the same parser repeatedly.</p>
<h2>3. Architecture</h2>
<h3>3.1 Three layers</h3>
<pre><code>Takeout (JSON/CSV + media)
   │  parser (generated per language)
   ▼
Canonical records on the user's PDS
   e.g. zip.atomizer.export.instagram.post  (+ imported media as blobs)
   │  transformation lens (optional, chosen by the consuming app)
   ▼
Target records (app.bsky.feed.post, or any custom lexicon)
</code></pre>
<p>The canonical layer is the contract. Everything above it (which platforms, which parsers) and below it (which lenses, which target apps) can evolve independently as long as the canonical lexicons hold.</p>
<h3>3.2 Components</h3>
<ul> <li><strong>Parser generation (<a href="https://temperlang.dev/">Temper</a>).</strong> One parser per platform, compiled to TypeScript, Python, Rust, and others. This keeps a single source of truth for "how to read a Facebook export" while shipping idiomatic libraries to each ecosystem.</li> <li><strong>Canonical lexicons.</strong> atproto Lexicon schemas, owned by the project domain and published as records. They define the shape of imported content and are the thing lenses and consuming apps target.</li> <li><strong>Transformation lenses (<a href="https://panproto.dev/">panproto</a>).</strong> Bidirectional maps from a canonical lexicon to a target lexicon, tracking the data that a forward transformation drops (the "complement") so a round-trip is possible.</li> </ul>
<p>The actual schema definitions are intentionally not specified in this document; they'll be developed against real exports, where the true shape of each platform's data is known.</p>
<h2>4. Canonical Lexicon Design</h2>
<p>This section covers conventions the schemas must follow, not the schemas themselves.</p>
<h3>4.1 Naming and authority</h3>
<p>Canonical NSIDs follow the pattern:</p>
<pre><code>zip.atomizer.export.&lt;platform&gt;.&lt;recordName&gt;
e.g. zip.atomizer.export.instagram.post
</code></pre>
<p>The authority is the reversed project domain (<code>zip.atomizer.export.&lt;platform&gt;</code> → <code>&lt;platform&gt;.export.atomizer.zip</code>). Because atproto strongly encourages authority domains made of ASCII letters only — it makes cross-language code generation significantly easier, which matters a great deal here since codegen is central to the project — the authority must not contain digits or hyphens.</p>
<h3>4.2 Versioning</h3>
<p>Lexicons evolve in place for backward-compatible changes: adding optional fields or opening unions is fine; tightening or relaxing existing constraints is not, because it breaks existing data and consumers.</p>
<p>A genuinely breaking change to a platform's export format is expressed as a new NSID, versioned as a suffix on the <strong>name</strong> segment — <code>...instagram.post</code> becomes <code>...instagram.postV2</code> — never as a segment inside the authority. Keeping the version out of the authority means a single platform keeps one stable authority (and therefore one DNS record; see §5), and preserves the letters-only authority the codegen wants. Both versions coexist on the network; nothing is force-migrated.</p>
<h3>4.3 Record keys</h3>
<p>Records are stored with a deterministic record key derived from the source platform's own identifier (sanitized to the atproto record-key character set), so that re-importing the same export updates records in place rather than duplicating them. The lexicon declares an open key type to permit this. The collection a record is written to is always the record's own NSID.</p>
<h3>4.4 Media as blobs</h3>
<p>Media is imported as first-class atproto blobs, not dropped or reduced to a filename. The flow per media item is:</p>
<ol> <li>Upload the bytes to the user's PDS with <code>com.atproto.repo.uploadBlob</code>, which returns a blob reference.</li> <li>Include that reference in the canonical record's media field.</li> <li>Write the record; the reference makes the blob permanent.</li> </ol>
<p>Two constraints shape the importer's design. First, an uploaded blob is temporary and is garbage-collected if no record references it within a grace window, so a bulk import must reference blobs promptly — interleave uploads with record writes rather than uploading everything up front. Second, size and mime-type limits are enforced when the reference is created (via the lexicon's blob field), and the PDS may impose its own lower caps, so the importer must handle rejection at record-write time. Blobs are repo-local; there is no cross-repo deduplication.</p>
<h3>4.5 Data stewardship and PII</h3>
<p>Atomizer only defines canonical lexicons for content intended to be public — an Instagram post, yes; a direct message, no. This is a deliberate limit until atproto has a settled specification for permissioned or private data.</p>
<p>Even public content carries other people's data — commenters, tagged accounts, people in photos. The canonical schemas therefore minimize third-party PII: identifiers for other people are stored as opaque display strings, never as resolvable atproto identities, and third-party material such as comments is optional and off by default in the import tools. Beyond that, deciding what to publish and under what basis is the responsibility of the developer building on Atomizer; the libraries make the conservative choice the default.</p>
<h2>5. Publishing and Resolution</h2>
<h3>5.1 Ownership model</h3>
<p>The canonical schemas are owned by the project, not by end users. They are published from a single dedicated atproto account (a project DID) whose repository holds one <code>com.atproto.lexicon.schema</code> record per canonical NSID. End users' repositories hold <em>instances</em> of those record types; they neither publish nor need to publish the schemas.</p>
<p>The schema records are kept minimal — the lexicon language version, the NSID, and the definitions. Provenance (which parser version produced a record, when it was exported) belongs on the data records and in the git history and package metadata, not stuffed into the schema record, which is a protocol-governed meta-schema.</p>
<h3>5.2 Resolution is ordinary DNS</h3>
<p>Lexicon resolution uses standard public DNS, not an atproto-internal mechanism. A resolver reverses the NSID authority, does a DNS TXT lookup at <code>_lexicon.&lt;reversed-authority&gt;</code>, reads the <code>did=...</code> value, resolves that DID to a PDS, and fetches the schema record. Resolution is non-hierarchical: each authority prefix needs its own TXT record, with no inheritance from parent domains. For the project that means one record per platform, for example:</p>
<pre><code>_lexicon.instagram.export.atomizer.zip   TXT   "did=did:plc:&lt;atomizer-did&gt;"
_lexicon.facebook.export.atomizer.zip    TXT   "did=did:plc:&lt;atomizer-did&gt;"
</code></pre>
<h3>5.3 Marque's role</h3>
<p>Marque is an atproto-native domain registrar: the DNS zone for a domain it manages is represented as a record on the owner's atproto account, which Marque syncs to the authoritative nameservers it runs. That gives Atomizer a way to update DNS <em>programmatically</em> from CI — adding a new platform's <code>_lexicon</code> entry as part of a release — while the records themselves still resolve over ordinary DNS like any other. The project will register its domain (<code>atomizer.zip</code> or <code>atomizer.dev</code>) through Marque and point the <code>_lexicon</code> records at the dedicated project DID.</p>
<h3>5.4 Tooling</h3>
<p>Publishing, linting, and schema-evolution checks use <code>goat lex</code>, the official atproto Lexicon tool, rather than bespoke scripts. Its evolution checks are the guardrail that stops an accidental breaking change from shipping as an in-place update. CI runs <code>goat lex</code> to publish and validate schemas, with the Marque DNS update as a separate step.</p>
<h3>5.5 How apps actually consume this</h3>
<p>Runtime NSID resolution is a publishing and verification convenience, not the hot path. In practice, consuming apps support the lexicons they know about statically, and relays do not validate record schemas at all. Atomizer is therefore designed for apps that vendor its lexicons and generated types at build time; on-network resolution exists so the schemas are discoverable and their authority is verifiable, not because every consumer resolves them live.</p>
<h2>6. Transformation Lenses</h2>
<p>Lenses are optional and live above the canonical layer. A lens maps a canonical record to a target lexicon and tracks the data the forward direction drops, so the transformation can be reversed. This is what lets the ecosystem offer several interpretations of the same import — a "faithful archive" mapping and a "post it to Bluesky" mapping can coexist — without any of them being privileged as <em>the</em> importer, and without the original canonical record ever being altered.</p>
<p>Because lenses operate on canonical records rather than raw takeouts, they are independent of how the data was captured, and the community can contribute new ones without touching the parsers.</p>
<p>A note on network hygiene: canonical records live under Atomizer's own namespace, which Bluesky's AppView ignores, so importing them does not flood anyone's feed. A lens that emits <code>app.bsky.feed.post</code> for a backlog of historical content is a different matter — that should be user-initiated per item or batch, rate-limited, and mindful of how the firehose and AppViews treat a sudden influx of backdated records.</p>
<h2>7. Distribution and Consumption</h2>
<h3>7.1 Libraries, not a service</h3>
<p>Atomizer ships libraries. The website is one consumer of those libraries, not the product itself; the libraries are meant to be embedded in other apps.</p>
<p>Authentication and credential handling are out of scope by design. A library never logs in or holds tokens; it accepts an already-authenticated atproto agent from the caller and performs only the <code>uploadBlob</code> and record-write operations through it. This keeps Atomizer compatible with whatever auth the host app uses and avoids making it a credential sink.</p>
<h3>7.2 Packaging</h3>
<p>Each platform's generated parser is published to the relevant language registry (npm, PyPI, <a href="http://crates.io">crates.io</a>, and others as targets are added), versioned in step with the canonical lexicon it produces. Packages include the generated types so consumers get compile-time checking against the canonical shape.</p>
<h2>8. Infrastructure and CI/CD</h2>
<ul> <li><strong>Source:</strong> <a href="http://tangled.org">tangled.org</a>, an atproto-native git forge.</li> <li><strong>CI:</strong> Spindle. On a release it generates the per-language parsers, runs tests across the target languages, publishes packages, publishes/validates schemas with <code>goat lex</code>, and updates the <code>_lexicon</code> DNS entries through Marque.</li> <li><strong>DNS:</strong> Marque, updated programmatically from CI (§5.3).</li> <li><strong>Secrets:</strong> CI holds scoped credentials for the package registries and the project atproto account; nothing is committed to the repository.</li> </ul>
<h2>9. Dependency Risk</h2>
<p>Atomizer's infrastructure is atproto-adjacent rather than dependency-free. It leans on Temper for codegen, panproto for lenses, and tangled/Spindle/Marque for hosting, DNS, and CI — several of which are young and pre-1.0 — plus the standard language registries, which are ordinary external dependencies. This is worth stating plainly rather than describing the project as having none.</p>
<p>The mitigating factor is that the durable artifacts — the canonical lexicons and the records themselves — are plain atproto and depend on none of these tools. If codegen tooling stalls, parsers can be written by hand per language against the same schemas; if the lens tooling stalls, the canonical records remain valid and usable. The bet on the newer tools is a convenience bet, not a correctness one, and the fallbacks keep the core viable.</p>
<h2>10. Scope and Phases</h2>
<p><strong>Phase 1 — Prove the spine.</strong> One platform (Instagram is a good first candidate given its public-post model), end to end: generated parser in at least two languages, a canonical lexicon with media imported as blobs, deterministic idempotent record keys, schemas published and resolving over real DNS, packages on the registries. Success is a real export becoming faithful canonical records, media included, that resolve and validate on the live network.</p>
<p><strong>Phase 2 — Transformation.</strong> A small number of lenses (for example canonical → <code>app.bsky.feed.post</code>, and canonical → a plain archive format), with round-trip verification and documentation for authoring lenses.</p>
<p><strong>Phase 3 — Breadth.</strong> Additional platforms and the community contribution path (forking parsers, contributing lenses and new platform schemas), with attention to keeping the canonical conventions in §4 consistent across platforms.</p>
<h2>11. Known Limitations and Future Work</h2>
<ul> <li><strong>Private and permissioned data.</strong> Out of scope until atproto has a settled specification for it; Atomizer deliberately covers only public content for now.</li> <li><strong>Repo scale.</strong> Storing large histories as individual records adds up in repo size and firehose volume. Part of the per-platform schema work is deciding what genuinely needs to be an independently addressable record versus what can be embedded.</li> <li><strong>Platform coverage.</strong> Initial focus is narrow; breadth comes in Phase 3 and via community contributions.</li> <li><strong>Lens authoring ergonomics.</strong> The lens DSL has a learning curve; better tooling is a later concern, not a Phase 1 blocker.</li> </ul>
<h2>12. Summary</h2>
<p>Atomizer separates faithful capture from opinionated transformation. It imports legacy exports — text, metadata, and media — into lossless canonical records on the user's own PDS, published and resolved through ordinary atproto mechanisms, and lets the community define how that content is transformed rather than baking in one answer. It is delivered as embeddable, multi-language libraries that leave auth and publishing decisions to the host app, and it makes conservative choices about third-party data by default. The infrastructure is atproto-native where it helps, with the core kept resilient to the newer tools it builds on.</p>
