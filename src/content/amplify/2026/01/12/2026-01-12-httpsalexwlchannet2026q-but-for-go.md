---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/profile_green_sq.jpg'
date: '2026-01-12T18:20:23.802Z'
dateFolder: 2026/01/12
description: >-
  I wrote a Go module to help with my print debugging, which logs expressions
  and values to a separate file.
isBasedOn: 'https://alexwlchan.net/2026/q-but-for-go/'
link: 'https://alexwlchan.net/2026/q-but-for-go/'
slug: 2026-01-12-httpsalexwlchannet2026q-but-for-go
tags:
  - code
title: Quick-and-dirty print debugging in Go
---
<p>I’ve been writing a lot of Go in my new job, and trying to understand a new codebase.</p>
<p>When I’m reading unfamiliar code, I like to use <a href="https://en.wikipedia.org/wiki/Debugging#:~:text=Print%20debugging%20or%20tracing">print debugging</a> to follow what’s happening. I print what branches I’m in, the value of different variables, which functions are being called, and so on. Some people like debuggers or similar tools, but when you’re learning a new language they’re another thing to learn – whereas printing “hello world” is the first step in every language tutorial.</p>
<p>The built-in way to do print debugging in Go is <code>fmt.Printf</code> or <code>log.Printf</code>. That’s fine, but my debug messages get interspersed with the existing logs so they’re harder to find, and it’s easy for those debug statements to slip through code review.</p>
<p>Instead, I’ve taken inspiration from <a href="https://github.com/zestyping/q">Ping Yee’s Python module “q”</a>. If you’re unfamiliar with it, I recommend <a href="https://www.youtube.com/watch?v=OL3De8BAhME#t=25m15s">his lightning talk</a>, where he explains the frustration of trying to find a single variable in a sea of logs. His module provides a function <code>q.q()</code>, which logs any expressions to a standalone file. It’s quick and easy to type, and the output is separate from all your other logging.</p>
<p>I created something similar for Go: a module which exports a single function <code>Q()</code>, and logs anything it receives to <code>/tmp/q.txt</code>. Here’s an example:</p>
<pre><code>package main

import (
	"github.com/alexwlchan/q"
	"os"
)

func printShapeInfo(name string, sides int) {
	q.Q("a %s has %d sides", name, sides)
}

func main() {
	q.Q("hello world")

	q.Q(2 + 2)

	_, err := os.Stat("does_not_exist.txt")
	q.Q(err)

	printShapeInfo("triangle", 3)
}
</code></pre>
<p>The logged output in <code>/tmp/q.txt</code> includes the name of the function and the expression that was passed to <code>Q()</code>:</p>
<pre><code>main: "hello world"

main: 2 + 2 = 4

main: err = stat does_not_exist.txt: no such file or directory

printShapeInfo: a triangle has 3 sides</code></pre>
<p>I usually open a terminal window running <code>tail -f /tmp/q.txt</code> to watch what gets logged by <code>q</code>.</p>
<p>The module is only 120 lines of Go, and <a href="https://github.com/alexwlchan/q.go/blob/main/q.go">available on GitHub</a>. You can copy it into your project, or it’s simple enough that you could write your own version. It has two interesting ideas that might have broader use.</p>
<h2>Getting context with the <code>runtime</code> package</h2>
<p>When you call <code>Q()</code>, it receives the final value – for example, if you call <code>Q(2 + 2)</code>, it receives <code>4</code> – but I wanted to log the original expression and function name. This is a feature from Ping’s Python package, and it’s what makes q so pleasant to use. This gives context for the log messages, and saves you typing that context yourself.</p>
<p>I get this information from Go’s <a href="https://pkg.go.dev/runtime"><code>runtime</code> package</a>, in particular the <a href="https://pkg.go.dev/runtime#Caller"><code>runtime.Caller</code></a> function, which gives you information about the currently-running function.</p>
<p>I call <code>runtime.Caller(1)</code> to step up the callstack by 1, to the actual line in my code where I typed <code>Q().</code> It tells me the “program counter”, the filename, and the line number. I can resolve the program counter to a function name with <a href="https://pkg.go.dev/runtime#FuncForPC"><code>runtime.FuncForPC</code></a>, and I can just open the file and look up that line to read the expression. (This assumes the source code hasn’t changed since compilation, which is always true when I’m doing local debugging.)</p>
<h2>Not affecting my coworkers with a local gitignore</h2>
<p>To use this file, I copy <code>q.go</code> into my work repos and add it to my <code>.git/info/exclude</code>. The latter is a local-only ignore file, unlike the <code>.gitignore</code> file which is checked into the repo. This means I won’t accidentally check in <code>q.go</code> or push it to GitHub.</p>
<p>It also means I can’t forget to remove my debugging code, because if I do, the tests in CI will fail when they can’t find <code>q.go</code>.</p>
<p>This avoids other approaches that would be more disruptive or annoying, like making it a project dependency or adding it to the shared <code>.gitignore</code> file.</p>
