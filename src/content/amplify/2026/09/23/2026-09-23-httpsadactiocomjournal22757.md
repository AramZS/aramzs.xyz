---
author: Jeremy Keith
cover_image: 'https://adactio.com/images/photo-300.jpg'
date: '2026-09-23T19:26:36.600Z'
dateFolder: 2026/09/23
description: Trying to get past Webkit’s blockage at the W3C.
isBasedOn: 'https://adactio.com/journal/22757'
link: 'https://adactio.com/journal/22757'
slug: 2026-09-23-httpsadactiocomjournal22757
tags:
  - tech
title: Stalling installing
---
<p>I’m an invited expert at the World Wide Web Consortium.</p>
<p>That sounds impressive, but it isn’t. Anyone can become an invited expert. The fact that I am now one proves it. You apply to be an invited expert and once that application is approved, you’re in. So you too could and probably should be an invited expert to a working group at the W3C.</p>
<p>I was strongly encouraged to become an invited expert in the <a href="https://www.w3.org/groups/wg/webapps/">web applications working group</a> after <a href="https://github.com/w3ctag/design-reviews/issues/1245">weighing in</a> on the matter of installable web apps (or progressive web apps or whatever).</p>
<p>Last week I had my first call but it wasn’t with the web apps working group, it was with the <a href="https://tag.w3.org/">technical architecture group</a>, a meta-group that helps the other groups if there’s a big-picture sticking point.</p>
<p>There’s a big-picture sticking point with installing web apps.</p>
<p>While most of the participants (read: browser makers) would like to spend their time deciding the details of what API to implement in order to support installable web apps, Webkit is rejecting the very premise of that work.</p>
<p>On last week’s call, Webkit outlined <a href="https://github.com/WebKit/standards-positions/issues/619#issuecomment-4448282291">their position</a>: there shouldn’t be a way for developers to allow users to install the current website. Leave it to the browser, they say. Also, is this even something that users want? Looking at the stats, it certainly doesn’t seem like it.</p>
<p>That would be a reasonable position if there were already a usable way to install web apps. But <a href="https://adactio.com/journal/18252">there isn’t</a>. It’s <em>technically</em> possible to add a website to your iPhone’s home screen. In practical terms, it’s a convoluted usability nightmare.</p>
<p>(It’s hard to avoid veering into conspiracy theory territory and seeing this as some kind of malicious compliance. Especially when you compare it to how native apps are shoved in your face thanks to “<a href="https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners">smart app banners</a>” better known as <a href="https://daringfireball.net/2026/05/what_is_a_dickover">dickovers</a>.)</p>
<p>So Webkit’s stance would make total sense if there were a reasonable way for users of Mobile Safari to install web apps already. But there isn’t.</p>
<p>Last week’s call was quite illuminating. It showed some incredible cognitive dissonance in the Webkit position. Let me explain…</p>
<p>On the one hand, installing web apps is kind of like bookmarking, they say. That’s true. We don’t have an API for bookmarking so why should we have an API for installing web apps?</p>
<p>That would be a fair point if the user interface for bookmarking and installing were in any way comparable. But bookmarking is literally front and centre of the user’s experience of a browser, backed up by decades of convention. Meanwhile the option to install a web app is buried five levels deep behind a “share” icon.</p>
<p>Also: we’re <strong>not</strong> talking about an API for <em>installing</em> web apps. We’re talking about an API for <em>initialising</em> the flow for installing web apps—the very same flow that’s triggered from that buried menu item. And that flow begins with a prominent option to cancel. So let’s not have any scaremongering about users somehow being tricked into adding web apps to their home screen.</p>
<p>Which brings me to the other point…</p>
<p>Webkit are concerned about allowing installed web apps getting access to more powerful APIs. They’re quite right not to want that! A web app launched from the home screen shouldn’t have any special privileges. If it wants access to say, geolocation, the user needs to grant permision just the same as if the page were in the browser.</p>
<p>Why, oh, why then did Apple <a href="https://adactio.com/journal/19911">limit push notifications to installed web apps</a>?</p>
<p>It’s not like other browsers haven’t managed to implement permission-based APIs like push notifications. But apparently limiting notifications to installed web apps was the only way that Apple could think of implementing this API safely.</p>
<p>You see the contradiction, right?</p>
<p>On the one hand, Webkit is saying that installing web apps is like bookmarking. No big deal.</p>
<p>On the other hand, Webkit is saying that installing web apps grants special privileges. A huge deal!</p>
<p>Which is it?</p>
<p>It’s almost as if Webkit aren’t actually participating in good faith but rather have already made up their mind to drag their heels when it comes to any kind of progress on this topic.</p>
<p>Anyway…</p>
<p>On last week’s call, I was supposedly representing the interests of developers. No pressure!</p>
<p>I can’t make any claim to represent all developers, but I like to think I’m fairly representative of a typical developer who’s quite fond of the World Wide Web. So in my allotted ten minutes of speaking time, I said:</p>
<ul> <li>Developers would <em>love</em> a way to initiate the installation flow. The alternative is to <a href="https://thesession.org/app">provide browser-specific instructions</a>—always a bad sign.</li> <li>If browsers provided a prominent usable way to initiate the installation flow, this wouldn’t be such an urgent need.</li> <li>Users should have the option to install web apps just like they have the option to install native apps. <em>Technically</em> both options are available, but <em>practically</em> the scales are tipped very, very heavily towards native apps.</li> <li>Native apps don’t have the same security model as web apps, allowing them much greater access to user data. If <a href="https://www.w3.org/mission/security/">security</a> and <a href="https://www.w3.org/mission/privacy/">privacy</a> are values that the W3C thinks are important for users, they should do everything in their collective power to help tip the scales back in the direction of web apps.</li> </ul>
<p><a href="https://adactio.com/journal/22744">Older »</a></p>
<p>Have you published a response to this? Let me know the URL:</p>
<p>  Ping!   </p>
<h3> <a href="https://adactio.com/journal/22465"> That was Web Day Out </a> </h3>
<p>An excellent day of talks in Brighton exactly 37 years after the birth of the World Wide Web.</p>
