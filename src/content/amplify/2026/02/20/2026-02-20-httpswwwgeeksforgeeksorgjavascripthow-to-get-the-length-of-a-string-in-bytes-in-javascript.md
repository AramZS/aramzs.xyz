---
author: GeeksforGeeks
cover_image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
date: '2026-02-21T01:22:11.562Z'
dateFolder: 2026/02/20
description: >-
  Your All-in-One Learning Portal: GeeksforGeeks is a comprehensive educational
  platform that empowers learners across domains-spanning computer science and
  programming, school education, upskilling, commerce, software tools,
  competitive exams, and more.
isBasedOn: >-
  https://www.geeksforgeeks.org/javascript/how-to-get-the-length-of-a-string-in-bytes-in-javascript/
link: >-
  https://www.geeksforgeeks.org/javascript/how-to-get-the-length-of-a-string-in-bytes-in-javascript/
slug: >-
  2026-02-20-httpswwwgeeksforgeeksorgjavascripthow-to-get-the-length-of-a-string-in-bytes-in-javascript
tags:
  - code
title: How to Get the Length of a String in Bytes in JavaScript ?
---
<p><b><strong>In JavaScript, determining the length of a string in characters</strong></b> is straightforward using the <code>length</code> property. However, in many cases, particularly when dealing with file sizes, network protocols, or database storage, you might need to know the length of a string in bytes. This is because characters can be represented using different numbers of bytes, depending on the encoding. This article explores various methods to calculate the byte length of a string in JavaScript.</p>
<h2>Why Byte Length Matters</h2>
<p>The byte length of a string is important in scenarios where storage, transmission, and encoding constraints are critical, such as:</p>
<ul><li><b><strong>Network Data Transmission</strong></b>: Ensuring data packets are within size limits.</li><li><b><strong>File Storage</strong></b>: Calculating file sizes accurately.</li><li><b><strong>Database Storage</strong></b>: Managing data that may be stored in binary formats or with specific encoding requirements.</li><li><b><strong>Data Serialization</strong></b>: Ensuring efficient data representation for APIs or protocols.</li></ul>
<h2>Understanding Encodings</h2>
<p>Before diving into the methods for calculating byte length, it's essential to understand how text is encoded. The most common encodings are:</p>
<ul><li><b><strong>UTF-8</strong></b>: Variable-length encoding that uses 1 to 4 bytes per character.</li><li><b><strong>UTF-16</strong></b>: Uses 2 or 4 bytes per character.</li><li><b><strong>ASCII</strong></b>: Uses 1 byte per character (limited to 128 characters).</li></ul>
<p><b><strong>Example:</strong></b></p>
<pre><b><strong>Input</strong></b>: "GeeksForGeeks"<br/><b><strong>Output</strong></b>: 13 bytes<br/><br/><b><strong>Input</strong></b>: 20€<br/><b><strong>Output</strong></b>: 5 bytes<br/><br/><b><strong>Input</strong></b>: "????"<br/><b><strong>Output</strong></b>: 4 bytes</pre>
<p>To achieve this we have two ways the first one is using the Blob API and the second is Buffer API, the first one works with the browser, and the second works with the Node.js environment. <a href="https://www.geeksforgeeks.org/javascript/javascript-blob/">blob </a>object is simply a group of bytes that holds the data stored in a file. To read the bytes of a string using blog we create a new instance of Blob object then we pass the string inside it and by using the size property we can get the bytes of a string.</p>
<p>The <code>Blob</code> interface creates a binary large object from the string and returns its byte size. It’s useful for handling file-like data in web browsers. This approach is straightforward and works well with browser-based JavaScript.</p>
<p> <code><pre>const len = (str) =&gt; {

  // Creating new Blob object and passing string into it 
  // inside square brackets and then 
  // by using size property storin the size 
  // inside the size variable
  let size = new Blob([str]).size;
  return size;
} 

console.log(len("Geeksforgeeks"))
console.log(len("true"))
console.log(len("false"))
console.log(len("12345"))
console.log(len("20€"))
console.log(len("????"))
</pre></code> </p>
<p><b><strong>Output:</strong></b></p>
<pre>13<br/>4<br/>5<br/>5<br/>5<br/>4</pre>
<h2>Using <code>Buffer</code> in Node.js</h2>
<p>The <code>Buffer</code> class in Node.js calculates the byte length of a string based on the specified encoding. It’s highly suitable for server-side applications, offering flexibility for various encodings. This method is accurate and efficient for Node.js environments.</p>
<p> <code><pre>const len = (str) =&gt; {
  let size = Buffer.from(str).length;
  return size;
} 

console.log(len("Geeksforgeeks"))
console.log(len("true"))
console.log(len("false"))
console.log(len("12345"))
console.log(len("20€"))
console.log(len("????"))
</pre></code> </p>
<p><b><strong>Output:</strong></b></p>
<pre>13<br/>4<br/>5<br/>5<br/>5<br/>4</pre>
<h2><b><strong>Using the </strong></b><b><code><strong>TextEncoder</strong></code></b><b><strong> API</strong></b></h2>
<p>The <code>TextEncoder</code> API provides an efficient way to encode a string into a specific format (e.g., UTF-8) and retrieve its byte length.</p>
<p> <code><pre>function getByteLength(str) {
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(str);
  return byteArray.length;
}

// Example usage:
const str = 'Hello, ?!';
console.log(getByteLength(str));
</pre></code> </p>
