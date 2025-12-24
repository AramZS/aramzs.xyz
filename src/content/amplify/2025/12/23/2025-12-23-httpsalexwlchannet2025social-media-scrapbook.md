---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/cards/2025/social-media-scrapbook.png'
date: '2025-12-23T17:58:00.375Z'
dateFolder: 2025/12/23
description: >-
  I don't trust platforms to preserve my memories, so I built my own scrapbook
  of social media.
isBasedOn: 'https://alexwlchan.net/2025/social-media-scrapbook/'
link: 'https://alexwlchan.net/2025/social-media-scrapbook/'
slug: 2025-12-23-httpsalexwlchannet2025social-media-scrapbook
tags:
  - tech
  - archiving
title: 'The Internet forgets, but I don’t want to'
---
<p>I grew up alongside social media, as it was changing from nerd curiosity to mainstream culture. I joined Twitter and Tumblr in the early 2010s, and I stayed there for over a decade. Those spaces shaped my adult life: I met friends and partners, found a career in cultural heritage, and discovered my queer identity.</p>
<p>That impact will last a long time. The posts themselves? Not so much.</p>
<p>Social media is fragile, and it can disappear quickly. Sites get <a href="https://arstechnica.com/tech-policy/2022/10/elon-musk-completes-twitter-purchase-immediately-fires-ceo-and-other-execs/">sold</a>, <a href="https://web.archive.org/web/20240909195207/https://cohost.org/staff/post/7611443-cohost-to-shut-down">shut down</a> or <a href="https://www.bbc.co.uk/news/articles/c4gzxv5gy3qo">blocked</a>. People close their accounts or <a href="https://en.wikipedia.org/wiki/Mark_Pilgrim#%22Disappearance%22_from_the_Internet">flee the Internet</a>. Posts get <a href="https://alexwlchan.net/2024/i-deleted-all-my-tweets/">deleted</a>, <a href="https://www.theverge.com/2018/12/6/18127869/tumblr-livejournal-porn-ban-strikethrough">censored</a> or <a href="https://www.bbc.co.uk/news/technology-47610936">lost</a> by platforms that don’t care about permanence. We live in an era of abundant technology and storage, but the everyday record of our lives is disappearing before our eyes.</p>
<p>I want to remember social media, and not just as a vague memory. I want to remember exactly what I read, what I saw, what I wrote. If I was born 50 years ago, I’m the sort of person who’d keep a scrapbook full of letters and postcards – physical traces of the people who mattered to me. Today, those traces are digital.</p>
<p>I don’t trust the Internet to remember for me, so I’ve built my own scrapbook of social media. It’s a place where I can save the posts that shaped me, delighted me, or just stuck in my mind.</p>
<figure><picture><source sizes="(max-width: 750px) 100vw, 750px" srcset="https://alexwlchan.net/images/2025/social-media-scrapbook_1x.png%20750w,/images/2025/social-media-scrapbook_2x.png%201500w,/images/2025/social-media-scrapbook_3x.png%202250w" type="image/png"/><img alt="Four-columns of cards laid out, each with a coloured border and a snippet from a social media site. The screenshot includes tweets, photos, a some videos, and some art." src="https://alexwlchan.net/images/2025/social-media-scrapbook_1x.png"/></picture><figcaption>Each conversation appears as a little card, almost like a clipping from a magazine or newspaper. Most of my conversations are from Twitter, but I also have sites like Tumblr, YouTube, and Bluesky.</figcaption></figure>
<p>It’s a static site where I can save conversations from different services, enjoy them in my web browser, and search them using my own tags. It’s less than two years old, but it already feels more permanent than many social media sites. This post is the first in a three-part series about preserving social media, based on both my professional and personal experience.</p>
<blockquote><h3>Table of contents</h3></blockquote>
<h2>The long road to a lasting archive</h2>
<p>Before I ever heard the phrase “digital preservation”, I knew I wanted to keep my social media. I wrote scripts to capture my conversations and stash them away on storage I controlled.</p>
<p>Those scripts worked, technically, but the end result was a mess. I focusing on saving data, and organisation and presentation were an afterthought. I was left with disordered folders full of JSON and XML files – archives I couldn’t actually use, let along search or revisit with any joy.</p>
<p>I’ve tried to solve this problem more times than I can count. I have screenshots of at least a dozen different attempts, and there are probably just as many I’ve forgotten.</p>
<p>For the first time, though, I think I have a sustainable solution. I can store conversations, find them later, and the tech stack is simple enough to keep going for a long time. Saying something will last always has a whiff of hubris, especially if software is involved, but I have a good feeling.</p>
<p>Looking back, I realise my previous attempts failed because I focused too much on my tools. I kept thinking that if I just picked the right language, or found a better framework, or wrote cleaner code, I’d finally land on a permanent solution. The tools do matter – and a static site will easily outlive my hacky Python web apps – but other things are more important.</p>
<p>What I really needed was a good data model. Every earlier version started with a small schema that could hold simple conversations, which worked until I tried to save something more complex. Whenever that happened, I’d make a quick fix, thinking about the specific issue rather than the data model as a whole. Too many one-off changes and everything would become a tangled mess, which is usually when I’d start the next rewrite.</p>
<p>This time, I thought carefully about the shape of the data. What’s worth storing, and what’s the best way to store it? How do I clean, validate, and refine my data? How do I design a data schema that can evolve in a more coherent way? More than any language or framework choice, I think this is what will finally give this project some sticking power.</p>
<h2>How it works</h2>
<h3>A static site, viewed in the browser</h3>
<p>I store metadata in a machine-readable JSON/JavaScript file, and present it as a website that I can open in my browser. Static sites give me a lightweight, flexible way to save and view my data, in a format that’s widely supported and likely to remain usable for a long time.</p>
<p>This is a topic I’ve <a href="https://alexwlchan.net/2024/static-websites/">written about at length</a>, including a <a href="https://alexwlchan.net/2025/mildly-dynamic-websites/">detailed explanation</a> of my code.</p>
<h3>Conversations as the unit of storage</h3>
<p>Within my scrapbook, the unit of storage is a <em>conversation</em> – a set of one or more posts that form a single thread. If I save one post in a conversation, I save them all. This is different to many other social media archives, which only save one post at a time.</p>
<p>The surrounding conversation is often essential to understanding a post. Without it, posts can be difficult to understand and interpret later. For example, a tweet where I said <em>“that’s a great idea!”</em> doesn’t make sense unless you know what I was replying to. Storing all the posts in a conversation together means I always have that context.</p>
<h3>A different data model and renderer for each site</h3>
<p>A big mistake I made in the past was trying to shoehorn every site into the same data model.</p>
<p>The consistency sounds appealing, but different sites are different. A tweet is a short fragment of plain text, sometimes with attached media. Tumblr posts are longer, with HTML and inline styles. On Flickr the photo is the star, with text-based metadata as a secondary concern.</p>
<p>It’s hard to create a single data model that can store a tweet and a Tumblr post and a Flickr picture and the dozen other sites I want to support. Trying to do so always led me to a reductive model that over-simplified the data.</p>
<p>For my scrapbook, I’m avoiding this problem by creating a different data model for each site I want to save. I can define the exact set of fields used by that site, and I can match the site’s terminology.</p>
<p>Here’s one example: a thread from Twitter, where I saved a tweet and one of the replies. The <code>site</code>, <code>id</code>, and <code>meta</code> are common to the data model across all sites, then there are site-specific fields in the <code>body</code> – in this example, the <code>body</code> is an array of tweets.</p>
<pre><code>{
  "site": "twitter",
  "id": "1574527222374977559",
  "meta": {
    "tags": ["trans joy", "gender euphoria"],
    "date_saved": "2025-10-31T07:31:01Z",
    "url": "https://www.twitter.com/alexwlchan/status/1574527222374977559"
  },
  "body": [
    {
      "id": "1574527222374977559",
      "author": "alexwlchan",
      "text": "prepping for bed, I glanced in a mirror\n\nand i was struck by an overwhelming sense of feeling beautiful\n\njust from the angle of my face and the way my hair fell around over it\n\ni hope i never stop appreciating the sense of body confidence and comfort i got from Transition 🥰",
      "date_posted": "2022-09-26T22:31:57Z"
    },
    {
      "id": "1574527342470483970",
      "author": "oldenoughtosay",
      "text": "@alexwlchan you ARE beautiful!!",
      "date_posted": "2022-09-26T22:32:26Z",
      "entities": {
          "hashtags": [],
          "media": [],
          "urls": [],
          "user_mentions": ["alexwlchan"]
        },
        "in_reply_to": {
          "id": "1574527222374977559",
          "user": "alexwlchan"
        }
      }
    }
  ]}</code></pre>
