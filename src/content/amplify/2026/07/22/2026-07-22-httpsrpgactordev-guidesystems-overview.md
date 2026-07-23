---
author: rpg.actor
cover_image: 'https://rpg.actor/assets/og/og-default.png'
date: '2026-07-22T16:46:09.731Z'
dateFolder: 2026/07/22
description: >-
  Developer guide for building on rpg.actor — AT Protocol lexicons, character
  stats, sprites, and the master system.
isBasedOn: 'https://rpg.actor/dev-guide#systems-overview'
link: 'https://rpg.actor/dev-guide#systems-overview'
slug: 2026-07-22-httpsrpgactordev-guidesystems-overview
tags:
  - code
  - tech
  - gaming
  - decentralization
title: rpg.actor
---
<p><b>rpg.actor</b> is a way for players and masters of various roleplaying game systems to store, update, and validate important aspects of their characters like stats and sprites in a public way that allows for cross-compatible use.</p>
<p>Through it, users may self-store elements central to their roleplaying experiences using the <a href="https://atproto.com">AT Protocol</a> data ecosystem. By signing in with a <a href="https://bsky.app">Bluesky</a> handle <i>(or any other personal data server)</i>, one can manage their character sheets and enable a range of interoperable features that allow seamless use across different game systems.</p>
<h2>Core Concepts</h2>
<p>Every user has access to three main record types that allow for an expansive and interconnected roleplaying experience across any number of potential games, systems, and services. These are their technical definitions:</p>
<table> <tbody><tr><th>Record Concept</th><th>Record Type</th><th>Description</th></tr> <tr><td>Character Sprites</td><td><code>actor.rpg.sprite</code></td><td>Character sprite sheet with animation metadata</td></tr> <tr><td>Sprite Generator</td><td><code>actor.rpg.generator</code></td><td>Separated sprite layers and configurations for recomposition</td></tr> <tr><td>Master Validations</td><td><code>actor.rpg.master</code></td><td>Game Master validations linked to player stats</td></tr> <tr><td>Equipment (Item)</td><td><code>equipment.rpg.item</code></td><td>Item records for defining player inventory pieces</td></tr> <tr><td>Equipment (Give)</td><td><code>equipment.rpg.give</code></td><td>Attestation from item providers for source authenticity</td></tr> </tbody></table>
<p>Each record type follows a specific lexicon that assures interoperability across different games or services, all held within each user's own <a href="https://atproto.com/guides/self-hosting">Personal Data Server (PDS)</a> and publicly accessible through the <a href="https://atproto.com/">AT Protocol</a>.</p>
<p>You are a character <i>(always have been)</i>, and <b>rpg.actor</b> lets you store, update, and share your own stats, sprites, and more in your own personal record that can work across multiple games, regardless which systems you use.</p>
<p>Because these character sheets are stored through the <a href="https://atproto.com">AT Protocol</a>, they are portable and public. This means that you can login to any compatible experience with your existing <code>@actor.handle</code> and continue your adventures or customize to your preferences, with full knowledge of the wizard, warrior, or whatever you really are!</p>
<p>Think of it like a public database of adventurers you can choose to be part of, which can remember the spells, inventory, and more that matter to you, across different kinds of games both online, and offline.</p>
<h2>Your Character Stats</h2>
<p>Your character details are held in the <code>actor.rpg.stats</code> collection, stored in your own <a href="https://atproto.com/guides/self-hosting">Personal Data Server</a>.</p>
<p>The current standard is per-system rkey records, where each system writes to its own rkey and stores payload in <code>{ system, data }</code>. Legacy <code>self</code> records are deprecated and only used for optional compatibility.</p>
<p>Stats can be edited directly through the <b>rpg.actor</b> interface and save directly to your <b>PDS</b>, updating your stats across any games that use it. Likewise, <i>(if you permit)</i> supporting games can update your progress automatically and feed your character's growing legacy. You are always in control of these records and will always be able to reshape, remove, or rectify them however you see fit. Because your records are sovereign, <i>you</i> retain authority.</p>
<p><i>"Great!"</i> she says, <i>"I'll make myself an unstoppable LVL 999 Space Wizard!"</i> — Go ahead. It's <u>your</u> character.</p>
<p>Part of what makes the <b>rpg.actor</b> ecosystem amazing is the way that <b>Masters</b> of various games can check and validate your records for their campaigns with their own records, to make sure you fit well in their worlds.</p>
<p>Ultimately, these are <i>your</i> characters and <b>you</b> will always stay in control, but playing nice with others and building upon shared experiences in cooperative ways is what good roleplaying has always been about.</p>
<h2>Your Character Sprite</h2>
<p>Each actor can have a sprite associated to it through an <code>actor.rpg.sprite</code> record which can work alongside their character sheets to provide a visual representation in games where that's useful.</p>
<p>The interoperable baseline is the <b>rpg.actor sprite standard</b>: a <b>144 × 192 pixel PNG</b> with a <b>3-column, 4-row grid</b> (48 × 48 per frame). The schema can store custom dimensions too, and <b>rpg.actor</b> may still display those with compatibility handling.</p>
<p><b>Developer guidance:</b> treat 144 × 192 / 3 × 4 as the only guaranteed shared profile across services. If you publish a custom layout, do not assume other clients will interpret extra columns, custom frame ordering, or custom frame timing the same way.</p>
<p>If you want your sprite to work predictably across <b>rpg.actor</b> and third-party integrations, keep to the rpg.actor standard walk sheet wherever possible.</p>
<p>These sprites appear on <b>rpg.actor</b> profiles and are available to use in services that reads from your PDS, meaning that any compatible games can allow you to login with your <a href="https://internethandle.org/">@actor.handle</a> and instantly appear as you wish.</p>
<h3>Walk Cycle / Frame Order</h3>
<p>Use these rules when you play sprite frames. They are simple defaults that keep movement consistent across clients.</p>
<table> <tbody><tr><th>Rule</th><th>What to Do</th></tr> <tr><td>Direction rows</td><td>Use row 0 = down, row 1 = left, row 2 = right, row 3 = up.</td></tr> <tr><td>3-column frame meaning</td><td>Use column 0 = step, column 1 = idle, column 2 = step.</td></tr> <tr><td>Default walk order</td><td>Play frames as <code>[0, 1, 2, 1]</code>.</td></tr> <tr><td>Default idle frame</td><td>Use frame <code>1</code> for 3-column sheets.</td></tr> <tr><td>When columns are not 3</td><td>Use ping-pong across all columns (example: 5 columns = <code>[0,1,2,3,4,3,2,1]</code>).</td></tr> <tr><td>Default timing</td><td>Use about 150ms per frame when no custom timing is available.</td></tr> <tr><td>Fallback</td><td>If metadata is missing or unclear, use these defaults.</td></tr> </tbody></table>
<p><b>Important:</b> custom playback metadata is not yet a shared lexicon contract. If your app supports custom idle frame, custom frame order, or custom timing, treat those values as app-specific and still provide the defaults above as a fallback.</p>
<h3>Source Tracking</h3>
<p>The <code>actor.rpg.sprite</code> record includes an optional <code>source</code> field (AT-URI format) that indicates how the sprite was produced. When a sprite is composed through the <a href="https://rpg.actor/generator">Sprite Generator</a>, this field is automatically set to the AT-URI of the user's <code>actor.rpg.generator</code> record (e.g. <code>at://did:plc:xxx/actor.rpg.generator/self</code>). Custom-uploaded sprites will not have this field.</p>
<p>This allows services to detect whether a sprite was built from the generator and whether it remains in sync with the underlying layer data, enabling safe recomposition (adding items, changing layers) without overwriting manually uploaded artwork.</p>
<p>Additional generators or other means of sprite sourcing may also leverage this field to establish recomposition methods for different experiences or sprite types.</p>
<p>Whatever sprite you use, be mindful of copyright and ethical use. See our <a href="https://rpg.actor/terms">terms of service</a> for the full breakdown.</p>
<h2>Sprite Generator</h2>
<p>The <a href="https://rpg.actor/generator">Sprite Generator</a> allows players to build a character sprite from interchangeable layers (body, hair, eyes, tops, bottoms, accessories, and more). The resulting composite is saved as the player's <code>actor.rpg.sprite</code> record, while the individual layers and configuration are stored separately in an <code>actor.rpg.generator</code> record.</p>
<h3>How the Records Pair</h3>
<p>These two records work together but are structurally independent:</p>
<table> <tbody><tr><th>Record</th><th>Key</th><th>Contains</th><th>Used By</th></tr> <tr><td><code>actor.rpg.sprite</code></td><td>self</td><td>Single composite PNG blob (144×192), animation metadata</td><td>Final renders; profile pages, game characters, etc</td></tr> <tr><td><code>actor.rpg.generator</code></td><td>self</td><td>Individual layer PNGs + body type, skin/eye config, items list</td><td>Sprite recomposition; equipment changes, layer alterations</td></tr> </tbody></table>
<p>When a sprite is saved through the generator, the <code>.sprite</code> record's <code>source</code> field is set to the AT-URI of the <code>.generator</code> record. This link allows services to safely compose a new sprite (e.g. adding equipment layers) by drawing from the decomposed layer data rather than guessing how to modify the flattened composite. Use the <code>POST /api/generator/compose</code> endpoint (see <a href="https://rpg.actor/dev-guide/#api-generator">Generator API</a> below) to do this server-side with just a DID.</p>
<h3>Generator Record Structure</h3>
<p>The <code>actor.rpg.generator</code> record stores everything needed to recreate or modify a sprite without the full generator UI:</p>
<ul> <li><b>version</b> — Generator version that produced the record</li> <li><b>items[]</b> — Simple list of item identifiers (e.g. "popcorn", "atmosphere_shirt") that can gate interactions</li> <li><b>bodyType</b> — Body type identifier (e.g. "male", "female")</li> <li><b>skin / eyes</b> — Color configuration (tone, mode, hex values)</li> <li><b>layers[]</b> — Ordered array of layer objects (back-to-front), each containing:</li> </ul>
<table> <tbody> <tr><td><code>blob</code></td><td>blob (PNG)</td><td>Yes</td><td>The recolored layer PNG (144×192)</td></tr> <tr><td><code>assetName</code></td><td>string</td><td>No</td><td>Generator asset filename (e.g. "001_basic_short")</td></tr> <tr><td><code>title</code></td><td>string</td><td>No</td><td>Human-readable name</td></tr> <tr><td><code>colors</code></td><td>object</td><td>No</td><td>Applied color selections: <code>main</code>, <code>sub1</code>, <code>sub2</code></td></tr> <tr><td><code>subtractMask</code></td><td>blob (PNG)</td><td>No</td><td>Binary mask PNG. Opaque black pixels erase the composite <em>below</em> this layer before the layer is drawn. Extracted from black regions in the asset's colorway at save time. See <i>Recomposition</i> below.</td></tr> <tr><td><code>behindRows</code></td><td>int[]</td><td>No</td><td>Sprite-sheet row indices (0–3) where this layer composites <em>behind the entire existing composite</em> (all previously drawn layers) via destination-over blending. Since layers are ordered back-to-front with body at index 0, this effectively places the item behind the body and all clothing/hair/accessories above it. Row 0 = down, 1 = left, 2 = right, 3 = up. Omit for normal source-over on all rows.</td></tr> <tr><td><code>disabled</code></td><td>boolean</td><td>No</td><td>When <code>true</code>, this layer is excluded from compositing and rendering entirely. Omit or set <code>false</code> to render normally. Layers render by default — this field only needs to be written when explicitly hiding one. The API will never return disabled layers in <code>generatorLayers</code>.</td></tr> <tr><td><code>layerClass</code></td><td>string</td><td>No</td><td>Layer fit class tag used by class-based suppression. Format is <code>group.name</code> (lowercase), for example <code>hair.wide</code>. When another equipped layer declares <code>suppress.classes</code> containing <code>hair.wide</code>, this layer is suppressed (or replaced via its own <code>suppressAs</code> fallback).</td></tr> <tr><td><code>suppress</code></td><td>object</td><td>No</td><td>Suppression rules for this layer. Use <code>suppress.layers[]</code> to hard-hide target layer IDs, and <code>suppress.classes[]</code> to hide layers whose item metadata declares a matching layer class.</td></tr> <tr><td><code>suppressAs</code></td><td>string or object</td><td>No</td><td>Optional fallback replacement used when this layer is suppressed by class rules. String form is the replacement <code>assetName</code>. Object form may include <code>assetName</code>, and optionally prefilled render fields (<code>title</code>, <code>blob</code>, <code>colors</code>, <code>behindRows</code>, <code>subtractMask</code>) for recomposition-friendly handoff.</td></tr> <tr><td><code>suppressSpecific</code></td><td>object</td><td>No</td><td>Per-suppressor override map for when this layer is suppressed. Keys are the suppressor item’s <code>layerClass</code> (e.g. <code>bottoms.baggy</code>); values are the asset name to render instead of the default <code>suppressAs</code> fallback. Allows the same item to show different art depending on which item suppressed it. Checked before <code>suppressAs</code> — only falls back to <code>suppressAs</code> when no matching key is found.</td></tr> </tbody></table>
<p><b>Layer classes:</b> Use <code>layerClass</code> to label mutually exclusive fit variants without hard-coding by layer ID. A common pattern is hair profile matching: a headwear item can set <code>suppress.classes: ["hair.wide"]</code> so any equipped hair layer tagged <code>layerClass: "hair.wide"</code> is automatically hidden or replaced, while other classes such as <code>hair.long</code> continue to render.</p>
<h3>Valid Layer IDs</h3>
<p>Layers are stored in the following canonical back-to-front order. Recompositors should sort by this order rather than relying on record array order.</p>
<table> <tbody> <tr><td><code>body</code></td><td>Body</td><td>Always first; skin tone and eye color applied via sentinels</td></tr> <tr><td><code>undies</code></td><td>Clothing</td><td>Base underwear layer</td></tr> <tr><td><code>feet</code></td><td>Clothing</td><td>Footwear</td></tr> <tr><td><code>bottoms</code></td><td>Clothing</td><td>Trousers, skirts, etc.</td></tr> <tr><td><code>tops</code></td><td>Clothing</td><td>Shirts, jackets, etc.</td></tr> <tr><td><code>clothHands</code></td><td>Clothing</td><td>Gloves</td></tr> <tr><td><code>necklaces</code></td><td>Accessory</td><td>Necklaces, collars, scarves</td></tr> <tr><td><code>hair</code></td><td>Hair</td><td>Base hairstyle; uses hair-color sentinel</td></tr> <tr><td><code>bangs</code></td><td>Hair</td><td>Fringe layer drawn over hair</td></tr> <tr><td><code>beard</code></td><td>Hair</td><td>Beard/moustache; uses hair-color sentinel</td></tr> <tr><td><code>hind</code></td><td>Accessory</td><td>Back-worn items (capes, wings, backpacks). Defaults to <code>behindRows: [0,1,2]</code> so they appear behind the body on most directions.</td></tr> <tr><td><code>facial</code></td><td>Accessory</td><td>Face decorations (paint, marks, masks)</td></tr> <tr><td><code>glasses</code></td><td>Accessory</td><td>Glasses and eyewear</td></tr> <tr><td><code>ears</code></td><td>Body</td><td>Non-human ear types (e.g. elf, cat); uses skin sentinel</td></tr> <tr><td><code>headwear</code></td><td>Accessory</td><td>Hats, crowns, helmets</td></tr> <tr><td><code>lefthand</code></td><td>Handheld</td><td>Item held in left hand. Defaults to <code>behindRows: [2,3]</code> (right-facing and up).</td></tr> <tr><td><code>righthand</code></td><td>Handheld</td><td>Item held in right hand. Defaults to <code>behindRows: [1,3]</code> (left-facing and up).</td></tr> <tr><td><code>costume</code></td><td>Accessory</td><td>Full-body costume overlays drawn last (topmost)</td></tr> </tbody></table>
<h3>Colorway System</h3>
<p>Layer assets use a companion <b>colorway map</b> (<code>_c</code> image) — a 144×192 PNG that marks which regions a player can recolor. Colorway uses an <b>additive RGB-cube model</b>: each opaque, non-black map pixel is read as a <i>blend weight</i> across three channels, and the generator mixes the player's chosen channel colors at that pixel's base luminance. Because every channel shares the same base luminance, the asset's original grey shading is preserved through any blend.</p>
<h4>Color Channels</h4>
<p>All clothing, headwear, glasses, necklaces, and facial accessories share three channels. A map pixel's individual bytes are the per-channel weights — <b>anything but <code>00</code> in a byte includes that channel</b>:</p>
<table> <tbody> <tr><td><code>main</code></td><td><b>B</b> (blue byte)</td><td> <code>#0000FF</code></td><td>Primary color region (e.g. shirt fabric, hat body)</td></tr> <tr><td><code>sub1</code></td><td><b>G</b> (green byte)</td><td> <code>#00FF00</code></td><td>Secondary region (e.g. trim, accents, sleeves)</td></tr> <tr><td><code>sub2</code></td><td><b>R</b> (red byte)</td><td> <code>#FF0000</code></td><td>Third region (e.g. pattern, emblem)</td></tr> </tbody></table>
<p>For a pixel with bytes <code>(R,G,B)</code>, <code>weight<sub>main</sub> = B</code>, <code>weight<sub>sub1</sub> = G</code>, <code>weight<sub>sub2</sub> = R</code>. The output color is the weighted average <code>Σ (weight<sub>i</sub> × modulate(channelHex<sub>i</sub>, baseLuminance)) / Σ weight<sub>i</sub></code>. A channel with no declared color is skipped, so it never contaminates the blend.</p>
<h4>Blending — Plaids &amp; Multi-Tone Fabric</h4>
<p>Authoring an intermediate color in the map mixes channels. The map pixel's own color is the recipe; the swatch below <i>is</i> the pixel you paint into the <code>_c</code> map:</p>
<table> <tbody><tr><th>Map Pixel</th><th>Hex</th><th>Resulting Blend</th></tr> <tr><td></td><td><code>#00FF00</code></td><td>100% sub1</td></tr> <tr><td></td><td><code>#FF0000</code></td><td>100% sub2</td></tr> <tr><td></td><td><code>#00FFFF</code></td><td>50% main / 50% sub1</td></tr> <tr><td></td><td><code>#FF00FF</code></td><td>50% main / 50% sub2</td></tr> <tr><td></td><td><code>#FFFF00</code></td><td>50% sub1 / 50% sub2</td></tr> <tr><td></td><td><code>#FFFFFF</code></td><td>Equal 3-way (main / sub1 / sub2)</td></tr> <tr><td></td><td><code>#404080</code></td><td>Weighted — 50% main / 25% sub1 / 25% sub2</td></tr> </tbody></table>
<h4>Special Sentinels</h4>
<table> <tbody> <tr><td>Skin</td><td></td><td><code>#F9C19D</code></td><td>Replaced by the player's skin tone gradient. Used on body, hands, and any asset that shows skin. Checked before colorway, so it is never read as a blend weight.</td></tr> <tr><td>Eyes</td><td></td><td><code>#2C80CB</code> or <code>#1380F8</code></td><td>Replaced by the player's eye color gradient.</td></tr> <tr><td>Hair</td><td></td><td><code>#FCCB0A</code></td><td>Replaced by the player's chosen hair color with luminance modulation.</td></tr> <tr><td>Sub Mask</td><td></td><td><code>#000000</code> </td><td>Pure black pixels (R,G,B ≤ 8) define a <b>subtractive mask</b>. These pixels erase the composite below the layer before it is drawn, punching holes through previously rendered layers. Used for items that need to occlude parts of the body (e.g. hair not poking through a hat).</td></tr> </tbody></table>
<p>Skin, eyes, and hair sentinels are checked before colorway and are relevant to body-adjacent assets. Clothing and accessories use the three blend channels. An asset only needs to declare the channels it actually uses; channel usage is auto-detected by scanning the map's weight bytes.</p>
<h3>Recomposition</h3>
<p>To rebuild a sprite from its generator layers, process each layer in order on a 144×192 canvas:</p>
<ol> <li><b>Disabled</b> — If the layer has <code>disabled: true</code>, skip it entirely. Layers without this field, or with it set to <code>false</code>, render normally. Never assume absence means hidden — absence means render.</li> <li><b>Suppression / Suppress-As</b> — Resolve suppression before drawing. If a layer ID is targeted by another layer's <code>suppress.layers</code>, hide it completely. If it is suppressed by matching class rules (<code>suppress.classes</code>), check this layer's <code>suppressSpecific</code> map first: if the suppressor's class matches a key, use that asset name as the replacement. Otherwise fall back to the plain <code>suppressAs</code> value if present; if neither applies, hide the layer completely.</li> <li><b>SubtractMask</b> — If the layer has a <code>subtractMask</code>, erase pixels from the current composite wherever the mask has opaque black pixels. This punches holes in layers <em>below</em> before the new layer is drawn. (If <code>behindRows</code> is also present, the mask is only applied on those rows.)</li> <li><b>BehindRows</b> — If the layer has <code>behindRows</code>, its pixels on those rows are drawn <em>behind the entire existing composite</em> (destination-over) rather than on top. Since layers are ordered back-to-front with body first, this effectively places the item behind the body and all clothing/accessories above it. On rows <em>not</em> listed in <code>behindRows</code>, the layer draws normally (source-over). This lets held items like popcorn appear behind the character when facing left or up, while remaining visible in front when facing down or right.</li> <li><b>Normal Draw</b> — If none of the above fields alter behavior, simply draw the layer on top at its layer level.</li> </ol>
<p>Layers are pre-positioned and pre-colored, so no additional alignment or palette logic is needed. The resulting composite matches what the generator produces.</p>
<p><strong>Simple recomposition:</strong> If you don't need SubtractMask/BehindRows support, drawing each <code>layers[].blob</code> in order with source-over compositing still produces a usable result for most sprites. The advanced fields only matter for items that need to interact with body occlusion.</p>
<p><strong>Custom Sprites:</strong> Actors are not required to use the generator. A custom <code>actor.rpg.sprite</code> without a matching <code>.generator</code> record is valid and will display normally everywhere. The generator record is only needed for layer-based features like equipment overlays.</p>
<h2>Equipment &amp; Inventory</h2>
<p>The equipment system allows <b>providers</b> (game services, experiences, events) to issue items to players as verifiable AT Protocol records. Each item is represented by a <b>paired record</b> model: one record in the player's PDS as a <code>.item</code> with its details, and another in the provider's PDS as a <code>.give</code> attesting its origin.</p>
<h3>Paired Record Model</h3>
<table> <tbody><tr><th>Record</th><th>Lives On</th><th>Created By</th><th>Purpose</th></tr> <tr><td><code>equipment.rpg.give</code></td><td>Provider's PDS</td><td>Game Provider</td><td>Attestation that the item was legitimately granted. Contains recipient DID, item ID, asset CID for integrity verification.</td></tr> <tr><td><code>equipment.rpg.item</code></td><td>Player's PDS</td><td>Player (Game Client)</td><td>The player's actual item. Contains the asset blob, icon blob, display metadata, and a reference back to the <code>.give</code> URI for verification.</td></tr> </tbody></table>
<p>This dual-record design means that neither party can unilaterally fabricate items. The provider's <code>.give</code> record proves the grant happened, while the player's <code>.item</code> record holds the actual asset data. Verification is possible by checking that the <code>.item</code>'s <code>give</code> URI points to a valid <code>.give</code> record on the provider's PDS, and that the <code>assetCid</code> matches.</p>
<p>Players are able to generate <code>.item</code> records independently for self-generated user content, but without a matching <code>.give</code> record, these items cannot be source verified and should be treated like general user content.</p>
<h3>Item Kinds</h3>
<p>Items fall into two kinds, controlled by the <code>kind</code> field:</p>
<table> <tbody><tr><th>Kind</th><th>Description</th><th>Example</th></tr> <tr><td><code>layer</code></td><td>Wearable items that integrate into the sprite generator as visual layers. Have a <code>category</code> mapping to a generator slot.</td><td>ATmosphere Shirt (tops), Popcorn (righthand)</td></tr> <tr><td><code>inventory</code></td><td>Non-wearable items displayed in the player's inventory but not rendered on the sprite.</td><td>Keys, potions, collectibles</td></tr> </tbody></table>
<h3>Layer Item Properties</h3>
<p>Items with <code>kind: "layer"</code> can carry additional fields that control how they render on the sprite:</p>
<table> <tbody><tr><th>Field</th><th>Type</th><th>Description</th></tr> <tr><td><code>colorway</code></td><td>blob (PNG)</td><td>Colorway map for the asset with sentinel-colored pixels indicating recolorable regions. Required for items that support player recoloring.</td></tr> <tr><td><code>channels[]</code></td><td>array</td><td>Color channel definitions declared by this item's colorway. Each entry has a <code>name</code> (e.g. "main", "sub1"), a sentinel <code>color</code> hex, and an optional <code>defaultColor</code> hex.</td></tr> <tr><td><code>behindRows</code></td><td>int[]</td><td>Sprite-sheet row indices (0–3) where this layer composites behind the body. See <a href="https://rpg.actor/dev-guide/#pc-generator">Recomposition</a> for details.</td></tr> <tr><td><code>layerClass</code></td><td>string</td><td>Optional fit class tag for class-based suppression matching. Use <code>group.name</code> format such as <code>hair.wide</code> or <code>hair.long</code>.</td></tr> <tr><td><code>suppress</code></td><td>object</td><td>Optional suppression methods for equipped behavior. Use <code>suppress.categories[]</code> to suppress explicit layer IDs, and <code>suppress.classes[]</code> to suppress by item layer class.</td></tr> <tr><td><code>suppressAs</code></td><td>string</td><td>Optional replacement asset name used when this item is suppressed by class rules. If omitted, suppression hides the target layer entirely.</td></tr> <tr><td><code>suppressSpecific</code></td><td>object</td><td>Optional per-suppressor override map. Keys are the suppressor item’s <code>fitClass</code>; values are the asset name to show when that specific class causes suppression. Checked before <code>suppressAs</code>.</td></tr> </tbody></table>
<p>When a layer item is equipped through the generator, its <code>colorway</code>, <code>behindRows</code>, and suppression metadata are carried into the <code>.generator</code> layer entry. The generator uses the colorway to apply the player's chosen colors and can derive a <code>subtractMask</code> from black regions in the colorway at save time.</p>
<p><strong>Generator-compatible items:</strong> Providing a proper <code>colorway</code> and <code>channels</code> in your <code>.item</code> records makes them fully recolorable inside the <a href="https://rpg.actor/generator">Sprite Generator</a> UI. Players can change the item's colors just like any built-in asset, and the generator will handle luminance modulation, subtractive masking, and behindRows compositing automatically. Items without a colorway still work as static overlays, but lose the ability to be personalized.</p>
<h3>Multi-Provider Support</h3>
<p>Items track their <code>provider</code> DID, allowing multiple independent services to issue equipment to the same player. Player profiles display items grouped by category with attribution showing which provider granted each item (e.g. "Obtained from @rpg.actor" or "Obtained from @vagabond.quest").</p>
<h3>Item Lifecycle</h3>
<ol> <li><b>Issue:</b> A game provides means for a player to print an <code>equipment.rpg.item</code> record and the provider creates an <code>equipment.rpg.give</code> record on their PDS.</li> <li><b>Display:</b> Items can be loaded independently with or without verification using the blob assets within the record, and the CID from the <code>.give</code> prevents tampering.</li> <li><b>Destroy:</b> The player can delete their <code>.item</code> record at any time. The provider's <code>.give</code> record is left intact for historical verification, though can never be reconnected because of CID changes.</li> </ol>
<p><strong>Asset Integrity:</strong> The <code>.item</code> record stores an <code>assetCid</code> that should match the blob CID from the provider's original grant. This allows third-party verification that the player's item asset hasn't been tampered with since issuance.</p>
<h3>Becoming a Provider</h3>
<p>Any AT Protocol account can act as an equipment provider. There is no registration required — you write records to your own PDS and the compendium indexes them automatically via Jetstream.</p>
<h4>1. Create a give record on your PDS</h4>
<p>When your game or service grants an item to a player, write an <code>equipment.rpg.give</code> record to <b>your</b> repository:</p>
<pre><code>// Provider writes to their own PDS
await agent.com.atproto.repo.createRecord({
  repo: PROVIDER_DID,             // your DID
  collection: 'equipment.rpg.give',
  record: {
    recipient: 'did:plc:player...', // player's DID
    item: 'healing_potion',         // your item identifier
    title: 'Healing Potion',        // display name
    givenAt: new Date().toISOString(),
    kind: 'inventory',              // 'layer' or 'inventory'
    category: 'righthand',          // generator slot (for layers)
    description: 'Restores 10 HP',  // optional flavour text
    context: 'Dropped by goblin',   // optional origin note
    assetCid: 'bafkrei...'          // optional: CID of asset PNG
  }
})</code></pre>
<h4>2. Player accepts the item on their PDS</h4>
<p>The player (or your game client on their behalf, with OAuth authorization) writes an <code>equipment.rpg.item</code> record to <b>their</b> repository:</p>
<pre><code>// Player writes to their own PDS
await agent.com.atproto.repo.createRecord({
  repo: PLAYER_DID,                // player's DID
  collection: 'equipment.rpg.item',
  record: {
    item: 'healing_potion',
    title: 'Healing Potion',
    give: 'at://provider-did/equipment.rpg.give/rkey', // AT-URI of the give
    provider: PROVIDER_DID,
    acceptedAt: new Date().toISOString(),
    asset: assetBlobRef,            // optional: uploaded PNG blob
    assetCid: 'bafkrei...'          // optional: match the give's CID
  }
})</code></pre>
<h4>3. Compendium indexes automatically</h4>
<p>Both records are picked up by the rpg.actor Jetstream consumer and appear in the equipment index. Query them at any time:</p>
<pre><code>GET https://rpg.actor/api/equipment?player=did:plc:player...
GET https://rpg.actor/api/equipment?provider=did:plc:yourprovider...</code></pre>
<h4>Required fields</h4>
<table> <tbody><tr><th>Record</th><th>Required</th><th>Optional</th></tr> <tr><td><code>equipment.rpg.give</code></td><td><code>recipient</code> (DID), <code>item</code>, <code>title</code>, <code>givenAt</code></td><td><code>kind</code>, <code>category</code>, <code>description</code>, <code>assetCid</code>, <code>iconCid</code>, <code>stats</code>, <code>context</code></td></tr> <tr><td><code>equipment.rpg.item</code></td><td><code>item</code>, <code>title</code>, <code>give</code> (AT-URI), <code>provider</code> (DID), <code>acceptedAt</code></td><td><code>kind</code>, <code>category</code>, <code>description</code>, <code>asset</code> (blob), <code>icon</code> (blob), <code>colorway</code> (blob), <code>channels</code>, <code>behindRows</code>, <code>assetCid</code>, <code>stats</code>, <code>context</code></td></tr> </tbody></table>
<p><strong>No API required:</strong> You do not need to use rpg.actor's API to create equipment records. Write directly to your own PDS using standard AT Protocol methods (<code>com.atproto.repo.createRecord</code> / <code>putRecord</code>). The compendium is an indexer, not a gatekeeper — your records, your authority.</p>
<p>The <code>actor.rpg.stats</code> standard is now <b>per-system rkey</b>. Write one record per system (<code>rkey=&lt;system&gt;</code>) with <code>{ system, data }</code>. Legacy <code>self</code> is deprecated and may be maintained only as an optional compatibility mirror.</p>
<p>There is no registration or approval process. Pick a key, write your data, and the ecosystem picks it up. All first-party rpg.actor systems have already been upgraded to per-system rkey, so new integrations should target this method directly.</p>
<h2>System Keys</h2>
<p>Your system key is a lowercase identifier used as the per-system rkey (for example, <code>actor.rpg.stats/mycoolrpg</code>). Legacy <code>self</code> records are deprecated, but if you maintain compatibility mirroring, this key is also the top-level property name there. Choose something unique to your game:</p>
<table> <tbody><tr><th>Game</th><th>System Key</th><th>Example</th></tr> <tr><td>My Cool RPG</td><td><code>mycoolrpg</code></td><td><code>{ "system": "mycoolrpg", "data": { "_meta": { "name": "My Cool RPG" }, ... } }</code></td></tr> <tr><td>Dungeon World</td><td><code>dungeonworld</code></td><td><code>{ "system": "dungeonworld", "data": { "_meta": { "name": "Dungeon World" }, ... } }</code></td></tr> <tr><td>Frontier Online</td><td><code>frontieronline</code></td><td><code>{ "system": "frontieronline", "data": { "_meta": { "name": "Frontier Online" }, ... } }</code></td></tr> </tbody></table>
<h3>Key Rules</h3>
<ul> <li><b>Lowercase alphanumeric + underscore</b> — letters, digits, underscore; no spaces (<code>/^[a-z0-9_]+$/</code>)</li> <li><b>Must not collide with built-in keys</b> — the following are reserved: <a href="https://rpg.actor/systems#dnd"><code>dnd</code></a>, <a href="https://rpg.actor/systems#dcc"><code>dcc</code></a>, <a href="https://rpg.actor/systems#mage"><code>mage</code></a>, <a href="https://rpg.actor/systems#cyberpunk2020"><code>cyberpunk2020</code></a>, <a href="https://rpg.actor/systems#vampire"><code>vampire</code></a>, <a href="https://rpg.actor/systems#rmmz"><code>rmmz</code></a>, <a href="https://rpg.actor/systems#reverie"><code>reverie</code></a>, <a href="https://rpg.actor/systems#playtopia"><code>playtopia</code></a>, <code>fashionista</code>, <code>clunscannon</code>, <code>spotem</code>, <a href="https://rpg.actor/systems#custom"><code>custom</code></a></li> <li><b>Must not collide with record metadata</b> — <code>$type</code>, <code>createdAt</code>, <code>updatedAt</code> are off-limits</li> <li><b>Be specific</b> — prefer your game's actual name over generic terms like <code>rpg</code> or <code>stats</code></li> </ul>
<p><strong>Use <code>_meta.name</code>:</strong> Always include a <code>_meta</code> object with a <code>name</code> field in your system data. This is the human-readable display name shown in the rpg.actor UI (tab labels, print headers, etc). Without it, the UI will try to format your key into a title, which may not look the way you want.</p>
<p><strong>Deprecated: singular <code>custom</code> key.</strong> Earlier versions of the lexicon defined a single <code>custom</code> property with a <code>{ systemName, systemVersion, stats[] }</code> structure. This is still read for backwards compatibility, but new systems should <b>always use their own unique key</b>. The <code>custom</code> key will not be removed, but it is limited to one system and should not be used for new development.</p>
<h2>Writing Stats</h2>
<p>Write stats using per-system rkey records (<code>actor.rpg.stats/&lt;system&gt;</code>). Legacy <code>self</code> writes are deprecated and optional, only for backward compatibility with older consumers.</p>
<h3>JavaScript / Node.js</h3>
<pre><code>const systemKey = 'mycoolrpg';
const systemPayload = {
    _meta: { name: 'My Cool RPG' },
    str: 14,
    dex: 12,
    hp: { current: 25, max: 30 },
    class: 'Ranger',
    inventory: ['Longbow', 'Rope'],
    lucky: true
};

