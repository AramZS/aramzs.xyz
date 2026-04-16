---
author: Viv
cover_image: 'https://viv.sifty.studio/social-preview.png'
date: '2026-04-15T11:52:00.055Z'
dateFolder: 2026/04/15
description: Viv is an engine for emergent narrative.
isBasedOn: 'https://viv.sifty.studio/'
link: 'https://viv.sifty.studio/'
slug: 2026-04-15-httpsvivsiftystudio
tags:
  - code
  - tech
  - gaming
  - writing
title: An engine for emergent narrative. By
---
<blockquote> <p><em>The goals we set for the system are heroic, and demand heroic test cases.</em></p> <p>— Sheldon Klein (1976)</p> </blockquote>
<h2>Overview</h2>
<p> Emergent Narrative You write Viv code, put characters in your game (or other simulation), and Viv makes the magic happen. Stories emerge according to what you authored.</p>
<h2>Features</h2>
<h2>Usage</h2>
<p>Here’s a simple, yet potent, Viv action that shows off a bit of the syntax.</p>
<p>This action is initiated by a character who searches over their own memories to find evidence of another character repeatedly mistreating them, and it can only be performed if such memories exist. As a result of the action, the initiator will lower their affinity toward the character in question—and may even plot revenge as a result.</p>
<figure><pre data-language="viv"><code>// A character processes their repeated mistreatment by another characteraction contemplate-mistreatment:as: character, anywhere  // Not physically present@mistreatments*:  // 3-5 past actions where @subject harmed @thinkersearch query harm:  // Defined elsewhere: a query for finding harmful actionsover: @thinker  // Search over @thinker's memories@thinker.affinity[@subject] -= #BIGif @thinker.personality.vengeful:  // More arbitrary sim data (from Viv's view)queue plan plot-revenge:  // Defined elsewhere: a plan for orchestrating the actions of a revenge scheme</code></pre></figure>
<p>As these events unfold, Viv will work behind the scenes to automatically track all the causal threads: the <code>@mistreatments*</code> actions → <code>contemplate-mistreatment</code> → the <code>plot-revenge</code> actions. This happens automatically behind the scenes, via Viv’s mechanism for <em>causal bookkeeping</em>. Later on, the emergent storylines embedded in this graph can easily be detected via Viv’s facilities for story sifting.</p>
<p>All the while, the Viv author has not been tasked with explicitly marking these links—they simply wrote down what kinds of past actions might lead someone to perform <code>contemplate-mistreatment</code>, and what kinds of follow-on actions might happen as a result of its performance.</p>
<p>For a more extensive example of Viv code, see the working example <a href="https://viv.sifty.studio/introduction/tour/">here</a>.</p>
