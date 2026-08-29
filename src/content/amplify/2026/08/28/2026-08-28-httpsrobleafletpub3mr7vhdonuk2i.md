---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%3Aplc%3Arz6grfppdzkzytcwnb66nldn/3m7iscts5bc23/3mr7vhdonuk2i/opengraph-image-vzkbb4?4bf24c8c13de861c
date: '2026-08-29T03:01:57.032Z'
dateFolder: 2026/08/28
description: >-
  Census of rotation keys and other ways of asserting strong control over
  identity on the Atmosphere
isBasedOn: 'https://rob.leaflet.pub/3mr7vhdonuk2i'
link: 'https://rob.leaflet.pub/3mr7vhdonuk2i'
slug: 2026-08-28-httpsrobleafletpub3mr7vhdonuk2i
tags:
  - tech
  - decentralization
title: 'Rotation Key Census, July 2026'
---
<p>Updates to did:plc identities are managed via cryptographic keys known as rotation keys. These are public/private key pairs, and the holder of the private half can use it to sign updates to the identity such as changing its handle or <a href="https://atproto.com/guides/account-migration">moving it to a different data server</a>. All accounts will have at least rotation key, managed by their PDS server, and may optionally add other rotation keys under their own control.</p>
<p>Updates to did:plc identities are managed via cryptographic keys known as rotation keys. These are public/private key pairs, and the holder of the private half can use it to sign updates to the identity such as changing its handle or <a href="https://atproto.com/guides/account-migration">moving it to a different data server</a>. All accounts will have at least rotation key, managed by their PDS server, and may optionally add other rotation keys under their own control.</p>
<p>User data on Bluesky and in the Atmosphere are stored in servers called PDSes. Each account is hosted on one PDS, and a PDS can host many accounts. In current practice, the vast majority of accounts are hosted on PDSes operated by the company Bluesky PBLC, though a growing number of users are on other PDSes, such as <a href="https://blackskyweb.xyz/">Blacksky</a>, <a href="https://eurosky.tech/">Eurosky</a><a href="https://northskysocial.com/">Northsky</a>, and others. These PDSes, apps, and other services are collectively known as the Atmosphere.</p>
<p><a href="https://atproto.com/">atproto</a>, which the Atmopshere is built on, supports migrating accounts between PDSes without losing data or changing your identity. This is normally done by downloading your data (in a "CAR" file) from the old PDS, uploading it to the new PDS, and asking your old PDS to use its rotation key to record that you have moved.</p>
<p>atproto also supports "<a href="https://www.da.vidbuchanan.co.uk/blog/adversarial-pds-migration.html">adversarial migration</a>" in which you are able move without the cooperation of your old PDS - perhaps because it has gone down, or because it has become hostile and does not wish to let you move.</p>
<p>Thus, this census gives us an idea of how many users might be prepared to use adversarial migration if needed. In addition to having a rotation key, they must also have a recent CAR file, and must have securely kept track of the private half of their own rotation key.</p>
<p>I've been running a service that listens to the <a href="https://docs.bsky.app/docs/advanced-guides/firehose">firehose</a> on four different relays: It keeps track of the last time each did created any records (posted, reposted, liked, followed, unfollowed, blocked, etc.) This is the source of my 'recently active users' list: I looked at all dids that had been active in the previous 30 days.</p>
<p>I've been running a service that listens to the <a href="https://docs.bsky.app/docs/advanced-guides/firehose">firehose</a> on four different relays: It keeps track of the last time each did created any records (posted, reposted, liked, followed, unfollowed, blocked, etc.) This is the source of my 'recently active users' list: I looked at all dids that had been active in the previous 30 days.</p>
<p>The Bluesky PDSes use the same two rotation keys for all DIDs. If you do not add a rotation key, Bluesky can theoretically prevent you from moving your account elsewhere. Some types of account takedown, for example, prevent migration.</p>
<p>If a PDS hosts only one repository, we can probably assume that it is <a href="https://atproto.com/guides/self-hosting">self-hosted</a> or otherwise under the control of its sole user, and we can assume that the user will be able to keep control of their identity.</p>
<p>The <a href="https://github.com/bluesky-social/pds">reference PDS</a> uses a single rotation key for all accounts. It is still useful to add another, so that if all data from the PDS is lost (including the private half of its rotation key), the user still has a way to keep control of their identity.</p>
<p>PDSes operated by entities other than Bluesky still carry potential risk, with the risk simply shifted to another party. Thus, it is still a good idea to have your own rotation key even if you are on a third-party PDS.</p>
<p>In most cases, most or all users on multi-user PDSes have the same rotation key, controlled by the PDS. I identified users with stronger control over their identities by looking for users on these PDSes that have additional, unique, rotation keys not shared by any other users on their PDS.</p>
<p>Users on third-party multi-user PDSes are currently much more likely to have custom rotation keys than those on Bluesky's PDSes. This is probably due in part to these users being more aware of the functioning of the protocol and having heightened sensitivity to issues of distributed identity. I would also attribute this to some of the PDS movers having built-in features to add personal rotation keys as part of the process, which I think is an excellent feature.</p>
<p><a href="https://w3c-ccg.github.io/did-method-web/">did:web</a> is an alternative way of managing your identity that uses a different method for claiming ownership - we can assume that these accounts have strong ownership over their identity.</p>
<p>If you are not sure whether your account uses a did:web, then it does not. It is not currently possible to migrate from a did:plc identity to a did:web (or any other type of did) identity.</p>
<p>In particular, the <a href="https://fed.brid.gy/">Bridgy Fed</a> PDS seems to handle rotation keys differently than most other PDSes, in that it gives all users two rotation keys, and these rotation keys are unique to the account.</p>
<p>On the one hand, I know of no way for Bridgy Fed users to control rotation keys (or other aspects of their accounts), so users do not have strong control of their identity. On the other hand, these are accounts bridged in from other networks, so the repos on Bridgy Fed are not the authoritative source of information for these accounts anyway. I thus exclude them from my counts.</p>
