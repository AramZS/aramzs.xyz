---
author: Amanda Silberling
cover_image: 'https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=1200,675'
date: '2025-08-07T02:29:33.202Z'
dateFolder: 2025/08/06
description: >-
  The newly launched app, now trending on Apple's App Store, contains at least
  one major security flaw that exposes the private information of its users,
  including their uploaded selfies and government-issued IDs.
isBasedOn: >-
  https://techcrunch.com/2025/08/06/a-rival-tea-app-for-men-is-leaking-its-users-personal-data-and-drivers-licenses/
link: >-
  https://techcrunch.com/2025/08/06/a-rival-tea-app-for-men-is-leaking-its-users-personal-data-and-drivers-licenses/
slug: >-
  2025-08-06-httpstechcrunchcom20250806a-rival-tea-app-for-men-is-leaking-its-users-personal-data-and-drivers-licenses
tags:
  - tech
  - privacy
title: >-
  A rival Tea app for men is leaking its users’ personal data and driver’s
  licenses
---
<figure><img alt="a screenshot of the TeaOnHer logo on an orange-ish background." sizes="(max-width: 1024px) 100vw, 1024px" src="https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg" srcset="https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg 2000w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=150,84 150w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=300,169 300w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=768,432 768w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=680,383 680w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=1200,675 1200w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=1280,720 1280w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=430,242 430w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=720,405 720w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=900,506 900w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=800,450 800w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=1536,864 1536w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=668,375 668w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=1097,617 1097w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=708,398 708w, https://techcrunch.com/wp-content/uploads/2025/08/teaonher.jpg?resize=50,28 50w"/><figcaption>Image Credits:TeaOnHer (modified)</figcaption></figure>
<p>TeaOnHer, an app designed for men to share photos and information about women they have supposedly dated, has exposed users’ personal information, including government IDs and selfies, TechCrunch can confirm.</p>
<p>The app, which launched on the Apple App Store earlier this week, is a response to another viral app Tea that allows women to post about the men they date. Tea is advertised as a women’s safety app with more than six million users that is similar to “<a href="https://www.washingtonpost.com/technology/2024/03/02/dating-same-guy-facebook-groups/">Are we dating the same guy?</a>” Facebook networks. However, the app is controversial, since many of the claims that women post cannot be verified.</p>
<p>The backlash surrounding Tea escalated last week, after 404 Media reported 4chan users retaliated by <a href="https://www.404media.co/women-dating-safety-app-tea-breached-users-ids-posted-to-4chan/">discovering a publicly exposed database</a> belonging to the app, which <a href="https://techcrunch.com/2025/07/26/dating-safety-app-tea-breached-exposing-72000-user-images/">revealed</a> over 72,000 images, including thousands of selfies and photo IDs submitted for account verification. A <a href="https://www.404media.co/a-second-tea-breach-reveals-users-dms-about-abortions-and-cheating/">subsequent hack</a> exposed more than one million private messages sent over the app, prompting the app to <a href="https://techcrunch.com/2025/07/29/tea-apps-data-breach-gets-much-worse-exposing-over-a-million-private-messages/">disable</a> its messaging feature.</p>
<p>TeaOnHer, which is now ranked #2 among Lifestyle apps on iOS, appears to be a direct rebuttal to the Tea app, even copying the language from Tea’s App Store description in its own listing.</p>
<p>But like the app it sought to emulate, TeaOnHer contains security flaws of its own.</p>
<p>TechCrunch has found at least one security flaw that allows anyone access to data belonging to TeaOnHer app users, including their usernames and associated email addresses, as well as driver’s licenses and selfies that users uploaded to TeaOnHer. Images of these driver’s licenses are publicly accessible web addresses, allowing anyone with the links to access them using their web browser.</p>
<p>In one case, TechCrunch saw a list of posts shared on TeaOnHer appended with each user’s email address, display name, and self-reported location.</p>
<p>TechCrunch is withholding some of the details of the bugs so as to not help malicious actors access anyone’s data. The app’s maker did not respond to emails from TechCrunch asking who we can report the flaws to. As such, TechCrunch is publishing this report with limited details of the issue, given the app’s current popularity and the risk faced with using the app.</p>
<p>TeaOnHer was uploaded to the iOS App Store by a developer named Newville Media Corporation. According to LinkedIn, the founder and CEO of this company is Xavier Lampkin.</p>
<p>TechCrunch identified at least one TeaOnHer record associated with Lampkin’s own data.</p>
<p>The security lapse will likely affect any user who signed up or shared identity documents with the app. The bug also exposes the number of users the TeaOnHer app has, which is about 53,000 users at the time of publication.</p>
<p>TechCrunch also identified a potential second security issue, in which an email address and plaintext password belonging to the app’s creator, Lampkin, was left exposed on the server. The credentials appear to grant access to the app’s “admin” panel. TechCrunch did not use the credentials as doing so would be unlawful, but highlights the risks of inadvertently leaving admin credentials exposed to the web.</p>
<p>Along with its security flaws, the content portrayed within TeaOnHer is troubling in itself. While the app requests IDs and selfies from its users to verify their identities — a process that is not automatic — users can access a “guest” view of the app without signing in.</p>
<p>Immediately upon opening “guest” view, TechCrunch saw several images of the same naked woman, posted under different names in a form of spam. It is not clear if this woman consented to this photo being shared. Other posts share the photos and names of women, alongside comments calling them “easy,” or accusing them of spreading sexually transmitted infections.</p>
<p>Across all free apps, TeaOnHer is ranked #17, higher than apps like Instagram, Netflix, Uber, and Spotify. Tea is currently ranked #2.</p>
