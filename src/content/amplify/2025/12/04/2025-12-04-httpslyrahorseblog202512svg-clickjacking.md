---
author: lyra's epic blog
cover_image: null
date: '2025-12-04T16:56:25.420Z'
dateFolder: 2025/12/04
description: A novel and powerful twist on an old classic.
isBasedOn: 'https://lyra.horse/blog/2025/12/svg-clickjacking/'
link: 'https://lyra.horse/blog/2025/12/svg-clickjacking/'
slug: 2025-12-04-httpslyrahorseblog202512svg-clickjacking
tags:
  - infosec
title: SVG Filters - Clickjacking 2.0
---
<p>Clickjacking is a classic attack that consists of covering up an iframe of some other website in an attempt to trick the user into unintentionally interacting with it. It works great if you need to trick someone into pressing a button or two, but for anything more complicated it’s kind of unrealistic.</p>
<p>I’ve discovered a new technique that turns classic clickjacking on its head and enables the creation of complex interactive clickjacking attacks, as well as multiple forms of data exfiltration.</p>
<p>I call this technique “<strong>SVG clickjacking</strong>”.</p>
<p>Everybody will be able to see your secrets.</p>
<h2>Liquid SVGs</h2>
<p>The day Apple announced its new Liquid Glass redesign was pretty chaotic. You couldn’t go on social media without every other post being about the new design, whether it was critique over how inaccessible it seemed, or awe at how realistic the refraction effects were.</p>
<p>Drowning in the flurry of posts, a thought came to mind - how hard would it be to re-create this effect? Could I do this, on the web, without resorting to canvas and shaders? I got to work, and about an hour later I had <a href="https://codepen.io/rebane2001/details/OPVQXMv">a pretty accurate CSS/SVG recreation of the effect</a><sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:1">1</a></sup>.</p>
<p><em>You can drag around the effect with the bottom-right circle control thing in the demo above (chrome/firefox desktop, chrome mobile).</em></p>
<p>My little tech demo made quite a splash online, and even resulted in a <a href="https://80.lv/articles/accurate-apple-s-liquid-glass-effect-recreated-with-css-svg">news article</a> with what is probably the wildest quote about me to date: <em>“Samsung and others have nothing on her”</em>.</p>
<p>A few days passed, and another thought came to mind - would this SVG effect work on top of an iframe?</p>
<p>Like, surely not? The way the effect “refracts light”<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:2">2</a></sup> is way too complex to work on a cross-origin document.</p>
<p>But, to my surprise, it did.</p>
<p>The reason this was so interesting to me is that my liquid glass effect uses the <code>feColorMatrix</code> and <code>feDisplacementMap</code> SVG filters - changing the colors of pixels, and moving them, respectively. And I could do that on a cross-origin document?</p>
<p>This got me wondering - do any of the other filters work on iframes, and could we turn that into an attack somehow? It turns out that it’s all of them, and yes!</p>
<h2>Building blocks</h2>
<p>I got to work, going through every <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element#f">&lt;fe*&gt;</a> SVG element and figuring out which ones can be combined to build our own attack primitives.</p>
<p>These filter elements take in one or more input images, apply operations to them, and output a new image. You can chain a bunch of them together within a single SVG filter, and refer to the output of any of the previous filter elements in the chain.</p>
<p>Let’s take a look at some of the more useful base elements we can play with:</p>
<ul> <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComposite"><strong>&lt;feComposite&gt;</strong></a> - compositing utilities, can be used to apply an alpha matte, or do various arithmetics on one or two inputs;</li> <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feColorMatrix"><strong>&lt;feColorMatrix&gt;</strong></a> - apply a color matrix, this allows moving colors between channels and converting between alpha and luma mattes;</li> </ul>
<p>That’s quite a selection of utilities!</p>
<p>If you’re a demoscener<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:3">3</a></sup> you’re probably feeling right at home. These are the fundamental building blocks for many kinds of computer graphics, and they can be combined into many useful primitives of our own. So let’s see some examples.</p>
<p>I’ll start off with an example of basic data exfiltration. Suppose you’re targeting an iframe that contains some sort of sensitive code. You <em>could</em> ask the user to retype it by itself, but that’d probably seem suspicious.</p>
<p>What we can do instead is make use of <code>feDisplacementMap</code> to make the text seem like a captcha! This way, the user is far more likely to retype the code.</p>
<p>Here is your secret code:</p>
<p>6c79 7261 706f 6e79</p>
<p>Don't share it with anyone!</p>
<p>Here is your secret code:</p>
<p>6c79 7261 706f 6e79</p>
<pre><code>&lt;iframe src="..." style="filter:url(#captchaFilter)"&gt;&lt;/iframe&gt;
&lt;svg width="768" height="768" viewBox="0 0 768 768" xmlns="http://www.w3.org/2000/svg"&gt;
  &lt;filter id="captchaFilter"&gt;
    &lt;feTurbulence
      type="turbulence"
      baseFrequency="0.03"
      numOctaves="4"
      result="turbulence" /&gt;
    &lt;feDisplacementMap
      in="SourceGraphic"
      in2="turbulence"
      scale="6"
      xChannelSelector="R"
      yChannelSelector="G" /&gt;
  &lt;/filter&gt;
