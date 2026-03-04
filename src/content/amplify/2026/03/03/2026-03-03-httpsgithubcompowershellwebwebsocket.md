---
author: 'https://github.com/PowerShellWeb/'
cover_image: >-
  https://repository-images.githubusercontent.com/894842859/95259cc5-09f0-4214-b8a2-6c8c04992dce
date: '2026-03-03T08:19:33.140Z'
dateFolder: 2026/03/03
description: >-
  Work with WebSockets in PowerShell. Contribute to PowerShellWeb/WebSocket
  development by creating an account on GitHub.
isBasedOn: 'https://github.com/PowerShellWeb/WebSocket'
link: 'https://github.com/PowerShellWeb/WebSocket'
slug: 2026-03-03-httpsgithubcompowershellwebwebsocket
tags:
  - code
title: 'PowerShellWeb/WebSocket: Work with WebSockets in PowerShell'
---
<p><a data-hotkey=".,Mod+Alt+." href="https://github.dev/">Open in github.dev</a> <a data-hotkey="Shift+.,Shift+&gt;,&gt;" href="https://github.dev/">Open in a new github.dev tab</a> <a data-hotkey=",,Mod+Alt+," href="https://github.com/codespaces/new/PowerShellWeb/WebSocket?resume=1">Open in codespace</a> </p>
<h2>Create list</h2>
<h1>PowerShellWeb/WebSocket</h1>
<p>Use this GitHub action with your project</p>
<p>Add this Action to an existing workflow or create a new one</p>
<p><a data-loading="false" data-no-visuals="true" data-size="medium" data-variant="default" href="https://github.com/marketplace/actions/usewebsocket">View on Marketplace</a></p>
<p>main</p>
<p>t</p>
<p>Go to file</p>
<p>Code</p>
<p>Open more actions menu</p>
<figure><a href="https://github.com/PowerShellWeb/WebSocket/blob/main/Assets/WebSocket-Animated.svg"><img alt="WebSocket Logo (Animated)" src="https://github.com/PowerShellWeb/WebSocket/raw/main/Assets/WebSocket-Animated.svg"/></a></figure>
<figure><a href="https://www.powershellgallery.com/packages/WebSocket/"><img data-canonical-src="https://img.shields.io/powershellgallery/dt/WebSocket" src="https://camo.githubusercontent.com/70123a852fad9bf5d8dc0635e19eeebc54d6c46e87650bda5e13a5bfeb96b8c4/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f64742f576562536f636b6574"/></a></figure>
<h1>WebSocket</h1>
<p>Work with WebSockets in PowerShell</p>
<p>WebSocket is a small PowerShell module that helps you work with WebSockets.</p>
<p>It has a single command: Get-WebSocket.</p>
<p>Because <code>Get</code> is the default verb in PowerShell, you can just call it <code>WebSocket</code>.</p>
<h2>WebSocket Container</h2>
<p>You can use the WebSocket module within a container:</p>
<pre>docker pull ghcr.io/powershellweb/websocket
docker run -it ghcr.io/powershellweb/websocket</pre>
<h3>Installing and Importing</h3>
<pre>Install-Module WebSocket -Scope CurrentUser -Force
Import-Module WebSocket -Force -PassThru</pre>
<h3>Get-WebSocket</h3>
<p>To connect to a websocket and start listening for results, use <a href="https://github.com/PowerShellWeb/WebSocket/blob/main/Get-WebSocket.md">Get-WebSocket</a></p>
<pre># Because get is the default verb, we can just say `WebSocket`
# The `-Watch` parameter will continually watch for results
websocket wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -Watch</pre>
<p>To stop watching a websocket, simply stop the background job.</p>
<h3>More Examples</h3>
<h4>Get-WebSocket Example 1</h4>
<pre># Create a WebSocket job that connects to a WebSocket and outputs the results.
$socketServer = Get-WebSocket -RootUrl "http://localhost:8387/" -HTML "&lt;h1&gt;WebSocket Server&lt;/h1&gt;"
$socketClient = Get-WebSocket -SocketUrl "ws://localhost:8387/"
foreach ($n in 1..10) { $socketServer.Send(@{n=Get-Random}) }
$socketClient | Receive-Job -Keep</pre>
<h4>Get-WebSocket Example 2</h4>
<pre># Get is the default verb, so we can just say WebSocket.
# `-Watch` will output a continous stream of objects from the websocket.
# For example, let's Watch BlueSky, but just the text 
websocket wss://jetstream2.us-west.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -Watch -Maximum 1kb |
    % { 
        $_.commit.record.text
    }</pre>
