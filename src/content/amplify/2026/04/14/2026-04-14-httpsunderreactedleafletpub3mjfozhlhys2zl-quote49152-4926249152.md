---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Afpruhuo22xkm5o7ttr2ktxdo/3m23dstduds2v/3mjfozhlhys2z/l-quote/49_152-49_262/opengraph-image?cab68ddd44ef428a
date: '2026-04-14T11:53:50.316Z'
dateFolder: 2026/04/14
description: >-
  you've tried reading the official Permission Sets documentation and felt that
  this is too difficult. i know -- i couldn't understand them either.
isBasedOn: 'https://underreacted.leaflet.pub/3mjfozhlhys2z/l-quote/49_152-49_262#49_152'
link: 'https://underreacted.leaflet.pub/3mjfozhlhys2z/l-quote/49_152-49_262#49_152'
slug: 2026-04-14-httpsunderreactedleafletpub3mjfozhlhys2zl-quote49152-4926249152
tags:
  - code
  - decentralization
title: 'atproto made simple: granular permissions'
---
<p>you're working on an atproto app that needs to write some records to your own collection like <code>app.example.post</code> or <code>app.example.like</code>.</p>
<p>you're already using OAuth instead of app passwords. however you're still requesting <code>transition:generic</code> scope, which means your app is asking for way too much power. that's not good!</p>
<p>you've tried reading the official <a href="https://atproto.com/guides/permission-sets">Permission Sets</a> documentation and felt that this is too difficult. i know -- i couldn't understand them either. turns out, actually using permission sets is easy. it's only reading the documentation that's difficult. so let's skip that part.</p>
<p>here's how you can fix your permissions to be granular and good.</p>
<p>currently you have something like this in your codebase:</p>
<p>maybe in several places. replace <code>transition:generic</code> with the specific things you need. to write to some collections, add <code>repo:&lt;collection name&gt;</code> permissions per collection -- for example:</p>
<pre><code>scope: "atproto repo:app.example.post repo:app.example.like",</code></pre>
<p>one <code>repo</code> for each collection you want to be writing to. yes, you do have to list each of the collections separately unless you want a scary global "write anything" permission (i assume you don't).</p>
<p>i repeat: there is no <code>app.example.*</code> wildcard. it's either <code>repo:*</code> ("i want to write any app's records") or granular <code>repo:foo repo:bla</code>.</p>
<p>you can make actions granular per collection. maybe you only want to ask to "create" and "update" but not delete -- this would work:</p>
<pre><code>scope: "atproto repo:app.example.post?action=create&amp;action=update repo:app.example.like",</code></pre>
<p>omitting <code>?action</code> asks for full permissions (create, update, delete), i.e. the same as <code>?action=create&amp;action=update&amp;action=delete</code>.</p>
<p>for your own app's collections, full permissions usually make sense.</p>
<p>if you need to upload images/video, also throw in <code>blob:*/*</code> in there:</p>
<pre><code>scope: "atproto blob:*/* repo:app.example.post repo:app.example.like",</code></pre>
<p>this will work but the popup the user will see will still be unpleasant and confusing because there's no human-readable description. it will just say "Repository" and pressing "?" will show something like this:</p>
<figure><img src="https://underreacted.leaflet.pub/api/atproto_images?did=did:plc:fpruhuo22xkm5o7ttr2ktxdo&amp;cid=bafkreicehi7r5bpxngq2zzmdjw73lsjkidnmcnhwtwujzzfqx7i4q537pe"/><figcaption>if you want a nicer popup, you need to publish a "permission set".</figcaption></figure>
<p>let's do that now!</p>
<p>this is what you had before:</p>
<pre><code>scope: "atproto repo:app.example.post repo:app.example.like",</code></pre>
<p>for a nicer permission dialog, we need to extract those <code>repo:</code> permissions into a "permission set". replace them with <code>include:</code></p>
<p>that's a "permission set" which lets you take the permissions above and give them a human-readable description.</p>
<pre><code>// at://did/com.atproto.lexicon.schema/app.example.fullPermissions
{           
  "lexicon": 1,
  "id": "app.example.fullPermissions",
  "defs": {
    "main": {
      "type": "permission-set",
      "title": "Example App Permissions",
      "detail": "Manage Example App posts and likes.",
      "permissions": [
        {
          "type": "permission",
          "resource": "repo",
          "collection": [
            // Collections you want to write to
            "app.example.post",
            "app.example.like"
          ]
        }                                                                  
      ]
    }
  }
}</code></pre>
<p>as you can see, this is sort of an expanded form of the inline string you had to write earlier. this <a href="https://atproto.com/specs/permission">doc page</a> shows short vs long forms. you'll also find the JSON granular actions syntax and blobs there. again, you have to enumerate all collections you want to write to.</p>
<p>this JSON looks like a lexicon, right? yes! permission sets are just lexicons. <a href="https://underreacted.leaflet.pub/3mjfjsk24qk2i#publishing-a-lexicon">you'd publish it the same way you'd publish any lexicon.</a></p>
<p>after you publish it as a lexicon (create record + update DNS), the <code>include:app.example.fullPermissions</code> syntax in scope will work.</p>
<p>then instead of "Repository" it will say what you wrote, for example something like this. (note clicking "?" would still bring up a table.)</p>
<p>there's nothing special about permission set name. you could've called it <code>app.example.postingAndLikingPermissions</code>. the important bit is that the reverse namespace of your set (here, <code>app.example.</code>) must be "above" the collections that you want that set to write to.</p>
<p>effectively this means that your app's permission sets can only ask for permissions to write to your app's (<code>app.example.*</code>) collections.</p>
<p>if you want to request writing to another app's collections, you'll have to <code>include:</code> that app's permission sets (to display them nicely) or, if the app hasn't published any, you'd have to manually ask for <code>repo:&lt;collection name&gt;</code> permissions for each collection.</p>
<p>if you add new collections to your app, you probably will want to broaden permissions of your permission set -- since your currently logged in users won't be able to write to those collections yet.</p>
<p>usually you'd add new collections to your existing set. then you can add some application logic so that your app can handle "doesn't have permissions to write this" gracefully and requests re-authentication.</p>
<p>however, there's also an easier way -- if you add more collections to a permission set <a href="https://bsky.app/profile/iame.li/post/3mjfv3fvdrc2k">and wait 30 minutes</a> after updating it, the new permissions will work for users who have approved that set before. then you can deploy the code that needs to write those collections.</p>
<p>that said, gracefully asking for more permissions as needed is a useful pattern in general. my rule of thumb is to request permissions upfront for writing my own app's records (by bundling them into my set) but to request permissions as needed for other apps' records.</p>
<p>if you're seeing an ugly <code>.json</code> url in the permission request dialog message header, it's because your OAuth client metadata file is in the wrong place. make sure your <code>client_id</code> is set to something like <code>${PUBLIC_URL}/</code><code>oauth-client-metadata.json</code> -- that exact name.</p>
<p>then it'll just show just your app's domain instead of that json path.</p>
<p>of course, for that to work, you'll need to actually serve that file.</p>
