---
author: maia arson crimew
cover_image: 'https://maia.crimew.gay/img/posts/kinemaster-drm/cover.jpg'
date: '2026-02-15T19:00:44.122Z'
dateFolder: 2026/02/15
description: How KineMaster stopped some modded clients from accessing their asset market
isBasedOn: 'https://maia.crimew.gay/posts/kinemaster-drm/'
link: 'https://maia.crimew.gay/posts/kinemaster-drm/'
slug: 2026-02-15-httpsmaiacrimewgaypostskinemaster-drm
tags:
  - tech
  - infosec
title: 'How To Add DRM To Your Backend (easy) [2026 WORKING]'
---
<figure><img alt="A glitchy edited KineMaster logo over top some of their source code and a word cloud of DRM-related terms" src="https://maia.crimew.gay/img/posts/kinemaster-drm/cover.jpg"/><figcaption>A glitchy edited KineMaster logo over top some of their source code and a word cloud of DRM-related terms</figcaption></figure>
<p> <strong>How KineMaster stopped some modded clients from accessing their asset market</strong> </p>
<p>Now replaced by CapCut for most, KineMaster used to be the kinda shitty video editing app of choice on mobile devices. And just like CapCut used to be, KineMaster was full of in-app purchases and put a watermark over your video unless you paid up. This, of course, means the app was (and probably still is) very popular to mod and crack. With KineMaster having some online features, such as an asset store, the company needed some way to detect those cracked clients.</p>
<p>One way to do this on Android is to use an <a href="https://en.wikipedia.org/wiki/Trusted_Computing#Remote_attestation">attestation</a> API like <a href="https://en.wikipedia.org/wiki/Play_Integrity_API">Play Integrity</a> (aka SafetyNet), preventing most mods entirely. Even some heavy obfuscation frameworks could work to stop many inexperienced crackers. But what would you do if you didn't wanna bother doing all that security bullshit?</p>
<h2>What Would KineMaster Do?</h2>
<p>A while ago now, I, uuh, <em>stumbled</em> upon much of source code for the KineMaster authentication and asset backends, plus some of their Git history. The source code is quite fragmented due to how I found it, but it still paints quite a good picture of how the asset store works.</p>
<p>Most of it really isn't all that interesting. It's a basic PHP backend doing about what you'd expect: authenticating users, allowing for the purchase and download of assets, managing subscriptions and collecting some analytics data. Since the asset store is used by multiple different KineMaster apps and not every user will be updated to the latest version, each client sends its version, name and some other information along with the authentication request.</p>
<p>One thing crackers definitely aren't known for is being humble, so it is no surprise that a lot of the KineMaster mods have the modders' name either in the app name or the version string. Most crackers seemingly also don't realize this information gets sent to the server, so no effort is made to prevent sending it. This makes it incredibly easy for KineMaster to detect modded versions trying to connect to the asset store.</p>
<pre><code>protected function vaildCheckToken($auth){
	$oauth = new Oauth($auth, $this-&gt;_request);
	if(!empty($tokenInfo = $oauth-&gt;getAccessToken())){
		if ($tokenInfo["expire"] &lt; time()){
			new CustomView(TOKEN_EXPIRE);
		}else if (
			($tokenInfo["app_version"] == "4.11.13.14060.DF") || 
			($tokenInfo["app_version"] == "4.0.0.9176.FREE") || 
			($tokenInfo["app_version"] == "Mod V5") ||
			($tokenInfo["app_version"] == "Modded By Agoez Clemod") ||
			($tokenInfo["app_version"] == "4.0.0.9176.FREE") &amp;&amp; ($tokenInfo["app_name"] == "com.nextreaming.nexeditorui.KineMasterApplication") ||
			($tokenInfo["app_version"] == "4.12.1.14940.GP.FONT") &amp;&amp; ($tokenInfo["app_name"] == "com.nextreaming.nexeditorui.KineMasterApplication") ||
			($tokenInfo["app_version"] == "4.12.3.15162.GP") &amp;&amp; ($tokenInfo["app_name"] == "com.nextreaming.nexeditorui.KineMasterApplication") ||
			($tokenInfo["app_version"] == "4.12.3.15162.GP") &amp;&amp; ($tokenInfo["app_name"] == "巧影") ||
			($tokenInfo["app_version"] == "4.12.1.14940.GP") &amp;&amp; ($tokenInfo["app_name"] == "com.nextreaming.nexeditorui.KineMasterApplication") ||
			($tokenInfo["app_version"] == "4.12.1.14940.GP") &amp;&amp; ($tokenInfo["app_name"] == "巧影") ||
			($tokenInfo["app_version"] == "4.11.15.14242.GP") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster Pro Mod [AmanZz]") ||
			($tokenInfo["app_version"] == "4.11.15.14242.GP") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster Indonesia") ||
			($tokenInfo["app_version"] == "4.11.15.14242.GP") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster Geeky Boy") ||
			($tokenInfo["app_version"] == "4.11.15.14242.GP") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster Font Mod") ||
			($tokenInfo["app_version"] == "4.11.15.14242.GP") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster Mathavan pro") ||
			($tokenInfo["app_version"] == "4.11.16.14368.GP") &amp;&amp; ($tokenInfo["app_name"] == "KM Premiere Pro CS6") ||
			($tokenInfo["app_version"] == "4.11.16.14368.GP") &amp;&amp; ($tokenInfo["app_name"] == "KM Master Diamond") ||
			($tokenInfo["app_version"] == "4.11.16.14370.XP") &amp;&amp; ($tokenInfo["app_name"] == "KM X-Pro") ||
			($tokenInfo["app_version"] == "4.11.16.14370.XP") &amp;&amp; ($tokenInfo["app_name"] == "TAMIL SARAN BGM") ||
			($tokenInfo["app_version"] == "4.11.15.14242.CZ") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster Pro") ||
			($tokenInfo["app_version"] == "4.11.15.14242.CZ") &amp;&amp; ($tokenInfo["app_name"] == "KineMaster LOGO")
		){
			new CustomView(FORBIDDEN);
		}else{
				$this-&gt;application_id = $tokenInfo["application"];
				$this-&gt;edition_id = $tokenInfo["edition"];
				$this-&gt;access_token = $this-&gt;_request-&gt;parameters["access_token"];
				$this-&gt;client_idx = $tokenInfo["client_idx"];
				$this-&gt;scope = $tokenInfo["scope"];
				$this-&gt;env = $this-&gt;_request-&gt;parameters["env"];
		}
	}else{
		new CustomView(INVALID_LICENSE);
	}
}</code></pre>
<p>The API function in the code above doesn't return any specific error message to modded clients, just returning a <code>403 Forbidden</code> status code instead, which might make it a bit less obvious to clients that they've been detected.</p>
<p>There's definitely more elegant ways to go about implementing a check like this than a list of 20 hardcoded mods. A more ideal implementation of this logic would probably check against a list of apps maintained in a database or another easily updated location. Why both version and name has to match for the clearly modded app names is also a mystery to me, but hey, if it works, it works.</p>
<p>The source code dump I have doesn't provide full context for the rest of the market authentication logic, but it seems fairly trivial to reverse engineer, with a lot of the authentication logic being based on known values, so I'm not surprised some mods seemingly found a way to fake a license to attempt to authenticate to the market.</p>
<p><a href="https://ko-fi.com/nyancrimew">  if you enjoyed this or any of my other work feel free to support me on my ko-fi. this is my main source of income so anything goes a long way, and monthly contributions help tremendously with budgeting. &lt;3  </a> </p>
