---
author: Daniel Mathews
cover_image: null
date: '2025-11-25T21:30:19.228Z'
dateFolder: 2025/11/25
description: >-
  A specification for building mini apps that work with QR codes and open web
  standards.
isBasedOn: 'https://dmathewwws.com/antler-an-irl-browser'
link: 'https://dmathewwws.com/antler-an-irl-browser'
slug: 2025-11-25-httpsdmathewwwscomantler-an-irl-browser
tags:
  - code
  - tech
title: Antler - An IRL Browser
---
<p>Hey! I launched an app called <a href="https://antlerbrowser.com">Antler</a>.</p>
<p>Antler started as a simple idea: A local internet just for my neighbourhood. However, the idea morphed into something a bit more practical: an open-source tool that helps developers build lightweight apps when <strong>you know your users will be at a specific location.</strong></p>
<p>Here is a demo of Antler in action, I scan a QR code and immediately get checked into my co-working space.</p>
<figure><video autoplay="" controls="" loop="" muted="" src="https://ax0.taddy.org/dmathewwws/antler-demo.mp4" width="100%"></video></figure>
<p>However, that checkin app is just one example of a lightweight mini app, any developer can build their own mini app. For example, <a href="https://drawing.dmathewwws.com">draw-on-my-phone</a> is a game where a group of friends scan a QR code to enter a game room and take turns drawing on each other's phones (similar to Telestrations or Garlic Phone)</p>
<p>In both cases, a user scans a QR code and instantly gets logged in. Moreover, no servers were needed to make this happen.</p>
<p>Antler is an iOS or Android app that users download. However, what makes Antler interesting is that it uses an open-specification called the <a href="https://antlerbrowser.com/irl-browser-specification">IRL Browser Specification</a>. This spec is an attempt to answer the question: <strong>Can we build a mini app platform on open web standards?</strong></p>
<p>In a future where this specification is adopted, you can scan a QR at a coffee shop, concert, or conference → You instantly access the experience. No downloads. No signups.</p>
<h2>WeChat Mini Apps</h2>
<p>Currently, there are developer platforms that make it easier for developers to build lightweight mini apps:</p>
<ul> <li>WeChat Mini Apps</li> <li>WhatsApp Business / WhatsApp Business API</li> <li>iOS App Clips</li> </ul>
<p>What makes it easier to build on these platforms is they take care of auth, payments and help make it easier to host / distribute your app.</p>
<p>Let's focus on WeChat. You might know it as a popular messaging app in China similar to WhatsApp or Telegram. But it's also called a super app because of all the useful mini apps you can use inside it.</p>
<p>For example, if you wanted to rent a bike in Shanghai, just open WeChat and scan the QR code on a bike to unlock and start riding. Under the hood, the bike share company’s mini app gets downloaded and runs inside WeChat, your WeChat id is used for registration/verification with the bike sharing app and WeChat pay is used for payment after the ride is complete.</p>
<figure><img alt="wechat-bike-share.png" src="https://ax0.taddy.org/dmathewwws/wechat-bike-share.png"/></figure>
<p>WeChat Mini apps proved out a really important use case in the Chinese market: You don’t always need a native app. Sometimes the better experience is to just scan a QR code.</p>
<h2>How Antler Works</h2>
<p>Antler’s goal is to give the same great UX experience from WeChat mini apps, using regular QR codes + open web standards + an open specification used for communication. What makes Antler unique to WeChat is there is no central Antler server that is used for auth. This is how it works:</p>
<figure><img alt="antler-how-it-works.png" src="https://ax0.taddy.org/dmathewwws/antler-how-it-works.png"/></figure>
<p>When a user downloads Antler, they create a profile that is stored locally on their device.</p>
<p>A profile contains:</p>
<ul> <li>a <a href="https://www.w3.org/TR/did-1.0/">DID</a> (a W3C standard for identity) - a public key</li> <li>a private key</li> <li>a name</li> <li>link to socials (optional)</li> <li>an avatar (optional)</li> </ul>
<p>When a user scans a QR code, Antler opens your website inside a WebView and injects a <code>window.irlBrowser</code> object.</p>
<p>The <code>window</code> object is available on all browsers, and as a developer it gives you access to useful browser features. For example, <code>window.location</code> lets you know the current url you are visiting in the browser. We made up a new property called <code>window.irlBrowser</code> and use it as an interface to communicate between the Antler app and your website.</p>
<p>Your website calls <code>window.irlBrowser.getProfileDetails()</code> and gets back cryptographically signed profile data as a JWT.</p>
<pre><code>{
  "iss": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
  "aud": "https://yourdomain.com",
  "iat": 1728393600,
  "exp": 1728397200,
  "type": "irl:profile:details",
  "data": 
    {
      "did": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
      "name": "Danny Mathews",
      "socials": [{ "platform": "INSTAGRAM", "handle": "dmathewwws" }]
    }
}
</code></pre>
<p>You should decode and verify that the public key in the <code>iss</code> field was used to sign this data. This way you know only someone with the private key for this DID could have sent it.</p>
<p>And voila, the user is instantly logged into your website. Profile details that were stored locally on the user’s device are shared to your website and no servers were involved!</p>
<figure><img alt="wechat-antler-comparison.png" src="https://ax0.taddy.org/dmathewwws/wechat-antler-comparison.png"/></figure>
<h2>Open Source</h2>
<p>Antler is <a href="https://github.com/antler-browser/antler">open-source</a>. It's a simple React Native app that stores user profiles and public / private key pairs.</p>
<p>Antler uses an <a href="https://antlerbrowser.com/irl-browser-standard.html">open specification</a> to pass data between your website and the mobile app. These are the five functions that are defined in the spec.</p>
<pre><code>interface IRLBrowser {
  // Get profile details (name, socials)
  getProfileDetails(): Promise&lt;string&gt;;
  
  // Get avatar as base64-encoded string
  getAvatar(): Promise&lt;string | null&gt;;
  
  // Get details about the IRL Browser
  getBrowserDetails(): BrowserDetails;
  
  // Request additional permissions (in the future)
  requestPermission(permission: string): Promise&lt;boolean&gt;;
  
  // Close the WebView (return to QR scanner)
  close(): void;
}
</code></pre>
<p>Being an open specification means anyone can create an alternative to Antler.</p>
<p>It also means if you are a developer, and:</p>
<ul> <li>Want to add instant login via a QR code to your website, you know you are not locked into Antler or a closed platform.</li> <li>Want to integrate mini apps into your current app. All the mini apps that work with Antler will work inside your app (just follow the spec).</li> </ul>
<h3>Do your users have to download an app?</h3>
<p>Your users don’t actually need to download Antler or any mobile app. Here is a client side package <a href="https://github.com/antler-browser/irl-browser-onboarding"><code>irl-browser-onboarding</code></a> that you can add to your website that takes advantage of Antler being built on an open specification to create a Temporary / One Time account.</p>
<p>The package checks if your mini app is being viewed inside a IRL Browser, and if not, creates an onboarding flow where a user enters their name, social links, and avatar and injects the same <code>window.irlBrowser</code> API that Antler or any IRL Browser would. This means if users want they can use Antler and get the immediate login UX and a persistent profile, or they can create a one-time / temporary profile if they don’t.</p>
<h2>Example Apps</h2>
<p>My hope with IRL Browser mini apps is that it encourages developers like me to build apps that we would have never thought would be feasible to build a native app for ie) building an app for my social clubs, local community events, venues, pop-ups, game nights with friends, or any lightweight gathering where people are physically present.</p>
<p>Here are some example use cases:</p>
<ul> <li>IRL Games with friends </li> <li>Business Applications:<ul> <li>Loyalty Program for a coffee shop (you shouldn’t have to download a different app for every coffee shop)</li> </ul> </li> <li>Interactive Arts Projects</li> <li>Community Building / Neighbourhood Projects<ul> <li>ex) Relational Tech Project: <a href="https://relationaltechproject.org/remix">https://relationaltechproject.org/remix</a></li> </ul> </li> <li>Hopefully even more</li> </ul>
<h2>Branding</h2>
<p>An interesting idea that came up while building this was to create a visual cue so a user knows if you scan this QR code it offers instant login. Antlers was what I came up with, and it inspired the app's name.</p>
<figure><img alt="antler-branding.png" src="https://ax0.taddy.org/dmathewwws/antler-branding.png"/></figure>
<h2>Future Roadmap For Antler</h2>
<ul> <li>Add NFC (doesn't have to be just QR codes)</li> <li>Add Incognito Mode</li> <li>Add more DID Methods, Add Verifiable Credentials.</li> <li>Pass through more native capabilities to mini apps (with explicit user permission)<ul> <li>Location</li> <li>Push Notifications</li> </ul> </li> </ul>
<h2><strong>Useful Resources</strong></h2>
<p><a href="https://scuttlebutt.nz/docs/protocol/">Scuttlebutt</a> - If you care about the original idea of Antler, having a local internet just for your neighbourhood, the Scuttlebutt project is a really fun way I've seen people try to achieve this.</p>
<p><a href="https://feathers.dev/auth/docs">Feathers Auth</a>: One of the inspirations behind Antler. The first time I saw a working demo of local-first auth was this <a href="https://github.com/DWebYVR/featherschat">local-first chat app</a> built by <a href="https://bsky.app/profile/daffl.xyz">David</a>.</p>
<p><a href="https://antlerbrowser.com/irl-browser-specification">IRL Browser Specification</a> - The specification for how IRL Browsers communicate with mini-apps through DIDs and JWTs.</p>
<p><a href="https://www.w3.org/TR/did-1.0/">DID</a> - W3C standard for identities. Right now Antler just supports the key method, but there are other methods we could integrate with.</p>
<p><a href="https://www.w3.org/TR/vc-data-model-2.0/">Verifiable Credentials</a> - W3C standard that works with DIDs. It allows you to verify something is true without revealing unnecessary data ex) you could prove you own a ticket to a concert</p>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/code.html">WeChat MiniApps Docs</a> (in Chinese - but your browser can translate it for you)</p>
<p><a href="https://www.w3.org/TR/mini-app-white-paper/">MiniApps Standard</a> - A W3C Draft by competitors of WeChat (Alibaba, Baidu, Xiaomi) to create a standard for MiniApps that isn't tied to WeChat. A great way to deep dive into the architecture behind MiniApps.</p>
<p><a href="https://www.wechatwiki.com/wp-content/uploads/wechat-mini-program-light-app-report-fabernovel-31ten.pdf">WeChat Strategy Doc</a>: A 326 page pdf on the different ways companies are using Mini Apps. It's a great resource.</p>
<p><a href="https://newsletter.theindianotes.com/p/whatsapp-owns-india">How Businesses in India Use WhatsApp</a>: A in-depth blog on how businesses in India use WhatsApp.</p>
<p><a href="https://miniapps.farcaster.xyz">Farcaster Mini Apps</a> - Similar concept to WeChat MiniApps but integrated into the Farcaster social network. It implements a similar specification to IRL Browser ie) uses a WebView to communicate with mini apps and their app and mini apps are built with standard HTML, CSS, and Javascript.</p>
<p><a href="https://webxdc.org/docs/get_started.html">WebXDC</a> - A similar specification to IRL Browser as well. Focused on chat apps that want to integrate a mini app experience into their chat app.</p>
<h2>Next Steps</h2>
<p>Thanks for taking the time to read this deep dive!</p>
<p>If you are a developer and:</p>
<ul> <li>Want to explore what building a mini-app looks like, check out these <a href="https://antlerbrowser.com/open-source">open-source mini apps</a>.</li> <li>Have already built a chat / social app and want to integrate Mini Apps into your app, check out the <a href="https://antlerbrowser.com/irl-browser-specification">IRL Browser specification</a>.</li> </ul>
