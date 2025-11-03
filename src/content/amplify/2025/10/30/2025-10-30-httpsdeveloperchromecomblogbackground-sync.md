---
author: Chrome for Developers
cover_image: ''
date: '2025-10-30T20:50:54.382Z'
dateFolder: 2025/10/30
description: >-
  Background sync is a new web API that lets you defer actions until the user
  has stable connectivity. This is useful for ensuring that whatever the user
  wants to send, is actually sent.
isBasedOn: 'https://developer.chrome.com/blog/background-sync/'
link: 'https://developer.chrome.com/blog/background-sync/'
slug: 2025-10-30-httpsdeveloperchromecomblogbackground-sync
tags:
  - code
title: Introducing Background Sync
---
<figure></figure><figure></figure><h1> Introducing Background Sync bookmark_borderbookmark  Stay organized with collections   Save and categorize content based on your preferences.    </h1>
<p><a href="https://developer.mozilla.org/edocs/Web/API/Background_Synchronization_API">Background Synchronization</a> is a new web API that lets you defer actions until the user has stable connectivity. This ensures that whatever the user wants to send is actually sent.</p>
<h2 data-text="The problem">The problem</h2>
<p>The internet is a great place to waste time. Without wasting time on the internet, we wouldn't know <a href="https://www.youtube.com/watch?v=-Z4jx5VMw8M">cats dislike flowers</a>, <a href="https://www.youtube.com/watch?v=PrjkqW37n_k">chameleons love bubbles</a>, or that our very own <a href="https://twitter.com/ebidel/">Eric Bidelman</a> is <a href="https://youtu.be/SFa9mxPjXcg?t=3m3s">a putt putt golfing hero of the late 90s</a>.</p>
<p>But sometimes, just sometimes, we're not looking to waste time. The desired user experience is more like:</p>
<ol> <li>Phone out of pocket.</li> <li>Achieve minor goal.</li> <li>Phone back in pocket.</li> <li>Resume life.</li> </ol>
<p>Unfortunately this experience is frequently broken by poor connectivity. We've all been there. You're staring at a white screen or a spinner, and you know you should just give up and get on with your life, but you give it another 10 seconds just in case. After that 10 seconds? Nothing.</p>
<p>But why give up now? You've invested time already, so walking away with nothing would be a waste, so you carry on waiting. By this point you <em>want</em> to give up, but you know the second you do so, is the second before everything would have loaded if only you'd waited.</p>
<p><a href="https://developer.chrome.com/blog/app-shell">Service workers</a> solve the page loading part by letting you serve content from a cache. But what about when the page needs to send something to the server?</p>
<p>At the moment, if the user hits "send" on a message they have to stare at a spinner until it completes. If they try to navigate away or close the tab, we use <a href="https://developer.mozilla.org/docs/Web/API/WindowEventHandlers/onbeforeunload"><code>onbeforeunload</code></a> to display a message like, "Nope, I need you to stare at this spinner some more. Sorry". If the user has no connection, we tell the user "Sorry, <em>you</em> must come back later and try again".</p>
<p>This is rubbish. Background sync lets you do better.</p>
<h2 data-text="The solution">The solution</h2>
<p>The following video shows <a href="https://jakearchibald-gcm.appspot.com">Emojoy</a>, an emoji-only chat demo. It's a <a href="https://developer.chrome.com/blog/getting-started-pwa">progressive web app</a>, and it works offline-first. The app uses push messages and notifications, and it uses background sync.</p>
<p>If the user tries to send a message when they have zero connectivity, then, thankfully, the message is sent in the background once they get connectivity.</p>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/l4e_LFozK2k?origin=https%3A%2F%2Fdeveloper.chrome.com&amp;autoplay&amp;controls&amp;embed_domain&amp;enablejsapi=1&amp;end&amp;hl&amp;showinfo&amp;start&amp;video-id=l4e_LFozK2k&amp;widgetid=1&amp;forigin=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fbackground-sync%2F&amp;aoriginsup=1&amp;gporigin=https%3A%2F%2Fduckduckgo.com%2F&amp;vf=1" type="video/mp4"/></div></figure>
<p>As of March 2016, Background sync is available in Chrome from version 49 and above. You can see it action by following the steps below:</p>
<ol> <li><a href="https://jakearchibald-gcm.appspot.com">Open Emojoy</a>.</li> <li>Go offline (either using airplane-mode or visit your local Faraday cage).</li> <li>Type a message.</li> <li>Go back to your home screen (optionally close the tab or browser).</li> <li>Go online.</li> <li>Message sends in the background!</li> </ol>
<p>Being able to send in the background like this also yields a perceived performance improvement. The app doesn't need to make such a big deal about the message sending, so it can add the message to the output straight away.</p>
<h2 data-text="How to request a background sync">How to request a background sync</h2>
<p>In true <a href="https://extensiblewebmanifesto.org/">extensible web</a> style, this is a low-level feature that gives you the freedom to do what you need. You ask for an event to be fired when the user has connectivity, which is immediate if the user already has connectivity. Then, you listen for that event and do whatever you need to do.</p>
<p>Like push messaging, it uses a <a href="https://developer.mozilla.org/docs/Web/API/Service_Worker_API">service worker</a> as the event target, which enables it to work when the page isn't open. To begin, register for a sync from a page:</p>
<pre><code>// Register your service worker:
navigator.serviceWorker.register('/sw.js');

