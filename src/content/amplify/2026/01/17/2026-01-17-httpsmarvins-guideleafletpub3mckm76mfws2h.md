---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Arnpkyqnmsw4ipey6eotbdnnf/3lxn3sgnjpc2a/3mckm76mfws2h/opengraph-image?f3a3a13b3930d7d9
date: '2026-01-18T00:29:51.206Z'
dateFolder: 2026/01/17
description: Tired of creating duplicate records in a repo from your atproto app?
isBasedOn: 'https://marvins-guide.leaflet.pub/3mckm76mfws2h'
link: 'https://marvins-guide.leaflet.pub/3mckm76mfws2h'
slug: 2026-01-17-httpsmarvins-guideleafletpub3mckm76mfws2h
tags:
  - code
  - decentralization
title: 'Bitesize Proto: Upserting ATProto Records'
---
<p>Ever had a project where you wanted to make sure you were not recreating the same record to the user's repo? Maybe you are doing a <a href="https://docs.bsky.app/docs/api/com-atproto-repo-list-records">listRecords</a>, or keeping a record locally of what's been created on the user's repo? But how can you simplify that check and scale it to multiple instances to ensure you are not writing multiple of the same record? Well, you can do something called upserting. Upserting is a term that is a combination of the words insert and update, used mostly in database terminology. The idea is that it's a statement that checks to see if a record/row exists. If it does, it updates the record/row, if not, it creates a new one. This is usually done via a where statement on some unique data. An example in PostgreSQL.</p>
<pre><code>INSERT INTO inventory (id, name, price, quantity)
VALUES (1, 'A', 16.99, 120)
ON CONFLICT(id)
DO UPDATE SET
  price = EXCLUDED.price,
  quantity = EXCLUDED.quantity;</code></pre>
<p>The secret to doing an upsert with ATProto records is two things. Using a <a href="https://atproto.com/specs/tid">TID</a> <a href="https://atproto.com/specs/record-key">record key</a>,and doing a <a href="https://docs.bsky.app/docs/api/com-atproto-repo-put-record">com.atproto.repo.putRecord</a> instead of a create.</p>
<blockquote data-index="5">I usually use Bluesky's TypeScript libraries for code examples. But today I am going to highlight a community made TypeScript library, <a href="https://github.com/mary-ext/atcute">atcute</a> by @mary.my.id and show the examples in it.</blockquote>
<h2 data-index="7">TID</h2>
<p>TID stands for Timestamp Identifier, or in other words. It's an ID built from a timestamp in a way that is mostly guaranteed to be unique across systems. You can read about <a href="https://atproto.com/specs/tid">the details here</a>, but the important bit is to know the TID is made from two pieces of information. A clock ID that is <code>0-1023</code> and a timestamp in microseconds. Why the clock ID? Well, it's to help with the randomness. If you have two PDSs churning out records, there's a chance they may each make the same TID. So if each has their own clock ID, that won't happen. Add because it uses microseconds, it becomes even more unlikely to happen.</p>
<p>Using <a href="https://github.com/mary-ext/atcute/tree/trunk/packages/utilities/tid">@atcute/tid</a> you can see we take the current timestamp, convert it to a TID, and then convert it back to the same exact timestamp. Remember that; it will be important later.</p>
<pre><code>import * as TID from '@atcute/tid';

const rightMeow = new Date();
console.log(`It's ${rightMeow.toLocaleString()} or ${rightMeow.getTime()}`);

//TIDs timestamps are in microseconds. Padding it a bit since we don't need that precision.
const rightNowMicroSeconds = rightMeow * 1000;
//Every TID needs a clock id, can be your favorite number even.
//But make sure you use the same one if you the same TIDs from the same tiemstamps
const clockId = 23;

const rightMeowTid = TID.create(rightNowMicroSeconds, clockId);
console.log(`TID: ${rightMeowTid}`);
const { timestamp} = TID.parse(rightMeowTid);

