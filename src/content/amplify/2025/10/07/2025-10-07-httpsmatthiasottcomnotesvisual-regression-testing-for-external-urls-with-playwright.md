---
author: Matthias Ott
cover_image: >-
  https://matthiasott.com/assets/pictures/_twitterimage/blogtober-2025-day-06.jpg
date: '2025-10-07T12:08:33.890Z'
dateFolder: 2025/10/07
description: >-
  Matthias Ott is an independent user experience designer and web design
  engineer from Stuttgart, Germany. He also teaches Interface Prototyping at the
  Muthesius Academy of Fine Arts and Design.
isBasedOn: >-
  https://matthiasott.com/notes/visual-regression-testing-for-external-urls-with-playwright
link: >-
  https://matthiasott.com/notes/visual-regression-testing-for-external-urls-with-playwright
slug: >-
  2025-10-07-httpsmatthiasottcomnotesvisual-regression-testing-for-external-urls-with-playwright
tags:
  - code
title: Visual Regression Testing for External URLs With Playwright
---
<p>We’ve all been there: You write a bit of CSS, check whether everything looks right. You deploy. Then someone sends you a screenshot: the mobile navigation is broken. And why is the size of those headings just a bit off? And where has that button gone?</p>
<p>Especially when you are working on a larger codebase together or you are refactoring your CSS or consolidating redundant styles, seemingly small changes in one corner of your CSS (or JavaScript) can have repercussions in a seemingly unrelated component. If you ever changed your base typography styles, you know what I mean. The Cascade and inheritance are powerful features, but as your codebase grows, tracking possible interdependencies can become a challenge.</p>
<p>This is when visual regression testing can be useful. Instead of manually checking every page after each CSS change, you capture screenshots automatically and compare them against a baseline – the gold standard. When something shifts, breaks, disappears, or turns lightgoldenrodyellow, you’ll know immediately.</p>
<p>In a recent client project, we had that exact challenge: we needed to check a large amount of pages – more than 1500 – for how well they digested a rework of the HTML structure and the CSS of all headings in all frontend components. And we needed to compare the changes deployed to a staging system to the production site.</p>
<h2>But How?</h2>
<p>A first search surfaced <a href="https://meowni.ca/posts/2017-puppeteer-tests/">a great article by Monica Dinculescu from 2017</a> in which she explained how to setup visual diffing with Puppeteer. At the same time, I found another interesting solution: the testing framework <a href="https://vitest.dev/">Vitest</a> can now run <a href="https://main.vitest.dev/guide/browser/visual-regression-testing">native visual regression testing</a> out of the box.</p>
<p>While this seems to be a fantastic solution for testing components or pages within your own local (or cloud) test environment, it is designed for the experimental browser mode feature in the Vitest API, which means it can’t navigate to external URLs. So if, like in our case, you want to test a staging environment against a production site, you need a different approach.</p>
<p>At first, I thought of combining Vitest and <a href="https://playwright.dev/">Playwright</a>, but looking into the docs, I discovered that <a href="https://playwright.dev/docs/test-snapshots">Playwright Test includes the ability to produce and visually compare screenshots</a> using <code>expect(page).toHaveScreenshot()</code>. And because Playwright is built for browser testing, it can visit external URLs – and even interact with pages, if needed. 🎉</p>
<h2>Setup</h2>
<p>The initial setup turned out to be easier than expected. All you basically need is a new project and install Playwright Test. So you could start a new project with</p>
<p>using <code>playwright test</code> as the test command in the project setup dialog and then install Playwright Test with</p>
<p>Alternatively, you can also scaffold a new Playwright project with</p>
<p>This will give you a <code>package.json</code>file similar to this one – I added a few more useful test commands already:</p>
<pre><code data-lang="json">{
  "name": "playwright-visual-regression",
  "version": "1.0.0",
  "type": "module",
  "description": "Little demo project for visual diff testing with Playwright",
  "scripts": {
    "test": "playwright test",
    "test:update": "playwright test --update-snapshots",
    "test:debug": "playwright test --debug"
  },
  "author": "Matthias Ott",
  "license": "MIT",
  "devDependencies": {
    "@playwright/test": "^1.56.0"
  }
}</code></pre>
<h2>The Script</h2>
<p>Now the juicy part, the test script. Which also turned out to be a lot shorter than expected. I saved it as <code>./tests/visual-regression.test.js</code>. Playwright automatically executes all files in a <code>tests</code> (or <code>test</code>) folder that end in <code>*.spec.ts</code>/<code>*.spec.js</code> or <code>*.test.ts</code>/<code>*.test.js</code>.</p>
<p>We start by importing Playwright’s test runner and defining a config object for a few basic settings:</p>
<pre><code data-lang="javascript">import { test, expect } from '@playwright/test';

/**
 * Configuration:
 * - baseUrl: The base URL of the site to test.
 * - routes: The routes to test (relative to baseUrl).
 * - viewports: Different viewport sizes to test (width, height, icon).
 */
const CONFIG = {
	
  baseUrl: 'https://matthiasott.com',
  routes: [
    '', 
    'notes', 
    'articles', 
    'workshops', 
    'links', 
    'about'
  ],
  viewports: {
    wide: { width: 1280, height: 800, icon: '🖥️' },
    narrow: { width: 375, height: 667, icon: '📱' },
  },
};</code></pre>
<p>And now off to the actual tests – read the comments to see what each section does:</p>
<pre><code data-lang="javascript">/**
 * Tests
 */
 
