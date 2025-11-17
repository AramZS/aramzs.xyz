---
author: rsdoiel.github.io
cover_image: null
date: '2025-11-14T10:04:01.360Z'
dateFolder: 2025/11/14
description: >-
  A web innovation that I missed was the wide spread support for text fragments
  expressed as a URL. This is extremely helpful for both citation and quoting
  sections of a web page in a blog post.
isBasedOn: 'https://rsdoiel.github.io/blog/2025/11/13/urls_for_text_fragments.html'
link: 'https://rsdoiel.github.io/blog/2025/11/13/urls_for_text_fragments.html'
slug: 2025-11-14-httpsrsdoielgithubioblog20251113urlsfortextfragmentshtml
tags:
  - code
title: URLS for text fragments
---
<p>A web innovation that I missed was the wide spread support for text fragments expressed as a URL. This is extremely helpful for both citation and quoting sections of a web page in a blog post. The URL syntax is now widely supported by ever green browsers (e.g. Firefox, Safari and Chrome). You can find a nice explanation at <a href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments">Text fragments</a> on the <a href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments">MDN</a> website.</p>
<p>The syntax is a little funky. Here's an example of selecting the second paragraph in my recent blog post <a href="https://rsdoiel.github.io/blog/2025/11/07/half-life-of-frameworks.html">Half-life of Frameworks</a>,</p>
<p><a href="https://rsdoiel.github.io/blog/2025/11/07/half-life-of-frameworks.html#:~:text=The%20way,choice">https://rsdoiel.github.io/blog/2025/11/07/half-life-of-frameworks.html#:~:text=The%20way,choice</a></p>
<p>The sequence <code>#:~:</code> indicates it is a link to a text fragment. The <code>text=The%20way,choice</code> essentially tells the browser to jump to the text block that starts with "The%20way" and ends with "choice". Using this URL in Firefox will bring up the web page and highlight the text fragment centering it in the view.</p>
<p>It is important to realize that web pages with JavaScript can break this feature. I've noticed this on sites like Substack and BlueSky. The link may bring you to the right page but will not behave as expected. Here's an example of a text fragment link that should work but doesn't</p>
<p><a href="https://sarahkendzior.substack.com/notes#:~:text=I%20was%20suspended%20from%20BlueSky%20for%20defending%20the%20honor%20of%20Johnny%20Cash%2E">https://sarahkendzior.substack.com/notes#:~:text=I%20was%20suspended%20from%20BlueSky%20for%20defending%20the%20honor%20of%20Johnny%20Cash%2E</a></p>
<p>This should link to Sarah Kendzoir's note entry about being banned from BlueSky for her support of rebutting a WSJ article on Johnny Cash. Instead if you want to link to that entry you must resort to a link exposed with the tiny <a href="https://substack.com/@sarahkendzior/note/c-176537092">"dot dot dot" menu</a>.</p>
<p>It is not a browser bug. It's a choice of those who render pages via JavaScript. I get their commercial reasons. One more reason not to link to commercial websites and other walled gardens that break web standards.</p>
<h2>How do you easily generate text fragment link?</h2>
<p>While the URL syntax for text fragments is verbose getting a link to one is pretty easy with a desktop web browser. Here's the steps I use with desktop Firefox.</p>
<ol> <li>navigate to the web page</li> <li>select the text I want a link to</li> <li>using the context menu (e.g. right click with my mouse)</li> <li>click on "Copy Link to Highlight"</li> </ol>
<p>I now have a text fragment link saved to my web browser's clipboard (i.e. the copy buffer). I can now paste it into my Markdown document. These steps work on other popular desktop browsers (e.g. Safari, Orion and Chrome).</p>
<p>On mobile it's trickier. There isn't really a context menu like their is on the desktop. I haven't found a menu that will take a text selection from the web browser and include a "Copy Link to Highlight" option for sharing. That's shame. While I don't write blog posts on my phone I do take notes. Maybe mobile OS will catch up to that functionality in the future. I'm not holding by breath.</p>
<h2>text fragment URL possibilities</h2>
<p>As commercial social web platforms continue to devolve into muck. The open web can take advantage of features text fragment URLs. This could be an advantage in demonstrating the fluidity of the open web. In my experiments I've found it easy to take advantage of text fragment links in Markdown. Their just another link. If you're building Markdown processors you could auto-quote the text when you encounter a text fragment link. That's save some cutting and pasting in the writing process. You could even derive feeds from Markdown documents that include links expressing text fragments. I'm hoping to have a chance to experiment with these features in my <a href="https://rsdoiel.github.io/antennaApp">antennaApp</a> project.</p>
