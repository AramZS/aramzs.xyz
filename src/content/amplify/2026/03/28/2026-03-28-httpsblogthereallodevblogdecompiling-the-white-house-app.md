---
author: Thereallo
cover_image: >-
  https://thereallo.dev/api/og?title=I%20Decompiled%20the%20White%20House's%20New%20App&description=The%20official%20White%20House%20Android%20app%20has%20a%20cookie/paywall%20bypass%20injector,%20tracks%20your%20GPS%20every%204.5%20minutes,%20and%20loads%20JavaScript%20from%20some%20guy's%20GitHub%20Pages.
date: '2026-03-28T23:13:12.775Z'
dateFolder: 2026/03/28
description: >-
  The official White House Android app has a cookie/paywall bypass injector,
  tracks your GPS every 4.5 minutes, and loads JavaScript from some guy's GitHub
  Pages.
isBasedOn: 'https://blog.thereallo.dev/blog/decompiling-the-white-house-app'
link: 'https://blog.thereallo.dev/blog/decompiling-the-white-house-app'
slug: 2026-03-28-httpsblogthereallodevblogdecompiling-the-white-house-app
tags:
  - tech
  - infosec
  - politics
title: I Decompiled the White House's New App
---
<p>The White House released an app on the App Store and Google Play. <a href="https://www.whitehouse.gov/releases/2026/03/new-white-house-app-delivers-unparalleled-access-to-the-trump-administration/">They posted a blog about it.</a> "Unparalleled access to the Trump Administration."</p>
<p>It took a few minutes to pull the APKs with ADB, and threw them into JADX.</p>
<p>Here is everything I found.</p>
<h2>What Is This App?</h2>
<p>It's a React Native app built with Expo (SDK 54), running on the Hermes JavaScript engine. The backend is WordPress with a custom REST API. The app was built by an entity called "forty-five-press" according to the Expo config.</p>
<p>The actual app logic is compiled into a 5.5 MB Hermes bytecode bundle. The native Java side is just a thin wrapper.</p>
<p>Version 47.0.1. Build 20. Hermes enabled. New Architecture enabled. Nothing weird here. Let's keep going.</p>
<h2>Expo Config</h2>
<p>Two things stand out here. First, there's a plugin called <code>withNoLocation</code>. Second, there's a plugin called <code>withStripPermissions</code>. Remember these. They become relevant very soon.</p>
<p>OTA updates are disabled. The Expo update infrastructure is compiled in but dormant.</p>
<h2>What the App Actually Does</h2>
<p>I extracted every string from the Hermes bytecode bundle and filtered for URLs and API endpoints. The app's content comes from a WordPress REST API at whitehouse.gov with a custom <code>whitehouse/v1</code> namespace.</p>
<p>Here are the endpoints:</p>
<table><tr><th>Endpoint</th><th>What It Serves</th></tr><tbody><tr><td><code>/wp-json/whitehouse/v1/home</code></td><td>Home screen</td></tr><tr><td><code>/wp-json/whitehouse/v1/news/articles</code></td><td>News articles</td></tr><tr><td><code>/wp-json/whitehouse/v1/wire</code></td><td>"The Wire" news feed</td></tr><tr><td><code>/wp-json/whitehouse/v1/live</code></td><td>Live streams</td></tr><tr><td><code>/wp-json/whitehouse/v1/galleries</code></td><td>Photo galleries</td></tr><tr><td><code>/wp-json/whitehouse/v1/issues</code></td><td>Policy issues</td></tr><tr><td><code>/wp-json/whitehouse/v1/priorities</code></td><td>Priorities</td></tr><tr><td><code>/wp-json/whitehouse/v1/achievements</code></td><td>Achievements</td></tr><tr><td><code>/wp-json/whitehouse/v1/affordability</code></td><td>Drug pricing</td></tr><tr><td><code>/wp-json/whitehouse/v1/media-bias</code></td><td>"Media Bias" section</td></tr><tr><td><code>/wp-json/whitehouse/v1/social/x</code></td><td>X/Twitter feed proxy</td></tr></tbody></table>
<p>Other hardcoded strings from the bundle: <code>"THE TRUMP EFFECT"</code>, <code>"Greatest President Ever!"</code> (lol), <code>"Text President Trump"</code>, <code>"Send a text message to President Trump at 45470"</code>, <code>"Visit TrumpRx.gov"</code>, <code>"Visit TrumpAccounts.gov"</code>.</p>
<p>There's also a direct link to <code>https://www.ice.gov/webform/ice-tip-form</code>. The ICE tip reporting form. In a news app.</p>
<p>It's a content portal. News, live streams, galleries, policy pages, social media embeds, and promotional material for administration initiatives. All powered by WordPress.</p>
<p>Now let's look at what else it does.</p>
<h2>Consent/Paywall Bypass Injector</h2>
<p>The app has a WebView for opening external links. Every time a page loads in this WebView, the app injects a JavaScript snippet. I found it in the Hermes bytecode string table:</p>
<ul><li>Cookie banners</li><li>GDPR consent dialogs</li><li>OneTrust popups</li><li>Privacy banners</li><li>Login walls</li><li>Signup walls</li><li>Upsell prompts</li><li>Paywall elements</li><li>CMP (Consent Management Platform) boxes</li></ul>
<p>It forces <code>body { overflow: auto !important }</code> to re-enable scrolling on pages where consent dialogs lock the scroll. Then it sets up a MutationObserver to continuously nuke any consent elements that get dynamically added.</p>
<p>An official United States government app is injecting CSS and JavaScript into third-party websites to strip away their cookie consent dialogs, GDPR banners, login gates, and paywalls.</p>
<p>The native side confirms this is the <code>injectedJavaScript</code> prop on the React Native WebView:</p>
<p>Every page load in the in-app browser triggers this. It wraps the injection in an IIFE and runs it via Android's <code>evaluateJavascript()</code>.</p>
<h2>Location Tracking Infrastructure</h2>
<p>Remember <code>withNoLocation</code> from the Expo config? The plugin that's supposed to strip location? Yeah. The OneSignal SDK's native location tracking code is fully compiled into the APK.</p>
<p>To be clear about what activates this: the tracking doesn't start silently. There are three gates. The <code>LocationManager</code> checks all of them before the fused location API ever fires.</p>
<p>First, the <code>_isShared</code> flag. It's read from SharedPreferences on init and defaults to <code>false</code>. The JavaScript layer can flip it on with <code>setLocationShared(true)</code>. The Hermes string table confirms both <code>setLocationShared</code> and <code>isLocationShared</code> are referenced in the app's JS bundle, so the app has the ability to toggle this.</p>
<p>Second, the user has to grant the Android runtime location permission. The location permissions aren't declared in the AndroidManifest but requested at runtime. The Google Play Store listing confirms the app asks for "access precise location only in the foreground" and "access approximate location only in the foreground."</p>
<p>Third, the <code>start()</code> method only proceeds if the device actually has a location provider (GMS or HMS).</p>
<p>If all three gates pass, here's what runs. The fused location API requests GPS at the intervals defined above:</p>
<p>This gets called on both <code>onFocus()</code> and <code>onUnfocused()</code>, dynamically switching between the 4.5-minute foreground interval and the 9.5-minute background interval.</p>
<p>When a location update comes in, it feeds into the <code>LocationCapturer</code>:</p>
<p>Latitude, longitude, accuracy, timestamp, whether the app was in the foreground or background, and whether it was fine (GPS) or coarse (network). All of it gets written into OneSignal's <code>PropertiesModel</code>, which syncs to their backend.</p>
<p>There's also a background service that keeps capturing location even when the app isn't active:</p>
<p>So the tracking isn't unconditionally active. But the entire pipeline including permission strings, interval constants, fused location requests, capture logic, background scheduling, and the sync to OneSignal's API, all of them are fully compiled in and one <code>setLocationShared(true)</code> call away from activating. The <code>withNoLocation</code> Expo plugin clearly did not strip any of this. Whether the JS layer currently calls <code>setLocationShared(true)</code> is something I can't determine from the native side alone, since the Hermes bytecode is compiled and the actual call site is buried in the 5.5 MB bundle. What I can say is that the infrastructure is there, ready to go, and the JS API to enable it is referenced in the bundle.</p>
<h2>OneSignal User Profiling</h2>
<p>OneSignal is doing a lot more than push notifications in this app. From the Hermes string table:</p>
<ul><li><code>addTag</code> - tag users for segmentation</li><li><code>addSms</code> - associate phone numbers with user profiles</li><li><code>addAliases</code> - cross-device user identification</li><li><code>addOutcomeWithValue</code> / <code>addUniqueOutcome</code> - track user actions and conversions</li><li><code>OneSignal-notificationClicked</code> - notification tap tracking</li><li><code>OneSignal-inAppMessageClicked</code> / <code>WillDisplay</code> / <code>DidDisplay</code> / <code>WillDismiss</code> / <code>DidDismiss</code> - full in-app message lifecycle tracking</li><li><code>OneSignal-permissionChanged</code> / <code>subscriptionChanged</code> / <code>userStateChanged</code> - state change tracking</li><li><code>setLocationShared</code> / <code>isLocationShared</code> - location toggle</li><li><code>setPrivacyConsentRequired</code> / <code>setPrivacyConsentGiven</code> - consent gating</li></ul>
<p>The local database tracks every notification received and whether it was opened or dismissed:</p>
<p>Your location, your notification interactions, your in-app message clicks, your phone number if you provide it, your tags, your state changes. All going to OneSignal's servers.</p>
<h2>Supply Chain: Loading JS From Some Guy's GitHub Pages</h2>
<p>The app embeds YouTube videos using the <code>react-native-youtube-iframe</code> library. This library loads its player HTML from:</p>
<p>That's a personal GitHub Pages site. If the <code>lonelycpp</code> GitHub account gets compromised, whoever controls it can serve arbitrary HTML and JavaScript to every user of this app, executing inside the WebView context.</p>
<p>This is a government app loading code from a random person's GitHub Pages.</p>
<figure><img alt="LonelyCpp's GitHub profile" src="https://wsrv.nl/?url=https://cdn.jsdelivr.net/gh/Thereallo1026/assets@main/assets/LonelyCpp_GitHub.png&amp;output=webp"/><figcaption>LonelyCpp's GitHub profile</figcaption></figure>
<h2>Supply Chain: Elfsight Widget Platform</h2>
<p>The app loads third-party JavaScript from Elfsight to embed social media feeds:</p>
<p>Elfsight is a commercial SaaS widget company. Their JavaScript runs inside the app's WebView with no sandboxing. Whatever tracking Elfsight does, it does it here too. Their code can change at any time. The Elfsight widget ID <code>4a00611b-befa-466e-bab2-6e824a0a98a9</code> is hardcoded in an HTML embed.</p>
<h2>Supply Chain: Everything Else</h2>
<ul><li><strong>Mailchimp</strong> at <code>whitehouse.us10.list-manage.com/subscribe/post-json</code> handles email signups. User emails go to Mailchimp's infrastructure.</li><li><strong>Uploadcare</strong> at <code>ucarecdn.com</code> hosts content images via six hardcoded UUIDs.</li><li><strong>Truth Social</strong> has a hardcoded HTML embed with Trump's profile, avatar image URL from <code>static-assets-1.truthsocial.com</code>, and a "Follow on Truth Social" button.</li><li><strong>Facebook</strong> page plugin is loaded in an iframe via <code>facebook.com/plugins/page.php</code>.</li></ul>
<p>None of these are government-controlled infrastructure.</p>
<h2>No Certificate Pinning</h2>
<p>The app uses standard Android TrustManager for SSL with no custom certificate pinning. If you're on a network with a compromised CA (corporate proxies, public wifi with MITM, etc.), traffic between the app and its backends can be intercepted and read.</p>
<h2>Development Artifacts in Production</h2>
<p>A localhost URL made it into the production Hermes bundle:</p>
<p>A developer's local IP is hardcoded in the string resources:</p>
<p>The Expo development client (<code>expo-dev-client</code>, <code>expo-devlauncher</code>, <code>expo-devmenu</code>) is compiled into the release build. There's a <code>dev_menu_fab_icon.png</code> in the drawable resources. The Compose <code>PreviewActivity</code> is exported in the manifest, which is a development-only component that should not be in a production APK.</p>
<p>The AndroidManifest itself is pretty standard for a notification-heavy app:</p>
<p>Plus about 16 badge permissions for Samsung, HTC, Sony, Huawei, OPPO, and other launchers. These just let the app show notification badge counts. Not interesting.</p>
<p>The interesting permissions are the ones that aren't in the manifest but are hardcoded as runtime request strings in the OneSignal SDK, as covered above. Fine location. Coarse location. Background location.</p>
<p>The Google Play listing also mentions: "modify or delete the contents of your shared storage", "run foreground service", "this app can appear on top of other apps", "run at startup", "use fingerprint hardware", "use biometric hardware."</p>
<p>The file provider config is also worth mentioning:</p>
<h2>Full SDK List</h2>
<p>68+ libraries are compiled into this thing. The highlights:</p>
<table><tr><th>Category</th><th>Libraries</th></tr><tbody><tr><td>Framework</td><td>React Native, Expo SDK 54, Hermes JS engine</td></tr><tr><td>Push/Engagement</td><td>OneSignal, Firebase Cloud Messaging, Firebase Installations</td></tr><tr><td>Analytics/Telemetry</td><td>Firebase Analytics, Google Data Transport, OpenTelemetry</td></tr><tr><td>Networking</td><td>OkHttp 3, Apollo GraphQL, Okio</td></tr><tr><td>Images</td><td>Fresco, Glide, Coil 3, Uploadcare CDN</td></tr><tr><td>Video</td><td>ExoPlayer (Media3), Expo Video</td></tr><tr><td>ML</td><td>Google ML Kit Vision (barcode scanning), Barhopper model</td></tr><tr><td>Crypto</td><td>Bouncy Castle</td></tr><tr><td>Storage</td><td>Expo Secure Store, React Native Async Storage</td></tr><tr><td>WebView</td><td>React Native WebView (with the injection script)</td></tr><tr><td>DI</td><td>Koin</td></tr><tr><td>Serialization</td><td>GSON, Wire (Protocol Buffers)</td></tr><tr><td>License</td><td>PairIP license check (Google Play verification)</td></tr></tbody></table>
<p>25 native <code>.so</code> libraries in the arm64 split. The full Hermes engine, React Native core, Reanimated, gesture handler, SVG renderer, image pipeline, barcode scanner, and more.</p>
<ol><li><strong>Injects JavaScript into every website you open</strong> through its in-app browser to hide cookie consent dialogs, GDPR banners, login walls, signup walls, upsell prompts, and paywalls.</li><li><strong>Has a full GPS tracking pipeline compiled in</strong> that polls every 4.5 minutes in the foreground and 9.5 minutes in the background, syncing lat/lng/accuracy/timestamp to OneSignal's servers.</li><li><strong>Loads JavaScript from a random person's GitHub Pages site</strong> (<code>lonelycpp.github.io</code>) for YouTube embeds. If that account is compromised, arbitrary code runs in the app's WebView.</li><li><strong>Loads third-party JavaScript from Elfsight</strong> (<code>elfsightcdn.com/platform.js</code>) for social media widgets, with no sandboxing.</li><li><strong>Sends email addresses to Mailchimp</strong>, images are served from Uploadcare, and a Truth Social embed is hardcoded with static CDN URLs. None of this is government infrastructure.</li><li><strong>Has no certificate pinning.</strong> Standard Android trust management.</li><li><strong>Ships with dev artifacts in production.</strong> A localhost URL, a developer IP (<code>10.4.4.109</code>), the Expo dev client, and an exported Compose PreviewActivity.</li><li><strong>Profiles users extensively through OneSignal</strong> - tags, SMS numbers, cross-device aliases, outcome tracking, notification interaction logging, in-app message click tracking, and full user state observation.</li></ol>
<p>Is any of this illegal? Probably not. Is it what you'd expect from an official government app? Probably not either.</p>