&lt;/svg&gt;
</code></pre>
<p><em>Note: Only the part inside the <code>&lt;filter&gt;</code> block is relevant, the rest is just an example of using filters.</em></p>
<p>Add to this some color effects and random lines, and you’ve got a pretty convincing cap-tcha!</p>
<p>Out of all the attack primitives I’ll be sharing, this one is probably the least useful as sites rarely allow you to frame pages giving out magic secret codes. I wanted to show it though, as it’s a pretty simple introduction to the attack technique.</p>
<p> )]}' [[1337],[1,"AIzaSyAtbm8sIHRoaXMgaXNuJ3QgcmVhbCBsb2w",0,"a",30],[768972,768973,768932,768984,768972,768969,768982,768969,768932,768958,768951],[105,1752133733,7958389,435644166009,7628901,32481100117144691,28526,28025,1651273575,15411]]</p>
<p>Still, it could come in handy because often times you’re allowed to frame read-only API endpoints, so maybe there’s an attack there to discover.</p>
<h3>Grey text hiding</h3>
<p>The next example is for situations where you want to trick someone into, for example, interacting with a text input. Oftentimes the inputs have stuff like grey placeholder text in them, so showing the input box by itself won’t cut it.</p>
<p>Let’s take a look at our example target (try typing in the box).</p>
<p>In this example we want to trick the user into setting an attacker-known password, so we want them to be able to see the text they’re entering, but not the grey placeholder text, nor the red “too short” text.</p>
<p>Let’s start off by using <code>feComposite</code> with arithmetics to make the grey text disappear. The <code>arithmetic</code> operation takes in two images, <code>i1</code> (<code>in=...</code>) and <code>i2</code> (<code>in2=...</code>), and lets us do per-pixel maths with <code>k1</code>, <code>k2</code>, <code>k3</code>, <code>k4</code> as the arguments according to this formula: <sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:4">4</a></sup>.</p>
<p><em>Tip! You can leave out the in/in2 parameters if you just want it to be the previous output.</em></p>
<p>It’s getting there - by multiplying the brightness of the input we’ve made the grey text disappear, but now the black text looks a little suspicious and hard to read, especially on 1x scaling displays.</p>
<p>We <em>could</em> play around with the arguments to find the perfect balance between hiding the grey text and showing the black one, but ideally we’d still have the black text look the way usually does, just without any grey text. Is that possible?</p>
<p>So here’s where a really cool technique comes into play - masking. We’re going to create a matte to “cut out” the black text and cover up everything else. It’s going to take us quite a few steps to get to the desired result, so lets go through it bit-by-bit.</p>
<p>We start off by cropping the result of our black text filter with <code>feTile</code>.</p>
<p>Note: Safari seems to be having some trouble with <code>feTile</code>, so if  you're writing an attack for Safari, you can also achieve cropping by making a luma matte with <code>feFlood</code> and then applying it.</p>
<p>Then we use <code>feMorphology</code> to increase the thickness of the text.</p>
<p>Now we have to increase the contrast of the mask. I’m going to do it by first using <code>feFlood</code> to create a solid white image, which we can then <code>feBlend</code> with <code>difference</code> to invert our mask. And then we can use <code>feComposite</code> to multiply<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:5">5</a></sup> the mask for better contrast.</p>
<p>We have a luma matte now! All that’s left is to convert it into an alpha matte with <code>feColorMatrix</code>, apply it to the source image with <code>feComposite</code>, and make the background white with <code>feBlend</code>.</p>
<p>Looks pretty good, doesn’t it! If you empty out the box (try it!) you might notice some artifacts that give away what we’ve done, but apart from that it’s a pretty good way to sort of sculpt and form various inputs around a bit for an attack.</p>
<p>There are all sorts of other effects you can add to make the input seem just right. Let’s combine everything together into a complete example of an attack.</p>
<pre><code>&lt;filter&gt;
  &lt;feComposite operator=arithmetic
               k1=0 k2=4 k3=0 k4=0 /&gt;
  &lt;feTile x=20 y=56 width=184 height=22 /&gt;
  &lt;feMorphology operator=erode radius=3 result=thick /&gt;
  &lt;feFlood flood-color=#FFF result=white /&gt;
  &lt;feBlend mode=difference in=thick in2=white /&gt;
  &lt;feComposite operator=arithmetic k2=100 /&gt;
  &lt;feColorMatrix type=matrix
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0" /&gt;
  &lt;feComposite in=SourceGraphic operator=in /&gt;
  &lt;feTile x=21 y=57 width=182 height=20 /&gt;
  &lt;feBlend in2=white /&gt;
  &lt;feBlend mode=difference in2=white /&gt;
  &lt;feComposite operator=arithmetic k2=1 k4=0.02 /&gt;
