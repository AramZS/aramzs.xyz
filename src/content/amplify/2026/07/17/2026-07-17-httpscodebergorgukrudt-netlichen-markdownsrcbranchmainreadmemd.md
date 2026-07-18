---
author: ukrudt-net
cover_image: 'https://codeberg.org/ukrudt-net/lichen-markdown/-/summary-card'
date: '2026-07-18T00:20:13.921Z'
dateFolder: 2026/07/17
description: >-
  lichen-markdown - Lichen-Markdown is a simple and friendly CMS for making
  static websites.
isBasedOn: 'https://codeberg.org/ukrudt-net/lichen-markdown/src/branch/main/README.md'
link: 'https://codeberg.org/ukrudt-net/lichen-markdown/src/branch/main/README.md'
slug: 2026-07-17-httpscodebergorgukrudt-netlichen-markdownsrcbranchmainreadmemd
tags:
  - ssg
  - code
  - decentralization
title: Lichen-Markdown
---
<p>Lichen-Markdown is a simple and friendly CMS for making static websites. Lichen-markdown is a fork of the <a href="https://codeberg.org/stringbone/lichen/src/branch/master">original php version of Lichen</a>.</p>
<p>There is a simple web page with more info about the project at <a href="https://lichen.commoninternet.net">https://lichen.commoninternet.net</a>.</p>
<figure><a href="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/lichen-markdown-cms-boxshadow4.png"><img alt="screenshot of lichen UI" src="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/lichen-markdown-cms-boxshadow4.png"/></a><figcaption><a href="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/lichen-markdown-cms-boxshadow4.png">screenshot of lichen UI</a></figcaption></figure>
<h2>Table of Contents</h2>
<ul> <li><a href="https://codeberg.org/ukrudt-net/lichen-markdown/src/branch/main/README.md/#lichen-markdown">Lichen-Markdown</a> <ul> <li><a href="https://codeberg.org/ukrudt-net/lichen-markdown/src/branch/main/README.md/#updating-lichen-markdown">Updating Lichen-markdown</a> </li> </ul> </li> </ul>
<h2>Installing and running locally</h2>
<p>Get the source code:</p>
<pre><code>wget https://codeberg.org/ukrudt.net/lichen-markdown/archive/v1.5.0.zip
unzip v1.5.0.zip
</code></pre>
<p>You can then run it directly with php:</p>
<pre><code>cd lichen-markdown/src; 
php -S 127.0.0.1:8000 cms/router.php
</code></pre>
<p>You can then navigate to <code>127.0.0.1:8000</code> to see the website.</p>
<p>Navigate to <code>127.0.0.1:8000/cms/edit.php</code> to see the admin interface.</p>
<p>Note that the authentication of the cms interface at /cms/edit.php does not work when running with php, as the authentication is depending on apache/nginx</p>
<h3>With docker</h3>
<p>If you want to locally test lichen-markdown in combination with apache, you can use Docker.</p>
<p>A script with the docker command is included:</p>
<p>Then go to <a href="http://localhost:8000">localhost:8000</a> to use the app.</p>
<h2>Running On A Server</h2>
<h3>With Yunohost</h3>
<p>One way to run Lichen-Markdown is as a Yunohost application. You can install Yunohost on your server in <a href="https://doc.yunohost.org/en/admin/get_started/install_on/">the standard way</a>, and then install Lichen-Markdown via <a href="https://apps.yunohost.org//app/lichenmarkdown">the application catalog</a>.</p>
<p>On a server without Yunohost, you can can also serve Lichen-Markdown via Apache or Nginx, following the instructions below.</p>
<p>First download the latest release of Lichen-Markdown to your server in the same way as above (for running Lichen-Markdown locally).</p>
<p>This folder can then be served via Apache, Nginx or Docker (using Apache inside).</p>
<p>Instructions for each of these methods are below.</p>
<h3>With Apache or Nginx</h3>
<p>First install the dependencies:</p>
<pre><code>apt install php-cli php-gd curl apache2-utils
</code></pre>
<p>To install Lichen-Markdown v1.5.0 in the folder <code>FOLDER</code> run the following command:</p>
<pre><code>curl -s https://codeberg.org/ukrudt.net/lichen-markdown/raw/branch/main/lib/install.sh | bash -s -- FOLDER v1.5.0
</code></pre>
<p>The script will ask whether you want to create an admin user. If your are installing on a server, this is a MUST. Otherwise anyone can upload things to your server. If you use Nginx (see below) you need to setup http basic auth for this to work.</p>
<ol> <li> <p>With an apache web server, copy the apache config in this repository in docs/apache.conf to /etc/apache2/sites-enabled/.</p> </li> <li> <p>In the apache.conf you need to replace <code>/path/to/your_install_dir</code> with your install-dir, and <code>your.domain.example.com</code> with your actual server domain. You also need to change the ssl-settings to point to a working certificate. We recommend using LetsEncrypt for getting certicates - see their docs for more info.</p> </li> <li> <p>Create a soft link from the root folder</p> </li> </ol>
<p>With an nginx web server, copy the nginx config in this repository in docs/nginx.conf to /etc/nginx/sites-enabled/.</p>
<p>In the nginx.conf you need to replace <strong>INSTALL_DIR</strong> with the path to your lichen-markdown project, and "your.domain.example.com" with your actual server domain.</p>
<p>There is a also a comment within nginx.conf explaining how to protect the admin panel with http basic auth, if you choose to.</p>
<p>The Dockerfile in docker/Dockerfile builds a docker image which can be used to serve Lichen-Markdown with apache, via something like this:</p>
<pre><code>docker build -t lichen-markdown:latest ./docker/
docker run -d -p 8000:80 -v $(pwd)/src:/var/www/html lichen-markdown:latest
</code></pre>
<h2>Usage</h2>
<figure><a href="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/editor-screenshot-boxshadow4.png"><img alt="screenshot of lichen UI" src="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/editor-screenshot-boxshadow4.png"/></a><figcaption><a href="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/editor-screenshot-boxshadow4.png">screenshot of lichen UI</a></figcaption></figure>
<p>Navigate to <code>/cms/edit.php</code> to edit pages or add new ones. Changes you make to the raw Markdown on the left are reflected in the live preview on the right.</p>
<p>Open the cheatsheet.md file in the editor to see how markdown can be used to format your web pages.</p>
<p>Click the green "Save" button at the bottom to save your content and render a fresh HTML file.</p>
<figure><a href="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/file-nav-boxshadow4.png"><img alt="screenshot of lichen UI" src="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/file-nav-boxshadow4.png"/></a><figcaption><a href="https://codeberg.org/notplants/lichen-markdown-landing-page/raw/branch/main/screenshots/file-nav-boxshadow4.png">screenshot of lichen UI</a></figcaption></figure>
<p>The file manager allows you to create new pages and folders, and upload files like images and videos.</p>
<p>Click on a Markdown file (.md) to edit it.</p>
<p>You can also edit the typographic styling of the page: Expand the <code>assets</code> folder and click on the <code>stylesheet.css</code> file. Changes in this file will be reflected in the live preview.</p>
<p>Hover a file and click the 🔗 button to return to the editor and insert a link to that file. It will be inserted at the current cursor position.</p>
<h3>Set the title of the page</h3>
<p>Web pages has a <code>title</code> that will be reflected in the browser or tab-header. In Lichen-markdown you can set the title explicitly. If not set the title will fall back to the most prominent headline.</p>
<p>To set a title explicity, use the following format in the markdown-file:</p>
<p>Then <code>A Wonderful Title</code> will become the title for that web page.</p>
<p>To set a general title for all pages in your web site, add the title-snippet to the <code>header.md</code> file. If you additionally add another title-snippet to a specific page, then the specific page title will override the one in the header-file, for that page.</p>
<h2>Localization of your Lichen-markdown website</h2>
<p>You can make simple localised versions of your website by putting other language-versions of your pages in this folder-structure: <code>/l11n/&lt;LANGUAGE_NAME&gt;/</code>. "l11n" is a numeronym for "localization".</p>
<p>If you create at least the files <code>index.md</code>, <code>header.md</code> and <code>footer.md</code> in a folder <code>/l11n/&lt;LANGUAGE_NAME&gt;/</code>, Where <code>&lt;LANGUAGE_NAME&gt;</code> is whatever you like (e.g. <code>en</code> for english or <code>da</code> for danish).</p>
<p>You can then create a link to a localized version of your page. E.g. <a href="https://your-lichen-site.net/l11n/">https://your-lichen-site.net/l11n/</a>&lt;LANGUAGE_NAME&gt;, and put it in your header.</p>
<p>All internal links on the localized version should point to language-specific version of the pages. So if you have a link to an about page, that would normally be <code>/about</code>, then in the localised version, the link should be <code>/l11n/&lt;LANGUAGE_NAME&gt;/about</code>.</p>
<p>The layout logic will user the localized header and footer for the layout, when you try to view a localized page. If they don't exist it will fall back to the usual header and footer.</p>
<p>Note that this simple localization always leads the user to the front page of the localized version. If you want to have the language-link point to the current page, you could implement the language-links in each individual page, instead of in the header, and then point them to their respective localized versions.</p>
<h2>Project Structure</h2>
<p>The "src" folder of the downloaded folder contains an example Lichen-Markdown project with everything needed, including the markdown files for each web page, the cms folder (which contains the php files of the cms), and the theme folder, which contains a layout.php file used for rendering all the markdown pages.</p>
<p>The "dist" folder is built from the contents of src.</p>
<p>From the command line, dist can be rebuilt via the command: <code>php cms/build.php</code>.</p>
<p>Dist can also be re-built through the web interface by clicking the "Rebuild" button which becomes visible when hovering over "src" in the editor.</p>
<p>Rebuilding "dist" manually like this is actually only necessary if you change files on disc, outside of the Lichen admin UI — otherwise Lichen will keep src and dist in sync, with dist containing the render HTML versions of files in src.</p>
<h2>Using Lichen-Markdown As An SSG</h2>
<p>The first intended usecase of Lichen-Markdown is to be run as a webserver, so that it can be used as a CMS by an individual or between a small group of collaborators.</p>
<p>However it is also possible to use Lichen-Markdown as a sort of static site generator directly, by uploading the contents of "dist" to somewhere else.</p>
<p>"dist" contains a static artifact of the website and rendered HTML. This is more of a custom use-case, but noting this here in case anyone wants to use it like that. Note that for files that are not renders of .md files, dist actually is made up of symbolic links back to the original files (in order to save space, and not have each file duplicated). So if you are copying 'dist' to another server, for example using rsync, you would want to use a command that copies symbolic links as real files, such as <code>rsync -avL source/ destination/</code>.</p>
<p>You can also rebuild dist on the command line via the command: <code>php cms/build.php</code>.</p>
<h2>Updating Lichen-markdown</h2>
<p>For existing Lichen-markdown installs you can update to the newest version. The method depends on your version of Lichen-markdown. You should also see <a href="https://codeberg.org/release_notes.md">the release notes for instructions specific to each release</a>.</p>
<h3>Updating Lichen-markdown v1.4.0 and above</h3>
<p>From your lichen-markdown folder, run:</p>
<pre><code>bash ./update/update_lichen.sh
</code></pre>
<h3>Updating Lichen-markdown v1.3.9 and below</h3>
<p>Run the following command in the lichen-markdown folder:</p>
<pre><code>curl -s https://codeberg.org/ukrudt.net/lichen-markdown/raw/branch/main/lib/update.sh | bash -s -- "." 
</code></pre>
<h2>Debugging rendering</h2>
<p>You can debug rendered html in php with this trick, where <code>$variable</code> is a variable containing an html string.</p>
<pre><code>echo ("&lt;pre&gt;&lt;code&gt;" . json_encode($variable) . "&lt;/code&gt;&lt;/pre&gt;");
</code></pre>
<h2>Contributors</h2>
<p>Lichen-Markdown was forked from Lichen, by <a href="https://venner.network/@abekonge">@abekonge</a>, <a href="https://toot.cafe/@soapdog">@soapdog</a>, and <a href="https://sunbeam.city/@notplants">@notplants</a>.</p>
<h2>Contributing</h2>
<p>Contributions are welcome.</p>
<p>When making a new release you should change the code followingly:</p>
<ul> <li>change the <code>NEW_VERSION</code> variable in <code>lib/update.sh</code> to the new version number</li> <li>search for the old version number in the code base and change it to the new version number where meaningful. Currently this is only in comments and in this readme.</li> </ul>
<h2>License</h2>
<p>The original Lichen and this fork are both licensed using MIT License.</p>
<pre><code>The MIT License (MIT)

Copyright © 2022 Sensor Station LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</code></pre>
