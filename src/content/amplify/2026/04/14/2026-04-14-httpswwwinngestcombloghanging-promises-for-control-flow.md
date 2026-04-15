---
author: Aaron Harper
cover_image: >-
  https://www.inngest.com/assets/blog/hanging-promises-for-control-flow/featured-image.jpg
date: '2026-04-14T23:32:38.432Z'
dateFolder: 2026/04/14
description: >-
  A promise that never resolves is a surprisingly clean way to interrupt an
  async function.
isBasedOn: 'https://www.inngest.com/blog/hanging-promises-for-control-flow'
link: 'https://www.inngest.com/blog/hanging-promises-for-control-flow'
slug: 2026-04-14-httpswwwinngestcombloghanging-promises-for-control-flow
tags:
  - code
title: You can't cancel a JavaScript promise (except sometimes you can)
---
<figure><img alt="Featured image for You can't cancel a JavaScript promise (except sometimes you can) blog post" data-nimg="1" src="https://www.inngest.com/_next/image?url=%2Fassets%2Fblog%2Fhanging-promises-for-control-flow%2Ffeatured-image.jpg&amp;w=1920&amp;q=95" srcset="https://www.inngest.com/_next/image?url=%2Fassets%2Fblog%2Fhanging-promises-for-control-flow%2Ffeatured-image.jpg&amp;w=828&amp;q=95 1x,"/><figcaption>Featured image for You can't cancel a JavaScript promise (except sometimes you can) blog post</figcaption></figure>
<p>You can't cancel a JavaScript promise. There's no <code>.cancel()</code> method, no <code>AbortController</code> integration, no built-in way to say "never mind, stop." The TC39 committee <a href="https://github.com/tc39/proposal-cancelable-promises">considered adding cancellation</a> in 2016, but the proposal was withdrawn after heated debate. Part of the problem is that cancelling arbitrary code mid-execution can leave resources in a dirty state (open handles, half-written data), so true cancellation requires cooperative cleanup, which undermines the simplicity people want from a <code>.cancel()</code> method.</p>
<p>But you can do something weirder: return a promise that never resolves, <code>await</code> it, and let the garbage collector clean up the suspended function. No exceptions, no <code>try/catch</code>, no special return values. The function just stops.</p>
<p>This is how the Inngest TypeScript SDK interrupts async workflow functions. But the technique is general-purpose, and the JavaScript semantics behind it are worth understanding on their own.</p>
<h2>Why you'd want to interrupt a function</h2>
<p>Sometimes you need to stop someone else's async function at an exact point, without their code doing anything special. The function's author writes normal <code>async</code>/<code>await</code> code. Your runtime decides when and where to interrupt it.</p>
<p>The concrete case we hit: running workflow functions on serverless infrastructure where each invocation has a hard timeout. A workflow might have dozens of steps that take hours to complete end-to-end, but each invocation can only run for seconds or minutes. The runtime (in our case, the SDK itself) needs to interrupt the function, save progress, and re-invoke it later to pick up where it left off, all without the user's code knowing it happened.</p>
<p>That requires interrupting an <code>await</code> without throwing.</p>
<h2>Interrupting with errors</h2>
<p>When implementing interruption, the obvious approach is to throw an exception. Imagine a <code>run</code> function that executes a callback and then throws a special error to stop the caller from continuing:</p>
<pre><code>class InterruptError extends Error {}

async function run(callback) {
  const result = await callback();
  // Save the result somewhere, then interrupt
  throw new InterruptError();
}

async function myWorkflow() {
  const data = await run(() =&gt; fetchData());

  // If run() throws, we never get here
  await run(() =&gt; processData(data));
}
</code></pre>
<p>This works until someone wraps their code in a <code>try/catch</code>:</p>
<pre><code>async function myWorkflow() {
  let data;
  try {
    data = await run(() =&gt; fetchData());
  } catch {
    console.log("Failed to fetch data, using default");
    data = defaultData;
  }

  // This runs even when we wanted to interrupt,
  // because the catch block swallowed InterruptError
  await run(() =&gt; processData(data));
}
</code></pre>
<p>The developer just wanted a fallback if <code>fetchData()</code> fails. But because <code>run</code> throws to interrupt, the <code>catch</code> block swallows the interruption too. Instead of interrupting, the function falls through to <code>defaultData</code> and keeps running code it shouldn't. Every <code>try/catch</code> in every user's code becomes a potential trap that silently breaks your control flow.</p>
<h2>Interrupting with generators</h2>
<p>Generators were <em>made</em> for interruption. A generator function pauses at each <code>yield</code>, and the caller controls whether to resume it. To interrupt, you just stop calling <code>.next()</code>:</p>
<pre><code>function* myWorkflow() {
  let data;
  try {
    data = yield run(async () =&gt; fetchData());
  } catch {
    console.log("Failed to fetch data, using default");
    data = defaultData;
  }

  yield run(async () =&gt; processData(data));
}
</code></pre>
<p>The caller drives the generator by calling <code>.next()</code>. To interrupt, it just stops:</p>
<pre><code>const gen = myWorkflow();

