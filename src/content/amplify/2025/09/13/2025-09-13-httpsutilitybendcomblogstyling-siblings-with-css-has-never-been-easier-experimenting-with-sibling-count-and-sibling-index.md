---
author: Brecht De Ruyte
cover_image: 'https://utilitybend.com/_astro/visual.BqckTkJX_Z1cuFQt.webp'
date: '2025-09-13T05:16:10.121Z'
dateFolder: 2025/09/13
description: >-
  Ready to spice up your CSS? This article dives into the new sibling-count()
  and sibling-index() functions, showing you how they can simplify your styling
  and create cool effects.
isBasedOn: >-
  https://utilitybend.com/blog/styling-siblings-with-CSS-has-never-been-easier.-Experimenting-with-sibling-count-and-sibling-index
link: >-
  https://utilitybend.com/blog/styling-siblings-with-CSS-has-never-been-easier.-Experimenting-with-sibling-count-and-sibling-index
slug: >-
  2025-09-13-httpsutilitybendcomblogstyling-siblings-with-css-has-never-been-easier-experimenting-with-sibling-count-and-sibling-index
tags:
  - code
title: >-
  Styling siblings with CSS has never been easier. Experimenting with
  sibling-count and sibling-index
---
<figure><picture> <source sizes="(max-width: 575px) 100vw,(max-width: 767px) 100vw,(max-width: 991px) 100vw,80vw" srcset="https://utilitybend.com/_astro/visual.BqckTkJX_Z7ugsy.avif%20375w,%20/_astro/visual.BqckTkJX_Z1p7dKP.avif%20480w,%20/_astro/visual.BqckTkJX_2f3kIm.avif%20680w,%20/_astro/visual.BqckTkJX_Z15d2GM.avif%20800w,%20/_astro/visual.BqckTkJX_Z1TkUcw.avif%20980w,%20/_astro/visual.BqckTkJX_Z1hfPWN.avif%201024w,%20/_astro/visual.BqckTkJX_Z18GtWN.avif%201660w,%20/_astro/visual.BqckTkJX_Z2fWCul.avif%201800w" type="image/avif"/><source sizes="(max-width: 575px) 100vw,(max-width: 767px) 100vw,(max-width: 991px) 100vw,80vw" srcset="https://utilitybend.com/_astro/visual.BqckTkJX_29Hf60.webp%20375w,%20/_astro/visual.BqckTkJX_R5hMI.webp%20480w,%20/_astro/visual.BqckTkJX_ZxVhw1.webp%20680w,%20/_astro/visual.BqckTkJX_1bYsQL.webp%20800w,%20/_astro/visual.BqckTkJX_mQAm2.webp%20980w,%20/_astro/visual.BqckTkJX_Z1IFOQB.webp%201024w,%20/_astro/visual.BqckTkJX_Z1A7sQB.webp%201660w,%20/_astro/visual.BqckTkJX_ZVyCSr.webp%201800w" type="image/webp"/> <img alt="" sizes="(max-width: 575px) 100vw,(max-width: 767px) 100vw,(max-width: 991px) 100vw,80vw" src="https://utilitybend.com/_astro/visual.BqckTkJX_Z1HL1to.jpg" srcset="https://utilitybend.com/_astro/visual.BqckTkJX_WkGwi.jpg%20375w,%20/_astro/visual.BqckTkJX_ZkhfKY.jpg%20480w,%20/_astro/visual.BqckTkJX_Z1KiP5I.jpg%20680w,%20/_astro/visual.BqckTkJX_Zn4GV.jpg%20800w,%20/_astro/visual.BqckTkJX_ZOuWcF.jpg%20980w,%20/_astro/visual.BqckTkJX_1Erg31.jpg%201024w,%20/_astro/visual.BqckTkJX_1N0C31.jpg%201660w,%20/_astro/visual.BqckTkJX_Z2sCENK.jpg%201800w"/> </picture></figure>
<p>If I were to divide CSS evolutions into categories, then last year was probably the year that ended with animations and colors getting better; This year, the end of the year seems to be about those ease-of-life features. We had one of those not that long go with :has(), but with things such as sibling-count, sibling-index, functions, and conditionals, the way we write CSS might just change for the better once again. In this article, I want to dip my toe in sibling-index() and sibling-count(), while also carefully adding some functions in the mix.</p>
<p>I’ve been living a lot in “select land” with my last articles, and even tho I’m still passionate about all things <a href="https://open-ui.org/">Open UI</a>, I really wanted to get back to some of those newer yummy CSS features. I was building a bunch of demos already, but never had the chance to do a full write-up. So, I’m playing some catch-up because the features I’m tackling today are already available in Chromium browsers. This article is about <code>sibling-count()</code> and <code>sibling-index()</code>, and some of my first ideas for this new feature. What can we use it for? Where does it make our lives easier? Let’s get to it.</p>
<h2>So, what is this about?</h2>
<p>I feel like I don’t need to explain it too much:</p>
<ul> <li><code>sibling-index()</code> returns a number representing the position of the current element relative to all its sibling elements</li> <li><code>sibling-count()</code> returns a number representing the total number of siblings of the element on which it is used, <strong>including itself.</strong></li> </ul>
<p>That’s it, the only tricky one is that <code>sibling-count()</code> also counts itself. I will be going over 4 demo’s and some extras in the end. Here are some quicklinks:</p>
<h2>Creating staggered animations using sibling-index()</h2>
<p>One of the things that I used in past animations was setting an inline custom property with CSS to create staggered animations.</p>
<pre data-language="javascript"><code>return (
    &lt;&gt;
        &#123;cardData.map((card, index) =&gt; (
          &lt;div
            key=&#123;index&#125;
            className="card"
            style=&#123;&#123; '--stagger-index': index &#125;&#125;
          &gt;
            &lt;h2&gt;&#123;card.title&#125;&lt;/h2&gt;
            &lt;p&gt;&#123;card.content&#125;&lt;/p&gt;
          &lt;/div&gt;
        ))&#125;
    &lt;/&gt;
  );
