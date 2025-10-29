---
author: Bailey Townsend
cover_image: 'https://baileytownsend.dev/article-assets/12/cover.png'
date: '2025-07-29T11:57:18.496Z'
dateFolder: 2025/07/29
description: Learn how to use a Cloudflare Tunnel to host your PDS on a local network.
isBasedOn: 'https://baileytownsend.dev/articles/host-a-pds-with-a-cloudflare-tunnel'
link: 'https://baileytownsend.dev/articles/host-a-pds-with-a-cloudflare-tunnel'
slug: 2025-07-29-httpsbaileytownsenddevarticleshost-a-pds-with-a-cloudflare-tunnel
tags:
  - code
  - tech
  - decentralization
title: Host a PDS via a Cloudflare Tunnel
---
<p><a href="https://baileytownsend.dev/"> ← Back to Articles </a></p>
<figure><img alt="ascii text that shows a cloud above the text atproto " src="https://baileytownsend.dev/article-assets/12/cover.png"/><figcaption>ascii text that shows a cloud above the text atproto </figcaption></figure>
<p><a href="https://oasiscenter.org/">Thinking of sponsoring me? Maybe make a donation to the Oasis Center instead!</a></p>
<p>So, you want to host a PDS on your network, but you may not want to open a port on your router(or able to). Or port 80/443 is already taken up by an application, and you don't want to deal with Caddy/nginx. Well, if that's the case then this is the blog post for you! Today we are going to set up a PDS and use a <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/">Cloudflare Tunnel</a> to proxy requests from the web to your locally hosted PDS.</p>
<h1>Table of Contents</h1>
<h1>Requirements</h1>
<ul><li>A domain that is hosted on Cloudflare. I also recommend using a top level domain, Like <code>attoolbox.app</code>. Not something like <code>pds.attoolbox.app</code> if you are planing on using handles on it like <code>bailey.attoolbox.app</code>. If you don't have one, can do <code>pds.yourdomain.name</code>. Just may expect to have to manually set a <code>_atprot.</code> DNS TXT record so they resolve.</li><li>A Linux Distro. Raspberry Pi OS works great and what I used when writing this guide. Or I use Ubuntu 24.04 LTS for my main.</li><li>About 30 minutes of free time</li></ul>
<h1>Cloudflare Tunnel Setup</h1>
<p>I'm not going to get too much into how to create a tunnel <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/">since their documentation does it well</a>. Once you are done with step 1 and have <code>cloudflared</code> installed and connected you can come back to this guide.</p>
<p>With <code>cloudflared</code> installed and your tunnel connecting you should now be on a page to add a public hostname. We want to create 2 of these.</p>
<p>The first one that handles all your XRPC requests</p>
<ul><li>Leave subdomain blank</li><li>Domain is the domain you are using</li><li>Service Type is HTTP</li><li>URL is <code>localhost:3000</code></li></ul>
<figure><img alt="Picture on cloudflare of the above settings" data-nuxt-img="" src="https://baileytownsend.dev/_vercel/image?url=%2Farticle-assets%2F12%2Fpublic_host_one.jpg&amp;w=1536&amp;q=100" srcset="https://baileytownsend.dev/_vercel/image?url=%2Farticle-assets%2F12%2Fpublic_host_one.jpg&amp;w=1536&amp;q=100%201x,%20/_vercel/image?url=%2Farticle-assets%2F12%2Fpublic_host_one.jpg&amp;w=1536&amp;q=100%202x"/><figcaption>Picture on cloudflare of the above settings</figcaption></figure>
<p>Then can click complete setup. We do need to setup a second one so can click on the tunnel name -&gt; edit -&gt; public hostnames -&gt; add a public hostname</p>
<p>The second one for handles like <code>bailey.attoolbox.app</code></p>
<ul><li>Set <code>*</code> for the subdomain</li><li>Domain is the domain you are using</li><li>Service Type is HTTP</li><li>URL is <code>localhost:3000</code></li></ul>
<figure><img alt="Picture on cloudflare of the above settings" data-nuxt-img="" src="https://baileytownsend.dev/_vercel/image?url=%2Farticle-assets%2F12%2Fpublic_host_two.jpg&amp;w=1536&amp;q=100" srcset="https://baileytownsend.dev/_vercel/image?url=%2Farticle-assets%2F12%2Fpublic_host_two.jpg&amp;w=1536&amp;q=100%201x,%20/_vercel/image?url=%2Farticle-assets%2F12%2Fpublic_host_two.jpg&amp;w=1536&amp;q=100%202x"/><figcaption>Picture on cloudflare of the above settings</figcaption></figure>
<p>Next we are going to set up a <code>CNAME</code> record with the name <code>*</code> for the domain <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/routing-to-tunnel/dns/">following this</a>. (Can copy the Target from the other record the tunnel created for the first public hostname).</p>
<p>And that's it! Cloudflare will handle your SSL and routing via the Tunnel.</p>
<h1>Installing Your PDS</h1>
<p>We're going to <em>mostly</em> follow the guide from Bluesky found <a href="https://atproto.com/guides/self-hosting">here for PDS self-hosting</a>.</p>
<p>We are going to skip on down to <a href="https://atproto.com/guides/self-hosting#installer-on-ubuntu-20-04-22-04-and-debian-11-12">Installer on Ubuntu20.04/22.04 and Debian 11/12</a>. Since we set up all the DNS stuff with the Cloudflare Tunnel setup.</p>
<p>Get the <a href="https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh">installer.sh</a> script.</p>
<p>Can use <code>wget</code></p>
<pre><code>wget https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh
</code></pre>
<p>or <code>curl</code></p>
<pre><code>curl https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh &gt;installer.sh
</code></pre>
<blockquote><p><em><strong>If you are wanting to install the PDS to a newer distro, like maybe Ubuntu 24.04 LTS, you can go to <a href="https://baileytownsend.dev/articles/host-a-pds-with-a-cloudflare-tunnel#bonus-install-on-newer-distros"><em>Bonus</em> Install on newer distros</a> and then come back here once you are done.</strong></em></p></blockquote>
<p>Can run the script with this</p>
<p>After you get the script and run it, you should see this screen.</p>
<pre><code>  DNS record with the value of your server's public IP address.
  + Any DNS name that can be resolved on the public internet will work.
  + Replace example.com below with any valid domain name you control.
  + A TTL of 600 seconds (10 minutes) is recommended.
    example.com         A      104.236.54.66
    *.example.com       A      104.236.54.66
  before attempting to use it. This will allow time for the DNS record
