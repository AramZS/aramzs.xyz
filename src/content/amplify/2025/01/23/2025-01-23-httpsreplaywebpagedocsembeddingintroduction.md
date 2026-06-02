---
author: replayweb.page
cover_image: null
date: '2025-01-23T22:34:38.000Z'
dateFolder: 2025/01/23
description: >-
  Introduction¶ A key goal of ReplayWeb.page is to make embedding archived web
  content into other sites as easy as embedding other media like images and
  PDFs. To make this possible ReplayWeb.
isBasedOn: 'https://replayweb.page/docs/embedding/#introduction'
link: 'https://replayweb.page/docs/embedding/#introduction'
slug: 2025-01-23-httpsreplaywebpagedocsembeddingintroduction
tags:
  - archiving
title: Embedding ReplayWeb.page¶
---
<p>A key goal of ReplayWeb.page is to make embedding archived web content into other sites as easy as embedding other media like images and PDFs.</p>
<p>To make this possible ReplayWeb.page provides the <code>&lt;replay-web-page&gt;</code> HTML <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components">web component</a> to support embedding in the pages where you would like to display web archives. This component works in all modern browsers, and has several configuration options that allow for control over the initial URL or snapshot to display from the archive when the component loads. The component can load WACZ files, WARC files and <a href="https://replayweb.page/docs/user-guide/#supported-formats">other formats</a>.</p>
<p>The <code>&lt;replay-web-page&gt;</code> web component consists of a "backend" service worker, which emulates a web server, and a "frontend" UI, though in reality both are scripts running in the browser - there is no web server!</p>
<p>While other web archive filetypes may require ReplayWeb.page to download them in their entirety before viewing, WACZ files allow the service worker to pull individual resources from the file as they are requested by the user. Full retrieval of the WACZ by ReplayWeb.page is <em>not</em> required as long as the server delivering the WACZ file supports HTTP range requests. This means that serving archived content from WACZ files is effectively as bandwidth efficient as any other web content!</p>
<h2>Example</h2>
<p>To embed a WACZ stored at <code>https://replayweb.page/docs/examples/tweet-example.wacz</code>, add the following <code>&lt;script&gt;</code> tag to your HTML page to load the user interface from the jsDelivr CDN, and use the <code>&lt;replay-web-page&gt;</code> component to point to the WACZ:</p>
<pre><code>&lt;script src="https://cdn.jsdelivr.net/npm/replaywebpage@2.3.14/ui.js"&gt;&lt;/script&gt;

&lt;replay-web-page source="https://replayweb.page/docs/examples/tweet-example.wacz"
url="https://oembed.link/https://twitter.com/webrecorder_io/status/1565881026215219200"&gt;&lt;/replay-web-page&gt;
</code></pre>
<p>In this example, the <code>source</code> attribute is pointing to the location of the WACZ file (in this case published on AWS S3) and the <code>url</code> attribute is used to indicate what URL to display from the archived item after the component loads.</p>
<h3>Loading the Service Worker (Backend)</h3>
<p>ReplayWeb.page's backend is a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers">service worker</a> which intercepts requests for URLs and looks for them in your loaded archived item. Service workers are just JavaScript files and can be loaded from the CDN (Content Delivery Network), it is necessary to add a service worker path from where the web archive will be served to a local path. We use <code>/replay</code> in these examples, but it can be anything. Since the service worker takes over the rendering of this path, it should be a path that is otherwise non-existent (serves a 404) from the actual web server.</p>
<p>To do this, create a <code>/replay</code> subdirectory and in it, a new JavaScript file (<code>/replay/sw.js</code>) and copy the following to the file:</p>
<pre><code>importScripts("https://cdn.jsdelivr.net/npm/replaywebpage@2.3.14/sw.js");
</code></pre>
<p>If the HTML above was added to <code>https://example.com/path/my-web-archive-embed.html</code> then the <code>sw.js</code> should be added such that it is at: <code>https://example.com/path/replay/sw.js</code>.</p>
<p>This has the affect imports the actual server worker from the CDN, serving it on your site <code>https://example.com/replay/sw.js</code> and allowing it to render web archives on the <code>/replay/</code> path.</p>
<p>That's it! Loading <code>https://example.com/path/my-web-archive-embed.html</code> should now load the web archive.</p>
<p>Be sure to add width and height styles to the <code>&lt;replay-web-page&gt;</code> tag as needed to scale the embed, and replace <code>https://replayweb.page/docs/examples/example.wacz</code> with any web archive hosted on your site.</p>
<details> <summary>Info: Loading files from different servers</summary> <p>If the file is loaded from a different origin, your site must have Cross Origin Resource Sharing (CORS) access to download the web archive. <br/>See <a href="https://replayweb.page/docs/embedding/#loading-errors">Loading Errors</a> below for more info.</p> </details>
<details> <p>The above example uses the version number "2.3.14" in paths to load a specific version of ReplayWeb.page from a CDN. These URLs point to a specific version of ReplayWeb.page software released on NPM, meaning that your replay viewer should stay stable, even if ReplayWeb.page is updated.</p> <ul> <li><code>https://cdn.jsdelivr.net/npm/replaywebpage@2.3.14/ui.js</code></li> <li><code>https://cdn.jsdelivr.net/npm/replaywebpage@2.3.14/sw.js</code></li> </ul> <p>Although ReplayWeb.page strives to remain backwards compatible, this addresses any potential issue of older embeds breaking when the replay system is updated.</p> <p>You can also use the latest stable release by omitting the version, and the URL will automatically load the latest published release:</p> <ul> <li><code>https://cdn.jsdelivr.net/npm/replaywebpage/ui.js</code></li> <li><code>https://cdn.jsdelivr.net/npm/replaywebpage/sw.js</code></li> </ul> <p>This is not recommended for production use as this is more likely to break in case there is a breaking change.</p> <p>For testing the very latest, it is possible to simply link to replayweb.page itself, eg. <code>https://replayweb.page/ui.js</code> and <code>https://replayweb.page/sw.js</code> but these are updated the most frequently and more likely to break.</p> <p>For production use, it is recommended to use a fixed version and explicitly upgrade as necessary.</p> </details>
<h2>Self Hosting</h2>
<p>Sometimes it can be desirable to self-host the user interface, service worker, and WACZ files. This is useful for preventing tracking by CDNs, or to make it easier to host the content in one place without needing to work out the details of Cross Origin Resource Sharing (CORS).</p>
<p>Following the same steps above, instead of loading the JavaScript and WACZ file from external locations, <a href="https://www.jsdelivr.com/package/npm/replaywebpage">download</a> the <code>ui.js</code> and <code>sw.js</code> JavaScript files and put them on the same server as the HTML that you are publishing. Link them accordingly replacing the CDN links in the guide above.</p>
<h3>Example</h3>
<p>If you are publishing a page at <code>https://example.com/path/my-web-archive-embed.html</code>, adjust the <code>&lt;script&gt;</code> element to load the ui from a location on your website:</p>
<pre><code>&lt;script src="ui.js"&gt;&lt;/script&gt;

