---
author: Ana Tudor
cover_image: 'https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7560'
date: '2025-11-03T14:03:13.724Z'
dateFolder: 2025/11/03
description: >-
  Having a width-limited centered column of content is common and good, but what
  do you do when you need to break out? It's not hard these days, but it does
  depend on the situation.
isBasedOn: 'https://frontendmasters.com/blog/super-simple-full-bleed-breakout-styles/'
link: 'https://frontendmasters.com/blog/super-simple-full-bleed-breakout-styles/'
slug: 2025-11-03-httpsfrontendmasterscomblogsuper-simple-full-bleed-breakout-styles
tags:
  - code
title: Super Simple Full-Bleed & Breakout Styles
---
<figure><img alt="" sizes="(max-width: 1024px) 100vw, 1024px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/breakout.jpg?w=2000&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/breakout.jpg?w=2000&amp;ssl=1 2000w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/breakout.jpg?resize=300%2C180&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/breakout.jpg?resize=1024%2C614&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/breakout.jpg?resize=768%2C461&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/breakout.jpg?resize=1536%2C922&amp;ssl=1 1536w"/></figure>
<p>Recently, I saw someone <a href="https://www.reddit.com/r/css/comments/1o3j0cl/comment/niwx1pj/">asked on Reddit</a> what others are using these days for full-bleed and breakout elements. This refers to having a main content area of limited width (usually centered), but having the ability for some elements to be wider, either all the way to the browser edges or somewhere in-between.</p>
<figure><video></video><picture><img alt="" src="https://videos.files.wordpress.com/u7wAzkM3/desired_result_viewports_mp4_hd_1080p.original.jpg?w=756"/></picture>Play VideoShare ButtonPlayMuteCurrent Time 0:00/Duration 0:00Stream Type ChaptersSettings Menu<ul><li>Speed1x<ul><li>2x</li><li>1.75x</li><li>1.5x</li><li>1.25x</li><li>1x, selected</li><li>0.75x</li><li>0.5x</li><li>0.25x</li></ul></li><li>QualityAuto<ul><li data-id="0">1080p</li><li data-id="1">720p</li><li data-id="2">480p</li><li data-id="3">240p</li><li data-id="4">Auto</li></ul></li><li>CaptionsOff<ul><li>Off, selected</li></ul></li></ul>Picture-in-PictureFullscreenLoaded: 0%<p>This is a modal window.</p><p>Beginning of dialog window. Escape will cancel and close the window.</p>ColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaqueClose Modal Dialog<p>End of dialog window.</p>Close Modal Dialog<p>This is a modal window. This modal can be closed by pressing the Escape key or activating the close button.</p><figcaption>desired layout at various viewports — notice the image is a full-bleed element, the warning is a breakout element and the header is a breakout element with a full-bleed background </figcaption></figure>
<p>Is it still the <a href="https://css-tricks.com/full-width-containers-limited-width-parents/">old method</a> that involves stretching elements to <code>100vw</code> and then moving them in the negative direction of the <em>x</em> axis via an offset, margin, or translation?</p>
<p>Or is it the <a href="https://www.youtube.com/watch?v=c13gpBrnGEw">newer method</a> that involves a grid with a limited width main column in the middle then symmetrical columns on the sides, with elements spanning an odd number of columns that depends on whether we want them to have the normal width of the main column or we want them a bit wider, breaking out of that or we even want them to be full-bleed?</p>
<p>There is no perfectly right answer. It depends on use case and how you look at it. We’re going to look at modified and combined versions and essentially achieve what we need to depending on the situation with modern CSS.</p>
<p>The old method described in <a href="https://css-tricks.com/full-width-containers-limited-width-parents/">the 2016 CSS-Tricks article</a> has the disadvantage of relying on a Firefox bug (that has been fixed since 2017) to work well in all situations. The problem is that <code>100vw</code> doesn’t take into account any vertical scrollbars we might have (and no, the new viewport units <a href="https://www.smashingmagazine.com/2023/12/new-css-viewport-units-not-solve-classic-scrollbar-problem/">don’t solve</a> that problem either). This leads to the <code>100vw</code> width elements being wider than the available horizontal space if there is a vertical scrollbar, overflowing and causing a horizontal scrollbar, something I also often see with the bizarre practice of setting the <code>width</code> of the <code>body</code> to <code>100vw</code>. Now, considering the elements we normally want to be full-bleed are likely images, we can hide the problem with <code>overflow-x: hidden</code> on the <code>html</code>. But it still doesn’t feel quite right.</p>
<p>Maybe it’s because I’m a tech, not a designer who thinks in terms of design grids, but I prefer to keep my grids minimal and when I look at the desired result, my first thought is: that’s a single column grid with the items that are wider than the column, and everything is center-aligned.</p>
<p>So let’s take a look at the approach I most commonly use (or at least start from), which doesn’t involve a scary-looking grid column setup, and, for the simple base cases, doesn’t involve any containers or even any <code>calc()</code>, which some people find confusing.</p>
<p>We’re starting off with a <code>grid</code>, of course! We set a one limited width column <code>grid</code> on the <code>body</code> and we middle align this <code>grid</code> horizontally within the the <code>content-box</code> of the <code>body</code>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>body {
  display: grid;
  grid-template-columns: min(100%, 60em);
  justify-content: center
}</code></pre>
<p>By default, <code>display: grid</code> creates a one column grid that stretches horizontally across the entire <code>content-box</code> width of the element it’s set on. This makes all the children of the element getting <code>display: grid</code> be distributed in that one column, one on each row. The first on the first row, the second on the second row and so on.</p>
<p>The <code>grid-template-columns</code> property is used here to max out the width of this one column at <code>60em</code> by setting its width to be the minimum between <code>100%</code> of the <code>content-box</code> width and <code>60em</code>. If the <code>content-box</code> of the element we’ve set the <code>grid</code> on has a width of up to <code>60em</code>, then the one column of the <code>grid</code> stretches horizontally across the entire <code>content-box</code>. If the <code>content-box</code> of the element we’ve set the <code>grid</code> on has a width above <code>60em</code>, then our one grid column doesn’t stretch horizontally across the entire <code>content-box</code> anymore, but instead stays <code>60em</code> wide, the maximum width it can take. Of course, this maximum width can be any other value we want.</p>
<p>The <code>justify-content</code> property is used to align the <code>grid</code> horizontally within the <code>content-box</code> of the element it’s set on. In this case, our one grid column is center aligned.</p>
<p>Note that I keep talking about the <code>content-box</code> here. This is because, even at really narrow viewports, we normally want a bit of space in between the text edge and the lateral edge of the available area (the viewport minus any scrollbars we might have). Initially, this space is the <a href="https://miriam.codes/2022/07/04/body-margin-8px/">default <code>margin</code></a> of <code>8px</code> on the <code>body</code>, though I also often do something similar to the approach Chris <a href="https://frontendmasters.com/blog/the-coyier-css-starter/#body-spacing">wrote about</a> recently and zero the default <code>margin</code> to replace it with a clamped font-relative <code>padding</code>. But whichever of them is used still gets subtracted from the available space (viewport width minus any vertical scrollbar we might have) to give us the <code>content-box</code> width of the <code>body</code>.</p>
<p>Now whatever children the <code>body</code> may have (headings, paragraphs, images and so on), they’re all in the limited width grid cells of our one column, something that’s highlighted by the DevTools grid overlay in the screenshot below.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay." data-recalc-dims="1" sizes="(max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_00_layout_an_s.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_00_layout_an_s.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_00_layout_an_s.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_00_layout_an_s.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_00_layout_an_s.png?w=1280&amp;ssl=1 1280w"/><figcaption>the one limited width column grid layout with the DevTools grid lines overlay (<a href="https://codepen.io/thebabydino/pen/ZYQJWRd">live demo</a>)</figcaption></figure>
<p>Let’s say we want to make an element full-bleed (edge to edge). For example, an image or an image gallery, because that’s what makes the most sense to have stretching all across the entire available page width. This means we want the full viewport width minus any scrollbars we might have.</p>
<p>Nowadays we can get that by making the <code>html</code> a <code>container</code> so that its descendants know its available width (not including scrollbars) as <code>100cqw</code> (<strong>c</strong>ontainer <strong>q</strong>uery <strong>w</strong>idth).</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>html { container-type: inline-size }</code></pre>
<p>Having this, we can create our full-bleed elements:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-elem {
  justify-self: center;
  width: 100cqw
}</code></pre>
<p>Setting <code>width: 100cqw</code> on our full-bleed elements means they get the full available <code>content-box</code> width of the nearest container, which is the <code>html</code> in this case.</p>
<p>The <code>justify-self</code> aligns the element horizontally within its <code>grid-area</code> (which is limited to one grid cell in our case here). We need to set it here because the default is <code>start</code>, which means the left edge of the element starts from the left edge of its containing <code>grid-area</code>. The left edge of the containing <code>grid-area</code> is the same as the left edge of our one column <code>grid</code> here.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On some of these rows, we have full-bleed elements that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have)." data-recalc-dims="1" sizes="(max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_01_fullbleed_elem_an_s.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_01_fullbleed_elem_an_s.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_01_fullbleed_elem_an_s.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_01_fullbleed_elem_an_s.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_01_fullbleed_elem_an_s.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid with full-bleed elements and a DevTools grid overlay highlighting the grid lines</figcaption></figure>
<p>Just like before, we still have a single column grid, center aligned.</p>
<p>One thing to note here is this means we cannot have any <code>margin</code>, <code>border</code> or <code>padding</code> on the <code>html</code> element as any of these would reduce its <code>content-box</code>, whose size is what the container query units are based on. In practice, the <code>margin</code>, <code>border</code>, and <code>padding</code> on the <code>html</code> are all zero by default and I don’t think I’ve seen them set to anything else anywhere outside of some mind-bending <a href="https://www.reddit.com/r/css/comments/1gif7ew/comment/lv551jx/">CSS Battle solutions</a>.</p>
<p>Another thing to note is that there may be cases where we need another container somewhere in between. In that case, we can still access the <code>content-box</code> width of the <code>html</code> as detailed in <a href="https://frontendmasters.com/blog/using-container-query-units-relative-to-an-outer-container/">a previous article</a>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>@property --full-w {
  syntax: '&lt;length&gt;';
  initial-value: 0px;
  inherits: true;
}

html { container-type: inline-size }

body { --full-w: 100cqw }

.full-bleed-elem {
  justify-self: center;
  width: var(--full-w);
}</code></pre>
<p>Often times, we probably also want some padding on the full-bleed element if it is, for example, an image gallery, but not if it is a single <code>img</code> element.</p>
<p>For <code>img</code> elements, the actual image always occupies just the <code>content-box</code>. Any padding we set on it is <em>empty space</em> around the <code>content-box</code>. This is not generally desirable in our case. Unless we want to add some kind of decorations around it via the background property (by layering CSS gradients to create some kind of <a href="https://codepen.io/thebabydino/pen/JjZNXoQ">cool pattern</a>, for example), we want the image to stretch all across the available viewport space after accounting for any vertical scrollbar we might have and not be left with empty space on the lateral sides.</p>
<p>Furthermore, if the <code>img</code> uses a <code>box-sizing</code> of <code>content-box</code>, that empty padding space gets <em>added</em> to the <code>100cqw</code> width of its <code>content-box</code>, making the <code>padding-box</code> width exceed the available space and causing a horizontal scrollbar on the page.</p>
<p>When setting a padding on full-bleed elements, it’s probably best to exclude <code>img</code> elements:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-elem:not(img) { padding: .5em }</code> CSS </pre>
<p>Note that in this case, the full-bleed elements getting the <code>padding</code> need to also have <code>box-sizing</code> set to <code>border-box</code>. This is done so that the <code>padding</code> gets subtracted out of the set <code>width</code> and not added as it would happen in the default <code>content-box</code> case.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-elem:not(img) {
  box-sizing: border-box;
  padding: .5em
}</code> CSS </pre>
<p>You can see it in action and play with it in the following live demo:</p>
<p>You might be wondering… is it even necessary to set <code>border-box</code> since setting <em>everything</em> to <code>border-box</code> is a pretty popular reset style?</p>
<p>Personally, I don’t set that in resets anymore because I find that with the the new layout options we have, the number of cases where I still need to explicitly set dimensions in general and widths in particular has declined. Drastically. Most of the time, I just size columns, rows, set the <code>flex</code> property instead and let the <code>grid</code> or <code>flex</code> children get sized by those without explicitly setting any dimensions. And when I don’t have to set dimensions explicitly, the <code>box-sizing</code> becomes irrelevant and even problematic in <a href="https://www.youtube.com/watch?v=PtAcpV6TAGM">some situations</a>. So I just don’t bother with including <code>box-sizing: border-box</code> in the reset these days anymore and instead only set it in the cases where it’s needed.</p>
<p>Like here, for the non-<code>img</code> full bleed elements.</p>
<p>Another thing you may be wondering about… how about just setting a negative lateral <code>margin</code>?</p>
<p>We know the viewport width minus any scrollbars as <code>100cqw</code>, we know the column width as <code>100%</code>, so the difference between the two <code>100cqw - 100%</code> is the space on the left side of the column plus the space on the right side of the column. This means half the difference <code>.5*(100cqw - 100%)</code>, which we can also write as <code>50cqw - 50%</code>, is the space on just one side. And then we put a minus in front and get our lateral margin. Like this:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-elem {
  margin: .5rem calc(50% - 50cqw);
}</code></pre>
<p>Or, if we want to avoid overriding the vertical margin:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-elem {
  margin-inline: calc(50% - 50cqw);
}</code> CSS </pre>
<p>This seems like a good option. It’s just one <code>margin</code> property instead of a <code>justify-self</code> and a <code>width</code> one. And it also avoids having to set <code>box-sizing</code> to <code>border-box</code> if we want a <code>padding</code> on our full-bleed element. But we should also take into account what exactly we are most likely to make full-bleed.</p>
<p>One case we considered here was that of full-bleed images. The thing with <code>img</code> elements is that, by default, they don’t size themselves to fit the grid areas containing them, they just use their own intrinsic size. For full-bleed images this means they are either going to not fill the entire available viewport space if their intrinsic width is smaller than the viewport or overflow the viewport if their intrinsic width is bigger than the available viewport space (the viewport width minus any vertical scrollbar we might have). So we need to set their <code>width</code> anyway.</p>
<p>For the other case, that of the scrolling image gallery, the negative <code>margin</code> can be an option.</p>
<p>These are wider than our main content, so they break out of our grid column, but are not full-bleed.</p>
<p>So we would give them a width that’s smaller than the <code>content-box</code> width of the <code>html</code>, which we know as <code>100cqw</code>, but still bigger than the width of our only <code>grid</code> column, which we know as <code>100%</code>. Assuming we want breakout elements to extend out on each side by <code>4em</code>, this means:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.break-elem {
  justify-self: center;
  width: min(100cqw, 100% + 2*4em)
}</code> CSS </pre>
<p>Again, we might use a negative lateral <code>margin</code> instead. For breakout elements, which are a lot more likely to be text content elements, the negative <code>margin</code> approach makes more sense than for the full-bleed ones. Note that just like the width, the lateral <code>margin</code> also needs to be capped in case the lateral space on the sides of our column drops under <code>4em</code>.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.break-elem { margin: 0 max(-4em, 50% - 50cqw) }</code> CSS </pre>
<p>Note that we use the <code>max()</code> because for negative values like the <code>margin</code> here, the smaller (minimum) one in absolute value (closer to 0) is the one that’s bigger when looking at the full axis going from minus to plus infinity.</p>
<p>But then again, we might want to be consistent and set full-bleed and breakout styles the same way, maybe grouping them together:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-elem, .break-elem {
  justify-self: center;
  width: min(100cqw var(--comp-w, ));
}

/* This is valid! */
.break-elem { --comp-w: , 100% + 2*4em  }

:is(.full-bleed-elem, .break-elem):not(img) {
  box-sizing: border-box;
  padding: .5em;
}</code></pre>
<p>Some people prefer <code>:where()</code> instead of <code>:is()</code> for <a href="https://css-tricks.com/quick-reminder-that-is-and-where-are-basically-the-same-with-one-key-difference/">specificity reasons</a>, as <code>:where()</code> always has <code>0</code> specificity, while <code>:is()</code> has the specificity of the most specific selector in its arguments. But that is precisely one of my main reasons for using <code>:is()</code> here.</p>
<p>And yes, both having an empty default for a CSS variable and its value starting with a comma is valid. Replacing <code>--comp-w</code> with its value gives us a <code>width</code> of <code>min(100cqw)</code> (which is the same as <code>100cqw</code>) for full-bleed elements and one of <code>min(100cqw, 100% + 2*4em)</code> for breakout elements.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On some of these rows, we have full-bleed images that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On others, we have breakout boxes that expand laterally outside their grid cells, but are not wide enough to be full-bleed." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_02_fullbleed_break_elem_an_s.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_02_fullbleed_break_elem_an_s.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_02_fullbleed_break_elem_an_s.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_02_fullbleed_break_elem_an_s.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_02_fullbleed_break_elem_an_s.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid with full-bleed and breakout elements, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/YPwrbry">live demo</a>)</figcaption></figure>
<p>If we want to have different types of breakout elements that extend out more or less, not all exactly by the same fixed value, we make that value a custom property <code>--dx</code>, which we can change based on the type of breakout element:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.break-elem { --comp-w: , 100% + 2*var(--dx, 4em) }</code></pre>
<p>The <code>--dx</code> value could also be negative and, in this case, the element doesn’t really break out of the main column, it shrinks so it’s narrower.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.break-elem--mini { --dx: -2em }
.break-elem--maxi { --dx: 8em }
</code> CSS </pre>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. One of these rows has a full-bleed image that expands all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On other rows, we have breakout boxes that are not the same width as their grid cells, but are not wide enough to be full-bleed. Most of these boxes are wider than their containing grid cells, but one is narrower." src="https://gist.github.com/user-attachments/assets/8a19d473-6b3f-4273-a2f8-1a74efaea708"/><figcaption>one column grid with a full-bleed image and various sizes of breakout elements, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/JoGORNp">live demo</a>)</figcaption></figure>
<p>Sometimes we may want only the background of the element to be full-bleed, but not the element content. In the simplest case, we can do with a <code>border-image</code> and if you want to better understand this property, check out <a href="https://www.smashingmagazine.com/2024/01/css-border-image-property/">this article</a> by Temani Afif detailing a lot of use cases.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-back {
  border-image: var(--img) fill 0/ / 0 50cqw;
}</code> CSS </pre>
<p>This works for mono backgrounds (like the one created for the full-bleed <code>header</code> and <code>footer</code> below with a single stop gradient), for most gradients and even for actual images in some cases.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On the very first row, we have a limited width header with a solid full-bleed mono background. On other rows, we have full-bleed elements that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On other rows, we have breakout boxes that are not the same width as their grid cells, but are not wide enough to be full-bleed." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_04_lim_elem_fullbleed_back_an_s-1.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_04_lim_elem_fullbleed_back_an_s-1.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_04_lim_elem_fullbleed_back_an_s-1.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_04_lim_elem_fullbleed_back_an_s-1.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_04_lim_elem_fullbleed_back_an_s-1.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid that has a tightly fit limited width header with a full-bleed mono background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/jEWaRaP">live demo</a>)</figcaption></figure>
<p>The mono background above is created as follows (all these demos adapt to user theme preferences):</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>--img: conic-gradient(light-dark(#ededed, #121212) 0 0)</code></pre>
<p>This method is perfect for such mono backgrounds, but if we want gradient or image ones, there are some aspects we need to consider.</p>
<p>The thing about the <code>0 50cqw</code> <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset">outset</a> value is that it tells the browser to extend the area where the <code>border-image</code> is painted by <code>50cqw</code> outwards from the <code>padding-box</code> boundary on the lateral sides. This means it extends outside the vewport, but since this is just the <code>border-image</code>, not the <code>border</code> reserving space, it doesn’t cause overflow/ a horizontal scrollbar, so we can keep it simple and use it like this for gradients.</p>
<p>That is, if we can avoid percentage position trouble. While this is not an issue in linear top to bottom gradients, if we want to use percentages in linear left to right gradients or to position radial or conic ones, we need to scale the <code>[0%, 100%]</code> interval to the <code>[50% - 50cqw, 50% + 50cqw]</code> interval along the <em>x</em> axis.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.linear-horizontal {
  --img: 
    linear-gradient(
      90deg, 
      var(--c0) calc(50% - 50cqw), 
      var(--c1) 50%
    );
}

.radial {
  --img: 
    radial-gradient(
      15cqw at calc(50% - 25cqw) 0, 
      var(--c0), 
      var(--c1)
    );
}

.conic {
  --img: 
    conic-gradient(
      at calc(50% + 15cqw), 
      var(--c1) 30%, 
      var(--c0), 
      var(--c1) 70%
    );
}</code></pre>
<p>However, this scaling is not enough for linear gradients at an angle that’s not a multiple of <code>90°</code>. And it may be overly complicated even for the types of gradients where it works well.</p>
<p>So another option is compute how much the <code>border-image</code> needs to expand laterally out of the available horizontal space <code>100cqw</code> and the maximum <code>grid</code> column width <code>--grid-w</code>. This then allows us to use percentages normally inside any kind of gradient, including linear ones at an angle that’s not a multiple of <code>90°</code>.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>body {
  --grid-w: 60em;
  display: grid;
  grid-template-columns: min(100%, var(--grid-w));
  justify-content: center;
}

.full-bleed-back {
  border-image: 
    var(--img) fill 0/ / 
    0 calc(50cqw - .5*var(--grid-w));
}</code></pre>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On the very first row, we have a limited width header with a solid full-bleed gradient background. On other rows, we have full-bleed elements that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On other rows, we have breakout boxes that are not the same width as their grid cells, but are not wide enough to be full-bleed." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_an_s-1.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_an_s-1.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_an_s-1.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_an_s-1.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_an_s-1.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid that has a tightly fit limited width header with a full-bleed angled gradient background (at an angle that’s not a multiple of 90°); it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/JoGMjxb">live demo</a>)</figcaption></figure>
<p>This has a tiny problem that other styling decisions we’re likely to take (and which we’ll discuss in a moment) prevent from happening, but, assuming we don’t make those choices, let’s take a look at it and how we can solve it.</p>
<figure><video></video><picture><img alt="" src="https://videos.files.wordpress.com/2BFbQGMp/issue_side_mp4_hd.original.jpg?w=756"/></picture>Play VideoShare ButtonPlayMuteCurrent Time 0:00/Duration 0:00Stream Type ChaptersSettings Menu<ul><li>Speed1x<ul><li>2x</li><li>1.75x</li><li>1.5x</li><li>1.25x</li><li>1x, selected</li><li>0.75x</li><li>0.5x</li><li>0.25x</li></ul></li><li>QualityAuto<ul><li data-id="0">720p</li><li data-id="1">480p</li><li data-id="2">240p</li><li data-id="3">Auto</li></ul></li><li>CaptionsOff<ul><li>Off, selected</li></ul></li></ul>Picture-in-PictureFullscreenLoaded: 0%<p>This is a modal window.</p><p>Beginning of dialog window. Escape will cancel and close the window.</p>ColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaqueClose Modal Dialog<p>End of dialog window.</p>Close Modal Dialog<p>This is a modal window. This modal can be closed by pressing the Escape key or activating the close button.</p><figcaption>full-bleed background issue on narrow viewports </figcaption></figure>
<p>On narrow viewports, our background isn’t full-bleed anymore, it stops a tiny distance away from the lateral sides. That tiny distance is at most the size of the lateral <code>margin</code> or <code>padding</code> on the <code>body</code>. As mentioned before, I prefer to zero the default <code>margin</code> and use a <code>font-size</code>-relative <code>padding</code>, but in a lot of cases, it doesn’t make any difference whatsoever.</p>
<figure><img alt="Screenshot collage. Shows the top area of the page with the header in both the dark and light theme cases at a narrow viewport width of 400px. It also highlights the fact that the header's full-bleed background isn't quite full-bleed, but stops a tiny distance away from the lateral sides." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_issue_mark_s-1.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_issue_mark_s-1.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_issue_mark_s-1.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_issue_mark_s-1.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_issue_mark_s-1.png?w=1280&amp;ssl=1 1280w"/><figcaption>the problem in the narrow viewport case, highlighted for both the dark and the light themes</figcaption></figure>
<p>This happens when the maximum <code>grid</code> column width <code>--grid-w</code> doesn’t fit anymore in the available viewport space (not including the scrollbar) minus the lateral spacing on the sides of our one column grid (set as a <code>margin</code> or <code>padding</code>).</p>
<p>The solution is to use a <code>max()</code> instead of the <code>calc()</code> to ensure that the <code>border-image</code> expands laterally at the very least as much as that lateral spacing <code>--grid-s</code>.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>body {
  --grid-w: 60em;
  --grid-s: .5em;
  display: grid;
  grid-template-columns: min(100%, var(--grid-w));
  justify-content: center;
  padding: 0 var(--grid-s);
}

.full-bleed-back {
  border-image: 
    var(--img) fill 0/ / 
    0 max(var(--grid-s), 50cqw - .5*var(--grid-w));
}</code></pre>
<figure><video></video>Play VideoPlayMuteCurrent Time 0:00/Duration 0:00Stream Type ChaptersSettings Menu<ul><li>Speed1x<ul><li>2x</li><li>1.75x</li><li>1.5x</li><li>1.25x</li><li>1x, selected</li><li>0.75x</li><li>0.5x</li><li>0.25x</li></ul></li><li>Quality</li><li>CaptionsOff<ul><li>Off, selected</li></ul></li></ul>Picture-in-PictureFullscreenLoaded: 0%<p>This is a modal window.</p><p>Beginning of dialog window. Escape will cancel and close the window.</p>ColorWhiteBlackRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityOpaqueSemi-TransparentTransparentColorBlackWhiteRedGreenBlueYellowMagentaCyanOpacityTransparentSemi-TransparentOpaqueClose Modal Dialog<p>End of dialog window.</p>Close Modal Dialog<p>This is a modal window. This modal can be closed by pressing the Escape key or activating the close button.</p><p>This is a modal window.</p><figcaption>fix for full-bleed background issue on narrow viewports (<a href="https://codepen.io/thebabydino/pen/bNEaEON">live demo</a>)</figcaption></figure>
<p>For actual images however, we have an even bigger problem: <code>border-image</code> doesn’t offer the <code>cover</code> option we have for backgrounds or images and we don’t really have a reliable way of getting around this. One of the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat">repeat options</a> might work for us in some scenarios, but I find that’s rarely the case for the results I want in such situations.</p>
<p>You can see the problem in <a href="https://codepen.io/thebabydino/pen/qEOjaaV">this demo</a> when resizing the viewport — for an element whose <code>height</code> is unknown as it depends on its content, the <code>border-image</code> option (the second one) means that if we want to avoid the image getting distorted, then its size needs to be intrinsic size. Always. It never scales, which means it repeats for large viewports and its sides get clipped off for small viewports.</p>
<p>So if we want more control over an image background or multiple background layers, it’s probably better to use an absolutely positioned pseudo-element. This also avoids the earlier problem of the full-bleed background not going all the way to the edges without taking into account the lateral spacing on the grid container (in this case, the <code>body</code>).</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.full-bleed-back-xtra {
  position: relative;
  z-index: 1
}

.full-bleed-back-xtra::before {
  position: absolute;
  inset: 0 calc(50% - 50cqw);
  z-index: -1;
  content: ''
}</code></pre>
<p>The <code>inset</code> makes our pseudo to stretch across the entire <code>padding-box</code> of its parent vertically and outside of it (minus sign) by half the available viewport space (viewport width minus any scrollbars) minus half the pseudo parent’s width.</p>
<p>The negative <code>z-index</code> on the pseudo ensures it’s behind the element’s text content. The positive <code>z-index</code> on the element itself ensures the pseudo doesn’t end up behind the grid container’s <code>background</code> too.</p>
<p>The pseudo <code>background</code> can now be a <code>cover</code> image:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>background: var(--img-pos, var(--img) 50%)/ cover</code> CSS </pre>
<p>I’m taking this approach here to allow easily overriding the <code>background-position</code> together with each image if necessary. In such a case, we set <code>--img-pos</code>:</p>
<pre data-shcb-language-name="CSP" data-shcb-language-slug="csp"><code>--img-pos: url(my-back-img.jpg) 35% 65%</code></pre>
<p>Otherwise, we only set <code>--img</code> and the default of <code>50%</code> gets used:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>--img-pos: url(my-back-img.jpg)</code></pre>
<p>In the particular case of our demos so far, which use a light or dark theme to respect user preferences, we’ve also set a <code>light-dark()</code> value for the <code>background-color</code>, as well as an <code>overlay</code> blend mode to either brighten or darken our full-bleed background depending on the theme. This ensures the header text remains readable in both scenarios.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On the very first row, we have a limited width header with a solid full-bleed image background. On other rows, we have full-bleed elements that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On other rows, we have breakout boxes that are not the same width as their grid cells, but are not wide enough to be full-bleed." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_06_lim_elem_fullbleed_img_back_an_s.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_06_lim_elem_fullbleed_img_back_an_s.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_06_lim_elem_fullbleed_img_back_an_s.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_06_lim_elem_fullbleed_img_back_an_s.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_06_lim_elem_fullbleed_img_back_an_s.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid that has a tightly fit limited width header with a full-bleed image background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/ByjJZOx">live demo</a>)</figcaption></figure>
<p>We can also have multiple layers of gradients, maybe even blended, maybe even with a <code>filter</code> making them <a href="https://frontendmasters.com/blog/grainy-gradients/">grainy</a> (something that would help with the visible banding noticed in the <code>border-image</code> method examples) or creating a <a href="https://frontendmasters.com/blog/pure-css-halftone-effect-in-3-declarations/">halftone pattern</a>.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On the very first row, we have a limited width header with a solid full-bleed multi-gradient, filtered background. On other rows, we have full-bleed elements that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On other rows, we have breakout boxes that are not the same width as their grid cells, but are not wide enough to be full-bleed." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_07_lim_elem_fullbleed_filtered_back_an_s.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_07_lim_elem_fullbleed_filtered_back_an_s.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_07_lim_elem_fullbleed_filtered_back_an_s.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_07_lim_elem_fullbleed_filtered_back_an_s.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_07_lim_elem_fullbleed_filtered_back_an_s.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid that has a tightly fit limited width header with a filtered full-bleed multi-layer background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/dPGJZyP">live demo</a>)</figcaption></figure>
<p>We can of course also have a breakout element with a full-bleed background – in this case, we give it both classes, <code>break-elem</code> and <code>full-bleed-back</code>.</p>
<p>Our recipe page header for example, probably looks better as a breakout element in addition to having a full-bleed background.</p>
<p>If the breakout elements in general have a <code>border</code> or their own specific <code>background</code>, we should ensure these don’t apply if they also have full-bleed backgrounds:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.break-elem:not([class*='full-bleed-back']) {
  border: solid 1px;
  background: var(--break-back)
}</code></pre>
<p>Or we can opt to separate these visual prettifying styles from the layout ones. For example, in the Halloween example demos, I’ve opted to set the <code>border</code> and <code>background</code> styles via a separate class <code>.box</code>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>.box {
  border: solid 1px var(--c);
  background: lch(from var(--c) l c h/ .15)
}</code> CSS </pre>
<p>And then set <code>--c</code> (as well as the warning icon in front) via a <code>.box--warn</code> class.</p>
<figure><img alt="Screenshot. Shows a middle aligned grid with a single column and multiple rows, something that's highlighted by the DevTools-enabled grid overlay. On the very first row, we have a breakout header (wider than its containing grid cell, but not wide enough to be full-bleed) with a solid full-bleed multi-gradient, filtered background. On other rows, we have full-bleed elements that expand all across the entire available page width (the viewport width minus any vertical scrollbars we might have). On other rows, we have breakout boxes." data-recalc-dims="1" sizes="auto, (max-width: 1000px) 100vw, 1000px" src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_08_break_elem_fullbleed_back_an_s.png?w=1280&amp;ssl=1" srcset="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_08_break_elem_fullbleed_back_an_s.png?resize=1024%2C512&amp;ssl=1 1024w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_08_break_elem_fullbleed_back_an_s.png?resize=300%2C150&amp;ssl=1 300w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_08_break_elem_fullbleed_back_an_s.png?resize=768%2C384&amp;ssl=1 768w, https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_08_break_elem_fullbleed_back_an_s.png?w=1280&amp;ssl=1 1280w"/><figcaption>one column grid that has a breakout header with a filtered full-bleed multi-layer background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/VYeyGwz">live demo</a>)</figcaption></figure>
<p>Another thing to note here is that when having a full-bleed background for a breakout element and we use the <code>border-image</code> tactic, we don’t have to adapt our formula to take into account the lateral spacing, as that’s set as a <code>padding</code> on the breakout element and not on its grid parent.</p>
<p>The most important of these techniques can also be seen in the meta demo below, which has the relevant CSS in style elements that got <code>display: block</code>.</p>
<p>We may also have a <code>figure</code> whose <code>img</code> is full-bleed, while the <code>figcaption</code> uses the normal column width (or maybe it’s a breakout element).</p>
<pre data-shcb-language-name="HTML, XML" data-shcb-language-slug="xml"><code>&lt;figure&gt;
  &lt;img src='full-bleed-img.jpg' alt='image description' class='full-bleed-elem'&gt;
  &lt;figcaption&gt;image caption&lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>
