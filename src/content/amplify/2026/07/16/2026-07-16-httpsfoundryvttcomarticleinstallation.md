---
author: foundryvtt.com
cover_image: >-
  https://r2.foundryvtt.com/website-uploads-public/screen/user_681/installation_diagram_large_20250502-2025-05-02.webp
date: '2026-07-16T04:05:34.502Z'
dateFolder: 2026/07/16
description: The official website and community for Foundry Virtual Tabletop.
isBasedOn: 'https://foundryvtt.com/article/installation/'
link: 'https://foundryvtt.com/article/installation/'
slug: 2026-07-16-httpsfoundryvttcomarticleinstallation
tags:
  - ttrpg
title: Installation Guide
---
<h2>Overview</h2>
<p>Foundry Virtual Tabletop is a "cross-platform" application that is compatible all major operating systems including Windows, macOS, and various Linux distributions.</p>
<p>This article covers downloading, installing, and activating Foundry VTT for all platforms and for several different purposes:</p>
<dl> <dt>The Recommended Installation Process</dt> <dd>This section covers the standard method to download, install, and activate Foundry VTT. The vast majority of new and existing users should follow these instructions.</dd> <dt>Installation Options</dt> <dd>Additional available download and installation options are covered here.</dd> <dt>Specialized Installation Instructions</dt> <dd>This article also presents instructions for downloading and installing Foundry to achieve specific goals, such as: <ul> <li>Downloading and installing an older version of the software</li> <li>Installing a "portable" version of Foundry VTT</li> <li>Managing multiple versions of Foundry VTT on the same machine</li> <li>Setting up a dedicated "headless" Foundry VTT server</li> </ul> </dd> </dl>
<figure><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/3KCNZfCi5x8?si=B0tcGIL5cCp7dQ_i" type="video/mp4"/></div></figure>
<h2>The Recommended Installation Process</h2>
<p>This section covers how to download, install, and activate the standard Foundry VTT desktop application so that you can "self-host" Foundry VTT games directly on your own computer.</p>
<p>Unless you are an experienced Foundry VTT user and have a specific reason, you should always follow this standard process to download, activate, and install Foundry VTT.</p>
<h3>Downloading Foundry VTT</h3>
<p>Typically, to download the software you must own a valid Foundry VTT license. If necessary, you can <a href="https://foundryvtt.com/purchase/">purchase</a> one here.</p>
<figure><img alt="Follow these steps to download Foundry VTT from the website." src="https://r2.foundryvtt.com/website-uploads-public/screen/user_681/installation_diagram_large_20250502-2025-05-02.webp"/><figcaption>Follow these steps to download Foundry VTT from the website.</figcaption></figure>
<p><strong>NOTE:</strong> If you do not see the "Download Software" button or the "Purchased Licenses" tab, you are not logged into an account that owns a valid Foundry VTT license.</p>
<p>If you believe that you do own a Foundry VTT license, you may accidentally be logged in with duplicate acount. If you need assistance, please use the <a href="https://foundryvtt.com/contact-us/">Contact Us</a> form.</p>
<h3>Installing the Software</h3>
<p>Next, use the downloaded file to install Foundry VTT like any other application:</p>
<h3>Activating the Software</h3>
<p>Once Foundry VTT is fully installed, the final step of the installation process is to launch it and activate it.</p>
<p>And that's it, you're now fully installed and ready to go!</p>
<p>From here, try checking out the <a href="https://foundryvtt.com/article/tutorial/">Tutorial - Gamemaster Part One</a>. Also, be sure that your players are able to connect by setting up <a href="https://foundryvtt.com/article/port-forwarding/">Port Forwarding</a>.</p>
<h2>Additional Installation Options</h2>
<p>For simplicity, the <a href="https://foundryvtt.com/article/installation/#recommended">recommended installation process</a> often provided instructions to pick a single option out of many. This section provides additional information about the other choices that are available during the process of downloading and installing Foundry VTT.</p>
<h2>Advanced Installation Processes</h2>
<p>This section provides instructions for the more atypical ways to download, install, and configure Foundry VTT.</p>
<h3>Hosting a Dedicated Server with Node.js</h3>
<p><b>Note:</b> Installing Node.js manually as described below is not part of the typical Foundry installation process.</p>
<p>Most users can simply install Foundry <a href="https://foundryvtt.com/article/installation/#installing">using the standard Windows, macOS, or Linux installer</a>. If you are an advanced user who is planning on a more unusual method of running Foundry (such as creating a dedicated headless Foundry server), this section describes how to install Foundry VTT as a Node.js package.</p>
<h4>Downloading, Extracting and Launching the Server</h4>
<p>Next, you will need to download Foundry. Use the standard instructions "<a href="https://foundryvtt.com/article/installation/#downloading">Downloading Foundry</a>" above, but be sure to pick the "Node.js" option in the "Operating System" dropdown menu.</p>
<p><strong>Note</strong>: The separate "Node.js" installer only exists for Version 13+. For older versions of Foundry VTT, use the Linux installer which also includes the necessary Node.js files.</p>
<p>Now that you have downloaded Foundry VTT and installed Node.js, it's time to extract the zip, create your data directory and launch your Node.JS server. This process varies depending on the operating system of your server.</p>
<p>Now that you are running Foundry VTT via Node, open any modern web browser and connect to <a href="http://127.0.0.1:30000">http://127.0.0.1:30000</a> to access your server.</p>
<h4>Running as a Service</h4>
<p>If you wish to keep the server running perpetually, you may wish to run Foundry VTT using a process manager like <a href="https://systemd.io/">systemd</a> which is recommended for standalone installations or <a href="https://pm2.keymetrics.io/docs/usage/quick-start/">PM2</a> which is recommended for operating a cluster of instances. Such service managers can be helpful but are not required.</p>