// Then later, request a one-off sync:
navigator.serviceWorker.ready.then(function(swRegistration) {
  return swRegistration.sync.register('myFirstSync');
});
 ```

Then listen for the event in `/sw.js`:

```js
self.addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(doSomeStuff());
  }
});
</code></pre>
<p>And that's it! In the above, <code>doSomeStuff()</code> should return a promise indicating the success/failure of whatever it's trying to do. If it fulfills, the sync is complete. If it fails, another sync will be scheduled to retry. Retry syncs also wait for connectivity, and employ an exponential back-off.</p>
<p>The tag name of the sync ('myFirstSync' in the above example) should be unique for a given sync. If you register for a sync using the same tag as a pending sync, it coalesces with the existing sync. That means you can register for an "clear-outbox" sync every time the user sends a message, but if they send 5 messages while offline, you'll only get one sync when they become online. If you want 5 separate sync events, just use unique tags!</p>
<p><a href="https://jakearchibald.github.io/isserviceworkerready/demos/sync/">Here's a simple demo</a> that does the bare minimum; it uses the sync event to show a notification.</p>
<h2 data-text="What could I use background sync for?">What could I use background sync for?</h2>
<p>Ideally, you'd use it to schedule any data sending that you care about beyond the life of the page. Chat messages, emails, document updates, settings changes, photo uploads... anything that you want to reach the server even if user navigates away or closes the tab. The page could store these in an "outbox" store in indexedDB, and the service worker would retrieve them, and send them.</p>
<p>Although, you could also use it to fetch small bits of data...</p>
<h3 data-text="Another demo!">Another demo!</h3>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/oiVyIT7ljC0?origin=https%3A%2F%2Fdeveloper.chrome.com&amp;autoplay&amp;controls&amp;embed_domain&amp;enablejsapi=1&amp;end&amp;hl&amp;showinfo&amp;start&amp;video-id=oiVyIT7ljC0&amp;widgetid=3&amp;forigin=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fbackground-sync%2F&amp;aoriginsup=1&amp;gporigin=https%3A%2F%2Fduckduckgo.com%2F&amp;vf=1" type="video/mp4"/></div></figure>
<p>This is the <a href="https://wiki-offline.jakearchibald.com/">offline wikipedia</a> demo I created for <a href="https://www.youtube.com/watch?v=d5_6yHixpsQ">Supercharging Page Load</a>. I've since added some background sync magic to it.</p>
<p>Try this out yourself. Make sure you are using Chrome 49 and above and then:</p>
<ol> <li>Go to any article, perhaps <a href="https://wiki-offline.jakearchibald.com/wiki/Google_Chrome">Chrome</a>.</li> <li>Go offline (either using airplane-mode or join a terrible mobile provider like I have).</li> <li>Click a link to another article.</li> <li>You should be told the page failed to load (this will also appear if the page just takes a while to load).</li> <li>Agree to notifications.</li> <li>Close the browser.</li> <li>Go online</li> <li>You get notified when the article is downloaded, cached, and ready to view!</li> </ol>
<p>Using this pattern, the user can put their phone in their pocket and get on with their life, knowing the phone will alert them when it's fetched want they wanted.</p>
<h2 data-text="Permissions">Permissions</h2>
<p>The demos I've shown use <a href="https://notifications.spec.whatwg.org/">web notifications</a>, which require permission, but background sync itself does not.</p>
<p>Sync events will often complete while the user has a page open to the site, so requiring user permission would be a poor experience. Instead, we're limiting when syncs can be registered and triggered to prevent abuse. For example:</p>
<ul> <li>You can only register for a sync event when the user has a window open to the site.</li> <li>The event execution time is capped, so you can't use them to ping a server every x seconds, mine bitcoins or whatever.</li> </ul>
<p>Of course, these restrictions may loosen or tighten based on real-world usage.</p>
<h2 data-text="Progressive enhancement">Progressive enhancement</h2>
<p>It'll be a while before all browsers support background sync, especially as Safari and Edge don't yet support service workers. But progressive enhancement helps here:</p>
<pre><code>if ('serviceWorker' in navigator &amp;&amp; 'SyncManager' in window) {
  navigator.serviceWorker.ready.then(function(reg) {
    return reg.sync.register('tag-name');
  }).catch(function() {
    // system was unable to register for a sync,
    // this could be an OS-level restriction
    postDataFromThePage();
  });
} else {
  // serviceworker/sync not supported
  postDataFromThePage();
}
</code></pre>
<p>If service workers or background sync aren't available, just post the content from the page as you'd do today.</p>
<p>It's worth using background sync even if the user appears to have good connectivity, as it protects you against navigations and tab closures during data send.</p>
<h2 data-text="The future">The future</h2>
<p>We aim to ship background sync to a stable version of Chrome in the first half of 2016, while working on a variant, "periodic background sync." With periodic background sync, you could request an event restricted by time interval, battery state and network state. This would require user permission, of course, and it will also be up to the browser for when and how often these events fire. In other words, a news site could request to sync every hour, but the browser may know you only read that site at 07:00, so the sync would fire daily at 06:50. This idea is a little further off than one-off syncing, but it's coming.</p>
<p>Bit by bit we're bringing successful patterns from Android and iOS onto the web, while still retaining what makes the web great!</p>
<figure></figure><figure></figure>
