---
author: ietf.org
cover_image: null
date: '2026-10-05T22:29:44.677Z'
dateFolder: 2026/10/05
description: Search IETF mail list archives
isBasedOn: 'https://mailarchive.ietf.org/arch/msg/atp/SwNFdkT4yjcXZqqyVjDuX8NpfTs/'
link: 'https://mailarchive.ietf.org/arch/msg/atp/SwNFdkT4yjcXZqqyVjDuX8NpfTs/'
slug: 2026-10-05-httpsmailarchiveietforgarchmsgatpswnfdkt4yjcxzqqyvjdux8npfts
tags:
  - decentralization
title: '[Atp] Re: Draft "at" URI Scheme Document (legacy not-actually-URI version)'
---
<pre>Architectural considerations: Generalizing AT Protocol beyond
Bluesky-specific constraints (draft-newbold-atp-aturi,
draft-holmgren-at-repository)

Hi Bryan, Daniel, and the ATP Working Group,

I want to thank the authors for publishing draft-newbold-atp-aturi-00,
draft-holmgren-at-repository, and draft-newbold-at-architecture.

At its core, ATP offers an authenticated, distributed key-value store where
URIs resolve to cryptographically verifiable byte arrays. Unlike HTTP,
where authenticity is ephemeral and bound strictly to an active transport
session (TLS + DNS + WebPKI origin), ATP packages authenticity directly
with the data bytes themselves (self-certifying data). This allows data to
be cached, mirrored, or reshared across untrusted intermediaries without
loss of authenticity.

However, reviewing the initial batch of drafts, there appears to be a
tendency to import constraints and assumptions specific to Bluesky’s
social/microblogging application layer into the foundation of the protocol.
If we generalize these components, ATP can serve as a much broader Internet
standard—supporting hierarchical data layout, authenticated distributed
file systems.

I would like to submit several architectural observations and proposals for
discussion in the working group.

---

### 1. Fundamental Trust Model: Cryptographic Fingerprints vs. DNS Handles

In Section 1 and Section 5 of draft-newbold-atp-aturi, account identifiers
and handles are introduced side-by-side. While Section 5 correctly notes
that handles are mutable and can change authority over time, the draft
should be much firmer about the underlying trust architecture:

* **Permanent Account Identifiers(pID) as Cryptographic Fingerprints:** The
root of authenticity must be anchored strictly in the account identifier as
a cryptographic fingerprint (e.g., DID/public key material).
* **The Complete Chain of Custody:** The true chain of trust for any record
is:
`Fingerprint (DID) -&gt; DID Document Delta Chain -&gt; Signing Keys -&gt; Signed
Commit (and Tick) -&gt; Merkle Tree -&gt; Record (Data Payload)`
This entire chain can be persisted, transferred, and validated offline
directly from a recipient's local disk.
* **Handles are Strictly Ephemeral Routing Aliases:** Any reference
formatted as `at://&lt;domain&gt;/*` imports the IANA URI registry, DNS lookup,
and WebPKI CA trust models. None of these external trust models persist on
the receiver's disk or carry mathematical self-certification.

The specification should explicitly state that the repository's
cryptographic signature anchors exclusively to the account fingerprint, and
that handles must be treated strictly as non-authoritative, ephemeral
resolution conveniences rather than first-class trust anchors.

---

### 2. Decoupling Network Hosting from Validity, and Introducing Signed
"Tick" Freshness Proofs

Section 1 of draft-newbold-atp-aturi states:
&gt; "Each account has a global permanent account identifier that can be
resolved to a network hosting location and to public key material."

This phrasing creates the impression that the network hosting location
(e.g., the Personal Data Server / PDS) is a mandatory participant in
retrieving and validating repository data. In an authenticated transfer
architecture:
* The network hosting location is merely an authoritative location of
record or fallback host of last resort.
* Repository blocks can be fetched from any peer, local cache, or untrusted
CDN and validated strictly against the account's key material.

