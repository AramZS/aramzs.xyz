---
author: Zack Whittaker
cover_image: >-
  https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=1200,675
date: '2026-08-04T20:28:27.088Z'
dateFolder: 2026/08/04
description: >-
  Developers may not realize they are sharing their users' location data with
  advertisers, per new research.
isBasedOn: >-
  https://techcrunch.com/2026/08/04/android-app-developers-may-be-unwittingly-sharing-their-users-location-data-with-advertisers/?utm_source=dlvr.it&utm_medium=bluesky
link: >-
  https://techcrunch.com/2026/08/04/android-app-developers-may-be-unwittingly-sharing-their-users-location-data-with-advertisers/?utm_source=dlvr.it&utm_medium=bluesky
slug: >-
  2026-08-04-httpstechcrunchcom20260804android-app-developers-may-be-unwittingly-sharing-their-users-location-data-with-advertisersutmsourcedlvritandutmmediumbluesky
tags:
  - tech
  - privacy
  - end the app
title: >-
  Android app developers may be unwittingly sharing their users’ location data
  with advertisers
---
<figure><img alt="eyes on a blue background with a phone featured prominently with location markers falling out of it, suggestive of a leak" sizes="(max-width: 1024px) 100vw, 1024px" src="https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg" srcset="https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg 3200w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=150,84 150w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=300,169 300w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=768,432 768w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=680,383 680w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=1200,675 1200w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=1280,720 1280w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=430,242 430w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=720,405 720w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=900,506 900w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=800,450 800w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=1536,864 1536w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=2048,1152 2048w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=668,375 668w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=1097,617 1097w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=708,398 708w, https://techcrunch.com/wp-content/uploads/2021/10/stalkerware-leaked-location-2.jpg?resize=50,28 50w"/></figure>
<p>For many apps, granting permission to access your device’s precise location makes sense. Your favorite weather app needs to know where you are to get the day’s forecast, or your go-to fitness app for tracking your running route.</p>
<p>But some apps are also inadvertently sharing their users’ location data with third-parties, including advertisers and data brokers, because the app developer may not know that this data-sharing setting is enabled by default.</p>
<p>New <a href="https://www.eff.org/deeplinks/2026/07/developers-beware-ad-libraries-betray-your-users-location-privacy">findings by the Electronic Frontier Foundation</a> aim to warn app developers that some of the third-party code they place in their apps may also collect their users’ location data when they grant permission to the app.</p>
<p>Unless the developer actively switches off the collection, the code snippet (known as software development kits or SDKs) will inherit the app’s permissions and collect the user’s precise location data.</p>
<p>The EFF says many developers might not realize that they are sharing their users’ location data with third-parties by default, and urged app makers to disable unnecessary data collection whenever possible.</p>
<p>While advertising SDKs are promoted as a way for developers to monetize their app, the tradeoff is that the users’ location histories get fed to data brokers, who monetize that information which then gets sold to militaries, governments, and intelligence agencies, <a href="https://techcrunch.com/2026/03/18/fbi-is-buying-location-data-to-track-us-citizens-kash-patel-wyden/">like the FBI</a>. The data is also a security and privacy risk if <a href="https://techcrunch.com/2025/01/13/gravy-analytics-data-broker-breach-trove-of-location-data-threatens-privacy-millions/">it gets hacked or stolen</a>, which <a href="https://techcrunch.com/2024/10/14/national-public-data-the-hacked-data-broker-that-lost-millions-of-social-security-numbers-and-more-files-for-bankruptcy/">some data brokers</a> have experienced.</p>
<p>Among the Android apps that the EFF identified that were quietly sharing users’ location data included two that had been downloaded a combined 60 million times to date.</p>
<p>The EFF ran its tests by analyzing the apps’ network traffic and seeing which services are receiving the users’ location data.</p>
<p>Bill Budington, a senior staff technologist at the EFF, told TechCrunch that the SDKs they examined account for a small percentage of the broader advertising ecosystem but nevertheless claim to reach billions of users over tens of thousands of apps. That gives some sense of the scale of this type of location data collection.</p>
<p>The EFF’s report said that there are “no SDK-specific location permissions,” meaning that once the user allows their location data to be shared with the app, their location data is also shared with advertisers. The entities offering those SDKs are generally commercially incentivized to get their customers to collect more data.</p>
<p>“App-level location permissions alone cannot signal meaningful consent to location collection and sharing by third-party advertising SDKs,” wrote the EFF. “Advertising SDKs should not make sharing personal data the default, especially for data as sensitive as a person’s precise location.”</p>
