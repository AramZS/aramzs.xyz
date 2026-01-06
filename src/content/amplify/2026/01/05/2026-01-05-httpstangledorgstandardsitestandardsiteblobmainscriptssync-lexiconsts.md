---
author: tangled.org
cover_image: 'https://tangled.org/standard.site/standard.site/opengraph'
date: '2026-01-05T23:58:04.012Z'
dateFolder: 2026/01/05
description: Standard.site landing page built in Next.js
isBasedOn: >-
  https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts
link: >-
  https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts
slug: >-
  2026-01-05-httpstangledorgstandardsitestandardsiteblobmainscriptssync-lexiconsts
tags:
  - code
title: scripts/sync-lexicons.ts at main · standard.site/standard.site
---
<p><a href="https://tangled.org/standard.site">  standard.site </a> / <a href="https://tangled.org/standard.site/standard.site">standard.site</a></p>
<p> Standard.site landing page built in Next.js </p>
<p>   15    <a href="https://tangled.org/standard.site/standard.site/fork">  fork  </a> </p>
<p><a href="https://tangled.org/standard.site/standard.site/">    overview   </a> <a href="https://tangled.org/standard.site/standard.site/issues">    issues   </a> <a href="https://tangled.org/standard.site/standard.site/pulls">    pulls   </a> <a href="https://tangled.org/standard.site/standard.site/pipelines">    pipelines   </a></p>
<p><a href="https://tangled.org/standard.site/standard.site/tree/main">standard.site</a> / <a href="https://tangled.org/standard.site/standard.site/tree/main/scripts">scripts</a> / sync-lexicons.ts</p>
<p>at <a href="https://tangled.org/standard.site/standard.site/tree/main">main</a>  1.8 kB  <a href="https://tangled.org/standard.site/standard.site/raw/main/scripts/sync-lexicons.ts">view raw</a></p>
<p><code><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L1"> 1</a>import { AtpAgent } from "@atproto/api";
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L2"> 2</a>import { writeFileSync, mkdirSync, existsSync } from "fs";
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L3"> 3</a>import { join, dirname } from "path";
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L4"> 4</a>import { fileURLToPath } from "url";
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L5"> 5</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L6"> 6</a>const STANDARD_DID = "did:plc:re3ebnp5v7ffagz6rb6xfei4";
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L7"> 7</a>const LEXICON_COLLECTION = "com.atproto.lexicon.schema";
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L8"> 8</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L9"> 9</a>const LEXICONS_TO_SYNC = [
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L10">10</a>  "site.standard.publication",
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L11">11</a>  "site.standard.document",
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L12">12</a>  "site.standard.theme.basic",
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L13">13</a>  "site.standard.theme.color",
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L14">14</a>];
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L15">15</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L16">16</a>const __dirname = dirname(fileURLToPath(import.meta.url));
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L17">17</a>const OUTPUT_DIR = join(__dirname, "../app/data/lexicons");
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L18">18</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L19">19</a>const agent = new AtpAgent({
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L20">20</a>  service: "https://bsky.social",
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L21">21</a>});
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L22">22</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L23">23</a>async function fetchLexicon(nsid: string) {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L24">24</a>  const response = await agent.com.atproto.repo.getRecord({
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L25">25</a>    repo: STANDARD_DID,
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L26">26</a>    collection: LEXICON_COLLECTION,
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L27">27</a>    rkey: nsid,
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L28">28</a>  });
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L29">29</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L30">30</a>  return response.data.value;
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L31">31</a>}
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L32">32</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L33">33</a>function getFileName(nsid: string): string {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L34">34</a>  // site.standard.publication -&gt; publication.json
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L35">35</a>  // site.standard.theme.basic -&gt; theme.basic.json
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L36">36</a>  const parts = nsid.split(".");
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L37">37</a>  const name = parts.slice(2).join(".");
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L38">38</a>  return `${name}.json`;
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L39">39</a>}
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L40">40</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L41">41</a>async function main() {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L42">42</a>  console.log("Syncing lexicons from AT Protocol...\n");
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L43">43</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L44">44</a>  if (!existsSync(OUTPUT_DIR)) {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L45">45</a>    mkdirSync(OUTPUT_DIR, { recursive: true });
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L46">46</a>    console.log(`Created directory: ${OUTPUT_DIR}\n`);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L47">47</a>  }
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L48">48</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L49">49</a>  for (const nsid of LEXICONS_TO_SYNC) {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L50">50</a>    try {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L51">51</a>      console.log(`Fetching ${nsid}...`);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L52">52</a>      const lexicon = await fetchLexicon(nsid);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L53">53</a>      const fileName = getFileName(nsid);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L54">54</a>      const filePath = join(OUTPUT_DIR, fileName);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L55">55</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L56">56</a>      writeFileSync(filePath, JSON.stringify(lexicon, null, 2));
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L57">57</a>      console.log(`  Saved to ${fileName}`);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L58">58</a>    } catch (error) {
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L59">59</a>      console.error(`  Failed to fetch ${nsid}:`, error);
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L60">60</a>    }
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L61">61</a>  }
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L62">62</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L63">63</a>  console.log("\nSync complete.");
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L64">64</a>}
<a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L65">65</a><a href="https://tangled.org/standard.site/standard.site/blob/main/scripts/sync-lexicons.ts/#L66">66</a>main();
</code></p>
