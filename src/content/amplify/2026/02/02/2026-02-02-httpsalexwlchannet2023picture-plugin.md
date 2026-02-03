---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/cards/2023/picture-plugin.jpg'
date: '2026-02-02T20:42:14.552Z'
dateFolder: 2026/02/02
description: >-
  Organising files per-year matches the URL structure of individual posts
  (/:year/:slug), and helps keep the folder just a bit more manageable.
isBasedOn: 'https://alexwlchan.net/2023/picture-plugin/'
link: 'https://alexwlchan.net/2023/picture-plugin/'
slug: 2026-02-02-httpsalexwlchannet2023picture-plugin
tags:
  - code
title: My custom <picture> plugin for Jekyll – alexwlchan
---
<p><a href="https://alexwlchan.net/2023/picture-plugin/#main">Skip to main content</a></p>
<h1>My custom <picture> plugin for Jekyll</picture></h1>
<ul>
<li>Tagged with <a href="https://alexwlchan.net/tags/blogging-about-blogging/">blogging about blogging</a>, <a href="https://alexwlchan.net/tags/jekyll/">jekyll</a>, <a href="https://alexwlchan.net/tags/web-development/">web development</a></li>
<li>Posted 15 July 2023</li>
</ul>
<p>About seven months ago, I did a complete rewrite of how I handle images on this site. It’s working well and nothing seems to have broken, so I thought it might be good to explain what I’m doing.</p>
<p>For readers: I want images to load quickly and look good. That means looking sharp on high-resolution displays, but without forcing everyone to download massive images.</p>
<p>For me: I want images to be easy to manage. It should be easy for me to add images to a post, and to customise them if I want to do something special.</p>
<p>One way to achieve this is with vector images – SVGs. Those are great for simple diagrams and drawings, and I use them plenty, but they don’t work for photographs and screenshots.</p>
<p>For bitmap images, I wrote a <a href="https://github.com/alexwlchan/alexwlchan.net/blob/5cd88f9a34c5197f7d41b21dda3e8c81dc00d9b9/src/_plugins/tag_picture.rb">custom Jekyll plugin</a>. Usually my original image is a JPEG or a PNG. I save it in <code>_images</code>, and then I include my custom <code>{% picture %}</code> tag in the Markdown source:</p>
<pre><code>{%
  picture
  filename="IMG_9016.jpg"
  width="750"
  class="photo"
  alt="A collection of hot pink flowers, nestled among some dark green leaves in a greenhouse."
%}
</code></pre>
<p>This expands into a larger chunk of HTML, which refers to several different variants of the image:</p>
<pre><code>&lt;picture&gt;
  &lt;source
    srcset="/images/2023/IMG_9016_1x.avif 750w,
            /images/2023/IMG_9016_2x.avif 1500w,
            /images/2023/IMG_9016_3x.avif 2250w"
    sizes="(max-width: 750px) 100vw, 750px"
    type="image/avif"
  &gt;
  &lt;source
    srcset="/images/2023/IMG_9016_1x.webp 750w,
            /images/2023/IMG_9016_2x.webp 1500w,
            /images/2023/IMG_9016_3x.webp 2250w"
    sizes="(max-width: 750px) 100vw, 750px"
    type="image/webp"
  &gt;
  &lt;source
    srcset="/images/2023/IMG_9016_1x.jpg 750w,
            /images/2023/IMG_9016_2x.jpg 1500w,
            /images/2023/IMG_9016_3x.jpg 2250w"
    sizes="(max-width: 750px) 100vw, 750px"
    type="image/jpeg"
  &gt;
  &lt;img
    src="/images/2023/IMG_9016_1x.jpg"
    width="750"
    style="aspect-ratio: 3 / 4;"
    class="photo"
    alt="A collection of hot pink flowers, nestled among some dark green leaves in a greenhouse."
  &gt;
&lt;/picture&gt;
</code></pre>
<p>Let’s unpack what’s going on.</p>
<hr/>
<h2>Getting the path to the image file</h2>
<p>My <code>_images</code> directory is organised into per-year folders:</p>
<pre><code>.
└─ _images/
    ├─ 2022/
    │   ├─ acme_corporation.jpg
    │   ├─ alarm_console.png
    │   ├─ alfred_search.png
    │   └─ ...164 other files
    └─ 2023/
        ├─ amazon-cheetah-listing.jpg
        ├─ avif_image_broken.png
        ├─ bedroom_layout.png
        └─ ...53 other files
