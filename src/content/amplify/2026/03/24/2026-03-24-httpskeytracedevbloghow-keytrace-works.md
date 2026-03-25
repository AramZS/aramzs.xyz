---
author: keytrace.dev
cover_image: ''
date: '2026-03-24T20:46:00.061Z'
dateFolder: 2026/03/24
description: >-
  A technical write-up of how the parts of Keytrace come together to validate
  account claims, and allow third-parties to trust our validations without
  verifying every claim themselves
isBasedOn: 'https://keytrace.dev/blog/how-keytrace-works'
link: 'https://keytrace.dev/blog/how-keytrace-works'
slug: 2026-03-24-httpskeytracedevbloghow-keytrace-works
tags: []
title: How Keytrace works
---
<p>So how does Keytrace work? First off, lets set up our Keytrace vocabulary:</p>
<ul><li><code>claim</code> - An external account you are claiming ownership for (e.g. github.com/orta)</li><li><code>service provider</code> - The "place" which hosts said account (e.g. GitHub)</li><li><code>runner</code> - A task runner which checks the service provider via public APIs, DNS or HTML scraping to verify an user's claim publicly</li></ul>
<p>Next, some Bluesky/atproto terminology:</p>
<ul><li><code>atproto</code> - the tech foundation which Bluesky is built on, which Keytrace is also built on</li><li><code>DID</code> - A unique identifier on the atproto network, you have one</li><li><code>repository</code> - A set of JSON blobs attached to your DID which makes up the data for your account</li><li><code>document</code> - The name of an individual JSON blob in your registry</li><li><code>collection</code> - A subset of your repository where the documents all have the same file format (<code>$type</code>), these collections are based on inverse URLs: e.g. <code>dev.keytrace.claim</code>.</li></ul>
<h2><a href="https://keytrace.dev/blog/how-keytrace-works/#walkthrough">Walkthrough</a></h2>
<p>OK, lets talk you through the process of making a single claim, and ideally you'll have a good understanding of claim-making and verification process by going step-by-step.</p>
<p>When you sign in to Keytrace, we ask for access to be able to make read/write changes to the collection <code>dev.keytrace.claim</code> on your atproto account.</p>
<p>Signing in gives the Keytrace server a way to store your claim in your own account's repository. Today, Keytrace does not operate with a database, almost everything stored exists in a user's atproto repository, or the keytrace.dev's atproto repository (except private keys.)</p>
<p>Clicking 'Add claim' on the website would take you to a page showing a lot of different server providers, for example GitHub, Mastodon, npm, Twitter, LinkedIn etc. Note: I am a maximalist here, if we can figure a way to publicly prove you own an account (e.g. you can create public content,) I'm happy to have support for that service provider.</p>
<p>Lets use Instagram as a reference point, it's a tricky platform to get data from! Today the steps to create a claim for Instagram looks like:</p>
<h2>Create your proof</h2>
<ol><li>1Post a new <strong>public post</strong> on Instagram</li><li>2Paste the verification content below as the post caption</li><li>3Make sure the post is <strong>public</strong> (not private or for close friends)</li><li>4Copy the URL of the post (tap ... → Copy link)</li></ol>
<p>I'm linking my keytrace.dev: did:plc:t732otzqvkch7zz5d37537ry</p>
<p>https://www.instagram.com/p/...</p>
<p>So, we require you to make a public post, and include a very specific string: <code>I'm linking my keytrace.dev: did:plc:t732otzqvkch7zz5d37537ry</code>. The essential bit of information here is <code>did:plc:t732otzqvkch7zz5d37537ry</code> which is my personal DID.</p>
<p>I would then go to Instagram's app, or the web interface and <a href="https://www.instagram.com/p/DVS8Tm6DWzP/">create an image post</a> which includes that text. After I come back to Keytrace, I give the post URL <code>https://www.instagram.com/p/DVS8Tm6DWzP/</code> to the form, which triggers the Keytrace runner to start.</p>
<p>In this case, the runner will download the HTML of the post and then extract out the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta">meta tags</a> from the content of the page:</p>
<pre><code>&lt;html class="_9dls _ar44" lang="en" dir="ltr"&gt;
      property="og:description"
      content='13 likes, 2 comments - orta on February 28, 2026: "Linking my http://keytrace.dev
