---
author: Spherical Cow Consulting
cover_image: >-
  https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/iStock-2290964956.jpg?fit=1200%2C800&ssl=1
date: '2026-11-10T13:18:28.648Z'
dateFolder: 2026/11/10
description: >-
  Heather explores the W3C Digital Credentials API and the challenge of defining
  shared responsibilities across browsers, operating systems, wallets, and
  credential protocols. Following discussions a…
isBasedOn: >-
  https://sphericalcowconsulting.com/2026/11/10/the-dc-api-and-the-problem-of-shared-responsibility/
link: >-
  https://sphericalcowconsulting.com/2026/11/10/the-dc-api-and-the-problem-of-shared-responsibility/
slug: >-
  2026-11-10-httpssphericalcowconsultingcom20261110the-dc-api-and-the-problem-of-shared-responsibility
tags:
  - tech
  - politics
title: The DC API and the Problem of Shared Responsibility
---
<figure><img alt="" sizes="(max-width: 1254px) 100vw, 1254px" src="https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/iStock-2290964956.jpg?w=1254&amp;ssl=1" srcset="https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/iStock-2290964956.jpg?w=1254&amp;ssl=1 1254w, https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/iStock-2290964956.jpg?resize=300%2C200&amp;ssl=1 300w, https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/iStock-2290964956.jpg?resize=1024%2C683&amp;ssl=1 1024w, https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/iStock-2290964956.jpg?resize=768%2C512&amp;ssl=1 768w"/></figure>
<p><strong>“When I first wrote about the W3C’s Digital Credentials API (DC API) in <a href="https://sphericalcowconsulting.com/2024/04/14/what-is-the-w3c-wicg-digital-identities-project/">April 2024</a>, one of the questions that interested me most was how the various layers of the digital credential ecosystem would work together.”</strong></p>
<p>Browsers, operating systems, wallets, credential formats, and presentation protocols all have different responsibilities. Getting those responsibilities sorted out was going to be an interesting challenge.</p>
<p>More than two years later, that question is still very much with us.</p>
<p>Last week, the W3C held its annual Technical Plenary and Advisory Committee (TPAC) meetings in Dublin, Ireland. I wore enough hats at TPAC this year that I probably should have brought a hat rack. Between my roles on the W3C Technical Architecture Group (TAG), the Exploration Interest Group, and the Federated Identity Working Group (FedID WG) and Community Group (FedID CG), I found myself moving between conversations about the Web’s architecture, emerging areas of standardization, and the practical challenges of getting specifications across the finish line. One discussion that is staying top of mind is the <a href="https://www.w3.org/TR/digital-credentials/">Digital Credentials API</a> (DC API) and its path toward becoming a W3C Recommendation.</p>
<p>The FedID WG made some meaningful progress. The working group agreed on an approach to narrowing the scope of the initial specification and reached a better understanding of the architectural boundaries between the API and the ecosystem around it. That’s a seriously big deal.</p>
<p>But some of the hardest questions remain, particularly around privacy. And those questions are a useful illustration of what happens when multiple standards and technologies must work together to deliver an experience that users can understand and trust.</p>
<figure><img alt="The DC API and the Problem of Shared Responsibility - A Digital Identity Digest" src="https://i0.wp.com/sphericalcowconsulting.com/wp-content/uploads/2026/11/80-The-DC-API-and-the-Problem-of-Shared-Responsibility-A-Digital-Identity-Digest.jpeg?resize=150%2C150&amp;ssl=1"/><figcaption>A Digital Identity Digest</figcaption></figure>
<p>&lt;blockquote class="wp-embedded-content" data-secret="GdOlSLzFo1"&gt;&lt;a href="https://sphericalcowconsulting.com/2026/11/10/the-dc-api-and-the-problem-of-shared-responsibility/"&gt;The DC API and the Problem of Shared Responsibility&lt;/a&gt;&lt;/blockquote&gt;&lt;iframe sandbox="allow-scripts" security="restricted" src="https://sphericalcowconsulting.com/2026/11/10/the-dc-api-and-the-problem-of-shared-responsibility/embed/#?secret=GdOlSLzFo1" width="500" height="350" title="&amp;#8220;The DC API and the Problem of Shared Responsibility&amp;#8221; &amp;#8212; Spherical Cow Consulting" data-secret="GdOlSLzFo1" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" class="wp-embedded-content"&gt;&lt;/iframe&gt;&lt;script&gt; /*! This file is auto-generated */ !function(d,l){"use strict";l.querySelector&amp;&amp;d.addEventListener&amp;&amp;"undefined"!=typeof URL&amp;&amp;(d.wp=d.wp||{},d.wp.receiveEmbedMessage||(d.wp.receiveEmbedMessage=function(e){var t=e.data;if((t||t.secret||t.message||t.value)&amp;&amp;!/[^a-zA-Z0-9]/.test(t.secret)){for(var s,r,n,a=l.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),o=l.querySelectorAll('blockquote[data-secret="'+t.secret+'"]'),c=new RegExp("^https?:$","i"),i=0;i&lt;o.length;i++)o[i].style.display="none";for(i=0;i&lt;a.length;i++)s=a[i],e.source===s.contentWindow&amp;&amp;(s.removeAttribute("style"),"height"===t.message?(1e3&lt;(r=parseInt(t.value,10))?r=1e3:~~r&lt;200&amp;&amp;(r=200),s.height=r):"link"===t.message&amp;&amp;(r=new URL(s.getAttribute("src")),n=new URL(t.value),c.test(n.protocol))&amp;&amp;n.host===r.host&amp;&amp;l.activeElement===s&amp;&amp;(d.top.location.href=t.value))}},d.addEventListener("message",d.wp.receiveEmbedMessage,!1),l.addEventListener("DOMContentLoaded",function(){for(var e,t,s=l.querySelectorAll("iframe.wp-embedded-content"),r=0;r&lt;s.length;r++)(t=(e=s[r]).getAttribute("data-secret"))||(t=Math.random().toString(36).substring(2,12),e.src+="#?secret="+t,e.setAttribute("data-secret",t)),e.contentWindow.postMessage({message:"ready",secret:t},"*")},!1)))}(window,document); //# sourceURL=https://sphericalcowconsulting.com/wp-includes/js/wp-embed.min.js &lt;/script&gt; </p>
<p><strong><em><a href="https://podcasts.apple.com/us/podcast/a-digital-identity-digest/id1812319221">You can Subscribe and Listen to the Podcast on Apple Podcasts, or wherever you listen to Podcasts.</a></em></strong></p>
<p><strong><em><a href="https://podcasts.apple.com/us/podcast/a-digital-identity-digest/id1812319221">And be sure to leave me a Rating and Review!</a></em></strong></p>
<h2>Getting the Scope Under Control</h2>
<p>First, some good news: The working group agreed to take a page from the Web Authentication (WebAuthn) specification and organize the DC API into levels.</p>
<p>The idea is pretty straightforward; it’s another form of versioning. Rather than trying to resolve every feature request and architectural question before the API can advance, the group will identify the functionality essential to Level 1 and defer other features to Level 2.</p>
<p>The most consequential decision was to move credential issuance into Level 2.</p>
<p>The DC API was originally designed to support both the presentation of digital credentials (showing a credential to a website) and issuance (receiving a new credential into a wallet). Both are important, but they are at different stages of implementation maturity, which means we agreed to shift them to different levels.</p>
<p>Keeping issuance in Level 1 would make it significantly harder to advance the specification, particularly because a second browser implementation of that functionality has no committed timeline. Other capabilities, including conditional invocation and a broader mechanism for providing invocation context, will also move to Level 2.</p>
<p>This doesn’t mean the group is abandoning those features. It means recognizing that a useful, interoperable first version does not have to solve every problem the ecosystem will eventually encounter.</p>
<p>There’s still work to do before Candidate Recommendation (CR), including sorting through the remaining issues and pull requests to determine which genuinely block Level 1. But we now have a more manageable way to approach that work.</p>
<h2>Where Does the API End?</h2>
<p>The other important discussion concerned architectural boundaries.</p>
<p>In <a href="https://sphericalcowconsulting.com/2025/11/25/dc-api-politics/">November 2025, I wrote about the politics of digital identity wallet standards</a>, particularly the tendency to hold the DC API responsible for things happening elsewhere in the digital credential ecosystem. That tendency hasn’t disappeared. I understand why, but still. Grr.</p>
<p>The DC API provides a way for websites to interact with digital credentials through a browser-mediated interface. It is designed to accommodate different credential formats and protocols rather than dictate which ones the ecosystem must use. But making a digital credential transaction work involves considerably more than passing a request from a website to a wallet and returning a response.</p>
<p>The browser has responsibilities. So does the operating system, the wallet, the credential protocol, and the website requesting the information. Each component sees a different part of the transaction, and each has different capabilities for evaluating what is happening.</p>
<p>At TPAC, the group agreed to use the architectural model described at <a href="https://digitalcredentials.dev/">digitalcredentials.dev</a> to help clarify those responsibilities.</p>
<p>That is useful progress. It gives us a common model for identifying whether a particular requirement belongs in the browser API, the underlying protocols, or another part of the ecosystem.</p>
<p>Unfortunately, identifying where a responsibility belongs doesn’t necessarily guarantee that someone will fulfill it. And that’s where things get interesting.</p>
<h2>The Problem with Assuming Someone Else Will Handle It</h2>
<p>Consider a website requesting information from someone’s digital identity wallet. The browser knows which website is making the request and can enforce rules about how the API is invoked. It may not, however, understand the contents of the credential being requested. Depending on the protocol and architecture, that information may be available only to the wallet.</p>
<p>The wallet, meanwhile, may understand exactly what information the user is being asked to disclose. But it may not have all the contextual information available to the browser about the website making the request.</p>
<p>Both components have important information. Neither necessarily has the complete picture.</p>
<p>Suppose the browser assumes that the wallet will explain what information is being shared and obtain appropriate user consent. That may be a reasonable division of responsibilities, provided the wallet actually does so.</p>
<p>But what happens if it doesn’t?</p>
<p>Perhaps the wallet displays a poorly designed consent interface. Perhaps its implementation doesn’t provide the protections the browser assumes are present. Or perhaps the protocol itself doesn’t convey enough information for the wallet to make an informed decision. From an architectural perspective, the browser may have done everything its specification requires. From the user’s perspective, the transaction may still have exposed information they never intended to share. This is why simply declaring something out of scope can be unsatisfying when discussing privacy and security.</p>
<p>It may be entirely correct that the DC API cannot solve a particular problem. That does not make the problem disappear.</p>
<h2>The Problem with Everyone Trying to Handle It</h2>
<p>There’s another side to this, though, and it is equally important. Suppose every component in the transaction decides it cannot trust the others to protect the user adequately.</p>
<p>The browser asks whether the user wants to proceed. The operating system asks whether the user wants to allow access to the wallet. The wallet asks which credential the user wants to share. The credential protocol or wallet interface introduces another confirmation about the information being disclosed.</p>
<p>Each of these interactions may have a defensible rationale. After all, each component has some responsibility for protecting the user. But imagine being the poor soul trying to accomplish a relatively ordinary task, such as proving your age to access a service.</p>
<p>How many times should you have to confirm that you want to do the thing you started doing?</p>
<p>We’ve seen the consequences of excessive permission and consent requests elsewhere on the web. Research into privacy notices and permission prompts has explored how the number, presentation, and repetition of these requests influence user behavior.</p>
<p>For example, <a href="https://research.google/pubs/websites-need-your-permission-too-user-sentiment-and-decision-making-on-web-permission-prompts-in-desktop-chrome/">research presented at CHI 2024</a> examined user behavior across more than 100 million Chrome installations and found that ignoring or dismissing certain browser permission prompts was common. Other <a href="https://doi.org/10.1145/3617363">research on privacy fatigue and tracking consent</a> has examined how fatigue influences the decisions people make when presented with consent notices. The evidence is not that every additional prompt necessarily makes consent worse. Context, presentation, and the nature of the decision all matter.</p>
<p>But the risk is real: repeatedly asking people for permission can turn a meaningful security or privacy decision into another obstacle between them and whatever they were trying to accomplish. Eventually, people may stop evaluating what they’re being asked and start looking for the button that makes the interruption go away. In that situation, additional consent interfaces may create the appearance of stronger user protection while undermining the effectiveness of consent itself. That’s quite a problem for an ecosystem that places so much importance on user control.</p>
<h2>Shared Responsibility Requires More Than Architectural Boundaries</h2>
<p>I don’t think there’s a simple answer here.</p>
<p>It’s perfectly reasonable for the DC API to avoid defining the behavior of every wallet and credential protocol. Attempting to do so would make the specification considerably more complex, create dependencies on technologies outside the working group’s control, and potentially undermine the protocol neutrality that makes the API useful. At the same time, the API cannot assume that privacy protections exist elsewhere without understanding the consequences if those assumptions are wrong.</p>
<p>One approach is to distinguish between the responsibilities a component can directly enforce and the guarantees it depends on other components to provide. Where the browser can enforce a protection, the specification should be clear about what is required. Where protection depends on wallet or protocol behavior, those dependencies should be explicit. Ideally, they should also be testable or otherwise supported by concrete requirements in the relevant standards. And where a risk cannot be adequately addressed by the API, the specification needs to acknowledge that limitation.</p>
<p>This doesn’t eliminate the difficult coordination work so much as it makes it easier to see where that work is needed.</p>
<p>It also raises a question that deserves more attention: can the ecosystem coordinate consent and user interaction across these layers so that people receive the information they need at the moment it matters, without encountering a separate permission dialogue from every participating component?</p>
<p>That question extends beyond the scope of any one specification. But it is critical to whether the overall system will work well for users.</p>
<h2>Privacy Is Still the Hard Part</h2>
<p>The TPAC discussions confirmed that privacy remains one of the most significant obstacles to advancing the DC API to CR.</p>
<p>Several outstanding issues concern protections that depend, at least in part, on behavior outside the API itself.</p>
<p>Selective disclosure is one example. The ability to share only the information necessary for a transaction is an important privacy property of many credential systems. But the browser cannot necessarily determine which attributes a credential contains or which information will ultimately be disclosed. Other unresolved questions concern user-initiated credential presentation, purpose limitation, and responses to abusive credential requests.</p>
<p>These are not minor editorial matters. They involve decisions about what protections the API can realistically provide, what assumptions it makes about other components, and what risks remain.</p>
<p>The working group plans to bring editors and privacy experts together for more focused discussions to work through these questions. I expect those conversations to be challenging. Privacy requirements often expose assumptions about architecture that are easy to overlook when discussing functionality alone. They’re conversations we need to have if the API is going to provide a trustworthy foundation for digital credentials on the web.</p>
<h2>What Happens Next?</h2>
<p>The DC API is in a better position after TPAC than it was before. The decision to create specification levels provides a practical approach to delivering an interoperable first version. The agreement on architectural layering gives the group a better way to distinguish between the responsibilities of the browser API and the wider credential ecosystem. That said, neither decision, by itself, resolves the outstanding privacy issues.</p>
<p>The next stage will involve turning those agreements into concrete specification changes, completing the Level 1 issue triage, and working through the privacy questions that remain. I expect the most interesting discussions will continue to concern responsibilities that span multiple layers.</p>
<p>There is a temptation in standards development to believe that a well-defined architectural boundary means the responsibilities on either side have been adequately addressed. Sometimes they have. Sometimes that boundary is exactly where important assumptions become invisible.</p>
<p>For digital credentials, the user doesn’t experience a browser API, an operating system interface, a wallet, and a presentation protocol as separate architectural components. They experience a request to share information about themselves. That experience needs to be understandable, trustworthy, and reasonably straightforward, regardless of how many standards and technologies are involved in making it happen.</p>
<p>Figuring out how to deliver that experience without either neglecting essential protections or burying the user under permission requests remains one of the more interesting challenges ahead.</p>
<p>And yes, we’re still talking about it.</p>
<p>📩 If you’d like to be notified of new posts rather than hoping you catch it on social media, I have an option for you! Subscribe to get a notification when new posts go live. No spam, just announcements of new posts. [<a href="https://spherical-cow-consulting.kit.com/581ad3bf89">Subscribe here</a>]</p>
<h1>Transcript</h1>
<p>Welcome to the Digital Identity Digest, the audio companion to the blog at Spherical Cow Consulting. I’m Heather Flanagan, and every week I break down interesting topics in the field of digital identity, from credentials and standards to browser weirdness and policy twists.</p>
<p>If you work with digital identity but don’t have time to follow every specification or hype cycle, you’re in the right place.</p>
<p>Let’s get into it.</p>
<p>When I first heard about the W3C’s Digital Credentials API back in April 2024, one of the questions that interested me most was how all the different pieces of the digital credential ecosystem would work together.</p>
<p>You have browsers and operating systems, things commonly referred to as digital wallets (although they should more properly be called credential managers), credential formats, and presentation protocols. Each has different responsibilities.</p>
<p>Figuring out how those responsibilities fit together was always going to be an interesting challenge. More than two years later, we’re still working on it.</p>
<p>Last week, I attended the W3C’s annual Technical Plenary and Advisory Committee Meetings, better known as TPAC, in Dublin, Ireland.</p>
<p>I wore enough hats this year that I probably should have brought a hat rack. Between my work with the Technical Architecture Group, the Exploration Interest Group, the Federated Identity Working Group, and the associated Community Group, I moved between conversations about the Web’s architecture, emerging standards, and the practical challenges of getting specifications finished.</p>
<p>One discussion that really stayed with me concerned the Digital Credentials API, or DC API, and its progress toward becoming a W3C Recommendation.</p>
<p>The working group made meaningful progress. We agreed on a way to narrow the initial specification and developed a clearer understanding of its architectural boundaries.</p>
<p>However, some difficult privacy questions remain. They illustrate a challenge that extends well beyond digital credentials: when multiple technologies work together, how do we make sure the user is adequately protected?</p>
<p>But first, let’s start with the good news.</p>
<h2>Making Progress by Organizing the DC API Into Levels</h2>
<p>At TPAC, the Federated Identity Working Group agreed to organize the DC API into levels, following the approach used by a protocol called WebAuthn.</p>
<p>The idea is straightforward. Essentially, this is a form of versioning that avoids requiring every requested feature to be resolved before publishing the standard.</p>
<p>We identified the functionality needed for an initial interoperable version. That becomes Level 1.</p>
<p>Other capabilities can move into Level 2, Level 3, or Level 4 as the specification evolves.</p>
<p>The most significant decision was to move much of credential issuance into Level 2.</p>
<p>The DC API supports two broad activities:</p>
<ul> <li>Presenting a credential to a website.</li> <li>Receiving a new credential into a wallet or credential manager.</li> </ul>
<p>Both are important, but they are at different stages of implementation maturity. In particular, there is no committed timeline for a second browser implementation of credential issuance.</p>
<p>Keeping issuance in Level 1 would make advancing the specification considerably harder.</p>
<p>Other features, including conditional invocation and more general ways of providing invocation context, will also move to Level 2.</p>
<p>That doesn’t mean we’re abandoning those capabilities. Instead, we’re recognizing that a useful, interoperable first version doesn’t have to solve every problem the ecosystem might eventually encounter.</p>
<p>There’s still work to do before Candidate Recommendation, of course. However, we now have a more manageable path forward.</p>
<h2>Understanding the Architectural Boundaries</h2>
<p>The second important discussion concerned architectural boundaries.</p>
<p>I’ve written before about the tendency to hold the DC API responsible for problems elsewhere in the digital credential ecosystem. It kind of drives me crazy, although I understand why it happens.</p>
<p>The API is the effective control point where websites interact with digital credentials through the browser. When something about that experience seems problematic, it’s natural to ask the API to fix it.</p>
<p>However, a digital credential transaction involves considerably more than a browser passing a request to a wallet or credential manager.</p>
<p>Consider the different components involved:</p>
<ul> <li><strong>The website</strong> initiates the request.</li> <li><strong>The browser</strong> mediates the interaction.</li> <li><strong>The operating system</strong> may help connect the browser to a wallet.</li> <li><strong>The wallet or credential manager</strong> processes the request using an underlying credential protocol.</li> </ul>
<p>Each component has different information and different capabilities.</p>
<p>At TPAC, the working group agreed to use the architectural model described at digitalcredentials.dev to help clarify those responsibilities.</p>
<p>That’s useful progress because it gives us a common framework for deciding whether a particular requirement belongs in the browser API, the underlying protocols, or another part of the ecosystem.</p>
<p>But there’s a complication.</p>
<p>Identifying where a responsibility belongs doesn’t necessarily guarantee that someone will actually fulfill it.</p>
<h2>When No Single Component Has the Complete Picture</h2>
<p>Let’s walk through an example.</p>
<p>Imagine you’re visiting a website that asks you to prove you’re over 18. This is a fairly common use case these days, and you have a digital credential in your wallet that can provide that information.</p>
<p>The browser knows which website is making the request and can enforce rules about how the API is invoked.</p>
<p>However, depending on the credential format and protocol, the browser may not know exactly what information the wallet will disclose.</p>
<p>The wallet may understand the contents of the credential, including whether the request involves a simple assertion that you’re over 18 or your full date of birth. However, it may lack some of the context the browser has about the requesting website.</p>
<p>Neither component necessarily has the complete picture.</p>
<p>Now, suppose the browser assumes that the wallet will explain what’s being shared and obtain the appropriate consent.</p>
<p>That may be a perfectly reasonable division of responsibilities, provided the wallet actually does it.</p>
<p>But what if the wallet presents a confusing consent interface? What if it doesn’t enforce the protections the browser assumes are present? Or what if the protocol doesn’t convey enough information for the wallet to make an informed decision?</p>
<p>The browser may have fulfilled every requirement in its specification, yet the user could still disclose information they never intended to share.</p>
<p>This is why simply declaring something out of scope can be unsatisfying when discussing privacy and security.</p>
<p>Sometimes a problem genuinely belongs elsewhere. However, declaring that the API isn’t responsible doesn’t make the risk disappear.</p>
<h2>The Problem With Too Many Consent Prompts</h2>
<p>Let’s consider the opposite approach.</p>
<p>Suppose every component decides it can’t rely on the others to protect the user. The browser asks whether you want to proceed. The operating system asks whether you want to allow access to your wallet. The wallet asks you to select a credential and then confirm which information you want to disclose.</p>
<p>Each interaction might have a perfectly defensible rationale.</p>
<p>But remember, all you wanted to do was prove you were 18.</p>
<p>How many times should you have to confirm that you’re trying to do the thing you originally set out to do?</p>
<p>We’ve already seen what happens when people encounter too many permission prompts and privacy notices.</p>
<p>Research presented at CHI 2024 examined user behavior across more than 100 million Chrome installations and found that ignoring or dismissing certain browser permission prompts was common.</p>
<p>Other research into privacy fatigue has explored how repeated consent requests influence people’s decisions about tracking and information sharing.</p>
<p>That doesn’t mean every additional prompt makes consent worse. Context, presentation, and the nature of the decision all matter.</p>
<p>However, repeatedly asking people for permission can turn a meaningful privacy decision into just another obstacle between them and whatever they were trying to accomplish.</p>
<p>Eventually, users may stop evaluating what they’re being asked and start looking for the button that makes the interruption go away.</p>
<p>We could end up creating more consent interfaces while making consent itself far less meaningful.</p>
<p>That’s quite a problem for an ecosystem that places so much emphasis on user control.</p>
<h2>Finding the Right Balance Between Responsibilities</h2>
<p>I don’t think there’s a simple answer here.</p>
<p>It’s reasonable for the DC API to avoid defining the internal behavior of every wallet or credential manager and credential protocol. Doing otherwise would make the specification considerably more complex and could potentially undermine the protocol design that makes it useful.</p>
<p>At the same time, the API shouldn’t assume that protections exist elsewhere without understanding the consequences if those assumptions are wrong.</p>
<p>One approach is to distinguish between the protections a component can enforce directly and the guarantees it depends on other components to provide.</p>
<p>For example:</p>
<ul> <li>Where the browser can enforce a protection, the specifications should say so clearly.</li> <li>Where protection depends on wallet or protocol behavior, those dependencies should be made explicit and ideally supported by testable requirements in the relevant standards.</li> <li>Where the DC API cannot adequately address a risk, the specification should acknowledge that limitation and identify where coordination is needed across the ecosystem.</li> </ul>
<p>This also raises another question worth exploring.</p>
<p>Can we coordinate consent and user interaction across these different layers so that people receive the information they need when they need it, without facing a separate permission dialogue from every component?</p>
<p>That’s a bigger question than any one specification, but it’s central to making the overall system work.</p>
<h2>Privacy Questions Still Blocking Progress</h2>
<p>At TPAC, we confirmed that privacy remains one of the most significant obstacles to advancing the DC API to Candidate Recommendation.</p>
<p>Several outstanding issues involve protections that depend, at least partly, on behavior outside the browser.</p>
<p>Selective disclosure is one example.</p>
<p>Many credential systems allow users to share only the information necessary for a transaction. You might prove you’re over 18 without disclosing your full date of birth.</p>
<p>That’s an important privacy property.</p>
<p>However, the browser may not understand which attributes a credential contains or what information will ultimately be disclosed.</p>
<p>So, what can the DC API realistically guarantee about selective disclosure? What must it rely on the wallet and credential protocol to provide?</p>
<p>I don’t know.</p>
<p>Similar questions arise around:</p>
<ul> <li>User-initiated credential presentation.</li> <li>Purpose limitation.</li> <li>Abusive credential requests.</li> </ul>
<p>These aren’t minor editorial details. They involve decisions about what protections the browser can provide, what assumptions it makes about other components, and what risks remain for the user.</p>
<p>The working group plans to bring the editors and privacy experts together for focused discussions of these issues. I expect those conversations to be challenging.</p>
<p>Privacy requirements have a way of exposing architectural assumptions that are easy to overlook when everyone is concentrating on making functionality work.</p>
<p>At the same time, those requirements can sometimes demand things that aren’t technically possible.</p>
<p>Either way, they’re essential if the API is going to provide a trustworthy foundation for digital credentials on the Web.</p>
<h2>What Happens Next for the DC API?</h2>
<p>The DC API is in a better position after TPAC than it was before.</p>
<p>Organizing the specification into levels gives us a practical approach to delivering an interoperable first version.</p>
<p>The agreement on architectural layering also gives us a clearer way to identify responsibilities across the ecosystem.</p>
<p>Now we need to:</p>
<ul> <li>Translate the agreed requirements into specification changes.</li> <li>Complete the Level 1 issue triage.</li> <li>Work through the outstanding privacy questions.</li> </ul>
<p>I suspect some of the most interesting discussions will continue to happen at the boundaries between all these different technologies.</p>
<p>There is a temptation in standards development to believe that defining an architectural boundary means the responsibilities on either side have been adequately addressed.</p>
<p>Sometimes they have.</p>
<p>And sometimes that boundary is exactly where important assumptions become invisible.</p>
<p>For digital credentials, the user doesn’t experience a browser API, an operating system interface, a wallet or credential manager, and a presentation protocol as separate architectural components.</p>
<p>They experience a website asking them to share information about themselves.</p>
<p>That experience needs to be understandable, trustworthy, and reasonably straightforward, regardless of how many technologies and standards are involved behind the scenes.</p>
<p>Figuring out how to deliver that experience without neglecting essential protections or burying users under permission requests remains one of the more interesting challenges ahead.</p>
<p>And yes, we’re still talking about it.</p>
<h2>Final Thoughts</h2>
<p>That’s all for this week. As always, you’ll find links to the specifications, research, and other resources I’ve mentioned in the written version of this post.</p>
<p>Thank you for listening.</p>
<p>And that’s it for this week’s episode. If it helps make things a little clearer, or at least a little more interesting, share it with a friend or colleague and connect with me on LinkedIn at @hlflanagan.</p>
<p>If you enjoyed the show, be sure to subscribe and leave me a rating and review on Apple Podcasts or wherever you listen to podcasts.</p>
<p>You can also find the full written post at sphericalcowconsulting.com.</p>
<p>Stay curious, stay engaged, and let’s get these conversations going.</p>
