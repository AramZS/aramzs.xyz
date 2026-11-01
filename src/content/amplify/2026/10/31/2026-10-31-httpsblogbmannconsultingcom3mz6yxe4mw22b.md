---
author: Boris Mann Tech Blog
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3A2cxgdrgtsmrbqnjkwyplmp43/3lxsr74rnk22h/3mz6yxe4mw22b/opengraph-image-1qv6ug?c1d2f6c379aabdcf
date: '2026-10-31T19:40:58.621Z'
dateFolder: 2026/10/31
description: >-
  Scott Jenson built a single page thread splitting interface, and I
  overcomplicated it
isBasedOn: 'https://blog.bmannconsulting.com/3mz6yxe4mw22b'
link: 'https://blog.bmannconsulting.com/3mz6yxe4mw22b'
slug: 2026-10-31-httpsblogbmannconsultingcom3mz6yxe4mw22b
tags:
  - tech
  - social media
title: Riffing on Scott Jenson's Splitter
---
<p>Scott</p>
<p>@jenson.org</p>
<p>has been digging into a lot of different UX experiences, including lots of work with operating systems and <a href="https://bsky.app/profile/jenson.org/post/3mvyuzsdgls2v">evolving the desktop UX</a>.</p>
<p>Scott recently dug into making a thread posting interface for Bluesky, called Splitter. It's beautiful designed (of course!) with thoughtful way of splitting. He also set himself the constraint of a single file and no build step for JS.</p>
<p>Okay, If you've been following along, I think I've got something up and running that is useful to me for splitting longer posts into a Bluesky thread. It may be useful for others because I did find some paid services out there and for such a simple utility that's not necessary.</p>
<figure><img alt="Screenshot of my bluesky splitter app" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:lgmi7gohtr7znobqhmamfhpw/bafkreid77q2ag5b4qfrvuaur4loplwbubr5rrumeul66wv63uqvj3zpdhy"/><figcaption>Screenshot of my bluesky splitter app</figcaption></figure>
<p>He mentioned that app passwords were "more secure" and I had to jump in and say that they are convenient (you don't need to implement OAuth, which can be tricky especially for his approach of a locally run, no build step, simple HTML file with javascript included), but they do also give "god mode" access to the account.</p>
<p>OAuth has the benefit of being able to issue scoped access -- e.g. just posting bsky posts -- and doesn't need any configuration on the part of the user: it's the same flow as a more complex hosted app.</p>
<p>Additionally, atproto has a particular exception for its OAuth implementation, which is that <code>127.0.0.1</code>, your <code>localhost</code> address, can be used as an OAuth endpoint, without needing https.</p>
<p>I took it as a fun constraint (single file HTML with inline JS and no build step), and forked Scott's repo to add OAuth support and make it an installable PWA. You do need to run a small Python web server to make this work, which he also mentions as an option.</p>
<p>I have my own <a href="https://bmannconsulting.com/notes/journal-editor/">Journal Editor</a> on my personal site, and threads is something I hadn't implemented yet, although I do have previews and handle support and a bunch of other things. I also, a long time ago, wrote up a similar concept that was originally Twitter targeted <a href="https://bmannconsulting.com/notes/threadstorm-builder/">Threadstorm Builder</a>.<sup>1</sup></p>
<p>So after adding OAuth and PWA support, I worked on a few other features:</p>
<ul><li><p data-index="9.0">Rich text support for handles / links / hashtags<sup>2</sup></p></li><li><p data-index="9.3">"pinning" a link preview card so you can delete the URL in the body text</p></li><li><p data-index="9.5">After posting, start a new thread, or continue posting in the existing thread<sup>3</sup></p></li></ul>
<p>A few selected screenshots of features as I was working on this.</p>
<h4 data-index="11"><a data-canvas-passive="true" href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#oauth-sign-in">OAuth Sign In</a></h4>
<figure><img alt="" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreif6nmvq25b2py3bcqocrnt5vthf2wjsf6uid2aggl4lgnegm6lycy&amp;width=1200&amp;v=1"/></figure>
<figure><img alt="" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreiceoljjl6xgv6rvsuum4h6pwaectb2ddbzobxzvrcrn2rmiag4wbm&amp;width=1200&amp;v=1"/></figure>
<p>What you can see here is that the app is "on my device" because it detects the 127 IP address. And that it only has "Create Bluesky Posts" permission.<sup>4</sup></p>
<figure><img alt="Open in browser and then use the Chrome install process" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreidqmi363cdfxrjgabdetxs4vc2l6wyol6aztwx3t7qbl3x4yf7iqq&amp;width=1200&amp;v=1"/><figcaption>Open in browser and then use the Chrome install process</figcaption></figure>
<figure><img alt="Another modal that Chrome shows you on install" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreibfkvugfdhcivkkitict3ewwkwcoi7vvfz7iqbtvnip343wjdltdm&amp;width=1200&amp;v=1"/><figcaption>Another modal that Chrome shows you on install</figcaption></figure>
<figure><img alt="Once you're done posting a thread, you can make a new one (it will clear the page) or, continue posting in the thread you just created." src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreig3h4fn4xlctgrau6jpnwywwe2nsiyzxethy5skiqu7omgtmoh3tu&amp;width=1200&amp;v=1"/><figcaption>Once you're done posting a thread, you can make a new one (it will clear the page) or, continue posting in the thread you just created.</figcaption></figure>
<figure><img alt="If you continue, you can post and auto-split as many replies as you like." src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreieyrh5lwgypzdraikl62p2gadnk3eznwxfmurrj7lcod2dlatgy4u&amp;width=1200&amp;v=1"/><figcaption>If you continue, you can post and auto-split as many replies as you like.</figcaption></figure>
<h4 data-index="19"><a data-canvas-passive="true" href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#inline-link-previews">Inline Link Previews<sup>5</sup></a></h4>
<figure><img alt="" src="https://blog.bmannconsulting.com/api/atproto_images?did=did:plc:2cxgdrgtsmrbqnjkwyplmp43&amp;cid=bafkreianau5rl5qs6brffodlij4yvjlwzctpwlwyg55ox2ad7p3hiitq2i&amp;width=1200&amp;v=1"/></figure>
<p>The <a href="https://github.com/bmann/Splitter/blob/main/README.md">README</a> has the full list of features, including all of Scott's original work on smart splitting.</p>
<h3 data-index="23"><a data-canvas-passive="true" href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#the-atmosphere-loves-themes">The Atmosphere loves themes</a></h3>
<p>Things escalated<sup>6</sup>, and where Scott had Bluesky prominently displayed everywhere, I wanted to highlight Atmosphere, plus a couple of the major microblog apps like Blacksky and Eurosky's Mu. So of course, a themes layer.</p>
<p>Scott's original interface is really nicely designed, and was a pleasure to work with. What I've done here isn't "better", it just inspired me to work on this. I hope this is at least interesting, feel free to fork it and make your own customized</p>
<p>I've got it hosted it at <a href="https://splitter.bmannconsulting.com">splitter.bmannconsulting.com</a> on Github Pages<sup>7</sup> so that you can also install it as a PWA on mobile.</p>
<h3 data-index="27"><a data-canvas-passive="true" href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#is-this-the-future-of-apps-and-malleable-software">Is this the future of apps and malleable software?</a></h3>
<p>I mean, no, it's an evening of poking at a codebase<sup>8</sup> from someone with knowledge of what's possible who has explored the space before, building on very nicely designed foundations that makes it look better than average.<sup>9</sup></p>
<p>And it's Just Code. And Just Github. Not malleable in any sense of the word.</p>
<p>But...we can just do things.</p>
<p>I kept it with GH Pages because that's where Scott started.</p>
<p>Especially with things like themes, "forking" should be visual and iterative, rather than code focused.</p>
<p>I think Bluesky's <a href="https://attie.ai">Attie</a> should lean into this<sup>10</sup>. It can host things from your PDS and make them forkable, and create a standard for the whole industry.</p>
<p>And, of course, lexicons and a rich text facet system lets us create new things in a way that are compatible. And with OAuth, some safety rails.</p>
<p>Nota Bene<sup>11</sup></p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a19336-2c78-7668-b508-b708ae126601">1.</a></p>
<p>Threadstorm was more about making the difference between a blog post and threads collapsed - threads should be long form blog posts in many cases! These days I tend to go the other way - make a blog post and then announce it / turn it into a thread with relevant parts highlighted.</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a19343-46dd-7668-b519-7e6e0cf4f8d6">2.</a></p>
<p>One of the things I love in my journal editor and before that Ouranos is out-of-band tags because IMO hashtags in the body just don't look very nice. They are a strong part of Mastodon posting because it's the major way of doing discovery across servers.</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a19334-e321-7668-b506-26b68a9dfea7">3.</a></p>
<p>Storing "old threads" in local browser storage, so you can go back and keep appending to a thread would be another thing</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a19348-5f70-7668-b51f-79487f689521">4.</a></p>
<p>In this context, a "Bluesky post" doesn't mean "on Bluesky the app", it means the microblog post format that Bluesky has defined with a lexicon. It will say this even when you're targeting Blacksky or Eurosky's Mu, or anything else that supports the short post format.</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a1934a-d1ab-7668-b522-a0e55951286c">5.</a></p>
<p>Yes, the open graph images on my site are a giant pic of my avatar, I really do need to fix that.</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a1932b-887c-7668-b4fc-f2e0914e349b">6.</a></p>
<p>We're at like feature number 9 now, so whatever the superlative of "escalated" is.</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a1934c-5b59-7668-b523-85dae9d6f0fd">7.</a></p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a1935a-2557-7668-b531-47e97808038d">8.</a></p>
<p>Poking being shorthand for saying using <a href="https://paseo.sh">Paseo</a> hooked up to <a href="https://opencode.ai/">OpenCode</a> powered by Umans French inference provider running DS 4.1 Flash v1017. <a href="https://app.umans.ai/register?ref=PFKAAJSY">Affiliate link</a> to get low cost not US based tokens from Umans.</p>
<p><a href="https://blog.bmannconsulting.com/3mz6yxe4mw22b#fnref-01a19354-cfc9-7668-b52a-fb69f7b4f4ef">9.</a></p>
