---
author: una.im
cover_image: 'https://una.im/posts/anchor-follow-leader/og.jpg'
date: '2025-09-13T05:06:29.170Z'
dateFolder: 2025/09/13
description: Learn how to create a dynamically re-anchored pointer element.
isBasedOn: 'https://una.im/follow-the-anchor/'
link: 'https://una.im/follow-the-anchor/'
slug: 2025-09-13-httpsunaimfollow-the-anchor
tags:
  - code
title: Follow-the-leader pattern with CSS anchor positioning
---
<figure><img alt="" src="https://una.im/posts/anchor-follow-leader/bg.jpg"/></figure>
<h2>Introduction</h2>
<p>There’s a pattern I’ve been implementing lately that creates a little “follow-the-leader” effect using anchor positioning. And the technique is pretty neat too. It involves creating a single “follower” (positioned) element and dynamically updating it’s anchor on an event or state change. This could be in JavaScript (i.e. on click), or in CSS directly (i.e. on hover, focus/focus-within, updating the current-target, etc).</p>
<aside><strong>Note:</strong> This technique is demonstrated using the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning">CSS anchor positioning API</a>, which is a part of <a href="https://wpt.fyi/interop-2025">Interop 2025</a>. At the time of this writing, it has shipped in Chromium and is planned to ship soon in Webkit. I will update this post as browser support rolls out.</aside>
<h2>The Technique</h2>
<p>Let’s start with the most basic “event” for demo purposes: hover.</p>
<figure><video autoplay="" loop="" muted="" playsinline=""> <source src="https://una.im/posts/anchor-follow-leader/anchor-demo1.mp4" type="video/mp4"/> </video></figure>
<p> <i>Hover over these cards if you're on Chrome 125+ or Safari 26+. </i> </p>
<p>You have one follower (👀) which has a <code>position-anchor</code> set to a specific name (in this case it’s <code>--hovered</code>). For each of the “possible anchors”, you update the <code>anchor-name</code> to be <code>--hovered</code>. This is how you get it to change anchors and reposition itself.</p>
<pre data-language="css"><code>.follower {
  /*  anchor the follower element  */
  position: fixed;
  position-anchor: --hovered;
}

