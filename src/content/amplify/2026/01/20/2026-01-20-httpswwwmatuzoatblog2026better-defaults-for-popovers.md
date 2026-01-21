---
author: Manuel Matuzović
cover_image: >-
  https://res.cloudinary.com/dp3mem7or/image/upload/w_1200/articles/sm_popoverdefaults.png?s=213
date: '2026-01-20T19:03:14.448Z'
dateFolder: 2026/01/20
description: >-
  I recently added a rule to my reset style sheet UA+ that I wanted to share
  with you.
isBasedOn: 'https://www.matuzo.at/blog/2026/better-defaults-for-popovers'
link: 'https://www.matuzo.at/blog/2026/better-defaults-for-popovers'
slug: 2026-01-20-httpswwwmatuzoatblog2026better-defaults-for-popovers
tags:
  - code
  - design
title: Better defaults for popovers
---
<p>I recently added a rule to my <a href="https://fokus.dev/tools/uaplus/">reset style sheet UA+</a> that I wanted to share with you.</p>
<p>When you add a popover to a page and open it, it looks similar to a dialog in terms of its styling. It's positioned at the center of the viewport.</p>
<p>HTML</p>
<p>That's okay, but I would argue that in most cases you want your popovers aligned closely with the button that controls them. As it turns out, that's super easy to achieve in browsers that support <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning">CSS anchor positioning</a>, since popovers already have an implicit anchor. All you need to do is overwrite the margin property and position the popover. I'm wrapping the rule in a feature query to ensure the margin isn't reset in browsers that don't support CSS anchor positioning (At the time of writing, most importantly Safari).</p>
<pre><code>  @supports(position-area: end) {
    [popover] {
      margin: 0;
      position-area: end span-end;
      position-try-fallbacks: flip-inline;
    }
  }</code></pre>
<p>If you're in Chrome or Firefox, you should see the popover aligned and the bottom left (or right for RTL) edge of the button.</p>
<p>HTML</p>
<p>You can also add <code>position-try-fallbacks: flip-inline;</code>, as I did here, to tell the popover to try flipping its position along the inline axis if it overflows the viewport in its initial position (Thanks, Temani, for the hint).</p>
<p>Nice and easy, and it's a much better default.</p>
<p>My blog doesn't support comments yet, but you can reply via <a href="mailto:blog@matuzo.at?subject=Comment on “Better defaults for popovers”">e-mail</a>.</p>
