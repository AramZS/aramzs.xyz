---
author: jamesg.blog
cover_image: >-
  https://screenshots.jamesg.blog/?url=https://jamesg.blog/2024/11/30/designing-a-calm-web-reader/
date: '2025-08-30T20:46:24.771Z'
dateFolder: 2025/08/30
description: >-
  My equivalent of the “morning paper” is reading personal websites. I sometimes
  get so excited to check what new blog posts are out that I write down on my
  TODO list that I should check my reader in the morning to see what’s new. [^1]
isBasedOn: 'https://jamesg.blog/2024/11/30/designing-a-calm-web-reader'
link: 'https://jamesg.blog/2024/11/30/designing-a-calm-web-reader'
slug: 2025-08-30-httpsjamesgblog20241130designing-a-calm-web-reader
tags:
  - code
title: Designing a calm web reader
---
<p>My equivalent of the “morning paper” is reading personal websites. I sometimes get so excited to check what new blog posts are out that I write down on my TODO list that I should check my reader in the morning to see what’s new. <sup><a href="https://jamesg.blog/2024/11/30/designing-a-calm-web-reader#1">1</a></sup></p>
<p>I designed my web reader – the interface I use to follow blogs – after reflecting on how I want to read the web. I love reading personal websites, but I can’t keep up with them all without a tool that helps me keep up to date with the latest ones. This is the idea of a web reader (also called a “feed reader”). Except none of the web readers out there quite met my needs.</p>
<p>I hoped for a web reader that would update once a day, and have the option to manually update if I really wanted to. I hoped for a text-first reader that focused only on the essential information. I hoped for an interface that didn’t encourage me to keep coming back. I wanted a reader that felt calm.</p>
<p>I wanted the reader to be the interface through which I found blogs that I could then open elsewhere. This drastically limited the scope of the project. Rather than having to design panels for how to show blogs, I decided I would read them on everyone’s personal websites. Indeed, I love going to people’s websites to see what’s new. A reader could encourage this by directly linking to websites.</p>
<p>I decided to make my own software: a tool that would update once a day and check for the latest blog posts.</p>
<p>Here is what it looks like:</p>
<figure><picture><img alt="My web reader, showing four posts that were published on Saturday, November 30th" src="https://jamesg.blog/assets/webreader.png"/></picture><figcaption>My web reader, showing four posts that were published on Saturday, November 30th</figcaption></figure>
<p>This reader has a few features. First, it is text-only. I show only the information I need: post titles and the author of the person who posted the associated blog. The reader doesn’t show images, except for my mascot that regularly makes me smile. Joy was an important part of this project. Long titles are paginated with <code>[…]</code> so that no one title takes up too much room. Posts are grouped by day, so I can scroll back through time to see what’s new. Only the last seven days of posts are displayed.</p>
<p>The reader updates once per day: every day in the early morning. So, when I wake up, I have my morning paper.</p>
<p>I have been using this tool for a few months after thinking through several iterations of designs. I knew I wanted a simple interface, but it took some time to figure out what that should look like. I asked myself <em>What is essential?</em> constantly through the design process, eager to trim down the scope of the project while making something intuitive, calm, and useful.</p>
<p>A large part of this project was reflecting on what I wanted the tool to encourage. I wanted to feel encouraged to read blogs, but I didn’t need real-time updates. I didn’t want to feel pressured to check my feed reader several times a day eager to see what’s new. Because the tool updates daily, I don’t feel compelled to check my reader on a regular cadence. I usually check it a few times a day: once in the morning to see what’s new, then a few times later in the day if I’m looking for something to read. I don’t check for novelty, unlike tools like Mastodon where I would often check just to see what the latest post was. I don’t want that.</p>
<p>The tool polls all feeds in the morning then saves the results to a JSON file. That JSON file is then used to create a static HTML page that I can then open and read. <a href="https://github.com/capjamesg/web-reader">The code is open source</a>.</p>
<p>I am interested in the idea of building calmer tools. I want my tools to make me feel good: to be something that encourages me to create or read then move on with my day. To be calmer, my web reader updates once per day, does not have the concept of a notification, shows only the essential information (to combat information overload), and is designed in such a way that brings me joy.</p>
<p><sup>1</sup></p>
<p>If you write on a personal website, let me know! I’m always looking for new blogs to read!</p>
<p><a href="https://jamesg.blog/2024/11/30/designing-a-calm-web-reader#f-1">[↩]</a></p>