const now = new Date().toISOString();

// 1) Preferred write: per-system rkey record
const existingSystem = await agent.com.atproto.repo.getRecord({
    repo: playerDid,
    collection: 'actor.rpg.stats',
    rkey: systemKey
}).catch(() =&gt; null);

const perSystem = {
    $type: 'actor.rpg.stats',
    system: systemKey,
    createdAt: existingSystem?.data?.value?.createdAt || now,
    updatedAt: now,
    data: systemPayload
};

await agent.com.atproto.repo.putRecord({
    repo: playerDid,
    collection: 'actor.rpg.stats',
    rkey: systemKey,
    record: perSystem
});

// 2) Optional deprecated compatibility mirror to self
// Use only if you still support legacy self-only consumers.
const shouldMirrorLegacySelf = false;
if (shouldMirrorLegacySelf) {
    const existingSelf = await agent.com.atproto.repo.getRecord({
        repo: playerDid,
        collection: 'actor.rpg.stats',
        rkey: 'self'
    }).catch(() =&gt; null);

    const currentStats = existingSelf?.data?.value || {};
    const updatedSelf = {
        $type: 'actor.rpg.stats',
        ...currentStats,
        [systemKey]: systemPayload,
        updatedAt: now
    };
    if (!updatedSelf.createdAt) updatedSelf.createdAt = now;

    await agent.com.atproto.repo.putRecord({
        repo: playerDid,
        collection: 'actor.rpg.stats',
        rkey: 'self',
        record: updatedSelf
    });
}</code></pre>
<pre><code>import requests, json
from datetime import datetime, timezone