</code></pre>
<p>Organising files per-year matches the URL structure of individual posts (<code>/:year/:slug</code>), and helps keep the folder just a bit more manageable. I have ~1300 images, and throwing them all in a single folder would get unwieldy. In this example, the original file is <code>_images/2023/IMG_9016.jpg</code>.</p>
<p>How does the plugin find an image in this directory structure?</p>
<p>I pass a <code>filename</code> attribute to the <code>{% picture %}</code> tag, which tells you the name of the image file, but notice that I don’t pass a year anywhere.</p>
<p>That’s because my plugin can work it out automatically – when Jekyll renders a <a href="https://jekyllrb.com/docs/plugins/tags/">custom liquid tag</a> on a page, it passes the page as a context variable. That means each instance of my picture tag knows which article it’s in, and it can get the article’s publication date. Then it can construct the path to the original image.</p>
<pre><code>module Jekyll
  class PictureTag &lt; Liquid::Tag
    def render(context)
      article = context.registers[:page]
      date = article['date']
      year = date.year

      path = "_images/#{year}/#{filename}"
      …
</code></pre>
<p>I use this technique in a couple of plugins – it allows me to organise my files without too much hassle when using them.</p>
<hr/>
<h2>Getting different sizes of the image</h2>
<p>I pass a <code>width</code> attribute to my <code>{% picture %}</code> tag – this tells the plugin how wide the image will appear on the page. This mimics the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#width">HTML attribute of the same name</a>.</p>
<p>I get the dimensions of the original image using the <a href="https://github.com/mtgrosser/rszr">rszr gem</a>:</p>
<pre><code>require 'rszr'

image = Rszr::Image.load(source_path)
puts image.width
</code></pre>
<p>Then I use ImageMagick to create multiple derivative images, at different widths for different screen pixel densities – 1x, 2x, or 3x. I don’t create derivatives that are wider than the original image; that would be wasteful.</p>
<pre><code>widths_to_create =
  (1..3)
    .map { |pixel_density| pixel_density * visible_width }
    .filter { |w| w &lt;= image.width }
</code></pre>
<p>For example, if the original file is 250px wide, and I want to show the image at 100px wide, then the plugin would create a 1x image (100px) and a 2x image (200px) but not a 3x image (because 300px is wider than the original image).</p>
<p>This resizing happens as part of the Jekyll build process. An alternative would be to use a proper image CDN and create these derivative images at request time (e.g. <a href="https://imgix.com/">imgix</a> or <a href="https://www.netlify.com/products/large-media/">Netlify Large Media</a>), but I’m already doing custom steps in my Jekyll build and it was easier to extend that mechanism than add a new service. It also makes it easier to work with images in a local Jekyll server.</p>
<p>To tell the browser about these different sizes, I use the HTML <code>picture</code> and <code>source</code> tags, the latter with an <code>srcset</code> attribute:</p>
<pre><code>&lt;picture&gt;
  …
  &lt;source
    srcset="/images/2023/IMG_9016_1x.jpg 750w,
            /images/2023/IMG_9016_2x.jpg 1500w,
            /images/2023/IMG_9016_3x.jpg 2250w"
    sizes="(max-width: 750px) 100vw, 750px"
    type="image/jpeg"
  &gt;
  &lt;img
    src="/images/2023/IMG_9016_1x.jpg"
    width="750"
    …
  &gt;
&lt;/picture&gt;
</code></pre>
<p>In this example, the <code>srcset</code> attribute tells the browser that there are three different widths of image available, and where to find them. The <code>sizes</code> attribute tells it which size to use at different screen widths. If the screen is less than 750px wide, then the image fills the entire screen (<code>100vw</code>), otherwise the image is 750px wide. That’s not always exactly right – sometimes margins mean it’s slightly wrong – but it’s close enough.</p>
<p>This is enough information for the browser to decide the best size to load. It knows your screen pixel density and the width of the window, so it can choose an image which (1) will look sharp and crisp on your display and (2) doesn’t include lots of unnecessary pixels.</p>
<p>If your browser doesn’t support <code>&lt;picture&gt;</code> and <code>&lt;source&gt;</code>, I include the 1x size in the <code>&lt;img&gt;</code> tag. I figure that if your browser is that old, it’s unlikely you’re using a high pixel density display.</p>
<hr/>
<h2>Getting different formats of the image</h2>
<p>JPEG and PNG are fine, but they’re a bit long in the tooth – there are newer image formats that look the same but with smaller files. <a href="https://en.wikipedia.org/wiki/WebP">WebP</a> and <a href="https://en.wikipedia.org/wiki/AVIF">AVIF</a> are modern image formats that are much smaller, which means faster loading images for you and a cheaper bandwidth bill for me.</p>
<p>Alongside the different sizes of image, I’m using ImageMagick to create variants in WebP and AVIF. These get presented as alternative <code>&lt;source&gt;</code> entries in the <code>&lt;picture&gt;</code> tag, for example:</p>
<pre><code>&lt;picture&gt;
  &lt;source
    srcset="/images/2023/IMG_9016_1x.avif 750w,
            /images/2023/IMG_9016_2x.avif 1500w,
            /images/2023/IMG_9016_3x.avif 2250w"
    sizes="(max-width: 750px) 100vw, 750px"
    type="image/avif"
  &gt;
  &lt;source
    …
    type="image/webp"
  &gt;
  &lt;source
    …
    type="image/jpeg"
  &gt;
  …
