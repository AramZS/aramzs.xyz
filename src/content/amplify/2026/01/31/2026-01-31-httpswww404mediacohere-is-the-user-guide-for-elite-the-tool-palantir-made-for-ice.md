---
author: Joseph Cox · Jan 30
cover_image: 'https://www.404media.co/content/images/size/w1200/2026/01/elite-guide.png'
date: '2026-02-01T01:56:24.455Z'
dateFolder: 2026/01/31
description: >-
  404 Media is publishing a version of the user guide for ELITE, which lets ICE
  bring up dossiers on individual people and provides a “confidence score” of
  their address.
isBasedOn: >-
  https://www.404media.co/here-is-the-user-guide-for-elite-the-tool-palantir-made-for-ice/
link: >-
  https://www.404media.co/here-is-the-user-guide-for-elite-the-tool-palantir-made-for-ice/
slug: >-
  2026-01-31-httpswww404mediacohere-is-the-user-guide-for-elite-the-tool-palantir-made-for-ice
tags:
  - tech
  - privacy
  - politics
title: 'Here is the User Guide for ELITE, the Tool Palantir Made for ICE'
---
<p><a href="https://www.404media.co/tag/ice/">ICE</a> </p>
<p>404 Media is publishing a version of the user guide for ELITE, which lets ICE bring up dossiers on individual people and provides a “confidence score” of their address.</p>
<figure><img alt="Here is the User Guide for ELITE, the Tool Palantir Made for ICE" data-ll-status="loading" data-sizes="(max-width: 800px) 50vw,
                (max-width: 1170px) 60vw,
                1400px" data-src="/content/images/size/w2000/2026/01/elite-guide.png" data-srcset="/content/images/size/w300/2026/01/elite-guide.png 300w,
                /content/images/size/w600/2026/01/elite-guide.png 600w,
                /content/images/size/w1000/2026/01/elite-guide.png 1000w,
                /content/images/size/w2000/2026/01/elite-guide.png 2000w" sizes="(max-width: 800px) 50vw,
                (max-width: 1170px) 60vw,
                1400px" src="https://www.404media.co/content/images/size/w2000/2026/01/elite-guide.png" srcset="https://www.404media.co/content/images/size/w300/2026/01/elite-guide.png 300w,