Furthermore, in the current design, an interactive HTTPS query to the
authoritative network host is required to discover the current head commit
hash to guard against stale repository states. This leaks transport-layer
dependency back into state validation.

**Proposal: Signed Tick Objects for Offline Freshness Proofs**
Rather than relying on interactive HTTPS authority to verify head status,
the protocol should consider standardized "tick" (or "head assertion")
objects signed by the account key or designated PDS:
```text
Tick = Sign(Repo_Fingerprint, Head_Commit_CID, Timestamp_became_head,
Timestamp_of_tick_issue)
```
Where:
```
With signed ticks:
1. The tick asserts that a specific commit hash was the authoritative head
at a given timestamp.
2. A caching proxy or peer can serve both the repository data and the
cryptographic tick.
3. The client receives verifiable freshness bounded between the commit
creation time and the tick issue time, completely preserving offline and
decentralized verifiability without an interactive round-trip to the
hosting provider.

---

### 3. Path Hierarchy: Replacing the Rigid 3-Layer Structure with
Prefix-Based Scoping

Section 2 and Section 3.1 of draft-newbold-atp-aturi enforce a rigid
three-layer constraint:
```text
at://&lt;account-authority&gt;/&lt;collection&gt;/&lt;record-key&gt;
```
Section 3.1 mandates that a record reference must have *exactly two* path
components: an NSID (collection) and a Record Key.

This appears to be directly inherited from Bluesky’s client application
model, where client permissions are partitioned per collection (e.g., `
app.bsky.feed.post`). However, hardcoding this structure into the URI
scheme and repo format introduces unnecessary limitations:
* **Arbitrary Depth for Rich Applications:** Future decentralized
applications may require nested hierarchies—for example, backup tools
(`at://&lt;authority&gt;/backup_app/source_app/collection/record`), hierarchical
filesystems, multi-tenant databases, or structured document trees.
* **Prefix-Based Authorization:** Client capability and authorization
models do not require a fixed two-segment path depth. Scoping permissions
by path prefix (e.g., granting write permissions to `at://&lt;authority&gt;/
org.example.app/**` or any arbitrary sub-path) achieves the same sandboxing
guarantees while allowing applications full flexibility over their internal
naming schemes.

Relaxing the URI and repository specifications to allow arbitrary path
segment depths (or treating paths as generic hierarchical keys) eliminates
this artificial constraint without complicating client security.

---

### 4. In-Repository Large Object Storage via Lexicographical Chunking

In draft-holmgren-at-repository, the current specification states:
&gt; "Large binary data such as images and media files are not stored directly
within repositories. Instead, such data is stored externally and referenced
in records by a content hash link."

This separation appears to be an artifact of the 1:1 mapping between
individual records and tree leaves. However, tree structures are the
foundation of modern distributed file systems. Forcing large binary objects
out-of-band prevents ATP repositories from operating as self-contained
archives or distributed file storage layers.

Because the underlying repository keys are lexicographically ordered in the
Merkle tree, large objects can be accommodated natively within the
repository via a simple, standardized chunking convention:
* By reserving a delimiter disallowed in standard record keys (e.g., `:`),
a large record can be split across multiple sequential keys:
```text
application/collection/record:part000001 -&gt; [chunk bytes / record slice]
application/collection/record:part000002 -&gt; [chunk bytes / record slice]
application/collection/record:part000003 -&gt; [chunk bytes / record slice]
```
* A client requesting `collection/record` can perform an efficient range
query over the Merkle tree, streaming and reassembling the parts in
lexicographical order.
* This allows records of arbitrary size (exceeding single-disk or memory
capacities) to be stored, authenticated, and range-read within the
repository tree, enabling ATP to serve as a decentralized alternative to
systems like HDFS or UnixFS.

---

### 5. Repository Structure Generality: Merkle Search Trees vs. Merkle
B-Trees

The current repository draft mandates a Merkle Search Tree (MST) with
deterministic tree leveling based on key hash prefixes.

