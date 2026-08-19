---
author: Barry Schwartz
cover_image: 'https://images.seroundtable.com/google-server-response-hero-H73X6uXR.jpg'
date: '2026-08-18T12:01:15.397Z'
dateFolder: 2026/08/18
description: >-
  Gary Illyes from Google said Google Search will eventually support the new
  HTTP QUERY method. He said as the "ecosystem catches up" Google will then
  support the HTTP QUERY method.
isBasedOn: 'https://www.seroundtable.com/google-support-http-query-method-41882.html'
link: 'https://www.seroundtable.com/google-support-http-query-method-41882.html'
slug: 2026-08-18-httpswwwseroundtablecomgoogle-support-http-query-method-41882html
tags:
  - tech
  - search
title: Google Search Will Eventually Support HTTP QUERY Method
---
<figure><img alt="Google Server Response Hero" src="https://images.seroundtable.com/google-server-response-hero-H73X6uXR.jpg"/><figcaption>Google Server Response Hero</figcaption></figure>
<p>Gary Illyes from Google said Google Search will eventually support the new HTTP QUERY method. He said as the "ecosystem catches up" Google will then support the HTTP QUERY method.</p>
<p>A QUERY requests that the request target process the enclosed content in a safe and idempotent manner and then respond with the result of that processing. This is similar to POST requests, but QUERY requests can be automatically repeated or restarted without concern for partial state changes, via <a href="https://www.rfc-editor.org/info/rfc10008/">RFC Editor</a>.</p>
<p>Gary shared this information on <a href="https://www.linkedin.com/posts/garyillyes_i-figured-out-why-people-were-pinging-me-share-7495035572852289537-ATl9/">LinkedIn</a> where he said that HTTP QUERY method is just a more efficient method for pages such as faceted navigation and heavy search filters.</p>
<p>Gary wrote:</p>
<blockquote>HTTP has a new method called QUERY.<p>We generally pick between two trade-offs when developing for the internets:</p><p>- use GET, which packs every parameter into the URL string. It is safe and cacheable, but URLs break when search filters grow complex, or - use POST, which accepts a request body of any size, but intermediaries do not cache it by default.</p><p>QUERY combines the missing pieces. It is safe, idempotent (which is a word I learned from Martin but have no idea what it means), and cacheable like GET, while sending a structured payload body like POST.</p><p>Why care? Because faceted navigation and heavy search filters, that's why. Instead of generating ridiculous query strings or using ugly POST routes that break edge/CDN caching and sometimes crawlability, servers can process rich filter payloads cleanly.</p></blockquote>
<p>He added that "widespread adoption will take time." "Web servers, CDNs, reverse proxies, and browsers must update their networking stacks first over the next couple of years. Even HTML has to get an update first, not to mention CORS," he added.</p>
<p>He finally said support will come to Google Search. "Yes, Google Search will support it eventually as the ecosystem catches up," he wrote. "Till then, keep your regular URLs tidy," he added.</p>
<p>Forum discussion at <a href="https://www.linkedin.com/posts/garyillyes_i-figured-out-why-people-were-pinging-me-share-7495035572852289537-ATl9/">LinkedIn</a>.</p>
