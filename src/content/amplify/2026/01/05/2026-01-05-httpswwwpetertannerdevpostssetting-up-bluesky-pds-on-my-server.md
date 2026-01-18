---
author: Peter Tanner
cover_image: ''
date: '2026-01-05T23:00:22.238Z'
dateFolder: 2026/01/05
description: >-
  I’ve decided to join Bluesky, purely because I like how the federation system
  works and being able to keep my own data on my own server.
isBasedOn: 'https://www.petertanner.dev/posts/Setting-up-BlueSky-PDS-on-my-server/'
link: 'https://www.petertanner.dev/posts/Setting-up-BlueSky-PDS-on-my-server/'
slug: 2026-01-05-httpswwwpetertannerdevpostssetting-up-bluesky-pds-on-my-server
tags:
  - tech
  - social media
  - decentralization
title: Setting up BlueSky PDS on my server
---
<p>I’ve decided to join Bluesky, purely because I like how the federation system works and being able to keep my own data on my own server.</p>
<p>My setup uses NGINX as a reverse proxy since that is what I am currently using and the BlueSky PDS is hosted on a docker instance.</p>
<p>I followed <a href="https://cprimozic.net/notes/posts/notes-on-self-hosting-bluesky-pds-alongside-other-services/">this guide</a>. Some things are missing from the guide, for example creating the initial <code>pds.env</code> file. You can use the installation script, but I didn’t want to install caddy or any other unused packages, so I <a href="https://gist.github.com/peter-tanner/1ede26badfd7759d38dcd46d155ecbd5">modified the script and have put it on GitHub gist here</a>.</p>
<p>For the NGINX configuration, put your routes under <code>ssl</code>:</p>
<p><code><table><tbody><tr><td><pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
</pre></td><td><pre>server {
        listen 443 ssl;
        server_name petertanner.dev;

        ssl_certificate /etc/letsencrypt/live/petertanner.dev/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/petertanner.dev/privkey.pem;

        location /xrpc {
                proxy_pass http://[DOCKER IP ADDRESS]:6010;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                # WebSocket support
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }

        location /.well-known/atproto-did {
                default_type text/plain;
                return 200 "did:plc:[DID]";
        }

        # Note that I redirect https://petertanner.dev -&gt; https://www.petertanner.dev for my website (anything other than the bluesky related endpoints).
        location / {
                return 301 $scheme://www.petertanner.dev$request_uri;
        }
}
</pre></td></tr></tbody></table></code></p>
<p>I hard coded the <code>atproto-did</code> because I was having issues with invalid handle and also because the PDS returned <code>User not found</code> for some reason. This is probably not good practice but it worked.</p>
<p>Note that the guide puts the Bluesky data directory under <code>/opt/pds</code> instead of <code>/pds</code></p>
<p>To use <code>pdsadmin</code>, simply copy the <code>pdsadmin.sh</code> script from the <code>pds</code> repository and make it executable. When using it with the data directory under <code>/opt/pds</code>, either modify the script or call it as follows: <code>PDS_ENV_FILE=/opt/pds/pds.env ./pdsadmin.sh [...]</code></p>
<p>As stated in the guide, I had to first create an account on a “subdomain” (<code>temp.petertanner.dev</code>) and then change it in the account settings once logged in. Using this <a href="https://bsky-debug.app/handle">service</a> I checked that the verification worked. However, even with both HTTP and DNS verified, I still got the error <code>Failed to verify handle. Please try again.</code> for both methods. I checked in the debug console, and it looked like bad requests were being sent to my server (400).</p>
<p>I did some more digging and found <a href="https://github.com/bluesky-social/atproto/discussions/2909#discussioncomment-11157373">this answer</a>. Using the <code>goat</code> tool worked great, and it resolved both the issue of not being able to change my handle and the invalid handle issues.</p>
<p><code><table><tbody><tr><td><pre>1
2
</pre></td><td><pre>goat account login -u did:plc:&lt;did&gt; -p &lt;password&gt;
goat account update-handle &lt;domain&gt;
</pre></td></tr></tbody></table></code></p>
<p>You can find me on Bluesky at <a href="https://bsky.app/profile/petertanner.dev">@petertanner.dev</a></p>