While MSTs provide canonical tree determinism (which simplifies two-way
synchronization sets), and is why I picked it originally, the core
three-tier repository abstraction—Commit Objects, Internal Tree Nodes, and
Data Records—does not inherently require deterministic hash-leveled MSTs.

A generalized Merkle B-Tree (or Prolly Tree) retains the required
properties:
* Lexicographically sorted key-value pairs supporting efficient $O(\log N)$
range queries and lookups.
* Full Merkle inclusion proofs and authenticated deltas.
* Configurable balance and fanout characteristics for high-throughput write
workloads where canonical determinism is less critical than write
efficiency and branch balance.

Allowing the repository format to support generalized Merkle B-Trees (or
framing the MST as one concrete tree profile within a broader Merkle
key-value framework) would make ATP far more versatile for diverse
computing and data storage workloads.

---

### Summary of Suggested Changes

1. **Clarify Trust Foundations:** Explicitly define the account identifier
as a cryptographic fingerprint, and relegate handles to ephemeral,
non-authoritative convenience aliases.
2. **Decouple Hosting from Verification &amp; Standardize Ticks:** Clarify that
network hosting is a non-exclusive fallback, and introduce signed tick
objects for offline/cached freshness proofs.
3. **Generalize Path Depth:** Replace the rigid 2-segment path requirement
(`collection/record`) with arbitrary-depth pathing, utilizing prefix-based
capability scoping.
4. **Enable In-Repo Chunking:** Standardize lexicographical chunk delimiter
semantics (`key:partXXXX`) to support large binary objects directly within
repository trees.
5. **Generalize Tree Envelopes:** Abstract the repository tree requirements
to accommodate both deterministic MSTs and general Merkle B-Trees.

I would appreciate thoughts from the authors and the working group on these
points, and would be happy to draft specific text contributions or issue
proposals if there is interest.

Best regards,

Aaron D Goldman
I designed the first version of AtProto in the months before we founded
Bluesky PBLLC and Daniel and I implemented it.
Daniel thanks for the call out in
<a href="https://www.ietf.org/archive/id/draft-newbold-at-architecture-00.html#name-acknowledgements">https://www.ietf.org/archive/id/draft-newbold-at-architecture-00.html#name-acknowledgements</a>

[image: image.png]


On Fri, Oct 2, 2026 at 6:01 PM Bryan Newbold &lt;bryan=
40blueskyweb.xyz@dmarc.ietf.org&gt; wrote:
&gt;
&gt; Hi folks,
&gt;
&gt; I uploaded a new I-D about the "at" URI scheme:
<a href="https://datatracker.ietf.org/doc/draft-newbold-atp-aturi/">https://datatracker.ietf.org/doc/draft-newbold-atp-aturi/</a>
&gt;
&gt; As noted in the text, and discussed back in Vienna, the currently
deployed "at://did:plc:abc123" syntax does not meet the generic URI rules
(RFC-3986), because it includes multiple colons in the authority section.
&gt;
&gt; Regardless of how we end up resolving that dilemma, we do need to
document the current string syntax and semantics, and this document does
cover that. I believe this document is relevant to the WG and should get
linked to it in the datatracker (apologies if I messed up the metadata on
my end).
&gt;
&gt; This current draft has two small divergences from what is currently
deployed:
&gt;
&gt; 1) the repository sync draft and this draft text both say that NSIDs
"MUST" have the domain authority part be lower-case (eg
"com.EXAMPLE.record" is invalid). I think this is an improvement,
especially in references to records, and I expect virtually all data in
production to follow this norm already, but is a slight change
&gt; 2) this draft text does not support "URIs" with a single path segment
(just collection, no record key). I've honestly always been confused why
that was supported in the existing spec, and don't think it is used
anywhere in the deployed network
&gt;
&gt; --bryan
&gt; _______________________________________________
&gt; Atp mailing list -- <a href="mailto:atp@ietf.org">atp@ietf.org</a>
&gt; To unsubscribe send an email to <a href="mailto:atp-leave@ietf.org">atp-leave@ietf.org</a>
</pre>
