---
author: "B. Prendergast \U0001F44B"
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253As2rczyxit2v5vzedxqs326ri/3m2jpv5avx22n/3m56tzfj5pc2a/opengraph-image?04f9dc33b3d4fbe5
date: '2026-04-08T02:28:16.728Z'
dateFolder: 2026/04/07
description: 'It''s easy peasy, don''t be scared! '
isBasedOn: 'https://wecanjustdothings.leaflet.pub/3m56tzfj5pc2a'
link: 'https://wecanjustdothings.leaflet.pub/3m56tzfj5pc2a'
slug: 2026-04-07-httpswecanjustdothingsleafletpub3m56tzfj5pc2a
tags:
  - tech
  - decentralization
title: >-
  Using your AT proto stuff in your other web stuff: A guide for ATstronauts who
  want to just do stuff...
---
<figure><img src="https://wecanjustdothings.leaflet.pub/api/atproto_images?did=did:plc:s2rczyxit2v5vzedxqs326ri&amp;cid=bafkreiacfnw7d4xyrye3ey36qpzahprnqi6fdbrsfee6ypc7vdfe5zaxn4"/></figure>
<p>I'm rebuilding my own personal site at <a href="http://renderg.host">renderg.host</a> as a learning project—a simple React site where I can control everything, without depending on increasingly expensive locked-in platforms.</p>
<p>I was a happy Webflow+Wordpress user for a while. As someone still learning web dev, the builder UX is genuinely great, but their pricing? Not so much.</p>
<p>This week, as I considered my CMS options (like <a href="https://ghost.org/">Ghost</a> and <a href="https://strapi.io/">Strapi</a>), I had an epiphany: I'm already publishing to multiple publications on <a href="https://leaflet.pub">Leaflet</a>. Why waste time replicating it? Why not connect all my stuff together? <a href="https://atproto.com/">AT Protocol</a> provides everything I need—for free—and I retain full ownership and control of my stuff.</p>
<p>No vendor lock-in, no proprietary formats, no surprise pricing changes, just my stuff living in my <a href="https://atproto.com/guides/glossary#data-repo">data repo</a> (hosted for now on Bluesky's <a href="https://atproto.com/guides/glossary#pds-personal-data-server">PDS</a>).</p>
<p>So rather than worry about if I could or should, I remembered <a href="https://underreacted.leaflet.pub/3m23gqakbqs2j">I can just do things</a> and gave it a shot! It's going really well so far.</p>
<h2 data-index="8">🔔 Disclaimer: I am not an engineer!</h2>
<p>I am a copypasta web dev at best, so forgive me if when I misuse phrases or misunderstand concepts here. I mostly don't know what I'm doing and am just trying things, often for the first time. And I want to encourage you to do this too—that's kinda the point of this post—try, and see what happens!</p>
<h2 data-index="11">What I made.</h2>
<p>When readers visit the articles page on my site, they'll see content fetched in real-time from records stored in my data repo.</p>
<figure><img alt="A screenshot of website in development, with the Leaflet articles embedded, read directly from the PDS " src="https://wecanjustdothings.leaflet.pub/api/atproto_images?did=did:plc:s2rczyxit2v5vzedxqs326ri&amp;cid=bafkreiawoetizhqdk7uvxy5bo36id2s7sztgzedz4vige4i74lade5rvii"/><figcaption>A screenshot of website in development, with the Leaflet articles embedded, read directly from the PDS</figcaption></figure>
<figure><img alt='A screenshot of my Leaflet publication called "Measuring" with a selection of posts.' src="https://wecanjustdothings.leaflet.pub/api/atproto_images?did=did:plc:s2rczyxit2v5vzedxqs326ri&amp;cid=bafkreicyaoh5uw2pebvblcxrn6nkx67ujw25dk7nixid7cuwzgr3ljeh6m"/><figcaption>A screenshot of my Leaflet publication called "Measuring" with a selection of posts.</figcaption></figure>
<figure><img alt='A screenshot of my Leaflet publication called "Marginalia" with a selection of posts.' src="https://wecanjustdothings.leaflet.pub/api/atproto_images?did=did:plc:s2rczyxit2v5vzedxqs326ri&amp;cid=bafkreic4jpyxnoq4xdlqykwx73hxokdboxbngdugn6vix76vvcgtyeyj2e"/><figcaption>A screenshot of my Leaflet publication called "Marginalia" with a selection of posts.</figcaption></figure>
<p>I can write articles on <a href="https://leaflet.pub">Leaflet</a>, and they automatically appear on my site. Leaflet is essentially my CMS, even though it wasn't designed to do this and has no features specifically for <a href="https://www.freecodecamp.org/news/what-is-headless-cms-explained/">headlessness</a>.</p>
<p>And, it's surprisingly straightforward—no complicated backend, no database, no API keys, just simple HTTP requests to public endpoints.</p>
<p>Because everything lives in my data repo, I could switch to any other AT Proto compatible hosting tomorrow and nothing (or so they tell me) would break 🤞.</p>
<h2 data-index="21">The Setup</h2>
<p>AT Protocol uses something called <a href="https://atproto.com/guides/glossary#xrpc">XRPC</a> to let you query data from any PDS. You don't need authentication for public data—just construct the right URL and fetch away.</p>
<p>First, I declare my <a href="https://atproto.com/guides/glossary#did-decentralized-id">DID</a> (personal identifier) and <a href="https://atproto.com/guides/glossary#pds-personal-data-server">PDS</a> location, and the <a href="https://atproto.com/guides/glossary#collection">collections</a> I want to reference.</p>
<pre><code>export const ATPROTO_CONFIG = {
  DID: 'did:plc:s2rczyxit2v5vzedxqs326ri',
  PDS_URL: 'https://rooter.us-west.host.bsky.network',
  CDN_URL: 'https://cdn.bsky.app',
} as const;

export const ATPROTO_COLLECTIONS = {
  PUBLICATION: 'pub.leaflet.publication',
  DOCUMENT: 'pub.leaflet.document',
} as const;
</code></pre>
<p>Then, to fetch <a href="https://atproto.com/guides/glossary#record">records</a>, I had to build XRPC URLs for fetching records from collections, and <a href="https://atproto.com/guides/glossary#blob">blobs</a> of binary data (like images):</p>
<pre><code>export function buildRecordsUrl(collection: string, repo: string = ATPROTO_CONFIG.DID): string {
  return `${ATPROTO_CONFIG.PDS_URL}/xrpc/com.atproto.repo.listRecords?repo=${repo}&amp;collection=${collection}`;
}

export function buildBlobUrl(blobRef: string, did: string = ATPROTO_CONFIG.DID): string {
  return `${ATPROTO_CONFIG.CDN_URL}/img/avatar/plain/${did}/${blobRef}@jpeg`;
}</code></pre>
<h2 data-index="31">Defining the Types</h2>
<p>Before fetching anything, I needed to define some types that match AT Protocol's data structures. This is where things got really real. Painful, but like, that fun pain!</p>
<pre><code>export interface ATProtocolBlob {
  $type: 'blob';
  ref: {
    $link: string;
  };
  mimeType: string;
  size: number;
}

export interface ATProtocolRecord&lt;T = unknown&gt; {
  uri: string;
  cid: string;
  value: T;
}

export interface PublicationValue {
  name: string;
  base_path: string;
  icon?: ATProtocolBlob;
  description?: string;
  $type: string;
}

export interface DocumentValue {
  title: string;
  description?: string;
  publishedAt: string;
  publication: string;
  $type: string;
}

export type ATProtocolPublication = ATProtocolRecord&lt;PublicationValue&gt;;
export type ATProtocolDocument = ATProtocolRecord&lt;DocumentValue&gt;;
</code></pre>
<p>This keeps my hooks consistent—they all return data, loading state, and potential errors in the same shape.</p>
<p>The types were crucial for understanding what I was actually fetching. Looking at <code>PublicationValue</code>, I can see that publications have a <code>base_path</code> and an optional <code>icon</code>. Documents reference their publication by URI and include a <code>publishedAt</code> timestamp. Once I had these types defined, everything else kinda clicked into place.</p>
<h2 data-index="41">Fetching the Data</h2>
<p>I also created a generic <a href="https://www.w3schools.com/react/react_hooks.asp">hook</a> that can fetch records from any collection.</p>
<pre><code>  const [data, setData] = useState&lt;ATProtocolRecord&lt;T&gt;[] | null&gt;(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState&lt;string | null&gt;(null);

  useEffect(() =&gt; {
        const fetchRecords = async () =&gt; {
            try {
                const url = buildRecordsUrl(collection);
        const response = await fetch(url);
        const data = await response.json();
        setData(data.records);
      } catch (err) {
                setError(err.message);
      } finally {
                setLoading(false);
      }
    };
    fetchRecords();
  }, [collection]);

  return { data, loading, error };
}
</code></pre>
<p>Here's where it got interesting! Leaflet articles reference their Leaflet publication by <a href="https://atproto.com/specs/at-uri-scheme">URI</a>, so I needed to fetch multiple collections, squish them together, and do a little transformation.</p>
<p>This is specific to me using Leaflet as my CMS and you may have to do this differently for other sources.</p>
<pre><code>export function fetchPublications(): FetchResult&lt;Document[]&gt; {
  const { data: publicationsData } = fetchRecords(ATPROTO_COLLECTIONS.PUBLICATION);
  const { data: documentsData } = fetchRecords(ATPROTO_COLLECTIONS.DOCUMENT);

  useEffect(() =&gt; {
    // Create a lookup map of publications
    const publicationMap = new Map();
    publicationsData.forEach((record) =&gt; {
      publicationMap.set(record.uri, {
        name: record.value.name,
        basePath: record.value.base_path,
        icon: record.value.icon ? buildBlobUrl(record.value.icon.ref.$link) : undefined,
      });
    });

    // Match documents with their publications
    const documents = documentsData
      .map((record) =&gt; {
        const publication = publicationMap.get(record.value.publication);
        return {
          title: record.value.title,
          description: record.value.description,
          publishedAt: record.value.publishedAt,
          articleUrl: `https://${publication.basePath}/${slug}`,
          publication,
        };
      })
      .sort((a, b) =&gt; new Date(b.publishedAt) - new Date(a.publishedAt));

    setData(documents);
  }, [publicationsData, documentsData]);

  return { data, loading, error };
}</code></pre>
<h2 data-index="50">Using it in components</h2>
<p>Now, using it in pages is dead simple. Here's a simplified example of how I use it on the <a href="https://tangled.org/@renderg.host/renderghost/blob/main/src/pages/WritingPage.tsx">writing page</a> on my site, wiring it into a dedicated card component.</p>
<pre><code>export default function WritingPage() {
  const { data: documents, loading, error } = fetchPublications();
  if (loading) return &lt;div&gt;Loading posts...&lt;/div&gt;;
  if (error) return &lt;div&gt;Error: {error}&lt;/div&gt;;

  return (
    &lt;div&gt;
      {documents.map((doc) =&gt; (
        &lt;CardArticle
          key={doc.uri}
          article={{
            title: doc.title,
            subtitle: doc.description,
            articleUrl: doc.articleUrl,
            publication: doc.publication.name,
            published: doc.publishedAt,
          }}
        /&gt;
      ))}
    &lt;/div&gt;
  );
}</code></pre>
<h2 data-index="55">That's it...kinda!</h2>
<p>No API keys, no auth flow, no schemas to maintain. Just fetch and render! Maybe there's a better way, but for now, this gives me what I want.</p>
<p>Do look at the repo as I skimmed a lot for the sake of brevity in this post which is already quite long.</p>
<p>My content lives on my PDS. If Leaflet disappeared tomorrow (it won't 💚 but hypothetically), I could switch to any other AT Protocol publishing tool or build my own.</p>
<p>I'm not paying $20-50 a month for a headless CMS. My PDS hosts my content, and reading from it is free. Also, I'm not using any of Leaflet's resources.</p>
<p>Because it's all AT Protocol, my writing could theoretically show up in any compatible app. It's genuinely portable in a way that CMS-locked content never is.</p>
<p>Building this taught me way more about web protocols and data fetching than I would have learned using an off-the-shelf CMS.</p>
<p>I decide how to use my stuff. No fighting with a another company's opinions about how things should work for me.</p>
<p>It's read-only so I have to write on Leaflet, not in my own admin panel. There's no caching layer (yet) so every page load hits the PDS. For my low-traffic personal site, this is absolutely fine. If my PDS goes down, so does my writing page. I guess the same is true of any 3rd party CMS (<a href="https://futurism.com/future-society/amazon-aws-internet-down">especially if it's hosted on AWS amirite</a> 👹).</p>
<p>I needed to do a LOT of work to understand data structures: It's definitely not as plug-and-play as a traditional CMS.</p>
<p>For me, these trade-offs are totally worth it and it was fun to get through it all.</p>
<h2 data-index="77">Could You Do This?</h2>
<p>The AT Protocol documentation is excellent, and the community is incredibly helpful! Use AI if you need to. You don't need to be a professional or expert—I'm not.</p>
<p>Push things forwards and try stuff out!</p>
