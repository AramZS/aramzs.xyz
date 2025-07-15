---
author: prose.sh
cover_image: 'https://prose.sh/card.png'
date: '2025-07-14T19:31:58.352Z'
dateFolder: 2025/07/14
description: >-
  or, I don't care how you write a `for` loop or Hello World (updated
  2025-07-02)
isBasedOn: 'https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials'
link: 'https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials'
slug: 2025-07-14-httpsddrakeproseshwhyihateprogramminglanguageintrotutorials
tags:
  - code
  - tech
title: Why I hate programming language intro tutorials
---
<p>You decide to learn about a programming language that's new to you. So you go the main site for the language, and look up the usual kind of introduction, overview tutorial, Getting Started page, or similar.</p>
<p>Frequently, they begin with syntax. "Here are strings! Numbers! Booleans! And let's write 'Hello world'!"</p>
<p>Then they go on to describe how you write an <code>if-then-else</code>, or a <code>for</code> loop.</p>
<p>These documents seem intensely obsessed with these basic constructs, and with syntax.</p>
<p>But when I look at such a document, <strong>I don't care about those things.</strong></p>
<p>The question I'm always asking is: <strong>what are the big ideas in this language? What's important? What is it good at? Why should I use this language, and when?</strong></p>
<h2>Context, my background <a href="https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials#context-my-background">#</a></h2>
<p>I don't have a computer science degree, though I have taken enough upper-division undergrad CS courses so that, informally, I basically do. I haven't done graduate-level work studying programming languages.</p>
<p>I have been fascinated by programming since the 80s, and during undergrad and grad school (a PhD in math) I did a lot of coding. Later I worked for nearly 10 years as a software developer.</p>
<p>Programming languages are incredibly interesting to me, and deeply weird, in that they need to have two audiences: humans, and computers. The computers are unyielding in their demands and requirements for your code; humans, much less so, and the result is that all too often, we write code for the computer more than for humans -- and that, I believe, is a very poor choice.</p>
<p>My philosophy -- which I share with many others -- is that a programming language is indeed a language, just like human or natural languages, and it exists to communicate. I value language -- of whatever kind -- that effectively communicates ideas to other humans.</p>
<p>So, I often myself poking at new languages, or old ones that I don't know. And hence I often find myself reading "getting started" documents, or tutorials, or what have you.</p>
<p>And those documents -- written in the English language -- often don't communicate the ideas I care about.</p>
<h2>Motivating example: experimenting with Racket <a href="https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials#motivating-example-experimenting-with-racket">#</a></h2>
<p>I recently read <a href="https://www.vikramchandra.com/publications/mirrored-mind-geek-sublime/">Geek Sublime by Vikram Chandra</a>; the book describes some amazing connections between natural and formal languages, and I learned a lot of cool stuff about Sanskrit.<sup><a href="https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials#fn:1">1</a></sup> It really helps make the case that programming languages really <em>are</em> languages. The analogy is very deep and appropriate.</p>
<p>I also am reading <a href="https://www.amazon.com/Dont-Teach-Coding-Until-Read/dp/1119602629">Don't Teach Coding: Until You Read This Book</a> which also really makes a case for the "language" metaphor, and uses Racket.</p>
<p>So, I've been poking at Racket. I use emacs, and have written lots of emacs lisp, so the overall syntax and so on for Racket are roughly familiar.</p>
<p>So, I can load up <a href="https://docs.racket-lang.org/drracket/index.html">DrRacket</a> and type in code samples, and so on, but I kept thinking things like:</p>
<ul> <li>So, Racket is a Scheme dialect. And Scheme is...a Lisp dialect?</li> <li>What distinguishes Racket from Scheme? From Lisp? Superficially Racket code looks like emacs lisp to me.</li> </ul>
<p>I don't have any deep or special background in programming languages, so I'm ignorant about these things. But I want to know!</p>
<p>I hear about Rust all the time these days. Why is everyone using it? Why should I care about it, or learn it? Let's visit &lt;www.rust-lang.org&gt; and find out!</p>
<p>The page features a "Why Rust?" section. Excellent! Tell me why! Here's what the page says, and my snarky reactions.</p>
<blockquote> <p>"Performance: Rust is blazingly fast and memory-efficient: with no runtime or garbage collector, it can power performance-critical services, run on embedded devices, and easily integrate with other languages."</p> </blockquote>
<p>Well, so does C, when written well, right? So far you haven't told me Why Rust.</p>
<blockquote> <p>"Reliability: Rust’s rich type system and ownership model guarantee memory-safety and thread-safety — enabling you to eliminate many classes of bugs at compile-time."</p> </blockquote>
<p>Lots of languages have a type system. Many have guarantees of memory-safety and thread-safety. So that's nothing special. There is this ownership model stuff, what's that?</p>
<blockquote> <p>"Productivity: Rust has great documentation, a friendly compiler with useful error messages, and top-notch tooling — an integrated package manager and build tool, smart multi-editor support with auto-completion and type inspections, an auto-formatter, and more.""</p> </blockquote>
<p>Lots of languages have nice documentation. <a href="https://elm-lang.org">Elm</a> is noted for its extremely friendly and helpful compiler messages. And lots of languages have really good tooling, package managers, and so on.</p>
<p>At this point, I don't really get the <em>idea</em> of Rust. Why did they make it?</p>
<h2>My understanding of the ideas or "why" of Rust <a href="https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials#my-understanding-of-the-ideas-or-why-of-rust">#</a></h2>
<p>I don't know Rust, but here's what I do understand: one of the big ideas of the language is to eliminate memory leaks and race conditions automatically.</p>
<p>It does this when you call other functions by forcing you to declare whether the called function is allowed to modify the variable or not. That lets the compiler infer things about memory allocation, threads accessing shared memory, and so on, which means the compiler can throw errors for code that could potentially access invalid memory. That means if your program compiles, it means that code is guaranteed to not access invalid memory, because that's how the language's semantics and its compiler work. (Thanks <a href="https://mathstodon.xyz/deck/@jaxter184@social.linux.pizza">@jaxter184</a> for a correction/clarification on exactly why kinds of memory shenanigans the Rust compiler can protect against.)</p>
<p><strong>That</strong> is useful to me. It tells me useful things; for example:</p>
<ul> <li>that's why folks rewrite basic utilities in Rust: they are so fundamental, and frequently used, that the effort of porting them from C yields a meaningful benefit of safety and reliability.</li> <li>that's why you'd write a web browser engine or similar in Rust: we all use web browsers constantly, and have a million tabs open -- so it's a memory-intensive program. And it's a program with security risks; having guarantees against memory leaks that could be exploited by malicious sites is a win.</li> <li>If I want to dash off a quick dumb script, Rust is likely not the best choice.</li> </ul>
<h2>How the Rust book fails to do this <a href="https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials#how-the-rust-book-fails-to-do-this">#</a></h2>
<p>On the Rust page, under "Get started with Rust", it links to <a href="https://doc.rust-lang.org/book/">"the book"</a> and declares that it will give me an overview of the language. Sounds good! Let's look at the table of contents:</p>
<pre><code>The Rust Programming Language
Foreword
Introduction
1. Getting Started
    1.1. Installation
    1.2. Hello, World!
    1.3. Hello, Cargo!
