---
author: Netlify Docs
cover_image: 'https://docs.netlify.com/images/netlify-docs-hero-card.png/?v=1'
date: '2025-07-23T18:33:28.658Z'
dateFolder: 2025/07/23
description: Get started with Edge Functions by trying out a basic use case.
isBasedOn: 'https://docs.netlify.com/build/edge-functions/get-started/'
link: 'https://docs.netlify.com/build/edge-functions/get-started/'
slug: 2025-07-23-httpsdocsnetlifycombuildedge-functionsget-started
tags:
  - code
title: Get started with Edge Functions
---
<p>This page will help you get started with Edge Functions. It describes how to create, test, deploy, invoke, and monitor your edge functions.</p>
<p>To create an edge function to deploy with your site, write a JavaScript or TypeScript file stored in your <a href="https://docs.netlify.com/build/edge-functions/optional-configuration#edge-functions-directory">edge functions directory</a>. The default edge functions directory is <code>YOUR_BASE_DIRECTORY/netlify/edge-functions</code>.</p>
<p>For example, create a function file at <code>netlify/edge-functions/hello.js</code>:</p>
<figure><pre data-language="js"><code>export default () =&gt; new Response("Hello world");export const config = { path: "/test" };</code></pre></figure>
<p>The file includes two parts:</p>
<ul> <li>The default export contains the handler function that runs when you make requests to the edge function. It often contains logic to modify requests and responses.</li> <li>The <code>config</code> export configures the file as an edge function and provides the path on which the edge function will be invoked.</li> </ul>
<p>In this example, requests to <code>/test</code> will trigger the edge function and it will respond with <code>Hello world</code>.</p>
<aside> <p><figure></figure></p> <ul> <li>To have nuanced control over the order in which edge functions run, <a href="https://docs.netlify.com/build/edge-functions/declarations#declare-edge-functions-in-netlify-toml">configure your edge function paths in <code>netlify.toml</code></a> instead of inline in the function file.</li> <li>Avoid using Edge Functions in your site to request assets from the same site using <code>fetch()</code></li> </ul> </aside>
<p>You also have the option to use <code>.jsx</code> and <code>.tsx</code> files for your edge functions. This can be helpful if you want your function to handle server-side rendering (SSR) at the network edge.</p>
<p>For example, this <code>.tsx</code> file contains the code to stream React SSR at the edge without a meta-framework:</p>
<figure><pre data-language="tsx"><code>import React from "https://esm.sh/react";import { renderToReadableStream } from "https://esm.sh/react-dom/server";import type { Config, Context } from "@netlify/edge-functions";export default async function handler(req: Request, context: Context) {headers: { "Content-Type": "text/html" },</code></pre></figure>
<aside><p><figure></figure></p></aside>
<p>You can use <a href="https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli">Netlify CLI</a> to test edge functions locally before deploying them to Netlify.</p>
<ol> <li> <p>Visit <a href="http://localhost:8888/test">localhost:8888/test</a> to execute the <code>hello</code> edge function declared for the <code>/test</code> route.</p> </li> </ol>
<p>Changes to edge functions are applied on new requests.</p>
<ol> <li> <p>Edit <code>hello.js</code> to change the <code>Response</code>:</p> <figure><pre data-language="js"><code>export default () =&gt; new Response("Updated hello!");export const config = { path: "/test" };</code></pre></figure> </li> <li> <p>Save your updated function file.</p> </li> <li> <p>Reload <a href="http://localhost:8888/test">localhost:8888/test</a> and note that the response has changed.</p> </li> </ol>
<p>To debug edge functions locally, launch Netlify Dev with the <code>edge-inspect</code> or <code>edge-inspect-brk</code> flag. For details, visit the <a href="https://cli.netlify.com/commands/dev/">CLI docs</a>.</p>
<p>By default, the <code>geo</code> location used is the location of your local environment. To override this to a default mock location of San Francisco, CA, USA, use the <code>--geo=mock</code> flag. To mock a specific country, use <code>--geo=mock --country=</code> with a two-letter country code. For more information about the <code>--geo</code> flag, visit the <a href="https://cli.netlify.com/commands/dev/">CLI docs</a>.</p>
<p>Use <a href="https://docs.netlify.com/deploy/create-deploys#deploy-with-git">continuous deployment</a> or <a href="https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli#manual-deploys">Netlify CLI manual deploys</a> to deploy your edge functions.</p>
<aside> <p><figure></figure></p> <p>Manual deploys of edge functions are supported with Netlify CLI version 12.2.8 or later. Deploys made with older CLI versions will result in deployment errors.</p> </aside>
<p>If a project has TypeScript and JavaScript edge functions with the same name, for example, <code>my-function.ts</code> and <code>my-function.js</code>, the TypeScript function is ignored while the JavaScript function is deployed.</p>
<p>Invoke the deployed production version of your <code>hello</code> edge function declared for the <code>/test</code> route by accessing <code>yoursitename.netlify.app/test</code></p>
<p>Deploys of edge functions are atomic. This means that when a new deploy includes changes to function logic or declarations, the behavior of edge functions in old deploys won’t be impacted. Updates to edge functions move to production only when you publish a new production deploy.</p>
<p>To access logs for your production edge functions:</p>
<p>To access logs for other versions of your edge functions:</p>
<ol> <li>In the Netlify UI, go to your site’s <strong>Deploys</strong> tab.</li> <li>Find the deploy of interest.</li> <li>Follow the <strong>Edge Functions</strong> link in the deploy detail page header.</li> </ol>
<p>Netlify provides a log of any console statements output by your edge functions. The log for each console statement includes the name of the edge function that generated the output.</p>
<p>By default, the Edge Function log displays a live tail of the latest activity in <strong>Real-time</strong>. You can also filter to review data from a specific time period, including the <strong>Last hour</strong>, <strong>Last day</strong>, <strong>Last 7 days</strong>, or select <strong>Custom</strong> to input a specific date and time range.</p>
<p>To make debugging easier, you can filter the logs by edge function name or path. If desired, you can also use <a href="https://www.npmjs.com/package/glob#glob-primer">pattern matching</a> as part of your query.</p>
<p>Logs are retained for at least 24 hours of edge function activity, even after a new edge function deployment. This log retention period increases to 7 days for certain <a href="https://www.netlify.com/pricing/?category=developer#features-edge-functions-log-retention">pricing plans</a>.</p>
<p>You can connect your edge function logs to third-party monitoring services for analysis using Netlify’s Log Drains feature. Check out our <a href="https://docs.netlify.com/manage/monitoring/log-drains">Log Drains</a> doc for more information.</p>
