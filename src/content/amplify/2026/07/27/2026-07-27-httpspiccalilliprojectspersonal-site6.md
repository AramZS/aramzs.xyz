---
author: Piccalilli
cover_image: 'https://piccalil.li/images/personal-site-social-share.png'
date: '2026-07-27T12:53:15.684Z'
dateFolder: 2026/07/27
description: >-
  With the WordPress data rigged up and the blog wired up, it’s time to move my
  attention to a new feature: rendering my AT protocol posts.
isBasedOn: 'https://piccalil.li/projects/personal-site/6/'
link: 'https://piccalil.li/projects/personal-site/6/'
slug: 2026-07-27-httpspiccalilliprojectspersonal-site6
tags:
  - code
  - tech
  - decentralization
title: Loading AT protocol posts data
---
<p>We’re picking up some good momentum, so let’s keep the flow going. After <a href="https://piccalil.li/projects/personal-site/4/">integrating WordPress to power the blog section</a>, it’s now time to integrate a new feature of this website: AT Protocol posts.</p>
<p>I <em>could</em> go all in at this point and integrate posts, comments, interactions and comments on blog posts, but I’m not in the business of doing that until I <em>fully understand what I’m doing</em>. Throwing code at the wall to see what sticks is a one way high speed train to technical debt city.</p>
<p>What I’m doing instead is what I outlined in planning, specifically where I worked out <a href="https://piccalil.li/projects/personal-site/2/#work-out-the-core-features">each iteration</a>. Here it is as a reminder:</p>
<figure><img alt='An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."' src="https://piccalil.b-cdn.net/images/projects/personal-site-core-features.jpg?auto=format&amp;w=1500"/><figcaption>An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."</figcaption></figure>
<p>As per that planning, I’m still in <strong>iteration one</strong>, which means this phase of AT protocol integration is going to be a basic rendering of my AT protocol posts.</p>
<p>I say AT protocol and not <em>Bluesky</em> posts because it’s worth remembering that Bluesky is the microblogging <em>app</em> built on the protocol. My data (posts) is outside of that platform, on my Personal Data Server (PDS). Right now, at the time of writing, that PDS is on Bluesky’s infrastructure, but I <em>will</em> definitely be moving that to something I own, for sure.</p>
<figure><a href="https://piccalil.li/mindful-design?utm_source=piccalilli&amp;utm_medium=graphical-ad">Advert<picture><source media="(width &lt;= 600px)" srcset="https://piccalil.b-cdn.net/images/ads/md-ad-portrait-post-launch.jpg?auto=format"/><img alt="Mindful Design. Learn to design for real humans. Available now" src="https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp"/></picture></a></figure>
<p>In order to do this, I need create a new file in my <code>data</code> package — just like I did for the WordPress posts — and lean into the AT Protocol API, using their <a href="https://npmx.dev/package/@atproto/api">official package</a>.</p>
<p>Here’s the file in whole. I’ll break down the important bits:</p>
<pre>
<code>import { AtpAgent, RichText } from '@atproto/api';
import { getCache, setCache } from './memoryCache';

const agent = new AtpAgent({
  service: 'https://bsky.social',
});

