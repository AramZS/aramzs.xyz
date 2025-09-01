---
author: Cory Dransfeldt
cover_image: 'https://www.coryd.dev/og/w800/0265a621-ef92-4d46-96a3-ca1f4052a53a.png'
date: '2025-09-01T16:27:51.038Z'
dateFolder: 2025/09/01
description: >-
  Since adopting [Navidrome](https://www.navidrome.org) to stream my own music
  [I've been tracking my listening activity from my
  instance](/posts/2025/tracking-listens-from-navidrome) and have recently added
  pages for all of the albums in my collection, with a record for each track and
  the track list and track duration displayed on the album page.
isBasedOn: >-
  https://www.coryd.dev/posts/2025/importing-artist-and-album-data-from-navidrome
link: >-
  https://www.coryd.dev/posts/2025/importing-artist-and-album-data-from-navidrome
slug: >-
  2025-09-01-httpswwwcoryddevposts2025importing-artist-and-album-data-from-navidrome
tags:
  - tech
  - music
title: Importing artist and album data from Navidrome
---
<div><div>
<p>Since adopting <a href="https://www.navidrome.org">Navidrome</a> to stream my own music <a href="https://coryd.dev/posts/2025/tracking-listens-from-navidrome">I've been tracking my listening activity from my instance</a> and have recently added pages for all of the albums in my collection, with a record for each track and the track list and track duration displayed on the album page.</p>
<p>To make importing new artist and album data easier, I've built a quick action button into my Filament dashboard that opens a modal which accepts a Navidrome artist ID. If that ID is valid, my import API processes the artist, their albums and their tracks, skipping anything that's already been imported. This makes adding new artists and whole discographies easy and it also makes adding new releases to my site a breeze. You can see what this process looks like below.</p>
<p><bunny-video><p></p></bunny-video></p>
<p>You can view the full controller below.</p>
<pre><code data-lang="php"><span>&lt;?php</span>

<span>namespace</span> <span>App</span>\<span>Http</span>\<span>Controllers</span>\<span>Api</span>;

<span>use</span> <span>App</span>\<span>Http</span>\<span>Controllers</span>\<span>Controller</span>;
<span>use</span> <span>App</span>\<span>Models</span>\<span>MediaFile</span>;
<span>use</span> <span>App</span>\<span>Services</span>\<span>PostgrestService</span>;
<span>use</span> <span>Exception</span>;
<span>use</span> <span>Illuminate</span>\<span>Http</span>\<span>JsonResponse</span>;
<span>use</span> <span>Illuminate</span>\<span>Http</span>\<span>Request</span>;
<span>use</span> <span>Illuminate</span>\<span>Support</span>\<span>Facades</span>\<span>Http</span>;
<span>use</span> <span>Illuminate</span>\<span>Support</span>\<span>Facades</span>\<span>Storage</span>;
<span>use</span> <span>Symfony</span>\<span>Component</span>\<span>Uid</span>\<span>Ulid</span>;

<span><span>class</span> <span>ArtistImportController</span> <span>extends</span> <span>Controller</span>
</span>{
    <span>protected</span> string $placeholderImageId = <span>'4cef75db-831f-4f5d-9333-79eaa5bb55ee'</span>;
    <span>protected</span> string $navidromeApiUrl;
    <span>protected</span> string $navidromeAuthToken;

    <span>public</span> <span><span>function</span> <span>__construct</span><span>()</span>
    </span>{
        <span>$this</span>-&gt;navidromeApiUrl = config(<span>'services.navidrome.api_url'</span>);
        <span>$this</span>-&gt;navidromeAuthToken = config(<span>'services.navidrome.api_token'</span>);
    }

    <span>public</span> <span><span>function</span> <span>import</span><span>(Request $request)</span>: <span>JsonResponse</span>
    </span>{
        $input = $request-&gt;json()-&gt;all();
        $artistId = $input[<span>'artistId'</span>] ?? <span>null</span>;

        <span>if</span> (! $artistId) {
            <span>return</span> response()-&gt;json([<span>'error'</span> =&gt; <span>'Artist ID is required'</span>], <span>400</span>);
        }

        <span>try</span> {
            $artistData = <span>$this</span>-&gt;fetchNavidromeArtist($artistId);
            $albumData = <span>$this</span>-&gt;fetchNavidromeAlbums($artistId);
            $genre = $albumData[<span>0</span>][<span>'genre'</span>] ?? ($albumData[<span>0</span>][<span>'genres'</span>][<span>0</span>][<span>'name'</span>] ?? <span>''</span>);
            $artist = <span>$this</span>-&gt;processArtist($artistData, $genre);

            <span>if</span> ($artist &amp;&amp; ! <span>empty</span>($artist[<span>'id'</span>])) {
                <span>$this</span>-&gt;processAlbums($artist[<span>'id'</span>], $artistData-&gt;name, $albumData);
            } <span>else</span> {
                logger(<span>'Artist not found after insert'</span>, [<span>'artistData'</span> =&gt; $artistData]);

                <span>return</span> response()-&gt;json([<span>'error'</span> =&gt; <span>'Artist not found after insert.'</span>], <span>500</span>);
            }

            <span>return</span> response()-&gt;json(
                [<span>'message'</span> =&gt; <span>'Artist and albums synced successfully'</span>],
                <span>200</span>
            );
        } <span>catch</span> (<span>Exception</span> $e) {
            logger(<span>'Artist import failed'</span>, [<span>'error'</span> =&gt; $e-&gt;getMessage(), <span>'trace'</span> =&gt; $e-&gt;getTraceAsString()]);

            <span>return</span> response()-&gt;json(
                [<span>'error'</span> =&gt; <span>'Error: '</span>.$e-&gt;getMessage()],
                <span>500</span>
            );
        }
    }

    
    <span>protected</span> <span><span>function</span> <span>fetchNavidromeAlbums</span><span>(string $artistId)</span>: <span>array</span>
    </span>{
        $queryParams = [
            <span>'_end'</span> =&gt; <span>0</span>,
            <span>'_order'</span> =&gt; <span>'ASC'</span>,
            <span>'_sort'</span> =&gt; <span>'max_year'</span>,
            <span>'_start'</span> =&gt; <span>0</span>,
            <span>'artist_id'</span> =&gt; $artistId,
        ];

        $response = Http::withHeaders([
            <span>'x-nd-authorization'</span> =&gt; <span>"Bearer {$this-&gt;navidromeAuthToken}"</span>,
            <span>'Accept'</span> =&gt; <span>'application/json'</span>,
        ])-&gt;get(<span>"{$this-&gt;navidromeApiUrl}/api/album"</span>, $queryParams);

        <span>if</span> (! $response-&gt;successful()) {
            <span>throw</span> <span>new</span> <span>Exception</span>(<span>"Failed to fetch albums from Navidrome: HTTP {$response-&gt;status()}"</span>);
        }

        $data = json_decode($response-&gt;body(), <span>true</span>);

        <span>return</span> is_array($data) ? $data : [];
    }

    <span>protected</span> <span><span>function</span> <span>fetchNavidromeArtist</span><span>(string $artistId)</span>: <span>object</span>
    </span>{
        $response = Http::withHeaders([
            <span>'x-nd-authorization'</span> =&gt; <span>"Bearer {$this-&gt;navidromeAuthToken}"</span>,
            <span>'Accept'</span> =&gt; <span>'application/json'</span>,
        ])-&gt;get(<span>"{$this-&gt;navidromeApiUrl}/api/artist/{$artistId}"</span>);

        <span>if</span> (! $response-&gt;successful()) {
            <span>throw</span> <span>new</span> <span>Exception</span>(<span>"Failed to fetch artist from Navidrome: HTTP {$response-&gt;status()}"</span>);
        }

        <span>return</span> json_decode($response-&gt;body());
    }

    
    <span>protected</span> <span><span>function</span> <span>processArtist</span><span>(object $artistData, string $genreName = <span>''</span>)</span>: ?<span>array</span>
    </span>{
        $artistName = $artistData-&gt;name ?? <span>''</span>;

        <span>if</span> (! $artistName) {
            <span>throw</span> <span>new</span> <span>Exception</span>(<span>'Artist name is missing.'</span>);
        }

        $existingArtist = <span>$this</span>-&gt;getArtistByName($artistName);

        <span>if</span> ($existingArtist) {
            <span>return</span> $existingArtist;
        }

        $artistKey = sanitizeMediaString($artistName);
        $slug = <span>"/music/artists/{$artistKey}"</span>;
        $description = strip_tags($artistData-&gt;biography ?? <span>''</span>);
        $genre = <span>$this</span>-&gt;resolveGenreId(strtolower($genreName));
        $starred = $artistData-&gt;starred ?? <span>false</span>;

        
        $artworkId = <span>$this</span>-&gt;placeholderImageId;

        <span>if</span> (! <span>empty</span>($artistData-&gt;largeImageUrl)) {
            
            $highResImageUrl = str_replace(<span>'300x300'</span>, <span>'1200x1200'</span>, $artistData-&gt;largeImageUrl);
            $fetchedArtworkId = <span>$this</span>-&gt;downloadAndUploadImage($highResImageUrl, <span>"artist-{$artistName}"</span>);

            <span>if</span> ($fetchedArtworkId) {
                $artworkId = $fetchedArtworkId;
            }
        }

        $artistPayload = [
            <span>'name_string'</span> =&gt; $artistName,
            <span>'slug'</span> =&gt; $slug,
            <span>'description'</span> =&gt; $description,
            <span>'tentative'</span> =&gt; <span>true</span>,
            <span>'art'</span> =&gt; $artworkId,
            <span>'favorite'</span> =&gt; $starred,
            <span>'genres'</span> =&gt; $genre,
        ];

        $handler = app(PostgrestService::class);

        <span>try</span> {
            $response = $handler-&gt;makeRequest(<span>'POST'</span>, <span>'artists'</span>, [
                <span>'json'</span> =&gt; $artistPayload,
                <span>'headers'</span> =&gt; [<span>'Prefer'</span> =&gt; <span>'return=representation'</span>],
            ]);
            $createdArtist = $response[<span>0</span>] ?? <span>null</span>;
            <span>if</span> ($createdArtist &amp;&amp; ! <span>empty</span>($createdArtist[<span>'id'</span>])) {
                <span>return</span> $createdArtist;
            }
        } <span>catch</span> (<span>Exception</span> $e) {
            <span>if</span> (str_contains($e-&gt;getMessage(), <span>'status 409'</span>)) {
                logger(<span>'Artist already exists (409), fetching by name'</span>, [<span>'artistName'</span> =&gt; $artistName]);
                $existingArtist = <span>$this</span>-&gt;getArtistByName($artistName);
                <span>if</span> ($existingArtist) {
                    <span>return</span> $existingArtist;
                }
            }

            <span>throw</span> $e;
        }

        
        $fallbackArtist = <span>$this</span>-&gt;getArtistByName($artistName);

        <span>return</span> $fallbackArtist;
    }

    
    <span>protected</span> <span><span>function</span> <span>processAlbums</span><span>(string $artistId, string $artistName, array $albumData)</span>: <span>void</span>
    </span>{
        $existingAlbums = <span>$this</span>-&gt;getExistingAlbums($artistId);
        $existingAlbumKeys = array_column($existingAlbums, <span>'key'</span>);

        <span>foreach</span> ($albumData <span>as</span> $album) {
            $albumName = $album[<span>'name'</span>] ?? <span>''</span>;
            $releaseYearRaw = $album[<span>'date'</span>] ?? <span>null</span>;
            $releaseYear = <span>null</span>;

            <span>if</span> ($releaseYearRaw &amp;&amp; preg_match(<span>"/^\d{4}/"</span>, $releaseYearRaw, $matches)) {
                $releaseYear = (int) $matches[<span>0</span>];
            }

            $artistKey = sanitizeMediaString($artistName);
            $albumKey = <span>"{$artistKey}-"</span>.sanitizeMediaString($albumName);
            $albumSlug = <span>'/'</span>.sanitizeMediaString($albumName);

            <span>if</span> (in_array($albumKey, $existingAlbumKeys)) {
                <span>continue</span>;
            }

            <span>try</span> {
                
                $artworkId = <span>$this</span>-&gt;placeholderImageId;

                <span>if</span> (! <span>empty</span>($album[<span>'id'</span>])) {
                    $fetchedArtworkId = <span>$this</span>-&gt;fetchAndUploadAlbumArtworkFromAPI($album[<span>'id'</span>], $albumName, $artistName);
                    <span>if</span> ($fetchedArtworkId) {
                        $artworkId = $fetchedArtworkId;
                    }
                }

                $albumPayload = [
                    <span>'name'</span> =&gt; $albumName,
                    <span>'key'</span> =&gt; $albumKey,
                    <span>'slug'</span> =&gt; $albumSlug,
                    <span>'release_year'</span> =&gt; $releaseYear,
                    <span>'artist'</span> =&gt; $artistId,
                    <span>'artist_name'</span> =&gt; $artistName,
                    <span>'art'</span> =&gt; $artworkId,
                    <span>'tentative'</span> =&gt; <span>true</span>,
                ];

                $handler = app(PostgrestService::class);
                $handler-&gt;makeRequest(<span>'POST'</span>, <span>'albums'</span>, [<span>'json'</span> =&gt; $albumPayload]);
            } <span>catch</span> (<span>Exception</span> $e) {
                logger(<span>'Failed to create album'</span>, [<span>'albumKey'</span> =&gt; $albumKey, <span>'error'</span> =&gt; $e-&gt;getMessage()]);
            }
        }
    }

    <span>protected</span> <span><span>function</span> <span>getArtistByName</span><span>(string $nameString)</span>: ?<span>array</span>
    </span>{
        $handler = app(PostgrestService::class);
        $response = $handler-&gt;fetchFromApi(<span>'artists'</span>, [<span>'name_string'</span> =&gt; <span>'eq.'</span>.$nameString]);

        <span>return</span> $response[<span>0</span>] ?? <span>null</span>;
    }

    <span>protected</span> <span><span>function</span> <span>getExistingAlbums</span><span>(string $artistId)</span>: <span>array</span>
    </span>{
        $handler = app(PostgrestService::class);

        <span>return</span> $handler-&gt;fetchFromApi(<span>'albums'</span>, [<span>'artist'</span> =&gt; <span>'eq.'</span>.$artistId]);
    }

    <span>protected</span> <span><span>function</span> <span>resolveGenreId</span><span>(string $genreName)</span>: ?<span>string</span>
    </span>{
        $handler = app(PostgrestService::class);
        $genres = $handler-&gt;fetchFromApi(<span>'genres'</span>, [<span>'name'</span> =&gt; <span>'eq.'</span>.strtolower($genreName)]);

        <span>return</span> $genres[<span>0</span>][<span>'id'</span>] ?? <span>null</span>;
    }

    
    <span>protected</span> <span><span>function</span> <span>fetchAndUploadAlbumArtworkFromAPI</span><span>(string $albumId, string $albumName, string $artistName)</span>: ?<span>string</span>
    </span>{
        <span>try</span> {
            
            $response = Http::withHeaders([
                <span>'x-nd-authorization'</span> =&gt; <span>"Bearer {$this-&gt;navidromeAuthToken}"</span>,
                <span>'Accept'</span> =&gt; <span>'application/json'</span>,
            ])-&gt;get(<span>"{$this-&gt;navidromeApiUrl}/api/album/{$albumId}"</span>);

            <span>if</span> (! $response-&gt;successful()) {
                <span>return</span> <span>null</span>;
            }

            $albumData = $response-&gt;json();

            <span>if</span> (<span>empty</span>($albumData[<span>'largeImageUrl'</span>])) {
                <span>return</span> <span>null</span>;
            }

            
            $highResImageUrl = str_replace(<span>'300x300'</span>, <span>'1200x1200'</span>, $albumData[<span>'largeImageUrl'</span>]);

            <span>return</span> <span>$this</span>-&gt;downloadAndUploadImage($highResImageUrl, <span>"album-{$artistName}-{$albumName}"</span>);

        } <span>catch</span> (<span>Exception</span> $e) {
            <span>return</span> <span>null</span>;
        }
    }

    
    <span>protected</span> <span><span>function</span> <span>downloadAndUploadImage</span><span>(string $imageUrl, string $baseName)</span>: ?<span>string</span>
    </span>{
        <span>try</span> {
            
            $response = Http::timeout(<span>30</span>)-&gt;get($imageUrl);

            <span>if</span> (! $response-&gt;successful()) {
                logger(<span>'Failed to download image'</span>, [<span>'url'</span> =&gt; $imageUrl, <span>'status'</span> =&gt; $response-&gt;status()]);

                <span>return</span> <span>null</span>;
            }

            $imageContent = $response-&gt;body();
            $contentType = $response-&gt;header(<span>'Content-Type'</span>, <span>'image/jpeg'</span>);

            
            $extension = match ($contentType) {
                <span>'image/png'</span> =&gt; <span>'png'</span>,
                <span>'image/gif'</span> =&gt; <span>'gif'</span>,
                <span>'image/webp'</span> =&gt; <span>'webp'</span>,
                <span>default</span> =&gt; <span>'jpg'</span>,
            };

            
            $ulid = (string) Ulid::generate();
            $filename = <span>"uploads/{$ulid}.{$extension}"</span>;

            
            $uploaded = Storage::disk(<span>'s3'</span>)-&gt;put($filename, $imageContent, <span>'private'</span>);

            <span>if</span> (! $uploaded) {
                logger(<span>'Failed to upload image to S3'</span>, [<span>'filename'</span> =&gt; $filename]);

                <span>return</span> <span>null</span>;
            }

            
            $mediaFile = MediaFile::create([
                <span>'filename_disk'</span> =&gt; $filename,
                <span>'filename_download'</span> =&gt; sanitizeMediaString($baseName).<span>'.'</span>.$extension,
                <span>'title'</span> =&gt; $baseName.<span>' Artwork'</span>,
                <span>'type'</span> =&gt; $contentType,
                <span>'filesize'</span> =&gt; strlen($imageContent),
            ]);

            logger(<span>'Successfully uploaded artwork'</span>, [
                <span>'mediaFileId'</span> =&gt; $mediaFile-&gt;id,
                <span>'filename'</span> =&gt; $filename,
                <span>'baseName'</span> =&gt; $baseName,
            ]);

            <span>return</span> $mediaFile-&gt;id;

        } <span>catch</span> (<span>Exception</span> $e) {
            logger(<span>'Failed to download and upload image'</span>, [
                <span>'imageUrl'</span> =&gt; $imageUrl,
                <span>'baseName'</span> =&gt; $baseName,
                <span>'error'</span> =&gt; $e-&gt;getMessage(),
            ]);

            <span>return</span> <span>null</span>;
        }
    }
}
</code></pre>
</div>
</div>
