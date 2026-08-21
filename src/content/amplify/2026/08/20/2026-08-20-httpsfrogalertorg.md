---
author: FrogAlert
cover_image: 'https://frogalert.org/site/og-card-v3.jpg'
date: '2026-08-20T19:02:49.368Z'
dateFolder: 2026/08/20
description: >-
  Custom CH582M BadgeMagic firmware with nametag and Bluetooth-counter modes.
  Scanning and matching stay on the badge.
isBasedOn: 'https://frogalert.org/'
link: 'https://frogalert.org/'
slug: 2026-08-20-httpsfrogalertorg
tags:
  - privacy
title: Bluetooth alerts on your nametag.
---
<p>Open firmware for CH582M BadgeMagic badges</p>
<p>FrogAlert keeps your BadgeMagic nametag and adds an approximate nearby-device count plus short BLE alerts. Everything is processed on the badge.</p>
<p>Features</p>
<h2>Names, nearby devices, and alerts.</h2>
<h3>Nametag and counter</h3>
<p>Keep using the BadgeMagic app to upload names. Press the button closest to USB to switch between your messages and the last completed <code>00</code>–<code>64+</code> nearby-device count.</p>
<p>About every 20 seconds, FrogAlert listens for BLE advertisements for three seconds. It keeps the last completed count on screen while the next scan runs.</p>
<p>A matching public OUI, advertised name, or documented service signal shows <code>COP DETECTED</code>, <code>FLIPPER DETECTED</code>, or <code>KARR DETECTED</code> as fixed pages, one second each. A BadgeMagic name or <code>FEE0</code> service shows three one-second dancing-frog frames using two alternating poses. The nametag or counter returns after the last frame.</p>
<aside> <strong>These matches are hints, not identification.</strong> BLE addresses rotate, names can be copied, vendors share components, and service UUIDs can be reused. Passive scans also miss names sent only in scan responses. The <code>FEE0</code> fallback can match other compatible badges. </aside>
<h3>FrogAlert 0.2.0-beta.12</h3>
<p>Cloud-built, structurally audited, and published automatically; this exact build has not been hardware-tested.</p>
<p><strong>Supported boards:</strong> B1144C_250901 and B1144C_260404</p>
<p>FrogAlert is based on <a href="https://github.com/fossasia/badgemagic-firmware">FOSSASIA's open-source BadgeMagic firmware</a> and remains compatible with BadgeMagic app uploads.</p>
<p>The original read-protected firmware cannot be backed up or restored after the first flash.</p>
<table> Built-in detection rules <tr><th>Signal</th><th>Source</th><th>Result</th><th>Guardrail</th></tr> <tbody> <tr><td><code>FEE0</code></td><td>Advertised BadgeMagic 16-bit service</td><td>Three-frog dance · 3 × 1 s</td><td>Passive fallback; may false-positive</td></tr> <tr><td><code>LED Badge Magic</code></td><td>Exact advertised name</td><td>Three-frog dance · 3 × 1 s</td><td>Exact, case-insensitive hint; trailing null padding allowed</td></tr> <tr><td><code>QT </code> + serial</td><td>Advertised name prefix</td><td><code>KARR DETECTED</code></td><td>Case-insensitive; must start the name and include a value</td></tr> <tr><td><code>00:25:DF</code></td><td>Axon public OUI</td><td><code>COP DETECTED</code></td><td>Public addresses only</td></tr> <tr><td><code>B4:1E:52</code></td><td>Flock Safety public OUI</td><td><code>COP DETECTED</code></td><td>Public addresses only</td></tr> <tr><td><code>01AB</code> + <code>FD5F</code></td><td>Meta manufacturer ID + 16-bit service</td><td><code>COP DETECTED</code></td><td>Both fields required; passive Meta-glasses hint</td></tr> <tr><td><code>Ray-Ban</code> / <code>Ray Ban</code></td><td>Text within advertised name</td><td><code>COP DETECTED</code></td><td>Case-insensitive Meta-glasses hint</td></tr> <tr><td><code>Axon Body</code></td><td>Text within advertised name</td><td><code>COP DETECTED</code></td><td>Case-insensitive hint</td></tr> <tr><td><code>TASER</code></td><td>Text within advertised name</td><td><code>COP DETECTED</code></td><td>Case-insensitive hint</td></tr> <tr><td><code>3081</code>, <code>3082</code>, or <code>3083</code></td><td>Flipper hardware-color 16-bit service</td><td><code>FLIPPER DETECTED</code></td><td>Any one service is sufficient</td></tr> <tr><td><code>Flipper</code></td><td>Text within advertised name</td><td><code>FLIPPER DETECTED</code></td><td>Case-insensitive hint</td></tr> </tbody> </table>
<p><strong>Detection priority:</strong> frog dance → KARR → COP → Flipper. Rules with the same result share that priority; custom rules run after built-ins.</p>
<p><strong>Passive scan limit:</strong> discovery does not request scan responses. A device name present only there cannot match, so advertised <code>FEE0</code> provides a broad BadgeMagic-compatible fallback without claiming device identity.</p>
<p>Open source</p>
<h2>Built on FOSSASIA BadgeMagic</h2>
<p>FrogAlert starts with FOSSASIA's open-source BadgeMagic firmware and keeps its app, USB, display, and recovery behavior. The FrogAlert source, tests, build instructions, and hardware notes are public.</p>
