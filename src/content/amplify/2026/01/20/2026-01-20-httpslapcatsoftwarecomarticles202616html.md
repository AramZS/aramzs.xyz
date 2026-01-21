---
author: lapcatsoftware.com
cover_image: ''
date: '2026-01-20T22:39:45.529Z'
dateFolder: 2026/01/20
description: >-
  While I’ve been running Tahoe for testing purposes on a secondary Mac since
  WWDC 2025, my main Mac remains on Sequoia, and I intend to keep it that way
  for as long as possible.
isBasedOn: 'https://lapcatsoftware.com/articles/2026/1/6.html'
link: 'https://lapcatsoftware.com/articles/2026/1/6.html'
slug: 2026-01-20-httpslapcatsoftwarecomarticles202616html
tags:
  - tech
title: My way to prevent the macOS Tahoe update with Little Snitch
---
<p>While I’ve been running Tahoe for testing purposes on a secondary Mac since WWDC 2025, my main Mac remains on Sequoia, and I intend to keep it that way for as long as possible. Unfortunately, the innovators in Cupertino have invented numerous ways to annoy users into updating, via notifications and Dock badges, or outright tricking users into updating via <a href="https://mastodon.social/@lapcatsoftware/115488569731059756">dark</a> <a href="https://lapcatsoftware.com/articles/2025/3/4.html">patterns</a>. My way of stopping this madness is not for everyone. Perhaps it’s for no one but me. I don’t need my Mac to tell me when a software update is available, because I follow the Apple news religiously. In any case, my discussion may provide some insight into how macOS software updates work.</p>
<p>My weapon of choice is <a href="https://www.obdev.at/products/littlesnitch/index.html">Little Snitch</a>. I’ve created rules in Little Snitch to deny outgoing connections from the following processes:</p>
<blockquote> <p><code>/System/Library/CoreServices/Software Update.app/Contents/Resources/softwareupdated</code></p> <p><code>/System/Library/PrivateFrameworks/MobileSoftwareUpdate.framework/Support/softwareupdated</code></p> <p><code>/System/Library/PrivateFrameworks/SoftwareUpdate.framework/Versions/A/Resources/SoftwareUpdateNotificationManager.app</code></p> <p><code>/usr/libexec/mobileassetd</code></p> </blockquote>
<p>There’s also a rule to deny outgoing connections from <code>/usr/libexec/nsurlsessiond</code> to the <code>updates.cdn-apple.com</code> hostname. Don’t block <code>nsurlsessiond</code> entirely, because it’s needed for other unrelated purposes.</p>
<p>All of these processes run in the background, though they can be triggered manually from System Settings or Terminal.</p>
<p>I never use System Settings to perform software updates and have disabled all automatic update settings:</p>
<figure><img alt="Software Update System Settings pane. Unable to check for updates. The network connection was lost." src="https://lapcatsoftware.com/articles/2026/1/6.png"/><figcaption>Software Update System Settings pane. Unable to check for updates. The network connection was lost.</figcaption></figure>
<p>Instead I perform all software updates in Terminal app with the <code>/usr/sbin/softwareupdate</code> command-line tool. Read the fine <code>man</code> page. When I need to update, I temporarily disable the <code>softwareupdated</code> and <code>nsurlsessiond</code> rules in Little Snitch. The <code>mobileassetd</code> rule also needs to be disabled for macOS updates. (And for installing Xcode simulators!) Indeed, denying outgoing connections to <code>mobileassetd</code> will prevent <code>softwareupdate --list</code> from showing Tahoe. But for other software updates such as Safari and Safari Technology Preview, <code>mobileassetd</code> can be blocked in Little Snitch.</p>
<p>After updating, I re-enable the Little Snitch rules. If you put the System Settings app in your Dock, and the Dock icon is badged for an update such as Tahoe, then running the <code>softwareupdate</code> tool again with all connections denied will make the badge disappear again.</p>
<p>By the way, <code>softwareupdate</code> has an undocumented command-line option <code>--include-config-data</code> that you need in order to install some minor updates related to <code>XProtect</code>. However, if you’re extremely careful about which software you install on your Mac, as you obviously are if you’re using Little Snitch, then these updates are not really urgent. In over 20 years of Mac use, I’ve never accidentally or intentionally installed malware. I’ll typically run <code>softwareupdate --list --include-config-data</code> only when I’m already installing some other software update.</p>
<p>This process is not for the faint of heart, or mind. Please don’t email me requesting that I hold your hand through software updates. Instead, email Tim Cook requesting that he cease and desist with the stupid annual update schedule.</p>
