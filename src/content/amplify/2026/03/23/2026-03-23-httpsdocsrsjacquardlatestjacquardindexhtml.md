---
author: docs.rs
cover_image: ''
date: '2026-03-24T03:51:52.745Z'
dateFolder: 2026/03/23
description: Jacquard
isBasedOn: 'https://docs.rs/jacquard/latest/jacquard/index.html'
link: 'https://docs.rs/jacquard/latest/jacquard/index.html'
slug: 2026-03-23-httpsdocsrsjacquardlatestjacquardindexhtml
tags:
  - code
  - social media
  - decentralization
title: Jacquard
---
<p>A suite of Rust crates intended to make it much easier to get started with atproto development, without sacrificing flexibility or performance.</p>
<p><a href="https://whtwnd.com/nonbinary.computer/3m33efvsylz2s">Jacquard is simpler</a> because it is designed in a way which makes things simple that almost every other atproto library seems to make difficult.</p>
<p>It is also designed around zero-copy/borrowed deserialization: types like <a href="https://docs.rs/jacquard-api/latest/jacquard_api/app_bsky/feed/post/struct.Post.html"><code>Post&lt;'_&gt;</code></a> can borrow data (via the <a href="https://docs.rs/jacquard/latest/jacquard/cowstr/enum.CowStr.html"><code>CowStr&lt;'_&gt;</code></a> type and a host of other types built on top of it) directly from the response buffer instead of allocating owned copies. Owned versions are themselves mostly inlined or reference-counted pointers and are therefore still quite efficient. The <code>IntoStatic</code> trait (which is derivable) makes it easy to get an owned version and avoid worrying about lifetimes.</p>
<h3>Features</h3>
<ul> <li>Validated, spec-compliant, easy to work with, and performant baseline types</li> <li>Designed such that you can just work with generated API bindings easily</li> <li>Straightforward OAuth</li> <li>Server-side convenience features</li> <li>Lexicon Data value type for working with unknown atproto data (dag-cbor or json)</li> <li>An order of magnitude less boilerplate than some existing crates</li> <li>Batteries-included, but easily replaceable batteries. <ul> <li>Easy to extend with custom lexicons using code generation or handwritten api types</li> <li>Stateless options (or options where you handle the state) for rolling your own</li> <li>All the building blocks of the convenient abstractions are available</li> <li>Use as much or as little from the crates as you need</li> </ul> </li> </ul>
<h3>Example</h3>
<p>Dead simple API client: login with OAuth, then fetch the latest 5 posts.</p>
<pre><code>use jacquard::api::app_bsky::feed::get_timeline::GetTimeline;
use jacquard::client::{Agent, FileAuthStore};
use jacquard::oauth::client::OAuthClient;
use jacquard::xrpc::XrpcClient;
use jacquard::oauth::types::AuthorizeOptions;
use jacquard::oauth::loopback::LoopbackConfig;

