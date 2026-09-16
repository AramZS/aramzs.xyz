---
author: Angel
cover_image: 'https://scottech.software/assets/img/pds.jpeg'
date: '2026-09-16T04:09:29.891Z'
dateFolder: 2026/09/16
description: Self Host a Personal Data Server (PDS) for your BlueSky Account
isBasedOn: 'https://scottech.software/posts/self_host_pds'
link: 'https://scottech.software/posts/self_host_pds'
slug: 2026-09-16-httpsscottechsoftwarepostsselfhostpds
tags:
  - tech
  - decentralization
title: Self Hosting a Personal Data Server (PDS) for BlueSky
---
<figure><a href="https://scottech.software/assets/img/pds.jpeg"><img alt="Preview Image" src="https://scottech.software/assets/img/pds.jpeg"/></a><figcaption><a href="https://scottech.software/assets/img/pds.jpeg">Preview Image</a></figcaption></figure>
<p>Self-hosting a Bluesky Personal Data Server (PDS) allows you to run your own instance that federates with the wider ATProto network. This guide covers setting up a PDS on a Digital Ocean droplet, configuring DNS, and maintaining your server.</p>
<p>Launch a server on a cloud provider such as Digital Ocean or Vultr. Ensure SSH access and root privileges.</p>
<p>| Operating System | Ubuntu 22.04 | |—————–|————-| | RAM | 1 GB | | CPU Cores | 1 | | Storage | 20 GB SSD |</p>
<p>Restrict SSH (port 22) to your IP using <code>ifconfig.me</code> to find it.</p>
<p>Ensure the following ports are open:</p>
<p>Use <a href="https://www.whatsmydns.net/">DNS Checker</a> to confirm propagation. Run:</p>
<p>Expected output: your server’s IP.</p>
<p>SSH into your server and run:</p>
<p>Verify your PDS is online:</p>
<p>Expected response:</p>
<p>Test WebSocket connectivity:</p>
<p>Use this code when registering via the Bluesky app.</p>
<p>Keep your PDS up to date:</p>
<p>To automate updates, edit the cron jobs:</p>
<p>Add the following line to run updates at <strong>1:30 AM on the 1st and 15th of each month</strong>:</p>
<p>For troubleshooting:</p>
<p>Check if the service is running:</p>
<p>If issues persist, restart the service:</p>
<p>This guide ensures a reliable, self-hosted Bluesky PDS. Happy hosting!</p>
