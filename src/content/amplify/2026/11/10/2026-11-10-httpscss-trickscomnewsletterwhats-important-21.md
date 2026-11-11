---
author: CSS-Tricks
cover_image: 'https://css-tricks.com/wp-content/uploads/2026/11/1-1024x642.png'
date: '2026-11-11T00:59:20.298Z'
dateFolder: 2026/11/10
description: >-
  I’m Daniel Schwarz (or Danny), and when I’m not writing about front-end
  development, I’m reading about it. The point of this newsletter is to share
  with you the interesting things that I’ve read about CSS and beyond, including
  walkthroughs, tools, news, and web platform updates.
isBasedOn: 'https://css-tricks.com/newsletter/whats-important-21/'
link: 'https://css-tricks.com/newsletter/whats-important-21/'
slug: 2026-11-10-httpscss-trickscomnewsletterwhats-important-21
tags:
  - code
title: '#What’s !important Newsletter #21'
---
<p>Hey! This is <strong>What’s !important #21</strong>, but as you may or may not know already, this is the first issue in newsletter format, which will come out every two weeks on Tuesdays. Up until now we were <a href="https://css-tricks.com/tag/news/">publishing them as regular articles</a>. If you knew that already, thanks so much for sticking with us and for trusting us with your email address.</p>
<p>If you’re just joining us, I’m Daniel Schwarz (or Danny), and when I’m not <a href="https://css-tricks.com/author/danielschwarz/">writing about front-end development</a>, I’m reading about it. The point of this newsletter is to share with you the interesting things that I’ve read about CSS and beyond, including walkthroughs, tools, news, and web platform updates. That, and we’ll be dropping in commentary from me and the rest of the team, both right here in the intro, and the tail end (which has a sweet announcement about the site this week).</p>
<p>I’m thrilled to be doing this, so shall we just dive in?</p>
<h2>A look at <code>headingoffset</code></h2>
<p><a href="https://blog.master.dev/overriding-heading-levels-with-the-headingoffset-html-attribute/"><code>headingoffset</code> is quite interesting</a>. It’s not just an HTML attribute that can increment the level of a heading (or several headings, since we don’t have to use it <em>on</em> headings). As I played around with it, I started to wonder if it could replace the abandoned <a href="https://www.smashingmagazine.com/2011/08/html5-and-the-document-outlining-algorithm/">document outline algorithm</a> that would’ve had us making all headings a <code>&lt;h1&gt;</code>, basically:</p>
<pre data-line=""><code>&lt;h1&gt;Heading 1&lt;/h1&gt;
&lt;div headingoffset="1"&gt;
  &lt;h1&gt;Heading 2&lt;/h1&gt;
  &lt;div headingoffset="1"&gt;
    &lt;h1&gt;Heading 3&lt;/h1&gt;
    &lt;div headingoffset="1"&gt;
      &lt;h1&gt;Heading 4&lt;/h1&gt;
      &lt;div headingoffset="1"&gt;
        &lt;h1&gt;Heading 5&lt;/h1&gt;
        &lt;div headingoffset="1"&gt;
          &lt;h1&gt;Heading 6&lt;/h1&gt;
          &lt;div headingoffset="1"&gt;
            &lt;h1&gt;Heading 7!&lt;/h1&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>(And yes, that <em>is</em> a heading 7.)</p>