&lt;/filter&gt;
</code></pre>
<p>You can see how the textbox is entirely recontextualized now to fit a different design while still being fully functional.</p>
<h3>Pixel reading</h3>
<p>And now we come to what is most likely the most useful attack primitive - pixel reading. That’s right, you can use SVG filters to read color data off of images and perform all sorts of logic on them to create really advanced and convincing attacks.</p>
<p>The catch is of course, that you’ll have to do everything within SVG filters - there is no way to get the data out<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:6">6</a></sup>. Despite that, it is very powerful if you get creative with it.</p>
<p>On a higher level, what this lets us do is make everything in a clickjacking attack responsive - fake buttons can have hover effects, pressing them can show fake dropdowns and dialogs, and we can even have fake form validation.</p>
<p>Let’s start off with a simple example - detecting if a pixel is pure black, and using it to turn another filter on or off.</p>
<p>For this target, we want to detect when the user clicks on the box to change its color, and use that to toggle a blur effect.</p>
<p>Let’s start off by using two copies of the <code>feTile</code> filter to first crop out the few pixels we’re interested in and then tile those pixels across the entire image.</p>
<p>The result is that we now have the entire screen filled with the color of the area we are interested in.</p>
<p>We can turn this result into a binary on/off value by using <code>feComposite</code>’s arithmetic the same way as in the last section, but with a way larger <code>k2</code> value. This makes it so that the output image is either completely black or completely white.</p>
<pre><code>&lt;feColorMatrix type=matrix
  values="0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 1 0 0" result=mask /&gt;
&lt;feGaussianBlur in=SourceGraphic
                stdDeviation=3 /&gt;
&lt;feComposite operator=in in2=mask /&gt;
&lt;feBlend in2=SourceGraphic /&gt;
</code></pre>
<p>And just as before, this can be used as a mask. We once again convert it into an alpha matte, but this time apply it to the blur filter.</p>
<p>So that’s how you can find out whether a pixel is black and use that to toggle a filter!</p>
<p>Uh oh! It seems that somebody has changed the target to have a pride-themed button instead!</p>
<p>How can we adapt this technique to work with arbitrary colors and textures?</p>
<pre><code>&lt;!-- crop to first stripe of the flag --&gt;
&lt;feTile x="22" y="22"
        width="4" height="4" /&gt;
&lt;feTile x="0" y="0" result="col"
        width="100%" height="100%" /&gt;
&lt;!-- generate a color to diff against --&gt;
&lt;feFlood flood-color="#5BCFFA"
         result="blue" /&gt;
&lt;feBlend mode="difference"
         in="col" in2="blue" /&gt;
&lt;!-- k4 is for more lenient threshold --&gt;
&lt;feComposite operator=arithmetic
             k2=100 k4=-5 /&gt;