</code></pre>
<p>You can ignore the DNS setup, since it's already done with the tunnel setup. Go ahead and enter your domain name you want to use for the PDS,</p>
<p>For <code>Enter an admin email address (e.g.) you@example.com</code> I put an email I set up using <a href="https://resend.com/">resend</a> from their <a href="https://github.com/bluesky-social/pds?tab=readme-ov-file#setting-up-smtp">Setting up SMTP</a> section.</p>
<blockquote><p>If you're not getting emails may check that you have the value set in <code>/pds/pds.env</code> and sometimes a <code>docker compose down</code> and <code>docker compose up -d</code> helps to refresh the containers env variables.</p></blockquote>
<p>After that you wait for the installer to do its thing. Once that is done it asks you if you <code>Create a PDS user account? (y/N): </code> I recommend setting one up so you can use it as a test that <code>*.yourdomain.com</code> handles are resolving fine.</p>
<h1>After Install Surgery</h1>
<p>This is optional, but I recommend it. Since we're not using Caddy you want to remove it from the docker compose</p>
<ol><li>Login as root</li><li><code>cd /pds</code></li><li>Open open <code>compose.yaml</code></li><li>Remove the service <code>caddy</code> lines <code>4-16</code>. Should look like this after</li></ol>
<pre><code>    container_name: pds
    image: ghcr.io/bluesky-social/pds:0.4
    network_mode: host
    restart: unless-stopped
    network_mode: host