// We loop through each viewport configuration
Object.entries(CONFIG.viewports).forEach(([viewport, { width, height, icon }]) =&gt; {
  
  // Create a test group for this viewport
  // test.describe() groups related tests 
  // together in the console output
  test.describe(`${icon} ${viewport}`, () =&gt; {
    
    // Configure Playwright to use this viewport size
    test.use({ viewport: { width, height } });

    // Now we loop through each route we want to test …
    CONFIG.routes.forEach(route =&gt; {
      
      // … and define an individual test for this route. 
      // With the `page` object, Playwright controls the browser
      test(`📸 ${route || ''}`, async ({ page }) =&gt; {
        
        // Build the complete URL        
        const url = `${CONFIG.baseUrl}/${route}`;
        
        // Navigate to the URL
        // (waitUntil: 'networkidle' waits for the page to finish loading)
        await page.goto(url, { waitUntil: 'networkidle' });
        
        // Now we can take a screenshot and compare it to the baseline
        await expect(page).toHaveScreenshot({
          // Only capture the viewport, not entire scrollable page
          fullPage: false,
          // How much difference do we allow between the screenshots?
          maxDiffPixels: 100,   
        });
      });
    });
  });
});
</code></pre>
<p>And that’s it! The brilliant thing about using Playwright is that we don’t have to generate diff images that show the difference between the baseline and a new screenshot separately. Playwright does this automatically for us and puts the respective diff images into the image folder alongside the baseline and the screenshots to compare against.</p>
<p>The last step is to run the test:</p>
<p>On the first run, Playwright will create the baseline screenshots. On subsequent runs, it will take new screenshots and compare them against the original gold standard versions.</p>
<figure><picture> <source sizes="100vw" srcset="https://matthiasott.com/assets/pictures/_standardImage1536/Screenshot-Playwright-test-results.png%201536w,%20/assets/pictures/_standardImage768/Screenshot-Playwright-test-results.png%20768w"/> <img alt="Screenshot Playwright test results" src="https://matthiasott.com/assets/pictures/_standardImage768/Screenshot-Playwright-test-results.png"/> </picture></figure>
<p>There are a few Playwright commands that can make this script even more useful, for example:</p>
<p>A really useful last adjustment can be to generate an HTML report of the test results. To do this, we need to slightly adjust the test script section in our <code>package.json</code> and add the <code>--reporter=html</code> flag to the <code>playwright test</code> command, so that a “reporter” is specified. Then, we can add another script command to show the results (<code>"test:report": "playwright show-report"</code>):</p>
<pre><code data-lang="json">"scripts": {
    "test": "playwright test --reporter=html",
    "test:update": "playwright test --update-snapshots",
    "test:debug": "playwright test --debug"
    "test:report": "playwright show-report",
  },</code></pre>
<p>Now Playwright will serve an HTML report if there are any errors. To show the results of our test we can also use this command:</p>
<figure><picture> <source sizes="100vw" srcset="https://matthiasott.com/assets/pictures/_standardImage1536/playwright-test-results-report-overview.png%201536w,%20/assets/pictures/_standardImage768/playwright-test-results-report-overview.png%20768w"/> <img alt="Playwright test results report overview" src="https://matthiasott.com/assets/pictures/_standardImage768/playwright-test-results-report-overview.png"/> </picture><figcaption>Playwright test results report overview</figcaption></figure>
<figure><picture> <source sizes="100vw" srcset="https://matthiasott.com/assets/pictures/_standardImage1536/playwright-test-results-detail-view.png%201536w,%20/assets/pictures/_standardImage768/playwright-test-results-detail-view.png%20768w"/> <img alt="Playwright test results detail view" src="https://matthiasott.com/assets/pictures/_standardImage768/playwright-test-results-detail-view.png"/> </picture><figcaption>Playwright test results detail view</figcaption></figure>
<p>Of course, this is just the first version of this script which could be improved further. You could add a Playwright config file that changes the output directory or move the config options from the top of the script into the config file to make it easier to reuse the testing script in different projects, for example. Playwright also allows you to install <a href="https://playwright.dev/docs/browsers">different browser engines</a>, like <code>chromium</code>, <code>firefox</code>, or <code>webkit</code> – all default engines can be installed with the command <code>npx playwright install</code>. So you could even use a specific browser to make your screenshots. You could also add authentication, in case your staging environment is password-protected, integrate the visual regression script into a CI workflow, and, and, and …</p>
<p>Now I’m curious: are you using any type of visual regression testing – or any testing at all? Let me know, for example on <a href="https://mastodon.social/@matthiasott">Mastodon</a>, <a href="https://bsky.app/profile/matthiasott.com">Bluesky</a>, or by <a href="mailto:mail@matthiasott.com">email</a></p>
<p>This is post 6 of <a href="https://matthiasott.com/notes/blogtober-2025-day-01">Blogtober 2025</a>.</p>
<p>ⓘ Webmentions are a way to notify other websites when you link to them, and to receive notifications when others link to you. <a href="https://webmention.io/">Learn more about Webmentions.</a></p>