&lt;!-- do the masking and blur stuff... --&gt;
...
</code></pre>
<p>The solution is pretty simple - we can simply use <code>feBlend</code>’s difference combined with a <code>feColorMatrix</code> to join the color channels to turn the image into a similar black/white matte as before. For textures we can use <code>feImage</code>, and for non-exact colors we can use a bit of <code>feComposite</code>’s arithmetic to make the matching threshold more lenient.</p>
<p>And that’s it, a simple example of how we can read a pixel value and use it to toggle a filter.</p>
<h3>Logic gates</h3>
<p>But here’s the part where it gets fun! We can repeat the pixel-reading process to read out multiple pixels, and then run logic on them to program an attack.</p>
<p>By using <code>feBlend</code> and <code>feComposite</code>, we can recreate all logic gates and make SVG filters <a href="https://en.wikipedia.org/wiki/Functional_completeness">functionally complete</a>. This means that we can program anything we want, as long as it is not timing-based<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:7">7</a></sup> and doesn’t take up too many resources<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:8">8</a></sup>.</p>
<p>NOT:  <br/>
<code>&lt;feBlend mode=difference in2=white /&gt;</code></p>
<p>AND:  <br/>
<code>&lt;feComposite operator=arithmetic k1=1 /&gt;</code></p>
<p>OR:  <br/>
<code>&lt;feComposite operator=arithmetic k2=1 k3=1 /&gt;</code></p>
<p>XOR:  <br/>
<code>&lt;feBlend mode=difference in=a in2=b /&gt;</code></p>
<p>NOR:  <br/>
<code>(OR + NOT)</code></p>
<p>These logic gates are what modern computers are made of. You could build a computer within an SVG filter if you wanted to. In fact, here’s a basic calculator I made:</p>
<p>This is a <a href="https://en.wikipedia.org/wiki/Adder_%28electronics%29#Full_adder">full adder</a> circuit. This filter implements the logic gates  for the output and  for the carry bit using the logic gates described above. There are more efficient ways to implement an adder in SVG filters, but this is meant to serve as proof of the ability to implement arbitrary logic circuits.</p>
<pre><code>&lt;!-- util --&gt;
&lt;feOffset in="SourceGraphic" dx="0" dy="0" result=src /&gt;
&lt;feTile x="16px" y="16px" width="4" height="4" in=src /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" result=a /&gt;
&lt;feTile x="48px" y="16px" width="4" height="4" in=src /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" result=b /&gt;
&lt;feTile x="72px" y="16px" width="4" height="4" in=src /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" result=c /&gt;
&lt;feFlood flood-color=#FFF result=white /&gt;
&lt;!-- A ⊕ B --&gt;
&lt;feBlend mode=difference in=a in2=b result=ab /&gt;
&lt;!-- [A ⊕ B] ⊕ C --&gt;
&lt;feBlend mode=difference in2=c /&gt;
&lt;!-- Save result to 'out' --&gt;
&lt;feTile x="96px" y="0px" width="32" height="32" result=out /&gt;
&lt;!-- C ∧ [A ⊕ B] --&gt;
&lt;feComposite operator=arithmetic k1=1 in=ab in2=c result=abc /&gt;
&lt;!-- (A ∧ B) --&gt;
&lt;feComposite operator=arithmetic k1=1 in=a in2=b /&gt;
&lt;!-- [A ∧ B] ∨ [C ∧ (A ⊕ B)] --&gt;
&lt;feComposite operator=arithmetic k2=1 k3=1 in2=abc /&gt;
&lt;!-- Save result to 'carry' --&gt;
&lt;feTile x="64px" y="32px" width="32" height="32" result=carry /&gt;
&lt;!-- Combine results --&gt;
&lt;feBlend in2=out /&gt;
&lt;feBlend in2=src result=done /&gt;
&lt;!-- Shift first row to last --&gt;
&lt;feTile x="0" y="0" width="100%" height="32" /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" result=lastrow /&gt;
&lt;feOffset dx="0" dy="-32" in=done /&gt;
&lt;feBlend in2=lastrow /&gt;
&lt;!-- Crop to output --&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" /&gt;
</code></pre>
<p>Anyways, for an attacker, what all of this means is that you can make a multi-step clickjacking attack with lots of conditions and interactivity. And you can run logic on data from cross-origin frames.</p>
<p>This is an example target where we want to trick the user into marking themselves as hacked, which requires a few steps:</p>
<ul> <li>Clicking a button to open a dialog</li> <li>Waiting for the dialog to load</li> <li>Clicking a checkbox within the dialog</li> <li>Clicking another button in the dialog</li> <li>Checking for the red text that appeared</li> </ul>
<p>A traditional clickjacking attack against this target would be difficult to pull off. You’d need to have the user click on multiple buttons in a row with no feedback in the UI.</p>
<p>There are some tricks you could do to make a traditional attack more convincing than what you see above, but it’s still gonna look sketch af. And the moment you throw something like a text input into the mix, it’s just not gonna work.</p>
<p>Anyways, let’s build out a logic tree for a filter-based attack:</p>
<ul> <li>Is the dialog open? <ul> <li><em>(No)</em> Is the red text present? <ul> <li><em>(No)</em> Make the user press the button</li> <li><em>(Yes)</em> Show the end screen</li> </ul> </li> <li><em>(Yes)</em> Is the dialog loaded? <ul> <li><em>(Yes)</em> Is the checkbox checked? <ul> <li><em>(No)</em> Make the user check the checkbox</li> <li><em>(Yes)</em> Make the user click the button</li> </ul> </li> </ul> </li> </ul> </li> </ul>
<p>Which can be expressed in logic gates<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:9">9</a></sup> as:</p>
<ul> <li>Inputs <ul> <li><strong>D</strong> (dialog visible) = check for background dim</li> <li><strong>L</strong> (dialog loaded) = check for the button in dialog</li> <li><strong>C</strong> (checkbox checked) = check whether the button is blue or grey</li> <li><strong>R</strong> (red text visible) = <code>feMorphology</code> and check for red pixels</li> </ul> </li> <li>Outputs <ul> <li>(¬<strong>D</strong>) ∧ (¬<strong>R</strong>) =&gt; button1.png</li> <li><strong>D</strong> ∧ (¬<strong>L</strong>) =&gt; loading.png</li> <li><strong>D</strong> ∧ <strong>L</strong> ∧ (¬<strong>C</strong>) =&gt; checkbox.png</li> <li><strong>D</strong> ∧ <strong>L</strong> ∧ <strong>C</strong> =&gt; button2.png</li> <li>(¬<strong>D</strong>) ∧ <strong>R</strong> =&gt; end.png</li> </ul> </li> </ul>
<p>And this is how we would implement it in SVG:</p>
<pre><code>&lt;!-- util --&gt;
&lt;feTile x="14px" y="4px" width="4" height="4" in=SourceGraphic /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" /&gt;
&lt;feColorMatrix type=matrix result=debugEnabled
  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" /&gt;
