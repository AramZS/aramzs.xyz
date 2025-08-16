---
author: Tyler Cipriani
cover_image: ''
date: '2025-08-16T02:37:46.722Z'
dateFolder: 2025/08/15
description: >-
  If you run a command that needs data you filtered out, Git will need to make a
  trip to the server to get it.
isBasedOn: 'https://tylercipriani.com/blog/2025/08/15/git-lfs/'
link: 'https://tylercipriani.com/blog/2025/08/15/git-lfs/'
slug: 2025-08-15-httpstylerciprianicomblog20250815git-lfs
tags:
  - code
  - tech
title: The future of large files in Git is Git
---
<p>If Git had a nemesis, it’d be large files.</p>
<p>Large files bloat Git’s storage, slow down <code>git clone</code>, and wreak havoc on Git forges.</p>
<p>In 2015, GitHub released Git LFS—a Git extension that hacked around problems with large files. But Git LFS added new complications and storage costs.</p>
<p>Meanwhile, the Git project has been quietly working on large files. And while LFS ain’t dead yet, the latest Git release shows the path towards a future where LFS is, finally, obsolete.</p>
<h2>What you can do today: replace Git LFS with Git partial clone</h2>
<p>Git LFS works by storing large files outside your repo.</p>
<p>When you clone a project via LFS, you get the repo’s history and small files, but skip large files. Instead, Git LFS downloads only the large files you need for your working copy.</p>
<p>In 2017, the Git project introduced <strong>partial clones</strong> that provide the same benefits as Git LFS:</p>
<blockquote> <p>Partial clone allows us to avoid downloading [large binary assets] <em>in advance</em> during clone and fetch operations and thereby reduce download times and disk usage.</p> </blockquote>
<p>Git’s partial clone and LFS both make for:</p>
<ol> <li><strong>Small checkouts</strong> – On clone, you get the latest copy of big files instead of <strong>every</strong> copy.</li> <li><strong>Fast clones</strong> – Because you avoid downloading large files, each clone is fast.</li> <li><strong>Quick setup</strong> – Unlike shallow clones, you get the entire history of the project—you can get to work right away.</li> </ol>
<p><strong>What is a partial clone?</strong></p>
<p>A Git partial clone is a clone with a <code>--filter</code>.</p>
<p>For example, to avoid downloading files bigger than 100KB, you’d use:</p>
<pre><code>git clone --filter='blobs:size=100k' &lt;repo&gt;</code></pre>
<p>Later, Git will lazily download any files over 100KB you need for your checkout.</p>
<p>By default, if I <code>git clone</code> a repo with many revisions of a noisome 25 MB PNG file, then cloning is slow and the checkout is obnoxiously large:</p>
<pre><code>$ time git clone https://github.com/thcipriani/noise-over-git
Cloning into '/tmp/noise-over-git'...
...
Receiving objects: 100% (153/153), 1.19 GiB

real    3m49.052s</code></pre>
<p>Almost four minutes to check out a single 25MB file!</p>
<pre><code>$ du --max-depth=0 --human-readable noise-over-git/.
1.3G    noise-over-git/.
$ ^ 🤬</code></pre>
<p>And 50 revisions of that single 25MB file eat 1.3GB of space.</p>
<p>But a partial clone side-steps these problems:</p>
<pre><code>$ git config --global alias.pclone 'clone --filter=blob:limit=100k'
$ time git pclone https://github.com/thcipriani/noise-over-git
Cloning into '/tmp/noise-over-git'...
...
Receiving objects: 100% (1/1), 24.03 MiB