"/><figcaption>Image: Reconstruction by 404 Media/Evy Kwong.</figcaption></figure>
<p>Earlier this month <a href="https://www.404media.co/elite-the-palantir-app-ice-uses-to-find-neighborhoods-to-raid/"><u>we revealed Immigration and Customs Enforcement (ICE) is using a Palantir tool</u></a> called ELITE to decide which neighborhoods to raid.</p>
<p>The tool lets ICE populate a map with potential deportation targets, bring up dossiers on each person, and view an address “confidence score” based on data sourced from the Department of Health and Human Services (HHS) and other government agencies. This is according to a user guide for ELITE 404 Media obtained.</p>
<p>404 Media is now publishing a version of that user guide so people can read it for themselves.</p>
<p><b><strong>Do you know anything else about ELITE? Do you work at Palantir, ICE, or CBP? I would love to hear from you. Using a non-work device, you can message me securely on Signal at joseph.404 or send me an email at joseph@404media.co.</strong></b></p>
<p>404 Media is not publishing the original document for source protection reasons, but has retyped a version below. 404 Media has made some formatting tweaks for clarity and reconstructed some of the images in the guide (some of the images in the original are blurred). We previously did similar with an <a href="https://www.404media.co/this-is-palantirs-justification-for-building-ices-master-database/"><u>internal Palantir wiki</u></a> in which the company explained its work with ICE.</p>
<p>Senator Ron Wyden previously told 404 Media in a statement, “The fact ICE is using this app proves the completely indiscriminate nature of the agency's aggressive and violent incursions into our communities. This app allows ICE to find the closest person to arrest and disappear, using government and commercial data, with the help of Palantir and Trump's Big Brother databases. It makes a mockery of the idea that ICE is trying to make our country safer. Rather, agents are reportedly picking people to deport from our country the same way you'd choose a nearby coffee shop.”</p>
<p>Palantir did not respond to a request for comment. But after publication of our original article, the <a href="https://blog.palantir.com/correcting-the-record-response-to-the-eff-january-15-2026-report-on-palantir-4b3a12536cd2?postPublishedType=repub&amp;ref=404media.co"><u>company wrote a blog post</u></a>, which said in part, “The ELITE tool is used for prioritized enforcement to surface the likely addresses of specific individuals, such as those with final orders of removal or with high severity criminal charges. The purpose of this tool is identifying the location of known foreign nationals who meet criteria for removal, not for mass prioritization of ‘locations where lots of people it might detain could be based.’”</p>
<p>One section of the guide indicates that during “special operations,” which target “groups of pre-defined aliens” leadership wants action against, normal safeguards in ELITE may need to be turned off. By default, the tool shows people with a final order of deportation, and with no reason preventing their removal (these can be turned off by a user of the tool). For special operations, the guide says those filters may need to be removed “to display all targets within a Special Operation dataset.” Palantir did not respond to a specific question asking if this undercuts the idea ELITE is a targeted, rather than broad, tool.</p>
<p>In testimony 404 Media obtained from a case in Oregon, an ICE official said ELITE is what ICE sometimes uses to track the apparent density of people at a particular location to target. “You’re going to go to a more dense population rather than [...] like, if there’s one pin at a house and the likelihood of them actually living there is like 10 percent [...] you’re not going to go there,” the official said. “It’s basically a map of the United States. It’s kind of like Google Maps.” That case related to a woman, who has the initials MJMA in the court records, who was detained with more than 30 other people in what her lawyers <a href="https://www.chronline.com/stories/oregon-lawyers-seek-court-order-to-halt-ice-warrantless-arrests,394264?ref=404media.co"><u>described as a dragnet</u></a>.</p>
<p>The Department of Homeland Security (DHS) did not respond to a request for comment.</p>
<p>The user guide follows below.</p>
<p><strong>Overview</strong></p>
<p>Enhanced Leads Identification &amp; Targeting for Enforcement (ELITE) is a targeting tool designed to improve capabilities for identifying and prioritizing high-value targets through advanced analytics. Key functionality includes:</p>
<p>• ELITE enhances target viability and reduces officer workload by integrating new data sources</p>
<p>• ELITE employs an address confidence score that evaluates both the reliability of the source and the recency of the data to enhance prioritization</p>
<p>• ELITE provides the capability to export target lists</p>
<p>• ELITE auto-populates initial key FOW information</p>
<p>• ELITE interfaces with EID for encounters, EARM for cases, and EADM for detention data</p>
<p>• ELITE includes a geospatial heat map to better inform the field in developing articulable facts for consensual encounters</p>
<p><strong>ELITE Workflow</strong></p>
<p>The ELITE workflow includes all phases of targeting from identifying subjects to disposition.</p>
<p>1. Individuals are identified and sent to AOR-specific review queue</p>
<p>2. Officer conducts review of leads</p>
<p>3. Officer refines leads into list of actionable targets</p>
<p>4. Supervisors review the actionable targets and moves selections into the planning stage</p>
<p>5. After case is worked, officers disposition target</p>
<p><strong>Home Screen</strong></p>
<p>The ELITE home screen includes three main tabs: <strong>Enforcement Lead Tracker</strong> and <strong>Geospatial</strong></p>
<p><strong>Lead Sourcing</strong>, and <strong>UID Search</strong>.</p>
<p>The <strong>Enforcement Lead Tracker</strong> tab displays leads assigned to your queue, the <strong>Geospatial Lead Sourcing</strong> tab displays potential leads based on a map-view, and the <strong>UID Search</strong> tab allows you to look up individuals based on a Unique Identifier.</p>
<p>On the bottom left of the Home Screen, details about your profile are visible.</p>
<p>1. Creating a lead from UID Search</p>
<p>a. On the UlD tab you can search by many attributes for an individual anywhere within the immigration lifecycle.</p>
<p><em><strong>NOTE:</strong> Ensure you verify entries and press Enter to run the search.</em></p>
<p>a. A list of results will appear in the <strong>Results</strong> pane.</p>
<p>b. Select a row to view individual details. Key Sections include:</p>
<p>i. Unique Identifiers: A-Number, FBI Number, etc.</p>
<p>ii. Tags/Flags: Detention or criminal indicators.</p>
<p>iii. Biographical Information.</p>
<p>iv. Addresses.</p>
<p>c. On the top right corner, you may create a lead on this individual.</p>
<p>d. If the system detects an existing lead, it will be visible at the top of the pop-up.</p>
<p>e. Select a queue option (e.g., Enforcement Review Queue) to continue.</p>
<p>f. Click Create once the queue is selected</p>
<p>2. Creating bulk leads from UID Search</p>
<p>a. In the results pane, you can select up to 50 individuals with the checkboxes.</p>
<p><em><strong>NOTE:</strong> Leads created in UID will populate into YOUR Enforcement Review Queue regardless of where the individual's highest confidence address is located.</em></p>
<p><strong>Geospatial Lead Sourcing Tab</strong></p>
<p>The <strong>Geospatial Lead Sourcing</strong> tab allows you to populate the <strong>Enforcement Review</strong> queue with leads by applying filters and selecting individuals from a map.</p>
<ol><li>Apply Filters</li></ol>
<p>a. ELITE default filters include Final Order= Yes, Reasons preventing removal= No, New Address Since Case Closed= No, and Active Case= Yes.</p>
<p>b. ELITE allows you to filter results by several other attributes organized by the following categories (Bio &amp; IDs; Location; EID, EARM, IJ, CIS; Criminality (ACRIMe, NLETS, NCIC); Operations; Leads; Enrichments)</p>
<p>c. Confirm filters are correct and select <em>View Results</em> to see the cases displayed on the map</p>
<p>2. Select Individuals on the Map</p>
<p>a. You may select individuals one at a time or use the radius or polygon to select a focal area. You may need to zoom into your selection before drawing your focal area, then select individuals for review and possible nomination to the <strong>Enforcement Review</strong> queue. You are restricted to only viewing possible targets in your IMM current duty location.</p>
<p>3. Choose from Selected Individuals</p>
<p>a. Selected individuals will be listed on the bottom half of the screen.</p>
<figure><a data-fslightbox="" data-no-swup="" href="https://www.404media.co/content/images/2026/01/elite-spreadsheet.jpeg"><img alt="" sizes="(min-width: 720px) 720px" src="https://www.404media.co/content/images/2026/01/elite-spreadsheet.jpeg" srcset="https://www.404media.co/content/images/size/w600/2026/01/elite-spreadsheet.jpeg 600w, https://www.404media.co/content/images/size/w1000/2026/01/elite-spreadsheet.jpeg 1000w, https://www.404media.co/content/images/2026/01/elite-spreadsheet.jpeg 1600w"/></a><figcaption>Image: Reconstruction by 404 Media/Evy Kwong.</figcaption></figure>
<p>b. Selecting an individual provides a preview of their record. Some of the data shown here includes name, A-Number, major case info, tags/flags for pertinent details, Unique IDs, and biographical data. The boxes highlighted across from the subject's Photo can be selected to show additional pertinent information. The individual timeline displays relevant encounters, detention, detainers and EOIR decisions on the right side of the screen.</p>
<figure><a data-fslightbox="" data-no-swup="" href="https://www.404media.co/content/images/2026/01/elite-dossier.jpeg"><img alt="" sizes="(min-width: 720px) 720px" src="https://www.404media.co/content/images/2026/01/elite-dossier.jpeg" srcset="https://www.404media.co/content/images/size/w600/2026/01/elite-dossier.jpeg 600w, https://www.404media.co/content/images/size/w1000/2026/01/elite-dossier.jpeg 1000w, https://www.404media.co/content/images/size/w1600/2026/01/elite-dossier.jpeg 1600w, https://www.404media.co/content/images/2026/01/elite-dossier.jpeg 1920w"/></a><figcaption>Image: Reconstruction by 404 Media/Evy Kwong.</figcaption></figure>
<p><em>NOTE: Address confidence score is a new feature of ELITE that factors in address recency and source (CLEAR, ACRIME Criminal Record, ACRIME RAP sheet Query, USCIS from UIP, HHS, NCATC, etc.) to generate a numerical value. Addresses are color coded (red, yellow, green). Red represents the address has a low confidence. Yellow represents a moderate confidence. Green represents a high confidence.</em></p>
<p>4. Create Leads</p>
<p>a. Selecting <strong>Create Leads</strong> will generate a pop-up with the headings <strong>New</strong> and <strong>Already Exists</strong>. Selecting the <strong>Create</strong> button continues the workflow by generating a new lead, but if a lead already exists it will be identified here for further review. Select <strong>Create</strong> to send the desired selected targets to the <strong>Enforcement Review</strong> queue/tab list. You can create <strong>up to 50 leads</strong> for review.</p>
<p><em><strong>NOTE:</strong> A tagging feature enables potential leads to be labelled for easier organization and assigning for officer review.</em></p>
<p><strong>Special Operations Filter</strong></p>
<p><strong>Special Operations</strong> are groups of pre-defined aliens specifically targeted by Leadership for action. Utilization of filters (including default filters) could change the intended target list for your area. As always, make sure you do your due diligence on each target to confirm removability prior to acting. Officers should consult ICE broadcasts or leadership for guidance on when to use these filters.</p>
<p>To filter by Special Operation, select the <strong>Click to Modify Filters</strong> button on the <strong>Geospatial Lead Sourcing</strong> tab.</p>
<p>The drop box will include a list of all available operations to select from</p>
<p><em><strong>NOTE:</strong> Default filters such as <strong>Case Final Order Indicator = Yes</strong> and <strong>Are there reasons</strong></em></p>
<p><em><strong>preventing removal? = No</strong> may need to be removed to display all targets within a Special Operation dataset</em></p>
<p><strong>Enforcement Review Queue</strong></p>
<p>The <strong>Enforcement Review</strong> queue displays leads generated from the <strong>Geospatial Lead Sourcing</strong> tab. Here, officers are expected to validate leads in ELITE and determine which are best suitable to move to the <strong>Actionable Target</strong> queue.</p>
<p>1. In the Enforcement Review queue/tab the <strong>Apply Filters</strong> section can be used to isolate leads by office, keywords, or lead creator.</p>
<p>2. Selecting each alien individually will allow you to: Request Supervisor Action (reassignment or transfer) <strong>Add Enrichment or Note, Generate FOW,</strong> or <strong>Share.</strong></p>
<p>a. Selecting <strong>Add Enrichment or Note</strong> will allow you to enter an Investigative Note, Attachment, Additional Address, Vehicle Information, Additional ID, Employer, Known Associate, Social Media, or Phone Number.</p>
<p>3. Select the check boxes on the desired aliens this will populate the <strong>Move Leads to Actionable Targets Queue</strong> section on the right. Select <strong>Submit</strong> to send the leads to the Actionable Targets queue.</p>
<p><strong>NOTE:</strong> You can select each desired subject to review whether they are a good candidate for an actionable target list, and/or enrich the lead prior to sending it to the next queue. The <strong>Move to Actionable Targets Queue</strong> button can be used to send a single target to the next queue upon completion of a review/enrichment. The <strong>Archive Lead</strong> button moves the lead to a queue where it can still be enriched and is discoverable in the map, but it cannot be dispositioned.</p>
<p><em><strong>NOTE:</strong> Archiving a lead will require the officer to enter a justification.</em></p>
<p><strong>Tags</strong></p>
<p>Tags serve to collate data for further operations based off user specified input, such as gang activity, local operation names or specific locations where operations will occur, as they relate to individuals. The <strong>Edit Tags</strong> button exists in the top selection bar within the enforcement lead tracker.</p>
<p>After selecting <strong>Edit Tags</strong> you will have the ability to create new tags, view details of existing tags and search for tags within your AOR. Below is an example of Create New Tag dialog box.</p>
<p>Users will be asked to create a Tag Name and to grant other users the ability to view or edit tags.</p>
<p>They also can also add leads to the tag upon creation.</p>
<p><em><strong>NOTE:</strong> By default, all those in your AOR can view tags. Sharing further limits view to only those listed and tagging yourself limits the view to only yourself.</em></p>
<p>By clicking on <strong>View Details</strong>, users can further investigate information related to tags. Those with edit permission can also utilize the <strong>Edit Lead, Edit Viewers</strong> or <strong>Edit Editors</strong> button in the upper right corner. This will allow them to add or remove leads themselves, viewers or editors.</p>
<p>Users can also add Tag leads in bulk from within the Enforcement Review, Actionable Targets or Planning and Dispositioning queues. To do this, select the <strong>check box</strong> next to the leads you wish to tag, then select the <strong>Bulk Actions</strong> button in the upper right-hand corner. You will be given a preview pane and the ability to select from a drop down of tags you have access to within your AOR.</p>
<p><strong>Actionable Targets Queue</strong></p>
<p>The <strong>Actionable Targets</strong> queue displays a list of vetted targets deemed eligible for planning and execution. A supervisor is required to move a target from the <strong>Actionable Targets</strong> queue to the <strong>Planning</strong> queue.</p>
<p>(Supervisors only) to send leads to the <strong>Planning</strong> queue:</p>
<ol><li>From the <strong>Actionable Targets</strong> queue, select the check boxes of the desired aliens on the list. You can send <strong>up to 15</strong> leads for action.</li><li>Select <strong>Submit</strong> to send the leads to the <strong>Planning</strong> queue.</li></ol>
<figure><a data-fslightbox="" data-no-swup="" href="https://www.404media.co/content/images/2026/01/elite-map.jpeg"><img alt="" sizes="(min-width: 720px) 720px" src="https://www.404media.co/content/images/2026/01/elite-map.jpeg" srcset="https://www.404media.co/content/images/size/w600/2026/01/elite-map.jpeg 600w, https://www.404media.co/content/images/size/w1000/2026/01/elite-map.jpeg 1000w, https://www.404media.co/content/images/size/w1600/2026/01/elite-map.jpeg 1600w, https://www.404media.co/content/images/2026/01/elite-map.jpeg 1920w"/></a><figcaption>Image: Reconstruction by 404 Media/Evy Kwong.</figcaption></figure>
<p><strong>Planning Queue</strong></p>
<p>Once in the Planning Queue, both officer and supervisors can continue to work the lead.</p>
<p>To create an operation packet:</p>
<p>1. Select the desired subjects and right-click anywhere to export the list to Excel</p>
<p>2. If desired, select each target individually that will be part of the operation and print the FOW.</p>
<p><strong>Dispositioning</strong></p>
<p>In the <strong>Dispositioning</strong> queue, officers can review leads post enforcement operations and provide an outcome/disposition status relative to each. The disposition status of the lead post operation is crucial for reporting purposes.</p>
<ol><li>From the <strong>Planning</strong> queue, select the check boxes of the desired aliens on the list. You can send <strong>up to 15 leads</strong> for dispositioning.</li><li>Select <strong>Submit</strong> to send the leads to the <strong>Disposition</strong> queue.</li><li>From the <strong>Dispositioning</strong> queue, select each alien and select the appropriate disposition status from the dropdown. Disposition each alien individually.</li></ol>
<figure><a href="https://www.404media.co/dhs-says-critical-ice-surveillance-footage-from-abuse-case-was-actually-never-recorded-doesnt-matter/"><img alt="DHS Says Critical ICE Surveillance Footage From Abuse Case Was Actually Never Recorded, Doesn't Matter" data-sizes="(max-width: 1000px) 50vw, 700px" data-src="/content/images/size/w1000/2026/01/54698623148_3365dfeabb_k.jpg" data-srcset="/content/images/size/w300/2026/01/54698623148_3365dfeabb_k.jpg 300w,
                  /content/images/size/w600/2026/01/54698623148_3365dfeabb_k.jpg 600w,
                  /content/images/size/w1000/2026/01/54698623148_3365dfeabb_k.jpg 1000w,
                  /content/images/size/w2000/2026/01/54698623148_3365dfeabb_k.jpg 2000w" src="https://www.404media.co/content/images/size/w2000/2026/01/54698623148_3365dfeabb_k.jpg" srcset="https://www.404media.co/content/images/size/w300/2026/01/54698623148_3365dfeabb_k.jpg 300w,