// Runs until the first yield
const first = gen.next();

// To interrupt: don't call gen.next() again.
// The catch block never runs. The generator is frozen mid-yield.
</code></pre>
<p>No exceptions, no swallowed interrupts. The caller has full control because <code>yield</code> hands execution back by design.</p>
<p>In fact, before <code>async</code>/<code>await</code> existed, generators were the standard way to write async-looking code. Libraries like <code>co</code> drove generator functions, resolving each yielded promise and feeding the result back in via <code>.next(value)</code>. When JavaScript added <code>async</code>/<code>await</code> in ES2017, it formalized that pattern with dedicated syntax, but traded away the caller's control over resumption.</p>
<p>The primary tradeoff with generators is ergonomics. Users must write <code>function*</code> instead of <code>async function</code>, and <code>yield</code> instead of <code>await</code>. Libraries like Effect have increased the popularity of generators, but it's still an unusual syntax for the vast majority of JavaScript developers.</p>
<p>Generators also break down with concurrency. With <code>async</code>/<code>await</code>, running things in parallel is natural:</p>
<pre><code>const results = await Promise.all([
  run(async () =&gt; fetchA()),
  run(async () =&gt; fetchB()),
  run(async () =&gt; fetchC()),
]);
</code></pre>
<p>But <code>yield</code> is sequential by definition. Each <code>yield</code> pauses the generator and hands control back to the caller, so you can't yield multiple values simultaneously. You'd have to yield an array of promises and have the runner detect that case and <code>Promise.all</code> them. Now you're inventing conventions on top of generators, and users have to learn those conventions instead of using the language's built-in concurrency primitives.</p>
<p>So: can we get generator-style interruption while letting users write plain <code>async</code>/<code>await</code>?</p>
<h2>The trick: a promise that never resolves</h2>
<p>Instead of throwing, you can return a promise that <em>never resolves</em>. Try running this code:</p>
<pre><code>const start = Date.now();
process.on("exit", () =&gt; {
  const elapsed = Math.round((Date.now() - start) / 1000);
  console.log(`Exited after ${elapsed}s`);
});

async function interrupt() {
  return new Promise(() =&gt; {});
}

async function main() {
  console.log("Before interrupt");
  await interrupt();

  // Unreachable
  console.log("After interrupt");
}

main();
</code></pre>
<p>You'll see the following output:</p>
<p>Note that <code>After interrupt</code> is not printed. Once the interrupt is hit, the program exits cleanly with no errors. That behavior might surprise you. Many people expect the program to hang forever since the promise returned by <code>interrupt</code> never resolves.</p>
<p>The process exits because promises alone don't keep Node's event loop alive. The event loop stays running only when there are active handles: timers, sockets, I/O watchers. An unsettled promise is just an object in memory. With nothing else to wait on, Node sees an empty event loop and exits.</p>
<p>To prove the promise is truly hanging (and not just exiting before it has a chance to resolve), add a timer that keeps the event loop alive:</p>
<pre><code>async function main() {
  setTimeout(() =&gt; {}, 2000);

  console.log("Before interrupt");
  await interrupt();

  // Unreachable
  console.log("After interrupt");
}
</code></pre>
<p>You'll see the following output:</p>
<p>This time, the program ran for 2 seconds before exiting. The <code>setTimeout</code> timer keeps the event loop alive.</p>
<h2>Putting it together: step-by-step execution</h2>
<p>Clean exits are neat, but not useful on their own. What we actually need is to call a function multiple times, interrupting after each step and picking up where we left off on the next call. That means memoizing: if a step already ran, return its saved result instead of running it again.</p>
<p>Here's what this looks like from the perspective of someone writing a workflow function (a simplified version of what the Inngest SDK does internally):</p>
<pre><code>async function myWorkflow(step) {
  console.log("  Workflow: top");

  const data = await step.run("fetch", () =&gt; {
    console.log("  Step: fetch");
    return [1, 2, 3];
  });

  const processed = await step.run("process", () =&gt; {
    console.log("  Step: process");
    return data.map((n) =&gt; n * 2);
  });

  console.log("  Workflow: complete", processed);
}
</code></pre>
<p>The runtime's job is to repeatedly call <code>myWorkflow</code>, executing one new step per invocation:</p>
<pre><code>async function main() {
  // In-memory store of completed step results
  const stepState = new Map();

  // Keep entering the workflow function until it's done
  let done = false;
  let i = 0;
  while (!done) {
    console.log(`Run ${i}:`);
    done = await execute(myWorkflow, stepState);
    console.log("--------------------------------");
    i++;
  }
}
</code></pre>
<p>If <code>execute</code> is implemented correctly, we expect to see:</p>
<pre><code>Run 0:
  Workflow: top
  Step: fetch