&lt;feFlood flood-color=#FFF result=white /&gt;
&lt;!-- attack imgs --&gt;
&lt;feImage xlink:href="data:..." x=0 y=0 width=420 height=220 result=button1.png&gt;&lt;/feImage&gt;
&lt;feImage xlink:href="data:..." x=0 y=0 width=420 height=220 result=loading.png&gt;&lt;/feImage&gt;
&lt;feImage xlink:href="data:..." x=0 y=0 width=420 height=220 result=checkbox.png&gt;&lt;/feImage&gt;
&lt;feImage xlink:href="data:..." x=0 y=0 width=420 height=220 result=button2.png&gt;&lt;/feImage&gt;
&lt;feImage xlink:href="data:..." x=0 y=0 width=420 height=220 result=end.png&gt;&lt;/feImage&gt;
&lt;!-- D (dialog visible) --&gt;
&lt;feTile x="4px" y="4px" width="4" height="4" in=SourceGraphic /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" /&gt;
&lt;feBlend mode=difference in2=white /&gt;
&lt;feComposite operator=arithmetic k2=100 k4=-1 result=D /&gt;
&lt;!-- L (dialog loaded) --&gt;
&lt;feTile x="313px" y="141px" width="4" height="4" in=SourceGraphic /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" result="dialogBtn" /&gt;
&lt;feBlend mode=difference in2=white /&gt;
&lt;feComposite operator=arithmetic k2=100 k4=-1 result=L /&gt;
&lt;!-- C (checkbox checked) --&gt;
&lt;feFlood flood-color=#0B57D0 /&gt;
&lt;feBlend mode=difference in=dialogBtn /&gt;
&lt;feComposite operator=arithmetic k2=4 k4=-1 /&gt;
&lt;feComposite operator=arithmetic k2=100 k4=-1 /&gt;
&lt;feColorMatrix type=matrix
               values="1 1 1 0 0
                       1 1 1 0 0
                       1 1 1 0 0
                       1 1 1 1 0" /&gt;