</code></pre>
<ol start="5"><li>run <code>docker compose down</code> to remove the caddy container</li><li>run <code>docker compose up -d</code> to bring everything back online</li></ol>
<p>The <a href="https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh">installer.sh</a> does a check to make sure you are using only a distro Bluesky has confirmed works. I have my personal account <a href="https://bsky.app/profile/baileytownsend.dev">@baileytownsend.dev</a> hosted on a VPS running Ubuntu 24.04 LTS. So I feel comfortable to say you can install and run a PDS from a newer LTS Ubuntu distro.</p>
<p>Once you download the <a href="https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh">installer.sh</a>. You can open it in your text editor of your choice and comment out lines <code>89-114</code>. These are the lines to remove.</p>
<pre><code>  # If the platform is unknown (not uncommon) then we assume x86_64
  if &lsqb;&lsqb; "${PLATFORM}" == "unknown" &rsqb;&rsqb;; then
  if &lsqb;&lsqb; "${PLATFORM}" != "x86_64" &rsqb;&rsqb; &amp;&amp; &lsqb;&lsqb; "${PLATFORM}" != "aarch64" &rsqb;&rsqb; &amp;&amp; &lsqb;&lsqb; "${PLATFORM}" != "arm64" &rsqb;&rsqb;; then
  if &lsqb;&lsqb; "${DISTRIB_ID}" == "ubuntu" &rsqb;&rsqb;; then
    if &lsqb;&lsqb; "${DISTRIB_CODENAME}" == "focal" &rsqb;&rsqb;; then
    elif &lsqb;&lsqb; "${DISTRIB_CODENAME}" == "jammy" &rsqb;&rsqb;; then
    elif &lsqb;&lsqb; "${DISTRIB_CODENAME}" == "mantic" &rsqb;&rsqb;; then
    if &lsqb;&lsqb; "${DISTRIB_CODENAME}" == "bullseye" &rsqb;&rsqb;; then
    elif &lsqb;&lsqb; "${DISTRIB_CODENAME}" == "bookworm" &rsqb;&rsqb;; then
</code></pre>
<p>IF you see the dreaded Invalid Handle like below, don't sweat it. I'm going to give you a few tips and can always @ me on Bluesky, and we can figure it out. I got it twice today setting up PDSes, it's easy to mess up.</p>
<figure><img alt="Picture of a profile saying invalid handle" data-nuxt-img="" src="https://baileytownsend.dev/_vercel/image?url=%2Farticle-assets%2F12%2Foh_no.jpg&amp;w=1536&amp;q=100" srcset="https://baileytownsend.dev/_vercel/image?url=%2Farticle-assets%2F12%2Foh_no.jpg&amp;w=1536&amp;q=100%201x,%20/_vercel/image?url=%2Farticle-assets%2F12%2Foh_no.jpg&amp;w=1536&amp;q=100%202x"/><figcaption>Picture of a profile saying invalid handle</figcaption></figure>
<p>IF your handle is like <code>bailey.yourpdsdomain.com</code>, and when you check on the debug page and see that HTTP Verification method is failing. Then double check <a href="https://baileytownsend.dev/articles/host-a-pds-with-a-cloudflare-tunnel#cloudflare-tunnel-setup">Cloudflare Tunnel Setup</a>. Will most likely have to do with one of the <code>*</code> settings. Either the DNS record was missed or the tunnel public hostname. If you do resolve it and still see Invalid Handle on bsky, but the debug page says you're good. You may have to wait about 2-4 hours. The app view caches it for a while, that's how long it took for mine to resolve itself.</p>
<p>IF you went with something like <code>bailey.pds.yourpdsdomain.com</code>, you are probably going to be better off setting a <code>_atproto</code> TXT record for it. The record would be <code>_atproto.bailey.pds</code>, more info on that <a href="https://atproto.com/specs/handle#dns-txt-method">here</a>.</p>
<p>Worse comes to worst can always just do <code>_atproto.bailey</code> so you end up with <code>bailey.yourpdsdomain.com</code> via the setup in settings found <a href="https://bsky.app/settings/account">here</a>. Just remember it will be cached for a bit and may not show up right away on Bluesky even tho the debug tool says it's fine.</p>
<p>I ended up writing this guide while setting up a PDS on a Raspberry Pi Zero 2 W. So that may be a cheap fun way to try out self hosting. I'm not sure if I would host your main account on it though...</p>
<p>And that's about it! Thanks for reading, and I hope this helps, feel free to @ me if you hit any problems or have questions.</p>
<p><a href="https://baileytownsend.dev/"> ← Back to Articles </a></p>
