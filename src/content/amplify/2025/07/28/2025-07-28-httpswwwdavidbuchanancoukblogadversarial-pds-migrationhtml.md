---
author: David Buchanan
cover_image: ''
date: '2025-07-28T19:20:44.681Z'
dateFolder: 2025/07/28
description: >-
  An ATProto account lives on a Personal Data Server (PDS), and that service
  needs to be hosted somewhere by someone.
isBasedOn: 'https://www.da.vidbuchanan.co.uk/blog/adversarial-pds-migration.html'
link: 'https://www.da.vidbuchanan.co.uk/blog/adversarial-pds-migration.html'
slug: 2025-07-28-httpswwwdavidbuchanancoukblogadversarial-pds-migrationhtml
tags:
  - tech
  - social media
  - decentralization
title: Adversarial ATProto PDS Migration
---
<p>An ATProto account lives on a Personal Data Server (PDS), and that service needs to be hosted <em>somewhere</em> by <em>someone</em>. There are a lot of options here, like a Raspberry Pi in your closet, a rented VPS in a datacentre, or a batteries-included service like <a href="https://bsky.social/">bsky.social</a>.</p>
<p>Each option has its pros and cons, but whichever you choose, you should be able to change your mind at any time, <em>even if</em> your current PDS hosting provider doesn’t want that to happen. Maybe your provider decided to jack up their prices. Maybe your Pi was carried off by a seagull. Whatever happens, there should be a path to recover your ATProto account and migrate to a new PDS, with minimal disruption.</p>
<p>This is an example of "credible exit", one of the ideas behind the <a href="https://atproto.com/articles/atproto-ethos">design of atproto</a>.</p>
<p>PDS migration in general is documented in the <a href="https://atproto.com/guides/account-migration">atproto spec</a>. A more practical <a href="https://whtwnd.com/bnewbold.net/3l5ii332pf32u">guide by bnewbold</a> describes concretely how to perform a migration from one PDS to another, using the <code>goat</code> CLI tool.</p>
<p>Bryan's guide however only covers a "non adversarial" migration scenario, in which the <em>old</em> PDS still exists and is cooperating with the migration process.</p>
<p>The "credible exit" story would not be complete without having tools for the adversarial situations too - That's what this article is about. We will also be using <code>goat</code>, with some newly-added features to support this scenario.</p>
<p>I hope one day this process can be made more accessible to regular users, but for now this is an advanced developer-oriented process with lots of manual steps. Proceed at your own risk!</p>
<p>During an adversarial migration, we can't rely on the "origin" PDS to retain any data, or to do anything at all. So we need to sort a few things out in advance (i.e. before the migration becomes necessary).</p>
<p>Things to do in advance:</p>
<ul> <li><p>Create a backup PLC rotation key (very important!)</p> </li> <li><p>Fetch recent backup of your repo CAR file, blobs, and private data.</p> </li> </ul>
<p>ATProto identity is rooted in <a href="https://atproto.com/specs/did">DID identifiers</a>, and your DID document points to your active PDS. So, PDS migration involves updating your DID document.</p>
<p>If you're using a <code>did:web</code>, no special preparations are required - control of the DNS name is all that's required to make updates.</p>
<p>Updates to <a href="https://github.com/did-method-plc/did-method-plc"><code>did:plc</code></a> identities on the other hand require a Rotation Key to authenticate updates. (If you're wondering whether you're using <code>did:web</code> or <code>did:plc</code>, you're using <code>did:plc</code>). Normally a PDS holds a rotation key so that it can make identity updates on your behalf (for example, when you change your atproto @handle).</p>
<p>You can have multiple rotation keys, and they have a priority order. To defend against a PDS that might "turn evil" in the future, <strong>you need to enrol a backup rotation key</strong> with higher priority than any rotation keys held by the PDS. For more details on this process, see <a href="https://whtwnd.com/bnewbold.net/3lj7jmt2ct72r">"Registering Identity Recovery Keys via PDS, using goat"</a></p>
<p>If you're only worried about the possibility of your PDS going <em>offline</em> (which, on balance, is more likely than it becoming actively adversarial), then the priority order of your rotation keys is less important.</p>
<p>A repo backup is <em>technically</em> optional, but you'll have a very bad time without one.</p>
<p>Without, your identity will still be preserved (for example, all the people who "follow" you on Bluesky will continue to follow you), but all your previous posts and media would be gone.</p>
<p>I go into more detail on backup tools towards the end of this article, but for the purposes of this guide I'll assume you've used the <code>goat</code> CLI to create a full backup like so:</p>
<pre>mkdir my_backup
cd my_backup
goat repo export $ACCOUNT_DID        # export your public data (bluesky posts, etc.)
goat blob export $ACCOUNT_DID        # export blobs (e.g. images, videos)
goat bsky prefs export &gt; prefs.json  # export your private bluesky preferences
</pre>
<p>For more details about these commands, refer to <a href="https://whtwnd.com/bnewbold.net/3l5ii332pf32u">Bryan's migration guide</a>. The only difference is that here we're creating a copy of our data in advance, rather than in the middle of the migration process.</p>
<p>Let's consider a hypothetical scenario:</p>
<p>Your PDS is hosted by <code>cheap-servers-r-us.example.com</code></p>
<p>You don’t trust Cheap-Servers-R-Us a whole lot, so you’ve set up a backup rotation key and take regular backups of your atproto data (as outlined above).</p>
<p>One day your PDS goes down, and Cheap-Servers-R-Us isn’t responding to your customer support tickets. Oh no!</p>
<p>You decide you want to migrate to <code>better-servers.example.org</code>, and the PDS admin has given you an <a href="https://atproto.com/guides/self-hosting#creating-an-account-using-an-invite-code">invite code</a>.</p>
<p>Install a recent version of <a href="https://github.com/bluesky-social/indigo/tree/main/cmd/goat#install">goat</a>, and make sure you have all the required information on-hand:</p>
<ul> <li>Your PLC identity credentials (<code>$ACCOUNT_DID</code>, <code>$PLC_SIGNING_KEY</code>) (where the latter is in "multibase" format and may also be referred to as a "rotation key")</li> <li>The host name of the new PDS (<code>$NEW_PDS_HOST</code>, e.g. <code>better-servers.example.org</code>)</li> </ul>
<p>This guide will reference the above parameters as shell environment variables, it's up to you whether you actually assign variables or just substitute the strings manually.</p>
<p>To authenticate with the <em>new</em> PDS, we'll need to demonstrate possession of the identity's atproto signing key, declared as a <code>verificationMethod</code> in the DID document.</p>
<p>But right now we <em>don't</em> have the atproto signing key - the old PDS does! So, we need to create a new one and add it to the DID document. Note that this keypair will be ephemeral - towards the end of the migration process, the new PDS will generate its own keypair, and the DID document will be updated correspondingly.</p>
<p>You can create a new keypair using <code>goat key generate</code>, which will print the secret and public keys to stdout in the required formats. You can manage this keypair however you like, but from this point forward I will assume that the shell environment variables <code>$ATPROTO_SIGNING_KEY</code> and <code>$ATPROTO_PUBLIC_KEY</code> are populated accordingly (where the former is in multibase string format, and the latter is in did:key format).</p>
<p>We actually need to make 3 different changes to the DID document (which we will do all in one go):</p>
<ul> <li>Enrol the temporary atproto signing key (which will overwrite the one previously held by the old PDS)</li> <li>Update the PDS URL to point to the new PDS</li> <li>Remove the old PDS's rotation key(s)</li> </ul>
<p>This can be done like so:</p>
<table><tbody><tr><td><pre>1
2
3
4
5</pre></td><td><pre>goat plc update \
    --pds "https://$NEW_PDS_HOST" \
    --remove-rotation-key "$OLD_ROTATION_KEY" \
    --atproto-key "$ATPROTO_PUBLIC_KEY" \
    "$ACCOUNT_DID" &gt; plc_operation.json
</pre></td></tr></tbody></table>
<p>You can find the value of <code>$OLD_ROTATION_KEY</code> by looking at the output of <code>goat plc history</code>. If there are more than one, the <code>--remove-rotation-key</code> argument can be specified multiple times.</p>
<p>If the old PDS made an unwanted PLC update that you need to revert, you can specify the <code>--prev</code> parameter, setting it to the CID of the last-good PLC operation - this CID can be found by inspecting <code>goat plc history</code> output. Note that this can only be done for up to 72h after the unwanted operation was made - see the "nullification" section at the end of this article for more.</p>
<p>The <code>goat plc update</code> command doesn’t actually finalize the update, it just prepares the operation JSON ready to be signed and submitted later. At this point you may want to manually inspect the contents of <code>plc_operation.json</code> to check that everything is correct. The really important thing to check is that the public key for your backup rotation key(s) are still declared in the <code>rotationKeys</code> array, and that any other keys are ones you recognize. Most other mistakes are recoverable, but <strong>accidentally removing your own rotation keys could permanently lock you out of your account.</strong></p>
<p>After that check, the operation can be signed and submitted to the PLC directory:</p>
<table><tbody><tr><td><pre>1
2
3</pre></td><td><pre>goat plc sign plc_operation.json \
    --plc-signing-key "$PLC_SIGNING_KEY" \
    | goat plc submit --did "$ACCOUNT_DID" -
</pre></td></tr></tbody></table>
<p>Note: You can also specify the signing key for <code>goat plc sign</code> via the <code>PLC_SIGNING_KEY</code> environment variable, if you don't want to pollute your shell history with key material. The <code>--plc-signing-key</code> argument is redundant in this example and only used to make things more explicit.</p>
<p>Generate a service auth token, using the temporary atproto signing key enrolled earlier</p>
<table><tbody><tr><td><pre>1
2
3
4
5
6</pre></td><td><pre>goat account service-auth-offline \
    --atproto-signing-key "$ATPROTO_SIGNING_KEY" \
    --lxm com.atproto.server.createAccount \
    --iss "$ACCOUNT_DID" \
    --aud "did:web:$NEW_PDS_HOST" \
    --duration-sec 3600 &gt; /tmp/service_auth_token
</pre></td></tr></tbody></table>
<p>Note: Similarly to <code>PLC_SIGNING_KEY</code> previously, you can alternatively specify the atproto signing key to use via the <code>ATPROTO_SIGNING_KEY</code> environment variable.</p>
<p>Create a login account on the new PDS, and log in to it</p>
<table><tbody><tr><td><pre> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13</pre></td><td><pre>goat account create \
    --pds-host "$NEW_PDS_HOST" \
    --existing-did "$ACCOUNT_DID" \
    --handle "$HANDLE" \
    --password "$NEW_PASSWORD" \
    --email "$NEW_EMAIL" \
    --invite-code "$INVITE_CODE" \
    --service-auth $(cat /tmp/service_auth_token)

goat account login \
    --pds-host "$NEW_PDS_HOST" \
    -u "$ACCOUNT_DID" \
    -p "$NEW_PASSWORD"
</pre></td></tr></tbody></table>
<p>(<code>goat</code> will persist the login session between invocations)</p>
<p>Note that <code>$NEW_EMAIL</code> and <code>$NEW_PASSWORD</code> can be arbitrary, they can be different to whatever you used on the old PDS (especially the password!)</p>
<p>An issue you may run into here is that <code>$HANDLE</code> still needs to be a <a href="https://atproto.com/specs/handle#handle-resolution">resolvable handle</a>. If your old PDS was in charge of that (e.g. if your handle was a subdomain), and your old PDS is down, you will need to set up a new handle on another domain first. The easiest way to do this is to ask the new PDS to set up a handle for you, e.g. by specifying <code>--handle</code> as <code>"myhandle.$NEW_PDS_HOST"</code></p>
<p>Note that changing your handle on atproto is a relatively seamless process - all in-protocol account references are made via DIDs rather than handles (including @ mentions in Bluesky posts, for example).</p>
<table><tbody><tr><td><pre>1
2
3</pre></td><td><pre>goat repo import ./repo_backup.car
fd . ./account_blobs/ | parallel -j1 goat blob upload {}
goat bsky prefs import ./prefs.json
</pre></td></tr></tbody></table>
<p>The above is just a summary, see again <a href="https://whtwnd.com/bnewbold.net/3l5ii332pf32u">Bryan's guide</a> for a more detailed explanation of these commands.</p>
<p>The PDS has a set of "recommended" credentials it wants you to install into your DID document. It needs to hold an atproto signing key to sign updates of your repo (among other things), and it needs to hold a PLC rotation key so that it can update your handle if so requested.</p>
<table><tbody><tr><td><pre>1</pre></td><td><pre>goat account plc recommended
</pre></td></tr></tbody></table>
<p>The above command will tell you what these recommended credentials are. Based on what it tells you, you can update your DID document like so:</p>
<table><tbody><tr><td><pre>1
2
3
4</pre></td><td><pre>goat plc update \
    --add-rotation-key "$RECOMMENDED_ROTATION_KEY" \
    --atproto-key "$RECOMMENDED_ATPROTO_KEY" \
    "$ACCOUNT_DID" &gt; plc_operation.json
</pre></td></tr></tbody></table>
<p>Note that <code>--add-rotation-key</code> will add the new key to the <em>front</em> of the rotation key list. You probably want your backup rotation key to stay at the front (having a higher priority), and if so you will need to manually edit <code>plc_operation.json</code> to correct this, prior to submission.</p>
<p>You can sign and submit this operation like before:</p>
<table><tbody><tr><td><pre>1
2
3</pre></td><td><pre>goat plc sign plc_operation.json \
    --plc-signing-key "$PLC_SIGNING_KEY" \
    | goat plc submit --did "$ACCOUNT_DID" -
</pre></td></tr></tbody></table>
<table><tbody><tr><td><pre>1</pre></td><td><pre>goat account activate
</pre></td></tr></tbody></table>
<p>At this point, you should be able to log into any atproto app (like <a href="https://bsky.app">bsky.app</a>), via the new PDS. Success!</p>
<p>As I said earlier, this process is not very accessible to regular users. There are lots of ways this can be improved, on several fronts:</p>
<ul> <li>User-friendly backup PLC rotation key setup</li> <li>User-friendly automated recurring repo backups</li> <li>User-friendly tooling for actually completing a migration</li> <li>Tools for monitoring for unexpected did:plc updates, and notifying the user</li> </ul>
<p>Aside from just "making it easy", it also needs to be secure. The PLC rotation key mechanism is robust against <em>losing</em> keys (you can have multiple backups, and as long as one works you can still recover). But if someone social-engineered you into installing a malicious key with top priority, that's a bad situation to be in (similar badness-level to disclosing the "recovery phrase" of a cryptocurrency wallet).</p>
<p>Here's some cool projects I'm already aware of in this space:</p>
<ul> <li><a href="https://bsky.app">bsky.app</a> (the official Bluesky app) has functionality for one-off repo backups built-in: Settings -&gt; Account -&gt; Export my data (but this does not include blobs and private data)</li> <li><a href="https://bsky.storage/">bsky.storage</a> - ATProto account backups powered by <a href="https://storacha.network/">storacha</a> (Note: bsky.storage is not affiliated with Bluesky!)</li> <li><a href="https://mmatt.net/post/3lu4ttw3wf22z">"Running the iCloud Drive PDS."</a> - A PDS backed by iCloud Drive storage. This was clearly done as a fun demo, but I think there's potential here!</li> <li><a href="https://atpairport.com/">atpairport.com</a> - "Your terminal for seamless AT Protocol PDS migration and backup."</li> </ul>
<p><code>did:plc</code> supports "nullification" (i.e. rollback) of updates within a 72h time window. If your PDS went rogue and updated your DID document maliciously (e.g. removing your backup rotation keys!), you'd have up to 72h to revert it using a higher-priority rotation key. This is what the <code>--prev</code> argument of <code>goat plc update</code> is used for.</p>
<p>With this in mind, if you're particularly distrustful of your PDS host, you might want to set up a system to monitor the DID for updates. As a quick-and-dirty solution, you could use a tool like <code>urlwatch</code> to monitor <code>https://plc.directory/&lt;your_did&gt;/log/audit</code> for updates.</p>
<p>I hope that someone will offer "<code>did:plc</code> monitoring as a service" (you could scale this by monitoring <code>/export</code> rather than polling <code>/log/audit</code> for a specific set of DIDs).</p>
<p>By the way, I made a bare-bones tool for signing PLC operation using a Yubikey:</p>
<p><a href="https://github.com/DavidBuchanan314/yubiplc">https://github.com/DavidBuchanan314/yubiplc</a></p>
<p>It's basically a drop-in replacement for the <code>goat plc sign</code> command in the above steps, with the PLC rotation key being held on the yubikey. I'll write some better docs for it eventually.</p>
