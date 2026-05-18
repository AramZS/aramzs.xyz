---
author: 'https://github.com/unhappychoice/'
cover_image: >-
  https://repository-images.githubusercontent.com/1216450471/677be5e6-194a-4ad2-83b3-b3037c4091d0
date: '2026-05-17T17:10:08.474Z'
dateFolder: 2026/05/17
description: >-
  A customizable terminal splash screen with plugin-based data sources. -
  unhappychoice/splashboard
isBasedOn: 'https://github.com/unhappychoice/splashboard'
link: 'https://github.com/unhappychoice/splashboard'
slug: 2026-05-17-httpsgithubcomunhappychoicesplashboard
tags:
  - tech
title: >-
  GitHub - unhappychoice/splashboard: A customizable terminal splash screen with
  plugin-based data sources. · GitHub
---
<h1>unhappychoice/splashboard</h1>
<p>main</p>
<p>Go to file</p>
<p>Code</p>
<p>Open more actions menu</p>
<figure><a href="https://github.com/unhappychoice/splashboard/blob/main/docs/screenshots/project_github.png"><img alt="splashboard" src="https://github.com/unhappychoice/splashboard/raw/main/docs/screenshots/project_github.png"/></a></figure>
<figure><a href="https://crates.io/crates/splashboard"><img alt="crates.io" data-canonical-src="https://img.shields.io/crates/v/splashboard.svg?style=flat-square&amp;color=E06B4B" src="https://camo.githubusercontent.com/a7f92eb398801985959dc7abe74c316443268474be1888d228afbd094965593a/68747470733a2f2f696d672e736869656c64732e696f2f6372617465732f762f73706c617368626f6172642e7376673f7374796c653d666c61742d73717561726526636f6c6f723d453036423442"/></a></figure>
<figure><a href="https://github.com/unhappychoice/splashboard/releases"><img alt="release" data-canonical-src="https://img.shields.io/github/v/release/unhappychoice/splashboard?style=flat-square&amp;color=E0C14B&amp;label=release" src="https://camo.githubusercontent.com/95c3acea893498caca3c4e21c5085ec6ddd30f5ce3f73c1121d854c83c3e9863/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f756e686170707963686f6963652f73706c617368626f6172643f7374796c653d666c61742d73717561726526636f6c6f723d453043313442266c6162656c3d72656c65617365"/></a></figure>
<figure><a href="https://github.com/unhappychoice/splashboard/actions/workflows/ci.yml"><img alt="CI" data-canonical-src="https://img.shields.io/github/actions/workflow/status/unhappychoice/splashboard/ci.yml?branch=main&amp;style=flat-square&amp;label=CI" src="https://camo.githubusercontent.com/65b54c070221db8e5c0d0b50650e8cf09f26cd18eec69fe0bf28892ba3466c2d/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f616374696f6e732f776f726b666c6f772f7374617475732f756e686170707963686f6963652f73706c617368626f6172642f63692e796d6c3f6272616e63683d6d61696e267374796c653d666c61742d737175617265266c6162656c3d4349"/></a></figure>
<figure><a href="https://codecov.io/gh/unhappychoice/splashboard"><img alt="coverage" data-canonical-src="https://img.shields.io/codecov/c/github/unhappychoice/splashboard?style=flat-square" src="https://camo.githubusercontent.com/96eb0a44cb74ac1bb42c8d9625ad59f6b0f5e647a698022831b1e7bc139e4b70/68747470733a2f2f696d672e736869656c64732e696f2f636f6465636f762f632f6769746875622f756e686170707963686f6963652f73706c617368626f6172643f7374796c653d666c61742d737175617265"/></a></figure>
<figure><a href="https://github.com/unhappychoice/splashboard/blob/main/LICENSE"><img alt="license" data-canonical-src="https://img.shields.io/crates/l/splashboard.svg?style=flat-square" src="https://camo.githubusercontent.com/eec8f40f711a03253c9caeeb35c710fa02a0c5a6fe29198c95c8d719c645cd6d/68747470733a2f2f696d672e736869656c64732e696f2f6372617465732f6c2f73706c617368626f6172642e7376673f7374796c653d666c61742d737175617265"/></a></figure>
<p><strong>A customizable terminal splash rendered on shell startup and on <code>cd</code>.</strong><br/>
<sub><code>splashboard</code> = <code>splash</code> + <code>dashboard</code></sub></p>
<p>Instead of a blinking cursor, every new shell shows a dashboard of the things you actually care about — greetings, git status, CI health, PRs, a contributions heatmap, the moon phase. The killer feature: a repo that ships <code>./.splashboard/dashboard.toml</code> auto-reshapes the splash when you <code>cd</code> in, so different repos get different splashes for free.</p>
<h2>Install</h2>
<pre>curl -fsSL https://raw.githubusercontent.com/unhappychoice/splashboard/main/install.sh | bash</pre>
<details> <summary>Other install methods</summary> <pre># cargo
cargo install splashboard

