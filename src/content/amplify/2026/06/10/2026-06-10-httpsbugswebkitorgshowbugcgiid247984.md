---
author: WebKit Bugzilla
cover_image: null
date: '2026-06-10T15:25:26.010Z'
dateFolder: 2026/06/10
description: 'The bug with memory (In reply to Yusuke Suzuki from comment #7) > <!'
isBasedOn: 'https://bugs.webkit.org/show_bug.cgi?id=247984'
link: 'https://bugs.webkit.org/show_bug.cgi?id=247984'
slug: 2026-06-10-httpsbugswebkitorgshowbugcgiid247984
tags:
  - code
  - ad tech
title: References to iframes seem do not get garbage collected
---
<p>The bug with memory (In reply to Yusuke Suzuki from <a href="https://bugs.webkit.org/show_bug.cgi?id=247984#c7">comment #7</a>) &gt; &lt;!DOCTYPE html&gt; &gt; &lt;html lang="en"&gt; &gt; &gt; &lt;head&gt; &gt; &lt;button onclick="allocate_memory();"&gt; &gt; Allocate Memory &gt; &lt;/button&gt; &gt; &lt;p&gt;Memory bytes: &lt;/p&gt; &gt; &lt;p id="memory_text"&gt;65536&lt;/p&gt; &gt; &lt;/head&gt; &gt; &gt; &lt;script&gt; &gt; let ctx = { &gt; memory: new WebAssembly.Memory({ &gt; initial: 1, &gt; }) &gt; }; &gt; const bytesPerPage = 64 * 1024; &gt; function allocate_memory() { &gt; let memory = ctx.memory; &gt; memory.grow(1000); &gt; document.getElementById("memory_text").innerHTML = &gt; memory.buffer.byteLength; &gt; } &gt; &lt;/script&gt; &gt; &gt; Yeah, allocate_memory function in the global variable, and it is capturing &gt; WebAssembly.Memory. So, so long as iframe is alive, then WebAssembly.Memory &gt; is also alive. (In reply to Yusuke Suzuki from <a href="https://bugs.webkit.org/show_bug.cgi?id=247984#c6">comment #6</a>) &gt; (In reply to dmt021 from <a href="https://bugs.webkit.org/show_bug.cgi?id=247984#c5">comment #5</a>) &gt; &gt; (In reply to Yusuke Suzuki from <a href="https://bugs.webkit.org/show_bug.cgi?id=247984#c4">comment #4</a>) &gt; &gt; &gt; (In reply to Alex Christensen from <a href="https://bugs.webkit.org/show_bug.cgi?id=247984#c3">comment #3</a>) &gt; &gt; &gt; &gt; Mark reported that WebAssembly.Memory does have a similar issue unique to &gt; &gt; &gt; &gt; WebKit. It's possible we're missing a call to reportExtraMemoryAllocated or &gt; &gt; &gt; &gt; something in that case. &gt; &gt; &gt; &gt; &gt; &gt; WebAssembly.Memory already has this. And I cannot reproduce this issue. &gt; &gt; &gt; &gt; &gt; &gt; for (var i = 0; i &lt; 1000000; i++) { new WebAssembly.Memory({ initial: 1024 &gt; &gt; &gt; }); } &gt; &gt; &gt; &gt; &gt; &gt; Just works as the same way to `new ArrayBuffer` one. &gt; &gt; &gt; &gt; <a href="https://dmt021.github.io/grow_index.html">https://dmt021.github.io/grow_index.html</a> &gt; &gt; Sample with WebAssembly.Memory leak &gt; &gt; Basic flow: &gt; &gt; 1. alloc WebAssembly.Memory within the iframe &gt; &gt; 2. delete iframe from the main frame &gt; &gt; This means that iframe is alive and WebAssembly.Memory is kept alive. Not &gt; particularly related to WebAssembly.Memory implementation. How it could be alive, if we create and delete it?</p>
