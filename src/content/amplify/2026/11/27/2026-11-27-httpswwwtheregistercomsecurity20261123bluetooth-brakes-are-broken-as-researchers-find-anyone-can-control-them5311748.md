---
author: Brandon Vigliarolo
cover_image: >-
  https://image.theregister.com/229180.jpg?imageId=229180&x=0&y=0&cropw=100&croph=100&panox=0&panoy=0&panow=100&panoh=100&width=1200&height=683
date: '2026-11-27T06:53:28.768Z'
dateFolder: 2026/11/27
description: >-
  Security fixes are available for two Elecbrakes models, but an older
  controller remains vulnerable and unpatched
isBasedOn: >-
  https://www.theregister.com/security/2026/11/23/bluetooth-brakes-are-broken-as-researchers-find-anyone-can-control-them/5311748
link: >-
  https://www.theregister.com/security/2026/11/23/bluetooth-brakes-are-broken-as-researchers-find-anyone-can-control-them/5311748
slug: >-
  2026-11-27-httpswwwtheregistercomsecurity20261123bluetooth-brakes-are-broken-as-researchers-find-anyone-can-control-them5311748
tags:
  - tech
title: Bluetooth brakes are broken as researchers find anyone can control them
---
<h3>READ MORE</h3>
<ul> <li> <a href="https://www.theregister.com/personal-tech/2026/11/22/as-cars-go-digital-us-consumers-pay-an-extra-12-billion-a-year-for-repairs/5311412"> <h4>As cars go digital, US consumers pay an extra $12 billion a year for repairs</h4> 1 day ago  </a> </li> <li> <a href="https://www.theregister.com/security/2026/11/18/california-tells-waymo-to-take-the-next-exit-after-freeway-mishaps/5310841"> <h4>California tells Waymo to take the next exit after freeway mishaps</h4> 5 days ago  </a> </li> <li> <a href="https://www.theregister.com/networks/2026/11/10/smart-meters-to-cost-the-uk-billions-2g-switch-off-means-replacing-12-13-million/5308728"> <h4>Smart meters to cost the UK billions: 2G switch-off means replacing 12-13 million</h4> 13 days ago  </a> </li> <li> <a href="https://www.theregister.com/offbeat/2026/11/06/rip-to-the-worlds-ugliest-car/5308198"> <h4>RIP to the world’s ugliest car</h4> 17 days ago  </a> </li> <li> <a href="https://www.theregister.com/security/2026/11/05/feds-warn-grocers-dont-chill-on-cyber-defenses-as-freezer-hacking-spree-heats-up/5307978"> <h4>Feds warn grocers: Don't chill on cyber defenses as freezer hacking spree heats up</h4> 17 days ago  </a> </li> </ul>
<p>Imagine something as mission-critical as the brakes on a trailer being vulnerable to unauthorized control. One Australian manufacturer made the interesting choice of building Bluetooth into a trailer brake controller without adequately securing its critical braking functions.</p>
<p>Anyone within Bluetooth range of an unpatched Elecbrakes trailer controller could potentially trigger its brakes or apply more braking force than intended, without needing to authenticate.</p>
<p>The discovery comes courtesy of a pair of security researchers from Element Digital, Patrick Forck and Jeremy McCarthy. Their investigation began earlier this year when Forck was driving down the road and noticed that his physical Elecbrakes In-Car Remote had connected to someone else's trailer without pairing or prompting him.</p>
<p>“It had connected mid-drive, without pairing or a prompt, to a brake controller that wasn’t mine, on a trailer I’d never seen, belonging to a driver who had no idea,” the researchers <a href="https://elementdigital.com.au/blog/brake-check-trailer-brakes-over-bluetooth/">wrote</a>. That one-off connection triggered a full-scale investigation by the pair.</p>
<p>For those unfamiliar with trailer brake controllers, these devices are commonly used on larger trailers. Australian manufacturer Elecbrakes sells such controllers in Australia and New Zealand. Depending on jurisdiction, trailers over a certain weight are required to have their own braking system, which Elecbrakes manufactures. Elecbrakes offers two versions that are designed to be easier to install than traditional controllers: One that’s mounted in a vehicle, and one that is mounted directly on a trailer. That trailer-mounted unit can receive Bluetooth commands from the Elecbrakes smartphone app or a separate in-car remote.</p>
<p>Given the importance of such control units to road safety, it’s easy to imagine how serious such a vulnerability could be if it proved to be easy to exploit, and boy, did it.</p>
<p>Forck and McCarthy admitted they’re infrastructure security guys, not software devs, so they turned to Claude Code to dissect a decompiled copy of the Elecbrakes app, which Claude was happy to oblige.</p>
<p>“What came back from the analysis was a map of the device’s entire Bluetooth GATT profile: 47 characteristics across four services, commands sent as plain unencrypted byte arrays, no checksums, no sequence numbers,” the researchers noted. To make matters worse, there was no authentication required for critical braking commands, even though other Bluetooth functions required pairing.</p>
<p>Claude then built a web app that ran in Chrome which was able to access the Bluetooth controls for a nearby Elecbrakes system, and they were able to modify practically every aspect of brake control on a unit owned by one of them.</p>
<p>Pairing failed on a few attempts, but not where it mattered: It allowed the connection without issue for actual brake control. They sent a few bytes to the brake control characteristic, and were shocked.</p>
<p>“The electromagnetic hum at the brake drums was immediate and, frankly, a little sickening,” the pair said. “It said yes to four bytes from a total stranger then energised several tonnes’ worth of brakes and reported back that it had done so, pleased with itself.”</p>
<p>Further experiments managed to modify braking strength based on deceleration speed as well, making it so that the trailer acted unpredictably based on the amount of force a driver applied to stop their vehicle.</p>
<p>To say this is worse than a typical internet-connected device bug is to put it mildly - it even earned a <a href="https://www.cisa.gov/news-events/ics-advisories/icsa-26-323-02">trio of CVEs</a> from CISA, with two of them scoring a CVSS of 9.6.</p>
<p>“The attack surface is ‘anyone within Bluetooth range,’ the skill required is ‘can write four bytes,’ and the victim selection is ‘optional,’ ” Forck and McCarthy said. The fact AI was able to get them to that point in just a couple of days is even more concerning, they added.</p>
<p>“This kind of research used to require a fairly rare and specific skill set,” the pair noted. “It now requires curiosity, a device you own, and an AI that can read bytecode faster than any human.”</p>
<p>Luckily, they appear to have been dealing with a relatively responsive company in Elecbrakes - patches have been deployed for both the in-car and trailer-mounted models of their brake controllers. Installation is a manual process, we note, so if you own a controller from the company, be sure to stop and install the update.</p>
<p>Unfortunately, Elecbrakes has a third controller out there that hasn’t been manufactured in several years, and it got skipped in the patching process. Owners of an ELBC2000 should be aware that their controller is still vulnerable, and there’s no patch available yet, as the vendor didn’t confirm that the ELBC2000 was vulnerable until the end of October, after it faced pressure from the researchers. ®</p>
