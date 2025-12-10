---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A2rltjvii4o7fjtsb6kfe4qe6/3m5jrj5s5vs2q/3m6zrw6k2bs2p/opengraph-image?6815eb61f733905a
date: '2025-12-03T05:56:21.780Z'
dateFolder: 2025/12/03
description: Claimed end-to-end privacy doesn’t fully conceal your rear-end data
isBasedOn: 'https://varlogsimon.leaflet.pub/3m6zrw6k2bs2p'
link: 'https://varlogsimon.leaflet.pub/3m6zrw6k2bs2p'
slug: 2025-12-03-httpsvarlogsimonleafletpub3m6zrw6k2bs2p
tags:
  - tech
  - privacy
title: >-
  Kohler Can Access Data and Pictures from Toilet Camera It Describes as
  “End-to-End Encrypted”
---
<p>In October Kohler launched <a href="https://www.kohlerhealth.com/dekoda/">Dekota</a>, a $600-plus-monthly-subscription device that attaches to the rim of your toilet and collects images and data from inside, promising to track and provide insights on gut health, hydration, and more. To allay the obvious privacy concerns, the company emphasizes the sensors are only pointed down, into the bowl, and assures potential buyers that the data collected by the device and app are protected with "end-to-end encryption”.</p>
<figure><img src="https://varlogsimon.leaflet.pub/api/atproto_images?did=did:plc:2rltjvii4o7fjtsb6kfe4qe6&amp;cid=bafkreihgb7sosbpyorzc7vixcngmxnwc6w43yj2ix5fynlbkeeyguwddtu"/></figure>
<p>Kohler Health’s <a href="https://www.kohlerhealth.com/">homepage</a>, the page for the <a href="https://www.kohlerhealth.com/kohler-health-app/">Kohler Health App</a>, and a <a href="https://www.kohlerhealth.com/support/privacy/how-kohler-health-keeps-my-data-private/">support page</a> all use the term “end-to-end encryption” to describe the protection the app provides for data. <a href="https://www.cnet.com/health/medical/kohlers-tiny-toilet-camera-analyzes-the-contents-and-reports-back-to-you/">Many</a> <a href="https://www.theverge.com/news/802727/kohler-health-dekoda-toilet-camera-optical-sensors">media</a> <a href="https://techcrunch.com/2025/10/19/kohler-unveils-a-camera-for-your-toilet/">outlets</a> included the claim in their articles covering the launch of the product.</p>
<p>However, responses from the company make it clear that—contrary to common understanding of the term—Kohler is able to access data collected by the device and associated application. Additionally, the company states that the data collected by the device and app may be used to train AI models.</p>
<h3 data-index="4">What is End-to-End Encryption?</h3>
<p>"End-to-end encryption", or E2EE, is a method of securing data that ensures only the sender and their chosen recipient are able to view it. Correctly implemented, it prevents other parties, including the developer of the application, from accessing the protected data. E2EE is best known for its use in messaging applications like WhatsApp, iMessage, and Signal, where it allows users to communicate securely and privately without worrying about their messages being seen by prying eyes at the app developers, internet service providers, and even governments.</p>
<p>E2EE also provides an additional layer of protection if the servers of the application developer are compromised by an attacker. Any data stored on those servers will be meaningless to the attacker, which can significantly reduce the impact of a breach. For a more detailed look at E2EE, see <a href="https://ssd.eff.org/module/deep-dive-end-end-encryption-how-do-public-key-encryption-systems-work">A Deep Dive on End-to-End Encryption</a> from the Electronic Frontier Foundation.</p>
<h3 data-index="7">What is Kohler Doing?</h3>
<p>The initial issue with Kohler using the term “end-to-end encryption” is that it’s not obvious how it could apply to their product. The term is generally used for applications that allow some kind of communication between users, and Kohler Health doesn’t have any user-to-user sharing features. So while one “end” would be the user, it’s not clear what the other end would be.</p>
<p>I thought Kohler might actually have implemented a related data protection method known as “client-side encryption”, used by services like Apple’s iCloud and the password manager 1Password. This technique allows an application to back up a user’s data to the developers servers, or synchronize data between multiple devices owned by a user, without allowing anyone but the user to access the data.</p>
<p>But emails exchanged with Kohler’s privacy contact clarified that the other “end” that can decrypt the data is Kohler themselves: “User data is encrypted at rest, when it’s stored on the user's mobile phone, toilet attachment, and on our systems. Data in transit is also encrypted end-to-end, as it travels between the user's devices and our systems, where it is decrypted and processed to provide our service.”</p>
<p>They additionally told me “We have designed our systems and processes to protect identifiable images from access by Kohler Health employees through a combination of data encryption, technical safeguards, and governance controls.”</p>
<p>What Kohler is referring to as E2EE here is simply HTTPS encryption between the app and the server, something that has been basic security practice for two decades now, plus encryption at rest.</p>
<h3 data-index="13">How is Kohler Using the Data?</h3>
<p>If Kohler can access the data stored on its servers, what are they doing with it? While I don’t have a precise answer, there are indications they’re using it for purposes beyond simply providing a service to the user. This may include training AI models.</p>
<p>In response to my question about their use of E2EE, Kohler told me “our algorithms are trained on de-identified data only.” When signing up for an account on the app, the user is prompted to allow Kolher to use the data to "research, develop, and improve its products and technology, and to de-identify [the user’s] data for lawful purposes.”</p>
<figure><img src="https://varlogsimon.leaflet.pub/api/atproto_images?did=did:plc:2rltjvii4o7fjtsb6kfe4qe6&amp;cid=bafkreifdn5v3tclg7qm74fm7ce2lt3oiwtfcg6kvctsl6lm5tumx2lypxi"/></figure>
<p>And the <a href="https://www.kohlerhealth.com/privacy-policy/">privacy policy</a> states data may be used “To create aggregated, de-identified and/or anonymized data, which we may use and share with third parties for our lawful business purposes, including to analyze and improve the Kohler Health Platform and our other products and services, to promote our business, and to train our AI and machine learning models.”</p>
