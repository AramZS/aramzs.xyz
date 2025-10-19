---
author: Cats with power tools
cover_image: >-
  https://images.unsplash.com/photo-1656115914684-2845b7a13476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNhdCUyMGtpbmRsZXxlbnwwfHx8fDE3NjAzMTQ5NDd8MA&ixlib=rb-4.1.0&q=80&w=2000
date: '2025-10-17T12:29:08.099Z'
dateFolder: 2025/10/17
description: >-
  As it turns out they don't actually want you to do this (and have some
  interesting ways to stop you)
isBasedOn: 'https://blog.pixelmelt.dev/kindle-web-drm/'
link: 'https://blog.pixelmelt.dev/kindle-web-drm/'
slug: 2025-10-17-httpsblogpixelmeltdevkindle-web-drm
tags:
  - tech
title: How I Bypassed Amazon's Kindle Web DRM Because Their App Sucked
---
<figure><img alt="How I Bypassed Amazon's Kindle Web DRM Because Their App Sucked" sizes="(min-width: 1400px) 1400px, 92vw" src="https://images.unsplash.com/photo-1656115914684-2845b7a13476?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNhdCUyMGtpbmRsZXxlbnwwfHx8fDE3NjAzMTQ5NDd8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" srcset="https://images.unsplash.com/photo-1656115914684-2845b7a13476?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNhdCUyMGtpbmRsZXxlbnwwfHx8fDE3NjAzMTQ5NDd8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=300 300w,
                            https://images.unsplash.com/photo-1656115914684-2845b7a13476?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNhdCUyMGtpbmRsZXxlbnwwfHx8fDE3NjAzMTQ5NDd8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=600 600w,
                            https://images.unsplash.com/photo-1656115914684-2845b7a13476?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNhdCUyMGtpbmRsZXxlbnwwfHx8fDE3NjAzMTQ5NDd8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1000 1000w,
                            https://images.unsplash.com/photo-1656115914684-2845b7a13476?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNhdCUyMGtpbmRsZXxlbnwwfHx8fDE3NjAzMTQ5NDd8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000 2000w"/></figure>
