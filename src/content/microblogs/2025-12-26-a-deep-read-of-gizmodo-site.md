---
title: A deep read of Gizmodo's new website
description: Keleops appears to have brought a handful of standard technology to the WordPress site, but hasn't overly generalized it.
growthStage: budding
tags:
  - tech
  - media
featured: false
linkInternal: true
cover_image: gizmodo-site.png
hide_cover_image: false
canonical: https://bsky.app/profile/chronotope.aramzs.xyz/post/3maw7ezijqi2y
date: '2025-12-26T18:10:00.000-04:00'
---

First time I've seen the new Gizmodo design. It looks good. Smart too, well layed-out to balance content & ad revenue. They're using Optidigital, I'm not familiar with it. It's loading pretty heavy on their site. Could be balanced better, but is performing mechanically better than the previous site.

Worth taking a look, considering Gizmodo is now owned by Keleops Media, which has started entering the US by purchasing a bunch of G/O sites. We can tell by the Yoast plugin in the HEAD, these sites are running on WordPress now. It looks like the SEO is well configured....

They're using the WP Rocket plugin to try to speed up the site using some smart tricks including its characteristic handling of CSS in the HEAD "rocket-lazyload-inline-css". This is somewhat sabotaged by the ad config continually running with no pause between executions. That'll get them penalized.

Chartbeat has been immensely popular among newsrooms for a while, but it isn't in place here. `mrf:` metatags indicate that they're using Marfeel analytics. This makes sense as it is preferred among European publishers, an indicator that Keleops Media is doing some of the technical decision-making.

Likely the heaviest thing is the Connatix video player. It isn't well-written code (no surprise that being merged with JW Player hasn't helped) and is responsible for the continuous execution of code on the page that will absolutely punish their SEO rankings on the site performance side.

Interesting that they've fully outsourced their comments to OpenWeb. It isn't currently monetized, but presumably they're interested in having that option. They're doing their emails now through Mailchimp, it looks like, they've activated the Mailchimp plugin on their page for newsletter signup.

Keleops seems to have at least two in-house plugins in place, at least judging from stylesheets in the HEAD. One is for building quick Table of Contents, the other is for something called Shopbot which I'm betting is an internal tool for affiliate link-related shopping.

Good evidence is in where we see a Table of Contents element (often used because it can help with SEO).

Apparently Gizmodo [runs its own app store](https://gizmodo.com/download/google-chrome). Presumably this is an affiliate link monetization tool. Not what I expected when I hit Downloads in the menu

The downloads page doesn't seem to be a terrible setup. It's not a bad performing page and it doesn't look particularly ugly as these things go.

It is interesting, a lot of modern websites, even on WordPress, go with React-based libraries for their front end. That doesn't appear to be the case here? Not a criticism at all, just interesting.

I can see some support for single sign-in providers in the code, but nothing implemented. You don't sign in to this version of the site. It has a bookmarking feature, but it just pops items into localStorage. Straightforward. Not a bad idea if you're not interested in pushing subs at the moment.

The other in-house plugin appears to be for Liveblogs. Interesting. There are some pretty standard liveblog plugins. Gizmodo doesn't look like they've used it yet--just on a quick search. Sadly, [old liveblogs don't appear](https://gizmodo.com/were-liveblogging-apples-iphone-13-event-right-here-1847667340) to have carried over at all.

The site style is clearly a Keleops in-house deal. Classes call out the company, especially major elements in a right rail like "widget_keleops-posts". It does appear to have been modified from a version that exists on their JournalDuGeek.com property which has more ads, but a lighter technical load

It looks like they have implemented [the Nextend plugin](https://wordpress.org/plugins/nextend-facebook-connect/#developers) to support social login. Not great infosec or performance that the styles for that are leaking to the client side for standard articles. Also, not great that they haven't hidden `/wp-admin`. That shouldn't work tbh.

The "Cached for great performance" comment on the bottom of the page indicates they're using WP Rocket's caching tools. I also see the comment count on view-source, which indicates to me that the cache seems to get updated pretty frequently. Too much? I'd expect that entirely on the front end.

Their ads.txt indicates prebid through OptiDigital. Keleops seems to use them for other sites as well. Gizmodo is set up for direct sales through its own GAM server, admin-ed by Keleops.

This is interesting b/c other Keleops sites share the same ad server IDs, but not Gizmodo, which shares an ID with Keleops owned Kotaku. This might reflect an intention to run direct ad sales here in the US as its own operation, which would make sense. It also attaches its own clear revenue line.

robots.txt for Gizmodo has some indicators as well. Scrapers and AI data training is disallowed but "traditional search" and AI search and AI agent use are both allowed in there. [Sitemap](https://gizmodo.com/post-sitemap2.xml) indicates they've maintained the full backlog of articles, which is very cool.

The ads.txt config notes that they've allowed OptiDigital to also do direct sales, interesting. A bunch of different seats on the same SSPs are in there too. They've set up resellers for Amazon and OpenWeb and, of course, Connatix. Connatix seems to be a standard partner across many Keleops sites.

This is a pretty respectable setup. I appreciate that while they've adapted technology and design elements from other sites they own, they do appear to have realized that the G/O sites need some degree of customization. There's certainly areas that could be improved on, but it is a better setup.

Keleops is not a familiar name to me. They appear to be HQed out of Switzerland. LinkedIn and Crunchbase indicate they are small, in the 10-50 range (24 LinkedIn members) and that it started as a marketing firm. Their pattern of acquisitions indicates they're building out a robust tech media arm.

I'm not as familiar with EU/Swiss media as I am with US, so no judgement on them. I think that marketing companies becoming media companies can be somewhat suspect, but nothing bad that I can see. And a good sign that they ratified the contract with the Gizmodo union!

They're also very closely aligned with gaming media in particular. Besides their acquisition of Kotaku, they appear to sponsor a mainstream e-sports team. Also interesting. I wonder if they think about or if that presents an editorial conflict at all. It doesn't have to, but not a common choice.

From a UX perspective, there's nothing amazingly new here, but it is all solid choices. A variety of bylines in almost every vertical and they don't seem to overly heavily push the affiliate marketing around reviews or the downloads area

(The downloads area, btw, appears to be from [a company Keleops owns](https://www.keleops.com/en/keleops-acquires-clic2load.php) )

I've seen a lot worse, that's for sure. Clearly some calibration on the ad tech is needed, but they're hardly the only pub with that problem. They seem to have an EU company's respect for privacy, with a CMP setup and guardrails around YouTube embeds. That's normal and not really indicative.

It is interesting to see that they're pulling in the major Creative Commons news sources, I see articles from ProPublica and The Conversation, which is pretty common among big blogs and small media sites.

I'd also consider, if I was in their shoes, doing more restrictions on whose ads show up on the site, in particular certain parts of the site. The Downloads Here fraud ads on the download page and the X Coolest Gifts ads on the Deals pages are confusing, but that's a constant struggle.

It's better than the site ever looked under the fist of G/O and a better ad and site config too. A good sign that maybe the sites Keleops has purchased will live a decent life.