&lt;feBlend mode=difference in2=white result=C /&gt;
&lt;!-- R (red text visible) --&gt;
&lt;feMorphology operator=erode radius=3 in=SourceGraphic /&gt;
&lt;feTile x="17px" y="150px" width="4" height="4" /&gt;
&lt;feTile x="0" y="0" width="100%" height="100%" result=redtext /&gt;
&lt;feColorMatrix type=matrix
               values="0 0 1 0 0
                       0 0 0 0 0
                       0 0 0 0 0
                       0 0 1 0 0" /&gt;
&lt;feComposite operator=arithmetic k2=2 k3=-5 in=redtext /&gt;
&lt;feColorMatrix type=matrix result=R
               values="1 0 0 0 0
                       1 0 0 0 0
                       1 0 0 0 0
                       1 0 0 0 1" /&gt;
&lt;!-- Attack overlays --&gt;
&lt;feColorMatrix type=matrix in=R
  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" /&gt;
&lt;feComposite in=end.png operator=in /&gt;
&lt;feBlend in2=button1.png /&gt;
&lt;feBlend in2=SourceGraphic result=out /&gt;
&lt;feColorMatrix type=matrix in=C
  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" /&gt;
&lt;feComposite in=button2.png operator=in /&gt;
&lt;feBlend in2=checkbox.png result=loadedGraphic /&gt;
&lt;feColorMatrix type=matrix in=L
  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" /&gt;
&lt;feComposite in=loadedGraphic operator=in /&gt;
&lt;feBlend in2=loading.png result=dialogGraphic /&gt;
&lt;feColorMatrix type=matrix in=D
  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" /&gt;
