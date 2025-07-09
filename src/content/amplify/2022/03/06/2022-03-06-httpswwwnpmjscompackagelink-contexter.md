---
author: npm
cover_image: 'https://static-production.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
date: '2022-03-07T03:17:27.000Z'
dateFolder: 2022/03/06
description: >-
  A tool for turning links into context boxes that are much more useful than
  bare links.. Latest version: 0.7.1, last published: 2 years ago. Start using
  link-contexter in your project by running `npm i link-contexter`. There are no
  other projects in the npm registry using link-contexter.
isBasedOn: 'https://www.npmjs.com/package/link-contexter'
link: 'https://www.npmjs.com/package/link-contexter'
slug: 2022-03-06-httpswwwnpmjscompackagelink-contexter
tags: []
title: npm
---
<p>This project is in beta. In theory I will not release anything that doesn't work, but there are no guarantees.</p>
<h2>What is this?</h2>
<p>The Link Contexter is a tool for processing links and giving them useful context that can be used for pages and static site building tools.</p>
<p>In order to support the likely uses this library might be put towards it exposes three functions:</p>
<p><code>context</code> is an <code>async</code> function that is the primary function of this library. It takes a URL and attempts to retrieve the page that URL points to and parse it for useful metadata and information. It will then return an object that includes as much data about the page that it could find.</p>
<p>There are a number of useful pieces of data that are exposed but the most important properties on the returned object are <code>htmlEmbed</code>, which will supply you with an easy-to-implement block of HTML and CSS that can be placed, as-is, into an existing page. It is very useful for replacing a link on a page with a more context-filled HTML block.</p>
<p>Additionally, <code>data.finalizedMeta</code> has a number of useful properties. The library will attempt to parse the page for metadata, sort all found data and determine the most valid to place it in the <code>finalizedMeta</code> object.</p>
<p><code>sanitizeLink</code> is a <code>sync</code> function that takes a single argument, a URL, and returns a version of that hyperlink that matches the sanitized version of the URL that this plugin will use to attempt to retrieve data about the URL.</p>
<p><code>uidLink</code> is a <code>sync</code> function that takes a single argument, a URL. It will return a SHA1 Hex hash from that URL. This may be useful for keeping a record of which URLs you have or have not processed.</p>
<p>This is a basic description of the library and functionality. Better documentation to come!</p>
<figure></figure><p><a href="https://runkit.com/npm/link-contexter"><strong>Try</strong> on RunKit</a></p>