2. Programming a Guessing Game
3. Common Programming Concepts
    3.1. Variables and Mutability
    3.2. Data Types
    3.3. Functions
    3.4. Comments
    3.5. Control Flow
4. Understanding Ownership
    4.1. What is Ownership?
    ...
</code></pre>
<p>It's not until chapter 4 that you get to something I want to start with. If I'm doing initial exploration, I don't care about Hello World, or Cargo. I roll my eyes at the fact that you have data types, functions, comments, and control flow.</p>
<p>But ownership? That's new. What's that?</p>
<p>Here's an idea for a more useful structure. The Foreword does say something relevant -- it mentions memory management, and helping developers avoid pitfalls. Okay, that's getting towards the ideas I mentioned above.</p>
<p>The introduction is a mix of more non-useful generalities ("ooooh, it's for teams of developers! And for people who value speed and stability! How different from other languages!" <code>&lt;/sarcasm&gt;</code>) and meta content about the book itself."</p>
<p>Let's imagine structuring the book like this:</p>
<pre><code>The Rust Programming Language
Foreword
Introduction
1. What's Special About Rust?
    1.1 The Ownership Model
    1.2 ...other stuff unique to Rust, or that it's really good at...
2. Getting Started
    1.1. Installation
    1.2. Hello, World!
    1.3. Hello, Cargo!
