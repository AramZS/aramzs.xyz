---
author: Changelog
cover_image: >-
  https://ghost.org/changelog/content/images/2019/08/eleventy-starter-feature-2.png
date: '2025-12-24T21:07:12.919Z'
dateFolder: 2025/12/24
description: >-
  We’ve expanded our roster of headless starter repositories with Eleventy – a
  static site generator that’s swiftly growing in popularity within the JAMstack
  community.
isBasedOn: 'https://ghost.org/changelog/eleventy/'
link: 'https://ghost.org/changelog/eleventy/'
slug: 2025-12-24-httpsghostorgchangelogeleventy
tags:
  - code
  - tech
title: Eleventy and Ghost
---
<figure><img alt="Eleventy and Ghost" data-sizes="auto" data-srcset="/changelog/content/images/size/w400/2019/08/eleventy-starter-feature-2.png 400w,
/changelog/content/images/size/w750/2019/08/eleventy-starter-feature-2.png 750w,
/changelog/content/images/size/w960/2019/08/eleventy-starter-feature-2.png 960w,
/changelog/content/images/size/w1140/2019/08/eleventy-starter-feature-2.png 1140w" sizes="920px" src="https://ghost.org/changelog/content/images/size/w1140/2019/08/eleventy-starter-feature-2.png" srcset="/changelog/content/images/size/w400/2019/08/eleventy-starter-feature-2.png 400w,
/changelog/content/images/size/w750/2019/08/eleventy-starter-feature-2.png 750w,
/changelog/content/images/size/w960/2019/08/eleventy-starter-feature-2.png 960w,
/changelog/content/images/size/w1140/2019/08/eleventy-starter-feature-2.png 1140w"/></figure>
<p>We’ve expanded our roster of headless starter repositories – now you can build a completely custom front-end for a Ghost site with Eleventy.</p>
<p>Earlier this year <a href="https://ghost.org/changelog/jamstack/">we shared what's possible with Ghost when used as a flexible headless CMS</a>. One of those possibilities being the option to deliver <a href="https://ghost.org/docs/jamstack/gatsby/?ref=ghost.org">content via our API to a Gatsby site</a>. The end result: A robust and familiar space to create, organise and store your content, with a blazing fast static site on the front-end.</p>
<p>We're now extending our documentation to show what's possible with the Content API and <a href="https://11ty.io/?ref=ghost.org">Eleventy</a>, a popular static site generator in the JAMstack space.</p>
<figure><img alt="The 11ty logo" src="https://ghost.org/changelog/content/images/2019/08/eleventy-starter-banner.png"/></figure>
<h2>What is Eleventy?</h2>
<p>Eleventy, or 11ty for those of you in a hurry, is a static site generator that was designed to be the JavaScript alternative to <a href="https://jekyllrb.com/?ref=ghost.org">Jekyll</a>. Without going into too much depth; <a href="https://www.11ty.io/docs/?ref=ghost.org">Eleventy</a> is designed to be a flexible and easy tool to take an assortment of files and turn them into a <a href="https://www.11ty.io/docs/resources/?ref=ghost.org#static-sites">static website</a>. Those files could be <a href="https://daringfireball.net/projects/markdown/?ref=ghost.org">Markdown</a>, HTML, <a href="https://mozilla.github.io/nunjucks/?ref=ghost.org">Nunjucks</a>, <a href="https://handlebarsjs.com/?ref=ghost.org">Handlebars</a> or even straight up JavaScript!</p>
<p>Eleventy works <a href="https://www.11ty.io/docs/resources/?ref=ghost.org#zero-config">without configuration</a> – meaning it's accessible to newcomers but not overly opinionated on file structure and settings.</p>
<h3>How does this flexible static site generator fit in with Ghost?</h3>
<p>I'm glad you asked that question: Under the hood of Eleventy is a <a href="https://www.11ty.io/docs/data/?ref=ghost.org">clever data pipeline</a> that is accessible from any template file within an Eleventy project. It's possible to feed any type of data into it, including content coming from the Ghost content API.</p>
<figure><img alt="Diagram showing Ghost data being fed into Eleventy and subsequently Eleventy being deployed to various hosting platforms" src="https://ghost.org/changelog/content/images/2019/08/eleventy-starter-diagram.png"/></figure>
<p>Posts, pages, tags, authors, global site data; you name it. Eleventy is built on top of <a href="https://nodejs.org/en/?ref=ghost.org">Node.js</a> (great choice if you ask us) which means it works really well with <a href="https://ghost.org/docs/content-api/?ref=ghost.org">our open source JavaScript libraries</a>.</p>
<h2>So what's new?</h2>
<p>We're excited to share what's possible with the Ghost API – hopefully these resources inspire and help you to create unique websites using Ghost as a headless CMS.</p>
<h3>🚢 NEW: <a href="https://github.com/TryGhost/eleventy-starter-ghost/?ref=ghost.org">Eleventy Starter Ghost</a></h3>
<p>We've created an official <strong>Eleventy starter </strong>repository, similar to our Gatsby starter, that's all setup to consume content from Ghost and build out a simple flat-file website with a clean blog-style design. The best way to use <a href="https://github.com/TryGhost/eleventy-starter-ghost/?ref=ghost.org">this starter is to fork it</a>. Want to see it in action? Check out this <a href="https://eleventy.ghost.org/?ref=ghost.org">live demo we've created</a>.</p>
<figure><img alt="Screenshot of Eleventy &amp; Ghost demo site" src="https://ghost.org/changelog/content/images/2019/08/61880744-5b138980-aeed-11e9-9d8e-07c0b3c03cc5.png"/><figcaption><em>Demo: <a href="https://eleventy.ghost.org/?ref=ghost.org">eleventy.ghost.org</a></em></figcaption></figure>
<h3>🚢 NEW: <a href="https://ghost.org/docs/jamstack/eleventy/?ref=ghost.org">Eleventy &amp; Ghost Documentation</a></h3>
<p>To coincide with this starter we've also created documentation on how to use this starter as well as ways you can use the <a href="https://ghost.org/docs/content-api/?ref=ghost.org">Content API Client Library</a> to expose specific parts of your content to Eleventy.</p>
<h2>💠 Works great with Netlify</h2>
<p>This combination of Ghost and Eleventy works great when deploying to <a href="https://www.netlify.com/?ref=ghost.org">Netlify</a>. With the power of webhooks we can automatically let Netlify know when a change is made in Ghost and trigger a deploy causing Eleventy to rebuild the website with the new content. Check out our <a href="https://ghost.org/integrations/netlify/?ref=ghost.org">Netlify Integration page</a> for more information.</p>
<h2>What the future holds</h2>
<p>From a personal perspective I'm very excited about the possibilities that exist with <a href="https://headlesscms.org/?ref=ghost.org">headless CMSs</a>, APIs and static site generators – AKA the <a href="https://jamstack.org/?ref=ghost.org">JAMstack</a>. Ghost is a battle-tested headless solution for businesses who need the power and flexibility of a modern CMS to build and run successful digital publications ✨</p>
<p>For those of you that don't know me; my name is Dave and I recently joined the team as Developer Advocate. I've been a fan of the JAMstack for many years, creating open source projects and contributing to the community along the way. Feel free to <a href="https://twitter.com/daviddarnes?ref=ghost.org">get in touch with me via Twitter</a>, or <a href="https://forum.ghost.org/?ref=ghost.org">hop onto the Ghost Forum</a> to share what you're making with Ghost!</p>
<p>Put the new Eleventy starter and Ghost through their paces with a free, no strings attached <a href="https://ghost.org/pricing/?ref=ghost.org"><strong>Ghost(Pro)</strong></a> trial – or get started with a <a href="https://ghost.org/docs/install/ubuntu/?ref=ghost.org">self-hosted</a> install.</p>
<svg height="40" viewbox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M19.5,8.75l4,2.75V22A1.5,1.5,0,0,1,22,23.5H2A1.5,1.5,0,0,1,.5,22V11.5l4-2.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.5 20.5L8.5 16.5 15.5 16.5 20.5 20.5" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.5 11.5L17.5 15.5" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path><path d="M0.5 11.5L6.5 15.5" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.5,14.167V1.5a1,1,0,0,0-1-1H5.5a1,1,0,0,0-1,1V14.167" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12,11.5,8.591,7.944a2.018,2.018,0,0,1-.378-2.329h0a2.017,2.017,0,0,1,3.23-.524L12,5.648l.557-.557a2.017,2.017,0,0,1,3.23.524h0a2.018,2.018,0,0,1-.378,2.329Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
