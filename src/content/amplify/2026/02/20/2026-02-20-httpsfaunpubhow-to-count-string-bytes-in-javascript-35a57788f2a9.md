---
author: Su Bak
cover_image: 'https://miro.medium.com/v2/resize:fit:1200/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg'
date: '2026-02-21T01:21:06.062Z'
dateFolder: 2026/02/20
description: 'When developing with JavaScript or TypeScript, we deal with strings a lot.'
isBasedOn: 'https://faun.pub/how-to-count-string-bytes-in-javascript-35a57788f2a9'
link: 'https://faun.pub/how-to-count-string-bytes-in-javascript-35a57788f2a9'
slug: 2026-02-20-httpsfaunpubhow-to-count-string-bytes-in-javascript-35a57788f2a9
tags:
  - code
title: How to count string bytes in JavaScript?
---
<figure><picture><source sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px" srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 1400w" type="image/webp"/><source data-testid="og" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px" srcset="https://miro.medium.com/v2/resize:fit:640/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 640w, https://miro.medium.com/v2/resize:fit:720/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 720w, https://miro.medium.com/v2/resize:fit:750/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 750w, https://miro.medium.com/v2/resize:fit:786/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 786w, https://miro.medium.com/v2/resize:fit:828/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 828w, https://miro.medium.com/v2/resize:fit:1100/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 1100w, https://miro.medium.com/v2/resize:fit:1400/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg 1400w"/><img alt="" src="https://miro.medium.com/v2/resize:fit:700/1*C0u1ke0LJgCDW3qY9hdHTQ.jpeg"/></picture><figcaption>Photo by <a href="https://unsplash.com/ko/@dancristianpaduret?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash">Dan Cristian Pădureț</a> on <a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EB%A7%8E%EC%9D%80-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8%EC%9D%B4%EC%9E%88%EB%8A%94-%EC%B9%A0%ED%8C%90-h3kuhYUCE9A?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash">Unsplash</a></figcaption></figure>
<p>When developing with JavaScript or TypeScript, we deal with strings a lot.</p>
<p>Sometimes we need to count the bytes of a string. What should we do at this time?</p>
<p>There are many ways to do this, but I’m going to introduce a one-line method and give a detailed explanation.</p>
<p>First of all, as a result, you can use it as below.</p>
<pre>~-encodeURI(string).split(/%..|./).length<br/></pre>
<p>Don’t all the functions look familiar? If you calculate the bytes of the string “사과”(is apple) with this logic, you will get the result as shown below.</p>
<pre>~-encodeURI("사과").split(/%..|./).length // 6<br/></pre>
<p>How does the result of 6 bytes come out? Let’s take a closer.</p>
<p>The encodeURI() function is a function that encodes the string entered as an argument into UTF-8. If you apply the string “사과” in the previous example, you will get the following result.</p>
<pre>encodeURI("사과") // '%EC%82%AC%EA%B3%BC'<br/></pre>
<p>The string split() function is usually used when you need to split a string using a specified delimiter. A frequently used delimiter is a comma (,).</p>
<pre>"사과,배,포도".split(",") // [ '사과', '배', '포도' ]<br/></pre>
