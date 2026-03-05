---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253Acbkjy5n7bk3ax2wplmtjofq2/3lqpqvbdoas2z/3mgal3seass2q/opengraph-image?e2bb7203df6d3028
date: '2026-03-04T17:46:24.258Z'
dateFolder: 2026/03/04
description: >-
  Record elicitation is a pattern where a client asks an AppView to construct a
  record from the user's intent, rather than building it locally. This lets the
  AppView handle business logic, validation, and schema complexity while the
  client retains full authority over what gets written to the user's repository.
isBasedOn: 'https://ngerakines.leaflet.pub/3mgal3seass2q'
link: 'https://ngerakines.leaflet.pub/3mgal3seass2q'
slug: 2026-03-04-httpsngerakinesleafletpub3mgal3seass2q
tags:
  - tech
  - decentralization
title: 'ATProtocol Patterns: Record Elicitation'
---
<p>Record elicitation is a pattern where a client asks an AppView to construct a record from the user's intent, rather than building it locally. This lets the AppView handle business logic, validation, and schema complexity while the client retains full authority over what gets written to the user's repository.</p>
<p>In ATProtocol, users have full control over writing records. Only an authenticated client, using OAuth or an app-password session, can write records to a repository on a PDS. This is intentional. Only a user working directly with a client can authorize these actions.</p>
<p>So, let’s think about what happens when a user wants to do something important, like creating an event, purchasing a ticket, or creating mixed content, using a specific AppView.</p>
<p>How can a client show that it is using a specific AppView? If the client creates a record by itself, there is no proof that the user was working with a particular service. The record simply appears in the repo, and all AppViews see it the same way. For things like ticketing, attestations, or moderation, the client needs a way to show that a certain service was involved when the record was made.</p>
<p>How can a client make sure it prepares data correctly? Lexicon schemas define the structure of a record, but they do not cover every rule an AppView might have. For example, a lexicon schema might declare a field is a string, but the AppView might expect a specific formatted value or a reference to something in its own state. This leaves the client guessing or depending on documentation that might not be up to date.</p>
<p>How can a client handle business logic that only the server knows? Some fields in a record depend on information only the AppView has, like transaction identifiers, sequence numbers, calculated references, timestamps from the service, or values from the AppView’s own indexes. The client cannot fill in what it does not know.</p>
<p>How can a client make sure it uses the latest fields, validation, and schema? Schemas change over time. An AppView might add new fields, remove old ones, or make validation stricter. If a client builds records based on an old version of the schema, it might create records that are technically valid but outdated—missing new fields or not matching how the service now handles data.</p>
<h2 data-index="6">The Two Paths</h2>
<p>Currently, when a client app wants to create a record, it builds it itself and writes it directly to the PDS. The client must know the lexicon, understand what the AppView expects, and correctly fill in every field. This approach works well for simple cases, like creating a post or updating a profile, where all the content comes from user input and the schema defines the rules.</p>
<p>The second path is record elicitation.</p>
<p>Instead of building the record itself, the client calls an XRPC method on the AppView and sends the user’s intent as parameters. The AppView handles these parameters by applying its business logic, checking its own state, and adding any needed values. It then returns a complete record, which the client publishes to the user’s PDS.</p>
<p>The user’s client is still the only one that writes records, so the authority model stays intact. However, the AppView has helped build the record, and both the client and the service are aware of this.</p>
<h2 data-index="11">How It Works</h2>
<p>Here’s how the process works:</p>
<ul><li><p data-index="13.2">The AppView applies its logic and returns a record (or an error explaining why the record can’t be created).</p> </li></ul>
<p>Step 4 is important. Since the client is still in control, it can review the record before publishing. This adds transparency, letting the user see exactly what will be written to their repo, even if they did not create it field by field.</p>
<h3 data-index="15">A Concrete Example: Smoke Signal Events</h3>
<p>To make this tangible, consider <a href="https://smokesignal.events/">Smoke Signal</a>, an event and RSVP management platform. On Smoke Signal, you can create an event today either by submitting the form parts to <code>POST /event</code> through the web interface or by creating the event record yourself.</p>
<p>Events can be complex. The event body might include mentions, links, and hashtags that need to be turned into facets. Managing start and end times is tricky, with issues like timezones, daylight saving changes, multi-day events, and differences between all-day and timed events. Adding locations makes things even more complicated, with geocoding, address fields, and venue references.</p>
<p>A client that tries to build an event record from scratch has to handle all these details. It must parse rich text into facets, manage date and time formats, and know how location data is structured. This leads to a lot of repeated logic in every client that creates events, increasing the risk of subtle bugs.</p>
<p>This is where record elicitation is especially useful. By adding a method like <code>events.smokesignal.calendar.createEventIntent</code>, we can handle all that complexity at once. A simple version is a query XRPC endpoint that takes flat key/value arguments. A client would use it like this:</p>
<pre><code>GET /xrpc/events.smokesignal.calendar.createEventIntent
    ?name=Party
    &amp;description=Party+at+Nick%27s+house%2C+bring+your+https%3A%2F%2Fshakoolie.com%2F
    &amp;startsAt=2026-03-14T18:00
    &amp;location=123+Main+St%2C+Dayton+OH</code></pre>
