---
author: Jaz
cover_image: ''
date: '2025-09-26T17:34:24.994Z'
dateFolder: 2025/09/26
description: >-
  In the case of distributed, high-throughput string interning, horizontal
  scaling can be achieved by breaking up one large keyspace that requires strict
  coordination into billions of smaller keyspaces that can be randomly
  load-balanced across.
isBasedOn: 'https://jazco.dev/2025/09/26/interning/'
link: 'https://jazco.dev/2025/09/26/interning/'
slug: 2025-09-26-httpsjazcodev20250926interning
tags:
  - code
title: Turning Billions of Strings into Integers Every Second Without Collisions
---
<p>I’ve recently started building a POC of a <a href="https://github.com/bluesky-social/kvdb">Redis RESP3 Wire Compatible Key/Value Database built on FoundationDB</a> with <a href="https://bsky.app/profile/calabro.io">@calabro.io</a> and though it’s rather early, it’s already spawned a fun distributed systems problem that I thought would be interesting to share.</p>
<p>Previously <a href="https://jazco.dev/2024/04/20/roaring-bitmaps">I’ve written</a> about how I implemented a Graph DB via Roaring Bitmaps, representing relations as a bidirectional pair of sets.</p>
<p>To support such use-cases in this new database, we’d like to represent sets of keys such that you can perform boolean operations on them (intersection, union, difference) relatively quickly even for very large sets (with millions of members).</p>
<h2>Supporting Larger Keys</h2>
<p>In the original Graph DB, we were representing user DID strings as <code>uint32</code> UIDs to allow us to store millions of edge lists in very little space (e.g. the set of users who follow <code>bsky.app</code>) while being able to perform boolean operations between lists quickly (using Roaring Bitmaps’ parallel boolean operators).</p>
<p>Since we were graphing follows, blocks, and other such User-to-User relationships, there was a practical maximum for the total number of user IDs in the low billions.</p>
<p>We’ve continued exploring objects and relationships we’d like to represent as a Graph, and have realized that if we wanted to store e.g. the URIs of all posts a user has liked so we can intersect it with other users’ likes, we’re going to need a bigger keyspace!</p>
<p><em>There are well over 15 Billion records in the AT Proto Ecosystem, each with a unique AT URI!</em></p>
<p>Now our desired keyspace is much larger than can be represented by <code>uint32</code> values and so we need to expand to <code>uint64</code>.</p>
<p>Easy enough, let’s <a href="https://github.com/RoaringBitmap/roaring?tab=readme-ov-file#64-bit-roaring">use the <code>uint64</code> flavor of Roaring Bitmaps</a> and simply intern URIs and User DIDs as <code>uint64</code>s, problem solved, right?</p>
<p>Not quite…</p>
<h2>Interning Many Things at Once</h2>
<p>The AT Proto Firehose has hit historic peak traffic of over 1,500 evt/sec.</p>
<figure><img alt="Firehose Peak showing &gt;1,500 evt/sec sustained for several hours" src="https://jazco.dev/public/images/2025-09-26/peak_firehose.png"/><figcaption>Firehose Peak showing &gt;1,500 evt/sec sustained for several hours</figcaption></figure>
<p>We want to design a system that will handle many times more scale than we’ve ever seen in reality.</p>
<p>This means designing for 10x or 100x would require us to be able to intern 15k to 150k new URIs per second into <code>uint64</code> integers.</p>
<p>Sounds easy enough, what’s the holdup?</p>
<p>Well, in FoundationDB we’re able to use <a href="https://apple.github.io/foundationdb/developer-guide.html#transaction-basics">Transactions</a> to do things like atomically increment a sequence safely when many other threads may be trying to do the same thing.</p>
<p>This is simple enough to do in Go, we can just toss together a little helper function to acquire a new UID for our string:</p>
<pre><code>func (s *server) allocateNewUID(span trace.Span, tx fdb.Transaction) (uint64, error) {
	var newUID uint64
	val, err := tx.Get(fdb.Key("last_uid")).Get()
	if err != nil {
		return 0, return fmt.Errorf("failed to get last UID: %w", err)
	}
	if len(val) == 0 {
		newUID = 1 // start from 1
	} else {
		lastUID, err := strconv.ParseUint(string(val), 10, 64)
		if err != nil {
			return 0, return fmt.Errorf("failed to parse last UID: %w", err)
		}
		newUID = lastUID + 1
	}

	tx.Set(fdb.Key("last_uid"), []byte(strconv.FormatUint(newUID, 10)))
	return newUID, nil
}
</code></pre>
<p>This function gets called from a <code>fdb.Transaction</code> which gets assigned a Transaction ID, then stages its changes, then tries to commit them.</p>
<p>In FoundationDB, if your transaction is reading or modifying data written to by a different Transaction that finishes while you’re in-progress, your Transaction is thrown out and must be retried.</p>
<p>For our UID assignment use-case, this is pretty problematic. We want to assign hundreds of thousands of new UIDs per second but if they’re all modifying the same key, concurrent transactions will constantly run into contention on the same data and will be forced to retry over and over again. This problem gets worse the more concurrent transactions you have trying to read from or write to the same key.</p>
<p>Even if we stick to sequential access, if it takes ~5-10ms to assign a UID, we can only assign ~100-200 UIDs per second, nowhere near the throughput we need to support.</p>
<p>How can we get past this problem and allow us to give strings unique <code>uint64</code> UIDs in a high throughput and highly concurrent manner?</p>
<h3>Attempt #1: <code>xxHash</code></h3>
<p>My first attempt to solve this problem was to try something that required no coordination and hash the string keys into <code>uint64</code>s using <a href="https://xxhash.com/"><code>xxHash</code></a>.</p>
<p><code>xxHash</code> is a non-cryptographic hash algorithm that supports incredibly high throughput (dozens of GB/sec) and can produce 64 bit unsigned integer hashes of strings trivially.</p>
<p>Implementing this would look something like:</p>
<ol> <li>Hash the incoming string key</li> <li>Lookup the <code>uint64</code> UID to see if we’ve already assigned it to a string <ul> <li>Reject the transaction if there’s a collision and give up</li> </ul> </li> <li>Store the key in the UID map and the UID in the key map</li> <li>Use the UID for anything else we need</li> </ol>
<p>While the <code>uint64</code> keyspace is plenty large for our needs assuming we distribute evenly among the whole space, using a hashing algorithm with no coordination means there’s room for collisions and thus we’d need some additional logic (potentially by bucketing the keys somehow).</p>
<p>Consulting the <a href="https://stackoverflow.com/questions/45788721/where-can-i-find-xxhash64-and-md5-collision-probability-statistics">Birthday Problem</a> we can see that a keyspace with 64 bit hashes has a &gt;50% chance of containing a single collision when we have only ~5 billion keys in the set! That’s barely more keys than we can cram into a <code>uint32</code> and definitely won’t suffice for the number of keys we expect to be storing!</p>
<p>So, <code>xxHash</code>, while nice and coordination-free is probably not going to be the solution we need.</p>
<p>What else can we do?</p>
<h3>Attempt #2: Billions of Sequences</h3>
<p>Incrementing one sequence is clearly not an option because we can only increment a single sequence ~100-200 times per second, but what if we instead had more than one sequence?</p>
<p>Roaring Bitmaps managed to make highly efficient bitmap representations by breaking up a <code>uint32</code> keyspace into a <code>uint16</code>-wide set of <code>uint16</code>-wide keyspaces. Can we do something similar here?</p>
<figure><img alt="Roaring Bitmaps Diagram from the Original Publication at https://arxiv.org/pdf/1709.07821" src="https://jazco.dev/public/images/2025-09-26/roaring_bitmaps_diagram.png"/><figcaption>Roaring Bitmaps Diagram from the Original Publication at https://arxiv.org/pdf/1709.07821</figcaption></figure>
<p>Here’s an idea, what if we had just over 4 billion difference sequences and just picked one at random when we needed to assign a UID?</p>
<p>Since we’re constructing our UIDs as a <code>uint64</code>, we can split the full UID into a pair of <code>uint32</code>s where the most-significant-bits are used to identify the sequence ID and the least-significant-bits are used to identify the value assigned to the UID within the sequence.</p>
<figure><img alt="UID Breakdown" src="https://jazco.dev/public/images/2025-09-26/uid_breakdown.png"/><figcaption>UID Breakdown</figcaption></figure>
<p>So in our implementation, we get ~4.3 Billion sequence IDs that each have ~4.3 Billion incrementing values.</p>
<p>As an example, if we were to randomly select Sequence ID <code>37</code> and then we increment that sequence to the value <code>5</code>, we’d assemble the ID as <code>37&lt;&lt;32 + 5</code> which looks like <code>158,913,789,952 + 5 -&gt; 158,913,789,957</code>. Looking at the next Seuqence ID, we’d see <code>38</code> which, when left shifted by 32 gives us <code>163,208,757,248</code>. You can see there’s a gap of ~4.3 billion values between the first UID assigned by each Sequence ID.</p>
<p>Assuming we can increment a single sequence ~100 times per second with contention, we’re able to mint 430 <em>Billion</em> new UIDs per second without locking up (assuming the cluster can keep up).</p>
<p>Storing ~4.3 billion sequences may be a bit expensive, but thankfully this strategy can scale up and down by picking a larger or smaller prefix size. If we only wanted to store say, ~16k sequences, we can pick a 14 bit prefix instead of a 32 bit prefix and then use a 50 bit sequence number. That spreads the load across <code>2^14</code> sequence IDs and significantly reduces storage requirements for Sequences.</p>
<p>What does this look like in code? Well, it’s honestly not very complex!</p>
<pre><code>const uidSequencePrefix  = "uid_sequence/"

