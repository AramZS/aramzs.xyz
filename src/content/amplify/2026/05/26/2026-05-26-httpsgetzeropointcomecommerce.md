---
author: getzeropoint.com
cover_image: 'https://getzeropoint.com/assets/images/social.png'
date: '2026-05-26T20:11:13.405Z'
dateFolder: 2026/05/26
description: >-
  Adding a static e-commerce store to ZeroPoint using third-party product APIs
  as a build-time CMS
isBasedOn: 'https://getzeropoint.com/ecommerce/'
link: 'https://getzeropoint.com/ecommerce/'
slug: 2026-05-26-httpsgetzeropointcomecommerce
tags:
  - code
title: Selling products and accepting payments (e-commerce) with ZeroPoint
---

<p>Any platform with a product API can be your store's CMS. Fetch your catalog at build time, generate static product pages, and let the platform host the checkout. No database, no server, no runtime — just durable HTML.</p>
<p>Your products live in the platform you choose. Every time your site builds, ZeroPoint fetches the latest data and regenerates your store automatically.</p>
<h2>Example platforms</h2>
<p>The principles below apply to any e-commerce platform with a product API and hosted checkout. Here are two popular options that work great with ZeroPoint:</p>
<h2>Both follow the same pattern</h2>
<ol> <li>Create products in the platform's dashboard</li> <li><code>src/data/[platform].js</code> fetches your catalog at build time</li> <li>A store listing page at <code>/store/</code> loops over the data</li> <li>Individual product pages at <code>/store/product-name/</code> are generated via <a href="https://www.11ty.dev/docs/pagination/">pagination</a></li> <li>The "Buy Now" button links to the platform's hosted checkout — no payment data touches your site</li> </ol>