&#125;
</code></pre>
<p>And then I would handle my animation delay as follows:</p>
<pre data-language="css"><code>.card &#123;
  animation: reveal 0.6s ease-out forwards;
  animation-delay: calc(var(--stagger-index) * 100ms);
&#125;
</code></pre>
<p>And this works like a charm as long as you’re looping over some cards. But imagine the situation where you suddenly have a call to action in the middle of the cards, then it gets a lot trickier. You’d have to start propagating the index to another component; it’s not necessarily the hardest thing to do, but a cleaner way is more than welcome.</p>
<p>This is one of those things that suddenly becomes a lot easier with <code>sibling-index()</code>. Instead of just trying to get our CTA inside the loop or passing down index counts in other components, we could just use CSS!</p>
<p>Here is pretty much the gist of it:</p>
<pre data-language="css"><code>.card-container &gt; * &#123;
  animation: reveal 0.6s ease-out forwards;
  animation-delay: calc(sibling-index() * 0.1s);
&#125;
</code></pre>
<p>I love a bit of ease-of-life enhancements. It’s just nice to clean up the code a bit.</p>
<p>Here is that in a little codepen:</p>
<h2>Dynamic color spectrum: Give each card a different color using sibling-index() and sibling-count()</h2>
<p>Ever wanted to create a bunch of cards where each one of them has a different <code>background</code>, <code>color</code>, or <code>border-color</code>? What if you want to have a fixed starting color and want to end on a fixed color as well, giving each card an equal hue in between? Well, this just got a lot easier.</p>
<p>The idea here is that we calculate a “hue” based on an element’s position in a list (<code>sibling-index()</code>). We can use this to create some sort of gradient that flows across any number of items, without ever having to write a single line of JS or add manual style tags with custom properties..</p>
<p>Let’s look at the CSS right away. Now… the <code>calc()</code> function might seem a little much at first, but once we break it down, it will make sense. As a sidenote, this is one of the reasons I write about this stuff, to keep these calculations as a snippet for future reference. (I thanked my past self a few times)</p>
<p>In this example, we’re going to have the background of our cards range between a <strong>180deg</strong> on the hue wheel for the first item, to a <strong>300deg</strong> for the last item. (hence the variables in the next example: <strong>180 + 120 = 300</strong>).</p>
<p>Here is the gist of it:</p>
<pre data-language="css"><code>.spectrum-item &#123;
  --start-hue: 180;
  --hue-range: 120;
  background-color: oklch(
    65% 0.35
      calc(
        var(--start-hue) + (var(--hue-range) / (sibling-count() - 1)) *
          (sibling-index() - 1)
      )
  );
