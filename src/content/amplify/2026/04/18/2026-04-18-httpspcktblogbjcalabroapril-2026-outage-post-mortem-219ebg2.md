---
author: Jim's Pckt
cover_image: >-
  https://pckt-blog-media.s3.us-east-2.amazonaws.com/cover_image/ab3965c1-bb9f-49cd-9ec0-01e590a55f35/image.png
date: '2026-04-18T21:38:25.131Z'
dateFolder: 2026/04/18
description: >-
  Hey all! I'm Jim, and I do system-y things at Bluesky. I'm here to give you
  some details about what happened on Monday of this week that caused Bluesky to
  go...
isBasedOn: 'https://pckt.blog/b/jcalabro/april-2026-outage-post-mortem-219ebg2'
link: 'https://pckt.blog/b/jcalabro/april-2026-outage-post-mortem-219ebg2'
slug: 2026-04-18-httpspcktblogbjcalabroapril-2026-outage-post-mortem-219ebg2
tags:
  - code
title: April 2026 Outage Post-Mortem
---
<p>Hey all! I'm <a href="https://calabro.io/">Jim</a>, and I do system-y things at Bluesky. I'm here to give you some details about what happened on Monday of this week that caused Bluesky to go down intermittently for ~1/2 our users for about 8 hours.</p>
<p>First, I'd like to apologize to our users for the interruption in service. This is easily the worst outage we've seen in my time here. It's just not acceptable.</p>
<p>Second, if you find this work interesting, <a href="https://bsky.social/about/join">we're hiring</a>!</p>
<h2>The Problem</h2>
<p>The issue actually started earlier that weekend. Here's the Bluesky AppView's requests chart for the days leading up to the <em>really</em> bad day (Monday):</p>
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/a8e6fa85-481e-4c87-be01-ab13d205b220/image.png"/></figure>
<p>The yellow/green isn't important, but those dips are super nasty! They represent real user-facing downtime. Ouch!</p>
<p>We got a page on Saturday April 4. I took a look, thinking it was likely a transit issue. We have pretty extensive network monitoring, and it all looked clear.</p>
<p>I did, however, notice a spike in log lines like this in our AppView data backend (called the "data plane"):</p>
<pre><code>{
  "time": "2026-04-03T22:16:07.944910324Z",
  "level": "ERROR",
  "msg": "failed to set post cache item",
  "uri": "at://did:plc:mhvcx2z27zq2jtb3i7f5beb7/app.bsky.feed.post/3mim4uloar22m",
  "error": "dial tcp 127.32.0.1:0-&gt;127.0.0.1:11211: bind: address already in use"
}</code></pre>
<p>The timing of these log spikes lined up with drops in user-facing traffic, which makes sense. Our data plane <em>heavily</em> uses memcached to keep load off our main Scylla database, and if we're exhausting ports, that's a huge problem.</p>
<h2>The Root Cause</h2>
<p>It took a long time to find the actual issue due to subpar observability. We generally have <em>excellent</em> monitoring in the data plane, but it does assume that each request to it is small and doesn't do much work.</p>
<p>This particular RPC (<code>GetPostRecord</code>) takes a batch of post URIs, and looks them all up in memcached, then scylla upon cache miss. What I had missed is that we deployed a new internal service last week that sent less than three <code>GetPostRecord</code> requests per second, but it did sometimes send batches of 15-20 <em>thousand</em> URIs at a time. Typically, we'd probably be doing between 1-50 post lookups per request.</p>
<p>Every RPC handler in the data plane does bounded concurrency (i.e. <a href="https://pkg.go.dev/golang.org/x/sync/errgroup#Group.SetLimit">errgroup.SetLimit</a>). However, this endpoint did not! It was the only endpoint in the entire system that was missing it.</p>
<p>That means that we'd launch 15-20 thousand goroutines for the request, slam the daylights out of memcached by dialing a ton of connections, then close and return them to the OS since our max idle conn pool size was 1000. They would build up in the <a href="https://upload.wikimedia.org/wikipedia/commons/f/f6/Tcp_state_diagram_fixed_new.svg">TCP TIME_WAIT</a> state, and exhaust all available ports.</p>
<p>The go code looks like this:</p>
<pre><code>func GetPostRecords(uris []string) ([]*Post, error) {
    posts := make([]*Post, len(uris))

    var group errgroup.Group
    // group.SetLimit(50) &lt;-- this was the critical missing line!

    for ndx, uri := range uris {
        group.Go(func() error {
            post, err := memcache.GetPost(uri)
            if err != nil {
                return err
            }
            if post != nil {
                posts[ndx] = post
                return nil
            }

            post, err = scylla.GetPost(uri)
            if err != nil {
                return err
            }
            if post != nil {
                posts[ndx] = post
                return nil
            }

            return nil
        })
    }

    if err := group.Wait(); err != nil {
        return nil, err
    }

    return posts, nil
}</code></pre>
<p>Youch! We saw pretty much right away that we were exhausting ports but had no idea what the root cause was. There are lots of places where we use memcached, and I specifically pulled out that one JSON log line because it specifies that it was an issue with the post cache. We also have a user cache, interaction counts cache, and many more. We saw error logs from all cache types (which makes sense since all memcached behavior was impacted), so it was not at all clear right away that it was an issue with <code>GetPostRecord</code>.</p>
<p>Also note that the new internal service runs in only one of our data centers at present, which is why we only saw that site having issues. That definitely contributed to the confusion since we didn't have metrics per-client in the data plane.</p>
<h2>Death Spiral</h2>
<p>We didn't find and fix this issue until Wednesday of this week, even though service was stabilized on Monday. So what did we do in the meantime to stop the bleeding?</p>
<p>I spent most of Saturday and Sunday chasing this down and still not finding the root cause, and service was hobbling along poorly, but surviving. Then, Monday, something tripped. It turns out that we put ourselves in a death spiral! This negative feedback loop is what caused the massive outages on Monday.</p>
<p>It turns outl, whenever we get an error from memcache, we log it. We do a couple million requests a second to our memcached instances, and so we were attempting to do millions of logs per second.</p>
<p><a href="https://github.com/golang/go/blob/0e31741044d519065f62a5e96499909d6cd230dc/src/internal/poll/fd_unix.go#L374">Logging in go</a> uses the blocking <a href="https://man7.org/linux/man-pages/man2/write.2.html">write(2)</a> syscall. This huge number of blocking syscalls coupled with our attempt to continue to serve millions of requests a second caused the go runtime to spawn many more OS threads (M's in <a href="https://ashutoshkumars1ngh.medium.com/golang-deepdive-architecture-and-internals-cc2021a83962">go parlance</a>). It was roughly 10x more Ms' than compared to the healthy baseline (150 vs 1500).</p>
<p>That larger batch of M's was in turn putting pressure on the garbage collector:</p>
<figure><img alt="image.png" src="https://pckt-blog-media.s3.us-east-2.amazonaws.com/images/8ae24c29-6eca-43a7-a128-4d1a87e0d42f/image.png"/></figure>
<p>Those massive pauses in stop-the-world GC duration meant requests were stalling.</p>
<p>Couple that with the fact that we had some <em>very</em> aggressively tuned <a href="https://go.dev/doc/gc-guide#GOGC">GOGC</a> and <a href="https://go.dev/doc/gc-guide#Memory_limit">GOMEMLIMIT</a> environment variable values and memory limits meant that our data plane was actually OOM'ing every so often! That's why the service was working for like 30 minutes, then down for a while, then would come back for a bit, and repeat.</p>
<p>OOMs are obviously bad (we should have zero of them), but they're ordinarily not that big a deal. However, the fact that the memcached connection pools were already tool saturated meant that when the data plane was restarted, it couldn't create new memcached connections when it came up since those existing connections were stuck in <code>TIME_WAIT</code>, which resulted in even more port exhaustion issues. Death spiral!</p>
<p>The band-aid fix was insane but did the job. This is how we actually fixed the outage on Monday, before we found the true root cause:</p>
<p>That got us out of the death loop because it expands the client ip+port space. Crazy, but effective! We removed this once we fixed the true root.</p>
<h2>Summary</h2>
<p>In my <a href="https://www.youtube.com/watch?v=2T15FAihJCA">recent talk</a>, I mentioned that you should add extensive observability <em>before</em> you have an outage. We do have a lot, but it's never enough! We need to add per-client o11y as well as get better metrics on when clients send small numbers of large requests.</p>
<p>It was all buried in there, but it was hard to know where to look when so much was falling over all at once. You need to have the mental discipline and high granularity in your metrics to be able to cut through the noise to find the real root cause. It's hard work!</p>
<p>Also, logging too much isn't great. Logging here and there is fine, but I'd prefer to do prometheus metrics or OTEL tracing since they're better designed for high-scale systems.</p>
<p>Finally, apologies again for the extensive interruption in service. The team and I take our operations extremely seriously, and this was a really bad day.</p>
<p>EDIT: Also, the status page said this was an issue with a 3rd party provider. It was clearly not, apologies for that miscommunication! At the time I posted that status page update, I was looking at some traceroutes that indicated some pretty substantial packet loss from a cloud provider to our data center, but those were not the root cause of the issue.</p>
