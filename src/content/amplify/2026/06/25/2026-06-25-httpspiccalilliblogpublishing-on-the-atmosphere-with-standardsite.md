---
author: Piccalilli
cover_image: >-
  https://piccalil.b-cdn.net/api/og-image?slug=publishing-on-the-atmosphere-with-standardsite/
date: '2026-06-25T13:08:24.443Z'
dateFolder: 2026/06/25
description: >-
  It's the summer of Standard.site and overwhelmingly, we've heard folks find
  the process complicated so Declan Chidlow is here to break the process down
  into something rather straightforward for you. 
isBasedOn: 'https://piccalil.li/blog/publishing-on-the-atmosphere-with-standardsite/'
link: 'https://piccalil.li/blog/publishing-on-the-atmosphere-with-standardsite/'
slug: 2026-06-25-httpspiccalilliblogpublishing-on-the-atmosphere-with-standardsite
tags:
  - blogging
  - decentralization
title: Publishing on the Atmosphere with Standard.site
---
<p><a href="https://standard.site/">Standard.site</a> provides a set of lexicons for publishing long-form content on the internet using the same protocol used under the hood by Bluesky.</p>
<p>If you are wondering what ‘lexicons’ and ‘the Atmosphere’ are, don’t fret. This article will explain what they mean, why you should care about Standard.site, and walk you through exactly how you can implement Standard.site using some simple JavaScript or a plugin for your favourite content management system.</p>
<p>If Bluesky is the network’s answer to short-form microblogging, think of Standard.site as its equivalent for blogs, newsletters, and long-form journalism.</p>
<p>At its core, Standard.site is an open schema that dictates how articles and essays should be formatted as data. When you publish a blog post normally, it lives on your website and relies on scrapers or RSS feeds to be shared. By adopting the Standard.site lexicon, your long-form content becomes a natively understood piece of data on the decentralised web.</p>
<p>One of the most overt benefits we get from defining Standard.site lexicons for our publication are enhanced rich embeds on Bluesky, like this:</p>
<figure><img alt="A mock bluesky post showing a linked blog post, featuring a richer UI experience with direct call to action to view publisher" src="https://piccalil.b-cdn.net/images/blog/standard-site-bluesky-post.png?auto=format&amp;w=1500"/><figcaption>A mock bluesky post showing a linked blog post, featuring a richer UI experience with direct call to action to view publisher</figcaption></figure>
<p>We also get many other benefits. For example, I was surprised to see that the professional identity network Sifa ID <a href="https://sifa.id/p/vale.rocks#publications">displayed my posts upon my profile</a>. It was also pleasant to see my posts naturally populate on readers like <a href="https://pckt.blog/">pckt</a>, <a href="https://docs.surf/">Docs.surf</a>, <a href="https://potatonet.app/">potatonet</a>, and <a href="https://leaflet.pub/">Leaflet</a> without any additional work on my part.</p>
<p>The strength of AT Protocol is that data is interoperable and can be shared, which plays into the strength of Standard.site, which is that a single set of well structured-schemas. The result is that various indexers and tools can all work with the available data in their own ways, knowing how it’ll be structured. Your content can be moved between hosts without losing your data or the audience you’ve built, and there is no single controlling authority. To get further into this, however, we must first establish an understanding of the AT Protocol.</p>
<figure><a href="https://piccalil.li/mindful-design?utm_source=piccalilli&amp;utm_medium=graphical-ad">Advert<picture><source media="(width &lt;= 600px)" srcset="https://piccalil.b-cdn.net/images/ads/md-ad-portrait-post-launch.jpg?auto=format"/><img alt="Mindful Design. Learn to design for real humans. Available now" src="https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp"/></picture></a></figure>
<p>To implement Standard.site, you will want to understand the Authenticated Transfer Protocol (known colloquially as the ‘AT Protocol’ or ‘atproto’) at least at a surface level. The AT Protocol is a decentralised system designed to give users ownership of their data.</p>
<p>To explain it at its simplest, you have a Personal Data Server (PDS) which hosts user accounts. Currently, the largest PDS is provided by Bluesky, but anyone can run their own. A PDS holds lots of user accounts, and each user account can hold records, which are data.</p>
<p>Each user account can be identified by a globally unique DID (Decentralised Identifier) that acts as their permanent ID. A DID looks like this: <code>did:plc:7qg6mz2xtzozxkgbcvf4pdnu</code>. Each account also has a handle, which comes in the form of a DNS record. We can see this in that people on Bluesky’s PDS who haven’t configured a custom domain for their account have a handle like this: <code>bsky.bsky.social</code>. If you navigate to that in a browser, it’ll take you to the Bluesky page: <a href="https://bsky.bsky.social">https://bsky.bsky.social</a>.</p>
<p>Each account features a data repository that holds collections of JSON records. These JSON records must follow specific structures called lexicons. Lexicons are just schemas, like JSON-Schema or OpenAPI, which define how the JSON must be structured and formatted. Records are put into ‘collections’, which we can think of as folders. A collection is identified by a Namespace Identifier (NSID) which makes reference to a domain to identify schemas.</p>
<p>Let’s run through an example with Bluesky so we can really get a handle on things. When a user signs up to Bluesky, a <code>self</code> record is created in the <code>app.bsky.actor.profile</code> collection of that user’s data repository with information about the account, like its name and profile description. Piccalilli’s looks something like this:</p>
<pre>
<code>{
  "uri": "at://did:plc:lyk2pixxcmyeu4jrapaq26fy/app.bsky.actor.profile/self",
  "cid": "bafyreihzo3igobmunvk6tmsaqgyatyw5gona4kiayvm2f62lymc5dzqjvu",
  "value": {
    "$type": "app.bsky.actor.profile",
    "createdAt": "2024-08-01T12:44:51.324Z",
    "description": "Level up your front-end skills. Stay for the approachable, friendly content and go away with transferable skills you can use day to day.",
    "displayName": "Piccalilli"
  }
}
</code>
</pre>
<p>Then, every time a post is made, or the Piccalilli account likes something, or blocks someone, or does anything else on Bluesky, a new record is created to represent that action. For instance, when Piccalilli reposts something, a new record is created under the <code>app.bsky.feed.repost</code> collection.</p>
<p><strong>Almost everything is a record, inside a collection, under a user account (identified by a DID), on a PDS.</strong></p>
<p>Notably, everything on ATProto is public. There is no concept of private records, which means we can go out and inspect or reference all the data on the protocol. There are a number of tools for inspecting AT Protocol data, but <a href="https://atproto.at/">Taproot</a> and <a href="https://pdsls.dev/">PDSLs</a> are my favourites. Search for your account handle, and you’ll be greeted by your underlying records. Have a poke around to help wrap your head around the structure and how everything fits together.</p>
<p><a href="https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&amp;utm_medium=author-promo"><figure><picture><figure><img alt="JavaScript for Everyone. Truly understand how JavaScript works. Available now. " src="https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch-discount-experiment.png?format=webp"/><figcaption><a href="https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&amp;utm_medium=author-promo">JavaScript for Everyone. Truly understand how JavaScript works. Available now. </a></figcaption></figure></picture></figure></a> </p>
<p>Now we’ve (hopefully) got at least (somewhat) of a (fledgeling) understanding of AT Protocol, we can start hooking up Standard.site. To get started with Standard.site, we need to create two specific types of records in your AT Protocol repository:</p>
<ol> <li>A Publication Record, which defines information about our publication itself.</li> <li>Document Records, which contain information about individual articles themselves.</li> </ol>
<p>It is these records that Bluesky and the rest of the Atmosphere will reference. You can <a href="https://atproto.com/guides/writing-data#writing-data">create them any one of a number of ways</a>. AT Protocol is very open, and you can create records via a variety of methods, but for the purposes of this article, I’ll be showing a JavaScript approach using the official <a href="https://npmx.dev/package/@atproto/api"><code>@atproto/api</code></a> npm package.</p>
<p>You will need to authenticate to create these records. The easiest way to do so is by creating an app password under Privacy and Security in Bluesky’s settings. An app password gives access to your account and looks like this: <code>fg2g-xob3-xl78-5ezy</code>.</p>
<aside><p>An app password gives <em>full</em> access to your account and bypasses multi-factor authentication. Be <em>extremely</em> careful with it. It is a secret, and you should take extreme care of it. This illustrative code shows including the app password inline, but you should consider putting it in an environment variable.</p><p>If you think your app password has been made public, you should revoke it, which can be done through the same interface you created it.</p></aside>
<p>The first step in support is having a publication record adhering to the <a href="https://standard.site/docs/lexicons/publication/"><code>site.standard.publication</code> lexicon</a>. You only need to create this record once per-publication.</p>
<p>Using the AT Protocol SDK, you can authenticate and create this underlying JSON record for your site with the script below, replacing the template values here with your publication’s details.</p>
<p>For the purpose of illustration, this script only sets required properties.</p>
<pre>
<code>import { AtpAgent } from "@atproto/api";

