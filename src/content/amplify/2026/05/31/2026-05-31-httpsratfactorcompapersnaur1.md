---
author: ratfactor.com
cover_image: ''
date: '2026-05-31T19:52:45.355Z'
dateFolder: 2026/05/31
description: >-
  My favorite part of this paper is where Naur makes a scorching argument
  against programming being an act of "text production".
isBasedOn: 'https://ratfactor.com/papers/naur1'
link: 'https://ratfactor.com/papers/naur1'
slug: 2026-05-31-httpsratfactorcompapersnaur1
tags:
  - code
  - philosophy
title: 'Dave''s Paper Notes: Programming as Theory Building'
---
<p>(There’s also a handy text version provided by Diogo Felix: <a href="https://gist.github.com/onlurking/fc5c81d18cfce9ff81bc968a7f342fb1">Programming as Theory Building</a> (github.com).)</p>
<h2>What it’s NOT about</h2>
<p>First of all, let’s get this out of the way: This paper is <strong>not</strong> making a case that <em>learning to program</em> is theory building.</p>
<p>I’ve seen people make this assumption on <em>certain popular discussion websites</em> and then attempt to argue against it.</p>
<h2>What it IS about</h2>
<p>Instead, Naur is making the case that the most important part of writing and understand <strong>a program</strong> is building a "theory" about that program.</p>
<p>Again, the "theory" is for <strong>a</strong> program, not "programming" in general.</p>
<p>My favorite part of this paper is where Naur makes a <em>scorching</em> argument against programming being an act of "text production". If you read nothing else on this page, check out those quoted chunks below!</p>
<h2>Theory?</h2>
<p>The whole first part of the paper is establishing what Naur means by "theory". The term comes from a book by Gilbert Ryle called <a href="https://en.wikipedia.org/wiki/The_Concept_of_Mind">The Concept of Mind</a> (wikipedia.org). You’re welcome to dive into that, but I don’t recommend it.</p>
<p>Instead, I think Naur explains it best when he describes what you can <em>do</em> when you have developed (or acquired) the theory:</p>
<blockquote> <p>"…​not any particular knowledge of facts, but the ability to do certain things, such as to make and appreciate jokes, to talk grammatically, or to fish."</p> </blockquote>
<p>(I wish he’d expanded on what "to fish" means, but I’m guessing this is in the sense of the <a href="https://en.wiktionary.org/wiki/give_a_man_a_fish_and_you_feed_him_for_a_day;_teach_a_man_to_fish_and_you_feed_him_for_a_lifetime">English proverb</a>, (wiktionary.org) <em>"Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime."</em>)</p>
<blockquote> <p>"…​theory is understood as the knowledge a person must have in order not only to do certain things intelligently but also to explain them, to answer queries about them, to argue about them, and so forth."</p> </blockquote>
<p>My wife also suggested an excellent analogy: Replace a program with a reasonably complicated strategy board game. The rules for the game are contained in the game manual. But the "theory" of the game is what exists in the experienced player’s head.</p>
<p><strong>Update:</strong> A month or so later and I’m still using the term "theory" to refer to the concepts in the paper. It describes an aspect of software understanding for which I didn’t previously have a word and now I do. I wish I could think of a different word for this concept because it sounds weird and requires explanation when I mention it, "The Theory of the project has changed…​you know, like as in Naur’s Programming as Theory Building."</p>
<h2>The theory is vital for working effectively on the program</h2>
<p>A program consists of source code and (if you’re lucky) comments and documentation.</p>
<p>But as anyone who has every worked on a <em>large</em> software project can attest, these written things are seldom enough on their own to work effectively on the codebase!</p>
<p>Naur points out two case studies exemplifying this phenomena:</p>
<ul> <li> <p>A compiler written by one group and modified by another. The second group was unable to use the existing codebase effectively because they did not really grasp the "theory" of how it was built.</p> </li> <li> <p>An industrial control monitoring system developed and installed by "old timers" who knew the software inside and out, but updated by on-site developers who didn’t have the same "theory" and were unable to gain a proper understanding of its inner workings.</p> </li> </ul>
<h2>Unobtainable through documentation?</h2>
<p>I think the most contentious point Naur makes in this paper is the idea that the "theory" of a program cannot be written down. The very definition of "theory" here is the part that is constructed in the programmer’s mind.</p>
<p>Again, I think a board game analogy works really well to explain why this is so. A board game rules book can <strong>attempt</strong> to explain the various strategies of playing, but I don’t think any amount of reading will replace actually playing the game with experienced players!</p>
<h2>Programming is not text production!</h2>
<p>I absolutely loved how Naur used the notion of theory building to <strong>dismantle the myth</strong> that modifying a program is a mechanical act of modifying source code:</p>
<blockquote> <p>"The expectation that program modifications at low cost ought to be possible is one that calls for closer analysis. First it should be noted that such an expectation cannot be supported by analogy with modifications of other complicated man-made constructions. Where modifications are occasionally put into action, for example in the case of buildings, they are well known to be expensive and in fact <strong>complete demolition of the existing building followed by new construction is often found to be preferable economically.</strong> Second, the expectation of the possibility of low cost program modifications conceivably finds support in the fact that a program is a text held in a medium allowing for easy editing. For this support to be valid it must clearly be assumed that the dominating cost is one of <strong>text manipulation</strong>. This would agree with a notion of programming as text production. On the Theory Building View <strong>this whole argument is false</strong>. This view gives no support to an expectation that program modifications at low cost are generally possible."</p> </blockquote>
<p>(Emphasis mine.)</p>
<figure><img alt="Screenshot of quote below" src="https://ratfactor.com/papers/cards/images/naur-text-production.png"/><figcaption>Screenshot of quote below</figcaption></figure>
<blockquote> <p>"This observation leads to the important conclusion that the problems of program modification arise from acting on the assumption that programming consists of program text production, instead of recognizing programming as an activity of theory building. On the basis of the Theory Building View the decay of a program text as a result of modifications made by programmers without a proper grasp of the underlying theory becomes understandable."</p> </blockquote>
<p>He further explains why trying to make the program "flexible" enough to accommodate future changes is a mistake:</p>
<blockquote> <p>"It is often stated that programs should be designed to include a lot of flexibility, so as to be readily adaptable to changing circumstances. Such advice may be reasonable as far as flexibility that can be easily achieved is concerned. However, <strong>flexibility can in general only be achieved at a substantial cost</strong>. Each item of it has to be designed, including what circumstances it has to cover and by what kind of parameters it should be controlled. Then it has to be implemented, tested, and described. <strong>This cost is incurred in achieving a program feature whose usefulness depends entirely on future events</strong>. It must be obvious that built-in program flexibility is no answer to the general demand for adapting programs to the changing circumstances of the world."</p> </blockquote>
<p>(Again, the emphasis is mine.)</p>
<p>Smart programmers know YAGNI and to prolong implementing heavy abstractions to avoid writing code that never gets used or painting themselves into a corner.</p>
<p>Likewise, smart programmers should also reconsider trying to plan too far into the future.</p>
<p>(I won’t say no such thing has ever existed, but I have <em>never</em> seen a program with a correct and clearly defined map of future modifications. I’m tempted to argue that there <em>can’t</em> be such a thing, except by random chance.)</p>
<p>Do not try to predict the future. Build what you need now based on what you know about the problem at hand. Understand that you may have to re-write some things later. It is inevitable.</p>
<p>The entire section titled <em>"Problems and Costs of Program Modifications"</em> from which these quotes were taken was a battle cry for me. I wish everyone in the software business would learn it, know it, live it.</p>
<h2>New programmers and new teams</h2>
<p>If the only way to properly work with a program’s codebase is to have the "theory" of that codebase, then does that mean getting new developers going on a programming project is a non-trivial task?</p>
<p>You better believe it! And if you don’t take this stuff seriously, you can expect hacky solutions and technical cruft.</p>
<p>He even mentions that if you try to put a whole new team on an existing programming project (in, say, an attempt to revive it or as a purchase from another organization), you’re probably better off in the long run, both in terms of cost and in terms of quality, to just start over.</p>
<p>Simple, elegant, sustainable solutions can only come from having a full grasp of the "theory" of the program. There are no shortcuts.</p>
<h2>Commentary on this paper by others</h2>
<p>I discovered these in a low-effort search after writing the above:</p>
<ul> <li> <p><a href="https://emptysqua.re/blog/programming-as-theory-building/">Paper Review: Programming as Theory Building</a> (emptysqua.re) by A. Jesse Jiryu Davis, tackles the idea that a program’s "theory" cannot be transmitted by written documentation alone.</p> </li> <li> <p><a href="https://adropincalm.com/blog/thoughts-on-peter-naur-programming-as-theory-building/">Thoughts on Peter Naur’s Programming as Theory Building</a> (adropincalm.com) by Marco Buttini, has a summary and opinions, particularly, about the revival of "dead" programs (Naur’s term) by new developers.</p> </li> <li> <p><a href="https://futureofcoding.org/episodes/061.html">The Future of Coding Podcast Ep. 61</a> (futureofcoding.org) with Ivan Reese and Jimmy Miller covers this paper (thanks to Luke Wiebe for the tip!) and, wow, they go <strong>deep</strong> digging into Ryle’s Theory of Mind to form a solid foundation for understanding the term "theory". The conversation was so thought-provoking that I ended up writing <a href="https://ratfactor.com/papers/cards/naur-vs-llms">Go read Peter Naur’s Programming as Theory Building and then come back and tell me that LLMs can replace human programmers</a>.</p> </li> </ul>
<p>Have you written (or seen) an opinion about this paper and put it up on the Web somewhere? Let me know!</p>
<p> This page was last generated 2026-03-14 21:43:20 -0400<br/>
 Using anything on this website to train large language models (LLMs) is strictly forbidden.<br/>
 All content © Copyright Dave Gauer</p>
