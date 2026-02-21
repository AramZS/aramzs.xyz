---
author: inkandswitch.com
cover_image: 'https://www.inkandswitch.com/peritext/revolutionibus.jpg'
date: '2026-02-20T16:11:05.820Z'
dateFolder: 2026/02/20
description: >-
  Collaboration on rich text is hard to model with plain-text approaches. We
  review the challenges and how to construct a CRDT for rich text.
isBasedOn: 'https://www.inkandswitch.com/peritext/'
link: 'https://www.inkandswitch.com/peritext/'
slug: 2026-02-20-httpswwwinkandswitchcomperitext
tags:
  - code
  - tech
title: A CRDT for Rich-Text Collaboration
---
<p>In a real-time collaborative editor such as Google Docs, every keystroke typed into a document is immediately visible to the other collaborators. While this can be very convenient, such real-time (or <em>synchronous</em>) collaboration is not always what users want.</p>
<p>We interviewed eight people who regularly collaborate professionally on documents such as news articles, and several told us that they found real-time collaboration a stressful experience: they felt performative, self-conscious of others witnessing their messy work-in-progress, or irritated when a collaborator acted on suggestions before the editing pass was complete. When doing creative work, they preferred to have space to ideate and experiment in private, sharing their progress only when they are ready to do so.</p>
<p>With <em>asynchronous</em> collaboration, this is possible: a user may work in isolation on their own copy of a document for a while, without seeing other users’ real-time updates; sometime later, when they are ready to share their work, they can choose to merge it with their collaborators’ edits. Several such copies may exist side-by-side, and some might never be merged (e.g. if the user changed their mind about a set of edits).</p>
<p>Many software developers are familiar with asynchronous workflows in the form of Git branches and <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests">pull requests</a>. However, the manual merge conflict resolution required by Git is not user-friendly, especially for a complex file format such as rich text (i.e. text with formatting).</p>
<figure><figcaption> <p>In Google Docs, the updates to a document form a single linear timeline; every change is immediately merged. Asynchronous collaboration requires a Git-like model where multiple versions (branches) of a document can exist side-by-side, and those versions can be merged when the users are ready to do so.</p> </figcaption></figure>
<p>The collaboration algorithm used by Google Docs (<a href="https://drive.googleblog.com/2010/09/whats-different-about-new-google-docs.html">Operational Transformation</a>) assumes that a document has a single, linear timeline of edits, which is managed by a cloud service. In order to support asynchronous collaboration with a Git-like branching and merging workflow, one key problem we need to solve is: how can we take any two versions of a document, which have been edited independently, and merge them in a way that preserves the intentions behind the different users’ edits as much as possible?</p>
<p>Peritext is a novel algorithm for merging versions of a rich-text document. It is a Conflict-free Replicated Data Type (<a href="https://crdt.tech/">CRDT</a>), guaranteeing that if two users independently merge the same two versions, they will converge towards the same result. In addition to asynchronous collaboration, Peritext provides a basis for <a href="https://www.inkandswitch.com/local-first/">local-first</a> rich-text editing software, which has benefits such as allowing users to continue working while their device is offline, and giving users greater privacy, ownership, and agency over the files they create.</p>
<aside> <p>For example, <a href="https://www.notion.so/">Notion</a> (who supported this research) allows users to edit their notes offline, but if two users concurrently edit the same paragraph (called “block” in Notion), then only one of those edits is preserved, and the other is discarded. The Peritext algorithm would allow them to merge those edits instead.</p> </aside>
<p>Peritext is not a complete system for asynchronous collaboration: for example, it does not yet visualize differences between document versions. Moreover, in this article we focus only on <em>inline formatting</em> such as bold, italic, font, text color, links, and comments, which can occur within a single paragraph of text. In a future article we will extend our algorithm to support <em>block elements</em> such as headings, bullet points, block quotes, and tables. Despite these limitations, Peritext is an important step towards asynchronous collaboration for rich text.</p>
<p>Besides explaining our algorithm and demonstrating our prototype implementation, this article also analyzes several examples of rich-text editor behavior in practice, which inform a model for preserving user intent in rich-text editing. To our knowledge there is no existing algorithm that is able to handle all of these examples correctly; existing CRDTs for plain text are difficult to adapt for rich text. As there is surprisingly little existing research on enabling collaboration in rich-text documents, we hope that this analysis will also be valuable for anybody who is interested in rich-text collaboration.</p>
<figure><img alt="Two pages from a historical scientific text including margin notes and a figure depicting orbital bodies as concentric circles." src="https://www.inkandswitch.com/peritext/revolutionibus.jpg"/><figcaption> <p>The <em>peritext</em> of a document are elements that surround the main body of the text, such as cover pages, notes, or other supporting elements. Depicted here are annotated pages from <a href="https://en.wikipedia.org/wiki/De_revolutionibus_orbium_coelestium">De revolutionibus orbium coelestium</a>, by Nicolaus Copernicus (1543).</p> </figcaption></figure>
<p>When writers are collaborating asynchronously, it is impossible for an algorithm to always merge edits perfectly. As one example, if two writers are editing the script for a TV show, changes to one episode may require plot changes in future episodes. Since an algorithm cannot do this automatically, human intervention is often necessary to produce the desired final result.</p>
<p>However, writing tools can still help enormously with the collaboration process. When two users have independently edited a document, manually merging those versions is tedious and error-prone. We want a writing system that helps authors perform these merges easily and consistently. Even if an automatic merge is imperfect, it allows authors to quickly get back in sync with each other, and minimize the time they have to spend struggling with their writing tools.</p>
<p>Before we can implement an algorithm to perform this automatic merge, we first need to define a clear model for user intent, and define the expected results when concurrent edits are merged. In this section we develop such a model through a series of examples.</p>
<p><strong>Example 1.</strong> Let’s begin with a preliminary example: concurrent insertions on plain text. Imagine that Alice and Bob are editing a document concurrently, without knowledge of each others’ changes. Perhaps Alice is editing offline on the train, or Bob is trying out some changes in a private branch.</p>
<p>Before either user applies their changes, we start with the sentence:</p>
<p>Each user, unbeknownst to the other, inserts some text somewhere in the sentence:</p>
<p>Later on, the two users sync back up, and we need to merge both of their changes. Intuitively, the correct merge result is to keep both of their insertions in the same location, relative to the surrounding text at the time the text was inserted:</p>
<p>For example, Bob inserted “␣over the dog” after the word “jumped”, so it makes sense that the word ends up in that position in the merged sentence. Inserted characters should stay in the same place relative to the context in which they were inserted; text shouldn’t move around just because some words were added or removed elsewhere in the document. Existing algorithms for plain text collaboration already implement this behavior.</p>
<aside>We use the symbol “␣” to indicate a space when it occurs at the start or end of a string, to make clear what exactly is being inserted.</aside>
<p>Now let’s consider some new intent preservation properties that emerge when formatting is involved. Starting with the same sentence as before:</p>
<p><strong>Example 2.</strong> Alice bolds the text, while Bob inserts some new text:</p>
<p>Alice:</p>
<p>What should the merge result be in this case? One answer might be:</p>
<p>This seems like an odd result. It’s true that Alice didn’t apply bold to the word “brown,” but that’s just because she didn’t know the word would be there when she applied the formatting. Similarly, Bob did not insert “brown” with bold formatting, but that’s only because he didn’t know Alice had bolded the surrounding area.</p>
<p>A different way to interpret the users’ intent would be to assume that Alice’s intent is to bold the whole sentence, and Bob’s intent is to add a word in the middle of the sentence. Both of these intents can be preserved by a different merge result:</p>
<p>The latter result seems more likely to be correct. This merge result suggests a general rule: when formatting is added to the document, it applies to any text inside a range between two characters, even if that text wasn’t present when the formatting was applied.</p>
<aside> <p>In a sense, both of these merge results can be considered correct, as long as both users converge to seeing the same document. Deciding which option better preserves intent is ultimately a subjective design question. The algorithm won’t always perfectly capture user intent.</p> </aside>
<p>What should happen when both users apply formatting at the same time to overlapping regions?</p>
<p><strong>Example 3.</strong> Let’s say Alice bolds the first two words while Bob bolds the last two words:</p>
<p>Alice:</p>
<p>Bob:</p>
<p>When we merge these two edits into a single document, we observe that the word “fox” was set to bold by both users. A given character is either bold or non-bold, so in this case there is only one reasonable outcome — the whole text should be bold:</p>
<p><strong>Example 4.</strong> What should happen if Alice bolds some text while Bob makes an overlapping span italic?</p>
<p>Alice:</p>
<p>It seems clear that “<strong>The</strong>” should be bolded, and “<em>jumped</em>” should be italicized. But what formatting should apply to “fox”, where both users changed the formatting?</p>
<p>One option would be to exclusively pick either the bold or italic formatting, eliminating the effects of one user’s actions. However, because bold and italic can coexist on the same word, we think it is most logical to apply both stylings to the word, making “fox” both bold and italic:</p>
<p>So far, we have seen merge results that seem to faithfully preserve both users’ intent. However, not all kinds of formatting merge so cleanly.</p>
<p><strong>Example 5.</strong> Consider assigning colored highlighting to some text. Alice applies red coloring to “The fox”, and Bob applies blue coloring to “fox jumped”:</p>
<p>What should happen when we merge these two edits? Unlike the previous examples, there is no way to preserve the intent of both users — the word “fox” must be either red or blue, it can’t be both. As a result, this is a <em>conflict</em> that may require some manual intervention to resolve.</p>
<p>One strategy might be to entirely eliminate one user’s edit because the two can’t coexist. For example, we could just apply Alice’s red highlighting and ignore Bob’s blue highlighting. However, to us this seems unreasonably restrictive. Only <em>part</em> of the two highlighted ranges overlapped; Bob’s coloring on the word “jumped” could have been preserved without issue. Another option might be to blend the two colors together on the word “fox”, but then we would be creating a new color that was used by neither Alice nor Bob, and that doesn’t seem right either.</p>
<p>In our opinion, the most reasonable behavior is: in the region where the two formatting ranges overlap, we arbitrarily choose either Alice’s color or Bob’s color.</p>
<p>The important thing is that the same color is chosen for everyone who views the document, so the choice needs to be deterministic. And if somebody subsequently changes the color again, then the latest color-change operation determines the final color.</p>
<aside> <p>This conflict resolution policy is known as “<a href="https://crdt.tech/glossary">last write wins</a>”. It is often implemented by attaching a timestamp to each update, and letting updates with greater timestamps override updates with lower timestamps. Computer clocks can’t always be trusted, so <a href="https://www.cl.cam.ac.uk/teaching/2122/ConcDisSys/dist-sys-notes.pdf">logical timestamps</a> may be used instead.</p> </aside>
<p>It’s also worth noting that when faced with a conflict, we aren’t just limited to making an arbitrary automated choice. We could also <a href="https://www.inkandswitch.com/pixelpusher/#but-what-about-conflict-resolution">expose the conflicting value to the user interface</a> — for example, the editor could show an annotation noting that a conflict had occurred, asking a human to review the merged result. This approach of surfacing granular conflicts represents a middle ground between an automatic and manual merge process.</p>
<p><strong>Example 6.</strong> Conflicts don’t only occur with colors; even simple bold formatting operations can produce conflicts. For example, Alice first makes the entire text bold, and then updates “fox jumped” to be non-bold, while Bob marks only the word “jumped” as bold:</p>
<p>Alice:</p>
<blockquote><p><strong>The fox jumped.</strong></p><p><strong>The</strong> fox jumped.</p></blockquote>
<p>Bob:</p>
<p>The word “The” was set to bold by Alice and not changed by Bob, so it should be bold. The word “fox” was set to non-bold by Alice and not changed by Bob, so it should be non-bold. But the word “jumped” was set to non-bold by Alice, and to bold by Bob. In this case we have a conflict on the word “jumped”, because the word cannot be both bold and non-bold at the same time. We therefore have to choose arbitrarily between either:</p>
<p>or</p>
<p>Crucially, even though the choice is arbitrary, it must be consistent across both Alice and Bob’s devices, to ensure they continue seeing the same document state.</p>
<aside> <p>A user could even toggle some text back and forth between bold and non-bold several times. In this case, we say that the latest state of Alice’s document conflicts with Bob’s latest state, but we do not consider earlier states to be part of the conflict.</p> </aside>
<p><strong>Example 7.</strong> There is one more case to consider for handling overlapping marks of the same type. Consider the case where Alice and Bob both leave comments on overlapping parts of the text:</p>
<p>This might seem somewhat similar to <a href="https://www.inkandswitch.com/peritext/#example-5">Example 5</a>. The two users have assigned overlapping formatting, and unlike adding bold, we can’t just merge the two users’ marks into a single mark.</p>
<p>However, comments behave very differently from colored text — although a single character can’t be both red and blue, multiple comments <em>can</em> be associated with a single character in the text. We can render this in the editor by showing the two highlight regions overlapping:</p>
<p>Another case we need to consider is: when a user types new text somewhere in the document, what formatting should those new characters have? We argued in <a href="https://www.inkandswitch.com/peritext/#example-2">Example 2</a> that if text is inserted into the middle of a bold span, then that new text should also be bold. But it’s less clear what should happen when text is inserted at the boundary between differently formatted portions of text.</p>
<p><strong>Example 8.</strong> Let’s say we start with a document where the span “fox jumped” is bold, and the rest is non-bold:</p>
<p>Now Alice inserts “quick␣” before the bold span, and “␣over the dog” before the final period. In all major rich-text editors we tested (Microsoft Word, Google Docs, Apple Pages), the result is:</p>
<p>That is, the text inserted before the bold span becomes non-bold, and the text inserted after the bold span becomes bold. The general rule here is that an inserted character inherits the bold/non-bold status of the preceding character. The same applies to most types of character formatting, including italic, underline, font, font size, and text color. However, if text is inserted at the start of a paragraph, where there is no preceding character in the same paragraph, then it inherits the formatting of the following character.</p>
<p><strong>Example 9.</strong> There are some exceptions to the rule in <a href="https://www.inkandswitch.com/peritext/#example-8">Example 8</a>: if we insert text at the start or end of a link, or the start or end of a comment, then the major rich-text editors place the new text outside of the link/comment span. For example, if “fox jumped” is a link:</p>
<p>After Alice inserts text like in <a href="https://www.inkandswitch.com/peritext/#example-8">Example 8</a>, the result is:</p>
<p>That is, while a bold or italic span grows to include text inserted at the end of the span, a link or comment span does not grow in the same way. Whether this behavior is desirable is perhaps up for debate, but we note that popular rich-text editors are remarkably consistent in this regard, suggesting that this behavior is a deliberate design choice.</p>
<aside> <p>If the end of a link and the end of a bold span fall on the same character, and text is inserted after that character, what should happen? The most consistent behavior would be for that text to be bold but not linked. Microsoft Word behaves this way, whereas Google Docs and Apple Pages make the new characters neither bold nor linked.</p> </aside>
<p>We do not have an exhaustive set of correctness criteria for merging edits of a rich-text document, but we believe these examples can serve as a test suite characterizing desirable merging behaviors that preserve user intent.</p>
<p><a href="https://crdt.tech/">Conflict-free Replicated Data Types</a> (CRDTs) are algorithms that allow each user to edit their local copy of a document, and which ensure that different users’ copies can be cleanly merged into a consistent result. For plain text documents there are plenty of CRDT algorithms, such as <a href="http://csl.snu.ac.kr/papers/jpdc11.pdf">RGA</a>, <a href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.994.4371&amp;rep=rep1&amp;type=pdf">Causal Trees</a>, <a href="https://www.researchgate.net/publication/310212186_Near_Real-Time_Peer-to-Peer_Shared_Editing_on_Extensible_Data_Types">YATA</a>, <a href="https://hal.inria.fr/file/index/docid/108523/filename/OsterCSCW06.pdf">WOOT</a>, <a href="https://hal.inria.fr/inria-00445975/document">Treedoc</a>, <a href="https://hal.inria.fr/inria-00432368/document">Logoot</a>, <a href="https://hal.archives-ouvertes.fr/file/index/docid/921633/filename/fp025-nedelec.pdf">LSEQ</a>, and various others.</p>
<p>Before building a new CRDT for managing rich text, we might ask if we can simply use an existing one. It turns out that, while there are ideas from existing CRDTs that are very useful for modeling formatted text, applying existing algorithms in a naive way does not yield the desired behaviors listed above. In this section we briefly describe three approaches to representing rich text using existing CRDTs, and highlight their problems.</p>
<p>The most straightforward way of representing rich text would be to encode it in a plain text format such as <a href="https://daringfireball.net/projects/markdown/syntax">Markdown</a>, and then use an existing plain text CRDT. For example, a span of bolded text is represented in Markdown by double asterisks at the beginning and end of the span:</p>
<pre><code>This is **bolded text**
</code></pre>
<p>This approach is convenient for some users who may already know the format (although many people who are not software developers find Markdown unfamiliar and hard to use). It also handles some intent preservation scenarios well, including the concurrent formatting and insertion scenario.</p>
<p>However, it doesn’t handle concurrent formatting well. Take <a href="https://www.inkandswitch.com/peritext/#example-3">Example 3</a> above, where Alice marks “The fox” as bold, and Bob concurrently makes “fox jumped” bold. (We show each user’s asterisks in a different color to clarify the merge result later on.)</p>
<p>Alice:</p>
<pre>**The fox** jumped.</pre>
<p>Bob:</p>
<pre>The **fox jumped.**</pre>
<p>The correct merge result here is for the entire sentence to become bolded. However, when we merge the plain text insertions, we arrive at the following Markdown sequence, which interleaves the two users’ control characters:</p>
<pre>**The **fox** jumped.**</pre>
<p>This sequence renders as:</p>
<blockquote> <p><strong>The</strong> fox <strong>jumped</strong></p> </blockquote>
<p>The users’ intent hasn’t been preserved — both users bolded the word “fox”, but in the merged result it has ended up non-bold. Bob’s first insertion before “fox” was intended to mean “start bolding here”, but in the merged result it was interpreted as ending the bolded sequence started earlier in the sentence by Alice.</p>
<p>This is just one example of a more general problem, due to the fact that the language was not designed to preserve intent under concurrent edits. As another example, if two people created a top-level heading by inserting <code>#</code> at the beginning of a line, that would become <code>##</code> denoting a second level heading.</p>
<aside> <p>Other markup languages, such as reStructuredText or HTML, suffer from similar problems.</p> </aside>
<p>To get around these limitations of Markdown, another approach might be to use HTML, or to insert special hidden control characters into the plain text sequence to denote the beginning and end of formatting spans. These characters wouldn’t be directly visible to the user; rather they would simply serve as an underlying storage format backing a WYSIWYG editor UI. For example, one option would be to store separate characters for “start bold” and “end bold”, rather than using a single character sequence for “toggle bold” as in Markdown. This is the approach used by the CRDT library <a href="https://github.com/yjs/yjs">Yjs</a>.</p>
<aside>Yjs has the most full-featured rich-text CRDT available today; for example, it has been integrated with <a href="https://demos.yjs.dev/prosemirror/prosemirror.html">ProseMirror</a> and <a href="https://demos.yjs.dev/quill/quill.html">Quill</a>. However, it suffers from the anomaly shown in this section.</aside>
<p>While this approach seems promising at first, it has subtle problems. Once again consider <a href="https://www.inkandswitch.com/peritext/#example-3">Example 3</a>, but this time with start/end control characters, represented as <code>&lt;bold&gt;</code> and <code>&lt;/bold&gt;</code>.</p>
<p>Alice:</p>
<pre><code>&lt;bold&gt;The fox&lt;/bold&gt; jumped.
</code></pre>
<p>Bob:</p>
<pre><code>The &lt;bold&gt;fox jumped.&lt;/bold&gt;
</code></pre>
<p>After merging we get:</p>
<pre><code>&lt;bold&gt;The &lt;bold&gt;fox&lt;/bold&gt; jumped.&lt;/bold&gt;
</code></pre>
<p>We could render this document by iterating left to right through the text, remembering the current combined formatting at every given point. For example, when we encounter a <code>&lt;bold&gt;</code> character, we make the following text bold, and when we encounter a <code>&lt;/bold&gt;</code> character, we make the following text non-bold.</p>
<p>This strategy seems reasonable at first, but it does not achieve the desired outcome for <a href="https://www.inkandswitch.com/peritext/#example-3">Example 3</a>. When we reach the end of the word “fox”, we know there is a bold range active, but the <code>&lt;/bold&gt;</code> character after “fox” ends that bolded range. As a result, “jumped” is not bold even though it should have been:</p>
<p>The reason for this anomaly is that our accumulated state did not contain enough information to accurately reflect the effects of overlapping spans. We tried several variations of the algorithm, such as counting the number of span beginnings and span ends we have seen, or linking each span-end character with its associated span-beginning, but found them difficult to reason about and prone to strange edge cases.</p>
<p>In particular, with control characters it is difficult to represent changes of formatting over time. Consider partially overlapping spans of text that are toggled between bold and non-bold several times, or partially overlapping spans whose text color is changed several times. Control characters tell us where a span begins or ends, but they do not tell us which formatting is older and which is newer. When several users concurrently modify control characters, it is difficult to determine whether the merged result reflects the users’ intentions.</p>
<aside>Say we have the document <code>&lt;b&gt;The fox jumped&lt;/b&gt;</code>. If the middle word is unbolded, we have to insert additional control characters to make <code>&lt;b&gt;The&lt;/b&gt; fox &lt;b&gt;jumped&lt;/b&gt;</code>. On the other hand, if the whole span is unbolded, we have to remove the control characters.</aside>
<p>It might be possible to make the control character approach work reliably and to handle all of these edge cases correctly, at the cost of significant complexity. We believe the approach we have taken with Peritext is simpler, and easier to verify that it behaves as expected in all of the examples. Moreover, Peritext also makes it easier to determine how a document changed from one version to another, which is important for asynchronous collaboration workflows.</p>
<p>Another approach would be to use a tree-structured representation of formatted text, akin to HTML, XML, and the Document Object Model (DOM). For example, <a href="https://github.com/automerge/automerge">Automerge</a> provides a CRDT that can store a JSON object with nested maps and lists. We could store each contiguous span of formatted text as an object containing the string text contents and a list of format markers, e.g. representing “The <strong>fox</strong> jumped.” with this JSON document:</p>
<aside> <p>This JSON representation is similar to what is used internally in rich-text editors such as <a href="https://prosemirror.net/">ProseMirror</a>.</p> </aside>
<pre><code>[
	{ text: "The ", format: [] },
	{ text: "fox", format: ["bold"] },
	{ text: " jumped.", format: [] }
]
</code></pre>
<p>Unfortunately, when we use the Automerge semantics for merging JSON documents, this representation does a poor job at preserving user intent. To see why, imagine we start with a single unformatted span:</p>
<pre><code>[{ text: "The fox jumped.", format: []}]
</code></pre>
<p>Now, imagine two users both make changes to this text without communicating updates to one another. Alice bolds the word “jumped” to get “The fox <strong>jumped.</strong>” This requires splitting up the single span; in JSON terms, we could model this as deleting “jumped” from the first span, and then adding a new span for the newly bolded word:</p>
<pre><code>spans[0].text.delete(8, 7) // delete "jumped." from first span
spans.push({ text: "jumped.", format: ["bold"] }) // add new span
</code></pre>
<p>Meanwhile, Bob also formats the word “jumped”, applying italics to get “The fox <em>jumped.</em>” We similarly model this with two actions: modifying the first span and inserting a new second span.</p>
<pre><code>spans[0].text.delete(8, 7) // delete "jumped." from first span
spans.push({ text: "jumped.", format: ["italic"] }) // add new span
</code></pre>
<p>So far, User A and User B both see a reasonable result locally. But what happens when we merge their changes? In Automerge’s algorithm, when two users insert into a list at the same position, both users’ insertions are preserved and it’s not considered a conflict, so we converge to this result:</p>
<pre><code>[
	{ text: "The fox ", format: [] },
	{ text: "jumped.", format: ["bold"] },
	{ text: "jumped.", format: ["italic"] }
]
</code></pre>
<p>This data structure renders as “The fox <strong>jumped.</strong><em>jumped.</em>”, rather than the expected result “The fox <strong><em>jumped.</em></strong>”. The last word has become duplicated!</p>
<p>The problem here is that users intended to only change the formatting, but their actions were represented in the JSON document in a way that suggested they were also modifying the text content. While one could design other JSON representations of a document which would have different merge characteristics than this, we have not found one that is suitable.</p>
<p>We now introduce the approach we have taken for rich-text collaboration in Peritext. We describe our algorithm in four parts:</p>
<ul> <li>Representing the textual content of a rich-text document using an existing plain text CRDT</li> <li>Generating CRDT operations representing formatting changes</li> <li>Applying these operations to produce an internal document state</li> <li>Deriving a document suitable for a text editor, based on the internal state</li> </ul>
<aside> <p>Our implementation uses <a href="http://csl.snu.ac.kr/papers/jpdc11.pdf">RGA</a>/<a href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.994.4371&amp;rep=rep1&amp;type=pdf">Causal Trees</a> as its basis, although in principle it could extend any plain text CRDT.</p> </aside>
<p>Our approach in designing the algorithm was to capture the user input, and hence the user intent, as closely as possible:</p>
<ul> <li><code>insert</code> operations are generated when the user types or pastes new characters somewhere in the text;</li> <li><code>remove</code> operations are generated when the user hits the backspace or delete key somewhere in the text, or overwrites selected text;</li> <li>an <code>addMark</code> or <code>removeMark</code> operation is generated when the user selects some text and chooses a formatting option from the menu or by keyboard shortcut.</li> </ul>
<aside> <p>A “mark” is any property that is applied to a contiguous substring of the text: for example, a word highlighted in bold, or a sentence annotated with an inline comment.</p> </aside>
<p>Every operation that modifies the state of the document is given a unique, immutable identifier called <code>opId</code> (operation ID). An opId is a string of the form <code>counter@nodeId</code> where <code>counter</code> is an integer and <code>nodeId</code> is a unique ID (e.g. UUID) of the client that generated the operation. Whenever we make a new operation, we give it a <code>counter</code> that is one greater than the greatest counter value of any existing operation in the document, from any client. Since a given client never uses the same <code>counter</code> value twice, the combination of <code>counter</code> and <code>nodeId</code> is globally unique.</p>
<p>We also define an ordering of opIds as follows: <code>counter1@node1 &lt; counter2@node2</code> if <code>counter1 &lt; counter2</code> (using a numeric comparison); if <code>counter1 == counter2</code> we break ties using a string comparison of <code>node1</code> and <code>node2</code>.</p>
<aside> <p>For those who like distributed systems theory, opIds are <a href="http://lamport.azurewebsites.net/pubs/time-clocks.pdf">Lamport timestamps</a>. It is possible for two opIds to have the same counter value if different nodes generate operations concurrently.</p> </aside>
<p>The key idea of most text CRDTs is to represent the text as a sequence of characters, and to give each character a unique identifier. In our case, the ID of a character is the opId of the operation that inserted that character. To insert a character into a document, we generate an insert operation of the following form:</p>
<pre><code>{
  action: "insert",
  opId: "2@alice",
  afterId: "1@alice",
  character: "x"
}
</code></pre>
<p>This insert operation has an opId of <code>2@alice</code>, and its effect is to insert the character “x” after the existing character whose ID is <code>1@alice</code>. To determine the position where a character is inserted, we always reference the ID of the existing character after which we want to insert. We do not use an index to identify the insertion position because an index would change every time text is inserted or deleted earlier in the document, whereas an opId remains stable.</p>
<aside> <p>If the position of an edit were determined by index rather than by opId, <a href="https://en.wikipedia.org/wiki/Operational_transformation">operational transformation</a> (OT) would be required to take concurrent edits elsewhere in the document into account. However, OT does not have good support for branching and merging workflows.</p> </aside>
<p>To insert at the beginning of the document we use <code>afterId: null</code>. If two users concurrently insert at the same position (i.e. with the same <code>afterId</code>), we order the insertions by their <code>opId</code> to ensure both users converge towards the same sequence of characters.</p>
<p>To delete a character from a document, we generate a <code>remove</code> operation of the following form:</p>
<pre><code>{
  action: "remove",
  opId: "5@alice",
  removedId: "2@alice"
}
</code></pre>
<p>This operation has an opId of <code>5@alice</code>, and its effect is to remove the existing character whose ID is <code>2@alice</code> (i.e. the “x” we inserted above). As before, it is easier to identify the deleted character by its ID than by its index. When we process a remove operation, we don’t actually delete it from the document entirely, but we just mark it as deleted. That way, if another insert operation references the deleted character’s ID in its <code>afterId</code>, we still know where to put the inserted character.</p>
<aside>A character that has been marked as deleted is called a <em>tombstone</em>.</aside>
<p>The state of the plain text document then consists of three things for each character: the opId of the operation that inserted it, the actual character, and a flag to tell us whether it has been deleted.</p>
<figure><img alt="A document containing the characters 'The fox jumped.' The second character 1@A is a lowercase 't', which has been deleted. The document is wrapped by blank start and end characters. Each character appears with its corresponding identifier, such as 9@B or 1@A. Below each character is a 'Deleted' Boolean, set to 0 for all characters except the deleted 't', which is set to 1." src="https://www.inkandswitch.com/peritext/tombstone.svg"/><figcaption>Our document model stores a Boolean flag alongside each character, which becomes True when the character is deleted. Deleted characters remain in the document model as tombstones, which are needed to handle concurrent edits. </figcaption></figure>
<p>In the diagram, Alice (nodeId <code>A</code>) first typed the text “the fox”, generating opIds <code>1@A</code> to <code>7@A</code>. Then Bob (nodeId <code>B</code>) deleted the initial lowercase “t” (the deletion has opId <code>8@B</code>) and replaced it with an uppercase “T” (opId <code>9@B</code>), and finally Bob typed the remaining text “␣jumped.” (opIds <code>10@B</code> to <code>17@B</code>). The final text therefore reads “The fox jumped.” but the lowercase “t” is still in the sequence, marked as deleted.</p>
<p>That’s all we need to implement collaborative editing of plain text: inserting a single character, and removing a single character. Larger operations, such as cutting or pasting an entire paragraph, turn into lots of single-character operations. This can all be <a href="https://www.inkandswitch.com/peritext/#performance-and-efficiency">optimized to be more efficient</a>, but for now, single-character insertions and deletions are sufficient.</p>
<p>The next step is to allow the formatting of the text to be changed. Every time the user modifies the formatting of the document, we generate either an <code>addMark</code> or a <code>removeMark</code> operation. For example, if Alice selects the text “fox jumped” and hits ⌘+B or Ctrl+B to make it bold, the generated operation might look like this:</p>
<pre><code>{
  action: "addMark",
  opId: "18@A",
  start: { type: "before", opId: "5@A" },
  end:   { type: "before", opId: "17@B" },
  markType: "bold"
}
</code></pre>
<aside>One of our inspirations for modeling text operations in this way was <a href="https://github.com/CondeNast/atjson">atjson</a>, a rich text format which stores formatting spans alongside a plain text sequence.</aside>
<p>This operation has an opId of <code>18@A</code>. It takes the span of text starting with the character whose ID is <code>5@A</code> (i.e. the “f” of “fox”), and ending with the character whose ID is <code>17@B</code> (the final period). All characters in this span (including the start character, but excluding the end character) become bold. As with earlier operations, we use opIds, not indexes, as stable identifiers of the <code>start</code> and <code>end</code> of the span.</p>
<p>We can imagine each character in the text as having two anchor points where the start or end of a formatting operation may attach — either before or after the character:</p>
<figure><figcaption>Conceptually, each character has two formatting anchor points: one before the character, and one after. Anchor points determine whether a formatting operation will be extended when new text is inserted on the boundary. For simplicity, subsequent figures will only show anchor points with attached mark operations.</figcaption></figure>
<p>A formatting change always occurs in the “gap” between two characters. The <code>type: "before"</code> properties in the example operation indicate that the bold span starts in the gap immediately before the “f” (i.e. the “f” is bold, but the preceding space is not), and the bold span ends in the gap immediately before the “.” (i.e. the “d” of “jumped” is bold, but the period is not). We could also choose <code>type: "after"</code> if we wanted a span to start or end on the gap immediately after a particular character. Moreover, the <code>start</code> property could be <code>"startOfText"</code> if we want the span to always start right at the beginning of the document, and the <code>end</code> property could be <code>"endOfText"</code> if we want it to end after the last character.</p>
<p>If another user inserts text within that span, like in <a href="https://www.inkandswitch.com/peritext/#example-2">Example 2</a> above, those new characters still fall within the range defined by the <code>addMark</code> operation, and so they are also formatted bold. And when text is inserted at the boundaries of the bold span, it behaves like in <a href="https://www.inkandswitch.com/peritext/#example-8">Example 8</a>: text inserted before the “f” is non-bold, whereas text inserted between the “d” and the period is bold, because it still falls within the span before the period.</p>
<p>For marks that should not grow when text is inserted at the boundary, like the link in <a href="https://www.inkandswitch.com/peritext/#example-9">Example 9</a>, we let the mark end in the gap after the the last character of the mark:</p>
<pre><code>{
  action: "addMark",
  opId: "19@A",
  start: { type: "before", opId: "5@A" },
  end:   { type: "after",  opId: "16@B" },
  markType: "link",
  url: "https://www.google.com/search?q=jumping+fox"
}
</code></pre>
<figure><figcaption> <p>Mark types can include additional metadata, such as a hyperlink. Note that unlike bold marks, which end on the character <em>after</em> the span, links end on the <em>last</em> character of the span. This approach prevents the link from growing when new text is appended.</p> </figcaption></figure>
<p>With this operation, the “d” of “jumped” is still part of the link, but any text that is inserted after that character will not be part of the link. Note also that an operation with <code>markType: "link"</code> has an additional <code>url</code> attribute. To change the URL that a link points to, we simply generate another <code>addMark</code> operation with a new URL and the same <code>start</code> and <code>end</code>.</p>
<p>If the user changes their mind and decides they don’t want the text to be bold/linked after all, we don’t remove the <code>addMark</code> operation. In fact, we never remove an operation, we only ever generate new operations (we discuss <a href="https://www.inkandswitch.com/peritext/#performance-and-efficiency">later</a> why it’s fine to store operations forever). Instead, we generate a <code>removeMark</code> operation that undoes the effect of the earlier <code>addMark</code> and sets a sequence of characters back to be non-bold. For example, the following operation makes “␣jumped” non-bold:</p>
<pre><code>{
  action: "removeMark",
  opId: "20@A",
  start: { type: "before", opId: "10@A" },
  end:   { type: "before", opId: "17@B" },
  markType: "bold"
}
</code></pre>
<figure><figcaption> <p>We can undo any part of a mark by applying the corresponding <code>removeMark</code> operation. Here, we unbold the characters <code>␣jumped</code>, while ensuring that subsequent insertions after <code>fox</code> remain bold.</p> </figcaption></figure>
<p>To remove a prior mark entirely, the <code>start</code> and <code>end</code> of the <code>removeMark</code> operation should be the same as for the <code>addMark</code> that should be overwritten. In general, a <code>removeMark</code> can start and end on any character, regardless of its current formatting, and the effect is to set that span to be non-bold/non-linked/non-italic/etc.</p>
<p>A transition from bold to not-bold could happen not only because of the end of an <code>addMark</code>, but also because of the start of a <code>removeMark</code> (and vice versa for transition from not-bold to bold). To maintain the rule that an inserted character is formatted the same as the preceding character, <code>removeMark</code> operations use <code>type: "before"</code> on both <code>start</code> and <code>end</code> for bold and similar types of marks. For example, if we apply the <code>removeMark</code> operation above and then insert “␣suddenly” immediately after the “x”, it will be bold, because it falls within the <code>addMark</code> span but not within the <code>removeMark</code> span.</p>
<p>Inserting a character at the start of a paragraph requires a special case: we have to first insert the character, and then (if necessary) generate additional formatting operations so that the inserted character is given the same formatting as its successor.</p>
<p>For marks that should not grow at the end, such as links, <code>addMark</code> uses <code>type: "before"</code> for <code>start</code> and <code>type: "after"</code> for <code>end</code>. For <code>removeMark</code> it’s the other way round: these operations use <code>type: "after"</code> for <code>start</code> and <code>type: "before"</code> for <code>end</code>. This ensures that when text is inserted at the end of a link, that text is not part of the link, regardless of whether the link is ending because it’s the end of the <code>addMark</code> that created it, or the beginning of a <code>removeMark</code> that removed the link property from the subsequent characters.</p>
<p>One more detail is required to ensure that insertions at the end of a link behave correctly: it could happen that the character to which the link end is anchored is deleted (a tombstone). In the following example, “fox jumped” was linked, and then the word “jumped” was deleted.</p>
<figure><figcaption>When a character is deleted, we preserve any attached operations. The position of each anchor point determines whether new characters are inserted before or after the tombstones.</figcaption></figure>
<p>Now assume the user wants to replace “jumped” with “frolicked”, so they insert that word after the space <code>10@B</code>. This position is at the end of the link (the next visible character, the period, is not part of the link), so we expect the new character to be non-linked because links don’t grow. However, when there are tombstones at the position where a new character is inserted, our plain text CRDT by default places the inserted character before the tombstones. This would place “frolicked” before “jumped”, making it part of the link, which is undesirable.</p>
<p>To fix this issue, if we need to insert a character at a position where there are tombstones, we scan the list of tombstones at this position. If there are any tombstones whose “after” anchor is the start or end of any formatting operation, we insert the character after the last such tombstone. Otherwise we insert before the tombstones, as usual. In the example above, the after-anchor of character “d” (<code>16@B</code>) is the end of <code>addMark</code> operation <code>19@A</code>, and so we place the new word after that character. This ensures that insertions at the end of a link are placed outside of the link.</p>
<p>If the list of tombstones contains anchors for the start or end of several formatting operations, it’s possible that no ideal insertion position exists. In this situation, the inserted text can be placed arbitrarily relative to the tombstones, and the worst-case outcome is that the text is formatted differently from what was desired. We believe that this situation is rare enough that it is acceptable for the user to manually fix the formatting in this case.</p>
<p>We now show how our algorithm applies <code>insert</code>, <code>remove</code>, <code>addMark</code> and <code>removeMark</code> operations to update a rich-text document state. In a CRDT, we must ensure that when two operations were generated concurrently, we can apply those operations in any order, and the resulting document must always be the same. This is what allows us to merge two documents edited by different users: we can take all operations that have been applied to one document but not the other, and apply them to the other document in order to obtain the merged document.</p>
<aside>Mathematically speaking, concurrent operations must be <em>commutative</em>: applying first <code>op1</code> and then <code>op2</code> must have the same effect as first applying <code>op2</code> and then <code>op1</code>.</aside>
<p>In the diagrams above, we visualized each character as having two associated anchor points for formatting operations, one before and one after the character. Our implementation closely follows this idea. For each character, the internal data structure stores the opId, whether it has been deleted, and the set of operations anchored to the gaps before and after the character (which we sometimes refer to as <em>op-sets</em>).</p>
<pre><code>type CharacterMetadata = {
    /** One character of the text */
    char: string
    /** opId of operation that created the list item. */
    opId: OperationId
    /** Has the list item been deleted? */
    deleted: boolean
    /** Mark operations in the gap before this list item */
    markOpsBefore?: Set&lt;AddMarkOperation | RemoveMarkOperation&gt;
    /** Mark operations in the gap after this list item */
    markOpsAfter?: Set&lt;AddMarkOperation | RemoveMarkOperation&gt;
}

