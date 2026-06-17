---
author: solidjs.com
cover_image: 'https://www.solidjs.com/og.jpg'
date: '2026-06-16T14:10:38.327Z'
dateFolder: 2026/06/16
description: >-
  Solid is a purely reactive library. It was designed from the ground up with a
  reactive core. It's influenced by reactive principles developed by previous
  libraries.
isBasedOn: 'https://www.solidjs.com/tutorial/introduction_basics'
link: 'https://www.solidjs.com/tutorial/introduction_basics'
slug: 2026-06-16-httpswwwsolidjscomtutorialintroductionbasics
tags:
  - code
title: '#What is Solid?'
---
<p>This interactive guide will walk you through Solid's main features. You can also refer to the API and guides to learn more about how Solid works.</p>
<p>You can also check out our new beginner tutorial (work-in-progress!) <a href="https://docs.solidjs.com/guides/tutorials/getting-started-with-solid/welcome">here</a>.</p>
<p>Solid is a JavaScript framework for making interactive web applications. With Solid, you can use your existing HTML and JavaScript knowledge to build components that can be reused throughout your app. Solid provides the tools to enhance your components with <em>reactivity</em>: declarative JavaScript code that links the user interface with the data that it uses and creates.</p>
<p>A Solid App is composed of functions that we call components. Take a look at the <code>HelloWorld</code> function on the right: it directly returns a <code>div</code>! This mix of HTML and JavaScript is called JSX. Solid ships with a compiler that turns these tags into DOM nodes later on.</p>
<p>JSX allows you to use most HTML elements in our app, but it also lets you create new elements. Once we've declared our <code>HelloWorld</code> function, we can use it as a <code>&lt;HelloWorld&gt;</code> tag throughout our app.</p>
<p>The entry point for any Solid App is the <code>render</code> function. It takes 2 arguments, a function wrapping our application code and an existing element in the HTML to mount to:</p>
<pre><code>render(() =&gt; &lt;HelloWorld /&gt;, document.getElementById("app"));
</code></pre>
<p>Each lesson in the tutorial presents a Solid feature and a scenario to try it out. At any point you can click the solve button to see the solution or click reset to start over. The code editor itself has a console and an output tab where you can see the compiled output generated from your code. Look at it if you are curious to see how Solid generates code.</p>
<p>Have fun!</p>
<p><a href="https://www.solidjs.com/tutorial/introduction_basics#"></a><a href="https://www.solidjs.com/tutorial/introduction_jsx"></a></p>
