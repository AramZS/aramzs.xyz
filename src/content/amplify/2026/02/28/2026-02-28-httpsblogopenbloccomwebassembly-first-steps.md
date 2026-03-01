---
author: 'https://www.facebook.com/maxime.rouyrre'
cover_image: 'https://cdn.openbloc.fr/2017/06/kevin-o-connor-262008-bis-1.jpg'
date: '2026-02-28T23:15:30.239Z'
dateFolder: 2026/02/28
description: >-
  This tutorial will guide you along the necessary steps to port a JavaScript
  library of the Conway's game of life to WebAssembly (wasm). This is a simple
  exercise that is perfect to start beyond a trivial Hello World.  I recently
  got interested in WebAssembly and decided to take the leap
isBasedOn: 'https://blog.openbloc.com/webassembly-first-steps/'
link: 'https://blog.openbloc.com/webassembly-first-steps/'
slug: 2026-02-28-httpsblogopenbloccomwebassembly-first-steps
tags:
  - code
  - tech
title: 'WebAssembly 101: a developer''s first steps'
---
<figure><img alt="WebAssembly 101: a developer's first steps" sizes="(max-width: 800px) 400px,
                        (max-width: 1170px) 1170px,
                            2000px" src="https://cdn.openbloc.fr/2017/06/kevin-o-connor-262008-bis-1.jpg" srcset="https://cdn.openbloc.fr/2017/06/kevin-o-connor-262008-bis-1.jpg 300w,
                            https://cdn.openbloc.fr/2017/06/kevin-o-connor-262008-bis-1.jpg 600w,
                            https://cdn.openbloc.fr/2017/06/kevin-o-connor-262008-bis-1.jpg 1000w,
                            https://cdn.openbloc.fr/2017/06/kevin-o-connor-262008-bis-1.jpg 2000w"/></figure>
<p>This tutorial will guide you along the necessary steps to port a JavaScript library of the Conway's game of life to WebAssembly (wasm). This is a simple exercise that is perfect to start beyond a trivial Hello World.</p>
<p>I recently got interested in <a href="http://webassembly.org/">WebAssembly</a> and decided to take the leap this weekend. WebAssembly is an emerging standard to enable near-native performance for web applications. Basically it's <a href="https://kripken.github.io/talks/wasm.html#/">asm.js done right</a> as stated by <a href="https://twitter.com/kripken">@kripken</a> (Dec. 9th 2015). WebAssembly is still a moving target, with a lot of developments going on. Getting started turns out to be difficult as most of the available information is quickly becoming outdated.</p>
<p>I went through the <a href="https://github.com/mbasso/awesome-wasm/blob/master/README.md">awesome-wasm list</a> which is a good starting point but still had to work two days on this to get some working code.</p>
<p>There's a demo of the game of life re-implemented in wasm at the end of the article :)</p>
<p>The following tutorial was written using Ubuntu 17.04, so your mileage may vary. Assume no knowledge of WebAssembly as I wrote this starting from scratch but I won't detail the ES6 with webpack toolchain. There's a lot more available resources for this on the web. Try finding a more up-to-date tutorial like <a href="http://www.theodo.fr/blog/2016/07/a-comprehensive-introduction-to-webpack-the-module-bundler/">this one</a>.</p>
<p>This article has five parts:</p>
<ul> <li><a href="https://blog.openbloc.com/webassembly-first-steps/#part1">Setup the toolchain</a></li> <li><a href="https://blog.openbloc.com/webassembly-first-steps/#part2">Javascript integration</a></li> <li><a href="https://blog.openbloc.com/webassembly-first-steps/#part3">Beyond Hello World: optimizing a game of life engine</a></li> <li><a href="https://blog.openbloc.com/webassembly-first-steps/#part4">Benchmarking</a> (demo link is there)</li> <li><a href="https://blog.openbloc.com/webassembly-first-steps/#part5">Conclusion</a></li> </ul>
<h2>Setup the toolchain</h2>
<p>The provided packages are a little outdated, I got some warnings. After spending some time installing the latest LLVM build it appeared that the easiest way was to download and install the <a href="https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz">Portable Emscripten SDK for Linux and OS X (emsdk-portable.tar.gz)</a>. <br/>
Extract the archive and open a terminal in the folder.</p>
<pre><code>$ ./emsdk update
$ ./emsdk install latest
</code></pre>
<p>Now depending on your network speed go make yourself a coffee or read a book.</p>
<blockquote> <p>The <a href="http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html#download-and-install">Emscripten</a> SDK provides the whole Emscripten toolchain (Clang, Python, Node.js and Visual Studio integration) in a single easy-to-install package, with integrated support for updating to newer SDKs as they are released.</p> </blockquote>
<p>So we should have everything necessary to start coding some WebAssembly.<br/>
Once the installation is done, activate the sdk:</p>
<pre><code>$ ./emsdk activate latest
$ source ./emsdk_env.sh  # you can add this line to your .bashrc
</code></pre>
<p>Make some sample C file <code>counter.c</code>:</p>
<pre><code>int counter = 100;

