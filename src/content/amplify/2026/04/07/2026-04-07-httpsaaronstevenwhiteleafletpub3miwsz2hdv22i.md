---
author: leaflet.pub
cover_image: >-
  https://leaflet.pub/lish/did%253Aplc%253A34mbm5v3umztwvvgnttvcz6e/3miwpcwaw422n/3miwsz2hdv22i/opengraph-image?e2bb7203df6d3028
date: '2026-04-08T00:19:16.277Z'
dateFolder: 2026/04/07
description: >-
  User intent declarations can be viewed as propositional attitudes (permission,
  prohibition, desire, intention, belief, etc.) over structured descriptions of
  data use. Treating them that way gives you composable building blocks from
  existing theory and lens-based translations between community vocabularies
  that make explicit what each translation cannot carry through.
isBasedOn: 'https://aaronstevenwhite.leaflet.pub/3miwsz2hdv22i'
link: 'https://aaronstevenwhite.leaflet.pub/3miwsz2hdv22i'
slug: 2026-04-07-httpsaaronstevenwhiteleafletpub3miwsz2hdv22i
tags:
  - tech
  - decentralization
title: Machine-readable attitudes
---
<p>User intent declarations can be viewed as propositional attitudes (permission, prohibition, desire, intention, belief, etc.) over structured descriptions of data use. Treating them that way gives you composable building blocks from existing theory and lens-based translations between community vocabularies that make explicit what each translation cannot carry through.</p>
<p>@blaine.bsky.social</p>
<p>'s recent Leaflet post on treating user intents as living data makes a super interesting point that I think we can push even further.</p>
<figure><a data-index="1" href="https://leaflet.pub/p/did:plc:3vdrgzr2zybocs45yfhcr6ur/3miowxyaoak2c"><img src="https://aaronstevenwhite.leaflet.pub/api/atproto_images?did=did:plc:34mbm5v3umztwvvgnttvcz6e&amp;cid=bafkreianw46krbz4kyjypebs6silltxemfcas3skwdwkszqzg6np3i6fq4"/></a></figure>
<p>The basic observation, as I understand it, is that <a href="https://github.com/bluesky-social/proposals/tree/main/0008-user-intents">Bluesky's user intents proposal</a> gets something important right—it gives users a machine-readable way to declare preferences about their content—but makes a design choice that will become increasingly hard to maintain as the space of possible uses grows: Bluesky’s proposal prescribes a small, curated set of intent categories (<code>syntheticContentGeneration</code>, <code>publicAccessArchive</code>, <code>bulkDataset</code>, <code>protocolBridging</code>), each modeled as a three-valued toggle.</p>
<p>Blaine’s alternative is descriptive rather than prescriptive: rather than enumerating categories from above, observe the intent mechanisms already in the wild—robots.txt, Creative Commons, AIPREF, platform-specific settings—and formalize the relationships between those vocabularies. The mechanism he proposes for that translation is panproto lenses.</p>
<p>I think this framing is exactly right,<sup>1</sup> and I think it can be pushed even further by (i) noting that these intent declarations are actually instances of a broader concept; and then (ii) looking at how the structure of this broader concept can be made to do useful work for the consumers of those declarations—and indeed, any kind of declaration that has the same general shape.</p>
<p>The basic idea is that there is a natural framework for intents (and beyond) that draws on a long tradition of studying how people express and reason about beliefs, desires, intentions, permissions, and prohibitions, and that this framework can be made concrete using panproto's <a href="https://github.com/panproto/panproto/tree/main/crates/panproto-theory-dsl">theory</a> and <a href="https://github.com/panproto/panproto/tree/main/crates/panproto-lens-dsl">lens</a> DSLs.</p>
<p>To make the issue tangible, consider a scenario that will be familiar to anyone who has followed the recent discussion around AI training on social media data. A user on Bluesky wants to express the following preferences about their content: for instance, maybe they want to (i) permit archival by public libraries and web archives; (ii) prohibit the use of their posts as training data for commercial AI models; and (iii) allow non-commercial academic researchers to use their photos for fine-tuning but not for pre-training. Under the current user intents proposal, the best they can do is set the <code>allow</code> field of <code>syntheticContentGeneration</code> to <code>false</code> and the <code>allow</code> field of <code>publicAccessArchive</code> to <code>true</code>. The third preference is simply inexpressible, because the proposal provides no mechanism for conditioning a preference on the purpose of the use, the identity of the actor, or the specific action being performed on the content.</p>
<p>This might seem like a problem you could fix by adding more categories. And indeed, in a recent Leaflet post,</p>
<p>@ngerakines.me</p>
<p>proposes a finer-grained lexicon schema, <code>community.lexicon.preference.ai</code>, that decomposes AI usage into distinct subcategories and adds a scoped override mechanism on top of the base proposal.</p>
<p>This is definitely an improvement; but it also illustrates the underlying challenge: every new distinction (pre-training vs. fine-tuning vs. RAG retrieval vs. embedding generation) requires a governance decision about whether it belongs in the canonical set, and different communities will inevitably carve the space differently. The AI safety community, the digital preservation community, the content licensing community, and academic researchers all have different notions for what "using someone's data" means and what matters about a given use.</p>
<p>So what Blaine's post points toward, and what I want to hopefully make precise here, is that the right response is not to try to anticipate all possible categories but to provide a formal mechanism for defining structured categories, composing them, and translating between different communities' vocabularies, with an explicit accounting of what is lost in translation.</p>
<p>The reason I think this framework should draw on existing theory rather than being built from scratch is that what a user intent declaration does already has a name. When a user publishes a preference, they are basically saying: "I (the user) permit / prohibit / want / intend (some structured description of a use of my data)." That is, a user intent declaration is a statement that a person stands in some relationship—permission, prohibition, desire, intention—to some content.<sup>2</sup></p>
<p>And this correspondence to existing theory goes further than you might expect. Linguistics, philosophy, and AI have all studied exactly this structure and decomposed it into reusable parts.<sup>3</sup> The basic idea is that the words people use to talk about attitudes—often (but not always) verbs, like think, want, forbid, permit, promise, regret—have meanings that decompose into a small number of recurring, composable components. Some are about belief<sup>4</sup> (what someone thinks is true), some about desire<sup>5</sup> (what they want), some about intention<sup>6</sup> (what they are committed to doing), and some about permission and prohibition<sup>7</sup> (what they allow or forbid). Others track the evidence for a claim,<sup>8</sup> the evaluation<sup>9</sup> of whether something is good or bad, the communicative act<sup>10</sup> of saying or declaring something, or the presuppositions<sup>11</sup> that are taken for granted.</p>
<p>Crucially, each component is imbued with content by rules of inference associated with that component. These rules let a consumer derive new commitments from declared ones, the way modus ponens lets you derive Q from P and P → Q.</p>
<p>For instance, permission and prohibition might both be associated with a rule of closure under subsumption:<sup>12</sup> a user who permits "training of generative image models" thereby permits training of Stable Diffusion in particular, and a user who prohibits "commercial use" thereby prohibits any specific commercial use.<sup>13</sup></p>
<p>Different attitudes have crucially distinct content. For instance, belief and desire come apart on closure under entailment. If a consumer represents a user as believing their work is in LAION-5B, and as believing LAION-5B was used to train Stable Diffusion, the consumer is committed to representing them as believing their work helped train Stable Diffusion—i.e. belief inherits its logical consequences.<sup>14</sup></p>
<p>Desire is different: a user who wants their photos kept out of a particular training dataset does not thereby want every entailment of that exclusion—the licensing arrangement for whatever photos get substituted in, the marginal differences in the resulting model’s behavior on inputs unrelated to their content, the specific engineering decisions about how to handle the gap. The user has no settled preferences about most of these even though they are strict consequences of what was requested, and a consumer that closed desire under entailment would attribute attitudes the user never expressed.</p>
<p>These inference rules are what make the components useful as building blocks: they are what a consumer actually uses when it reasons about a user's declarations. The same components appear independently in the BDI architecture in AI,<sup>15</sup> in episodic logic,<sup>16</sup> in speech act theory, and in deontic logic; and the fact that similar small sets show up across independent fields suggests they are tracking something important about how agents relate to content, and that they might provide useful building blocks for a formal system of user intents.</p>
<p>So let me make this concrete with actual panproto <a href="https://github.com/panproto/panproto/tree/main/crates/panproto-theory-dsl">theory DSL</a> definitions. The basic idea is that the framework has three levels, and they map directly onto familiar programming concepts.</p>
<p>The first level is interfaces.<sup>17</sup> An interface specifies what kinds of things exist (holders, content, attitudes) and what operations you can perform on them, without pinning down what concrete values those kinds contain. The second level is implementations of those interfaces—they fill in the abstract kinds with actual sets of values, in the same way that a class implementing an interface fixes the types of its fields. And the third level is records: individual data entries asserting that a specific user stands in a specific relationship (permission, prohibition, etc.) to a specific structured description of a use. These are the things that actually live in a user's ATProto repo.</p>
<p>To be concrete about how these levels connect to ATProto: the first two levels—interfaces and implementations—are panproto's domain. They define the schema for attitude records: what fields exist, what types they have, and what equations hold between operations like subsumption. The third level is ATProto's domain. Each implementation corresponds to a Lexicon record type (identified by an NSID like <code>dev.attitudes.intent.use_prohibition</code>), and instances of that type are ordinary ATProto records stored in a user's repo, created and queried through the standard <code>com.atproto.repo.*</code> XRPC endpoints. So the YAML definitions below are what panproto compiles to produce the schema; the JSON records later in the post are what ATProto actually stores and serves.</p>
<p>Each building block is a small definition. So here's what the root might look like—it just says that there is a holder, content, and a declaration relating them:</p>
<pre><code># theories/att.yaml
id: dev.attitudes.att
description: &gt;
  Root theory for all attitudes. Every attitude involves a holder
  standing in some relation to some content.