pds = "https://player.pds.example"  # player's PDS endpoint
player_did = "did:plc:abc123"

# 1. Build per-system record
now = datetime.now(timezone.utc).isoformat()
record = {
    "$type": "actor.rpg.stats",
    "system": "mycoolrpg",
    "data": {
        "_meta": {"name": "My Cool RPG"},
        "str": 14, "dex": 12,
        "hp": {"current": 25, "max": 30},
        "class": "Ranger"
    },
    "createdAt": now,
    "updatedAt": now
}

# 2. Write per-system rkey
requests.post(f"{pds}/xrpc/com.atproto.repo.putRecord",
    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    json={"repo": player_did, "collection": "actor.rpg.stats",
          "rkey": "mycoolrpg", "record": record})</code></pre>
<h3>Godot (GDScript)</h3>
<pre><code># Preferred standard: write actor.rpg.stats/ with { system, data }.
# Some older add-on helpers still mirror legacy self for compatibility.
var my_stats = {
    "_meta": {"name": "My Cool RPG"},
    "str": 14, "dex": 12,
    "hp": {"current": 25, "max": 30}
}
await ATProto.merge_and_put_stats(pds, did, "mycoolrpg", my_stats) # compatibility helper</code></pre>
<p><strong>Write standard:</strong> Target per-system rkey records as your default integration path. Treat <code>self</code> as deprecated and optional compatibility only. If you keep legacy self mirroring, use fetch-merge-put because <code>putRecord</code> replaces the entire record.</p>
<h2>Data Formats</h2>
<p>Your system's stat object is freeform — you can use whatever structure makes sense for your game. The rpg.actor generic renderer understands the following conventions and will display them with appropriate UI controls:</p>
<table> <tbody> <tr><td>Number</td><td><code>integer</code></td><td><code>"str": 14</code></td><td>Compact stat box</td></tr> <tr><td>Text</td><td><code>string</code></td><td><code>"class": "Ranger"</code></td><td>Compact text field (short) or text section (long)</td></tr> <tr><td>Resource</td><td><code>{ current, max }</code></td><td><code>"hp": { "current": 25, "max": 30 }</code></td><td>Current/Max bar</td></tr> <tr><td>Boolean</td><td><code>boolean</code></td><td><code>"lucky": true</code></td><td>Toggle switch</td></tr> <tr><td>List</td><td><code>string[]</code></td><td><code>"inventory": ["Bow", "Rope"]</code></td><td>Tag pills</td></tr> <tr><td>Dropdown</td><td><code>{ _select, options[], value }</code></td><td><code>"alignment": { "_select": true, "options": ["Good", "Neutral", "Evil"], "value": "Good" }</code></td><td>Select dropdown</td></tr> <tr><td>Section</td><td><code>{ _heading: true }</code></td><td><code>"Combat": { "_heading": true }</code></td><td>Section divider</td></tr> <tr><td>Note</td><td>long <code>string</code></td><td><code>"backstory": "Born in..."</code></td><td>Full-width text block</td></tr> </tbody></table>
<h3>Metadata</h3>
<p>Include a <code>_meta</code> object at the top level of your system data for display metadata:</p>
<pre><code>"mycoolrpg": {
  "_meta": {
    "name": "My Cool RPG"    // Display name (used in tabs, print headers)
  },
  "str": 14,
  ...
}</code></pre>
<h3>Legacy Format</h3>
<p>The older <code>{ systemName, systemVersion, stats: [{ name, value, min, max }] }</code> array format is still supported for backwards compatibility. The renderer automatically normalises it to flat key-value pairs. New implementations should use the flat format directly.</p>
<p><strong>Print support:</strong> All stat types render in the print layout automatically. Numbers and booleans get compact grid cells; long text, notes, and lists get full-width sections. Section headings (<code>_heading</code>) create visual dividers in both the UI and printed sheets.</p>
<h2>Reading Stats</h2>
<p>Read stats with <b>per-system rkey first</b> logic. Fall back to deprecated <code>self</code> only when supporting older repositories.</p>
<pre><code>// 1) Preferred: per-system rkey
const rkeyRes = await fetch(
    `${pds}/xrpc/com.atproto.repo.getRecord?repo=${did}&amp;collection=actor.rpg.stats&amp;rkey=mycoolrpg`
);

