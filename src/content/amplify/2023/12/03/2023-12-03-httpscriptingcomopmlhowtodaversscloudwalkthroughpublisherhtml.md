---
author: scripting.com
cover_image: null
date: '2023-12-03T07:34:03.000Z'
dateFolder: 2023/12/03
description: >-
  Making your RSS feed cloud-aware is easy if your software supports rssCloud or
  lets you add a <cloud> element manually. When your feed updates, you notify a
  cloud server by sending a simple ping, which then alerts subscribers in
  real-time. Several public cloud servers are available to use, or you can run
  your own.
isBasedOn: 'http://scripting.com/opmlHowto/dave/rssCloud/walkthrough/publisher.html'
link: 'http://scripting.com/opmlHowto/dave/rssCloud/walkthrough/publisher.html'
slug: 2023-12-03-httpscriptingcomopmlhowtodaversscloudwalkthroughpublisherhtml
tags:
  - code
title: 'HowTo : How to make your feed cloud-aware'
---
<table> <tbody><tr> <td> <p>The full rssCloud <a href="http://rsscloud.org/walkthrough.html">walkthrough</a> explains how to write a cloud server or a cloud-aware aggregator. Luckily it's much simpler to publish a cloud-aware feed, which is good because there are so many of them.</p> <h4>It might be *very* simple </h4> <p>If your publishing software supports rssCloud, you may only have to turn it on. You may find that it is already on, in which case you have to do <i>nothing.</i> </p> <p>All wordpress.com blogs are rssCloud-aware. </p> <p>If you run your own copy of WordPress, you can <a href="http://shegeeks.net/installing-wordpress-rsscloud-plugin/">install</a> a <a href="http://wordpress.org/extend/plugins/rsscloud/">plug-in</a>.</p> <p>If you're not using <a href="http://en.blog.wordpress.com/2009/09/07/rss-in-the-clouds/">WordPress</a>, ask the developer of your tool if they support rssCloud. If they don't send them a pointer to the <a href="http://rsscloud.org/walkthrough.html">walkthrough</a>.</p> <h4>Add a &lt;cloud&gt; element to your feed </h4> <p>Even if your publishing software doesn't support it directly, it's easy to add it yourself.</p> <p>Add a &lt;cloud&gt; element to near the top of your feed. </p> <p>For an example, <a href="http://images.scripting.com/archiveScriptingCom/2009/09/19/look.jpg">look</a> at the feed for <a href="http://www.scripting.com/rss.xml">Scripting News</a>.</p> <p>You're welcome to use my cloud server. If you do you can just copy the cloud element from my feed. But be aware that my server will go away someday. When that happens, you'll have to find another server. But hopefully by then there will be many to choose from.</p> <h4>Tell the cloud server when your feed has updated </h4> <p>You may have to write a script to do this part.</p> <p>My cloud server supports the REST form of pings, as I think most of them will. </p> <p>To tell my server that your feed has changed make a POST call to:</p> <p>http://rpc.rsscloud.org:5337/rssCloud/ping </p> <p>Include one parameter in the body of the post, url. Its value is the address of the feed that changed.</p> <p>Once it's verified that your feed has changed, it will then ping all subscribers who have requested notification when your feed has changed.</p> <p>Congratulations -- you're now doing Real-time RSS! ""</p> <p>Michael Fraase <a href="http://rsscloud.org/walkthrough/publisher.html#comment-17045089">asked</a> for a form that illustrates the ping. <a href="http://rpc.rsscloud.org:5337/rsscloud/pingform">Good idea</a>. Then he asked how he can tell if the ping went through. Look in the <a href="http://rpc.rsscloud.org:5337/rsscloud/viewLog">log</a>, I said. </p> <p><a href="http://tech.groups.yahoo.com/group/rss-cloud/message/98">Matt Terenzio offers</a> the use of his cloud server. <i>Thanks Matt!</i></p> <p><a href="http://draftmedia.net/archive/2009/09/19/15">Draft Media</a> is operating a public cloud server as well.</p> <br/><br/> </td> </tr> </tbody></table>
<p><b>First published</b>: Saturday, September 19, 2009, 7:40:57 PM.</p>