&lt;/picture&gt;
</code></pre>
<p>Not every browser supports WebP and AVIF, which is why I’m providing all three variants. Your browser knows which formats it supports, and will choose appropriately.</p>
<p>The compression is pretty remarkable: the WebP images are about half the size of the originals, but the AVIF images are one sixth! When I first enabled AVIF support, I thought something was broken – the files were so small, it looked wrong to me.</p>
<p>(It turns out <a href="https://alexwlchan.net/2023/check-for-transparency/">something was broken</a>, but it was nothing to do with file sizes.)</p>
<hr/>
<h2>Providing explicit dimensions for all my images</h2>
<p>Because I have the image dimensions from rszr, I can calculate the aspect ratio of the image and insert it <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio">as a property</a> on the <code>&lt;img&gt;</code> tag:</p>
<pre><code>&lt;img
  src="/images/2023/IMG_9016_1x.jpg"
  width="750"
  style="aspect-ratio: 3 / 4;"
  …
&gt;
</code></pre>
<p>Combined with the <code>width</code>, this allows a browser to completely calculate the area an image will take up the page – before it loads the image. This means it can lay out the page immediately, leave the right amount of space for the image, and it won’t have to rearrange the page later. The fancy term for this is <a href="https://web.dev/optimize-cls/">“Cumulative Layout Shift”</a>, and too much of it can be distracting – setting these two attributes reduces it to zero.</p>
<hr/>
<h2>Passing through other attributes to the <img/></h2>
<p>Aside from the <code>filename</code> attribute, all the attributes on the <code>{% picture %}</code> get passed directly to the underlying <code>&lt;img&gt;</code> tag. I use this for includes things like alt text, CSS classes and inline styles. It looks exactly like the HTML might look.</p>
<p>This gives me a bunch of flexibility for tweaking the behaviour of images on a per-post basis. I get the benefits of the different sizes and image formats, and it all looks like familiar HTML.</p>
<p>The plugin is doing a bit of work to parse the attributes, and combine them with any attributes that it’s adding (for example, appending the <code>aspect-ratio</code> property to any inline styles), but this is largely invisible when I’m just writing a post.</p>
<p>One of the attributes I use most often is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading"><code>loading="lazy"</code></a>, which gets me browser-native lazy loading of images. This improves performance on pages with lots of images, and it’s easy for browsers to work out which images to load – they know exactly where each image will go thanks to the <code>width</code> and <code>aspect-ratio</code> properties.</p>
<hr/>
<p>When the web was young, images were much simpler. You’d upload your JPEG file to your web server, add an <code>&lt;IMG&gt;</code> tag to your HTML page, and you were done. That still works (including the uppercase HTML tags), but there’s a lot more we can do now.</p>
<p>Building this plugin has been one of the more complex bits of front-end web development I’ve done for this site. Creating the various images with ImageMagick was fairly straightforward, but setting up the <code>srcset</code> and <code>sizes</code> attributes so browsers would pick the right image was much harder. I think it behaves correctly now, and adding images to new posts is pretty seamless – but it took a while to get there.</p>
<p>This was a great way for me to learn how images work in the modern web, but it’s hard to recommend my “write it from scratch” approach. There are lots of existing libraries and tools that make it easy for you to use images on your website, without all the work I had to do first.</p>
<p>I’m the only person who works on this website, and I’m doing it for fun. I can make very different choices than if I was working on a commercial site managed by a large team. I enjoyed writing this plugin, and I’m pleased with my snazzy new images, and for me that’s all that matters.</p>
