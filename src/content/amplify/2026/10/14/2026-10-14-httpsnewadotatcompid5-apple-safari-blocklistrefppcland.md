---
author: Pesach Lattin
cover_image: >-
  https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,width=1200,onerror=redirect/uploads/asset/file/39da9d44-48f3-4a6b-989e-a38c546061b0/1.png?t=1791469048
date: '2026-10-14T15:27:36.522Z'
dateFolder: 2026/10/14
description: >-
  ID5's own docs describe cross-domain matching on IP and user agent. Apple
  blocked it in Safari and won't restore it, while The Trade Desk got unblocked
  in 13 days.
isBasedOn: 'https://new.adotat.com/p/id5-apple-safari-blocklist?ref=ppc.land'
link: 'https://new.adotat.com/p/id5-apple-safari-blocklist?ref=ppc.land'
slug: 2026-10-14-httpsnewadotatcompid5-apple-safari-blocklistrefppcland
tags:
  - ad tech
title: 'ID5 Calls Its Signals Consented. Apple Blocked It Anyway, for Good.'
---
<figure><picture><figure><img alt="ID5 Calls Its Signals Consented. Apple Blocked It Anyway, for Good." src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,onerror=redirect/uploads/asset/file/39da9d44-48f3-4a6b-989e-a38c546061b0/1.png?t=1791469048"/></figure></picture></figure>
<p><a href="http://www.troutmanamin.com/?adotat=&amp;utm_campaign=id5-calls-its-signals-consented-apple-blocked-it-anyway-for-good&amp;utm_medium=referral&amp;utm_source=new.adotat.com"><figure><picture><source media="(max-width: 360px) and (min-resolution: 2dppx)" srcset="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,width=720,onerror=redirect/uploads/asset/file/c3fcd1cd-de48-46d4-a6b2-7cbd1d1092c8/Screenshot_2026-08-06_at_09.33.22.png?t=1786034033 2x"/><source media="(max-width: 360px)" srcset="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,width=360,onerror=redirect/uploads/asset/file/c3fcd1cd-de48-46d4-a6b2-7cbd1d1092c8/Screenshot_2026-08-06_at_09.33.22.png?t=1786034033 1x"/><source media="(max-width: 430px) and (min-resolution: 2dppx)" srcset="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,width=860,onerror=redirect/uploads/asset/file/c3fcd1cd-de48-46d4-a6b2-7cbd1d1092c8/Screenshot_2026-08-06_at_09.33.22.png?t=1786034033 2x"/><source media="(max-width: 430px)" srcset="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,width=430,onerror=redirect/uploads/asset/file/c3fcd1cd-de48-46d4-a6b2-7cbd1d1092c8/Screenshot_2026-08-06_at_09.33.22.png?t=1786034033 1x"/><figure><img alt="" src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,onerror=redirect/uploads/asset/file/c3fcd1cd-de48-46d4-a6b2-7cbd1d1092c8/Screenshot_2026-08-06_at_09.33.22.png?t=1786034033"/></figure></picture></figure></a></p>
<p><strong>ID5 sells one thing: knowing it’s you when the cookie can’t.</strong> That is the entire business. The browser forgets you, ID5 remembers. Publishers pour signals in, ID5 pours a persistent identifier out, and the open web gets to keep telling advertisers that addressability survived the death of the third-party cookie. <strong>It’s a lovely story. It sold a lot of decks.</strong></p>
<p><strong>Apple just tore the last page out.</strong></p>
<p>ID5’s domains sit on a private Safari blocklist that kills requests <strong>before they ever leave the phone.</strong> No auction, no ID, no match. And ADOTAT has learned that <strong>ID5 is not coming off that list.</strong> Not in the next beta. Not after a polite bug report. Not after a very sincere engineering memo.</p>
<p>Meanwhile, <strong>The Trade Desk</strong> landed on the same list, filed a ticket, sent some documentation, and <strong>was unblocked in a test build 13 days after Apple’s first reply.</strong> Apple’s published policy says, in plain English, that it grants <strong>no exceptions to specific parties.</strong> So one company got a fix and another company got a wall, and Apple has explained neither in public.</p>
<p><strong>Welcome to the new Safari.</strong> The rules are real, the enforcement is real, and the rulebook is locked in a drawer in Cupertino.</p>
<p>Here’s what’s actually going on, why ID5 is the one in real trouble, and why every identity vendor still reachable in Safari should stop gloating and start reading.</p>
<h2><strong>ID5 wrote its own indictment</strong></h2>
<p>Apple has never said why ID5 is on the list. <strong>It doesn’t need to. ID5’s own documentation reads like the charge sheet.</strong></p>
<p>ID5 says: <strong>“Signals passed in the ID5 ID request are used to inform ID5 ID connections across domains.”</strong></p>
<p>It says: <strong>“‘Hard signals’, such as hashed email addresses, take priority for cross-domain linking purposes, and help to train ID5’s probabilistic algorithm.”</strong></p>
<p>And it instructs partners: <strong>“Ensure IP address and user agent are always included in the PD string.”</strong></p>
<p>Put those three lines side by side. <strong>Cross-domain linking. A probabilistic model trained on hashed emails. IP address and user agent as standing inputs, always.</strong></p>
<p>Now read what Apple says it exists to stop. Its tracking prevention policy targets <strong>cross-site tracking</strong>, recognizing the same person across unrelated websites, and it names <strong>fingerprinting</strong> as a method. Apple’s own technical writing breaks fingerprinting down into <strong>device characteristics, network characteristics like IP address, user settings, behavioral patterns and accumulated traits.</strong></p>
<p><strong>IP address. Browser details. Cross-domain linking.</strong> You don’t need a decoder ring. ID5’s product and Apple’s prohibited behavior overlap almost perfectly on paper.</p>
<p>To be fair, and we will be, <strong>sending IP address and user agent does not by itself make every ID5 implementation fingerprinting.</strong> Plenty of ordinary web traffic carries both. The question is what happens next, and ID5’s own words describe what happens next: <strong>connections across domains.</strong></p>
<p>ID5’s answer to all this is consent. It describes its technology as connecting <strong>consented</strong> signals into persistent identifiers. That’s a real legal posture, and nothing here says ID5’s consent framework is invalid or unlawful.</p>
<p><strong>But Apple closed that door years ago.</strong> In its documentation for required-reason APIs, Apple wrote: <strong>“Regardless of whether a user gives your app permission to track, fingerprinting is not allowed.”</strong></p>
<p>That’s an app rule, not a Safari rule, and it would be sloppy to call it the legal basis for this block. <strong>But it tells you exactly how Apple thinks.</strong> In Cupertino, a consent string is not a permission slip. You can be compliant with GDPR and still be the thing Apple’s browser is built to stop.</p>
<h2><strong>Why The Trade Desk walked and ID5 can’t</strong></h2>
<p><strong>The Trade Desk got out because it could argue its blocked domain was plumbing.</strong></p>
<p>adsrvr.org is where The Trade Desk serves ads. TTD’s engineers made a narrow, technical case: an ad-delivery endpoint is not an identity endpoint, and blocking it breaks ordinary advertising, which Apple’s own policy says it doesn’t intend to break. They sent documentation. Apple investigated. A beta shipped.</p>
<p><strong>ID5 has no such argument available.</strong></p>
<p>Its endpoint is not plumbing sitting next to an identity business. <strong>The endpoint is the identity business.</strong> There’s no ad-delivery function to carve out, no innocent pipe to separate from the guilty one. When the product is cross-domain recognition, asking Apple to narrow the rule to “just the tracking part” means asking Apple to unblock the whole company.</p>
<p>That is the difference between <strong>a misclassified domain</strong> and <strong>a classified company.</strong></p>
<p>One gets a beta build and a thank-you note. <strong>The other gets a wall.</strong></p>
<p>And that’s why this is a business story, not a browser story. A universal ID that doesn’t resolve in Safari is a universal ID with an asterisk the size of the iPhone. <strong>Every sales call now starts with a footnote.</strong> Every publisher integration now comes with a question about which browsers actually return an ID. Every buyer who paid for addressable reach is entitled to ask what fraction of it was ever addressable.</p>
<h2><strong>The 13 days ID5 didn’t get</strong></h2>
<p>WebKit bug <strong>324771</strong> carries a title that reads like a confession from a config file: <strong>“Inclusion of adsrvr.org in IS_REQUEST_UNCONDITIONALLY_BLOCKABLE domain list.”</strong></p>
<p>Note the phrase. <strong>Unconditionally blockable.</strong> Not “blocked if it fingerprints.” Not “blocked when suspicious.” Unconditionally.</p>
<p>Apple’s <strong>John Wilander</strong>, on <strong>September 22</strong>: <strong>“Thanks for filing, Ian! I also got your email. We’re investigating.”</strong></p>
<p>On <strong>September 28</strong>: <strong>“I will let you know if and when any changes are available for you to test.”</strong></p>
<p>On <strong>October 5</strong>: <strong>“A new iOS 27.2 beta went out today. Please test with it. And thank you for the technical documentation you provided.”</strong></p>
<p>The Trade Desk’s <strong>Ian Meyers</strong>, the same day: <strong>“Thanks, John! Acknowledged I see the changes in the 24B5099f build. We will test and report back if there are any issues.”</strong></p>
<p>That’s it. That’s the whole public record of Apple responding to anyone about this list. <strong>Polite, quick, and completely silent on the one question that matters: why was the domain there in the first place?</strong></p>
<p>One more thing about that thread, because the trade press is already getting it wrong. <strong>The description of the list as a hard block on domains that power “post-cookie” identity came from Meyers’s complaint, not from Apple.</strong> Apple didn’t say that. Apple didn’t say anything about intent. Wilander talked about remediation and nothing else.</p>
<h2><strong>What Apple has never said</strong></h2>
<p><strong>“Apple has long opposed fingerprinting”</strong> is true and documented, in the WebKit policy since 2019, in a July 2023 developer announcement, and in Apple’s Safari privacy writeups.</p>
<p><strong>“Apple accused ID5 of fingerprinting”</strong> is not. No public Apple statement naming ID5 has been found. Not in the WebKit policy. Not in the 2023 developer announcement. Not in the Private Browsing 2.0 explanation. Not in the bug tracker.</p>
<p>So here is the accurate version of where ID5 stands: <strong>its own documentation describes behavior that closely matches what Apple prohibits, Apple has put it on a blocklist, Apple is keeping it there, and Apple has not said what conduct put it there.</strong></p>
<p>Other names reported as affected include <strong>LiveRamp</strong> and <strong>Experian’s Audigent.</strong> The Trade Desk was on it until the beta. <strong>Who else is on it, nobody outside Apple can tell you.</strong></p>
