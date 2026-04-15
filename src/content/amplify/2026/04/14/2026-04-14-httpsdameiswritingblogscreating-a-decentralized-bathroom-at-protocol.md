---
author: dame.is
cover_image: 'https://dame.is/images/blog/creating-a-decentralized-bathroom-at-protocol.jpg'
date: '2026-04-15T02:07:36.219Z'
dateFolder: 2026/04/14
description: >-
  As many of you know by now, I am a Lexicon enjoyer. So much so that this week
  I created the world's first bathroom that is connected to the AT Protocol.
  Yes, you read that correctly...
isBasedOn: 'https://dame.is/writing/blogs/creating-a-decentralized-bathroom-at-protocol'
link: 'https://dame.is/writing/blogs/creating-a-decentralized-bathroom-at-protocol'
slug: >-
  2026-04-14-httpsdameiswritingblogscreating-a-decentralized-bathroom-at-protocol
tags:
  - tech
  - decentralization
title: Creating a decentralized bathroom (powered by the AT Protocol)
---
<p>As many of you know by now, I am a <a href="https://atproto.com/guides/lexicon">Lexicon</a> enjoyer. So much so that this week I created the world's first bathroom that is connected to the AT Protocol. Yes, you read that correctly...</p>
<p>But before we get to that, let's cover some basics for the new folks in the room.</p>
<h2>"Explain the AT Protocol like I'm 5"</h2>
<p>Bluesky is a semi-decentralized social networking platform built on top of a new internet protocol known as the AT Protocol that uses arbitrary JSON schemas and personal data servers (PDSs) to empower user agency and autonomy. Kinda technical and difficult to understand underneath all that jargon, right? Here's a simpler way of thinking about it...</p>
<p><strong>You can now own your social networking data, take it with you wherever you want, and never be locked into an app ever again.</strong></p>
<p>The most exciting part of the AT Protocol to me is the concept of the <a href="https://docs.bsky.app/docs/advanced-guides/atproto">Personal Data Server (PDS)</a> and the way data is stored on it. Every single post, like, reply, or follow you make on Bluesky is stored in your own PDS in the form of a lexicon record.</p>
<h3>Lexicons are just File Formats</h3>
<p>For the non-technical in the audience, <strong>a Lexicon is basically just a file format</strong> for the AT Protocol... think of it like a file on your computer that might come in many different forms: .jpg, .pdf, .doc, .txt</p>
<p>These "file formats" are called <a href="https://atproto.com/specs/nsid">NSIDs</a> and look like domain names that are backwards. Here's what Bluesky's "file formats" look like under the hood:</p>
<pre><code>app.bsky.actor.profile
app.bsky.feed.like
app.bsky.feed.post
app.bsky.feed.repost
app.bsky.graph.follow
</code></pre>
<p>Each of these files contains some of your data that is created from an app like Bluesky. By using tools like <a href="https://pdsls.dev/at://did:plc:gq4fo3u6tqzzdkjlwzpb23tj">pdsls.dev</a>, you can see all of the data that lives within a Bluesky account's personal data server. Pretty neat, right? What's even better is that anyone can create their own "file format" for whatever suits their needs, and any app can easily support any other file format at the app developer's discretion.</p>
<p>This is how the new "decentralized" versions of TikTok, Instagram, Goodreads, etc are able to work so easily. You sign into them with your Bluesky (AT Protocol) account, and they support many of Bluesky's native "file formats" out of the box. No need to write a new bio, upload a new avatar, or create a new username for every account... you simply sign in to an app and it all gets imported "magically".</p>
<p>So, what does any of this have to do with my bathroom, right?</p>
<p>Up until this point, most developers have been hard at work create new and exciting "file formats" for the AT Protocol that can do interesting things like help you <a href="">manage events</a>, <a href="">chat with friends</a>, or <a href="">write long form blog posts</a>. I've been experimenting with Lexicons myself for a hot minute behind-the-scenes, and I'd like to formally introduce the concept of the <strong>Personal Lexicon</strong>.</p>
<h2>Introducing, the Personal Lexicon</h2>
<p>Many people such as myself are big believers in everyone having their own personal website... a plot of digital land that you control and call home. I've had a personal website since I was a teenager, so at least a decade or two by now. I've also been tracking weird and eclectic data about my personal life since I was a child (my first spreadsheet was a list of all the vanity license plates I had seen). I know, I'm a bit of an odd nerd.</p>
<p>All this got me thinking... what if more people had their own personal "file formats"? With the AT Protocol, this is now super easy thanks to Lexicons.</p>
<p>As a proof of concept to show what this could look like, I've begun writing records to my own PDS that utilize my domain name:</p>
<pre><code>is.dame.counting.turtles
is.dame.tasting.wine
is.dame.on.the.toilet
</code></pre>
<p>Yes, I have a silly file format for going to the bathroom, cause why not?</p>
<p>Now I know what some of you fellow nerds are thinking... "WHAT ABOUT MY INTEROPERABILITY?!"</p>
<p>I'm not suggesting everyone throw out collectively used lexicons that we all know and love. That would be dumb. What I am saying though is that not all data needs to be interoperable or socially connected out of the box. Yes, I could create a proprietary "am I on the toilet?" app that is a bespoke social network for those of us who post from the toilet... but that would be silly, right? RIGHT!?</p>
<h2>My decentralized bathroom</h2>
<p>Here's the stupid, unhinged, out-of-pocket, bat-shit crazy thing that I made this week...</p>
<figure><img alt="A roll of toilet paper in the bathroom with a white stickerk above it" src="https://dame.is/images/blog/creating-a-decentralized-bathroom-at-protocol.jpg"/><figcaption>nfc sticker</figcaption></figure>
<p>See that white little circular thing above my toilet paper? That's a cheap NFC sticker I bought online in a roll of 50. When I tap my iPhone against it, it instantly creates a record on my AT Protocol PDS under the Lexicon <code>is.dame.on.the.toilet</code>, with the <code>answer</code> property being <code>yes</code>.</p>
<p>Now, anyone can see when the last time I was on the toilet, and the data is hosted on a decentralized network. Lemme guess, your jealous right? Fine, if you say so...</p>
<h2>Introducing im.flushing</h2>
<p>That bespoke social network I mentioned earlier? Well... I decided to actually make it. You can create your first post (called a "flush") here: <a href="https://flushing.im/">https://flushing.im/</a></p>
<p>It's like <a href="https://statusphere.xyz">statusphere.xyz</a>, but for seeing who's going to the bathroom right now. You login with your Bluesky/ATProto account, choose an emoji, and let the network know you're on the throne. All records are stored in a custom lexicon:</p>
<pre><code>im.flushing.right.now
</code></pre>
<p>It's technically my first official AppView for the AT Protocol and my first public lexicon. What a professional way to kick things off! I hope you enjoy it.</p>
<p>Try it here: <a href="https://flushing.im/">https://flushing.im/</a></p>
<figure><img alt="A promotional screenshot of the app im.flushing" src="https://dame.is/images/blog/og-image.png"/><figcaption>im.flushing promo image</figcaption></figure>
