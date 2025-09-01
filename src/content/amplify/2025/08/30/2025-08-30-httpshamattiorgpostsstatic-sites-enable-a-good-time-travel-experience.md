---
author: Juha-Matti Santala
cover_image: >-
  https://hamatti.org/assets/img/posts/static-sites-enable-a-good-time-travel-experience/static-sites-enable-a-good-time-travel-experience-cover.png.webp
date: '2025-08-30T20:37:32.048Z'
dateFolder: 2025/08/30
description: >-
  A static site with version control history enables me to travel into any point
  in the project’s past and serve the site as it was back in the day.
isBasedOn: 'https://hamatti.org/posts/static-sites-enable-a-good-time-travel-experience/'
link: 'https://hamatti.org/posts/static-sites-enable-a-good-time-travel-experience/'
slug: >-
  2025-08-30-httpshamattiorgpostsstatic-sites-enable-a-good-time-travel-experience
tags:
  - code
  - blogging
title: Static sites enable a good time travel experience
---
<figure><img alt="" src="https://hamatti.org/assets/img/posts/static-sites-enable-a-good-time-travel-experience/static-sites-enable-a-good-time-travel-experience-cover.png.webp"/></figure>
<p>Varun wrote about <a href="https://varunbarad.com/blog/blogging-achievements">gamifying blogging and personal website maintenance</a> which reminded me of the time when <a href="https://hamatti.org/posts/i-gamified-my-own-blog/">I awarded myself some badges for blogging</a>.</p>
<p>I mentioned this to Varun who asked if I had any screenshots of what it looked like on my website. My initial answer was “no”, then I looked at Wayback Machine but there were not pictures of the badges.</p>
<p>Then, a bit later it hit me. I don’t need any archived screenshots: my website is built with Eleventy and it's static so I can check out a git commit from the time I had those badges up, fire up Eleventy and see the website — as it was in the spring of 2021.</p>
<figure><img alt="A screenshot of my blog index with five custom badges for self-hosting, polyglot, 20 weeks in a row, 12 months without major rewrites and 100 posts." src="https://hamatti.org/assets/img/posts/static-sites-enable-a-good-time-travel-experience/1.png.webp"/><figcaption>A screenshot of my blog index with five custom badges for self-hosting, polyglot, 20 weeks in a row, 12 months without major rewrites and 100 posts.</figcaption></figure>
<p>That’s a beauty of a static site generator combined with my workflow of fetching posts from CMS before build time so each commit contains a full snapshot of the website.</p>
<p>Comparing this to a website that uses a database for posts (like WordPress) or a flow where posts from CMS are not stored in version control but rather fetched at build time only, my solution makes time travel to (almost) any given moment in time a two-command operation (<code>git checkout</code> with the right commit hash and <code>@11ty/eleventy serve</code> to serve a dev server). I say almost because back in the day I wasn’t quite as diligent in commiting every change as I was deploying manually and not through version control automation.</p>
<p>A year ago, inspired by Alex Chan’s blog post <a href="https://alexwlchan.net/2024/scheduled-screenshots/">Taking regular screenshots of my website</a> I set up a GitHub Action that takes a snapshot of my front page once a month to keep a record. At the time, I felt bit sad that I hadn’t started it before. However, now that I realised how easy it is for me to go back in time thanks to Eleventy and git, I’m not so worried anymore. Maybe I should do a collage of changes on my design one day by going through my project history.</p>
<p>One more major point for static site generators!</p>
<p>If something above resonated with you, let's start a discussion about it! <strong>Email me at juhamattisantala at gmail dot com and share your thoughts</strong>. In 2025, I want to have more deeper discussions with people from around the world and I'd love if you'd be part of that.</p>
