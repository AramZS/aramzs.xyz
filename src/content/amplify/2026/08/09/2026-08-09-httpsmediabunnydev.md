---
author: Mediabunny
cover_image: 'https://mediabunny.dev/mediabunny-og-image.png'
date: '2026-08-09T13:35:07.669Z'
dateFolder: 2026/08/09
description: >-
  A JavaScript library for reading, writing, and converting media files.
  Directly in the browser, and faster than anybunny else.
isBasedOn: 'https://mediabunny.dev/'
link: 'https://mediabunny.dev/'
slug: 2026-08-09-httpsmediabunnydev
tags:
  - code
title: MediabunnyComplete media toolkit
---
<p>A JavaScript library for reading, writing, and converting video and audio files. Directly in the browser, and faster than anybunny else.</p>
<figure><img alt="Mediabunny logo" data-v-8426fc1a="" src="https://mediabunny.dev/mediabunny-logo.svg"/><figcaption>Mediabunny logo</figcaption></figure>
<p>Mediabunny gives you low-level control with high-level ease. It’s fast, lightweight, and finally feels like media processing built for the web, not ported to it.</p>
<h1>Read any media file, efficiently</h1>
<p>Mediabunny allows you efficiently read data from any video or audio file, no matter the size: duration, resolution, rotation, tracks, codecs and other metadata, as well as raw or decoded media data from anywhere in the file. Load only what you need.</p>
<p><a href="https://mediabunny.dev/guide/reading-media-files"> Docs </a></p>
<pre><code>const input = new Input({
	source: new UrlSource('./bigbuckbunny.mp4'),
	formats: ALL_FORMATS, // .mp4, .webm, .wav, ...
});

const duration = await input.computeDuration();

const videoTrack = await input.getPrimaryVideoTrack();
const { displayWidth, displayHeight, rotation } = videoTrack;

const audioTrack = await input.getPrimaryAudioTrack();
const { sampleRate, numberOfChannels } = audioTrack;

// Get the frame halfway through the video
const sink = new VideoSampleSink(videoTrack);
const frame = await sink.getSample(duration / 2);

// Loop over all frames of the video
for await (const frame of sink.samples()) {
	// ...
}</code></pre>
<pre><code>const output = new Output({
	format: new Mp4OutputFormat(), // .mp4
	target: new BufferTarget(), // in memory
});

// Add video, driven by a canvas
const videoSource = new CanvasSource(canvas, {
	codec: 'av1',
	bitrate: QUALITY_HIGH,
});
output.addVideoTrack(videoSource);

// Add audio, driven by audio buffers
const audioSource = new AudioBufferSource({
	codec: 'opus',
	bitrate: QUALITY_HIGH,
});
output.addAudioTrack(audioSource);

await output.start();

// Add media data here...

await output.finalize();
const { buffer } = output.target; // Contains the final file</code></pre>
<pre><code>const input = new Input({
	source: new BlobSource(file), // Read from disk
	formats: ALL_FORMATS,
});
const output = new Output({
	format: new WebMOutputFormat(), // Convert to .webm
	target: new StreamTarget(writableStream), // Write to disk
});

const conversion = await Conversion.init({ input, output });
await conversion.execute();

// Done!</code></pre>
<figure><img src="https://mediabunny.dev/assets/inspiring-io.Bu_uNiQ6.svg"/></figure>
<h1>Universal I/O</h1>
<p>Read and write files from and to memory, disk, or the network. Create files for offline use, or live-stream them as they're being created. Inject media data from a canvas, webcam, screen, microphone, audio buffer, your own encoding stack, or whatever. It's all up to you.</p>
<figure><img src="https://mediabunny.dev/assets/codec-soup.BUa-FMiO.svg"/></figure>
<h1>High performance</h1>
<p>By reading only what you need, writing progressively, utilizing hardware-accelerated encoding and decoding via the WebCodecs API, and using a pipelined design, Mediabunny is able to get the job done fast.</p>
<h1>Built from scratch, for the web</h1>
<p>Mediabunny is 100% implemented in TypeScript and has zero dependencies. Its API was designed to be highly tree-shakable, meaning you only include what you use.</p>
<p>Mediabunny is an open-source project released under the <a href="https://choosealicense.com/licenses/mpl-2.0/">MPL-2.0</a> and is therefore free to use for any purpose, including closed-source commercial use. A permissive license is essential for a foundational library like this to truly thrive. That said, this project requires an immense amount of work and care. This is made possible by the generous financial backing of these awesome sponsors:</p>
