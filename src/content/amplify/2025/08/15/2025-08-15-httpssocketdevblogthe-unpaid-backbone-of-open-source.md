---
author: Sarah Gooding
cover_image: >-
  https://cdn.sanity.io/images/cgdhsj6q/production/fb4bdc0528052803264cc04fd04f8efc68b67422-1024x1024.webp?w=1000&fit=max&auto=format
date: '2025-08-15T05:01:16.218Z'
dateFolder: 2025/08/15
description: >-
  Solo open source maintainers face burnout and security challenges, with 60%
  unpaid and 60% considering quitting.
isBasedOn: 'https://socket.dev/blog/the-unpaid-backbone-of-open-source'
link: 'https://socket.dev/blog/the-unpaid-backbone-of-open-source'
slug: 2025-08-15-httpssocketdevblogthe-unpaid-backbone-of-open-source
tags:
  - tech
title: >-
  The Unpaid Backbone of Open Source: Solo Maintainers Face Increasing Security
  Demands
---
<figure><img alt="The Unpaid Backbone of Open Source: Solo Maintainers Face Increasing Security Demands" src="https://cdn.sanity.io/images/cgdhsj6q/production/fb4bdc0528052803264cc04fd04f8efc68b67422-1024x1024.webp?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p>A new <a href="https://explore.tidelift.com/2024-survey/2024-tidelift-state-of-the-open-source-maintainer-report">survey</a> from Tidelift highlights a grim reality that we already knew and would rather not confront: The security of the world’s most critical software hangs on a small number of solo maintainers, the majority of whom are unpaid volunteers.</p>
<p>The report includes insights from 437 respondents who maintain at least one open source project. Despite the clarion call for better maintainer support following incidents like xz-utils and the Log4j vulnerability, 60% of maintainers are still not paid for their work, a finding that mirrors the stats from last year.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/aeb89772734009ac6c0cbc3f5c36dabec2009e82-818x499.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p>The maintainers who are professional or paid for their work are more likely to have help, where more than half of them have two or more co-maintainers. Tidelift found that unpaid maintainers are more likely to be flying solo, with 61% reporting that they maintain their projects alone.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/b6177ba20ad981db9773d080bad06a0609bbc5a8-750x402.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<h2>The Reality of the Solo Open Source Maintainer</h2>
<p>Tidelift’s 2024 findings echo other industry voices that have been working to draw attention to the reality of the solo open source maintainer. In April, Josh Bressers, VP of Security at Anchore, gave a <a href="https://docs.google.com/presentation/d/1exE08fUUra34FtlGaAk_kD4GSFuOftxej7DtQib_lus/edit#slide=id.g249ebc07193_0_20">presentation</a> on the mind-boggling size of open source.</p>
<p>“There are A LOT of organizations (governments, foundations, companies) that are trying to create rules and regulations for open source use,” Bressers commented on Mastodon. “And none of them understand how huge it is. And it's not just the size, it's also growing faster than we can possibly keep up (for example there are more than 9000 releases every day. Good luck auditing that).”</p>
<p>In 2022, Bressers responded to a GitHub <a href="https://github.com/ossf/tac/issues/101">issue</a>, where OpenSSF was attempting to define a “healthy number” of open source maintainers for OpenSSF projects, with a candid reality check.</p>
<p>“There have been 28 million npm package releases (this is all packages times all versions),” Bressers said. “Of all those releases, 16 million (that is not a typo, 16 with six zeroes) have one maintainer.</p>
<p>“It's very easy to argue that more maintainers is better, but if we want to start pushing a narrative that one maintainer is bad, there's no way to find the millions of developers needed to fill in the gaps.”</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/45da1dae2b264680dc70b50a58e62439e67e8582-931x710.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p>While some participants in the discussion said 2+ maintainers is aspirational, the reality is so far from that goal that it seems almost unattainable for many projects. This is especially true for the npm ecosystem where smaller modules are much more common.</p>
<p>“A vast number of OSS projects are single maintainer, and it's not really something the maintainer can fully control - you have to convince others to join,” David Wheeler, Director of Open Source Supply Chain Security at the Linux Foundation, said. “So ‘1 maintainer project’ is a higher risk, but it's not automatically an indicator that the project is poorly run.”</p>
<p>Bresser’s 2024 presentation on the magnitude of open source concludes with two statements that are worth pondering:</p>
<blockquote>There’s nothing wrong with open source, this is how it works.</blockquote>
<blockquote>There’s something wrong with what we expect from open source.</blockquote>
<p>Not much has changed in the last year since Tidelift published its 2023 survey data. Solo open source maintainers are still far and away the most common structure for projects, and the majority of them are still working on a volunteer basis.</p>
<h2>A Tiny Core of Maintainers Supports the Majority of Open Source</h2>
<p>Tidelift’s 2024 data sparked more conversation on Mastodon about how many people are actually maintaining the world’s most important software. Using data from <a href="http://Ecosyste.ms">Ecosyste.ms</a>, Bressers estimated that there are <a href="https://fosstodon.org/@joshbressers@infosec.exchange/113161055867269428">1.4 million unique maintainers</a> (those who have the authority to publish or update a package on a package manager).</p>
<p>This is a relatively small number of people when measured against the sheer volume of open source packages and the growing dependency ecosystem that powers modern software.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/04d73989ba92fc1442705cfe7efe387f627ef42e-577x629.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p><a href="http://Ecosyste.ms">Ecosyste.ms</a> creator Andrew Nesbitt estimates the number of unique maintainers is even smaller for the critical packages, those that get 80% of all usage within their ecosystems. With these filters in place, there are an estimated <a href="https://fosstodon.org/@andrewnez@mastodon.social/113165336409184973">10K people who are supporting the majority of the world’s open source software users</a>.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/f2333b1e4e6241e7627d41bdc4c6599bdfe585f6-584x221.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p>“Fundamentally there aren't as many developers/maintainers/whatever as everyone thinks there are, and I suspect the current open source developer number is below the number needed for a sustainable population,” Bressers <a href="https://fosstodon.org/@joshbressers@infosec.exchange/113164449144769974">commented</a>.</p>
<p>”I think very successful open source projects like curl and linux have skewed narrative of how open source works. Most projects are one overworked, undervalued, and nearly burnt out person.”</p>
<h2>Paid Maintainers Create More Secure Software</h2>
<p>It’s no surprise that Tidelift’s survey found that paid maintainers create more secure software. When asked what improvements maintainers have made to their projects as the result of getting paid for their work, 52% reported that they are better able to research and respond to security issues and bugs, and 51% report improving their project’s secure development practices. 45% of respondents also reported having more time to prioritize remediating vulnerabilities that impact the project or its dependencies.</p>
<ul><li>Maintainers are spending 3× more time on security than they did a few years ago.</li><li>Maintainers are much more likely to align with the OpenSSF Scorecard when they are paid for their work.</li></ul>
<p>Paid maintainers are more likely to implement critical security practices, across nearly every category, than unpaid maintainers:</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/6615b619e079ba61d0045f09f9f043fe19cfc7cf-759x594.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p>Unpaid maintainers’ willingness to implement critical security practices jumps much higher (over three quarters) if they were being paid for the work, like static code analysis (81%), two-factor authentication (80%), providing fixes and recommendations for vulnerabilities (80%), providing a security disclosure plan (79%), and providing signed releases and published artifact provenance (75%).</p>
<h2>Mounting Pressures and Growing Distrust: The Impact of Security Demands on Overburdened Maintainers</h2>
<p>Both paid and unpaid maintainers report spending more time on increasing security demands, but in the wake of the xz-utils incident two-thirds (66%) said they are less trusting of pull requests from non-maintainers. More than 1/3 (37%) report that they are also less trusting of contributions from their co-maintainers or feel the need to vet them more carefully. This makes the maintenance burden even more labor-intensive.</p>
<figure><img alt=" " src="https://cdn.sanity.io/images/cgdhsj6q/production/f43aa05f98aa352c22b0ffc3c646fa2ab69657ae-833x500.png?w=1600&amp;fit=max&amp;auto=format"/></figure>
<p>At the same time, nearly half of maintainers surveyed feel under appreciated (48%) and like the work is thankless. This year 50% of maintainers reported not being financially compensated enough for their work. The vast majority of maintainers prefer receiving a predictable, monthly income (81%) vs a one-time lump sum (7%). Most are not getting either.</p>
<p>One of the most sobering stats from the 2024 survey is that 60% of maintainers have quit or considered quitting their maintenance work, up 2% from the previous year.</p>
<p>“Users can be so entitled,” one respondent said, “‘Why haven't you merged/fixed this? This project is dead.’ No, I have debts, a full-time job, a young family, my parent just died, and my wife has a serious medical issue. I have already sunk thousands of hours into this project, I don't have time to deal with this right now.”</p>
<p>This survey bears several strong indicators that the state of open source sustainability remains precarious, with the majority of maintainers still unpaid and facing increasing demands, particularly around security. The possibility of an xz-utils style backdoor supply chain attack is now firmly lodged in maintainers’ consciousness, adding a heightened level of caution and stress to what is already a heavy burden.</p>
<p>“To be honest, there's a lot that is troubling here,” Tidelift co-founder Luis Villa <a href="https://fosstodon.org/@luis_in_brief@social.coop/113154527457125827">said</a>. “Maintainers continue to be burnt out and under-appreciated. We've now had multiple years of White House summits, and an entire EU legislative process, on FOSS security. And yet the same number of maintainers are building software without being paid to do it: about 60% of them. In no other part of the global economy do we expect volunteers to solve our problems—but apparently that's what we're doing here, now.</p>
<p>“As with everything else, xz has passed and gone in a flash—everyone in the industry read an email saying ‘I’m burnt out and unpaid, here are the keys to the kingdom.’ And yet our survey data suggests that, if anyone is trying to solve the problem, maintainers aren't seeing the solutions yet.”</p>