theory: ThAtt
sorts:
  - name: Holder
  - name: Content
  - name: Att
    params:
      - { name: h, sort: Holder }
      - { name: c, sort: Content }
ops:
  - { name: holder, input: Att, output: Holder }
  - { name: content, input: Att, output: Content }
</code></pre>
<p>Note that <code>Content</code> is intentionally unstructured at this level; it gets its internal structure from a content definition that is merged with the attitude definition, as we will see below.</p>
<pre><code># theories/permissive.yaml
id: dev.attitudes.permissive
description: &gt;
  Permission extraction. The attitude yields a well-formed permission.
theory: ThPermissive
sorts:
  - name: Holder
  - name: Content
  - name: Att
    params:
      - { name: h, sort: Holder }
      - { name: c, sort: Content }
  - name: Permission
    params:
      - { name: h, sort: Holder }
      - { name: c, sort: Content }
ops:
  - { name: holder, input: Att, output: Holder }
  - { name: content, input: Att, output: Content }
  - { name: permission_extract, input: Att, output: Permission }
</code></pre>
<p>And a prohibition block along the same lines:</p>
<pre><code># theories/prohibitive.yaml
id: dev.attitudes.prohibitive
description: &gt;
  Prohibition extraction. Dual of ThPermissive.
theory: ThProhibitive
sorts:
  - name: Holder
  - name: Content
  - name: Att
    params:
      - { name: h, sort: Holder }
      - { name: c, sort: Content }
  - name: Prohibition
    params:
      - { name: h, sort: Holder }
      - { name: c, sort: Content }
ops:
  - { name: holder, input: Att, output: Holder }
  - { name: content, input: Att, output: Content }
  - { name: prohibition_extract, input: Att, output: Prohibition }
</code></pre>
<p>But crucially, the content of an attitude is itself structured.<sup>18</sup> For user intents about data use, we could define a content definition called <code>ThUse</code> that gives the content kinds for actions, materials, purposes, and actors, together with a hierarchy over actions that says which actions are "bigger than" (subsume) which others:<sup>19</sup></p>
<pre><code># theories/use.yaml
id: dev.attitudes.intent.use
description: &gt;
  Content theory for structured data-use descriptions.
  Actions form a subsumption hierarchy: train_model subsumes
  ingest and transform, so a prohibition on training covers
  the constituent steps.