&#125;
</code></pre>
<p>The formula to achieve this is the following:</p>
<p><code>start + (range / total_steps) * current_step</code></p>
<p>The hard part here was figuring out how far along the color spectrum each item should be, as we want to start and end on the same color and want everything equally spaced on the hue wheel.</p>
<p>The first step is to determine the size of each “step” in our color transition. To do that, we need to know how many steps there are in total. That’s where <code>sibling-count() - 1</code> comes in. If you have 5 items, there are only 4 steps between them.</p>
<p>Next up, we divide our “color journey” (the <code>--hue-range</code> of 120 degrees) by the number of steps we just calculated. This gives us our “hue increment,” aka, the exact amount the color should change from one item to the next.</p>
<p>Finally, we need to know which step we’re currently on. That’s where <code>sibling-index() - 1</code> comes in. We subtract one because we want our calculation to start from zero. The first item is 0 steps away from the start color, the second is 1 step away, and so on.</p>
<p>In my demo, it starts with 5 items. So in that example that would mean the following:</p>
<p>For five items, the hue amount for each step is 30: <strong>120 / (5 - 1)</strong>.</p>
<ul> <li>Item 1: The hue is <strong>180 + (30 * 0)</strong>, which equals <strong>180</strong> (our start color).</li> <li>Item 2: The hue is <strong>180 + (30 * 1)</strong>, which equals <strong>210</strong>.</li> <li>Item 5 (the last one): The hue is <strong>180 + (30 * 4)</strong>, which equals <strong>300</strong> (our end color).</li> </ul>
<p>Here is a little sandbox of the idea:</p>
<h2>Placing items in a circle using sibling-index, sibling-count, and CSS functions</h2>
<p>Staggered animations and color spectrums are cool and all… But what if we want to fundamentally change the layout of our elements?</p>
<p>I’m talking about arranging items in a perfect circle, a task that can be a real pain in the… I already <a href="https://utilitybend.com/blog/the-customizable-select-part-two-potions-anchoring-and-radial-shenanigans-in-css">played with this in another article about select elements</a>. But this time I wanted to start fresh. Before we continue, here is the demo:</p>
<p>To create this behavior, you’d typically have to calculate every single position manually in JavaScript or use a pre-processor with complex loops.</p>
<p>With the combination of <code>sibling-index()</code> and <code>sibling-count()</code>, we can bring some trigonometry directly into our stylesheet to hack on some perfect circle placement. I’m also throwing the new CSS <code>@function</code> in the mix, just because I can, and I really love this feature.</p>
<p>First, let’s look at the custom functions that do the heavy lifting.</p>
<pre data-language="css"><code>@function --pos-x(--index, --count, --radius) &#123;
  result: calc(var(--radius) * cos(360deg / var(--count) * (var(--index) - 1)));
&#125;

@function --pos-y(--index, --count, --radius) &#123;
  result: calc(var(--radius) * sin(360deg / var(--count) * (var(--index) - 1)));
