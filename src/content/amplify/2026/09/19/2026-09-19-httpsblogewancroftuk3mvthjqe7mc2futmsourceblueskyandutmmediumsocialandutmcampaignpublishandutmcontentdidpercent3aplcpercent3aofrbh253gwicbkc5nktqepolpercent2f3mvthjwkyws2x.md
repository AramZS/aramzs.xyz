---
author: Ewan’s Blog
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Aofrbh253gwicbkc5nktqepol/3m3x4bgbsh22k/3mvthjqe7mc2f/opengraph-image-1qv6ug?c1d2f6c379aabdcf
date: '2026-09-19T14:30:15.041Z'
dateFolder: 2026/09/19
description: >-
  if an LLM wrote a significant amount of the implementation, apparently the
  human directing it no longer counts.
isBasedOn: >-
  https://blog.ewancroft.uk/3mvthjqe7mc2f?utm_source=bluesky&utm_medium=social&utm_campaign=publish&utm_content=did%3Aplc%3Aofrbh253gwicbkc5nktqepol%2F3mvthjwkyws2x
link: >-
  https://blog.ewancroft.uk/3mvthjqe7mc2f?utm_source=bluesky&utm_medium=social&utm_campaign=publish&utm_content=did%3Aplc%3Aofrbh253gwicbkc5nktqepol%2F3mvthjwkyws2x
slug: >-
  2026-09-19-httpsblogewancroftuk3mvthjqe7mc2futmsourceblueskyandutmmediumsocialandutmcampaignpublishandutmcontentdidpercent3aplcpercent3aofrbh253gwicbkc5nktqepolpercent2f3mvthjwkyws2x
tags:
  - ai
  - code
  - tech