"/></a><figcaption><a href="https://www.404media.co/dhs-says-critical-ice-surveillance-footage-from-abuse-case-was-actually-never-recorded-doesnt-matter/">DHS Says Critical ICE Surveillance Footage From Abuse Case Was Actually Never Recorded, Doesn't Matter</a></figcaption></figure>
<figure><a href="https://www.404media.co/ices-facial-recognition-app-misidentified-a-woman-twice/"><img alt="ICE’s Facial Recognition App Misidentified a Woman. Twice" data-sizes="(max-width: 1000px) 50vw, 700px" data-src="/content/images/size/w1000/2026/01/54977911914_4995b93005_k.jpg" data-srcset="/content/images/size/w300/2026/01/54977911914_4995b93005_k.jpg 300w,
                  /content/images/size/w600/2026/01/54977911914_4995b93005_k.jpg 600w,
                  /content/images/size/w1000/2026/01/54977911914_4995b93005_k.jpg 1000w,
                  /content/images/size/w2000/2026/01/54977911914_4995b93005_k.jpg 2000w" src="https://www.404media.co/content/images/size/w2000/2026/01/54977911914_4995b93005_k.jpg" srcset="https://www.404media.co/content/images/size/w300/2026/01/54977911914_4995b93005_k.jpg 300w,
