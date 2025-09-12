---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Abtxrwcaeyodrap5mnjw2fvmz/Leaflet%2520Lab%2520Notes/3ly2jff6qwc2e/opengraph-image?04f9dc33b3d4fbe5
date: '2025-09-12T21:06:58.997Z'
dateFolder: 2025/09/12
description: >-
  Lab Notes 010: first in a series exploring how we can make Leaflet more useful
  for specific creators & communities, starting with artists…from photographers
  to comics makers!
isBasedOn: 'https://lab.leaflet.pub/3ly2jff6qwc2e?interactionDrawer=comments'
link: 'https://lab.leaflet.pub/3ly2jff6qwc2e?interactionDrawer=comments'
slug: 2025-09-12-httpslableafletpub3ly2jff6qwc2einteractiondrawercomments
tags:
  - tech
  - blogging
  - social media
title: Towards Leaflet for Artists
---
<h3 data-index="0">Leaflet for…you?</h3>
<p>We're starting a series to capture notes / ideas for making Leaflet more useful to more people — with a special focus on communities that have an active presence here in the atmosphere!</p>
<p>How can we enable great social publishing not just for bloggers generically, but for visual artists? For academics and scientists? For fandom communities, developers, and more?</p>
<p>We'll add more of these, and plan to treat each as a living doc, sharing notes as we learn.</p>
<p>How can we make Leaflet better for you and the communities you love? If you have ideas, we'd love to hear from you!</p>
<p>To start, we're looking at ideas for making Leaflet better for artists and visual creators!</p>
<p>Here are some things we've heard and been thinking about so far.</p>
<h3 data-index="8">Canvas pages</h3>
<p>We have a special 'canvas' page type in Leaflet docs, a simple visual board for arranging blocks spatially.</p>
<figure><img alt="c. ruiyi smallbird 🪷's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:2sqok7oqqrhtmmmb5sulkrw2/bafkreic7i3fdvuwmpccowixrd42vil7e6q6hv3zwl4pobtdim7d6yo7zay@jpeg"/><figcaption>c. ruiyi smallbird 🪷's avatar</figcaption></figure>
<p>It's pretty minimalist, but useful for lots of things!</p>
<p>We'd like to make all block types and subpages available in publications, and add the ability to publish standalone leaflets to atproto to enable social features for canvases.</p>
<h3 data-index="14">Comic specs and lexicons</h3>
<p>Not sure if we'd do a comics-specific lexicon down the line, but this spec from <a href="https://bsky.app/profile/did:plc:z7tuu4dmfvoqlm2wensjxons">@dmathewwws.com</a> is really interesting! Even if we don't adopt in full, it could give us good ideas re: useful types of data to better support comics in Leaflet posts.</p>
<figure><img alt="ekana stone's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:3x5npw4cb2twifyqcox7jmqj/bafkreibw5lomyo5ujpe3yy72vj63e2ybntyiajogrdolceo45rbuxpaenm@jpeg"/><figcaption>ekana stone's avatar</figcaption></figure>
<figure><a href="https://3s-docs.org/comicseries"><img alt="ComicSeries" src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:3x5npw4cb2twifyqcox7jmqj/bafkreia6vlbca7g26ql2reeaihvrq2jhgyejmowuwwgbjlprqqzlp2ywfm@jpeg"/><h4>ComicSeries</h4><p>Help build the next generation of media apps with the SSS (Schema Structured Syndication) protocol</p></a></figure>
<p>^ More in thread here including why a comics lexicon is exciting. It could be cool to try to get there gradually; I can imagine comics as a kind of template / variant for more specific post format…a little outside our wheelhouse right now but could make sense eventually.</p>
<p>I wonder if we could get part of the way there just by enabling creators to add more post metadata? Like tags, but also e.g. genre, format, or other things specific to comics (or other forms!)</p>
<h3 data-index="20">Top-level pages for publications</h3>
<p>Into this idea for how non-post pages in a publication would be useful for artists. Gallery would be a great use case along with ones like 'About' or 'Contact' and so on. These pages would also be useful for creating indexes or sequences of other pages / posts.</p>
<figure><img alt="Ryan's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:5ijrwhgurybzfdvm5nfkbs4a/bafkreian7tk2pxhdzk7ky2qvxnzfwnij4iqjir2yg54zd7rwt4l5hhuawe@jpeg"/><figcaption>Ryan's avatar</figcaption></figure>
<pre><p>Emails + RSS syndication is key for beating Substack and Instagram. For illustration work, the ability to have a gallery is critical (blogs having non-blog roll pages with a gallery is great there).  For serialized comics, a reader has to be able to click to the next entry in the comic easily.</p></pre>
<p>And definitely makes sense to support common distribution channels like RSS and email, that's almost table stakes here! Also (to a point in reply to that post), just making it FUN to publish — but also open, values-aligned, good for serious growth etc. — is pretty key for us!</p>
<h3 data-index="25">Prev + next buttons</h3>
<p>Mentioned in the above post, and by one or two others — this makes a lot of sense, and is super simple, love it, we should add ASAP!</p>
<figure><img alt="cornflour's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:uxmw7elimzm67wzhq5odmdpr/bafkreighu5upgifnuocprudp2kpkynm35wcxlrxdzzl2thy73opsl4vnbi@jpeg"/><figcaption>cornflour's avatar</figcaption></figure>
<pre><p>not as a publisher/artist but as a reader/consumer: I'd like to be able to go to the next post after reading the current one instead of having to go back to the list of posts to select the next one 🙏</p></pre>
<p>This is great because, as with things like better image handling, it'll be useful for everyone, publishers as well as readers.</p>
<p>We have a ton of ideas and it's helpful to prioritize things that are both broadly useful and super critical to specific types of creators!</p>
<p>Let's do this one now!</p>
<h3 data-index="32">Image galleries + multiple image handling</h3>
<p>I'm lumping a few things together here under the umbrella of better handling many images!</p>
<figure><img alt="RC's avatar" src="https://cdn.bsky.app/img/avatar/plain/did:plc:hhhvgoxwij5d6uyft3mipjtm/bafkreiesjjzujl5pbowi3k3w6ziuifdep6z73lkmlnktrqifscjtk2fbdi@jpeg"/><figcaption>RC's avatar</figcaption></figure>
<p>First, just getting images into a post in the first place — bulk upload both from file picker, and drag and drop onto the page.</p>
<p>An image gallery block could be really cool — useful for photo blogs, certain types of comics or portfolios…all kinds of things.</p>
<p>Lightboxing images makes a lot of sense together with galleries. Useful for individual images just to see them more full size, but also great for nav within a gallery.</p>
<p>Question: what do people most want to see with an image gallery block…something simple? lots of options? Grain embed?</p>
<p>Oh and RC (who posted above) has a cool travel photo blog, but I noticed the images can be large / slow to load, optimizing em would probably be useful especially if we do galleries.</p>
<h3 data-index="41">Odds 'n' ends!</h3>
<p>Account indicator (or even switcher) could be a nice visual cue; especially useful for people with both personal and project accounts.</p>
<p>And yes, planning a 'reader' view to read things you're subscribed to from the homepage!</p>
<p>Definitely thinking about tags / categories as well. Both for organizing within a publication, and for improving discovery.</p>
<p>Also thinking about community collections or meta-pubs people could organize and submit posts to!</p>
<p>Touched on canvas above, but this mentions layout options too:</p>
<p>We don't want to go too wild with layout, but the two-column idea might be a nice balance, adding flexibility but without a ton of options to fiddle with.</p>
<p>That's it for now, but we'll update with more as we go — please comment with any thoughts, here or on Bluesky!</p>
