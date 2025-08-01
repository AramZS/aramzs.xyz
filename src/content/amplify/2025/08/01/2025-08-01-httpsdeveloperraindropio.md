---
author: raindrop.io
cover_image: 'https://developer.raindrop.io/~gitbook/ogimage/-M-GPSBDQzoCcRrtbCWx'
date: '2025-08-01T17:46:47.086Z'
dateFolder: 2025/08/01
description: >-
  Build and integrate tools and applications to help members manage their
  bookmarks on Raindrop.io
isBasedOn: 'https://developer.raindrop.io/'
link: 'https://developer.raindrop.io/'
slug: 2025-08-01-httpsdeveloperraindropio
tags:
  - code
  - tech
title: Overview
---
<p>This is the official documentation for Raindrop.io API. A reference to the functionality our public API provides with detailed description of each API endpoint, parameters, and examples.</p>
<p>Please note that you must <a data-state="closed" href="https://app.raindrop.io/settings/integrations">register your application<figure></figure></a> and authenticate with OAuth when making requests. Before doing so, be sure to read our <a data-state="closed" href="https://developer.raindrop.io/terms">Terms &amp; Guidelines</a> to learn how the API may be used.</p>
<h3><a href="https://developer.raindrop.io/#format"><figure></figure></a></h3>
<p>API endpoints accept arguments either as url-encoded values for non-POST requests or as json-encoded objects encoded in POST request body with <code>Content-Type: application/json</code> header.</p>
<p>Where possible, the API strives to use appropriate HTTP verbs for each action.</p>
<p>This API relies on standard HTTP response codes to indicate operation result. The table below is a simple reference about the most used status codes:</p>
<p>The request was processed with an error and should not be retried unmodified as they won’t be processed any different by an API.</p>
<p>All <code>200 OK</code> responses have the <code>Content-type: application/json</code> and contain a JSON-encoded representation of one or more objects.</p>
<p>Payload of POST requests has to be JSON-encoded and accompanied with <code>Content-Type: application/json</code> header.</p>
<h3><a href="https://developer.raindrop.io/#timestamps"><figure></figure></a></h3>
<p>All timestamps are returned in ISO 8601 format:</p>
<pre><code>YYYY-MM-DDTHH:MM:SSZ</code></pre>
<h3><a href="https://developer.raindrop.io/#rate-limiting"><figure></figure></a></h3>
<p>For requests using OAuth, you can make up to 120 requests per minute per authenticated user.</p>
<p>The headers tell you everything you need to know about your current rate limit status:</p>
<p>The maximum number of requests that the consumer is permitted to make per minute.</p>
<p>Once you go over the rate limit you will receive an error response:</p>
<h3><a href="https://developer.raindrop.io/#cross-origin-resource-sharing"><figure></figure></a></h3>
<p>The API supports Cross Origin Resource Sharing (CORS) for AJAX requests. You can read the <a data-state="closed" href="https://www.w3.org/TR/cors/">CORS W3C recommendation<figure></figure></a>, or <a data-state="closed" href="http://code.google.com/p/html5security/wiki/CrossOriginRequestSecurity">this intro<figure></figure></a> from the HTML 5 Security Guide.</p>
<p>Here’s a sample request sent from a browser hitting <code>http://example.com</code>:</p>
