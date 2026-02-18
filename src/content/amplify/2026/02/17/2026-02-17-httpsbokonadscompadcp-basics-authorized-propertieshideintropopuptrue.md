---
author: Brian O'Kelley
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!FXpJ!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic
date: '2026-02-17T21:14:15.199Z'
dateFolder: 2026/02/17
description: >-
  How do I advertise on this property? How do I know that I'm actually buying
  what I think I'm buying?
isBasedOn: 'https://bokonads.com/p/adcp-basics-authorized-properties?hide_intro_popup=true'
link: 'https://bokonads.com/p/adcp-basics-authorized-properties?hide_intro_popup=true'
slug: >-
  2026-02-17-httpsbokonadscompadcp-basics-authorized-propertieshideintropopuptrue
tags:
  - ad tech
title: 'AdCP Basics: Creating a trusted advertising supply chain using adagents.json'
---
<h3>How do I advertise on this property? How do I know that I'm actually buying what I think I'm buying?</h3>


<p>The simplest way I can describe the Ad Context Protocol (AdCP) is that it attempts to make an agentic storefront for every publisher, platform, ad network, anybody who sells ads. It lets the agent discover ad products, place and manage a buy, get reporting, and even provide feedback on what’s working or not.</p>
<p>Over the course of a few posts, I’m going to walk through each step of this process. I will try to make it as interesting as possible and not completely technical. But I also feel like it’s important, as with any new protocol, to understand the details and get into the nitty-gritty.</p>
<p>And I’ll also say up front that this is all evolving and changing! So if you’re reading this in the future, please check out <a href="https://adcontextprotocol.org">https://adcontextprotocol.org</a> for the latest updates.</p>
<h2>TL;DR</h2>
<p>If you don’t feel like reading this whole thing, here’s what you need to know: AdCP requires publishers to register sales agents publicly using an adagents.json file. It is <a href="https://testing.adcontextprotocol.org/adagents.html">easy</a> to set up. It’s easy for buyers and their agents to use. And it protects publishers and advertisers from the misrepresentation and shenanigans that have plagued programmatic advertising from the beginning.</p>
<h2>Provenance and trust</h2>
<p>For the entire 20 year lifetime of the programmatic ad industry, it’s been effectively impossible - even with initiatives like ads.txt and concerted effort from the ANA - to answer some simple questions:</p>
<ul><li><p>What platforms let me buy property x?</p></li><li><p>If I see property x in an ad buy, is it legit?</p></li></ul>
<p>Agentic advertising gives us the chance to start over. We can build supply provenance <em>into the protocol</em>.</p>
<p>There are two parts to this:</p>
<ul><li><p>Each publisher provides a list of the sales agents that they authorize to sell their inventory (see adagents.json)</p></li><li><p>Each sales agent provides a list of publishers that they represent (see list_authorized_properties)</p></li></ul>
<p>This provides clear provenance in both directions, answering both of the questions above. If you want to know if a sales agent represents a property, see if it’s mentioned in the adagents.json file. If you want to know which properties a sales agent represents, ask it… then verify by looking at the adsagents.json file for each publisher.</p>
<p>Will publishers comply? Yes, for the same reason that Louis Vuitton has a team of lawyers looking for fake handbags and Hollywood has a team of lawyers looking for unauthorized use of their films. It’s in their interest to prevent anyone else selling their content. It creates scarcity, it provides control, and it drives increased yield.</p>
<figure><a data-component-name="Image2ToDOM" href="https://substackcdn.com/image/fetch/$s_!FXpJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic"><picture><img alt="" data-attrs='{"src":"https://substack-post-media.s3.amazonaws.com/public/images/8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic","srcNoWatermark":null,"fullscreen":null,"imageSize":null,"height":708,"width":1456,"resizeWidth":null,"bytes":115659,"alt":null,"title":null,"type":"image/heic","href":null,"belowTheFold":true,"topImage":false,"internalRedirect":"https://bokonads.com/i/176810982?img=https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic","isProcessing":false,"align":null,"offset":false}' sizes="100vw" src="https://substackcdn.com/image/fetch/$s_!FXpJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic" srcset="https://substackcdn.com/image/fetch/$s_!FXpJ!,w_424,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic 424w, https://substackcdn.com/image/fetch/$s_!FXpJ!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic 848w, https://substackcdn.com/image/fetch/$s_!FXpJ!,w_1272,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic 1272w, https://substackcdn.com/image/fetch/$s_!FXpJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8dd9d58d-e5fa-4e65-8b32-a45b8fa78e18_2456x1194.heic 1456w"/></picture></a><figcaption><a href="https://testing.adcontextprotocol.org/adagents.html">adagents.json validation tool</a></figcaption></figure>
<h2>adagents.json</h2>
<p>Let’s say our ad buying agent wants to advertise on a property, say CNN. How do we know where we can find their agentic storefront (aka, their sales agent)?</p>
<p>We look for an adagents.json file on a standard URL: <code>[publisher-domain]/.well-known/adagents.json</code></p>
<p>This file tells us which sales agents offer CNN inventory. Since CNN controls their domain, we can be confident that this list of sales agents are authorized to sell CNN.</p>
<p>What is in the adagents.json file? Let’s look at the <a href="https://adcontextprotocol.org/docs/media-buy/capability-discovery/adagents">tech spec</a>.</p>
<pre><code><code>{
  “contact”: {...},           // Who manages this file
  “properties”: [...],        // What properties are managed
  “tags”: {...},              // Groups of properties  
  “authorized_agents”: [...]  // Which agents can sell them
}</code></code></pre>
<p>Let’s start with contact. This tells us who is responsible for this adagents.json file, generally the publisher but potentially a third-party or sales house.</p>
<pre><code>{
  “contact”: {
    “name”: “CNN Advertising Operations”,
    “email”: “adops@cnn.com”,
    “seller_id”: “pub-cnn-12345”,  // From sellers.json
    “tag_id”: “67890”               // TAG Certified Against Fraud ID
  }
}</code></pre>
<p>Next, what properties are managed by this file? CNN has CTV apps and websites. Note that <code>www.cnn.com</code> and <code>m.cnn.com</code> are automatically included in the root domain, but any other subdomain must be explicitly included. This prevents CNN from, for instance, putting up <code>z.cnn.com</code>, routing it to a third party, and having buyers accidentally buy that inventory as if it’s part of the main CNN site.</p>
<p>If we want, we can also group properties using tags like <code>mobile_sites</code> or <code>ctv_apps</code> which would be useful for a very large publisher that has hundreds or thousands of properties.</p>
<pre><code>{
  “properties”: [
    {
      "property_id": "cnn_ctv_app",
      “property_type”: “ctv_app”,
       “name”: “CNN CTV App”,
       “identifiers”: [
         {”type”: “roku_store_id”, “value”: “12345”},
         {”type”: “fire_tv_asin”, “value”: “B00ABC123”},
         {”type”: “apple_tv_bundle”, “value”: “com.cnn.tv”}
       ]
    }.
    {
      "property_id": "cnn_us",
      “property_type”: “website”,
      “name”: “CNN.com US”,
      “identifiers”: [
        {”type”: “domain”, “value”: “cnn.com”}
      ]
    },
    {
      "property_id": "cnn_international",
      “property_type”: “website”,
      “name”: “CNN International”,
      “identifiers”: [
        {”type”: “domain”, “value”: “edition.cnn.com”}
      ]
    }
  ]
}</code></pre>
<p>Finally, the most important part: what agents are authorized to sell this inventory? Note the free text “authorized_for” field. This is useful in cases where an ad network controls a particular placement - think Taboola or Outbrain at the bottom of the page.</p>
<pre><code>“authorized_agents”: [
    {
      “url”: “https://cnn-ctv-agent.cnn.com”,
      “authorized_for”: “All CTV formats in the US”,
      “property_ids”: [”cnn_ctv_app”]
    }
  ]</code></pre>