<h4>Get-WebSocket Example 3</h4>
<pre># Watch BlueSky, but just the text and spacing
$blueSkySocketUrl = "wss://jetstream2.us-$(
    'east','west'|Get-Random
).bsky.network/subscribe?$(@(
    "wantedCollections=app.bsky.feed.post"
) -join '&amp;')"
websocket $blueSkySocketUrl -Watch | 
    % { Write-Host "$(' ' * (Get-Random -Max 10))$($_.commit.record.text)$($(' ' * (Get-Random -Max 10)))"} -Max 1kb</pre>
<h4>Get-WebSocket Example 4</h4>
<pre># Watch continuously in a background job.
websocket wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post</pre>
<h4>Get-WebSocket Example 5</h4>
<pre># Watch the first message in -Debug mode.  
# This allows you to literally debug the WebSocket messages as they are encountered.
websocket wss://jetstream2.us-west.bsky.network/subscribe -QueryParameter @{
    wantedCollections = 'app.bsky.feed.post'
} -Max 1 -Debug</pre>
<h4>Get-WebSocket Example 6</h4>
<pre># Watch BlueSky, but just the emoji
websocket jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -Tail -Max 1kb |
    Foreach-Object {
        $in = $_
        if ($in.commit.record.text -match '[\p{IsHighSurrogates}\p{IsLowSurrogates}]+') {
            Write-Host $matches.0 -NoNewline
        }
    }</pre>
<h4>Get-WebSocket Example 7</h4>
<pre>$emojiPattern = '[\p{IsHighSurrogates}\p{IsLowSurrogates}\p{IsVariationSelectors}\p{IsCombiningHalfMarks}]+)'
websocket wss://jetstream2.us-west.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -Tail |
    Foreach-Object {
        $in = $_
        $spacing = (' ' * (Get-Random -Minimum 0 -Maximum 7))
        if ($in.commit.record.text -match "(?&gt;(?:$emojiPattern|\#\w+)") {
            $match = $matches.0                    
            Write-Host $spacing,$match,$spacing -NoNewline
        }
    }</pre>
<h4>Get-WebSocket Example 8</h4>
<pre>websocket wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -Watch |
    Where-Object {
        $_.commit.record.embed.'$type' -eq 'app.bsky.embed.external'
    } |
    Foreach-Object {
        $_.commit.record.embed.external.uri
    }</pre>
<h4>Get-WebSocket Example 9</h4>
<pre># BlueSky, but just the hashtags
websocket wss://jetstream2.us-west.bsky.network/subscribe -QueryParameter @{
    wantedCollections = 'app.bsky.feed.post'
} -WatchFor @{
    {$webSocketoutput.commit.record.text -match "\#\w+"}={
        $matches.0
    }                
} -Maximum 1kb</pre>
<h4>Get-WebSocket Example 10</h4>
<pre># BlueSky, but just the hashtags (as links)
websocket wss://jetstream2.us-west.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -WatchFor @{
    {$webSocketoutput.commit.record.text -match "\#\w+"}={
        if ($psStyle.FormatHyperlink) {
            $psStyle.FormatHyperlink($matches.0, "https://bsky.app/search?q=$([Web.HttpUtility]::UrlEncode($matches.0))")
        } else {
            $matches.0
        }
    }
}</pre>
<h4>Get-WebSocket Example 11</h4>
<pre>websocket wss://jetstream2.us-west.bsky.network/subscribe?wantedCollections=app.bsky.feed.post -WatchFor @{
    {$args.commit.record.text -match "\#\w+"}={
        $matches.0
    }
    {$args.commit.record.text -match '[\p{IsHighSurrogates}\p{IsLowSurrogates}]+'}={
        $matches.0
    }
}</pre>
<h4>Get-WebSocket Example 12</h4>
<pre># We can decorate a type returned from a WebSocket, allowing us to add additional properties.</pre>
