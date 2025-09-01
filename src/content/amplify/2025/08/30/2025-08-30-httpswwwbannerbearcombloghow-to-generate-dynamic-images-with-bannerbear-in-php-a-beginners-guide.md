---
author: bannerbear.com
cover_image: >-
  https://ondemand.bannerbear.com/signedurl/O8DLd4begKpel5apNz/image.jpg?modifications=W3sibmFtZSI6InRpdGxlIiwidGV4dCI6IkhvdyB0byBHZW5lcmF0ZSBEeW5hbWljIEltYWdlcyB3aXRoIEJhbm5lcmJlYXIgaW4gUEhQOiBBIEJlZ2lubmVyJ3MgR3VpZGUifSx7Im5hbWUiOiJ0aHVtYm5haWwiLCJpbWFnZV91cmwiOiJodHRwczovL3d3dy5iYW5uZXJiZWFyLmNvbS9pbWFnZXMvZ2hvc3QvMjAyNS0wMy0wNS1ob3ctdG8tZ2VuZXJhdGUtZHluYW1pYy1pbWFnZXMtd2l0aC1iYW5uZXJiZWFyLWluLXBocC1hLWJlZ2lubmVycy1ndWlkZS9Ib3dfdG9fVXNlX0Jhbm5lcmJlYXJfUEhQX0xpYnJhcnlfdG9fR2VuZXJhdGVfSW1hZ2VzLnBuZyJ9LHsibmFtZSI6ImRhdGUiLCJ0ZXh0IjoiTWFyY2ggMjAyNSJ9LHsibmFtZSI6InJlYWR0aW1lIiwidGV4dCI6IjExIG1pbiByZWFkIn0seyJuYW1lIjoiYXZhdGFyIiwiaW1hZ2VfdXJsIjoiaHR0cHM6Ly93d3cuYmFubmVyYmVhci5jb20vaW1hZ2VzL2dob3N0L2F1dGhvcnMvam9zZXBoaW5lLmpwZyJ9LHsibmFtZSI6ImF1dGhvciIsInRleHQiOiJKb3NlcGhpbmUgTG9vIn1d&s=5774f52f855f076d68a005c96d46073370e7bfc4d5de5995014d0b0467744fd0
date: '2025-08-30T22:29:32.204Z'
dateFolder: 2025/08/30
description: >-
  Learn how to automate branded image creation using Bannerbear's PHP library.
  This step-by-step guide covers everything you need to know to dynamically
  generate images from different data, making the process of image creation more
  efficient. 
isBasedOn: >-
  https://www.bannerbear.com/blog/how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/
link: >-
  https://www.bannerbear.com/blog/how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/
slug: >-
  2025-08-30-httpswwwbannerbearcombloghow-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide
tags:
  - ai
  - tech
