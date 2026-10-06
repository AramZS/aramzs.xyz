---
author: Hartley Charlton
cover_image: >-
  https://images.macrumors.com/t/bDSnDh5rJkwhN6iKwOzp-X_CeWo=/2500x/article-new/2025/08/Apple-Intelligence-Comes-Under-Fire-Feature.jpg
date: '2026-10-05T12:16:24.245Z'
dateFolder: 2026/10/05
description: >-
  A new open-source tool is making waves in the Mac community by helping users
  reclaim valuable storage space taken up by Apple's AI models. Called
  "RemoveMacAI," the tool disables Apple Intelligence on macOS 27, removes its
  downloaded models, and prevents them from being downloaded again. In macOS 27,
  Apple removed the toggle to disable Apple Intelligence wholesale, and simply
  disabling individual features doesn't remove the models from your Mac's drive.
isBasedOn: >-
  https://www.macrumors.com/2026/10/05/apple-intelligence-removal-tool-frees-mac-storage/
link: >-
  https://www.macrumors.com/2026/10/05/apple-intelligence-removal-tool-frees-mac-storage/
slug: >-
  2026-10-05-httpswwwmacrumorscom20261005apple-intelligence-removal-tool-frees-mac-storage
tags:
  - tech
title: Mac Users Reclaim Storage With New Apple Intelligence Removal Tool
---
<p>A new open-source tool is making waves in the Mac community by helping users reclaim valuable storage space taken up by Apple's AI models. Called "<a href="https://github.com/omlahore/RemoveMacAI">RemoveMacAI</a>," the tool disables Apple Intelligence on macOS 27, removes its downloaded models, and prevents them from being downloaded again.</p>
<figure><img alt="turn apple intelligence off mac tool%402x scaled" sizes="(max-width: 900px) 100vw, 697px" src="https://images.macrumors.com/t/S6u5sBDWpEm4MRj9Ow6dV9yBV4I=/2500x0/filters:no_upscale()/article-new/2026/10/turn-apple-intelligence-off-mac-tool%402x-scaled.jpg?lossy" srcset="https://images.macrumors.com/t/Uzk1BBB4VDUCEJhKjM3ffaXT84s=/400x0/article-new/2026/10/turn-apple-intelligence-off-mac-tool%402x-scaled.jpg?lossy 400w,https://images.macrumors.com/t/zS1juKRg0jlMg19SGeIyGpo31hw=/800x0/article-new/2026/10/turn-apple-intelligence-off-mac-tool%402x-scaled.jpg?lossy 800w,https://images.macrumors.com/t/lgK32KVh0VLA_hW8M0NY7Z4vNKA=/1600x0/article-new/2026/10/turn-apple-intelligence-off-mac-tool%402x-scaled.jpg?lossy 1600w,https://images.macrumors.com/t/S6u5sBDWpEm4MRj9Ow6dV9yBV4I=/2500x0/filters:no_upscale()/article-new/2026/10/turn-apple-intelligence-off-mac-tool%402x-scaled.jpg?lossy 2500w"/><figcaption>turn apple intelligence off mac tool%402x scaled</figcaption></figure>
<p>In macOS 27, Apple removed the toggle to disable Apple Intelligence wholesale, and simply disabling individual features doesn't remove the models from your Mac's drive. As <a href="https://www.reddit.com/r/MacOS/comments/1ww1exr/macos_27_dropped_the_apple_intelligence_off/">explained by the developer</a>, RemoveMacAI gets around this by using a configuration profile to switch off Apple's own asset management service and remove the models.</p>
<p>It then configures the system so attempts to download the removed models are redirected to a closed local port, preventing them from immediately coming back. And it does all this without disabling System Integrity Protection (SIP) or manually deleting files from protected system locations, unlike some older tools have.</p>
<p>With the Apple models gone, you lose all Siri-related AI features, Writing Tools, Genmoji, Image Playground, ChatGPT integration, summaries, smart replies, inline predictions, Photos Clean Up, Spatial Photos, and Xcode predictive completion. Even so, plenty of users appear happy to make the sacrifice to free up space, especially on non-upgradeable Macs with 256GB of storage. The profile reportedly persists across updates. And if you're wondering, dictation still works.</p>
<p>The project has attracted hundreds of <a href="https://github.com/omlahore/RemoveMacAI">GitHub</a> stars since its release last week, and there's lots of discussion on <a href="https://www.reddit.com/r/MacOS/comments/1ww1exr/macos_27_dropped_the_apple_intelligence_off/">Reddit</a> and <a href="https://news.ycombinator.com/item?id=49957116">Hacker News</a> about the need for such a tool. Just be aware that <em>MacRumors</em> isn't endorsing RemoveMacAI, and anyone using it does so at their own risk.</p>
<p>The developer has mentioned one caveat, and it's that some of the configuration-profile restriction keys that the tool relies on were deprecated by Apple in macOS 26.4. While they still work in macOS 27.0.1, a future version could always change that. Something to keep in mind.</p>
