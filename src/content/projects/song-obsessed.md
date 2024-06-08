---
date: 2024-01-01
title: Song Obsessed
description: This is a site for me to share my favorite songs and write about them. 
git: https://github.com/AramZS/songobsessed
featured: true
language: HTMX
tags: [Eleventy, Node, SSG, HTMX, Javascript]
status: stable
isBasedOn: https://songobsessed.com/about/
---

This is a site for me to share my favorite songs and write about them. Since early 2009 I've been using a variety of sites to keep track of one song a day, a week or a month. Sometimes I've written about them, sometimes not. But trying to find a way to retain that list and remember them over time has been a challenge. First The61 closed. Then ThisIsMyJam. Now I use Last.fm Obsessions, but it doesn't work exactly how I'd like.

So this site will hopefully work and, even if it isn't the best option, I'm running it, so I won't lose those songs and I'll always have a stable place to share them with others.

I've had the idea for a site like this for a while, but the complexity involved in taking it on with a traditional web framework like React was particularly daunting. When I learned about HTMX and experimented with it, I realized it would work perfectly for what I wanted to accomplish here. I don't want to build an app here, I want a website that makes the most of what the web can do and HTMX really enables it to happen.

So much more of what we do on the web involves media now, and so many sites are so ludicrously bad at allowing you to browse and listen to or watch media at the same time. React has technically enabled Single Page App-style behavior for this for... I dunno... a decade now? But "technically enabled" and "made easy" are two very different things. HTMX makes it relatively easy to enable users to browse and listen to a site at the same time, which is basic shit that I think is important for the future of the open web.

You can look at the commits yourself and see this took up maybe about 10 days worth of work. That's about how long a health web development ecosystem should enable this sort of project to take in my opinion. I've spent a week debugging react project build steps. This project is nearly zero dependencies outside of HTMX. Think about that, doesn't it sound good?

Even better, I can likely turn this into a progressive web app pretty quickly. It's on the to-do list.