#[tokio::main]
async fn main() -&gt; miette::Result&lt;()&gt; {
    let args = Args::parse();

    // Build an OAuth client with file-backed auth store and default localhost config
    let oauth = OAuthClient::with_default_config(FileAuthStore::new(&amp;args.store));
    // Authenticate with a PDS, using a loopback server to handle the callback flow
    let session = oauth
       .login_with_local_server(
           args.input.clone(),
           AuthorizeOptions::default(),
           LoopbackConfig::default(),
       )
       .await?;
    // Wrap in Agent and fetch the timeline
    let agent: Agent&lt;_&gt; = Agent::from(session);
    let timeline = agent
        .send(GetTimeline::new().limit(5).build())
        .await?
        .into_output()?;
    for (i, post) in timeline.feed.iter().enumerate() {
        println!("\n{}. by {}", i + 1, post.post.author.handle);
        println!(
            "   {}",
            serde_json::to_string_pretty(&amp;post.post.record).into_diagnostic()?
        );
    }
    Ok(())
}</code></pre>
<h3>Component crates</h3>
<p>Jacquard is split into several crates for modularity. The main <code>jacquard</code> crate re-exports most of the others, so you typically only need to depend on it directly.</p>
<ul> <li><a href="https://docs.rs/jacquard-common/latest/jacquard_common/index.html"><code>jacquard-common</code></a> - AT Protocol types (DIDs, handles, at-URIs, NSIDs, TIDs, CIDs, etc.)</li> <li><a href="https://docs.rs/jacquard-api/latest/jacquard_api/index.html"><code>jacquard-api</code></a> - Generated API bindings from 646+ lexicon schemas</li> <li><a href="https://docs.rs/jacquard-axum/latest/jacquard_axum/index.html"><code>jacquard-axum</code></a> - Server-side XRPC handler extractors for Axum framework (not re-exported, depends on jacquard)</li> <li><a href="https://docs.rs/jacquard-oauth/latest/jacquard_oauth/index.html"><code>jacquard-oauth</code></a> - OAuth/DPoP flow implementation with session management</li> <li><a href="https://docs.rs/jacquard-identity/latest/jacquard_identity/index.html"><code>jacquard-identity</code></a> - Identity resolution (handle → DID, DID → Doc, OAuth metadata)</li> <li><a href="https://docs.rs/jacquard-repo/latest/jacquard_repo/index.html"><code>jacquard-repo</code></a> - Repository primitives (MST, commits, CAR I/O, block storage)</li> <li><a href="https://docs.rs/jacquard-lexicon/latest/jacquard_lexicon/index.html"><code>jacquard-lexicon</code></a> - Lexicon resolution, fetching, parsing and Rust code generation from schemas</li> <li><a href="https://docs.rs/jacquard-lexicon/latest/jacquard_lexicon/index.html"><code>jacquard-lexgen</code></a> - Code generation binaries</li> <li><a href="https://docs.rs/jacquard-derive/latest/jacquard_derive/index.html"><code>jacquard-derive</code></a> - Macros (<code>#[lexicon]</code>, <code>#[open_union]</code>, <code>#[derive(IntoStatic)]</code>, <code>#[derive(LexiconSchema)]</code>, <code>#[derive(XrpcRequest)]</code>)</li> </ul>
<h4>A note on lifetimes</h4>
<p>You’ll notice a bunch of lifetimes all over Jacquard types, examples, and so on. If you’re newer to Rust or have simply avoided them, they’re part of how Rust knows how long to keep something around before cleaning it up. They’re not unique to Rust (C and C++ have the same concept internally) but Rust is perhaps the one language that makes them explicit, because they’re part of how it validates that things are memory-safe, and being able to give information to the compiler about how long it can expect something to stick around lets the compiler reason out much more sophisticated things. <a href="https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html">The Rust book</a> has a section on them if you want a refresher.</p>
<blockquote> <p>On Jacquard types like <a href="https://docs.rs/jacquard/latest/jacquard/enum.CowStr.html"><code>CowStr</code></a>, a <code>'static</code> lifetime parameter is used to refer to the owned version of a type, in the same way <code>String</code> is the owned version of <code>&amp;str</code>.</p> </blockquote>
<p>This is somewhat in tension with the ‘make things simpler’ goal of the crate, but it is honestly pretty straightforward once you know the deal, and Jacquard provides a number of escape hatches and easy ways to work.</p>
<p>Because explicit lifetimes are somewhat unique to Rust and are not something you may be used to thinking about, they can seem a bit scary to work with. Normally the compiler is pretty good at them, but Jacquard is <a href="https://docs.rs/jacquard-common/latest/jacquard_common/#working-with-lifetimes-and-zero-copy-deserialization">built around borrowed deserialization</a> and types. This is for reasons of speed and efficiency, because borrowing from your source buffer saves copying the data around.</p>
<p>However, it does mean that any Jacquard type that can borrow (not all of them do) is annotated with a lifetime, to confirm that all the borrowed bits are <a href="https://doc.rust-lang.org/nomicon/subtyping.html">“covariant”</a>, i.e. that they all live at least the same amount of time, and that lifetime matches or exceeds the lifetime of the data structure. This also imposes certain restrictions on deserialization. Namely the <a href="https://serde.rs/lifetimes.html"><code>DeserializeOwned</code></a> bound does not apply to almost any types in Jacquard. There is a <a href="https://docs.rs/jacquard/latest/jacquard/fn.deserialize_owned.html"><code>deserialize_owned</code></a> function which you can use in a serde <code>deserialize_with</code> attribute to help, but the general pattern is to do borrowed deserialization and then call <a href="https://docs.rs/jacquard/latest/jacquard/trait.IntoStatic.html"><code>.into_static()</code></a> if you need ownership.</p>
<h4>Easy mode</h4>
<p>Easy mode for jacquard is to mostly just use <code>'static</code> for your lifetime params and derive/use <a href="https://docs.rs/jacquard/latest/jacquard/trait.IntoStatic.html"><code>.into_static()</code></a> as needed. When writing, first see if you can get away with <code>Thing&lt;'_&gt;</code> and let the compiler infer. second-easiest after that is <code>Thing&lt;'static&gt;</code>, third-easiest is giving everything one lifetime, e.g. <code>fn foo&lt;'a&gt;(&amp;'a self, thing: Thing&lt;'a&gt;) -&gt; /* thing with lifetime 'a */</code>.</p>
<p>When parsing the output of atproto API calls, you can call <code>.into_output()</code> on the <code>Response&lt;R&gt;</code> struct to get an owned version with a <code>'static</code> lifetime. When deserializing, do not use <code>from_writer()</code> type deserialization functions, or features like Axum’s <code>Json</code> extractor, as they have DeserializeOwned bounds and cannot borrow from their buffer. Either use Jacquard’s features to get an owned version or follow the same <a href="https://whtwnd.com/nonbinary.computer/3m33efvsylz2s">patterns</a> it uses in your own code.</p>
<h3>Client options</h3>
<ul> <li>Stateless XRPC: any <code>HttpClient</code> (e.g., <code>reqwest::Client</code>) implements <code>XrpcExt</code>, which provides <code>xrpc(base: Uri&lt;String&gt;) -&gt; XrpcCall</code> for per-request calls with optional <code>CallOptions</code> (auth, proxy, labelers, headers). Useful when you want to pass auth on each call or build advanced flows.</li> </ul>
<pre><code> #[tokio::main]
 async fn main() -&gt; miette::Result&lt;()&gt; {
     let http = reqwest::Client::new();
     let base = Uri::parse("https://public.api.bsky.app").into_diagnostic()?.to_owned();
     let resp = http
         .xrpc(base)
         .send(
             &amp;GetAuthorFeed::new()
                 .actor(AtIdentifier::new_static("pattern.atproto.systems").unwrap())
                 .limit(5)
                 .build(),
         )
         .await?;
     let out = resp.into_output()?;
     println!("{}", serde_json::to_string_pretty(&amp;out).into_diagnostic()?);
     Ok(())
 }</code></pre>
<ul> <li>Stateful client (app-password): <code>CredentialSession&lt;S, T&gt;</code> where <code>S: SessionStore&lt;(Did, CowStr), AtpSession&gt;</code> and <code>T: IdentityResolver + HttpClient</code>. It auto-attaches bearer authorization, refreshes on expiry, and updates the base endpoint to the user’s PDS on login/restore.</li> <li>Stateful client (OAuth): <code>OAuthClient&lt;S, T&gt;</code> and <code>OAuthSession&lt;S, T&gt;</code> where <code>S: ClientAuthStore</code> and <code>T: OAuthResolver + HttpClient</code>. The client is used to authenticate, returning a session which handles authentication and token refresh internally.</li> <li><code>Agent&lt;A: AgentSession&gt;</code> Session abstracts over the above two options and provides some useful convenience features via the <a href="https://docs.rs/jacquard/latest/jacquard/client/trait.AgentSessionExt.html"><code>AgentSessionExt</code></a> trait.</li> </ul>
<p>Per-request overrides (stateless)</p>
<pre><code>#[tokio::main]
async fn main() -&gt; miette::Result&lt;()&gt; {
    let http = reqwest::Client::new();
    let base = Uri::parse("https://public.api.bsky.app").into_diagnostic()?.to_owned();
    let resp = http
        .xrpc(base)
        .auth(AuthorizationToken::Bearer(CowStr::from("ACCESS_JWT")))
        .accept_labelers(vec![CowStr::from("did:plc:labelerid")])
        .header(http::header::USER_AGENT, http::HeaderValue::from_static("jacquard-example"))
        .send(
            &amp;GetAuthorFeed::new()
                .actor(AtIdentifier::new_static("pattern.atproto.systems").unwrap())
                .limit(5)
                .build(),
        )
        .await?;
    let out = resp.into_output()?;
    println!("{}", serde_json::to_string_pretty(&amp;out).into_diagnostic()?);
    Ok(())
}</code></pre>
