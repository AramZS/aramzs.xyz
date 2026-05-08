---
author: stvn.sh
cover_image: ''
date: '2026-05-08T03:20:06.353Z'
dateFolder: 2026/05/07
description: >-
  Sorry Peter. — I'm at a birthday party, and while most people here also work
  in tech, there's always a Guy with a Real Job. You know, a physical job,
  building some or other thing people need. And this Guy always asks some
  variant of the same question: aren't you worried AI is taking your job? I
  glance around and see a few faces turning around toward us, rolling their eyes
  ever so slightly before returning to their previous conversation. Yes, this
  question again.
isBasedOn: 'https://stvn.sh/writing/programming-still-sucks-fqffhyp'
link: 'https://stvn.sh/writing/programming-still-sucks-fqffhyp'
slug: 2026-05-07-httpsstvnshwritingprogramming-still-sucks-fqffhyp
tags:
  - ai
  - tech
title: Programming Still Sucks.
---
<p><a href="https://stvn.sh/writing">← Writing</a></p>
<p>Programming · Leadership · AI</p>
<p>I'm at a birthday party, and while most people here also work in tech, there's always a Guy with a Real Job. You know, a physical job, building some or other thing people need. And this Guy always asks some variant of the same question: aren't you worried AI is taking your job? I glance around and see a few faces turning around toward us, rolling their eyes ever so slightly before returning to their previous conversation. Yes, this question again.</p>
<p>They have a nephew who builds Shopify stores, they don't understand half the words he uses but he's in real trouble and says everybody in tech is. Is his nephew gonna have to learn a "trade"? Are we all?</p>
<p>Enough drinks in and I'll answer proper, because I don't care anymore whether others think what I'm saying is interesting or true. But usually I'll sigh and say "Sure, yeah a little. Most of us are. Would be stupid not to be, right?" to which they nod before moving on to a lighter topic, like whether we're going to nuke Iran or not.</p>
<p>The truth is, working in tech always sucked, and never really was what they thought it was.</p>
<p>My job, some people think, is to sit at a clean desk in a corner office, surrounded by open offices filled with long tables with MacBooks or Thinkpads. In my corner office, I devise perfect plans, that my perfect employees applaud me for. None escape my gaze, every decision is made, perfectly, by me, and every cent and minute is accounted for.</p>
<p>When the applause fades, my employees, or reports, or "my team" when I'm feeling jolly, start furiously typing. Typing typing typing. And not long after, perfect software is produced. It rolls off the collective assembly line, and like a first child, it can do no wrong.</p>
<p>Except, that's not what anything is like at all. Yes, I'm upset I never got a corner office, but I'm too busy panicking because I have no idea what I'm doing, nobody does, and the wheels just came off. The CEO says AI is making his buddy Jared's team so productive he was able to fire half of them, but like, as a brag, not a threat? I dunno, I felt threatened, but that's probably just my anxiety flaring up. Surely I can borrow a xanax from one of the several employees crying in the bathroom.</p>
<p>Imagine you take a job as a ship captain. You bike into the harbor on your first day, excited to meet your crew. You notice the ship isn't there, but Greg, the very excitable recruiter you spoke to, waves you over and assures you it's not a problem. You're strapped to a catapult and miraculously launched onto the ship. The previous captain started a fire because another captain explained internal combustion to him at Captainpalooza 2025, and he wanted to start iterating towards that. He was pushed off the ship, but took the manual with him. Wouldn't be a problem if it weren't for the fact the entire ship was custom-built for him. The ship still has sails, but they're not connected to the mast, and the internal combustion engine semi-bolted to the stern still has parts scattered all over the deck.</p>
<p>You go below deck to figure out how the ship works and where you're going, but when you follow the stairs to the lower decks you somehow end up in the mast? You ask a sailor what's happening. He glitches and says "You're absolutely right! My approach was flawed, but here's a better stairs implementation". The mast snaps upside down, and you're back on deck, right where you started. The sails are upside down, and your "sailor" excitedly waits for you to tell him how well he's done.</p>
<p>You ask someone else "wait, where are we even going?", and yay a human! No glitching, no peppy but unhelpful answers, an actual human being. She hasn't slept in a week. She barely looks at you and says "ask the navigator". "The navigator?", you ask. She points. The navigator is a doll that says "onward and upward" when you press a button on its back.</p>
<p>The doll catches fire.</p>
<p>This is the job now. You're standing on a burning ship, holding a map, trying to figure out where the hell we're going and how we're going to get there.</p>
<p>You know this ship. Some of you were engineers on one just like it. Some of you were the captain who left. I'm not writing this for the Guy at the birthday party. I'm writing it for you.</p>
<p>You were an engineer once. You remember what a code review was for. You remember being the junior whose first PR got shredded by a senior who took the time to explain why. You didn't wake up one morning in 2024 and decide to abolish that.</p>
<p>What happened was: the runway got cut. The board meeting didn't have the word "values" in it anywhere. The CFO had a spreadsheet. The CEO had come back from an offsite where someone had shown him a demo of an agent writing a whole feature in fourteen minutes, and he had believed it (the way people believe things when they want to believe them) and he had told the board he could cut thirty percent of engineering by Q2. Now it was your job to figure out how.</p>
<p>You told yourself the juniors would be fine. They'd adapt, they'd reskill, they'd land somewhere. You told yourself the seniors could absorb the missing hands, that the agents would cover the gap. You told yourself you'd revisit it next quarter. You signed the list. You went home. You drank a little more than usual. You went to sleep.</p>
<p>You knew.</p>
<p>You knew, because you'd been the engineer who had to clean up after the last leader who'd been sold a simple answer. You'd watched Goodhart's Law eat velocity metrics, story points, test coverage; every number a non-engineer had ever been handed as proof the work was going well. You knew the DORA metrics were already telling you what happens to deployment stability when you add tooling faster than you add judgment. You knew what happens to a codebase when the people who'd catch the errors get pushed out, or learn to stop catching them.</p>
<p>You knew. And you signed off anyway. Because the alternative was losing the job, and the job was the mortgage, and the school fees, and the visa, and the version of yourself who'd fix it later once things stabilized.</p>
<p>Later is never. We all knew that. I signed a list too. We're still pointing at each other about whose list was worse.</p>
<p>There are no more juniors. There was a funeral for their passing in 2024. Nobody came. The machine does what they do now, but cheaper. Of course, juniors weren't valuable for what they produced, they were valuable for who they would become: the senior engineer who knows where the bodies are buried. We optimized for output, and abolished apprenticeship. A few years from now, we'll wonder where all the seniors are. We shot them. Nobody will remember.</p>
<p>And yet…</p>
<p>Somewhere in your infrastructure is a cron job. It runs at 3am. It has been running since 2016. It does something critical. You couldn't tell me exactly what, but you know the one person who could, and they left in 2019. The comment at the top says # DO NOT CHANGE!!! Ask Ben. Ben is not reachable. Every roadmap planning session for the last four years has included "modernize legacy cron" as a candidate initiative. It has never made the cut. You have personally removed it from the list twice.</p>
<p>Someone keeps it running. Her name is Sara. You don't know this.</p>
<p>She's in her mid 50s. She didn't go to Captainpalooza. She used to work from a small office three streets from headquarters. Somebody closed it last year to save money. The ship was the closest place with a desk and a network connection, so she packs a lunch now and takes the gangway down to a cabin belowdecks. Nobody on the ship knows she's there. Remember Ben? Well, she inherited the cron job from Ben, who's mentored her since 1998.</p>
<p>She knows Ben passed a few years back. She went to his funeral. You don't know this.</p>
<p>When the job gets stuck, which it does regularly, she gives it a nudge and it tries again. The phone rings. She acknowledges the issue. She gives the nudge. The job depends on a module that's been lost to time. Well, almost, because she has a copy on a USB stick she found in Ben's desk after his passing. No agent has touched it. None ever will.</p>
<p>She's not the safest person in the industry. She's the shape of what you cannot touch. She is every piece of institutional knowledge your transformation just deleted, walking around in a fifty-five-year-old body. She came up through the apprenticeship you abolished: Ben, 1998, the USB stick. She <em>is</em> the pipeline. When she dies, the thing that produces people like her is already gone. You killed it three years ago. You will not be able to hire her replacement, because you broke the machine that makes her.</p>
<p>She's the man tunneling under Mordor with a spoon. The spoon is hers. So is the tunnel. Nobody else wants the spoon or the tunnel, and when she dies, the cron job dies, salaries stop being paid, a company of 30,000 souls will need to figure out how to pay everybody, and there will be only one answer: hire someone with a spoon. You won't find them. You made sure of that.</p>
<p>The cron job pays salaries. You don't know this.</p>
<p>The Guy at the party is still waiting for an answer. I'm too drunk now to lie. I tell him: AI didn't take our jobs. Greed did. Same greed that moved factories to Bangladesh and keeps slaves in cobalt mines in the Congo, wearing a new mask. Tell the nephew to do something else. Anything. It won't save him either, but at least he won't have to pretend the thing destroying his life is a robot.</p>
<p>Except Sara. Below decks, with her USB stick. They can't come for her because they don't know she's there.</p>
<p>The rest of us are above deck, wondering why the masts are upside down, and what that doll over there does.</p>
<p>The doll catches fire.</p>
