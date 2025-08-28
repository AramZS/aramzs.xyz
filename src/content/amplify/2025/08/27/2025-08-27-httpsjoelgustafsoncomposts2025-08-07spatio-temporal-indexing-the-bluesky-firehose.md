---
author: Joel Gustafson
cover_image: 'https://joelgustafson.com/og-image.jpg'
date: '2025-08-27T15:37:07.793Z'
dateFolder: 2025/08/27
description: Joel Gustafson
isBasedOn: >-
  https://joelgustafson.com/posts/2025-08-07/spatio-temporal-indexing-the-bluesky-firehose
link: >-
  https://joelgustafson.com/posts/2025-08-07/spatio-temporal-indexing-the-bluesky-firehose
slug: >-
  2025-08-27-httpsjoelgustafsoncomposts2025-08-07spatio-temporal-indexing-the-bluesky-firehose
tags:
  - tech
  - social media
  - decentralization
title: Spatio-temporal indexing the BlueSky firehose
---
<p>I recently added a "spatial feed" to <a href="https://aurora.ndimensional.xyz/">Aurora</a>, my map of Bluesky. Now, in addition to seeing community clusters laid out on a giant map, you can also see a real-time of posts from just the accounts currently in view. This works smoothly at all scales — you can see the most recent posts from the entire network when zoomed all the way out, and local posts from any neighborhood when zoomed in.</p>
<figure><video controls="" playsinline=""> <source src="https://assets.joelgustafson.com/2025-08-07/spatial-feed-demo-1080p.mp4" type="video/mp4"/> </video></figure>
<p>How does this work?</p>
<p>This is actually the first (and only) backend service that I've had to deploy for this project. To compute the clustering and layout for the map, I index the follow graph in a SQLite database that only lives on my home server, do all the data processing locally, and just push static assets to a Cloudflare R2 bucket at the end that the web client fetches directly.</p>
<blockquote> <p>check out my <a href="https://joelgustafson.com/posts/2024-11-12/visualizing-13-million-bluesky-users">previous post</a> about building Aurora using WebGPU and UMAP!</p> </blockquote>
<p>But adding spatial feeds means having the web client make constant queries for post URIs in arbitrary map areas, which it can then "hydrate" into post content from the Bluesky API directly. I didn't want to expose public ports from my home server, so that means deploying a firehose consumer to the cloud.</p>
<p>What does this firehose consumer need to do? It receives a stream of posts via WebSocket from a <a href="https://github.com/bluesky-social/jetstream/tree/main">Jetstream</a> endpoint, and needs to index them in some way that supports <strong>arbitrary spatial queries</strong>.</p>
<p>We can give the indexer access to a local SQLite database with the current map coordinates of each user, which only changes when I release montly snapshots of the map. This means we just need to implement a simple <code>observe</code>/<code>query</code> interface.</p>
<pre><code>type Post = {
  id: number // auto-incrementing rowid from SQLite
  x: number
  y: number
}