3. Programming a Guessing Game
4. Common Programming Concepts
    3.1. Variables and Mutability
    3.2. Data Types
    3.3. Functions
    3.4. Comments
    3.5. Control Flow
</code></pre>
<p>Let me hasten to add that I'm super ignorant about Rust, and am surely missing things. And also that I don't mean to impugn Rust! It seems great, and I'm glad to see it being so popular. I'm just using this as a typical example of how this kind of communication -- call it promotion, propaganda, or whatever -- is done.</p>
<p>In the vein of Lisp, Scheme, and Racket: I find the main page for <a href="https://clojure.org/about/rationale">Clojure</a> a bit better -- it has a "rationale" document that answers the kind of questions I care about.</p>
<p>I can read that and see immediately that I'm getting: Lisp, functional programming, and something that runs on the JVM. Those are things that quickly tell me whether I care about Clojure or not.</p>
<p>For <a href="https://www.erlang.org/">Erlang</a>, the page makes it clear that it's about scalable, high-availability software. That's helpful! It tells me that for my rando little script...Erlang is likely not good. Nor for my data science code.</p>
<p>Hal Abelson and Gerald Sussman, the famous authors of the Wizard Book -- *Structure and Interpretation of Computer Programs *-- gave a talk at <a href="https://con.racket-lang.org/2024/">RacketCon 14</a>, and they seem to have the same attitude that I do.</p>
<blockquote> <p>...what we forced ourselves to do in that course [on SICP] is to really focus on the ideas...<em>the book tries to be clear about "what are the basic ideas?"</em>...the key idea we talked about was abstraction, and you didn't see that in a lot of other courses. *Even now, if you look in most programming books about most languages they're gonna start by telling you waht the primitive data types of the language are. ... we start by saying, "what are the abstractions and means of combination?"</p> </blockquote>
<p>They are talking about college courses or books, but it applies in the same way to random language tutorials and introductions on the web.</p>
<p><a href="https://julialang.org/">Julia's home page</a> reads much like the Rust one -- ooh, it's for high performance! It has debugging and profiling! -- though it does mention the multiple dispatch.</p>
<p>I've actually used Julia, and would describe some of the big ideas there as "it kinda wants to be a replacement for scientific computing languages like Matlab or R, done as a 'regular', full-featured programming language".</p>
<p>Beyond that, my understanding is that it's dynamically typed, and uses that typing to do smart stuff with multiple dispatch. I also get the idea that "multiple dispatch" can be thought of as a radically different approach to object-oriented languages, in which the focus is on different kinds of functions in the way that OOP focuses on different kinds of objects.</p>
<h1>Tell me how to be a "native speaker" of your language <a href="https://ddrake.prose.sh/why_i_hate_programming_language_intro_tutorials#tell-me-how-to-be-a-native-speaker-of-your-language">#</a></h1>
<p>What are the idioms, the conventions? What are the standard approaches?</p>
<p>For example, in Racket -- or Scheme, or Lisp, anything in that family -- recursion is favored over iteration.</p>
<p>So, you can write something that's like a <code>for</code> loop in those languages, but...that's usually not natural. It's not how a "native speaker" of that programming language would write it. It's working against the nature and the ideas embedded into the language.</p>
<p>For this example, instead of a <code>for</code> loop, the natural thing to do usually looks like this idiom: given your list,</p>
<ol> <li>If it's the empty list, just return that.</li> <li>If not, do something to the first element of the list, and then recursively call yourself on the rest of the list. Use the processed first element and the result of the recursive call to return whatever you need to. (Often, you make a new list by prepending the processed first element to the result of the recursive call.)</li> </ol>
<p>So, if you're introducing me to Racket, or some related Scheme or Lisp dialect, go ahead and mention that there's loops -- but <strong>tell me that the idea in this language is to prefer recursion over iteration.</strong></p>
<p>I want programming language websites to better communicate ideas to me.</p>
<p>Likewise, I want to better communicate ideas to <strong>you</strong>, dear reader!</p>
<p>I'm keenly aware of the limitations of my knowledge, experience, and writing skills. Lemme know what you think: <a href="https://mathstodon.xyz/@ddrake">https://mathstodon.xyz/@ddrake</a> or <a href="mailto:prose.sh@dandrake.org">prose.sh@dandrake.org</a>.</p>
