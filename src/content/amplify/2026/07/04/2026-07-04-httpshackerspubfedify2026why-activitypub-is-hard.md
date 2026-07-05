---
author: Fedify
cover_image: 'https://hackers.pub/@fedify/2026/why-activitypub-is-hard/ogimage'
date: '2026-07-04T12:24:57.201Z'
dateFolder: 2026/07/04
description: >-
  Implementing the ActivityPub protocol from scratch introduces massive
  technical hurdles, including fragmented signature standards, unpredictable
  JSON-LD document variations, complex distributed systems engineering, and
  critical security vulnerabilities. Developers frequently encounter silent
  failures like out-of-order message deliveries that cause permanently orphaned
  posts, undocumented platform-specific interoperability quirks, and exposure to
  server-side request forgery. Fedify, a TypeScript framework compatible with
  Deno, Node.js, and Bun, abstracts these exhausting complexities by automating
  multi-spec HTTP signatures, normalizing highly variable document shapes into
  typed immutable classes, and offering robust queue management with guaranteed
  ordered delivery. By handling the delicate details of federation, including
  secure-by-default network routing and extensive developer tooling, the library
  allows creators to focus on building actual products. This post demonstrates
  how shifting the burden of low-level protocol compliance to a specialized
  framework enables developers to build secure, highly interoperable federated
  applications with minimal effort.
isBasedOn: 'https://hackers.pub/@fedify/2026/why-activitypub-is-hard'
link: 'https://hackers.pub/@fedify/2026/why-activitypub-is-hard'
slug: 2026-07-04-httpshackerspubfedify2026why-activitypub-is-hard
tags:
  - tech
  - decentralization
