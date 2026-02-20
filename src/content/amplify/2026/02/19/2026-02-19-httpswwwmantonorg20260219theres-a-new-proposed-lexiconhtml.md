---
author: Manton Reece
cover_image: ''
date: '2026-02-20T02:10:57.640Z'
dateFolder: 2026/02/19
description: >-
  But as the technology expanded, HTML and CSS have essentially become rendering
  and display formats. We deprecated H tags and P tags for DIV and SPAN tags.
isBasedOn: 'https://www.manton.org/2026/02/19/theres-a-new-proposed-lexicon.html'
link: 'https://www.manton.org/2026/02/19/theres-a-new-proposed-lexicon.html'
slug: 2026-02-19-httpswwwmantonorg20260219theres-a-new-proposed-lexiconhtml
tags:
  - decentralization
title: a new proposed lexicon
---
<p><a href="https://micro.blog/manton">@manton</a> I think HTML and markdown have a complex relationship.</p>
<p>If I dial back to the HTML I wrote in 1996, it was very much a data output format. Eventually adding some cascading style sheets so that you could control some basic rendering of that data format.</p>
<p>But as the technology expanded, HTML and CSS have essentially become rendering and display formats. We deprecated H tags and P tags for DIV and SPAN tags. That's kind of when Markdown down came into existence. To render structured text without CSS concerns.</p>
<p>So I think the underlying question with a blog is really a decision about what you are trying to produce. Are you trying to produce a structured data file with some styling? Or are you trying to produce a digitally rendered interface?</p>
<p>In the case of a blog post, I can see both outputs as equally valid depending on context. So I can see value in both. This may be a case for author's intent. If an author doesn't intend for a markdown post, then maybe it can't be output that way?</p>
<p>Hi, author of the proposed Lexicon here! So the context for this proposed Lexicon is built on two stakes:</p>
<ol><li><p>There are a lot of us out there doing really interesting things with static site generators and automating putting that content on ATProto so it can be read by a variety of tools that sit on the protocol like GreenGale or PotatoNet App. In this way, the goal is to present the capability to consume ATProto in the style of an RSS Reader as much as a Social Network. Making the content as generic as possible while providing tooling to hint at rendering complexity for willing clients is how I see a way to make that possibility become closer to reality and more likely to be adopted. The goal is not so much to use ATProto as a blog here (though that is very possible!) but to offer content through ATProto as a distribution venue.</p></li><li><p>Markdown has become a sort of standard language for offering content up generically outside of RSS. I love RSS and I don’t intend to undercut it when I say this (there’s also an extension that allows you to put MD in RSS out there). But there seems to be a growing number of tools that read and speak Markdown, and by presenting Markdown as simply as possible it makes it available to them. In this sense it acts as a very useful fill-in for the standard.site Lexicon, which provides a generic <code>content</code> field that can be filled with a lexicon-defined object. This is, as far as I can see, the most generic version of that object and the most accessible to readers and writers of the specification; opening it up to more people to use, in part to drive the reasoning above.</p></li></ol>
<p>To answer <a href="https://micro.blog/gatesvp@mstdn.ca">@gatesvp</a> - The goal here is to produce a feed of content with hints that allow for richer styling–if the reader view wants to use them–but not require anything other than a render of plain text. It is essentially exactly as you say - an offering of structured text that can be rendered without CSS.</p>
<p>LMK if that answers the question! Would love to get feedback if you’ve got it.</p>