&#125;
</code></pre>
<p>I’d like to think of these two functions as our little engines. So cool we can set these aside like that, these CSS Functions will really help for cleaner code.</p>
<p>They calculate the exact X and Y coordinates for any point on a circle. To do this, they need to know three things:</p>
<ul> <li>The total number of items (<code>--count</code>)</li> <li>Which item we are currently placing (<code>--index</code>),</li> <li>How big the circle should be (<code>--radius</code>)</li> </ul>
<p>Let’s break these functions down:</p>
<p>First, we need to figure out how big each “slice” of our circular pie is. A full circle is 360 degrees. By dividing 360deg by the total number of siblings (<code>sibling-count()</code>), we get the angle for each segment. If we have 6 items, each one gets a <code>360 / 6 = 60-degree</code> slice of the circle.</p>
<p>Next, we determine the specific angle for the current item. We multiply the size of each slice by the item’s position (<code>sibling-index() - 1</code>). Just like in our color spectrum example, we subtract 1 so that our first item starts at an angle of 0 degrees (at the right of the circle).</p>
<ul> <li>For our 6 items, the first item would be at <strong>60 * 0 = 0 degrees</strong>.</li> <li>The second item would be at <strong>60 * 1 = 60 degrees</strong>.</li> <li>The third item would be at <strong>60 * 2 = 120 degrees</strong>,</li> <li>and so on…</li> </ul>
<p>This is where the trigonometry comes in. The <code>cos()</code> function gives us the X coordinate for a given angle on a circle, while <code>sin()</code> gives us the Y coordinate.</p>
<p>Now that our functions are ready, using them is incredibly clean. We apply a <code>transform</code> to each item, passing the dynamic sibling values directly into our functions.</p>
<pre data-language="css"><code>.circle-container div &#123;
  --radius: 120px;
  position: absolute;
  top: 50%;
  left: 50%;

  transform:
    translate(-50%, -50%)
    translateX(--pos-x(sibling-index(), sibling-count(), var(--radius)))
    translateY(--pos-y(sibling-index(), sibling-count(), var(--radius)));
&#125;
</code></pre>
<p>We start by centering each item perfectly with <code>translate(-50%, -50%)</code>. Then, we apply two more translations. <code>translateX</code> pushes the item horizontally by the amount calculated by our <code>--pos-x</code>-function, and <code>translateY</code> pushes it vertically based on <code>--pos-y</code>.</p>
<p>It’s a really cool effect! You can see the items smoothly rearrange themselves to form a new, perfectly symmetrical circle.</p>
<p>Now, truth be told… this might not be the best way to create a circle, I’ve seen a very clean way to do this as well by <strong>Temani Afif</strong>. In my example, the radius is rather static, but at the same time gives a bit more layout control. I think both methods have their benefits. But the idea by Temani is really awesome!</p>
<h2>Creating a casino cards fan effect using sibling-index() and sibling-count()</h2>
<p>So far, the demos were mostly about progressing from a start point to an end point. But what if you want to create something symmetrical, fanning out from a central point? Think of holding a hand of playing cards. The cards don’t all lean to one side; they fan out evenly.</p>
<p>Let’s take a look at the code first:</p>
<pre data-language="css"><code>.card &#123;
  --rotation-per-card: 8deg;
  --center-index: calc((sibling-count() + 1) / 2);

  transform:
    rotate(
      calc(var(--rotation-per-card) * (sibling-index() - var(--center-index)))
    )
    translateY(calc(4px * (sibling-index() - 1)));

  transform-origin: bottom center;