<p>This may seem like a lot to do to answer the simple question: how do I buy ads from CNN? But it’s worth it. We can be confident that we’re buying from an authorized storefront that has CNN’s permission and blessing to sell their ads.</p>
<h2>list_authorized_properties</h2>
<p>So we know which sales agents represent CNN. How do we go the other direction, and find out what publishers a sales agent represents?</p>
<p>The <code>list_authorized_properties</code> tool (or skill in A2A terminology) lets a sales agent share the properties it represents, as well as general information about the countries and channels it does business in. This helps buying agents know 1) does this sales agent have the inventory I want and 2) does this sales agent operate where I want to buy ads.</p>
<h3>Request</h3>
<p>The buying agent makes a simple call to the sales agent:</p>
<pre><code>{
  “tool”: “list_authorized_properties”,
  “arguments”: {}
}</code></pre>
<h3>Response</h3>
<p>The sales agent responds with a list of publishers where it is authorized to sell inventory. This list is not authoritative! The buyer needs to go check these publisher domains to find out what this sales agent is authorized to sell.</p>
<p>The sales agent also responds with its primary channels and countries to help buyers decide whether to it makes sense to include it in future requests:</p>
<pre><code>{
  “publisher_domains”: [”cnn.com”, “espn.com"],
  “primary_channels”: [”ctv”],
  “primary_countries”: [”US”],
  “portfolio_description”: “CTV specialist for news and sports publishers”
}</code></pre>
<p>I won’t go into ad products yet - that’s for next time - but when a buyer queries a sales agent, each ad product will list its included properties. These properties <strong>must</strong> be checked against the adagents.json file to ensure that this sales agent is authorized to sell them. In the future, I’d love to see signed delivery as a core feature of the ad delivery process to close the loop all the way to the edge - but again, that’s for a future discussion.</p>
<h2>Implementation</h2>
<p>So what does this mean practically?</p>
<p>As a buyer agent, I need to:</p>
<ul><li><p>Before I buy an ad product from a sales agent, check the adagents.json for the underlying publishers and make sure the sales agent is authorized (try this <a href="https://www.npmjs.com/package/@adcp/client">npm library</a>)</p></li></ul>
<p>As a publisher, I need to:</p>
<ul><li><p>Publish and maintain an adagents.json file (try this <a href="https://testing.adcontextprotocol.org/adagents.html">adagents.json generator</a>)</p></li></ul>
<p>As a sales agent, I need to:</p>
<ul><li><p>Make sure my publishers have adagents.json properly configured before I include them in my ad products (built into the <a href="https://sales-agent.scope3.com">open source sales agent</a> that many publishers are using)</p></li></ul>
<p>The community will continue to evolve more tools, like a <a href="https://github.com/adcontextprotocol/registry">registry</a> to automate the discovery and validation of authorized agents.</p>
<h2>Final thoughts</h2>
<p>Like the rest of AdCP, this is a work in progress. Much thought has gone into making this as flexible and powerful as possible, and especially to build in the context of a post-web world where domains aren’t the primary entry point to digital content. However, we definitely haven’t thought of everything, or anything close to it. If you’re curious about the protocol, have thoughts, ideas, feedback, criticisms, whatever… please get involved. There’s an <a href="https://join.slack.com/t/agenticads/shared_invite/zt-3h15gj6c0-FRTrD_y4HqmeXDKBl2TDEA">active slack group</a> where we’re working on how to develop the protocol and tooling around it, build training and education for the industry at large, and explore the new things that AI is enabling us to do.</p>
<p>Building a safe and sustainable media and advertising ecosystem starts with this community of collaboration and innovation. Thank you for taking the time to get into the weeds, and I’m excited to learn together as we build the future of advertising.</p>
<h3>Ready for more?</h3>
<p>Subscribe</p>
