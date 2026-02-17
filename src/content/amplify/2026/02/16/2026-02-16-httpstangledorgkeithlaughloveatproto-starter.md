---
author: keithlaugh.love
cover_image: 'https://tangled.org/keithlaugh.love/atproto-starter/opengraph'
date: '2026-02-16T06:07:45.804Z'
dateFolder: 2026/02/16
description: just a starter that i can use w/ any frontend for new atproto projects
isBasedOn: 'https://tangled.org/keithlaugh.love/atproto-starter'
link: 'https://tangled.org/keithlaugh.love/atproto-starter'
slug: 2026-02-16-httpstangledorgkeithlaughloveatproto-starter
tags:
  - code
  - decentralization
title: quick start
---
<p>a minimal, working foundation for building atproto/bluesky apps.</p>
<p>oauth works out of the box. sessions are stored in sqlite. the frontend is vanilla html/js on purpose — swap in whatever framework you want</p>
<pre><code>git clone https://github.com/yourusername/atproto-starter
cd atproto-starter
cp .env.example .env
bun install
bun run dev
</code></pre>
<p>open http://127.0.0.1:3000 and sign in with your bluesky handle. that's it.</p>
<blockquote> <p><strong>note:</strong> use <code>127.0.0.1</code>, not <code>localhost</code>. atproto oauth is picky about this.</p> </blockquote>
<h2>what's in here</h2>
<pre><code>src/server/
├── index.ts              # elysia server + your routes go here
├── lib/
│   ├── oauth-client.ts   # oauth configuration
│   ├── storage.ts        # session/state stores (sqlite)
│   ├── db.ts             # database setup
│   └── constants.ts      # app name, cookie config
├── middleware/
│   └── auth.ts           # requireAuth, optionalAuth
└── routes/
    └── oauth.ts          # login, callback, logout

src/types/
└── lexicons.ts           # your custom record types

public/
├── index.html            # the login page
├── styles.css            # styles (replace with your own)
└── app.js                # client logic (vanilla js)
</code></pre>
<h2>how oauth works</h2>
<p>atproto doesn't use centralized auth like "sign in with google." each user's data lives on their own PDS (personal data server), and you authenticate directly with that server.</p>
<p>the flow:</p>
<ol> <li>user enters their handle (like <code>keithlaugh.love</code>)</li> <li>your app figures out which PDS hosts their data</li> <li>user is redirected to their PDS to authorize your app</li> <li>PDS redirects back with an auth code</li> <li>your app exchanges that for tokens, stores the session</li> </ol>
<p>this starter handles all of that. you just need to build your app.</p>
<h3>local development</h3>
<p>for local dev, atproto has a "loopback client" system that lets you skip registering your app anywhere. it just works on <code>http://127.0.0.1:PORT</code>.</p>
<p>in production, you serve oauth client metadata at <code>/oauth-client-metadata.json</code>. this file describes your app to PDSes. the starter already generates it — just set <code>PUBLIC_URL</code> to your real domain.</p>
<h2>using the authenticated session</h2>
<p>after login, your routes can access the user's DID and an authenticated api client:</p>
<pre><code>import { requireAuth } from "./middleware/auth";
app
  .use(requireAuth)
  .get("/api/my-stuff", async ({ did, agent }) =&gt; {
    // did = the user's DID (did:plc:abc123...)
    // agent = authenticated ATProto client
    const result = await agent.com.atproto.repo.listRecords({
      repo: did,
      collection: "com.example.settings",
    });
    return result.data.records;
  });
