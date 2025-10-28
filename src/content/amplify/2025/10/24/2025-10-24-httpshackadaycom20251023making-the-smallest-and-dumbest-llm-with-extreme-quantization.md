---
author: Maya Posch & Nizze The Kilted Swede
cover_image: 'https://hackaday.com/wp-content/uploads/2017/02/ghost.jpg'
date: '2025-10-24T07:26:53.447Z'
dateFolder: 2025/10/24
description: >-
  The reason why large language models are called ‘large’ is not because of how
  smart they are, but as a factor of their sheer size in bytes.
isBasedOn: >-
  https://hackaday.com/2025/10/23/making-the-smallest-and-dumbest-llm-with-extreme-quantization/
link: >-
  https://hackaday.com/2025/10/23/making-the-smallest-and-dumbest-llm-with-extreme-quantization/
slug: >-
  2025-10-24-httpshackadaycom20251023making-the-smallest-and-dumbest-llm-with-extreme-quantization
tags:
  - ai
  - code
title: Making The Smallest And Dumbest LLM With Extreme Quantization
---
<div><article itemscope="" itemtype="http://schema.org/Article">
<div itemprop="articleBody">
<figure aria-describedby="caption-attachment-871262"><a href="https://hackaday.com/wp-content/uploads/2025/10/smallest_llm_int4_compression_output_codeically_youtube.jpg"><img alt="Turns out that training on Twitch quotes doesn't make an LLM a math genius. (Credit: Codeically, YouTube)" data-attachment-id="871262" data-comments-opened="1" data-image-caption="&lt;p&gt;Turns out that training on Twitch quotes doesn’t make an LLM a math genius. (Credit: Codeically, YouTube)&lt;/p&gt;
" data-image-description="" data-image-meta='{"aperture":"0","credit":"","camera":"","caption":"","created_timestamp":"0","copyright":"","focal_length":"0","iso":"0","shutter_speed":"0","title":"","orientation":"0"}' data-image-title="smallest_llm_int4_compression_output_codeically_youtube" data-large-file="https://hackaday.com/wp-content/uploads/2025/10/smallest_llm_int4_compression_output_codeically_youtube.jpg?w=372" data-medium-file="https://hackaday.com/wp-content/uploads/2025/10/smallest_llm_int4_compression_output_codeically_youtube.jpg?w=372" data-orig-file="https://hackaday.com/wp-content/uploads/2025/10/smallest_llm_int4_compression_output_codeically_youtube.jpg" data-orig-size="372,372" data-permalink="https://hackaday.com/2025/10/23/making-the-smallest-and-dumbest-llm-with-extreme-quantization/smallest_llm_int4_compression_output_codeically_youtube/" decoding="async" height="372" sizes="(max-width: 372px) 100vw, 372px" src="https://hackaday.com/wp-content/uploads/2025/10/smallest_llm_int4_compression_output_codeically_youtube.jpg?w=372" width="372"/></a><figcaption>Turns out that training on Twitch quotes doesn’t make an LLM a math genius. (Credit: Codeically, YouTube)</figcaption></figure>
<p>The reason why large language models are called ‘large’ is not because of how smart they are, but as a factor of their sheer size in bytes. At billions of parameters at four bytes each, they pose a serious challenge when it comes to not just their size on disk, but also in RAM, specifically the RAM of your videocard (VRAM). Reducing this immense size, as is done routinely for the smaller pretrained models which one can download for local use, involves quantization. This process is <a href="https://www.youtube.com/watch?v=a7TOameRqoY" target="_blank">explained and demonstrated</a> by [Codeically], who takes it to its logical extreme: reducing what could be a GB-sized model down to a mere 63 MB by reducing the bits per parameter.</p>
<p>While you can offload a model, i.e. keep only part of it in VRAM and the rest in system RAM, this massively impacts performance. An alternative is to use fewer bits per weight in the model, called ‘compression’, which typically involves reducing 16-bit floating point to 8-bit, reducing memory usage by about 75%. Going lower than this is generally deemed unadvisable.</p>
<p>Using GPT-2 as the base, it was trained with a pile of internet quotes, creating parameters with a very anemic 4-bit integer size. After initially manually zeroing the weights made the output too garbled, the second attempt without the zeroing did somewhat produce usable output before flying off the rails. Yet it did this with a 63 MB model at 78 tokens a second on just the CPU, demonstrating that you can create a pocket-sized chatbot to spout nonsense even without splurging on expensive hardware.</p>
<p><span></span></p>
<p><div class="rw-embed-wrapper"><embed src="https://www.youtube.com/embed/a7TOameRqoY?feature=oembed" type="video/mp4"/></div></p>
</div>
</article>
</div>
