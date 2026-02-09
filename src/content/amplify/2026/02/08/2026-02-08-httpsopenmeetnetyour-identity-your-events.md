---
author: OpenMeet
cover_image: >-
  https://openmeet.net/_astro/guerrillabuzz-7hA2wqBcSF8-unsplash.Co5j-YRv_Rlj0c.webp
date: '2026-02-08T16:07:07.529Z'
dateFolder: 2026/02/08
description: >-
  The free, open-source alternative to Meetup. Create groups and events for your
  community — no fees, no ads, community-owned forever.
isBasedOn: 'https://openmeet.net/your-identity-your-events'
link: 'https://openmeet.net/your-identity-your-events'
slug: 2026-02-08-httpsopenmeetnetyour-identity-your-events
tags:
  - tech
  - politics
  - social media
title: >-
  Your Identity, Your Events: How OpenMeet Gives Every User an AT Protocol
  Account
---
<figure><img alt="" sizes="(max-width: 900px) 400px, 900px" src="https://openmeet.net/_astro/guerrillabuzz-7hA2wqBcSF8-unsplash.Co5j-YRv_SB0qq.webp" srcset="https://openmeet.net/_astro/guerrillabuzz-7hA2wqBcSF8-unsplash.Co5j-YRv_Z1bEaPh.webp 400w,"/></figure>
<p>We just shipped a major update to OpenMeet: <strong>every user now gets their own AT Protocol identity</strong>.</p>
<p>What does that mean? When you sign up for OpenMeet — whether you use email, Google, or GitHub — we create an AT Protocol account for you, including a decentralized identity (a DID). Your events and RSVPs are published to your own Personal Data Server. You can take full ownership of that account whenever you want, or sign in with your existing AT Protocol account — including Bluesky — and link it to OpenMeet directly.</p>
<h2>Why We Built This</h2>
<p>We want your events to reach as many people as possible — and we don’t think that should require locking you into our platform.</p>
<p>The <a href="https://atproto.com">AT Protocol</a> makes this possible. It’s an open, decentralized protocol — Bluesky is the most well-known app built on it, but it’s designed for a whole ecosystem of interoperable applications. When OpenMeet publishes your events to your PDS, they become visible to any compatible app, like <a href="https://smokesignal.events">smokesignal.events</a>. They flow through the AT Protocol firehose where anyone can discover them.</p>
<p>This is interoperability in practice — your events aren’t trapped in OpenMeet. They’re part of a growing network of apps that speak the same protocol.</p>
<h2>Three Ways to Use AT Protocol on OpenMeet</h2>
<h3>1. We Handle Everything (Default)</h3>
<p>If you log in with an AT Protocol account — Bluesky, or any other AT Protocol provider — you’re already connected. But if you use email or another social login, we’ll create an AT Protocol account for you automatically.</p>
<p>When that happens, OpenMeet sets up an account on our PDS at <code>pds.opnmt.me</code>. You get a handle like <code>yourname.opnmt.me</code> and a DID (your permanent decentralized identifier).</p>
<p>You don’t need to do anything. We manage the credentials, publish your events, and handle your RSVPs. Your data flows onto the AT Protocol network automatically.</p>
<p>This is how most users will experience it — zero friction, full benefit.</p>
<h3>2. Take Ownership</h3>
<p>Maybe you start thinking: “I want to own this account myself,” or “I’d like to use the same identity with other apps.” Good — that’s the whole point. Once you take ownership, you can use the same account in any AT Protocol app and keep your data in your own PDS.</p>
<p>From your profile settings, click <strong>Take Ownership</strong>. We’ll send you a password reset email. Set your own password, and the account is yours. OpenMeet no longer stores your credentials — when you log in through your PDS, we receive session tokens to publish events on your behalf, and those tokens expire automatically.</p>
<p>What changes:</p>
<ul><li>You have your own password for your PDS account</li><li>You can log into your PDS directly</li><li>The AT Protocol supports account migration to a different PDS — we haven’t fully tested this path yet, but it’s on our roadmap</li><li>Your data is still published through OpenMeet, but you control the account</li></ul>
<p>What doesn’t change:</p>
<ul><li>Your handle stays the same</li><li>Your events and RSVPs stay published</li><li>Everything keeps working on OpenMeet</li></ul>
<h3>3. Bring Your Own</h3>
<p>Already have an AT Protocol account? Whether it’s on Bluesky, a self-hosted PDS, or any other provider — connect it directly.</p>
<p>If you’re a new user, just log in with your AT Protocol account and it’ll be linked automatically. If you’re an existing user who signed up with email or a social login, head to your profile settings and click <strong>Connect AT Protocol Account</strong>. You’ll authorize OpenMeet through AT Protocol OAuth, and we’ll publish events and RSVPs to your existing PDS.</p>
<p>Your identity, your server, your rules. We’re just an app that writes to it.</p>
<h2>Why This Matters</h2>
<p>Most platforms make you create an account that lives on their servers. If they shut down or change terms, your identity goes with them.</p>
<p>OpenMeet flips this:</p>
<table><tr><th></th><th>Traditional Platform</th><th>OpenMeet</th></tr><tbody><tr><td><strong>Identity</strong></td><td>Platform controls it</td><td>You own it (DID)</td></tr><tr><td><strong>Data</strong></td><td>Locked in their database</td><td>On your PDS</td></tr><tr><td><strong>Portability</strong></td><td>Export a CSV, maybe</td><td>Your DID goes where you go</td></tr><tr><td><strong>If we disappear</strong></td><td>Account gone</td><td>Your identity and data survive</td></tr></tbody></table>
<p>The AT Protocol was designed for exactly this. Your DID is permanent and portable. Your PDS is your data store. OpenMeet is one of many apps that can work with your identity — not the gatekeeper of it.</p>
<p>When you create a public event on OpenMeet, it’s published to your PDS using the <a href="https://github.com/lexicon-community/lexicon">community events lexicon</a>. Same for RSVPs. This means:</p>
<ul><li>Your events appear on the AT Protocol firehose</li></ul>
<p>Your data is interoperable by default. No export needed.</p>
<p><strong>What about private events?</strong> Unlisted and private events stay off the PDS — anything you mark as private won’t be published to the network. The AT Protocol community is actively working on private data support, and when that’s ready, we’ll keep your private data in your PDS too. In the meantime, private data stays in our centralized database.</p>
<h2>Getting Started</h2>
<p><strong>Already on OpenMeet?</strong> Visit your <a href="https://platform.openmeet.net/dashboard/profile">profile settings</a> to see your AT Protocol identity. If you signed up with an AT Protocol account (including Bluesky), it’s already linked.</p>
<p><strong>New to OpenMeet?</strong> <a href="https://platform.openmeet.net">Sign up</a> and create an event. We’ll set up your AT Protocol identity automatically.</p>
<p><strong>Want to take ownership?</strong> Profile settings &gt; AT Protocol section &gt; Take Ownership. It takes about a minute.</p>
<p>The future of community platforms is one where users own their identity and data. We’re building that future today.</p>
<p>Questions? Join us on <a href="https://discord.gg/eQcYADgnrc">Discord</a> or check the release notes for <a href="https://github.com/OpenMeet-Team/openmeet-api/releases/tag/v1.5.0">API</a> and <a href="https://github.com/OpenMeet-Team/openmeet-platform/releases/tag/v0.3.0">Platform</a>.</p>
