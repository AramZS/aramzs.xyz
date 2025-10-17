---
author: gomakethings.com
cover_image: 'https://gomakethings.com/img/og.png'
date: '2024-09-09T14:55:03.000Z'
dateFolder: 2024/09/09
description: >-
  Theresa O’Connor argues that focusing on writing less code has harmed web
  development, leading to bloated applications. She criticizes developers for
  using heavy libraries instead of simpler, more efficient solutions. The goal
  should be to deliver better and faster code, not just to reduce the number of
  characters written.
isBasedOn: 'https://gomakethings.com/the-goal-isnt-to-write-less-code/'
link: 'https://gomakethings.com/the-goal-isnt-to-write-less-code/'
slug: 2024-09-09-httpsgomakethingscomthe-goal-isnt-to-write-less-code
tags:
  - code
title: The goal isn't to write less code
---
<p>I’m convinced that nothing has done more damage to the web than this notion among developers that writing less code is an admirable pursuit.</p>
<p>(<em>Ok, fine. Capitalism has done more damage. But other than that!</em>)</p>
<p>It’s why people kept shipping the entire jQuery library to toggle a few classes on some elements long after the native web was capable of doing all the same things.</p>
<p>Because this…</p>
<pre><code data-lang="js">$('.sandwich').addClass('mustard');
</code></pre>
<p>Is a few characters shorter than this…</p>
<pre><code data-lang="js">document.querySelectorAll('.sandwich').forEach((sandwich) =&gt; {
	sandwich.classList.add('mustard');
});
</code></pre>
<p>And in exchange for writing 67 fewer characters, we sent 87.5kb of JavaScript to our users.</p>
<p>In more recent years, it was React.</p>
<p>Instead of writing some manual DOM manipulation or choosing a lightweight library to do what you need, we shipped literal megabytes of JavaScript to users.</p>
<p>Today, it’s AI.</p>
<p>I’ve literally had people <em>who work as coders</em> tell me that they hate writing code. They like AI, because it writes the code for them steals other people’s code, sanitizes the copyright, and spits it out as unique and original code.</p>
<p>The goal isn’t to write less code.</p>
<p>It’s to ship less code to users. Better code. Faster code. More resilient code.</p>
<p>For years, our industry has trended towards slower, buggier, more fragile, worse-in-every-measurable-way-except-speed code.</p>
<p>It’s not better to produce a car in half the time with brakes that don’t work, and it’s not better to write code in less time if your users can’t actually use the fucking thing you built.</p>
<aside> <p><em><strong>Hate the complexity of modern front‑end web development?</strong> I send out a short email each weekday on how to build a simpler, more resilient web. Join over 14k others.</em></p>    If you're human, leave this blank     Enter your email address to get Daily Developer Tips emails         </aside>
