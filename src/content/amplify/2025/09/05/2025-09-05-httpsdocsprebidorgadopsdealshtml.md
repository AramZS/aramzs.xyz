---
author: prebid.org
cover_image: null
date: '2025-09-05T16:39:52.236Z'
dateFolder: 2025/09/05
description: >-
  In the same way that you can negotiate deals with advertisers in your ad
  server, you can also set up deals with your header bidding partners.
isBasedOn: 'https://docs.prebid.org/adops/deals.html'
link: 'https://docs.prebid.org/adops/deals.html'
slug: 2025-09-05-httpsdocsprebidorgadopsdealshtml
tags:
  - ad tech
title: Deals in Prebid
---
<ul> <li><a href="https://docs.prebid.org/adops/deals.html#deals-in-prebid">Deals in Prebid</a> </li> </ul>
<p>In the same way that you can negotiate deals with advertisers in your ad server, you can also set up deals with your header bidding partners. When you do that, there are just a few things to keep in mind to ensure those deals get sent to the ad server and your line items are prepared to receive them.</p>
<h2>Send Deal to Ad Server</h2>
<p>In <a href="https://docs.prebid.org/adops/send-all-vs-top-price.html">Send All Bids vs Top Price</a> we described those two options for sending bids to the ad server. There is also a third option created specifically for deals: Send top price and deals.</p>
<h3>Deals with Send All Bids</h3>
<p>If you send all bids to the ad server, deals will be sent along with the rest of the bids. If you want your deals to be prioritized over the rest of the bids, be sure to inform the software engineers so they can configure Prebid for this scenario.</p>
<p>See <a href="https://docs.prebid.org/dev-docs/publisher-api-reference/setConfig.html#configure-send-bids-control">Configure Send Bids Control</a> for engineering instructions on this configuration.</p>
<h3>Deals with Send Top Price</h3>
<p>If you decide to send only the top price bid, the deal might not be the top price, in which case it would not be sent and the ad server would never see it. To ensure deals make it to the ad server, the software engineers need to know that deal bids should be included along with the top priced bid. They can then configure Prebid to send both the top price and any deals that come through.</p>
<p>See the <a href="https://docs.prebid.org/dev-docs/publisher-api-reference/setConfig.html#setConfig-Send-All-Bids">Send All Bids engineering reference</a> for engineering instructions on sending deals along with the top bid.</p>
<h2>Deal Line Item Details</h2>
<p>In <a href="https://docs.prebid.org/adops/line-item-creation.html">Line Item Creation</a> we talked about some requirements and recommendations for setting up line items for Prebid. You can follow most of those settings for deals, with the modifications outlined here.</p>
<h3>Deal Key Value Pairs</h3>
<p>From the ad server side, you need to create special line items for each deal. This is done through a key-value pair. (See <a href="https://docs.prebid.org/adops/key-values.html">Key Values</a> for details on how key value pairs work.)</p>
<p>For each header bidding partner you negotiate deals with, create a keyword in the format hb_deal_BIDDERCODE, e.g., hb_deal_BidderA. Then when you create the line item for the deal, add in that code with the associated deal ID. For example, hb_deal_BidderA=BDA_123.</p>
<p>The actual value of the deal ID (BDA_123 in this example) will be obtained from the demand partner.</p>
<h3>Start and End Dates</h3>
<p>Prebid line items normally start immediately with no end date; the line item exists to receive a bid at any time, whenever it gets sent to the ad server. Because deals are negotiated with the demand partner, deals will have date ranges in accordance with the agreement.</p>
<h3>Priority</h3>
<p>Bids from header bidding typically have a priority lower than directly sold ads but higher than any competing house ads. Deals should have a priority higher than the line items that cover the regular open market bids.</p>
<h2>Further Reader</h2>
<ul> <li><a href="https://docs.prebid.org/adops/adops-planning-guide.html">Planning Guide</a></li> <li><a href="https://docs.prebid.org/overview/prebid-universal-creative.html">Prebid Universal Creative</a></li> </ul>
