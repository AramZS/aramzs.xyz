---
author: Philip Zeyliger
cover_image: ''
date: '2026-02-15T21:42:07.310Z'
dateFolder: 2026/02/15
description: >-
  When your coding agent lives next to your software, editing it is as easy as
  editing a wiki.
isBasedOn: 'https://blog.exe.dev/software-as-wiki'
link: 'https://blog.exe.dev/software-as-wiki'
slug: 2026-02-15-httpsblogexedevsoftware-as-wiki
tags:
  - ai
  - code
  - tech
title: 'Software as Wiki, Mutable Software'
---
<figure><img alt="" src="https://boldsoftware.github.io/public_html/slinky/shelley.png"/></figure>
<p>Here at the exe.dev offices, we built a link shortener. It's called slinky. It's nothing special.</p>
<p>Link shorteners are a dime a dozen. They help in a time of useless URLs (hi, Google Docs), hard to remember port numbers, and overly clever naming schemes.</p>
<p>The thing that makes this link shortener unusual, is that "Edit with Shelley" button. When I wanted to add a feature (%s placeholders in short links for Honeycomb queries for a trace id, say), I click on that, and I'm in the Shelley agent, on the same VM. I said, and I quote:</p>
<blockquote> <p>Some slinky URLs have "template" parameters. For example, I want http://slinky.exe.xyz/trace/foo to become https://ui.honeycomb.io/[%20 %20 so much quoting %20]foo[...] Note how "foo" has to be replaced in that mess of escaping. Create a way to put a placeholder in the link, and reference it like I mention. While you're add [sic] it, add a link for this one.</p> </blockquote>
<p>And then a few minutes later, Shelley had one-shotted this small feature to Slinky.</p>
<p>You can treat some software like a wiki. You don't like it? Click "edit" and change it.</p>
