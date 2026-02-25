---
author: Sanity
cover_image: 'https://www.sanity.io/static/images/opengraph/social.png'
date: '2026-02-24T23:40:07.479Z'
dateFolder: 2026/02/24
description: >-
  Discover ISR: Update static pages easily without full rebuilds. Perfect for
  large sites!
isBasedOn: 'https://www.sanity.io/glossary/incremental-static-regeneration'
link: 'https://www.sanity.io/glossary/incremental-static-regeneration'
slug: 2026-02-24-httpswwwsanityioglossaryincremental-static-regeneration
tags:
  - code
  - tech
title: Incremental Static Regeneration (ISR) overview
---
<h2><a href="https://www.sanity.io/glossary/incremental-static-regeneration#fd514524cef5"><figure></figure><figure></figure></a></h2>
<p>During the initial build process, static pages are generated and served to users. Developers can specify a <strong>revalidation period</strong> for each static page. Once this period elapses, the next request to the page triggers a regeneration of the page in the background. While the page is being regenerated, the old (stale) version of the page continues to be served to users.</p>
<p>Upon completion of the regeneration, the old version of the page is replaced with the new one for subsequent requests. This method combines the advantages of static generation, such as performance and reliability, with the ability to update content dynamically when necessary. It is particularly useful for sites with content that changes periodically but not constantly, like e-commerce sites, blogs, or news sites.</p>
<h2><a href="https://www.sanity.io/glossary/incremental-static-regeneration#7b7029346ecf"><figure></figure><figure></figure></a></h2>
<p>ISR integrates into the development lifecycle mainly during the <strong><a data-state="closed" href="https://www.sanity.io/glossary/deployment">deployment</a> and runtime phases</strong>. In the development phase, developers write code, create components, and define pages, specifying a revalidation period for pages that will use ISR.</p>
<p>The application, including the behavior of ISR pages, is then tested to ensure they regenerate as expected and that stale content is served appropriately while regeneration occurs. During the build and deployment phase, the application is built and deployed to a hosting environment, with pages marked for ISR built as static but with revalidation rules in place.</p>
<p>In the runtime phase, the application serves pre-generated static pages to users. If a user requests a page marked for ISR and the revalidation period has elapsed, the page is regenerated in the background, serving the stale version until the regeneration is complete. ISR allows updates from external data sources or CMS to be reflected on the static pages without requiring a full rebuild of the application, regenerating only the affected pages incrementally. Developers monitor and might adjust the performance and behavior of ISR pages in production based on observed traffic patterns and content update frequency, continuing to iterate on the application as it evolves.</p>
<p>For example, when content changes are made within <strong>Sanity's Composable Content Cloud</strong>, a flexible and innovative modern <a href="https://www.sanity.io/headless-cms">headless CMS</a>, ISR can be triggered to regenerate only those pages directly affected by these updates, optimizing performance and efficiency during the development process.</p>
<h2><a href="https://www.sanity.io/glossary/incremental-static-regeneration#81ed9982037b"><figure></figure><figure></figure></a></h2>
<p>ISR is primarily associated with the <strong><a href="https://www.sanity.io/glossary/next-js">Next.js</a> framework</strong>, so using <a data-state="closed" href="https://www.sanity.io/glossary/next-js">Next.js</a> for your application development is a prerequisite. Developers need to use a version of Next.js that supports ISR, have <a href="https://www.sanity.io/glossary/node-js"><strong>Node.js </strong></a>installed, and choose a hosting environment that supports ISR, such as <strong>Vercel, Netlify, or AWS Amplify</strong>. Access to your data source or API is necessary if your application relies on external data, as ISR will regenerate pages by fetching fresh data when the revalidation period has elapsed.</p>
<p>A development setup with the necessary tools and packages for developing a Next.js application is also required, along with familiarity with <strong>React and Next.js</strong>. Proper configuration of the <strong>getStaticProps function</strong> in your Next.js pages is necessary to enable ISR.</p>
<h2><a href="https://www.sanity.io/glossary/incremental-static-regeneration#315fd0031c30"><figure></figure><figure></figure></a></h2>
<p>ISR significantly enhances the performance of web applications by serving static pages, which typically load faster compared to dynamically rendered pages, leading to a better user experience.</p>
<p>However, managing the <strong>revalidation intervals</strong> is crucial as triggering regeneration too frequently might affect the server and data sources' load, potentially impacting performance. ISR introduces flexibility in managing and updating static content, allowing developers to regenerate individual pages without redeploying the entire application. This flexibility, however, introduces added complexity, requiring developers to understand and manage the regeneration of pages and strategize about the application's consistency requirements.</p>
<p>From an infrastructure perspective, ISR reduces the server load, enabling applications to scale easily and potentially leading to cost savings. Static pages can be served from a <a href="https://www.sanity.io/glossary/content-delivery-network"><strong>Content Delivery Network (CDN)</strong></a>, contributing to high availability and scalability. However, frequent regeneration of pages can lead to increased build requests, potentially impacting infrastructure costs depending on the hosting provider and plan. Developers also need to consider <strong><a data-state="closed" href="https://www.sanity.io/glossary/cache-invalidation">cache invalidation</a> strategies</strong> to ensure updated content is served.</p>
