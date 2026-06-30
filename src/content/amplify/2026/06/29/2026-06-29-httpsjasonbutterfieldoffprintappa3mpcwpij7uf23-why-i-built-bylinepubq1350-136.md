---
author: Jason G. Butterfield
cover_image: 'https://jasonbutterfield.offprint.app/og/3mpcwpij7uf23.png?q=13%3A50-136'
date: '2026-06-29T12:24:30.491Z'
dateFolder: 2026/06/29
description: Owning Your Books Beyond One Website
isBasedOn: >-
  https://jasonbutterfield.offprint.app/a/3mpcwpij7uf23-why-i-built-bylinepub/q/13:50-136
link: >-
  https://jasonbutterfield.offprint.app/a/3mpcwpij7uf23-why-i-built-bylinepub/q/13:50-136
slug: >-
  2026-06-29-httpsjasonbutterfieldoffprintappa3mpcwpij7uf23-why-i-built-bylinepubq1350-136
tags:
  - tech
  - social media
  - decentralization
title: Why I Built Byline.pub
---
<figure><img alt="Why I Built Byline.pub" src="https://cdn.offprint.app/p/8215/conversions/Journey-week3-large.jpg"/></figure>
<p>You start with a clean idea. I want a place that is mine. A home base. A corner of the web where my writing, books, articles, links, and general digital mess can live without being scattered across a dozen platforms that may or may not still care about authors next year.</p>
<p>That was the thinking behind jasonbu.online. Not a static business card or another "about me" page floating in the web's junk drawer, but a living site that could pull in my work, show my books, surface my articles, and connect back into the broader social web I've been building around.</p>
<p>Simple, right? Sure, in the same way rewiring a house is simple if you ignore the walls, the code, the standards, the edge cases, and the quiet little voice asking why you didn't just use a spreadsheet like a normal person.</p>
<p>The more I worked on it, the more one problem stood out: my book data should not be trapped inside one website.</p>
<p>Most authors treat book information as something that lives wherever they happen to upload it. Amazon has a copy. Goodreads has a copy. The publisher may have a copy. The personal website has a copy. Maybe BookBub, StoryGraph, a retailer, a newsletter tool, or some random directory has one too.</p>
<p>Each version is slightly different. One has the old cover. One has the wrong description. One has a missing link. One has a typo you fixed three years ago that is somehow still there, grinning at you like a goblin under the floorboards.</p>
<p>We rebuild our own catalogue over and over again. That is ridiculous, and it is exactly why I built Byline.pub.</p>
<p>Byline.pub started as a simple idea: indie authors should have a place to list themselves and their books. A directory. A discoverability layer built for authors, rather than for platforms trying to sell attention back to the people who created the work in the first place.</p>
<p>Underneath that directory is the part that actually matters. Byline.pub is built around the idea that author and book records can live with the author.</p>
<p>The AT Protocol, or ATProto, is the technology behind Bluesky (I’ll include Gander here as well), but it is bigger than one app. The core idea is that your identity and records do not have to be locked inside a single platform. They can live in something called a PDS, or Personal Data Server.</p>
<p>That sounds technical, because of course it does. Technology people are constitutionally incapable of naming anything like normal humans. Me included, sometimes. The concept is straightforward, though. A PDS is where your data lives, like your own filing cabinet on the internet. Apps can help you create, read, display, or connect records, but the underlying data does not have to belong to the app.</p>
<p>In the traditional web model, you create content inside a platform and the platform stores it. Your profile, posts, lists, likes, book pages, and metadata are locked to that service. If the platform changes direction, shuts down, gets bought, breaks its API, starts charging for access, or decides authors are no longer a priority, too bad. Pack your things and start again somewhere else.</p>
<p>In the AT Protocol model, the record lives with your identity. That changes the relationship. The app becomes a tool rather than the landlord.</p>
<p>For Byline.pub, that means an author signs in with an AT Protocol identity and creates public author and book records. Those records are written back to the author's own repository on their PDS. Byline.pub indexes and displays them in a directory, but the signed record belongs with the author's data, not buried in a private Byline database as the only source of truth.</p>
<p>This is where jasonbu.online became the proof of concept.</p>
<p>I loaded my books into Byline.pub, then wired my personal site to pull that book information back out and display it.</p>
<p>That may not sound dramatic. Nobody is kicking down a door in slow motion. There are no helicopters, and no one is shouting "enhance" at a blurry ISBN. But my books are not hard-coded into jasonbu.online as isolated website content. They are records created through Byline.pub, stored as AT Protocol records, and pulled into my own site.</p>
<p>Byline.pub is not meant to be the only place that information appears. It is meant to help create and surface author-owned records that other apps, sites, and tools can use. My personal site is one example. The directory is another. A future reader app, a book recommendation tool, an indie bookstore site, a writing community, a review app, an awards directory, or a library catalogue experiment could all read the same public author and book records. They would read the public records the author created and controls, instead of scraping a page or making authors paste the same metadata into yet another form.</p>
<p>That is the part regular users should care about, even if they never see it. This is not complexity for its own sake. The Internet already has a generous surplus of overengineered nonsense. It is about a better foundation for digital authorship.</p>
<p>Authors already understand ownership when it comes to their books. We care about copyright, attribution, where our work appears, and how it is described. We care whether the right name is on the cover, whether the right edition is listed, whether the right links work, and whether readers can actually find the work. Yet we have accepted a web where our book data is mostly platform-owned, platform-shaped, and platform-contained.</p>
<p>Byline.pub is an attempt to push back on that. The author profile should belong with the author. So should the book record. The links, descriptions, identifiers, cover references, genres, series information, and publication details should not have to be recreated from scratch every time an app wants to support books.</p>
<p>From the reader's side, this should feel simple. They should not need to know what a PDS is, or understand lexicons, repositories, signed records, DIDs, or any of the glorious alphabet soup that makes us protocol people happy. They should just see accurate author pages and book listings.</p>
<p>Under the hood, the structure matters. A lexicon, in AT Protocol terms, is basically a schema: a defined shape for a type of record. For Byline.pub that means defining what an author record looks like and what a book record looks like. If it’s predictable, other apps can understand it. They know where the title goes, where the ISBN goes, where the author information goes, and how to display or connect it. That is what makes interoperability possible. Without a shared structure, everyone is just tossing JSON into the void and hoping someone else enjoys archaeology.</p>
<p>So Byline.pub is more than a directory. The directory is the visible part. The author and book data model behind it is the more interesting one, and it is why I wanted to test it against my own site first.</p>
<p>It is one thing to say author-owned book data should be reusable. It is another to create book records through Byline.pub and make jasonbu.online consume them as part of a real author site.</p>
<p>That is where the trials and tribulations come in. Building this means discovering every assumption you made that was quietly wrong. It means fixing strange edge cases: what happens when a book has multiple formats, when an author uses a pen name, when a cover changes, when an ISBN is missing, when a site wants to show only certain books, or when the public record and the indexed directory drift out of alignment.</p>
<p>This is the unglamorous part of building protocol-based tools. You are not just building a website. You are building a pattern other people may eventually rely on, which takes more thought than "here's a form and a database table, good luck." It means asking where the record should live, who controls it, how another app finds it, and what happens if Byline.pub disappears someday, or an author wants to use a different app, or a new directory wants to index the same records. The answer should not be: start over. That is the point.</p>
<p>I have written about sovereign data before, usually in terms of identity, social posts, verification, and digital independence. Authorship belongs in that conversation too. Your books are part of your professional identity, and for indie authors they are often the centre of it. So why should the data about those books be scattered, duplicated, and dependent on whichever platform happens to be popular this quarter?</p>
<p>It is still early, still a proof of concept in motion. There will be rough edges, because there are always rough edges. And I’m one guy. The working model is there. I can create my book records in Byline.pub. They live as public AT Protocol records. Byline.pub indexes them. My site pulls them in. Other apps could do the same.</p>
<p>That is the future I want to help build. Something open and author-centred, where writers are not stuck inside someone else's business model, and nobody has to enter the same book information for the fifteenth time. A shared layer for book data, owned by the people who wrote the books.</p>
<p>Books with a byline. Authors with a place. That was always where the data should have lived.</p>
<figure><img alt="" src="https://cdn.offprint.app/p/8214/conversions/Jason-Butterfield-signature-large.jpg"/></figure>
