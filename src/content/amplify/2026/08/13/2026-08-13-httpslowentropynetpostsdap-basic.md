---
author: lowentropy.net
cover_image: ''
date: '2026-08-13T13:05:47.165Z'
dateFolder: 2026/08/13
description: 'DAP is, in many cases, a simple adding machine.'
isBasedOn: 'https://lowentropy.net/posts/dap-basic/'
link: 'https://lowentropy.net/posts/dap-basic/'
slug: 2026-08-13-httpslowentropynetpostsdap-basic
tags:
  - tech
  - ad tech
  - privacy
title: A Gentle Introduction to DAP and Prio
---
<p>The Distributed Aggregation Protocol (DAP) is really complicated. That complication is in support of a range of multi-party computation (MPC) capabilities. However, in practice it is used for far simpler tasks, like adding numbers.</p>
<p>This post provides an aggressively simplified summary of how DAP works in the modes that people use.</p>
<p>So, in the spirit of <i>“the hardest problem in computer science is counting”</i>, here’s to make adding up more complicated.</p>
<h2>Adding numbers</h2>
<p>All of the modes in DAP that people use add up numbers. That’s it.</p>
<p>This system is based on a design called “Prio” (<a href="https://crypto.stanford.edu/prio/paper.pdf">paper</a>), which was invented by Henry Corrigan-Gibbs and Dan Boneh. DAP supports other modes than Prio, but this post only looks at Prio.</p>
<p>The basic idea here is that many people have a number. The number might contain something that is private or sensitive, so they don’t want to share it. However, if their number was mixed into an average from many other people, and no longer associated with them, personally, maybe they would be happy to contribute.</p>
<p>DAP is a protocol for taking those numbers and adding them together. It computes the sum of the numbers it’s given.</p>
<figure><svg class="aasvg" height="160" version="1.1" viewbox="0 0 376 160" width="376" xmlns="http://www.w3.org/2000/svg">
<style>
.aasvg {
color-scheme: light dark; --aasvg-b: light-dark(black, white); --aasvg-w: light-dark(white, black);
&amp;amp; * { fill: none; stroke: var(--aasvg-b); stroke-linecap: round; }
.dashed { stroke-dasharray: 3,6; }
text { font: 13px monospace; text-anchor: middle; fill: var(--aasvg-b); stroke: none; }
text.b { font-weight: 700; }
text.i { font-style: italic; }
.dot.closed { fill: var(--aasvg-b); }
.dot:is(.open, .xor) { fill: var(--aasvg-w); }
.dot.dotted { fill: var(--aasvg-w); stroke-dasharray: 0,2; }
.dot.shaded { fill: #666; }
}
</style>
<path d="M 16,64L 16,80"></path>
<path d="M 48,16L 48,32"></path>
<path d="M 48,112L 48,128"></path>
<path d="M 192,48L 192,112"></path>
<path d="M 272,48L 272,112"></path>
<path d="M 104,32L 144,32"></path>
<path d="M 192,48L 272,48"></path>
<path d="M 160,64L 190.81765,64"></path>
<path d="M 72,80L 190.81765,80"></path>
<path d="M 272,80L 358.81765,80"></path>
<path d="M 160,96L 190.81765,96"></path>
<path d="M 192,112L 272,112"></path>
<path d="M 104,128L 144,128"></path>
<path d="M 16,80L 24,96"></path>
<path d="M 16,64L 24,80"></path>
<path d="M 48,128L 56,144"></path>
<path d="M 48,112L 56,128"></path>
<path d="M 48,32L 56,48"></path>
<path d="M 48,16L 56,32"></path>
<path d="M 144,32L 160,64"></path>
<path d="M 8,80L 16,64"></path>
<path d="M 8,96L 16,80"></path>
<path d="M 40,32L 48,16"></path>
<path d="M 40,48L 48,32"></path>
<path d="M 40,128L 48,112"></path>
<path d="M 40,144L 48,128"></path>
<path d="M 144,128L 160,96"></path>
<path class="arrowhead" d="M 347.78856,74.85309 L 358.81765,80 L 347.78856,85.14691"></path>
<path class="arrowhead" d="M 179.78856,90.85309 L 190.81765,96 L 179.78856,101.14691"></path>
<path class="arrowhead" d="M 179.78856,74.85309 L 190.81765,80 L 179.78856,85.14691"></path>
<path class="arrowhead" d="M 179.78856,58.85309 L 190.81765,64 L 179.78856,69.14691"></path>
<circle class="dot open" cx="16" cy="64" r="7"></circle>
<circle class="dot open" cx="48" cy="16" r="7"></circle>
<circle class="dot open" cx="48" cy="112" r="7"></circle>
<g class="text">
<text x="80" y="36">(3)</text>
<text x="232" y="68">DAP</text>
<text x="48" y="84">(4)</text>
<text x="232" y="84">Service</text>
<text x="368" y="84">7</text>
<text x="80" y="132">(0)</text>
</g>
</svg></figure><p>The important property that DAP provides is that the numbers are never revealed to anyone. It does that with something called secret sharing.</p>
<h2>Simple secret sharing</h2>
<p>How do you keep a value secret while adding it?</p>
<p>The way DAP does this is that it splits the entire system into two.</p>
<p>Each number is cut into two parts, each of which is effectively completely random. Only when they are put back together does the value make sense. Those are sent to two different servers.</p>
<figure><svg class="aasvg" height="192" version="1.1" viewbox="0 0 376 192" width="376" xmlns="http://www.w3.org/2000/svg">
<style>
.aasvg {
color-scheme: light dark; --aasvg-b: light-dark(black, white); --aasvg-w: light-dark(white, black);
&amp;amp; * { fill: none; stroke: var(--aasvg-b); stroke-linecap: round; }
.dashed { stroke-dasharray: 3,6; }
text { font: 13px monospace; text-anchor: middle; fill: var(--aasvg-b); stroke: none; }
text.b { font-weight: 700; }
text.i { font-style: italic; }
.dot.closed { fill: var(--aasvg-b); }
.dot:is(.open, .xor) { fill: var(--aasvg-w); }
.dot.dotted { fill: var(--aasvg-w); stroke-dasharray: 0,2; }
.dot.shaded { fill: #666; }
}
</style>
<path d="M 16,80L 16,96"></path>
<path d="M 48,32L 48,48"></path>
<path d="M 48,128L 48,144"></path>
<path d="M 192,16L 192,80"></path>
<path d="M 192,112L 192,176"></path>
<path d="M 272,16L 272,80"></path>
<path d="M 272,112L 272,176"></path>
<path d="M 192,16L 272,16"></path>
<path d="M 96,32L 190.81765,32"></path>
<path d="M 136,48L 190.81765,48"></path>
<path d="M 272,48L 304,48"></path>
<path d="M 96,64q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 "></path>
<path d="M 152,64L 190.81765,64"></path>
<path d="M 72,80L 120,80"></path>
<path d="M 192,80L 272,80"></path>
<path d="M 328,94L 354.53193,94"></path><path d="M 328,98L 354.53193,98"></path>
<path d="M 72,112q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 "></path>
<path d="M 192,112L 272,112"></path>
<path d="M 96,128L 120,128"></path>
<path d="M 152,128q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 136,144q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 272,144L 304,144"></path>
<path d="M 96,160q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 192,176L 272,176"></path>
<path d="M 16,96L 24,112"></path>
<path d="M 16,80L 24,96"></path>
<path d="M 48,144L 56,160"></path>
<path d="M 48,128L 56,144"></path>
<path d="M 48,48L 56,64"></path>
<path d="M 48,32L 56,48"></path>
<path d="M 304,48L 320,80"></path>
<path d="M 8,96L 16,80"></path>
<path d="M 8,112L 16,96"></path>
<path d="M 40,48L 48,32"></path>
<path d="M 40,64L 48,48"></path>
<path d="M 40,144L 48,128"></path>
<path d="M 40,160L 48,144"></path>
<path d="M 120,80L 136,48"></path>
<path d="M 120,128L 152,64"></path>
<path d="M 304,144L 320,112"></path>
<path class="arrowhead" d="M 347.78856,90.85309 L 358.81765,96 L 347.78856,101.14691"></path>
<path class="arrowhead" d="M 179.78856,154.85309 L 190.81765,160 L 179.78856,165.14691"></path>
<path class="arrowhead" d="M 179.78856,138.85309 L 190.81765,144 L 179.78856,149.14691"></path>
<path class="arrowhead" d="M 179.78856,122.85309 L 190.81765,128 L 179.78856,133.14691"></path>
<path class="arrowhead" d="M 179.78856,58.85309 L 190.81765,64 L 179.78856,69.14691"></path>
<path class="arrowhead" d="M 179.78856,42.85309 L 190.81765,48 L 179.78856,53.14691"></path>
<path class="arrowhead" d="M 179.78856,26.85309 L 190.81765,32 L 179.78856,37.14691"></path>
<circle class="dot open" cx="16" cy="80" r="7"></circle>
<circle class="dot open" cx="48" cy="32" r="7"></circle>
<circle class="dot open" cx="48" cy="128" r="7"></circle>
<g class="text">
<text x="232" y="36">DAP</text>
<text x="80" y="52">(3)</text>
<text x="232" y="52">Service</text>
<text x="232" y="68">A</text>
<text x="48" y="100">(4)</text>
<text x="368" y="100">7</text>
<text x="232" y="132">DAP</text>
<text x="80" y="148">(0)</text>
<text x="232" y="148">Service</text>
<text x="232" y="164">B</text>
</g>
</svg></figure><p>Each server adds their parts together and then reports what they got. The client gets those two parts and can add them together to get the answer.</p>
<p>The way you “cut a number in half” is you make up a random number. That’s the first half. The other half is the real number, minus the random number.</p>
<p>Each of these two values, on their own, is effectively random. You need both to get the real value. The real value is the two values added together, because the random values cancel out.</p>
<h2>Loop-de-loop secret sharing</h2>
<p>To make this work properly, it’s not possible to use normal numbers. You can’t just pick any random number and wing it, you have to work in a ring.</p>
<p>A ring is a closed loop on the number line where, if you run off the end, you wrap around to the other end.</p>
<p>For example, a ring could be all the single digit decimal numbers:</p>
<p>{0,1,2,3,…,8,9}.</p>
<figure><svg class="aasvg" height="208" version="1.1" viewbox="0 0 608 208" width="608" xmlns="http://www.w3.org/2000/svg">
<style>
.aasvg {
color-scheme: light dark; --aasvg-b: light-dark(black, white); --aasvg-w: light-dark(white, black);
&amp;amp; * { fill: none; stroke: var(--aasvg-b); stroke-linecap: round; }
.dashed { stroke-dasharray: 3,6; }
text { font: 13px monospace; text-anchor: middle; fill: var(--aasvg-b); stroke: none; }
text.b { font-weight: 700; }
text.i { font-style: italic; }
}
</style>
<path d="M 66,32L 66,64"></path><path d="M 62,32L 62,64"></path>
<path d="M 64,96L 64,192"></path>
<path d="M 112,32L 112,64"></path>
<path d="M 160,32L 160,64"></path>
<path d="M 208,32L 208,64"></path>
<path d="M 256,32L 256,64"></path>
<path d="M 304,32L 304,64"></path>
<path d="M 352,32L 352,64"></path>
<path d="M 400,32L 400,64"></path>
<path d="M 448,32L 448,64"></path>
<path d="M 496,32L 496,64"></path>
<path d="M 546,32L 546,64"></path><path d="M 542,32L 542,64"></path>
<path d="M 544,96L 544,192"></path>
<path d="M 32,64L 576,64"></path>
<path d="M 512,112L 542.81765,112"></path>
<path d="M 16,128q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 65.18235,160L 96,160"></path>
<path d="M 545.18235,176 l 2.81765,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 "></path>
<path class="arrowhead" d="M 556.21144,181.14691 L 545.18235,176 L 556.21144,170.85309"></path>
<path class="arrowhead" d="M 531.78856,106.85309 L 542.81765,112 L 531.78856,117.14691"></path>
<path class="arrowhead" d="M 76.21144,165.14691 L 65.18235,160 L 76.21144,154.85309"></path>
<path class="arrowhead" d="M 51.78856,122.85309 L 62.81765,128 L 51.78856,133.14691"></path>
<g class="text">
<text x="24" y="52">... 9</text>
<text x="88" y="52">0</text>
<text x="136" y="52">1</text>
<text x="184" y="52">2</text>
<text x="232" y="52">3</text>
<text x="280" y="52">4</text>
<text x="328" y="52">5</text>
<text x="376" y="52">6</text>
<text x="424" y="52">7</text>
<text x="472" y="52">8</text>
<text x="520" y="52">9</text>
<text x="584" y="52">0 ...</text>
<text x="436" y="116">adding past here</text>
<text x="164" y="132">...continues from here</text>
<text x="192" y="164">subtracting past here</text>
<text x="444" y="180">...continues from here</text>
</g>
</svg></figure><p>The random number is any value from the ring. When you calculate</p>
<p>x−r and it goes negative, add 10; similarly, if the result is greater than 10, subtract 10.</p>
<p>For example, say my value is 2 and I draw a random number of 4. The two values I end up with are 4 and 8. That’s because</p>
<p>2−4 wraps around to 8 (</p>
<p>2−4+10=8). Add 4 and 8 and you get 12, which becomes the original value 2 …once you subtract 10 to keep it on the ring.</p>
<p>Continuing the above example, showing the internal numbers:</p>
<figure><svg class="aasvg" height="192" version="1.1" viewbox="0 0 376 192" width="376" xmlns="http://www.w3.org/2000/svg">
<style>
.aasvg {
color-scheme: light dark; --aasvg-b: light-dark(black, white); --aasvg-w: light-dark(white, black);
&amp;amp; * { fill: none; stroke: var(--aasvg-b); stroke-linecap: round; }
.dashed { stroke-dasharray: 3,6; }
text { font: 13px monospace; text-anchor: middle; fill: var(--aasvg-b); stroke: none; }
text.b { font-weight: 700; }
text.i { font-style: italic; }
.dot.closed { fill: var(--aasvg-b); }
.dot:is(.open, .xor) { fill: var(--aasvg-w); }
.dot.dotted { fill: var(--aasvg-w); stroke-dasharray: 0,2; }
.dot.shaded { fill: #666; }
}
</style>
<path d="M 16,80L 16,96"></path>
<path d="M 48,32L 48,48"></path>
<path d="M 48,128L 48,144"></path>
<path d="M 192,16L 192,80"></path>
<path d="M 192,112L 192,176"></path>
<path d="M 272,16L 272,80"></path>
<path d="M 272,112L 272,176"></path>
<path d="M 192,16L 272,16"></path>
<path d="M 96,32L 190.81765,32"></path>
<path d="M 136,48L 190.81765,48"></path>
<path d="M 224,46L 242.53193,46"></path><path d="M 224,50L 242.53193,50"></path>
<path d="M 272,48L 304,48"></path>
<path d="M 96,64q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 "></path>
<path d="M 152,64L 190.81765,64"></path>
<path d="M 72,80L 120,80"></path>
<path d="M 192,80L 272,80"></path>
<path d="M 328,94L 354.53193,94"></path><path d="M 328,98L 354.53193,98"></path>
<path d="M 72,112q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 "></path>
<path d="M 192,112L 272,112"></path>
<path d="M 96,128L 120,128"></path>
<path d="M 152,128q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 136,144q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 224,142L 242.53193,142"></path><path d="M 224,146L 242.53193,146"></path>
<path d="M 272,144L 304,144"></path>
<path d="M 96,160q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 q 2,3.2 4,0 q 2,-3.2 4,0 l 2.81765,0"></path>
<path d="M 192,176L 272,176"></path>
<path d="M 16,96L 24,112"></path>
<path d="M 16,80L 24,96"></path>
<path d="M 48,144L 56,160"></path>
<path d="M 48,128L 56,144"></path>
<path d="M 48,48L 56,64"></path>
<path d="M 48,32L 56,48"></path>
<path d="M 304,48L 320,80"></path>
<path d="M 8,96L 16,80"></path>
<path d="M 8,112L 16,96"></path>
<path d="M 40,48L 48,32"></path>
<path d="M 40,64L 48,48"></path>
<path d="M 40,144L 48,128"></path>
<path d="M 40,160L 48,144"></path>
<path d="M 120,80L 136,48"></path>
<path d="M 120,128L 152,64"></path>
<path d="M 304,144L 320,112"></path>
<path class="arrowhead" d="M 347.78856,90.85309 L 358.81765,96 L 347.78856,101.14691"></path>
<path class="arrowhead" d="M 235.78856,138.85309 L 246.81765,144 L 235.78856,149.14691"></path>
<path class="arrowhead" d="M 235.78856,42.85309 L 246.81765,48 L 235.78856,53.14691"></path>
<path class="arrowhead" d="M 179.78856,154.85309 L 190.81765,160 L 179.78856,165.14691"></path>
<path class="arrowhead" d="M 179.78856,138.85309 L 190.81765,144 L 179.78856,149.14691"></path>
<path class="arrowhead" d="M 179.78856,122.85309 L 190.81765,128 L 179.78856,133.14691"></path>
<path class="arrowhead" d="M 179.78856,58.85309 L 190.81765,64 L 179.78856,69.14691"></path>
<path class="arrowhead" d="M 179.78856,42.85309 L 190.81765,48 L 179.78856,53.14691"></path>
<path class="arrowhead" d="M 179.78856,26.85309 L 190.81765,32 L 179.78856,37.14691"></path>
<circle class="dot open" cx="16" cy="80" r="7"></circle>
<circle class="dot open" cx="48" cy="32" r="7"></circle>
<circle class="dot open" cx="48" cy="128" r="7"></circle>
<g class="text">
<text x="208" y="36">6</text>
<text x="80" y="52">(3)</text>
<text x="208" y="52">7</text>
<text x="256" y="52">6</text>
<text x="208" y="68">3</text>
<text x="48" y="100">(4)</text>
<text x="368" y="100">7</text>
<text x="208" y="132">7</text>
<text x="80" y="148">(0)</text>
<text x="208" y="148">7</text>
<text x="256" y="148">1</text>
<text x="208" y="164">7</text>
</g>
</svg></figure><p>Though this looks a bit weird, I promise that I really did generate random numbers for the top block. Not every value ends up being 7 (sometimes <a href="https://xkcd.com/221/">it’s 4</a>).</p>
<h2>Adding numbers without seeing them</h2>
<p>When the two DAP services receive their half the number, they can each add the pieces they have.</p>
<p>The final value each produces is still effectively random – each of them is adding up random numbers – but the sum of those two values is the result! All the randomness cancels out.</p>
<p>Sa=∑iriSb=∑ixi−riSa+Sb=∑iri+∑ixi−ri=∑ixi</p>
<p>At this point, the only trick you need to be aware of is that your ring needs to be big enough to hold the answer. If you have a ring of size 10 and your answer is 72, you will get 2 out the other end, losing the 70 part.</p>
<p>In practice, DAP uses very big rings, so this is unlikely to be a problem.</p>
<h2>Handling bad inputs?</h2>
<p>Unfortunately, DAP has to handle cases where people want to spoil the results. This is where it gets complicated, so I won’t go into too much detail.</p>
<p>If your ring is really big, someone submitting a number could pick any value in that range. That could spoil your results by producing a final sum that is absurdly large or, by overflowing the ring, a value that cancels out what other people submit, resulting in a value that is far too small.</p>
<p>The truly clever part of Prio is in how it handles this. Each client provides a proof that their value is “valid”, without revealing that value.</p>
<p>I won’t go into detail, because this is supposed to be an easy introduction. It boils down to a fairly straightforward application of polynomials, but it’s too much detail for this post.</p>
<h2>Prio schemes in DAP</h2>
<p>Right now DAP has 6 modes or schemes that are based on Prio.</p>
<ul> <li> <p>In <strong>Prio3Count</strong> each input is a 0 or a 1. As the name implies, this is for counting only. The <a href="https://covid19-static.cdn-apple.com/applications/covid19/current/static/contact-tracing/pdf/ENPA_White_Paper.pdf">exposure notification system</a> developed by Apple and Google used something like this. People who were exposed would submit a 1, everyone else submits 0, and the sum is a count of the number of people who were exposed.</p> </li> <li> <p><strong>Prio3Sum</strong> adds up any single number, up to a chosen maximum. This can be used to do things like calculate an average.</p> </li> <li> <p><strong>Prio3SumVec</strong> adds up a set of numbers one by one, where each value is capped to a chosen maximum. This is basically multiple copies of Prio3Sum at the same time, all with the same maximum.</p> </li> <li> <p><strong>Prio3L1BoundSum</strong> adds up a set of numbers, where the <em>sum</em> of the values in the set is capped to a chosen maximum. This is used in the <a href="https://w3c.github.io/attribution/">attribution API</a>.</p> </li> <li> <p><strong>Prio3Histogram</strong> adds up a vector, or set of numbers, where all the values must be zero, except any one value, which has to be 1. This can be used to count things in categories, such as how many people earn money in different ranges.</p> </li> <li> <p><strong>Prio3MultihotCountVec</strong> is a version of Prio3Histogram where all the values are 0 or 1, but the number of 1s cannot be more than a chosen cap.</p> </li> </ul>
<p>So, while the Prio design can do a lot more, the practical applications all boil down to adding up.</p>
<h2>Sounds expensive</h2>
<p>In practice, Prio is pretty cheap to operate. It’s more expensive than adding raw numbers for sure, but the price of protecting sensitive inputs is not crazy.</p>
<p>Checking the proof that the input is valid costs a little bit, but the proofs are tiny and modern computers are fast.</p>
<p>The most expensive part is that each server needs to check that the same value is only added up once. With lots and lots of numbers, tracking them all can get a bit tricky.</p>
<h2>Applications of Prio</h2>
<p>DAP with Prio is useful for adding up numbers, where the individual numbers might be private or sensitive or just a little bit embarrassing.</p>
<p>If many people have somewhat sensitive information, you might want to provide them some assurance that sharing their number won’t get back to them somehow. DAP provides that assurance. A few examples are listed above.</p>
<p>DAP also pairs really nicely with differential privacy, for added privacy protection.</p>
<p>The only condition is that you have to trust one or other of the two services. If they both go rogue and conspire, they can recover the values. So, ultimately, this is probably not something you want to use for <em>real</em> secrets.</p>
<p>Reputable services, such as <a href="https://divviup.org/about/">Divvi Up</a>, which is run by the non-profit that also operate <a href="https://letsencrypt.org/">Let’s Encrypt</a>, are unlikely to risk their good reputation that way.</p>
<p>Hopefully, this is enough information to help you understand what Prio and DAP are for.</p>
