---
author: Wed
cover_image: 'https://blog.val.town/og-image.png?title=Vibe+code+is+legacy+code'
date: '2025-08-02T14:27:45.073Z'
dateFolder: 2025/08/02
description: Updates and articles from the Val Town team
isBasedOn: 'https://blog.val.town/vibe-code'
link: 'https://blog.val.town/vibe-code'
slug: 2025-08-02-httpsblogvaltownvibe-code
tags:
  - ai
  - code
  - tech
title: Vibe code is legacy code
---
<p>Despite <a href="https://simonwillison.net/2025/Mar/19/vibe-coding/">widespread</a> <a href="https://simonwillison.net/2025/May/1/not-vibe-coding/">confusion</a>, Andrej Karpathy <a href="https://x.com/karpathy/status/1886192184808149383?lang=en">coined "vibe coding"</a> as a kind of AI-assisted coding where you <strong>"forget that the code even exists."</strong></p>
<article class="rw-embedded-tweet" data-rw-tweet-id="1903870973126045712">
<header class="rw-embedded-tweet-header">
<div>
<img src="https://pbs.twimg.com/profile_images/1296667294148382721/9Pr6XrPB.jpg"/>
</div>
<div>
<span><a href="https://twitter.com/karpathy">Andrej Karpathy</a></span>
<span><a href="https://twitter.com/karpathy">@karpathy</a></span>
</div>
<div>
<a href="https://twitter.com/karpathy/status/1903870973126045712">
<svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.98316C19.9647 8.15675 19.9647 8.33034 19.9647 8.50553C19.9647 13.8436 15.8371 20 8.28966 20V19.9968C6.06013 20 3.8769 19.3712 2 18.1857C2.32419 18.2241 2.65001 18.2433 2.97664 18.2441C4.82429 18.2457 6.61913 17.6353 8.07272 16.5114C6.31688 16.4786 4.77717 15.3515 4.23928 13.706C4.85436 13.8228 5.48812 13.7988 6.09181 13.6364C4.17753 13.2556 2.80033 11.5997 2.80033 9.67665C2.80033 9.65905 2.80033 9.64225 2.80033 9.62545C3.37071 9.93824 4.00934 10.1118 4.6626 10.131C2.85964 8.9447 2.30388 6.58325 3.39265 4.73696C5.47593 7.2608 8.54966 8.79511 11.8493 8.9575C11.5186 7.55439 11.9703 6.08408 13.0364 5.09774C14.689 3.56824 17.2882 3.64663 18.8418 5.27293C19.7607 5.09454 20.6415 4.76256 21.4475 4.29219C21.1412 5.22733 20.5001 6.02168 19.6437 6.52645C20.457 6.43206 21.2517 6.21767 22 5.89049C21.4491 6.70324 20.7552 7.41119 19.9525 7.98316Z" fill="currentColor"></path>
</svg>
</a>
</div>
</header>
<main>
<p>Good post! It will take some time to settle on definitions. Personally I use "vibe coding" when I feel like this dog. My iOS app last night being a good example. But I find that in practice I rarely go full out vibe coding, and more often I still look at the code, I add complexity slowly and I try to learn over time how the pieces work, to ask clarifying questions etc.<br/></p><video controls=""><source src="https://video.twimg.com/tweet_video/GmvojqJbUAAPucH.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
</main>
<footer class="rw-embedded-tweet-footer" data-rw-created-timestamp="1742753186000">
<span>
<a href="https://twitter.com/karpathy/status/1903870973126045712">Posted Mar 23, 2025 at 6:06PM</a>
</span>
</footer>
</article>
<h2>Legacy code</h2>
<p>We already have a phrase for code that nobody understands: <strong>legacy code</strong>.</p>
<p>Legacy code is universally despised, and for good reason. But why? You have the code, right? Can't you figure it out from there?</p>
<p>Wrong. Code that nobody understands is tech debt. It takes a lot of time to understand unfamiliar code enough to debug it, let alone introduce new features without also introducing bugs.</p>
<p>Programming is fundamentally <a href="https://pages.cs.wisc.edu/~remzi/Naur.pdf"><em>theory building</em></a>, not producing lines of code. We know this. This is why we make fun of business people who try to measure developer productivity in lines of code.</p>
<p>When you vibe code, you are incurring tech debt as fast as the LLM can spit it out. Which is why vibe coding is <em>perfect</em> for prototypes and throwaway projects: It's only legacy code if you have to maintain it!</p>
<h2>Prototypes &amp; throwaway code</h2>
<p>I've happily vibe coded apps to:</p>
<p>I don't needed to continue developing those apps, so it hasn't been a problem that I don't understand their code. These apps are also very small, which means that I haven't incurred that much debt if I need to jump in and read the code at some point. I was able to vibe code these apps way faster than I could've built them, and it was a blast.</p>
<h2>Vibe coding is a spectrum</h2>
<p>Vibe coding is on a spectrum of how much you understand the code. The more you understand, the less you are vibing.</p>
<figure><img alt="shapes at 25-07-30 10.32.53.png" src="https://imagedelivery.net/iHX6Ovru0O7AjmyT5yZRoA/a93f8e81-c9b8-4277-6d19-525d2b8d5400/public"/></figure>
<p>Simply by being an engineer and asking for a web app with a persistent database, you are already vibing less than than a non-programmer who asks for an "app" without understanding the distinction between a web app and a native app, or how persistent data storage works.</p>
<p>The worst possible situation is to have a non-programmer vibe code a large project that they intend to maintain. This would be the equivalent of giving a credit card to a child without first explaining the concept of debt.</p>
<p>As you can imagine, the first phase is ecstatic. <em>I can wave this little piece of plastic in stores and take whatever I want!</em></p>
<p>Which is a lot like <em>AI can build anything now! Nobody needs to learn how to code! Look at what it just made for me!</em></p>
<p>But if you wait a month, you'll get the credit card bill. <em>Did I actually need to buy all those things? How will I get myself out of this hole?</em></p>
<p>It's similar for the vibe coder. <em>My code broken. What do all these files and folders even do? How will I ever get this fixed? Can I get a refund for the $400 I spent vibe coding?</em></p>
<p>If you don't understand the code, your only recourse is to ask AI to fix it for you, which is like paying off credit card debt with another credit card.</p>
<h2>Serious coding with AI in 2025</h2>
<p>If you're building something serious that you intend to maintain in 2025, Andrej has the right of it:</p>
<blockquote> <p>[Keep] a very tight leash on this new over-eager junior intern savant with encyclopedic knowledge of software, but who also bullshits you all the time, has an over-abundance of courage and shows little to no taste for good code. And emphasis on being slow, defensive, careful, paranoid, and on always taking the inline learning opportunity, not delegating.</p> </blockquote>
<h2>How we approach building for AI</h2>
<p>At Val Town, we've built AI into our product in dozens of ways. <a href="https://townie.val.run/">Townie</a> is our AI asisstant that agentically reads &amp; writes code, runs it, views the logs, and keeps iterating until it's done.</p>
<p><a href="https://townie.val.run/">Townie</a> is an awesome tool for vibe coding. I heartily recommend it to folks who understand these tradeoffs. I use it to vibe code sometimes. Other times I keep in on a tight leash as it makes surgical edits to a project I care about. Both are fun and useful.</p>
<p>Coding with AI is changing so quickly that it's hard to know what tomorrow will bring, but I'm confident that theory building will remain central to the activity of building complex software. Our technical expertise will still be relevant! And I'm optimistic that AI will continue to make programming better in suprising ways.</p>
<p>But if you know any non-programmers spending thousands of dollars vibe coding their billion dollar app idea today, please send them this post. Vibe coding is not going to get them where they want to go. They're going to have to learn to use their human eyes to read the code 😱, and learn that sometimes it's easier to start over with building a well-written code base from scratch than to fix a legacy one that nobody understands.</p>
<p><em>This essay is a distillation of a talk I gave last month, <a href="https://www.youtube.com/watch?v=1WC8dxMC4Xw">The Role of the Human Brain in Programming</a>. Thanks to my fiance Emily for listening to me rant about these topics for months, and for filming my talk. Thanks Malte and Rippling for hosting the talk.</em></p>
<p><em>Thanks Geoffrey Litt, Jimmy Koppel, Max McDonnell, Tom MacWright, Charmaine Lee, Brent Jackson, and Dan Shipper for feedback on this post. Thanks Simon Willison and Andrej Karpathy for being voices of reason amidst all the AI hype and naysayers.</em></p>
