---
author: ratatui.rs
cover_image: null
date: '2026-05-17T17:08:35.481Z'
dateFolder: 2026/05/17
description: >-
  Ratatui is an immediate mode graphics library. Applications imperatively
  declare how to render each frame in full by combining widgets and layout.
isBasedOn: 'https://ratatui.rs/'
link: 'https://ratatui.rs/'
slug: 2026-05-17-httpsratatuirs
tags:
  - gadgets
title: Ratatui Book
---
<figure><img alt="Demo" src="https://raw.githubusercontent.com/ratatui-org/ratatui/images/examples/demo2.gif"/></figure>
<p><a href="https://crates.io/crates/ratatui">Ratatui</a> is a Rust library for cooking up delicious text user interfaces (TUIs). It is a lightweight library that provides a set of widgets and utilities to build simple or complex rust TUIs.</p>
<p>Ratatui is an <a href="https://en.wikipedia.org/wiki/Immediate_mode_(computer_graphics)">immediate mode</a> graphics library. Applications imperatively declare how to render each frame in full by combining widgets and layout. Ratatui then draws the described UI widgets efficiently to the terminal.</p>
<p>Applications built with Ratatui use the features of their chosen <a href="https://ratatui.rs/concepts/backends">backend</a> (<a href="https://crates.io/crates/crossterm">Crossterm</a>, <a href="https://crates.io/crates/termion">Termion</a>, or <a href="https://crates.io/crates/termwiz">Termwiz</a> to handle:</p>
<ul> <li>keyboard input events</li> <li>mouse events</li> <li>switching to raw mode and the alternate screen</li> </ul>
<p>Ratatui is very flexible and customizable. It does not dictate how you need to structure your application, as it is a library not a framework. This book covers some different options covering the range from simple single file applications through more complex applications using approaches based on components, Flux and The Elm Architecture.</p>
<h2><a href="https://ratatui.rs/#who-is-ratatui-for">Who is ratatui for?</a></h2>
<p>Ratatui is designed for developers and enthusiasts who:</p>
<ul> <li>want a lightweight alternative to graphical user interfaces (GUIs),</li> <li>need applications that are to be deployed in constrained environments, like on servers with limited resources, and</li> <li>prefer to have full control over input and events, allowing for a more customized and tailored user experience.</li> <li>appreciate the retro aesthetic of the terminal,</li> </ul>
<h2><a href="https://ratatui.rs/#who-is-this-book-for">Who is this book for?</a></h2>
<p>In this book, we will cover beginner guides to advanced patterns for developing terminal user interfaces.</p>
<p>Those new to the world of TUIs will find this book a comprehensive guide, introducing the foundational concepts and walking through common patterns of using Ratatui. Additionally, developers who have worked with TUIs will understand the nuances and benefits of using Ratatui.</p>
<p>We hope that this book can be a journey into creating beautiful and functional terminal-based applications.</p>
<p>Note</p>
<p>Help us improve!</p>
<p>We’ve designed this user guide to aid you throughout your journey with our open-source project. However, the beauty of open source is that it’s not just about receiving, but also contributing. We highly encourage you to contribute to our project and help improve it even further. If you have innovative ideas, helpful feedback, or useful suggestions, please don’t hesitate to share them with us.</p>
<p>If you see something that could be better written, feel free to <a href="https://github.com/ratatui-org/ratatui-book/issues">create an issue</a>, a <a href="https://github.com/ratatui-org/ratatui-book/discussions">discussion thread</a> or even contribute a <a href="https://github.com/ratatui-org/ratatui-book/pulls">Pull Request</a>. We’re also often active in the <code>#doc-discussion</code> channel on <a href="https://discord.gg/pMCEU9hNEj">Discord</a> and <a href="https://matrix.to/#/#ratatui:matrix.org">Matrix</a></p>