&lt;feComposite in=dialogGraphic operator=in /&gt;
&lt;feBlend in2=out /&gt;
</code></pre>
<p>Play around with this and see just how much more convincing it is as an attack. And we could easily make it better by, for example, adding some extra logic to also add hover visuals to the buttons. The demo has debug visuals for the four inputs (D, L, C, R) in the bottom left as squares to make it easier to understand what’s going on.</p>
<p>But yeah, that’s how you can make complex and long clickjacking attacks that have not been realistic with the traditional clickjacking methods.</p>
<p>I kept this example here pretty short and simple, but real-world attacks can be a lot more involved and polished.</p>
<p>In fact…</p>
<h2>The Docs bug</h2>
<p>I’ve actually managed to pull off this attack against Google Docs!</p>
<p>Take a look at the demo videos <a href="https://infosec.exchange/@rebane2001/115265287713185877">here</a> (alt links: <a href="https://bsky.app/profile/rebane2001.bsky.social/post/3lzo4euxo5s2p">bsky</a>, <a href="https://twitter.com/rebane2001/status/1971213061580259814">twitter</a>).</p>
<p>What this attack does is:</p>
<ul> <li>Makes the user click on the “Generate Document” button</li> <li>Once pressed, detects the popup and shows a textbox for the user to type a “captcha” into <ul> <li>The textbox starts off with a gradient animation, which must be handled</li> <li>The textbox has focus states, which must also be present in the attack visuals, so they must be detected by the background color of the textbox</li> <li>The textbox has grey text for both a placeholder AND suggestions, which must be hidden with the technique discussed earlier</li> </ul> </li> <li>Once the captcha is typed, makes the user seemingly click on a button (or press enter), which causes a suggested Docs item to be added into the textbox <ul> <li>This item must be detected by looking for its background color in the textbox</li> </ul> </li> <li>Once the item is detected, the textbox must be hidden and another button must be shown instead <ul> <li>Once that button is clicked, a loading screen appears, which must be detected</li> </ul> </li> <li>If the loading screen is present, or the dialog is not visible and the “Generate Document” button is not present, the attack is over and the final screen must be shown</li> </ul>
<p>In the past, individual parts of such an attack could’ve been pulled off through traditional clickjacking and some basic CSS, but the entire attack would’ve been way too long and complex to be realistic. With this new technique of running logic inside SVG filters, such attacks become realistic.</p>
<p>Google VRP awarded me $3133.70 for the find. That was, of course, <a href="https://infosec.exchange/@rebane2001/115349916882356842">right before</a> they introduced a novelty bonus for new vulnerability classes. Hmph!<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:10">10</a></sup></p>
<h2>The QR attack</h2>
<p>Something I see in online discussions often is the insistence on QR codes being dangerous. It kind of rubs me the wrong way because QR codes are not any more dangerous than links.</p>
<p>I don’t usually comment on this too much because it’s best to avoid suspicious links, and the same goes for QR codes, but it does nag me to see people make QR codes out to be this evil thing that can somehow immediately hack you.</p>
<p>I turns out though, that my SVG filters attack technique can be applied to QR codes as well!</p>
<p>The example from earlier in the blog with retyping a code becomes impractical once the user realizes they’re typing something they shouldn’t. We can’t stuff the data we exfiltrate into a link either, because an SVG filter cannot create a link.</p>
<p>But since an SVG filter can run logic and provide visual output, perhaps we could generate a QR code with a link instead?</p>
<h3>Creating the QR</h3>
<p>Creating a QR code within an SVG filter is easier said than done however. We can shape binary data into the shape of a QR code by using <code>feDisplacementMap</code>, but for a QR code to be scannable it also needs error correction data.</p>
<p>QR codes use <a href="https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction">Reed-Solomon error correction</a>, which is some fun math stuff that’s a bit more advanced than a simple checksum. It does math with polynomials and stuff and that is a bit annoying to reimplement in an SVG.</p>
<p>Luckily for us, I’ve faced the same problem before! Back in 2021 I was the first person<sup><a href="https://lyra.horse/blog/2025/12/svg-clickjacking/#fn:11">11</a></sup> to <a href="https://www.planetminecraft.com/project/rebane-s-qr-code-generator/">make a QR code generator in Minecraft</a>, so I’ve already figured out the things necessary.</p>
<p>In my build I pre-calculated some lookup tables for the error correction, and used those instead to make the build simpler - and we can do the same with the SVG filter.</p>
<p>This post is already getting pretty long, so I’ll leave figuring out how this filter works as an exercise to the reader ;).</p>
<p>This is a demo that displays a QR code telling you how many seconds you’ve been on this page for. It’s a bit fiddly, so if it doesn’t work make sure that you aren’t using any display scaling or a custom color profile. On Windows you can toggle the <em>Automatically manage color for apps</em> setting, and on a Mac you can set the color profile to sRGB for it to work.</p>
<p>This demo does not work on mobile devices. And also, for the time being, it only works in Chromium-based browsers, but I believe it could be made to work in Firefox too.</p>
<p>Similarly, in a real attack, the scaling and color profile issues could be worked around using some JavaScript tricks or simply by implementing the filter a bit differently - this here is just a proof of concept that’s a bit rough around the edges.</p>
<p>But yeah, that’s a QR code generator built inside and SVG filter!</p>
<p>Took me a while to make, but I didn’t want to write about it just being “theoretically possible”.</p>
<h3>Attack scenario</h3>
<p>So the attack scenario with the QR code is that you’d read pixels from a frame, process them to extract the data you want, encode them into a URL that looks something like <em>https://lyra.horse/?ref=c3VwZXIgc2VjcmV0IGluZm8</em> and render it as a QR code.</p>
<p>Then, you prompt the user to scan the QR code for whatever reason (eg anti-bot check). To them, the URL will seem like just a normal URL with a tracking ID or something in it.</p>
<p>Once the user opens the URL, your server gets the request and receives the data from the URL.</p>
<p>There are so many ways to make use of this technique I won’t have time to go over them all in this post. Some examples would be reading text by using the difference blend mode, or exfiltrating data by making the user click on certain parts of the screen.</p>
<p>You could even insert data from the outside to have a fake mouse cursor inside the SVG that shows the <i>pointer</i> cursor and reacts to fake buttons inside your SVG to make the exfiltration more realistic.</p>
<p>Or you could code up attacks with CSS and SVG where CSP doesn’t allow for any JS.</p>
<p>Anyways, this post is long as is, so I’ll leave figuring out these techniques as homework.</p>
<h2>Novel technique</h2>
<p>This is the first time in my security research I’ve found a completely new technique!</p>
<p>I introduced it briefly at <a href="https://youtu.be/INgS4IipEhU?t=1516">my BSides talk in September</a>, and this post here is a more in-depth overview of the technique and how it can be used.</p>
<p>Of course, you can never know 100% for sure that a specific type of attack has never been found by anyone else, but my extensive search of existing security research has come up with nothing, so I suppose I can crown myself as the researcher who discovered it?</p>
<p>Here’s some previous research I’ve found:</p>
<ul> <li><a href="https://link.springer.com/article/10.1007/s10207-018-0423-3">You click, I steal: analyzing and detecting click hijacking attacks in web pages</a>,<br/> <a href="https://www.usenix.org/system/files/conference/woot12/woot12-final16.pdf">On the fragility and limitations of current Browser-provided Clickjacking protection schemes</a> <ul> <li>The papers mention SVG filters in clickjacking attacks, but only in the context of obscuring the underlying elements, not running logic.</li> </ul> </li> <li><a href="https://media.blackhat.com/us-13/US-13-Stone-Pixel-Perfect-Timing-Attacks-with-HTML5-WP.pdf">Pixel Perfect Timing - Attacks with HTML5</a>,<br/> <a href="https://issues.chromium.org/issues/40077679"> Security: SVG Filter Timing Attack</a> <ul> <li>Research on reading pixels through SVG filter timing attacks, which is a technique that is mitigated in modern browsers.</li> </ul> </li> <li><a href="https://ronmasas.com/posts/the-human-side-channel">The Human Side Channel</a> <ul> <li>Some pretty cool clickjacking techniques, though no multi-step attacks or SVG logic.</li> </ul> </li> <li><a href="https://github.com/tom-p-reichel/svg-is-turing-complete">SVG is turing-complete-ish</a> <ul> <li>Another example of logic gates in SVG I found after writing my blog. It’s fun because it comes with <a href="https://old.reddit.com/r/programming/comments/d4xcgs/svg_is_turing_complete/">reddit</a> and <a href="https://news.ycombinator.com/item?id=20980837">hn</a> threads - I particularly like the comment asking about whether this turing completeness is useful or just a fun fact, which got a reply confirming the latter. I like turning fun facts into vulnerabilities ^^.</li> <li>Note that whether SVG filters are actually turing complete is questionable because filters are implemented in constant-time and can’t run in a loop. This doesn’t mean they can’t be turing complete, but it also doesn’t prove that they are.</li> </ul> </li> </ul>
<p>I don’t think <em>me</em> discovering this technique was just luck though. I have a history of seeing things such as CSS as programming languages to exploit and be creative with. It wasn’t a stretch for me to see SVG filters as a programming language either.</p>
<p>That, and my overlap between security research and creative projects - I often blur the lines between the two, which is what <a href="https://lyra.horse/antonymph/">Antonymph</a> was born out of.</p>
<p>In any case, it feels awesome to discover something like this.</p>
<p>whoa this post took such a long time for me to get done!</p>
<p>i started work on it in july, and was expecting to release it alongside <a href="https://youtu.be/INgS4IipEhU">my CSS talk</a> in september, but it has taken me so much longer than expected to actually finish this thing. i wanted to make sure it was a good in-depth post, rather than something i just get out as soon as possible.</p>
<p>unlike my previous posts, i did unfortunately have to break my trend of using no images, since i needed a few data URIs within the SVG filters for demos. still, no images anywhere else in the post, no javascript, and just 42kB (gzip) of handcrafted html/css/svg.</p>
<p>also, i usually hide a bunch of easter eggs in my post that link to stuff i’ve enjoyed recently, but i have a couple links i didn’t want to include without content warnings. <a href="https://youtu.be/UBdBoWAtLNI">finding responsibility</a> is a pretty dark talk about the ethics of making sure your work won’t end up killing people, and <a href="https://youtu.be/rQHYelsNgtU">youre the one ive always wanted</a> is slightly nsfw doggyhell vent art.</p>
<p>btw i’ll soon be giving talks at <a href="https://events.ccc.de/en/category/39c3/">39c3</a> and <a href="https://disobey.fi/2026/">disobey 2026</a>! the 39c3 one is titled “<a href="https://fahrplan.events.ccc.de/congress/2025/fahrplan/event/css-clicker-training-making-games-in-a-styling-language">css clicker training</a>” and will be about css crimes and making games in css. and the disobey one is the same talk as the bsides one about using css to hack stuff and get bug bounties, but i’ll make sure to throw some extra content in there to keep it fun.</p>
<p>see y’all around!!</p>
<p>&lt;3</p>