let myStats = null;
if (rkeyRes.ok) {
    const rkeyRecord = await rkeyRes.json();
    myStats = rkeyRecord.value?.data || null;
}

// 2) Optional fallback: deprecated self record
if (!myStats) {
    const selfRes = await fetch(
        `${pds}/xrpc/com.atproto.repo.getRecord?repo=${did}&amp;collection=actor.rpg.stats&amp;rkey=self`
    );
    if (selfRes.ok) {
        const selfRecord = await selfRes.json();
        myStats = selfRecord.value?.mycoolrpg || null;
    }
}

if (myStats) {
  console.log('STR:', myStats.str);
  console.log('HP:', myStats.hp?.current, '/', myStats.hp?.max);
} else {
  console.log('Player has no stats for this system');
}</code></pre>
<p>To enumerate systems, list <code>actor.rpg.stats</code> records and treat per-system rkeys as canonical. Use <code>self</code> only as a deprecated fallback source.</p>
<p><strong>The registry API can help:</strong> <code>GET /api/actors/full</code> returns cached stats for all actors. For individual lookups, read directly from the player's PDS as shown above — it's always authoritative.</p>
<h2>Native Systems</h2>
<p>The following game systems have native sheet support on rpg.actor, with full lexicon definitions, dedicated UI renderers, and documented field schemas. All of them are already upgraded to per-system rkey stats. Each link goes to the full field reference on the <a href="https://rpg.actor/systems">Systems</a> page.</p>
<table> <tbody> <tr><td><a href="https://rpg.actor/systems#mage">Mage: The Ascension</a></td><td><code>mage</code></td><td>White Wolf World of Darkness. Reality is subjective; willworkers reshape it through Spheres and Arete.</td></tr> <tr><td><a href="https://rpg.actor/systems#vampire">Vampire: The Masquerade</a></td><td><code>vampire</code></td><td>White Wolf World of Darkness. Kindred politics, the hunger, and the slow erosion of humanity.</td></tr> <tr><td><a href="https://rpg.actor/systems#rmmz">RPG Maker MZ</a></td><td><code>rmmz</code></td><td>Kadokawa's game engine for JRPG-style titles. Stats map directly to the engine's native actor parameters.</td></tr> <tr><td><a href="https://rpg.actor/systems#reverie">Reverie</a></td><td><code>reverie</code></td><td>Philosophical alignment system built around paired axes of ideological disposition.</td></tr> <tr><td><a href="https://rpg.actor/systems#custom">Custom (legacy)</a></td><td><code>custom</code></td><td>Single-slot free-form system record. Deprecated, new integrations should use a unique top-level key.</td></tr> </tbody></table>
<p>For any system not listed above, the rpg.actor UI renders it automatically using the <b>generic sheet renderer</b>, with no native support required.</p>
<p><b>Players</b> are capable of hosting their own character sheets through an <code>actor.rpg.stats</code> records. Nobody but the player themselves can edit these records, which is a core concept behind the autonomous nature of this system.</p>
<p><b>Masters</b> however can validate the sheets using an <code>actor.rpg.master</code> record that references the user specifically, and declares the whether or not the stats are valid within the context of their campaign. This can be done either manually or systematically, allowing for verification of player records and decentralized agreement for stats.</p>
<p>This dual-record system allows for characters and worlds to be managed autonomously by those who should be in control of them, while still allowing for assured compatibility and approval within worlds that scale. Whether your campaign has two characters or two thousand, the validation records can track and manage fair play for all.</p>
<h2>Validation Types</h2>
<p>Different campaigns require different levels of authority, and the <code>.master</code> records can accommodate varying levels of trust / strictness to adhere the validation. Whether you want to build a rigid tournament system with zero editing tolerance, or an open free-form experience with no cares at all, both can be managed while keeping coherent reference to which players a <b>Master </b>considers worthy of connective play in their worlds.</p>
<p>Validation strictness is controlled by the <code>snapshotScope</code> field in each <code>actor.rpg.master</code> record. This field determines how the player's live stats are compared against the master's approved snapshot:</p>
<table> <tbody><tr><th>Type</th><th><code>snapshotScope</code></th><th>Use Case</th><th>Behavior Mode</th></tr> <tr> <td><b>Inherent Trust</b></td> <td><code>none</code></td> <td>Narrative games</td> <td>Always accepting, regardless of player edits. No stats snapshot stored.</td> </tr> <tr> <td><b>Custom Confidence</b></td> <td><code>custom</code></td> <td>Most campaigns</td> <td>Validates only selected fields. The <code>stats</code> field holds a partial snapshot of approved values.</td> </tr> <tr> <td><b>Hard Record</b></td> <td><code>full</code> (default)</td> <td>Tournament play</td> <td>Any player-made change breaks validation. Full stats snapshot is stored and compared exactly.</td> </tr> </tbody></table>
<p>Validation records may also hold a <code>campaign</code> name to keep players organized across different groupings, and a <code>spriteCid</code> to approve a specific sprite blob alongside the stats. Keep <code>master.stats</code> as the canonical system payload object (do not wrap it inside another <code>{ systemKey: ... }</code> layer).</p>
<p><strong>Master's Protip:</strong> Using <code>custom</code> scope and validating combat-relevant groups (abilities, spell lists, and saves) while leaving frequently edited elements like personality or hit points can build a system with very little authorization oversight to manage.</p>
<h2>Staying in Sync</h2>
<p>When a validations match a player's current stats, their sheet will show "<b>Approved by: </b><b>@master.handle</b>" to link them with the approving <b>Master</b>. If the player edits something to break validation, the approval disappears until the records are re-validated, or the player reverts their changes to the approved state.</p>
<p>Players can use the <b>Check Masters</b> button to see every validation that references their character, and quickly adopt the stats professed by the <code>.master</code> record as they wish. This is handy for easy recovery, campaigns with controlled levelling, or for switching states between different session configurations dictated by the Masters.</p>
<p>With <b>rpg.actor</b>, players can log into your <b>RPG Maker</b> game with their <a href="https://atproto.com">AT Protocol</a> handle and bring their character along, complete with stats and sprite. The data lives in their own <a href="https://atproto.com">AT Protocol</a> repository, so there's no server to run and no save files to manage. A player's progress can follow them between games automatically.</p>
<p>The system works through keyed <b>RPG Maker MZ</b> values within their <code>actor.rpg.stats</code> record that can persist outside your game files, and follow the player into other experiences. By authenticating into your game via <b>OAuth 2.0</b> (Authorization Code + PKCE + DPoP), players grant scoped access to their <code>actor.rpg.stats</code>, <code>actor.rpg.sprite</code>, and <code>actor.rpg.master</code> records. Credentials are <b>ephemeral</b> — held only in memory for the duration of the session, never written to save files or disk. If a session expires mid-game, the plugin can prompt a seamless re-authentication without losing progress.</p>
<p>Beyond player characters, the plugin suite enables <b>living NPC populations</b> drawn from real AT Protocol users on the rpg.actor registry. Wandering NPCs can appear organically in your world using region-based spawning, while important characters can be pinned to specific map events by DID. Every NPC carries their real profile, sprite, and stats — and players can even invite them into their party.</p>
<h2>MZ Plugins</h2>
<p>The <b>rpg.actor</b> plugin set for <b>RPG Maker MZ</b> handles AT Protocol authentication, stats synchronization, sprite loading, NPC spawning, and social post integration. Drop the plugins into your project and players can connect their characters immediately.</p>
<p><strong>RPG Maker MZ Plugins</strong></p>
<p>Compatible with RPG Maker MZ supporting login and data read/write</p>
<p> <a href="https://rpg.actor/downloads/plugins/mz/RPGACTOR_PLUGINS(MZ)v0.20.zip">Download .zip</a> v0.20</p>
<p><strong>Jam Sample Project</strong></p>
<p>Example project with OAuth login and read/write for stats and sprites</p>
<p> <a href="https://rpg.actor/downloads/plugins/mz/rpgactor_JamSample(MZ)v0.20.zip">Download .zip</a> v0.20</p>
<p>The <b>Jam Sample Project</b> is a complete RPG Maker MZ project demonstrating plugin setup, login, stat sync, NPC spawning, and post integration.</p>
<h3>Plugin Load Order</h3>
<table> <tbody><tr><th>Plugin</th><th>Required</th><th>Purpose</th></tr> <tr><td>RPGACTOR_Core</td><td>Yes</td><td>AT Protocol core — auth, XRPC, identity, party, game variables</td></tr> <tr><td>RPGACTOR_Login</td><td>Yes</td><td>AT Protocol OAuth login with profile preview, reauth on session expiry</td></tr> <tr><td>RPGACTOR_NPC</td><td>Optional</td><td>AT Protocol NPCs — registration, region spawning, wanderers, dialogue</td></tr> <tr><td>RPGACTOR_Posts</td><td>Optional</td><td>Post viewer, compose window, and social escape codes</td></tr> <tr><td>RPGACTOR_Sprites</td><td>Optional</td><td>Sprite pipeline — PDS records, character selector, face generation</td></tr> <tr><td>RPGACTOR_Stats</td><td>Optional</td><td>Stat sync — actor.rpg.stats PDS records and rpg.actor master records</td></tr> </tbody></table>
<p><strong>Load Order Matters:</strong> <code>RPGACTOR_Core</code> must be loaded first in the Plugin Manager. <code>RPGACTOR_Login</code> should follow immediately after Core. The remaining plugins (NPC, Posts, Sprites, Stats) can be loaded in any order after Login, though NPC depends on Sprites and Stats at runtime for full functionality.</p>
<h2>Authentication</h2>
<p>The plugin suite uses <b>OAuth 2.0 Authorization Code flow with PKCE and DPoP</b> for secure authentication. This is the same standard used by Bluesky's first-party applications.</p>
<h3>How It Works</h3>
<ol> <li>The player enters their Bluesky handle in the login overlay</li> <li>The plugin resolves their PDS endpoint and fetches the OAuth authorization server metadata</li> <li>A Pushed Authorization Request (PAR) is sent with a PKCE code challenge</li> <li>The player's default browser opens to the authorization page on their PDS</li> <li>After approval, a localhost callback server captures the authorization code</li> <li>The code is exchanged for DPoP-bound access and refresh tokens</li> </ol>
<p><b>Ephemeral credentials:</b> Tokens are held in memory only (<code>RpgActor._tempCredentials</code>). Nothing is written to localStorage, save files, or disk. When the game closes, credentials are gone. Save files store only the player's DID and handle for identity continuity — not tokens.</p>
<h3>Session Lifecycle</h3>
<ul> <li>Access tokens auto-refresh every 30 minutes in the background</li> <li>If a session expires and <code>reauthOnLoad</code> is enabled, the login overlay reappears with the handle pre-filled and read-only</li> <li>The player can also continue offline — their local game state is preserved</li> </ul>
<p><strong>Desktop Requirement:</strong> OAuth requires NW.js (the standard RPG Maker MZ desktop runtime) to spin up the localhost callback server and access Node.js crypto APIs. Browser/web deploys are not currently supported for authenticated flows.</p>
<h3>Scopes Requested</h3>
<pre><code>atproto
repo:actor.rpg.stats
repo:actor.rpg.sprite
repo:actor.rpg.master
blob:image/*</code></pre>
<p>These scopes allow the game to read and write the player's character stats, sprite, and master validation records, plus upload sprite images as blobs.</p>
<h2>Stats &amp; Sprites</h2>
<p>Each player can store values relevant to your RPG Maker MZ games through the dedicated <code>rmmz</code> key inside their <code>actor.rpg.stats</code> record. These map directly to the standard in-engine actor parameters:</p>
<table> <tbody><tr><th>Stat</th><th>What It Stores</th><th>Example</th></tr> <tr><td>level</td><td>Character level</td><td>5</td></tr> <tr><td>class</td><td>Class name</td><td>"Warrior"</td></tr> <tr><td>xp</td><td>Total experience</td><td>1250</td></tr> <tr><td>hp / maxHp</td><td>Current and max hit points</td><td>38 / 45</td></tr> <tr><td>mp / maxMp</td><td>Current and max magic points</td><td>12 / 20</td></tr> <tr><td>hit, eva, cri</td><td>Rates (stored as 0–100)</td><td>95, 5, 4</td></tr> <tr><td>tp / maxTp</td><td>Current and max tactical points</td><td>50 / 100</td></tr> </tbody></table>
<p>Sprites are stored through player <code>actor.rpg.sprite</code> records. For predictable in-engine behavior, target the <b>rpg.actor sprite standard</b> <i>(144×192 PNG, 48×48 frames, 3×4 grid)</i>. Custom sheets can exist in the ecosystem, so plugin integrations should normalize or fallback when dimensions do not match the baseline.</p>
<p>When a player levels up or their stats change in your game, those changes can be pushed back to their personal records so long as the player authorizes the game to do so, allowing other compatible games to keep continuity.</p>
<p><strong>Multi-engine Preservation:</strong> When the plugin writes to a player's <code>actor.rpg.stats</code> record, it only touches the <code>rmmz</code> key. Any other system sections in the record (D&amp;D, DCC, Reverie, custom systems, etc.) are preserved. The plugin always fetches the full record first, merges the RMMZ data in, then writes the whole record back.</p>
<p><strong>First-login Snapshot:</strong> If a player has no existing <code>actor.rpg.stats</code> record when they log in, the plugin automatically snapshots the current in-game actor's stats and uploads them as the initial PDS record.</p>
<h3>Avatar-to-Face Pipeline</h3>
<p>The player's AT Protocol avatar is automatically downloaded and converted into an RMMZ-compatible face graphic (scaled to 144×144 in a 576×288 face sheet). This means every authenticated player gets a face graphic in dialogue windows without any manual setup.</p>
<h3>Sprite Naming Convention</h3>
<p>Custom PDS sprites are saved to <code>img/characters/</code> using the naming pattern <code>$bsky_handle</code> (the <code>$</code> prefix tells RMMZ it's a single-character sheet).</p>
<p><b>NOTE:</b> The plugin suite is under active development. While the core authentication, stats sync, and sprite pipeline are stable, the NPC and social features are still evolving. Save/load behavior with dynamic NPCs and party members should be tested thoroughly in your specific game configuration. Always merge-write PDS records (fetch, modify, put) rather than blind overwrites to preserve cross-system data.</p>
<h2>NPC System</h2>
<p>The <code>RPGACTOR_NPC</code> plugin turns real rpg.actor users into living NPCs in your game world. There are three ways NPCs can appear:</p>
<h3>Registered NPCs</h3>
<p>Manually registered by handle via plugin command. These are persistent across saves and can be spawned onto any map programmatically.</p>
<h3>Wandering NPCs</h3>
<p>Randomly selected from the rpg.actor registry and placed in designated map regions. Each wanderer carries their real AT Protocol profile, PDS sprite, and stats. They appear organically and can be refreshed each time the player enters a map.</p>
<h3>Pinned NPCs</h3>
<p>Tied to specific map events using a note tag in the RPG Maker editor:</p>
<pre><code>&lt;rpgactor_pin:did:plc:xxxxxxxxxxxxx&gt;</code></pre>
<p>When the map loads, the plugin resolves the DID, downloads their sprite from PDS, and applies it to the event automatically. This lets you place important rpg.actor characters at fixed locations in your game.</p>
<h3>NPC Dialogue &amp; Party Joining</h3>
<p>NPCs generate contextual dialogue from their AT Protocol profile (display name, bio, follower count). When talking to an NPC, the player is offered the choice to invite them into the party. Accepting triggers an async pipeline that downloads the NPC's sprite, stats, and avatar, then adds them as a fully functional party member with RMMZ-compatible stats applied.</p>
<p><strong>Party Deduplication:</strong> NPCs who are already in the player's party will not respawn as wanderers or registered NPCs, preventing duplicates.</p>
<h3>Plugin Commands</h3>
<table> <tbody><tr><th>Feature</th><th>Plugin Command</th></tr> <tr><td>Register a persistent NPC</td><td><code>registerNpc</code> (handle)</td></tr> <tr><td>Spawn a registered NPC</td><td><code>spawnNpc</code> (handle)</td></tr> <tr><td>Search &amp; add NPCs via overlay</td><td><code>showNpcLookup</code></td></tr> <tr><td>Populate wanderers by region</td><td><code>spawnWanderers</code> (regions, count, requireSprite)</td></tr> <tr><td>Clear wanderer NPCs</td><td><code>clearWanderers</code></td></tr> </tbody></table>
<p><b>Region-based spawning</b> uses RMMZ map regions (paint regions in the tilemap editor) to control where NPCs can appear. The <code>spawnRegionId</code> parameter sets the default NPC region, while <code>wandererRegions</code> accepts a comma-separated list of region IDs for wanderer placement.</p>
<h2>Key Parameters</h2>
<p>Each plugin exposes configuration through the RPG Maker MZ Plugin Manager. Below are the most important parameters developers should know about:</p>
<h3>RPGACTOR_Core</h3>
<h3>RPGACTOR_Login</h3>
<table> <tbody><tr><th>Parameter</th><th>Default</th><th>Purpose</th></tr> <tr><td><code>showOnNewGame</code></td><td>true</td><td>Automatically show login on new game</td></tr> <tr><td><code>reauthOnLoad</code></td><td>true</td><td>Prompt re-login when session expires on save load</td></tr> <tr><td><code>allowLoginSkip</code></td><td>false</td><td>If true, players can skip login entirely (not just go offline)</td></tr> <tr><td><code>clientId</code></td><td><code>http://localhost</code></td><td>OAuth client identifier (loopback for desktop, hosted URL for web)</td></tr> <tr><td><code>continueCommonEvent</code></td><td>0</td><td>Common event to auto-run after successful login</td></tr> </tbody></table>
<h3>RPGACTOR_NPC</h3>
<table> <tbody><tr><th>Parameter</th><th>Default</th><th>Purpose</th></tr> <tr><td><code>spawnRegionId</code></td><td>2</td><td>Map region ID for registered NPC spawning</td></tr> <tr><td><code>wandererRegions</code></td><td><code>3,4</code></td><td>Comma-separated region IDs for wanderer placement</td></tr> <tr><td><code>wandererCount</code></td><td>2</td><td>How many wanderers to spawn per region</td></tr> <tr><td><code>mustHaveSprite</code></td><td>true</td><td>Only spawn wanderers who have a PDS sprite record</td></tr> </tbody></table>
<h3>Game Variables</h3>
<p>The Core plugin populates 20 consecutive game variables (starting from <code>startVariableId</code>) with data from the player's AT Protocol profile, making them available to RMMZ event conditions, text codes, and conditional branches:</p>
<table> <tbody> <tr><td>+0</td><td>HANDLE</td><td>Player's @handle</td></tr> <tr><td>+1</td><td>DISPLAY_NAME</td><td>Display name</td></tr> <tr><td>+2</td><td>AVATAR_URL</td><td>Avatar image URL</td></tr> <tr><td>+3</td><td>DID</td><td>Decentralized identifier</td></tr> <tr><td>+4</td><td>LOGIN_STATUS</td><td>1 = logged in, 0 = offline</td></tr> <tr><td>+5</td><td>FOLLOWERS</td><td>Follower count</td></tr> <tr><td>+6</td><td>FOLLOWING</td><td>Following count</td></tr> <tr><td>+7</td><td>POSTS_COUNT</td><td>Post count</td></tr> <tr><td>+8</td><td>DESCRIPTION</td><td>Profile bio</td></tr> <tr><td>+9</td><td>BANNER_URL</td><td>Banner image URL</td></tr> <tr><td>+10</td><td>CREATED_AT</td><td>Account creation date</td></tr> <tr><td>+11</td><td>FACE_GRAPHIC</td><td>Generated face graphic name</td></tr> <tr><td>+12</td><td>ACCOUNT_AGE</td><td>Account age metric</td></tr> <tr><td>+13</td><td>LISTS_COUNT</td><td>List count</td></tr> <tr><td>+14</td><td>HAS_AVATAR</td><td>Boolean (0/1)</td></tr> <tr><td>+15</td><td>HAS_BANNER</td><td>Boolean (0/1)</td></tr> <tr><td>+16</td><td>IS_VERIFIED</td><td>Boolean (0/1)</td></tr> <tr><td>+17</td><td>LABELS</td><td>Account labels</td></tr> <tr><td>+18</td><td>PINNED_POST</td><td>Pinned post reference</td></tr> <tr><td>+19</td><td>POST_INDEX</td><td>Current post index</td></tr> </tbody></table>
<h3>Social Escape Codes</h3>
<p>Provided by <code>RPGACTOR_Posts</code>, these can be used in any RMMZ Show Text command to embed live Bluesky data:</p>
<table> <tbody> <tr><td><code>\BSKYLIKE[n]</code></td><td>Like count</td></tr> <tr><td><code>\BSKYRT[n]</code></td><td>Repost count</td></tr> <tr><td><code>\BSKYDATE[n]</code></td><td>Post date</td></tr> </tbody></table>
<p>The <a href="https://github.com/TechTastic/godot-rpg-actor">godot-rpg-actor</a> add-on brings full <b>AT Protocol</b> and <b>rpg.actor</b> integration to the <a href="https://godotengine.org/">Godot Engine</a>. Players can log in with their Bluesky handle via OAuth, and your game can read and write character stats, sprites, and equipment records directly from their personal data server.</p>
<p>The add-on provides four autoload singletons that handle identity resolution, authenticated XRPC calls, the OAuth login flow, and the full rpg.actor API — plus custom <code>Sprite2D</code> and <code>Sprite3D</code> nodes for rendering character sprites from PDS records.</p>
<p>Written entirely in <b>GDScript</b>, it works with Godot 4.x desktop builds (OAuth requires the ability to open a browser and receive a localhost callback).</p>
<p><strong>Explore Repo: godot-rpg-actor</strong></p>
<p>Built and maintained by <a href="https://bsky.app/profile/techtastic1.bsky.social">@techtastic1</a> (aka <a href="https://rpg.actor/godotguy.rpg.actor">@godotguy.rpg.actor</a>) with support for OAuth logins, rpg.actor APIs, and data read/write for Godot 4.x.</p>
<p><a href="https://github.com/TechTastic/godot-rpg-actor">View on GitHub →</a></p>
<h2>Add-on Setup</h2>
<p>The add-on installs as a standard Godot plugin. When enabled, it registers four autoload singletons that become available globally throughout your project:</p>
<table> <tbody><tr><th>Autoload</th><th>Purpose</th></tr> <tr><td><code>XRPC</code></td><td>Low-level HTTP and XRPC request handling with DPoP support, blob uploads, and response parsing</td></tr> <tr><td><code>ATProto</code></td><td>AT Protocol identity resolution (handle → DID → PDS) and record operations (get, put, list, merge)</td></tr> <tr><td><code>ATProtoOAuth</code></td><td>OAuth 2.0 login with PKCE and DPoP — browser-based auth, token management, and auto-refresh</td></tr> <tr><td><code>RpgActor</code></td><td>rpg.actor API wrapper — actors, search, masters, sprites, equipment, and creator endpoints</td></tr> </tbody></table>
<h3>Installation</h3>
<ol> <li>Clone or download the repository from <a href="https://github.com/TechTastic/godot-rpg-actor">GitHub</a></li> <li>Copy the <code>addons/rpg_actor/</code> folder into your project's <code>addons/</code> directory</li> <li>In the Godot editor, go to <b>Project → Project Settings → Plugins</b> and enable <b>rpg.actor</b></li> <li>The four autoloads are registered automatically when the plugin is enabled</li> </ol>
<p><strong>Load Order:</strong> The plugin registers autoloads in dependency order: <code>XRPC</code> first (used by all others), then <code>RpgActor</code>, <code>ATProto</code>, and <code>ATProtoOAuth</code>. You do not need to configure this manually.</p>
<h2>Authentication</h2>
<p>The <code>ATProtoOAuth</code> singleton implements <b>OAuth 2.0 Authorization Code flow with PKCE and DPoP</b> — the same standard used by the RPG Maker plugins and Bluesky's own applications.</p>
<h3>How It Works</h3>
<ol> <li>Call <code>ATProtoOAuth.login("handle.bsky.social")</code></li> <li>The add-on resolves the handle to a DID and PDS endpoint</li> <li>OAuth metadata is fetched from the PDS authorization server</li> <li>A PKCE challenge and DPoP keypair are generated</li> <li>A Pushed Authorization Request (PAR) is sent if supported</li> <li>The player's browser opens to authorize</li> <li>A localhost TCP server captures the callback</li> <li>The authorization code is exchanged for DPoP-bound tokens</li> </ol>
<pre><code># Basic login flow
var result = await ATProtoOAuth.login("yourname.bsky.social")
if result.success:
    print("Logged in as: ", result.did)
    print("Handle: ", result.handle)
else:
    print("Login failed: ", result.error)</code></pre>
<table> <tbody> <tr><td><code>login_completed</code></td><td><code>success: bool, did: String</code></td><td>OAuth flow completes (success or failure)</td></tr> <tr><td><code>login_failed</code></td><td><code>error: String</code></td><td>Any step of the login flow fails</td></tr> <tr><td><code>logout_completed</code></td><td>—</td><td>Session is cleared via <code>logout()</code></td></tr> </tbody></table>
<h3>Session Management</h3>
<ul> <li>Tokens are held <b>in memory only</b> — nothing written to disk</li> <li>Access tokens auto-refresh every <b>25 minutes</b> via a background timer</li> <li>Use <code>ATProtoOAuth.is_authenticated()</code> to check session state</li> <li>Call <code>ATProtoOAuth.logout()</code> to clear all credentials</li> <li>Session accessors: <code>get_session_did()</code>, <code>get_session_handle()</code>, <code>get_user_pds()</code></li> </ul>
<h3>Scopes Requested</h3>
<pre><code>atproto
repo:actor.rpg.stats
repo:actor.rpg.sprite
repo:actor.rpg.master
repo:equipment.rpg.item
repo:equipment.rpg.give
blob:image/*</code></pre>
<p>These scopes allow reading and writing character stats, sprites, master validations, and equipment records, plus uploading image blobs.</p>
<p><strong>Desktop Requirement:</strong> OAuth requires a desktop build to spin up the localhost TCP callback server. The add-on opens the system browser for authorization and listens on a configurable local port (default 7000) for the redirect.</p>
<h2>Records &amp; Stats</h2>
<p>The <code>ATProto</code> singleton provides direct access to AT Protocol record operations. These work with any collection, including all <code>actor.rpg.*</code> and <code>equipment.rpg.*</code> records.</p>
<h3>Reading Records</h3>
<pre><code># Resolve a handle to DID + PDS
var identity = await ATProto.resolve_handle("player.bsky.social")
var did = identity.did
var pds = identity.pds

# Fetch character stats
var stats = await ATProto.get_record(pds, did, "actor.rpg.stats")

# Fetch sprite record
var sprite = await ATProto.get_record(pds, did, "actor.rpg.sprite")

# List equipment items
var items = await ATProto.list_records(pds, did, "equipment.rpg.item")</code></pre>
<h3>Writing Records (Merge-Safe)</h3>
<p>The add-on includes a <code>merge_and_put_stats</code> helper that fetches the existing record, merges your system key in, and writes it back — preserving data from other systems:</p>
<pre><code># Write Godot-specific stats without overwriting other system data
var pds = ATProtoOAuth.get_user_pds()
var did = ATProtoOAuth.get_session_did()

var my_stats = {
    "level": 5,
    "class": "Ranger",
    "hp": 42,
    "maxHp": 50
}

# Only touches the "godot" key; D&amp;D, RMMZ, etc. are preserved
await ATProto.merge_and_put_stats(pds, did, "godot", my_stats)</code></pre>
<p><strong>Migration-safe write pattern:</strong> If your integration supports per-system rkeys, write the system rkey first and keep a compatibility mirror in <code>self</code>. If you still write <code>self</code>, always fetch-merge-put.</p>
<h3>rpg.actor API</h3>
<p>The <code>RpgActor</code> singleton wraps the <a href="https://rpg.actor/dev-guide/#atproto-api">rpg.actor REST API</a> for convenience:</p>
<pre><code># Search the registry
var results = await RpgActor.search_actors("ranger")

# Get all actors (or full data)
var actors = await RpgActor.get_actors()
var full = await RpgActor.get_actors(true)

# Get a normalized sprite as PNG bytes
var sprite_bytes = await RpgActor.get_sprite(did)

# Query equipment
var player_items = await RpgActor.get_equipment_by_player(did)
var provider_gives = await RpgActor.get_equipment_by_provider(provider_did)

# Master validations
var masters = await RpgActor.get_masters_for_player(did)</code></pre>
<h3>Blob Uploads</h3>
<p>Upload images to the player's PDS for sprite or equipment asset records:</p>
<pre><code>var png_data: PackedByteArray = image.save_png_to_buffer()
var blob_ref = await XRPC.upload_blob(pds, png_data, "image/png")</code></pre>
<h2>Sprite Nodes</h2>
<p>The add-on includes custom <code>RpgActorSprite2D</code> and <code>RpgActorSprite3D</code> nodes that extend Godot's built-in sprite nodes. These can load character sprites directly from an actor's PDS record, making it easy to display rpg.actor characters in both 2D and 3D scenes.</p>
<table> <tbody> <tr><td><code>RpgActorSprite2D</code></td><td><code>Sprite2D</code></td><td>2D games, UI character displays, side-scrollers</td></tr> <tr><td><code>RpgActorSprite3D</code></td><td><code>Sprite3D</code></td><td>3D worlds with billboard sprites, mixed 2D/3D</td></tr> </tbody></table>
<p>The shared baseline is the rpg.actor sprite standard walk sheet (144×192 PNG, 3-column × 4-row grid of 48×48 frames). Some actors may publish custom layouts, so consumers should either normalize to baseline or implement compatible fallback playback logic. The normalized sprite endpoint serves the baseline format for any registered actor.</p>
<h2>Project Settings</h2>
<p>The plugin registers the following project settings automatically when enabled. These can be adjusted in <b>Project → Project Settings</b>:</p>
<table> <tbody><tr><th>Setting</th><th>Default</th><th>Purpose</th></tr> <tr><td><code>rpg_actor/api</code></td><td><code>https://rpg.actor/api</code></td><td>rpg.actor API base URL</td></tr> <tr><td><code>bluesky/api/public</code></td><td><code>https://public.api.bsky.app</code></td><td>Bluesky public API endpoint</td></tr> <tr><td><code>bluesky/api/auth</code></td><td><code>https://bsky.social</code></td><td>Bluesky auth API endpoint</td></tr> <tr><td><code>atproto/plc_directory</code></td><td><code>https://plc.directory</code></td><td>PLC directory for DID resolution</td></tr> <tr><td><code>atproto/oauth/client_id_url</code></td><td><code>http://localhost</code></td><td>OAuth client identifier</td></tr> <tr><td><code>atproto/oauth/local_callback_port</code></td><td><code>7000</code></td><td>Localhost port for OAuth callback server</td></tr> <tr><td><code>atproto/oauth/scope</code></td><td><i>(see below)</i></td><td>OAuth scopes requested during login</td></tr> </tbody></table>
<p><strong>Callback Port:</strong> If port 7000 is busy, the add-on will automatically try a random available port. For most setups, the default works fine.</p>
<p>The <b>Creator System</b> lets game masters, developers, and storytellers create and manage entire rosters of character identities on rpg.actor. Each character is a real <a href="https://atproto.com">AT Protocol</a> account with its own unique <code>name.rpg.actor</code> handle, character sheet, sprite, and full federated identity.</p>
<p>Creator accounts are available in two tiers through a one-time purchase — no subscription required:</p>
<p>Additional character slots can be purchased at any time. Every character you create appears on the registry alongside everyone else and is fully compatible with Bluesky and other AT Protocol applications.</p>
<h2>Characters &amp; Roster</h2>
<p>From the <b>Creator Panel</b>, you can create new characters that are instantly provisioned as real PDS accounts. Each character gets:</p>
<ul> <li>A unique <code>name.rpg.actor</code> handle (or a <a href="https://rpg.actor/dev-guide/#creator-domains">custom domain</a> handle)</li> <li>Their own <code>actor.rpg.stats</code> and <code>actor.rpg.sprite</code> records</li> <li>A full AT Protocol identity discoverable across the network</li> <li>Optional campaign tagging for organizing characters by game or story</li> </ul>
<p>You can <b>switch into</b> any character to edit their sheet and sprite directly, <b>clone</b> characters to create variations, <b>rename</b> handles, and <b>delete</b> characters you no longer need. The Creator Panel also supports writing <code>actor.rpg.master</code> validation records for your characters programmatically.</p>
<h2>Handoff &amp; Adoption</h2>
<p>Characters you create can be <b>handed off</b> to real players, transferring full account ownership. There are two handoff methods:</p>
<ul> <li><b>Email handoff</b> — Send an invitation email with a secure claim link. The recipient sets their own password and takes ownership.</li> <li><b>Link handoff</b> — Generate a claim link to share directly. Anyone with the link can claim the character.</li> </ul>
<p>When a player claims a character, they can either <b>keep it as a standalone account</b> (retaining the <code>name.rpg.actor</code> handle) or <b>adopt the character data</b> into their existing Bluesky/AT Protocol account, merging the stats and sprite into their own repository.</p>
<p>After handoff, the character slot frees up for you to create a new character. If a player later deletes their adopted character data, you can <b>reclaim the handle</b> to reuse it.</p>
<h2>Custom Domains</h2>
<p>Creator accounts can register <b>custom domains</b> so that characters use handles like <code>hero.yourgame.com</code> instead of <code>hero.rpg.actor</code>. This is especially useful for game developers who want characters to carry their game's branding.</p>
<h3>Setup Instructions</h3>
<ol> <li><b>Add a wildcard CNAME record</b> for your domain pointing to <code>rpg.actor</code>:<br/> <pre><code>*.yourgame.com  CNAME  rpg.actor.</code></pre> This allows any <code>name.yourgame.com</code> subdomain to route to the rpg.actor server.</li> <li><b>Register the domain</b> in your Creator Panel under the Custom Domains section. The system will verify DNS resolution and provision TLS certificates automatically via Caddy.</li> <li><b>Create characters</b> using the domain. When creating or renaming a character, select your domain from the dropdown to assign handles like <code>hero.yourgame.com</code>.</li> </ol>
<p><strong>DNS Propagation:</strong> After adding the CNAME record, DNS changes can take up to 24 hours to propagate. The verification step will check for correct resolution before allowing characters to use the domain. If verification fails, you can retry after propagation completes.</p>
<p><strong>No Conflicting A Records:</strong> If the domain has existing A or AAAA records for the wildcard subdomain, they will conflict with the CNAME. Remove any conflicting records before adding the CNAME to rpg.actor.</p>
<p>Everything on <b>rpg.actor</b> is built upon a set of open <a href="https://atproto.com/guides/lexicon">lexicons</a>. These schema definitions describe how character data is structured inside user's <b>AT Protocol</b> repositories. The registry indexes and displays these records, and any ATproto-enabled service can read or write the same data.</p>
<h3>Character Records</h3>
<table> <tbody> <tr><td><code>actor.rpg.stats</code></td><td>&lt;system&gt; (standard), self (deprecated compat)</td><td>Character stats, one canonical record per system key. Optional legacy self mirror for older consumers.</td></tr> <tr><td><code>actor.rpg.sprite</code></td><td>self</td><td>Standardized sprite sheet in PNG + animation metadata</td></tr> <tr><td><code>actor.rpg.generator</code></td><td>self</td><td>Separated sprite layers and configuration for recomposition</td></tr> <tr><td><code>actor.rpg.master</code></td><td>TID</td><td>Master validation records referencing a player's stats</td></tr> </tbody></table>
<h3>Equipment Records</h3>
<p>The raw schemas for each lexicon are available here:</p>
<ul> <li><a href="https://rpg.actor/lexicons/actor.rpg.stats.json">actor.rpg.stats.json</a> — character stats</li> <li><a href="https://rpg.actor/lexicons/actor.rpg.sprite.json">actor.rpg.sprite.json</a> — sprite sheets</li> </ul>
<p><strong>Changing Schema:</strong> These lexicons are actively evolving. New system keys and fields may be added in future revisions, but we have designed for forward compatibility through highly optional fielding. Implement only as you see fit.</p>
<h2>API Access</h2>
<p>Public endpoints for querying the registry, rate limited to <b>150 requests per minute</b> per IP. These are organized by scope below.</p>
<h3>Registry (Public)</h3>
<table> <tbody><tr><th>Endpoint</th><th>Description</th></tr> <tr><td>GET /api/actors</td><td>All indexed actor DIDs with collection metadata (hasSprite, hasStats, timestamps)</td></tr> <tr><td>GET /api/actors/full</td><td>Full cached actor data for all actors (profiles, sprites, stats)</td></tr> <tr><td>GET /api/search?q=...</td><td>Search actors by handle or display name (min 2 chars, max 10 results)</td></tr> </tbody></table>
<h3>Masters (Public)</h3>
<h3>Sprites &amp; Media (Public)</h3>
<h3>Equipment (Public)</h3>
<table> <tbody><tr><th>Endpoint</th><th>Description</th></tr> <tr><td>GET /api/equipment</td><td>Equipment index summary — total gives, items, providers, and known provider list</td></tr> <tr><td>GET /api/equipment?player=did:...</td><td>All items owned by a player and all gives addressed to them, across all providers</td></tr> <tr><td>GET /api/equipment?provider=did:...</td><td>All gives issued by a specific provider</td></tr> </tbody></table>
<p>The compendium indexes <code>equipment.rpg.give</code> and <code>equipment.rpg.item</code> records from across the AT Protocol via <a href="https://docs.bsky.app/blog/jetstream">Jetstream</a>. Any provider or player writing such records to a PDS will appear in this index automatically.</p>
<h3>Creator (Public)</h3>
<h3>Creator Utils (API Key)</h3>
<p>Stateless utilities for external tools. Auth: <code>Authorization: Bearer rpga_key_&lt;key&gt;</code>. Think of these as server-side helpers for compositing and generator manipulation.</p>
<table> <tbody><tr><th>Endpoint</th><th>Description</th></tr> <tr><td>POST /api/generator/compose</td><td>Render a player’s sprite from their live generator record. Pass <code>{ did }</code> to get their current look, or <code>{ did, layers }</code> with a modified layer array from <code>/dress</code> or <code>/undress</code> to preview equipping or removing an item. The server fetches all layer blobs; disabled layers are automatically excluded. Default response is binary <code>image/png</code>. Add <code>?meta=1</code> to get JSON instead: <code>{ image, mimeType, size, sprite }</code> where <code>sprite</code> is a fully pre-filled <code>actor.rpg.sprite</code> record stub — upload the image as a blob, fill in <code>sprite.spriteSheet.ref.$link</code> and <code>sprite.spriteSheet.size</code>, then <code>putRecord</code> to write <code>actor.rpg.sprite/self</code>.</td></tr> <tr><td>POST /api/creator/utils/check</td><td>Validate an <code>.item</code> or <code>.generator</code> JSON record against the schema</td></tr> <tr><td>POST /api/creator/utils/recolor</td><td>Apply sentinel-color recoloring to a layer PNG; optionally extract its subtractive mask</td></tr> <tr><td>POST /api/creator/utils/dress</td><td>Merge an <code>.item</code> record into a <code>.generator</code> record, inserting in canonical layer order. Returns a modified generator ready to pass to <code>/api/generator/compose</code></td></tr> <tr><td>POST /api/creator/utils/undress</td><td>Remove a layer from a <code>.generator</code> record by category (and optionally by slug). Also removes the slug from <code>gen.items[]</code>. Complement of <code>/dress</code>.</td></tr> <tr><td>POST /api/creator/utils/compose/raw</td><td>Composite raw layer PNGs (supplied as base64 data URIs, with optional colorway recoloring, subtractMask, and behindRows support) into a 144×192 sprite. Returns <code>{ composite, spriteRecord }</code> where <code>spriteRecord</code> is a pre-filled <code>actor.rpg.sprite</code> stub with correct field names (<code>spriteSheet</code>, <code>columns</code>) ready to complete with a blob ref after upload. For asset creation workflows when you have locally-produced PNGs that don’t yet exist on a PDS (e.g. fresh from <code>/recolor</code>).</td></tr> <tr><td>POST /api/creator/utils/roll</td><td>Roll dice in standard notation (e.g. <code>2d6+3</code>)</td></tr> <tr><td>POST /api/creator/utils/lookup</td><td>Look up a character's stat value by name or path</td></tr> </tbody></table>
<p><strong>Choosing between /api/generator/compose and /api/creator/utils/compose/raw:</strong></p>
<ul> <li>Use <code>/api/generator/compose</code> for game assembly — rendering a player’s current look, previewing equipment changes after <code>/dress</code> or <code>/undress</code>. Pass a DID; the server fetches all blobs. This is the endpoint you’ll use in almost every game scenario.</li> <li>Use <code>/api/creator/utils/compose/raw</code> when you are building assets and have raw PNGs in hand (e.g. fresh from <code>/recolor</code>) that don’t yet exist on any PDS.</li> </ul>
<p>Use <code>?meta=1</code> on <code>/compose</code> to receive a pre-filled <code>actor.rpg.sprite</code> record stub alongside the image — ready to write back to the player’s PDS once the blob is uploaded.</p>
<h3>Account (Authenticated)</h3>
<table> <tbody><tr><th>Endpoint</th><th>Description</th></tr> </tbody></table>
<p><strong>Build on your own foundation:</strong> These API endpoints are provided as a convenience, but we may change rate limits or functionality over time. If you're building something serious, you're better off running your own <a href="https://docs.bsky.app/blog/jetstream">Jetstream</a> consumer to monitor <code>actor.rpg.*</code> records directly. That way you own your data pipeline and don't depend on us!</p>
<h2>Working with Records</h2>
<p>Every player's data lives in their own <a href="https://atproto.com/guides/self-hosting">Personal Data Server</a>. For stats, read with per-system rkey first logic. Use <code>self</code> only as a deprecated compatibility fallback.</p>
<pre><code>GET {pds}/xrpc/com.atproto.repo.getRecord
    ?repo=did:plc:...
    &amp;collection=actor.rpg.stats
    &amp;rkey=mycoolrpg

// deprecated fallback if missing:
GET {pds}/xrpc/com.atproto.repo.getRecord
    ?repo=did:plc:...
    &amp;collection=actor.rpg.stats
    &amp;rkey=self</code></pre>
<p>The user's <b>DID</b> can typically be resolved through their <b>@actor.handle</b> through the <a href="https://plc.directory">plc.directory</a>, which will also provide you their <b>PDS</b> endpoint. With that information, their <code>actor.rpg.*</code> records can be easily located.</p>
<p>Writing follows the same idea, only requiring authentication. Any service that secures user authorization through either <a href="https://atproto.com/guides/oauth">OAuth</a> or an <a href="https://bsky.app/settings/app-passwords">app password</a> can then use <code>putRecord</code> to add or update <code>actor.rpg.*</code> records.</p>
<p><b>Important Notice:</b> Use per-system rkey as your standard write path for <code>actor.rpg.stats</code>. Maintain <code>self</code> only if you intentionally support older consumers. Any legacy <code>self</code> write must use fetch-merge-put because <code>putRecord</code> replaces the whole target record.</p>
<p>The <a href="https://atproto.com/guides/lexicon">AT Protocol Lexicon Guide</a> covers the rest of general work with open schema in detail.</p>
