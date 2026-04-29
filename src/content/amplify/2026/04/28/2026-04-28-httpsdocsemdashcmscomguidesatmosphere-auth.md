---
author: EmDash
cover_image: ''
date: '2026-04-28T16:35:33.554Z'
dateFolder: 2026/04/28
description: >-
  Sign in to EmDash with an Atmosphere account — the open-network identity
  behind Bluesky and the wider AT Protocol ecosystem.
isBasedOn: 'https://docs.emdashcms.com/guides/atmosphere-auth/'
link: 'https://docs.emdashcms.com/guides/atmosphere-auth/'
slug: 2026-04-28-httpsdocsemdashcmscomguidesatmosphere-auth
tags:
  - code
  - tech
  - decentralization
title: Atmosphere Login
---
<p>The <code>@emdash-cms/auth-atproto</code> package adds an <a href="https://atmosphereaccount.com"><strong>Atmosphere account</strong></a> login option to EmDash. An Atmosphere account is a portable, user-owned identity used across <a href="https://bsky.app">Bluesky</a> and other apps in the AT Protocol network. Users sign in with their handle (e.g. <code>alice.bsky.social</code>) and authenticate at their own provider — EmDash never sees a password.</p>
<p>This is a good fit when:</p>
<ul> <li>Your contributors already have an Atmosphere account.</li> <li>You want to gate an org-controlled domain (<code>*.yourcompany.com</code>) without managing OAuth apps or invites.</li> <li>You’re building something that’s part of the wider Atmosphere and want consistent identity with the rest of your stack.</li> </ul>
<figure><figcaption>Terminal window</figcaption><pre data-language="bash"><code>pnpm add @emdash-cms/auth-atproto</code></pre></figure>
<figure><pre data-language="js"><code>import { defineConfig } from "astro/config";import emdash from "emdash/astro";import { atproto } from "@emdash-cms/auth-atproto";host: "127.0.0.1", // required for local dev — see "Local development" below</code></pre></figure>
<p>That’s enough to put <strong>Sign in with Atmosphere</strong> on the login page and the setup wizard. With no allowlist configured, the first user becomes Admin and self-signup is closed for everyone after that — see <a href="https://docs.emdashcms.com/guides/atmosphere-auth/#allowlists">allowlists</a> to open it up.</p>
<p>No environment variables, client secret, or OAuth-app registration is required. The provider is a public OAuth client and serves its own metadata document at <code>/.well-known/atproto-client-metadata.json</code>.</p>
<figure><pre data-language="js"><code>allowedDIDs: ["did:plc:abc123..."],allowedHandles: ["*.example.com", "alice.bsky.social"],</code></pre></figure>
<table><tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr><tbody><tr><td><code>allowedDIDs</code></td><td><code>string[]</code></td><td>none (allow all on first)</td><td>DID allowlist. DIDs are permanent and can’t be spoofed.</td></tr><tr><td><code>allowedHandles</code></td><td><code>string[]</code></td><td>none (allow all on first)</td><td>Handle allowlist. Supports wildcards (<code>*.example.com</code>).</td></tr><tr><td><code>defaultRole</code></td><td><code>number</code></td><td><code>10</code> (Subscriber)</td><td>Role assigned to allowed users after the first. First user is always Admin.</td></tr></tbody></table>
<p>The full role ladder is documented in the main <a href="https://docs.emdashcms.com/guides/authentication/#user-roles">authentication guide</a>.</p>
<p>If neither <code>allowedDIDs</code> nor <code>allowedHandles</code> is set, only the <strong>first user</strong> can sign up — anyone else attempting to log in will be rejected with <code>signup_not_allowed</code>. Existing users can always sign back in regardless of the allowlist (so removing yourself from the list won’t lock you out, but won’t let new people in either).</p>
<p>When at least one allowlist is configured, a user is admitted if <strong>either</strong> list matches:</p>
<ul> <li><strong>DID match.</strong> The user’s DID is in <code>allowedDIDs</code>. DIDs are cryptographic identifiers that can’t be moved or impersonated, so this is the strictest form of gating.</li> <li><strong>Handle match.</strong> The user’s handle matches an entry in <code>allowedHandles</code>, exactly or via a leading-wildcard pattern (<code>*.example.com</code> matches <code>alice.example.com</code> and <code>bob.team.example.com</code>).</li> </ul>
<p>Handle allowlists are safe even though handles are mutable. Before admitting a user via a handle match, EmDash independently resolves the handle’s DNS/HTTP record and verifies that it points at the same DID the provider claims. A misbehaving provider can’t simply assert it owns <code>you@yourcompany.com</code>.</p>
<aside> <p>Use <code>allowedDIDs</code> for individuals and <code>allowedHandles</code> with a wildcard for org-level access. The two are additive — list specific external DIDs alongside a wildcard for staff handles.</p> </aside>
<p>Allowed users land on the role you set in <code>defaultRole</code>. Only the first user — the one who completes setup — is forced to Admin. There’s no group/role mapping for Atmosphere accounts; if you need finer-grained roles, change the user’s role from <strong>Settings → Users</strong> after they’ve logged in once.</p>
<p>When you start a fresh site with the Atmosphere provider configured, the setup wizard offers it as an option for creating the initial admin account.</p>
<ol> <li> <p>Visit <code>/_emdash/admin</code>. The setup wizard takes you through site title, tagline, and admin email.</p> </li> <li> <p>On the “Create admin account” step, choose <strong>Atmosphere</strong> and enter your handle (e.g. <code>alice.bsky.social</code>).</p> </li> <li> <p>You’ll be redirected to your account’s authorization page, where you sign in however your provider supports — password, passkey, or whatever else.</p> </li> <li> <p>After approval you’re sent back to EmDash, the admin user is created with role 50 (Admin), and the email you entered in step 1 is stored against your account.</p> </li> </ol>
<p>The same flow runs for every subsequent login — handle in, redirect to your provider, redirect back, you’re signed in.</p>
<p>The AT Protocol OAuth profile requires loopback redirect URIs to use an <strong>IP literal</strong> (<code>127.0.0.1</code> or <code>[::1]</code>), not <code>localhost</code>. EmDash transparently rewrites <code>://localhost</code> to <code>://127.0.0.1</code> when generating the redirect URI, but that means your dev session needs to start on <code>127.0.0.1</code> too — otherwise the session cookie set on <code>localhost</code> won’t be visible after the redirect lands you on <code>127.0.0.1</code>.</p>
<p>Astro’s dev server is Vite’s dev server, and Vite binds to <code>localhost</code> by default. Tell it to listen on the loopback IP as well:</p>
<p>Then open <code>http://127.0.0.1:4321/_emdash/admin</code> for the whole flow.</p>
<aside> <p>If you stay on <code>http://localhost:4321</code>, the round-trip to your provider succeeds but you arrive back on <code>127.0.0.1</code> with no session cookie and bounce back to the login page. This is a dev-server-binding issue, not a bug in the auth flow.</p> </aside>
<p>There’s nothing extra to configure for production. The provider serves its own client metadata at:</p>
<figure><pre data-language="plaintext"><code>https://your-site.example.com/.well-known/atproto-client-metadata.json</code></pre></figure>
<p>Authorization servers fetch this URL during the login dance to verify the client’s redirect URI. Make sure your deployment’s site URL is reachable on the public internet over HTTPS — internal-only deployments behind a VPN won’t be able to complete a login because the user’s authorization server can’t fetch the metadata document.</p>
<p>If you run EmDash behind a TLS-terminating reverse proxy, set <a href="https://docs.emdashcms.com/reference/configuration#siteurl"><code>siteUrl</code></a> so EmDash builds the right redirect URI. Without it, requests look like <code>http://internal-host:4321</code> and the metadata won’t match what the auth server sees.</p>
<p>The handle or DID you signed in with isn’t in <code>allowedDIDs</code> / <code>allowedHandles</code>. Check the wildcard pattern (it must start with <code>*.</code>) and remember the handle match is verified against DNS/HTTP — if the handle’s DID record doesn’t currently resolve to the same DID the provider returned, the match is rejected.</p>
<p>You hit the callback successfully but no allowlist is configured and you aren’t the first user. Either add yourself to <code>allowedDIDs</code>/<code>allowedHandles</code>, or have an existing admin invite you so the user already exists when you log in.</p>
<p>This is almost always the loopback-cookie issue described in <a href="https://docs.emdashcms.com/guides/atmosphere-auth/#local-development">Local development</a>. Open the admin at <code>http://127.0.0.1:4321</code> (after setting <code>server.host: "127.0.0.1"</code>) and try again.</p>
<p>The provider verifies handles by racing DNS-over-HTTPS (Cloudflare’s DoH endpoint) and an HTTP <code>/.well-known/atproto-did</code> lookup. Self-hosted handles need at least one of:</p>
<ul> <li>A <code>_atproto.&lt;handle&gt;</code> DNS TXT record containing <code>did=&lt;your-did&gt;</code>, or</li> <li>An <code>https://&lt;handle&gt;/.well-known/atproto-did</code> file containing the DID.</li> </ul>
<p>If both methods fail, the handle match is rejected even when the underlying account is valid. DIDs in <code>allowedDIDs</code> aren’t affected — they’re matched directly.</p>