# Homebrew (macOS / Linux)
brew install unhappychoice/tap/splashboard

# cargo-binstall (prebuilt binaries from GitHub Releases)
cargo binstall splashboard

# Nix flake
nix run github:unhappychoice/splashboard
nix profile install github:unhappychoice/splashboard</pre> <p>Prebuilt binaries for Linux (x86_64 / aarch64), macOS (x86_64 / aarch64), and Windows (x86_64) are also attached to each <a href="https://github.com/unhappychoice/splashboard/releases">GitHub Release</a>.</p> </details>
<p><code>splashboard install</code> then detects your shell, walks you through template / theme pickers, and wires your rc for you.</p>
<pre>splashboard install</pre>
<p>Prefer to own the rc edit yourself? Append one line that re-sources <code>splashboard init &lt;shell&gt;</code> on every shell start — upgrades to splashboard ship an updated init snippet automatically:</p>
<pre>echo 'eval "$(splashboard init zsh)"'                              &gt;&gt; ~/.zshrc
echo 'eval "$(splashboard init bash)"'                             &gt;&gt; ~/.bashrc
echo 'splashboard init fish | source'                              &gt;&gt; ~/.config/fish/config.fish
echo 'Invoke-Expression (&amp; splashboard init powershell | Out-String)' &gt;&gt; $PROFILE</pre>
<h2>Docs</h2>
<p>📖 <strong><a href="https://splashboard.unhappychoice.com/">https://splashboard.unhappychoice.com/</a></strong></p>
<ul> <li><a href="https://splashboard.unhappychoice.com/guides/getting-started/">Getting started</a> — install, wire your shell, render your first splash</li> <li><a href="https://splashboard.unhappychoice.com/guides/concepts/">Concepts</a> — the mental model (Widget = Fetcher + Renderer + Layout slot)</li> <li><a href="https://splashboard.unhappychoice.com/guides/configuration/">Configuration</a> — the full TOML schema</li> <li><a href="https://splashboard.unhappychoice.com/guides/presets/">Presets</a> &amp; <a href="https://splashboard.unhappychoice.com/guides/themes/">Themes</a> — curated dashboards and palettes</li> <li><a href="https://splashboard.unhappychoice.com/guides/trust/">Trust model</a> — how per-directory configs are sandboxed</li> <li><a href="https://splashboard.unhappychoice.com/reference/matrix/">Reference</a> — every fetcher and renderer with options and compatible shapes</li> </ul>
<h2>Status</h2>
<p>Usable day-to-day. Widget catalog tracked as a living roadmap in <a data-hovercard-type="issue" data-hovercard-url="/unhappychoice/splashboard/issues/41/hovercard" href="https://github.com/unhappychoice/splashboard/issues/41">issue #41</a> — new fetchers and renderers land as PRs that tick the checkboxes.</p>
<h2>License</h2>
<p>ISC</p>
<h2>Related</h2>
<ul> <li><a href="https://github.com/unhappychoice/gitlogue">gitlogue</a> — cinematic git history replay</li> <li><a href="https://github.com/unhappychoice/gittype">gittype</a> — CLI typing game from your source code</li> <li><a href="https://github.com/unhappychoice/mdts">mdts</a> — local Markdown tree server</li> </ul>