export async function fetchAllATPosts() {
  const targetHandle = 'bell.bz';
  const cacheKey = 'atPosts';
  const cacheTimeout = 3600; // 3600 seconds is 1 hour
  const cached = getCache(cacheKey);

  if (cached) {
    return cached;
  }

  // Authentication is required
  await agent.login({
    identifier: targetHandle,
    password: process.env.BLUESKY_APP_PASSWORD,
  });

  let allPosts = [];
  let cursor = undefined;

  try {
    while (true) {
      // Fetch this cursor from the feed of items
      const response = await agent.getAuthorFeed({
        actor: targetHandle,
        cursor: cursor,
        limit: 100, // Max limit per cursor

        // For now, I'm just doing root level posts. Maybe as this   evolves I'll bring in replies too.
        filter: 'posts_no_replies',
      });

      // Loop each item but filter out reposts and quote posts
      for (const item of response.data.feed.filter(
        (x) =&gt;
          !(
            x?.reason?.$type === 'app.bsky.feed.defs#reasonRepost' ||
            x.post.embed?.$type === 'app.bsky.embed.record#view' ||
            x.post.embed?.$type === 'app.bsky.embed.recordWithMedia#view'
          )
      )) {
        const post = item.post;
        const parser = new RichText({ text: post.record.text || '' });

        await parser.detectFacets(agent);

        let postMarkdown = '';
        const externalEmbed = post.embed?.external || post.record.embed?.external;

        for (const segment of parser.segments()) {
          if (segment.isLink()) {
            let uri = segment.link?.uri;
            let linkText = segment.text;

            // Check if this link matches the external embed link
            // We compare URIs (or check if the embed exists) to get the full version
            if (
              externalEmbed &amp;&amp;
              (uri?.includes('..') ||
                (externalEmbed &amp;&amp; (uri?.includes('…') || uri === externalEmbed.uri)))
            ) {
              uri = externalEmbed.uri;
              linkText = externalEmbed.uri;
            }

            postMarkdown += `[${linkText}](${uri})`;
          } else if (segment.isMention()) {
            postMarkdown += `[${segment.text}](https://bsky.app/profile/${segment.text.replace('@', '')})`;
          } else {
            postMarkdown += segment.text;
          }
        }

        // Create a sensible return object type
        const postData = {
          uri: post.uri,
          cid: post.cid,
          content: postMarkdown,
          date: post.record.createdAt,
          likes: post.likeCount,
          reposts: (post.repostCount || 0) + (post.quoteCount || 0),
          replies: post.replyCount,
          media: [],
        };

        if (post.embed) {
        
          // If there are images, add to the return object
          if (post.embed.$type === 'app.bsky.embed.images#view') {
            postData.media = post.embed.images.map((img) =&gt; ({
              type: 'image',
              src: img.fullsize,
              alt: img.alt,
              thumb: img.thumb,
            }));
          }

          // If there are open graph images, surface those
          else if (post.embed.$type === 'app.bsky.embed.external#view') {
            postData.media.push({
              type: 'external',
              uri: post.embed.external.uri,
              title: post.embed.external.title,
              description: post.embed.external.description,
              thumb: post.embed.external.thumb,
            });
          }

          // If there are videos, add to the return object
          else if (post.embed.$type === 'app.bsky.embed.video#view') {
            postData.media.push({
              type: 'video',
              playlist: post.embed.playlist, // HLS stream (.m3u8)
              thumbnail: post.embed.thumbnail,
              cid: post.embed.cid,
            });
          }
        }

        allPosts.push(postData);
      }

      // Set the next cursor and break the loop if we're at the end
      cursor = response.data.cursor;
      if (!cursor) break;
    }

    // Cache so it doesn't take forever to work on this locally
    setCache(cacheKey, allPosts, cacheTimeout);
    return allPosts;
  } catch (error) {
    console.error('Error fetching feed:', error);
  }
}
</code>
</pre>
<p>That’s a <em>lot</em> of code in one block. Let’s break it down into chunks.</p>
<p>The first thing we do is set up dependencies: the agent (not one of <em>those</em> ones) which interfaces with the protocol for us and rich text capabilities that are used to tidy up content. The <code>memoryCache</code> parts are the <a href="https://piccalil.li/projects/personal-site/4/#lets-add-a-web-page">same as when I integrated the WordPress content</a>.</p>
<pre>
<code>const targetHandle = 'bell.bz';
const cacheKey = 'atPosts';
const cacheTimeout = 3600; // 3600 seconds is 1 hour
const cached = getCache(cacheKey);

if (cached) {
  return cached;
}

// Authentication is required
await agent.login({
  identifier: targetHandle,
  password: process.env.BLUESKY_APP_PASSWORD,
});
</code>
</pre>
<p>Here, I’m setting the target handle, the key for our memory cache and how long I want data to be cached for. I opted for an hour because I tend to work in short cycles when coding.</p>
<p>Next up, I attempt to load data from cache <em>first</em>, then check it. If there is data in cache, I can return it and move on. If not, the first thing to do is to get the agent to log in.</p>
<p>For the next part, we’re going to be <em>within</em> the <code>while</code> loop.</p>
<p>I have posted <em>a lot</em> on Bluesky so right off the bat, I need to use cursors to paginate over multiple chunks of posts. That’s fine, because I’m keeping a track of it with the <code>cursor</code> variable. Eventually that <code>cursor</code> will be null, which in turn will break the <code>while</code> loop. Lovely stuff.</p>
<p>The only other bit to touch on is I’m getting only top level posts, not my replies. I’m not much of a <em>reply guy</em>, but I still don’t want out of context posts on the feed because it’s just <em>noise</em>.</p>
<p>The data returned, for each page of data, has a <code>feed</code> array that I can now loop over. I do another pass at filtering here. Each line deals with:</p>
<ol> <li>Reposts, which are classified as posts and I don’t want posts <em>I</em> haven’t written showing up in the feed</li> <li>Quote posts, which I don’t want to deal with <em>yet</em></li> <li>Quote posts: same as #2, but with media by the <em>quoter</em></li> </ol>
<p>The aim of the game at this point is to generate a front-end friendly string of markdown that my existing infrastructure can deal with. In order to do that, I need to break down the <code>post.record.text</code> with the <code>RichText</code> utility, supplied by the <code>@atproto/api</code> package.</p>
<p>I can now loop over each segment of content and determine exactly what it <em>is</em>. For example, I check first to see if there’s an <code>externalEmbed</code> — AKA a link — and build a markdown link string accordingly. If it’s a mention, I create a nice link to that user’s profile and finally if it’s neither of those, I append raw text value to the markdown string.</p>
<p>The most self explaining chunk of code here: I’m creating a nice flat return object structure that matches the front-end components.</p>
<p>Now, the last bit of <em>data massaging</em> is left for this iteration. I’m checking over a couple of cases to render images or video depending on what embed content I’ve got to work with. Again, this is all about creating flat (as possible) structures for the front-end components to consume.</p>
<p>After all of that, I push that post into the higher level array, which we’ll cache and return.</p>
<p>That’s the data sorted, so the next thing to do is wire it up to the website itself. I’ll tackle that in the next one!</p>
