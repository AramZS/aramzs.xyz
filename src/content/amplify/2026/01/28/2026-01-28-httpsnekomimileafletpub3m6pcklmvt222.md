---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Attdrpj45ibqunmfhdsb4zdwq/3m2se2dzync2c/3m6pcklmvt222/opengraph-image?6815eb61f733905a
date: '2026-01-29T04:05:10.975Z'
dateFolder: 2026/01/28
description: >-
  AT Proto lets you build social features without running any backend. The user
  authenticates, you write a record to their repo, Constellation indexes it, and
  anyone can query those backlinks. The data lives with the users. Your website
  is just a view.
isBasedOn: 'https://nekomimi.leaflet.pub/3m6pcklmvt222'
link: 'https://nekomimi.leaflet.pub/3m6pcklmvt222'
slug: 2026-01-28-httpsnekomimileafletpub3m6pcklmvt222
tags:
  - tech
  - decentralization
title: Building user interactivity on your website without a backend.
---
<p>AT Proto lets you build social features without running any backend. The user authenticates, you write a record to their repo, Constellation indexes it, and anyone can query those backlinks. The data lives with the users. Your website is just a view.</p>
<p>Remember guestbooks? Those little corners of the web where visitors could leave their mark, say hello, or just prove they were there. They were charming. They were personal. And thanks to AT Protocol, they can be even better now. You can sign mine at my website here: <a href="https://nekomimi.pet/guestbook">https://nekomimi.pet/guestbook</a></p>
<p>I built <a href="https://tangled.org/nekomimi.pet/cutebook">cutebook</a>, a tiny library that lets you add a guestbook to any website. Visitors sign in with their Bluesky account, leave a message, and that message gets stored in their own data repository. No database on your end. No user accounts to manage. Just two web components and a few lines of configuration.</p>
<p>The magic here comes from two pieces of the AT Protocol ecosystem: <a href="https://tangled.org/mary.my.id/atcute">atcute</a> for authentication and record creation, and <a href="https://constellation.microcosm.blue/">Constellation</a> (part of microcosm) for indexing.</p>
<p>When someone signs your guestbook, the entry gets written to their personal repository as a record with the type `pet.nkp.guestbook.sign`. It contains their message, a timestamp, and a reference to your DID (your decentralized identifier). That reference is the key.</p>
<p>Constellation watches for these records across the network. When it sees a guestbook signature pointing to your DID, it indexes it as a "backlink." Your website can then query Constellation asking, "Hey, show me all the guestbook entries that reference me." And just like that, you have a guestbook without running a database.</p>
<p>Install cutebook and its peer dependencies:</p>
<p>Then configure it in your app's entry point:</p>
<pre><code>import { configureGuestbook } from 'cutebook/register';

configureGuestbook({
  oauth: {
    clientId: 'https://your-site.com/client-metadata.json',
    redirectUri: 'https://your-site.com/',
    scope: 'atproto transition:generic',
  },
});</code></pre>
<p>That's it for setup. The <code>configureGuestbook</code> function initializes the OAuth flow and registers two custom elements that you can now use anywhere in your HTML:</p>
<pre><code>&lt;guestbook-sign did="did:plc:your-did-here"&gt;&lt;/guestbook-sign&gt;
&lt;guestbook-display did="did:plc:your-did-here" limit="50"&gt;&lt;/guestbook-display&gt;</code></pre>
<p>The <code>&lt;guestbook-sign&gt;</code> component handles the entire signing flow. It shows a handle input for users to sign in, redirects them through OAuth, and then presents a message form. When they submit, it creates the record in their repository using atcute's client.</p>
<p>The <code>&lt;guestbook-display&gt;</code> component fetches entries from Constellation and renders them. It queries the backlinks API, asking for all <code>pet.nkp.guestbook.sign</code> records that reference your DID. For each one, it fetches the full record content and the author's profile, then displays them sorted by date.</p>
<p>You'll need to host a <code>client-metadata.json</code> file at a public URL. This is how AT Protocol OAuth identifies your application:</p>
<pre><code>
{
  "client_id": "https://your-site.com/client-metadata.json",
  "client_name": "Your Guestbook",
  "client_uri": "https://your-site.com",
  "redirect_uris": ["https://your-site.com/"],
  "scope": "atproto transition:generic",
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none",
  "application_type": "web",
  "dpop_bound_access_tokens": true
}