</code></pre>
<p>Luckily for us, that message is short enough to be included in full via the meta tag <code>"description"</code> on the Instagram website.</p>
<p>The runner's service provider for Instagram knows to look for your DID in that tag. If it is there, then the runner considers the proof valid. We only accept certain Instagram URL formats, so you can't leave a comment on someone elses post with your DID to claim their accounts etc.</p>
<p>The Instagram provider uses the metadata from the HTML, but other providers use:</p>
<ul><li>DNS (for websites you own)</li><li>ActivityPub (for Mastodon instances)</li><li>Public JSON APIs (e.g. Reddit)</li><li>CSS scope narrowing in HTML (e.g. Hacker News)</li><li>JSON+ld in HTML (e.g. LinkedIn)</li></ul>
<p>Each time it's a mix of 'how accurate can this be?', 'how available is the data?' and 'how can this to be abused?' - never a simple thing but I've tried to think through each one pretty hard.</p>
<p>A <a href="https://pdsls.dev/at://did:plc:t732otzqvkch7zz5d37537ry/dev.keytrace.claim/3mhm4xuzxbq2f">verified claim</a> is a JSON document posted to your atproto repository:</p>
<pre><code>  "$type": "dev.keytrace.claim",
  "status": "verified",
    "avatarUrl": "https://scontent-lhr6-1.cdninstagram.com/...",
    "profileUrl": "https://www.instagram.com/orta/",
    // We'll look at this later
