---
author: distributed.press
cover_image: null
date: '2025-07-03T03:42:07.000Z'
dateFolder: 2025/07/02
description: >-
  What happens when you publish a site to Distributed Press? When you upload
  content to a site on Distributed Press, the server first extracts the files to
  a temporary folder on the server. Then, the server looks up the associated
  configuration for the site.
isBasedOn: 'https://docs.distributed.press/overview/'
link: 'https://docs.distributed.press/overview/'
slug: 2025-07-02-httpsdocsdistributedpressoverview
tags:
  - code
  - tech
  - decentralization
title: Technical Overview
---
<h2>What happens when you publish a site to Distributed Press?</h2>
<p>When you <a href="https://docs.distributed.press/api-reference/site/#uploading-content-to-a-site">upload content to a site</a> on Distributed Press, the server first extracts the files to a temporary folder on the server.</p>
<p>Then, the server looks up the associated configuration for the site. It figures out what protocols the user has indicated interest in publishing to and then kicks off sync tasks for the enabled protocols.</p>
<h3>IPFS</h3>
<p>For IPFS, the associated logic is <a href="https://github.com/hyphacoop/api.distributed.press/blob/main/protocols/ipfs.ts">in this file</a>. The main things you need to know is that Distributed Press keeps a long-running <a href="https://helia.io/">helia</a> instance that is spun-up when Distributed Press starts up. This connection is managed by <code>js-ipfsd-ctl</code>.</p>
<p>We then copy the files to an IPFS <a href="https://docs.ipfs.tech/concepts/file-systems/">Mutable File System (MFS)</a> and publish it to IPFS. When finished, this returns us a CID. We update the IPNS entry for the site ID to this resulting CID.</p>
<p>This CID and accompanying IPNS entry is used to populate <a href="https://docs.distributed.press/api-reference/site#getting-the-information-of-site">the <code>links</code> section</a>:</p>
<pre data-language="typescript" data-theme="default"><code data-language="typescript" data-theme="default">type IPFSLinks = {
"gateway": string,
"cid": string,
"pubKey": string,
"dnslink": string,
"enabled": boolean,

</code></pre>
<p>Normally, this information is provided after you publish changes to a site. If you use the <a href="https://docs.distributed.press/deployment/github-actions/">GitHub action</a>, this is printed to the console in the Action run under the "Publish to Distributed Press" step.</p>
<h3>Holepunch</h3>
<p>The associated logic for Holepunch is <a href="https://github.com/hyphacoop/api.distributed.press/blob/main/protocols/hyper.ts">in this file</a>. Holepunch similarly uses <a href="https://www.npmjs.com/package/localdrive"><code>localdrive</code></a> which offers a mutable file system API that is similar to Hyperdrive.</p>
<p>We create a drive for each site and then copy the files into it. This is done through <code>localdrive</code> as it has a feature to mirror files from your filesystem to the drive.</p>
<p>When finished, we get the drive URL and similarly populate the <code>links</code> section:</p>
<pre data-language="typescript" data-theme="default"><code data-language="typescript" data-theme="default">
"gateway": string,

"dnslink": string,


</code></pre>
<h3>Wrapping up</h3>
<p>We block the async function from returning until all protocols finish publishing. Due to some optimizations we've done on both the IPFS and Holepunch sides, this process usually takes less than 5 seconds for the average site.</p>
<h2>What happens when you view a site?</h2>
<h3>Over a Gateway</h3>
<p>The user visits <code>docs.distributed.press</code> in their browser.</p>
<p>Their browser queries DNS for where to find the actual content for this domain.</p>
<pre data-language="bash" data-theme="default"><code data-language="bash" data-theme="default">❯ dig docs.distributed.press A
 

docs.distributed.press.                       600   IN	CNAME   docs-distributed-press.ipns.ipfs.hypha.coop.
docs-distributed-press.ipns.ipfs.hypha.coop.  300   IN  CNAME   ipfs.prod.hypha.coop.
ipfs.prod.hypha.coop.                         300   IN  A       104.245.147.222</code></pre>
<p>Then, the browser makes a request to that last IP address <code>104.245.147.222</code>. The gateway handles this request and notices that it is requesting the <a href="https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-services">IPNS service using the DNSLink resolution style</a>.</p>
<p>The gateway makes another query to DNS to figure out what the associated CID is for the domain using <a href="https://dnslink.dev/">DNSLink</a>.</p>
<p>The node gets this response and looks up the associated CID for the appropriate protocol (IPFS in this case). If it has this CID, it will respond with the content directly. If it doesn't, it attempts to retrieve it from the network and respond with the content.</p>
<h3>Over NGINX</h3>
<p>The user visits <code>docs.distributed.press</code> in their browser.</p>
<p>Their browser queries DNS for where to find the actual content for this domain.</p>
<p>The browser visits <code>198.50.215.13</code> and NGINX serves the files directly back to the browser.</p>
<h3>Using a distributed-web-friendly browser</h3>
<p>The user visits <code>docs.distributed.press</code> in their browser.</p>
<p>Browsers like Brave and Opera run their own IPFS and/or Holepunch nodes locally and thus will first try finding the content via these nodes before reaching out over regular HTTP. The browser tells the node to make a query to DNS to figure out what the associated CID is for the domain using <a href="https://dnslink.dev/">DNSLink</a>.</p>
<p>What the browser does here is pretty much identical to the <a href="https://docs.distributed.press/overview/#over-a-gateway">gateway steps detailed above</a>.</p>
