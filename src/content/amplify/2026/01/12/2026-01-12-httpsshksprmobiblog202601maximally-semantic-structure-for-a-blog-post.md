---
author: Terence Eden
cover_image: 'https://shkspr.mobi/blog/wp-content/uploads/2025/10/schema-validator.webp'
date: '2026-01-12T12:54:05.412Z'
dateFolder: 2026/01/12
description: >-
  Yes, I know the cliché that bloggers are always blogging about blogging!  I
  like semantics. It tickles that part of my delicious meaty brain that longs
  for structure. Semantics are good for computers and humans. Computers can
  easily understand the structure of the data, humans can use tools like
  screen-readers to extract the data they're interested in.  In HTML, there are
  three main ways to …
isBasedOn: 'https://shkspr.mobi/blog/2026/01/maximally-semantic-structure-for-a-blog-post/'
link: 'https://shkspr.mobi/blog/2026/01/maximally-semantic-structure-for-a-blog-post/'
slug: >-
  2026-01-12-httpsshksprmobiblog202601maximally-semantic-structure-for-a-blog-post
tags:
  - code
  - blogging
title: Maximally Semantic Structure for a Blog Post
---
<p>Yes, I know the cliché that bloggers are always blogging about blogging!</p>
<p>I like semantics. It tickles that part of my delicious meaty brain that longs for structure. Semantics are good for computers and humans. Computers can easily understand the structure of the data, humans can use tools like screen-readers to extract the data they're interested in.</p>
<p>In HTML, there are three main ways to impose semantics - elements, attributes, and hierarchical microdata.</p>
<p>Elements are easy to understand. Rather than using a generic element like <code>&lt;div&gt;</code> you can use something like <code>&lt;nav&gt;</code> to show an element's contents are for navigation. Or <code>&lt;address&gt;</code> to show that the contents are an address. Or <code>&lt;article&gt;&lt;section&gt;</code> to show that the section is part of a parent article.</p>
<p>Attributes are also common. You can use <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel">relational attributes</a> to show how a link relates to the page it is on. For example <code>&lt;a rel=author href=https://example.com&gt;</code> shows that the link is to the author of the current page. Or, to see that a link goes to the previous page in a series <code>&lt;a rel=prev href=/page5&gt;</code>.</p>
<p>Finally, we enter the complex and frightening world of <em>microdata</em>.</p>
<p>Using the <a href="https://schema.org/">Schema.org vocabulary</a> it's possible to add semantic metadata <em>within</em> an HTML element. For example, <code>&lt;body itemtype=https://schema.org/Blog itemscope&gt;</code> says that the body of this page is a Blog. Or, to say how many words a piece has, <code>&lt;span itemprop=wordCount content=1100&gt;1,100 words&lt;/span&gt;</code>.</p>
<p>There are <em>many</em> properties you can use. Here's the outline structure of a single blog post with a code sample, a footnote, and a comment. You can <a href="https://validator.schema.org/">check its structured data</a> and verify that it is <a href="https://validator.w3.org/">conformant HTML</a>.</p>
<p>Feel free to reuse.</p>
<pre><code>&lt;!doctype html&gt;
&lt;html lang=en-gb&gt;
&lt;head&gt;&lt;title&gt;My Blog&lt;/title&gt;&lt;/head&gt;
&lt;body itemtype=https://schema.org/Blog itemscope&gt;

    &lt;header itemprop=headline&gt;
        &lt;a rel=home href=https://example.com&gt;My Blog&lt;/a&gt;
    &lt;/header&gt;

    &lt;main itemtype=https://schema.org/BlogPosting itemprop=blogPost itemscope&gt;
        &lt;article&gt;
            &lt;header&gt;
                &lt;time itemprop=https://schema.org/datePublished datetime=2025-12-01T12:34:39+01:00&gt;
                    1st January, 2025
                &lt;/time&gt;
                &lt;h1 itemprop=headline&gt;
                    &lt;a rel=bookmark href=https://example.com/page&gt;Post Title&lt;/a&gt;
                &lt;/h1&gt;
                &lt;span itemtype=https://schema.org/Person itemprop=author itemscope&gt;
                    &lt;a itemprop=url href=https://example.org/&gt;
                        By &lt;span itemprop=name&gt;Author Name&lt;/span&gt;
                    &lt;/a&gt;
                    &lt;img itemprop=image src=/photo.jpg alt&gt;
                &lt;/span&gt;
                &lt;p&gt;
                    &lt;a itemprop=keywords content=HTML rel=tag href=/tag/html/&gt;HTML&lt;/a&gt; 
                    &lt;a itemprop=keywords content=semantics rel=tag href=/tag/semantics/&gt;semantics&lt;/a&gt; 
                    &lt;a itemprop=commentCount content=6 href=#comments&gt;6 comments&lt;/a&gt;
                    &lt;span itemprop=wordCount content=1100&gt;1,100 words&lt;/span&gt;
                    &lt;span itemtype=https://schema.org/InteractionCounter itemprop=interactionStatistic itemscope&gt;
                        &lt;meta content=https://schema.org/ReadAction itemprop=interactionType&gt;
                        &lt;span itemprop=userInteractionCount content=5150&gt;
                            Viewed ~5,150 times
                        &lt;/span&gt;
                    &lt;/span&gt;
                &lt;/p&gt;
            &lt;/header&gt;

            &lt;div itemprop=articleBody&gt;
                &lt;img itemprop=image src=/hero.png alt&gt;
                &lt;p&gt;Text of the post.&lt;/p&gt;
                &lt;p&gt;Text with a footnote&lt;sup id=fnref&gt;&lt;a role=doc-noteref href=#fn&gt;0&lt;/a&gt;&lt;/sup&gt;.&lt;/p&gt;

                &lt;pre itemtype=https://schema.org/SoftwareSourceCode itemscope translate=no&gt;
                    &lt;span            div&gt;
                &lt;div itemprop=text&gt;
                    &lt;p&gt;Comment text&lt;/p&gt;
                &lt;/div&gt;
            &lt;/article&gt;
        &lt;/section&gt;
    &lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>This blog post is entitled "maximally" but, of course, <a href="https://schema.org/BlogPosting">there is <em>lots</em> more that you can add</a> if you really want to.</p>
<p>Remember, none of this is <em>necessary</em>. Computers and humans are pretty good at extracting meaning from unstructured text. But making things easier for others is always time well spent.</p>
