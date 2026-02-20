---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Acbkjy5n7bk3ax2wplmtjofq2/3lqpqvbdoas2z/3mf7we5j4ek2w/opengraph-image?e2bb7203df6d3028
date: '2026-02-19T18:12:37.392Z'
dateFolder: 2026/02/19
description: >-
  This is a B-sides post with unpolished thoughts that didn’t make it into the
  main article.
isBasedOn: 'https://ngerakines.leaflet.pub/3mf7we5j4ek2w'
link: 'https://ngerakines.leaflet.pub/3mf7we5j4ek2w'
slug: 2026-02-19-httpsngerakinesleafletpub3mf7we5j4ek2w
tags:
  - tech
  - privacy
  - social media
  - decentralization
title: 'B-Sides: Permissioned data is a love triangle'
---
<p>Editing the “<a href="https://ngerakines.leaflet.pub/3mf5wu6fs6225">Permissioned data is a love triangle</a>” post left a lot on the floor. These are some of those thoughts that aren’t fully formed, but I think are worth sharing. Again, these aren’t formal proposals, just me thinking out loud.</p>
<h2 data-index="1">The Firehose Isn’t the Only Option</h2>
<p>The main post focuses on using the event stream to notify consumers of changes. This is the easiest way to send updates to relays, indexers, and AppViews. However, it’s not the only option, and for controlled data, it might not be the best choice.</p>
<p>The firehose shares everything with everyone, all the time. Permissioned data, on the other hand, is about setting and enforcing limits and boundaries. So the real question might not be how to adapt the firehose for controlled content, but what a notification layer built for this purpose would look like.</p>
<p>Additionally, the firehose’s main XRPC subscription endpoint (<code>com.atproto.sync.subscribeRepos</code>) could be used directly by AppViews or clients with authentication. Right now, relays connect to PDS instances without authentication and receive everything. But a PDS could accept authenticated subscribers and give them a richer stream that includes controlled record blocks along with public ones. This creates more questions than answers, like how the PDS controls the stream content based on who’s connected and what cursors and sync events look like. For AppViews that already have an authenticated relationship with the PDS, this could be the easiest way to get permissioned updates in real time.</p>
<h2 data-index="5">Fast Membership Tests Instead of Streaming</h2>
<p>What if, instead of pushing events, consumers could pull them? For example, what if an AppView or client could make a quick API call to check, “Do I have everything I’m supposed to have?”</p>
<p>I think salted CIDs with RIBLT slices are worth exploring here. The idea is that you don’t need the full firehose to stay in sync. You just need a way to notice when you’re out of sync and then fix it. RIBLT (Rateless Invertible Bloom Lookup Tables) are a great fit for set reconciliation in the ATProtocol ecosystem. Using them for lightweight “am I current?” checks against a permissioned bucket seems like a good fit.</p>
<h2 data-index="8">Per-Identity Bucket Rev Lookups</h2>
<p>Similar to the membership test approach, a somewhat simpler alternative could be to have a fast per-identity lookup for repository bucket revisions.</p>
<pre><code>HEAD /xrpc/com.atproto.repo.getBucketRev?bucket=bffs&amp;cursor=Y
Authorization: DPoP ...</code></pre>
<p>The cursor would be a checksum (CID) of a structure like:</p>
<pre><code>{
    "bucket": "sbffs",
    "rev": "bucket-specific-repos-rev",
    "identity": "requesting-did",
    "nonce": "xyz"
}</code></pre>
<p>The nonce would be the current time rounded up to 20 minutes, HMAC’d with an internal bucket salt. This forces a periodic change, so the cursor naturally expires and consumers need to check again. It acts as a lightweight heartbeat, asking: “has anything changed in this bucket since I last looked, for my identity?”</p>
<p>If the response is a 304, you’re up to date. If it’s a 200 with a new cursor, something changed, and you need to reconcile. Returning a 200 for anything except an exact match on “bucket exists,” “user has permission,” and “CID matches” means you’re not leaking any information.</p>
<p>This isn’t a replacement for the firehose for public data. But for permissioned data with a scoped audience and a lower update frequency, polling with a smart cursor might be cheaper and simpler than maintaining a persistent event stream connection.</p>
<p>Side note: HEAD request support in XRPC is a long-standing wishlist item for me.</p>
<h2 data-index="17">De-sync Event Streams</h2>
<p>On the other hand, what if there was a lightweight event stream that only told you when you were out of sync? Instead of the full firehose with commits and MST diffs, it would just give you a nudge: “hey, bucket X changed, you should re-check.”</p>
<p>This would be a much lighter stream than the firehose. There’s no record data or MST nodes, just de-sync notifications. Consumers would subscribe to the buckets they care about and get notified when something changes. Then they could use the membership test to determine what to do next.</p>
<p>This approach gives you the best of both worlds: push notifications for immediate updates and pull reconciliation for the actual data. The event stream carries almost no information, so it’s safe to broadcast even for permissioned content.</p>
<p>This could be in the form of a ratchet tuple (here be dragons) from the bucket revision:</p>
<pre><code>{ "rev": "bafyre...25pcba", "prev": "bafyre...f7micy" }
{ "rev": "bafyre...dsh5dm", "prev": "bafyre...25pcba" }
...</code></pre>
<h2 data-index="23">Buckets as Keyhive Groups</h2>
<p>The idea of a “bucket” keeps coming up, and the more I think about it, the more I like seeing each bucket as a BeeKEM or Keyhive-style group of access controls. <a href="https://www.inkandswitch.com/project/keyhive/">Keyhive</a> from Ink &amp; Switch provides group membership management with end-to-end encryption, using a continuous group key agreement protocol that handles dynamic membership, concurrent updates, and coordination-free revocation. If each permissioned bucket maps to a Keyhive group, you get:</p>
<p>I’m not sure yet how this fits with the MST and repository structure in practice. Keyhive isn’t a one-size-fits-all solution here, but cryptographic groups with their own key material and members having access to documents (records and blobs) in the group feel good.</p>
<h2 data-index="27">Permission Graphs</h2>
<p>I think we need to model controlled data in a way that supports permission graphs:</p>
<p>Direct permissions. Mattie can see this post. This is the simplest case: a specific identity is granted access to a specific record. Most access control discussions start and end here.</p>
<p>Associative permissions. Mattie can see this post and the blobs it references. This is where things get interesting. A post might embed images, link to location records, or reference other content. If Mattie can see the post but not the embedded image, the experience doesn’t work. Permissions need to flow through record references. If you’re authorized for a record, you should also be authorized for the things it points to, or at least the things it declares as associated.</p>
<p>Indirect permissions. Mattie can see this post through the NeatPosts AppView. This is the AppView-scoped access model. Mattie doesn’t have direct permission on the record. The NeatPosts AppView does, and Mattie’s relationship with NeatPosts allows it to serve the content to her. The permission is managed by a trusted application.</p>
<p>Permission layers and sprawl create a kind of graph. For example, a private event might give direct permission to attendees, associative permission for the venue location and event photos, and indirect permission through the Smoke Signal AppView. This way, attendees can find the event in the app without needing individual record-level grants.</p>
<p>Getting the data model right for this is probably the hardest unsolved problem in permissioned data. It’s easy to say “permissions flow through references,” but actually following a reference graph, checking authorization at each step, and caching those decisions efficiently is not simple.</p>
<h2 data-index="34">Borrowing From OAuth</h2>
<p>There are a lot of paved paths in OAuth that feel relevant here.</p>
<p>What if PKCE, but reverse? In standard OAuth PKCE, the client proves it’s the same entity that started the authorization flow by presenting a code verifier that matches a previously committed code challenge. What if we flipped this for record access? The PDS commits a challenge when publishing a permissioned record, and an authorized consumer presents the verifier when requesting the content.</p>
<p>I’m not sure this fits perfectly, but the idea of stateless proof of authorization using a pre-committed challenge seems useful for inter-service record access, especially when you don’t want the PDS to keep a session table for every authorized consumer.</p>
<p>Rich Authorization Requests (RAR). OAuth RAR lets clients request specific, fine-grained permissions using structured authorization details. Instead of broad scopes like <code>repo:collection</code>, you could say, “I want read access to records in the <code>community.lexicon.calendar.event</code> collection where the requesting identity is in the event’s attendee list.” This fits directly with the associative and indirect permission models above.</p>
<p>The ATProtocol inter-service JWT already carries <code>iss</code> and <code>aud</code> claims. Extending it with RAR-style authorization details could give source services the context they need to make fine-grained access decisions without having to infer intent from the request alone.</p>
<h2 data-index="40">None of This Is Done</h2>
<p>These are notes, not specs. The bucket model needs more thought, and the permission types need a real data model. The OAuth analogies might not work in practice. But I think there’s something here worth considering, especially the idea that permissioned data doesn’t have to be an all-or-nothing feature. It can be a set of conventions that build on what already exists, using patterns from systems that have solved similar problems.</p>