<p>If this was a conversation from a different site, say Tumblr or Instagram, you’d see something different in the <code>body</code>.</p>
<p>I store all the data as JSON, and I keep the data model small enough that I can fill it in by hand.</p>
<p>I’ve been trying to preserve my social media for over a decade, so I have a good idea of what fields I look back on and what I don’t. For example, many social media websites have metrics – how many times a post was viewed, starred, or retweeted – but I don’t keep them. I remember posts because they were fun, thoughtful, or interesting, not because they hit a big number.</p>
<p>Writing my own data model means I know exactly when it changes. In previous tools, I only stored the raw API response I received from each site. That sounds nice – I’m saving as much information as I possibly can! – but APIs change and the model would subtly shift over time. The variation made searching tricky, and in practice I only looked at a small fraction of the saved data.</p>
<p>I try to reuse data structures where appropriate. Conversations from every site have the same <code>meta</code> scheme; conversations from microblogging services are all the same (Twitter, Mastodon, Bluesky, Threads); I have a common data structure for images and videos.</p>
<p>Each data model is accompanied by a rendering function, which reads the data and returns a snippet of HTML that appears in one of the “cards” in my web browser. I have a long switch statement that just picks the right rendering function, something like:</p>
<pre><code>function renderConversation(props) {
    switch(props.site) {
        case 'flickr':
            return renderFlickrPicture(props);
        case 'twitter':
            return renderTwitterThread(props);
        case 'youtube':
            return renderYouTubeVideo(props);
        …
    }
}
</code></pre>
<p>This approach makes it easy for me to add support for new sites, without breaking anything I’ve already saved. It’s already scaled to twelve different sites (Twitter, Tumblr, Bluesky, Mastodon, Threads, Instagram, YouTube, Vimeo, TikTok, Flickr, Deviantart, Dribbble), and I’m going to add WhatsApp and email in future – which look and feel very different to public social media.</p>
<p>I also have a “generic media” data model, which is a catch-all for images and videos I’ve saved from elsewhere on the web. This lets me save something as a one-off from a blog or a forum without writing a whole new data model or rendering function.</p>
<h3>Keyword tagging on every conversation</h3>
<p>I tag everything with keywords as I save it. If I’m looking for a conversation later, I think of what tags I would have used, and I can filter for them in the web app. These tags mean I can find old conversations, and allows me to add my own interpretation to the posts I’m saving.</p>
<p>This is more reliable than full text search, because I can search a consistent set of terms. Social media posts don’t always mention their topic in a consistent, easy-to-find phrase – either because it just didn’t fit into the wording, or because they’re deliberately keeping it as subtext. For example, not all cat pictures <a href="https://x.com/supergirl_sass/status/1392589896116699137">include the word “cat”</a>, but I tag them all with “cats” so I can find them later.</p>
<p>I use <a href="https://alexwlchan.net/2020/using-fuzzy-string-matching-to-find-duplicate-tags/">fuzzy string matching</a> to find and fix mistyped tags.</p>
<h3>Metadata in JSON/JavaScript, interpreted as a graph</h3>
<p>Here’s a quick sketch of how my data and files are laid out on disk:</p>
<pre><code>scrapbook/
 ├─ avatars/
 ├─ media/
 │   ├─ a/
 │   └─ b/
 │      └─ bananas.jpg
 ├─ posts.js
 └─ users.js
