---
author: Docs
cover_image: 'https://docs.astro.build/open-graph/en/guides/cms/decap-cms.webp'
date: '2026-04-15T18:29:45.845Z'
dateFolder: 2026/04/15
description: Add content to your Astro project using Decap as a CMS
isBasedOn: 'https://docs.astro.build/en/guides/cms/decap-cms/'
link: 'https://docs.astro.build/en/guides/cms/decap-cms/'
slug: 2026-04-15-httpsdocsastrobuildenguidescmsdecap-cms
tags:
  - cms
  - tech
  - tools
  - blogging
title: Installing DecapCMS
---
<p><a href="https://www.decapcms.org/">Decap CMS</a> (formerly Netlify CMS) is an open-source, Git-based content management system.</p>
<p>Decap allows you to take full advantage of all of Astro’s features, including image optimization and content collections.</p>
<p>Decap adds a route (typically <code>/admin</code>) to your project that will load a React app to allow authorized users to manage content directly from the deployed website. Decap will commit changes directly to your Astro project’s source repository.</p>
<p>There are two options for adding Decap to Astro:</p>
<p>See <a href="https://decapcms.org/docs/configure-decap-cms/">the Decap CMS configuration documentation</a> for full instructions and options.</p>
<p>Navigate to <code>yoursite.com/admin/</code> to use the Decap CMS editor.</p>
<p>Decap CMS was originally developed by Netlify and has first class support for <a href="https://docs.netlify.com/security/secure-access-to-sites/identity/">Netlify Identity</a>.</p>
<p>When deploying to Netlify, configure Identity for your project via the Netlify dashboard and include the <a href="https://github.com/netlify/netlify-identity-widget">Netlify Identity Widget</a> on the <code>admin</code> route of your project. Optionally include the Identity Widget on the homepage of your site if you plan to invite new users via email.</p>
<p>When deploying to hosting providers other than Netlify, you must create your own OAuth routes.</p>
<p>In Astro, this can be done with on-demand rendered routes in your project configured with <a href="https://docs.astro.build/en/guides/on-demand-rendering/">an adapter</a> enabled.</p>
<p>See <a href="https://decapcms.org/docs/external-oauth-clients/">Decap’s OAuth Docs</a> for a list of compatible community-maintained OAuth clients.</p>
<p>The following sites use Astro + Decap CMS in production:</p>
<figure><img alt="" src="https://docs.astro.build/_astro/astros.CA8z6dbD_1DAx4t.webp"/></figure>
<figure><img alt="" src="https://docs.astro.build/_astro/enhanced-astro-starter.BDAzOMVv_1DBCpt.webp"/></figure>
<figure><img alt="" src="https://docs.astro.build/_astro/astro-decap-starter.CuC8RtgM_1x5zxf.webp"/></figure>
