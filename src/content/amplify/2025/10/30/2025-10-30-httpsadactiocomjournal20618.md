---
author: Jeremy Keith
cover_image: 'https://adactio.com/images/photo-300.jpg'
date: '2025-10-30T17:01:49.890Z'
dateFolder: 2025/10/30
description: Don’t replace. Augment.
isBasedOn: 'https://adactio.com/journal/20618'
link: 'https://adactio.com/journal/20618'
slug: 2025-10-30-httpsadactiocomjournal20618
tags:
  - code
title: HTML web components
---
<p>Web components have been around for quite a while, but it feels like they’re having a bit of a moment right now.</p>
<p>It turns out that the best selling point for web components was “wait and see.” For everyone who didn’t see the benefit of web components over being locked into a specific framework, time is proving to be a great teacher.</p>
<p>It’s not just that <a href="https://www.abeautifulsite.net/posts/a-web-component-story/">web components are portable</a>. They’re also web standards, which means they’ll be around as long as web browsers. No framework can make that claim. As Jake Lazaroff puts it, <a href="https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/">web components will outlive your JavaScript framework</a>.</p>
<p>At this point React is legacy technology, like Angular. Lots of people are still using it, but nobody can quite remember why. The decision-makers in organisations who chose to build everything with React have long since left. People starting new projects who still decide to build on React are doing it largely out of habit.</p>
<p>Others are making more sensible judgements and, having been bitten by lock-in in the past, are now giving web components a go.</p>
<p>If you’re one of those people making the move from React to web components, there’ll certainly be a bit of a learning curve, but that would be true of any technology change.</p>
<p>I have a suggestion for you if you find yourself in this position. Try not to bring React’s mindset with you.</p>
<p>I’m talking about the way React components are composed. There’s often lots of props doing heavy lifting. The actual component element itself might be empty.</p>
<p>If you want to apply that model to web components, you can. Lots of people do. It’s not unusual to see web components in the wild that look like this:</p>
<pre><code>&lt;my-component&gt;&lt;/my-component&gt;</code></pre>
<p>The custom element is just a shell. All the actual power is elsewhere. It’s in the JavaScript that does all kinds of clever things with the shadow DOM, templates, and slots.</p>
<p>There is another way. Ask, <a href="https://sfba.social/@fonts/111211813228079834">as Robin does</a>, “what would HTML do?”</p>
<p>Think about composibility with existing materials. Do you really need to invent an entirely new component from scratch? Or can you use HTML up until it reaches its limit and then <em>enhance</em> the markup?</p>
<p><a href="https://buttondown.email/cascade/archive/005-why-web-components/">Robin writes</a>:</p>
<blockquote> <p>I don’t think we should see web components like the ones you might find in a huge monolithic React app: your Button or Table or Input components. Instead, I’ve started to come around and see Web Components as filling in the blanks of what we can do with hypertext: they’re really just small, reusable chunks of code that extends the language of HTML.</p> </blockquote>
<p>Dave talks about how web components can be <a href="https://daverupert.com/2021/10/html-with-superpowers/">HTML with superpowers</a>. I think that’s a good attitude to have. Instead of all-singing, all-dancing web components, it feels a lot more elegant to use web components to augment your existing markup with just enough extra behaviour.</p>
<p>Where does the shadow DOM come into all of this? It doesn’t. And that’s okay. I’m not saying it should be avoided completely, but it should be a last resort. See how far you can get with the composibility of regular HTML first.</p>
<p><a href="https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/">Eric described his recent epiphany with web components</a>. He created a <code>super-slider</code> custom element that wraps around an existing <code>label</code> and <code>input type="range"</code>:</p>
<blockquote> <p>You just take some normal HTML markup, wrap it with a custom element, and then write some JS to add capabilities which you can then style with regular CSS! Everything’s of the Light Side of the Web. No need to pierce the Vale of Shadows or whatever.</p> </blockquote>
<p>When you wrap some existing markup in a custom element and then apply some new behaviour with JavaScript, technically you’re not doing anything you couldn’t have done before with some DOM traversal and event handling. But it’s less fragile to do it with a web component. It’s portable. It obeys the single responsibility principle. It only does one thing but it does it well.</p>
<p>Jim created <a href="https://blog.jim-nielsen.com/2023/web-components-icon-galleries/">an <code>icon-list</code> custom element</a> that wraps around a regular <code>ul</code> populated with <code>li</code> elements. But he feels almost bashful about even calling it a web component:</p>
<blockquote> <p>Maybe I shouldn’t be using the term “web component” for what I’ve done here. I’m not using shadow DOM. I’m not using the templates or slots. I’m really only using custom elements to attach functionality to a specific kind of component.</p> </blockquote>
<p>I think what Eric and Jim are doing is exemplary. See also <a href="https://www.zachleat.com/web/?category=web-components">Zach’s web components</a>.</p>
<p>At the end of <a href="https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/">his post</a>, Eric says he’d like a nice catchy term for these kinds of web components. In <a href="https://github.com/davatron5000/awesome-standalones#element-extensions">Dave’s catalogue of web components</a>, they’re called “element extensions.” I like that. It’s pretty catchy.</p>
<p>Or we could call them “HTML web components.” If your custom element is empty, it’s not an HTML web component. But if you’re using a custom element to extend existing markup, that’s an HTML web component.</p>
<p>React encouraged a mindset of replacement: “forgot what browsers can do; do everything in a React component instead, even if you’re reinventing the wheel.”</p>
<p>HTML web components encourage a mindset of augmentation instead.</p>