<p>Not much extra code is required here.</p>
<p>The simple modern solution is to make the <code>img</code> a <code>block</code> element so that the <code>justify-self</code> property set via the <code>.full-bleed-elem</code> middle aligns it even if it’s not a <code>grid</code> or <code>flex</code> item.</p>
<p>However, support for <code>justify-self</code> applying to <code>block</code> elements as per the <a href="https://drafts.csswg.org/css-align/#overview">current spec</a> is still limited to only Chromium browsers at the moment. And while the <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1930584">Firefox bug</a> seems to have had some activity lately, the <a href="https://bugs.webkit.org/show_bug.cgi?id=277022">Safari one</a> looks like it’s dormant.</p>
<p>So the easy cross-browser way to get around that without any further computations is to make the <code>figure</code> a <code>grid</code> too in this case.</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>figure:has(.full-bleed-elem, .break-elem) {
  display: grid;
  grid-template-columns: 100%;
  width: 100%;
}</code></pre>
<figure><figcaption>one column grid that has a figure, tightly fit horizontally within its containing column, but with a full-bleed image; there’s also a DevTools grid overlay highlighting the grid lines (<a href="https://codepen.io/thebabydino/pen/PwZELQJ">live demo</a>)</figcaption></figure>
<p>This is a problem that <a href="https://nitter.net/hybrid_alex/status/1580173843267989506">got mentioned</a> for the three column <code>grid</code> technique and I really didn’t understand it at first.</p>
<p>I started playing with CSS to change the look of a blog and for some reason, maybe because that was what the first example I saw looked like, I got into the habit of putting any floated thumbnail and the text next to it into a wrapper. And it never occurred to me that the wrapper wasn’t necessary until I started writing this article and looked into it.</p>
<p>Mostly because… <em>I almost never need to float things</em>. I did it for those blog post thumbnails fifteen years ago, for <a href="https://codepen.io/thebabydino/pen/eYwjjWL"><code>shape-outside</code></a> demos, for <a href="https://codepen.io/thebabydino/pen/oggaZaQ">drop caps</a>, but that was about it. As far as layouts go, I just used <code>position: absolute</code> for years before going straight to <code>flex</code> and <code>grid</code>.</p>
<p>This was why I didn’t understand this problem at first. I thought that if you want to float something, you have to put it in a wrapper anyway. And at the end of the day, this is the easiest solution: put the entire content of our one column in a wrapper. In which case, until <code>justify-self</code> applying on <code>block</code> elements works cross-browser, we need to replace that declaration on full-bleed and breakout elements with our old friend <code>margin-left</code>:</p>
<pre data-shcb-language-name="CSS" data-shcb-language-slug="css"><code>margin-left: calc(50% -50cqw)</code></pre>
<p>This allows us to have floated elements inside the wrapper.</p>
<figure><figcaption>one column grid that has a single grid child, tightly fit horizontally within its containing column and acting as a wrapper for the entire page content; since this wrapper has no flex or grid layout, its children can be floated (<a href="https://codepen.io/thebabydino/pen/yyevybL">live demo</a>)</figcaption></figure>
<p>At this point, getting to this floats solution begs the question: do we even really need grid?</p>
<p>It depends.</p>
<p>We could just set lateral <code>padding</code> or <code>margin</code> on the <code>body</code> instead.</p>
<p>I’d normally prefer <code>padding</code> in this case, as <code>padding</code> doesn’t restrict the <code>background</code> and sometimes we want some full viewport backdrop effects involving both the <code>body</code> and the <code>html</code> background.</p>
<p>Other times, we may want a <code>background</code> just for the limited <code>width</code> of the content in the middle, in which case <code>margin</code> on the <code>body</code> makes more sense.</p>
<p>If we want to be ready for both situations, then we’re better off with not setting any <code>margin</code> or <code>padding</code> on the <code>body</code> and just wrapping all content in a limited width, middle aligned (good old <code>max-width</code> plus <code>auto</code> margins) <code>main</code> that also gets a <code>background</code>.</p>
<p>At the same time, my uses cases for something like this have never involved using floats and have benefitted from other <code>grid</code> features like gaps, which make handling spacing easier than via margins or paddings.</p>
<p>So at the end of the day, the best solution is going to depend on the context.</p>