func (s *server) allocateNewUID(tx fdb.Transaction) (uint64, error) {
	// sequenceNum is the random uint32 sequence we are using for this allocation
	var sequenceNum uint32
	var sequenceKey string

	// assignedUID is the uint32 within the sequence we will assign
	var assignedUID uint32

	// Try up to 5 times to find a sequence that is not exhausted
	for range 5 {
		// Pick a random uint32 as the sequence we will be using for this UID
		sequenceNum = rand.Uint32()
		sequenceKey = fmt.Sprintf("%s%d", uidSequencePrefix, sequenceNum)

		val, err := tx.Get(fdb.Key(sequenceKey)).Get()
		if err != nil {
			return 0, fmt.Errorf("failed to get last UID: %w", err)
		}
		if len(val) == 0 {
			assignedUID = 1 // Start each sequence at 1
		} else {
			lastUID, err := strconv.ParseUint(string(val), 10, 32)
			if err != nil {
				return 0, fmt.Errorf("failed to parse last UID: %w", err)
			}

			// If we have exhausted this sequence, pick a new random sequence
			if lastUID &gt;= 0xFFFFFFFF {
				continue
			}

			assignedUID = uint32(lastUID) + 1
		}
	}

	// If we failed to find a sequence after 5 tries, return an error
	if assignedUID == 0 {
		return 0, fmt.Errorf("failed to allocate new UID after 5 attempts")
	}

	// Assemble the 64-bit UID from the sequence ID and assigned UID
	newUID := (uint64(sequenceNum) &lt;&lt; 32) | uint64(assignedUID)

	// Store the assigned UID back to the sequence key for the next allocation
	tx.Set(fdb.Key(sequenceKey), []byte(strconv.FormatUint(uint64(assignedUID), 10)))

	// Return the full 64-bit UID
	return newUID, nil
}
</code></pre>
<p>And there we go! We can now intern billions of strings per second with little to no contention in a distributed system while completely avoiding collisions and making full use of our keyspace!</p>
<h2>Conclusion</h2>
<p>Often times when designing distributed systems, patterns and strategies you see in seemingly unrelated libraries can inspire an elegant solution to the problem at hand.</p>
<p>In the case of distributed, high-throughput string interning, horizontal scaling can be achieved by breaking up one large keyspace that requires strict coordination into billions of smaller keyspaces that can be randomly load-balanced across.</p>
<p>Both patterns used in this technique are present elsewhere:</p>
<ul> <li>Breaking up a large keyspace into a bunch of smaller keyspaces is present in Roaring Bitmaps (among other systems)</li> <li>Letting randomness and large numbers spread out resource contention is present in many load balancing systems</li> </ul>
<p>This is one of my favorite parts of growing as an engineer: the more systems and strategies you familiarize yourself with, the more material you have to draw from when designing something new.</p>
<h2>Personal News</h2>
<p>A bit of personal news for y’all if you made it this far.</p>
<p>Today is my last day as a member of the Bluesky team!</p>
<p>The past 2+ years building out Bluesky’s Infrastructure and Platform team and scaling Bluesky from 100,000 -&gt; 40,000,000 users have been the most intense and rewarding years of my life.</p>
<p>I don’t have the words to express how much I’ve valued my time on the team and how much I care for the people I’ve worked with in what feels like a decade of real time.</p>
<p>I’ve got some new adventures ahead and am excited to be embarking on a new journey within the next month (still building large-scale infrastructure, don’t worry).</p>
<p>I plan to continue being involved in the AT Proto Community and to contribute to some cool projects other folks on the Bluesky team are working on from the FOSS space (like <a href="https://github.com/bluesky-social/kvdb">KVDB</a>).</p>
<p>To the team, I wish you all the best and will dearly miss getting to work with you all every day, but nothing lasts forever and I will always cherish the time I got to spend building an incredible platform with incredible people.</p>
<p>If you’re interested in joining a world-class team doing important work, check out Bluesky’s open job listings <a href="https://bsky.social/about/join">here</a>.</p>
<p>There should be a new role opening up for a seasoned Go Engineer on the Platform team soon!</p>