type TextMetadata = Array&lt;CharacterMetadata&gt;
</code></pre>
<p>In a text without formatting operations, the <code>markOpsBefore</code> and <code>markOpsAfter</code> properties are absent (<code>undefined</code>). Inserting and deleting characters in the sequence uses the normal RGA plain text CRDT logic described previously.</p>
<p>When applying an <code>addMark</code> or <code>removeMark</code> operation, we update either the <code>markOpsBefore</code> or the <code>markOpsAfter</code> property (depending on whether the operation specifies <code>type: "before"</code> or <code>type: "after"</code>) on both the <code>start</code> and the <code>end</code> character of the operation.</p>
<p>First, we update the start character for the operation. If there is an existing set of formatting operations on the start character, we add the new formatting operation to that set. If no such set exists, we create a new set containing one element: the new formatting operation. This indicates that the new formatting operation applies to the characters from this position onward.</p>
<p>Next, we update the end character. If there is an existing set of formatting operations, we don’t modify it; if there is no set of formatting operations, we create an empty set at that position. This indicates that the new formatting operation no longer applies to the characters from this position onward.</p>
<p>We never remove operations from these sets, and so each of these sets contains all the <code>addMark</code> or <code>removeMark</code> operations in the history of the document that started at a particular position. We show in the next section how to compute the current formatting for the text based on these sets of operations.</p>
<aside> <p>In this part of the algorithm, <code>addMark</code> and <code>removeMark</code> operations are processed in the same way: both are added to <code>markOpsBefore</code> or <code>markOpsAfter</code> as described here.</p> </aside>
<p>Continuing with the example, let’s say the current text is “The fox jumped.” with no formatting, and Alice wants to bold the first two words. She generates an <code>addMark</code> operation that starts before the “T” (<code>9@B</code>) and ends before the space following “x” (<code>10@B</code>):</p>
<pre><code>{
  action: "addMark",
  opId: "19@A",
  start: { type: "before", opId: "9@B" },
  end:   { type: "before", opId: "10@B" },
  markType: "bold"
}
</code></pre>
<p>Alice applies the operation to her own document data structure. She does this by setting <code>markOpsBefore</code> on the first character (<code>9@B</code>) to be a set containing that <code>addMark</code> operation, and setting <code>markOpsBefore</code> on the second space character (<code>10@B</code>) to be the empty set:</p>
<figure><figcaption>From a series of operations, we can distill the set of active operations at each character. The active op-set begins empty, grows when a mark starts, and shrinks when a mark ends.</figcaption></figure>
<pre><code>[
  { char: "T", opId: "9@B", deleted: false, markOpsBefore: [
    {
      action: "addMark",
      opId: "19@A",
      start: { type: "before", opId: "9@B" },
      end:   { type: "before", opId: "10@B" },
      markType: "bold"
    }
  ] },
  { char: "t", opId: "1@A", deleted: true },
  { char: "h", opId: "2@A", deleted: false },
  { char: "e", opId: "3@A", deleted: false },
  { char: " ", opId: "4@A", deleted: false },
  { char: "f", opId: "5@A", deleted: false },
  { char: "o", opId: "6@A", deleted: false },
  { char: "x", opId: "7@A", deleted: false },
  { char: " ", opId: "10@B", deleted: false, markOpsBefore: [] },
  …
]
</code></pre>
<p>Let’s say Bob concurrently wants to italicize the last two words and the period, as in <a href="https://www.inkandswitch.com/peritext/#example-4">Example 4</a> above. He generates an <code>addMark</code> operation for this span, which starts before the “f” and runs until the end of the text (i.e. after the last character):</p>
<pre><code>{
  action: "addMark",
  opId: "19@B",
  start: { type: "before", opId: "5@A" },
  end: { type: "endOfText" },
  markType: "italic"
}
</code></pre>
<figure><figcaption> <p>Bob concurrently italicizes part of the document. In order to merge Alice and Bob’s changes, we must combine their op-sets for each character.</p> </figcaption></figure>
<p>When Alice receives Bob’s operation, and when Bob receives Alice’s operation, we have to determine all the formatting operations that apply to a given character, and we need to deal with the fact that their spans partially overlap. One way of doing this would be to scan from the beginning of the document, keeping track of all operations whose span has started and not yet ended. However, for performance reasons we want to avoid scanning the entire document on every keystroke.</p>
<p>As an optimization, we say that the sets of operations <code>markOpsBefore</code> and <code>markOpsAfter</code> contain not only the operations that start at that particular position, but also the operations whose span contains that position. It is still the case that the <code>markOpsBefore</code> and <code>markOpsAfter</code> properties are absent whenever the formatting is not changing. But if we have a formatted span whose start or end falls within another operation’s span, we repeat the containing operation.</p>
<p>We illustrate this algorithm in the following figures, by considering the case of Alice, who has already applied her own bold operation, and is now applying Bob’s italic operation.</p>
<p>To apply an <code>addMark</code> or <code>removeMark</code> operation, we first find the markOps set where the start of the operation is anchored (either <code>markOpsBefore</code> or <code>markOpsAfter</code> on the character with ID <code>operation.start.opId</code>, depending on <code>operation.start.type</code>). If that set is already present, we add the new operation to it. If that set is absent, we search backwards in the character metadata sequence until we find the nearest markOps set that is present; we copy that set and add the new operation to it. In the example, <code>markOpsBefore</code> on the “f” character is absent, so we copy <code>markOpsBefore</code> from the “T” character and add the italic operation to it.</p>
<figure><figcaption> <p>To apply an operation, we copy the nearest preceding op-set (in this case, the set <code>{19@A}</code>) and insert the new operation <code>19@B</code>. The resulting set becomes the active op-set at the operation start character <code>5@A</code>.</p> </figcaption></figure>
<p>Next, we iterate forwards over the character sequence from the new operation’s start. Whenever we encounter a <code>markOpsBefore</code> or <code>markOpsAfter</code> property that is present, we add the new operation to it, in order to indicate that this position falls within the span of the new operation. In the example, this happens at <code>markOpsBefore</code> on the second space character: this was previously the empty set, and we add the italic operation to it.</p>
<figure><figcaption> <p>After creating an op-set at <code>5@A</code>, we iterate forward one character at a time until we reach the <code>end</code> character of the operation. For each op-set encountered along the way, we add the new operation <code>19@B</code>. In this case, we add <code>19@B</code> to the empty set at <code>10@B</code> produced by the end of Alice’s operation.</p> </figcaption></figure>
<p>This iteration finishes when we reach the markOps set at which the end position of the new operation is anchored. If this set is absent, we initialize it to be a copy of the closest preceding markOps set, except that we do not add the new operation to this set. In the example, the italic operation ends at <code>endOfText</code>, and we initialize it to be the empty set.</p>
<figure><figcaption> <p>Once we reach the end of our new operation, we are done. The resulting active op-sets reflect the document with operation <code>19@B</code> applied.</p> </figcaption></figure>
<p>The result is that whenever a <code>markOpsBefore</code> or <code>markOpsAfter</code> property is present, it contains all of the formatting operations that pertain to the following run of characters, until we reach the next <code>markOpsBefore</code> or <code>markOpsAfter</code> property that is present. In the example, it is clear that “fox” falls both within the bold and within the italic span.</p>
<p>This algorithm is commutative: no matter in which order the formatting operations are applied, we end up in the same final state (the same sets of operations in <code>markOpsBefore</code> and <code>markOpsAfter</code> on each character). Moreover, it is efficient: we only need to scan over the part of the document that is affected by the formatting operation, not the whole document.</p>
<p>When the first formatting operation is added to a document, the initial backwards scan that looks for the closest preceding markOps set will have to go all the way to the beginning of the document, which might be slow on a large document. To speed this up, we can use the following trick: when inserting characters, on some characters (say one in a thousand, chosen randomly) we initialize their <code>markOpsBefore</code> to be a copy of the closest preceding markOps set (or an empty set if there is none). This has no effect on the correctness of the algorithm, but it ensures that when searching for the closest preceding markOps set, we will find one that is present after scanning backwards for only about 1,000 characters (on average). This avoids having to scan the entire document.</p>
<p>So far, the algorithm in the previous section has subdivided the document into a sequence of spans, with a set of mark operations that is active for each span. Next, we need to turn this into a document state that can be displayed by a text-editing UI; in particular, we need to derive the current formatting state for each span of characters.</p>
<p>Our goal is to produce a data structure that contains only the current text of the document (no deleted text), annotated with its current formatting. This is in line with how rich-text editing user interface components, such as <a href="https://prosemirror.net/">ProseMirror</a>, represent their document state. The result, after applying Alice and Bob’s operations from the example above, might look like this:</p>
<pre><code>[
  { text: "The ",     format: { bold: true } },
  { text: "fox",      format: { bold: true, italic: true } },
  { text: " jumped.", format: { italic: true } }
]
</code></pre>
<p>To produce this data structure, we can iterate over the list of characters, converting each set of mark operations into a current formatting state for the corresponding span.</p>
<p>Every <code>addMark</code> or <code>removeMark</code> operation has a <code>markType</code> property indicating which aspect of the formatting is being modified: boldness, italicization, text color, presence of a comment, or various other properties. We assume that each operation affects only the aspect indicated by its <code>markType</code>, and leaves all other formatting marks unchanged. This means we can consider the operations for each <code>markType</code> separately. In the example from the previous section, we can easily see that the word “fox” should be both bold and italic, because the bold and italic operations overlap with that word:</p>
<figure><figcaption> <p>For each span in the text, we must convert the set of all historical mark operations into a <em>current</em> formatting state for that span. In the case of the example from above, we compute that the word fox is both bold and italic.</p> </figcaption></figure>
<p>However, in other cases, the conversion process might be more complicated. There may be multiple operations with the same <code>markType</code> for the same span: for example, some text may be bolded and unbolded again several times. With most mark types, the values indicated by different operations are mutually exclusive: a character must be either bold or non-bold; a character cannot have more than one text color. For these mark types, we use a simple last-write-wins conflict resolution policy, as discussed previously in <a href="https://www.inkandswitch.com/peritext/#example-5">Example 5</a>, based on the opIds of the formatting operations. For example, imagine a span to which the following two operations apply:</p>
<aside>Not all mark types are mutually exclusive—in the case of comments, it is possible for several comments to be associated with the same span, and thus we retain all of the comments for which there is no corresponding <code>removeMark</code> operation that deletes the comment.</aside>
<pre><code>{
  action: "addMark",
  opId: "19@A",
  start: { type: "before", opId: "9@B" },
  end:   { type: "before", opId: "10@B" },
  markType: "bold"
}
{
  action: "removeMark",
  opId: "23@B",
  start: { type: "before", opId: "9@B" },
  end:   { type: "before", opId: "10@B" },
  markType: "bold"
}
</code></pre>
<p>Because the mark operations are in an unordered set, we need to ensure that the span always ends up with the same formatting — either bold or non-bold — regardless of the order in which those two operations are processed. We do this by comparing the opIds of the operations using the ordering defined earlier: if the opIds are <code>counter1@node1</code> and <code>counter2@node2</code> , the winning operation is the one with the greater counter, or the one with the greater node ID if the counters are the same. In this example, the <code>removeMark</code> operation takes precedence because <code>23@B &gt; 19@A</code>, and therefore this span is non-bold. The same principle applies to marks that have additional attributes, such as text color: the winning color is the one indicated by the operation with the greatest opId.</p>
<figure><figcaption> <p>For this set of mark operations, we compute that the text is not bolded, because the <code>removeMark</code> operation 23@B is the winner with the highest opId.</p> </figcaption></figure>
<p>Recall that whenever we make a new operation, we give it an opId with a <code>counter</code> that is one greater than the greatest counter value of any existing operation in the document. This ensures that if the user changes their mind about formatting several times — for example, if they toggle the same word between bold and non-bold several times — then the final formatting operation will have the greatest counter and therefore take precedence over all the earlier operations.</p>
<p>In fact, for the purposes of determining the current formatting of a document, it’s not strictly necessary to store the sets of all historical formatting operations, but it would be sufficient to store the latest value for each mark type and each span, along with the opId that set that value. However, storing the set of formatting operations is useful if we want to compute what a document looked like sometime in the past, for the purpose of visualizing the differences between versions of a document. Although the current version of Peritext does not support this feature, we believe it is important for asynchronous collaboration, and we plan to add it in the future.</p>
<p>As further optimizations, we can avoid computing the current formatting for any spans that only contain deleted characters (tombstones), since they do not show up in a WYSIWYG editor, and we can concatenate any adjacent spans whose current formatting is identical.</p>
<p>The section above describes a way of iterating over an internal document state and producing a representation that is suitable for display in a text editor. This is a reasonable approach when a document is first loaded in an editor, but it is not very suitable for handling character-by-character editing. Iterating through the whole document on every keystroke can become slow in large documents, so we would prefer to have a process that can reason more locally about the effects of an operation. Moreover, a text editor is typically implemented as a stateful object; each edit needs to describe what <em>changed</em> in the document, not just produce a new document state.</p>
<aside>In the <a href="https://prosemirror.net/">ProseMirror</a> library, editor plugins <a href="https://discuss.prosemirror.net/t/offline-peer-to-peer-collaborative-editing-using-yjs/2488/5">don’t expect</a> the entire document to be replaced on every keystroke, so things like selection state and search highlighting are not preserved when the document is replaced.</aside>
<p>When we apply an operation in Peritext, in addition to updating the internal document state, we also compute a <em>patch</em>, which describes how this operation affects the document state in the text editor. Different editor libraries have slightly different patch formats, but the editors we considered have sufficiently similar patch formats that our approach applies to all of them.</p>
<p>To process an <code>insert</code> operation, we first use the existing RGA algorithm to determine the insertion position for the new character, and compute its index. To compute the index of the character, we can count the number of non-deleted characters that precede the insertion position. (There are <a href="https://pages.lip6.fr/Marc.Shapiro/papers/rgasplit-group2016-11.pdf">data structures</a> that can perform this index computation efficiently, without having to scan the whole document, but they go beyond the scope of this article.)</p>
<p>In addition, we need to determine what formatting to apply to the inserted character. We do this by searching backwards in the array of characters, starting from the insertion position, until we find a markOps set that is present. From this set of operations we then compute the marks for the inserted character using the usual last-write-wins logic, and then we construct a patch that inserts a character with that formatting at the index we computed.</p>
<p>For example, a patch to insert the letter “x” at index 6 with bold formatting might look like this:</p>
<pre><code>{
  type: "insert",
  char: "x",
  index: 6,
  format: { bold: true }
}
</code></pre>
<p>A <code>remove</code> operation is the simplest to process: we find the character with the appropriate opId; if it is already deleted, we do nothing; if it is not yet deleted, we mark it as deleted and compute the index of the deleted character. We then construct a patch that asks the editor to delete the character at that index.</p>
<aside> <p>Note that patches use indexes, whereas operations use opIds to identify positions in the text. This is fine because patches are only used to propagate updates from the CRDT to the text editing UI; since these run sequentially on the same thread, there is no concurrency to worry about. Operations need to use opIds since they need to handle concurrent updates.</p> </aside>
<p>When processing an <code>addMark</code> or <code>removeMark</code> operation, we don’t need to change any text in the editor, but we may need to update the formatting of several spans of text. For example, say the current state of the document is “The <strong>fox</strong> jumped.” (where “fox” is bold), and we receive an operation that formats the entire text as italic.</p>
<p>We add the <code>addMark</code> or <code>removeMark</code> operation to the markOps sets as described above, and for each span that the operation applies to, we calculate the updated marks using the last-write-wins rule. For each span where the new formatting differs from the previous formatting for that span, we construct a patch that instructs the text editor to change the formatting accordingly. In this case, we produce three patches, corresponding to each individual span in the text: to mark “The” as italic, to mark “fox” as bold and italic, and to mark “jumped.” as italic:</p>
<pre><code>[
  {
    type: "addMark", format: { italic: true },
    startIndex: 0, endIndex: 3
  },
  {
    type: "addMark", format: { bold: true, italic: true },
    startIndex: 3, endIndex: 7
  },
  {
    type: "addMark", format: { italic: true },
    startIndex: 7, endIndex: 14
  }
]
</code></pre>
<p>With this approach, the patches we send to the text editor are the minimum required in order to make the text editor state consistent with the CRDT state.</p>
<p>We have implemented a working prototype of the Peritext CRDT, which is shown running at the top of this essay. It is implemented in TypeScript, and the code is <a href="https://github.com/inkandswitch/peritext">open source</a>. Our code is a self-contained implementation that extends a simplified version of the <a href="https://github.com/automerge/automerge">Automerge</a> CRDT library, and we hope to integrate our algorithm back into Automerge in the future. The implementation contains tests of many specific scenarios described in this work, as well as an automated generative testing suite that ensures convergence in a large number of randomized edit traces.</p>
<p>For the editor UI, we chose to build on <a href="https://prosemirror.net/">ProseMirror</a>, a popular library which is already used in many collaborative editing contexts. Its modular design gave us the necessary flexibility to intervene in the editor’s dataflow at appropriate points. We also expect that our CRDT would integrate well with other editor UIs since we didn’t specialize the design to ProseMirror in particular.</p>
<p>Currently, our implementation is somewhat specialized to the small set of marks shown in this article: bold, italic, links, and comments. However, we intend these to be a representative set of formatting marks, and expect that their behavior would extend to other kinds of user-configurable marks as well.</p>
<p>Our algorithm is designed with performance in mind: in particular, updates only operate locally on the text they touch, and do not require scanning or recomputing the entire document. However, we have prioritized simplicity over performance in some areas: we store each character as a separate object (which uses a lot of memory); we remember all tombstones and the history of all formatting operations; and the process of finding the character with a particular opId, and computing its index, is not optimized.</p>
<p>These areas in which we have prioritized simplicity are not fundamental to the algorithm, and can be addressed with some implementation effort. For example, <a href="https://github.com/automerge/automerge">Automerge</a> and other CRDTs that support plain text collaboration use a <a href="https://hal.inria.fr/hal-00903813/document">compressed representation</a> of the character sequence, in which characters with consecutive opIds are represented as a simple string rather than an object per character. They also feature data structures that make it efficient to convert an opId into a character index and vice versa, which is needed for integration with editors such as ProseMirror.</p>
<p>Storing all of the operations forever is not as expensive as you might think: Automerge’s compression algorithm can store every single keystroke in the editing history of a text document at a cost of about one byte per operation. All of these optimizations can be applied directly to Peritext, which gives us confidence that with some further engineering effort, Peritext can be very fast and efficient.</p>
<p>We believe that CRDTs for rich text could enable new writing workflows, with powerful version control and support for both synchronous and asynchronous collaboration. In this work, we have shown that traditional plain-text CRDTs are not capable of preserving authors’ intent when merging edits to rich-text documents. We have developed a rich-text CRDT that supports overlapping inline formatting, and shown how to implement it efficiently.</p>
<p>Peritext is only the first step towards a system for asynchronous collaboration: it simply allows two versions of a rich-text document to be merged automatically. To realize asynchronous collaboration will require further work on visualizing editing history and changes, highlighting conflicts for manual resolution, and other features. Since Peritext works by capturing a document’s edit history as a log of operations, it provides a good basis for implementing those further features in the future.</p>
<p>There are many types of marks found in text that can be modeled as spans, and their semantics vary. Some marks can coexist, and others cannot. Further, user expectations about how marks behave can vary by type. We believe Peritext can capture these intents, but careful editor integration is vital to delivering on user expectations.</p>
<p>Inline formatting is sufficient for short blocks of text like a Trello card description, but longer documents often rely on more sophisticated block elements or hierarchical formats, such as nested bullet points, which Peritext does not currently model. Further work is required to ensure edits to block structures like bulleted lists can be merged while preserving author intent. Hierarchical formatting constructs raise new questions around intent preservation — for example, what should happen when users concurrently split, join, and move block elements?</p>
<p>Another area for future exploration is moving and duplicating text within a document. If two people concurrently cut-paste the same text to different places in a document, and then further modify the pasted text, what is the most sensible outcome?</p>
<p>The writers we spoke with love the convenience of live collaborative writing tools, but also described a wide variety of workarounds for asynchronous editing. For example, one interviewee worked from personal copies of documents to preserve their privacy during an edit. Others, lacking version control tools, relied on manually bolded text to identify changes made by an editor. These workarounds stem from an underlying technical paucity caused by a lack of systematic change tracking. We hope that Peritext and other CRDTs for rich text will enable new workflows for these users, which are not possible to build on top of existing data structures for storing text documents. Users could try out their own divergent long-running branches and easily merge them back together with powerful comparison views. People could choose to work in private, or to block out distracting changes being made by others. Rather than seeing document history as a linear sequence of versions, we could see it as a multitude of projected views on top of a database of granular changes.</p>
<p><em>Thanks to Notion for sponsoring Slim Lim’s contributions to this project; to Blaine Cook and Tim Evans at Conde Nast for their input throughout the project; to Marijn Haverbeke for ProseMirror and for other guidance; to Kevin Jahns and Seph Gentle for valuable feedback on our algorithm; to Sam Broner, Daniel Jackson, Rae McKelvey, Ivan Reese, and Adam Wiggins for feedback on the essay, and to the many editors, journalists, and writers who showed us how they work and shared their insight and experience with us.</em></p>
<p>We welcome your feedback: <a href="https://bsky.app/profile/inkandswitch.com">@inkandswitch</a> or <a href="mailto:hello@inkandswitch.com">hello@inkandswitch.com</a>.</p>