// Initialise the agent (use your specific PDS if not on Bluesky)
const agent = new AtpAgent({ service: "&lt;https://bsky.social&gt;" });

async function createPublicationRecord() {
  // 1. Authenticate (Always use an App Password, never your main password)
  await agent.login({
    identifier: "your-handle.bsky.social",
    password: "your-app-password",
  });

  const did = agent.session.did;

  // 2. Define the Publication Record
  const publicationRecord = {
    $type: "site.standard.publication",
    url: "&lt;https://example.com&gt;",
    name: "My Awesome Blog",
  };

  // 3. Write the record to your repository
  try {
    const response = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: "site.standard.publication",
      record: publicationRecord,
    });

    console.log("Publication record created!");
    console.log("Your AT-URI is:", response.data.uri);
  } catch (error) {
    console.error("Failed to create publication:", error);
  }
}

createPublicationRecord();
</code>
</pre>
<p>If this script was successful, it should output a message reading ‘Publication record created!’, followed by an AT-URI. Save this, because we’ll need it later. In the future if we need to amend this record, we can <a href="https://atproto.com/guides/writing-data#updating-records">revise the record directly</a>.</p>
<p>Though the above script is great, we can take it a bit further and add some more pizazz by <a href="https://standard.site/docs/lexicons/theme/">defining a theme</a>. You can create a theme to lend some more style to how your content displays in readers and how Bluesky embeds it. This is done by adding theming fields to your publication record. You need to specify a <code>background</code>, <code>foreground</code>, <code>accent</code>, and <code>accentForeground</code>. If you’re setting any of these values, you must set <em>all</em> of them.</p>
<p>Bluesky uses <code>accent</code> and <code>accentForeground</code> like so:</p>
<p>You should check that your foreground and background and accent and accent foreground all have appropriate contrast. Bluesky previously took these values directly, but now they do <a href="https://bsky.app/profile/esb.lol/post/3mnilfmgqns2d">some contrast adjustment of their own</a>.</p>
<p>You, unfortunately, cannot change the text which appears on the Bluesky embed button, which will always be ‘View Publication’ if you publish yourself. Some external Standard.site enabled services have their own special buttons with custom text and icons, but these are hard coded in the Bluesky client.</p>
<p>Next, we have the optional step of creating a file at <code>/.well-known/site.standard.publication</code> containing the AT-URL outputted by our record creation script. This verifies that your domain controls your publication record.</p>
<p>Most services, Bluesky included, don’t require this verification. Indeed, some hosts might not let you write to the <code>/.well-known</code> path. However, if you <em>can</em> create a file named <code>site.standard.publication</code> within <code>/.well-known</code> and put your AT-URL within it, your publication will be more widely supported. This verification only needs to be done once.</p>
<p>You can check this has been created correctly by going to your URL on your site. For example, for my personal website, I can visit <a href="https://vale.rocks/.well-known/site.standard.publication">https://vale.rocks/.well-known/site.standard.publication</a> in my browser and see my AT-URI:</p>
<h3>Document records</h3>
<p>Now that your publication record exists, you need to create per-document records following the <a href="https://standard.site/docs/lexicons/document/"><code>site.standard.document</code> lexicon</a>. Every document needs its own record.</p>
<p>Standard.site supports having your document’s content in the record, which is the approach that Offprint, pckt, Leaflet, and some other publishing platforms use. Whether you do this is up to you.</p>
<p>If you <em>do</em> include the content, then it can be displayed natively in Standard.site reader applications, and Bluesky embeds will provide a reading time estimate. For the purpose of this script, I’ll again only be including required properties.</p>
<pre>
<code>import { AtpAgent } from "@atproto/api";
const agent = new AtpAgent({ service: "&lt;https://bsky.social&gt;" });