theory: ThUse
sorts:
  - name: Use
  - name: Action
  - name: Material
  - name: Purpose
  - name: Actor
ops:
  - { name: action, input: Use, output: Action }
  - { name: material, input: Use, output: Material }
  - { name: purpose, input: Use, output: Purpose }
  - { name: actor, input: Use, output: Actor }
  - name: subsumes
    inputs: [{ name: a, sort: Action }, { name: b, sort: Action }]
    output: Bool
  # action constants
  - { name: ingest, inputs: [], output: Action }
  - { name: transform, inputs: [], output: Action }
  - { name: archive, inputs: [], output: Action }
  - { name: train_model, inputs: [], output: Action }
  - { name: fine_tune, inputs: [], output: Action }
  - { name: run_inference, inputs: [], output: Action }
  - { name: reuse, inputs: [], output: Action }
  # purpose constants
  - { name: commercial, inputs: [], output: Purpose }
  - { name: non_commercial, inputs: [], output: Purpose }
  - { name: academic, inputs: [], output: Purpose }
  - { name: any_purpose, inputs: [], output: Purpose }
equations:
  # reflexivity: every action subsumes itself
  - name: subsumes_refl
    lhs: "subsumes(a, a)"
    rhs: "true"
  # transitivity: subsumption composes
  - name: subsumes_trans
    lhs: "and(subsumes(a, b), subsumes(b, c))"
    rhs: "subsumes(a, c)"
  # ground facts
  - name: train_subsumes_ingest
    lhs: "subsumes(train_model(), ingest())"
    rhs: "true"
  - name: train_subsumes_transform
    lhs: "subsumes(train_model(), transform())"
    rhs: "true"
  - name: train_subsumes_fine_tune
    lhs: "subsumes(train_model(), fine_tune())"
    rhs: "true"
</code></pre>
<p>A super important thing to note about this structured content model definition is that it's not some fixed model everyone needs to use. These models are intended to be partial models of the world that capture things that particular communities care about. There may be overlap in two communities' models, which the communities might define separately, and following Blaine's suggestion, one can link them via panproto's translation architecture, which we discuss below.</p>
<p>An interface is built by merging building blocks together, which involves matching up the parts they share. If ThAtt says "there is a Holder and Content" and ThProhibitive also says "there is a Holder and Content," you want to end up with a single merged definition that has one Holder and one Content (not two copies of each), plus everything that each building block contributes individually. The engine does this merging automatically.<sup>20</sup></p>
<p>So for example, a use prohibition could be the merge of <code>ThAtt</code>, <code>ThProhibitive</code>, and <code>ThUse</code>, where <code>Content</code> in the attitude definitions is identified with <code>Use</code> in the content definition:</p>
<pre><code># compositions/use_prohibition.ncl
let T = import "panproto/theory.ncl" in
{
  id = "dev.attitudes.intent.use_prohibition",
  description = "Prohibition over a structured use.",
  compose = {
    result = "ThUseProhibition",
    bases = ["ThAtt", "ThProhibitive", "ThUse"],
    steps = [
      T.colimit_with_ops
        "ThAtt" "ThProhibitive"
        ["Holder", "Content", "Att"]
        ["holder", "content"],
      T.colimit
        "step_0" "ThUse"
        ["Content"],              # Content = Use
    ],
  },
}</code></pre>
<p>After this composition, the resulting interface <code>ThUseProhibition</code> has everything from all its building blocks: <code>Holder</code>, <code>Use</code> (which is <code>Content</code>), <code>Att</code>, <code>Prohibition</code>, <code>Action</code>, <code>Material</code>, <code>Purpose</code>, <code>Actor</code>, and all the extraction and subsumption operations. Panproto's engine guarantees that the result is the smallest interface consistent with all the inputs: nothing extra creeps in, and nothing shared is duplicated.</p>
<p>An implementation would fill in the abstract kinds with actual values. So for instance, within the <code>ThUseProhibition</code> interface, a specific prohibition type might fix <code>Action = train_model</code>, <code>Purpose = any_purpose</code>, <code>Material.scope = all</code>. And a record would be a concrete entry asserting that a specific user stands in the prohibitive relation to a specific structured use.<sup>21</sup></p>
<p>In ATProto, a record like this would live in a user’s repo.<sup>22</sup></p>
<pre><code>{
  "$type": "dev.attitudes.intent.use_prohibition",
  "use": {
    "action": "train_model",
    "material": { "scope": "all" },
    "purpose": "any_purpose"
  },
  "vocabulary": "dev.attitudes.vocab.content_use_v1",
  "createdAt": "2026-04-06T12:00:00Z"
}
</code></pre>
<p>Because the content is structured rather than flat, a consumer can actually do something with it. It reads this record, extracts the action (<code>train_model</code>), extracts the purpose (<code>any_purpose</code>), confirms this is a prohibition, and then determines its behavior by checking whether its own proposed action falls under the declared action. So if the consumer wants to <code>ingest</code> data for training, it checks whether <code>train_model</code> subsumes <code>ingest</code>, which evaluates to <code>true</code> by the equations in the use definition. The proposed action is covered by the prohibition.</p>
<p>But if the consumer instead wants to <code>archive</code>, it checks whether <code>train_model</code> subsumes <code>archive</code>. The definition contains no such equation, so the consumer's action is not covered. It then looks for other declarations and finds a separate permission for <code>archive</code>.</p>
<p>There is a subtlety here worth being explicit about. When I said "the definition contains no such equation" for <code>subsumes(train_model(), archive())</code>, I was relying on a design choice: the system treats its set of equations as complete.<sup>23</sup> If a subsumption fact can't be derived from the declared equations (including reflexivity and transitivity), the system treats it as false.</p>
<p>But this is not the only possible choice. There are at least three reasonable options.</p>
<p>The first is a closed world with explicit default: basically, the equations are treated as complete, so the consumer knows definitively that <code>train_model</code> does not subsume <code>archive</code>. This is the simplest option and the one assumed throughout this post. Its advantage is computational clarity; its disadvantage is that the definition author must enumerate all subsumption relationships up front, and a missing equation is indistinguishable from a deliberate exclusion.</p>
<p>The second is an open world with gaps: here the absence of a derivation means the subsumption status is unknown, and the consumer distinguishes three states—subsumed, not subsumed, and unknown. Unknown status could trigger a fallback policy, like asking the user for clarification or applying a configurable default. This is more expressive but adds complexity for consumers.</p>
<p>The third is a hierarchy-closed world: the actions are organized into a strict hierarchy<sup>24</sup> where every pair of actions has a definite relationship. This eliminates ambiguity while still allowing the hierarchy to be extended.</p>
<p>The sketch here assumes the first option. For user intents, where the set of actions is defined by a community vocabulary and is meant to be exhaustive within that vocabulary, this seems like a reasonable default. But systems operating across vocabulary boundaries—where one vocabulary might define actions that another does not recognize—may need the open-world or hierarchy-based approach.</p>
<p>The connection to panproto's <a href="https://github.com/panproto/panproto/tree/main/crates/panproto-lens">lens infrastructure</a> is where the framework gets more interesting, I think, because it addresses a problem that simpler systems tend to sweep under the rug.</p>
<p>The basic idea is pretty simple: when you translate data from one schema to another, some structure might not survive the trip. If schema A has a field that schema B lacks, that field's data has to go somewhere. Panproto makes this explicit by pairing every translation with a complement, which is a structured record of exactly what was dropped and what had to be supplied.<sup>25</sup></p>
<p>To see how this works, consider two interfaces: one for belief (ThDoxastic) and one for desire (ThBouletic). Both share the basic structure from ThAtt—holder, content, and attitude—but ThDoxastic adds a <code>Belief</code> kind with a <code>doxastic_extract</code> operation, while ThBouletic adds a <code>Desire</code> kind with a <code>bouletic_extract</code> operation. So a translation from ThDoxastic to ThBouletic maps the shared structure and produces a complement recording what changed: the belief parts were dropped (they have no counterpart in the target) and the desire parts were added (they have no counterpart in the source).</p>
<pre><code># lenses/doxastic_to_bouletic.yaml
id: dev.attitudes.lens.doxastic_to_bouletic
description: &gt;
  Translate from a belief-based interface to a desire-based
  interface. The complement captures the belief structure that
  the desire vocabulary cannot express.
