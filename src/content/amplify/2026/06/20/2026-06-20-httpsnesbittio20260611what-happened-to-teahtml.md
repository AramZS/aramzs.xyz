---
author: Andrew Nesbitt
cover_image: 'https://nesbitt.io/images/boxes.png'
date: '2026-06-20T05:55:14.635Z'
dateFolder: 2026/06/20
description: Reading the tea leaves
isBasedOn: 'https://nesbitt.io/2026/06/11/what-happened-to-tea.html'
link: 'https://nesbitt.io/2026/06/11/what-happened-to-tea.html'
slug: 2026-06-20-httpsnesbittio20260611what-happened-to-teahtml
tags:
  - tech
title: What Happened to tea.xyz
---
<p>On June 4th, <a href="https://tea.xyz/">tea.xyz</a> launched what it had been promising since 2022: a cryptocurrency that pays open source maintainers. Within the first hour of official trading, the token fell 75% from its opening price. A week later it trades about 90% below its first-day high, the company’s GitHub org has been near-silent for six months, and the founder’s public commits are going to a different project entirely.</p>
<p>Their own blog post from June 8th, titled <a href="https://tea.xyz/blog/work-continues">The Work Continues</a>, concedes “the right response is not to pretend the launch went the way we wanted. It did not.” I’ve been pulling the public data: GitHub commit history, on-chain trading records, and the long paper trail tea left across the package registries.</p>
<h2>Where tea came from</h2>
<p>tea was founded by Max Howell, the creator of Homebrew, with Timothy Lewis. It <a href="https://www.businesswire.com/news/home/20220323005603/en/Tea-Raises-$8-Million-Led-by-Binance-Labs-to-Create-New-Open-Source-Software-on-the-Blockchain">came out of stealth in March 2022</a> with $8M led by Binance Labs, followed by <a href="https://techcrunch.com/2022/12/06/from-the-creator-of-homebrew-tea-raises-8-9m-to-build-a-protocol-that-helps-open-source-developers-get-paid/">an $8.9M seed round in December 2022</a>. The pitch had two halves: a new package manager (the <code>tea</code> CLI), and a blockchain protocol that would reward the maintainers of open source packages with tokens. Howell wrote Homebrew and made nothing from it, and the pitch leaned on that history, famous Google interview rejection included.</p>
<p>The two halves split in October 2023, when the package manager was renamed <a href="https://github.com/pkgxdev/pkgx">pkgx</a> and moved to its own GitHub org (<a href="https://news.ycombinator.com/item?id=37768300">the old teaxyz/cli repo still redirects there</a>) while the teaxyz org kept the crypto protocol. pkgx is a decent piece of software, and it never had a token in it. But the separation was only organisational: the company and founders stayed the same, and pkgx remained part of tea’s pitch as the eventual “cryptographically aware package register” for the protocol.</p>
<h2>The incentive design</h2>
<p>The <a href="https://docs.tea.xyz/tea-white-paper/white-paper">white paper</a> describes a mechanism called Proof of Contribution. Every package gets a score called <a href="https://tea.xyz/learn/proof-of-contribution">teaRank</a>, computed over the dependency graph and explicitly modelled on Google’s PageRank. The more packages depend on yours, the higher your rank, and rewards scale with rank. To claim a package you add a <code>tea.yaml</code> file to its repository containing your wallet address.</p>
<p>The protocol paid out tokens in proportion to how many packages you controlled and how connected they were. Registering a thousand packages paid better than one, and declaring dependencies between them pushed their ranks higher still. Nothing in the design was costly to fake, since a package name costs nothing to register and a dependency is one line in a manifest. In February 2024 tea opened <a href="https://chainwire.org/2024/01/29/tea-protocol-announces-incentivized-testnet-launch-setting-a-new-paradigm-in-open-source-software/">an incentivized testnet</a>, a trial version of the protocol where points earned would convert to tokens at launch, and reported <a href="https://www.globenewswire.com/news-release/2024/02/27/2836295/0/en/The-tea-Protocol-s-Incentivized-Testnet-Approaches-200K-Signups-and-500-Open-Source-Software-Projects-in-First-Week.html">nearly 200,000 signups and 500 projects in the first week</a>.</p>
<h2>The spam</h2>
<p>The farming started immediately, with pull requests on GitHub adding <code>tea.yaml</code> files to other people’s projects, trying to claim repos the submitter didn’t own. Howell called the PRs <a href="https://socket.dev/blog/tea-xyz-spam-plagues-npm-and-rubygems-package-registries">“disgusting and counter productive”</a>. On the registries, <a href="https://web.archive.org/web/2024/https://blog.phylum.io/digital-detritus-unintended-consequences-of-open-source-sustainability-platforms/">Phylum documented</a> new npm package publications climbing from mid-February 2024 to over seven times normal daily volume, with around 14,000 tea-registered packages across npm, PyPI, RubyGems, and crates.io. <a href="https://www.sonatype.com/blog/devs-flood-npm-with-10000-packages-to-reward-themselves-with-tea-tokens">Sonatype counted roughly 15,000</a> on npm alone, with single accounts publishing hundreds of packages.</p>
<p>RubyGems published <a href="https://blog.rubygems.org/2024/04/14/the-implications-of-crypto-rewards-on-rubygems_org.html">an incident report</a> describing empty gems created to farm rewards, including one six-year-old gem with over 100,000 downloads whose owner retroactively added a <code>tea.yaml</code> to cash in on it. In response they tightened publishing limits and blocked the accounts responsible. By August 2024, <a href="https://devclass.com/2024/08/07/npm-overflowing-with-tea-spam-spills-out-from-70-of-all-new-packages-research/">DEVCLASS reported research</a> estimating that of roughly 890,000 packages published to npm in the prior six months, around 70% were tea farming spam.</p>
<p>In November 2025, Endor Labs analysed the <a href="https://www.endorlabs.com/learn/the-great-indonesian-tea-theft-analyzing-a-npm-spam-campaign">“IndonesianFoods” campaign</a>: 43,000+ packages from at least 11 npm accounts over nearly two years, with auto-generated names from word lists. <a href="https://aws.amazon.com/blogs/security/amazon-inspector-detects-over-150000-malicious-packages-linked-to-token-farming-campaign/">Amazon Inspector tied over 150,000 packages</a> to the same token-farming campaign. Some coverage called it a worm, though <a href="https://socket.dev/blog/tea-protocol-spam-floods-npm-but-its-not-a-worm">Socket’s analysis</a> found automation rather than self-propagation. The spam packages declared dependencies on each other to inflate teaRank, which meant installing any one of them pulled in the whole tree. <a href="https://ldklab.github.io/assets/papers/scored25-teaspam.pdf">An academic paper</a> published in 2025 measures the abuse. The cleanup costs landed on npm, RubyGems, PyPI, and every mirror and security scanner downstream.</p>
<p>tea <a href="https://tea.xyz/blog/owning-the-fallout-fixing-the-incentives-how-tea-is-responding-to-the-npm-token-farming-campaign">responded that November</a> by halting rewards distribution for the affected period and promising redesigned anti-spam rules. Howell <a href="https://www.theregister.com/2025/12/17/tea_ceo_fends_off_token_farmers">told The Register</a> the protocol would slash farmers’ rewards.</p>
<h2>The launch</h2>
<p>In September 2025, eight months before the protocol went live, tea ran <a href="https://coinlist.co/tea">a public sale on CoinList</a>, a site that runs token sales for crypto projects: 4 billion TEA at $0.0005 each, implying a $50M valuation for the full 100 billion token supply. The terms unlocked 100% of the tokens on day one. Token sales usually stagger when buyers can sell, releasing tokens over months or years so early buyers can’t all exit at once.</p>
<p>The launch plan, <a href="https://tea.xyz/blog/the-tea-party-begins">announced May 12th</a>, put trading on Aerodrome, an exchange that runs as a program on Base, a blockchain built by Coinbase, rather than as a company matching orders. Prices on this kind of exchange come from a pool of paired tokens, TEA on one side and a dollar-pegged token on the other, and each trade moves the price along a curve. The smaller the pool, the more each trade moves it. tea seeded the pool with 2% of the token supply and scheduled the launch for 00:00 UTC on June 4th.</p>
<figure><svg aria-label="TEA token price per hour, June 3 to June 11 2026, showing a brief pre-launch spike to $0.00065, then a fall from $0.00046 to $0.00011 in the first hour of official trading" role="img" style="max-width:100%;height:auto;font-family:inherit;" viewbox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
  
  $0
  
  $0.0001
  
  $0.0002
  
  $0.0003
  
  $0.0004
  
  $0.0005
  
  $0.0006
  
  Jun 4
  
  Jun 5
  
  Jun 6
  
  Jun 7
  
  Jun 8
  
  Jun 9
  
  Jun 10
  
  Jun 11
  
  
  official launch, 00:00 UTC Jun 4
  Hourly $TEA price on Aerodrome (TEA/USDC pool), data from GeckoTerminal
