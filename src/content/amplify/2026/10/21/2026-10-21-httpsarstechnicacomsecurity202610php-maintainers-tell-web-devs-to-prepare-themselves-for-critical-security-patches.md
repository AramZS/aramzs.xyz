---
author: Dan Goodin
cover_image: >-
  https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape-1000x648.jpeg
date: '2026-10-21T06:14:19.404Z'
dateFolder: 2026/10/21
description: >-
  Unconfirmed report claims PHP2Shell exploit remotely executes code on PHP
  sites.
isBasedOn: >-
  https://arstechnica.com/security/2026/10/php-maintainers-tell-web-devs-to-prepare-themselves-for-critical-security-patches/
link: >-
  https://arstechnica.com/security/2026/10/php-maintainers-tell-web-devs-to-prepare-themselves-for-critical-security-patches/
slug: >-
  2026-10-21-httpsarstechnicacomsecurity202610php-maintainers-tell-web-devs-to-prepare-themselves-for-critical-security-patches
tags:
  - tech
  - infosec
title: PHP warns it plans to release 2 emergency patches imminently
---
<p> <em> EAT YOUR WHEATIES </em></p>
<p>Unconfirmed report claims PHP2Shell exploit remotely executes code on PHP sites.</p>
<p><a href="https://arstechnica.com/author/dan-goodin/"> Dan Goodin </a> –  Oct 20, 2026 10:12 PM |</p>
<figure><a data-cropped="true" data-pswp-height="750" data-pswp-srcset="https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape.jpeg 1000w, https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape-300x225.jpeg 300w, https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape-640x480.jpeg 640w, https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape-768x576.jpeg 768w, https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape-980x735.jpeg 980w" data-pswp-width="1000" href="https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape.jpeg"><img alt="" src="https://cdn.arstechnica.net/wp-content/uploads/2022/05/caution-tape-1000x648.jpeg"/></a></figure>
<p> / Credit: Getty Images</p>
<p>Text settings</p>
<p>Website admins, brace yourselves. Fixes for what are believed to be uncommonly severe vulnerabilities are scheduled to drop in a little more than 12 hours for PHP, a programming language that powers websites and Web applications everywhere.</p>
<p>PHP maintainers <a href="https://www.php.net/archive/2026.php#2026-10-20-1">said Monday</a> that they planned to release patches for two vulnerabilities, both with severity ratings of 9.2 out of a possible 10.</p>
<h2>Waiting for PHP2Shell</h2>
<p>“All PHP users are encouraged to prepare now so they can upgrade as soon as the release is available,” the advisory stated. “We reserve the right to release earlier should details of either vulnerability become public, or should evidence of active exploitation appear in the wild.”</p>
<p>The maintainers published the advisory following the leaking of purported details, which have yet to be confirmed. The report showed a video of an exploit tool dubbed PHP2Shell executing code on webservers running WordPress, Magento, MediaWiki, Laravel, Drupal, and WHMCS, all of which use PHP. A video depicting the tool has been reposted <a href="https://media.infosec.exchange/infosec.exchange/cache/media_attachments/files/117/475/759/330/067/147/original/4e800fe72bfa6523.mp4">here</a>.</p>
<p>Attempts to locate the unconfirmed report were unsuccessful, but security firm watchTowr <a href="https://watchtowr.com/intelligence/php-cve-2026-109618-faq/#elementor-toc__heading-anchor-3">said</a> it claimed to affect every PHP version from PHP 5, released in 2004, onward. The security firm went on to say it has confirmed that the vulnerabilities, tracked as CVE-2026-109618 and CVE-2026-109619, are real.</p>
<p>Researchers from separate security firm Sansec <a href="https://sansec.io/research/php2shell">said</a> they “expect mass attacks to start within 15 minutes of the release.” A third security firm, Webfence, also <a href="https://www.wordfence.com/blog/2026/10/psa-upcoming-critical-php-security-release/">urged</a> admins to prepare now. Huntress has also <a href="https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities">issued</a> an advisory.</p>
<p>Preparation steps include identifying who is responsible for managing PHP inside an organization, taking an inventory of every app built on the language, planning a maintenance window starting at 14:00 UTC with contingency plans for earlier, making a backup of site and database files, and monitoring the PHP.net homepage for any late-breaking announcements, including an earlier release time. Some experts suggest unplugging any non-essential systems until they’re patched.</p>
<p>As an open-source scripting language for building dynamic websites and web apps, PHP has come to be a de facto building block for the Web. It runs multiple CMS apps in addition to WordPress and also powers many internal tools. One security researcher <a href="https://bsky.app/profile/silascutler.bsky.social/post/3mydwzp3dcc2z">said</a> an estimated 1.3 million Internet-connected hosts are likely affected. Vulnerabilities with the severity the advisories are describing have the potential to inflict major damage across the Internet. Admins should remain aware that the patches can be released at any moment and remain vigilant until they do.</p>