source: dev.attitudes.doxastic
target: dev.attitudes.bouletic
steps:
  - drop_sort: Belief
  - drop_op: doxastic_extract
  - add_sort:
      name: Desire
      kind: structural
  - add_op:
      name: bouletic_extract
      src: Att
      tgt: Desire
      kind: structural
</code></pre>
<p>The complement of this lens, computed by panproto's <code>complement_spec_at</code> function, is:</p>
<pre><code>{
  "kind": "Mixed",
  "forward_defaults": [
    {
      "element_name": "Desire",
      "element_kind": "sort",
      "description": "Default value needed for added sort 'Desire'."
    },
    {
      "element_name": "bouletic_extract",
      "element_kind": "op",
      "description": "Default value needed for added op 'bouletic_extract'."
    }
  ],
  "captured_data": [
    {
      "element_name": "Belief",
      "element_kind": "sort",
      "description": "Data for vertices of kind 'Belief' will be captured in the complement."
    },
    {
      "element_name": "doxastic_extract",
      "element_kind": "op",
      "description": "Edges of kind 'doxastic_extract' will be captured in the complement."
    }
  ],
  "summary": "Mixed: drops Belief and doxastic_extract (captured); adds Desire and bouletic_extract (defaults required)."
}
</code></pre>
<p>One important subtlety here: the complement's shape is not fixed in advance; it depends on the particular schema the translation is applied to.<sup>26</sup> The same translation definition might, when applied to a schema with five belief-carrying fields, produce a complement with five entries; and when applied to a schema with two, produce a complement with two. Basically, the complement is computed, not declared, and it faithfully tracks the specific data at hand.</p>
<p>To see why this matters, consider a concrete scenario. Suppose a digital preservation community has built its vocabulary around permission and prohibition, because one thing archivists care about (alongside things like provenance) is recording the appropriate uses of the material they hold—what is permitted, what is prohibited, and under what conditions. A user in this community publishes a declaration like:</p>
<pre><code>{
  "$type": "org.digipres.attitudes.deontic",
  "content": {
    "action": "archive",
    "material": { "scope": "public_posts" },
    "purpose": "preservation"
  },
  "permission": {
    "modality": "permitted",
    "conditions": [
      { "type": "non_commercial" },
      { "type": "attribution_required" }
    ],
    "basis": {
      "type": "community_policy",
      "url": "https://digipres.org/norms/archival-access"
    }
  },
  "createdAt": "2026-04-06T12:00:00Z"
}
</code></pre>
<p>This record carries information that only makes sense in a deontic vocabulary: the <code>permission</code> field has a modality (permitted/prohibited), a list of conditions under which the permission holds, and a basis pointing to the community policy that grounds it. That is the kind of structure a permission-oriented system cares about—not just whether the user has some attitude toward the action but exactly what is and is not allowed, and on what authority.</p>
<p>Now suppose a consumer—say a research lab planning a study—operates in an intention-based vocabulary, because what it cares about is recording the experiments it intends to run and the content it intends to use in those experiments. The same lens machinery applies, just with a different translation: a <code>deontic_to_intentional</code> lens that drops the deontic structure (the <code>Permission</code> kind, the <code>deontic_extract</code> operation) and adds an intention structure (an <code>Intention</code> kind and an <code>intention_extract</code> operation, with a means-end coherence equation<sup>27</sup> linking the intention to the action). The shared structure—holder, content, the attitude relation—comes through fine. But the complement tells the consumer exactly what did and did not make it. The <code>captured_data</code> entries say: "the <code>Permission</code> kind and the <code>deontic_extract</code> operation were present in the source but have no counterpart here; their data has been set aside." And the <code>forward_defaults</code> entries say: "the <code>Intention</code> kind and the <code>intention_extract</code> operation exist in your vocabulary but had no counterpart in the source; you need to supply defaults for them." In practice, the lab's system might fill the intention default with a placeholder pointing to the planned experiment that triggered ingestion. And the deontic data—the modality, the conditions, the basis—rather than being silently discarded, is preserved in the complement so the lab can check before any experiment that its planned use actually falls within the permissions the user declared.</p>
<p>The intention vocabulary is only half of what the lab needs, though. Once an experiment has actually been run, the lab also wants to record what it now believes on the basis of the results: which datasets were used, which findings replicated, what those findings license inferentially, and what the lab is now committed to as a downstream consequence. That is a doxastic vocabulary, and the lens framework lets it coexist with the intention vocabulary without conflating them. The same machinery that translates archivist permissions into experiment plans can also translate experiment outcomes into structured beliefs the lab can publish, link, and revise—and it can do so over a chain of vocabularies, with the complements at each step making explicit what each translation cannot carry through.</p>
<p>This decomposition of scientific work into modular, shareable pieces that separate what was observed from what is claimed on the basis of those observations is closely related to the work on <a href="https://discoursegraphs.com/">discourse graphs</a> by</p>
<p>@joelchan86.bsky.social</p>
<p>and</p>
<p>@mattakamatsu.bsky.social</p>
<p>, which models a research lab's knowledge as a graph of evidence nodes and claim nodes that compose into larger arguments.<sup>28</sup> The framework sketched here is doing something different at the protocol layer—formalizing the attitudes a vocabulary commits to and computing what survives translation between vocabularies—but the underlying motivation is the same: scientific and curatorial work is composed of modular pieces with explicit provenance, and a system that surfaces those pieces as first-class structured objects is more useful than one that flattens them.</p>
<p>The same mechanism applies to the more practically relevant case of translating between content vocabularies. If a user's declarations use the base <code>content_use_v1</code> vocabulary with actions like <code>archive</code>, <code>train_model</code>, <code>reuse</code>, and a consumer operates in the AIPREF vocabulary with finer-grained actions like <code>pre_train</code>, <code>fine_tune</code>, <code>rlhf</code>, <code>rag_retrieve</code>, <code>embedding</code>, then the translation maps <code>train_model</code> to the AIPREF actions it subsumes and produces a complement containing <code>rag_retrieve</code> and <code>embedding</code>—actions the source vocabulary has no opinion about. The consumer sees the complement and knows it is operating in a gap for those specific actions.</p>
<p>To complete the picture, consider a three-step chain: belief → desire → intention. The first translation drops belief structure and adds desire structure (as above). The second drops desire structure and adds intention structure, with an <code>Intention</code> kind, an <code>intention_extract</code> operation, and a coherence equation<sup>29</sup> linking the intentional layer to the content layer.</p>
<pre><code># lenses/bouletic_to_intentional.yaml
id: dev.attitudes.lens.bouletic_to_intentional
description: &gt;
  Translate from a desire-based interface to an intention-based
  interface. The complement captures the desire structure; the
  added means-end operations are structurally new.
