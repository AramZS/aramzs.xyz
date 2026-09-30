---
author: Piccalilli
cover_image: 'https://piccalil.li/images/complete-css-social-share.png'
date: '2026-09-29T13:13:27.725Z'
dateFolder: 2026/09/29
description: A lesson from the Complete CSS course
isBasedOn: 'https://piccalil.li/complete-css/lessons/10'
link: 'https://piccalil.li/complete-css/lessons/10'
slug: 2026-09-29-httpspiccalillicomplete-csslessons10
tags:
  - code
  - design
title: Progressive enhancement with CSS
---
<p>There’s been a lot of <em>words</em> in this principles module, but it’s really important stuff. A big part of getting better at writing CSS involves <strong>all the stuff you need to do</strong> <em><strong>around</strong></em> <strong>writing the syntax</strong>. If you really prioritise the mental models and the approach you’ve learned in this module, I promise, that will improve your CSS work in itself.</p>
<p>There is more to improve though, and with all honesty, progressive enhancement is one of those <strong>crucial</strong> mindsets that help you to deliver user interfaces that work for everyone and thanks to that, are <strong>incredibly resilient</strong>.</p>
<aside><p>What the heck is progressive enhancement?</p><p>I wrote a <a href="https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/">handy explainer article</a> that will give you all the information you need to understand what progressive enhancement is. I recommend that you read that before continuing.</p></aside>
<p>The most important thing to remember is:</p>
<p>We’re lucky with CSS as it is <strong>designed to do exactly this</strong> thanks to <a href="https://piccalil.li/blog/a-primer-on-the-cascade-and-specificity/">the cascade</a> in particular. Let me explain with this example. Say you want to use <code>clamp()</code> to achieve <a href="https://piccalil.li/complete-css/lessons/7">fluid type and space</a>.</p>
<pre>
<code>.my-element {
  font-size: clamp(1rem, calc(5vi + 1rem), 4rem);
}
</code>
</pre>
<p>What if someone’s browser doesn’t support <code>clamp()</code>? The cascade can work that out for us without breaking a sweat.</p>
<pre>
<code>.my-element {
  font-size: 2rem;
  font-size: clamp(1rem, calc(5vi + 1rem), 4rem);
}
</code>
</pre>
<p>Because we’ve declared the <code>font-size</code> twice, the cascade will automatically pick the <code>clamp()</code> version <strong>if it understands that function</strong>. If not <strong>it will completely ignore the second rule and move on</strong>. It’s because CSS is a <strong>declarative programming language</strong> which means we specify what the outcome is rather than specifically how to achieve that outcome. In short, it means CSS is <strong>very forgiving and flexible</strong> because it won’t crap out if it doesn’t understand something, like an <strong>imperative programming language</strong> like JavaScript does.</p>
<p>By setting a reasonably sensible fallback value of <code>2rem</code> as the <code>font-size</code>, we are providing a decent <a href="https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/">minimum viable experience</a>. It might not be <strong>our ideal experience</strong>, but for users who’s browsers don’t support newer CSS technologies like <code>clamp()</code>, they will get <strong>the ideal experience for them</strong>.</p>
<p>Let’s take a look at another reasonably new technology in CSS: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries">container queries</a>. We’re lucky that they now have <a href="https://caniuse.com/css-container-queries">really high support</a> but still treat them as an enhancement rather than <em>crucial</em>.</p>
<p>For example, for the post layout on this site, we used a container query to apply a border to the correct side of the sidebar, based on whether it was on the right, or stacked to the bottom. You can <a href="https://piccalil.li/blog/building-a-breakout-element-with-container-units/">read about that here</a>.</p>
<pre>
<code>@container (width &gt; 50vi) {
  .post__meta {
    border-inline-start: 0;
    border-block-start: 1px solid;
    padding-inline-start: 0;
  }
}
</code>
</pre>
<p>What happens if container queries aren’t supported? Not much really, aside from the sidebar will have a border on the side rather than the top.</p>
<p><strong>That is completely acceptable because it isn’t broken</strong>. As long as you <strong>prioritise as little friction as possible for users, regardless of their browser, device and connection speed</strong>, you will be building excellent user interfaces.</p>
<p>Let’s look at something more relevant that doesn’t have much support across the board: <code>text-box-trim</code>. This is a new CSS capability that allows you to account for the extra space that fonts have.</p>
<p>A classic example of how this is helpful, is buttons. Often when you apply vertical padding, the text label isn’t <em>quite</em> in the centre, so we end up doing this sort of thing.</p>
<pre>
<code>.button {
  padding: 1.5em 2em 1.6em 2em;
}
</code>
</pre>
<p>What’s happening here is we’re adjusting the bottom padding by <code>.1em</code> to create the illusion of centred text. The <code>text-box-trim</code> property allows us to effectively remove the extra space that fonts give us, which in turn removes the need for magic numbers in our <code>padding</code> values.</p>
<pre>
<code>.button {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
</code>
</pre>
<p>What we’re saying is, “trim the space at the cap height for alphabetic characters”, which will result in this CSS.</p>
<pre>
<code>.button {
  padding: 1.5em 2em;
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
</code>
</pre>
<p>At the time of writing, only Chromium and Safari support this feature, but it’s no drama. The trick is to <strong>let go</strong> and accept that slight oddity with alignment and apply the <code>text-box-trim</code> rules <strong>today</strong>, because before you know it, it will be a <a href="https://web.dev/blog/baseline-definition-update">baseline feature</a>!</p>
<p>If you’re desperate to get things perfect (honestly, life is too short), then you <em>could</em> use a <code>@supports</code> query:</p>
<pre>
<code>.button {
  padding: 1.5em 2em 1.6em 2em;
}

@supports (text-box-trim: both) {
  .button {
    padding: 1.5em 2em;
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
}
</code>
</pre>
<p>The problem I personally see with this is, you’re working against the grain of the browser which we learned not to do in the <a href="https://piccalil.li/complete-css/lessons/6"><em>Be the browser’s mentor, not its micromanager</em></a> lesson. CSS moves <em>so fast</em> now that your <code>@supports</code> query will be technical debt before you know it.</p>
<p>By <strong>accepting an end experience that’s not quite perfect</strong> you’re going to provide a much better experience for <em>everyone</em>. Remember:</p>
<h1>Wrapping up this module</h1>
<p>Oof, that was quite an intense start to the course, right? It’s all really important stuff to start with though, because <strong>we’re all on the same page now</strong> and we’re ready to get cracking with our project.</p>
<p>The next module is all on planning and feedback: crucial stuff to get right before you even think about authoring production CSS. Make yourself a cup of whatever you like drinking (I’m making a cup of tea) and get ready to get practical!</p>
<aside><p>We hope you have enjoyed this free sample of Complete CSS!</p> <p><strong>Get yourself a nice £60 discount</strong> using the code <code>TRYB4BUY</code> at checkout as a special thanks for trying one of our <a href="https://piccalil.li/courses">courses</a>.</p></aside>
<aside data-author-summary-variant="post"><figure><figcaption>Author<h2>Andy Bell</h2></figcaption></figure></aside>