async function publishDocumentRecrd() {
  await agent.login({
    identifier: "your-handle.bsky.social",
    password: "your-app-password",
  });

  const did = agent.session.did;

  // 1. Define the Document Record
  const documentRecord = {
    $type: "site.standard.document",
    site: `at://your-did/site.standard.publication/your-pub-rkey`, // Full AT-URI of your publication
    title: "My New Post",
    publishedAt: "2026-06-11T00:00:00.000Z",
  };

  // 2. Write the record to your repository
  try {
    const response = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: "site.standard.document",
      record: documentRecord,
    });

    console.log("Success! Document record published to the Atmosphere:");
    console.log(response.data.uri);
  } catch (error) {
    console.error("Failed to publish document:", error);
  }
}

publishDocumentRecord();
</code>
</pre>
<p>If this script was successful, it should output a message reading ‘Success! Document record published to the Atmosphere:’, followed by an AT-URI. Save this, because we need it to verify the document.</p>
<h3>Verifying your document</h3>
<p>To complete the two-way verification, the HTML <code>&lt;head&gt;</code> of your live article must contain a link tag pointing back to the document record you just created:</p>
<p>Once these ends are tied together, your webpage and document record point to each other, and clients across the decentralised web can seamlessly reference the record.</p>
<p>If you look through the Standard.site docs at all, you might notice references to icons and cover images. To make use of these, <a href="https://atproto.com/guides/images-and-video">we must upload a <em>blob</em></a>, which is what unstructured data (like images) within a repository are called.</p>
<p>We need to upload the blob first, so that we can refer to it with a reference in our record. Here is an example of uploading an image as a blob and then referencing it to use it as a cover image.</p>
<pre>
<code>import fs from "fs";
import { AtpAgent } from "@atproto/api";
const agent = new AtpAgent({ service: "&lt;https://bsky.social&gt;" });