"/></a><figcaption><a href="https://www.404media.co/ices-facial-recognition-app-misidentified-a-woman-twice/">ICE’s Facial Recognition App Misidentified a Woman. Twice</a></figcaption></figure>
<figure><a href="https://www.404media.co/elite-the-palantir-app-ice-uses-to-find-neighborhoods-to-raid/"><img alt="‘ELITE’: The Palantir App ICE Uses to Find Neighborhoods to Raid" data-sizes="(max-width: 1000px) 50vw, 700px" data-src="/content/images/size/w1000/2026/01/54976776897_a1f5f78a32_k.jpg" data-srcset="/content/images/size/w300/2026/01/54976776897_a1f5f78a32_k.jpg 300w,
                  /content/images/size/w600/2026/01/54976776897_a1f5f78a32_k.jpg 600w,
                  /content/images/size/w1000/2026/01/54976776897_a1f5f78a32_k.jpg 1000w,
                  /content/images/size/w2000/2026/01/54976776897_a1f5f78a32_k.jpg 2000w" src="https://www.404media.co/content/images/size/w2000/2026/01/54976776897_a1f5f78a32_k.jpg" srcset="https://www.404media.co/content/images/size/w300/2026/01/54976776897_a1f5f78a32_k.jpg 300w,
"/></a><figcaption><a href="https://www.404media.co/elite-the-palantir-app-ice-uses-to-find-neighborhoods-to-raid/">‘ELITE’: The Palantir App ICE Uses to Find Neighborhoods to Raid</a></figcaption></figure>
