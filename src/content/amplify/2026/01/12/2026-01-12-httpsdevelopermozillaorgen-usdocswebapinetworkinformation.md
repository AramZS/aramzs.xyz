---
author: MDN Web Docs
cover_image: 'https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png'
date: '2026-01-12T17:37:12.901Z'
dateFolder: 2026/01/12
description: >-
  The NetworkInformation interface of the Network Information API provides
  information about the connection a device is using to communicate with the
  network and provides a means for scripts to be notified if the connection type
  changes.

  The NetworkInformation interface cannot be instantiated. It is instead
  accessed through the connection property of the Navigator interface or the
  WorkerNavigator interface.
isBasedOn: 'https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation'
link: 'https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation'
slug: 2026-01-12-httpsdevelopermozillaorgen-usdocswebapinetworkinformation
tags: []
title: NetworkInformation
---
<p><strong>Note:</strong> This feature is available in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a>.</p>
<p>The <strong><code>NetworkInformation</code></strong> interface of the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API">Network Information API</a> provides information about the connection a device is using to communicate with the network and provides a means for scripts to be notified if the connection type changes. The <code>NetworkInformation</code> interface cannot be instantiated. It is instead accessed through the <code>connection</code> property of the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator"><code>Navigator</code></a> interface or the <a href="https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator"><code>WorkerNavigator</code></a> interface.</p>
<figure><svg preserveaspectratio="xMinYMin meet" viewbox="-1 -1 650 42"><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget" style="text-decoration: none;">
<rect fill="#fff" height="25" stroke="#D4DDE4" stroke-width="2px" width="88" x="0" y="0"></rect>
<text fill="#4D4E53" font-size="10px" text-anchor="middle" x="44" y="16">
          EventTarget
        </text>
</a><line stroke="#D4DDE4" x1="88" x2="118" y1="14" y2="14"></line><polyline fill="#fff" points="88,14 98,9 98,19 88,14" stroke="#D4DDE4"></polyline><a aria-current="page" href="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation" style="text-decoration: none;">
<rect fill="#F4F7F8" height="25" stroke="#D4DDE4" stroke-width="2px" width="144" x="118" y="0"></rect>
<text fill="#4D4E53" font-size="10px" text-anchor="middle" x="190" y="16">
          NetworkInformation
        </text>
</a></svg></figure><p><em>This interface also inherits properties of its parent, <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget"><code>EventTarget</code></a>.</em></p>
<dl> <dd> <p>Returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds.</p> </dd> <dd> <p>Returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.</p> </dd> <dd> <p>Returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed round-trip time and downlink values.</p> </dd> <dd> <p>Returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.</p> </dd> <dd> <p>Returns <code>true</code> if the user has set a reduced data usage option on the user agent.</p> </dd> <dd> <p>Returns the type of connection a device is using to communicate with the network. It will be one of the following values:</p> <ul> <li><code>bluetooth</code></li> <li><code>cellular</code></li> <li><code>ethernet</code></li> <li><code>none</code></li> <li><code>wifi</code></li> <li><code>wimax</code></li> <li><code>other</code></li> <li><code>unknown</code></li> </ul> </dd> </dl>
<p><em>This interface also inherits methods of its parent, <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget"><code>EventTarget</code></a>.</em></p>
<dl> <dd> <p>The event that's fired when connection information changes.</p> </dd> </dl>
<ul> <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine">Online and offline events</a></li> </ul>
