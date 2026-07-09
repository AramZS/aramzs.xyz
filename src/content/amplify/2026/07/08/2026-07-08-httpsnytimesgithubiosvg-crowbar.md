---
author: nytimes.github.io
cover_image: ''
date: '2026-07-08T15:44:26.326Z'
dateFolder: 2026/07/08
description: >-
  A Chrome-specific bookmarklet that extracts SVG nodes and accompanying styles
  from an HTML document and downloads them as an SVG file—A file which you could
  open and edit in Adobe Illustrator, for instance.
isBasedOn: 'https://nytimes.github.io/svg-crowbar/'
link: 'https://nytimes.github.io/svg-crowbar/'
slug: 2026-07-08-httpsnytimesgithubiosvg-crowbar
tags:
  - code
  - tech
  - design
  - the web
title: SVG Crowbar
---
<p>A Chrome-specific bookmarklet that extracts SVG nodes and accompanying styles from an HTML document and downloads them as an SVG file—A file which you could open and edit in Adobe Illustrator, for instance. Because SVGs are resolution independent, it’s great for when you want to use web technologies to create documents that are meant to be printed (like, maybe on newsprint). It was created with <a href="http://d3js.org">d3.js</a> in mind, but it should work fine no matter how you choose to generate your SVG.</p>
<h3>The Bookmarklet</h3>
<p><a href="javascript:javascript: (function () { var e = document.createElement('script'); e.setAttribute('src', 'https://nytimes.github.io/svg-crowbar/svg-crowbar.js'); e.setAttribute('class', 'svg-crowbar'); document.body.appendChild(e); })();">SVG Crowbar</a> ← Drag this to your bookmarks bar.</p>
<p>After you’ve installed the bookmarklet, you can execute it on any page. Go ahead and try it out on this <a href="http://bl.ocks.org/mbostock/4458497">crazy map</a>.</p>
<p>(You can click on the link instead to test it on this page immediately.)</p>
<h3>Update</h3>
<p>Some users reported that styles were not stored with the SVG files, so we added a new version that should work everywhere. The new method is slower, so loading can take a while on pages with many SVG elements. Still in beta.</p>
<p><a href="javascript:javascript: (function () { var e = document.createElement('script'); e.setAttribute('src', 'https://nytimes.github.io/svg-crowbar/svg-crowbar-2.js'); e.setAttribute('class', 'svg-crowbar'); document.body.appendChild(e); })();">SVG Crowbar 2</a> ← Drag this to your bookmarks bar.</p>
<h3>Notes</h3>
<p>Pixels will map to points when opening in Illustrator.</p>
<p>Dimensions of the document will be the same as the dimensions of your SVG element.</p>
<p>All colors are RGB, which is not ideal for print documents, but CMYK is not supported in SVG 1.1.</p>
<h3>Gotchas</h3>
<p>It only works in Chrome.</p>
<p>Currently the https version of the script is being served from raw.github.com, which might break in the future. If the script stops running on https pages, check back here—you might have to re-install the bookmarklet at that time.</p>
<p>Descendent "&gt;" CSS selectors will crash Adobe Illustrator, therefore those styles are stripped out. Be warned.</p>
<p>Adobe Illustrator also chokes on fonts that it doesn’t recognize. Font-family assigments like “sans-serif” (or if you're using webfonts like “nyt-franklin”) will cause Illustrator to give this error when opening the file: “The operation cannot complete because of an unknown error. [CANT]”. This is fixed in Illustrator version 17.1. Other SVG viewers are pretty okay with them though.</p>
<p>Some styles won’t propogate down if they depend on markup outside of the svg element. For instance, if you use CSS that targets an SVG path element by an id on the div surrounding the SVG ("#map svg path") then those styles won’t show up in the resulting file.</p>
<h3>A Sample SVG</h3>
