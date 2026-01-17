---
author: embedding-shapes.github.io
cover_image: ''
date: '2026-01-16T23:21:18.256Z'
dateFolder: 2026/01/16
description: >-
  To test this system, we pointed it at an ambitious goal: building a web
  browser from scratch. The agents ran for close to a week, writing over 1
  million lines of code across 1,000 files.
isBasedOn: 'https://embedding-shapes.github.io/cursor-implied-success-without-evidence/'
link: 'https://embedding-shapes.github.io/cursor-implied-success-without-evidence/'
slug: >-
  2026-01-16-httpsembedding-shapesgithubiocursor-implied-success-without-evidence
tags:
  - ai
title: Cursor's latest "browser experiment" implied success without evidence
---
<p>On January 14th 2026, Cursor published a blog post titled "Scaling long-running autonomous coding" (<a href="https://cursor.com/blog/scaling-agents">https://cursor.com/blog/scaling-agents</a>)</p>
<p>In the blog post, they talk about their experiments with running "coding agents autonomously for weeks" with the explicit goal of</p>
<blockquote> <p>understand[ing] how far we can push the frontier of agentic coding for projects that typically take human teams months to complete</p> </blockquote>
<p>They talk about some approaches they tried, why they think those failed, and how to address the difficulties.</p>
<p>Finally they arrived at a point where something "solved most of our coordination problems and let us scale to very large projects without any single agent", which then led to this:</p>
<blockquote> <p>To test this system, we pointed it at an ambitious goal: building a web browser from scratch. The agents ran for close to a week, writing over 1 million lines of code across 1,000 files. You can explore the source code on GitHub (<a href="https://github.com/wilsonzlin/fastrender">https://github.com/wilsonzlin/fastrender</a>)</p> </blockquote>
<p>This is where things get a bit murky and unclear. They claim "Despite the codebase size, new agents can still understand it and make meaningful progress" and "Hundreds of workers run concurrently, pushing to the same branch with minimal conflicts", but they never actually say if this is successful or not, is it actually working? Can you run this browser yourself? We don't know and they never say explicitly.</p>
<p>After this, they embed the following video:</p>
<figure><video controls="" src="https://embedding-shapes.github.io/content/cursor-screenshots.webm"><a href="https://embedding-shapes.github.io/content/cursor-screenshots.webm">Video</a></video></figure>
<p>And below it, they say "While it might seem like a simple screenshot, building a browser from scratch is extremely difficult.".</p>
<h3>They never actually claim this browser is working and functional</h3>
<blockquote> <p>error: could not compile 'fastrender' (lib) due to 34 previous errors; 94 warnings emitted</p> </blockquote>
<p>And if you try to compile it yourself, you'll see that it's very far away from being a functional browser at all, and seemingly, it never actually was able to build.</p>
<p>Multiple recent GitHub Actions runs on <code>main</code> show failures (including workflow-file errors), and independent build attempts report dozens of compiler errors, recent PRs were all merged with failing CI, and going back in the Git history from most recent commit back 100 commits,<br/>
<a href="https://gist.github.com/embedding-shapes/f5d096dd10be44ff82b6e5ccdaf00b29">I couldn't find a single commit that compiled cleanly</a>.</p>
<p>I'm not sure what the "agents" they unleashed on this codebase actually did, but they seemingly never ran "cargo build" or even less "cargo check", because both of those commands surface 10s of errors (which surely would balloon should we solve them) and about 100 warnings. There is an open GitHub issue in their repository about this right now: <a href="https://github.com/wilsonzlin/fastrender/issues/98">https://github.com/wilsonzlin/fastrender/issues/98</a></p>
<p>And diving into the codebase, if the compilation errors didn't make that clear already, makes it very clear to any software developer that none of this is actually engineered code. It is what is typically known as "AI slop", low quality <em>something</em> that surely represents <em>something</em>, but it doesn't have intention behind it, and it doesn't even compile at this point.</p>
<p>They later start to talk about what's next, but not a single word about how to run it, what to expect, how it's working or anything else. Cursor's blog post provides no reproducible demo and no known-good revision (tag/release/commit) to verify the screenshots, beyond linking the repo.</p>
<p>Regardless of intent, Cursor's blog post creates the impression of a functioning prototype while leaving out the basic reproducibility markers one would expect from such claim. They never explicitly claim it's actually working, so no one can say they lied at least.</p>
<p>They finish off the article saying:</p>
<blockquote> <p>But the core question, can we scale autonomous coding by throwing more agents at a problem, has a more optimistic answer than we expected.</p> </blockquote>
<p>Which seems like a really strange conclusion to arrive at, when all they've proved so far, is that agents can output millions of tokens and still not end up with something that actually works.</p>
<p>A "browser experiment" doesn't need to rival Chrome. A reasonable minimum bar is: it compiles on a supported toolchain and can render a trivial HTML file. Cursor's post doesn’t demonstrate that bar, and current public build attempts fail at this too.</p>
<h2>Conclusion</h2>
<p>Cursor never says "this browser is production-ready", but they do frame it as "building a web browser from scratch" and "meaningful progress" and then use a screenshot and "extremely difficult" language, wanting to give the impression that this experiment actually was a success.</p>
<p>The closest they get to implying that this was a success, is this part:</p>
<blockquote> <p>Hundreds of agents can work together on a single codebase for weeks, making real progress on ambitious projects.</p> </blockquote>
<p>But this extraordinary claim isn't backed up by any evidence. In the blog post they never provide a working commit, build instructions or even a demo that can be reproduced.</p>
<p>I don't think anyone expects this browser to be the next Chrome, but I do think that if you claim you've built a browser, it should at least be able to demonstrate being able to be compiled + loading a basic HTML file at the very least.</p>
