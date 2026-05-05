---
author: bobmonsour.com
cover_image: 'https://www.bobmonsour.com/assets/img/three-years-in-on-the-11ty-bundle.png'
date: '2026-05-04T16:17:16.981Z'
dateFolder: 2026/05/04
description: >-
  The 11ty Bundle site launched on May 1, 2023. Here's a recap of the past 
  year.
isBasedOn: 'https://bobmonsour.com/blog/three-years-in-on-the-11ty-bundle/'
link: 'https://bobmonsour.com/blog/three-years-in-on-the-11ty-bundle/'
slug: 2026-05-04-httpsbobmonsourcomblogthree-years-in-on-the-11ty-bundle
tags:
  - tech
title: Three years in on the 11ty Bundle
---
<figure><picture><figure><img alt="placeholder alt" sizes="100vw" src="https://bobmonsour.com/img/PVgAvkurDX-1200.jpeg" srcset="https://bobmonsour.com/img/PVgAvkurDX-300.jpeg 300w,"/><figcaption>placeholder alt</figcaption></figure></picture></figure>
<h2>Introduction</h2>
<p>I'm finding it increasingly hard to believe that I've just completed 3 full years of building, refining, and maintaining the <a href="https://11tybundle.dev">11ty Bundle website</a>. But here we are...</p>
<p>I <a href="https://bobmonsour.com/blog/1-%2B-1%3A-celebrating-2-years-of-the-11ty-bundle/">wrote a recap of the 2nd year</a> too.</p>
<h2>Highlights</h2>
<p>In no particular order:</p>
<ul> <li>Crossed the 1,700 post mark in April of this year</li> <li>Jumped to over 1,500 sites built with Eleventy, including a large jump in January by integrating sites from the <a href="https://www.11ty.dev/speedlify/">11ty leaderboard</a> that we didn't already capture</li> <li>Created a <a href="https://11tybundle.dev/showcase/">Showcase page</a> to show off screenshots of all of those sites</li> <li>Crossed the 500 author mark</li> <li>Published 16 issues of the <a href="https://11tybundle.dev/blog/">11ty Bundle blog</a></li> <li>Enjoyed a wonderful collaboration with <a href="https://damianwalsh.co.uk/">Damian Walsh</a> on a redesign of the site which we launched in January of this year</li> <li>Added an <a href="https://11tybundle.dev/insights/">Insights page</a>, providing a 'by the numbers' look at the data underpinning the site</li> <li>Added a <a href="https://11tybundle.dev/categories/liquid/">Liquid category</a>, a <a href="https://11tybundle.dev/categories/books-pages/">Books Pages category</a>, and a <a href="https://11tybundle.dev/categories/vento/">Vento category</a></li> <li>Search functionality has been dramatically improved in both utility and interace. I've upgraded to the latest version of <a href="https://pagefind.app/">Pagefind</a> and have taken advantage of some of the new capabilities. I will confess freely that I used Claude Code to assist with the integration.</li> </ul>
<h2>Analytics</h2>
<p>I won't be sharing the analytics data like I did last year. I did note an appreciable jump in traffic as a result of the redesign. That's the good news. The bad news is that it seems that the bots and AI crawlers have arrived and seem to have skewed the numbers dramatically. I have noticed this on my personal site as well and have since removed analytics from that site. I have not removed them from the 11ty Bundle site, but I just don't look at them very often any more. It's not really the point. I know that real people use the site and that's good enough for me.</p>
<h2>Deployment</h2>
<p>As I wrote in a <a href="https://bobmonsour.com/blog/changing-how-i-deploy-my-eleventy-sites/">recent blog post about how I now deploy my Eleventy sites</a>, I now use Cloudflare's Wrangler utility to deploy the site. The build takes place locally, and Wrangler pushes any files that have changed to the Cloudflare Workers platform. I'm very happy with this method of deployment.</p>
<h2>Tooling</h2>
<p>Last year, I had written a highlight that said <em>"Created some node scripts to make the site easier to maintain."</em> That highlight linked to the <a href="https://bobmonsour.com/blog/node-cli-of-my-dreams/">post where I described what I had built</a>.</p>
<p>As much as those tools had served me, there remained more friction than I could bear in maintaining the data that underpins the site.</p>
<p>I embarked on a path of using Claude Code to build a Flask app (a python framework) to make it easier to deploy the site. In fact, it started out as an app to post to mutiple social media sites with a single post. It gradually became a full blown CMS for the 11ty Bundle data, all of which is stored in a few json files. It's a local-only app that serves me well and save me a ton of time when creating or editing the site contents.</p>
<p>You can find it at <a href="https://bobmonsour.com/blog/how-ive-been-using-ai/#a-custom-cms-for-the-11ty-bundle">this anchor link</a>, which is part-way down a <a href="https://bobmonsour.com/blog/how-ive-been-using-ai/">blog post about how I've been using AI</a>.</p>
<h2>Finding my web dev tribe in retirement</h2>
<p>I've been happy with how all of this has come about and, being struck at the moment earlier this year, I decided to submit a talk proposal to the <a href="https://northbaypython.org/">North Bay Python</a> 2026 event. It takes place just 10 miles north of where I live. Shocked, pleased, and nervous, my proposal was accepted and I gave the talk on May 25th. I wrote <a href="https://bobmonsour.com/blog/north-bay-python-2026-afterthoughts/">a short piece (and included the video) about it</a>.</p>
<h2>Eleventy becoming Build Awesome</h2>
<p>Lastly, Eleventy is becoming Build Awesome, and <a href="https://www.kickstarter.com/projects/fontawesome/build-awesome-pro">the Kickstarter has relaunched</a>.</p>
<p>I am fully supportive of this as it means the Eleventy will continue to have a supported open source version and there is a path for economic stability of the project through Build Awesome Pro subscriptions. I am hopeful that this will work out for everyone involved.</p>
<p>I wrote a short "editorial" with my thoughts on this in <a href="https://11tybundle.dev/blog/11ty-bundle-85/">Issue 85 of the 11ty Bundle</a>.</p>
<h2>Conclusion</h2>
<p>Three years down...not sure how many more to go. Now that capturing and maintaining the site has become more efficient, I have been working on some other side projects, many of them being built with Eleventy. You can find more about them in <a href="https://bobmonsour.com/blog/how-ive-been-using-ai/">my post about my use of AI</a>.</p>
<p>I'm still happy to be part of this community and continue to enjoy using and learning more about Eleventy as well as other methods and platforms for building useful tools and sites.</p>
