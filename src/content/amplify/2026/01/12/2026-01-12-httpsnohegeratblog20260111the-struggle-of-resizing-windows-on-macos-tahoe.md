---
author: noheger.at
cover_image: ''
date: '2026-01-12T18:13:37.902Z'
dateFolder: 2026/01/12
description: >-
  It turns out that my initial click in the window corner instinctively happens
  in an area where the window doesn’t respond to it.
isBasedOn: >-
  https://noheger.at/blog/2026/01/11/the-struggle-of-resizing-windows-on-macos-tahoe/
link: >-
  https://noheger.at/blog/2026/01/11/the-struggle-of-resizing-windows-on-macos-tahoe/
slug: >-
  2026-01-12-httpsnohegeratblog20260111the-struggle-of-resizing-windows-on-macos-tahoe
tags:
  - tech
  - design
title: The struggle of resizing windows on macOS Tahoe
---
<p>A lot has already been said about the absurdly large corner radius of windows on macOS Tahoe. People are calling the way it looks comical, like a child’s toy, or downright insane.</p>
<p>Setting all the aesthetic issues aside – which are to some extent a matter of taste – it also comes at a cost in terms of usability.</p>
<p>Since upgrading to macOS Tahoe, I’ve noticed that quite often my attempts to resize a window are failing.</p>
<figure><video autoplay="" loop="" muted="" playsinline="" src="https://noheger.at/blog/wp-content/uploads/2026/01/resize-window.mov"></video></figure>
<p>This never happened to me before in almost 40 years of using computers. So why all of a sudden?</p>
<p>It turns out that my initial click in the window corner instinctively happens in an area where the window doesn’t respond to it. The window expects this click to happen in an area of 19 × 19 pixels, located near the window corner.</p>
<p>If the window had no rounded corners at all, 62% of that area would lie <strong>inside</strong> the window:</p>
<figure><img alt="" src="https://noheger.at/blog/wp-content/uploads/2026/01/clickable-area-1.webp"/></figure>
<p>But due to the huge corner radius in Tahoe, most of it – about 75% – now lies <strong>outside</strong> the window:</p>
<figure><img alt="" src="https://noheger.at/blog/wp-content/uploads/2026/01/clickable-area-2.webp"/></figure>
<p>Living on this planet for quite a few decades, I have learned that it rarely works to grab things if you don’t actually touch them:</p>
<figure><video autoplay="" loop="" muted="" playsinline="" src="https://noheger.at/blog/wp-content/uploads/2026/01/scrambled-eggs.mov"></video></figure>
<p>So I instinctively try to grab the window corner inside the window, typically somewhere in that green area, near the blue dot:</p>
<figure><img alt="" src="https://noheger.at/blog/wp-content/uploads/2026/01/expected-area-1.webp"/></figure>
<p>And I assume that most people would also intuitively expect to be able to grab the corner there. But no, that’s already outside the accepted target area:</p>
<figure><img alt="" src="https://noheger.at/blog/wp-content/uploads/2026/01/expected-area-2.webp"/></figure>
<p>So, for example, grabbing it here does <strong>not</strong> work:</p>
<figure><img alt="" src="https://noheger.at/blog/wp-content/uploads/2026/01/expect-2.webp"/></figure>
<p>But guess what – grabbing it here <strong>does</strong>:</p>
<figure><img alt="" src="https://noheger.at/blog/wp-content/uploads/2026/01/outside.webp"/></figure>
<p>So in the end, the most reliable way to resize a window in Tahoe is to grab it <strong>outside</strong> the corner – a gesture that feels unnatural and unintuitive, and is therefore inevitably error-prone.</p>
