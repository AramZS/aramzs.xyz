---
author: Always Twisted
cover_image: >-
  https://www.alwaystwisted.com/images/articles/meta-images/introducing-linting-tokens.png
date: '2026-08-04T16:38:05.983Z'
dateFolder: 2026/08/04
description: >-
  A practical rollout plan for adding design token linting to an existing system
  without blocking delivery.
isBasedOn: >-
  https://www.alwaystwisted.com/articles/introducing-linting-to-an-existing-token-system
link: >-
  https://www.alwaystwisted.com/articles/introducing-linting-to-an-existing-token-system
slug: >-
  2026-08-04-httpswwwalwaystwistedcomarticlesintroducing-linting-to-an-existing-token-system
tags:
  - code
  - design
title: Introducing Linting to your Existing Design Tokens System
---
<p>Adding testing and linting to an established design token system can sound straightforward until that first run returns pages and pages of warnings and errors. Teams will often swing between the pendulum of two extremes. Block everything and slow delivery to an absolute crawl, or keep everything as warnings and never improve quality.</p>
<p>Sometimes they'l decide to skip linting altogether because the debt is simply too ugly to look at before the first coffee of the day.</p>
<p>There can be a better path. Start with visibility, then introduce a few guardrails, then raise the standards over time ... at least that's a theory.</p>
<p>Whether it works depends less on the process and more on who has to do the work.</p>
<h2>Why Rollouts Fail</h2>
<p>Most token linting rollouts fail for process reasons, not technical ones.</p>
<p>A common pattern looks something like this: the team turns on "strict mode" immediately, the existing debt blocks any and every change, and contributors start bypassing the checks the moment they're under pressure to ship. Confidence drops, and the whole idea of linting gets quietly ignored - like an "Invasion of the Body Snatchers" situation, it creeps in without anyone announcing it, and by the time you notice, half the team has already given up on it.</p>
<p>The issue isn't that the linting is wrong. It's the sequencing.</p>
<h2>A Practical Rollout Plan</h2>
<p>Use a phased approach - observe first, block critical failures second, then expand rules gradually. This isn't universal. Teams with greenfield tokens or strict change control don't need to move this slowly. But if you've got years of tokens, multiple owners, and shipping pressure, this sequence tends to work better than jumping straight to enforcement.</p>
<h3>Phase 1 — Run The Baseline Audit</h3>
<p>Run linting in "report only" mode against the full set of Design Tokens. Do not block commits or merges yet. You don't even need to announce to everyone that you've started it. Just run it and look at the results.</p>
<p>Your goal is to clarify and classify what you have. Structural failures like broken references, circular dependencies, and invalid types sit in one bucket. Quality issues such as naming inconsistency, duplicate values, or weak descriptions sit in another. Accessibility risks - contrast failures, missing mode pairings - are a third.</p>
<p>This gives you an idea of the technical risk and cleanup effort before you enforce anything. You'll probably find more than you expectm, but hopefully not too much.</p>
<p>This will take some time, maybe a couple of hours to a full day for a small system, perhasp a week for systems with hundreds of Design Tokens across multiple files. The actual audit is the quick bit, going through and processing the results, working out priorities to take will take longer (a lot longer) than running the linting tools.</p>
<h3>Phase 2 — Fix The Critical Errors</h3>
<p>Now prioritise the issues that would actually break the Design Token transformation or the code that gets shipped: broken references pointing to tokens that no longer exist, circular dependencies where tokens reference one another in a loop, type-value mismatches, and missing required structure where a token doesn't have the shape the system expects.</p>
<p>Do not move to any sort of "blocking mode" until these are under control. This is the point at which most linting rollouts stall.</p>
<p>The debt is real, the cleanup will take time, and meanwhile new Design Tokens keep getting added that should be linted. Some teams get stuck here for months because they try to fix everything at once instead of blocking new problems while cleaning up old ones. That's a losing battle.</p>
<p>If legacy critical errors remain when you try to enforce rules, every commit becomes a negotiation. Developers will either bypass checks or get blocked constantly, and linting starts getting quietly ignored.</p>
<p>How long this takes will vary wildly. A small team with a small suite of Design Tokens can work through this a lot quicker than a team that has been shipping Design Tokens for several years with multiple owners. The hidden risk is that cleanup work will compete with feature work, and I'm sure we can guess which one wins. Dedicate time explicitly, or Phase 2 never ends.</p>
<h3>Phase 3 — Turn On Blocking for Critical Rules</h3>
<p>Once the chosen critical categories are cleaned up, enforce the rules in pre-commit and CI.</p>
<p>Pre-commit is best used for fast, critical checks only. The CI pipeline should run full validation and surface warnings without blocking everything. The release gate is where you enforce "strict mode" for published outputs.</p>
<p>This gives contributors quick, local feedback while keeping CI as a mandatory backstop.</p>
<p>Turning the checks on won't take long, but expect a noisy few days (maybe a week or two) as people hit rules they didn't know existed - which might say more about your documentation than your linter. Some will blame the tool instead of the tokens.</p>
<h3>Phase 4 — Manage Any Warnings as Backlog</h3>
<p>Treat non-critical findings as scheduled improvement work: naming cleanup, duplicate token consolidation, and accessibility improvements are all long-term wins rather than emergencies.</p>
<p>Batch changes by category instead of trying to clear all warnings in one pass.</p>
<p>This phase is an ongoing endevour. Pick one set of warnings in a sprint and work through them all. Try to clear everything everywhere all at once and you just won't - the warnings turn into something in the terminal that everyone learns to scroll past.</p>
<h3>Phase 5 — Expand Rules One at a Time</h3>
<p>Only add rules that solve repeated problems your team actually sees in the Design Tokens. Announce the intent and timeline first, run the new rule in warning-only mode for a short period so people can adjust, then promote it to blocking once the team has had time to catch up.</p>
<p>A predictable rollout beats a surprise every time.</p>
<p>Add one new rule at a time - per sprint, or every couple of weeks, whatever cadence suits your team. Add several at once and you lose visibility into which one is actually causing the friction.</p>
<h2>When Things Get Stuck</h2>
<p>If Phase 2 doesn't finish in a reasonable time, or Phase 3 ends up blocking everything, you'll need a recovery strategy. Otherwise the team, contributores, and stakeholders will bypass the linter or abandon it quietly (or pr not-so-quietly).</p>
<p>Say Phase 2 is stalling - you've been fixing critical errors for two months and still have 30% of the problems left. Two options here. Pick a cutoff date: after that date, new tokens follow the rules strictly, and old tokens get an automatic exception for 90 days with a "revisit" marker. This stops the debt from growing while you clean up the past. Alternatively, move a chunk of the cleanup into Phase 4 as warning-level work instead of blockers. Not everything needs to be critical. If it doesn't break the transformation, it can wait.</p>
<p>If Phase 3 is blocking too many commits - the rules are technically correct but they're stopping every PR - it usually means the critical rules were too aggressive, or Phase 2 wasn't actually finished. Don't blame the linter. Revert the overly strict rules to warning-only, spend more time fixing the underlying issues, then re-enable. Letting developers bypass the checks to push through it is how you destroy trust in the whole system.</p>
<p>If you promoted a warning to blocking and it's caused chaos, give it a week. If adoption is worse than before the change, roll it back to warning-only, fix the underlying problems properly, then try again. Teams need to believe linting changes are considered, not punitive or arbitrary.</p>
<p>Adding a temporary exception isn't failure. Abandoning linting is.</p>
<h2>Ownership and Communication</h2>
<p>Tooling alone will not keep standards high. People need clear ownership, and showing that clarity is harder than it sounds.</p>
<p>Design Token ownership is usually blurry. A designer adds a colour in Figma. A developer syncs it to the repo and changes the name. A component team uses it and documents it differently in their own token file. The token ends up existing in three forms across three systems, and nobody knows which one is the "source of truth." When linting fails, nobody fixes it because nobody knows whose job that is.</p>
<p>So define it properly. Lint rule configuration shouldn't belong to "the design system team" in the abstract - it needs a specific person or rotation who decides which rules matter and when they change. Exception approval shouldn't be open to anyone either; track who approved what, when, and why, and review it regularly. It should create a little friction, enough that people try to solve the underlying problem first, but not so much it's unusable. And someone needs to own the docs and examples - a decision log covering what you lint, why, how to fix it, and what doesn't apply to a given team, updated as rules change.</p>
<p>Then make failures actionable. "Circular reference detected" isn't useful on its own. "color.primary references color.secondary which references color.primary: fix by changing line 42 to reference color.base.blue instead" is. If a pull request touches 300 tokens and every violation gets dumped into the output, nobody reads it - surface new violations first, then warnings, then the existing backlog. And any exception paths should be documented, rare, and time-locked. Never approve one without recording why and setting a review date. Untracked exceptions become permanent drift.</p>
<h2>Exception Handling Without Chaos</h2>
<p>Some exceptions are legitimate. Most teams have a few. The trouble is knowing which ones you actually have, and why they exist.</p>
<p>Common cases in design token systems:</p>
<ul> <li>Vendor tokens that can't be renamed. You sync a third-party design system and their Design Tokens use <code>snake_case</code> while your convention is <code>kebab-case</code>. You can't change the vendor's output, so those tokens get an exception.</li> <li>Legacy platform constraints. Swift restricts which Unicode categories are valid in variable names. Tokens that were named before that constraint was understood, or before the system targeted Swift at all, may not conform. Renaming them touches generated code across multiple platforms. They get an exception until there's a dedicated migration window.</li> <li>Transitional naming during migrations. You're moving from a 2-tier token structure to a 3-tier structure. For six months both exist in the codebase. The old ones generate linting warnings but removing them would break live products, so they get a temporary exception.</li> <li>Third-party component tokens. A team from another part of the org has contributed tokens for their component library. They follow a naming convention you don't use, and aligning them would require coordinated changes across codebases you don't own. The exception lives here until ownership is clarified or a migration is agreed.</li> </ul>
<p>For each exception, record why it's allowed, and be specific: "Swift identifier restrictions" or "vendor output we cannot modify" or "coordination required with Squad Dave" all tell you something useful later. Record the scope too - "the token file" isn't good enough, but "all tokens matching <code>@tokens/vendor/**</code>" is. Record who approved it, because that person owns defending it. And record when it should be reviewed or removed: a date or a condition, like "Q4 2026" or "when we ship v3 of the component library" or "no longer needed as of Framework 5.8."</p>
<p>Untracked exceptions become permanent. A year on, nobody remembers why they exist, everyone assumes they're intentional, and they end up staying in the codebase indefinitely.</p>
<h2>Measuring Success</h2>
<p>You don't need perfect compliance on day one. You need a system that stops quality from getting worse while the baseline steadily improves.</p>
<p>Healthy signals: critical failures are rare and get fixed quickly, contributors trust the lint output, rule changes feel predictable, and release consumers stop seeing avoidable token breakages.</p>
<p>But "healthy signals" is pretty vague, so track something concrete. Time to fix a linting error in code review is a good one - early on it should be fast, developers see the error, understand the fix, and push a correction within the hour. If review stalls because the error is confusing, your messages need work. If it takes days to get clarification, ownership isn't clear enough.</p>
<p>Watch critical errors in CI too. After Phase 3 this should be close to zero each week. Seeing five a week two months in tells you Phase 2 wasn't actually finished.</p>
<p>New exceptions requested per month is worth tracking as well. Expect a spike early on as teams ask for legitimate carve-outs, then a decline. If exceptions keep climbing instead, your rules are probably too strict, or don't match how your teams are actually structured.</p>
<p>Production incidents caused by token problems should drop noticeably once linting lands. If they don't, either the linting isn't comprehensive enough or token problems were never your real bottleneck.</p>
<p>Time spent on token-related code review is the last one - it should fall after Phase 3 because the linter is catching the obvious stuff before a human looks at it. If review time stays flat, either the linter isn't doing useful work, or people have started ignoring it.</p>
<p>Pick one or two of these that matter to your team and track them monthly. That's the real goal - reliable token quality without blocking delivery. You'll know it's working when the numbers move, not when the process looks tidy on paper.</p>
<h2>Start Small, Enforce Smart</h2>
<p>If you're introducing linting today, start with one rule that catches a "high impact" failure. Prove the value quickly by fixing the real faults, then expand in controlled steps.</p>
<p>A gradual rollout isn't a compromise. It's how linting actually sticks, or at least how it's most likely to. The difference between success and failure usually has nothing to do with the tooling and everything to do with timing, team buy-in, and how much debt you're sitting on.</p>
<p>What actually works is paying attention to your team, your constraints, your needs, and your debt.</p>
