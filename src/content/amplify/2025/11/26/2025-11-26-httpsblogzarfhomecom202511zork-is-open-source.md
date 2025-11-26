---
author: Andrew Plotkin
cover_image: ''
date: '2025-11-26T20:17:12.112Z'
dateFolder: 2025/11/26
description: >-
  Two years ago, I wrote: Microsoft-the-company does not care about Infocom. But
  a lot of people in Microsoft must care. Microsoft is heavily populated by
  greying GenX nerds just like me. Folks who grew up with the first home
  computers and fondly ...
isBasedOn: 'https://blog.zarfhome.com/2025/11/zork-is-open-source'
link: 'https://blog.zarfhome.com/2025/11/zork-is-open-source'
slug: 2025-11-26-httpsblogzarfhomecom202511zork-is-open-source
tags:
  - tech
  - gaming
title: Zork is now open source
---
<p>Two years ago, I wrote:</p>
<blockquote> <p>Microsoft-the-company does not care about Infocom. But a lot of people <em>in</em> Microsoft must care. Microsoft is heavily populated by greying GenX nerds just like me. Folks who grew up with the first home computers and fondly remember the games of the early 1980s.</p> <p>To those nerds, I direct this request:</p> <p>It is time to do right by the memory of Infocom. It is time to let it go.</p> <p>--<a href="https://blog.zarfhome.com/2023/10/microsoft-consumes-activision">Microsoft consumes Activision; and a plea</a>, Oct 13, 2023</p> </blockquote>
<p>I am happy to say that, as of today, Microsoft did that thing.</p>
<blockquote> <p>Today, we’re preserving a cornerstone of gaming history that is near and dear to our hearts. Together, Microsoft’s Open Source Programs Office (OSPO), Team Xbox, and Activision are making Zork I, Zork II, and Zork III available under the MIT License. Our goal is simple: to place historically important code in the hands of students, teachers, and developers so they can study it, learn from it, and, perhaps most importantly, play it.</p> <p>--<a href="https://opensource.microsoft.com/blog/2025/11/20/preserving-code-that-shaped-generations-zork-i-ii-and-iii-go-open-source">Preserving code that shaped generations: Zork I, II, and III go Open Source</a>, Nov 20, 2025</p> </blockquote>
<p>The post is signed by Stacey Haffner (MS Open Source Programs Office) and Scott Hanselman (VP, Developer Community). I'm naming them because, as I said above, this is an effort that was pushed through by <em>people</em>. Companies do not do things like this blindly or out of habit. It happens when someone who cares makes an effort.</p>
<p>Okay, I bet you have questions. So do I!</p>
<p><strong>So what's changed?</strong></p>
<p>The three <code>historicalsource</code> repos on Github (<a href="https://github.com/historicalsource/zork1">Zork 1</a>, <a href="https://github.com/historicalsource/zork2">Zork 2</a>, <a href="https://github.com/historicalsource/zork3">Zork 3</a>) all now have the MIT license attached.</p>
<p>I'm not sure what else changes right away. As we all know, fans have be <em>treating</em> the Infocom source as a community playground for five years now. I certainly have.</p>
<p>I think the biggest shift is that educators (teachers, museums, etc) can use the games openly. No paperwork or fuss or guilty photocopying behind the barn.</p>
<p>(Anybody want to install my <a href="https://eblong.com/infocom/visi-zork1/">Visible Zorker</a> in a museum?)</p>
<p><strong>What does this include?</strong></p>
<p>I quote directly:</p>
<blockquote> <p>This release focuses purely on the code itself. It does not include commercial packaging or marketing materials, and it does not grant rights to any trademarks or brands, which remain with their respective owners. All assets outside the scope of these titles’ source code are intentionally excluded to preserve historical accuracy.</p> </blockquote>
<p>I'm not sure what "historical accuracy" means there.</p>
<p>As a reminder, the "Infocom" trademark has been dropped and picked up by at least <a href="https://blog.zarfhome.com/2020/07/trademarking-infocom-again-part-one">three different weirdos</a> since the original Infocom evaporated. The "Zork" trademark lapsed long ago, but Activision held onto "Return to Zork" for some reason.</p>
<p>If you're interested in the packaging and such, I recommend these well-known Infocom fan sites:</p>
<ul> <li><a href="https://infodoc.plover.net">The Infocom Documentation Project</a></li> <li><a href="https://www.mocagh.org/loadpage.php?getcompany=infocom">The Museum of Computer Adventure Game History</a></li> <li><a href="https://invisiclues.org">Invisiclues.org</a></li> </ul>
<p><strong>Which versions of Zork are these?</strong></p>
<p>The <a href="https://github.com/historicalsource/zork1">Zork 1</a> repo contains Zork 1 release 119, serial 880429. (See the <a href="https://github.com/historicalsource/zork1/blob/master/zork1.chart"><code>zork1.chart</code></a> file in that repo, or the runnable game file in <code>COMPILED/zork1.z3</code>.) This is <em>not</em> a version that Infocom ever sold, as far as I know. All the Zork collections available since 1990 have contained release 88, serial 840726. So this is not the exact version of Zork that you played way back when.</p>
<p>The other repos are <a href="https://github.com/historicalsource/zork2">Zork 2</a> release 63, serial 860811; and <a href="https://github.com/historicalsource/zork3">Zork 3</a> release 25, serial 860811.</p>
<p>My <a href="https://eblong.com/infocom/">Obsessively Complete Infocom Catalog</a> labels these three versions as "final-dev". That is, they appear to be the last versions that were compiled by Infocom people -- or the last that were preserved, anyhow. As such, they may <em>not</em> have gone through release testing. Beware obscure bugs!</p>
<p>I am taking just a bit of liberty to assume that Microsoft's declaration covers <em>all</em> known versions of Zork 1/2/3. Again, see my <a href="https://eblong.com/infocom/">Infocom Catalog</a> page.</p>
<p>UPDATED: I am reminded (<a href="https://intfiction.org/t/zork-1-2-3-are-officially-and-legally-released-under-the-mit-license/77938/10">thanks</a>!) that the repositories <em>do</em> contain earlier source versions. (Which I noticed five years ago, but forgot.) There's no Git branch or tag to mark them, but you can <a href="https://github.com/historicalsource/zork1/commits/master/">browse the commit history</a>.</p>
<p><strong>What about the other thirty-whatever Infocom games?</strong></p>
<p>Those three Zork repos are the ones that Jason Scott created back in <a href="https://blog.zarfhome.com/2019/04/all-of-infocoms-game-source-code">2019</a>. He created repos for all the other Infocom games too! They're all there. That collection is the entire starting point for Infocom source research. (It's the basis for my collection, for example.)</p>
<p>So MS linking there is... well, it's a knowing wink at the very least.</p>
<p>My understanding is that the MS folks hope and intend to get the rest of the Infocom catalog out under the same license. But it's a slow process; lawyers have to sign off. It took two years to get this far. No bets if or when the next step will happen.</p>
<p><strong>How about <em>Hitchhiker's</em> and <em>Shogun</em> though?</strong></p>
<p>Ooh, that's an interesting question.</p>
<p>I have long theorized -- please underline "theorized" -- that sometime around 1995, Activision handed the rights to those games back to Douglas Adams and (the estate of) James Clavell. Those two titles were notably absent from the <a href="https://archive.org/details/Classic_Text_Adventure_Masterpieces_of_Infocom_Activision_CDD-3650-101-U3_1996">Masterpieces of Infocom</a> CD-ROM collection (1996). And Douglas Adams posted the <em>Hitchhiker's</em> game on his own web site shortly after that. (It's now hosted by the <a href="http://www.bbc.co.uk/h2g2game">BBC</a>.)</p>
<p>(The estate of James Clavell did <em>not</em> post <em>Shogun</em> anywhere. Possibly because it stank.)</p>
<p>But I have no inside knowledge of the legalities behind this. It's all guesswork. Maybe Microsoft will announce that those games are open-source tomorrow. Or never.</p>
<p><strong>Did you have anything to do with this?</strong></p>
<p>I wrote a <a href="https://blog.zarfhome.com/2023/10/microsoft-consumes-activision">blog post</a>. What else do you want?</p>
<p>I've chatted a bit with some Microsoft people. Not in detail, and I was not privy to any plans. (Today's announcement was a total surprise to me.) But I did send reminders a couple of times, as the months dragged on. So maybe you can credit me as "gadfly".</p>
<p>When I released the <a href="https://eblong.com/infocom/visi-zork1/">Visible Zorker</a> back in January, I dropped Scott Hanselman a note. "Look! This is the kind of thing that researchers can do with legitimate access to the source code!" He liked it. I hope it helped.</p>
