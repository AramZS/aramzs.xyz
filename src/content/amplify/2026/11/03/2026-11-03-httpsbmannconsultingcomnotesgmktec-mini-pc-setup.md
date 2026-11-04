---
author: Boris Mann's Homepage
cover_image: 'https://bmannconsulting.com/assets/bmann_avatar_512.png'
date: '2026-11-03T07:57:19.313Z'
dateFolder: 2026/11/03
description: Boris Mann's digital garden and personal site.
isBasedOn: 'https://bmannconsulting.com/notes/gmktec-mini-pc-setup/'
link: 'https://bmannconsulting.com/notes/gmktec-mini-pc-setup/'
slug: 2026-11-03-httpsbmannconsultingcomnotesgmktec-mini-pc-setup
tags:
  - gadgets
title: GMKtec Mini PC Setup
---
<p>Unboxed it and plugged in at my desk at Z-Space. Yep, that’s Windows 11 Decided to install <a data-preview="/notes/proxmox/" href="https://bmannconsulting.com/notes/proxmox/">Proxmox</a>. Instructions for <a href="https://pve.proxmox.com/pve-docs/chapter-pve-installation.html#_instructions_for_macos">prepping a bootable USB drive for MacOS</a> are very good.</p>
<p>Plugged it in, got into BIOS, booted it, and got started on installing. I didn’t blow away the windows partitions so figured I’d try installing overtop of the NVMe drive I have (that had Bazzite on it). Got stuck on network settings (don’t have a spare domain for this).</p>
<p>OK, I’m back to looking at <a data-preview="/notes/coolify/" href="https://bmannconsulting.com/notes/coolify/">Coolify</a> and the newer <a data-preview="/notes/dokploy/" href="https://bmannconsulting.com/notes/dokploy/">Dokploy</a> (that the Atmosphere Community Infra has on top of / with Proxmox). I stashed some links in a new <a data-preview="/notes/semble/" href="https://bmannconsulting.com/notes/semble/">Semble</a> <a href="https://semble.so/profile/bmann.ca/collections/3mmno4inzfq23">Homelab collection</a>.</p>
<p>Ultimately, Dokploy is more like source-available, and their pricing is close to what I’m paying for Cloudron.</p>
<figure><img alt="" src="https://bmannconsulting.com/assets/2026/dokploy-pricing.png"/></figure>
<p>I have a hosted Coolify “cloud” dashboard that is $5/month for 2 servers, and $3 per additional server, and I have the option to self host that dashboard controller too.</p>
<p>Or do I just… install Ubuntu and go plain docker? Both Coolify and Dokploy use <a data-preview="/notes/docker-swarm/" href="https://bmannconsulting.com/notes/docker-swarm/">Docker Swarm</a> to share apps and services across servers, and I find <a href="https://swarmpit.io/">Swarmpit</a>, added to Semble as well.</p>
<p>In the meantime, what else on Windows? Let’s install Steam and see if this is useful at all for running games natively.</p>
<p>I installed Titan’s Quest II and it is basically unplayable. Well, I figured as much. Everything is Crab plays great.</p>
<p>I’ll shrink the windows partition so I can install stuff on the main drive. Maybe I’ll dual boot?</p>
<h3>Later that evening</h3>
<p>I took the machine home, settled on running it as my home server, retiring <a data-preview="/notes/lenovo-m900-tiny/" href="https://bmannconsulting.com/notes/lenovo-m900-tiny/">Lenovo M900 Tiny</a>.</p>
<p>I’m thinking maybe I will give Proxmox a try again. It does only support ethernet<sup><a data-footnote-ref="" href="https://bmannconsulting.com/notes/gmktec-mini-pc-setup/#fn-proxmoxwifi">1</a></sup>, so I guess I’m going to do what I did with <a data-preview="/notes/lenovo-m900-tiny-setup/" href="https://bmannconsulting.com/notes/lenovo-m900-tiny-setup/">Lenovo m900 Tiny Setup</a> and use a USB-C dock to share the Internet from my Macbook Air. Got it up and working in windows, so when I reboot, it should work.</p>
<p>Back to Proxmox install. Apparently it will nuke the entire internal drive. OK, let’s do it! I have no idea how to get a Windows license “back” when it just comes on your device?</p>
<p>There are options for a file system. I will choose the default <code>ext4</code></p>
<p>Root password and email.</p>
<p>It has auto-detected DHCP, which is my internal network of <code>192.168.2.x</code></p>
<p>OK, I am immediately in the deep end with <a href="https://pve.proxmox.com/wiki/Network_Configuration">Proxmox Networking Configuration</a>. I will leave it as <code>pve.localdomain</code> and leave it as the suggested private address.</p>
<p>OK! We are installed!</p>
<p>I am now continuing in the web gui. Login with root user/pass created earlier, which is also the root access to the linux system.</p>
<p>Create a <code>bmann</code> user in the GUI as Linux PAM, do some more reading, and then create a user of the same name in the shell. <code>adduser</code> add a password, and add sudo <code>usermod -aG sudo</code>. Apparently you CAN create gui only users by selecting the Proxmox VE Auth Server, and those users won’t be able to use ssh.</p>
<p>Then, Datacenter &gt; Permissions &gt; Add, and give that user PVEAdmin</p>
<p>Setup pubkey for my personal user, <a href="https://github.com/alexandreravelli/Securing-SSH-Access-on-Proxmox-VE-9">set ssh to just use keys</a>.</p>
<p>Everything seems to be working, now to take it out and plug it into the router directly in the corner of the living room. Oops. <code>192.168.2.x</code> was in fact the address it got from the bridged internet sharing from my Macbook.</p>
<p>Can I set up a VLAN for this port? Yes, let’s <a href="https://help.ui.com/hc/en-us/articles/9761080275607-Creating-Virtual-Networks-VLANs">create a Proxmox VLAN using the UniFi interface</a> (I have a UniFi Dream Machine aka <a data-preview="/notes/udm/" href="https://bmannconsulting.com/notes/udm/">UDM</a> as my router behind a cable modem and <a data-preview="/notes/oxio/" href="https://bmannconsulting.com/notes/oxio/">Oxio</a> as ISP).</p>
<p>I set this up as well as reviewed other settings I have, including previous port forwarding. I couldn’t get remote access to the server anymore. Something for tomorrow’s troubleshooting.</p>
<h2>May 26th, 2026</h2>
<p>OK, so I have a wireless keyboard and the USB-C portable monitor actually works with this server, so I can work with the box plugged into it directly while it is actually connected into Ethernet on the router.</p>
<p>Looking at <a href="https://pve.proxmox.com/wiki/Network_Configuration">Proxmox Network Configuration</a> again, and how to configure the network from the command line.</p>
<p><code>nano /etc/network/interfaces</code></p>
<p>Changed everything from <code>192.168.2.x</code> to <code>192.168.3.x</code>, including <code>/etc/hosts</code> and <code>/etc/resolve/conf</code>.</p>
<p>To load changes, some combination of <code>ifreload -a</code>, <code>ifupdown2</code>, and rebooting the machine with <code>shutdown -r now</code>.</p>
<p>OK, so now, looks like the Dream Machine doesn’t actually route between VLANs? I do <em>actually</em> want high speed local connections when I’m inside my network, but I have to look at <a href="https://help.ui.com/hc/en-us/articles/5546542486551-Traffic-Policy-Management-in-UniFi">Traffic Policy Management</a> more closely? And that the mobile app has less features than what is available</p>
<p>So, I properly reset port forwarding from the external public IP interface to route to the mini PC, and I can now connect to the Proxmox interface by looping out and back. Success???</p>
<p>OK, added some more links to my Semble, check the <a href="https://semble.so/profile/bmann.ca/collections/3mmno3g3qb32y">Proxmox</a> and <a href="https://semble.so/profile/bmann.ca/collections/3mfsw4c5tgz2v">Tailscale</a> collections for related, especially <a href="https://semble.so/url?id=https://tailscale.com/docs/integrations/proxmox">Tailscale on a Proxmox host</a> so I can stop port forwarding that port past my router.</p>
<p>Brief interlude while I added <a data-preview="/notes/bringyourowncomputer/" href="https://bmannconsulting.com/notes/bringyourowncomputer/">BringYourOwn.Computer</a> and <a data-preview="/notes/commons-computer/" href="https://bmannconsulting.com/notes/commons-computer/">Commons Computer</a> domains to Tailscale and verified them.<sup><a data-footnote-ref="" href="https://bmannconsulting.com/notes/gmktec-mini-pc-setup/#fn-atlogin">2</a></sup></p>
<p>Was getting errors when trying to update Proxmox, turns out you have to turn off the subscriptions</p>
<p>In the WebUI, select the node, go to Updates &gt; Repositories, disable the enterprise repository(s). Click Add and select “No-Subscription” from the drop down. Updates tab will now show updates.</p>
<p>Now run the <a data-preview="/notes/tailscale/" href="https://bmannconsulting.com/notes/tailscale/">Tailscale</a> one liner to install (shell tab from the WebUI lets you do this remote) and <code>tailscale up</code> to connect the device. Oh yeah, and then <code>tailscale up --advertise-exit node</code>, which generated a bunch of warnings around forwarding not being setup properly.</p>
<p>Ran an update to update all the Debian and proxmox things.</p>
<blockquote> <p>Seems you installed a kernel update - Please consider rebooting this node to activate the new kernel.</p> </blockquote>
<p>Oh, and the server was able to deliver some email about “amd64-microcode”.</p>
<p>OK, let’s grab an ISO to make a VM, <a href="https://ubuntu.com/download/server">Ubuntu 26.04 LTS Server Edition looks fine</a>.</p>
<p>Here we are, walking through Proxmox “Create VM” for the first time.</p>
<p>(screenshots)</p>
<p>Ok, now I can boot it and connected over the proxmox noVNC and run through the install steps of an ubuntu server. Using the grab-keys-from-Github and make my own username. And, we’re up!</p>
<p>Success! Got another <code>192.168.3.x</code> IP allocated and I can see it in the Unifi console. I can connect to it through the proxmox shell (it’s on the same vlan).</p>
<p>Installed and added to Tailscale to it so it can be accessed from everywhere.</p>
<p>Now let’s try adding this to Coolify. Create a new private key. Grab the pubkey. Login and <code>sudo -i</code> for a root shell, and add to authorized keys.</p>
<p>OK, but the Cloud Coolify is not on the tailnet, so we can’t use that shortcut.</p>
<p>We have the separate issue of nothing being able to reach any of the other items on the VLAN / figuring out how to to do masquerading or whatever in order get domain based routing on one external IP.</p>
<pre data-language="plaintext"><code>tailscale up --accept-routes --advertise-routes=192.168.3.0/24 --advertise-exit-node</code></pre>
<p>Enable IP forwarding <a href="https://tailscale.com/docs/features/subnet-routers#enable-ip-forwarding">https://tailscale.com/docs/features/subnet-routers#enable-ip-forwarding</a></p>
<p>OK! So it looks like Nginx Proxy Manager is what I want, as an LXC running on the proxmox host, and have everything forwarded from my UDM to <em>that</em> container, which in turn will reverse proxy to everything else.</p>
<p>In part from learning about <a data-preview="/notes/community-scripts/" href="https://bmannconsulting.com/notes/community-scripts/">Community Scripts</a>, which is an entire repo of bash one liners for proxmox!</p>
<p>As well as tailscale access, I setup a proxy host to the web interface for proxmox. Externally, it has a <code>subdomain.bringyourown.computer</code>, which then proxies to “internal IP address, port 8006”. One note: for the shell connection to work from the web ui, you need to turn on websocket support for the proxy.</p>
<p>OK, I deleted the other “manual” Ubuntu Server that I installed. Clearly I need to browse through the scripts.</p>
<p>Let’s do <a data-preview="/notes/missing/" href="https://bmannconsulting.com/notes/missing/#navidrome">Navidrome</a>!</p>
<h2>May 27th, 2026</h2>
<p>Spoiler, I stayed up late and installed Navidrome and uploaded my backup of <a data-preview="/notes/ampache/" href="https://bmannconsulting.com/notes/ampache/">Ampache</a> music into it, learning how to resize disks on the fly. I guess music should be a volume? I might go back and experiment with that.</p>
<p>I can add subdomains (I’m using <a data-preview="/notes/bringyourowncomputer/" href="https://bmannconsulting.com/notes/bringyourowncomputer/">BringYourOwn.Computer</a> as the base domain) as needed along with <a href="https://community-scripts.org/scripts/nginxproxymanage">Nginx Proxy Manager</a> for routing it to hosts in my private network.</p>
<p>I think I need to take a second look at the UDM setup and I can adjust firewall rules to route between VLANs…but also actually separating all the Proxmox hosts into their own VLAN is probably a good idea.</p>
<p>I think I’m pretty much done at this point. I can use <a data-preview="/notes/community-scripts/" href="https://bmannconsulting.com/notes/community-scripts/">Community Scripts</a> to look up other formulas of things to run. I don’t think I’m going to setup <a data-preview="/notes/coolify/" href="https://bmannconsulting.com/notes/coolify/">Coolify</a>, the Proxmox community scripts pretty much do stuff for me.</p>
<p>I’m not clear on what the update story is for Proxmox? That is, how do the operating systems and apps get kept up to date, which Cloudron does automatically for me? There’s this script <a href="https://community-scripts.org/scripts/update-apps">PVE LXC Apps Update</a> that appears to automate some of this.</p>
<p>I need to setup backup offsite. I have a Digital Ocean object store that I use for some stuff. Maybe I can talk to <a data-preview="/notes/cosocial/" href="https://bmannconsulting.com/notes/cosocial/">CoSocial</a> abouting paying to use our OVH object store? That being said, I never did much with <a data-preview="/notes/lenovo-m900-tiny/" href="https://bmannconsulting.com/notes/lenovo-m900-tiny/">Lenovo M900 Tiny</a> so didn’t bother doing backup.</p>
<p>Haven’t explored what it looks like to manage multiple hardware nodes. The MiniPC only has a 256GB drive, I think there’s a slot free where I can drop in an additional one or plugin a USB-C attached drive?</p>
<p>I have not yet been an active AI user as I focus on getting Local AI up and running. I ended up asking Claude Code some networking setup questions, so sharing this export of my session if you’re interested <a data-preview="/notes/proxmox-setup-with-claude-code/" href="https://bmannconsulting.com/notes/proxmox-setup-with-claude-code/">Proxmox Setup with Claude Code</a></p>