--------------------------------
Run 1:
  Workflow: top
  Step: process
--------------------------------
Run 2:
  Workflow: top
  Workflow: complete [ 2, 4, 6 ]
--------------------------------
</code></pre>
<p>Notice what's happening:</p>
<ul> <li><code>Workflow: top</code> prints 3 times. The function re-executes from the top on every invocation.</li> <li>Each <code>Step</code> log prints exactly once. Memoized steps return instantly; only the new step actually runs.</li> </ul>
<p>So we need to implement <code>execute</code> to:</p>
<ol> <li>Find the next new <code>step.run</code>.</li> <li>Run it.</li> <li>Memoize its result.</li> <li>Interrupt.</li> <li>Repeat until the workflow function is done.</li> </ol>
<p>Here's the whole thing as a single runnable script:</p>
<pre><code>async function execute(fn, stepState) {
  let newStep = null;

  // Run the user function in the background. It will hang at the new step
  fn({
    run: async (id, callback) =&gt; {
      // If this step already ran, return the memoized result
      if (stepState.has(id)) {
        return stepState.get(id);
      }

      // This is a new step. Report it
      newStep = { id, callback };

      // Hang forever
      return new Promise(() =&gt; {});
    },
  });
  
  // Schedule a macrotask. All pending microtasks (the resolved awaits from
  // memoized steps) will drain before this runs, giving the workflow function
  // time to advance through already-completed steps and reach the next new one.
  await new Promise((r) =&gt; setTimeout(r, 0));

  if (newStep) {
    // A new step was found. Execute it and save the result
    const result = await newStep.callback();
    stepState.set(newStep.id, result);

    // Function is not done
    return false;
  }

  // Function is done
  return true;
}

// User-defined workflow function
async function myWorkflow(step) {
  console.log("  Workflow: top");

  const data = await step.run("fetch", () =&gt; {
    console.log("  Step: fetch");
    return [1, 2, 3];
  });

  const processed = await step.run("process", () =&gt; {
    console.log("  Step: process");
    return data.map((n) =&gt; n * 2);
  });

  console.log("  Workflow: complete", processed);
}

async function main() {
  // In-memory store of completed step results
  const stepState = new Map();

  // Keep entering the workflow function until it's done
  let done = false;
  let i = 0;
  while (!done) {
    console.log(`Run ${i}:`);
    done = await execute(myWorkflow, stepState);
    console.log("--------------------------------");
    i++;
  }
}

