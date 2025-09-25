---
author: The Cloudflare Blog
cover_image: >-
  https://cf-assets.www.cloudflare.com/zkvhlag99gkb/1Yxa7l7OfBZpKHB9KBqQ50/54a6e968ecec440267d5265ac23c97c5/Giving_users_choice_with_Cloudflare%C3%A2__s_new_Content_Signals_Policy-OG.png
date: '2025-09-24T21:11:13.288Z'
dateFolder: 2025/09/24
description: >
  Cloudflare’s Content Signals Policy gives creators a new tool to control use
  of their content. 
isBasedOn: 'https://blog.cloudflare.com/content-signals-policy/'
link: 'https://blog.cloudflare.com/content-signals-policy/'
slug: 2025-09-24-httpsblogcloudflarecomcontent-signals-policy
tags:
  - ai
title: Giving users choice with Cloudflare’s new Content Signals Policy
---
<figure><img alt="" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/ZnWk49LOi8USluhXstwJJ/36c179d0ef439bc7701c86e620212e71/BLOG-2956_1.png"/></figure>
<p>If we want to keep the web open and thriving, we need more tools to express how content creators want their data to be used while allowing open access. Today the tradeoff is too limited. Either website operators keep their content open to the web and risk people using it for unwanted purposes, or they move their content behind logins and limit their audience.</p>
<p>To address the concerns our customers have today about how their content is being used by crawlers and data scrapers, we are launching the Content Signals Policy. This policy is a new addition to robots.txt that allows you to express your preferences for how your content can be used after it has been accessed.</p>
<p><a href="https://www.cloudflare.com/learning/bots/what-is-robots-txt/"><u>Robots.txt</u></a> is a plain text file hosted on your domain that implements the <a href="https://www.rfc-editor.org/rfc/rfc9309.html"><u>Robots Exclusion Protocol</u></a>. It allows you to instruct which crawlers and bots can access which parts of your site. Many crawlers and some bots obey robots.txt files, but not all do.</p>
<p>For example, if you wanted to allow all crawlers to access every part of your site, you could host a robots.txt file that has the following:</p>
<pre><code data-highlighted="yes">User-agent: * 
Allow: /
</code></pre>
<p>A user-agent is how your browser, or a bot, identifies themselves to the resource they are accessing. In this case, the asterisk tells visitors that any user agent, on any device or browser, can access the content. The / in the <code>Allow</code> field tells the visitor that they can access any part of the site as well.</p>
<p>The <code>robots.txt</code> file can also include commentary by adding characters after # symbol. Bots and machines will ignore these comments, but it is one way to leave more human-readable notes to someone reviewing the file. Here is <a href="https://www.cloudflare.com/robots.txt"><u>one example</u></a>:</p>
<pre><code data-highlighted="yes">#    .__________________________.
#    | .___________________. |==|
#    | | ................. | |  |
#    | | ::[ Dear robot ]: | |  |
#    | | ::::[ be nice ]:: | |  |
#    | | ::::::::::::::::: | |  |
#    | | ::::::::::::::::: | |  |
#    | | ::::::::::::::::: | |  |
#    | | ::::::::::::::::: | | ,|
#    | !___________________! |(c|
#    !_______________________!__!
#   /                            \
#  /  [][][][][][][][][][][][][]  \
# /  [][][][][][][][][][][][][][]  \
#(  [][][][][____________][][][][]  )
# \ ------------------------------ /
#  \______________________________/
</code></pre>
<p>Website owners can make <code>robots.txt</code> more specific by listing certain user-agents (such as for only permitting certain bot user-agents or browser user-agents) and by stating which parts of a site they are or are not allowed to crawl. The example below tells bots to skip crawling the archives path.</p>
<pre><code data-highlighted="yes">User-agent: * 
Disallow: /archives/
</code></pre>
<p>And the example here gets more specific, telling Google’s bot to skip crawling the archives path.</p>
<pre><code data-highlighted="yes">User-agent: Googlebot 
Disallow: /archives/
</code></pre>
<p>This allows you to specify which crawlers are allowed and what parts of your site they can access. It does not, however, let them know what they are able to do with your content after accessing it. As many have <a href="https://datatracker.ietf.org/wg/aipref/about/"><u>realized,</u></a> there needs to be a standard, machine-readable way to signal the rules of your road for how your data can be used even after it has been accessed.</p>
<p>That is what the Content Signals Policy allows you to express: your preferences for what a crawler can, and cannot do with your content.</p>
<p>There are companies that scrape vast troves of data from the Internet every day. There is a real cost to website operators to serve these data scrapers, in particular when they receive no compensation in return; we are experiencing a classic <a href="https://en.wikipedia.org/wiki/Free-rider_problem"><u>free-rider problem</u></a>. This is only going to get worse: we expect bot traffic to exceed human traffic on the Internet by the end of 2029, and by 2031, we anticipate that bot activity alone will surpass the sum of current Internet traffic.</p>
<p>The de facto defaults of the Internet permitted this. The norm had been that your data would be ingested, but then you, the creator of that content, would get something in return: either referral traffic that you could monetize, or at a minimum some sort of attribution that cited you as the author. Think of the <a href="https://en.wikipedia.org/wiki/Linkback"><u>linkback</u></a> in the early days of blogging, which was a way to give credit to the original creator of the work. No money changed hands, but that attribution drove future discovery and had intrinsic value. This norm has been embedded in many permissive licenses such as <a href="https://en.wikipedia.org/wiki/MIT_License"><u>MIT</u></a> and <a href="https://creativecommons.org/share-your-work/cclicenses/"><u>Creative Commons</u></a>, each of which require attribution back to the original creator.</p>
<p>That world has changed; that scraped content is now sometimes used to economically compete against the original creator. It’s left many with an <a href="https://blog.cloudflare.com/introducing-ai-crawl-control/"><u>impossible choice</u></a>: do you lock down access to your content and data, or accept the reality of fewer referrals and minimal attribution? If the only recourse is the former, the open transmission of ideas on the web is harmed and newer entrants to the AI ecosystem are put at an unfair disadvantage for their efforts to train new models.</p>
<p>The Content Signals Policy integrates into website operators’ robots.txt files. It is human-readable text following the # symbol to designate it as a comment. This policy defines three content signals - search, ai-input, and ai-train - and their relevance to crawlers.</p>
<p>A website operator can then optionally express their preferences via machine-readable content signals.</p>
<pre><code data-highlighted="yes"># As a condition of accessing this website, you agree to abide by the following content signals:

# (a)  If a content-signal = yes, you may collect content for the corresponding use.
# (b)  If a content-signal = no, you may not collect content for the corresponding use.
# (c)  If the website operator does not include a content signal for a corresponding use, the website operator neither grants nor restricts permission via content signal with respect to the corresponding use.

# The content signals and their meanings are: 

# search: building a search index and providing search results (e.g., returning hyperlinks and short excerpts from your website's contents).  Search does not include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval augmented generation, grounding, or other real-time taking of content for generative AI search answers). 
# ai-train: training or fine-tuning AI models.

# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET. </code></pre>
<p>There are three parts to this text:</p>
<ul><li><p>The first paragraph explains to companies how to interpret any given content signal. “Yes” means go, “no” means stop, and the absence of a signal conveys no meaning. That final, neutral option is important: it lets website operators express a preference with respect to one content signal without requiring them to do so for another. </p></li><li><p>The second paragraph defines the content signals vocabulary. We kept the signals simple to make it easy for anyone accessing content to abide by them. </p></li><li><p>The final paragraph reminds those automating access to data that these content signals might have legal rights in various jurisdictions. </p></li></ul>
<p>A website operator can then announce their specific preferences in machine-readable text using comma-delimited, ‘yes’ or ‘no’ syntax. If a website operator wants to allow search, disallow training, and expressed no preference regarding ai-input, they could include the following in their robots.txt:</p>
<pre><code data-highlighted="yes">User-Agent: *
Content-Signal: search=yes, ai-train=no 
Allow: / 
</code></pre>
<p>If a website operator leaves the content signal for ai-input blank like in the above example, it does not mean they have no preference regarding that use; it just means they have not used this part of their robots.txt file to express it.</p>
<p>If you already know how to configure your robots.txt file, deploying content signals is as simple as adding the Content Signals Policy above and then defining your preferences via a content signal.</p>
<p>We want to make adopting content signals simple. Cloudflare customers have already turned on our managed robots.txt feature for over 3.8 million domains. By doing so, they have chosen to instruct companies that they do not want the content on those domains to be used for AI training. For these customers, we will update the robots.txt file that we already serve on their behalf to include the Content Signals Policy and the following signals:</p>
<pre><code data-highlighted="yes">Content-Signal: search=yes, ai-train=no</code></pre>
<p>We will not serve an “ai-input” signal for our managed robots.txt customers. We don’t know their preference with respect to that signal, and we don’t want to guess.</p>
<p>Starting today, we also will serve the commented, human-readable Content Signals Policy for any free customer zone that does not have an existing robots.txt file. In practice, that means a request to robots.txt on that domain would return the comments that define what content signals are. These comments are ignored by crawlers. Importantly, it will not include any Allow or Disallow directives, nor will not serve any actual content signals. The users are the ones to choose and express their actual preferences if and when they are ready to do so. Customers with an existing robots.txt file will see no change.</p>
<p>Zones on a free plan can turn off the Content Signals Policy in the Security Settings section of the Cloudflare dashboard, as well as via the Overview section.</p>
<figure><img alt="BLOG-2956 2" src="https://cf-assets.www.cloudflare.com/zkvhlag99gkb/69VPgMTwoI1KqUTP4cNqG5/9576a3ca6eeee93b58688aea7f7ff0ae/BLOG-2956_2.png"/><figcaption>BLOG-2956 2</figcaption></figure>
<p>To create your own content signals, just copy and paste the text that we help you generate at <a href="http://contentsignals.org"><u>ContentSignals.org</u></a> into your <code>robots.txt</code> file, or immediately deploy via the Deploy to Cloudflare button. You can alternatively turn on our <a href="https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/"><u>managed robots.txt feature</u></a> if you would like to express your preference to disallow training.</p>
<p>It’s important to remember that content signals express preferences; they are not technical countermeasures against scraping. Some companies might simply ignore them. If you are a website publisher seeking to control what others do with your content, we think it is best to combine your content signals with <a href="https://developers.cloudflare.com/waf/"><u>WAF</u></a> rules and <a href="https://www.cloudflare.com/application-services/products/bot-management/"><u>Bot Management</u></a>.</p>
<p>While these Cloudflare features aim to make it easier to use, we want to encourage adoption by anyone, anywhere. In order to promote this practice, we are releasing this policy under a <a href="https://creativecommons.org/publicdomain/zero/1.0/"><u>CC0 License</u></a>, which allows anyone to implement and use it freely.</p>
<p>Our customers are fully in the driver’s seat for what crawlers they want to allow and what they’d like to block. Some want to write for the superintelligence, others want more control: we think they should be the ones to decide.</p>
<p>Content signals allow anyone to express how they want their content to be used after it has been accessed. Enabling the ability to express preferences was overdue.</p>
<p>We know there’s more work to do. Signaling the rules of the road only works if others recognize those rules. That’s why we’ll continue to work in standards bodies to develop and standardize solutions that meet the needs of our customers and are accepted by the broader Internet community.</p>
<p>We hope you’ll join us in these efforts: the open web is worth fighting for.</p>
<p>Cloudflare's connectivity cloud protects <a href="https://www.cloudflare.com/network-services/">entire corporate networks</a>, helps customers build <a href="https://workers.cloudflare.com/">Internet-scale applications efficiently</a>, accelerates any <a href="https://www.cloudflare.com/performance/accelerate-internet-applications/">website or Internet application</a>, <a href="https://www.cloudflare.com/ddos/">wards off DDoS attacks</a>, keeps <a href="https://www.cloudflare.com/application-security/">hackers at bay</a>, and can help you on <a href="https://www.cloudflare.com/products/zero-trust/">your journey to Zero Trust</a>.</p>
<p>Visit <a href="https://one.one.one.one/">1.1.1.1</a> from any device to get started with our free app that makes your Internet faster and safer.</p>
<p>To learn more about our mission to help build a better Internet, <a href="https://www.cloudflare.com/learning/what-is-cloudflare/">start here</a>. If you're looking for a new career direction, check out <a href="http://www.cloudflare.com/careers">our open positions</a>.</p>