</code></pre>
<p>This metadata forms a little graph:</p>
<figure><svg class="dark_aware" role="img" viewbox="0 0 503 103" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead" markerheight="4.9" markerwidth="7" orient="auto" refx="0" refy="2.45"><polygon points="0 0, 7 2.45, 0 4.9"></polygon></marker></defs><g transform="translate(0 30)"><rect height="40" width="100" x="1.5" y="1.5"></rect><text x="51.5" y="21.5">posts.js</text></g><line marker-end="url(#arrowhead)" x1="101.5" x2="185" y1="51.5" y2="21.5"></line><line marker-end="url(#arrowhead)" x1="101.5" x2="185" y1="51.5" y2="81.5"></line><line marker-end="url(#arrowhead)" x1="201.5" x2="386.5" y1="81.5" y2="81.5"></line><g transform="translate(200 0)"><rect height="40" width="100" x="1.5" y="1.5"></rect><text x="51.5" y="21.5">media</text></g><g transform="translate(200 60)"><rect height="40" width="100" x="1.5" y="1.5"></rect><text x="51.5" y="21.5">users.js</text></g><g transform="translate(400 60)"><rect height="40" width="100" x="1.5" y="1.5"></rect><text x="51.5" y="21.5">avatars</text></g></svg></figure><p>All of my post data is in <code>posts.js</code>, which contains objects like the Twitter example above.</p>
<p>Posts can refer to media files, which I store in the <code>media/</code> directory and group by the first letter of their filename – this keeps the number of files in each subdirectory manageable.</p>
<p>Posts point to their author in <code>users.js</code>. My user model is small – the path of an avatar image in <code>avatars/</code>, and maybe a display name if the site supports it.</p>
<p>Currently, users are split by site, and I can’t correlate users across sites. For example, I have no way to record that <code>@alexwlchan</code> on Twitter and <code>@alex@alexwlchan.net</code> on Mastodon are the same person. That’s something I’d like to do in future.</p>
<h3>A large suite of tests</h3>
<p>I have a test suite written in Python and <a href="https://docs.pytest.org/en/stable/">pytest</a> that checks the consistency and correctness of my metadata. This includes things like:</p>
<ul><li>My metadata files match my data model</li><li>Every media file described in the metadata is saved on disk, and every media file saved on disk is described in the metadata</li><li>I have a profile image for the author of every post that I’ve saved</li><li>None of my videos are <a href="https://alexwlchan.net/2025/detecting-av1-videos/">encoded in AV1</a> (which can’t play on my iPhone)</li></ul>
<p>I’m doing a lot of manual editing of metadata, and these tests give me a safety net against mistakes. They’re pretty fast, so I run them every time I make a change.</p>
<h2>Inspirations and influences</h2>
<h3>The static website in Twitter’s first-party archives</h3>
<p>Pretty much every social media website has a way to export your data, but some exports are better than others. Some sites clearly offer it reluctantly – a zip archive full of JSON files, with minimal documentation or explanation. Enough to comply with <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-data-portability/">data export laws</a>, but nothing more.</p>
<p>Twitter’s archive was much better. When you downloaded your archive, the first thing you’d see was an HTML file called <code>Your archive.html</code>. Opening this would launch a static website where you could browse your data, including full-text search for your tweets:</p>
<figure><a href="https://alexwlchan.net/images/2025/twitter_archive1.png"><picture><source sizes="(max-width: 375px) 100vw, 375px" srcset="https://alexwlchan.net/images/2025/twitter_archive1_1x.png%20375w,/images/2025/twitter_archive1_2x.png%20750w,/images/2025/twitter_archive1_3x.png%201125w" type="image/png"/><img alt="Homepage of the Twitter archive. It says ‘Hi @alexwlchan. Here is the information from your archive which may be most useful to you.’ Below that are summary metrics – 40.3K tweets, 54.2K likes, 2,727 blocked accounts, and so on – which link to a page where I can see the tweets/likes/blocked accounts." src="https://alexwlchan.net/images/2025/twitter_archive1_1x.png"/></picture></a><a href="https://alexwlchan.net/images/2025/twitter_archive2.png"><picture><source sizes="(max-width: 375px) 100vw, 375px" srcset="https://alexwlchan.net/images/2025/twitter_archive2_1x.png%20375w,/images/2025/twitter_archive2_2x.png%20750w,/images/2025/twitter_archive2_3x.png%201125w" type="image/png"/><img alt="Search results in the Twitter archive. I’ve searched for the hashtag #digipres and it’s showing me three of my tweets, which more beyond the end of the page. I can also filter by replies or retweets, and there are controls for more sophisticated filtering." src="https://alexwlchan.net/images/2025/twitter_archive2_1x.png"/></picture></a><figcaption>Fun fact: although Elon Musk has rebranded Twitter as X , the old name survives in these archive exports. If you download your archive today, it still talks about Twitter! </figcaption></figure>
<p>This approach was a big inspiration for me, and put me on the path of <a href="https://alexwlchan.net/2024/static-websites/">using static websites for tiny archives</a>. It’s a remarkably robust piece of engineering, and these archives will last long after Twitter or X have disappeared from the web.</p>
<p>The Twitter archive isn’t exactly what I want, because it only has my tweets. My favourite moments on Twitter were back-and-forth conversations, and my personal archive only contains my side of the conversation. In my custom scrapbook, I can capture both people’s contributions.</p>
<h3>Data Lifeboat at the Flickr Foundation</h3>
<p><a href="https://www.flickr.org/programs/content-mobility/data-lifeboat/">Data Lifeboat</a> is a project by the <a href="https://www.flickr.org">Flickr Foundation</a> to create archival slivers of Flickr. I worked at the Foundation for nearly two years, and I built the first prototypes of Data Lifeboat. I joined because of my interest in archiving social media, and the ideas flowed in both directions: personal experiments informed my work, and vice versa.</p>
<p>Data Lifeboat and my scrapbook differ in some details, but the underlying principles are the same.</p>
<p>One of my favourite parts of that work was pushing <a href="https://alexwlchan.net/2024/static-websites/">static websites for tiny archives</a> further than I ever have before. Each Data Lifeboat package includes <a href="https://www.flickr.org/the-data-lifeboat-viewer-circa-2024/">a viewer app</a> for browsing the contents, which is a static website built in vanilla JavaScript – very similar to the Twitter archive. It’s the most complex static site I’ve ever built, so much so that I had to write a test suite using <a href="https://playwright.dev/">Playwright</a>.</p>
<p>That experience made me more ambitious about what I can do with static, self-contained sites.</p>
<h3>My web bookmarks</h3>
<p>Earlier this year I wrote about <a href="https://alexwlchan.net/2025/bookmarks-static-site/">my bookmarks collection</a>, which I also store in a static site. My bookmarks are mostly long-form prose and video – reference material with private notes. The scrapbook is typically short-form content, often with visual media, often with conversations I was a part of. Both give me searchable, durable copies of things I don’t want to lose.</p>
<p>I built my own bookmarks site because I didn’t trust a bookmarking service to last; I built my social media scrapbook because I don’t trust social media platforms to stick around. They’re two different manifestations of the same idea.</p>
<h3>Tapestry, by the Iconfactory</h3>
<p><a href="https://usetapestry.com/">Tapestry</a> is an iPhone app that combines posts from multiple platforms into a single unified timeline – social media, RSS feeds, blogs. The app pulls in content using site-specific <a href="https://usetapestry.com/connectors/">“connectors”</a>, written with basic web technologies like JavaScript and JSON.</p>
<figure><picture><source sizes="(max-width: 375px) 100vw, 375px" srcset="https://alexwlchan.net/images/2025/tapestry_1x.png%20375w,/images/2025/tapestry_2x.png%20750w,/images/2025/tapestry_3x.png%201125w" type="image/png"/><img alt="Tapestry screenshot. This is the All Feeds view, where you can see a post from Tumblr, Bluesky, Mastodon, and my blog, all in the same timeline." src="https://alexwlchan.net/images/2025/tapestry_1x.png"/></picture></figure>
<p>Although I don’t use Tapestry myself, I was struck by the design, especially the connectors. The idea that each site gets its own bit of logic is what inspired me to consider different data models for each site – and of course, I love the use of vanilla web tech.</p>
<p>When I embed social media posts on this site, I don’t use the native embeds offered by platforms, which pull in megabytes of of JavaScript and tracking. Instead, I use <a href="https://alexwlchan.net/2025/good-embedded-toots/">lightweight HTML snippets</a> styled with my own CSS, an idea I first saw on Dr Drang’s site <a href="https://leancrew.com/all-this/2012/07/good-embedded-tweets/">over thirteen years ago</a>.</p>
<p>The visual appearance of these snippets isn’t a perfect match for the original site, but they’re close enough to be usable. The CSS and HTML templates were a good starting point for my scrapbook.</p>
<h2>You can make your own scrapbook, too</h2>
<p>I’ve spent a lot of time and effort on this project, and I had fun doing it, but you can build something similar with a fraction of the effort. There are lots of simpler ways to save an offline backup of an online page – a screenshot, a text file, a printout.</p>
<p>If there’s something online you care about and wouldn’t want to lose, save your own copy. The history of the Internet tells us that it will almost certainly disappear at some point.</p>
<p>The Internet forgets, but it doesn’t have to take your memories with it.</p>