title: 'How to Generate Dynamic Images with Bannerbear in PHP: A Beginner''s Guide'
---
<p>Studies show that <a href="https://adespresso.com/blog/facebook-ads-relevance-score/">visual content can increase website traffic by up to 55%</a>, and <a href="https://explodingtopics.com/blog/branding-stats">more than half of first impressions of a brand are based on visuals</a>. Branded visuals are key to building brand recognition and trust. A well-designed website with cohesive branded visuals like customer reviews, testimonials, and promotional banners not only boosts engagement but also reinforces brand identity.</p>
<p>If you’re a developer looking to automate branded image creation, this guide is for you. In this tutorial, you'll learn how to use Bannerbear's PHP library to dynamically generate images by customizing them with your own images, text, and brand colors. With Bannerbear, you can automatically create branded visuals, such as customer review images like these…</p>
<figure><img alt="Bannerbear design template - result 1.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/0.png"/></figure>
<figure><img alt="Bannerbear PHP tutorial - result 1.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/1.png"/></figure>
<p>…and seamlessly display them on your website or social media!</p>
<h2>Why Generate Images Dynamically: Use Cases</h2>
<p>Dynamic image generation simplifies and accelerates the creation of visual content. It helps save time, ensures consistency, and makes it easy to personalize content for different needs at any scale. Here are some examples where dynamic image generation can be particularly useful:</p>
<ul> <li><strong>Social media content</strong> - Social media platforms demand a continuous stream of visually appealing posts, which can be time-consuming and labor-intensive to create manually. Dynamic image generation automates this by pulling data from websites, databases, or other external sources to generate images, saving designers time and effort in <a href="https://www.bannerbear.com/blog/how-to-automatically-produce-linkedin-podcast-quote-carousel-graphics/#create-an-airtable-base-to-store-quotes">creating social media content</a>.</li> <li><strong>E-commerce images</strong> - Dynamic image generation enables the automatic creation of website banners and product images that reflect the current pricing, discounts, and, promotions. This is especially useful during seasonal sales like Black Friday and Cyber Monday where a large volume of <a href="https://www.bannerbear.com/blog/how-to-create-dynamic-price-graphics-with-no-code-automation/">promotional images</a> needs to be created for various products and discounts.</li> <li><strong>Events materials</strong> - For event organizers or event management platforms, dynamic image generation simplifies the creation of materials such as tickets, banners, and schedules. It can <a href="https://www.bannerbear.com/blog/how-to-auto-generate-social-media-posts-for-a-business-conference-using-bannerbear-nodejs-part-2/">incorporate unique attendee information</a>, QR codes, and URLs to create these items at scale automatically.</li> <li><strong>Link preview</strong> - <a href="https://www.bannerbear.com/blog/how-to-make-a-custom-open-graph-image-using-puppeteer/#using-bannerbear">Custom link preview images</a> that showcase key information from the linked content—like titles, descriptions, and relevant graphics can significantly boost click-through rates on social media posts, email marketing campaigns, and messaging platforms. Dynamic image generation automates this process, eliminating the need for manual design for each link.</li> </ul>
<blockquote> <p>🐻 <strong>Bear Tip:</strong> When sharing links on the internet, each platform has its own name for the preview that shows up. Common names include Open Graph images, X/Twitter Cards, Unfurled links (on Slack), and link cards.</p> </blockquote>
<p>These examples highlight the benefits of dynamic image generation across various industries and applications, and Bannerbear offers a powerful solution to easily implement this.</p>
<h2>What is Bannerbear</h2>
<p><a href="https://www.bannerbear.com/">Bannerbear</a> is a media generation tool that lets you automatically generate custom images, videos, and more using templates and external data. It offers <a href="https://developers.bannerbear.com/">APIs</a> and libraries in various popular programming languages, including <a href="https://github.com/yongfook/bannerbear-node">Nodes.js</a>, <a href="https://github.com/yongfook/bannerbear-ruby">Ruby</a>, and <a href="https://github.com/yongfook/bannerbear-php">PHP</a>, making it easy to automate and integrate dynamic image generation into your projects.</p>
<p>At its core, Bannerbear works with design templates that serve as blueprints for creating images. The design template can include two types of objects:</p>
<ul> <li><strong>Static objects</strong> - Elements that remain constant in every generated image, such as a company logo.</li> <li><strong>Dynamic objects</strong> - Elements that change based on your provided data, such as text or images.</li> </ul>
<p>For example, you can create a design template for customer reviews, with placeholders for the review text, customer photo, star rating, and more:</p>
<figure><img alt="Bannerbear design template - example.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/2.png"/></figure>
<p>When different data is passed to the template using the API or library, it generates unique images tailored to the data. Here’s an example of how the same template can produce entirely different images based on the data provided:</p>
<figure><img alt="Bannerbear design template - result 1.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/3.png"/></figure>
<figure><img alt="Bannerbear design template - result 2.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/4.png"/></figure>
<p>Now that you have a better idea of how Bannerbear works, let’s get started with the setup!</p>
<h2>Pre-requisites</h2>
<p>Before we get started, let’s make sure you have the necessary tools set up:</p>
<ul> <li>A <a href="https://www.bannerbear.com/">Bannerbear account</a> (<a href="https://app.bannerbear.com/">sign up</a> if you haven’t already)</li> <li>PHP 7.4 or higher installed on your system</li> <li><a href="https://getcomposer.org/">Composer</a> (PHP dependency manager) installed</li> </ul>
<p>Once you’ve set these up, you’re ready to begin!</p>
<h2>Creating a Bannerbear Design Template</h2>
<p>After logging into your Bannerbear dashboard, set up a project and create a template within that project. This will give you a blank canvas where you can add layers of static and dynamic text, images, and other objects.</p>
<p>Alternatively, you can duplicate any template from the <a href="https://www.bannerbear.com/templates/">Template Library</a>, including <a href="https://app.bannerbear.com/p/lgkeW95OnXM1pqPLBo">the one below</a> (click on it to add it to your project), and customize it to meet your needs:</p>
<p>In the template above, we have the following modifiable dynamic objects:</p>
<ul> <li><strong>Text</strong> - <em>review, name, location</em></li> <li><strong>Image</strong> - <em>background, avatar</em></li> <li><strong>Special object</strong> - <em>star_rating</em></li> </ul>
<blockquote> <p><strong>🐻 Bear Tip:</strong> Each object has a unique name that you can use in your code to modify it later on the template. We'll go into more detail on this in the following section.</p> </blockquote>
<p>To access your Bannerbear project and the design template in your code, you need your project API key and template ID for authentication.</p>
<p>On your template’s main page, you should see <strong>“Settings/API Key”</strong> in the top right corner. Click on it to reveal your API key:</p>
<figure><img alt="Bannerbear design template - getting the API key.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/6.png"/></figure>
<p>For the template ID, it can be found in the template option as shown in the screenshot below:</p>
<figure><img alt="Bannerbear design template - getting the template ID.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/7.png"/></figure>
<p>Make sure to save the API key and template ID for use in your code later.</p>
<h2>Generating a Dynamic Image with Bannerbear in PHP</h2>
<h3>Step 1. Install the Bannerbear PHP Library</h3>
<p>Start by installing the official <a href="https://github.com/yongfook/bannerbear-php">Bannerbear PHP library</a> using Composer. Run the following command in your terminal/command prompt:</p>
<pre><code>composer require yongfook/bannerbear
</code></pre>
<p>This will add the library to your project, enabling you to interact with Bannerbear’s API easily.</p>
<blockquote> <p><strong>🐻 Bear Tip:</strong> If your Composer is installed globally, run <code>php composer.phar yongfook/bannerbear</code> from the same directory instead.</p> </blockquote>
<h3>Step 2. Initialize the Bannerbear Client</h3>
<p>Next, you’ll need to set up the Bannerbear client. Create a new PHP file (e.g., <code>generate_image.php</code>) and initialize the client as follows:</p>
<pre><code>&lt;?php