type Area = {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

// in-memory cache for spatial queries
class Indexer {
  public constructor(bounds: Area) {
    // ...
  }

  public observe(post: Post): void {
    // ...
  }

  public query(area: Area, limit: number): Post[] {
    // ...
  }
}</code></pre>
<p>Furthermore, we would like the resulting <code>Post[]</code> array to be the most recent posts from that area. It's not that much fun if the feed only some loosely-sorted sampling of recent posts — we want to see things right away as they are posted.</p>
<p>So! We want to query within arbitrary rectangualar areas while simultaneously sorting by time. Clients will hit this query endpoint fairly often. The map has tens of millions of accounts and I expect to index at least tens of millions of posts. I want the feed to refresh quickly, and some quick tests confirmed that the "dumb" approaches were not going to cut it.</p>
<p>It turns out that trying to both filter by 2d space <em>and</em> sort by time is really difficult. For example, I had thought at first that I could just use a 3-dimensional <a href="https://www.sqlite.org/rtree.html">SQLite R-tree</a>, using time as the third axis. That would let us query for posts within arbitrary 3d bounding boxes, but R-trees don't actually let you <em>sort</em> by any of the axes. This doesn't help at all for large query areas covering a huge number of users.</p>
<p>So then what? You could try to make several queries with a 3d R-tree, slicing the time axis by successive intervals until enough posts are found, possibly using the size of the query area to derive an expected density of posts in each time interval. But this seemed unsatisfying, and I didn't want to make something that relied on a "uniform density" assumption that may or may not hold. Surely there's another data structure that can do this more directly?</p>
<p>The <a href="https://en.wikipedia.org/wiki/Priority_search_tree">Priority search tree</a> solves this problem for 1-dimensional key ranges while sorting by a "priority" value. We essentially need to filter by 2-dimensional spatial ranges, plus sorting by a priority value, but priority search trees cannot be naively generalized to higher dimensions. The <a href="https://en.wikipedia.org/wiki/Priority_R-tree">Priority R-tree</a> has a promising name but turns out to be unrelated. <a href="https://github.com/timescale/timescaledb">TimescaleDB</a> supports sophisticated spatio-temporal query patterns, using some complicated table partitioning scheme (??), but I didn't want to pay for a hosted Postgres database in addition to the firehose consumer. I really just want an in-memory index.</p>
<p>A general solution would have been great, but Timescale's architecture seemed to suggest that a straighforward generalization of "sortable R-trees" or "2d Priority search trees" simply does not exist. In a situation like that, your only move is to look for aspects of your specific use case that let you avoid solving the big problem in full generality.</p>
<p>In my case, I don't really need to iterate over <em>all</em> posts in an arbitrary area in chronological order. In fact, I'm going to be garbage-collecting old posts anyway, keeping only the most recent <code>k</code> in every bucket (for some partitioning of the area into buckets). So it's fine if each query is limited to a fixed top-<code>k</code> limit, even global queries over the entire map.</p>
<p>This lets me use a relatively simple custom data structure: a "quadtree of ring buffers".</p>
<p>The first step is building a quadtree over the positions of all the users. Unlike a normal quadtree, where each item always gets its own leaf node, we'll only split nodes once they exceed our capacity <code>k</code>. This gives us a tree whose leaves are our <code>k</code>-buckets that partition the global area, which we will use for garbage collection later.</p>
<p>Just for fun, I decided to write the quadtree-of-ring-buffers as an in-memory data structure in Zig, and expose it to NodeJS as a <a href="https://nodejs.org/api/n-api.html">native NAPI module</a>.</p>
<pre><code>pub const Quadrant = enum(u2) { sw = 0, nw = 1, se = 2, ne = 3 };

pub const NodeId = u32; // zero for empty slot

pub const Node = struct {
	ne: NodeId,
	nw: NodeId,
	sw: NodeId,
	se: NodeId,

	capacity: usize,

	pub inline fn getQuadrant(self: Node, q: Quadrant) NodeID {
		// ...
	}

	pub inline fn isEmpty(self: Node) bool {
		return self.ne == 0 and self.nw == 0 and self.sw == 0 and self.se == 0;
	}

	// ...
};

// represents a square map tile
pub const Tile = struct {
	center: @Vector(2, f32),
	size: f32, // side length of tile

	/// return a child quadrant
	pub fn divide(self: Tile, q: Quadrant) Tile {
		// ...
	}

	/// locate a point within a child quadrant
	pub fn locate(self: Tile, point: @Vector(2, f32)) Quadrant {
		// ...
	}
};

// our quadtree-of-ring-buffers spatio-temporal cache
const QtCache = struct {
	root: Tile, // bounding square for the global map

	// NodeId values are an index into nodes.items.
	// the first element of nodes.items is the root node.
	nodes: std.ArrayList(Node),

	// ...
};</code></pre>
<p>In addition to this capacity number, each quadtree node also has its own buffer for the most recent <code>k</code> posts within its tile area. Since we need to index a constant stream of new posts, we can use a ring buffer to avoid shifting existing contents around.</p>
<pre><code>const std = @import("std");

pub fn RingBuffer(comptime T: type, comptime K: usize) type {
    return struct {
        const Self = @This();

        pub const Ring = struct {
            head: []const T,
            tail: []const T,
        };

        items: [K]T = undefined,
        start: usize = 0,
        len: usize = 0,

        pub fn reset(self: *Self) void {
            self.start = 0;
            self.len = 0;
        }

        pub fn push(self: *Self, item: T) void {
            // ... blah blah blah
        }

        pub fn getRing(self: *const Self) Ring {
            // ... blah blah blah
        }
    };
}</code></pre>
<p>Then we add a ring buffer for posts to each of our quadtree nodes. For each post, we'll store both the post id (a SQLite rowid) and also the x/y coordinates of the user. The rest of the post and user data are persisted in a SQLite database; posts get garbage-collected in the background once they rotate out of the leaf bucket's ring buffer.</p>
<pre><code>pub const PostId = u32;
pub const Post = struct {
    id: PostId,
    position: @Vector(2, f32)

    // these ids are monotonic rowids from SQLite so they trivially sort by time
    pub fn lessThan(_: void, lhs: Post, rhs: Post) bool {
        return lhs.id &lt; rhs.id;
    }
};

const K = 24;

pub const Node = struct {
	// ...

	buffer: RingBuffer(Post, K),
};</code></pre>
<p>This means that inserting a post into the quadtree just involves descending the tree to the appropriate leaf bucket, pushing the post onto each node's buffer along the way.</p>
<pre><code>pub const QtCache = struct {
	// ...

	pub inline fn observe(self: *QtCache, post: Post) void {
		if (self.tree.items.len &gt; 0) {
			self.observeNode(0, self.root, post);
		}
	}

	fn observeNode(self: *QtCache, id: NodeId, tile: Tile, post: Post) void {
		self.tree.items[idx].buffer.push(post);

		const quadrant = tile.locate(post.position);
		const child = self.tree.items[id].getQuadrant(quadrant);
		if (child != 0) {
			self.observeNode(child, tile.divide(quadrant), item);
		}
	}
};</code></pre>
<p>Querying is only a little more complicated. The trivial case is querying an area exactly equal to a quadtree node tile, but in general queries can be any rectangular area. This means we have to traverse all quadtree nodes that intersect the query area, and collect the top-<code>k</code> results in a min-heap as we go. (We don't need to recurse into a node's children if it is entirely contained within the query area.)</p>
<p>First we make a little generic <code>MinHeap</code>...</p>
<pre><code>pub fn MinHeap(comptime T: type, comptime K: usize) type {
    return struct {
        const Self = @This();

        heap: [K]T = undefined,
        size: usize = 0,

        pub fn init() Self {
            // ...
        }

        pub fn clear(self: *Self) void {
            // ...
        }

	    pub fn add(self: *Self, value: T) void {
		    // ...
	    }

		pub inline fn getItems(self: Self) []const T {
			return self.heap[0..self.size];
		}
    };
}</code></pre>
<p>... then we add it to our <code>QtCache</code> and write the recursive <code>queryNode</code>.</p>
<pre><code>const K = 24;

pub const QtCache = struct {
	root: Tile, // bounding square for the global map

	// NodeId values are an index into nodes.items.
	// the first element of nodes.items is the root node.
	nodes: std.ArrayList(Node),

	heap: MinHeap(PostId, K)

	// ...

	pub const Query = struct {
		min: @Vector(2, f32),
		max: @Vector(2, f32),

		/// do the query rectangle and the area tile intersect?
		pub inline fn intersect(self: Query, tile: Tile) bool {
			// ...
		}

		/// does the query rectangle include the point?
		pub inline fn includes(self: Query, p: @Vector(2, f32)) bool {
			// ...
		}
	};

	pub fn query(self: *QtCache, q: Query) []const PostId {
		// use size of the query rectangle to derive a
		// lower bound of quadtree node size.
		// we won't traverse into children below this size.
		const divisor: f32 = 2;
		const unit = @ceil(@log2(@reduce(.Max, q.max - q.min) / divisor));
		const threshold = std.math.pow(f32, 2, unit);

		self.heap.clear();
		self.queryNode(0, self.root, q, s);

		// the top-k posts here aren't actually sorted within
		// themselves since they're in heap order, but we can
		// just sort them on the NodeJS side before resolving
		// the ids to URIs.
		return self.heap.getItems();
	}

	fn queryNode(self: *QtCache, id: NodeId, tile: Tile, q: Query, threshold: f32) void {
		if (!q.intersect(tile)) {
			return;
		}

		const node = self.tree.items[id];
		if (node.isEmpty() or tile.s &lt;= threshold) {
			const ring = node.buffer.getRing();
			for (ring.head) |post|
				if (q.includes(post.position)) self.heap.add(post.id);
			for (ring.tail) |post|
				if (q.includes(post.position)) self.heap.add(post.id);
		} else {
			if (node.ne != 0) self.queryNode(node.ne, tile.divide(.ne), q, threshold);
			if (node.nw != 0) self.queryNode(node.nw, tile.divide(.nw), q, threshold);
			if (node.sw != 0) self.queryNode(node.sw, tile.divide(.sw), q, threshold);
			if (node.se != 0) self.queryNode(node.se, tile.divide(.se), q, threshold);
		}
	}
};</code></pre>
<p>Nice! An in-memory spatio-temporal index! And we actually wrote both <code>observe</code> and <code>query</code> as zero-allocation methods!</p>
<p>I won't go over compiling the quadtree to a native NodeJS module, but you can look at the Zig build configuration in the source repo if you're interested.</p>
<p>I deployed all this to fly.io for ~$10/month, including a persistent volume for the SQLite databases. Bluesky currently generates ~100 posts per second, and the index caches around 10 million total recent posts with less than 1GB total memory usage. Spatial queries from the Aurora web client take just around 1-3ms inside <code>QtCache</code>, dominated by ~12-20ms of network overhead to and from the client.</p>
<p>If your browser supports WebGPU, you can check out the map yourself at <a href="https://aurora.ndimensional.xyz">https://aurora.ndimensional.xyz</a> and pop open the left sidebar to see the spatial feed.</p>
