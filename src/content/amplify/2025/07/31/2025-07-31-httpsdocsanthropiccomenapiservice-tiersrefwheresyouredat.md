---
author: Anthropic
cover_image: >-
  https://anthropic.mintlify.app/_next/image?url=%2Fapi%2Fog%3Fdivision%3DDocumentation%26mode%3Dlight%26title%3DService%2Btiers%26description%3DDifferent%2Btiers%2Bof%2Bservice%2Ballow%2Byou%2Bto%2Bbalance%2Bavailability%252C%2Bperformance%252C%2Band%2Bpredictable%2Bcosts%2Bbased%2Bon%2Byour%2Bapplication%2527s%2Bneeds.%26logoLight%3Dhttps%253A%252F%252Fmintlify.s3.us-west-1.amazonaws.com%252Fanthropic%252Flogo%252Flight.svg%26logoDark%3Dhttps%253A%252F%252Fmintlify.s3.us-west-1.amazonaws.com%252Fanthropic%252Flogo%252Fdark.svg%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E&w=1200&q=100
date: '2025-07-31T04:36:23.713Z'
dateFolder: 2025/07/31
description: >-
  Different tiers of service allow you to balance availability, performance, and
  predictable costs based on your application's needs.
isBasedOn: 'https://docs.anthropic.com/en/api/service-tiers?ref=wheresyoured.at'
link: 'https://docs.anthropic.com/en/api/service-tiers?ref=wheresyoured.at'
slug: 2025-07-31-httpsdocsanthropiccomenapiservice-tiersrefwheresyouredat
tags: []
title: Service tiers
---
<p>We offer three service tiers:</p>
<ul> <li><strong>Priority Tier:</strong> Best for workflows deployed in production where time, availability, and predictable pricing are important</li> <li><strong>Standard:</strong> Default tier for both piloting and scaling everyday use cases</li> <li><strong>Batch:</strong> Best for asynchronous workflows which can wait or benefit from being outside your normal capacity</li> </ul>
<p>The standard tier is the default service tier for all API requests. Requests in this tier are prioritized alongside all other requests and observe best-effort availability.</p>
<p>Requests in this tier are prioritized over all other requests to Anthropic. This prioritization helps minimize <a href="https://docs.anthropic.com/en/api/errors#http-errors">“server overloaded” errors</a>, even during peak times.</p>
<p>For more information, see <a href="https://docs.anthropic.com/en/api/service-tiers?ref=wheresyoured.at#get-started-with-priority-tier">Get started with Priority Tier</a></p>
<p>When handling a request, Anthropic decides to assign a request to Priority Tier in the following scenarios:</p>
<ul> <li>Your organization has sufficient priority tier capacity <strong>input</strong> tokens per minute</li> <li>Your organization has sufficient priority tier capacity <strong>output</strong> tokens per minute</li> </ul>
<p>Anthropic counts usage against Priority Tier capacity as follows:</p>
<p><strong>Input Tokens</strong></p>
<ul> <li>Cache reads as 0.1 tokens per token read from the cache</li> <li>Cache writes as 1.25 tokens per token written to the cache with a 5 minute TTL</li> <li>Cache writes as 2.00 tokens per token written to the cache with a 1 hour TTL</li> <li>All other input tokens are 1 token per token</li> </ul>
<p><strong>Output Tokens</strong></p>
<ul> <li>1 token per token</li> </ul>
<p>Otherwise, requests proceed at standard tier.</p>
<p>Requests assigned Priority Tier pull from both the Priority Tier capacity and the regular rate limits. If servicing the request would exceed the rate limits, the request is declined.</p>
<p>You can control which service tiers can be used for a request by setting the <code>service_tier</code> parameter:</p>
<p>The <code>service_tier</code> parameter accepts the following values:</p>
<ul> <li><code>"auto"</code> (default) - Uses the Priority Tier capacity if available, falling back to your other capacity if not</li> <li><code>"standard_only"</code> - Only use standard tier capacity, useful if you don’t want to use your Priority Tier capacity</li> </ul>
<p>The response <code>usage</code> object also includes the service tier assigned to the request:</p>
<p>This allows you to determine which service tier was assigned to the request.</p>
<p>When requesting <code>service_tier="auto"</code> with a model with a Priority Tier commitment, these response headers provide insights:</p>
<p>You can use the presence of these headers to detect if your request was eligible for Priority Tier, even if it was over the limit.</p>
<p>You may want to commit to Priority Tier capacity if you are interested in:</p>
<ul> <li><strong>Higher availability</strong>: Target 99.5% uptime with prioritized computational resources</li> <li><strong>Cost Control</strong>: Predictable spend and discounts for longer commitments</li> <li><strong>Flexible overflow</strong>: Automatically falls back to standard tier when you exceed your committed capacity</li> </ul>
<p>Committing to Priority Tier will involve deciding:</p>
<ul> <li>A number of input tokens per minute</li> <li>A number of output tokens per minute</li> <li>A commitment duration (1, 3, 6, or 12 months)</li> <li>A specific model version</li> </ul>
<p>The ratio of input to output tokens you purchase matters. Sizing your Priority Tier capacity to align with your actual traffic patterns helps you maximize utilization of your purchased tokens.</p>
<p>Priority Tier is supported by:</p>
<ul> <li>Claude Opus 4</li> <li>Claude Sonnet 4</li> <li>Claude Sonnet 3.7</li> <li>Claude Sonnet 3.5 (both versions)</li> <li>Claude Haiku 3.5</li> </ul>
<p>Check the <a href="https://docs.anthropic.com/en/docs/about-claude/models/overview">model overview page</a> for more details on our models.</p>
<p>To begin using Priority Tier:</p>
<ol> <li>(Optional) Update your API requests to optionally set the <code>service_tier</code> parameter to <code>auto</code></li> <li>Monitor your usage through response headers and the Anthropic Console</li> </ol>
