---
layout: layouts/page.njk
title: Replay Pages on this Site
slug: what-are-replay-pages
titlePrefix: "About"
subTitle: "What are archive replay pages and why do you have them?"
folder: about
---

These pages represent my interest in replicating digital archives locally to the sites I maintain that are building content related to those webpages. 

I think this is important because archives should be maintained broadly, in multiple locations, and I don't think we should be dependent on the Internet Archive to have perfect behavior and maintenance. 

Archive Replay pages use WACZ files, which are the standard web archive format in much of academia, and (along with [other supported formats](https://replayweb.page/docs/user-guide/)) put them into a player environment hosted on this website so that they can be used and interacted with.  

This project implements the script for replaying archives [from the ReplayWebPage project](https://replayweb.page/docs/embedding/#introduction) with an alteration to support a service worker operating at the base of the site, instead of on individual pages. 

When I think a webpage is important I use [WebRecorder, a browser plugin](https://webrecorder.net/), to save a WACZ archive of interacting with the site, by hand, no bot or crawler involved. I save that file and upload it to this site, where it is linked with the associated page and made available via an archive link. 

## What about SEO / crawlers? 

Replay pages designate the original page as canonical (for as long as that page is up) and are noted as not intended to be crawled in Robots.txt. 