</code></pre>
<p>It's quite simple, it declares the URL you used to make the claim, gives a verified status, and then has a structured <code>"identity"</code> which gives enough information to show the claim in an interface.</p>
<p>All in all, quite simple!</p>
<p>This data on your account is enough to re-trigger the Keytrace runner: <code>https://www.instagram.com/p/DVS8Tm6DWzP</code> and look for the Claim owner's DID: <code>did:plc:t732otzqvkch7zz5d37537ry</code>. Clicking the spinner below will run the real code.</p>
<p>Given the small-world nature of atproto, while Keytrace was in alpha, I had long conversations with both <a href="https://codeberg.org/uwedeportivo/kt-tool">kt-tools</a> and <a href="https://attestfor.me/">attestfor.me</a> and we all shipped using the same data structures, making us all compatible.</p>
<p>So, you can verify a claim from any three system on the CLI via:</p>
<pre><code>kt-tool verify --handle orta.io
</code></pre>
<p>Maybe sometime in the future we can have a Keytrace CLI too! This is one of the cool things about having the '<a href="https://overreacted.io/a-social-filesystem/">social filesystem</a>' of atproto. It's very collaborative and very interesting!</p>
<p>Right now, <a href="https://bsky.app/profile/sifa.id">@sifa.id</a> is showing Keytrace claims (here's <a href="https://sifa.id/p/orta.io">mine</a>), I'm thinking of adding it to a Puzzmo user profile, and <a href="https://npmx.dev/">npmx</a> are interested in using claims as a way to prove you have write access to a package too. Lots of cross-pollination for a new project!</p>
<p>Oddly enough, I think this is not enough.</p>
<p>Why? Well, one advantage Keybase had was that they controlled all access to their data in the db. Whereas a document in a user's repository is mutable data which any application can request access to, I can't say 'only Keytrace can write to this' (nor do I want to) which means any of these documents should not be <em>fully</em> trusted.</p>
<p>E.g. I could change my handle to be Taylor Swift's and unless someone re-runs the full process for verification, they may not cast question on the validity of the data:</p>
<p>Thus: attestation. A fancy word to say 'a receipt for data.' Keytrace offers a secondary system for a claim verification via document field validation. This is system which generates signatures that rely on common web standards like atproto resolution, JSON Canonicalization Scheme, JSON Web Tokens (JWT) and JSON Web Keys (JWK) and subtle crypto.</p>
<p>The <code>"sigs"</code> is an array of signatures that verify a set of fields from inside the JSON document (with <code>"did"</code> injected from outside.) Here is the primary signature which Keytrace creates on a claim:</p>
<pre><code>      "kid": "attest:instagram",
      "src": "at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-03-21",
      "attestation": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbVVyaSI6Imh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vcC9EVlM4VG02RFd6UC8iLCJkaWQiOiJkaWQ6cGxjOnQ3MzJvdHpxdmtjaDd6ejVkMzc1MzdyeSIsImlkZW50aXR5LnN1YmplY3QiOiJvcnRhIiwidHlwZSI6Imluc3RhZ3JhbSJ9.LtZiwSSTvZMgq4Y16ZWTrzR3l-xPcbTIinrh3lNM0mohR5u7XPTTNK_Owk25_XJVLNKOeA88Emkkxk96R3hY9w",
      "signedFields": ["claimUri", "did", "identity.subject", "type"],
</code></pre>
<p>We have:</p>
<ul><li><code>kid</code> - a Key ID, basically just a name to declare what it does</li><li><code>src</code> - an atproto address of a <code>dev.keytrace.serverPublicKey</code> record, in this case on <code>did:plc:hcwfdlmprcc335oixyfsw7u3</code> (which is <a href="https://pdsls.dev/at://did:plc:hcwfdlmprcc335oixyfsw7u3">@keytrace.dev</a>)</li><li><code>signedAt</code> - the date</li><li><code>attestation</code> - a JWT string which we'll go into next</li><li><code>signedFields</code> - a list of fields from the document which were signed inside the attestation string</li></ul>
<p>The <code>attestation</code> value is a JWT, a JWT is a string composed of three parts separated by a <code>.</code>: <code>[header].[payload].[signature]</code>. Both the header and payload are JSON objects which are base64 encoded. The header describes the algorithm used for signing and type, the payload is whatever you want.</p>
<p>eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbVVyaSI6Imh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vcC9EVlM4VG02RFd6UC8iLCJkaWQiOiJkaWQ6cGxjOnQ3MzJvdHpxdmtjaDd6ejVkMzc1MzdyeSIsImlkZW50aXR5LnN1YmplY3QiOiJvcnRhIiwidHlwZSI6Imluc3RhZ3JhbSJ9.[signature]</p>
<p>The payload is a JSON object created by using canonicalized JSON formatting (<a href="https://datatracker.ietf.org/doc/html/rfc8785">RFC 8785</a>), so you pluck the values declared in <code>signedFields</code>, turn that into an object, then ensure that you canonicalize the JSON as it is being serialized into a string. This is largely just making sure the order of fields, and string escaping etc is consistent across any language/environment.</p>
<p>I tend to verify and inspect my JWTs in <a href="https://www.jwt.io/">jwt.io</a>, but lets look at that soon. Next we need to resolve <code>at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-03-21</code>. This is an atproto address to a document with the name <code>2026-03-21</code> in the collection <code>dev.keytrace.serverPublicKey</code> of the account <code>did:plc:hcwfdlmprcc335oixyfsw7u3</code>. <a href="https://pdsls.dev/at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-03-21">That document</a> looks like this:</p>
<pre><code>  "$type": "dev.keytrace.serverPublicKey",
  "publicJwk": "{\"kty\":\"EC\",\"x\":\"F9YcOywzrNapbegB-_ZM_9jYJzGrGj5PjH-DrUTySQs\",\"y\":\"vN0rBTAPYwmsOJqc7ndcpa-PEFmPsksBcKxx2X-Nc9I\",\"crv\":\"P-256\"}",
</code></pre>
<p>I cycle Keytrace keys daily, but the document is essentially a way to wrap a JWK in a document with some metadata. This JWK is a public form of the private key used to sign the original <code>attestation</code> JWT. So, if you'd like to verify the attestation:</p>
<p>Open <a href="https://www.jwt.io/">jwt.io</a>:</p>
<ul><li>Set your JWT to be the one from the Claim:</li></ul>
<p>eyJhbGciOiJFUzI1NiIs… Copy</p>
<ul><li>In <strong>JWT Signature Verification</strong> change the Public Key Format from PEM to JWK</li><li>Set the public key to the one from the Server Public Key:</li></ul>
<ul><li>See the tick! (Then verify it fails by changing the JWK or the JWT)</li></ul>
<p>What you are looking at is proof that one of Keytrace's private keys looked at the data in this document and then signed off on it's correctness. All of this is standard atproto and web infrastructure. What is interesting is that now we have two ways to check the validity.</p>
<ul><li>Do the full verification process yourself</li><li>Trust that Keytrace did the process, but you can double-check that the payload objects still matches the object if re-created from the document</li></ul>
<p>Thus Keytrace comes with not one, but two open source libraries:</p>
<ul><li><a href="https://npmx.dev/package/@keytrace/runner"><code>@keytrace/runner</code></a> - A heavy 'run the full verification' system</li><li><a href="https://npmx.dev/package/@keytrace/claims"><code>@keytrace/claims</code></a> - A light 'grab the claims, validate they are correct' library for third-parties to use</li></ul>
<p>That's it! That's the system.</p>
<p>The whole thing is open source at <a href="https://github.com/orta/keytrace">orta/keytrace</a>, I'll take issues but mainly only on weekends. I'm open to adding new types of accounts!</p>
<p>One of the side-projects I'm not sure if I will build, but I have a prototype is a public relay chat system for Keytrace. So, Keytrace hosts a bot on lots of different platforms (Signal, Whatsapp, Telegram, etc) and any messages sent to that bot are posted to a public page we host via web socket. Then any messages containing a DID are stored in our backend, Keytrace would then have a public API for looking up those messages. Which I think gives us a way to crack into a set of account systems which have no public presence.</p>
<p>Other than that, it's been fun having a side project! I started thinking about Keytrace back in <a href="https://bsky.app/profile/orta.io/post/3mdkzofxkf22n">Jan 2025</a> and have been working on it on the side a 2 months now. It's been a bit of a cultural change to have a real side-project I haven't really had a new one since I started working on <a href="https://www.puzzmo.com">Puzzmo</a> 5 years ago.</p>