</code></pre>
<p>The guestbook signature record is simple. Here's what gets written to a user's repo when they sign:</p>
<p>The <code>subject</code> field is an AT identifier pointing to the guestbook owner (you). Constellation indexes this as a backlink, which is what makes the whole thing queryable.</p>
<pre><code>GET https://constellation.microcosm.blue/xrpc/blue.microcosm.links.getBacklinks
  ?subject=did:plc:your-did-here
  &amp;source=pet.nkp.guestbook.sign:subject
  &amp;limit=50</code></pre>
<p>Constellation returns a list of records that match, and the component fetches each one to display the message and author info.</p>
<p>Here is how atcute can be configured:</p>
<pre><code>import {
  configureOAuth,
  createAuthorizationUrl,
  finalizeAuthorization,
  OAuthUserAgent,
  defaultIdentityResolver,
} from '@atcute/oauth-browser-client';
import {
  CompositeDidDocumentResolver,
  PlcDidDocumentResolver,
  WebDidDocumentResolver,
  XrpcHandleResolver,
} from '@atcute/identity-resolver';

// Run this once when your app loads
configureOAuth({
  metadata: {
    client_id: 'https://your-site.com/client-metadata.json',
    redirect_uri: 'https://your-site.com/',
  },
  identityResolver: defaultIdentityResolver({
    handleResolver: new XrpcHandleResolver({
      serviceUrl: 'https://public.api.bsky.app'
    }),
    didDocumentResolver: new CompositeDidDocumentResolver({
      methods: {
        plc: new PlcDidDocumentResolver(),
        web: new WebDidDocumentResolver(),
      },
    }),
  }),
});</code></pre>
<p>The identity resolver is what lets atcute turn a handle like <code>alice.bsky.social</code> into a DID and find the user's PDS. The composite resolver handles both <code>did:plc</code> (most Bluesky users) and <code>did:web</code> (self-hosted identities).</p>
<p>When a user enters their handle and clicks "Sign In," you redirect them to their authorization server:</p>
<pre><code>async function login(handle: string) {
  const authUrl = await createAuthorizationUrl({
    target: { type: 'account', identifier: handle },
    scope: 'atproto transition:generic',
  });
  // Give the browser a moment to persist state to localStorage
  await new Promise(resolve =&gt; setTimeout(resolve, 200));
  // Redirect to the authorization server
  window.location.assign(authUrl);
}</code></pre>
<p>The <code>createAuthorizationUrl</code> function does the heavy lifting. It resolves the handle to find the user's PDS, discovers their authorization server, generates PKCE codes, stores them in localStorage, and builds the OAuth URL.</p>
<p>When the user approves your app, they get redirected back to your site with OAuth parameters in the URL hash. You need to catch this and finalize the authorization:</p>
<pre><code>
let agent: OAuthUserAgent | null = null;

async function handleOAuthCallback() {
  if (location.hash.length &lt;= 1) return;
  const params = new URLSearchParams(location.hash.slice(1));

  if (!params.has('state') || (!params.has('code') &amp;&amp; !params.has('error'))) {
    return;
  }

  // Clean up the URL
  history.replaceState(null, '', location.pathname + location.search);
  // Exchange the code for tokens
  const result = await finalizeAuthorization(params);
  // Create an authenticated agent
  agent = new OAuthUserAgent(result.session);
  console.log('Logged in as:', result.session.info.sub);
}

// Call this when your page loads
handleOAuthCallback();</code></pre>
<p>With an authenticated agent, you can write records to the user's repository. Here's how to create a guestbook signature:</p>
<pre><code>import { Client } from '@atcute/client';

