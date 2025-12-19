---
author: bsky.social
cover_image: 'https://bsky.social/about/images/social-card-default-gradient.png'
date: '2025-12-18T04:14:19.948Z'
dateFolder: 2025/12/17
description: >-
  We're introducing Find Friends — a contact import feature that makes it easy
  to find people you know on Bluesky without compromising your privacy.
isBasedOn: 'https://bsky.social/about/blog/12-16-2025-find-friends'
link: 'https://bsky.social/about/blog/12-16-2025-find-friends'
slug: 2025-12-17-httpsbskysocialaboutblog12-16-2025-find-friends
tags:
  - social media
title: Find Your Friends on Bluesky
---
<div><div><p>Today, we're introducing Find Friends — a contact import feature that makes it easy to find people you know on Bluesky.</p>
<p>Social media started as a way to connect with people you actually know. Over time, that got lost in the noise of algorithms and engagement incentives. We're carrying those original values forward, but in a new way that protects your privacy and keeps you in control.</p>
<p>Contact import has always been the most effective way to find people you know on a social app, but it's also been poorly implemented or abused by platforms. Even with encryption, phone numbers have been leaked or brute-forced, sold to spammers, or used by platforms for <a href="https://www.eff.org/deeplinks/2018/09/you-gave-facebook-your-number-security-they-used-it-ads">dubious purposes</a>. We weren't willing to accept that risk, so we developed a fundamentally more secure approach that protects your data.</p>
<h2>How it works</h2>
<p>If you choose to use Find Friends, you'll verify your phone number and upload your contacts. When someone in your contact book goes through the same process and Bluesky finds a match, we'll let both of you know. This can happen immediately, or later via notification if the match happens down the road.</p>
<p>Find Friends will initially be limited to mobile app users in the following countries: Australia, Brazil, Canada, France, Germany, Italy, Japan, the Netherlands, South Korea, Spain, Sweden, the United Kingdom, and the United States.</p>
<img alt="Find Friends feature on Bluesky" src="https://bsky.social/about/images/blogposts/find-friends.png"/>
<h2>A note for early adopters</h2>
<p>Matches might take time to appear if you're one of the first to use this feature. As more people opt in, you'll start seeing more connections.</p>
<h2>Privacy-first by design</h2>
<p>Here's what makes our approach different:</p>
<ul>
<li>
<p><strong>It only works if both people participate.</strong> You'll only be matched with someone if you both have each other in your contacts and you've both opted into Find Friends. If you never use this feature, you'll never be findable through it. Your coworker can't use it to look you up unless you've uploaded their number from your contacts.</p>
</li>
<li>
<p><strong>You verify your number first.</strong> Before any matching happens, you prove that you own your phone number. This prevents bad actors from uploading random numbers to fish for information about who's on Bluesky.</p>
</li>
<li>
<p><strong>Your contact data is protected even if something goes wrong.</strong> We store phone numbers as hashed pairs — your number combined with each contact's number — which makes the data exponentially harder to reverse-engineer. That encryption is also tied to a hardware security key stored separately from our database.</p>
</li>
<li>
<p><strong>You can remove your data anytime.</strong> Changed your mind? You can delete your uploaded contacts and opt out entirely.</p>
</li>
</ul>
<h2>What about inviting friends who aren't on Bluesky yet?</h2>
<p>When you invite a friend through Find Friends:</p>
<ul>
<li>
<p><strong>That invite won't come from Bluesky.</strong> It comes directly from you when you choose to send it in a text message.</p>
</li>
<li>
<p><strong>What if you're already on Bluesky but got an invite anyway?</strong> That's because we don't store or track individual phone numbers, so we have no way to tell your friend you're already here. Think of it as a friend reaching out directly — they don't know you've already joined the party.</p>
</li>
<li>
<p><strong>There's no "opt out" for receiving invites</strong> because they're sent directly via text message outside the Bluesky app. These are personal text messages between friends, not automated messages from Bluesky, so we don't have a way to block them and we have no way to send follow up messages.</p>
</li>
</ul>
<p>We published a detailed technical breakdown of this system as an RFC before building it — you can read the full design <a href="https://docs.bsky.app/blog/contact-import-rfc">here</a>. We wanted to get it right, so we put it out for the security community to be able to verify our approach. For details about the data we collect and process, see the <a href="https://bsky.social/about/support/find-friends-privacy-policy">Privacy Policy</a> we created for this feature. Users who opt in to this feature agree to the terms of this policy.</p>
<p>Social media is better with friends. We hope this makes it easier to find yours on Bluesky.</p></div></div>
