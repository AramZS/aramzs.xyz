---
author: Barry Schwartz
cover_image: 'https://images.seroundtable.com/chatgpt-google-1753371297.jpg'
date: '2025-07-25T12:20:51.975Z'
dateFolder: 2025/07/25
description: >-
  I am seeing numerous tests now that seem to prove that OpenAI's ChatGPT search
  feature is using Google Search's index or search results page to serve its own
  search results. 
isBasedOn: 'https://www.seroundtable.com/chatgpt-using-google-search-39825.html'
link: 'https://www.seroundtable.com/chatgpt-using-google-search-39825.html'
slug: 2025-07-25-httpswwwseroundtablecomchatgpt-using-google-search-39825html
tags:
  - ai
  - search
title: Is ChatGPT Using Google Search Results?
---
<figure><img alt="Chatgpt Google" src="https://images.seroundtable.com/chatgpt-google-1753371297.jpg"/><figcaption>Chatgpt Google</figcaption></figure>
<p>I am seeing numerous tests now that seem to prove that OpenAI's ChatGPT search feature is using Google Search's index or search results page to serve its own search results.</p>
<p>First, Abhishek Iyer posted about this early this week on <a href="https://x.com/distantgradient/status/1946677234229534921">X</a> - he explained how he created a new page with a made up term that was never indexed before. He then indexed that page within Google Search Console so that only Google Search would be aware of it. After Google Search Console indexed it, ChatGPT almost immediately became aware of that page that didn't exist and was not submitted to OpenAI.</p>
<p>Here are his screenshots:</p>
<blockquote><p>Proof that ChatGPT Plus is secretly Google-powered - “hidden page” experiment<br/><br/>1. I coined a nonsense word.<br/>2. I then put it on a page not linked anywhere.<br/>3. Forced Google to index it via Search Console; left all other engines unaware.<br/>4. Asked ChatGPT Plus to define the term →… <a href="https://t.co/biJYLHgf3l">pic.twitter.com/biJYLHgf3l</a></p>— Abhishek Iyer (@distantgradient) <a href="https://twitter.com/distantgradient/status/1946677234229534921?ref_src=twsrc%5Etfw">July 19, 2025</a></blockquote>
<p>Second, Aleyda Solis did a similar thing and published her findings <a href="https://www.aleydasolis.com/en/ai-search/chatgpt-uses-google-serp-snippets-for-answers/">on her blog</a> and shared this on <a href="https://x.com/aleyda/status/1948405086859690368">X</a> as well. She said, "Confirmed - ChatGPT uses Google SERP Snippets for its Answers."</p>
<p>She basically created new content, checked to make sure no one indexed it yet, including Bing or ChatGPT. Then when Google indexed it, it showed up in ChatGPT and not Bing yet. She showed that if you see the answer in ChatGPT, it is exactly the same as the Google search result snippet. Plus, ChatGPT says in its explanation that it is grabbing a snippet from a search engine.</p>
<blockquote><p>🚨 Confirmed - ChatGPT uses Google SERP Snippets for its Answers! Here's a test I've run with proof:<br/><br/>I’ve run a simple but straight-forward to follow test that confirms the reliance of ChatGPT on Google SERPs snippets for its answers, showing that:<br/><br/>1. ChatGPT pretty much was… <a href="https://t.co/nTig2jDK2T">pic.twitter.com/nTig2jDK2T</a></p>— Aleyda Solis 🕊️ (@aleyda) <a href="https://twitter.com/aleyda/status/1948405086859690368?ref_src=twsrc%5Etfw">July 24, 2025</a></blockquote>
<p>As far as we were told, <a href="https://www.seroundtable.com/bing-powers-chatgpt-search-38345.html">Bing powers ChatGPT</a> - it would be weird for Google to let ChatGPT use its index.</p>
<p>I did ask Sam Altman from OpenAI but I did not hear back:</p>
<blockquote data-conversation="none"><p><a href="https://twitter.com/sama?ref_src=twsrc%5Etfw">@sama</a> is it true? Is ChatGPT using Google's index and not Bing? See above...</p>— Barry Schwartz (@rustybrick) <a href="https://twitter.com/rustybrick/status/1947068406739480667?ref_src=twsrc%5Etfw">July 20, 2025</a></blockquote>
<p>This does remind me of when <a href="https://www.seroundtable.com/bing-cheats-google-poll-12895.html">Microsoft was caught stealing</a> Google's search results in 2011.</p>
