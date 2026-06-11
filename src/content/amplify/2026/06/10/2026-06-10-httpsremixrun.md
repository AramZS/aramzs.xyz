---
author: remix.run
cover_image: 'http://remix.run/marketing/remix-run-share-thumbnail.png'
date: '2026-06-10T13:44:52.788Z'
dateFolder: 2026/06/10
description: >-
  Remix is a batteries-included, ultra-productive, zero dependencies and
  bundler-free framework, ready to develop with in a agent-first world.
isBasedOn: 'https://remix.run/'
link: 'https://remix.run/'
slug: 2026-06-10-httpsremixrun
tags:
  - code
title: A web framework for building anything
---
<p>Remix gives you the power and tools to build anything you can dream of. To get started, just <code>npx remix@next new</code> and you're off to the races.</p>
<p>Cohesive frontend and backend</p>
<h2>Closing the gap between the initial spark and shipping</h2>
<p>Remix is the world's first truly full-stack JavaScript framework. It includes a server, router, data layer, UI components, testing, and much more. Everything you need to go from idea to launch in a single dependency.</p>
<p>Ready to build right out of the box</p>
<h2>Built for humans and models</h2>
<p>Remix ships with skills that help your AI agent learn the API and follow best practices. Whether you let the agent write all the code, or you tweak it by hand, Remix just works. It's one unified stack that speaks Remix end to end, not a patchwork of tools. When you want to change something, explain it in plain language. The framework stays out of your way.</p>
<p>The next generation of UI</p>
<h2>High-performance components in plain, beautiful JavaScript</h2>
<p>Remix components build on web primitives like EventTarget and avoid the runtime semantics of React hooks, giving you back normal JavaScript control flow and execution. This works seamlessly with the web, including web components and third-party libraries. Remix also provides native mixins for the DOM that make it easier than ever to compose and apply complex behavior on native platform elements.</p>
<pre><code>import { type Handle, on } from 'remix/ui'import { Glyph } from 'remix/ui/glyph'import * as btn from 'remix/ui/button'function CopyToClipboard(handle: Handle&lt;{ url: string }&gt;) {
  let state: "idle" | "copied" | "error" = "idle";

  return () =&gt; {
    let label =
      state === "idle"
        ? "Copy to clipboard"
        : state === "copied"
          ? "Copied"
          : "Error";

    return (
      &lt;button
        aria-label={label}
        aria-live="polite"
        mix={[
          btn.secondaryStyle,
          on("click", async (_, signal) =&gt; {
            try {
              await navigator.clipboard.writeText(handle.props.url);
              if (signal.aborted) return;
            } catch (error) {
              state = "error";
              handle.update();
              return;
            }

            state = "copied";
            handle.update();
            setTimeout(() =&gt; {
              if (signal.aborted) return;
              state = "idle";
              handle.update();
            }, 2000);
          }),
        ]}
      &gt;
        {state === "copied" ? (
          &lt;Glyph name="check" /&gt;
        ) : (
          &lt;Glyph name="clipboard" /&gt;
        )}
      &lt;/button&gt;
    );
  };
}</code></pre>
<p>One framework for any kind of project</p>
<h2>A store overnight. A business in a weekend. The app you always wanted to ship.</h2>
<p>Whatever you want to build, Remix can meet the project where it is. Start something new, grow it into a business, or bring Remix into an app that already exists. One technology, used in whatever way the project needs.</p>
<h2>Building with Remix can take you there</h2>
<p>Remix 3 is currently available as a beta release.</p>
<p><a href="https://github.com/remix-run/remix">Watch the repo</a></p>
<h2>Stay in the loop</h2>
<p>Once a month, we write about everything in the world of Remix. Sign up to be notified about progress on Remix 3. No spam. Unsubscribe anytime.</p>
<figure><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://remix.run/landing/remix-runner-static.png" type="image/png"/><source srcset="https://remix.run/landing/remix-runner.avif" type="image/avif"/><source srcset="https://remix.run/landing/remix-runner.webp" type="image/webp"/><img alt="Loading Remix homepage" src="https://remix.run/landing/remix-runner.gif"/></picture></figure>