<h2>Interop 2027 picks</h2>
<p>Christopher Kirk-Nielsen shared <a href="https://chriskirknielsen.com/blog/interop-2027-rankings/">their picks for Interop 2027</a>. The voting for it is over, but it’s still fun to contemplate what we might get. It’s a cultural holiday for web developers, really.</p>
<figure><img alt="Screenshot of a blog post titled My Interop 2027 Shortlist with a dark purple theme and cyan text." sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2026/11/1-scaled.png" srcset="https://css-tricks.com/wp-content/uploads/2026/11/1-scaled.png 2560w, https://css-tricks.com/wp-content/uploads/2026/11/1-300x188.png 300w, https://css-tricks.com/wp-content/uploads/2026/11/1-1024x642.png 1024w, https://css-tricks.com/wp-content/uploads/2026/11/1-768x482.png 768w, https://css-tricks.com/wp-content/uploads/2026/11/1-1536x963.png 1536w, https://css-tricks.com/wp-content/uploads/2026/11/1-2048x1285.png 2048w, https://css-tricks.com/wp-content/uploads/2026/11/1-1000x627.png 1000w"/></figure>
<p>Christopher also rounded up <em>everybody else’s</em> Interop picks, so take a look at those as well!</p>
<figure><img alt="" sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur.png" srcset="https://css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur-1024x512.png 1024w, https://css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur-300x150.png 300w, https://css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur-768x384.png 768w, https://css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur-1000x500.png 1000w, https://css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur.png 1200w"/></figure>
<p>Sponsor</p>
<h2><a href="https://css-tricks.com/memberships">CSS-Tricks Memberships!</a></h2>
<p>It’s true! We’ve opened up CSS-Tricks to <a href="https://css-tricks.com/memberships/">monthly and annual memberships</a> that give you a swell set of perks, from access to our lively Discord server to store perks. Come hang out with your colleagues while supporting our work!</p>
<h2>Free alternatives to popular paid fonts</h2>
<p><a href="https://fontsight.xyz/font-alternatives">Fontsight’s free alternatives</a> takes 202 popular paid fonts and links you to the free alternatives.</p>
<p><a href="https://fontsight.xyz/">Their main tool</a> (a Chrome extension) identifies fonts and tells us who made them, whether or not they’re free, and what the free alternatives are if they aren’t free.</p>
<p>By the way, can I just say how [expletive] incredible this website looks?</p>
<figure><img alt="A screenshot of the fontsight website’s free alternatives page with a yellow background featuring the headline Free fonts like the paid ones and a search bar." sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2026/11/2-scaled.png" srcset="https://css-tricks.com/wp-content/uploads/2026/11/2-scaled.png 2560w, https://css-tricks.com/wp-content/uploads/2026/11/2-300x188.png 300w, https://css-tricks.com/wp-content/uploads/2026/11/2-1024x642.png 1024w, https://css-tricks.com/wp-content/uploads/2026/11/2-768x482.png 768w, https://css-tricks.com/wp-content/uploads/2026/11/2-1536x963.png 1536w, https://css-tricks.com/wp-content/uploads/2026/11/2-2048x1285.png 2048w, https://css-tricks.com/wp-content/uploads/2026/11/2-1000x627.png 1000w"/></figure>
<h2>Adaptive Dark Mode (Safari 27.3 beta)</h2>
<p>The new <a href="https://webkit.org/blog/18541/introducing-adaptive-dark-mode/">Adaptive Dark Mode</a>, introduced in the Safari 27.3 beta, is a feature that makes light websites dark if the user prefers dark mode but the website doesn’t offer it. It isn’t a web platform feature, so you don’t need to implement anything. The question is, would you <em>stop</em> implementing dark mode if all web browsers had this feature?</p>
<figure><img alt="A side-by-side comparison of three web pages labeled Light mode, Adaptive Dark Mode, and Custom dark mode to illustrate the new Adaptive Dark Mode in the Safari 27.3 beta." sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2026/11/3.png" srcset="https://css-tricks.com/wp-content/uploads/2026/11/3.png 1512w, https://css-tricks.com/wp-content/uploads/2026/11/3-300x149.png 300w, https://css-tricks.com/wp-content/uploads/2026/11/3-1024x508.png 1024w, https://css-tricks.com/wp-content/uploads/2026/11/3-768x381.png 768w, https://css-tricks.com/wp-content/uploads/2026/11/3-1000x496.png 1000w"/><figcaption>Source: <a href="https://webkit.org/blog/18541/introducing-adaptive-dark-mode/">WebKit</a>.</figcaption></figure>
<p>The article itself is an interesting read that goes way beyond “we’ve shipped a new feature.” Among other things, it talks about how Adaptive Dark Mode actually works and opting out using either HTML or CSS.</p>
<h2>Making LLM chat experiences accessible</h2>
<p>Eric Bailey talked about <a href="https://www.smashingmagazine.com/2026/11/making-immersive-llm-chat-experiences-more-accessible/">making LLM chat experiences accessible</a>. If you’re into UX and accessibility then this is definitely an article for you, but Eric also goes into the semantic HTML and ARIA of it all, so it covers a lot of bases.</p>
<figure><img alt="A wireframe diagram illustrating how the semantic HTML elements nav, main, form, and aside can be used to markup LLM experiences accessibly." sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2026/11/4.avif" srcset="https://css-tricks.com/wp-content/uploads/2026/11/4-1024x621.jpg 1024w, https://css-tricks.com/wp-content/uploads/2026/11/4-300x182.jpg 300w, https://css-tricks.com/wp-content/uploads/2026/11/4-768x466.jpg 768w, https://css-tricks.com/wp-content/uploads/2026/11/4-1536x932.jpg 1536w, https://css-tricks.com/wp-content/uploads/2026/11/4-1000x607.jpg 1000w, https://css-tricks.com/wp-content/uploads/2026/11/4.avif 2000w"/><figcaption>Source: <a href="https://www.smashingmagazine.com/2026/11/making-immersive-llm-chat-experiences-more-accessible/">Smashing Magazine</a>.</figcaption></figure>
<h2><code>border-shape</code> connectors</h2>
<p>Remember earlier this year when <a href="https://css-tricks.com/author/afiftemani/">Temani Afif</a> showed us <a href="https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/">how to draw a connector between two elements</a>?</p>
<p>Okay, now throw in <a href="https://blog.master.dev/two-circles-one-connection-and-border-shape/"><code>border-shape</code> to make the connectors be something other than a straight line</a>. That’s pretty cool, right? It opens the door to several design possibilities using native CSS.</p>
<figure><img alt="A diagram showing four connected colored blocks labeled A, B, C, and D alongside separate curves demonstrating line routing connections, made using the CSS border-shape property." sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2026/11/5.webp" srcset="https://css-tricks.com/wp-content/uploads/2026/11/5.webp 973w, https://css-tricks.com/wp-content/uploads/2026/11/5-300x159.webp 300w, https://css-tricks.com/wp-content/uploads/2026/11/5-768x408.webp 768w"/><figcaption><strong>Source:</strong> <a href="https://blog.master.dev/two-circles-one-connection-and-border-shape/">Master.dev</a>.</figcaption></figure>
<h2>New web platform features and updates</h2>
<ul> <li><a href="https://chromestatus.com/release-notes/157">Chrome 157</a> <ul> <li><a href="https://css-tricks.com/text-decoration-inset-is-like-padding-for-text-decorations/"><code>text-decoration-inset</code></a> (no Safari support)</li> <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-overflow#string"><code>text-overflow: &lt;string&gt;</code></a> (no Safari support)</li> <li><a href="https://chromestatus.com/feature/5152215540039680"><code>corner</code>/<code>corner-*</code></a> (no Safari or Firefox support)</li> <li><a href="https://developer.chrome.com/blog/html-in-canvas">HTML-in-canvas</a> (no Safari or Firefox support)</li> </ul> </li> </ul>
<p>By the way, if you want to throw something interesting my way, you can <a href="https://bsky.app/profile/dxnny.fun">reach me on Bluesky</a>. Alternatively, <a href="https://css-tricks.com/memberships/">our members-only Discord</a> is pretty buzzing, and you can find me there too.</p>
<p>Otherwise, see you in exactly two weeks!</p>
<p>Sponsor</p>
<h2><a href="https://css-tricks.com/advertising">Sponsor This Newsletter!</a></h2>
<p>Have a product or service you’d like to share with the CSS-Tricks community? This is a great place to do it! <a href="https://css-tricks.com/advertising/">Check out our sponsorship opportunities</a> for this ever-growing newsletter.</p>
<figure><img alt="" sizes="(min-width: 735px) 864px, 96vw" src="https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1.webp" srcset="https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1.webp 1497w, https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1-300x182.webp 300w, https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1-1024x620.webp 1024w, https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1-768x465.webp 768w, https://css-tricks.com/wp-content/uploads/2026/11/css-tricks-20-theme-toggle-1-1000x605.webp 1000w"/></figure>
<p><strong>[Geoff:]</strong> I started working on a CSS-Tricks redesign immediately after <a href="https://css-tricks.com/css-tricks-has-a-new-owner/">acquiring the site</a>. It’s no small deal because (1) this is the 20th(!) version we’re talking about and (2) Chris Coyier handled every single version prior to that, going back 19 years now. I’m not the best designer or developer in the world, and that’s not the imposter syndrome talking — it’s the truth.</p>
<p>But what I am “good” at is setting good foundations. I’m an organization nut and put perhaps way too much care into things that are completely invisible to the front end.</p>
<p>CSS-Tricks v20 was softly pushed on Friday. <a href="https://css-tricks.com/css-tricks-version-20/">I wrote up a detailed overview of what’s new</a> that published yesterday, like:</p>
<ul> <li>Light and dark themes (finally!)</li> <li>New patterns and textures</li> <li>Updated page layouts</li> </ul>
<p>…and of course, little CSS <em>tricks</em> sprinkled throughout.</p>
<p>I hope you like it!</p>