&#125;
</code></pre>
<p>You see that our card has two custom properties, which will be used as levers for this demo. I’ll get to the <code>--rotations-per-card</code> in a bit, but first of all, I want to go to the secret to this entire effect: <code>--center-index</code>.</p>
<p>Inside of this <code>--center-index</code> custom property, you can find a simple calculation: <code>calc((sibling-count() + 1) / 2)</code>.</p>
<p>This calculation finds the middle item in our list based on the number of siblings, for example:</p>
<ul> <li>If we have 5 cards, the calculation is <strong>(5 + 1) / 2</strong>, which gives us <strong>3</strong>. The 3rd card is our center.</li> <li>If we have 6 cards, it’s <strong>(6 + 1) / 2</strong>, which gives us <strong>3.5</strong>. This means the center point is right between the 3rd and 4th card.</li> </ul>
<p>Since we already have our center point, we can go on to calculate the rotation for each card. Look at the <code>rotate()</code> part of the transform:</p>
<pre data-language="bash"><code>calc(var(--rotation-per-card) * (sibling-index() - var(--center-index)))
</code></pre>
<p>This calculates each card’s “distance from the center” and multiplies it by our desired rotation amount (8deg), this is one of those levers we set (<code>--rotation-per-card</code>).</p>
<p>Let’s use a 5-card hand for a starting example, where the center index is 3:</p>
<ul> <li>Card 1: The distance is 1 - 3 = -2. The rotation is 8deg * -2 = <strong>-16deg</strong> (tilted left).</li> <li>Card 2: The distance is 2 - 3 = -1. The rotation is 8deg * -1 = <strong>-8deg</strong> (tilted slightly left).</li> <li>Card 3: The distance is 3 - 3 = 0. The rotation is 8deg * 0 = <strong>0deg</strong> (perfectly straight).</li> <li>Card 4: The distance is 4 - 3 = 1. The rotation is 8deg * 1 = <strong>8deg</strong> (tilted slightly right).</li> <li>Card 5: The distance is 5 - 3 = 2. The rotation is 8deg * 2 = <strong>16deg</strong> (tilted right).</li> </ul>
<p>The result is a symmetrical fan. Cards to the left of the center get a negative rotation, and cards to the right get a positive one.</p>
<p>But! There is more! There’s one little effect that was added as the final detail: the <code>translateY()</code>.</p>
<p>This pushes each card down slightly, creating the illusion that they are physically stacked on top of one another. The formula <code>calc(4px * (sibling-index() - 1))</code> simply moves each subsequent card down by an additional 4px and adds a bit of depth. That is more of a gut feel than an exact science. Once again, we can rely on <code>sibling-index()</code> to just really finalize this example. Ah, sweet sibling counting, I’m a fan!</p>
<h2>Further experiments, demos that didn’t make the article</h2>
<p>I’m trying to switch up my blogging and demos a bit; Maybe you noticed it on my demos. I wanted to add some information on there for when people come across them in other places. I’m also thinking of writing some more comments. But it’s a fine line between overcommenting and just enough.</p>
<p>For this article, I created some other experiments that I thought would be a bit too much. One of them is this bar chart, almost the same as the animation stagger effect, but using a bit of CSS conditionals in there just for funsies! (When the value is 100, it gets a perfect label on top).</p>
<p>And last but not least, I have this demo, combining the hue changing with some 3D experimentation. I might make another article about that one specifically. Feel free to give a shout-out if that interests you. I’m not that good at 3D stuff in CSS. I based the demo on a bunch of other pens and did some hacking. But to prettyfy this demo, I had a little <strong>secret</strong>:</p>
<p>I put in a prompt to A(I)mit Sheen, who is a true wizard in this sort of thing. If you haven’t heard of his work, you really should! <a href="https://codepen.io/amit_sheen">Check out some of Amit’s work</a>.</p>
<p>Here is a little 3D example (And thank you, Amit!):</p>
<h2>To close…</h2>
<p>I really love this feature, I love it so much that once again, my article might’ve been a bit too long. It’s how my brain works… I start something, and then I get stuck in experimenting and demos. I could cut these articles up into smaller pieces, but it’s just not in my nature. Anyway, for you, who actually went through the whole thing, thank you for your attention! And for those who just skimmed the article for the demos, that’s fine too.</p>
