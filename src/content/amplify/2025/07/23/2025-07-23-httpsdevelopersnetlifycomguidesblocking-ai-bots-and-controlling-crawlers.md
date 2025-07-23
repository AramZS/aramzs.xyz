---
author: netlify.com
cover_image: >-
  https://developers.netlify.com/preview-image/guides/blocking-ai-bots-and-controlling-crawlers
date: '2025-07-23T21:39:55.883Z'
dateFolder: 2025/07/23
description: >-
  Controlling what content in your site is available to AI bots to crawl and
  harvest
isBasedOn: >-
  https://developers.netlify.com/guides/blocking-ai-bots-and-controlling-crawlers/
link: >-
  https://developers.netlify.com/guides/blocking-ai-bots-and-controlling-crawlers/
slug: >-
  2025-07-23-httpsdevelopersnetlifycomguidesblocking-ai-bots-and-controlling-crawlers
tags:
  - code
title: Blocking AI bots and controlling crawlers
---
<p>AI offers some incredible opportunities as a tool for developers, but we might not want all of the many AI services out there scraping everything we publish on our web sites to be used as their training content. There are ways to tell these bots not to crawl our data, and Netlify Edge Functions can help make this pretty straightforward.</p>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/At5q11PtTME?rel=0&amp;autoplay=1&amp;playsinline=1" type="video/mp4"/></div></figure>
<p>We’ll look at two important mechanisms to block AI bots from scraping your sites, and implement them with a simply generated config file and with an Edge Function.</p>
<h2 data-astro-cid-mrmim4ef="">Deploy and play</h2>
<p>If you prefer to go straight to deploying your own copy of an example, you can do that by clicking the button below</p>
<figure><a data-astro-cid-ur3u2r3y="" href="https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fnetlify%2Fexamples%2F%26create_from_path%3Dexamples%2Fai-bot-control%26utm_campaign%3Ddx-examples"><img alt="Deploy to Netlify" data-astro-cid-ur3u2r3y="" src="https://www.netlify.com/img/deploy/button.svg"/></a><figcaption><a href="https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fnetlify%2Fexamples%2F%26create_from_path%3Dexamples%2Fai-bot-control%26utm_campaign%3Ddx-examples">Deploy to Netlify</a></figcaption></figure>
<p>The simplest way to disallow bots from crawling your sites is to state this in a <code>robots.txt</code> file served from the root of your site. <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Robots_txt">A <code>robots.txt</code> file</a> is designed to instruct web crawlers about what content on your site they can and cannot access.</p>
<p>The <code>robots.txt</code> file will need to include a rule declaration for every known AI bot you wish to ban from scraping your content. Since the list of known AI bots is rather long, and likely to get longer, it can be helpful to generate the file in order to avoid typos and errors. It also means we can reuse the same single list of AI bots for something else… we’ll get to that later.</p>
<p>Most, if not all web frameworks make it trivial to generate a file from some data. For the sake of illustration, I’ve not used a framework for this example, and instead just made a tiny build script which adds the following declaration to a <code>robots.txt</code> file for every item it finds in a seperate list of User Agent strings for know AI crawlers.</p>
<p>The declaration we need for each bot:</p>
<p>Here’s out list of AI bots held in a <code>.json</code> file for convenience:</p>
<p>There’s nothing special about that little node script to make the file. You can see it here if you’re curious: <a href="https://github.com/netlify/examples/blob/main/examples/ai-bot-control/build.js">build.js</a></p>
<p>Serve the resulting <code>robots.txt</code> file from the root of your site, and AI crawlers should honor it and not scrape the content of your site.</p>
<p><em>“Should”</em>.</p>
<p>Sadly, not all AI products repsect the rules found in a <code>robots.txt</code> file, so we need to reach for another option for additional confidence:</p>
<h2><a href="https://developers.netlify.com/guides/blocking-ai-bots-and-controlling-crawlers/#blocking-http-requests-based-on-the-user-agent-string-using-an-edge-function">#</a>Blocking HTTP requests based on the User Agent String using an Edge Function</h2>
<p>Edge Functions give us a low latency, high performance way to filter the requests being made to any resources in our sites.</p>
<p>Adding an Edge Function to a site is as simple as adding a TypeScript or JavaScript file to your site at this location, where Netlify knows to look for your Edge Functions:</p>
<p><code>/netlify/edge-functions/</code></p>
<p>Here’s an Edge Function that compares the User Agent string of the incoming HTTP request and compares it to our list of known AI bots, returning those requests an HTTP 401 response, while letting all other requests proceed as normal. It uses the same list of AI bots that we created to feed our <code>robots.txt</code> file. So that’s handy.</p>
<figure><pre data-language="tsx"><code>import { Config } from "@netlify/edge-functions";import agents from "../../agents.json" with { type: "json" };export default async (request: Request) =&gt; {const ua = request.headers.get('user-agent');if (ua.toLowerCase().includes(agent.toLowerCase())) {</code></pre></figure>
<p>Sadly, some bots have been found to mis-report their names in their User Agent strings, so we can’t rely on that technique alone either. Doubing-up and using both of these techniques should do the trick.</p>
<h2><a href="https://developers.netlify.com/guides/blocking-ai-bots-and-controlling-crawlers/#turning-this-into-a-utility">#</a>Turning this into a utility</h2>
<p>Those who operate multiple sites might find that this type of facility could be useful multiple times. It feels like a good contender to be packaged up as an integration which could be enabled with a couple of clicks for any of your sites.</p>
<p>To learn about how to do that, I’d recommend this guide on <a href="https://developers.netlify.com/guides/create-an-integration-that-injects-edge-functions-into-any-site/">creating a Netlify Integration to insert Edge Functions into a site</a>.</p>
<p>This guide was inspired by the approaches taken and documented in these great posts:</p>
<h2 data-astro-cid-3aox33w5="">In this guide</h2>