</svg></figure>
<p>The pool received its tokens from 22:47 UTC on June 3rd, and <a href="https://basescan.org/tx/0x0675e1a8a168c2af3132c124ec061094fd9e1d18d395bf9507cc613f394c7f3a">the first trade executed at 23:54 UTC</a>, six minutes before the official launch. tea’s June 8th post describes this as “onchain liquidity activity occurred ahead of the coordinated plan”: the pool was live and tradeable before the launch sequence finished. In those six minutes the price was bid up to $0.00065, above the CoinList sale price. In the first official hour, from 00:00 to 01:00 UTC, the price fell from $0.00046 to $0.00011 on $332,000 of volume, down 75% in 60 minutes.</p>
<p>The CoinList sale’s full unlock meant every September buyer was free to sell from the first minute, into a pool holding 2% of supply. The price has kept falling since and now sits around $0.00007, <a href="https://www.coingecko.com/en/coins/tea-protocol">86% below what CoinList buyers paid</a> eight months ago, valuing the entire 100 billion token supply at roughly $7M against the $50M the sale implied.</p>
<p>The collapse didn’t need anyone to withdraw the tokens backing the pool, and the pool still holds around $280K. Per <a href="https://cryptobriefing.com/tea-protocol-token-transparency-filing-tea-launch/">the project’s own pre-launch transparency filing</a>, about 20% of supply was circulating at launch, ten times what the pool held.</p>
<h2>The GitHub record</h2>
<p>Monthly commits across <a href="https://github.com/teaxyz">the teaxyz org</a> and <a href="https://github.com/pkgxdev">the pkgxdev org</a> show how much of the company was still working by launch day:</p>
<figure><svg aria-label="Monthly commits to teaxyz and pkgxdev GitHub organisations from January 2024 to June 2026. The teaxyz line falls to near zero after November 2025 while pkgxdev continues with regular activity." role="img" style="max-width:100%;height:auto;font-family:inherit;" viewbox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
  
  0
  
  100
  
  200
  
  300
  
  400
  
  Jan 2024
  
  Jul 2024
  
  Jan 2025
  
  Jul 2025
  
  Jan 2026
  
  
  
  pkgxdev (package manager)
  
  teaxyz (protocol)
  Commits per month to non-fork repos in each GitHub org, via the GitHub API
