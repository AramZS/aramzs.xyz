---
author: euphonos.studio
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A2hgmrwevidwsxundvejdeam5/3lprgsvtvtk23/3mdfshzx2uk2c/opengraph-image?e2bb7203df6d3028
date: '2026-01-27T13:40:10.451Z'
dateFolder: 2026/01/27
description: Sill no longer requires an email for signup
isBasedOn: 'https://blog.euphonos.studio/3mdfshzx2uk2c?auth_completed=true'
link: 'https://blog.euphonos.studio/3mdfshzx2uk2c?auth_completed=true'
slug: 2026-01-27-httpsblogeuphonosstudio3mdfshzx2uk2cauthcompletedtrue
tags:
  - social media
  - decentralization
title: New authentication flow for Sill
---
<p>Since Sill launched in late 2024, the open social web has come a long way. While Sill was one of the first to adopt the AT Protocol's OAuth authentication process in production, it was not used to create the user's core Sill account. Instead, users needed to sign up with an email address, and then connect their AT Protocol account and/or Mastodon account to Sill's user account via OAuth.</p>
<p>I initially chose to build in this way for a few reasons, but it has been clear for a while that it was the wrong approach. It was a cumbersome process and many users bounced off or refused to sign up at all. Users have the expectation that they can sign up for services on the open social web without providing an email or setting up a new password. I think this is awesome and an excellent demonstration of the power of the open social web. Sill needs to meet these expectations.</p>
<figure><img src="https://blog.euphonos.studio/api/atproto_images?did=did:plc:2hgmrwevidwsxundvejdeam5&amp;cid=bafkreih7gzg2lfhxbejjsimsnnnzcz7tkqcdwykfc4uwrdpmn7px64inv4"/></figure>
<p>Sill has a new authentication flow now, powered entirely by OAuth. On the login screen, users can now enter either their Atmosphere handle or Mastodon handle to kickstart the process. If you already have a Sill account connected to one of those handles, you will be logged in. If you don't, Sill will create a new account for you and begin the onboarding process.</p>
<p>(Note, for legacy Sill users, if you want to use your old email and password, just expand the "log in with email" section.)</p>
<p>The new onboarding process has three steps: account connection, list subscription, and digest setup. At the account connection step, you can connect whichever type of social account you didn't initially sign up with. So, if you signed up with a Mastodon account, this is your chance to enter your Atmosphere handle so that Sill reads timelines from both.</p>
<p>After your accounts are connected, you can subscribe to any of your lists or custom feeds so that Sill watches those for links in addition to your following timelines. As you subscribe to new lists and attach new accounts, the initial 24 hour fetch happens asynchronously -- no more waiting for initial downloads before you can do anything.</p>
<p>Finally, you can setup your Daily Digest, Sill's daily update on the top links in your network, which you can receive via email or RSS. If you do choose email, you do have to provide an email address and verify it. However, it is no longer mandatory for Sill users to provide an email address. I consider this a major win.</p>
<h3 data-index="8">A note on ATProto auth scopes</h3>
<p>On the ATProto side, Sill still uses the <code>transition:generic</code> OAuth scope, which gives Sill the same level of access as an app password. Sill is mostly a read-only application (with the optional exception of <a href="https://blog.euphonos.studio/3m6evdswqnk2a">bookmarks</a>, which can write to your PDS if you want to), and there are new scopes available that would give Sill less access. I haven't adopted these yet for two main reasons:</p>
<ul><li><p data-index="10.0">At its core, Sill is a background worker. After you sign up for Sill, it regularly checks your timeline and lists for new posts and aggregates the links it finds within those posts, even if you're not actively on the site. In fact, many users rarely log into Sill itself, relying on the RSS feeds or email updates it provides. Whenever I update the OAuth scopes, the background worker will break until users log back in and reauthorize Sill. Therefore, I want to limit the amount of times I update the OAuth scopes.</p> </li><li><p data-index="10.1">While there are read-only scopes, Bluesky has not provided official permission sets for their lexicons yet. With permission sets, the consent screen will accurately reflect the level of access Sill will have to Bluesky data in plain language. So rather than manually construct the low-level read-only scopes, I would rather have the read-only permission set available.</p> </li></ul>
<p>Long story short, when Bluesky releases the official permission sets for their lexicons, I will update Sill's OAuth scopes. This will require a communication plan for users and a managed transition so users known when they need to log back in and reauthorize Sill.</p>
