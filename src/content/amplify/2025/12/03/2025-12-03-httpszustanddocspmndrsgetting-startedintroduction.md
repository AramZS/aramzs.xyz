---
author: pmnd.rs
cover_image: 'https://github.com/pmndrs/zustand/raw/main/docs/bear.jpg'
date: '2025-12-03T19:14:48.666Z'
dateFolder: 2025/12/03
description: How to use Zustand
isBasedOn: 'https://zustand.docs.pmnd.rs/getting-started/introduction'
link: 'https://zustand.docs.pmnd.rs/getting-started/introduction'
slug: 2025-12-03-httpszustanddocspmndrsgetting-startedintroduction
tags:
  - code
title: Introduction
---
<figure><img alt="Logo Zustand" src="https://github.com/pmndrs/zustand/raw/main/docs/bear.jpg"/><figcaption>Logo Zustand</figcaption></figure>
<p>A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.</p>
<p>Don't disregard it because it's cute, it has claws! Lots of time was spent to deal with common pitfalls, like the dreaded <a href="https://react-redux.js.org/api/hooks#stale-props-and-zombie-children">zombie child problem</a>, <a href="https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md">React concurrency</a>, and <a href="https://github.com/facebook/react/issues/13332">context loss</a> between mixed renderers. It may be the one state manager in the React space that gets all of these right.</p>
<p>You can try a live demo <a href="https://codesandbox.io/s/dazzling-moon-itop4">here</a>.</p>
<p>Zustand is available as a package on NPM for use:</p>
<pre><code>npm install zustand
# Or, use any package manager of your choice.
</code></pre>
<figure></figure><p>Your store is a hook! You can put anything in it: primitives, objects, functions. The <code>set</code> function <em>merges</em> state.</p>
<pre><code>const useBear = create((set) =&gt; ({
  bears: 0,
  increasePopulation: () =&gt; set((state) =&gt; ({ bears: state.bears + 1 })),
  removeAllBears: () =&gt; set({ bears: 0 }),
  updateBears: (newBears) =&gt; set({ bears: newBears }),
</code></pre>
<figure></figure><p><a href="https://zustand.docs.pmnd.rs/getting-started/introduction/#then-bind-your-components,-and-that's-it!"><h2>Then bind your components, and that's it!</h2></a></p>
<p>You can use the hook anywhere, without the need of providers. Select your state and the consuming component will re-render when that state changes.</p>
<pre><code>function BearCounter() {
  const bears = useBear((state) =&gt; state.bears)
  return &lt;h1&gt;{bears} bears around here...&lt;/h1&gt;

function Controls() {
  const increasePopulation = useBear((state) =&gt; state.increasePopulation)
  return &lt;button onClick={increasePopulation}&gt;one up&lt;/button&gt;
</code></pre>
<figure></figure>
