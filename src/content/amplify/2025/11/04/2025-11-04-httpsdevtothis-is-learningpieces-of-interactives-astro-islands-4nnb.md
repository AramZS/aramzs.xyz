---
author: Domenico Tenace
cover_image: >-
  https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fuon5icajcqbfcunufhb7.png
date: '2025-11-04T18:47:52.016Z'
dateFolder: 2025/11/04
description: >-
  Overview   Astro's philosophy is centered around not using JavaScript, but it
  may happen in...
isBasedOn: 'https://dev.to/this-is-learning/pieces-of-interactives-astro-islands-4nnb'
link: 'https://dev.to/this-is-learning/pieces-of-interactives-astro-islands-4nnb'
slug: 2025-11-04-httpsdevtothis-is-learningpieces-of-interactives-astro-islands-4nnb
tags:
  - code
title: 'Pieces of interactives: Astro Islands ☄️'
---
<h2>   Overview </h2>
<p>Astro's philosophy is centered around not using JavaScript, but it may happen in some situations that you need to use it to give interactivity to certain elements of the page.<br/>
 In this article we will see what Astro Islands are and how they work.<br/>
 Let's start! 🤙</p>
<h2>   What are Astro Islands? </h2>
<p>In <strong>Astro</strong>, an "island" refers to any interactive user interface component on the page. An island can be thought of as an interactive widget floating in a sea of ​​otherwise static, lightweight, server-rendered HTML.<br/>
 An island always runs alone from the other islands on the page, in which multiple islands can exist. Islands can share statehood with each other.<br/>
 Unlike SPAs that load all client-side JavaScript, Astro Islands use a technique also known as <strong>partial</strong> or <strong>selective hydration</strong>.<br/>
 Astro support multiple frontend frameworks for create the islands like <em>Vue</em>, <em>React</em>, <em>Preact</em>, <em>Svelte</em> and <em>SolidJS</em>.</p>
<h2>   How to create and Island </h2>
<p>By default, Astro render the component without JavaScript, only HTML and CSS:</p>
<pre><code>&lt;RandomVueComponent /&gt;
</code></pre>
<p>To make a component interactive, you need a client directive:*. Astro then automatically creates and bundles your client-side JavaScript for optimized performance.</p>
<pre><code>&lt;RandomVueComponent client:load /&gt;
</code></pre>
<h2>   Benefits </h2>
<p>The main advantage of the Astro Islands is performance: Astro render static HTML and JavaScript is only loaded for the individual components that need it.<br/>
 Another benefit is parallel loading: if there are multiple islands on the page, no islands block the loading of the others but they will be loaded in parallel (and when necessary).</p>
<h2>   Conclusion </h2>
<p>Astro Islands are isolated pieces of code that provide interactivity to an Astro page.<br/>
 Major frontend frameworks such as Vue and React are supported. This type of approach provides greater performance without affecting the user experience. Make good use of it!<br/>
 Happy coding!✨</p>
<p>Hi👋🏻<br/>
 My name is Domenico, software developer passionate of Open Source, I write article about it for share my knowledge and experience.<br/>
 Don't forget to visit my Linktree to discover my projects 🫰🏻</p>
<p>Linktree: <a href="https://linktr.ee/domenicotenace">https://linktr.ee/domenicotenace</a></p>
<p>Follow me on dev.to for other articles 👇🏻</p>
<p><a href="https://dev.to/dvalin99"> <figure><img alt="dvalin99 image" src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F985143%2Fc4c372a7-0b38-4f9e-b206-7ed65597ea31.png"/></figure> </a></p>
<h2> <a href="https://dev.to/dvalin99">Domenico Tenace</a> </h2>
<p><a href="https://dev.to/dvalin99">Passionate about the IT world and everything related to it ✌🏻 Open Source enthusiastic 🦠</a></p>
<p>If you like my content or want to support my work on GitHub, you can support me with a very small donation.<br/>
 I would be grateful 🥹</p>
<figure><a href="https://www.buymeacoffee.com/domenicotenace"><img alt="Buy Me A Coffee" src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fcdn.buymeacoffee.com%2Fbuttons%2Fv2%2Fdefault-yellow.png"/></a></figure>
