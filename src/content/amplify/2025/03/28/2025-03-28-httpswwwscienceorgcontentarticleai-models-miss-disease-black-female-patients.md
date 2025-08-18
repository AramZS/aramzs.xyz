---
author: Rodrigo Pérez Ortega
cover_image: >-
  https://www.science.org/do/10.1126/science.z6nublt/abs/_20250321_on_ai_xray_bias.jpg
date: '2025-03-28T12:28:10.000Z'
dateFolder: 2025/03/28
description: >-
  A new study found that an AI model used to analyze chest x-rays often misses
  diseases in Black women and younger patients. The model, CheXzero, performed
  well overall but showed significant bias against marginalized groups. Experts
  suggest using more diverse data sets to improve AI accuracy and highlight the
  importance of human oversight in medical decisions.
isBasedOn: >-
  https://www.science.org/content/article/ai-models-miss-disease-black-female-patients
link: >-
  https://www.science.org/content/article/ai-models-miss-disease-black-female-patients
slug: >-
  2025-03-28-httpswwwscienceorgcontentarticleai-models-miss-disease-black-female-patients
tags:
  - ai
  - health
title: AI models miss disease in Black and female patients
---
<h2>Analysis of chest x-rays underscores need for monitoring artificial intelligence tools for bias, experts say</h2>
<figure><p> </p><img alt="Doctor Pointing at Chest X Ray" src="https://www.science.org/do/10.1126/science.z6nublt/full/_20250321_on_ai_xray_bias-1743015054707.jpg"/><p> </p><p> </p><figcaption>An artificial intelligence model commonly used to detect disease from chest x-rays misses conditions in Black women more often than it does in other populations.</figcaption></figure>
<p>From programs designed to detect irregular heartbeats in electrocardiograms to software that tracks eye movements to diagnose autism in children, artificial intelligence (AI) is helping physicians fine-tune the care they provide patients. But for all the technology’s potential for automating tasks, a growing body of evidence also shows that AI can be prone to bias that disadvantages already vulnerable patients. A new study, published today in <em>Science Advances,</em> adds to this work by testing one of the most cited AI models used to scan chest x-rays for diseases—and finding the <a href="https://www.science.org/doi/10.1126/sciadv.adq0305">model doesn’t accurately detect potentially life-threatening diseases in marginalized groups</a>, including women and Black people.</p>
<p>These results “are interesting and timely,” says Kimberly Badal, a computational biologist at the University of California (UC), San Francisco, who was not involved in the new study. “We are at the point in history where we’re moving to deploy a lot of AI models into clinical care,” she says, but “we don’t really know” how they affect different groups of people.</p>
<p>The model used in the new study, called CheXzero, was developed in 2022 by a team at Stanford University using a data set of almost 400,000 chest x-rays of people from Boston with conditions such as pulmonary edema, an accumulation of fluids in the lungs. Researchers fed their model the x-ray images without any of the associated radiologist reports, which contained information about diagnoses. And yet, CheXzero was just <a href="https://www.nature.com/articles/s41551-022-00936-9">as good as the radiologists in reading the diseases</a> associated with each x-ray.</p>
<p>Given <a href="https://www.nature.com/articles/s41591-021-01595-0">AI models’ tendencies for bias</a>, Yuzhe Yang, a computer scientist at UC Los Angeles wanted to assess the Stanford team’s model for such biases. His team selected a subset of 666 x-ray images from the same data set that was used to train the model: the data set’s only images that also came with radiologists’ diagnoses and information about each patient’s age, sex, and race. The team then fed these images to CheXzero and compared the results against the radiologists’ diagnoses.</p>
<p>Compared with the patients’ doctors, the AI model more often failed to detect the presence of disease in Black patients or women, as well in those 40 years or younger. When the researchers looked at race and sex combined, Black women fell to the bottom, with the AI not detecting disease in half of them for conditions such as cardiomegaly, or enlargement of the heart. These disparities persisted when the team tested CheXzero using four other public data sets of chest x-rays from other regions, including Spain and Vietnam.</p>
<p>“I’m not surprised by that finding at all,” Badal says. Other studies have shown biases among subgroups, and the new study confirms this, she says. “There is so much variation in populations and their biology that I find it very hard to believe that eventually, one day, we will have ‘one model to rule them all.’”</p>
<p>Yang and his team wanted to then tease out the possible root of the bias. Previous research had shown that <a href="https://www.thelancet.com/journals/landig/article/PIIS2589-7500(22)00063-2/fulltext">AI models can be trained to detect race</a> from x-rays with high accuracy, even when clinical experts can’t, so the team set out to test CheXzero’s ability to do the same by asking the model to predict the sex, age, and race of patients using only the x-ray images. They found CheXzero could detect these characteristics in a high percentage of the patients—almost 80% when it came to race, for instance. By contrast, when three board-certified, experienced radiologists at the University of Washington’s School of Medicine tried to do the same, their highest success rate was just about 50%.</p>
<p>“There might be some hidden signals within the radiography itself that we cannot identify visually,” Yang says. He thinks the model may be using the information as a diagnostic “shortcut” to associate traits such as age with certain conditions and not others, developing a bias in the process.</p>
<p>To force CheXzero to avoid shortcuts and therefore try to mitigate this bias, the team repeated the experiment but deliberately gave the race, sex, or age of patients to the model together with the images. The model’s rate of “missed” diagnoses decreased by half—but only for some conditions.</p>
<p>Yang and his team are unsure what may be causing the mixed success. There may be bias baked into the model itself: The data set used to train CheXzero included more men, more people between 40 and 80 years old, and more white patients, which Yang says underscores the need for larger, more diverse data sets.</p>
<p>“What is clear is that it’s going to be really difficult to mitigate these biases,” says Judy Gichoya, an interventional radiologist and informatician at Emory University who was not involved in the study. Instead, she advocates for smaller, but more diverse data sets that test these AI models to identify their flaws and correct them on a small scale first. Even so, “Humans have to be in the loop,” she says. “AI can’t be left on its own.”</p>