require_once('vendor/autoload.php');

$bb = new Bannerbear\BannerbearClient("your_api_key");

?&gt;
</code></pre>
<p>Replace <code>'your_api_key'</code> with the API key from your Bannerbear account dashboard. This key is required to authenticate your requests.</p>
<h3>Step 3. Define Your Data</h3>
<p>We need to prepare the data that will populate the design template. For example, let's create a customer review image with these details:</p>
<pre><code>$data = [
    'modifications' =&gt; [
        [
            'name' =&gt; 'review',
            'text' =&gt; 'Their food and vibe are amazing! 5/5 stars!',
        ],
        [
            'name' =&gt; 'name',
            'text' =&gt; 'Michelle Lam',
            'background' =&gt; '#74A12E',
        ],
        [
            'name' =&gt; 'location',
            'text' =&gt; 'Mitasu Japanese',
            'color' =&gt; '#74A12E'
        ],
        [
            'name'=&gt; 'avatar',
            'image_url' =&gt; 'https://images.pexels.com/photos/3808041/pexels-photo-3808041.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2',
        ],
        [
            'name' =&gt; 'background',
            'image_url' =&gt; 'https://images.pexels.com/photos/343870/pexels-photo-343870.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2'
        ],
        [
            'name' =&gt; 'star_rating',
            'rating' =&gt; 90
        ]
    ]
];
</code></pre>
<p>Here, <code>name</code> corresponds to the modifiable dynamic objects in your template, while the values are the content you want to insert.</p>
<figure><img alt="a screenshot highlighting the modifiable dynamic objects in the Bannerbear design template.png" src="https://www.bannerbear.com/images/ghost/2025-03-05-how-to-generate-dynamic-images-with-bannerbear-in-php-a-beginners-guide/8.png"/></figure>
<h3>Step 4. Generate the Image</h3>
<p>Next, use the Bannerbear client to generate an image using your template and data, then print the URL of the generated image:</p>
<pre><code>$image = $bb-&gt;create_image(
    "your_template_uid",
    $data,
    TRUE
  );

print_r($image['image_url']);
</code></pre>
<p>Replace <code>'your_template_uid'</code> with the UID of your template.</p>
<blockquote> <p><strong>🐻 Bear Tip:</strong> Check out the <a href="https://developers.bannerbear.com/">API documentation</a> for more details on how to use the API.</p> </blockquote>
<h3>Step 5. Run the Code</h3>
<p>Let’s test the image generation by running the code. In the terminal/command prompt, run the command below:</p>
<pre><code>php generate_image.php
</code></pre>
<p>Once the image is generated, a URL to the image will be printed. Here’s the generated image based on the data above:</p>
<p>This simple example demonstrates how to use the Bannerbear PHP library to generate images. You can modify the code to pull data from your own source to generate images dynamically based on the data, or even trigger the image generation based on user action. For example, whenever a new user signs u<a href="https://www.bannerbear.com/blog/how-i-send-a-personalized-welcome-image-to-every-new-signup-of-my-saas/">p, a personalized welcome image can be automatically generated and sent to them</a>.</p>
<h2>Why Use Bannerbear for Dynamic Image Generation</h2>
<p>Automating image creation with Bannerbear offers several advantages, including:</p>
<ul> <li><strong>Save time</strong> - Bannerbear’s API automates the image generation process, freeing you up to focus on other important tasks.</li> <li><strong>Maintain brand consistency</strong> - Consistently apply your brand’s style across all generated media using templates.</li> <li><strong>Enhance user engagement</strong> - Personalized images based on user actions or preferences increase the sense of exclusivity, leading to enhanced user experience and engagement.</li> <li><strong>Easy integration</strong> - Bannerbear’s PHP library makes it easy to integrate dynamic image generation directly into your app.</li> </ul>
<p>This tutorial covered the basics, but there's so much more you can do with Bannerbear. For example, you can <a href="https://www.bannerbear.com/blog/template-set-batch-generate-images-in-different-dimensions-using-bannerbear-nodejs/">generate images from multiple templates</a> using the same data in a single API call, get notifications when your image generation is complete, c<a href="https://www.bannerbear.com/blog/a-basic-guide-to-simple-and-signed-urls-for-image-generation/">reate dynamic images on-demand through URL parameters</a>, and more. If you haven’t already, <a href="https://app.bannerbear.com/">sign up for Bannerbear</a> today and try them out yourself!</p>
