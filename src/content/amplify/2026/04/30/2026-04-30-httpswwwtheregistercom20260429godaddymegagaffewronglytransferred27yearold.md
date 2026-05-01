---
author: Connor Jones
cover_image: 'https://regmedia.co.uk/2019/04/26/shutterstock_dumpster_fire.jpg'
date: '2026-04-30T10:50:03.148Z'
dateFolder: 2026/04/30
description: >-
  : 32 phone calls, 17 email chains, a 5-day ordeal, and no help during the
  daddy of all stuffups, claim those affected
isBasedOn: >-
  https://www.theregister.com/2026/04/29/godaddy_megagaffe_wrongly_transferred_27yearold/
link: >-
  https://www.theregister.com/2026/04/29/godaddy_megagaffe_wrongly_transferred_27yearold/
slug: >-
  2026-04-30-httpswwwtheregistercom20260429godaddymegagaffewronglytransferred27yearold
tags:
  - tech
title: Non-profit’s GoDaddy nightmare and the IT chaos that ensued
---
<p>GoDaddy is currently investigating claims that it handed complete control of a valid 27-year-old domain to another customer, without requiring them to pass any authentication processes or upload any supporting documents.</p>
<p>The sensational allegations come from Lee Landis, a partner at Pennsylvania IT shop Flagstream Technologies, who claims one of his client's domains "vanished" from the company's GoDaddy account without notice.</p>
<p>This, said Landis, meant the client lost access to its website and email accounts throughout the ordeal. The security implications of this include potentially losing access to account recovery mechanisms, MFA codes, company impersonation, <a href="https://www.theregister.com/2026/04/07/cybercrime_losses_reach_alltime_high/">business email compromise</a> (BEC) schemes, and all manner of other possibilities.</p>
<p>The client wanted to remain anonymous, but was described as an American non-profit that operated 20 locations across the country.</p>
<p>According to a <a href="https://anchor.host/godaddy-gave-a-domain-to-a-stranger-without-any-documentation/">writeup</a> penned by Landis' friend Austin Ginder, who owns Anchor Hosting, it took just four minutes for the domain takeover process to be approved. However, it left Landis' client with four days of downtime, during which time staff resorted to using personal email addresses and SMS messages to keep stakeholders informed about progress, as numerous fundraising events were scheduled for the following days.</p>
<p>"Lee is one of the most competent IT guys I know," Ginder wrote. "The GoDaddy account had dual two-factor authentication enabled, requiring both an email code and an authentication app code to log in. The domain itself had ownership protection turned on."</p>
<p>According to the logs, GoDaddy confirmed to Flagstream via email of an account recovery request being made. Three minutes later, the transfer was initiated, and it completed a minute after that. This all took place at around lunchtime on April 18, a Saturday.</p>
<p>The transfer was initiated only by an "internal user," the audit logs reportedly revealed, and it did not require any of the authentication methods to be completed. Ginder appeared to imply the transfer was done by an "internal user" inside GoDaddy.</p>
<p>Landis' calls to GoDaddy began the following day. Support staff proved unhelpful and allegedly lacked what he believed to be the necessary urgency.</p>
<p>Over the subsequent days, across 32 phone calls which in total lasted more than nine hours, GoDaddy support threw out various email addresses where it said Landis could try to seek a resolution. He claims instructions differed depending on which staffer at the hosting provider answered the phone.</p>
<p>Email conversations, of which there were 17, were never with a named individual, just generic address names, says Landis, who adds that he was asked multiple times why he thought the case was so urgent. Not once did he receive a callback from any of these email exchanges.</p>
<p>Landis "may have said some hurtful things to GoDaddy's support personnel," Ginder wrote.</p>
<h3>A mountain of work and a huge stroke of luck</h3>
<p>On the following Tuesday, four days after the transfer was completed, GoDaddy allegedly closed the case without action.</p>
<p>In a statement sent to Flagstream, GoDaddy said: "After investigating the domain name(s) in question, we have determined that the registrant of the domain name(s) provided the necessary documentation to initiate a change of account… GoDaddy now considers this matter closed."</p>
<p>The issue here is that no documentation was provided, according to both Flagstream and the woman who received ownership of the domain. Ginder refers to her as Susan, but it is not her real name.</p>
<p>GoDaddy denies this was the case.</p>
<p>Before Flagstream had to clean up this mammoth mess, Susan was trying to reclaim an old domain registered to a former employee.</p>
<p>Again, the specifics were changed because the nonprofit wanted to stay anonymous, but for the sake of storytelling, we'll use the two domains below as examples:</p>
<ul> <li><code>HELPNETWORKINC.ORG</code> (Flagstream's client)</li> <li><code>HELPNETWORKLOCAL.ORG</code> (Susan's domain to be reclaimed)</li> </ul>
<p>Another important detail to understand how this transfer was botched is that Susan's email signature referenced her chapter's website at a subdomain of <code>HELPNETWORKINC.ORG</code>. Gilder said that GoDaddy staff most likely looked at the signature and mistakenly transferred its parent domain to Susan rather than the intended one.</p>
<p>Susan told Flagstream that she received a link to upload supporting documents but the link expired before she could use it, which if true would mean GoDaddy was not being accurate in its statement to Flagstream which said the submitted documentation informed the decision to approve the ownership transfer.</p>
<p>While all of this was taking place, Landis and the wider Flagstream team were working at pace to transfer the client over to a new domain and new email addresses, an arduous, brand-harming task, but a necessary one to get the non-profit back in business.</p>
<p>"It was a huge stress," Landis told <em>The Register</em>. "We had several guys working on this constantly, even at night. Plus, the company that hosted the website had a lot of work to do too, apart from us when we decided to set them up with a new domain."</p>
<p>Fortune was on Flagstream's side, however, as Susan was all too helpful after noticing she was in possession of the wrong domain.</p>
<p>Susan initially called the non-profit's CFO, saying she did not know what she was looking at, but knew she had to tell someone. From there, Susan worked with Flagstream to initiate an account-to-account transfer of the domain's ownership, a process Ginder said took less than five minutes, all without GoDaddy's support or oversight.</p>
<p>"Susan is really the hero of this entire story," Ginder wrote. "Without her, Flagstream would still have no idea what happened to this domain. Lawyers would have gotten involved, but it would probably be months until anything was resolved."</p>
<p>While migrating the non-profit onto a new domain, and then reverting it back after regaining access, the wider Flagstream team were contacting lawyers to discuss their options for recovering the domain through the courts.</p>
<p>Landis told <em>The Register</em> he was confident this route would have worked, but it could have taken months, and that length of downtime was simply unacceptable for any organization.</p>
<p>Flagstream is still in conversation with lawyers so the team can prepare itself should they ever have to face a similar situation in the future.</p>
<h3>Security nightmare</h3>
<p>Not only was it a stroke of good luck that Susan was helpful in reversing GoDaddy's error, but she was not someone with malign intent who with her newfound access could have carried out a range of attacks. Phishing and BEC are two of the more impactful possibilities, not to mention the opportunity for 27 years' worth of data theft.</p>
<p>Landis told us that throughout the episode, the primary concern was that the client's domain was in control of someone who could weaponize the situation.</p>
<p>"Our huge concern was that a bad actor had this domain because that would be a huge security risk. Since we no longer had control of the domain, there was nothing that we could do to stop this individual if they were a bad actor."</p>
<p>While managing GoDaddy's support, Flagstream worked with its client on ways to mitigate the attacks they anticipated following the transfer, including disconnecting company email addresses from all accounts, from banking and payroll to <a href="https://www.theregister.com/2026/04/10/amazon_climate_goals/">Amazon</a> and <a href="https://www.theregister.com/2025/07/30/dropbox_drops_dropbox_passwords/">Dropbox</a>.</p>
<p>Landis told us that at the time of writing, GoDaddy had still not contacted him nor Flagstream to address the matter. And when they tried to report the issues to GoDaddy's security team via email, the email bounced.</p>
<p>Asked whether Flagstream will continue with GoDaddy, Landis said the IT shop is evaluating its options.</p>
<p>"Most likely we will probably leave because we can't afford the risk of having other domains disappear. It will be a hassle to transfer our hundreds of domains, but it will be less of a hassle than what happened this last week."</p>
<h3>Fear is all that lingers</h3>
<p><em>The Register</em> spoke to the nonprofit affected by GoDaddy's domain transfer on condition of anonymity.</p>
<p>The CEO told us that technically, operations are entirely business-as-usual, though some staff remain fearful of clicking the wrong button and triggering a repeat of April's IT calamity.</p>
<p>"A number of our staff – we have a lot of social workers, and some of them are just not, maybe as tech-savvy as our administrative team – they were becoming fearful about touching anything," the CEO told <em>The Register</em>.</p>
<p>"I mean, even this morning I'm having issues, as everything gets back, and people are needing to log back into their <a href="https://www.theregister.com/2026/02/03/microsoft_retires_sharepoint_onedrive_standalone/">OneDrive</a>, and all these little kind of details, but there's a relief that even though this is taking extra time from my day, at least we know we have recovered the domain."</p>
<p><em>The Register</em> contacted GoDaddy for a response. It acknowledged the request, and told us it was investigating.</p>
<p>It did not deny the story, but disagreed with the assertion that it had authorized the transfer without the necessary documentation and approval.</p>
<p>"While we cannot comment on specific customer accounts, we have reviewed our protocols, and confirmed that we received proper documentation and authorization, and our standard operating procedures were followed," a GoDaddy spokesperson said.</p>
<p>"However, we are taking this opportunity to reinforce processes that help identify miscommunications between customers and representatives early, before they create downstream issues." ®</p>
