---
author: plan9.io
cover_image: ''
date: '2026-08-15T19:31:22.541Z'
dateFolder: 2026/08/15
description: >-
  Plan 9 from Bell Labs is a research system developed at Bell Labs starting in
  the late 1980s. Its original designers and authors were Ken Thompson, Rob
  Pike, Dave Presotto, and Phil Winterbottom.
isBasedOn: 'https://plan9.io/plan9/about.html'
link: 'https://plan9.io/plan9/about.html'
slug: 2026-08-15-httpsplan9ioplan9abouthtml
tags:
  - code
  - tech
title: Plan 9 from Bell Labs
---
<p><b>Introduction </b></p>
<p>Plan 9 from Bell Labs is a research system developed at Bell Labs starting in the late 1980s. Its original designers and authors were Ken Thompson, Rob Pike, Dave Presotto, and Phil Winterbottom. They were joined by many others as development continued throughout the 1990s to the present.</p>
<p>Plan 9 demonstrates a new and often cleaner way to solve most systems problems. The system as a whole is likely to feel tantalizingly familiar to Unix users but at the same time quite foreign.</p>
<p>In Plan 9, each process has its own mutable name space. A process may rearrange, add to, and remove from its own name space without affecting the name spaces of unrelated processes. Included in the name space mutations is the ability to <i>mount</i> a connection to a file server speaking 9P, a simple file protocol. The connection may be a network connection, a pipe, or any other file descriptor open for reading and writing with a 9P server on the other end. Customized name spaces are used heavily throughout the system, to present new resources (e.g., the window system), to import resources from another machine (e.g., the network stack), or to browse backward in time (e.g., the dump file system).</p>
<p>Plan 9 is an operating system kernel but also a collection of accompanying software. The bulk of the software is predominantly new, written for Plan 9 rather than ported from Unix or other systems. The window system, compilers, file server, and network services are all freshly written for Plan 9. Although classic Unix programs like <a href="https://plan9.io/magic/man2html/1/dc"><i>dc</i>(1)</a>, <a href="https://plan9.io/magic/man2html/1/ed"><i>ed</i>(1)</a>, and even <a href="https://plan9.io/magic/man2html/1/troff"><i>troff</i>(1)</a> have been brought along, they are often in an updated form. For example, <i>troff</i> accepts Unicode documents encoded in UTF-8, as does the rest of the system.</p>
<p>The paper  gives a more in-depth introduction to the system.</p>
<p><b>Releases </b></p>
<p>Plan 9 has had four major releases over its lifetime.</p>
<p>The <b>first edition</b>, released in 1992, was made available only to universities. The first edition had most of the recognizable parts of Plan 9, including the kernel, ndb, sam, upas, alef, and full UTF-8 support. Acme was present in an early form as help. The CPU servers were the Sun Sparcstation, SGI Power, and SGI Magnum, with NeXTstations and PCs as terminals. The locally built Gnot and Hobbit workstations were also used as terminals.</p>
<p>The <b>second edition</b>, released in 1995 in book-and-CD form, added acme and a few smaller utilities. By the time of the second edition release, the Plan 9 team was working on a reimplementation of the system called Brazil. In 1999, in preparation for a third edition release, Brazil’s name was changed back to Plan 9.</p>
<p>The anticipated <b>third edition</b> was released in June 2000, distributed for free over the Internet. It introduced a new color graphics operator called draw and a new program connection mechanism called plumbing. The distribution introduced a simple update manager called wrap to install packaged system updates.</p>
<p>Starting shortly after the third edition release, the Bell Labs team began a revision to the 9P protocol called 9P2000. Compared to the 9P used by earlier releases, 9P2000 removes some now-cumbersome restrictions on name lengths, adds a ‘last modifier’ field to directory metadata, batches walk messages, and introduces authentication files as a mechanism for moving the details of authentication protocols out of the 9P protocol proper.</p>
<p>The <b>fourth edition</b> release, in 2002, introduced 9P2000 along with the associated security agent <a href="https://plan9.io/magic/man2html/4/factotum"><i>factotum</i>(4)</a> and key store <a href="https://plan9.io/magic/man2html/8/secstore"><i>secstore</i>(8)</a>. It also introduced the <a href="https://plan9.io/magic/man2html/8/venti"><i>venti</i>(8)</a> block storage server. The <i>venti</i>-based file server <a href="https://plan9.io/magic/man2html/4/fossil"><i>fossil</i>(4)</a> made its debut in early 2003.</p>
<p>In addition to these programs, the fourth edition introduced a new mechanism for distributing updates to the system. A public <i>fossil</i> file server, <i>sources.cs.bell-labs.com</i>, holds a current file tree which it serves to any Internet-connected Plan 9 system. Changes to this fourth edition tree are made frequently, usually every day. Clients run the <a href="https://plan9.io/magic/man2html/1/replica"><i>replica</i>(1)</a> tools to keep their own systems in sync with <i>sources</i>. Nightly snapshots of <i>sources</i>, accessed via its dump file system, provide a convenient release history.</p>
<p><b>Licensing </b></p>
<p>The first edition was made available only for use by universities.</p>
<p>The second edition was made available to the general public at a cost of $350 for the distribution, which included a license to use the software throughout the organization.</p>
<p>For the third edition, Lucent agreed to release Plan 9 for free via the Internet, under a new license, the Plan 9 License.</p>
<p>The fourth edition was made available under the <a href="http://www.opensource.org/licenses/lucent1.02.php">Lucent Public License version 1.02</a>. Adopted to address shortcomings in the Plan 9 License, the Lucent Public License 1.02 is identical the <a href="http://www.opensource.org/licenses/ibmpl.php">IBM Public License 1.0</a> except that it does not require source code to be distributed with derived works; it is non-viral.</p>
<p><b>Current Status </b></p>
<p>Plan 9 continues to change daily. Those changes are distributed to the many Plan 9 users via <a href="https://plan9.io/sources/"><i>sources.cs.bell-labs.com</i></a> as described above. Even so, Plan 9 has remained true to its original vision, and a user of a 1992 first edition system would not need much help in adapting to today’s.</p>
<p>Slowly, ideas from Plan 9 are being adopted by other systems. Plan 9 was the first operating system with complete support for the UTF-8 Unicode character set encoding. The dump file system has been mimicked in Athena’s OldFiles directories or Network Appliance’s .snapshot directories. The flexible <a href="https://plan9.io/magic/man2html/2/rfork"><i>rfork</i>(2)</a> system call, the basis of lightweight threads, was adopted as is by the various BSD derivatives and reincarnated on Linux as <a href="https://plan9.io/magic/man2html/2/clone"><i>clone</i>(2)</a>. The simple file protocol 9P has been implemented on early versions of FreeBSD and current versions of Linux.</p>
<p>A handful of companies have had success in selling Plan 9-based products. Most notable is <a href="http://www.vitanuova.com">Vita Nuova</a>, which continues to maintain and market Inferno, a Plan 9 derivative targeted at set-top boxes and other embedded devices.</p>
<p>Because Plan 9 has a very different system model from other modern operating systems, it is sometimes difficult to port external software to Plan 9. In particular, Plan 9 has no full-featured web browser; <a href="https://plan9.io/magic/man2html/4/webfs"><i>webfs</i>(4)</a> and <a href="https://plan9.io/magic/man2html/2/html"><i>html</i>(2)</a> are intended as steps toward a solution.</p>
<p>The <a href="https://plan9.io/plan9/">home page</a> contains links to additional documentation and download information.</p>
<p>Enjoy!</p>