title: I Still Built It
---
<p>if an LLM wrote a significant amount of the implementation, apparently the human directing it no longer counts.</p>
<p>I have been thinking a lot lately about what it actually means for something to be my work, mostly because I keep seeing the same argument around AI-assisted programming: if an LLM wrote a significant amount of the implementation, apparently the human directing it no longer counts.</p>
<p>I look at my <a href="https://github.com/ewanc26">GitHub profile</a>⁠ and see 13,843 contributions in the last year. At a glance, that looks like the activity graph of somebody who spends every waking hour hunched over an editor. The reality is rather less glamorous. I am chronically ill, my sleep schedule is erratic, I regularly have days where I can barely keep myself awake, and I had my fourth brain surgery in April. I can sleep for ten and a half hours and still wake up feeling weak enough that going straight back to bed sounds entirely reasonable.</p>
<p>At the same time, I build a frankly stupid amount of software. Those things are not contradictory, and neither is the fact that I use coding agents extensively.</p>
<p>I am not going to pretend otherwise because that would be ridiculous. A substantial amount of implementation work across my projects is now performed with LLM coding agents. I give them tasks, have them investigate bugs, implement features, write and update tests, inspect failing CI, reconcile branches, refactor code and work through GitHub issues. Sometimes an agent can produce more implementation in an hour than I physically could in an entire day.</p>
<p>Good. That is useful to me.</p>
<p>What I reject is the idea that this somehow means I am no longer doing software engineering. Software development has never been defined by manually pressing every key involved in producing the final executable. I do not manually translate C into machine code; I use a compiler. I do not manually rerun every test after every commit; CI does that. I use formatters, language servers, package managers, build systems, debuggers, static analysers, code generators and a fairly absurd amount of automation already.</p>
<p>Coding agents are another layer of automation. They are obviously far more capable than a formatter or a build script, and they come with a much larger pile of technical and ethical baggage, but delegating implementation does not make me disappear from the project.</p>
<p>An agent did not wake up one morning and decide that <a href="https://github.com/ewanc26/wolfram">Wolfram</a>⁠ should exist. I did. I decided I wanted a C/C++ AT Protocol SDK centred around C23, with a deliberately constrained use of C++, a C ABI, XRPC, identity resolution, repository operations, OAuth, moderation, subscriptions and whatever other part of the increasingly large AT Protocol surface I decide to inflict on myself next.</p>
<p>The same applies to <a href="https://github.com/ewanc26/metalbear">MetalBear</a>⁠. An agent did not spontaneously decide that the world needed a C23 AT Protocol PDS built on Wolfram, capable of hosting multiple accounts, maintaining signed repositories, issuing identities, serving a firehose and federating with the wider network. I decided that sounded interesting, designed the thing and kept pushing it in that direction.</p>
<p>The same is true of <a href="https://github.com/ewanc26/plainspeak">PlainSpeak</a>⁠, <a href="https://github.com/ewanc26/inkwell">Inkwell</a>⁠, <a href="https://github.com/ewanc26/atperson">atperson</a>⁠, <a href="https://github.com/ewanc26/pixel-society">Pixel Society</a>⁠, the stuff in <a href="https://github.com/ewanc26/pkgs">pkgs</a>⁠, and the rest of the pile. They exist because I wanted them to exist. I chose the constraints, the architecture and the general direction, and I decide what belongs, what gets rewritten and what gets deleted.</p>
<p>That is still my work.</p>
<p>There is another distinction that gets lost very quickly whenever people talk about AI-assisted programming: I can still read and understand the code.</p>
<p>I am not throwing vague prompts at a model, watching a repository fill up with files, seeing a green tick on GitHub Actions and deciding that whatever happened must therefore be correct. I read diffs. I follow control flow. I understand the languages and systems I am working with well enough to question what the agent has done, recognise when an abstraction is going in the wrong direction and explain why I want an implementation changed.</p>
<p>When an agent writes C for Wolfram or MetalBear, I can read the C. When it changes compiler code in PlainSpeak, I can follow what it did. When it touches Swift, Kotlin, TypeScript, Rust, C++ or whatever else I have decided to scatter across my repositories, I am not treating the result as some opaque magic object that happens to compile.</p>
<p>There is an enormous difference between “the agent wrote this, I reviewed it, understood it and accepted it” and “the agent says it works, so I suppose it works”.</p>
<p>I am doing the former.</p>
<p>Delegating implementation is not the same thing as delegating comprehension. I still need to know enough to tell when something is wrong, and I still need to understand the software I am putting my name on.</p>
<p>That does not mean I catch everything. Nobody does. People miss bugs in code they personally wrote ten minutes ago, let alone in a large patch somebody else wrote. That is one of the reasons I deliberately test things.</p>
<p>Unit tests are not decoration in my repositories. They are not there because they make a project look serious, and they are not something I bolt on after an implementation already appears to work.</p>
<p>I want behaviour written down in a form that can actually be checked.</p>
<p>If I ask an agent to alter parser semantics in PlainSpeak, touch persistence in MetalBear, change protocol handling in Wolfram or fix some irritating platform behaviour in Inkwell, “it looks plausible” is not a good enough definition of done. I want unit tests where unit tests make sense, regression tests for bugs, integration tests where multiple layers interact, and CI running all of it again when somebody touches the same code later.</p>
<p>I often explicitly tell agents to add or update tests as part of the implementation. That matters even more with generated code because LLMs are extremely good at producing code that looks convincing. Something can be neatly structured, compile perfectly and still be subtly wrong.</p>
<p>A repeatable test suite gives me another barrier between “this seems fine” and “I am willing to put my name on this”. Tests do not prove that software is perfect, obviously. Tests can be badly written, incomplete or based on the wrong assumptions. A model can even write a test that passes beautifully while proving absolutely nothing useful.</p>
<p>That is why the tests also get reviewed.</p>
<p>This is not some mystical new AI development process. It is software engineering with another tool in the loop.</p>
<p>This is probably the part that annoys me most about the idea that using coding agents means I do not care about what I am building.</p>
<p>I care a lot.</p>
<p>I strongly believe in making good software for the people using it, even if the only person using it is me. I do not want to ship something barely functional, shrug because it technically works and move on to the next repository. I want the interface to make sense, people’s data not to get mangled, authentication to be handled carefully, untrusted network input to actually be treated as untrusted, the documentation to explain things properly and bugs to be fixed rather than quietly worked around.</p>
<p><a href="https://github.com/ewanc26/inkwell">Inkwell</a>⁠ is probably the clearest example. The current public release is 2.6.1, and the repository currently has 78 open issues.</p>
<p>A large reason there are 78 issues is that I deliberately used AI to research Inkwell and find everything I might have missed.</p>
<p>I wanted it to go through the project critically. Not “invent some cool features so the roadmap looks impressive”, but inspect what already existed, compare it against platform guidance, AT Protocol and <a href="http://standard.site/">Standard.site</a> expectations, security practices, accessibility, testing gaps and the behaviour I actually wanted. I wanted it to be picky. I wanted it to find uncomfortable things.</p>
<p>Then I turned those findings into GitHub issues so they would not disappear into some chat history and get forgotten.</p>
<p>That is one of the uses of AI I genuinely value. I am one person. I can know a codebase extremely well and still miss things. I can overlook an edge case because I have stared at the same implementation for months, forget that some platform API has been deprecated, fail to think through a particular failure mode or simply never ask the exact question that exposes a weak assumption.</p>
<p>Why would I not use another tool to look for those blind spots?</p>
<p>The point was not to make the issue count bigger. The point was to make the list of things I had failed to notice smaller.</p>
<p>Those issues include obvious user-facing improvements, but also a large amount of work that most users should ideally never notice: network hardening, OAuth storage, rate limiting, malicious or oversized input, safer link handling, release integrity, provenance, test isolation and other deeply unglamorous things that make software less likely to bite somebody later.</p>
<p>Nobody is going to open Inkwell one morning and think, bloody hell, what a lovely bounded JSON nesting depth.</p>
<p>Good. They should never need to.</p>
<p>I also actually use the things I make.</p>
<p>Inkwell is not some application I throw builds of over the wall and then forget about until somebody opens an issue. I dogfood it constantly. I read with it, write with it, sign in and out of it, update it, break it, notice things that annoy me and add them to the pile.</p>
<p>There is a massive difference between something technically working and something being pleasant to live with. A button functioning does not necessarily mean its placement is good. A network request succeeding most of the time does not mean the failure state is acceptable. A feature can pass every automated test and still be awkward, confusing or just slightly irritating in a way that only becomes obvious after you have used it fifty times.</p>
<p>Dogfooding catches a lot of that, but it cannot catch everything. Obviously it cannot.</p>
<p>I am one person using the software in one particular way, on particular devices, with particular habits and expectations. I also know the codebase, which means I am uniquely capable of unconsciously working around something that would confuse somebody seeing the app for the first time.</p>
<p>That is one of the reasons I love open-source programming.</p>
<p>Other people can look.</p>
<p>They can run the code in environments I do not have. They can use features in ways I never expected. They can find accessibility problems that do not affect me personally, network behaviour that only appears under different conditions, protocol edge cases I have never encountered, or simply tell me that something I thought was intuitive absolutely is not.</p>
<p>I do not see somebody finding a bug in my software as humiliating proof that I failed. Obviously I missed something. Every developer misses things. What matters is what happens after it is found.</p>
<p>Someone can report it. Someone can inspect the implementation. Someone can suggest a better approach. Someone can send a patch. I can explain why something works the way it does, realise my reasoning was wrong and change it.</p>
<p>That combination is what I like: I dogfood the software myself, automated tests catch known behaviour, AI can help audit for blind spots, and open source lets other humans find the things none of those layers caught.</p>
<p>An empty issue tracker is not proof of perfect software.</p>
<p>Sometimes it just means nobody looked hard enough.</p>
<p>This is also why I do not look at 78 open issues and think Inkwell must therefore be rubbish.</p>
<p>Version 2.6.1 is the version I am willing to release now. It is not me declaring that I have discovered the final, perfect form of Inkwell. I do not think that version will ever exist.</p>
<p>Those 78 issues are partly me documenting the distance between what exists now and what I know could be better.</p>
<p>Some are bugs. Some are technical debt. Some are security hardening. Some are tests I think should exist. Some are platform-parity work. Some are release engineering. Some are accessibility. Some are future features. Some are simply me looking at code that currently works and deciding that I still do not like the way it works.</p>
<p>I would much rather have a large, honest issue tracker than maintain the fiction that there is nothing left to improve.</p>
<p>Using AI to help uncover those gaps is not me outsourcing my standards. It is me using another tool to enforce them more aggressively.</p>
<p>Part of why I care about all of this is fairly selfish: I am building a reputation.</p>
<p>Every release, bug fix, issue response, bit of documentation, test and design decision contributes to what people think when they see my name attached to a project. I want somebody who has used one of my projects before to see another one and think, okay, he probably cares about this one too.</p>
<p>Reputation compounds. So does a bad one.</p>
<p>If somebody eventually wants to hire me because they have looked through my work, that matters. If somebody recommends one of my libraries to somebody else, that matters. If somebody trusts Inkwell with their account because my previous work gave them confidence that I am not completely careless, that matters.</p>
<p>If somebody gives me money because something I built is useful and they want me to keep going, that matters too. I want to feel that I earned that support by making things worth supporting.</p>
<p>And yes, disability makes me particularly aware of perception.</p>
<p>I should not have to produce an absurd amount of work to prove that a disabled person can be competent, and disabled people should not be expected to compensate for prejudice by being impossibly productive. But I would also be lying if I said I was unaware of how quickly fatigue, irregular hours, needing accommodations or relying on automation can be translated into assumptions about laziness or inability.</p>
<p>I cannot control every assumption somebody makes about me.</p>
<p>I can control what they find when they actually look at my work.</p>
<p>I want them to see deliberate architecture, tests, CI, documentation, release processes and issue trackers full of evidence that I actually give a shit about what I am making.</p>
<p>There is also a boundary here that people occasionally get weird about once money becomes involved.</p>
<p>Programming is, ostensibly, a hobby for me. It is a hobby that occasionally pays me through <a href="https://ko-fi.com/ewancroft">Ko-fi</a>⁠, <a href="https://github.com/sponsors/ewanc26">GitHub Sponsors</a>⁠, commissions and whatever else comes along.</p>
<p>Those are not all the same relationship.</p>
<p>If you donate to me or sponsor me, you are supporting work I have already chosen to do. You have not purchased a block of my time. You have not become my manager. You do not get to assign me tickets, dictate my roadmap, impose deadlines or decide that your preferred feature suddenly outranks everything else because money changed hands.</p>
<p>I am grateful for support. I want the software I make to be good enough that people feel I have earned it.</p>
<p>That does not mean a £5 Ko-fi donation is secretly an employment contract.</p>
<p>If you have actually bought a commission from me, that is different.</p>
<p>Then we have a client-developer relationship. You have paid me to produce something specific, and within the agreed scope, yes, you get to direct that work. You can tell me what you want, ask for changes, clarify requirements and expect me to deliver what we agreed on.</p>
<p>That still does not give you unlimited control over everything I do.</p>
<p>You commissioned that work, not my life.</p>
<p>Employment is different again.</p>
<p>If I am employed by you, then yes, you can boss me around within the scope of the job. You are explicitly paying for my working time and directing how that time is used. That is the arrangement.</p>
<p>Most of the programming I do is still mine, though. I do it because I enjoy it, because I want the software to exist and because apparently I am incapable of looking at an interesting technical problem without eventually opening another repository.</p>
<p>Sometimes that hobby happens to pay me.</p>
<p>That does not make everybody who gives me money my boss.</p>
<p>Open-source maintainers in general seem to be expected to tolerate a bizarre amount of entitlement.</p>
<p>Someone discovers your project, pays absolutely nothing, opens an issue and occasionally behaves as though the issue number itself created a service-level agreement.</p>
<p>I like feedback. I want bug reports. I want people to tell me when something is broken, awkward, inaccessible or missing something useful. I want users involved enough to care.</p>
<p>But a feature request is still a request.</p>
<p>I can read one, think it is an excellent idea and implement it immediately. I can also read one, completely understand why somebody wants it and decide it does not fit the project. Both are normal outcomes.</p>
<p>My time remains mine until I explicitly agree otherwise.</p>
<p>That matters even more because my capacity is not reliable. If I wake up feeling completely flattened after ten hours of sleep, somebody sponsoring me does not magically create another four hours of physical energy.</p>
<p>Money can make open-source work more sustainable.</p>
<p>It cannot turn chronic illness into an infinite labour supply.</p>
<p>None of this means I subscribe to the “AI is amazing and everybody criticising it is a Luddite” school of thought.</p>
<p>A lot of the criticism is legitimate.</p>
<p>There are serious questions around how training datasets were assembled, whether creators meaningfully consented to their work being used, how copyright should apply, what happens to workers when companies see automation primarily as an excuse to reduce headcount, and how much power is becoming concentrated inside a handful of enormous technology companies.</p>
<p>There is also an enormous amount of generated rubbish being pumped onto the internet because the marginal cost of producing another page, image, article, video or repository has collapsed.</p>
<p>That part genuinely bothers me.</p>
<p>Not everything needs more content. The internet does not need to be filled to the ceiling with things that exist solely because somebody could press a button and create another one.</p>
<p>The reliability problem is real too. LLMs hallucinate. They misunderstand requirements. They invent APIs. They can weaken validation, quietly introduce security issues or produce tests that technically pass while proving absolutely nothing useful.</p>
<p>I use these tools constantly and I still think they should be treated sceptically.</p>
<p>The Environmental Argument Is Real Too</p>
<p>AI also consumes resources.</p>
<p>Data centres require electricity. Cooling requires infrastructure and often water. Semiconductor manufacturing has its own environmental cost. Accelerators have to be fabricated, shipped, installed and eventually replaced.</p>
<p>The workload I create with coding agents is not trivial either. Asking an agent to inspect a repository, read dozens of files, reason about an issue, modify several parts of the codebase, run tests, inspect failures, revise the patch and repeat is obviously a different computational workload from asking a chatbot one short factual question.</p>
<p>I am not going to pretend otherwise simply because the technology is useful to me.</p>
<p>Efficiency improvements help, but greater efficiency does not necessarily mean lower total consumption when usage is growing even faster. I want cleaner energy, better hardware efficiency, more transparent reporting and considerably less hand-waving from the companies building this infrastructure.</p>
<p>“I benefit from this” is not an argument that the cost does not exist.</p>
<p>There is also a hypothetical defence of my AI use that I dislike:</p>
<p>Well, you’re chronically ill, so it’s okay for you.</p>
<p>No.</p>
<p>My health absolutely changes how useful coding agents are to me. There are days where I can still think clearly enough to understand a bug, describe a solution, inspect a diff and make technical decisions, but I do not physically have several hours of sustained implementation in me.</p>
<p>An agent can bridge part of that gap. That is genuinely useful accessibility.</p>
<p>But my disability does not make the environmental cost disappear. It does not settle arguments around training data. It does not make somebody worried about their job being automated suddenly wrong.</p>
<p>It also does not mean disabled people should have to produce a sufficiently tragic medical history before we are granted permission to use automation. I should not have to explain four brain surgeries before somebody decides whether my use of a tool is morally acceptable.</p>
<p>My disability explains why this technology is particularly useful to me.</p>
<p>It does not magically answer every ethical question surrounding the technology.</p>
<p>This is probably where my view diverges most sharply from the increasingly common “generate everything” mentality.</p>
<p>I personally hate the idea of using AI to replace passionate creative hobbies purely so there is more content to publish.</p>
<p>I say that as a poet. I have an anthology of more than 180 poems that has been growing for nearly seven years. Some of them are good. Some were written by much younger versions of me and I would write them completely differently now.</p>
<p>That is part of why I keep them.</p>
<p>The anthology is not just a pile of text. It is a record of me changing. My vocabulary changed. My rhythm changed. My beliefs changed. The things I was frightened of changed. The things I cared about changed. There are poems I wrote as a teenager that I could not write in quite the same way at 21 because I am no longer the person who wrote them.</p>
<p>That history is part of the art.</p>
<p>If I fed all 180+ poems into a model and told it to produce another fifty in my style, I could inflate the anthology very quickly. Some of them might even look technically better than things I wrote years ago.</p>
<p>I would not suddenly have fifty more poems.</p>
<p>I would have fifty husks.</p>
<p>They might have the shape of my writing. They might repeat imagery I use. They might imitate my vocabulary. They would not contain another fifty experiences from my life.</p>
<p>That is what bothers me about a lot of AI-generated art. It can reproduce the surface while removing the thing I actually care about.</p>
<p>Somebody cared enough to draw that picture. Somebody fought with that composition. Somebody spent years learning an instrument. Somebody wrote a dreadful poem at fourteen and kept writing until they were 21.</p>
<p>Those imperfections are often part of what makes the work interesting.</p>
<p>I would rather see one slightly wonky drawing somebody genuinely wanted to make than ten thousand polished images generated to keep an engagement feed full.</p>
<p>That does not mean I think generative AI should never appear anywhere near a creative process.</p>
<p>I am fairly comfortable with it at the concept and prototype stage.</p>
<p>If somebody is developing a game and wants to explore a visual direction, test silhouettes, throw together a mood board, experiment with composition or simply get a vague idea into a form they can react to, I can see the point. At that stage, generated output can function like a condensed mind map.</p>
<p>You look at it and think: I like this shape. I hate that colour. That architecture is interesting. This composition is wrong. That texture gives me another idea.</p>
<p>Then you build on top of it. You redraw it, reinterpret it, bring in an artist and make actual decisions. The generated thing becomes reference material rather than the finished product.</p>
<p>That is roughly where my line sits.</p>
<p>AI helping somebody find a starting point does not bother me nearly as much as somebody treating the starting point as the destination. The same goes for writing. Brainstorming, challenging an outline, asking for alternatives or finding gaps in an argument is one thing; having it write the poem for you is something else.</p>
<p>For passionate hobbies, the process is part of the point. Painting badly can be the point. Writing an awful first draft can be the point. Spending six hours getting one musical phrase right can be the point. Failing at something and learning why can be the point.</p>
<p>Not everything needs to be optimised into content production.</p>
<p>I do not want a machine writing my poetry for me because writing the poetry is the bloody point.</p>
<p>This is where people sometimes want everything to collapse into one neat moral category, and I do not think it does.</p>
<p>With poetry, automating the writing would remove the part I care about.</p>
<p>With programming, automation can preserve my ability to participate in the part I care about.</p>
<p>I care about architecture. I care about systems. I care about deciding how something should work. I care about debugging weird protocol behaviour, designing interfaces and figuring out how several components should fit together.</p>
<p>I do not particularly care whether I personally typed every repetitive line required to get there.</p>
<p>Especially when the alternative on a bad health day is not “write it manually”.</p>
<p>The alternative is often “do nothing”.</p>
<p>Coding agents reduce the amount of implementation labour between the idea in my head and a working system without removing my involvement in that system. For me, that is very different from asking a model to replace the thing I actually wanted to do.</p>
<p>This is also why my GitHub contribution graph makes me laugh slightly.</p>
<p>It shows output beautifully. It does not show cost.</p>
<p>A green square does not tell you whether I spent the rest of that day in bed. It does not tell you whether I worked for twenty minutes or six hours. It does not show the days where my brain is completely capable of thinking about software while my body is basically telling me to piss off and sleep.</p>
<p>I had my first brain surgery as a baby. I had my fourth in April this year. I am 21.</p>
<p>Chronic illness has been part of my life for so long that I do not really have some pristine healthy adult baseline to compare myself against. While thinking about this post, I slept for ten and a half hours and still woke up weak and exhausted enough that I wanted to go straight back to bed.</p>
<p>That is the context in which a lot of this software gets made.</p>
<p>So yes, I automate aggressively. Why wouldn’t I?</p>
<p>I am not trying to prove that I can suffer through work inefficiently. I am trying to make things.</p>
<p>None of this means I get to hide behind the agent when something goes wrong.</p>
<p>If I use an agent and merge broken code, that is my mistake. If it introduces a security vulnerability and I fail to catch it, pointing at the model is not a defence. If one of my projects damages somebody’s data because I accepted an implementation I did not understand, responsibility does not magically transfer to whatever model generated the patch.</p>
<p>My name is on the repository.</p>
<p>That is why I care about unit tests, integration tests, CI, architecture documents, review, release processes, dogfooding and detailed issues. The more implementation I delegate, the more important it becomes that the surrounding engineering is deliberate.</p>
<p>And I still need to know what I am doing. If you cannot recognise when an agent has produced nonsense, the fact that it produced the nonsense very quickly is not especially useful.</p>
<p>AI has not removed my need to understand software.</p>
<p>It has reduced the amount of manual implementation I need to personally grind through.</p>
<p>Those are not the same thing.</p>
<p>Most of what I build is open source, and a lot of it is extremely niche. Some projects exist because I needed them. Some exist because somebody else might find them useful. Some exist because I had a stupidly specific idea at two in the morning and apparently nobody was around to confiscate my GitHub account.</p>
<p>That is probably the thread running through all of it: I like making things.</p>
<p>I like systems. I like protocols. I like watching something move from “this would be interesting” to an actual repository with releases, tests, users, bug reports and an issue tracker containing enough work to keep me occupied until the heat death of the universe.</p>
<p>The tools I use to make those things have changed. That does not mean I think those tools are harmless, and it does not mean I have to adopt some all-or-nothing position on them.</p>
<p>I can use AI heavily and still criticise the industry around it. I can depend on coding agents and still dislike AI-generated slop. I can see AI as an accessibility tool and still think disabled people should not be used as an ethical shield for every criticism of the technology. I can think generative art is useful as a prototype and still hate the idea of replacing artists with an endless stream of finished-looking husks.</p>
<p>I can use AI to audit my own software because I actively want it to find things I missed. I can dogfood that software constantly and still know that my own usage will never cover every edge case. I can love open source precisely because somebody else can come along, find the thing I missed and tell me about it.</p>
<p>I can accept Ko-fi support and still refuse to pretend a donation makes somebody my boss. I can take commissions and recognise that, yes, a paying client gets to direct the work they actually commissioned. I can work for an employer and accept that they get to tell me what to do during the hours they are paying for.</p>
<p>None of that is particularly contradictory.</p>
<p>When I look at those 13,843 contributions, I do not see 13,843 occasions where I personally sat down and hand-typed code. That would be a ridiculous interpretation of the number.</p>
<p>I see decisions. Bugs investigated. Architectures changed. Tests demanded. Features scoped. Pull requests rejected, corrected and merged. Documentation written. Protocol specifications read far too late at night. Issues opened because something that already works could still be better.</p>
<p>I see software I use myself, software other people can inspect, and software I deliberately invite criticism of because I would rather know what is wrong with it than pretend nothing is.</p>
<p>I see work completed around a body that is not consistently capable of working.</p>
<p>I can still read the code. I can still understand it. I still decide what gets built. I still care whether it is good. I still take responsibility when it is not.</p>
<p>And, ultimately, I am still the one putting my name on it.</p>