//remove the padding
const backToMilliSeconds = timestamp / 1000;
//Get a readable timestamp for demo
const rightNowConvertedBack = new Date(backToMilliSeconds);
console.log(`Converted back: ${rightNowConvertedBack.toLocaleString()} or ${backToMilliSeconds}`);
</code></pre>
<p>May have also noticed we are adding 1000 and dividing 1000 when converting back. That's us adding padding to the timestamp that was in milliseconds to get it to microseconds. We're not really worried about colliding IDs and don't need the precision of microseconds.</p>
<h2 data-index="13">putRecord</h2>
<p>Usually, when you create a record in a user's repo you use <a href="https://docs.bsky.app/docs/api/com-atproto-repo-create-record">com.atproto.repo.createRecord</a>, but you can actually use <a href="https://docs.bsky.app/docs/api/com-atproto-repo-put-record">com.atproto.repo.putRecord</a>. With createRecord, if the PDS finds a record with the same record key, it will error, but with putRecord it will actually upsert. Probably seeing where this is going now? So in other words, if you're making a record in the collection <code>com.example.something</code> with a record key of <code>self</code> if you use createRecord, error. With putRecord it replaces the record there with what you uploaded. If the record isn't there, it creates a new one.</p>
<h2 data-index="16">All Together</h2>
<p>So now you know how to create a TID, how you can use putRecord to create a record even if it has the same key. So, that's the use case here? Well, let's say you have a data set locally. It has a create date that never changes, and you want to set that data set remotely to the user's repo. Maybe something like workouts on your phone for that day, or the last 10 listened to songs. Each of those usually has a created date that never change and you can make a TID from it, giving it a unique ID for when you do a putRecord ensuring that you are never creating multiples of the same record. The example ended up being a bit long to put here. But can check out the full one on <a href="https://tangled.org/baileytownsend.dev/upsert-example/blob/main/upsertFullExample.js#L34">this tangled repo</a> to see how this looks in code. As well as one for the <a href="https://tangled.org/baileytownsend.dev/upsert-example/blob/main/tid.js">TID code above</a>.</p>
<p>A short version of it using the workout/activity idea looks like this</p>
<pre><code>//You want to make sure this is always the same for the applications you are generating upsert tids for
//If you use the same timestamp but a different clock id, you will get different tids
const CLOCK_ID = 23;

//A list of activities that may be gotten from your phone or wherever, but you get the whole list everytime
let activities = []


//I just finished a run, it's saved to my phone, now uploading it to the PDS
activities.push({
    $type: collection,
    type: 'run',
    startTime: new Date()
})

// We go through and upsert all activities
for (const activity of activities) {

    //Creates that unique key from the startTime of the activity so we don't have duplicates
    let rKey = TID.create(activity.startTime.getTime() * 1000, CLOCK_ID);

    await ok(rpc.post('com.atproto.repo.putRecord', {
        input: {
            repo: 'baileytownsend.dev',
            collection: 'social.pace.feed.activity',
            rkey: rKey,
            record: activity,

        }
    }));
    console.log(`Uploaded activity with rkey: ${rKey}`);
}

const rkey = TID.create(activities[0].startTime.getTime() * 1000, CLOCK_ID);

const activityFromPDS = await  ok(rpc.get('com.atproto.repo.getRecord', {
    params: {
        repo: handle,
        collection,
        rkey,
    }
}));

console.log(`The PDS shows you went on a ${activityFromPDS.value.type} at ${activityFromPDS.value.startTime.toLocaleString()}.`);

//Then this would be doing the same thing as above but
//adding a new workout to activities and resyncing to the PDS again
</code></pre>
<p>Now, this is not always the best thing. You can't really use it against a large local dataset and go through 100s of putRecords. I mean it would work and would not create duplicates, but that's not really economical. This works great though if you are getting the workouts you've done that day and don't want to overwrite any. Or maybe you're an atproto music stamping service like <a href="https://teal.fm">teal.fm</a> and don't want to stamp the same song you listen to if you login to two different <a href="https://github.com/teal-fm/piper">music stamper services</a>. Another one is all those twitter to Bluesky account importers. Use the posted date of the tweet and won't have dups if you need to restart it. Or the same if you are backlogging your <a href="https://last.fm">last.fm</a> to atproto, use the played date.</p>
<blockquote data-index="22">We touched on the clock ID a bit earlier, but it is important that you use the same clock ID if you want to generate the same TID from a timestamp. If the clock ID is different, then it will be different TIDs if it's the same timestamp. I usually use <code>23</code>, it's a lucky number for me. It also has to be between <code>0-1023</code></blockquote>
<p>TIDs are pretty core atproto things. So usually if your programming language of choice has an atproto library, it can probably make TIDs from timestamps.</p>
<p>Some I know of</p>
<p>Thanks for reading! Happy hacking!</p>
<figure><img src="https://marvins-guide.leaflet.pub/api/atproto_images?did=did:plc:rnpkyqnmsw4ipey6eotbdnnf&amp;cid=bafkreidjtgxpyqja5jxygmsozxbgogqhapsss4exxaj2f25cvtad6xc7om"/></figure>