title: 'Why implementing ActivityPub is hard, and why it doesn''t have to be'
---
<figure><a href="https://hackers.pub/@fedify"><img src="https://media.hackers.pub/media/71cdbfc8c4c2969f0e2b5cd26d60632ead13d79d944dbd846bd547f3bfae6d04.webp"/></a></figure>
<figure><a href="https://hackers.pub/@hongminhee"><img src="https://media.hackers.pub/avatars/7df26108-523c-4104-906b-e568d0792e5d.jpg"/></a></figure>
<p>Table of contents</p>
<h2>A quiet failure </h2>
<p>Picture the moment your server sends its first <code>Follow</code> activity to Mastodon. You read the spec, built the JSON, signed the HTTP request, and <code>POST</code>ed it with care. What comes back is a single line: <code>401 Unauthorized</code>. No body. No explanation.</p>
<p>What went wrong? Maybe the clock behind your <code>Date</code> header drifted a few minutes. Maybe the hash in your <code>Digest</code> header is off. Maybe you uppercased the <code>(request-target)</code> pseudo-header while building the signing string, or published your public key as PEM where the other side wanted multibase. The remote server won't tell you. So you start reading someone else's server code to debug your own.</p>
<p>I know, because I've been there. Fedify began as a casualty of another project. I set out to build a single-user microblogging server, the one that would later become Hollo, and started implementing ActivityPub from scratch. Somewhere between the signature specs and the JSON-LD, the protocol work swallowed the product, and I put the whole thing down. What I picked back up wasn't the app. It was the framework the app should have had. Fedify shipped first; only then could Hollo exist, built on top of it. (I've told this story at more length in <a href="https://writings.hongminhee.org/2024/12/a-year-with-the-fediverse/"><em>A year with the fediverse</em></a>.)</p>
<p>ActivityPub development gets hard in a few very specific places. In this post I want to walk through five of them, then show what each one looks like with Fedify. If you've spent time in the fediverse, you'll probably nod along. If you haven't, you may wonder why anyone would do all of this by hand. Either way, the conclusion is the same: nobody has to anymore.</p>
<h2>Five scenes </h2>
<h3>Scene 1: there is more than one standard </h3>
<p>ActivityPub servers authenticate each other with HTTP signatures. Except there isn't one signature spec. Most of the fediverse runs on <a href="https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-12">draft-cavage-http-signatures-12</a>, an <em>expired draft that never became a standard</em>. The actual standard exists too: <a href="https://www.rfc-editor.org/rfc/rfc9421">RFC 9421</a>, HTTP Message Signatures. The problem is that you can't know which one a given server accepts <em>until you try</em>.</p>
<p>A real-world implementation therefore has to sign with one spec, see whether it gets rejected, re-sign with the other, and remember per server which one worked so it can skip the dance next time. The fediverse calls this <a href="https://swicg.github.io/activitypub-http-signature/#how-to-upgrade-supported-versions">double-knocking</a>. Yes, you get to implement it yourself.</p>
<p>That's still not the end. HTTP signatures only prove who sent a request. For situations like inbox forwarding, where you relay an activity you received to a third party, you need signatures that live on the document itself: <a href="https://web.archive.org/web/20170923124140/https://w3c-dvcg.github.io/ld-signatures/">Linked Data Signatures</a> and <a href="https://w3id.org/fep/8b32">Object Integrity Proofs</a>. Four signature mechanisms in total, and two kinds of keys to manage: RSA and Ed25519.</p>
<h3>Scene 2: one document, many shapes </h3>
<p>ActivityPub's wire format is <a href="https://json-ld.org/">JSON-LD</a>, and in JSON-LD the same document can take many shapes. This is easier to show than to explain. Here is a <code>Create</code> activity one server might send:</p>
<pre><code>{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Create",
  "actor": "https://example.com/users/alice",
  "to": "https://www.w3.org/ns/activitystreams#Public",
  "object": {
    "type": "Note",
    "id": "https://example.com/notes/123",
    "content": "Hello, fediverse!"
  }
}</code></pre>
<p>And here is a <em>semantically identical</em> activity from another server:</p>
<pre><code>{
  "@context": ["https://www.w3.org/ns/activitystreams"],
  "type": "Create",
  "actor": {
    "type": "Person",
    "id": "https://example.com/users/alice",
    "preferredUsername": "alice"
  },
  "to": ["as:Public"],
  "object": "https://example.com/notes/123"
}</code></pre>
<p><code>actor</code> turned from a URI string into an inline object. <code>to</code> turned from a string into an array. <code>object</code> went the other way, from an inline object to a URI. Even the address that means “public” has three valid spellings: <code>https://www.w3.org/ns/activitystreams#Public</code>, <code>as:Public</code>, and plain <code>Public</code>. Your parser has to accept every combination, and which one arrives depends on the sender's implementation.</p>
<p>The spec-compliant answer is to normalize every document with a JSON-LD processor, expansion followed by compaction. In practice many implementations treat it all as “just JSON” and quietly break on whatever shape some server happens to emit. Either way, you end up with defensive code smeared across the whole codebase: is this a string? An array? An object? A URI I have to fetch?</p>
<p>A user publishes a post, spots a typo, and deletes it right away. Your server sends a <code>Create</code>, then a <code>Delete</code>. Thanks to network weather, some receiving server gets the <code>Delete</code> first and the <code>Create</code> second. It ignores the deletion of a post that doesn't exist yet, then dutifully processes the creation of a post that was already deleted. That post now lives on that server <em>forever</em>, while its author believes it's gone.</p>
<p>Then there's scale. With five thousand followers, one post means thousands of HTTP deliveries. Do that inline in the request handler and your publish button takes half a minute to respond, or the server falls over. Fine, use a queue. Deliveries fail, so retry them. On what schedule? Exponential backoff. How many times? And is a <code>500 Internal Server Error</code> the same kind of failure as a <code>410 Gone</code>? When do you clean up three thousand followers on a server that no longer exists? Should you keep hammering a host that has been down for days?</p>
<p>At some point it dawns on you that this is no longer protocol implementation. It's distributed systems engineering.</p>
<h3>Scene 4: it's not a spec, it's an ecosystem </h3>
<p>Even perfect spec compliance doesn't buy you interoperability. A few examples from the field:</p>
<ul> <li>Mastodon's secure mode requires HTTP signatures on <code>GET</code> requests too (so-called <a href="https://swicg.github.io/activitypub-http-signature/#authorized-fetch">authorized fetch</a>). Now suppose both servers run in that mode. To fetch the other side's public key you must sign your request; to verify your signature, the other side must first fetch <em>your</em> key. Deadlock. The community's workaround is to sign with an “instance actor” that represents the server itself. You won't find that in the spec.</li> <li>Threads can't parse activities whose actor is embedded as an inline object. When sending to Threads, the actor has to be a URI.</li> <li>Lemmy <em>silently</em> rejects <code>Group</code> actors that lack fields Mastodon never asks for, such as a moderators collection linked via <code>attributedTo</code> and a <code>featured</code> collection.</li> <li>Misskey carries vocabulary extensions of its own; quote posts alone go by three different property names across implementations.</li> </ul>
<p>The list keeps growing. Interoperability here is not something you finish once and stop thinking about. It's maintenance, forever.</p>
<h3>Scene 5: insecure by default </h3>
<p>Build it from scratch, and you start out wide open. Skip signature verification on incoming activities and anyone can inject a forged <code>Follow</code> or <code>Delete</code>. Leave the document loader unrestricted and a malicious activity can point it at <code>http://169.254.169.254/</code> or your internal network, turning your server into an SSRF proxy. Skip origin checks on embedded objects and any server can hand out a document claiming “here's what the Mastodon lead developer said.”</p>
<p>What these traps share is that <em>nothing happens</em> when you fall into them. Everything appears to work. Until someone exploits it.</p>
<h3>Ghost ran into this too </h3>
<p>If you're thinking “surely our team would manage,” consider Ghost: a leading open-source publishing platform used by thousands of journalists and creators, and a team that set out to build its own ActivityPub support.</p>
<blockquote> <p>We can definitely attest to the problems that Fedify is working hard to solve, because even in just a few weeks of early prototyping we were running into the issues described above right away.</p> </blockquote>
<p>Ghost ended up building its ActivityPub layer on Fedify.</p>
<h2>So I put all of it in a framework </h2>
<p>and the standards around it. It runs on Deno, Node.js, and Bun, and supports edge runtimes like Cloudflare Workers. The design goal hasn't changed since the beginning: keep everything in those five scenes out of application code.</p>
<p>Here are the same five scenes again, this time with Fedify.</p>
<h3>Scene 1, revisited: the signature war is the framework's job </h3>
<p>Here is everything it takes to put one actor on the fediverse:</p>
<pre><code>import { createFederation, generateCryptoKeyPair, MemoryKvStore } from "@fedify/fedify";
import { Endpoints, Person } from "@fedify/vocab";

const federation = createFederation&lt;void&gt;({
  kv: new MemoryKvStore(),  // Swap for Redis, PostgreSQL, etc. in production
});

federation
  .setActorDispatcher("/users/{identifier}", async (ctx, identifier) =&gt; {
    if (identifier !== "alice") return null;
    const keyPairs = await ctx.getActorKeyPairs(identifier);
    return new Person({
      id: ctx.getActorUri(identifier),
      preferredUsername: identifier,
      name: "Alice",
      inbox: ctx.getInboxUri(identifier),
      endpoints: new Endpoints({ sharedInbox: ctx.getInboxUri() }),
      publicKey: keyPairs[0].cryptographicKey,
      assertionMethods: keyPairs.map((keyPair) =&gt; keyPair.multikey),
    });
  })
  .setKeyPairsDispatcher(async (ctx, identifier) =&gt; {
    // In real code you'd persist these in a database; this shows the gist
    return [await generateCryptoKeyPair()];
  });</code></pre>
<p>The moment this code runs:</p>
<ul> <li>Every outgoing request gets signed. With an RSA key, Fedify emits HTTP Signatures and Linked Data Signatures; add an Ed25519 key and it attaches Object Integrity Proofs as well. All four mechanisms coexist on a single activity, and each receiver verifies with the strongest one it understands.</li> <li><a href="https://fedify.dev/manual/send#double-knocking-http-signatures">Fedify does the double-knocking for you</a>: first contact goes out as RFC 9421, a rejection triggers a draft-cavage retry, and the winning spec is cached per server. If the rejection carries an <a href="https://fedify.dev/manual/send#accept-signature-negotiation"><code>Accept-Signature</code> challenge</a> (RFC 9421 §5), Fedify reads it and re-signs with exactly the components the server asked for.</li> <li><a href="https://fedify.dev/manual/inbox">Incoming signatures are verified before your code sees anything</a>. An activity that fails verification never reaches your listeners.</li> <li>One bonus. Because you <a href="https://fedify.dev/manual/actor">registered an actor dispatcher</a>, you now have a WebFinger (<a href="https://datatracker.ietf.org/doc/html/rfc7033">RFC 7033</a>) server, <em>for free</em>. Type <code>@alice@example.com</code> into Mastodon's search box and your actor comes up. You never wrote a line of WebFinger code.</li> </ul>
<h3>Scene 2, revisited: types instead of JSON-LD </h3>
<p>Fedify ships <a href="https://fedify.dev/manual/vocab">about eighty classes</a> covering the whole <a href="https://www.w3.org/TR/activitystreams-vocabulary/">Activity Vocabulary</a> plus the major vendor extensions. The classes are typed and immutable, and their accessors absorb the shape differences that JSON-LD allows.</p>
<pre><code>const actor = await ctx.lookupObject("@hongminhee@hollo.social");
if (actor instanceof Person) {
  console.log(actor.name);           // Safe whether it's a string or langString
  const followers = await actor.getFollowers();  // Fetches a URI, unwraps an object
}</code></pre>
<p><a href="https://fedify.dev/manual/vocab#looking-up-remote-objects"><code>lookupObject()</code></a> takes a handle and runs the whole chain for you, WebFinger discovery included. Accessors like <code>getFollowers()</code> <a href="https://fedify.dev/manual/vocab#object-ids-and-remote-objects">behave the same way</a> whether the value is a URI reference or an inline object, and fetched values are cached.</p>
<p>Vendor fragmentation gets stitched up here too. The three competing quote properties (<code>quoteUri</code>, <code>_misskey_quote</code>, <code>quoteUrl</code>) are unified behind one API, next to the emerging <a href="https://w3id.org/fep/044f">FEP-044f</a> <code>quote</code>. Misskey's <code>isCat</code> property exists as a type, so your server can determine cat-ness with full type safety. It sounds like a joke, but a few dozen details of exactly this kind are what interoperability is actually made of.</p>
<h3>Scene 3, revisited: the zombie post dies in one line </h3>
<p>Delivery infrastructure first. Plug a message queue into <code>createFederation()</code> and delivery moves to the background, with automatic retries under exponential backoff (up to ten attempts by default). When a post goes to thousands of followers, <a href="https://fedify.dev/manual/send#optimizing-activity-delivery-for-large-audiences">two-stage fan-out</a> kicks in: a single consolidated message enters the queue, and a background worker splits it into per-server delivery tasks. The publish button responds immediately.</p>
<p>Retries create a problem of their own: the same activity can arrive twice. Fedify keeps a 24-hour <a href="https://fedify.dev/manual/inbox#activity-idempotency">idempotence cache</a> of processed activities, so duplicates get detected and skipped before they reach your handlers.</p>
<p>As for the zombie post, the fix is one option:</p>
<pre><code>await ctx.sendActivity(
  { identifier: "alice" },
  "followers",           // Collects recipients from your followers collection
  deleteActivity,
  { orderingKey: post.id },  // Same key = in-order delivery per server
);</code></pre>
<p><a href="https://fedify.dev/manual/send#ensuring-ordered-delivery">Activities that share an <code>orderingKey</code></a> are delivered to each receiving server in the order they were sent. A <code>Delete</code> can no longer overtake its <code>Create</code>. Activities with different keys still go out in parallel, so throughput survives.</p>
<p>Fedify also handles dead servers. On a <code>404 Not Found</code> or <code>410 Gone</code>, it stops retrying and calls <a href="https://fedify.dev/manual/send#permanent-delivery-failure-handling">a handler you register</a>. If the delivery went to a shared inbox, you also get the list of followers behind it, so you can prune vanished accounts on the spot. Hosts that fail repeatedly trip a per-host <a href="https://fedify.dev/manual/circuit-breaker">circuit breaker</a> that holds deliveries and probes periodically until the host recovers. It's on by default; there's nothing to configure.</p>
<h3>Scene 4, revisited: we track the quirks so you don't </h3>
<p>Here is how Fedify disarms the traps from scene 4:</p>
<ul> <li>Authorized fetch: chain <a href="https://fedify.dev/manual/access-control"><code>.authorize()</code></a> onto a dispatcher and the verified identity of the requester lands in your callback. Blocklists, private collections, whatever your app needs is plain application logic. The instance-actor deadlock has a supported pattern as well.</li> <li>Threads and inline actors: an <a href="https://fedify.dev/manual/send#activity-transformers">activity transformer</a>, enabled by default, rewrites inline actors into URIs on the way out. You don't need to know Threads has this problem.</li> <li>Lemmy's requirements: the <a href="https://fedify.dev/manual/collections#custom-collections">custom collection API</a> exposes a moderators collection in a few lines, and Lemmy's JSON-LD context ships preloaded.</li> </ul>
<p>When a new quirk surfaces in the wild, the fix lands in Fedify, not in every application separately. Each interoperability lesson gets learned once.</p>
<h3>Scene 5, revisited: becoming unsafe takes effort </h3>
<p>Fedify's defaults point the other way.</p>
<ul> <li>Signature verification is something you turn <em>off</em> (for tests), not something you remember to turn on.</li> <li>The document loader refuses private address ranges and loopback out of the box, with DNS rebinding accounted for. To open yourself up to SSRF you have to flip an option whose very name announces it's for testing.</li> <li>When an embedded object's origin differs from its parent document's, <a href="https://fedify.dev/manual/vocab#origin-based-security-model">the accessor refuses to trust it and re-fetches from the source</a> (based on <a href="https://w3id.org/fep/fe34">FEP-fe34</a>). Content spoofing is stopped at the property access level.</li> </ul>
<p>In a from-scratch implementation, you have to keep remembering to do things safely. In Fedify, the unsafe path is the one that takes deliberate effort. For a federated server, with its tangle of trust boundaries, that's the right way around.</p>
<h2>Your stack stays your stack </h2>
<p>“Fine, but what if it doesn't fit our stack?” Fedify was built to fit the stack you already have. There are <a href="https://fedify.dev/manual/integration">thirteen web framework integrations</a>: servers like Express, Hono, Fastify, Koa, NestJS, and Elysia, and meta-frameworks like Next.js, Nuxt, SvelteKit, Astro, SolidStart, and Fresh. Middleware handles content negotiation, so the same URL in your existing app serves HTML to browsers and JSON-LD to the fediverse.</p>
<p>Fedify doesn't dictate your database either. For its own storage it asks for <a href="https://fedify.dev/manual/kv">one key–value interface</a>, with seven adapters available (Redis, PostgreSQL, MySQL/MariaDB, SQLite, Deno KV, Cloudflare Workers KV, in-memory). <a href="https://fedify.dev/manual/mq">Message queues</a> come in eight flavors (PostgreSQL, Redis, AMQP/RabbitMQ, and so on), and you can implement the interface yourself if none fits. Your domain data stays in whatever database and ORM you already use.</p>
<p>Already running federation on another library? There are <a href="https://fedify.dev/manual/migrate">migration guides</a> with data migration scripts for moving from activitypub-express and friends without losing your existing followers.</p>
<p>The core isn't the ceiling, either. Higher-level packages build on it: <a href="https://fedify.dev/manual/relay"><code>@fedify/relay</code></a> gives you a complete ActivityPub relay server in a single function call, and <a href="https://fedify.dev/manual/backfill"><code>@fedify/backfill</code></a> reconstructs incomplete conversation threads by walking the rest of the fediverse for you.</p>
<h2>Tools for the whole development loop </h2>
<p>A quieter misery of federated development has always been the missing tooling. Fedify comes with tools for every stage of the loop.</p>
<p><a href="https://fedify.dev/cli"><code>fedify init</code></a> scaffolds a project in one line, and <code>fedify tunnel</code> exposes your local server over HTTPS so you can test against real Mastodon. Activities your server sends can be received by <code>fedify inbox</code>, a disposable inbox server spun up on the spot; whatever other servers publish, you can inspect with <code>fedify lookup</code>. My personal favorite is <code>fedify lookup --authorized-fetch</code>, which generates a one-off key pair and stands up a temporary ActivityPub server just to make a signed request for an object behind secure mode. The CLI is also useful to ActivityPub developers who don't use Fedify at all.</p>
<p>While you write code, an <a href="https://fedify.dev/manual/lint">ActivityPub-specific linter</a> (<code>@fedify/lint</code>) catches twenty kinds of interoperability bugs, like an actor missing its <code>inbox</code>. Tests run without the network using mocks from <a href="https://fedify.dev/manual/test"><code>@fedify/testing</code></a>. Once the server is up, attach the <a href="https://fedify.dev/manual/debug">debug dashboard</a> (<code>@fedify/debugger</code>) with one line and watch activities and signature verification results in your browser, live. In production there's <a href="https://fedify.dev/manual/opentelemetry">built-in OpenTelemetry instrumentation</a> (28 span types, 37 metrics) plus a <a href="https://fedify.dev/manual/monitoring">monitoring guide</a>, and when performance matters, <a href="https://fedify.dev/manual/benchmarking"><code>fedify bench</code></a>, a load-testing tool built for ActivityPub, catches regressions in CI.</p>
<p>As far as I know, no other ActivityPub framework ships even one of the tools in this section.</p>
<p>The documentation is part of the tooling. The <a href="https://fedify.dev/">official docs</a> run to a thirty-chapter manual and five tutorials, and they go well past API listings. There's an operations chapter with ready-made PromQL queries and alerting rules for watching your queue backlog, and a <a href="https://fedify.dev/manual/pragmatics">field-guide chapter</a> that documents de facto conventions, like which property makes your avatar show up in Mastodon, with screenshots. At two in the morning, when federation is broken and you don't know why, this is the difference between a bad night and a short one.</p>
<h2>It's already running </h2>
<p>Fedify is not a thought experiment. Ghost's ActivityPub service, mentioned above, is built on it. So are Encyclia, which bridges ORCID researcher records into the fediverse; SiliconBeest, running serverless on Cloudflare Workers; Typo Blue, a Korean blogging platform; Hollo, my own single-user microblogging platform; and Hackers' Pub, run by its community. Hollo, by the way, is the app from the beginning of this post: the project I once had to shelve, finished at last on the framework it forced into existence.</p>
<p>The tutorials give a concrete sense of scale. They walk you from <a href="https://fedify.dev/tutorial/basics">a single-file server, a few dozen lines, that Mastodon can follow</a>, through <a href="https://fedify.dev/tutorial/content-sharing">an image sharing service in roughly 750 lines that fully interoperates with Pixelfed (follows, likes, comments)</a>, up to <a href="https://fedify.dev/tutorial/threadiverse">a community platform federating both ways with the real lemmy.ml</a>.</p>
<p>I didn't build Fedify to mint more ActivityPub experts. Rather the opposite. I believe the fediverse will only grow beyond microblogging when developers can build federated apps <em>without</em> knowing ActivityPub's fine print. Signature spec transitions and JSON-LD compaction are problems that belong inside a framework, not barriers in front of someone with a new idea.</p>
<p>Starting takes one line:</p>
<p>Follow the first tutorial and by the end, Mastodon can find your server. If you get stuck, come find us in the <a href="https://matrix.to/#/#fedify:matrix.org">Matrix room</a> or <a href="https://github.com/fedify-dev/fedify/discussions">GitHub Discussions</a>. See you in the fediverse.</p>
<h2>0 comments</h2>
<p>If you have a fediverse account, you can reply to this article from your own instance. Search https://hackers.pub/ap/articles/019f2798-7749-7c7b-aaa9-7a70b7dadb4c on your instance and reply to it.</p>
