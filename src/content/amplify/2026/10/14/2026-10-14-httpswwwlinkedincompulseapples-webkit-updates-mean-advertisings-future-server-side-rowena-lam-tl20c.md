---
author: Rowena Lam
cover_image: >-
  https://static.licdn.com/scds/common/u/images/email/artdeco/logos/96/linkedin-bug-color.png
date: '2026-10-14T15:15:25.784Z'
dateFolder: 2026/10/14
description: >-
  And by future, I mean right now. The latest updates introduced in Apple’s iOS,
  WebKit and Safari and the quiet domain blocking capabilities have been well
  covered but the TLDR is: A WebKit update introduced with iOS 27 and macOS 27
  included a domain-level blocklist targeting major ad tech players, D
isBasedOn: >-
  https://www.linkedin.com/pulse/apples-webkit-updates-mean-advertisings-future-server-side-rowena-lam-tl20c/
link: >-
  https://www.linkedin.com/pulse/apples-webkit-updates-mean-advertisings-future-server-side-rowena-lam-tl20c/
slug: >-
  2026-10-14-httpswwwlinkedincompulseapples-webkit-updates-mean-advertisings-future-server-side-rowena-lam-tl20c
tags:
  - ad tech
title: Apple’s WebKit Updates Mean Advertising’s Future is Server-Side
---
<h3> Rowena Lam </h3>
<h3>And by future, I mean right now. </h3>
<figure><img alt="Article content" src="https://media.licdn.com/dms/image/v2/D5612AQEX8S8URro3WA/article-inline_image-shrink_1000_1488/B56aE270nmG4AI-/0/1791923015193?e=2147483647&amp;v=beta&amp;t=nKeBG3flnwafMz-_py78Sk8f7ZdxwM5bQNh7EsYRUjM"/><figcaption>The latest updates introduced in Apple’s iOS, WebKit and Safari and the quiet domain blocking capabilities have been well covered but the TLDR is:</figcaption></figure>
<ul> <li>A WebKit update introduced with iOS 27 and macOS 27 included a domain-level blocklist targeting major ad tech players, DSPs, and identity resolution providers.</li> <li>There is an unreleased update to WebKit that makes this list dynamic, meaning Apple can remotely add new vendor domains to the blocklist at any time without requiring users to download a new OS version.</li> <li>The list is not public facing, domains added to the blocklist don’t appear to be notified of their addition and there does not appear to be any formal appeal process.</li> <li>Requests to these domains are simply refused.</li> </ul>
<p>The effect of this could be vast. The impact on ad tech is obvious but there is collateral damage to publishers and advertisers as well. For publishers, this could greatly devalue their iOS and Safari traffic. For advertisers, it creates more blind spots making understanding the effectiveness of their campaigns much more difficult.</p>
<p>To survive this, advertising infrastructure needs to move to the edge. Moving the ad stack server-side means shifting the heavy lifting like bidding, identity, and others, out of the user’s browser and into a secure, publisher-controlled runtime environment. </p>
<blockquote>Moving server-side isn’t just about surviving Apple’s updates. It actually brings forth two major improvements to the ad stack.</blockquote>
<p>The first improvement is speed. There is an outdated assumption that adding a server-side layer slows things down and can be very expensive. That might have been true years ago, but with recent (circa 2023) advancements in edge compute, the exact opposite is true. The instinct that you’re adding a layer in the middle is technically true. However, instead of the browser directly calling every resource, it calls the publisher’s edge, which then handles the rest asynchronously, executing multiple operations (both ad-stack and content related) simultaneously. One analogy I thought was appropriate to describe how inserting an additional entity can actually result in increased speed and efficiency is a restaurant. The browser used to be a customer walking directly into the kitchen to ask the chef for every single item (drinks, appetizers, main course, dessert, etc). It slows the chef down. A publisher-operated edge acts as the front-of-house staff. They take the full order (parameters for the content and bid request), communicate with the kitchen (the partner resources), and deliver the final meal to the customer (the fully rendered page). It’s true that it adds a step, but it drastically speeds up the actual service.</p>
<p>The second improvement is data control. There is a misconception that this is worse for consumer privacy because it’s not in the browser. Moving server-side is actually more privacy-protective. When it’s the consumer’s browser that’s making requests to third-party servers and executing scripts, the publisher has very little control over what data that third-party can collect. Moving scripts, where appropriate, to the edge means the publisher can be much more surgical and intentional about what it sends to its third-party partners. This also makes it easier to enforce a consumer’s choices about how their data is used and maintain a robust, auditable log of data movement.</p>
<p>The good news is you don’t have to wait around for this to be built. IAB Tech Lab’s <a data-test-link="" data-tracking-control-name="article-ssr-frontend-pulse_little-text-block" data-tracking-will-navigate="" href="https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fiabtechlab%2Ecom%2Ftech-lab-trusted-server%2F&amp;urlhash=m8fO&amp;trk=article-ssr-frontend-pulse_little-text-block">Trusted Server</a> is actively building and piloting this reality. Trusted Server is open-source, and moves advertising infrastructure out of the browser and into the first-party server context. What’s more, adopting a first-party server-side architecture shifts the balance of power back to the content creators, ensuring sustainable, disruption-proof monetization. It gives control of monetization back to the publishers who are providing the content in the first place, and the advertisers who are funding it. The time is now to start moving advertising infrastructure server-side because continuing to rely on browsers is no longer serving anyone.</p>