int count() {
    counter += 1;
    return counter;
}
</code></pre>
<p>Compile it to wasm with emcc:</p>
<pre><code>$ emcc counter.c -s WASM=1 -s SIDE_MODULE=1 -o counter.wasm
</code></pre>
<p>And, tada ! We have a beautiful counter.wasm.</p>
<figure><img alt="Some WebAssembly code" src="https://cdn.openbloc.fr/2017/06/Capture-du-2017-06-03-15-47-35.png"/><figcaption>Some WebAssembly code</figcaption></figure>
<h2>JavaScript integration</h2>
<p>A standalone .wasm file won't do anything by itself, we need to load it in some client javascript code. I'm using webpack along with <code>wasm-loader</code> to this end. Refer to <a href="https://developer.mozilla.org/en-US/docs/WebAssembly/Using_the_JavaScript_API#Loading_our_wasm_module_and_using_it">the documentation</a> for a more vanilla JavaScript example. Ok, let's do this:</p>
<pre><code>import Counter from './wasm/counter'
const wasmHelloWorld = () =&gt; {
    const counter = new Counter();
    console.log("count function result is : " + counter.exports._count());
}
window.onload = wasmHelloWorld
</code></pre>
<p>Loading this code in a sample html page should print <code>101</code> in the console. Except it doesn't. In Firefox 53 you should get a <code>LinkError: import object field 'DYNAMICTOP_PTR' is not a Number</code> instead. What went wrong? I got stuck on this an entire evening, then came <a href="https://stackoverflow.com/a/44349363/343834">StackOverflow to the rescue</a>.</p>
<p>Let's get back to the code, we need to compile the C code with an optimization flag:</p>
<pre><code>$ emcc counter.c -O1 -o counter.wasm -s WASM=1 -s SIDE_MODULE=1
</code></pre>
<p>Now when we do a <code>new Counter()</code>, <code>wasm-loader</code> calls <code>new WebAssembly.Instance(module, importObject);</code></p>
<ul> <li><code>module</code> is a correct <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module">WebAssembly.Module</a> instance.</li> <li><code>importObject</code> is the default provided by <code>wasm-loader</code> which appears to not work.</li> </ul>
<p>The reasons are a little obscure but editing the JavaScript to the following code solves the issue:</p>
<pre><code>import Counter from './wasm/counter'
const wasmHelloWorld = () =&gt; {
    const counter = new Counter({
      'env': {
        'memoryBase': 0,
        'tableBase': 0,
        'memory': new WebAssembly.Memory({initial: 256}),
        'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'})
      }
    })
    console.log("count function result is : " + counter.exports._count());
}
window.onload = wasmHelloWorld
</code></pre>
<p>Now, reloading the webpage succeeds !</p>
<figure><img alt="Hello world screenshot" src="https://cdn.openbloc.fr/2017/06/Capture-du-2017-06-04-15-19-58.png"/><figcaption>Hello world screenshot</figcaption></figure>
<p>As you can see it wasn't that straightforward to get a simple hello world to work. In the following section we'll see an easier way to integrate JS and wasm.</p>
<h2>Beyond Hello World: optimizing a game of life engine</h2>
<p>While upping my skills in ES6, webpack, babel, etc. I made a <a href="http://lab.openbloc.fr/way-of-life/">little implementation</a> of the game of life. The code is available at <a href="https://github.com/blaze33/way-of-life"> blaze33/way-of-life</a>.</p>
<p>The <a href="https://github.com/blaze33/way-of-life/blob/v0.0.6/src/js/engine.js#L36">game engine</a> has a double loop iterating over the whole game grid at each step. Though I tried hard to keep it fast, it gets quickly slow once you increase the grid size. With our newfound WebAssembly skills it could be a nice exercise to try running the core game engine as a <code>wasm</code> module.</p>
<p>What needs to be done ?</p>
<ul> <li>Re-implement the <a href="https://github.com/blaze33/way-of-life/blob/master/src/js/wasm/engine.c">game logic in C</a>.</li> <li>Compile the C logic to wasm.</li> <li>Expose the wasm code in the JS one.</li> <li>Have a way to interact between the C and JS code.</li> </ul>
<p>We won't go full WebAssembly for now and have the rendering to the canvas done in WebAssembly for now.</p>
<h4>Compile C to WASM with some JS-glue code</h4>
<p>Notice how we compiled the previous example with <code>-s SIDE_MODULE=1</code> ? This provides a single wasm module that we have to integrate from scratch in the client code. You should know that it doesn't allow for <code>malloc</code> calls in the C code for example. Not really a problem for a hello world but pretty much a big no-no once you try doing more complex stuff. Fortunately you can compile the C code and have emscripten provide a wasm module AND a JS module that serves as a glue to integrate the WebAssembly in the client code. In our case, it will allow us to make <code>malloc</code> calls and have a way to read the allocated memory from the JS side.</p>
<p>The compilation is done as follow:</p>
<pre><code>emcc engine.c -O3 -o engine.js -s WASM=1 -Wall -s MODULARIZE=1
</code></pre>
<p>By setting MODULARIZE we put all the JS output into a function. Unfortunately it's not really a JS module (AMDdefine, CommonJS nor ES6) so we'll just append <code>export {Module as default}</code> to <a href="https://github.com/blaze33/way-of-life/blob/master/src/js/wasm/engine.js"><code>engine.js</code></a>, webpack will do the rest and allow us to import the Module in our ES6 client code:</p>
<pre><code>import Module from './wasm/engine.js'
module = Module({wasmBinaryFile: 'wasm/engine.wasm'})
</code></pre>
<p>You have to specify the extension in the import as there is an <code>engine.wasm</code> in the same folder. <br/>
<code>wasmBinaryFile</code> is the url used to asynchronously fetch the wasm code, so <a href="https://github.com/blaze33/way-of-life/blob/v0.1.0/webpack.config.js#L71">we tell webpack to serve it</a> using <a href="https://github.com/kevlened/copy-webpack-plugin">copy-webpack-plugin</a>.</p>
<p>Keep this JS <code>module</code> in mind, we'll reuse it later.</p>
<h4>Calling WASM functions from JavaScript</h4>
<p>By default the C functions are not exposed by emscripten (or maybe not always, correct me if I'm wrong), we need to tell it to do so:</p>
<pre><code>#include &lt;emscripten.h&gt;

EMSCRIPTEN_KEEPALIVE
char *init(int w, int h) {
    width = w;
    height = h;
    current = malloc(width * height * sizeof(char));
    next = malloc(width * height * sizeof(char));
    return current;
}
</code></pre>
<p><code>EMSCRIPTEN_KEEPALIVE</code> does exactly this and we can now call <code>module.asm._init(40, 40)</code> if we wanted to initialize the game with a 40x40 grid.</p>
<p>All the exposed C funtions are available in <code>module.asm</code> and are prefixed with an underscore.</p>
<h4>Accessing the wasm module memory from JS</h4>
<p>Emscripten conveniently exposes the module memory through <code>module.HEAP*</code> variables. The <a href="https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#access-memory-from-javascript">recommended way to interact with the memory</a> is with <code>module.getValue</code> and <code>setValue</code>. As this is slower, I'll pursue directly with accessing HEAP8, considering the state is in a char array. Beware: accessing undocumented properties will probably break in the future!</p>
<p>Now we have pretty much all the pieces, I worked hard to piece all this together so let's proceed to the speedup benchmarking with the demo!</p>
<h2>Benchmarking</h2>
<p>Benchmarking is always tricky and I shouldn't probably use this word for looking at an Hello World performance so that the following shouldn't be used to judge wasm performance. The C code is not optimized to be fast but written like the naïve JS implementation I used. That being said we can still have a look to see if the result goes faster than the JS implementation.</p>
<p>I did some performance profiling on Chrome 58.<br/>
 This is the original JS code:</p>
<figure><img alt="JS engine performance profile" src="https://cdn.openbloc.fr/2017/06/Capture-du-2017-06-05-13-06-10.png"/><figcaption>JS engine performance profile</figcaption></figure>
<p>And this is the wasm code:</p>
<figure><img alt="wasm engine performance profile" src="https://cdn.openbloc.fr/2017/06/Capture-du-2017-06-05-13-28-44.png"/><figcaption>wasm engine performance profile</figcaption></figure>
<p>On average the <code>computeNextState</code> which took ~40ms now runs in ~15ms, not orders of magnitude faster but enough to get from ~18FPS to ~40FPS on my laptop.</p>
<p>The improvements were less visible on Firefox 53 as the FPS varied a lot, but it is still present.</p>
<ul> <li><a href="http://lab.openbloc.fr/way-of-life/?desiredFPS=60&amp;pixelsPerCell=5">Demo up to 60FPS, 5 pixels per cell</a></li> <li><a href="http://lab.openbloc.fr/way-of-life/?desiredFPS=60&amp;pixelsPerCell=1">Demo up to 60FPS, 1 pixel per cell</a></li> </ul>
<p>You can play with the url options and also switch the wasm engine to the js one for comparison, have fun!</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://www.youtube.com/embed/ZLJvpxKVgRk?rel=0">View content ↗ </a></p></figure>
<h2>Conclusion </h2>
<ul> <li>Starting this was much harder than I envisioned!</li> <li>Webassembly looks really promising but the toolchain feels a bit heavy and clunky at times.</li> <li>The documentation is both sparse or too technical but that should improve over time.</li> <li>Having the emscripten glue code is really necessary for now, even if it seems to add another layer. I initially thought we could get away interfacing directly with the wasm code but I couldn't.</li> <li>Still pretty happy with the result.</li> <li>The code is available at <a href="https://github.com/blaze33/way-of-life"> blaze33/way-of-life</a></li> </ul>
<p>Thanks for reading ! If you liked this article you can follow me at <a href="https://twitter.com/maxmre">@maxmre</a> for future posts, or you could star the <a href="https://github.com/blaze33/way-of-life">github repo</a>, leave a comment or, you know, just ignore this internet-points-mania, I won't be mad ;)</p>
<p>Also thanks to <a href="https://stackoverflow.com/search?q=webassembly">Stackoverflow</a> and <a href="https://news.ycombinator.com/news">Hacker News</a> for helping me along the way!</p>
<p><a href="https://news.ycombinator.com/item?id=14495893">Hacker News discussion thread</a>.</p>
<h5>Useful resources</h5>
<ul> <li><a href="https://github.com/mbasso/awesome-wasm/blob/master/README.md">Awesome wasm</a></li> <li><a href="https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html">Interacting with code</a> (between JS and C/C++)</li> <li><a href="https://developer.mozilla.org/en-US/docs/WebAssembly">MDN documentation</a></li> <li><a href="https://medium.com/mozilla-tech/why-webassembly-is-a-game-changer-for-the-web-and-a-source-of-pride-for-mozilla-and-firefox-dda80e4c43cb">Why WebAssembly is a game changer for the web — and a source of pride for Mozilla and Firefox</a></li> <li><a href="https://s3.amazonaws.com/mozilla-games/ZenGarden/EpicZenGarden.html">Epic games Zen Garden Demo</a> (125MB download!)</li> </ul>
