---
author: The Alan Turing Institute
cover_image: >-
  https://www.turing.ac.uk/sites/default/files/2025-07/turing_blog_-_why_we_still_need_small_language_models_2_-_the_alan_turing_institute.jpg
date: '2025-08-13T12:38:06.271Z'
dateFolder: 2025/08/13
description: >-
  Lean, locally run models can unlock huge benefits for public sector and
  compute-constrained environments
isBasedOn: >-
  https://www.turing.ac.uk/blog/why-we-still-need-small-language-models-even-age-frontier-ai
link: >-
  https://www.turing.ac.uk/blog/why-we-still-need-small-language-models-even-age-frontier-ai
slug: >-
  2025-08-13-httpswwwturingacukblogwhy-we-still-need-small-language-models-even-age-frontier-ai
tags:
  - ai
title: Why we still need small language models – even in the age of frontier AI
---
<p>In a six week sprint, we set out to see how far a small, open-weight language model could be pushed using lightweight tools and without massive infrastructure. By combining retrieval-augmented generation, reasoning trace fine-tuning, and budget forcing at inference time, our 3B model achieved near-frontier reasoning performance on real-world health queries – and is small enough to run locally on a laptop. We’re open-sourcing everything, and we believe this approach has enormous potential for public sector and compute-constrained environments.</p>
<h2 data-aos="fade-up" data-aos-delay="0">Introduction</h2>
<p>Over the last few years, large language models (LLMs) have made huge leaps in capability. They can generate code, solve university-level maths problems, and even offer plausible advice on health and policy. Today’s models demonstrate increasingly sophisticated reasoning, natural language understanding, and generalisation across domains.</p>
<p>Since the release of reasoning-focused models like OpenAI o1 and DeepSeek-R1, one thing has become clear: you can dramatically boost a model’s reasoning ability by spending more compute at run time – particularly by extending chain-of-thought traces. This strategy lets models break problems into sub-steps, explore alternatives, and even backtrack when needed. Think of it as giving the model a scratchpad for thinking out loud.</p>
<p>And when you combine highly capable models with strong test-time scaling strategies, frontier models can now tackle surprisingly complex tasks. A recent example: OpenAI and GDM’s models achieving <a href="https://www.nature.com/articles/d41586-025-02343-x">gold-medal standard</a> at the 2025 International Mathematics Olympiad.</p>
<p>But while these capabilities are impressive, deploying frontier models via commercial APIs comes with real trade-offs. The cost of inference can be prohibitive at scale. Reliance on closed-source providers raises the risk of vendor lock-in – especially problematic for public institutions like those we work with at the Turing. There are also privacy and deployment issues: centralised infrastructure isn’t always compatible with on-premise or secure workloads. And even open-weight frontier models like DeepSeek-R1 or Kimi K2 require serious hardware to run. Not to mention the growing concerns around energy usage and sustainability.</p>
<h3>Lean Language Models</h3>
<p>In response, there's been a surge of interest in lean models – typically in the 1B to 8B parameter range for local deployment, and up to ~30B for hosted setups. These smaller models don’t match frontier performance on generalist benchmarks, but they can be adapted quickly and cheaply to narrow tasks. When fine-tuned properly, they perform remarkably well, especially in settings where consistency, speed, privacy, or cost matter more than state-of-the-art generality. This makes them an <a href="https://arxiv.org/pdf/2506.02153">ideal candidate</a> for modern agentic AI workflows.</p>
<p>And the ecosystem has recognised this. We’ve seen a wave of small but capable models released over the past year: Microsoft’s Phi series, NVIDIA’s Nemotron-H family, DeepSeek’s compact distillations, Qwen3’s small models, and Hugging Face’s SmolLLM collection. These models demonstrate an important point: you don’t always need to scale up to get strong performance.</p>
<p>In fact, the low cost of inference and fine-tuning unlocks new opportunities: test-time scaling. This means improving reasoning not by training a larger model, but by spending more compute at inference, via techniques like iterative decoding, reranking, or self-consistency.</p>
<h3>The challenge we set ourselves</h3>
<p>We wanted to know: just how far can we push a small model? What’s the minimum scale at which we can still deliver strong performance on a complex real-world task?</p>
<p>To explore this, we ran a focused six-week sprint. The idea was simple: take a lean model, augment it with retrieval and test-time scaling, and see how close we could get to frontier-level results – without frontier-level compute.</p>
<p>To evaluate this post-training workflow in a real-world setting, we chose a domain with high practical relevance and well-structured public information: the <a href="https://www.nhs.uk/conditions/">NHS A-to-Z condition pages</a>. The goal was to build a conversational assistant that could interpret user-reported symptoms and medical history, then suggest a next step – whether that’s booking a GP appointment or heading to A&amp;E.</p>
<p>The model needed to do more than regurgitate information. It had to reason: to infer plausible conditions, connect them to retrieved evidence, and offer advice grounded in reliable content.</p>
<h3>The setup</h3>
<p>We began with a small, instruction-following model that didn’t have any test-time reasoning ability out of the box. After some experimentation, we settled on the Qwen2.5 family, which offered a good balance of performance and flexibility. We also evaluated Qwen3, but saw no significant improvement for our use case.</p>
<p>We initially wanted to fine-tune the model on high-quality training data. But medical data is hard to obtain and sensitive to use. So we bootstrapped.</p>
<p>We first generated synthetic queries – short descriptions of symptoms, each with a known underlying ground-truth condition. Then, using GPT-4o, we produced diverse rewrites and variations to simulate real user language, partially obscuring symptoms or overemphasising them to reflect real patient variability. In a real setting, you'd ideally supplement this with real user queries and expert annotations. But for prototyping, this worked surprisingly well.</p>
<figure><img alt="An image describing the pipeline" data-entity-type="file" data-entity-uuid="ed987a6a-034c-40d7-a1ad-ae0e4aee7711" src="https://www.turing.ac.uk/sites/default/files/inline-images/pipeline_overview%20-%20Turing%20blog%20-%20Why%20We%20Still%20Need%20Small%20Language%20Models%20-%20The%20Alan%20Turing%20Institute.png"/><figcaption>An image describing the pipeline</figcaption></figure>
<h3>Learning to reason with traces</h3>
<p>We fine-tuned the model on 2,000 examples, each consisting of:</p>
<ul><li>A user query,</li><li>A set of retrieved documents from NHS content, and</li><li>A reasoning trace generated by DeepSeek-R1.</li></ul>
<p>Each trace showed the model how to walk through the information – how to interpret symptoms, examine retrieved documents, and arrive at a well-justified conclusion.</p>
<p>Now, reasoning traces aren’t <a href="https://arxiv.org/pdf/2503.08679">ground truth</a>. They’re heuristics, not rigorous ex-ante justifications of the model's output. But there’s growing evidence that well-tuned chain-of-thought prompts can help smaller models learn how to think, especially when they’d otherwise default to shallow pattern matching. That said, we did encounter issues with the quality of DeepSeek's reasoning traces, but there are currently very few other large models which expose the reasoning traces.</p>
<p>Each trace outlined how to examine the query and documents before producing an answer. When fine-tuned on these traces, the small models gained significantly improved reasoning abilities: when presented with a new query and retrieved documents, they were able to competently contextualise the information and generate much stronger responses, often achieving performance comparable to far larger frontier models.</p>
<h3>Test-time scaling through budget forcing</h3>
<p><a href="https://arxiv.org/pdf/2501.19393">Budget forcing</a> is a simple yet powerful technique that improves a model’s reasoning by gently guiding how much it "thinks" at inference time. LLMs often terminate their answers too early, especially when solving multi-step problems, either due to a lack of confidence or because they’ve been trained on datasets where short answers are the norm. Budget forcing intervenes by explicitly controlling the number of reasoning steps a model takes, without changing the model weights.</p>
<p>Here's how it works: during generation, the model is monitored to see if it stops reasoning too soon (i.e. before reaching the expected budget of tokens). If it does, a special token, like Wait is appended, which prompts the model to continue reasoning further. If it’s thinking for too long or rambling, a separate delimiter or forced generation of an answer token can truncate the response at a desirable point.</p>
<p>This acts like a pacing mechanism, helping the model balance between cutting off too early and drifting into irrelevant detail. It’s surprisingly effective: by simply enforcing a longer reasoning trace at inference time, the model can solve significantly more complex problems, no extra training required.</p>
<p>We found that budget forcing is especially helpful for smaller models, making it a particularly effective test-time scaling strategy for our model. In our case, budget forcing helped the model hold its reasoning longer – producing deeper, more structured outputs even with minimal training.</p>
<h3>Results</h3>
<p>With just a few thousand synthetic examples and a bit of test-time reasoning, our lean model, just 3 billion parameters, was suddenly able to engage in thoughtful, grounded reasoning over real-world health content.</p>
<p>Out of the box, small models performed poorly on this task. Even with retrieval-augmented generation (RAG), they struggled to interpret documents or connect them to user input. RAG alone wasn’t enough.</p>
<p>But once we added lightweight test-time scaling techniques, the picture changed. The models became far more capable of drawing logical inferences from retrieved context. In many cases, their responses were nearly indistinguishable from those of much larger frontier models.</p>
<p>Our 3B model can run comfortably on a modern laptop: Frontier performance, local compute.</p>
<figure><img alt="A graph describing accuracy, model size " data-entity-type="file" data-entity-uuid="00fefb02-9f8c-43c8-9216-88438346eef6" src="https://www.turing.ac.uk/sites/default/files/inline-images/lean_models_comparison%20-%20Turing%20blog%20-%20Why%20We%20Still%20Need%20Small%20Language%20Models%20-%20The%20Alan%20Turing%20Institute.png"/><figcaption>A graph describing accuracy, model size </figcaption></figure>
<p>Also, keep in mind that these evaluations are based on the model's first response to the user's query. The model will ask follow-on questions where there's a lack of clarity, enabling it to quickly narrow down to a smaller set of symptoms and courses of actions.</p>
<h3>What we're sharing</h3>
<p>To support others working on lean model deployment, we’re publishing:</p>
<ul><li>Two technical reports documenting our pipeline, data generation, fine-tuning on HPC infrastructure, and evaluation process;</li><li>All our code and trained models, open-sourced for reproducibility and reuse;</li><li>The code for setting up a simple interface for multi-turn conversational interaction, allowing users to test the model in a realistic setting.</li></ul>
<p>We hope this makes it easier for teams, especially those in compute-constrained, privacy-sensitive, or public-sector environments, to build practical AI assistants that don’t require frontier-scale resources.</p>
<h3>Technical reports</h3>
<h3>What's next?</h3>
<p>The t0 team is now exploring ways to take this further:</p>
<ul><li>Exploring new approaches to scaling up reasoning capabilities in lean models through post-training and test-time strategies.</li><li>Applying the same techniques to new domains where lean models can deliver real-world value.</li></ul>
<p>In a world increasingly dominated by massive models and opaque APIs, we believe there’s still room for small, transparent, controllable systems. Models you can fine-tune, understand and run on your own terms.</p>
<p>We’d like to thank the Isambard-AI National AI Research Resource (AIRR) and Baskerville Tier 2 HPC service for compute access which helped facilitate this project.</p>
<figure><a href="https://www.turing.ac.uk/contact-us/join-turings-mailing-lists"><img alt="Yellow loudspeaker" data-src="/sites/default/files/styles/teaser/public/2025-04/yellow-megaphone_1_0.jpg?itok=cPlwZHDD" src="https://www.turing.ac.uk/sites/default/files/styles/teaser/public/2025-04/yellow-megaphone_1_0.jpg?itok=cPlwZHDD"/></a><figcaption><a href="https://www.turing.ac.uk/contact-us/join-turings-mailing-lists">Yellow loudspeaker</a></figcaption></figure>
