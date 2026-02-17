---
author: overreacted.io
cover_image: >-
  https://overreacted.io/rsc-for-astro-developers/opengraph-image?5b0b970dfd19bb8c
date: '2026-02-16T05:23:36.380Z'
dateFolder: 2026/02/16
description: 'Islands, but make it fractal.'
isBasedOn: 'https://overreacted.io/rsc-for-astro-developers/'
link: 'https://overreacted.io/rsc-for-astro-developers/'
slug: 2026-02-16-httpsoverreactediorsc-for-astro-developers
tags:
  - code
title: RSC for Astro Developers
---
<p><a href="https://ko-fi.com/gaearon">Pay what you like</a></p>
<p>Okay, so in <a href="https://docs.astro.build/en/getting-started/">Astro</a> you have two things:</p>
<ul> <li><a href="https://docs.astro.build/en/basics/astro-components/">Astro Components:</a> They have the <code>.astro</code> extension. They execute exclusively on the server or during the build. In other words, their code is never shipped to the client. So they can do things that client code cannot do—read from the filesystem, hit the internal services, even read from a database. But they can’t do interactive things aside from whatever exists natively in the HTML or your own <code>&lt;script&gt;</code>. Astro Components can render either other Astro Components or Client Islands.</li> <li><a href="https://docs.astro.build/en/concepts/islands/">Client Islands:</a> Components written for React, Vue, and so on. This is your typical frontend stuff. That’s where it’s convenient to add the interactive bits. These Client Islands can then render other components for the same framework using that framework’s own mechanism. So, a React component can render another React component, as you would expect. But you can’t render an Astro Component from a Client Island. That wouldn’t make sense—by that point, Astro already ran.</li> </ul>
<p>Here’s a <code>PostPreview.astro</code> Astro Component rendering a <code>LikeButton</code> Island:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="astro" data-theme="Overnight"><code data-language="astro" data-theme="Overnight">---
import { readFile } from 'fs/promises';
import { LikeButton } from './LikeButton';
 
const { slug } = Astro.props;
const title = await readFile(`./posts/${slug}/title.txt`, 'utf8');
---
&lt;article&gt;
  &lt;h1&gt;{title}&lt;/h1&gt;
  &lt;LikeButton client:load /&gt;
&lt;/article&gt;</code></pre></figure>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight"><code data-language="js" data-theme="Overnight">import { useState } from 'react';
 
export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    &lt;button onClick={() =&gt; setLiked(!liked)}&gt;
      {liked ? '❤️' : '🤍'} Like
    &lt;/button&gt;
  );
}</code></pre></figure>
<p>Notice how Astro Components and Client Islands essentially live in two different “worlds”, and the data only ever flows down. Astro Components are where all the preprocessing happens; they “hand off” the interactive bits to the Client Islands.</p>
<p>Now let’s look at React Server Components (RSC).</p>
<p><strong>In RSC, the same two things are called <em>Server Components</em> and <em>Client Components</em>.</strong> Here is how you’d write the above Astro Component as a React Server Component:</p>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight"><code data-language="js" data-theme="Overnight">import { readFile } from 'fs/promises';
import { LikeButton } from './LikeButton';
 
async function PostPreview({ slug }) {
  const title = await readFile(`./posts/${slug}/title.txt`, 'utf8');
  return (
    &lt;article&gt;
      &lt;h1&gt;{title}&lt;/h1&gt;
      &lt;LikeButton /&gt;
    &lt;/article&gt;
  );
}</code></pre></figure>
<figure data-rehype-pretty-code-figure=""><pre data-language="js" data-theme="Overnight"><code data-language="js" data-theme="Overnight">'use client';
 
import { useState } from 'react';
 