source: dev.attitudes.bouletic
target: dev.attitudes.intentional
steps:
  - drop_sort: Desire
  - drop_op: bouletic_extract
  - add_sort:
      name: Intention
      kind: structural
  - add_op:
      name: intention_extract
      src: Att
      tgt: Intention
      kind: structural
  - add_op:
      name: committed_action
      src: Intention
      tgt: Action
      kind: structural
  - add_equation:
      name: means_end_coherence
      lhs: "committed_action(intention_extract(att))"
      rhs: "action(content(att))"
</code></pre>
<p>When we chain the two translations end to end,<sup>30</sup> the resulting translation from belief → intention has a composite complement that accumulates everything lost along the way: {Belief, doxastic_extract, Desire, bouletic_extract}. So translating from a belief-based vocabulary all the way to an intention-based vocabulary loses both the belief and the desire structure, even though the intermediate desire-based vocabulary was used as a stepping stone. But nothing is silently dropped because the composed complement is the product of the individual complements, accumulated through each step.<sup>31</sup> When a user expresses their intents in one vocabulary and a consumer operates in another, and the translation between them passes through any number of intermediate vocabularies, the complement at the end of the chain tells the consumer what it can't see.</p>
<p>The examples so far have all been flat: a user stands in some relationship to some content. But ATProto is a decentralized network, and in practice intent signals do not come from a single authoritative source. They come from a variety of sources: a user's PDS, from labels applied by third-party labelers, from Creative Commons licenses on external websites, from research consent forms, and so on. A consumer that encounters these signals needs to represent not just what the intent is but who thinks that's the intent and on what basis. That might suggest we need a nested structure to capture things like a belief about an intent or a belief about a belief about an intent.</p>
<p>Concretely, consider a labeler on the ATProto network that aggregates consent signals. It encounters a user who has two relevant signals: an ATProto declaration in their repo saying "I prohibit commercial training," and a CC-BY-NC license on their personal blog. With flat attitudes, the labeler can record the prohibition from the ATProto declaration directly. But what does it do with the CC-BY-NC license? That license is not an ATProto record; the labeler is interpreting it as evidence that the user permits non-commercial use. If the labeler just writes a flat permission record, it looks identical to something the user published themselves, and the provenance is lost.</p>
<p>With nested attitudes, the labeler can represent exactly what it knows. The ATProto declaration is a first-order intent that the labeler can relay directly. But the CC-BY-NC interpretation is a second-order belief: "the labeler believes, on the basis of a CC-BY-NC license at URL X, that the user permits non-commercial archiving." The natural way to represent this in ATProto is for the labeler to write two records in its own repo. The first is a plain permission record representing the labeler's interpretation of what the user permits:</p>
<pre><code>{
  "$type": "dev.attitudes.intent.use_permission",
  "holder": "did:plc:user123",
  "use": {
    "action": "archive",
    "material": { "scope": "public_posts" },
    "purpose": "non_commercial"
  },
  "createdAt": "2026-04-06T12:00:00Z"
}
</code></pre>
<p>The second is a belief record whose <code>subject</code> is a <code>com.atproto.repo.strongRef</code> pointing to the permission record by AT-URI and CID, pinning the exact version:</p>
<pre><code>{
  "$type": "dev.attitudes.intent.belief",
  "holder": "did:plc:labeler456",
  "basis": {
    "type": "external_license",
    "url": "https://user.example.com/license",
    "license_type": "CC-BY-NC-4.0"
  },
  "subject": {
    "uri": "at://did:plc:labeler456/dev.attitudes.intent.use_permission/3l5fk7aqcco2m",
    "cid": "bafyreidfcm4u3vnuph5ltwdpssiz3a4xfbm2otjrdisftwnbfmnxd6lsxm"
  },
  "createdAt": "2026-04-06T12:00:00Z"
}
</code></pre>
<p>This is just standard ATProto record referencing: the <code>subject</code> field uses a <code>strongRef</code>, which is how records like <code>app.bsky.feed.like</code> point to the posts they target. The CID ensures the belief is pinned to a specific version of the permission record—if the labeler later revises its interpretation, the old belief still points to the old version. A consumer reading the belief record resolves the <code>subject</code> to get the permission record, and the combined structure tells the full story: the labeler inferred, on the basis of a CC-BY-NC license at a specific URL, that the user permits non-commercial archiving.</p>
<p>Because the permission record lives in the labeler's repo, not the user's, the provenance is structurally explicit. If a second labeler disagrees—say it interprets the same CC license as not extending to ATProto content—that disagreement shows up as two distinct belief records from different DIDs, each pointing (via strongRef) to its own permission record. A consumer can see who asserted what. With flat records, you would just have two contradictory permission records with no obvious way to tell them apart.</p>
<p>This nesting works because ATProto records can reference other records, and nothing about the Lexicon schema system prevents a record type's <code>subject</code> from pointing to another record of the same family. The schema for <code>dev.attitudes.intent.belief</code> just declares that <code>subject</code> is a <code>com.atproto.repo.strongRef</code>—the protocol handles the rest.</p>
<p>Panproto's role in this case is a bit different than in the previous cases: when a consumer resolves the reference chain and assembles the full tree of attitudes, panproto's type system can represent that tree<sup>32</sup> and—more importantly—the lens infrastructure can translate it, computing complements correctly regardless of how deep the nesting goes.</p>
<p>The same structure extends naturally to delegation and trust chains. If platform A subscribes to labeler B's feed and uses B's beliefs about user intents to make its own policy decisions, A can write a record whose <code>subject</code> is a strongRef to B's belief record—"A accepts B's belief that the user prohibits training"—and the chain of references is traversable. The complement of the translation from A's trust vocabulary to B's belief vocabulary tells A exactly what structural commitments B made that A does not share. Without nesting, it is not clear how you would represent this chain or ask where a particular intent claim came from.</p>
<p>There are a number of practical challenges that this system might face.</p>
<p>The examples above have been carefully chosen to avoid a problem that any actual deployment would face immediately: conflicting declarations. Suppose a user publishes a prohibition on <code>train_model</code> for <code>any_purpose</code> and a separate permission on <code>fine_tune</code> for <code>academic</code> purpose. Since <code>train_model</code> subsumes <code>fine_tune</code>, the prohibition covers fine-tuning. But the user has also explicitly permitted fine-tuning for academic purposes. So what should a consumer do?</p>
<p>This is a well-studied problem.<sup>33</sup> And the standard approaches map onto concrete design choices here.</p>
<p>The first approach is specificity-based override: a more specific declaration takes precedence over a more general one. In the example, the permission on <code>fine_tune</code> for <code>academic</code> purpose is more specific than the prohibition on <code>train_model</code> for <code>any_purpose</code> along two dimensions (action and purpose), so it wins. The basic idea is that you derive a "more specific than" ordering from the subsumption order on content: declaration A is more specific than B if A's action is subsumed by B's action and A's purpose is subsumed by B's purpose. The more specific declaration wins. This is the approach taken by most access-control systems, and it seems like a reasonable default.</p>
<p>The second approach is temporal precedence: a later declaration overrides an earlier one on the same content. This is simple (declarations already carry <code>createdAt</code> timestamps), but it has the disadvantage that a user who publishes a broad prohibition and then a narrow permission may not realize the narrow permission has punched a hole in the broad prohibition.</p>
<p>The third approach is explicit conflict marking: the system detects conflicts and surfaces them to the user for resolution. This is the most conservative option and may be appropriate for an initial deployment where the consequences of getting it wrong are high.</p>
<p>In practice, a combination of the first and third seems most appropriate: use specificity-based override as the default, but flag conflicts for user review when the specificity order is ambiguous, that is, when neither declaration is strictly more specific than the other.</p>
<p>A related but distinct problem is what a consumer should do when the user has expressed no attitude about a particular use. In practice, this is a super common case: most users will declare a handful of preferences, and consumers will encounter action/purpose/actor combinations the user never contemplated.</p>
<p>The sketch as described has no built-in default. Basically, the consumer checks for applicable declarations, finds none, and has no basis for action. So this is a gap that needs to be filled.</p>
<p>The natural solution is to allow a user to publish a catch-all declaration with wildcarded content—something like a prohibition on <code>reuse</code> for <code>any_purpose</code> with <code>material.scope = all</code>—which would serve as the default for any use not covered by a more specific declaration. Combined with specificity-based conflict resolution, this gives you a clean two-level system: the catch-all sets the default, and specific declarations override it. A user who wants default-deny publishes a broad prohibition and punches specific holes with permissions. A user who wants default-allow publishes a broad permission and blocks specific uses with prohibitions.</p>
<p>For users who publish no declarations at all, the system needs a platform-level default. This is a governance decision rather than a formal one, but the framework could make it expressible as an attitude declaration so that the default policy is transparent and auditable rather than buried in application code.</p>
<p>The subsumption relation on actions is currently a partial order specified by explicit ground equations plus reflexivity and transitivity. This approach seems workable, but it has a practical limitation: for any pair of actions not connected by a chain of equations, subsumption is simply false (under the closed-world assumption). And as vocabularies grow, the number of equations needed to specify the order can in principle grow quadratically — though in practice you only declare the covering relations and let reflexivity and transitivity handle the rest.</p>
<p>A more structured alternative is to organize actions into a strict hierarchy<sup>34</sup> with a top element (<code>reuse</code>, representing any use whatsoever) and atoms representing the most specific actions. In a hierarchy like this, every pair of actions has a well-defined "least common ancestor," and subsumption is just the hierarchy order. This eliminates the need for explicit ground equations (the hierarchy determines all subsumption facts) and makes subsumption decidable for every pair.</p>
<p>The same hierarchy can be applied to the <code>Purpose</code> kind. This would also provide a natural framework for the specificity-based conflict resolution discussed above: "more specific" simply means "lower in the hierarchy," and the comparison is always decidable.</p>
<p>The sketch here does not impose hierarchy on action or purpose kinds, and there may be good reasons not to. Different communities may organize their action spaces in ways that are not hierarchy-compatible—two action types may overlap without either subsuming the other, and imposing a strict hierarchy would rule out such partial orders. But for the common case where the action space is tree-shaped, a hierarchy would simplify both the definitions and the consumer-side reasoning, and it seems worth exploring.</p>
<p>A question that has not been addressed so far is whether something like this would actually be tractable at ATProto scale, where a consumer might need to evaluate millions of user declarations in real time (as an automated labeler or feed generator would).</p>
<p>The core operations are: (i) checking whether a proposed action is subsumed by a declared action, which reduces to reasoning over a finite set of equations;<sup>35</sup> (ii) computing the complement of a translation at a given schema, which is a compile-time operation on the definition structure; and (iii) evaluating a translation on a concrete record, which is basically a linear-time traversal of the record's fields.</p>
<p>For (i), each subsumption query reduces to reachability over the directed graph defined by the ground equations, which can be answered in time linear in the number of edges (or made constant-time per query by precomputing the transitive closure once per vocabulary). For (ii), complement computation is performed once per (translation, schema) pair, not once per record, so its cost is amortized across all records using that schema. For (iii), record translation is dominated by the size of the record, which would likely be small in general (a handful of fields).</p>
<p>The more relevant cost in practice is finding applicable declarations for a given proposed use, which requires searching a user's repo for declarations whose content matches the proposed action, material, purpose, and actor. In ATProto, records in a user's repo are stored in a Merkle search tree indexed by collection and record key, so a consumer querying a specific user's declarations can list the relevant collections (e.g. <code>dev.attitudes.intent.use_prohibition</code>, <code>dev.attitudes.intent.use_permission</code>) and retrieve all records in each. The more challenging case is aggregating across many users—for instance, a labeler that wants to know which users have prohibited training. This requires either an index over the network or a feed-generator-style architecture that subscribes to the firehose and maintains its own index. But this kind of framework would not introduce new costs here beyond what any structured-data system on ATProto would face.</p>
<p>The practical context for all of this is that the ATProto ecosystem is actively working through the problem of user consent for data reuse, and the solutions being proposed range from simple boolean toggles (the base user intents proposal) to community-defined lexicon extensions to Blaine's vision of vocabularies as living data. What I want to suggest is that much of the formalism needed to make Blaine's vision work may already exist, that it is grounded in a well-established theory of how agents relate to structured content, and that panproto's theory and lens DSLs provide one possible way to implement it.</p>
<p>All of the examples above use the actual DSL syntax of panproto: the building-block definitions <a href="https://github.com/panproto/panproto/blob/main/crates/panproto-theory-dsl/src/compile_theory.rs">compile</a> into panproto's internal representation, the compositions produce interfaces by <a href="https://github.com/panproto/panproto/blob/main/crates/panproto-gat/src/colimit.rs">merging</a>, the translations produce chains with <a href="https://github.com/panproto/panproto/blob/main/crates/panproto-lens/src/complement_type.rs">typed complements</a>, and the records are structured entries that live in ATProto repos. And because the whole thing is defined as an external package of data files that the engine interprets, none of it requires changes to panproto or to ATProto.</p>
<p>So insofar as the problem of user intents on ATProto is a problem of representing what agents believe, desire, intend, permit, and prohibit about structured content—and of translating between different communities' ways of carving up that space with an explicit accounting of what is lost—it seems like the same kind of problem that theories of attitudes have been studying for decades. The small, recurring set of attitudinal building blocks I am sketching here is reflected in the semantics of how people actually talk about what they and others believe, want, intend, and permit.</p>
<p>With that said, I don't think we should overindex on what natural languages do. Instead, I think we want to take it as a useful lower bound on what the system should be able to represent, because it tells us that the building blocks are at least rich enough to capture the distinctions that humans actually make.</p>
<p>This decomposition is a major finding of formal semantics work on clause-embedding predicates. The modal-logic precursor is Hintikka (1969), which gives the first systematic possible-worlds semantics for attitude verbs. The foundational linguistic framework traces to <a href="https://doi.org/10.1007/BF00353453">Kratzer’s (1977)</a> treatment of modals as relational expressions sensitive to contextually supplied premise sets, developed further in <a href="https://doi.org/10.1515/9783110842524-004">Kratzer (1981)</a> and collected in revised form in <a href="https://global.oup.com/academic/product/modals-and-conditionals-9780199234684">Kratzer (2012)</a>. The approach treats attitude verbs as quantifying over possible worlds relative to a modal base and has been extended by her students, including <a href="https://doi.org/10.1007/s11050-010-9056-4">Hacquard (2010)</a> on event-relative modals, <a href="https://doi.org/10.1162/LING_a_00183">Moulton (2015)</a> on the compositional structure of clausal complements, and <a href="https://scholarworks.umass.edu/dissertations_2/552/">Bogal-Allbritten (2016)</a> on crosslinguistic evidence from Navajo. <a href="https://doi.org/10.3765/sp.6.8">Anand and Hacquard (2013)</a> give a key treatment of the interaction between epistemic and other attitude components. See <a href="https://www.wiley.com/en-us/Semantics+in+Generative+Grammar-p-9780631197133">Heim and Kratzer (1998)</a> for the standard compositional framework, <a href="https://global.oup.com/academic/product/modality-9780199292431">Portner (2009)</a> for a textbook treatment of the modal/attitude unification, and <a href="https://plato.stanford.edu/entries/prop-attitude-reports/">Nelson (2019)</a> for a recent survey. For empirical work using large-scale judgment data to test this decomposition, see <a href="https://ling.auf.net/lingbuzz/004012">White and Rawlins (2018)</a> on the role of veridicality and factivity in clause selection across the English lexicon.</p>
<p>Related to factivity and veridicality. The factivity of attitude predicates (know, regret, realize) was identified by <a href="https://doi.org/10.1515/9783111350219.143">Kiparsky and Kiparsky (1970)</a>, with <a href="https://www.researchgate.net/publication/232853455_Some_observations_on_factivity">Karttunen (1971)</a> immediately observing that some “semi-factive” predicates (discover, realize) project less stubbornly than emotive factives. The pragmatic treatment of presupposition starts with <a href="https://philpapers.org/rec/STAPP">Stalnaker (1974)</a>, which grounds presupposition in common ground rather than truth-conditional content. The projection problem—how presuppositions of complex sentences relate to those of their parts—is addressed by <a href="https://www.jstor.org/stable/4177763">Karttunen (1973)</a> and <a href="https://doi.org/10.1002/9780470758335.ch10">Heim (1983)</a> (the context-change potential account); <a href="https://doi.org/10.1093/jos/9.4.333">van der Sandt (1992)</a> gives the influential anaphoric alternative. <a href="https://doi.org/10.1093/jos/9.3.183">Heim (1992)</a> extends the framework to attitude contexts, and <a href="https://web.stanford.edu/group/cslipublications/cslipublications/site/1575861208.shtml">Beaver (2001)</a> gives the book-length dynamic-semantic treatment. Whether factive picks out a coherent natural class is now actively contested. On the linguistic side, <a href="https://journals.linguisticsociety.org/proceedings/index.php/SALT/article/view/2584">Simons, Tonhauser, Beaver, and Roberts (2010)</a> argue projection is keyed to not-at-issueness rather than to a designated factive lexical class; <a href="https://semanticsarchive.net/Archive/jZiNmM4N/AnandHacquard.pdf">Anand and Hacquard (2014)</a> argue that cognitive factives (know, discover) and emotive factives (regret, be glad) presuppose distinct things and behave differently in discourse. <a href="https://doi.org/10.1007/s11229-015-0722-4">Spector and Egré (2015)</a> develop a uniform semantics for question-embedding that treats factivity as separable from the assertive content. Experimental work has further pressured the classical category: <a href="https://doi.org/10.1093/jos/ffy007">Tonhauser, Beaver, and Degen (2018)</a> document gradience in projectivity and at-issueness across triggers; <a href="https://ojs.ub.uni-konstanz.de/sub/index.php/sub/article/view/143">Djärv, Zehr, and Schwarz (2018)</a> experimentally distinguish cognitive and emotive factives; <a href="https://escholarship.org/uc/item/7hb2h628">Mahler (2020)</a> examines how prior beliefs about the truth of complement clauses modulate projection; and <a href="https://www.cambridge.org/core/journals/language/article/abs/are-there-factive-predicates-an-empirical-investigation/2913948687E66BB9B24016DE7E8F913D">Degen and Tonhauser (2022)</a> argue, on the basis of six experiments, that there is no categorical distinction between factive and nonfactive predicates—projectivity is gradient and finer-grained than factivity. Cutting against the gradient interpretation, <a href="https://doi.org/10.1007/s11050-025-09244-9">Grove and White (2025)</a> develop statistical models of presupposition projection that implement the discrete and gradient hypotheses, fit them to existing inference judgment data (including Degen and Tonhauser’s), and find that the discrete models fit better—suggesting that the gradience observed in inference judgments is compatible with factive presuppositions being fundamentally discrete, with the apparent gradience arising from how discrete knowledge is reflected in gradient response measures. On the philosophical side, <a href="https://doi.org/10.1111/j.1933-1592.2010.00338.x">Hazlett (2010)</a> argues that know is not strictly factive in ordinary usage. <a href="https://repository.upenn.edu/edissertations/3645/">Djärv (2019)</a> gives a dissertation-length unified treatment of factive and assertive attitude reports.</p>
<p>This is the standard treatment in epistemic logic, going back to Hintikka (1962), but it is a known idealization: real agents are not logically omniscient and do not believe every consequence of what they believe. This is the logical omniscience problem; see <a href="https://doi.org/10.1016/0004-3702(87)90003-8">Fagin and Halpern (1987)</a> for the classic statement and <a href="https://doi.org/10.1007/BF00413506">Stalnaker (1991)</a> for a philosophical response. For a downstream consumer reasoning about declared beliefs, treating them as closed under some bounded form of entailment is what makes the inferences tractable; the open question is where to draw the bound.</p>
<p>The <code>means_end_coherence</code> equation asserts that the action extracted from an intention matches the action described in the content: <code>committed_action(intention_extract(att)) = action(content(att))</code>. This is a simplified form of Bratman's means-end commitment (<a href="https://press.uchicago.edu/ucp/books/book/distributed/I/bo3629095.html">Bratman 1987</a>). The full version—that intending an end commits the holder to intending the necessary means—would require a richer definition composing intention with belief and a means-end linking definition. That is expressible in the framework but beyond what is needed for user intents.</p>
<p>Discourse graphs separate empirical observations (evidence nodes) from proposed answers (claim nodes) and let researchers compose these into larger argument structures that can be shared and reused across labs. The connection to the framework here is that an intention vocabulary for planned experiments and a doxastic vocabulary for inferable results are exactly the kinds of attitude structures a discourse graph node carries, and the lens machinery gives a way to translate between them at the protocol level.</p>
<p>The <code>means_end_coherence</code> equation asserts that the action extracted from an intention matches the action described in the content: <code>committed_action(intention_extract(att)) = action(content(att))</code>. This is a simplified form of Bratman's means-end commitment (<a href="https://press.uchicago.edu/ucp/books/book/distributed/I/bo3629095.html">Bratman 1987</a>). The full version—that intending an end commits the holder to intending the necessary means—would require a richer definition composing intention with belief and a means-end linking definition. That is expressible in the framework but beyond what is needed for user intents.</p>
