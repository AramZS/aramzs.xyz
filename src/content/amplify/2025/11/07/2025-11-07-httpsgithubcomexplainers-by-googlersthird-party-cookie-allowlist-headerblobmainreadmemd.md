---
author: 'https://github.com/explainers-by-googlers/'
cover_image: ''
date: '2025-11-07T17:03:27.113Z'
dateFolder: 2025/11/07
description: >-
  Today, websites have limited control over third-party origins storing/reading
  cookies.
isBasedOn: >-
  https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/README.md
link: >-
  https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/README.md
slug: >-
  2025-11-07-httpsgithubcomexplainers-by-googlersthird-party-cookie-allowlist-headerblobmainreadmemd
tags:
  - code
  - ad tech
title: >-
  third-party-cookie-allowlist-header/README.md at main ·
  explainers-by-googlers/third-party-cookie-allowlist-header
---
<p><a data-hotkey=".,Mod+Alt+." href="https://github.dev/">Open in github.dev</a> <a data-hotkey="Shift+.,Shift+&gt;,&gt;" href="https://github.dev/">Open in a new github.dev tab</a> <a data-hotkey=",,Mod+Alt+," href="https://github.com/codespaces/new/explainers-by-googlers/third-party-cookie-allowlist-header/tree/main?resume=1">Open in codespace</a> </p>
<h2>Expand file tree</h2>
<p>t</p>
<p>More file actions</p>
<p>More file actions</p>
<h1>Explainer: Third-Party Cookie Allowlist Header</h1>
<p>This proposal is an early design sketch to describe the problem below and solicit feedback on the proposed solution. It has not been approved to ship in Chrome.</p>
<ul> <li><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/issues">Discussion</a></li> </ul>
<h2>Introduction</h2>
<p>Today, websites have limited control over third-party origins storing/reading cookies. This includes, but is not limited to, circumstances where third parties are compromised (such as when an imported script abuses access to perform disallowed actions) or layered (such as, an advertising service that has content served by another party). This may raise trust issues that are not technically verifiable, for example in the case of compliance with local data protection and privacy laws.</p>
<p>In these circumstances, websites may desire controls in limiting third-party origins from storing or reading cookies. Although third-party cookies are not the only storage vector for such cases, they are a key mechanism that many sites wish to make representations to their users or regulators about.</p>
<h2>Goals</h2>
<ul> <li>Allow the top-level site to provide an allowlist of origins which can access third-party cookies.</li> <li>Allow child frames to further restrict the list of origins which can access third-party cookies.</li> <li>When this allowlist is provided, deny access to third-party cookies to all other origins.</li> <li>Require consent of child-frames where specific lists (instead of none or all) will be enforced.</li> </ul>
<h2>Non-goals</h2>
<ul> <li>Override controls to allow access to third-party cookies where access would otherwise be denied.</li> <li>Change behaviors related to third-party cookies where the allowlist is not provided.</li> <li>Provide a mechanism to change the allowlist during the document’s lifecycle.</li> <li>Allow child-frames to escape parental restrictions through lack of participation.</li> </ul>
<h2>Use cases</h2>
<h3>Website with cookie-related notice</h3>
<p>A website has a notice that provides transparency about the third parties it works with for various purposes and it wants to limit the use of third-party cookies by any third-party not listed. A website has a notice that asks for permission related to third-party cookies used by that website’s advertisers. If the user denies the use of third-party cookies, the website wants a way to prevent a given origin from accessing or setting them via a browser control.</p>
<h3>Website with sensitive content</h3>
<p>A website with sensitive content wants to prevent its users from being tracked by third-party resources it has to fetch/embed to function. Third-party cookies are a key tracking vector, and controls related to them would improve user privacy (even if it does not guarantee it).</p>
<h2>Proposed Solution</h2>
<p>We propose two new headers, which together allow parent frames to enforce third-party cookie restrictions and child frames to actively consent or passively reject selective enforcement.</p>
<h3>Third-Party-Cookie-Allowlist</h3>
<p>This HTTP response header is supported only on navigation, and supports three values:</p>
<ul> <li>The token <code>*</code>, the default value if the header is omitted, which represents allowing third-party cookie access where it would otherwise be permitted for all sub-requests and sub-frames.</li> <li>The token <code>none</code>, which represents blocking third-party cookie access from all sub-requests and sub-frames. Note that this will not remove access to third-party cookies from the frame itself as cookies would already have been sent in the HTTP request.</li> <li>A list of origins as strings, which will be the only origins that sub-requests or sub-frames could have third-party cookies attached to. As with <code>*</code> this does not force access to third-party cookies to those origins, it simply does not deny access that would otherwise have been granted.</li> </ul>
<p>The enforced policy on a child frame is the set intersection of the Third-Party-Cookie-Allowlist value (or default value) of the child frame and the enforced policy on its parent (if a parent exists). See the examples section for details.</p>
<h3>Accept-Third-Party-Cookie-Allowlist-From</h3>
<p>This HTTP response header is supported only on navigation, and supports three values:</p>
<ul> <li>The token <code>*</code>, which allows this frame to inherit the policy of any parent frame.</li> <li>An empty value, the default value if the header is omitted, which causes this frame to accept only all (<code>*</code>) or nothing () policies from the parent, but not specific lists of origins. If the parent did set a specific list of origins, it will be treated as though they set (). This is the default to prevent selective targeting of origins for third-party cookie blocking in a way the frame would not want to allow.</li> <li>A list of origins as strings, which allow inheritance of the parental policy if the parent origin is on the list and deny inheritance (with behavior the same as the empty value) otherwise.</li> </ul>
<p>Note that denied inheritance will not remove access to third-party cookies from the frame itself as cookies would already have been sent in the HTTP request. See the examples section for details.</p>
<h3>Example</h3>
<p>For each of these examples assume the browser allows third-party cookies by default.</p>
<p>Most of the internet likely won’t adopt these headers, and for them behavior would not change (no child frame consent is needed for policies of all):</p>
<figure><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/images/example_0.png"><img alt="" src="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/raw/main/images/example_0.png"/></a></figure>
<p>A top-frame could prevent all sub-requests and sub-frames from using cookies by setting a <code>none</code> allowlist (no child frame consent is needed for policies of nothing):</p>
<figure><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/images/example_1.png"><img alt="" src="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/raw/main/images/example_1.png"/></a></figure>
<p>A top-frame could set a selective policy, but the child frame would need to accept it:</p>
<figure><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/images/example_2.png"><img alt="" src="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/raw/main/images/example_2.png"/></a></figure>
<p>If the top-frame set a selective policy but the child frame didn’t accept it, then it would be as though the child inherited a policy of accepting no third-party cookies</p>
<figure><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/images/example_3.png"><img alt="" src="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/raw/main/images/example_3.png"/></a></figure>
<p>If the child frame accepted the parent policy, it could further restrict it as desired but cannot expand it:</p>
<figure><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/images/example_4.png"><img alt="" src="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/raw/main/images/example_4.png"/></a></figure>
<p>This pattern holds even across multiple levels of nesting:</p>
<figure><a href="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/blob/main/images/example_5.png"><img alt="" src="https://github.com/explainers-by-googlers/third-party-cookie-allowlist-header/raw/main/images/example_5.png"/></a></figure>
<h3>Integrations</h3>
<p>This header does not block access to <a href="https://privacysandbox.google.com/cookies/chips">CHIPS</a> (partitioned) cookies or other partitioned storage/communication mechanisms (such as session storage, IndexedDB, or SharedWorkers) in third-party contexts.</p>
<p>Cross-origin frames/requests blocked from third-party cookie access via this header could still restore access via the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API">Storage Access API</a> or <a href="https://privacysandbox.google.com/cookies/storage-access-api#sah">Storage Access Headers</a> (which would behave as it would in any context where third-party cookie access had been denied).</p>
<p>Insecure origins cannot be added to the allowlist.</p>
<h2>Alternatives Considered</h2>
<h3>Permissions Policy Feature</h3>
<p>We considered offering this control as a new feature on the existing <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy">Permissions Policy Header</a>, but unlike other permissions this one does not cascade controls to sub-frames. The top-level frame is in full control of access while subframes can just further restrict access. We worried that adding it as ‘just another’ permissions policy feature would make it seem as though it was a permission that parent frames could delegate control of to child frames.</p>
<h3>Blocklist</h3>
<p>Instead of an allowlist, we could have gone for a blocklist approach, but to be effective that would require a website to already know all origins being fetched from—and part of the reason for this control was the potential lack of transparency into that. An allowlist should ensure better intentionality, and hopefully requires fewer entries than a blocklist would have.</p>
<h3>Mid-Lifecycle Changes</h3>
<p>The ability to change the policy of a document mid-lifecycle (for example, without requiring a reload of the page) might be requested, and could be implemented, but would make it harder for third parties to understand the environment they are executing in. Instead of checking constraints once at initialization, checks would need to be performed each time any operation related to them was performed. This will likely compound compatibility issues in a way that fixed restrictions would not (such as whether third-party cookies are or aren’t available).</p>
<h3>JavaScript API</h3>
<p>The ability to set the policy of a document via JavaScript (mid-lifecycle) was considered but rejected due to the complexity of accommodating multiple scripts attempting to set the list independently. You could introduce an API that only respected the first update request, but then you encourage a race to use the API first. On the other hand you could provide an API that allowed for overriding or extending the list, but then whatever script wanted to restrict access can no longer be sure it was effective.</p>
<h2>Privacy &amp; Security Considerations</h2>
<h3>Parental Policy Information</h3>
<p>We require the child frame to consent to the origin of the parent frame for setting specific allowlist policies (aside from all or nothing) to ensure this header can’t be used to selectively target some resources in a way the child frame would not want. We could share the exact parental policy in an HTTP request header, but there is a concern that this could expose too much sensitive information as origins in a parental policy are there to permit access across all of its sub-requests and sub-frames, and thus would expose information about other iframes/resources being used.</p>
<h3>User Setting Override</h3>
<p>This header should never grant access to third-party cookies where it would otherwise have been denied, it should only deny access where it would otherwise have been granted. Browser and origin-specific settings related to third-party cookie blocking must be respected.</p>
<h3>Other Windows</h3>
<p>Blocking access to third-party cookies in subresource/navigation fetches, for a given top-level site, does not prevent other tracking methods. For example, a third-party iframe could open a popup (which then would have access to first-party cookies) and transmit data which would allow tracking in the third-party context. This issue exists even where all third-party cookies are blocked, and requires mitigation via other methods not described here.</p>
<h3>Cross-Origin Attacks</h3>
<p>It’s possible this setting could be used to assist in cross-origin attacks by denying information (i.e., third-party cookies) that might otherwise be included in cross-origin subresource requests or sub-frame navigations. Ensuring this setting does not block access to <a href="https://privacysandbox.google.com/cookies/chips">CHIPS</a> should mitigate this concern somewhat, but it’s worth noting that the setting does deny some anti-abuse signals which might otherwise be available.</p>
<h2>UX Considerations</h2>
<p>In existing browser surfaces concerned with whether third-party cookies are allowed or blocked for a given tab (such as developer tools or site settings), third-party cookie access blocking due to this header should be reflected to assist with user understanding and developer debugging.</p>
<h2>Future Work</h2>
<h3>Well-Known File</h3>
<p>The list of origins needing to be granted access could be extensive for some websites, and although we hope the wildcard matching on subdomains can help curtail the list, it might become cumbersome to transmit the list in a header on every navigation. It may make sense to support some sort of <a href="https://en.wikipedia.org/wiki/Well-known_URI">well-known location</a> that has the allowlist so it can be fetched/cached independently. For the moment we leave this to future work, as it seems a natural extension of the header (for example, a new token like <code>well-known</code> could be included in the allowlist to indicate that the browser should fetch additional entries from there).</p>
<h3>API Endpoint</h3>
<p>Instead of checking a <a href="https://en.wikipedia.org/wiki/Well-known_URI">well-known location</a> for allowlists or to check individual origins, we could provide a way to point a site to some endpoint (such as a <a href="https://en.wikipedia.org/wiki/REST">REST API</a> that took the origin in question as a query parameter) which could provide the needed information. The downside is that more requests might be required here (if all needed information cannot be provided in a single go).</p>
<h3>HTML Tag</h3>
<p>Instead of (or in addition to) an HTTP response header, we could allow an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv">http-equiv</a> meta tag to set the third-party cookie allowlist. In order to prevent this from counting as a mid-lifecycle change, we could restrict the tag to only be respected if it was present in the page before JavaScript started to execute and fetches started to be performed. This would ensure the tag originated from the server and wasn’t injected by a third-party script in an attempt to weaken controls.</p>
<h3>Additional Controls</h3>
<p>There may be top-level site privacy settings beyond third-party cookies (such as even blocking access to partitioned storage in third-party contexts) that could use a model similar to an allowlist header to provide better guarantees for user privacy. We did not design the proposed header as a generic control, as every surface is likely to have unique constraints that might not play well together in a shared header with multiple features (similar to the reason we did not extend the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy">Permissions Policy Header</a>).</p>