<p>The client then gets back a complete record, ready to publish. The description is parsed into structured facets (with the Shakoolie link extracted and annotated), the date and time are normalized and checked, and the location is geocoded and formatted according to Smoke Signal’s schema.</p>
<p>The client did not need to know how to parse facets, use a timezone library, or have a geocoding API key. It just sent the user’s intent as simple parameters, and the AppView, which defines what a valid event record looks like, returned the correct version.</p>
<p>After that, the client reviews the record, shows it to the user, and writes it to their PDS. Smoke Signal receives it, recognizes it as a valid event, and indexes it right away. There is no confusion, no hidden validation errors, and no missing fields.</p>
<h3 data-index="24">Blobs and Complex Record Sets</h3>
<p>The Smoke Signal example uses a simple query with flat parameters, which is good for showing the pattern. But record elicitation can do more. What if records include blobs? Or what if creating one user action needs several records and multiple blob uploads?</p>
<p>Most lexicons today use JSON for input and output, but that is not required. An XRPC method can use any encoding it needs, including multipart data.</p>
<p>Let’s build a hypothetical <code>app.bsky.feed.createPostIntent</code> XRPC procedure that accepts multipart data and returns multipart data.</p>
<p>The request is a multipart body. The first segment is a JSON (or form-encoded) part containing the post parameters like <code>text=Hello World!</code>. The subsequent segments are the media attachments: images the user wants to include with the post.</p>
<pre><code>POST /xrpc/app.bsky.feed.createPostIntent
Content-Type: multipart/form-data; boundary=----intent

------intent
Content-Disposition: form-data; name="params"
Content-Type: application/json

{"text": "Hello World! Check out this view from the summit."}
------intent
Content-Disposition: form-data; name="image"; filename="summit.jpg"
Content-Type: image/jpeg

&lt;raw image bytes&gt;
------intent--</code></pre>
<p>For example, <code>did:web:api.blacksky.community#bsky_appview</code> might have specific requirements for images, such as maximum dimensions, preferred aspect ratios, or file-size limits. It might generate resized versions or run the image through a classifier to suggest labels for the user before publishing. The AppView has the tools and context to make these decisions, so the client does not need to duplicate that logic.</p>
<p>The response is also a multipart body. Each part describes itself using its <code>Content-Disposition</code> name. Record parts use the format collection/rkey, like app.bsky.feed.post/3mgaivrllyc2z, so the client knows where to write them. Blob parts use <code>CID</code>, which refers to the content hash in the record’s embed.</p>
<pre><code>HTTP/1.1 200 OK
Content-Type: multipart/form-data; boundary=----b01KJWMJJ1VCM2WTW0Q5BHYJVE7

