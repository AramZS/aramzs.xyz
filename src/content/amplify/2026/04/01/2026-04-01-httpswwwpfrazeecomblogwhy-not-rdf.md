---
author: Paul Frazee
cover_image: null
date: '2026-04-02T01:45:49.858Z'
dateFolder: 2026/04/01
description: >-
  Today in "our novel form of NIH," why did Bluesky create a new schema
  language, Lexicon, for the AT Protocol?
isBasedOn: 'https://www.pfrazee.com/blog/why-not-rdf'
link: 'https://www.pfrazee.com/blog/why-not-rdf'
slug: 2026-04-01-httpswwwpfrazeecomblogwhy-not-rdf
tags:
  - code
title: Why not RDF in the AT Protocol?
---
<p>It's a good idea to jot down a couple of notes on our decision-making at Bluesky. These notes won't be extensive.</p>
<p>Also in this series:</p>
<ul><li><a href="https://www.pfrazee.com/blog/why-facets">Why RichText facets in Bluesky</a>.</li></ul>
<h2>Identifying data</h2>
<p>How do you know, when you see a piece of JSON, that it's supposed to be a microblog post?</p>
<figure><img alt="A piece of JSON is a post?" data-nimg="1" src="https://www.pfrazee.com/_next/image?url=%2Fstatic%2Fimages%2Fwhy-not-rdf%2Fjson-equals-post.png&amp;w=2048&amp;q=75" srcset="/_next/image?url=%2Fstatic%2Fimages%2Fwhy-not-rdf%2Fjson-equals-post.png&amp;w=1080&amp;q=75 1x, /_next/image?url=%2Fstatic%2Fimages%2Fwhy-not-rdf%2Fjson-equals-post.png&amp;w=2048&amp;q=75 2x"/><figcaption>A piece of JSON is a post?</figcaption></figure>
<p>In traditional client-server apps, you know from the server documentation. The <code>/api/getPost</code> route is documented to return a post.</p>
<p>When you get into multi-vendor scenarios, this model stops working as cleanly. One server may have the <code>/api/getPost</code> route. Another might have the <code>/api/posts/:id</code> route. There may also be differences in how the servers model the post.</p>
<p>This is a problem of semantic and schematic agreement.</p>
<ul><li><strong>Semantic</strong>: what names do we use to identify the types of data.</li><li><strong>Schematic</strong>: how do we model the data — or more simply, what fields do we expect and how do we expect them to be defined?</li></ul>
<h2>The common answer: RDF</h2>
<p>RDF was invented to solve these kinds of problems<sup>1</sup>. You can see it used in ActivityPub, DIDs, Verifiable Credentials, SOLID, and a variety of other protocols designed for multi-vendor environments.</p>
<p>RDF uses an elegant model of graph triples. Everything gets distilled down into nodes and edges between those nodes.</p>
<p>Suppose you run a <code>GET pfrazee.com</code> request and you get this JSON:</p>
<pre><code>// the output of pfrazee.com
{
  name: "Paul Frazee",
  job: "Programmer"
}
</code></pre>
<p>In the graph model, you'd model it like this:</p>
<pre><code>pfrazee.com --[name]--&gt; "Paul Frazee"
pfrazee.com --[job]--&gt; "Programmer"
</code></pre>
<p>RDF then adds a global identifiers. Instead of an ambiguous short word such as "name," it uses a full URI so our graph would look more like this:</p>
<pre><code>pfrazee.com --[schemas.com/name]--&gt; "Paul Frazee"
pfrazee.com --[schemas.com/job]--&gt; "Programmer"
</code></pre>
<p>There's no ambiguity because we're relying on the global namespace of DNS.</p>
<p>This solves the semantic question. We never have any questions about what type of data we're looking at.</p>
<p>This also <em>half</em> solves the schematic question because the edges can define the expected value types for the target nodes.</p>
<p>However, because these definitions are per-field, there are some additional work that's necessary to establish the schema in the full "document" sense. If it is important that pfrazee.com output both <code>schemas.com/name</code> and <code>schemas.com/job</code>, then you need to use additional systems inside RDF such as <a href="https://en.wikipedia.org/wiki/SHACL">SHACL</a>.</p>
<h2>Why not RDF?</h2>
<p>RDF is notorious for having a bad developer experience. While it is conceptually elegant, the heavy use of URIs inside the data model clutters a lot of the code.</p>
<p>Even with syntax is designed to simplify the data, it can be verbose and difficult to understand. JSON-LD and <a href="https://en.wikipedia.org/wiki/Turtle_(syntax)">Turtle</a> are two examples of this. Most people <a href="https://paulfrazee.medium.com/pauls-notes-on-how-json-ld-works-965732ea559d">think they understand JSON-LD but they do not</a>.</p>
<p>I think it's fair to say that you can model two separate systems correctly without preplanning thanks to the generality of RDF. However, very few systems natively use a graph model and programmers are not often familiar with it<sup>2</sup>. The closest mainstream technology might be GraphQL.</p>
<p>I looked very closely at RDF during the AT Proto's initial design phase. One of the initial drafts for our schema system was based on RDF.</p>
<p>My belief is that a highly opinionated language (akin to Turtle or JSON-LD) which drops some of the features of RDF in favor of a more concise language could actually be effective. I ran out of time while exploring this option, and in the interest of pragmatism turned toward other foundations.</p>
<p>In particular, I believe that a document-oriented model is more intuitive for software engineers. The request/response bodies of HTTP and RPC systems are documents. Moreover, ATProto's data model is fundamentally a document store. Therefore, a document-oriented model seemed to be the best choice.</p>
<h2>JSON-Schema with namespaces</h2>
<p>The second draft of our schema system used JSON-schema, which did not solve any semantic concerns but does solve all of the schematic ones.</p>
<p>To solve the semantic element, we introduced the notion of a namespaced identifier (NSID) which is simply a form of reverse-DNS.</p>
<p>We chose reverse-DNS to strongly indicate that a data type was being identified and not a resource.<sup>3</sup></p>
<p>For a time, JSON-schema with NSIDs was the entire schema system, but we found ourselves struggling to achieve all of our goals.</p>
<ul><li><strong>Correctness</strong>. In a highly distributed and multi-vendor system, it needs to be easy to maintain agreement on API contracts and data schemas.</li><li><strong>Ease of use</strong>. The schema language needs to be approachable, and it needs to be possible to create convenient tooling for &amp; from the schemas.</li><li><strong>Evolvability</strong>. The language needs to support changes to the schemas, including from third-parties who are looking to extend the core behavior.</li><li><strong>Specificity</strong>. We should aim to eliminate ambiguity about behaviors, even when developers are not in contact with each other.</li></ul>
<p>In a decentralized system, a great deal comes down to communication between parties who do not meet each other. Compatibility is a social question, and the tooling needs to help.</p>
<p>Developers have to predict how each other's software is going to behave. You need to know that whenever you add a new field, you're not going to introduce bugs in other people's software (and visa-versa). Everybody needs to have strong guarantees about how the network will operate in practice so that you can be comfortable writing your own software.</p>
<h2>Lexicon</h2>
<p>We eventually conceptualized our target as a kind of "d.ts for ATProto" — that is, a type declaration language for all of the interfaces and data-types on the protocol.</p>
<p>We wanted it to translate cleanly into static type systems for generated code, and we wanted runtime validation to be reliable enough that applications would not break due to bad data.</p>
<p>We wanted the validation layer to be expressive enough to include constraints on data (such as string sizes and number ranges).</p>
<p>Lastly, we wanted to address evolvability of the data as it relates to forwards/backwards compatibility as well as the introduction of new behaviors from outside of the original schema authors.</p>
<p>Here's what a declaration looks like:</p>
<p>If you're typescript-minded, you might conceptualize this data model as follows:</p>
<p>You'll notice that types can be referenced, which is extremely helpful for re-use.</p>
<p>In fact, there's a "union" type which enables multiple referenced types to be used.</p>
<p>This translates roughly to the following typescript:</p>
<p>When data is transmitted, it uses the <code>$type</code> field to identify its schema. This resolves the union to one of the specified types.</p>
<h2>Evolvability</h2>
<p>Of the goals stated, evolvability is the interesting one. Using namespaced IDs is somewhat pointless if you can simply define all the schemas in the core protocol spec and call it a day.</p>
<p>What this requires is points of extension. The union (above) ends up being one of the most common extension points, because they're actually "open" unions. That is, the actual definition of the facet schema is more like this:</p>
<p>This means that basically <em>any</em> schema can be used there. The enumerated types are more of a suggestion.</p>
<p>If we wanted to add a hashtag type, we would do so like this:</p>
<p>Past that, the other significant point of evolvability (that's in practice now) is the RPC methods. New ones can be defined, returning new schemas, and so on.</p>
<p>All of this happens within the constraints of maintaining forward and backward compatibility of software that's actually in production, and you can hear more of my thoughts on this in my talk on <a href="https://archive.org/details/27-09-45_schema_negotiation.qt">Schema Negotation</a>.</p>
<h2>Closing thoughts</h2>
<p>This isn't an extensive write-up, but it is a quick view into the thinking behind Lexicon. You should take a look at the <a href="https://atproto.com/specs/lexicon">Lexicon spec</a> if you want to dig a little deeper, and we'll write up plenty more in the future.</p>
<p><sup>1</sup> RDF is sufficiently complicated as a topic that I expect I will have gotten some details wrong here. I apologize if so.</p>
<p><sup>2</sup> Before I get 15 programmers telling me how often they use Neo4j — let's just agree that it's not exactly the most common choice.</p>
<p><sup>3</sup> I wasn't exactly enthusiastic about reverse-DNS but I've come to feel ambivalent about it.</p>
