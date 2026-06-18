---
author: Nikita Prokopov
cover_image: 'https://dynogee.com/gen?id=24m2qx9uethuw6p&title=Every+Frame+Perfect'
date: '2026-06-17T13:16:37.062Z'
dateFolder: 2026/06/17
description: How imprecise UI animations erode trust in product
isBasedOn: 'https://tonsky.me/blog/every-frame-perfect/'
link: 'https://tonsky.me/blog/every-frame-perfect/'
slug: 2026-06-17-httpstonskymeblogevery-frame-perfect
tags:
  - design
title: Every Frame Perfect
---
<p>A while ago I was reading about Wayland and this quote stuck with me:</p>
<blockquote> <p>A stated goal of Wayland is “<a href="https://wayland-book.com/protocol-design/design-patterns.html">every frame is perfect</a>”.</p> </blockquote>
<p>And I think this is a goal we should all aspire to. Wayland is talking about the technical side of things (modern GPU stacks are very complex and Wayland is trying to take control back) but it could be applied to UI too.</p>
<p>The rule of thumb is:</p>
<p>If I take a screenshot of your app at any moment, it must make sense</p>
<p>Why care about every frame? It builds trust. Users can’t see the code, so UI is the only way for them to judge the quality of the app. If UI looks good, that means developers had time to polish it, which means that they probably spent a comparable amount of time to iron out the code. It’s a heuristic, but a reasonable one.</p>
<p>Now, what does it mean in practice? I can think of a few things:</p>
<ul> <li>No white flashes between screens.</li> <li>No partially loaded content.</li> <li>No relayout while content loads.</li> <li>Internally consistent. If one part of the UI says “1 update available”, another part should not say “Checking for updates...”</li> <li>Precise animations.</li> </ul>
<p>Animations often end up being forgotten. A UI might look great in both start and end states but very janky in between. Like this:</p>
<figure><video autoplay="" controls="" height="225" loop="" muted="" playsinline="" width="400"> <source src="https://tonsky.me/blog/every-frame-perfect/toolbar@2x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>If you feel like there are weird things going on there, there are! Look at slowed down version:</p>
<figure><video autoplay="" controls="" height="225" loop="" muted="" playsinline="" width="400"> <source src="https://tonsky.me/blog/every-frame-perfect/toolbar_slow@2x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>Now let’s apply our rule and take screenshots in the middle of the animation. This doesn’t look right:</p>
<figure><img src="https://tonsky.me/blog/every-frame-perfect/toolbar_still_2@2x.png?t=1781310447"/></figure>
<p>Neither does this:</p>
<figure><img src="https://tonsky.me/blog/every-frame-perfect/toolbar_still_1@2x.png?t=1781310447"/></figure>
<p>Both of these frames are not perfect.</p>
<p>Let’s look at another example. Safari:</p>
<figure><video autoplay="" controls="" height="225" loop="" muted="" playsinline="" width="400"> <source src="https://tonsky.me/blog/every-frame-perfect/safari@2x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>Placeholder text here moves from the center but cursor animates from the left position:</p>
<figure><video autoplay="" controls="" height="225" loop="" muted="" playsinline="" width="400"> <source src="https://tonsky.me/blog/every-frame-perfect/safari_slow@2x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>Not the end of the world by any means, but it does create a feeling that these two components are not in sync with each other. Next thought: maybe they weren’t designed together? If so, then they might not work well together. That’s how trust is lost.</p>
<p>This desynchronization can lead to a lot of confusion. For example, in Photos, when switching between Crop and Adjust mode, picture snaps into place immediately but the crop border is animated:</p>
<figure><video autoplay="" controls="" height="768" loop="" muted="" playsinline="" width="1024"> <source src="https://tonsky.me/blog/every-frame-perfect/photos@1x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>This creates a <em>false</em> feeling that something subtly changes when you switch between modes. And you know what? I don’t want my UI to give me false feelings. I want it to be a precise instrument, not an animated toy.</p>
<p>Sometimes animations are supposed to help you understand a transition, so it’s doubly sad when they make it harder. Follow the magnifying glass:</p>
<figure><video autoplay="" controls="" height="225" loop="" muted="" playsinline="" width="400"> <source src="https://tonsky.me/blog/every-frame-perfect/search_slow@2x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>Same with Youtube. They had the simplest task in the world: move a rectangle from one position to another! Yet they decided to do something very strange:</p>
<figure><video autoplay="" controls="" height="540" loop="" muted="" playsinline="" width="960"> <source src="https://tonsky.me/blog/every-frame-perfect/youtube@1x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>Can you explain this? Does it make sense?</p>
<figure><img src="https://tonsky.me/blog/every-frame-perfect/youtube@1x.png?t=1781310447"/></figure>
<p>Probably a technical limitation of the DOM architecture they decided earlier on. I call these situations “The technology has outsmarted the programmer”. But no matter the reason, the result is an imperfect frame.</p>
<p>Sometimes animations are left out as an afterthought. Whatever happens, happens. Then we get this:</p>
<figure><video autoplay="" controls="" height="540" loop="" muted="" playsinline="" width="960"> <source src="https://tonsky.me/blog/every-frame-perfect/save@1x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>The details are fascinating to watch:</p>
<figure><video autoplay="" controls="" height="540" loop="" muted="" playsinline="" width="960"> <source src="https://tonsky.me/blog/every-frame-perfect/save_slow@1x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
<p>So yeah. Please pay attention not only to the start and end states, but also to everything in between. <em>Every frame matters.</em></p>
<p>I’ll leave you with this unprovoked zoom animation from Preview app. Take care!</p>
<figure><video autoplay="" controls="" height="574" loop="" muted="" playsinline="" width="920"> <source src="https://tonsky.me/blog/every-frame-perfect/preview@1x.mp4?t=1781310447" type="video/mp4"/> </video></figure>