.possible-anchor:hover {
  /*  update the active anchor  */
  anchor-name: --hovered;
}</code></pre>
<p>You also probably want it to smoothly animate between anchors, which can be done with a basic transition:</p>
<pre data-language="css"><code>.follower {
  /*  transition the animation  */
  transition: top 0.5s ease;

  /*  position the element relative to its anchor  */
  top: anchor(center);
  left: anchor(right);
}</code></pre>
<aside><strong>Gotcha:</strong> you need to position the element with absolute positioning, since <code>position-area</code> does not yet allow animation into new positions.</aside>
<p>In the demo above, I’m also animating the <code>background</code> at a faster rate than the “follower” element is moving into place. I think this adds a nice little orchestration effect that makes the follower element feel more like it is “catching up”. I’m also doing the <a href="https://x.com/Una/status/1952736801694609753">pseudo element trick</a> to prevent any gapping when you’re navigating between the elements.</p>
<p>Check out <a href="https://codepen.io/una/pen/WbQBvgy/02ef70a9fae05a796cee76af5138550c">this pen</a> to see what’s going on a little more clearly.</p>
<h2>Action Bar</h2>
<p>Let’s take a look at a more realistic demo now. You likely want to take this a step further, as a hover action is quite ephemeral and doesn’t account for other navigation modalities such as keyboard and touch.</p>
<p>This action bar demo combines updating the anchor on hover, focus, or selection. It creates a visual “preview” effect, like a roving focus. I’m using JavaScript here to “update” the default anchor on click, and to update the “roving” (magnifying glass 🔎) anchor on hover and focus. The rest of the styling is done in CSS.</p>
<figure><video autoplay="" loop="" muted="" playsinline=""> <source src="https://una.im/posts/anchor-follow-leader/anchor-demo2.mp4" type="video/mp4"/> </video></figure>
<article class="rw-embedded-tweet" data-rw-tweet-id="1952344669280407659">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1848036312210669569/qUw4u9E5.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/CJfromJBW">CJ @ Jackie Brown</a></span>
<span><a href="https://twitter.com/CJfromJBW">@CJfromJBW</a></span>
</div>
<div>
<a href="https://twitter.com/CJfromJBW/status/1952344669280407659">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>July recap [micro interactions]</p><video controls=""><source src="https://video.twimg.com/amplify_video/1952344567933444096/pl/7tIm0CxnI-MU_VoG.m3u8?tag=21" type="application/x-mpegURL"/><source src="https://video.twimg.com/amplify_video/1952344567933444096/vid/avc1/352x270/0j9PeGujYxCllyZV.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567933444096/vid/avc1/470x360/FfFbii-R2Akzx32s.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567933444096/vid/avc1/940x720/vkYw0WRItyfo_hm6.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567933444096/vid/avc1/1708x1308/oUyQjmo2Y7T98qlW.mp4?tag=21" type="video/mp4"/>Your browser does not support the video tag.</video><video controls=""><source src="https://video.twimg.com/amplify_video/1952344568013225984/pl/7TNnKgjwtYh7cEzX.m3u8?tag=21" type="application/x-mpegURL"/><source src="https://video.twimg.com/amplify_video/1952344568013225984/vid/avc1/348x270/T7MrCYbyRSimdzHI.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344568013225984/vid/avc1/464x360/WPn1eJi7GsG6iPO7.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344568013225984/vid/avc1/930x720/ckL3JFXHUM3eCz9_.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344568013225984/vid/avc1/1396x1080/bEggDMOKqbmpF_ku.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344568013225984/vid/avc1/2792x2160/MrYaCWLbz8mp0U7D.mp4?tag=21" type="video/mp4"/>Your browser does not support the video tag.</video><video controls=""><source src="https://video.twimg.com/amplify_video/1952344567929262080/pl/Y57GKsPlu5x5t7E2.m3u8?tag=21" type="application/x-mpegURL"/><source src="https://video.twimg.com/amplify_video/1952344567929262080/vid/avc1/348x270/PFKMiCefG9ACICqG.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567929262080/vid/avc1/466x360/lgOoNtxv2qKJs-uD.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567929262080/vid/avc1/932x720/AqNsS-s9QUenMhaF.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567929262080/vid/avc1/1398x1080/kjVjSUmjTfgoOUSc.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567929262080/vid/avc1/2796x2160/i4Hy_hMBQ0BOj37b.mp4?tag=21" type="video/mp4"/>Your browser does not support the video tag.</video><video controls=""><source src="https://video.twimg.com/amplify_video/1952344567946076160/pl/bj5Kg-MELu-dHa_U.m3u8?tag=21" type="application/x-mpegURL"/><source src="https://video.twimg.com/amplify_video/1952344567946076160/vid/avc1/350x270/_q5YYnOZG1N5fh2f.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567946076160/vid/avc1/466x360/SMtJnNbT4grjhxwd.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567946076160/vid/avc1/932x720/eGyFXlzuzDXg-Otc.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567946076160/vid/avc1/1400x1080/72zIqClH-ajNIaO2.mp4?tag=21" type="video/mp4"/><source src="https://video.twimg.com/amplify_video/1952344567946076160/vid/avc1/2800x2160/bUdQigucszyNXxGM.mp4?tag=21" type="video/mp4"/>Your browser does not support the video tag.</video>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1754310216000">
<span>
<a href="https://twitter.com/CJfromJBW/status/1952344669280407659">Posted Aug 4, 2025 at 12:23PM</a>
</span>
</footer>
</article>
<p>I think this demo shows a realistic usage of where CSS and JavaScript play really nicely together: setting state, focus, and blur in JS and applying styles in CSS.</p>
<h2>Carousel Scroll Markers</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker">Scroll-markers</a> are a modern UI capability where you don’t need to add any JavaScript for the state management. This means you can achieve a real-world CSS-only usecase, leveraging <code>:target-current</code> to apply styles to the currently-active <code>::scroll-marker</code>.</p>
<p>The jist of it is:</p>
<pre data-language="css"><code>.indicator {
  position-anchor: --active-target;
}

::scroll-marker {
  transition: transform 0.2s ease;
}

::scroll-marker:target-current {
  anchor-name: --active-target;
}</code></pre>
<p>And it’s a neat effect when you see it in action:</p>
<figure><video autoplay="" loop="" muted="" playsinline=""> <source src="https://una.im/posts/anchor-follow-leader/anchor-demo3.mp4" type="video/mp4"/> </video></figure>
<figure><figcaption>Explore the live demo on Codepen.</figcaption></figure>
<p>I’ve got another <a href="https://codepen.io/una/pen/zxvoWZd">demo here</a> which uses this technique along with <a href="https://una.im/scroll-target-group">scroll-target-group</a> to create a scroll-spy effect with a magnetic anchor, similar to the carousel above.</p>
<h2>Conclusion</h2>
<p>I hope you enjoyed this short blog post! This method of highlighting content on a page is just a neat little tool in my CSS toolbelt that I’ve enjoyed using lately. Shout out to Roman Komarov, who I chatted about this with at CSS Day, and who documented this technique in his early <a href="https://kizu.dev/anchor-positioning-experiments/#transitions">blog post on anchor positioning experiments</a>. Let me know if you end up using it in one of your projects!</p>