async function signGuestbook(guestbookOwnerDid: string, message: string) {
  if (!agent) {
    throw new Error('Not logged in');
  }

  // Create a client using the OAuth agent as the handler
  const client = new Client({ handler: agent });

  // The record we're creating
  const record = {
    $type: 'pet.nkp.guestbook.sign',
    subject: guestbookOwnerDid,
    message: message,
    createdAt: new Date().toISOString(),
  };

  // Write it to the user's repo
  const response = await client.post('com.atproto.repo.createRecord', {
    input: {
      repo: agent.session.info.sub,  // The user's DID
      collection: 'pet.nkp.guestbook.sign',
      record: record,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create record');
  }

  return {
    uri: response.data.uri,
    cid: response.data.cid,
  };
}</code></pre>
<p>That's it. The record is now in the user's repository. The <code>subject</code> field points to your DID, which is what Constellation will index as a backlink.</p>
<p>Now for the display side. Constellation exposes an XRPC endpoint called <code>blue.microcosm.links.getBacklinks</code>. You query it with:</p>
<pre><code>interface BacklinksResponse {
  total: number;
  records: Array&lt;{
    did: string;
    collection: string;
    rkey: string;
  }&gt;;
  cursor?: string;
}

async function getGuestbookEntries(guestbookOwnerDid: string, limit = 50) {
  const url = new URL(
    '/xrpc/blue.microcosm.links.getBacklinks',
    'https://constellation.microcosm.blue'
  );
  url.searchParams.set('subject', guestbookOwnerDid);
  url.searchParams.set('source', 'pet.nkp.guestbook.sign:subject');
  url.searchParams.set('limit', limit.toString());

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch from Constellation');
  }

  const data: BacklinksResponse = await response.json();
  return data.records;
}</code></pre>
<p>The response gives you a list of record locators: the DID of the author, the collection, and the record key. But it doesn't include the actual record content. You need to fetch each one.</p>
<p>For each backlink, fetch the full record from a PDS. We cannot use the bluesky api as that only indexes bluesky records. We could query each DID's pds, and get records from there, or we could use another excellent microcosm service, slingshot, which does that middleman work for us, and serves us records quick as it keeps a local eager cache.</p>
<pre><code>interface GuestbookRecord {
  uri: string;
  cid: string;
  value: {
    $type: 'pet.nkp.guestbook.sign';
    subject: string;
    message: string;
    createdAt: string;
  };
}

async function fetchRecord(
  did: string,
  collection: string,
  rkey: string
): Promise&lt;GuestbookRecord | null&gt; {
  const url = new URL(
    '/xrpc/com.atproto.repo.getRecord',
    'https://slingshot.wisp.place' //I host a slingshot cache that should be faster to hit than microcosm's
  );
  url.searchParams.set('repo', did);
  url.searchParams.set('collection', collection);
  url.searchParams.set('rkey', rkey);

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }

  return response.json();
}</code></pre>
<pre><code>interface GuestbookEntry {
  author: string;
  authorHandle?: string;
  message: string;
  createdAt: string;
  uri: string;
}

async function loadGuestbook(guestbookOwnerDid: string): Promise&lt;GuestbookEntry[]&gt; {
  // 1. Get backlinks from Constellation
  const backlinks = await getGuestbookEntries(guestbookOwnerDid);

  // 2. Fetch each record
  const entries: GuestbookEntry[] = [];

  for (const link of backlinks) {
    const record = await fetchRecord(link.did, link.collection, link.rkey);
    if (!record) continue;

    // Validate the record structure
    if (
      record.value.$type !== 'pet.nkp.guestbook.sign' ||
      typeof record.value.message !== 'string'
    ) {
      continue;
    }

    // Optionally fetch the author's handle
    let authorHandle: string | undefined;
    try {
      const profileRes = await fetch(
        `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${link.did}`
      );
      if (profileRes.ok) {
        const profile = await profileRes.json();
        authorHandle = profile.handle;
      }
    } catch {
      // Handle fetch is optional, continue without it
    }

    entries.push({
      author: link.did,
      authorHandle,
      message: record.value.message,
      createdAt: record.value.createdAt,
      uri: record.uri,
    });
  }

  // 3. Sort by date, newest first
  return entries.sort((a, b) =&gt;
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}</code></pre>
<p>atcute handles all the OAuth complexity. Resolving handles, discovering authorization servers, PKCE, token exchange, DPoP. It gives you a typed client that can write records to any PDS the user is on.</p>
<p>Constellation solves the query problem. In AT Protocol, records are stored in individual user repositories. There's no central database you can query. But Constellation watches the firehose and indexes relationships between records and identifiers. When you need to find "all records that reference this DID," Constellation has the answer.</p>
<p>Together, they let you build social features without running any backend. The user authenticates, you write a record to their repo, Constellation indexes it, and anyone can query those backlinks. The data lives with the users. Your website is just a view.</p>
<p>The killer thing is that it's so fucking easy. No amount of SaaSy garbage that deploys databases and backends for you can compare to this, plus it's free!</p>