async function uploadImageAndPublishDocument() {
  await agent.login({
    identifier: "your-handle.bsky.social",
    password: "your-app-password",
  });

  const did = agent.session.did;

  // 1. Read the local image file into a buffer
  const imageBuffer = fs.readFileSync("./path/to/your/cover.jpg");

  // 2. Upload the blob to your repository
  const { data: blobResponse } = await agent.com.atproto.repo.uploadBlob(
    imageBuffer,
    { encoding: "image/jpeg" }
  );

  console.log("Blob successfully uploaded!");

  // 3. Define the Document Record, attaching the returned blob reference
  const documentRecord = {
    $type: "site.standard.document",
    site: `at://your-did/site.standard.publication/your-pub-rkey`,
    title: "My New Post with a Cover Image",
    publishedAt: "2026-06-18T12:00:00.000Z",
    cover: blobResponse.blob, // This links the blob to your document
  };

  // 4. Write the document record to your repository
  try {
    const response = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: "site.standard.document",
      record: documentRecord,
    });

    console.log("Document record with cover image published:");
    console.log(response.data.uri);
  } catch (error) {
    console.error("Failed to publish document:", error);
  }
}

uploadImageAndPublishDocument();
</code>
</pre>
<p>If writing JavaScript to push records manually sounds tedious, or you’re already using a major content management system, you might prefer to have the process handled for you. How you integrate Standard.site depends very much on how your own site is built, and some platforms have ready-made integrations via plugins that handle all of the above behind the scenes:</p>
<ul> <li><strong>Static sites</strong>: Generators like 11ty, Hugo, Astro, and Jekyll can use a dedicated CLI tool called <a href="https://sequoia.pub/">Sequoia</a>.</li> </ul>
<p>Obviously, creating all these records and configuring all this Standard.site business is a bit useless if it doesn’t actually work. The easiest way to test is by just plopping a link to a post on Bluesky and hoping it embeds, but if it doesn’t, it can feel a tad opaque when it comes to figuring out what went wrong.</p>
<p>To rectify this, you can <a href="https://site-validator.fly.dev/">make use of Standard.site Validator</a> by <a href="https://octet-stream.net/">Thomas Karpiniec</a>. Consider returning to <a href="https://atproto.at/">Taproot</a> or <a href="https://pdsls.dev/">PDSLs</a> to study and review your records. Both will let you know if anything fails to validate and where things went awry.</p>
<p>For some further reading, Piccalilli’s own <a href="https://wil.to/">Mat Marquis</a>, creator of the <a href="https://piccalil.li/javascript-for-everyone">JavaScript for Everyone</a> course, has written his own posts documenting his <a href="https://wil.to/posts/standard-site/">understanding of</a> and <a href="https://wil.to/posts/implementing-standard-site/">implementation of</a> Standard.site on his own blog.</p>
<p>If you want to have multiple Standard.site publications under a single domain, then Jason Lengstorf has <a href="https://codetv.dev/blog/multiple-standard-site-publications-on-one-website">an in-depth guide on the Code.TV blog</a>.</p>
<p> <a href="https://piccalil.li/mindful-design?utm_source=piccalilli&amp;utm_medium=graphical-ad">Advert</a></p>
<aside data-author-summary-variant="post"><figure><figcaption>Author<h2>Declan Chidlow</h2></figcaption></figure></aside>
