---
author: Puzzmo Blog
cover_image: ''
date: '2026-03-24T20:54:28.233Z'
dateFolder: 2026/03/24
description: >-
  Catch-up If you want the end-user perspective of what we have shipped read:
  Bluesky on Puzzmo. The TLDR:

  We have Bluesky follower sync We have a labeler which sets labels so you can
  see other Puzzmonauts on Bluesky We store your streak data in your Bluesky
  account We post the Cross|word midi dailies to our Bluesky account But getting
  to this feature set was not a linear path and I think it’s interesting to both
  cover the autobiographical reasons for why these exist, and the technical
  foundations so that more folks can consider what it means to interact with the
  Atmosphere.
isBasedOn: 'https://blog.puzzmo.com/posts/2026/03/02/atproto/'
link: 'https://blog.puzzmo.com/posts/2026/03/02/atproto/'
slug: 2026-03-24-httpsblogpuzzmocomposts20260302atproto
tags:
  - code
  - gaming
  - social media
  - decentralization
title: Wrangling atproto + Bluesky for Puzzmo.com
---
<p>If you want the end-user perspective of what we have shipped read: <a href="https://blog.puzzmo.com/posts/2026/03/02/bsky">Bluesky on Puzzmo</a>. The TLDR:</p>
<ul> <li>We have Bluesky follower sync</li> <li>We have a labeler which sets labels so you can see other Puzzmonauts on Bluesky</li> <li>We store your streak data in your Bluesky account</li> <li>We post the Cross|word midi dailies to our Bluesky account</li> </ul>
<p>But getting to this feature set was not a linear path and I think it’s interesting to both cover the autobiographical reasons for why these exist, and the technical foundations so that more folks can consider what it means to interact with the Atmosphere.</p>
<p>If you are familiar with atproto development, you’re welcome to skip this. I am going to give you a quick summary of what it means to work with atproto so I can stop using more ambiguous terminology and start throwing jargon around.</p>
<p>If you have 20m to spare, and truly want to grok it read this: <a href="https://overreacted.io/a-social-filesystem/">A Social Filesystem</a> which was what fully nailed it to me. I will give a few paragraphs to explain what’s necessary for this blog post.</p>
<p>When you sign up to Bluesky, you are creating an <a href="https://atproto.com/">atproto</a> account. An atproto account is a wrapper of a cryptographical identity and a collection of typed JSON blobs (records) called a <a href="https://atproto.com/specs/repository">repository</a> (like git.) The ‘identity’ here is a <a href="https://atproto.com/specs/did">DID</a> (Decentralized IDentifier) which you can think of as a network-unique ID to users/files/content/etc, mine is <a href="https://pdsls.dev/at://did:plc:t732otzqvkch7zz5d37537ry"><code>did:plc:t732otzqvkch7zz5d37537ry</code></a>. It looks, and acts like a URL does for HTTP.</p>
<p>Atproto is a protocol, <a href="https://atproto.com/articles/atproto-ethos">made for creating decentralized social applications</a>. The Bluesky company provides the atproto file-storage for most users (a <a href="https://atproto.com/guides/glossary#pds-personal-data-server">PDS</a>), but as atproto is decentralized you can host elsewhere. I host mine in the EU at npmx.social. This is invisible to others using Bluesky.</p>
<p>Bluesky is effectively the reference atproto app, testing and pushing the protocol with real-world constraints while acting as a way to get people interested. If people use Bluesky, then they already have an atproto account so that the next atproto apps are easier to bootstrap and interop with.</p>
<p>In an atproto account’s repository, a user has ‘collections’ which are JSON blobs that have the same type. So, when I post to Bluesky, it is a JSON blob in the collection <a href="https://pdsls.dev/at://did:plc:t732otzqvkch7zz5d37537ry/app.bsky.feed.post"><code>'app.bsky.feed.post'</code></a>. Any client can get access to the firehose of changes (the Jetstream) to JSON blobs for every atproto account. It’s also possible to backfill that data, which to my knowledge, is quite the achievement.</p>
<p>So, to make an app like Bluesky, you would listen for all change to <code>app.bsky.feed.post</code>s and then do something clever with the realtime data. A lot of bluesky labelers listen to <em>all likes</em> across the network to determine if a specific post was liked, and if so apply a label to that user.</p>
<p>So above, when I say <em>“We store your streak data in your Bluesky account,”</em> I really mean: <em>“We post a Streak JSON blob to the com.puzzmo.streak collection on your atproto account’s repository.”</em> It was an acceptable fudging we can now move past.</p>
<h2>14 Months Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#14-months-ago">#</a></h2>
<p>I wasn’t wild on trying Bluesky.</p>
<p>I had been talking to <a href="https://www.brookehusic.com/">Brooke</a>, who said that the Crossword community had started to converge on Bluesky, and at the same time some of the developers who had been making the Mastodon web client <a href="https://elk.zone/">Elk</a> had started to dabble in Bluesky.</p>
<p>I felt very culturally aligned to Mastodon, I’m a Linux guy who doesn’t like algorithms influencing what I see. I enjoy not using tech and products from mega-corps. My mastodon account runs on a small server hosted by friends (<a href="https://webtoo.ls">webtoo.ls</a>) and I still have a deep sense of loss from what happened to Twitter in the 2020s. Moving to a new American, VC-backed social network was really not something I had active interest in.</p>
<p>I spent quite a lot of time building prototypes of Puzzmo with integrations for ActivityPub (what powers Mastodon), but I just couldn’t find a good place to start in terms of features that people would actually want. We could automatically post to people’s feeds but that’s uninteresting, we auto-post images of our dailies, which is also pretty uninspiring. At best, all I could think of were things which I would never engage with. So, they didn’t even get sent to the team, let alone the public.</p>
<p>But, people I like moved over to Bluesky, and I didn’t have to have an algorithmic feed in their app. I could concede and give it a shot.</p>
<h2>11 Months Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#11-months-ago">#</a></h2>
<p>I was looking at adding my pronouns to my Bluesky account, and was reminded of how this system echo’d a Nintendo feature called <a href="https://www.nintendo.com/en-gb/Hardware/Nintendo-3DS-Family/StreetPass/What-is-StreetPass-/What-is-StreetPass-827701.html">StreetPass</a> that has your Nintendo 3DS track other 3DSes that pass each other in the street.</p>
<p>What if we could have the serendipity of StreetPass, but while you were browsing Bluesky? I know we have quite a few micro celebrities using Puzzmo and I would be interested in seeing how they do on Puzzmo.</p>
<p>Having built out Twitch Oauth to Puzzmo a month or two earlier, for an unreleased feature (I think I have a technique for hooking up whether someone was streaming a game on Puzzmo) I figured we might have an interesting prototype for a Bluesky integration.</p>
<p>So, what is a good starting place?</p>
<p>I took the <a href="https://github.com/aliceisjustplaying/labeler-starter-kit-bsky">Bluesky Labeler starter kit</a> for a ride and made it so you could like a post to apply a ‘Puzzmonaut’ label and showed it to the team with the framing of: <em>“What if we let people sign up to their Bluesky account and we set the label for them”</em>. I got an “that’s interesting”, but not much more interesting than other ideas.</p>
<p>Labelers are an interesting system. You take an atproto account and you “change” it into a labeler by posting a record to a specific collection (<code>'app.bsky.labeler.service'</code>) on their repository. Here’s ours: <a href="https://pdsls.dev/at://did:plc:4p3ilpfcl77fqgoofjmghznc/app.bsky.labeler.service/self">puzzmo-labeler.bsky.social</a> - it is still a normal account by other means but you declare ahead of time all the possible labels.</p>
<p>( So, if you wanted to make an app that tracks all labelers, you’d listen to the Jetstream for all <code>app.bsky.labeler.service</code> records being created/removed. )</p>
<p>Building Oauth login for Bluesky is a bit different than building a normal OAuth client because it is decentralized. Typically, you would go to the Oauth provider’s site and register your application to get a “client secret” and a “client ID”. The Bluesky Oath system doesn’t work that way, instead you have two publicly accessible endpoints:</p>
<ul> <li>Oauth config: <a href="https://api.puzzmo.com/blueskyApp">https://api.puzzmo.com/blueskyApp</a></li> <li>JWK public keys: <a href="https://api.puzzmo.com/atProtoJWKs">https://api.puzzmo.com/atProtoJWKs</a></li> </ul>
<p>A JWK (JSON Web Key) was a new concept for me then, it’s a JSON object with known keys describing a cryptographic key. It has both public and private key variants.</p>
<p>With those two endpoints up and running, I used <a href="https://npmx.dev/package/@atproto/oauth-client-node">@atproto/oauth-client-node</a> to handle the server back-and-forth, did some db work to our existing fastify/prisma setup and got to a point where we were able to log in a user, get their profile and set their avatar image and display name.</p>
<p>It was good enough to make into a feature flag and keep around, but not good enough to inspire someone to do something and make it shippable.</p>
<h2>4 Months Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#4-months-ago">#</a></h2>
<p>I was starting to find myself at the beginning of a multi-month slump, just sorta generally uninspired.</p>
<h2>2 Months Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#2-months-ago">#</a></h2>
<p>I opt to start focusing on Puzzmo.com, after a year of exclusively doing B2B style work behind the scenes.</p>
<p>To get started on that, I went through every source of feedback (internal and external) we’ve ever had and <a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/signal-2026-01-07-044803.jpeg">pulled</a> <a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/signal-2026-01-07-044801.jpeg">out</a> <a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/signal-2026-01-07-044801_002.jpeg">all</a> of the features folks have asked for and put them on a whiteboard. After sitting with Craig, Zach and Andrew for a few hours, it looked like one of the big blockers for many ideas was ‘<a href="https://blog.puzzmo.com/posts/2026/02/06/follows-not-friends/">Follows not Friends</a>’, something Zach has been asking about for a year or so.</p>
<p>So, I got started on that.</p>
<h2>1 Months Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#1-months-ago">#</a></h2>
<p>I’m very grateful that Dan Abramov took a third stab at trying to find the right metaphors to describe how atproto works with this post:</p>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://embed.bsky.app/embed/did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3mcoktonamk2m?id=7236834107288068&amp;ref_url=https%253A%252F%252Fblog.puzzmo.com%252Fposts%252F2026%252F03%252F02%252Fatproto%252F&amp;colorMode=system">View content ↗ </a></p></figure>
<p>It really clicks with me.</p>
<p>I thought to myself, rather than mulling over something I want to avoid thinking about, maybe I should just throw myself into a completely new technical context. I wasn’t interested in learning a new programming language, but trying to think about building apps using in a de-centralized file-based system? There could be something there.</p>
<p>Off the bat from that one article, I came out with a bunch of ideas:</p>
<ul> <li> <p><figure><img alt="A screenshot of the blog post" src="https://blog.puzzmo.com/posts/2026/03/02/atproto/Screenshot_2026-02-27_11-42-34.png"/><figcaption>A screenshot of the blog post</figcaption></figure> If it was possible to jump across contexts like this, it would be interesting to be able to show Puzzmo user data like profile stats and streaks.</p> </li> <li> <p><figure><img alt="A screenshot of the blog post" src="https://blog.puzzmo.com/posts/2026/03/02/atproto/Screenshot_2026-02-27_19-27-41.png"/><figcaption>A screenshot of the blog post</figcaption></figure> If any app can edit any record, then there needs to be a way to prove a record was made by someone!</p> </li> </ul>
<p>But also, if I’m in the process of converting Puzzmo to a follower style relationship model, then maybe I can break out that old prototype and add Bluesky follower syncing as the headline feature.</p>
<p>Then a week later I woke up and couldn’t get this idea out of my head:</p>
<figure><img alt="A message saying ‘Keybase, but for atproto’" src="https://blog.puzzmo.com/posts/2026/03/02/atproto/Screenshot_2026-02-27_19-31-14.png"/><figcaption>A message saying ‘Keybase, but for atproto’</figcaption></figure>
<p>Maybe I could fill that void by working on a tricky atproto app, learn enough to be able to come back to Puzzmo and really nail Bluesky support.</p>
<h2>3 Weeks Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#3-weeks-ago">#</a></h2>
<p>I spend a weekend <a href="https://github.com/orta/keytrace/blob/eb784e3ef2d2b57bc8c6213c41b444babee40b79/keytrace-plan.md">researching and making</a> a rough version of a Keytrace. If you never used Keybase, it was a startup which took the concept of PGP <a href="https://en.wikipedia.org/wiki/Key_server_(cryptographic)">keyservers</a> and made them approachable and modern. Once Keybase had your keys set up, the site made it possible for you to be able to hook up other internet accounts to your Keybase as a <a href="https://en.wikipedia.org/wiki/Web_of_trust">web of trust</a> system.</p>
<p>So, 12 years ago I made <a href="https://gist.github.com/orta/9589737">this gist</a>:</p>
<pre><code>### Keybase proof

