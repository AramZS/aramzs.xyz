---
author: coffeencode.cc
cover_image: >-
  https://browser-run.coffeencode.cc/?url=https%3A%2F%2Fcoffeencode.cc%2Fdocs%2Fcdn%3FbrowserRun%3Dtrue
date: '2026-11-21T00:31:44.382Z'
dateFolder: 2026/11/20
description: Public CDN for fetching blobs (images) on the AT Protocol.
isBasedOn: 'https://coffeencode.cc/docs/cdn'
link: 'https://coffeencode.cc/docs/cdn'
slug: 2026-11-20-httpscoffeencodeccdocscdn
tags:
  - decentralization
title: Images (atCDN)
---
<p> <a href="https://coffeencode.cc/docs"> All docs</a> </p>
<p>atCDN is a public CDN for AT Protocol images, available at<br/>
<strong><code>https://cdn.coffeencode.cc</code></strong>. It serves blobs (avatars, banners, post<br/>
images) through Cloudflare's edge cache, resolving each author's PDS from<br/>
their DID and optionally resizing images through an<br/>
<a href="https://go.coffeencode.cc/p/stop?url=https%3A%2F%2Fimgproxy.net%2F&amp;viaPrivo=false&amp;sourceSiteName=Coffee+%26+Code&amp;sourceSiteUrl=https%3A%2F%2Fcoffeencode.cc">imgproxy</a> backend.</p>
<p>Anyone can use it — no API key, no signup. Build a URL from a DID and a blob<br/>
CID, request it, and you get the image.</p>
<h2>Quick start</h2>
<pre><code>&lt;!-- A user's avatar, 128x128 --&gt;
&lt;img src="https://cdn.coffeencode.cc/img/avatar_thumb/plain/did:plc:l37td5yhxl2irrzrgvei4qay/bafkreia6woar4xdzztr7npinlwu7suybwzvq2g7zv4clmpzkqfhzewotg4@jpeg" alt=""&gt;

