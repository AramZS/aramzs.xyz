---
author: snowglobe.at
cover_image: 'https://snowglobe.at/social-preview.png'
date: '2026-11-14T01:01:53.501Z'
dateFolder: 2026/11/13
description: >-
  Self-contained atproto networks for testing and demos. Each one has its own
  PDS, PLC directory, relay and Jetstream, and nothing in it reaches Bluesky's
  network.
isBasedOn: 'https://snowglobe.at/'
link: 'https://snowglobe.at/'
slug: 2026-11-13-httpssnowglobeat
tags:
  - decentralization
title: Your own atproto network.
---
<h2>Run one on your machine</h2>
<p>Snowglobe is open source and runs on Docker Compose. We test it on Linux and on Windows with WSL 2, and a user has run it on a Mac with Docker Desktop.</p>
<h3>1Start it</h3>
<pre><code># puts the snowglobe command on your PATH
npm install -g @openmeet/snowglobe
# the first run pulls and builds images, which takes a while
snowglobe up --default</code></pre>
<p>The default snowglobe is one PDS with two test accounts, alice and bob, a PLC directory, Jetstream, Slingshot, PDSls and a page that lists them all. You need Docker with Compose and Node 20 or newer.</p>
<p>To see it in a browser on the same computer, run <code>snowglobe trust</code> and open <code>https://snowglobe.local.snowglobe.at/</code>: every service, every account, and every write as it happens. <code>snowglobe down</code> stops it, and <code>snowglobe down -v</code> deletes its data too.</p>
<p><a data-track="local:readme" href="https://github.com/OpenMeet-Team/snowglobe#readme">Read the setup guide</a></p>
<h3>2Try it from the command line</h3>
<pre><code># makes carol.snowglobe.local.snowglobe.at
snowglobe account carol CAROL
# asks Slingshot for alice's DID and PDS
curl -s --cacert ~/.local/share/snowglobe/ca/ca.crt --get \
  https://slingshot.snowglobe.local.snowglobe.at/xrpc/com.bad-example.identity.resolveMiniDoc \
  -d identifier=alice.snowglobe.local.snowglobe.at</code></pre>
<p>alice and bob come with the snowglobe; <code>snowglobe account</code> adds more. Each one's handle, DID and password are kept in <code>~/.local/share/snowglobe/snowglobe/accounts.env</code>, carol's as <code>CAROL_HANDLE</code>, <code>CAROL_PASSWORD</code> and so on.</p>
<p>Every snowglobe has a domain of its own, and its names work for every program on the machine: public DNS sends them to 127.0.0.1, where a name router passes each one to its snowglobe. <code>com.bad-example.identity.resolveMiniDoc</code> is Slingshot's own method, not a placeholder, and <code>--cacert</code> has curl trust the snowglobe's own certificate authority.</p>
<h3>3Bring your app</h3>
<p>In your app's repo, start from the default file:</p>
<pre><code>cp "$(npm root -g)/@openmeet/snowglobe/snowglobe.default.yml" snowglobe.yml</code></pre>
<p>Give its <code>globe:</code> line a name of its own, <code>myapp</code> here, and add your app, <code>web</code> here, with the settings it reads:</p>
<pre><code>apps:
  - name: web
    # https://web.app.myapp.local.snowglobe.at -&gt; your dev server
    local: { port: 5173 }
    env:
      PUBLIC_ATPROTO_PLC_URL: ${services.plc.url}
      PUBLIC_ATPROTO_SIGNUP_PDS: ${pds.main.url}</code></pre>
<pre><code># in the app's repo
snowglobe up
# the app gets those settings and trusts the snowglobe
snowglobe run npm run dev</code></pre>
<p>An app's address is its name, then <code>app</code>, then the snowglobe's domain. Open <code>https://web.app.myapp.local.snowglobe.at</code> and sign in as <code>alice.myapp.local.snowglobe.at</code>, on her PDS's own sign-in page, as on the real network. <code>snowglobe run</code> hands the app the settings and the snowglobe's certificate authority; <code>snowglobe env</code> prints the same settings for an app you start some other way.</p>
<p><a data-track="local:integrate" href="https://github.com/OpenMeet-Team/snowglobe/blob/main/docs/your-app.md">Use it in your own project</a> · <a data-track="local:statusphere" href="https://github.com/OpenMeet-Team/snowglobe/blob/main/docs/examples/statusphere.md">Statusphere, run end to end</a></p>
<h3>Add what your app needs</h3>
<ul> <li>More PDSes, with a relay that merges their writes</li> <li>The permissioned-spaces alpha PDS</li> <li>A group host, and Tap for an app that keeps its own copy of the data</li> <li>A lexicon authority, for lexicons that are still drafts</li> </ul>
<p>A test suite checks the network works and that no service points at Bluesky.</p>
<p><a data-track="local:file" href="https://github.com/OpenMeet-Team/snowglobe/blob/main/docs/snowglobe.md#the-file-and-the-commands">What a snowglobe.yml can hold</a></p>
<h2>Hosted snowglobes</h2>
<p>A hosted snowglobe is the same kind of network on a server, at its own address, so people can use your app against it from their own browser.</p>
<h3>lighthouse.snowglobe.at</h3>
<p>Our first hosted snowglobe. Its page shows its services and their health, its accounts, and its activity as it happens.</p>
<p>atmo, an events app, runs on it as a demo of groups on atproto. Everything on lighthouse is test data and may be wiped at any time.</p>
<h3>Snowglobes for your app and your CI</h3>
<p>Your CI would start a hosted snowglobe from the <code>snowglobe.yml</code> in your app's repo, run your tests and end-to-end checks against it, and take it down again. This is not built yet.</p>
<p>Today we run hosted snowglobes for our own demos. If you would like one for your app, tell us below.</p>
<h2>Stay in touch</h2>
<p>Leave an email address if you would like to hear when there is something new, or a note about what you would use Snowglobe for. Either one is enough.</p>
<p>We use your email only to write to you about Snowglobe. It is kept in our own database, not a mailing list service.</p>
<p>       Send  </p>
