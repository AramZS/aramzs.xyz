---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Arnpkyqnmsw4ipey6eotbdnnf/3lxn3sgnjpc2a/3mbskx3u7rs2u/opengraph-image?f3a3a13b3930d7d9
date: '2026-01-07T07:42:33.491Z'
dateFolder: 2026/01/07
description: >-
  A checklist of things to check when you move to a new PDS and new posts don't
  show or your account doesn't load on Bluesky
isBasedOn: 'https://marvins-guide.leaflet.pub/3mbskx3u7rs2u'
link: 'https://marvins-guide.leaflet.pub/3mbskx3u7rs2u'
slug: 2026-01-07-httpsmarvins-guideleafletpub3mbskx3u7rs2u
tags:
  - code
  - social media
  - decentralization
title: 'Help! I''ve migrated to a new PDS, and my Bluesky doesn''t work'
---
<p>This is a checklist to hopefully help you find out what the issue is if you cannot use Bluesky after an account migration. This list is meant to be read from top to bottom. If the header with a number does not pertain to you, you can go to the next numbered header and continue through the checklist.</p>
<p>If you have questions, you can join the <a href="https://discord.gg/pCM2awtCkx">ATProto Touchers Discord</a> and go to the #pds-operators channel and ask us there. Or just @ me on an alt.</p>
<h2 data-index="3">1. My profile says, "Invalid handle"</h2>
<p>This happens sometimes after a migration if you have a new handle that has the PDS domain in it like bailey.selfhosted.social. Bluesky has a tool to check if your handle can resolve at <a href="https://bsky-debug.app/handle">bsky-debug.app/handle</a></p>
<h3 data-index="6">I just moved to the PDS, I'm not an admin</h3>
<p>If you just migrated to a PDS and are not the admin, it usually takes 10-20mins before your new handle kicks in. You can usually make a post or like something, then mention your handle with the @, it will not autocomplete but is important to do <code>@yourhandle.com</code>, and that will usually fix it after mentioning.</p>
<h4 data-index="8">I have a custom handle</h4>
<p>If you have a custom handle like <a href="https://baileytownsend.dev">baileytownsend.dev</a> you need to check your DNS record or the file on the server serving your domain. That can be verified with <a href="https://bsky-debug.app/handle">https://bsky-debug.app/handle</a>. If neither returns that they passed verification you can see how to set that up inside of <a href="https://bsky.app">bsky.app</a> via settings -&gt; account -&gt; Handle-&gt; I have my own domain.</p>
<h3 data-index="10">I am a PDS admin, I just setup a new PDS</h3>
<p>If your new PDS is failing the debug check here's a few things to check</p>
<ul><li><p data-index="12.3">That your caddy file has the wildcard route like *.pdsurl.com. If you followed the official install script this probably isn't it and is more than likely the wild card DNS record </p> </li></ul>
<h2 data-index="15">2. Says my account is deactivated?</h2>
<figure><img src="https://marvins-guide.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreie2qosjq7k4ou4qslslo5jaf7ct3rqc5u5pj5pstltpb6tgvfapiu"/></figure>
<p>You may have tried to log in to your previous account. When you migrate, it actually creates a new account on the new PDS with all of your data from the previous one. The old one is deactivated and the new one is activated and what you'll use from now on.</p>
<p>1. Select "sign in or create an account" or "cancel" and go to the sign in screen</p>
<p>2. Click "Hosting Provider" above the account entry.</p>
<p>3. Click "Custom"</p>
<p>4. Enter your full PDS url with https into it. Like <a href="https://selfhosted.social">https://selfhosted.social</a> and click "Done"</p>
<p>5. Fill in your handle you chose when migrating (can also use your email) and your password.</p>
<p>6. You should now be signed in on your new PDS.</p>
<h2 data-index="27">3. New posts do not load/My account does not load</h2>
<p>Try loading your profile using <a href="https://reddwarf.app">https://reddwarf.app</a> the profile url will look like <code>https://reddwarf.app/profile/yourhandle.com</code> or <code>https://reddwarf.app/profile/did:your:did</code>. reddwarf loads your profile and posts directly from your PDS. So, your PDS appears to be saving and creating the records as you would expect.</p>
<p>If you try to load your profile on Bluesky, and it looks like bellow saying it cannot be found even if you just logged in and clicked on your profile icon. But it loads in reddwarf you may have a label on your account from Bluesky that is blocking your access to the application(Bluesky's AppView)</p>
<figure><img src="https://marvins-guide.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreifapdtsq22tfug2oxafqew44ivjrtv4wqxverpmc4onzfm74btkx4"/></figure>
<p>You can test this with <a href="https://debug.hose.cam/">debug.hose.cam</a>, enter your handle in the search bar and scroll to the section "Labels" that is under the card that starts with "DID". If you see any labels, you will need to contact Bluesky support</p>
<figure><img src="https://marvins-guide.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreihcgcelu6qkv2sfchu6kho4rurb6wtbpteujrn3e5drxujunntemm"/><figcaption>If it says "no labels applied by mod.bsky.app" onto the next section.</figcaption></figure>
<p>Like I said, if you have a moderation label, then it's up to Bluesky to decide if they want to remove that label and regain access to Bluesky. You can make a request to their support via email. To make it easy to contact here is a template you can use if you found you have a label on your account like <code>!takedown</code> or <code>needs-review</code>, just fill in the {placeholders} and email <code>support@bsky.app</code></p>
<pre><code>Hello,
This is {yourhandle.com}({your did if you know it}).
I have just migrated from {bluesky or other PDS} to
{the new pds}. The migration was successful, but when I
try to load my profile after login it says "Not Found".
I also cannot make new posts. When I post the record shows
in my PDS, but not on Bluesky. I have checked and found that
mod.bsky.app has given me the following labels: {the labels}.
Can you please help me resolve removing these labels?</code></pre>
<p>If your label is <code>needs-review</code> most likely they just need to review it and removal if it's a false positive. If it's <code>!takedown</code> then it was a manual or automated moderation action, and they can give you more details on that. Reminder, this is up to Bluesky to remove this label since they control their own application (Bluesky) on the atmosphere, and they are using this to bar your access to their AppView. You can actually still use your atproto application elsewhere and have limited Bluesky features via <a href="https://blacksky.community/">blacksky.community</a> or <a href="https://reddwarf.app">reddwarf.app</a></p>
<blockquote data-index="41">Anything beyond this point is more so for PDS admins and a bit more technical. If you did not set up or manage your PDS direct your PDS admin to this document and let them know what issues you are having or reach out to us on the Discord mentioned at the top. Someone can go through the steps with you. </blockquote>
<h2 data-index="43">4. Gather some debug info</h2>
<p>Before we go to the next section, we need to gather 3 pieces of info to help debug. Your handle, did, and PDS. This is also partly a rubber ducky step to make sure everything is as you expect.</p>
<p>You can find all 3 via <a href="https://pdsls.dev">https://pdsls.dev</a> if you search by your handle, click on the identity tab</p>
<p>If you're having issues with your handle and the above did not help, can search for your PDS by entering the full url like <a href="https://selfhosted.social">https://selfhosted.social</a> and go through the repos till you find yours. Which, if it's a PDS you just created, should only be one or a few repos.</p>
<p>A quick checklist if any of that info doesn't match what you expect</p>
<h4 data-index="49">That's not my handle</h4>
<p>If you're not seeing the handle you expect, you can change it a couple of ways</p>
<p>You can also search by did on <a href="https://pdsls.dev">https://pdsls.dev</a> to get a better idea what's going on. If it's a did:web, I wish you god speed and probably should ask us on the discord at the top or just go on to section 5.</p>
<h4 data-index="54">That's not my new PDS, It's my old one</h4>
<p>Migration most likely did not complete? Did you get a PLC token and enter it in the tool? If not, then you will need to retry your migration. Don't worry; it won't hurt anything to rerun it.</p>
<h4 data-index="56">Does the did, handle, and PDS all look as you would expect?</h4>
<p>Onward to the next one! We'll get it figured out.</p>
<h2 data-index="61">5. What you're still here???</h2>
<p>You are probably seeing.</p>
<p>1. Can login to the correct PDS</p>
<p>2. It shows all your old Posts and profile</p>
<p>3. New likes posts, etc are sent and created and can be viewed via reddwarf or <a href="https://pdsls.dev">https://pdsls.dev</a>. But do not show on anything branded Bluesky.</p>
<p>If that's the case, your PDS/Repo is probably not being picked up by the Relay, the part that takes records from your PDS and sends it over the firehose that Bluesky listens to and adds to its AppView.</p>
<p>You can make a request to Bluesky's relay to check your PDS and add it to the list to pick up on requests. Here's a simple curl for it. Make sure to replace the placeholder with your ads host name in the body.</p>
<pre><code>curl https://bsky.network/xrpc/com.atproto.sync.requestCrawl -X POST -H "Content-Type: application/json" -d '{ "hostname": "yourpds.com"}'</code></pre>
<p>Should see a success response. If so, wait about 30 minutes, try making a post again and see if that works.</p>
<h3 data-index="74">Yeah, still doesn't work</h3>
<p>Back to <a href="https://debug.hose.cam/">debug.hose.cam</a> search via your handle or did and scroll down to the section with "Relay repo status"</p>
<figure><img src="https://marvins-guide.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreidv2uyqnlcms3v3u33773tzixlda4rtonjw3twp57pp7pzyeyqy7m"/></figure>
<h4 data-index="77">None of the relays say active</h4>
<p>There's a chance something is blocking your WebSocket from being accessible to the Relay or the request crawl is not working. You can check the WebSocket by using <a href="https://github.com/bluesky-social/goat">goat</a>. Run <code>goat firehose --relay-host wss://yourpds.com</code> and try to create a new record via a Bluesky post or liking a post. You should see some JSON go by and some JSON on connect that says "starting firehose consumer". If it cannot connect there's an issue with connecting to the <code>/xrpc/com.atproto.sync.subscribeRepos</code> endpoint on your PDS. If it shows JSON go by after creating a new record onward to the next section.</p>
<h4 data-index="80">It may be a bug on the relay</h4>
<p>At this point, it's very tricky to troubleshoot without a member of the Bluesky team to check their relays. But there is a known bug on Bluesky's old/current relay (listed as current' and can't check on <a href="https://debug.hose.cam">debug.hose.cam</a>). This is the current (1/7/2026) production version of the Relay that Bluesky uses for their AppView. There's actually is not an API endpoint to query to check the state of your repo. So we're kind of guessing at this point. The Bluesky East and West are the new ones that will hopefully resolve this bug when moved to production. If those are showing active, and still seeing these issues, there's a very good chance <a href="https://github.com/bluesky-social/atproto/discussions/4258">its this bug</a> or similar. You're down to two choices now.</p>
<p>Migrate back to your previous PDS. You can now migrate back to <a href="https://bsky.social">bsky.social</a> using that as the target url in migration tools if you came from there. And wait until the new relays are put into production and try again later. Also welcome to migrate to <a href="https://pdsmoover.com/moover/selfhosted.social">selfhosted.social</a></p>
<p>OR create a new PDS with a new domain/sub domain and migrate to it and it should resolve the issuse. Very extreme, but it does work in every instance I've seen.</p>
<h2 data-index="86">Nothing is working</h2>
<p>More than welcome to join us in the <a href="https://discord.gg/pCM2awtCkx">ATProto Touchers Discord</a> and go to the #pds-operators channel. Usually there is someone on to help you debug your issue, and hopefully we can get it figured out for you!</p>
