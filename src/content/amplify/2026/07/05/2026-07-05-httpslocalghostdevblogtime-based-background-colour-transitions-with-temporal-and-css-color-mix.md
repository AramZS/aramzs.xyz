---
author: localghost
cover_image: >-
  https://localghost.dev/og-images/time-based-background-colour-transitions-with-temporal-and-css-color-mix.png
date: '2026-07-05T16:07:01.581Z'
dateFolder: 2026/07/05
description: >-
  A visual refresh with a background that changes colour according to the time
  of day, using the new Temporal API along with CSS custom properties that blend
  into each other.
isBasedOn: >-
  https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/
link: >-
  https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/
slug: >-
  2026-07-05-httpslocalghostdevblogtime-based-background-colour-transitions-with-temporal-and-css-color-mix
tags:
  - code
title: Time-based background colour transitions with Temporal and CSS color-mix
---
<p>I've given my website a bit of a refresh! There's a slightly updated layout if you're on desktop, plus I ditched the <code>etc</code> page and I've revamped my <a href="https://localghost.dev/links">links page</a> to be powered by <a href="https://raindrop.io">raindrop.io</a>. The <a href="https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/?theme=minimalist">minimalist theme</a> is still minimalist, but a bit more fancy. The <a href="https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/?theme=vaporwave">vaporwave theme</a> has a newly jazzed-up nav bar with some adorable little icons. But the biggest change is to the <a href="https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/?theme=city">city theme</a>, which was previously a starry-sky dark mode theme.</p>
<p>If you're reading this between the hours of 9pm - 5am, you might be wondering what all the fuss is about - it looks pretty much the same as it did before. That's because the theme changes depending on the time of day!</p>
<figure><picture><source srcset="https://localghost.dev/img/BZAiQcUC0U-280.webp 280w" type="image/webp"/><img alt="A screenshot of the sunrise version of this layout, with pixel art skyscrapers at the bottom. The background is a blue to pink to light orange gradient" src="https://localghost.dev/img/BZAiQcUC0U-280.jpeg"/></picture></figure>
<figure><picture><source srcset="https://localghost.dev/img/MeJRe8T7yk-280.webp 280w" type="image/webp"/><img alt="A screenshot of the daytime version of this layout, with pixel art skyscrapers at the bottom. The background is a purple to pink gradient" src="https://localghost.dev/img/MeJRe8T7yk-280.jpeg"/></picture></figure>
<figure><picture><source srcset="https://localghost.dev/img/NFDu_9WIlE-280.webp 280w" type="image/webp"/><img alt="A screenshot of the sunset version of this layout, with pixel art skyscrapers at the bottom. The background is a purple to pink to orange gradient" src="https://localghost.dev/img/NFDu_9WIlE-280.jpeg"/></picture></figure>
<figure><picture><source srcset="https://localghost.dev/img/6CcP_uABhY-280.webp 280w" type="image/webp"/><img alt="A screenshot of the nighttime version of this layout, with pixel art skyscrapers at the bottom. There are pixel art stars in the header and the theme is now dark mode. The background is a dark blue to light blue to purple gradient" src="https://localghost.dev/img/6CcP_uABhY-280.jpeg"/></picture></figure>
<p>You can select the time of day using the picker in the top right, after the theme switcher. I'm persisting the choice in session storage so you don't get attacked by sudden light mode when changing pages, but if you visit again in the future it'll reset back to "now".</p>
<p>I was going to just turn the layout into a pastel lo-fi-aesthetic thing, but then I realised that a) I needed <em>some</em> kind of dark mode and b) I'd miss the stars! So I thought... why not both? And why stop at just night and day? (Hat tip to <a href="https://alistairshepherd.uk/">Alistair Shepherd</a> who did something similar with his beautiful Firewatch-inspired website.)</p>
<p>Then I remembered that the Temporal API was available experimentally in Chrome and Firefox, and I'd been looking for an excuse to try it out.</p>
<h2>Introducing Temporal</h2>
<p>For the uninitiated, Temporal is a solution to the objectively terrible Date API in JavaScript. Date was based on Java's Date library, which was also objectively terrible and has long been deprecated.</p>
<p>It's always really confusing that <code>Date</code> instances show either local or UTC time depending on which function you use to display them, and date operations are so fiddly that most of us turn to third party libraries like <code>date-fns</code> or <code>luxon</code>.</p>
<p>Temporal massively simplifies the API, introducing some new concepts:</p>
<ul> <li><code>PlainDateTime</code>: a date and time with no timezone (TZ)</li> <li><code>PlainDate</code>: a date with no time information and no TZ</li> <li><code>PlainTime</code>: a time with no date information and no TZ</li> <li><code>ZonedDateTime</code>: a date and time in a specified TZ</li> </ul>
<p><code>PlainTime</code> came in useful for this project, as we don't really care what the day is - only what time it is, so we know what colours to show.</p>
<p>The first thing to do was figure out the time according to the user's browser.<br/>
 The <code>Temporal.Now</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Now">namespace</a> has various methods for interacting with the current time, including <code>plainTimeISO()</code> which by default gives us a <code>PlainTime</code> in local time. (You can also pass in a time zone to get a zoned time.)</p>