<h2>TL;DR</h2>
<ul><li>I bought my first ebook from amazon</li><li>Amazon's Kindle Android app was really buggy and crashed a bunch</li><li>Tried to download my book to use with a functioning reader app</li><li>Realized Amazon no longer lets you do that</li><li>Decided to reverse engineer their DRM system out of spite</li><li>Discovered multiple layers of protection including randomized alphabets</li><li>Defeated all of them with font matching wizardry</li><li>You can now download the books you own books with my code</li></ul>
<h2>Part 1: Amazon Made This Personal</h2>
<h3>The One Time I Tried To Do Things The Right Way</h3>
<p>I've been "obtaining" ebooks for years. But this ONE time, I thought: "Let's support the author."</p>
<p>Download Kindle app on Android. Open book.</p>
<p><strong>Crash.</strong></p>
<p>App crashes. Fine, I'll use the web reader.</p>
<p>Oh wait, can't download it for offline reading. What if I'm on a plane?</p>
<p>Hold on, I can't even export it to Calibre? Where I keep ALL my other books?</p>
<p>So let me get this straight:</p>
<ul><li>I paid money for this book</li><li>I can only read it in Amazon's broken app</li><li>I can't download it</li><li>I can't back it up</li><li>I don't actually own it</li><li>Amazon can delete it whenever they want</li></ul>
<p><strong>This is a rental, not a purchase.</strong></p>
<figure><img alt="" src="https://blog.pixelmelt.dev/content/images/2025/10/image.png"/><figcaption>This does not say "Rent"</figcaption></figure>
<h3>It Becomes Personal</h3>
<p>I could've refunded and pirated it in 30 seconds. Would've been easier.</p>
<p>But that's not the point.</p>
<p>The point is I PAID FOR THIS BOOK. It's mine. And I'm going to read it in Calibre with the rest of my library even if I have to reverse engineer their web client to do it.</p>
<p>Kindle Cloud Reader (the web version) actually works. While looking through the network requests, I spotted this:</p>
<pre><code>https://read.amazon.com/renderer/render
</code></pre>
<p>To download anything, you need:</p>
<p>1. Session cookies - standard Amazon login</p>
<p>2. Rendering token - from the startReading API call</p>
<p>3. ADP session token - extra auth layer</p>
<p>Sending the same headers and cookies the browser does returns a TAR file.</p>
<h3>What's Inside The TAR?</h3>
<pre><code>page_data_0_4.json   # The "text" (spoiler: it's not text)
glyphs.json          # SVG definitions for every character
toc.json             # Table of contents
metadata.json        # Book info
location_map.json    # Position mappings</code></pre>
<h2>Part 3: Amazon's Obfuscation Layers of Ebook Hell</h2>
<p>Downloaded the first few pages, expected to see text. Got this instead:</p>
<pre><code>{
  "type": "TextRun",
  "glyphs": [24, 25, 74, 123, 91, 18, 19, 30, 4, ...],
  "style": "paragraph"
}</code></pre>
<p>These aren't letters. They're glyph IDs. Character 'T' isn't Unicode 84, it's glyph 24.</p>
<p>And glyph 24 is just a series of numbers that define a stroke path, its just an image of a letter.</p>
<p>It's a substitution cipher! Each character maps to a non-sequential glyph ID.</p>
<h3>The Alphabet Changes Every. Five. Pages.</h3>
<p>Downloaded the next batch of pages. Same letter 'T' is now glyph 87.</p>
<p>Next batch? Glyph 142.</p>
<p><strong>They randomize the entire alphabet on EVERY request.</strong></p>
<p>This means:</p>
<ul><li>You can only get 5 pages at a time (API hard limit)</li><li>Each request gets completely new glyph mappings</li><li>Glyph IDs are meaningless across requests</li><li>You can't build one mapping table for the whole book</li></ul>
<h3>Let Me Show You How Bad This Is</h3>
<p>For my 920-page book:</p>
<ul><li><strong>184 separate API requests</strong> needed</li><li><strong>184 different random alphabets</strong> to crack</li><li><strong>361 unique glyphs</strong> discovered (a-z, A-Z, punctuation, ligatures)</li><li><strong>1,051,745 total glyphs</strong> to decode</li></ul>
<h3>Fake Font Hints (They're Getting Sneaky)</h3>
<p>Some SVG paths contained this garbage:</p>
<pre><code>M695.068,0 L697.51,-27.954 m3,1 m1,6 m-4,-7 L699.951,-55.908 ...</code></pre>
<p>Those tiny <code>m3,1 m1,6 m-4,-7</code> commands? They're micro-MoveTo operations.</p>
<p><strong>Why this is evil:</strong></p>
<ul><li>Browsers handle them fine (native Path2D)</li><li>Python SVG libraries create spurious connecting lines</li><li>Makes glyphs look corrupted when rendered naively</li><li>Breaks path-sampling approaches</li></ul>
<p>This is deliberate anti-scraping. The glyphs render perfectly in browser but make it so we cant just compare paths in our parser.</p>
<p>Take a look</p>
<figure><img alt="" sizes="(min-width: 720px) 720px" src="https://blog.pixelmelt.dev/content/images/2025/10/image-2.png" srcset="https://blog.pixelmelt.dev/content/images/size/w600/2025/10/image-2.png 600w, https://blog.pixelmelt.dev/content/images/size/w1000/2025/10/image-2.png 1000w, https://blog.pixelmelt.dev/content/images/size/w1600/2025/10/image-2.png 1600w, https://blog.pixelmelt.dev/content/images/2025/10/image-2.png 1768w"/><figcaption>Fun! </figcaption></figure>
<p>Eventually I figured out that filling in the complete path mitigated this.</p>
<figure><img alt="" src="https://blog.pixelmelt.dev/content/images/2025/10/id_131_bookerly.png"/></figure>
<h3>Multiple Font Variants</h3>
<p>Not just one font. FOUR variants:</p>
<ul><li>bookerly_normal (99% of glyphs)</li><li>bookerly_italic (emphasis)</li><li>bookerly_bold (headings)</li><li>bookerly_bolditalic (emphasized headings)</li></ul>
<p>Plus special ligatures: ff, fi, fl, ffi, ffl</p>
<p>More variations = more unique glyphs to crack = more pain.</p>
<h3>OCR Is Mid (My Failed Attempt)</h3>
<p>Tried running OCR on rendered glyphs. Results:</p>
<ul><li>178/348 glyphs recognized (51%)</li><li>170 glyphs failed completely</li></ul>
<p>OCR just sucks at single characters without context. Confused 'l' with 'I' with '1'. Couldn't handle punctuation. Gave up on ligatures entirely.</p>
<p>OCR needs words and sentences to work well. Single characters? Might as well flip a coin.</p>
<h2>Part 4: The Solution That Actually Worked</h2>
<p>Every request includes `glyphs.json` with SVG path definitions:</p>
<pre><code>{
  "24": {
    "path": "M 450 1480 L 820 1480 L 820 0 L 1050 0 L 1050 1480 ...",
    "fontFamily": "bookerly_normal"
  },
  "87": {
    "path": "M 450 1480 L 820 1480 L 820 0 L 1050 0 L 1050 1480 ...",
    "fontFamily": "bookerly_normal"
  }
}</code></pre>
<p><strong>Glyph IDs change, but SVG shapes don't.</strong></p>
<h3>Why Direct SVG Comparison Failed</h3>
<p>First attempt: normalize and compare SVG path coordinates.</p>
<p>Failed because:</p>
<ul><li>Coordinates vary slightly</li><li>Path commands represented differently</li></ul>
<h3>Pixel-Perfect Matching</h3>
<p>Screw coordinate comparison. Let's just render everything and compare pixels.</p>
<figure><img alt="" src="https://blog.pixelmelt.dev/content/images/2025/10/id_028_bookerly.png"/><figcaption>Render that A</figcaption></figure>
<p>1. <strong>Render every SVG as an image</strong></p>
<ul><li>Use cairosvg (lets us handle those fake font hints correctly)</li><li>Render at 512 x 512px for accuracy</li></ul>
<p>2. <strong>Generate perceptual hashes</strong></p>
<ul><li>Hash each rendered image</li><li>The hash becomes the unique identifier</li><li>Same shape = same hash, regardless of glyph ID</li></ul>
<p>3. <strong>Build normalized glyph space</strong></p>
<ul><li>Map all 184 random alphabets to hash-based IDs</li><li>Now glyph "a1b2c3d4..." always means letter 'T'</li></ul>
<p>4. <strong>Match to actual characters</strong></p>
<ul><li>Download Bookerly TTF fonts</li><li>Render every character (A-Z, a-z, 0-9, punctuation)</li><li>Use SSIM (Structural Similarity Index) to match</li></ul>
<h3>Why SSIM Is Perfect For This</h3>
<p>SSIM compares image structure, not pixels directly. It handles:</p>
<ul><li>Slight rendering differences</li><li>Anti-aliasing variations</li><li>Minor scaling issues</li></ul>
<p>For each unknown glyph, find the TTF character with highest SSIM score. That's your letter.</p>
<h3>Handling The Edge Cases</h3>
<p><strong>Ligatures:</strong> ff, fi, fl, ffi, ffl</p>
<ul><li>These are single glyphs for multiple characters</li><li>Had to add them to TTF library manually</li></ul>
<p><strong>Special characters:</strong> em-dash, quotes, bullets</p>
<ul><li>Extended character set beyond basic ASCII</li><li>Matched against full Unicode range in Bookerly</li></ul>
<p><strong>Font variants:</strong> Bold, italic, bold-italic</p>
<ul><li>Built separate libraries for each variant</li><li>Match against all libraries, pick best score</li></ul>
<h2>Part 5: The Moment It All Worked</h2>
<h3>Final Statistics</h3>
<pre><code>=== NORMALIZATION PHASE ===
Total batches processed: 184
Unique glyphs found: 361
Total glyphs in book: 1,051,745

=== MATCHING PHASE ===
Successfully matched 361/361 unique glyphs (100.00%)
Failed to match: 0 glyphs
Average SSIM score: 0.9527

=== DECODED OUTPUT ===
Total characters: 5,623,847
Pages: 920</code></pre>
<p>Perfect. Every single character decoded correctly.</p>
<h3>EPUB Reconstruction With Perfect Formatting</h3>
<p>The JSON includes positioning for every text run:</p>
<pre><code>{
  "glyphs": [24, 25, 74],
  "rect": {"left": 100, "top": 200, "right": 850, "bottom": 220},
  "fontStyle": "italic",
  "fontWeight": 700,
  "fontSize": 12.5,
  "link": {"positionId": 7539}
}</code></pre>
<p>I used this to preserve:</p>
<ul><li>Paragraph breaks (Y-coordinate changes)</li><li>Text alignment (X-coordinate patterns)</li><li>Bold/italic styling</li><li>Font sizes</li><li>Internal links</li></ul>
<p>The final EPUB is near indistinguishable from the original!</p>
<h2>The Real Conclusion</h2>
<p>Amazon put real effort into their web DRM.</p>
<h3>Was It Worth It?</h3>
<p>To read one book? No.</p>
<p>To prove a point? Absolutely.</p>
<p>To learn about SVG rendering, perceptual hashing, and font metrics? Probably yes.</p>
<p>This is for backing up books YOU PURCHASED.</p>
<figure><a href="https://github.com/PixelMelt/amazon_book_downloader?ref=blog.pixelmelt.dev"><img alt="" src="https://blog.pixelmelt.dev/content/images/icon/pinned-octocat-093da3e6fa40-8.svg"/>GitHubPixelMelt<img alt="" src="https://blog.pixelmelt.dev/content/images/thumbnail/amazon_book_downloader"/></a></figure>
<p>Don't get me sued into oblivion thanks.</p>
<figure><a href="https://blog.pixelmelt.dev/building-the-language-model-nobody-asked-for/"><img alt="Building The Language Model Nobody Asked For" sizes="(max-width: 1000px) 400px, 800px" src="https://images.unsplash.com/photo-1629551317181-15812a60f358?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxldmlsJTIwY2F0fGVufDB8fHx8MTc1NTkxNjE3NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" srcset="https://images.unsplash.com/photo-1629551317181-15812a60f358?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxldmlsJTIwY2F0fGVufDB8fHx8MTc1NTkxNjE3NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=300 300w,
                    https://images.unsplash.com/photo-1629551317181-15812a60f358?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxldmlsJTIwY2F0fGVufDB8fHx8MTc1NTkxNjE3NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=600 600w,
                    https://images.unsplash.com/photo-1629551317181-15812a60f358?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxldmlsJTIwY2F0fGVufDB8fHx8MTc1NTkxNjE3NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1000 1000w,
                    https://images.unsplash.com/photo-1629551317181-15812a60f358?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxldmlsJTIwY2F0fGVufDB8fHx8MTc1NTkxNjE3NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000 2000w"/></a><figcaption><a href="https://blog.pixelmelt.dev/building-the-language-model-nobody-asked-for/">Building The Language Model Nobody Asked For</a></figcaption></figure>
<figure><a href="https://blog.pixelmelt.dev/defeating-devtools-detection/"><img alt="Defeating DevTools Detection" sizes="(max-width: 1000px) 400px, 800px" src="https://blog.pixelmelt.dev/content/images/size/w2000/2025/07/felix-mittermeier-lfNjeweCXJQ-unsplash-1.jpg" srcset="https://blog.pixelmelt.dev/content/images/size/w300/2025/07/felix-mittermeier-lfNjeweCXJQ-unsplash-1.jpg%20300w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w600/2025/07/felix-mittermeier-lfNjeweCXJQ-unsplash-1.jpg%20600w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w1000/2025/07/felix-mittermeier-lfNjeweCXJQ-unsplash-1.jpg%201000w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w2000/2025/07/felix-mittermeier-lfNjeweCXJQ-unsplash-1.jpg%202000w"/></a><figcaption><a href="https://blog.pixelmelt.dev/defeating-devtools-detection/">Defeating DevTools Detection</a></figcaption></figure>
<figure><a href="https://blog.pixelmelt.dev/analysing-pistoljsvm/"><img alt="Attacking a stack based JavaScript virtual machine" sizes="(max-width: 1000px) 400px, 800px" src="https://blog.pixelmelt.dev/content/images/size/w2000/2025/06/470685956_1363842918332076_620415779121275422_n-1.jpg" srcset="https://blog.pixelmelt.dev/content/images/size/w300/2025/06/470685956_1363842918332076_620415779121275422_n-1.jpg%20300w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w600/2025/06/470685956_1363842918332076_620415779121275422_n-1.jpg%20600w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w1000/2025/06/470685956_1363842918332076_620415779121275422_n-1.jpg%201000w,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/content/images/size/w2000/2025/06/470685956_1363842918332076_620415779121275422_n-1.jpg%202000w"/></a><figcaption><a href="https://blog.pixelmelt.dev/analysing-pistoljsvm/">Attacking a stack based JavaScript virtual machine</a></figcaption></figure>
