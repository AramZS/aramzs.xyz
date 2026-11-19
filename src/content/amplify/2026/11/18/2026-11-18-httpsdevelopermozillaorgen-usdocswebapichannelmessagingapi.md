---
author: MDN Web Docs
cover_image: 'https://developer.mozilla.org/mdn-social-image.46ac2375.png'
date: '2026-11-18T18:24:15.953Z'
dateFolder: 2026/11/18
description: >-
  The Channel Messaging API allows two separate scripts running in different
  browsing contexts attached to the same document (e.g., two IFrames, or the
  main document and an IFrame, two documents via a SharedWorker, or two workers)
  to communicate directly, passing messages between one another through two-way
  channels (or pipes) with a port at each end.
isBasedOn: 'https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API'
link: 'https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API'
slug: 2026-11-18-httpsdevelopermozillaorgen-usdocswebapichannelmessagingapi
tags:
  - code
title: Channel Messaging API
---
<p><strong>Note:</strong> This feature is available in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a>.</p>
<p>The <strong>Channel Messaging API</strong> allows two separate scripts running in different browsing contexts attached to the same document (e.g., two IFrames, or the main document and an IFrame, two documents via a <a href="https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker"><code>SharedWorker</code></a>, or two workers) to communicate directly, passing messages between one another through two-way channels (or pipes) with a port at each end.</p>
<p>A message channel is created using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/MessageChannel"><code>MessageChannel()</code></a> constructor. Once created, the two ports of the channel can be accessed through the <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/port1"><code>MessageChannel.port1</code></a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/port2"><code>MessageChannel.port2</code></a> properties (which both return <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessagePort"><code>MessagePort</code></a> objects.) The app that created the channel uses <code>port1</code>, and the app at the other end of the port uses <code>port2</code> — you send a message to <code>port2</code>, and transfer the port over to the other browsing context using <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage"><code>window.postMessage</code></a> along with two arguments (the message to send, and the object to transfer ownership of, in this case the port itself.)</p>
<p>When these transferable objects are transferred, they are no longer usable on the context they previously belonged to. A port, after it is sent, can no longer be used by the original context.</p>
<p>The other browsing context can listen for the message using <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/message_event"><code>onmessage</code></a>, and grab the contents of the message using the event's <code>data</code> attribute. You could then respond by sending a message back to the original document using <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/postMessage"><code>MessagePort.postMessage</code></a>.</p>
<p>When you want to stop sending messages down the channel, you can invoke <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/close"><code>MessagePort.close</code></a> to close the ports.</p>
<p>Find out more about how to use this API in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging">Using channel messaging</a>.</p>
<dl> <dd> <p>Creates a new message channel to send messages across.</p> </dd> <dd> <p>Controls the ports on the message channel, allowing sending of messages from one port and listening out for them arriving at the other.</p> </dd> </dl>
<ul> <li>We have published a <a href="https://github.com/mdn/dom-examples/tree/main/channel-messaging-basic">channel messaging basic demo</a> on GitHub (<a href="https://mdn.github.io/dom-examples/channel-messaging-basic/">run it live too</a>), which shows a really simple single message transfer between a page and an embedded <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe"><code>&lt;iframe&gt;</code></a>.</li> <li>You can also see a <a href="https://github.com/mdn/dom-examples/tree/main/channel-messaging-multimessage">multimessaging demo</a> (<a href="https://mdn.github.io/dom-examples/channel-messaging-multimessage/">run this live</a>), which shows a slightly more complex setup that can send multiple messages between main page and IFrame.</li> </ul>
<h2><a href="https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API#browser_compatibility">Browser compatibility</a></h2>