export function LikeButton() {
  const [liked, setLiked] = useState(false);
 
  return (
    &lt;button onClick={() =&gt; setLiked(!liked)}&gt;
      {liked ? '❤️' : '🤍'} Like
    &lt;/button&gt;
  );
}</code></pre></figure>
<p>The mental model behind these two are remarkably similar! If you know Astro, you already have 80% of the mental model for React Server Components. (Even if you think React Server Components are a terrible idea, Astro is worth learning.)</p>
<p>Let’s note a few syntactic differences you might have noticed above:</p>
<ul> <li>Unlike Astro Components, React Server Components are regular JavaScript functions. They are not “single-file”. The props are coming from the function argument rather than from <code>Astro.props</code>, and there is no separate “template”.</li> <li>In Astro, the separation between Astro Components and Client Islands is achieved by writing the former as <code>.astro</code> files. Once you import a Client Island, you’re not in an <code>.astro</code> file anymore and thus you’re “leaving” the Astro world. In RSC, the same purpose is achieved by the <code>'use client'</code> directive. The <code>'use client'</code> directives marks where the Server world “ends”—<a href="https://overreacted.io/what-does-use-client-do/#two-worlds-two-doors">it is a door between the worlds.</a></li> <li>In Astro, there are directives like <code>client:load</code> that let you treat Islands either as static HTML or as hydratable on the client. React Server Components does not expose this distinction to the user code. From React’s perspective, if a component was written to be interactive, it would be a <em>mistake</em> to remove this interactivity. If a component truly does not <em>require</em> interactivity, just remove <code>'use client'</code> from it, and then importing it from the Server world would <em>already</em> keep it Server-only.</li> </ul>
<p>The last point is interesting. In Astro, the different syntax (<code>.astro</code> files vs Client Islands) creates a sharp and obvious visual distinction between the two worlds. The same component can’t act as both an Astro Component <em>and</em> a Client Island depending on the context—they’re two distinct things with distinct syntaxes.</p>
<p>But in RSC, the “Astro” part is also “just React”. So if you have a component that doesn’t use any client-specific <em>or</em> server-specific features, it could play either role.</p>
<p>Consider a <code>&lt;Markdown /&gt;</code> component that does its own parsing. Since it doesn’t use any client features (no State) or any server features (no reading DB), it could be imported on either side. So if you import it from a Server world, it’ll act like an “Astro Component”, but if you import it from a Client world, it’ll act like a “Client Island”. This isn’t some new concept, it’s just how importing functions works!</p>
<p>In RSC, stuff imported from the Server world will run in the Server world; stuff that’s imported from the Client world will run in the Client world; and stuff that’s not supported in either world (e.g. DB on the Client or <code>useState</code> on the Server) will cause a build error so you’ll be <em>forced</em> to “cut a door” with <code>'use client'</code>.</p>
<p>This is both a blessing and a curse.</p>
<p>It is a curse because it makes learning to wield RSC rather unintuitive. You keep worrying about “which world you’re in”. It takes practice to embrace that it <em>doesn’t matter</em> because you can always reason locally. You can use server features like DB in files that need them, use client features like State in files that need them, and rely on build-time assertions causing errors if something is wrong. Then you look at the module stack trace and decide where to “cut a new door” for your “islands”.</p>
<p>This <em>is</em> a curse, but it is also a blessing. By embracing React on both sides, the RSC model solves some Astro limitations that you might encounter along the way:</p>
<ul> <li>Sometimes, you might write a bunch of Astro Components and later realize that you’re gonna need to move that UI into Client Islands (tweaking the syntax along the way) or even duplicate it because some dynamic UI <em>also</em> wants to drive them. With RSC, you can extract the shared parts and import them from both sides. It is less important to think through “this part will mostly be dynamic” or “this part will mostly be static” for every piece of UI because you can always add or remove <code>'use client'</code> and/or move it up or down the import chain with little friction. You do decide where to “cut the door”, but there’s no “converting” back and forth.</li> <li>In Astro, you <em>can</em> nest Astro Components inside Client Islands, but if those include <em>more</em> Client Islands, they’ll still be seen as separate roots by your framework (e.g. React). This is why <em>nesting interactive behavior</em> doesn’t compose as naturally as in client apps, e.g. <a href="https://docs.astro.build/en/recipes/sharing-state-islands/">React or Vue context can’t be passed between Astro islands.</a> In RSC, this is not a problem—the entire UI is a single React tree under the hood. You can have a Client context provider above some Server subtree, and then a bunch of Client components reading that context anywhere below. RSC is <em>fractal</em> islands.</li> <li>Astro Components can ultimately produce only HTML. This is why clicking links on an Astro site requires the browser to fully reload the page. If that seems like acceptable UX for your use case, that’s great! You can <a href="https://docs.astro.build/en/guides/view-transitions/">improve it with manual logic and with View Transitions</a> but fundamentally, the page’s HTML <em>does</em> get replaced. If you want a SPA-like navigation that always keeps the state of the nav chrome, whether any React state or DOM state like inputs and scroll positions, then RSC can fill that gap. RSC <a href="https://overreacted.io/functional-html/#objects">uses a JSON-like</a> format for React trees—which can be <em>turned into</em> HTML (for the first paint) but also gets refetched as JSON on navigations. In other words, RSC lets you <em>think</em> in an <a href="https://docs.astro.build/en/concepts/why-astro/#server-first">MPA</a> mental model—but it <em>feels</em> like a SPA.</li> <li>This also means that unlike with Astro, the Server parts of RSC UI are <em>refreshable in-place</em>. If you do actually run a server (and not just running RSC during the build like I do for my blog), RSC lets you “refresh” the screen at any time to let the <em>fresh server props flow into your already existing stateful client-side tree</em>. For example, if some Astro Component needs to refresh in response to an interaction, you would have to choose between a full page refresh or moving logic to a Client Island. In RSC, you can just ask the fresh JSX from the server to get merged into the tree.</li> </ul>
<p>In Astro, the fundamental output format is HTML. Since frontend frameworks don’t fundamentally operate the HTML itself (they operate a stateful DOM that can be <em>initialized</em> with HTML), Astro follows a “one-time handoff” model. This makes it arguably easier to learn but limits server features to what the “first render” (to HTML) needs and mostly leaves you on your own with the interactive bits. As you make more things interactive, you might feel yourself running into Astro model’s limitations, possibly choosing to move more logic to SPA-like but isolated Islands.</p>
<p>In RSC, the fundamental output format is a React tree (which can be turned to HTML, but can also be (re)fetched as JSON). Since RSC uses React on both sides with no visual distinction between the two worlds, it is more challenging to learn to wield it. The upside is that once you get the hang of moving the boundaries, they become very fluid and solve the problem where you have to move code “into Astro” or “back into Islands” because something ended up more static or dynamic than expected. You also can retain the same “just map the data to UI” mental model whether the UI is read-only or needs to refetch in response to mutations. The Server parts grow deeper into the tree—<a href="https://overreacted.io/impossible-components/#a-sortable-list-of-previews">interleaved</a> with <em>their</em> Client parts.</p>
<p>And because it’s React on both sides, all React features are integrated end-to-end: for example, a <a href="https://react.dev/reference/react/Suspense"><code>&lt;Suspense&gt;</code></a> declarative loading state on the Client will “know” to wait for async data (from the Server), JS and CSS (as the Client loads them), fonts and images (with reasonable timeouts), and even trigger the View Transitions (see <a href="https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more#animating-suspense-boundaries">here</a>). In React, every feature is designed so that the Server and Client pieces are arbitrarily nestable, composable, and refreshable in-place. It’s a single tree. The downside is that buying into RSC means buying into React. RSC <em>is</em> full-stack React.</p>
<p>Finally, it is worth noting that Astro is a framework, but RSC itself is lower-level—think of it as a building block for a framework, or a standard that a framework can implement. The two officially supported implementations of RSC right now include <a href="https://nextjs.org/">Next.js App Router</a> (a framework) and <a href="https://parceljs.org/recipes/rsc/">Parcel RSC</a> (not a framework).</p>
<p>Personally, I think that the developer experience with RSC is still somewhat raw, but I also think you might want to learn it anyway. It has some interesting ideas.</p>
<p>Also, if you’ve never used Astro, give it a try! If RSC is giving you a hard time, Astro might offer a gentler onramp to the same ideas. And if you’ve only ever used client-side React, Astro might solve some problems you never realized you had.</p>
<p><a href="https://ko-fi.com/gaearon">Pay what you like</a></p>
<p><a href="https://bsky.app/search?q=https%3A%2F%2Foverreacted.io%2Frsc-for-astro-developers%2F">Discuss on Bluesky</a> · <a href="https://github.com/gaearon/overreacted.io/edit/main/public/rsc-for-astro-developers/index.md">Edit on GitHub</a></p>
