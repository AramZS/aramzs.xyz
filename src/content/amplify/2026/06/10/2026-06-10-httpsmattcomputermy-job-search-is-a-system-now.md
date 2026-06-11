---
author: Matthew Little Hale
cover_image: >-
  https://images.prismic.io/matthewlittlehale/ae96VsBOoF08xVYP_pexels-ron-lach-9832697.jpg?auto=format,compress&rect=0,580,8192,4301&w=2400&h=1260
date: '2026-06-10T14:34:32.143Z'
dateFolder: 2026/06/10
description: Implementing a job pipeline with Obsidian and Claude
isBasedOn: 'https://matt.computer/my-job-search-is-a-system-now'
link: 'https://matt.computer/my-job-search-is-a-system-now'
slug: 2026-06-10-httpsmattcomputermy-job-search-is-a-system-now
tags:
  - ai
  - code
title: My Job Search Is a System Now
---
<figure><img alt="My Job Search Is a System Now" data-nimg="1" src="https://images.prismic.io/matthewlittlehale/ae96VsBOoF08xVYP_pexels-ron-lach-9832697.jpg?auto=format%2Ccompress&amp;rect=0%2C1069%2C8192%2C2000&amp;w=3840&amp;fit=max" srcset="https://images.prismic.io/matthewlittlehale/ae96VsBOoF08xVYP_pexels-ron-lach-9832697.jpg?auto=format%2Ccompress&amp;rect=0%2C1069%2C8192%2C2000&amp;w=3840&amp;fit=max 1x"/></figure>
<p>Over the course of 2025, I helped lead AI initiatives across the Nomad Health organization. As I begin my search for what's next, I took a step back to figure out how to use what I'd learned to actually get organized about it.</p>
<p>So I, as any software engineer who likes to complicate things would do, built a job pipeline tool. Well, I didn't build it - Claude did. If I'm going to keep growing as an engineering leader, I need to keep using the tools that are available to augment what I'm doing. This piece builds on my session coming up at DataDog's DASH conference - <em>Deterministic Until Proven Otherwise: Building AI Agents That Ship</em> - which is the philosophy that ended up shaping this whole system.</p>
<h2>The Problem Wasn't Applying - It Was Keeping Track</h2>
<p>The job market isn't what it was in 2019/2020, but it's picking back up <em>a bit</em>. There are jobs out there. I'm going to keep searching, keep applying, keep getting my reps in.</p>
<p>The real pain of a senior level job search isn't writing resumes. It's state management:</p>
<ul><li>Which version of which resume went to which company</li><li>What the JD actually said, when half the job boards rerender or expire links</li><li>What I promised in the cover letter</li><li>What the recruiter said on the phone three weeks ago</li><li>Which bullets I tuned for which company and why</li></ul>
<p>Every application is a small workflow with a human in the loop. There are artifacts, state transitions, and feedback signals that arrive days or weeks later. Treating it like a pile of browser tabs is a setup for losing the thread. I needed a place to keep notes, record job descriptions, tailor resumes, and see status at a glance.</p>
<h2>The Stack</h2>
<p>A couple years ago I switched to Obsidian for all my note taking. I appreciate its simple filesystem and markdown approach. I'm writing this draft in Obsidian right now.</p>
<p>Because Obsidian is just folders of plain text files, I can grep them, I own them, and - importantly - I can modify them outside of Obsidian. That last part matters more than it sounds.</p>
<p>Claude is the interface for this system. Using a skill-builder skill, I created a skill for the repeatable workflows: adding a new role, fit-checking a job description, moving roles between statuses, adding notes to an active application. That became my "job-pipeline" skill.</p>
<p>A second skill handles the actual resume generation. It uses a docx template to maintain formatting and static elements, then adjusts the content to match the job description.</p>
<p>Obsidian's folder nesting and file naming conventions do the work a database would do in a heavier system. The convention carries the organization while Claude handles the management.</p>
<h3>Claude is the admin</h3>
<p>Read that last sentence again. Claude is the UI. Claude is the admin. Let that sink in for a second - because this is where the future of operational software is going.</p>
<p>The traditional admin panel - rows of tables, dropdowns, bulk actions, filters that never quite filter the way you want - is going to fade. Not entirely, and not tomorrow, but the center of gravity is shifting. The chat interface picks up the slack: "what's in my pipeline?" "show me everything I haven't followed up on in two weeks." "log a new role at Acme." That's an admin panel that reshapes itself to the question being asked.</p>
<p>But chat alone isn't the answer either. The complement is adaptive UI - admin and management surfaces that adjust to the capabilities of the agent behind them. New skill, new view. New tool, new dashboard. The admin panel becomes a living thing, generated and regenerated based on what the system can do today, not what someone wired up in a Figma a year ago.</p>
<p>For my job pipeline, the "UI" is whatever Claude renders into the chat plus whatever Obsidian renders out of the markdown files. Two surfaces, both adaptive in their own way, neither one a traditional CRUD admin panel. That's the shape of the thing.</p>
<h2>Deterministic Until Proven Otherwise</h2>
<p>The temptation was to make this fully agentic - a local app on my machine, scraping job boards, writing cover letters, hitting apply buttons while I sleep. This isn't actually what I want to do, though.</p>
<p>There's a human in the loop at every edge. I read every job description. I write every cover letter. I manually move generated resume files between folders. And, I hope this is obvious, I proofread every resume before it goes out.</p>
<p>Once a resume is generated, I upload it to Google Docs to check wording and formatting. There are actually some intentional pieces I leave broken so that I have to fix them every time. That friction forces careful observation. I'm not suggesting every AI implementation needs that exact pattern, but adding intentional friction at the most sensitive points is how you keep agents safe.</p>
<p>The file structure, templates, schemas, and frontmatter are all fixed. They form a deterministic boundary that Claude works inside of. Agents fail when they try to do everything. The pattern that has actually worked, here and at Nomad with our recruiter agent, is keeping the system deterministic until it can't be anymore - then letting the probabilistic parts operate in narrow scope where they can be checked.</p>
<h2>What I've Seen So Far</h2>
<p><strong>Memory is still required.</strong> Claude, and all the others, forget too easily. You need continuity between sessions. Skills define the workflow, Obsidian holds per-job memory in folders and markdown files, and Claude's in-app memory points in the right direction. The combination means I don't have to keep explaining my career, I get tailored resumes that don't drift, and the system doesn't make up stats.</p>
<p><strong>The fit assessment is worth it.</strong> Claude takes a job description, compares it to my career and what I'm looking for, then gives me an honest read on whether the role is right for me. This is part of the job-pipeline skill. An AI that always says "great fit!" is useless - the value is in the no.</p>
<p><strong>LLMs still get confused.</strong> In one session it was as if Claude lost track of everything - long-running requests, cyclical tool calls, forgetting it already had file access, ignoring the template. It's also fascinating how much the rendered resume's style drifts session to session, even with a locked template. The system catches most of it, but not all. Hence the proofreading.</p>
<h2>The Broader Point</h2>
<p>This is a microcosm of how work is going to get done in engineering organizations.</p>
<p><strong>First, tools are blending together.</strong> I built a Claude skill on top of Obsidian, folder structures, and markdown files. You could build the same thing on Asana, Linear, or your own filesystem. The tool interfaces are starting to fade or become so seamlessly discoverable that you don't think about them anymore. Bring your own tools. Have Claude build a skill to integrate them.</p>
<p><strong>Second, the admin layer is going to look different.</strong> Chat-as-admin, adaptive UIs that shift with the agent's capabilities, the disappearance of the static dashboard. It's worth thinking about now if you're building out agents and admin dashboards into your product today. What does an admin panel look like when the agent it's wrapped around can do something new every quarter?</p>
<p><strong>Third, intentional friction matters.</strong> Just because I <em>can</em> set up Cowork or Computer Use to apply to any job that comes through doesn't mean I should. For sensitive processes - and "sensitive" is broader than people assume - the human touch on the last mile is a deliberate step in the process. This would be true whether I was using a template, a recruiter, or an LLM. The point isn't whether AI is involved, it's whether the timing is yours.</p>
<p>And one bonus: build for yourself before you build for others. If you want your team to ship agents in your product, have them build internal agents for their own work first. Have them experience the hallucinations and the harnesses and all the friction that goes into getting productive results. The intuition you build doing your own work transfers directly.</p>
<h2>Just Build Things</h2>
<p>The biggest takeaway is that AI and agentic tooling have given us an amazing time to be builders. Here's a parallel: I run a weekly community dinner. I've used SignUp Genius for years and find it ugly and ad-laden and not <em>quite</em> what I want. Last month I just built my own tool for it. I'm not going to sell it. If someone needs the same thing, they should build their own too.</p>
<p>These tools work best when you, uh, use them. Solve problems for yourself and for your team. Then you'll see how to solve problems for your product and your company.</p>
<p>If this resonates, the skill and a portable LLM-agnostic prompt are in <a href="https://github.com/Websites-On-Computers/obsidian-claude-job-pipeline">a public repo</a> - fork it, swap your note tool, and make it yours.</p>
<p>Want to talk about engineering leadership, AI adoption, or building agents that actually ship? <a href="https://cal.com/mlittlehale">Book some time</a>.</p>
