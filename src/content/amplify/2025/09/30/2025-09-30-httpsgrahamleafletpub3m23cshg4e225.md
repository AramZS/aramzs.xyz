---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A57od6g2ic3e3b3kauctjmo3k/graham.systems/3m23cshg4e225/opengraph-image?04f9dc33b3d4fbe5
date: '2025-10-01T03:27:08.509Z'
dateFolder: 2025/09/30
description: 'Part 1: Local machine to Railway'
isBasedOn: 'https://graham.leaflet.pub/3m23cshg4e225'
link: 'https://graham.leaflet.pub/3m23cshg4e225'
slug: 2025-09-30-httpsgrahamleafletpub3m23cshg4e225
tags:
  - code
  - decentralization
title: Deploying Statusphere to Railway from Tangled
---
<p>Saw some discussion today about how to deploy Atproto apps for the less backend/DevOps-inclined. Railway seemed pretty popular, and I've been meaning to try it myself, so let's see what damage we can do.</p>
<p>The absolute easiest way to deploy your first Atproto app is by using the Railway template @samuel.bsky.team created -- it only requires a couple of clicks!</p>
<p><a data-index="2" href="https://railway.com/deploy/atproto-statusphere-app?referralCode=e99Eop">Deploy atproto statusphere app on Railway with one click, start for free. A minimal demo of an end-to-end atproto applicationhttps://railway.com/deploy/atproto-statusphere-app?referralCode=e99Eop</a></p>
<p>This is the first in a multi-part series:</p>
<p>1. Deploying statusphere-react to Railway via CLI (you're here)</p>
<p>2. Automating Railway deployments via Tangled/Spindle</p>
<h3 data-index="8">1. Clone statusphere-react</h3>
<p>You can either clone the repo as-is for this tutorial, or you can fork it and clone your fork.</p>
<p><a data-index="10" href="https://tangled.org/@samuel.bsky.team/statusphere-react">https://tangled.org/@samuel.bsky.team/statusphere-react</a></p>
<h3 data-index="12">2. Install Railway CLI</h3>
<p>Check the <a href="https://docs.railway.com/guides/cli">docs for how to install the Railway CLI for your platform</a>. For the Nix folks, <a href="https://search.nixos.org/packages?channel=25.05&amp;show=railway&amp;query=railway">there's a nixpkg</a>.</p>
<h3 data-index="15">3. Log in to Railway</h3>
<p>I'm assuming you've already gone to <a href="https://railway.app">https://railway.app</a> and made an account.</p>
<p>Navigate to your statusphere-react directory, and then run the following:</p>
<pre><code>railway login</code></pre>
<p>Check out the <a href="https://docs.railway.com/guides/cli#authenticating-with-the-cli">CLI login docs</a> if something goes wrong here.</p>
<h3 data-index="21">4. Create a new project</h3>
<p>A Project is the top-level resource for organizing your app. Run the following, and give your project a name if you like:</p>
<pre><code>railway init</code></pre>
<h3 data-index="25">5. Create a new service</h3>
<p>Next, a Service is an instance of your app. We're going to first create an empty service, so we can configure our environment variables later.</p>
<p>Run the following, and select "Empty Service" when prompted. Don't worry about setting variables, or setting a name if you don't want to:</p>
<pre><code>railway add</code></pre>
<h3 data-index="30">6. Create a domain</h3>
<p>To properly configure our OAuth client, we'll need a domain.</p>
<p>Railway makes getting a service-specific domain easy; save this value and hold on to it for later:</p>
<pre><code>railway domain</code></pre>
<h3 data-index="35">7. Set up a volume</h3>
<p>A volume ensures that our database persists between deployments and restarts.</p>
<p>Let's make one with the following command, and specify <code>/persistent</code> as the mount path when prompted:</p>
<pre><code>railway volume add</code></pre>
<h3 data-index="40">8. Set our environment variables</h3>
<p>Okay, we should have everything we need now to deploy very own statusphere.</p>
<p>We can set all of our basics at once:</p>
<pre><code>railway variables \
  --set NODE_ENV="production" \
  --set PORT="8080" \
  --set DB_PATH="../../../persistent/data.sqlite"</code></pre>
<p>We'll set our <code>COOKIE_SECRET</code> to a randomly-generated 32-character value:</p>
<pre><code>railway variables --set COOKIE_SECRET=$(openssl rand -base64 32)</code></pre>
<p>Finally, we'll set our <code>PUBLIC_URL</code> and <code>HOST</code> to that domain we generated earlier. For <code>HOST</code>, remove the protocol from the domain (<code>https://</code>). Make sure that neither value contains trailing slashes (<code>/</code>):</p>
<pre><code>railway variables \
  --set PUBLIC_URL="&lt;your url&gt;" \
  --set HOST="&lt;your url minus protocol&gt;"</code></pre>
<h3 data-index="51">9. Deploy!</h3>
<p>Okay, we should be all good to go. Running the following command will deploy our app, and follow along with the logs:</p>
<pre><code>railway up</code></pre>
<p>That wraps it all up! You should be able to navigate to your domain, sign in to your account, and watch the statuses roll in.</p>
<p>Now that we've done all the setup and heavy lifting, CI/CD on Tangled should be a breeze. I'll update this Leaflet with a link once I'm done.</p>
