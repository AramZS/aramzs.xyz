---
author: Birchtree
cover_image: >-
  https://birchtree.me/content/images/size/w1200/2026/01/Screenshot-2026-01-12-at-11.33.13@2x-1.png
date: '2026-01-12T18:11:25.564Z'
dateFolder: 2026/01/12
description: >-
  I'm the sort of person who treats their downloads folder as a kind of
  purgatory for files. It's where things tend to land when they come into my
  computer, and if they don't have an obvious long-term storage destination,
  it's often where they live for longer than I'd like to
isBasedOn: 'https://birchtree.me/blog/micro-app-2-download-folder-sorter/'
link: 'https://birchtree.me/blog/micro-app-2-download-folder-sorter/'
slug: 2026-01-12-httpsbirchtreemeblogmicro-app-2-download-folder-sorter
tags:
  - code
title: 'Micro app #2: Download folder sorter'
---
<figure><img alt="Micro app #2: Download folder sorter" sizes="(min-width: 1023px) 920px, 100vw" src="https://birchtree.me/content/images/size/w1920/2026/01/Screenshot-2026-01-12-at-11.33.13@2x-1.png" srcset="https://birchtree.me/content/images/size/w400/2026/01/Screenshot-2026-01-12-at-11.33.13@2x-1.png 400w,
"/></figure>
<p>I'm the sort of person who treats their downloads folder as a kind of purgatory for files. It's where things tend to land when they come into my computer, and if they don't have an obvious long-term storage destination, it's often where they live for longer than I'd like to admit. We're talking many months, and over a year in some cases.</p>
<p>Don't judge, we've all got our things.</p>
<p>I know, I know, I should handle this sort of thing better, but I just haven't gotten around to it in 30 years of using a Mac. In the meantime, what I've done is create <a href="https://github.com/mattbirchler/download-sorter?ref=birchtree.me">a simple AppleScript</a> that I can run whenever I want to clean up my downloads folder.</p>
<p>Basically, what it does is go through all of the files and folders in my downloads folder and check when they were added. If it was added in a previous month, it will sort the file or folder into a new folder, still inside the downloads folder, with the year and the month associated with it (ex: 2025-09). Inside those folders, it does further sorting to put images, videos, and music in their own sub-folders, and everything else just sits at the top level of that month.</p>
<p>This certainly doesn't help me with actually solving the underlying problem, but it does make me feel a little better because my downloads folder doesn't look quite as full when I open it. If you're interested in trying it yourself, you can <a href="https://github.com/mattbirchler/download-sorter?ref=birchtree.me">find the script on GitHub</a>.</p>
