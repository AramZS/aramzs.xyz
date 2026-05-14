---
author: 'Nexus Mods :: Bloodborne'
cover_image: >-
  https://staticdelivery.nexusmods.com/mods/2708/images/thumbnails/45/45-1772525575-1148533452.png
date: '2026-05-13T16:57:33.307Z'
dateFolder: 2026/05/13
description: >-
  adds dynamic shadows to everything in the game, alters gparams to boost shadow
  render distance and stability, parallax occlusion mapping added to many
  surfaces, new pointlights for many previously unl
isBasedOn: 'https://www.nexusmods.com/bloodborne/mods/45'
link: 'https://www.nexusmods.com/bloodborne/mods/45'
slug: 2026-05-13-httpswwwnexusmodscombloodbornemods45
tags:
  - gaming
title: BB PC Remaster
---
<h2 data-game-id="2708" data-mod-id="45">About this mod</h2>
<p>adds dynamic shadows to everything in the game, alters gparams to boost shadow render distance and stability, parallax occlusion mapping added to many surfaces, new pointlights for many previously unlit light sources like candles, lamps, etc.</p>
<p><strong><strong>As of version 0.99.56, reshade is no longer required for this mod at all, but if you still want to use my reshade preset, just make sure to disable the in-game AA via the shadps4 patch menu<br/>
<br/>
BB PC Remaster features:<br/>
</strong></strong>-Enable dynamic shadowcasting for the entire game<br/>
-Modifies the in-game Anti Aliasing to an unused version that I find works better (if you want to still use reshade based AA, you can now disable the in-game AA via the shadps4 patch menu)<br/>
-Modifies the shadows range and visibility.<br/>
-Pointlights added for street lamps, wall lamps, candles, torches, etc, that all previously didn't have any illumination tied to them.<br/>
-Parallax occlusion mapping added to surfaces throughout the game (WIP and will increase with each version)<br/>
-Higher resolution textures<br/>
-New shininess maps made for most surfaces, 2x or 4x in resolution, made from the newly upscaled albedo textures</p>
<p><strong>Installation:<br/>
</strong><strong>Step 1:</strong><br/>
copy the folders from this mod over to your dvdroot_ps4 folder and overwrite.<br/>
<strong>Optional step 2:</strong><br/>
If you want to use my reshade preset, download reshade <a href="https://reshade.me/#download">here</a><br/>
during the install, point it to your shadps4.exe, choose Vulkan, and then choose the ini preset file when it asks for one. In game you hit the Home key to open the reshade menu if you want to change anything about it. And from that menu you can make sure my preset is selected. Under Edit Global Preprocessor definitions, just make sure depth_input_is_reversed is set to 0. You're also free to use any other shaders you want, or other presets that enable SSAO and anti aliasing. mine is just my personal preference and I think it works really well.</p>
<p><strong>Optional step 3:<br/>
</strong>On the downloads tab, there is a new optional called the Original Resolution Textures, which will downpatch the mod to use the original resolution albedo, reflectance, and shininess maps, along with my modified normals for parallax occlusion mapping. If you use these, you may not need to allocate as much dmem to the mod. Or just if you just prefer how they look, which is fair, too.</p>
<p><strong>shadps4 recommended settings:</strong><br/>
in the shadps4qtlauncher, right click on bloodborne and hit "game-specific settings" and under experimental turn on<br/>
<em>Enable Devkit Console Mode</em> (required for enabling the Increased Graphics Heap Sizes in the patch menu)<br/>
<em>Enable Direct Memory Access</em> (test this on or off, as for me it helped with some artifacting)<br/>
<em>Enable Shader Cache</em> (not mod specific, but just good to turn on in general)<br/>
<em>Additional DMem Allocation</em> (I have it set to 5000MB, but play around with whatever value stops things from rendering because of my high res textures which do eat up more memory)</p>
<p>In the shadps4 patch menu, I recommend enabling<br/>
<em>Model LOD -2 (Highest)</em><br/>
<em>Skip Intro</em> (unless you want the intro of course)<br/>
<em>Increased Graphics Heap Sizes</em> (required for higher resolutions)<br/>
Choose a Light Grid patch that matches your monitor's resolution, so for me I choose 1440p Light Grid<br/>
And then you can choose a resolution patch if you don't want to play at the default 1080p. I play at 1440p.</p>
<p>You can also use a 60fps patch if your rig can handle it. Mine can depending on the situation at 1440p, but it's still not consistent enough for me, as you get higher input latency across the board even if you maintain 60fps. The default 30fps cap has very low input latency, but not everyone is super sensitive to it, understandably.</p>
<p>KNOWN ISSUES:<br/>
old yharnam has these pillars that are either too bright or too dark (still looking into)</p>
