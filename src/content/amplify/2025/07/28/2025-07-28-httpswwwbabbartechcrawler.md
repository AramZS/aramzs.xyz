---
author: babbar.tech
cover_image: ''
date: '2025-07-28T15:08:00.414Z'
dateFolder: 2025/07/28
description: >-
  Babbar. tech is operating a crawler service named Barkrowler which fuels and
  update our graph representation of the world wide web.
isBasedOn: 'https://www.babbar.tech/crawler'
link: 'https://www.babbar.tech/crawler'
slug: 2025-07-28-httpswwwbabbartechcrawler
tags:
  - seo
title: 'About the Babbar''s bot: Barkrowler'
---
<h5>Our crawler</h5>
<ul> <li> - Bot type : Crawler (identify itself) </li><li> - Version: 0.9 </li><li> - Follows robots.txt </li><li> - Follows crawl delay </li><li> - Reverse DNS suffix: babbar.eu </li></ul>
<p>Babbar.tech is operating a crawler service named Barkrowler which fuels and update our graph representation of the world wide web. This database and all the metrics we compute with are used to provide a set of online marketing and referencing tools for the SEO community.</p>
<h3># What is Barkrowler doing on your website(s)?</h3>
<p>Barkrowler crawls urls found on public pages and thus may be visiting each page which have been publicly cited somewhere.</p>
<h4>Even redirect (301) or missing (404) pages ?</h4>
<p>Yes, we keep trying to crawl those pages just to be sure that a missing pages doesn't reflect a temporary state or a faulty web server.</p>
<h4>And what about no follow links ?</h4>
<p>Google introduce No follow links to let a site indicate that some pages must not be take into account when computing web metrics. But it doesn't prevent a bot to crawl these pages.</p>
<h3>Does-it respect my robots.txt file ?</h3>
<p>Yes. We respect robots.txt file (using crawler-commons tool set) and disallow directives. If you have the feeling that we do not respect your directive, please contact-us.</p>
<h4>How do I increase the interval between Barkrowler queries ?</h4>
<p>We have a politeness policy of 5 sec between two queries on the same host, and 2.5 sec between two queries on the same IP of the same domain. You can extend the crawl delay using the robots.txt file:</p>
<pre>User-agent: barkrowler
Crawl-Delay: [delayInSec]
</pre>
<p>Note that the crawl delay only applied for a given host. If a same web server is hosting websites with different domains, the rules above will apply. If your server is hosting a large number of website with a large number of separate domains, it'a unlikely but possible that several crawlers query the same server at a given time.</p>
<h4>How do I prevent Barkrowler to crawl part of my site ?</h4>
<p>The robots.txt file allows you to disallow Barkrowler to crawl a part or the whole of your website using disallow directive. For example, to prevent the wordpress admin section to be access by Barkrowler:</p>
<pre>User-agent: barkrowler
Disallow: /wp-admin/
</pre>
<h3>What happens to the crawled content ?</h3>
<p>Crawled content are not stored in our database, we mainly kept links and meta-information about web pages. No nominative data are stored in our database neither.</p>
<h3>My website blocks your bot, how to fix it ?</h3>
<p>Even if Barkrowler crawls web pages with a reasonable delay (2,5 or 5 sec between queries), It is sometimes mistaken for a DDOS or a Brute force attack. If we found an url containing session parameters, it could also be considered as a login attempt. For these reasons, Barkrowler may be temporary blacklisted. In this case, you may try to whitelist Barkrowler directly in your plugin, or contact us if you can't.</p>
