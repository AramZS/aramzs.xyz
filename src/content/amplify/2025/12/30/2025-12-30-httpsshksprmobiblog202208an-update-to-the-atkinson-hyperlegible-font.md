---
author: Terence Eden
cover_image: >-
  https://shkspr.mobi/blog/wp-content/uploads/2022/08/BIA_AtkinsonHyerlegible-recognizable-footprints-differentiated-letterforms-transparent.png
date: '2025-12-30T16:00:27.845Z'
dateFolder: 2025/12/30
description: >-
  I'm a huge fan of the US Braille Institute's Atkinson Hyperlegible font. This
  blog is typeset in it, and I think it looks gorgeous. It's also specifically
  designed to be readable to people with visual impairments:  Atkinson
  Hyperlegible differentiates common misinterpreted letters and numbers using
  various design techniques:    There's only one problem, the font was released
  a few years ago and…
isBasedOn: 'https://shkspr.mobi/blog/2022/08/an-update-to-the-atkinson-hyperlegible-font/'
link: 'https://shkspr.mobi/blog/2022/08/an-update-to-the-atkinson-hyperlegible-font/'
slug: >-
  2025-12-30-httpsshksprmobiblog202208an-update-to-the-atkinson-hyperlegible-font
tags:
  - code
  - design
title: 3 thoughts on “An update to the Atkinson Hyperlegible font”
---
<p>I'm a huge fan of the <a href="https://brailleinstitute.org/freefont">US Braille Institute's Atkinson Hyperlegible font</a>. This blog is typeset in it, and I think it looks gorgeous. It's also specifically designed to be readable to people with visual impairments:</p>
<blockquote> <p>Atkinson Hyperlegible differentiates common misinterpreted letters and numbers using various design techniques:</p> </blockquote>
<figure><img alt="The font is displayed with a high level of blur to simulate low vision. The letters and numbers are still recognisable." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/BIA_AtkinsonHyerlegible-recognizable-footprints-differentiated-letterforms-transparent.png"/><figcaption>The font is displayed with a high level of blur to simulate low vision. The letters and numbers are still recognisable.</figcaption></figure>
<p>There's only one problem, the font was released a few years ago and hasn't been updated since. It covers most of the basic European letters, numbers, accents, and symbols - but not all. I wondered if it was going to receive any updates:</p>
<blockquote> <a href="https://twitter.com/edent">@edent</a> <a href="https://twitter.com/edent">@edent</a> thank you for your interest in the Atkinson font. We don’t presently have any plans for future enhancements but we will be sure to keep you in mind.    <a href="https://twitter.com/BrailleInst/status/1554606689130651651">❤️ 2</a> <a href="https://twitter.com/BrailleInst/status/1554606689130651651">💬 1</a> <a href="https://twitter.com/BrailleInst/status/1554606689130651651">♻️ 0</a> <a href="https://twitter.com/BrailleInst/status/1554606689130651651"> 23:14 - Tue 02 August 2022 </a> </blockquote>
<p>Sadly not! The font was released under the SIL Open Font Licence V1.0 which allows for remixing - under certain conditions. So that's what I've done!</p>
<p>Introducing <a href="https://github.com/edent/extended-hyperlegible"><em>Extended</em> Hyperlegible</a>! At the moment, it contains exactly <em>one</em> new character - U+1F12F, the copyleft symbol 🄯.</p>
<p>I hope to add a few more glyphs as an when I have time. Contributions very much welcomed!</p>
<p>This was a bit of a learning journey for me. Here are some notes to future-me.</p>
<ol> <li>Use <a href="https://fontforge.org/">FontForge</a> to open the original .otf font. </li> <li>Select the copyright symbol and copy it. <br/> <figure><img alt="Fontforge with the copyright symbol selected and context menu open." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-13-50-42.png"/><figcaption>Fontforge with the copyright symbol selected and context menu open.</figcaption></figure> </li> <li>Select an empty symbol and paste it in. <br/> <figure><img alt="Copyright symbol pasted in to a blank slot in FontForge." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-13-52-16.png"/><figcaption>Copyright symbol pasted in to a blank slot in FontForge.</figcaption></figure> </li> <li>View the "Glyph Info". <br/> <figure><img alt="Glyph Info page." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-13-54-41.png"/><figcaption>Glyph Info page.</figcaption></figure> </li> <li>Edit the Unicode Value to <code>U+1F12F</code> and select "Set From Value". Optionally, edit the "Glyph Name". And hit the OK button. </li> <li>Select the glyph, right click and select "Transform" <br/> <figure><img alt="Context menu showing Transform." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-13-56-33.png"/><figcaption>Context menu showing Transform.</figcaption></figure> </li> <li>Flip the glyph horizontally. <br/> <figure><img alt="Font transformation options." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-13-57-12.png"/><figcaption>Font transformation options.</figcaption></figure> </li> <li>In the context menu, choose "Correct Direction". <br/> <figure><img alt="Screenshot showing the option." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Correct-Direction-fs8.png"/><figcaption>Screenshot showing the option.</figcaption></figure> </li> <li>Optionally, skew it for the italic version.</li> <li>In "Font Information" you can rename the font and set other metadata. <br/> <figure><img alt="Metadata editing screen." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-14-04-36.png"/><figcaption>Metadata editing screen.</figcaption></figure> </li> <li>Use File → Generate Fonts to save the new font as <code>copyleft.otf</code> <br/> <figure><img alt="FontForge Export menu." src="https://shkspr.mobi/blog/wp-content/uploads/2022/08/Screenshot-from-2022-08-14-13-58-44.png"/><figcaption>FontForge Export menu.</figcaption></figure> </li> </ol>
<p>Install <a href="https://fonttools.readthedocs.io/en/latest/">FontTools</a> - either using <code>pip3</code> or <code>apt get</code></p>
<p>Convert the TTF to TTX format:</p>
<p><code>fonttools ttx merged.ttf</code></p>
<p>Edit the new <code>merged.ttx</code> by hand to update the name, copyright, etc.</p>
<p>Save the file as <code>new.ttx</code></p>
<p>Generate a new OTF by running</p>
<p><code>fonttools ttx new.ttx</code></p>
<p>Optionally, run <code>fonttools ttx new.otf</code> to regenerate the TTX.</p>
<p>Optionally, run <code>fonttools ttLib.woff2 compress new.otf</code> to generate a WOFF2 font for the web.</p>
<p>Well, what are you waiting for? <a href="https://github.com/edent/extended-hyperlegible">Use or contribute to <em>Extended</em> Hyperlegible</a> today!</p>