<pre><code>const timeNow = Temporal.Now.plainTimeISO();</code></pre>
<p>Now we need to know when to show the different colours.</p>
<h2>Defining the stages</h2>
<p>The day is split into four stages: sunrise, daytime, sunset and night. Daytime and night are long - 11.5 hours each - whereas sunrise and sunset each last 90 minutes.</p>
<p>The background of the page has a two-colour gradient:</p>
<pre><code>  --background: fixed linear-gradient(var(--bg-gradient-top), var(--bg-gradient-mid) 80%);
</code></pre>
<p>The footer has an additional colour that's created with a linear gradient from transparent <code>oklch(0 0 0 / 0)</code> to the chosen third colour.</p>
<pre><code>    background: linear-gradient(oklch(0 0 0 / 0) 40%, var(--bg-gradient-bottom));</code></pre>
<p>This means the last colour sticks to the bottom of the page rather than stretching across the viewport height (it's hard to control even when you specify a percentage in the gradient). It also gives more of a glow that really looks like the sun rising/setting or the glow of the city, which I love.</p>
<p>I defined an object for the stages and colours:</p>
<pre><code>const stages = {
  sunrise: {
    start: Temporal.PlainTime.from("06:30:00"),
    next: "day",
    color1: "oklch(0.618 0.3157 265.76)",
    color2: "oklch(0.8867 0.1222 328.24)",
    color3: "oklch(0.9529 0.1222 106.94)",
  },
  day: {
    start: Temporal.PlainTime.from("08:00:00"),
    next: "sunset",
    color1: "oklch(58% 0.15433 300)",
    color2: "oklch(85% 0.22133 302)",
    color3: "oklch(98 0.22133 302)",
  },
  sunset: {
    start: Temporal.PlainTime.from("19:30:00"),
    next: "night",
    color1: "oklch(0.6933 0.1899 297.53)",
    color2: "oklch(75.504% 0.24612 357.26)",
    color3: "oklch(88.591% 0.1422 62.595)",
  },
  night: {
    start: Temporal.PlainTime.from("21:00:00"),
    next: "sunrise",
    color1: "oklch(25.27% 0.0919 276.73)",
    color2: "oklch(47.35% 0.284 283.78)",
    color3: "oklch(62.831% 0.23521 310.291)",
  },
};</code></pre>
<p>CSS custom properties are easy to set via JS - you can use <code>root.style.setProperty</code>:</p>
<pre><code> root.style.setProperty(
    "--bg-gradient-top",
    "oklch(25.27% 0.0919 276.73)",
  );</code></pre>
<p>Unlike <code>Date</code>, we don't have to do any gymnastics to compare Temporal instances: there's literally a <code>compare</code> function on each type of instance. Just like with other JS comparison functions, it returns <code>1</code> if the first instance is greater than the second, <code>0</code> if the two instances are the same, and <code>-1</code> if the first instance is less than the second.</p>
<pre><code>  const compare = Temporal.PlainTime.compare // extracted for brevity

  switch (true) {
    case compare(timeNow, stages.sunrise.start) &lt; 0 || compare(timeNow, stages.night.start) &gt;= 0: {
      currentStageName = "night";
      break;
    }
    case compare(timeNow, stages.sunrise.start) &gt;= 0 &amp;&amp; compare(timeNow, stages.day.start) &lt; 0: {
      currentStageName = "sunrise";
      break;
    }
    case compare(timeNow, stages.day.start) &gt;= 0 &amp;&amp; compare(timeNow, stages.sunset.start) &lt; 0: {
      currentStageName = "day";
      break;
    }
    case compare(timeNow, stages.sunset.start) &gt;= 0 &amp;&amp; compare(timeNow, stages.night.start) &lt; 0: {
      currentStageName = "sunset";
      break;
    }
    default:
      break;
  }</code></pre>
<p>Once we've got the stage name, we can look up the colours and set the custom property values.</p>
<pre><code>
  root.style.setProperty(
    "--bg-gradient-top",
    stages[currentStageName].color1,
  );
  root.style.setProperty(
    "--bg-gradient-mid",
    stages[currentStageName].color2,
  );

  root.style.setProperty(
    "--bg-gradient-bottom",
      stages[currentStageName].color3,
  );</code></pre>
<p>I'm also setting a data attribute on the root so we can do some additional stage-based customisations, such as showing the stars when it's night.</p>
<pre><code>root.setAttribute("data-time", currentStageName);</code></pre>
<p>And that will give us our different gradient colours at different times of day!</p>
<p>And <em>then</em> I remembered that <code>color-mix</code> exists. Why restrict ourselves to just 4 times of day and 4 sets of colours, when we could make them... transition into each other?????</p>
<h2>Blending transitions with color-mix</h2>
<p><code>color-mix</code> is an extremely cool CSS function that lets you, well, mix two colours together. You tell it what colour space you're working with, and the colours, and the browser magically outputs the mix between the two.</p>
<pre><code>background: color-mix(in oklch, color1, color2)</code></pre>
<p>Much like with gradients, you can also specify a percentage value for the colours, which indicates the proportions of the colours:</p>
<pre><code>background: color-mix(in oklch, color1 20%, color2)</code></pre>
<p>So I could gradually feed in a bit of the next stage's colour until the next stage took over completely.</p>
<p>To get a percentage value for the next stage colour to feed in, I had to figure out how far through the current stage we are.</p>
<p>First, I'm calculating the time until the next stage - super simple with the <code>until</code> function on <code>Temporal</code> instances:</p>
<pre><code>time1.until(time2)</code></pre>
<p>This gives us a <code>Temporal.Duration</code> which represents a period between two time points. So, for example, if it's 7:45pm now and we're calculating <code>timeUntilNextStage</code>:</p>
<pre><code>const timeUntilNextStage = timeNow.until(stages.night.start)

console.log(timeUntilNextStage.toString()) // PT1H15M
</code></pre>
<p><code>Duration</code>s are stringified (and specified) using the <a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601 duration format</a>, so "PT1H15M" means "period, time separator, 1 hour, 15 minutes".Time information appears after the <code>T</code>; if the duration had any date information in it, it'd appear before the <code>T</code>.</p>
<p>We set <code>timeUntilNextStage</code> in the switch statement where we're deciding what stage we're in, for example:</p>
<pre><code>  case compare(timeNow, stages.sunrise.start) &gt;= 0 &amp;&amp; compare(timeNow, stages.day.start) &lt; 0: {
      currentStageName = "sunrise";
      timeUntilNextStage = timeNow.until(stages.night.start);
      break;
    }</code></pre>
<p>Once we've got the duration representing time until the next stage, we need to know the duration between the start of the current stage and the start of the next stage - let's call it the "transition duration". For sunset-to-night and sunrise-to-day, the transition duration is always 90 minutes; for night-sunrise and day-sunset, it'd be 11.5 hours. I didn't want the colour mixing to happen all throughout the day, only around sunrise/sunset like in real life, so I just decided to hardcode the transition duration for day and night to be 90 minutes so it matches the other two.</p>
<p>So for that, I can instantiate a <code>Duration</code> using the same ISO 8601 syntax:</p>
<pre><code>const entireTransitionDuration = Temporal.Duration.from("PT1H30M")</code></pre>
<p>Now I need to calculate the difference between the total duration and the time until next stage - basically, how far into the transition period we are, and therefore how much of a percentage we should mix in of the next colour.</p>
<p>Handily, Temporal gives us a <code>subtract</code> function as well:</p>
<pre><code>const diff = entireTransitionDuration.subtract(timeUntilNextStage)</code></pre>
<p>Then to figure out the transition progress as a percentage, we can divide <code>diff</code> by <code>entireTransitionDuration</code>. We'll do that with the time values in seconds so we can divide them, using the instance's <code>total</code> function:</p>
<pre><code>const entireTransitionDurationInSeconds = entireTransitionDuration.total({ unit: "seconds" })
const diffInSeconds = diff.total({ unit: "seconds" })
const transitionProgressPercent = Math.round((diffInSeconds / entireTransitionDurationInSeconds)*100).toFixed() // gives us a string representation with 0 d.p.</code></pre>
<h3>The midnight problem</h3>
<p>It's a little more complicated for the "night" stage, because that crosses midnight into the next day. Remember that our <code>PlainTime</code> only has time information, not date information - so if it's 10pm and you're asking it how long until sunrise at 6:30am, it'll give you a negative number!</p>
<pre><code>
const now = Temporal.PlainTime.from("22:00")
const sunrise = Temporal.PlainTime.from("06:30")
const d = now.until(sunrise) // Temporal.Duration -PT15H30M</code></pre>
<p>This causes problems at the point where I calculate the diff, as it'll come out as a large number and completely throw off the calculations. I got around this by getting the absolute value of the duration with <code>.abs()</code>, so <code>timeUntilNextStage</code> will always be positive, even if it's before midnight: e.g. what was<code>-PT15H30M</code> will now be <code>PT15H30M</code>. Calculating the diff by subtracting that from a <code>transitionDuration</code> of 90 mins will always yield a negative number.</p>
<pre><code> case compare(timeNow, stages.sunrise.start) &lt; 0 || compare(timeNow, stages.night.start) &gt;= 0: {
      currentStageName = "night";
      timeUntilNextStage = timeNow.until(stages.sunrise.start).abs();
      break;
    }</code></pre>
<p>Then, we only calculate a transition percentage if <code>diff</code> is greater than 0:</p>
<pre><code>  let transitionProgressPercent = 0;
  if (diffInSeconds &gt; 0) {
    transitionProgressPercent = Math.round((diffInSeconds / entireTransitionDurationInSeconds) * 100);
  }</code></pre>
<p>This works for the daytime stage too: if it's more than 90 mins before sunset, it'll come out with a negative diff - so that will just display the daytime colours and no transition.</p>
<h3>Let's mix!</h3>
<p>Now we can use that percentage value (which will always be a whole number) in the <code>color-mix</code> function to dictate how much of the next colour we should interpolate.</p>
<pre><code>color-mix(in oklch, ${color1} ${transitionProgressPercent}%, ${color2})</code></pre>
<p>I updated my <code>stages</code> object to include the next stage name as well:</p>
<pre><code> night: {
    start: Temporal.PlainTime.from("21:00:00"),
    next: "sunrise",
    color1: "oklch(25.27% 0.0919 276.73)",
    color2: "oklch(47.35% 0.284 283.78)",
    color3: "oklch(62.831% 0.23521 310.291)",
  }, // etc</code></pre>
<p>So we can get both colours dynamically when we set the variables with <code>color-mix</code>:</p>
<pre><code> root.style.setProperty(
    "--bg-gradient-top",
    `color-mix(in oklch, ${stages[nextStageName].color1} ${transitionProgressPercent}%, ${stages[currentStageName].color1})`,
  );</code></pre>
<p>And that's how we transition the colours!</p>
<h2>Transitioning the transitions</h2>
<p>As a bonus touch, I wanted the colour change to transition smoothly when you switch between stages manually using the picker on the top right. By declaring my <code>bg-gradient-xx</code> variables using <code>@property</code>, I can tell the browsers that yes, they are definitely colours - and therefore they can be animated.</p>
<p>Without this explicit custom property declaration, I could set the value of <code>--bg-gradient-top</code> to a number, or a position, or anything I wanted. By saying it's definitely a colour, the browser knows how to transition it into other values of the same type.</p>
<p>I initially did this with <code>@property</code> declarations in the CSS:</p>
<pre><code>@property --bg-gradient-top {
  syntax: "&lt;color&gt;";
  inherits: true;
  initial-value: oklch(...);
}
@property --bg-gradient-mid {
  syntax: "&lt;color&gt;";
  inherits: true;
  initial-value: oklch(...);
}
@property --bg-gradient-bottom {
  syntax: "&lt;color&gt;";
  inherits: true;
  initial-value: oklch(...);
}
</code></pre>
<p>Unfortunately, setting these in the CSS meant that you got a flash of whichever initial values I'd set before the JS kicked in and set the appropriate colours for time of day. If this page were server-driven, or always started from the same colour for everyone, it would've been fine. But the starting colour depends on your time zone and is only calculated when the initial JS runs.</p>
<p>I got around this by setting the properties via JS instead:</p>
<pre><code>  window.CSS.registerProperty({
    name: "--bg-gradient-top",
    syntax: "&lt;color&gt;",
    inherits: true,
    initialValue: stages[currentStageName].color1,
  });

  window.CSS.registerProperty({
    name: "--bg-gradient-mid",
    syntax: "&lt;color&gt;",
    inherits: true,
    initialValue: stages[currentStageName].color2,
  });

  window.CSS.registerProperty({
    name: "--bg-gradient-bottom",
    syntax: "&lt;color&gt;",
    inherits: true,
    initialValue: stages[currentStageName].color3,
  });</code></pre>
<p>I had to wrap these in a <code>try/catch</code> as it will throw if the property's already been defined. It wasn't super trivial to figure out if this property had already been set, as the CSS does define some values for these with the regular <code>--bg-gradient-xx: ...</code> syntax.</p>
<p>On the <code>body</code> and <code>footer</code> I set <code>transition-property</code> and <code>transition-duration</code> to tell it which properties I want to animate:</p>
<pre><code>  body {
    --background: fixed linear-gradient(var(--bg-gradient-top), var(--bg-gradient-mid) 80%);

    transition-property: --bg-gradient-top, --bg-gradient-mid;
    transition-duration: 0.5s;
  }

  footer {
    background: linear-gradient(oklch(0 0 0 / 0) 40%, var(--bg-gradient-bottom));
    transition: --bg-gradient-bottom 0.5s;
  }</code></pre>
<p>And like motherflipping magic, the colours transition seamlessly into each other when the values change! I love CSS. The animation is such an unnecessary touch, but this is my website so unnecessary is the name of the game.</p>
<h2>Polyfilling Temporal for Safari</h2>
<p>Alas, Safari is behind the times. We love progressive enhancement, and of course I could have just removed any of the transition logic for people whose browsers don't support Temporal, but that's no fun. They deserve sunsets too!</p>
<p>Writing a shim for Temporal was also no fun, but I did it because I love you.</p>
<p>There are various Temporal polyfills around and about, but I didn't want to end up importing a whole lot of extra JS when I only needed one or two functions. I'm not using any kind of bundler on this site - I use Eleventy to generate the pages, but scripts are just imported vanilla - so I couldn't import something with NPM and expect it to tree-shake any bits I wasn't using. It was a lot more lightweight to just write my own.</p>
<p>To check for Temporal support, it's a matter of just checking if <code>window.Temporal?.PlainTime</code> is undefined:</p>
<pre><code>const supportsTemporal = typeof window.Temporal?.PlainTime !== "undefined";</code></pre>
<p>I'm checking for <code>PlainTime</code> specifically as some browsers may have very high level Temporal implementations, but we can't do much without <code>PlainTime</code>.</p>
<p>To get the user's time in a non-Temporal world, we can just call the good old-fashioned <code>new Date()</code>:</p>
<pre><code>function getUserTime() {
  if (!supportsTemporal) {
    return new Date();
  }
  return Temporal.Now.plainTimeISO();
}</code></pre>
<p>To compare dates, we do it by comparing epoch timestamps. These represent the number of milliseconds since the Unix epoch, 01 Jan 1970.</p>
<pre><code>export function jsDateCompare(date1, date2) {
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();
  if (date1Ms === date2Ms) return 0;
  return date1Ms &lt; date2Ms ? -1 : 1;
}</code></pre>
<p>Then, we can just assign whichever version of the function we need:</p>
<pre><code>const compare = supportsTemporal ? Temporal.PlainTime.compare : jsDateCompare;</code></pre>
<p>To polyfill <code>until</code>, I've got a <code>durationBetween</code> function which will call <code>until</code> if Temporal's supported, otherwise it'll subtract two epoch timestamps, and divide the result by 1000 to get the duration as seconds:</p>
<pre><code>export function durationBetween(time1, time2) {
  if (!supportsTemporal) {
    return (time2.getTime() - time1.getTime()) / 1000;
  }

  return time1.until(time2);
}</code></pre>
<p>Then I call it like this:</p>
<pre><code> case compare(timeNow, stages.sunset.start) &gt;= 0 &amp;&amp; compare(timeNow, stages.night.start) &lt; 0: {
      currentStageName = "sunset";
      timeUntilNextStage = durationBetween(timeNow, stages.night.start);
      break;
    }</code></pre>
<p>I wrote a whole suite of unit tests (for a PERSONAL project! I know!) to make sure behaviour was exactly the same, and it seems to be working nicely. I'm hoping I can remove the polyfills in time, but given that the web is beautifully backwards-compatible, it's not the end of the world if it stays around longer than it needs to.</p>
<h2>Fixing a weird background glitch in Safari</h2>
<figure><picture><source sizes="auto" srcset="https://localghost.dev/img/cmqGHiVsJL-280.webp 280w," type="image/webp"/><img alt="A screenshot of the bottom half of my website, with a big white space in the background where the background should be. The background gradient cuts off a third of the way down the screen." sizes="auto" src="https://localghost.dev/img/cmqGHiVsJL-280.jpeg" srcset="https://localghost.dev/img/cmqGHiVsJL-280.jpeg 280w,"/></picture></figure>
<p>SAFARI WHY.</p>
<p>I started experiencing a very odd glitch in Safari for MacOS where the background gradient would only show up in the initial viewport - when you scrolled, it went white or black depending on whether it was light or dark mode. I narrowed it down to the <code>background-attachment: fixed</code> property of the body.</p>
<figure><video controls=""><source src="https://localghost.dev/img/background-glitch-safari-demo.mp4" type="video/mp4"/></video></figure>
<p>After a lot of disabling random CSS and diffing against the <code>main</code> branch, which doesn't have that problem, I found out that it really doesn't play nicely with <code>container-type: inline-size</code>. In the course of redesigning the site, I'd added a new container context to the <code>&lt;body&gt;</code> element and in the process broken the gradient rendering for Safari, as something goes wrong when it tries to render the gradient background with a <code>fixed</code> attachment. Chrome, Firefox and iOS Safari were totally fine.</p>
<p>When I half-jokingly said I'd have to find out what the modern equivalent of <code>&lt;!--[IF IE]&gt;</code> was, David Bushell <a href="https://social.lol/@db/116867834799255143">pointed me to</a> Eric Meyer's <a href="https://meyerweb.com/eric/thoughts/2026/05/28/accessible-i-think-split-cell-table-headers/#:~:text=@supports%20(font:%20-apple-system-body)">post about accessible table headers</a>, which in turn led me to <a href="https://browserstrangeness.github.io/css_hacks.html#safari">Browser Strangeness</a>. That did indeed have a <code>@supports</code> query that targeted Safari for MacOS:</p>
<pre><code>@supports (not (-webkit-text-size-adjust:none)) and (font: -apple-system-body) { .selector { property:value; } } }</code></pre>
<p>I stuck a <code>position-attachment: initial</code> in there, and lo and behold, the problem went away. It means the background isn't quite how I wanted it to look in Safari, but I'll survive.</p>
<h2>This was surprisingly complex</h2>
<p>The individual moving parts of this project - getting the time and choosing colours, mixing the colours by percentages, animating the transitions - were not that complicated in isolation. Sure, they required me to learn things and look things up, but it was a fun thing to build (until the point where Safari came into the picture).</p>
<p>The challenge came wiring it all together in a way that didn't cause flashes of unstyled content (the dreaded FOUC) or flashes of the wrong stage before we calculate the current time. This is a static site, so it's all client-side JS. Ideally I'd compute user's the current time on the server and serve the content with the correct colour values in the HTML, but my web host only supports static sites.</p>
<p>To get around that I had to add another separate <code>init.js</code> script which runs instantly - it's got a bit of a copy and paste job going on with some of the functions, but it does a very rudimentary check of the user's current time and sets the stage accordingly with no transitions, just so there's <em>some</em> styling on initial load. My JS is all modules, so is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script#defer">deferred by default</a>. I experimented with making <em>all</em> the JS render-blocking with <code>blocking="render"</code>, but that felt a bit gross and also didn't fix the FOUC in Firefox.</p>
<p>But that's fine, y'know? It still loads in well under a second, and still looks good if you have JS disabled. It's my personal site and it doesn't need to be perfect.</p>
<aside> <p><a href="https://localghost.dev/about">Sophie</a> is a personal website lover and inconsistent crafter, who does software engineering in exchange for money. </p> <p>This article was written by a human, for humans to read.</p> </aside>
