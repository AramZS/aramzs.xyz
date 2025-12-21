---
author: annas-archive.li
cover_image: 'https://annas-archive.li/blog/spotify/sel_01_overview.png'
date: '2025-12-21T07:32:32.816Z'
dateFolder: 2025/12/21
description: >-
  We backed up Spotify (metadata and music files). It’s distributed in bulk
  torrents (~300TB). It’s the world’s first “preservation archive” for music
  which is fully open (meaning it can easily be mirrored by anyone with enough
  disk space), with 86 million music files, representing around 99.6% of
  listens.
isBasedOn: 'https://annas-archive.li/blog/backing-up-spotify.html'
link: 'https://annas-archive.li/blog/backing-up-spotify.html'
slug: 2025-12-21-httpsannas-archiveliblogbacking-up-spotifyhtml
tags:
  - music
  - archiving
title: Backing up Spotify
---
<ol> <li><strong>Over-focus on the most popular artists.</strong> There is a long tail of music which only gets preserved when a single person cares enough to share it. And such files are often poorly seeded.</li> <li><strong>Over-focus on the highest possible quality.</strong> Since these are created by audiophiles with high end equipment and fans of a particular artist, they chase the highest possible file quality (e.g. lossless FLAC). This inflates the file size and makes it hard to keep a full archive of all music that humanity has ever produced.</li> <li><strong>No authoritative list of torrents aiming to represent all music ever produced.</strong> An equivalent of our book torrent list (which aggregate torrents from LibGen, Sci-Hub, Z-Lib, and many more) does not exist for music.</li> </ol>
<p>This Spotify scrape is our humble attempt to start such a “preservation archive” for music. Of course Spotify doesn’t have all the music in the world, but it’s a great start.</p>
<p>Before we dive into the details of this collection, here is a quick overview:</p>
<ul> <li>Spotify has around 256 million tracks. This collection contains metadata for an estimated 99.9% of tracks.</li> <li>We archived around 86 million music files, representing around 99.6% of listens. It’s a little under 300TB in total size.</li> <li>We primarily used Spotify’s “popularity” metric to prioritize tracks. View the top 10,000 most popular songs in this <a href="https://annas-archive.li/blog/spotify/spotify-top-10k-songs-table.html">HTML file</a> (13.8MB gzipped).</li> <li>For <code>popularity&gt;0</code>, we got close to all tracks on the platform. The quality is the original <a href="https://en.wikipedia.org/wiki/Vorbis">OGG Vorbis</a> at 160kbit/s. Metadata was added without reencoding the audio (and an archive of diff files is available to reconstruct the original files from Spotify, as well as a metadata file with original hashes and checksums).</li> <li>For <code>popularity=0</code>, we got files representing about half the number of listens (either original or a copy with the same <a href="https://en.wikipedia.org/wiki/International_Standard_Recording_Code">ISRC</a>). The audio is reencoded to <a href="https://en.wikipedia.org/wiki/Opus_(audio_format">OGG Opus</a> at 75kbit/s — sounding the same to most people, but noticeable to an expert.</li> <li>The cutoff is 2025-07, anything released after that date may not be present (though in some cases it is).</li> <li>This is by far the largest music metadata database that is publicly available. For comparison, we have 256 million tracks, while <a href="https://en.wikipedia.org/wiki/List_of_online_music_databases">others</a> <a href="https://github.com/OatsCG/OMDB">have</a> 50-150 million. Our data is well-annotated: <a href="https://en.wikipedia.org/wiki/MusicBrainz">MusicBrainz</a> has 5 million unique ISRCs, while our database has 186 million.</li> <li>This is the world’s first “preservation archive” for music which is fully open (meaning it can easily be mirrored by anyone with enough disk space).</li> </ul>
<p>The data will be released in different stages on our Torrents page:</p>
<ul> <li>[X] Metadata (Dec 2025)</li> <li>[ ] Music files (releasing in order of popularity)</li> <li>[ ] Additional file metadata (torrent paths and checksums)</li> <li>[ ] Album art</li> <li>[ ] .zstdpatch files (to reconstruct original files before we added embedded metadata)</li> </ul>
<p>For now this is a torrents-only archive aimed at preservation, but if there is enough interest, we could add downloading of individual files to Anna’s Archive. Please let us know if you’d like this.</p>
<p>Please help preserve these files:</p>