&lt;replay-web-page source="example.wacz" url="https://webrecorder.net"&gt;&lt;/replay-web-page&gt;
</code></pre>
<p>The following URLs would then need to resolve correctly:</p>
<ul> <li>https://example.com/path/my-web-archive-embed.html</li> <li>https://example.com/path/example.wacz</li> <li>https://example.com/path/ui.js</li> <li>https://example.com/path/replay/sw.js</li> </ul>
<p>When embedding more than one web archive on your site it can be helpful to centralize the location of the frontend and backend JavaScript, and potentially WACZ files. The <code>&lt;replay-web-page&gt;</code> component has a <code>replayBase</code> attribute that lets you define the location to load the <code>sw.js</code> service worker from. By default, <code>replayBase</code> is set to <code>./replay/</code> and so the service worker is loaded from <code>./replay/sw.js</code>.</p>
<p>For example, if you publish your JavaScript files at:</p>
<ul> <li>https://example.com/js/ui.js</li> <li>https://example.com/js/sw.js</li> <li>https://example.com/wacz/example.wacz</li> </ul>
<p>Then you must adjust your HTML to reference the new resources:</p>
<pre><code>&lt;script src="/js/ui.js"&gt;&lt;/script&gt;

&lt;replay-web-page replayBase="/js/" source="/wacz/example.wacz" url="https://webrecorder.net"&gt;&lt;/replay-web-page&gt;
</code></pre>
<h2>Embed Modes</h2>
<p>ReplayWeb.page offers four different ways to embed the archived content, including with or without the navigation UI, and with an archival information dropdown. The embed mode can be set via the <code>embed</code> property:</p>
<ul> <li> <p><code>default</code> or not set: Show the replay page and the location bar, allowing navigation to other pages and accessing the page list.</p> </li> <li> <p><code>full</code>: Show the full replayweb.page UI and logo.</p> </li> <li> <p><code>replayonly</code>: Show just the replayed page, and no additional UI or nav bar buttons. Useful for embedding a single page.</p> </li> <li> <p><code>replay-with-info</code>: Show the <code>replayonly</code> mode, but also add an archive info dropdown, which shows an archival 'receipt' with provenance and verification information (new in 1.7.0)</p> </li> </ul>
<details> <summary>Example: Embed with <code>replay-with-info</code> enabled</summary> </details>
<h2>Embedding Options</h2>
<p>The <code>&lt;replay-web-page&gt;</code> tag is a web component that supports a number of additional attributes:</p>
<table> <tr> <th>Attribute</th> <th>Description</th> </tr> <tbody> <tr> <td><code>source</code></td> <td>Source URL for the archived item. This should be one of the <a href="https://replayweb.page/docs/user-guide/#supported-formats">supported formats</a> loaded from one of the <a href="https://replayweb.page/docs/user-guide/locations/">support locations</a> and is required.</td> </tr> <tr> <td><code>url</code></td> <td>The starting URL to load from the archive. If omitted, will start with the page list or URL search view.</td> </tr> <tr> <td><code>ts</code></td> <td>The ISO 8601 timestamp of the starting URL to load. If omitted, the latest available version is used.</td> </tr> <tr> <td><code>deepLink</code></td> <td>If set, ReplayWeb.page will modify the URL of the page to allow for 'deep linking' to exact pages in the embed.</td> </tr> <tr> <td><code>updateFavicons</code></td> <td>If set, ReplayWeb.page will set the favicon of the page to the current webpage being viewed. Only supported in Chrome.</td> </tr> <tr> <td><code>embed</code></td> <td>(<code>default</code> / <code>full</code> / <code>replayonly</code> / <code>replay-with-info</code> ) - See <a href="https://replayweb.page/docs/embedding/#embed-modes">Embed Modes</a> above.</td> </tr> <tr> <td><code>swName</code></td> <td>Service Worker filename (default: <code>sw.js</code>). Set if using different name, don't include path, only filename</td> </tr> <tr> <td><code>replayBase</code></td> <td>Location of the service worker file (eg. sw.js), defaults to <code>./replay/</code> as mentioned above, but can be overridden.</td> </tr> <tr> <td><code>coll</code></td> <td>Internal ID for this collection, usually generated automatically.</td> </tr> <tr> <td><code>config</code></td> <td>Extra per collection config options (such as custom fuzzy matching rules, TODO add more info!)</td> </tr> <tr> <td><code>sandbox</code></td> <td>If set, will iframe in <code>sandbox</code>. Provides extra isolation, but prevents PDFs from loading in an embed, and may result in links opening in new windows.</td> </tr> <tr> <td><code>noWebWorker</code></td> <td>If set, will not use Web Worker for loading, only Service Worker. May be useful for certain loading edge cases.</td> </tr> <tr> <td><code>noCache</code></td> <td>If set, will not cache any loaded content HTTP responses locally, always loading from original source.</td> </tr> <tr> <td><code>hideOffscreen</code></td> <td>If set, will unload the embed when it is not visible and reload when scrolled into view. Useful if multiple embeds per-page to avoid loading all at once.</td> </tr> <tr> <td><code>newWindowBase</code></td> <td>set base replay URL loaded when a page opens a new window, defaults to <code>https://replayweb.page/</code> if <code>deepLink</code> not enabled, otherwise, to current page with new link.</td> </tr> <tr> <td><code>requireSubdomainIframe</code></td> <td>If set, will only load embed in an iframe loaded from a subdomain, for increased origin isolation.</td> </tr> <tr> <td><code>loading="eager"</code></td> <td>If set, will load the entire WACZ file at once (regardless of size), and not attempt on-demand range request loading.</td> </tr> <tr> <td><code>useRuffle</code></td> <td>If set, will enable include Ruffle Flash emulator. Must include the <code>ruffle/</code> directory in <code>replayBase</code>.</td> </tr> <tr> <td><code>useAdblock</code></td> <td>If set, will enable adblocking, by injecting CSS stylesheets to hide ads based on a list of ad filter rules. By default, the <a href="https://easylist.to/">EasyList</a> filter rules are used.</td> </tr> <tr> <td><code>adblockRulesUrl</code></td> <td>Provide a URL to a custom <a href="https://adblockplus.org/filters">Adblock Plus filter rules</a> formatted text file. Note that only rules containing CSS selectors (via <code>##</code> filter) are used, other lines in the rules list are ignored.</td> </tr> </tbody> </table>
<h2>Further Examples</h2>
<p>For an example of a site built around multiple archived items, take a look at our <a href="https://github.com/webrecorder/example-webarchive/">example-webarchive repository</a> and <a href="https://webrecorder.github.io/example-webarchive">static website</a> hosted on Github pages. It may give you ideas for how to integrate the ReplayWeb.page component into your site. You may also be interested in <a href="https://github.com/webrecorder/web-replay-gen">Web Replay Gen</a>, an 11ty based static site generator for showcasing multiple WACZ files.</p>
<h2>Common Issues</h2>
<p>Below are some possible issues that you may encounter when embedding and possible workarounds.</p>
<h3>Embed is too small / doesn't fill page.</h3>
<p>If the <code>&lt;replay-web-page&gt;</code> tag is the only element on a page, and you want it to use the full window width and height, adding the following CSS should fix the issue:</p>
<pre><code>html, body {
  width: 100%;
  height: 100%;
}
</code></pre>
<h3>Loading Errors</h3>
<p>If you see errors related to loading archived items such as <code>TypeError: failed to load</code>, the issue may be a result of a CORS error.</p>
<p>See <a href="https://replayweb.page/docs/embedding/cors-settings/">CORS Settings</a> for more info on how to configure CORS for ReplayWeb.page</p>