&lt;!-- The same blob at a custom size --&gt;
&lt;img src="https://cdn.coffeencode.cc/blob/did:plc:l37td5yhxl2irrzrgvei4qay/bafkreia6woar4xdzztr7npinlwu7suybwzvq2g7zv4clmpzkqfhzewotg4?w=400&amp;h=300&amp;fit=crop" alt=""&gt;
</code></pre>
<p>To build URLs for a user, look up their <code>app.bsky.actor.profile</code> record on<br/>
their PDS (<code>com.atproto.repo.getRecord</code>) and read the <code>avatar</code>/<code>banner</code> blob<br/>
<code>ref.$link</code> for the CID, or use post embed images from<br/>
<code>app.bsky.feed.getPosts</code>.</p>
<p>Send <code>Accept: image/webp</code> and resized images come back as WebP; otherwise<br/>
JPEG. Hotlinking is fine — responses are edge-cached and permissive.</p>
<h2>Endpoints</h2>
<p>All endpoints are relative to <code>https://cdn.coffeencode.cc</code>.</p>
<table> <tr> <th>Endpoint</th> <th>Description</th> </tr> <tbody><tr> <td><code>GET /</code></td> <td>Landing page: health status, playground, examples</td> </tr> <tr> <td><code>GET /img/{type}/plain/{did}/{cid}[@ext]</code></td> <td>Bluesky social-app compatible image format</td> </tr> <tr> <td><code>GET /blob/{did}/{cid}[@ext][/{preset}]</code></td> <td>Generic AT Protocol blob, optional preset</td> </tr> <tr> <td><code>GET /blob/{did}/{cid}?w=256&amp;h=256&amp;fit=crop</code></td> <td>Resize via query params</td> </tr> <tr> <td><code>GET /imgproxy/?url=https://...&amp;w=400&amp;h=300&amp;fit=crop</code></td> <td>Resize any public image</td> </tr> <tr> <td><code>GET /presets</code></td> <td>JSON list of all presets</td> </tr> <tr> <td><code>GET /xrpc/_health</code></td> <td>Health check JSON</td> </tr> <tr> <td><code>GET /clear</code></td> <td>Clear the DID cache (token-protected if <code>CLEAR_TOKEN</code> is set)</td> </tr> </tbody></table>
<p>Only <code>GET</code> and <code>HEAD</code> are allowed; everything else returns <code>405</code>.</p>
<h2>URL formats</h2>
<h3><code>/img/</code> format (social-app compatible)</h3>
<pre><code>/img/{type}/plain/{did}/{cid}[@ext]
</code></pre>
<p>Example:</p>
<pre><code>/img/avatar_medium/plain/did:plc:l37td5yhxl2irrzrgvei4qay/bafkrei...@jpeg
</code></pre>
<p><code>@ext</code> is optional (<code>@jpeg</code>, <code>@png</code>, <code>@webp</code>, …) and is ignored when choosing the<br/>
output — the actual format is picked from the request's <code>Accept</code> header.</p>
<p>When the CID in the URL has gone stale (profile picture changed), <code>avatar*</code> and<br/>
<code>banner*</code> types automatically retry with the CID from the author's current<br/>
<code>app.bsky.actor.profile</code> record.</p>
<h4><code>/img/</code> types</h4>
<p>Avatar types (square, <code>cover</code> fit) — used for profile pictures, e.g. the<br/>
avatar beside a post or on a profile page:</p>
<ul> <li><code>avatar_thumbnail</code> — 64x64</li> <li><code>avatar_thumb</code> — 128x128</li> <li><code>avatar_small</code> — 240x240</li> <li><code>avatar_medium</code> — 400x400</li> <li><code>avatar_large</code> — 640x640</li> <li><code>avatar_fullsize</code> — original</li> </ul>
<p>Banner types (<code>cover</code> fit) — used for the profile header image:</p>
<ul> <li><code>banner_thumb</code> — 600x200</li> <li><code>banner_small</code> — 900x300</li> <li><code>banner_medium</code> — 1200x400</li> <li><code>banner_large</code> — 1500x500</li> <li><code>banner_fullsize</code> — original</li> </ul>
<p>Feed types (<code>inside</code> fit) — used for post embed images in timelines:</p>
<ul> <li><code>feed_thumb</code> — 400x400</li> <li><code>feed_small</code> — 600x600</li> <li><code>feed_medium</code> — 800x800</li> <li><code>feed_large</code> — 1200x1200</li> <li><code>feed_thumbnail</code> / <code>feed_fullsize</code> — original</li> </ul>
<h3><code>/blob/</code> format (generic AT Protocol)</h3>
<pre><code>/blob/{did}/{cid}[@ext]/{preset}
/blob/{did}/{cid}[@ext]?w=256&amp;h=256&amp;fit=crop
</code></pre>
<ul> <li>With a <strong>preset name</strong>, the image is resized to that preset (see table below).</li> <li>With <strong><code>w</code>/<code>h</code> query params</strong>, it resizes to those dimensions (capped at 4000px<br/>per side). <code>fit=crop</code> or <code>fit=cover</code> crops to fill; anything else (or omitted)<br/>fits inside the box preserving aspect ratio.</li> <li>With neither, the original blob is served. Unknown presets also serve the original.</li> </ul>
<h4>Presets</h4>
<table> <tr> <th>Preset</th> <th>Size (WxH)</th> <th>Fit</th> </tr> <tbody><tr> <td><code>avatar_thumb</code></td> <td>64x64</td> <td>cover</td> </tr> <tr> <td><code>avatar_small</code></td> <td>128x128</td> <td>cover</td> </tr> <tr> <td><code>avatar_medium</code></td> <td>256x256</td> <td>cover</td> </tr> <tr> <td><code>avatar_large</code></td> <td>512x512</td> <td>cover</td> </tr> <tr> <td><code>avatar_full</code></td> <td>1000x1000</td> <td>inside</td> </tr> <tr> <td><code>banner_thumb</code></td> <td>300x100</td> <td>cover</td> </tr> <tr> <td><code>banner_small</code></td> <td>600x200</td> <td>cover</td> </tr> <tr> <td><code>banner_medium</code></td> <td>900x300</td> <td>cover</td> </tr> <tr> <td><code>banner_large</code></td> <td>1500x500</td> <td>cover</td> </tr> <tr> <td><code>banner_full</code></td> <td>3000x1000</td> <td>inside</td> </tr> <tr> <td><code>thumb</code></td> <td>150x150</td> <td>cover</td> </tr> <tr> <td><code>small</code></td> <td>320x320</td> <td>inside</td> </tr> <tr> <td><code>medium</code></td> <td>640x640</td> <td>inside</td> </tr> <tr> <td><code>large</code></td> <td>1024x1024</td> <td>inside</td> </tr> <tr> <td><code>full</code></td> <td>2000x2000</td> <td>inside</td> </tr> <tr> <td><code>feed_thumb</code></td> <td>200x150</td> <td>cover</td> </tr> <tr> <td><code>feed_card</code></td> <td>360x240</td> <td>cover</td> </tr> <tr> <td><code>feed_small</code></td> <td>400x300</td> <td>cover</td> </tr> <tr> <td><code>feed_medium</code></td> <td>800x600</td> <td>cover</td> </tr> <tr> <td><code>feed_large</code></td> <td>1200x900</td> <td>cover</td> </tr> <tr> <td><code>feed_fullsize</code></td> <td>2000x2000</td> <td>inside</td> </tr> <tr> <td><code>wide_thumb</code></td> <td>320x180</td> <td>cover</td> </tr> <tr> <td><code>wide_small</code></td> <td>640x360</td> <td>cover</td> </tr> <tr> <td><code>wide_card</code></td> <td>800x450</td> <td>cover</td> </tr> <tr> <td><code>wide_medium</code></td> <td>1280x720</td> <td>cover</td> </tr> <tr> <td><code>wide_large</code></td> <td>1920x1080</td> <td>cover</td> </tr> </tbody></table>
<h3><code>/imgproxy/</code> — generic image proxy</h3>
<pre><code>/imgproxy/?url=https://example.com/photo.jpg&amp;w=400&amp;h=300&amp;fit=crop
</code></pre>
<p>Resizes any public image through imgproxy.</p>
<ul> <li><code>url</code> is required; <code>http:</code> and <code>https:</code> only, no credentials in the URL.</li> <li><code>w</code> and/or <code>h</code> is required (this prevents use as a plain pass-through proxy).</li> <li>Private/internal hosts are blocked: <code>localhost</code>, <code>*.local</code>, <code>*.internal</code>,<br/>IP literals, and single-label hostnames.</li> <li>If <code>PROXY_ALLOWED_HOSTS</code> is set, only those hosts (and <code>*.</code> suffixes) are allowed.</li> </ul>
<h2>Output format &amp; headers</h2>
<ul> <li><strong>WebP</strong> is served when the client sends <code>Accept: image/webp</code>, otherwise <strong>JPEG</strong><br/>(only when a resize applies; un-resized requests return the original bytes).</li> <li>Responses include <code>Content-Security-Policy: default-src 'none'; sandbox</code> and<br/><code>X-Content-Type-Options: nosniff</code> since blobs are user-controlled content.</li> <li><code>X-Format</code> identifies which route served the response (<code>img</code>, <code>blob</code>, <code>proxy</code>).</li> <li><code>Vary: Accept</code> is set on resized responses.</li> </ul>
<h3>Cache-Control</h3>
<table> <tr> <th>Route</th> <th>Policy</th> </tr> <tbody><tr> <td><code>/img/</code></td> <td><code>max-age=86400, s-maxage=604800, stale-while-revalidate=86400</code></td> </tr> <tr> <td><code>/blob/</code></td> <td><code>max-age=31536000, immutable</code> (CIDs are content-addressed)</td> </tr> <tr> <td><code>/imgproxy/</code></td> <td><code>max-age=86400</code></td> </tr> <tr> <td>404s</td> <td><code>max-age=60</code> (brief negative caching)</td> </tr> </tbody></table>
<h2>How it works</h2>
<ol> <li><strong>Route parsing</strong> — <code>/img/…</code> and <code>/blob/…</code> paths are matched against regexes;<br/>the DID and CID are validated (<code>did:plc:</code>/<code>did:web:</code> shapes, CID 10–128 chars).</li> <li><strong>Edge cache lookup</strong> — the Cloudflare <code>caches.default</code> store is checked first<br/>(cache keys are versioned by <code>imgproxy-v2</code> and output format). Cached entries<br/>older than 24h are served while a refresh runs in the background.</li> <li><strong>DID → PDS resolution</strong> — three tiers:<ul> <li>In-memory memo (1h TTL, max 5000 entries)</li> <li>D1 <code>did_cache</code> table (24h TTL)</li> <li>PLC lookup: <code>plc.eurosky.network</code> and <code>plc.directory</code> raced in parallel;<br/><code>did:web:</code> DIDs resolve via their <code>did.json</code> instead.<br/>The <code>#atproto_pds</code> service endpoint (https only) is extracted from the DID document.</li> </ul> </li> <li><strong>Origin fetch</strong> — <code>GET {pds}/xrpc/com.atproto.sync.getBlob?did=…&amp;cid=…</code><br/>with a 10s timeout. For stale avatar/banner CIDs, the current profile record's<br/>CID is retried once.</li> <li><strong>Resize</strong> — if a size applies and imgproxy is configured, the blob URL is<br/>fetched through a signed imgproxy URL (<code>rs:fill|fit:W:H</code>, smart gravity for<br/>cover crops, <code>sm:1</code> strips metadata). On imgproxy failure it falls back to the<br/>original and serves it honestly (no <code>Vary: Accept</code>).</li> </ol>
<h3>Caching layers</h3>
<table> <tr> <th>Layer</th> <th>What</th> <th>TTL</th> </tr> <tbody><tr> <td><code>caches.default</code></td> <td>Final responses (incl. brief 404s)</td> <td>up to 1yr / 24h refresh</td> </tr> <tr> <td>Memory map</td> <td>DID → PDS</td> <td>1h, max 5000</td> </tr> <tr> <td>D1 <code>did_cache</code></td> <td>DID → PDS</td> <td>24h</td> </tr> <tr> <td><code>cf</code> fetch cache</td> <td>PLC directory responses</td> <td>1h</td> </tr> <tr> <td><code>cf</code> fetch cache</td> <td>imgproxy responses</td> <td>7d</td> </tr> </tbody></table>
<p>A scheduled (cron) handler prunes expired <code>did_cache</code> rows and records<br/>
<code>last_cache_clear</code> in the <code>meta</code> table.</p>
<h2>Error responses</h2>
<table> <tr> <th>Status</th> <th>Meaning</th> </tr> <tbody><tr> <td>400</td> <td>Invalid DID, CID, URL, or missing required params</td> </tr> <tr> <td>401</td> <td><code>/clear</code> without the right token</td> </tr> <tr> <td>403</td> <td><code>/imgproxy/</code> host blocked or not in the allowlist</td> </tr> <tr> <td>404</td> <td>PDS not found, asset not found, or unknown route</td> </tr> <tr> <td>405</td> <td>Non-GET/HEAD method</td> </tr> <tr> <td>502</td> <td>Origin (PDS/imgproxy) returned an error or fetch failed</td> </tr> <tr> <td>503</td> <td><code>/imgproxy/</code> used when imgproxy isn't configured</td> </tr> <tr> <td>504</td> <td>Origin fetch timed out</td> </tr> </tbody></table>
<h2>Configuration (Worker env)</h2>
<table> <tr> <th>Binding/var</th> <th>Purpose</th> </tr> <tbody><tr> <td><code>DB</code> (D1)</td> <td>DID → PDS cache; tables <code>did_cache(did, pds_url, cached_at)</code> and <code>meta(key, value)</code></td> </tr> <tr> <td><code>D1_CACHE_ENABLED</code></td> <td>Set <code>"false"</code> to disable the D1 cache</td> </tr> <tr> <td><code>IMGPROXY_URL</code></td> <td>imgproxy base URL; required for resizing</td> </tr> <tr> <td><code>IMGPROXY_KEY</code></td> <td>Hex-encoded HMAC key for URL signing</td> </tr> <tr> <td><code>IMGPROXY_SALT</code></td> <td>Hex-encoded HMAC salt</td> </tr> <tr> <td><code>IMGPROXY_SECRET</code></td> <td>Optional <code>Bearer</code> token sent to imgproxy</td> </tr> <tr> <td><code>PROXY_ALLOWED_HOSTS</code></td> <td>Comma-separated allowlist for <code>/imgproxy/</code> (supports <code>*.</code> wildcards); empty = any public host</td> </tr> <tr> <td><code>CLEAR_TOKEN</code></td> <td>If set, <code>/clear</code> requires it via <code>?token=</code> or <code>Authorization: Bearer</code></td> </tr> </tbody></table>
<p>Resizing is enabled only when <code>IMGPROXY_URL</code>, <code>IMGPROXY_KEY</code>, <strong>and</strong><br/>
<code>IMGPROXY_SALT</code> are all set — otherwise every request serves the original.</p>
<h2>Health check</h2>
<p><code>GET /xrpc/_health</code> returns:</p>
<pre><code>{
  "status": "ok | degraded",
  "version": "5.2.0",
  "admin_did": "did:plc:…",
  "admin_contact_email": "atcdn@danielmorrisey.com",
  "service_name": "atCDN for Bluesky &amp; the AT Protocol by the BlueAT Network",
  "primary_plc_directory": "https://plc.eurosky.network",
  "backup_plc_directory": "https://plc.directory",
  "d1_cache_enabled": true,
  "imgproxy": { "configured": true, "ok": true, "status": 200 },
  "features": { "img_format": "…", "blob_format": "…", "generic_proxy": "…" },
  "plc_health": [{ "directory": "…", "ok": true, "status": 200 }],
  "db": { "cached_dids": 0, "stale_dids": 0, "last_cache_clear": "…" }
}
</code></pre>
<p>Status is <code>ok</code> when at least one PLC directory is reachable and the D1 cache is<br/>
healthy. When imgproxy is unconfigured or down it is reported but requests keep<br/>
working by serving originals.</p>
<aside> <h2>On this page</h2> </aside>