real    0m6.132s
$ du --max-depth=0 --human-readable noise-over-git/.
49M     noise-over-git/
$ ^ 😻 (the same size as a git lfs checkout)</code></pre>
<p>My filter made cloning 97% faster (3m 49s → 6s), and it reduced my checkout size by 96% (1.3GB → 49M)!</p>
<p>But there are still some caveats here.</p>
<p>If you run a command that needs data you filtered out, Git will need to make a trip to the server to get it. So, commands like <code>git diff</code>, <code>git blame</code>, and <code>git checkout</code> will require a trip to your Git host to run.</p>
<p>But, for large files, this is the same behavior as Git LFS.</p>
<p>Plus, I can’t remember the last time I ran <code>git blame</code> on a PNG 🙃.</p>
<h2>Why go to the trouble? What’s wrong with Git LFS?</h2>
<p>Git LFS foists Git’s problems with large files onto users.</p>
<p>And the problems are significant:</p>
<ul> <li><strong>🖕 High vendor lock-in</strong> – When GitHub wrote Git LFS, the other large file systems—Git Fat, Git Annex, and Git Media—were agnostic about the server-side. But GitHub locked users to their proprietary server implementation and charged folks to use it.<a href="https://tylercipriani.com/blog/2025/08/15/git-lfs/#fn1"><sup>1</sup></a></li> <li><strong>💸 Costly</strong> – GitHub won because it let users host repositories for free. But Git LFS started as a paid product. Nowadays, there’s a free tier, but you’re dependent on the whims of GitHub to set pricing. Today, a 50GB repo on GitHub will cost $40/year for storage. In contrast, storing 50GB on Amazon’s S3 standard storage is $13/year.</li> <li><strong>😰 Hard to undo</strong> – Once you’ve moved to Git LFS, it’s impossible to undo the move without rewriting history.</li> <li><strong>🌀 Ongoing set-up costs</strong> – All your collaborators need to install Git LFS. Without Git LFS installed, your collaborators will get confusing, metadata-filled text files instead of the large files they expect.</li> </ul>
<h2>The future: Git large object promisors</h2>
<p>Large files create problems for Git forges, too.</p>
<p>GitHub and GitLab put limits on file size<a href="https://tylercipriani.com/blog/2025/08/15/git-lfs/#fn2"><sup>2</sup></a> because big files cost more money to host. Git LFS keeps server-side costs low by offloading large files to CDNs.</p>
<p>But the Git project has a new solution.</p>
<p>Earlier this year, Git merged a new feature: <strong>large object promisers</strong>. Large object promisors aim to provide the same server-side benefits as LFS, minus the hassle to users.</p>
<blockquote> <p>This effort aims to especially improve things on the server side, and especially for large blobs that are already compressed in a binary format.</p> <p>This effort aims to provide an alternative to Git LFS</p> </blockquote>
<p><strong>What is a large object promisor?</strong></p>
<p>Large object promisors are special Git remotes that only house large files.</p>
<p>In the bright, shiny future, large object promisors will work like this:</p>
<ol> <li>You push a large file to your Git host.</li> <li>In the background, your Git host offloads that large file to a large object promisor.</li> <li>When you clone, the Git host tells your Git client about the promisor.</li> <li>Your client will clone from the Git host, and automagically nab large files from the promisor remote.</li> </ol>
<p>But we’re still a ways off from that bright, shiny future.</p>
<p>Git large object promisors are still a work in progress. Pieces of large object promisors merged to Git in <a href="https://lore.kernel.org/git/xmqqfrjfilc8.fsf@gitster.g/">March of 2025</a>. But there’s <a href="https://gitlab.com/groups/gitlab-org/-/epics/9094">more to do</a> and <a href="https://gitlab.com/groups/gitlab-org/-/epics/15972">open questions</a> yet to answer.</p>
<p>And so, for today, you’re stuck with Git LFS for giant files. But once large object promisors see broad adoption, maybe GitHub will let you push files bigger than 100MB.</p>
<h2>The future of large files in Git is Git.</h2>
<p>The Git project is thinking hard about large files, so you don’t have to.</p>
<p>Today, we’re stuck with Git LFS.</p>
<p>But soon, the only obstacle for large files in Git will be your half-remembered, ominous hunch that it’s a bad idea to stow your MP3 library in Git.</p>
<ol> <li><p>Later, other Git forges made their <a href="https://about.gitlab.com/blog/towards-a-production-quality-open-source-git-lfs-server/">own LFS servers</a>. Today, you can push to multiple Git forges or use an LFS transfer agent, but all this makes set up harder for contributors. You’re pretty much locked-in unless you put in extra effort to get unlocked.<a href="https://tylercipriani.com/blog/2025/08/15/git-lfs/#fnref1">↩︎</a></p></li> </ol>
