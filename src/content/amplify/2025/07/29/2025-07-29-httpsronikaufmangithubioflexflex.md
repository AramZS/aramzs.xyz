---
author: ronikaufman.github.io
cover_image: null
date: '2025-07-29T21:03:01.414Z'
dateFolder: 2025/07/29
description: >-
  Flexflex is a typeface that responds to spatial requirements rather than
  imposing them.
isBasedOn: 'https://ronikaufman.github.io/flexflex/'
link: 'https://ronikaufman.github.io/flexflex/'
slug: 2025-07-29-httpsronikaufmangithubioflexflex
tags:
  - design
title: 'The design follows some additional constraints:'
---
<figure></figure><p>Flexflex is a typeface that responds to spatial requirements rather than imposing them. Built on a modular system, each letter can fit inside any given rectangular container and transforms continuously if its ratio changes. In theory, it's infinitely flexible. The design follows some additional constraints: - keep it minimal, maximize symmetry and mathematical alignment,<br/>
 - only use non-diagonal straight lines and circular arcs,<br/>
 - monolined (consistent thickness) and no disconnections,<br/>
 - no descenders or ascenders, nothing extends beyond the container,<br/>
 - each letter is independent, there is no kerning.</p>
<figure></figure><figure></figure><figure></figure><p>Only the 26 letters of the Latin alphabet have been designed and only in uppercase. More characters might be added in the future.  <a href="https://ronikaufman.github.io/flexflex/specimen.html">Click here</a> to see them full screen and, if it's possible on your device, change the browser window size to see how they stretch.</p>
<figure></figure><figure></figure><h2>Implemetation</h2>
<p>There is no downloadable font file. Flexflex is implemented as <a href="https://github.com/ronikaufman/flexflex/blob/main/flexflex.js">a JavaScript library</a>, with a single function that takes a few parameters and can: - either append a path element representing the letter as the last child of an SVG element,<br/>
 - or draw the letter on a canvas element. There are no dependencies. The full documentation is in the <a href="https://github.com/ronikaufman/flexflex?tab=readme-ov-file#documentation">README file</a>.</p>
<p>The end caps and corners of letters can be either square or round. Oblique type can be created by slanting the letters, as much as one wants. Thickness can also vary.</p>
<figure></figure><figure></figure><p>All the source code is available <a href="https://github.com/ronikaufman/flexflex">on GitHub</a>, under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0 license</a>. While working on Flexflex, I came across similar works: Vera van de Seyp's <a href="https://www.youtube.com/watch?v=ATueZMd9YAE">Cocotype</a>, David Jonathan Ross's <a href="https://djr.com/fit">Fit</a> and Toby Bennett's <a href="https://www.instagram.com/p/C_ddbLxRuOV/">dynamically structured type</a>. Thank you to Theo van Doesburg, Herbert Bayer, Jurriaan Schrofer, Wim Crouwel, Donald Knuth, Paula Scher, Just van Rossum and Erik van Blokland for the inspiration. Special thanks to Ellen Lupton for her brilliant books.</p>
<figure></figure><figure></figure><figure></figure><figure></figure><figure></figure><figure></figure><figure></figure><figure></figure><figure></figure>