------b01KJWMJJ1VCM2WTW0Q5BHYJVE7
Content-Disposition: form-data; name="app.bsky.feed.post/3mgaivrllyc2z"
Content-Type: application/json

{
    "text": "This is the same energy as requiring your email to read an article or mandating that you disable ad blockers. I will never use your service if your core proof of value is spamming the atmosphere.",
    "$type": "app.bsky.feed.post",
    "embed": {
        "$type": "app.bsky.embed.images",
        "images": [
            {
                "alt": "",
                "image": {
                    "$type": "blob",
                    "ref": {
                        "$link": "bafkreiebnynqipchdckmd3mx5ogioffe4in7t7rpbqc73km2semyy7zkcy"
                    },
                    "mimeType": "image/jpeg",
                    "size": 370888
                },
                "aspectRatio": {
                    "width": 617,
                    "height": 959
                }
            }
        ]
    },
    "langs": [
        "en"
    ],
    "createdAt": "2026-03-04T14:34:25.451Z"
}
------b01KJWMJJ1VCM2WTW0Q5BHYJVE7
Content-Disposition: form-data; name="bafkreiebnynqipchdckmd3mx5ogioffe4in7t7rpbqc73km2semyy7zkcy"
Content-Type: image/jpeg

&lt;processed image bytes&gt;
------b01KJWMJJ1VCM2WTW0Q5BHYJVE7--</code></pre>
<p>Now the client’s job is much easier. It gets the response, goes through the parts, uploads the blobs to the user’s PDS, and writes the records. That is all. The client does not need an image processing library, does not need to know the AppView’s preferred dimensions, and does not have to handle EXIF stripping or format conversion. The part names provide all the information needed for writing.</p>
<p>This pattern works for even more complex situations. An elicitation endpoint can return several record parts, like a post and a threadgate, a list item and a metadata update, or an event and a set of invite records. Each part has its own <code>collection/rkey</code> name. The client can process the whole group at once using <code>com.atproto.repo.applyWrites</code>.</p>
<h2 data-index="35">What This Enables</h2>
<p>Record elicitation opens up patterns that are difficult or impossible with client-only composition.</p>
<p>Service-attested records. The AppView can embed a signature in the record that proves it was involved in construction. Other consumers of the record can verify this. This is useful for ticketing, attestations, or any context where provenance matters beyond “a user wrote this.”</p>
<p>Server-side validation before write. Rather than the client writing a record and hoping the AppView accepts it, the AppView validates upfront. If a field references an entity that doesn’t exist in the AppView’s index, or if a business rule would be violated, the error surfaces before the record hits the repo.</p>
<p>Computed and derived fields. Sequence numbers, canonical references, content-addressed identifiers, timestamps from the service’s clock - any value that depends on server-side state can be populated by the entity that actually has that state.</p>
<p>Schema evolution without client churn. When an AppView adds optional fields or changes how certain values should be populated, the elicitation endpoint absorbs that complexity. Clients pass intent; the service handles the rest. This reduces the coordination cost of evolving record schemas across a diverse client ecosystem.</p>
<p>Multi-step workflows. The elicitation call doesn’t have to be a single round trip. An AppView could return a partial record along with a set of choices the client needs to present to the user, leading to a interactive flow that progressively builds the record.</p>
<h2 data-index="42">Where This Fits</h2>
<p>I call this pattern “record elicitation” because the client asks the service for a record based on the user’s intent, rather than building it themselves. You could also call it “record intent,” where the client shares what the user wants to do, and the service turns that into a real record. Both names capture the main idea: the user’s intent flows from the client to the service, and a ready-to-publish record is returned.</p>
<p>Record elicitation does not replace direct record composition. For simple records and most cases, it is easier for the client to build them locally. But as ATProtocol apps become more complex, with more business logic, cross-service links, and stronger proof of origin, the gap between what the client knows and what the record needs will grow. Record elicitation helps close that gap while keeping the key feature of ATProtocol: the user’s client is always in control.</p>
