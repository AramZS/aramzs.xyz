---
author: Boris Mann's Homepage
cover_image: 'https://bmannconsulting.com/assets/bmann_avatar_512.png'
date: '2026-10-04T13:56:37.490Z'
dateFolder: 2026/10/04
description: Boris Mann's digital garden and personal site.
isBasedOn: 'https://bmannconsulting.com/notes/steam-machine-hearth-install/'
link: 'https://bmannconsulting.com/notes/steam-machine-hearth-install/'
slug: 2026-10-04-httpsbmannconsultingcomnotessteam-machine-hearth-install
tags:
  - tech
  - gadgets
title: Steam Machine Hearth Install
---
<p>Initial setup of <a data-preview="/notes/hearth/" href="https://bmannconsulting.com/notes/hearth/">Hearth</a> my new <a data-preview="/notes/steam-machine/" href="https://bmannconsulting.com/notes/steam-machine/">Steam Machine</a>, October 2026.</p>
<p>So it turns out the Steam Machine doesn’t support display over USB-C like the <a data-preview="/notes/steam-deck/" href="https://bmannconsulting.com/notes/steam-deck/">Steam Deck</a> does. So I can’t use the <a data-preview="/notes/visiontek-vt2900/" href="https://bmannconsulting.com/notes/visiontek-vt2900/">VisionTek VT2900</a> kvm switch.</p>
<p>I plugged in my second HDMI port and keyboard, mouse, and Yeti Nano mic directly into the Steam Machine, along with the USB-A to USB-C steam puck for the Steam Controller I also got.</p>
<p>Power on, basic setup. I ejected the 256GB SD card I have in my Steam Deck, it hasn’t shown or mounted yet, need to troubleshoot later.</p>
<p>OK, turns out a known issue <a href="https://github.com/ValveSoftware/SteamOS/issues/2814">Lexar microSD’s don’t get read properly</a></p>
<p>Various firmware updates and installs. Switched over into Desktop mode, and setup SSH.</p>
<p>You need to set a password with <code>passwd</code> before you can <code>sudo</code> or do anything else on the commandline.</p>
<p>Then, enable ssh <code>sudo systemctl enable sshd --now</code>. You can configure ssh, add your keys, and disable password login at `sudo nano /etc/ssh/sshd_config</p>
<p>Went to install <a data-preview="/notes/tailscale/" href="https://bmannconsulting.com/notes/tailscale/">Tailscale</a> and got an error which points to <a href="https://github.com/tailscale-dev/deck-tailscale">deck tailscale</a>. Used that, tailscale is installed.</p>
<p><a data-preview="/notes/homebrew/" href="https://bmannconsulting.com/notes/homebrew/">Homebrew</a> works on SteamOS to get things installed.</p>
<p>Other apps</p>
<ul> <li><a data-preview="/notes/missing/" href="https://bmannconsulting.com/notes/missing/#bitwarden">Bitwarden</a> install via KDE Discover, as well as the others on this list</li> <li>Nocturne - connected to my Navidrome install</li> <li>Signal - say no to plaintext, have it use kwallet</li> <li>Chrome - at some point I have to try other browsers</li> <li>Discord</li> <li><a data-preview="/notes/paseo/" href="https://bmannconsulting.com/notes/paseo/">Paseo</a> - this is just so great for working with agents, and I’ve got my whole <a data-preview="/notes/letta/" href="https://bmannconsulting.com/notes/letta/">Letta</a>, <a data-preview="/notes/umans/" href="https://bmannconsulting.com/notes/umans/">Umans</a> architecture set up, with <a data-preview="/notes/hausgeist/" href="https://bmannconsulting.com/notes/hausgeist/">Hausgeist</a> on hearth. This took quite a while but is very much worth it, and I’ve got Paseo running across phone, this Steam Machine, my desktop <a data-preview="/notes/missing/" href="https://bmannconsulting.com/notes/missing/#blue-dragon">Blue Dragon</a>, and a VM on <a data-preview="/notes/bringyourowncomputer/" href="https://bmannconsulting.com/notes/bringyourowncomputer/">BYOC</a></li> <li>Gear Leveler - App Image manager, it made Paseo be like a real app</li> </ul>
