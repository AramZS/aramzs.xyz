---
author: 'Tedium: The Dull Side of the Internet.'
cover_image: >-
  https://v1.screenshot.11ty.dev/https%3A%2F%2Ftedium.co%2Fog-images%2F2025%2F08%2F16%2Ffoss-photoshop-alternatives-pixieditor-node-procedural%2F/opengraph/?v=1755360318
date: '2025-08-16T16:41:49.444Z'
dateFolder: 2025/08/16
description: >-
  Blender-inspired node-based image editors like PixiEditor and Graphite are
  looking beyond the Photoshop paradigm.
      
isBasedOn: >-
  https://tedium.co/2025/08/16/foss-photoshop-alternatives-pixieditor-node-procedural/
link: >-
  https://tedium.co/2025/08/16/foss-photoshop-alternatives-pixieditor-node-procedural/
slug: >-
  2025-08-16-httpstediumco20250816foss-photoshop-alternatives-pixieditor-node-procedural
tags:
  - tech
title: Connecting A Fresh Node
---
<figure><img alt="Connecting A Fresh Node" src="https://proxy.tedium.co/b0a-w_TuKKGMYBRMmaFNaWHiMd8=/smart/filters:quality(50):format(jpeg)/uploads/procedural.gif"/></figure>
<figure><img alt="Connecting A Fresh Node" src="https://proxy.tedium.co/aZEkiaJLZQ1GSVxwh9axfpJGGuQ=/filters:quality(80)/uploads/procedural.gif"/></figure>
<h2 data-pagefind-meta="description">The exciting new 2D open-source image editor PixiEditor is still a bit rough around the edges, but it innovates by bringing thinking from the game development world to the traditional paint tool paradigm. It feels like the start of a trend.</h2>
<p><strong>One of the big traps</strong> that open-source software often runs into is that, to be good, it must be like something else.</p>
<p>I won’t use GIMP because it’s not like Photoshop. NextCloud doesn’t feel like Dropbox. And on and on. It becomes a limiting factor to growing interest in open-source software (especially on Linux, which is starved for options in certain categories) because we become obsessed with trying to make the thing like the other thing.</p>
<p>But I wonder if the way to solve this issue is by building something genuinely different, that scratches the same itch but doesn’t really care about maintaining a 1:1 experience.</p>
<p>Often, I find the apps in the Linux ecosystem that I like the most take a completely different approach to solving my problem. There’s nothing even in the commercial software world quite like Syncthing, the peer-to-peer sharing tool that shares between machines but skips the cloud entirely. But that’s what makes it great.</p>
<p><a href="https://tedium.co/2024/03/14/full-time-linux-two-months-later/">As I suggested last year</a>, I think Krita succeeds at this because it is explicitly sold as a drawing tool, but when you sand it down a little bit, it does about 90% of what Photoshop does. There are a few areas where it can’t even begin to match (type is not a strong spot, nor are cutouts), but for editing graphics and doing GIF-style animations, it does a great job.</p>
<p>But there’s a chance to go even further afield with some of this, for someone to introduce an image editor that does many of the things that Photoshop does, along with a lot of things it does not. But the problem is, it needs to look essentially nothing like Photoshop. Sure, it does some things like it, but the model needs to break some new ground.</p>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/5hmW2ZKO1YY?modestbranding=1&amp;autoplay=1&amp;playsinline=1" type="video/mp4"/></div></figure>
<p>Which is why <a href="https://pixieditor.net">PixiEditor</a> really stands out. The tool, originally designed as a pixel editor but extending into vector and 2D graphics with its recently released version 2.0, essentially takes inspiration from a creative direction Adobe has rarely traveled: Node-based editing.</p>
<p>Long a key element of 3D design, tools like Blender, Autodesk’s Maya, and SideFX’s Houdini have used it for literal decades. It’s a visual programming approach that truly benefits power users, who can do really impressive things with it. And it’s found popularity among game engines and even video editors like DaVinci Resolve. Essentially, the convention that Adobe has kind of pushed on 2D graphics and video editing has meant that nodes have never really been a thing in 2D imagery.</p>
<figure><img alt="node_editing.png" src="https://proxy.tedium.co/DAUmK8Ev7Im47KyEdFmj0PGsgb0=/1000x685/filters:quality(80)/uploads/node_editing.png"/></figure>
<p>For those who need an even simpler explanation than that, check out this sample of an image I built with nodes in PixiEditor. In this image, I adjusted the color balance on the picture, set it to grayscale, and added a couple of screens, and a little noise. If I wanted to, I could add things like blur or shadows. I can even animate those layers.</p>
<p>Rather than the adjustment layer approach Photoshop takes, you add effects by adding nodes, which allows you to see the full picture of how a graphic is being edited and modified. It allows you to make really detailed changes without clicking around in an array of menus—especially useful when you’re building very tailored or complex graphics.</p>
<p>By choosing to lean on node-based editing, PixiEditor is creating a distinct lane for itself that, while it doesn’t have a strong base in the world of traditional Photoshop users, is a very well-understood paradigm for game designers. After all, Unreal Engine uses node-based editing. So does Godot. So does Unity.</p>
<p>To me, it feels like a bet by its primary developer, Krzysztof Krysiński, that this model has a future in 2D graphic design. By creating a tool that on the surface looks like a Photoshop-style tool, but handles all of its effects using nodes, it becomes an onramp for people to get into visual-programming approaches.</p>
<p>And there is demand for it. Affinity, which has become the design platform of choice for Adobe expats, has had a number of users <a href="https://forum.affinity.serif.com/index.php?/topic/194668-node-based-editor-as-an-option-instead-of-layers/">suggest a node-style layer-management approach</a> to differentiate it from Photoshop. (Nodes are a term in Affnity world, but in reference to the points in its drawing tool.)</p>
<p>The result is that this is the natural lane for an emerging competitor to take if they want to teach Adobe a thing or two about design. Sure, the learning curve will be a little steeper for folks who have never used this model, but it also means that the result may be more powerful for those users in the end.</p>
<figure><a href="https://ko-fi.com/c/caf0972c99"><img alt="" src="https://static.tedium.co/uploads/15for15.jpg"/></a></figure>
<figure><img alt="PixiEditor.png" src="https://proxy.tedium.co/5Hh96t2xvW8QkjUFoNVXLOe3MuI=/1000x529/filters:quality(80)/uploads/PixiEditor.png"/><figcaption> An example of PixiEditor managing an animated rain scene that is procedurally generated with nodes, an example built by Krysiński.</figcaption></figure>
<p>Now, to be clear, PixiEditor is early. A lot of features that users like me take for granted just aren’t there yet. (Touchpad gestures is one of them. It would sure be nice to pan in the node editor.) But at this point in its life, it is probably more important that it has good bones that will allow it to be more things to more people, so it can further lean into its relatively fresh mission.</p>
<figure><img alt="Graphite.png" src="https://proxy.tedium.co/OObKg0Sxsm-TeIfzmdVxqhAi4qo=/1000x563/filters:quality(80)/uploads/Graphite.png"/><figcaption> A screenshot of Graphite, another emerging player in the node-based image-editing space. It currently has a web-based client.</figcaption></figure>
<p>And it’s not alone. Another promising node-based tool emerging from its cocoon at the moment is <a href="https://graphite.rs">Graphite</a>. It promises to be a tool eventually capable of graphic design, print layout, motion graphics, and even visual effects. (There are not many options for desktop publishing-style print layout on Linux, so the fact that it plans to hit that market is promising.) It is only available in a web version at this time but it will likely be another one to watch—and yes, it is also open-source.</p>
<p>Others are trying to do this, too. <a href="https://gimelstudio.com">Gimel Studio</a>, an app for Windows, has built something in this vein, but it is likewise a bit on the raw side in part because of a major app refresh that’s currently in progress. Likewise, if you look hard enough, you can <a href="https://github.com/santaclose/noose">find attempts like noose</a> that seem to have made progress without much notice.</p>
<p>If PixiEditor and Graphite end up looking like realistic options for designers who want to jump ship from the Adobe suite, it will be in no small part because of their embrace of procedural, node-based editing. It is a lane that has nothing to do with forcing AI into our graphics editors that Adobe is doing literally nothing with.</p>
<p>Given that, depending on the part of the design ecosystem you’re looking at, it’s straight-up commonplace, that feels like a gap someone is bound to fill.</p>
<p>This is also an excellent path forward for open source in general, by the way. What are the Adobes of the world not doing? That’s the thing your project should do.</p>
<h5>Node-Based Links</h5>
<p><strong>M.2-based NVMe drives are already pretty small,</strong> but things are about to get a lot smaller. <a href="https://arstechnica.com/gadgets/2025/08/tiny-removable-mini-ssd-could-eventually-be-a-big-deal-for-gaming-handhelds/">A new SSD technology from China</a> aims to make microscopic high-speed SSDs a thing. Let’s hope it reaches the Raspberry Pi.</p>
<p><strong>Speaking of things getting faster,</strong> the theoretical limits of PCIe are getting <a href="https://www.servethehome.com/pcie-8-0-announced-by-the-pci-sig-will-double-throughput-again/">comically fast</a>.</p>
<figure><img src="https://i.ytimg.com/vi/hMhAtMvzpaw/hqdefault.jpg"/>Play<div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/hMhAtMvzpaw?modestbranding=1&amp;autoplay=1&amp;playsinline=1" type="video/mp4"/></div></figure>
<p><strong>The new <em>King of the Hill</em> is really good,</strong> and true to the spirit of the original show. In case you were wondering how an artist felt about making the show, <a href="https://www.youtube.com/watch?v=hMhAtMvzpaw">watch this video</a>. <a href="https://siamistry.weebly.com">Sia Mistry</a>, a storyboard artist, breaks down what the experience is like, including the fact that her work is basically on a two-year time delay.</p>
<p>Find this one an interesting read? <a href="https://tedium.co/2025/08/16/foss-photoshop-alternatives-pixieditor-node-procedural/">Share it with a pal</a>! And back at it in a couple of days.</p>
