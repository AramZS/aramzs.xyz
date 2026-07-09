---
author: Jeff Hickman
cover_image: >-
  https://cdn.thenewstack.io/media/2026/07/12886340-philip-oroni-mtjfwskmra0-unsplash.jpg
date: '2026-07-07T12:50:58.385Z'
dateFolder: 2026/07/07
description: >-
  Social logins run on dying cookies. FedCM is the browser-native alternative
  built to protect privacy and boost your site's conversions.
isBasedOn: >-
  https://thenewstack.io/fedcm-federated-login-standard/?link_source=ta_bluesky_link&taid=6a480a555db5d30001164c33
link: >-
  https://thenewstack.io/fedcm-federated-login-standard/?link_source=ta_bluesky_link&taid=6a480a555db5d30001164c33
slug: >-
  2026-07-07-httpsthenewstackiofedcm-federated-login-standardlinksourcetablueskylinkandtaid6a480a555db5d30001164c33
tags:
  - tech
title: Your social login buttons run on third-party cookies. FedCM doesn’t.
---
<figure><img alt="Featued image for: Your social login buttons run on third-party cookies. FedCM doesn’t." src="https://cdn.thenewstack.io/media/2026/07/12886340-philip-oroni-mtjfwskmra0-unsplash-1024x576.jpg"/><figcaption>Philip Oroni for Unsplash+</figcaption></figure>
<p>“Sign in with Google” and “Continue with Apple” have carried federated login for more than a decade. They strip away onboarding friction, kill password fatigue, and turn anonymous traffic into accounts, which is why they sit on nearly every consumer signup page. The machinery underneath them is the problem.</p>
<p>Those buttons run on third-party cookies. The legacy social login flow relies on the exact cross-domain mechanism that privacy regulators have spent years trying to shut down.</p>
<blockquote> <p>“The legacy social login flow relies on the exact cross-domain mechanism that privacy regulators have spent years trying to shut down.”</p> </blockquote>
<p>Safari has blocked third-party cookies by default since 2020 (Intelligent Tracking Prevention) and Firefox since 2019 (Enhanced Tracking Protection), which already puts roughly half the web in a cookieless state.</p>
<p>Chrome is the messier story: Google walked back <a href="https://thenewstack.io/google-and-the-future-of-online-privacy-moving-beyond-third-party-cookies/">its forced deprecation</a> in 2024 and moved to a user-choice model instead of flipping a switch, so the “cookie-pocalypse” deadline everyone built roadmaps around never actually arrived. Do not read that as a reprieve. Two major engines are blocked by default; Chrome’s Incognito is blocked by default; ad blockers and consent fatigue keep climbing; and the cookie is eroding by attrition, whether or not anyone announces a death date. Any login flow built on it is on borrowed time.</p>
<p>FedCM (Federated Credential Management) is the standard built to keep federated login working once that mechanism is gone. The W3C and the major browser engines developed it as a browser-native API that runs federated identity flows without cross-site tracking.</p>
<h2>How it actually works</h2>
<p>The shift is architectural. In a legacy flow, clicking a social button fires hidden iframes, redirects, or pop-ups so the identity provider can read its own cookies and confirm who you are. That same channel lets the IdP track you across the web. FedCM puts the browser in the middle as a trusted mediator.</p>
<p>The site asks for an identity token through one explicit API call, <code>navigator.credentials.get()</code>, and the browser runs the rest:</p>
<ol> <li>The site requests an identity token from the browser.</li> <li>The browser fetches account details from a config file hosted by the IdP, kept siloed from the site making the request.</li> <li>The browser shows a native sign-in prompt instead of a pop-up.</li> <li>On explicit user consent, the browser passes a token back to the site’s backend to create a session.</li> </ol>
<p>Authentication and passive tracking get decoupled. (More on the API: the FedCM spec and MDN docs.)</p>
<p>It also fixes the NASCAR problem. Years of bolting on every available social login produced signup pages plastered with competing brand buttons, the registration equivalent of a stock car covered in sponsor decals. That is <a href="https://thenewstack.io/platform-engineering-reduces-cognitive-load-and-raises-developer-productivity/">cognitive load</a>, and cognitive load costs conversions.</p>
<blockquote> <p>“FedCM skips the wall of buttons and surfaces the right account in a single native prompt.”</p> </blockquote>
<p>Because the browser already knows which provider you used last, FedCM skips the wall of buttons and surfaces the right account in a single native prompt.</p>
<h2>Legacy flow vs. FedCM</h2>
<table><tr><th></th><th><strong>Legacy federated flow</strong></th><th><strong>FedCM</strong></th></tr><tbody><tr><td>Mechanism</td><td>Hidden iframes, redirects, pop-ups</td><td>One browser-mediated API call</td></tr><tr><td>Privacy model</td><td>Depends on third-party cookies</td><td>No third-party cookies; explicit per-sign-in consent</td></tr><tr><td>User experience</td><td>Redirect chains, blocked pop-ups, the NASCAR button wall</td><td>One-tap native browser prompt</td></tr><tr><td>Security</td><td>Phishable redirect surfaces</td><td>Browser-isolated prompt the page can’t spoof</td></tr></tbody></table>
<p>The practical payoff is conversion. Every extra click and every interrupted redirect sheds a percentage of the people trying to sign up, and mobile browsers frequently block the secondary windows legacy flows depend on. A single native prompt removes that drop-off.</p>
<blockquote> <p>“Every extra click and every interrupted redirect sheds a percentage of the people trying to sign up, and mobile browsers frequently block the secondary windows legacy flows depend on.”</p> </blockquote>
<p>There is a maintenance angle, too: a standardized browser UI means your team stops building and babysitting bespoke login components, and the flow upgrades through browser releases rather than refactors.</p>
<p>Axel Springer runs FedCM on Ory across hundreds of millions of users. Thomas Bergemann, its General Director of Product &amp; Revenue, put the result plainly: <strong>“</strong>We see an over 15x increase in registrations.” (<a href="https://www.ory.com/case-studies/axel-springer">Read the case study</a>.)</p>
<p>Google’s own testing on browser-mediated sign-in shows the same shape of result: dropping the jarring secondary-window step, the one mobile devices routinely block, cuts user drop-off.</p>
<p>Shopify moved onto browser-mediated identity ahead of the cookie changes and held checkout conversion stable on strict, privacy-centric mobile browsers, the exact environments where legacy flows quietly fail.</p>
<h2>Getting started with Ory</h2>
<p><strong>Step 1: Put the backend behind a CIAM platform.</strong> Don’t hand-roll this. <a href="https://www.ory.com/kratos">Ory Kratos</a> processes the backend side of FedCM natively, turning browser-side identity assertions into secure user sessions. (See the <a href="https://www.ory.com/docs/kratos/social-signin/fedcm">Ory FedCM deployment docs</a>.)</p>
<p><strong>Step 2: Configure your social sign-in providers.</strong> In the Ory Console, open the Social Sign-In panel, select your IdP, and enter its FedCM Config URL. Back-channel trust verification is handled for you.</p>
<p><strong>Step 3: Embed the JavaScript trigger.</strong> Drop a lightweight snippet on your login page to detect support and fall back cleanly when it isn’t there:</p>
<table><tbody><tr><td><code>if</code> <code>(</code><code>'IdentityCredential'</code> <code>in</code> <code>window) {</code><br/><code>navigator.credentials.get({</code><br/><code>identity: {</code><br/><code>providers: [{</code><br/><code>configURL: </code><code>'<a href="https://auth.your-business.com/self-service/methods/oidc/fedcm/google">https://auth.your-business.com/self-service/methods/oidc/fedcm/google</a>'</code><code>,</code><br/><code>clientId: </code><code>'YOUR_CLIENT_ID'</code><code>,</code><br/><code>}]</code><br/><code>}</code><br/><code>}).then((credential) =&gt; {</code><br/><code>return</code> <code>fetch(</code><code>'/self-service/methods/oidc/fedcm/login'</code><code>, {</code><br/><code>method: </code><code>'POST'</code><code>,</code><br/><code>body: JSON.stringify({ token: credential.token })</code><br/><code>});</code><br/><code>}).</code><code>catch</code><code>((err) =&gt; {</code><br/><code>console.error(</code><code>'FedCM flow interrupted, fallback to traditional OIDC:'</code><code>, err);</code><br/><code>});</code><br/><code>}</code></td></tr></tbody></table>
<p>If the browser doesn’t support FedCM, the flow falls back to a standard OpenID Connect redirect, so nobody gets locked out mid-migration. Want to test before you wire up a real IdP? There’s a <a href="https://mockfedcm.com/">free MockFedCM site</a> for that.</p>
<p>Federated login is moving into the browser, and the privacy model is moving with it. Safari and Firefox already block by default; Chrome is leaking the cookie out the side rather than killing it outright. Neither path leaves your social logins where they were.</p>
<p>The teams auditing their <a href="https://thenewstack.io/you-can-build-authentication-in-house-but-should-you/">auth stack</a> now are the ones who won’t be debugging broken login loops on someone else’s timeline later. Better to make this move on your own schedule than on the browser’s.</p>
