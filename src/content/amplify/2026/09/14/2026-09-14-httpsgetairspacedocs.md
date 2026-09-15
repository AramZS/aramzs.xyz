---
author: getair.space
cover_image: 'https://getair.space/og.png'
date: '2026-09-14T19:35:55.043Z'
dateFolder: 2026/09/14
description: 'The airspace API, one page at a time.'
isBasedOn: 'https://getair.space/docs'
link: 'https://getair.space/docs'
slug: 2026-09-14-httpsgetairspacedocs
tags:
  - tech
  - decentralization
title: getting started
---
<p>airspace uses an atproto account as the backend for your app: typed reads and writes, file uploads, login and a public API, with no database to run.</p>
<p>This page shows how to use <code>airspace</code> by building a sample app. New to atproto? <a href="https://getair.space/docs/concepts">Read the terms first</a>.</p>
<h2>what you need</h2>
<p>Node 22 or newer, and an account on a PDS (personal data server) you can log into.</p>
<p>To run a PDS locally:</p>
<pre><code>git clone https://github.com/danielroe/airspace
cd airspace
pnpm install
pnpm dev:pds</code></pre>
<p>That serves a PDS on <code>http://localhost:2583</code> and prints credentials for two accounts. Keep it running.</p>
<p>To use your own account instead, create an app password in your account settings, and use <code>https://bsky.social</code> (or wherever your account lives) as the service. Spaces, at the end of this page, won't work there yet.</p>
<h2>a project</h2>
<pre><code>mkdir notes &amp;&amp; cd notes
pnpm init
pnpm pkg set type=module
pnpm add airspace</code></pre>
<h2>your schemas</h2>
<p>Every record needs a schema, called a lexicon:</p>
<pre><code>// lexicons.ts
import { defineLexicons, field, space } from 'airspace/lexicon'

export default defineLexicons('dev.example', {
  note: {
    title: field.text({ max: 120 }),
    body: field.markdown(),
    createdAt: field.datetime(),
  },
  workspace: space(['note']),
})</code></pre>
<p>The first argument is your namespace: a domain you own, reversed. <code>getair.space</code> becomes <code>space.getair</code>, which sadly isn't that catchy. So <code>note</code> here defines the record type <code>dev.example.note</code>.</p>
<p><code>workspace</code> declares a <a href="https://getair.space/docs/spaces">space</a>, a private area for drafts, used at the end of this page.</p>
<h2>your collections</h2>
<p>Records of one type live in a collection:</p>
<pre><code>// collections.ts
import { defineCollections, defineSpace } from 'airspace'
import lexicons from './lexicons.ts'

export const { note: notes } = defineCollections(lexicons, {
  note: { sort: [['createdAt', 'desc']] },
})

export const workspace = defineSpace(lexicons.workspace, {
  collections: { notes },
})</code></pre>
<h2>a client</h2>
<p>Reads need no credentials, since a repo is public. Writes need a session:</p>
<pre><code>// notes.ts
import { createAirspace, passwordSession } from 'airspace'
import { workspace } from './collections.ts'

const session = await passwordSession({
  service: 'http://localhost:2583',
  identifier: process.env.PDS_IDENTIFIER!,
  password: process.env.PDS_PASSWORD!,
})

export const airspace = createAirspace({
  // on a public PDS, your handle is enough: identity: 'you.example.com'
  identity: { did: process.env.PDS_DID!, service: 'http://localhost:2583' },
  spaces: { workspace },
  session,
})</code></pre>
<h2>read and write</h2>
<pre><code>// run.ts
import { airspace } from './notes.ts'

await airspace.notes.create({
  title: 'Hello',
  body: '# hello\n\nfrom my own repo.',
  createdAt: new Date().toISOString(),
})

for (const note of await airspace.notes.list())
  console.log(note.rkey, note.value.title)</code></pre>
<pre><code># `pnpm dev:pds` prints all three
PDS_DID=did:plc:... PDS_IDENTIFIER=alice.test PDS_PASSWORD=hunter2 node run.ts</code></pre>
<p>Both notes are now in your public repo, which you can browse on <a href="https://pdsls.dev"><code>pdsls</code></a>.</p>
<h2>your first draft</h2>
<p>Anything in your repo is public straight away, which is awkward for a half-finished note. A space is a private area of the same repo, and <code>publish()</code> copies a record out of it.</p>
<blockquote>Spaces are experimental. They need a PDS running prerelease software: atproto's <code>permissioned-data</code> branch, or the <code>@atproto/pds</code> <a href="https://atproto.com/blog/atproto-spaces-alpha">spaces alpha</a>. Hosted PDSes, including <code>bsky.social</code>, do not support them yet. The API may change. <code>pnpm dev:pds</code> runs one that does support them.</blockquote>
<pre><code>const draft = await airspace.workspace.notes.create({
  title: 'Not public yet',
  body: 'still writing',
  createdAt: new Date().toISOString(),
})

await airspace.workspace.notes.publish(draft.rkey)

await airspace.workspace.supported() // check first, and hide the feature if false</code></pre>
<h2>next steps</h2>
<ul><li><a href="https://getair.space/docs/model">Your content model</a>: field types, relations and singletons.</li><li><a href="https://getair.space/docs/reading-and-writing">Reading and writing</a>: queries, paging, caching and live updates.</li><li><a href="https://getair.space/docs/oauth">OAuth and permission sets</a>: logging in as someone else.</li></ul>
<p><a data-v-11abb418="" href="https://getair.space/docs/concepts">nextatproto in five minutes</a></p>