I hereby claim:

  * I am orta on github.
  * I am orta (https://keybase.io/orta) on keybase.
  * I have a public key whose fingerprint is E91F 36B1 5554 2702 F46E  E083 9F5E 5653 EE2A C266

To claim this, I am signing this object:

```json
{
    "body": {
        "key": {
            "fingerprint": "e91f36b155542702f46ee0839f5e5653ee2ac266",
            "host": "keybase.io",
            "key_id": "9F5E5653EE2AC266",
            "uid": "e7369ce59bbd707c2bd1fe55f1f73100",
            "username": "orta"
        },
        "service": {
            "name": "github",
            "username": "orta"
        },
        "type": "web_service_binding",
        "version": 1
    },
    "ctime": 1395003014,
    "expire_in": 157680000,
    "prev": null,
    "seqno": 1,
    "tag": "signature"
}
```

with the PGP key whose fingerprint is
[E91F 36B1 5554 2702 F46E  E083 9F5E 5653 EE2A C266](https://keybase.io/orta)
(captured above as `body.key.fingerprint`), yielding the PGP signature:

[...]
</code></pre>
<p>The Gist’s content connects my <a href="https://github.com/orta">“orta”</a> GitHub account, to my <a href="https://keybase.io/orta">“orta”</a> Keybase account - only my account can post a gist to my account too! The gist does this by including a proof of identity message which is signed by my PGP key which is attached to my Keybase account. Now, what is interesting with Keybase’s approach, and why it’s still brought up in many modern contexts is that everything is publicly verifiable. Keybase could trivially have added GitHub Oauth to their site and then privately they can prove that you have logged into another account. However by forcing the full verification process to be done in the public anyone can check, and Keybase itself would occasionally re-check on a schedule.</p>
<p>Now, Keybase had a bit of a fatal flaw in that it was a real company, and that company got <a href="https://www.zoom.com/en/blog/zoom-acquires-keybase-and-announces-goal-of-developing-the-most-broadly-used-enterprise-end-to-end-encryption-offering/">sold to Zoom</a> amidst the pandemic lockdowns. I’m sure it was hard to figure out how to get folks paying for Keybase, and credit to the team that the website is still up and running, and even the client <a href="https://github.com/keybase/client/graphs/contributors">seems to still get updates</a>.</p>
<p>Keybase’s identity coalescing is a great example of the type of problem atproto is trying to solve. If you can separate the data from the application, then if I decide to stop doing work on Keytrace, someone else can just continue with the same data.</p>
<p>Keytrace did have to solve one a problem unique to atproto: data provenance. If any app can write/edit anything to a users repository… then anyone can say they are anyone else! That’s a bit of a blocker. I knew this was going to be an issue with Puzzmo too, if we want to present ourselves as ‘putting your data on your repository’, we should be able to prove that it is from us!</p>
<p>Typically if you want to prove something, you sign in, but Keytrace can’t manipulate the envelope of a record in a repository. There aren’t APIs for that, instead we use an inline signing system. As an example, here is the record of my claim to own the GitHub handle “orta” in <a href="https://pdsls.dev/at://did:plc:t732otzqvkch7zz5d37537ry/dev.keytrace.claim/3mfjc5hvxkz24">my atproto repository</a>:</p>
<pre><code>{
  "sigs": [
    {
      "kid": "attest:github",
      "src": "at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-02-23",
      "signedAt": "2026-02-23T09:02:11.550Z",
      "attestation": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbVVyaSI6Imh0dHBzOi8vZ2lzdC5naXRodWIuY29tL29ydGEvYjdkY2NkZmIwOGU3ZmJiODU1MzM3YTQ0NGI2MmUyZDMiLCJjcmVhdGVkQXQiOiIyMDI2LTAyLTIzVDA5OjAyOjExLjU1MFoiLCJkaWQiOiJkaWQ6cGxjOnQ3MzJvdHpxdmtjaDd6ejVkMzc1MzdyeSIsImlkZW50aXR5LnN1YmplY3QiOiJvcnRhIiwidHlwZSI6ImdpdGh1YiJ9.Vv566U9wMlqP2ygwme_XwFvyCHChEmremY5x30gwBCdSBRvqpVOvNK_VppxwbMYV3wpvnBofufw2HHlVlJayWg",
      "signedFields": [
        "claimUri",
        "createdAt",
        "did",
        "identity.subject",
        "type"
      ]
    },
    {
      "kid": "status",
      "src": "at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-02-28",
      "signedAt": "2026-02-28T21:51:56.657Z",
      "attestation": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbVVyaSI6Imh0dHBzOi8vZ2lzdC5naXRodWIuY29tL29ydGEvYjdkY2NkZmIwOGU3ZmJiODU1MzM3YTQ0NGI2MmUyZDMiLCJkaWQiOiJkaWQ6cGxjOnQ3MzJvdHpxdmtjaDd6ejVkMzc1MzdyeSIsImxhc3RWZXJpZmllZEF0IjoiMjAyNi0wMi0yOFQyMTo1MTo1Ni42NTdaIiwic3RhdHVzIjoidmVyaWZpZWQifQ.bkarHo_BDVmMv7asuqxj8u9JbfESzWfBuJrX4sBvP07WE5ZmQTsKUo50dJBE51IXpaP5D1nThsknScXHtx4l3w",
      "signedFields": [
        "claimUri",
        "did",
        "lastVerifiedAt",
        "status"
      ]
    }
  ],
  "type": "github",
  "$type": "dev.keytrace.claim",
  "status": "verified",
  "claimUri": "https://gist.github.com/orta/b7dccdfb08e7fbb855337a444b62e2d3",
  "identity": {
    "subject": "orta",
    "avatarUrl": "https://avatars.githubusercontent.com/u/49038?v=4",
    "profileUrl": "https://github.com/orta"
  },
  "createdAt": "2026-02-23T09:02:12.733Z",
  "prerelease": true,
  "lastVerifiedAt": "2026-02-28T21:51:56.657Z"
}
</code></pre>
<p>There are two different signatures inside the JSON blob, each are a signed by the Keytrace server and describe which fields have been marked as being attested.</p>
<ul> <li>Signature: <code>attest:github</code> proves the claimed URL, the creation date, the owner of the repository, the claimed identity and the type as being verified by the Keytrace server on 2026-02-23</li> <li>Signature: <code>status</code> proves the claimed URL, the owner of the repository, the verification date, and the result of the verification as being done by the Keytrace server on 2026-02-28</li> </ul>
<p>So, it’s a mutable “untrustworthy” record, but we have subsets which have been signed by the server. The keys are linked as atproto DIDs, e.g. <a href="https://pdsls.dev/at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-02-23"><code>"at://did:plc:hcwfdlmprcc335oixyfsw7u3/dev.keytrace.serverPublicKey/2026-02-23"</code></a> where you can grab the public key if you want to verify the signature yourself.</p>
<p>If you want to see the process step-by-step, put ‘orta.io’ in <a href="https://keytrace.dev/developers">https://keytrace.dev/developers</a></p>
<p>So, with data verification at a reasonable spot and having gotten a deeper understanding of atproto. It’s time to come back to Puzzmo.</p>
<p>While I am wrapping up the final polish pass on the Followers, Craig and Lilith take a stab at the <code>/bluesky</code> page.</p>
<h2>2 Weeks Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#2-weeks-ago">#</a></h2>
<p>Followers are now the relationship system in Puzzmo. Craig discovers that we can use the Bluesky API to add a labeler making it possible for the whole Bluesky integration to just be a one-click style install.</p>
<p>Now we’ve narrowed the flow down to three tick boxes which we offer ahead of time:</p>
<ul> <li>Followm @puzzmo.com</li> <li>Setup the labeler</li> <li>Sync user data</li> </ul>
<p>Those options get turned into flags on a user, and we run a background job which syncs your Bluyesky setup. We track when you last synced and run again in a week.</p>
<pre><code>import cuid from "cuid"

import { currentFeatureFlags } from "@puzzmo-com/shared/featureFlagConfig"
import { UserFlags1, userHasFlag } from "@puzzmo-com/shared/flags/userFlags"

import { getBlueskyFollowersPage, getBlueskyFollowsPage, restoreAgentFromAuthConnection } from "src/lib/bluesky/follows"
import { amendLabelOnDID } from "src/lib/bluesky/labeler"
import { timedBlueskyCall } from "src/lib/bluesky/timeout"
import { puzzmoBlueskyDID, puzzmoLabelerDID } from "src/lib/constants"
import { _dateToDateKey } from "src/lib/dailies/dailies"
import { db } from "src/lib/db"
import { createFollowsFromBlueskySync } from "src/lib/friends/userFollow"
import { makeFaktoryTask } from "src/lib/tasks/faktory"
import { createJobLogger } from "src/lib/tasks/jobLogger"

interface ConnectBlueskyArgs {
  userID: string
}

const connectBluesky = async (args: ConnectBlueskyArgs) =&gt; {
  const { userID } = args
  const log = createJobLogger("connectBluesky")
  log.start(userID)

  log.log(`Loading user and checking opt-out flag`)
  const user = await db.user.findUnique({ where: { id: userID } })

  if (!user) {
    log.exception(`User ${userID} not found`)
    return
  }

  if (userHasFlag(user, 0, UserFlags1.DisableBlueskyFollowSync)) {
    log.log(`User ${user.username}#${user.usernameID} has disabled Bluesky follow sync`)
    log.end()
    return
  }

  log.log(`Loading Bluesky auth connection for ${user.username}#${user.usernameID}`)
  const authConnection = await db.authConnection.findUnique({ where: { userID_type: { userID, type: "Bluesky" } } })

  if (!authConnection) {
    log.exception(`No Bluesky connection for user ${userID}`)
    return
  }

  log.log(`Restoring Bluesky agent from stored tokens`)
  let agent
  try {
    agent = await restoreAgentFromAuthConnection(authConnection)
  } catch (error) {
    log.exception(`Failed to restore Bluesky agent:`, error)
    return
  }

  const did = authConnection.externalID
  log.log(`Connecting Bluesky for DID: ${did}`)

  // Follow Puzzmo's Bluesky account and add labeler based on user preference
  if (userHasFlag(user, 0, UserFlags1.FollowBlueskyAccount))
    await timedBlueskyCall(agent.follow(puzzmoBlueskyDID), { label: "follow", log })
  else log.log(`Skipping follow Puzzmo account (user flag not set)`)

  if (userHasFlag(user, 0, UserFlags1.AddBlueskyLabeler))
    await timedBlueskyCall(agent.addLabeler(puzzmoLabelerDID), { label: "addLabeler", log })
  else log.log(`Skipping labeler subscription (user flag not set)`)

  // Apply Puzzmo labels to the user's Bluesky account
  log.log(`Checking puzzle contribution history for labeling`)
  const hasContributed = await db.puzzle.findFirst({
    where: {
      mostRecentPublishDate: { not: null },
      OR: [{ authors: { some: { id: userID } } }, { editors: { some: { id: userID } } }, { hinters: { some: { id: userID } } }],
    },
    select: { id: true },
  })

  const labels: ("member" | "contributor")[] = hasContributed ? ["member", "contributor"] : ["member"]
  await timedBlueskyCall(amendLabelOnDID(did, { add: labels }), { label: "amendLabels", log })

  // Track users who receive new follows for social news
  const usersWhoReceivedFollows: Array&lt;{ userID: string; blueskyHandle: string }&gt; = []
  let totalPuzzmoUsersFound = 0

  // Phase 1: Sync user's Bluesky follows (people they follow)
  // Creates follows: current user -&gt; target users
  log.log(`Phase 1: Syncing user's follows`)
  let followsCursor: string | undefined
  let totalFollowsProcessed = 0

  do {
    const page = await getBlueskyFollowsPage(did, followsCursor)
    followsCursor = page.cursor

    if (page.dids.length === 0) break

    // Batch lookup: find Puzzmo users with these DIDs
    const matchingConnections = await db.authConnection.findMany({
      where: { externalID: { in: page.dids }, type: "Bluesky" },
      select: { userID: true, externalID: true, handle: true },
    })

    if (matchingConnections.length &gt; 0) {
      totalPuzzmoUsersFound += matchingConnections.length

      // Get target users' flags to check opt-out
      const targetUserIDs = matchingConnections.map((c) =&gt; c.userID)
      const targetUsers = await db.user.findMany({ where: { id: { in: targetUserIDs } }, select: { id: true, flagsArr: true } })

      // Filter out users who have disabled sync
      const eligibleTargets = targetUsers.filter((u) =&gt; !userHasFlag(u, 0, UserFlags1.DisableBlueskyFollowSync))

      // Create follows: current user -&gt; eligible targets
      const follows = eligibleTargets.map((target) =&gt; ({ followerID: userID, followingID: target.id }))

      if (follows.length &gt; 0) {
        const result = await createFollowsFromBlueskySync(follows)
        log.log(`Created ${result.created} follows to Bluesky followees (${result.bidirectionalUpdated || 0} bidirectional)`)

        // Track users who actually received new follows for social news
        const createdFollowingIDs = new Set(result.createdFollows.map((f) =&gt; f.followingID))
        for (const conn of matchingConnections) {
          if (createdFollowingIDs.has(conn.userID)) usersWhoReceivedFollows.push({ userID: conn.userID, blueskyHandle: conn.handle })
        }
      }
    }

    totalFollowsProcessed += page.dids.length
    log.log(`Processed ${totalFollowsProcessed} Bluesky follows...`)
  } while (followsCursor)

  // Phase 2: Sync user's Bluesky followers (people who follow them)
  // Creates follows: follower users -&gt; current user
  log.log(`Phase 2: Syncing user's followers`)
  let followersCursor: string | undefined
  let totalFollowersProcessed = 0

  do {
    const page = await getBlueskyFollowersPage(did, followersCursor)
    followersCursor = page.cursor

    if (page.dids.length === 0) break

    // Batch lookup: find Puzzmo users with these DIDs
    const matchingConnections = await db.authConnection.findMany({
      where: { externalID: { in: page.dids }, type: "Bluesky" },
      select: { userID: true, externalID: true },
    })

    if (matchingConnections.length &gt; 0) {
      // Get follower users' flags to check opt-out
      const followerUserIDs = matchingConnections.map((c) =&gt; c.userID)
      const followerUsers = await db.user.findMany({ where: { id: { in: followerUserIDs } }, select: { id: true, flagsArr: true } })

      // Filter out users who have disabled sync
      const eligibleFollowers = followerUsers.filter((u) =&gt; !userHasFlag(u, 0, UserFlags1.DisableBlueskyFollowSync))

      // Create follows: eligible followers -&gt; current user
      const follows = eligibleFollowers.map((follower) =&gt; ({ followerID: follower.id, followingID: userID }))

      if (follows.length &gt; 0) {
        const result = await createFollowsFromBlueskySync(follows)
        log.log(`Created ${result.created} follows from Bluesky followers (${result.bidirectionalUpdated || 0} bidirectional)`)
      }
    }

    totalFollowersProcessed += page.dids.length
    log.log(`Processed ${totalFollowersProcessed} Bluesky followers...`)
  } while (followersCursor)

  log.log(`Total follows processed: ${totalFollowsProcessed}, Total followers processed: ${totalFollowersProcessed}`)

  // Social news is gated behind the bluesky-oauth feature flag being removed
  const bskyOauthHasFlag = currentFeatureFlags.some((flag) =&gt; flag.id === "bluesky-oauth")
  if (bskyOauthHasFlag) log.log(`Skipping social news creation (bluesky-oauth feature flag still active)`)

  if (!bskyOauthHasFlag) {
    // Create social news items
    const dateKey = _dateToDateKey(new Date())

    // Social news for the syncing user
    if (totalPuzzmoUsersFound &gt; 0) {
      await db.socialNewsItem.create({
        data: {
          id: cuid() + ":snews",
          authorID: userID,
          dateKey,
          messageMD: `synced Bluesky and found ${totalPuzzmoUsersFound} Puzzmo user${totalPuzzmoUsersFound === 1 ? "" : "s"}`,
        },
      })
      log.log(`Created social news for syncing user: found ${totalPuzzmoUsersFound} users`)
    }

    // Social news for users who received auto-follows
    if (usersWhoReceivedFollows.length &gt; 0) {
      const newsItems = usersWhoReceivedFollows.map((item) =&gt; ({
        id: cuid() + ":snews",
        authorID: item.userID,
        dateKey,
        messageMD: `[@${user.username}#${user.usernameID}](/user/${user.username}/${user.usernameID}) ([@${authConnection.handle}](https://bsky.app/profile/${authConnection.handle})) connected Puzzmo to Bluesky, and you are now following them here too`,
        private: true,
      }))

      await db.socialNewsItem.createMany({ data: newsItems, skipDuplicates: true })
      log.log(`Created ${newsItems.length} social news items for users who received follows`)
    }
  }

  // Update lastSyncedAt timestamp
  await db.authConnection.update({ where: { userID_type: { userID, type: "Bluesky" } }, data: { lastSyncedAt: new Date() } })

  log.log(`Updated lastSyncedAt timestamp`)
  log.end()
}

export const scheduleTaskForConnectBluesky = makeFaktoryTask&lt;ConnectBlueskyArgs&gt;("connectBluesky", connectBluesky)
</code></pre>
<p>I was finding Bluesky API calls would occasinally timeout but never sent a completion or failing state blocking execution completely, so we have an app-level timeout system.</p>
<h2>1.5 Weeks Ago<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#15-weeks-ago">#</a></h2>
<p>Streak syncing was a little bit more nuanced. Steaks occur at a different phase of a game being completed than the usual user data processing, because non-users (anonymous folk) have streaks. So, the streak processing for Bluesky is structured differently from the rest of streak management.</p>
<p>Streaks are stored <em>on the user’s reguitry</em> and not on the puzzmo.com repository. This means we need to do the attestation mentioned above for Keytrace. Here’s my <a href="https://pdsls.dev/at://did:plc:t732otzqvkch7zz5d37537ry/com.puzzmo.streak/puzzmo-ribbit">Ribbit streak</a></p>
<pre><code>{
  "uri": "at://did:plc:t732otzqvkch7zz5d37537ry/com.puzzmo.streak/puzzmo-ribbit",
  "cid": "bafyreih65f3rqw2p3bydbrbkuzqixmbsdtpunrhok3xi2m4mrypyg44tm4",
  "value": {
    "sigs": [
      {
        "kid": "0f1063cb-81b8-4299-9dc6-f8d03366de56",
        "src": "at://did:plc:p5ode5bkf6vjtt6ahtssuxui/dev.keytrace.serverPublicKey/signing-keys-1",
        "signedAt": "2026-03-01T13:59:22.435Z",
        "attestation": "eyJhbGciOiJFUzI1NiIsImtpZCI6IjBmMTA2M2NiLTgxYjgtNDI5OS05ZGM2LWY4ZDAzMzY2ZGU1NiJ9.eyJjdXJyZW50IjoxLCJnYW1lRGlzcGxheU5hbWUiOiJSaWJiaXQiLCJnYW1lU2x1ZyI6InJpYmJpdCIsImxhc3RVcGRhdGVkIjoiMjAyNi0wMy0wMVQwNjowMDowMC4wMDBaIiwibWF4IjozLCJ0ZWFtU2x1ZyI6InB1enptbyIsInRvdGFsIjoxMn0.x2GEHS1kNohlLTHBDLQWZ7GAZoMKqrGYbXdvzQslbBliX6BEBEUh6Fd-TapqnvYwResDf4oQ5IXTyRGxu4bXJw",
        "signedFields": [
          "current",
          "gameDisplayName",
          "gameSlug",
          "lastUpdated",
          "max",
          "remixSlug",
          "teamSlug",
          "total"
        ]
      }
    ],
    "$type": "com.puzzmo.streak",
    "total": 12,
    "max": 3,
    "current": 1,
    "gameSlug": "ribbit",
    "syncedAt": "2026-03-01T13:59:22.440Z",
    "teamSlug": "puzzmo",
    "lastUpdated": "2026-03-01T06:00:00.000Z",
    "gameDisplayName": "Ribbit"
  }
}
</code></pre>
<p>I could manually edit my total using <a href="https://pdsls.dev/">PDSLs</a> but then it won’t pass any Keytrace signature checks.</p>
<p>For the lexicon on a Streak, I’ve also tried to keep it as open as possible so that other atproto games can keep track of their streaks using <code>com.puzzmo.streak</code>!</p>
<p>I wrapped up sync, handled edge cases like timeouts, ENV vars being set in the right places, initial marketing plan and got the daily up and running.</p>
<p>Time to get the Puzzmo daily added to the puzzmo.com atproto repository. I started the data modeling for this work <a href="https://gist.github.com/orta/3f9a9b63fc6b9d78e2afa944977bd3e3">in a gist</a> and to be fair, I didn’t change too much from this also.</p>
<p>What I ended up shipping is something which looks like this:</p>
<pre><code>@puzzmo.com
  - com.puzzmo.dailies
    - 2026-03-01
    - 2026-03-02

  - com.puzzmo.puzzle
    - ilobr1ao1
    - 9j137s1gxb
</code></pre>
<p>A daily record looks like:</p>
<pre><code>{
  "uri": "at://did:plc:p5ode5bkf6vjtt6ahtssuxui/com.puzzmo.daily/2026-02-27",
  "cid": "bafyreidgzvt6izzfsnsxtxpqiu5kgcnbsmni7gsp4xvx3pq5qsf3sg7ese",
  "value": {
    "$type": "com.puzzmo.daily",
    "puzzles": [
      {
        "urlPath": "2026-02-27/crossword",
        "puzzleUri": "at://did:plc:p5ode5bkf6vjtt6ahtssuxui/com.puzzmo.puzzle/ilobr1ao1"
      }
    ],
    "createdAt": "2026-02-27T09:06:35.094Z",
    "dayString": "2026-02-27T00:00:00.000Z",
    "seriesNumber": 866
  }
}
</code></pre>
<p>This represents a daily with one puzzle, that is available at <a href="https://pdsls.dev/at://did:plc:p5ode5bkf6vjtt6ahtssuxui/com.puzzmo.puzzle/ilobr1ao1#record"><code>at://did:plc:p5ode5bkf6vjtt6ahtssuxui/com.puzzmo.puzzle/ilobr1ao1</code></a>, which looks like:</p>
<pre><code>{
  "uri": "at://did:plc:p5ode5bkf6vjtt6ahtssuxui/com.puzzmo.puzzle/ilobr1ao1",
  "cid": "bafyreid6tzg63akkr4riatnbmvk4muctusyljsayfrexuoglukmj6dti3y",
  "value": {
    "url": "https://www.puzzmo.com/puzzle/2026-02-27/crossword",
    "name": "I Choose/See You",
    "$type": "com.puzzmo.puzzle",
    "emoji": "⚡",
    "puzzle": "## Metadata\n\ntitle: I Choose/See You\nauthor: Brooke\ndate: Not set\neditor: Not set\ncopyright: © 2025\nblacksquares: 17\nwhitespaces: 83\nacrossclues: 18\ndownclues: 18\nwidth: 10\nheight: 10\nsize: 10x10\nsplitcharacter: |\n\n## Grid\n\nCASTS.OATS\nONTOP.CIAO\nUNAGI.CLUB\nPIKACHU...\nSEE.EUROPE\n...MLS.RRR\n..PEEKABOO\nNBATV.WIND\nFAIRE.ETTE\nLOLOL..SOS\n\n## Clues\n\n[... full puzzle data with all clues ...]",
    "authors": [
      {
        "did": "did:plc:lefausewp2dge736hb3emlfx",
        "type": "author",
        "avatarUrl": "https://cdn.puzzmo.com/avatars/pup/8.png",
        "displayName": "brooke"
      }
    ],
    "editors": [...],
    "hinters": [...],
    "gameSlug": "crossword",
    "createdAt": "2026-02-18T15:01:26.648Z",
    "difficulty": 8,
    "editorsNotes": "Happy Pokémon day! 30 years ago today the first Pokémon games launched in Japan.",
    "publications": [
      {
        "url": "https://www.puzzmo.com/puzzle/2026-02-27/crossword",
        "publishedAt": "2026-02-27T00:00:00.000Z",
        "seriesNumber": 866
      }
    ],
    "completionNotes": "I came up with this theme when I was at [Zach](@helvetica#puz)'s house and I heard his kid say \"peeeekaaaa\" and wasn't sure if it was going to end in [`-BOO`](#23A) (I see you!) or [`-CHU`](#14A) (I choose you!).\n\n(It was `-BOO`.)",
    "gameDisplayName": "Cross|word"
  }
}
</code></pre>
<p>We’re currently deploying just the daily Midi Crossword to atproto for now. It’s all quite complicated legally, but this at least is pretty straightforwards.</p>
<p>We’re shipping the lexicons for running our daily. I think they are comprehensive enough for anyone running a daily game to be able to use. I avoided using direct Puzzmo terminology when possible:</p>
<p>The code simply maps our db terminology to the lexicon terminology and then uploads to our repository via Bluesky’s API and an <a href="https://blueskyfeeds.com/faq-app-password">app password</a>.</p>
<h2>Getting Over the Line<a href="https://blog.puzzmo.com/posts/2026/03/02/atproto/#getting-over-the-line">#</a></h2>
<p>Shipping the Bluesky support has been a lot of code + ideas on my side, but it took a bunch of effort from others:</p>
<ul> <li><a href="https://www.puzzmo.com/user/puz/dietcoke86">Andrew</a> + <a href="https://www.brookehusic.com/">Brooke</a> figuring out what it means if we ship a daily outside of puzzmo.com</li> <li><a href="https://www.lilithwu.com/">Lilith</a> + Craig made the Bluesky features understandable and feel like it’s worth the faff to sign-up</li> <li><a href="http://stfj.net/">Zach</a> for weekly design reviews</li> </ul>
<p>It’s been funny to reflect on my conversations with other developers in the last month, maybe the first time in almost a year - I have not been talking almost exclusively about Claude Code. Talking decentralization with folks has been really fun, and atproto is a very pragmatic approach to the problem. It’s interesting that it’s tied to a social network, but I think from a bootstrapping perspective they nailed the reference app.</p>
<p>Did it get me over the slump? Kinda, maybe. It is cool to have an OSS project I care about in active development again and to be honest, I had kinda given up on the idea that we can build a decentralized web and it’s kinda cool to be able to spend some time talking about something that seems to be a really good implementation of it.</p>
<p> <a href="https://blog.puzzmo.com/tags/tech">tech</a> <a href="https://blog.puzzmo.com/tags/atproto">atproto</a> <a href="https://blog.puzzmo.com/posts/2026/03/02/bsky/">←Bluesky support for Puzzmo</a> <a href="https://blog.puzzmo.com/posts/2026/02/06/follows-not-friends/">Follows Not Friends→</a> </p>
