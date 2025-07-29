---
author: Emanuel Maiberg
cover_image: 'https://www.404media.co/content/images/size/w1200/2025/07/tea-new-art.png'
date: '2025-07-28T17:36:18.324Z'
dateFolder: 2025/07/28
description: >-
  The more than one million messages obtained by 404 Media are as recent as last
  week, discuss incredibly sensitive topics, and make it trivial to unmask some
  anonymous Tea users.
isBasedOn: >-
  https://www.404media.co/a-second-tea-breach-reveals-users-dms-about-abortions-and-cheating/
link: >-
  https://www.404media.co/a-second-tea-breach-reveals-users-dms-about-abortions-and-cheating/
slug: >-
  2025-07-28-httpswww404mediacoa-second-tea-breach-reveals-users-dms-about-abortions-and-cheating
tags:
  - tech
  - infosec
  - privacy
title: A Second Tea Breach Reveals Users’ DMs About Abortions and Cheating
---
<figure><img alt="A Second Tea Breach Reveals Users’ DMs About Abortions and Cheating" data-ll-status="loaded" data-sizes="(max-width: 800px) 50vw,
                (max-width: 1170px) 60vw,
                1400px" data-src="/content/images/size/w2000/2025/07/tea-new-art.png" data-srcset="/content/images/size/w300/2025/07/tea-new-art.png 300w,
                /content/images/size/w600/2025/07/tea-new-art.png 600w,
                /content/images/size/w1000/2025/07/tea-new-art.png 1000w,
                /content/images/size/w2000/2025/07/tea-new-art.png 2000w" sizes="(max-width: 800px) 50vw,
                (max-width: 1170px) 60vw,
                1400px" src="https://www.404media.co/content/images/size/w2000/2025/07/tea-new-art.png" srcset="https://www.404media.co/content/images/size/w300/2025/07/tea-new-art.png%20300w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w600/2025/07/tea-new-art.png%20600w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w1000/2025/07/tea-new-art.png%201000w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w2000/2025/07/tea-new-art.png%202000w"/><figcaption>Image: Tea's website. </figcaption></figure>
<p>A second, major security issue with women’s dating safety app Tea has exposed much more user data than <a href="https://www.404media.co/women-dating-safety-app-tea-breached-users-ids-posted-to-4chan/"><u>the first breach we first reported last week</u></a>, with an independent security researcher now finding it was possible for hackers to access messages between users discussing abortions, cheating partners, and phone numbers they sent to one another. Despite Tea’s initial statement that “the incident involved a legacy data storage system containing information from over two years ago,” the second issue impacting a separate database is much more recent, affecting messages up until last week, according to the researcher’s findings that 404 Media verified. The researcher said they also found the ability to send a push notification to all of Tea’s users.</p>
<p>It’s hard to overstate how sensitive this data is and how it could put Tea’s users at risk if it fell into the wrong hands. When signing up, Tea encourages users to choose an anonymous screenname, but it was trivial for 404 Media to find the real world identities of some users given the nature of their messages, which Tea has led them to believe were private. Users could be easily found via their social media handles, phone numbers, and real names that they shared in these chats. These conversations also frequently make damning accusations against people who are also named in the private messages and in some cases are easy to identify.</p>
<p>It is unclear who else may have discovered the security issue and downloaded any data from the more recent database. Members of 4chan found the first exposed database last week and made tens of thousands of images of Tea users available for download. Tea told 404 Media it has contacted law enforcement.</p>
<p>Kasra Rahjerdi, <a href="https://www.kasra.codes/?ref=404media.co"><u>the researcher</u></a> who flagged the issue to 404 Media, sent a database of more than 1.1 million messages they said stretched from early 2023 to last week. Some of the private messages viewed by 404 Media include:</p>
<ul><li>One user tells another they just discovered their husband on the app being discussed. “I am his wife,” many of the messages say.</li><li>Another appears to show a woman contacting others about a man she is engaged to. </li><li>Multiple messages which appear to show women discussing their abortions.</li><li>Chat logs between women discovering they are dating the same man, exchanging information such as what car he drives for verification.</li></ul>
<p>To verify the data, 404 Media took usernames from the dump of messages and tried to create accounts on Tea with them. This was not possible because the usernames were already in use, indicating that the messages do belong to real Tea users.</p>
<p><b><strong>Do you know anything else about Tea or its data exposures? We would love to hear from you. Using a non-work device, you can message Emanuel securely on Signal at ‪(609) 678-3204‬. Otherwise, send him an email at emanuel@404media.co. You can Signal Joseph on joseph.404 or email joseph@404media.co</strong></b></p>
<p>Tea, which claims to have more than 1.6 million users, reached the top of the App Store charts last week and has tens of thousands of reviews there. The app aims to provide a space for women to exchange information about men in order to stay safe, and verifies that new users are women by asking them to upload a selfie. The now multiple breaches have obviously put the safety and privacy of those women at risk.</p>
<p>This new data exposure is due to any Tea user being able to use their own API key to access a more recent database of user data, Rahjerdi said. The researcher says that this issue existed until late last week.</p>
<p>That exposure included a mass of Tea users’ private messages. In some cases, the women exchange phone numbers so they can continue the conversation off platform.</p>
<p>The first breach was due to an exposed instance of app development platform Firebase, and impacted tens of thousands of selfie and driver license images. At the time, Tea said in a statement “there is no evidence to suggest that current or additional user data was affected.” The second database includes a data field called “sent_at,” with many of those messages being marked as recent as last week.</p>
<p>The Tea breach has taken on a life of its own since it was shared on 4chan. In addition to archiving the selfie and driver license photos and making them available for download, people have been using the data to ridicule images of users included in the breach. Tea asks users to verify they are women by uploading a selfie, and those images, including images of their real IDs, have been turned into a “<a href="https://www.washingtonpost.com/news/the-switch/wp/2018/04/11/channeling-the-social-network-lawmaker-grills-zuckerberg-on-his-notorious-beginnings/?ref=404media.co"><u>Facemash</u></a>” type site where users are presented with two Tea selfies and asked to pick which is more attractive. The site includes a public ranking of the “top” and “bottom” 50. Some of those photos have been “ranked” tens of thousands of times, according to figures on the website itself.</p>
<p>Regarding this latest breach, a Tea spokesperson told 404 Media in an email “We are continuing to work expeditiously to contain the incident and have launched a full investigation with assistance from external cybersecurity firms. We have also reached out to law enforcement and are assisting in their investigation. Since our investigation is in its early stages, we do not have more information we can share at this time.”</p>
<p><em>Jason Koebler contributed reporting.</em></p>
