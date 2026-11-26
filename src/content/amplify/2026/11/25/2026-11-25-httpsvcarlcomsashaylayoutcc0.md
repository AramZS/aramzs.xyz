---
author: vcarl.com
cover_image: 'https://vcarl.com/sashay/share.png'
date: '2026-11-25T06:16:54.507Z'
dateFolder: 2026/11/25
description: >-
  A sliding-panes layout for the web. Snaps, flings, bottom bars, deep stacks,
  and a layout that fits in a URL.
isBasedOn: 'https://vcarl.com/sashay/?layout=cc.0'
link: 'https://vcarl.com/sashay/?layout=cc.0'
slug: 2026-11-25-httpsvcarlcomsashaylayoutcc0
tags:
  - design
title: Sashay
---
<p>Drag the edge between two panes to resize them. The edge settles at a simple fraction of the width, and a pane with no room left slides under its neighbour. The layout can be saved in the URL.</p>
<p>This headline is a pane. Grab the edge to its right.</p>
<h2>Why panes?</h2>
<p>Power users want to arrange their screen the way they work. Panes give them that without making the interface complicated: each pane is an ordinary view, and the only new control is the edge between them.</p>
<p>That makes them a good middle ground between a fully customisable UI, where any panel can go anywhere, and a simple responsive layout that decides everything for you.</p>
<h2>Hang it in a frame.</h2>
<pre>// @vcarl/sashay/react
&lt;Sashay
  onLayoutChange={save}&gt;
  &lt;Pane id="list"
    title="List"
    focus={1/3}&gt;…&lt;/Pane&gt;
  &lt;Pane id="detail"
    title="Detail"
    focus={1/2}&gt;…&lt;/Pane&gt;
&lt;/Sashay&gt;</pre>
<p>ThemeHouseSashShojiGreenhouse</p>
<p>?layout=This code is the layout. Drag an edge, throw it, or click one to open and close.</p>
<h2>Snaps to simple fractions.</h2>
<p>Dividers rest on fractions with a denominator up to six, so a layout saved on a laptop still makes sense on a monitor. The grid gets finer as the frame gets wider.</p>
<h2>Throw it.</h2>
<p>A quick throw carries the divider one or two snaps past where you let go. Release speed is read from the last 90 ms, so a slow drag still lands exactly where you put it.</p>
<h2>A bar for each pane.</h2>
<p>Any pane can have a bar at its bottom for filters, settings or a table of contents. It expands over the pane and works the same on a phone.</p>
<h2>Deep stacks fold into a spine.</h2>
<p>Drill down as far as you like. Panes that no longer fit fold into a slim spine, with a tab for each. Drag cost stays flat at a thousand deep.</p>
<h2>Deep linked pane arrangements</h2>
<p>Which panes are open, how wide they are, and which bars are open all fit in a short code you can keep in the URL. Share the link and the other person sees the same arrangement.</p>
<h2>See it work.</h2>
<figure><h3>Houseplants</h3><svg aria-label="Houseplants by sun and water" class="pl-chart" height="440" role="group" width="720">0246810036912Hours of direct sun →Waterings a month →</svg>Window<p>Pick a plant on the chart.</p><p>Pick a plant.</p><figcaption><b>Houseplants in three panes.</b> Pick a plant, then open its card. Squeeze the chart and your plant stays in view.</figcaption></figure>
<figure><h3>The house</h3><p>6 things</p><h3>Parlour</h3><p>2 things</p><figcaption><b>A house, all the way down.</b> Rooms, dressers, drawers, a tin box. The old levels fold into the spine.</figcaption></figure>
<p><b>0</b>runtime dependencies</p>
<p>drag frame at 1,000 panes</p>
<p>keyboard on every edge, aria-valuenow</p>