</svg></figure>
<p>Commits to the protocol org ramped through late 2024 as the team built <a href="https://github.com/teaxyz/chai">chai</a>, their open package dataset, and the token contracts, and even the December 2024 peak was only 100 commits. Activity declined through 2025: chai’s main developer stopped committing in August, the dataset repo’s last commit was in September, and the token contract repo’s last sustained work was in October and November. After November 2025, the month tea halted rewards over the farming campaign, the org had 2 commits in December, 1 in January, 2 in February, and none since.</p>
<p>The chart excludes forks, which hides the one place engineering continued: tea’s forks of go-ethereum and Optimism, the infrastructure for their blockchain, received steady commits from a single contributor through May 17th, 2026, two and a half weeks before launch.</p>
<p>Howell wrote 236 commits to pkgxdev repos in January 2025 and kept a steady pace through May, then made only scattered commits until stopping entirely in November 2025. His public GitHub activity in June 2026 is in <a href="https://github.com/automic-vault">automic-vault</a>, a new org created in April with no connection to tea or pkgx, while <a href="https://www.theregister.com/2025/12/17/tea_ceo_fends_off_token_farmers">he remained tea’s CEO in press coverage</a> as recently as December.</p>
<p>pkgx itself is now mostly the work of one maintainer, Jacob Heider, who has carried the package-building pipeline more or less alone since mid-2025, lately assisted by Claude Code-generated pull requests that he reviews and merges. User-filed issues on the pkgx repo (then still teaxyz/cli) peaked at 78 a quarter in early 2023 and have arrived at a rate of 2 a quarter in 2026.</p>
<p>In tea’s Discord, the conversation since launch is upset token holders: testnet participants who completed identity verification say they’re not eligible for the airdrop, the free distribution of tokens they spent two years earning points toward, and a week after launch the official line in the channel is that nobody has said there won’t be one. “The current price is a complete joke for everyone who participated in the project,” as one user put it, while the moderation bot issues warnings for bad word usage. The member list shows two people with the Core Contributor role, and neither is a founder. The channels for the open source side of the project, the dev and package dataset discussion, have had no real activity since 2025.</p>
<p>tea’s post blames a bad week for crypto generally, and the wider market fell that week too. But the same post admits to “decisions, timing factors, and execution details that we are reviewing internally”, and the commit history shows few people left to conduct that review. Four years, roughly $17M in disclosed venture funding, and <a href="https://cryptobriefing.com/tea-protocol-token-transparency-filing-tea-launch/">about $2M more from the public sale</a> produced several hundred thousand spam packages and a cleanup bill paid by registries that never had any relationship with tea. The maintainers tea set out to pay, the ones with real packages and dependents, are left holding the same token as the farmers.</p>
<p><em>Data notes: commit counts are author-dated commits to non-fork repos in each GitHub org, collected via the GitHub API on June 11th 2026. Price data is GeckoTerminal hourly <a href="https://en.wikipedia.org/wiki/Open-high-low-close_chart">OHLCV</a> for the Aerodrome TEA/USDC pool on Base. Issue counts exclude pull requests, bots, and tea team accounts. The raw data and chart scripts are in <a href="https://github.com/andrew/nesbitt.io/tree/master/data/tea">data/tea on GitHub</a>.</em></p>