main();
</code></pre>
<p><strong>Why use in-memory step state?</strong></p>
<p>In the real Inngest SDK, <code>stepState</code> is persisted to a database so results survive across separate invocations. Here we'll use an in-memory <code>Map</code> to keep things simple.</p>
<p><strong>Why use a <code>setTimeout</code> of 0 milliseconds?</strong></p>
<p>We need the workflow function to advance through all its memoized steps before we check whether it found a new one. When <code>step.run</code> returns a memoized result, the <code>await</code> resolves as a microtask. Microtasks run before any macrotask, so the function keeps advancing through already-completed steps in a tight loop, each resolved <code>await</code> queuing the next as another microtask. That chain stops when the function hits a new step (the never-resolving promise queues nothing) or finishes entirely. By scheduling a macrotask with <code>setTimeout</code>, we guarantee all those microtasks drain first. The Inngest SDK has a smarter approach, but the macrotask is a simple way to demonstrate the concept. If you want a deeper understanding of the event loop, microtasks, and macrotasks, Philip Roberts' talk <a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">What the heck is the event loop anyway?</a> is the best explanation out there.</p>
<h2>But wait, doesn't that leak memory?</h2>
<p>If we're creating promises that hang forever, doesn't that leak memory? In a long-lived process, abandoned promises could accumulate.</p>
<p>Except they don't, if nothing references them.</p>
<p>JavaScript's garbage collector doesn't care whether a promise is settled. It cares whether anything <em>references</em> it. If you create a promise, <code>await</code> it inside a function, and then that function's entire call stack becomes unreachable, the garbage collector will clean up everything: the promise, the function's suspended state, all of it.</p>
<p>To prove this, we'll use JavaScript's <code>FinalizationRegistry</code> to observe garbage collection. This API lets you register a callback that fires when an object is garbage collected. Let's add it to our script:</p>
<pre><code>// Log when a registered object is garbage collected
const registry = new FinalizationRegistry((value) =&gt; {
  console.log("  GC", value);
});

// User-defined workflow function
async function myWorkflow(step) {
  console.log("  Workflow: top");

  const fetchP = step.run("fetch", () =&gt; {
    console.log("  Step: fetch");
    return [1, 2, 3];
  });
  registry.register(fetchP, "fetch");
  const data = await fetchP;

  const processP = step.run("process", () =&gt; {
    console.log("  Step: process");
    return data.map((n) =&gt; n * 2);
  });
  registry.register(processP, "process");
  const processed = await processP;

  console.log("  Workflow: complete", processed);
}

async function main() {
  // In-memory store of completed step results
  const stepState = new Map();

  // Keep entering the workflow function until it's done
  let done = false;
  let i = 0;
  while (!done) {
    console.log(`Run ${i}:`);
    done = await execute(myWorkflow, stepState);
    console.log("--------------------------------");
    i++;
  }

  // Force garbage collection
  globalThis.gc();
}
</code></pre>
<p>Now when you run the script (using the <code>--expose-gc</code> flag) you'll see the following output:</p>
<pre><code>Run 0:
  Workflow: top
  Step: fetch
--------------------------------
Run 1:
  Workflow: top
  Step: process
--------------------------------
Run 2:
  Workflow: top
  Workflow: complete [ 2, 4, 6 ]
--------------------------------
  GC process
  GC fetch
  GC fetch
  GC fetch
  GC process
</code></pre>
<p>You'll notice <code>GC fetch</code> appears three times and <code>GC process</code> appears twice. That's because each re-invocation of <code>myWorkflow</code> calls <code>registry.register</code> on a new promise object, even for memoized steps (since <code>step.run</code> is <code>async</code>, every call returns a fresh promise). Run 0 registers one <code>fetch</code> promise; run 1 registers <code>fetch</code> and <code>process</code>; run 2 registers both again. All five promises, including the ones that hung forever, get collected.</p>
<h2>The catch</h2>
<p>You're relying on garbage collection, which is nondeterministic. You don't get to know <em>when</em> the suspended function is collected. For our use case, that's fine. We only need to know that it <em>will</em> be collected, and modern engines are reliable about that.</p>
<p>The real footgun is reference chains. If anything holds a reference to the hanging promise or the suspended function's closure, the garbage collector can't touch it. The pattern only works when you intentionally sever all references.</p>
<h2>Wrapping up</h2>
<p>Intentionally hanging promises sound like heresy, but they're a legitimate control flow tool. We use this pattern in production in the <a href="https://github.com/inngest/inngest-js">Inngest TypeScript SDK</a> to interrupt workflow functions, memoize step results, and resume across serverless invocations, all while letting users write plain <code>async</code>/<code>await</code> code.</p>
<p>Generators give you clean interruption, but force a different syntax on your users. Throwing gives you <code>async</code>/<code>await</code>, but <code>try</code>/<code>catch</code> breaks it. A promise that never resolves gives you both: native syntax with reliable interruption. Sometimes the best way to stop a function is to give it nothing to wait for.</p>