</code></pre>
<p>the <code>agent</code> is a fully authenticated <a href="https://github.com/bluesky-social/atproto/tree/main/packages/api">@atproto/api</a> client. you can read from the user's repo, write records, the whole deal.</p>
<h2>adding your own frontend</h2>
<p>the server doesn't care what frontend you use. it serves static files from <code>/public/*</code> and exposes api routes. pick your stack:</p>
<p>react <a href="https://react.dev/learn/creating-a-react-app">recommends starting with a framework</a> like Next.js or React Router, or using Vite for a lighter setup:</p>
<pre><code>npx create-vite . --template react-ts
</code></pre>
<p>build to <code>public/</code>, or set up a separate dev server and proxy api calls.</p>
<h3>vue / svelte / whatever</h3>
<p>same deal. create your project, point it at the api routes:</p>
<ul> <li><code>GET /api/me</code> — check if logged in, get user's DID</li> <li><code>GET /oauth/login?handle=user.bsky.social</code> — start login</li> <li><code>GET /oauth/logout</code> — log out</li> </ul>
<p>the cookie-based session means auth "just works" — no token management needed on the frontend.</p>
<h3>no framework</h3>
<p>the included vanilla js is fine for simple apps. it's ~50 lines. sometimes that's all you need.</p>
<h2>custom lexicons</h2>
<p>lexicons are atproto's schema system. they define what kinds of records your app stores in user repos.</p>
<h3>the basics</h3>
<p>lexicon IDs follow reverse-DNS format: <code>tld.domain.collection</code></p>
<p>examples:</p>
<ul> <li><code>com.myapp.settings</code> — user settings</li> <li><code>com.myapp.post</code> — posts</li> <li><code>com.myapp.graph.follow</code> — follow relationships</li> </ul>
<p>add yours in <code>src/types/lexicons.ts</code>:</p>
<pre><code>export const LEXICON_IDS = {
  SETTINGS: "com.example.settings",
  POST: "com.example.post",
} as const;
</code></pre>
<p>oauth scopes are built automatically from this. when you add a new lexicon, users will be prompted to authorize access to that collection.</p>
<h3>storing records</h3>
<p>once a user's logged in, write to their repo:</p>
<pre><code>await agent.com.atproto.repo.createRecord({
  repo: did,
  collection: "com.example.post",
  record: {
    text: "hello world",
    createdAt: new Date().toISOString(),
  },
});
</code></pre>
<p>the record lives in <em>their</em> PDS, not your server. they own it. they can export it, delete it, move PDSes — their data travels with them.</p>
<h3>reading records</h3>
<pre><code>const result = await agent.com.atproto.repo.listRecords({
  repo: did,
  collection: "com.example.post",
  limit: 50,
});
for (const record of result.data.records) {
  console.log(record.value.text);
}
</code></pre>
<p>define typescript interfaces alongside your lexicon IDs:</p>
<pre><code>export interface Post {
  text: string;
  tags?: string[];
  createdAt: string;
}
</code></pre>
<p>then cast when reading:</p>
<pre><code>const posts = result.data.records.map((r) =&gt; r.value as Post);
</code></pre>
<p>for full schema validation, you can write proper lexicon JSON schemas and use <code>@atproto/lexicon</code> to generate types. but for getting started, this works.</p>
<h2>using bluesky's lexicons</h2>
<p>you don't have to build everything yourself. bluesky has lexicons for common social features:</p>
<table> <tr> <th>lexicon</th> <th>what it is</th> </tr> <tbody> <tr> <td><code>app.bsky.feed.post</code></td> <td>posts (the tweets)</td> </tr> <tr> <td><code>app.bsky.feed.like</code></td> <td>likes</td> </tr> <tr> <td><code>app.bsky.feed.repost</code></td> <td>reposts</td> </tr> <tr> <td><code>app.bsky.graph.follow</code></td> <td>follows</td> </tr> <tr> <td><code>app.bsky.graph.block</code></td> <td>blocks</td> </tr> <tr> <td><code>app.bsky.actor.profile</code></td> <td>profile info</td> </tr> </tbody> </table>
<p>to use these, request the appropriate scopes. in dev mode, <code>transition:generic</code> gives you broad access. in production, be specific:</p>
<pre><code>const OAUTH_SCOPES = [
  "atproto",
  "repo:app.bsky.feed.post",
  "repo:app.bsky.feed.like",
];
</code></pre>
<h3>the bluesky API client</h3>
<p>the <code>@atproto/api</code> package has typed helpers for bluesky lexicons:</p>
<pre><code>// post to bluesky
await agent.post({
  text: "hello from my app",
});
// get user's feed
const feed = await agent.getAuthorFeed({
  actor: did,
  limit: 20,
});
// like a post
await agent.like(postUri, postCid);
</code></pre>
<p>see the <a href="https://github.com/bluesky-social/atproto/tree/main/packages/api">@atproto/api docs</a> for the full list.</p>
<h3>mixing custom + bluesky lexicons</h3>
<p>most apps will use some of each. maybe you have custom <code>com.myapp.settings</code> but use bluesky's posts and likes. that's fine — just add all the lexicon IDs you need.</p>
<h2>environment variables</h2>
<pre><code># your app's url (no trailing slash!)
PUBLIC_URL=http://127.0.0.1:3000
# database
TURSO_DATABASE_URL=file:./data.db        # local sqlite
# TURSO_DATABASE_URL=libsql://x.turso.io # production
# TURSO_AUTH_TOKEN=your-token
# optional
PORT=3000
NODE_ENV=development
</code></pre>
<h2>production</h2>
<ol> <li>set <code>PUBLIC_URL</code> to your real domain</li> <li>use <a href="https://turso.tech/">turso</a> or hosted sqlite for the database</li> <li>oauth client metadata will be served at <code>/oauth-client-metadata.json</code></li> <li>set <code>NODE_ENV=production</code> to use specific oauth scopes instead of <code>transition:generic</code></li> </ol>
<p>deploy anywhere that runs bun or node.</p>
<h2>what's next?</h2>
<p>once you've got the basics working, you'll probably want more. here are tools the community has built that you can reach for:</p>
<p><strong>identity</strong></p>
<ul> <li><a href="https://slingshot.microcosm.blue/">slingshot</a> — fast DID/handle resolution cache. useful when you're displaying posts from lots of different users and don't want to hammer plc.directory</li> <li><a href="https://pdsls.dev">pdsls.dev</a> — browse any atproto repo. great for debugging and understanding what's actually stored</li> </ul>
<p><strong>engagement</strong></p>
<ul> <li><a href="https://constellation.microcosm.blue/">constellation</a> — backlink index. answers "who liked this post?" across the whole network</li> <li><a href="https://spacedust.microcosm.blue/">spacedust</a> — real-time websocket for likes/reposts as they happen</li> </ul>
<p>MIT — do whatever you want with it.</p>
