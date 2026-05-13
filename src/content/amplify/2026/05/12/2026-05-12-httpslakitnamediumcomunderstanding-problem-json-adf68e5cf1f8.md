---
author: Sander van Beek
cover_image: >-
  https://miro.medium.com/v2/da:true/bc1f8416df0cad099e43cda2872716e5864f18a73bda2a7547ea082aca9b5632
date: '2026-05-12T09:33:57.104Z'
dateFolder: 2026/05/12
description: >-
  A human-readable resource about Problem JSON and Problem XML with loads of
  examples.
isBasedOn: 'https://lakitna.medium.com/understanding-problem-json-adf68e5cf1f8'
link: 'https://lakitna.medium.com/understanding-problem-json-adf68e5cf1f8'
slug: 2026-05-12-httpslakitnamediumcomunderstanding-problem-json-adf68e5cf1f8
tags:
  - code
  - tech
title: Understanding Problem JSON
---
<p>I could not find a good human-readable resource about Problem. Therefore I’m writing it myself.</p>
<h2 data-selectable-paragraph="">What is Problem JSON</h2>
<p>Problem is a <a href="https://tools.ietf.org/html/rfc7807">standardized way</a> of describing any kind of error thrown by an API. A Problem can be described in JSON or XML, but we’re only going to talk about the JSON variant in this article.</p>
<p>The purpose of Problem is so that <em>“API [consumers] can be informed of both the high-level error class (using the status code) and the finer-grained details of the problem”</em>.</p>
<p>For those of you who don’t like reading, here is an example Problem JSON response:</p>
<pre>HTTP/1.1 401 Unauthorized<br/>Content-Type: application/problem+json; charset=utf-8<br/>Date: Wed, 07 Aug 2019 10:10:06 GMT<br/>{<br/>    "type": "https://example.com/probs/cant-view-account-details",<br/>    "title": "Not authorized to view account details",<br/>    "status": 401,<br/>    "detail": "Due to privacy concerns you are not allowed to view account details of others. Only users with the role administrator are allowed to do this.",<br/>    "instance": "/account/123456/details"<br/>}<br/></pre>
<h2 data-selectable-paragraph="">Examples</h2>
<p>I like to learn with examples, so I’ll include a bunch.</p>
<h2 data-selectable-paragraph="">Normal HTTP status code</h2>
<p>When you can’t or don’t want to provide any details.</p>
<pre>{<br/>    "title": "Unauthorized",<br/>    "status": 401<br/>}<br/></pre>
<p><code>title</code> should equal the description of the HTTP status code as <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">defined here</a>.</p>
<h3 data-selectable-paragraph="">Adding some details for recreating the problem</h3>
<pre>{<br/>    "title": "Unauthorized",<br/>    "status": 401,<br/>    "instance": "/login/someUser"<br/>}<br/></pre>
<h2 data-selectable-paragraph="">Custom members are allowed</h2>
<p>Note that <code>balance</code> is not a default member of Problem.</p>
<pre>{<br/>    "type": "https://example.com/probs/out-of-credit",<br/>    "title": "You do not have enough credit",<br/>    "detail": "Your current balance is 30, but that costs 50.",<br/>    "instance": "/account/12345/msgs/abc",<br/>    "balance": 30<br/>}<br/>{<br/>    "title": "Forbidden",<br/>    "status": 403,<br/>    "balance": 30<br/>}<br/></pre>
<h2 data-selectable-paragraph="">Content-type</h2>
<p>The HTTP header <code>Content-Type</code> for a Problem response must be <code>application/problem+json</code>. This makes Problem easily identified by the consumer.</p>
<pre>HTTP/1.1 403 Forbidden<br/>Content-Type: application/problem+json<br/>Date: Wed, 07 Aug 2019 10:10:06 GMT<br/></pre>
<h2 data-selectable-paragraph="">Default members</h2>
<p>Problem is defined as a collection of members, each with a very specific purpose. A producer should include as many default members as possible.</p>
<h3 data-selectable-paragraph=""><code>type</code> {URI}</h3>
<p>A URL to a page with more details regarding the problem.</p>
<pre>"type": "https://example.com/probs/cant-view-account-details",<br/></pre>
<p>The primary identifier for the problem.</p>
<p><code>type</code> is typically an absolute URL that leads to an HTML page containing human-readable documentation regarding the problem.</p>
<p>When <code>type</code> is not provided (<code>undefined</code>) the consumers must assume that type equals <code>about:blank</code>. <a href="https://medium.com/choose?source=promotion_paragraph---post_body_banner_no_hate--adf68e5cf1f8---------------------------------------"><figure><picture><source media="(max-width: 551.98px)" srcset="https://miro.medium.com/v2/da:true/resize:fit:0/9efc11eca2e964d30810ea1a7ed014aea5b82123971e86e616eefd6c5d29529d"/><source media="(min-width: 552px) and (max-width: 727.98px)" srcset="https://miro.medium.com/v2/da:true/resize:fit:0/9efc11eca2e964d30810ea1a7ed014aea5b82123971e86e616eefd6c5d29529d"/><source media="(min-width: 728px) and (max-width: 903.98px)" srcset="https://miro.medium.com/v2/da:true/resize:fit:0/f97f68d479f047ce6c7558e89a4bd4c4de908fe39d1b2f1f358019432e147733"/><source media="(min-width: 904px) and (max-width: 1079.98px)" srcset="https://miro.medium.com/v2/da:true/resize:fit:0/f97f68d479f047ce6c7558e89a4bd4c4de908fe39d1b2f1f358019432e147733"/><source media="(min-width: 1080px)" srcset="https://miro.medium.com/v2/da:true/resize:fit:0/f97f68d479f047ce6c7558e89a4bd4c4de908fe39d1b2f1f358019432e147733"/><figure><img alt="Learn about Medium’s values"/></figure></picture></figure></a> The URI in the<code>type</code> field should not be opened automatically.</p>
<h3 data-selectable-paragraph=""><code>title</code> {string}</h3>
<p>Short human-readable summary of the problem.</p>
<pre>"title": "Not authorized to view account details",<br/></pre>
<p>When <code>type</code> equals <code>about:blank</code> then <code>title</code> should equal the description of the HTTP status code:</p>
<pre>{<br/>    "type": "about:blank",<br/>    "title": "Not found",<br/>    "status": 404,<br/>}<br/></pre>
<p>If <code>type</code> is specified then <code>title</code> should <strong>not</strong> equal the description of the HTTP status code:</p>
<pre>{<br/>    "type": "https://example.com/probs/no-account-details",<br/>    "title": "No account details found",<br/>    "status": 404,<br/>}<br/></pre>
<p><code>title</code> should not change from occurrence to occurrence of the problem, so no timestamps/counters/etc. The exception to this is localization. <code>title</code> can differ for the same problem if the locale is different.</p>
<p><code>title</code> should not be parsed by a machine, it is only for meant for humans. A machine should use <code>type</code> instead.</p>
<h3 data-selectable-paragraph=""><code>status</code> {number}</h3>
<p>The HTTP status code.</p>
<pre>"status": 401,<br/></pre>
<p><code>status</code> is always the same as the status code in the HTTP header.</p>
<p><code>status</code> is only included for the convenience of the consumer.</p>
<h3 data-selectable-paragraph=""><code>detail</code> {string}</h3>
<p>Human-readable description of this specific problem.</p>
<pre>"detail": "Due to privacy concerns you are not allowed to view account details of others. Only users with the role administrator are allowed to do this.",<br/></pre>
<p><code>detail</code> should help the consumer to correct the problem and not only provide debugging information.</p>
<p><code>detail</code> should not be parsed by a machine, it is only for meant for humans.</p>
<h3 data-selectable-paragraph=""><code>instance</code> {URI}</h3>
<p>A URI that describes where the problem occurred.</p>
<pre>"instance": "/account/123456/details"<br/></pre>
<p><code>instance</code> can be an absolute or relative path.</p>
<p><code>instance</code> does not have to lead to anything like <code>type</code> does. It is used to recreate the problem later.</p>
<h2 data-selectable-paragraph="">Custom members</h2>
<p>Problem may be extended with custom members to convey problem-specific information. All members that are not recognized by the client must be ignored. Never throw an error due to an unrecognized member.</p>
<p>There are no restrictions for custom members.</p>
<p>This allows producers to extend Problem with highly detailed information about a problem and it allows Problem to evolve without losing backwards compatibility.</p>
<p>Note that <code>invalid-params</code> is not a default member:</p>
<pre>{<br/>    "title": "Bad request",<br/>    "status": 400,<br/>    "invalid-params": [<br/>        {<br/>            "name": "age",<br/>            "reason": "must be a positive integer"<br/>        },<br/>        {<br/>            "name": "color",<br/>            "reason": "must be 'green', 'red' or 'blue'"<br/>        }<br/>    ]<br/>}<br/></pre>
<h2 data-selectable-paragraph="">Conclusion</h2>
<p>Problem is a push towards standardizing error messages in APIs. It has plenty of flexibility and extendibility to the point I can’t think of any situation where you shouldn’t use it.</p>
<p>I hope I’ve provided enough examples to make Problem clear without you having to read the RFC.</p>
<h2 data-selectable-paragraph="">Sources</h2>
<p>Only the latest RFC for Problem was used as a source:</p>
<ul><li data-selectable-paragraph=""><a href="https://tools.ietf.org/html/rfc7807">Problem Details for HTTP APIs (March 2016)</a></li></ul>
