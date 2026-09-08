---
author: grgml.xyz
cover_image: >-
  https://grgml.xyz/assets/og-images/creating-a-bookshelf-from-the-bookwyrm-api-preview.jpeg
date: '2026-08-26T18:14:50.812Z'
dateFolder: 2026/08/26
description: 'A #PESOS approach to replicate my #BookWyrm reading list in my website'
isBasedOn: 'https://grgml.xyz/blog/creating-a-bookshelf-from-the-bookwyrm-api/'
link: 'https://grgml.xyz/blog/creating-a-bookshelf-from-the-bookwyrm-api/'
slug: 2026-08-26-httpsgrgmlxyzblogcreating-a-bookshelf-from-the-bookwyrm-api
tags:
  - code
  - tech
  - decentralization
title: Creating a bookshelf from the BookWyrm API
---
<p>I use <a href="https://bookwyrm.social">BookWyrm</a> to track my reading. I switched from Goodreads to BookWyrm in 2023, right after I started using Mastodon and become more acquainted to the Fediverse in general, so ditching the Amazon-owned book platform for an independent one on fedi was a no-brainer. The platform does a decent job as a reading catalog, and since it's powered by ActivityPub it's part of the social web, meaning you can follow and interact with a BookWyrm account from anywhere in the Fediverse. Due to the fact that it doesn't have a lot of users, you won't find many reviews and ratings, and you may need to manually add books yourself, but that's the fun part, since you get to enrich a free and common library with new titles.</p>
<p>Now apart from being a fedi-appreciator, I'm also trying to play by this indieweb thing, where you're supposed to have most of (or everything?) you post online documented on your personal website. I've <a href="https://grgml.xyz/blog/syndicating-posts-to-mastodon-via-the-gitlab-pipeline/">automated the cross-posting between my site and my Mastodon</a>, so that I can post my updates here and have them automatically syndicated to my Mastodon account (the POSSE method), but this would be kind of impractical in the case of BookWyrm, because I would need to refer to books that exist on the server, whose ids I don't know beforehand, and mark them as read or add them to lists. And BookWyrm doesn't even offer a way to do this as far as I know (or at least Bridgy doesn't do that). So in this case I'm going with the PESOS model (Publish Elsewhere, Syndicate to your Own Site), where I post the updates on BookWyrm and aggregate my activity in my website in the form of a bookshelf.</p>
<p>I could do this manually of course, post it on BookWyrm and then create an entry in my site, but since there is a shorter an funnier way i decided to try it out. BookWyrm doesn't offer an extensive client API, but offers just enough for you to create a simple shelf with what you've been reading and are currently reading. You can get a JSON object with one of your shelves by hitting the following endpoint:</p>
<pre><code>`https://bookwyrm.social/user/\user}/shelf/\shelf}.json?page=\page}`</code></pre>
<p>The different shelves you can find in the books section of your profile (to-read, currently-reading, read and stopped-reading), and you'll get a paginated result for all the pages you request. I didn't find a way to get all results in one call (page size seems to be hard-coded to 15), so I wrote this custom script to create an array of all books.</p>
<p>I am using the <a href="https://www.11ty.dev/docs/plugins/fetch/">Eleventy Fetch</a> plugin to fetch and cache my results and avoid unnecessary calls during development, and using a global data file to expose the results to all the templates in my project, although I'm currently using them just in one page.</p>
<p>So first, create a <code>books.js</code> file inside the <code>_data</code> folder.</p>
<pre><code>/* _data/books.js */
const Fetch = require("@11ty/eleventy-fetch"); 

module.exports = async function () {
	const url = "https://bookwyrm.social/user/Grigor/shelf/read.json";
	let page = 1;
	let hasNext = true;
	let books = [];
}</code></pre>
<p>Next let's use a while loop to go through all pages:</p>
<pre><code>while (hasNext) {
	try {
		// fetch results for page=\page}, initially page=1
		let json = await Fetch(`\url}?page=\page}`, {
			duration: "1d", // save for 1 day
			type: "json", // automatically parse JSON
		});
		// merge the results in the books array		
		books = [		
			...books,	
			// in my case i'm interested only in id, title and cover
			// check the available data in the response
			...json?.orderedItems.map(
				({ id, title, cover: { url: coverUrl } = {} }) =&gt; ({
					id,
					title,
					coverUrl,
					current: false // we're not currently reading these books
				}),
			),		
		];
		// check if there is a next page		  		
		hasNext = json?.next;		
		// if so, increment the page by 1 and let the next look run
		if (hasNext) {				
			page += 1;		
		}
	} catch (error) {	
		console.log(error);	
	}
}</code></pre>
<p>Like this we get an array of all the books in the "read" shelf. We may also want to add the "currently reading" results at the start of the array. In this case there's no need for a while loop because I hope you're not reading more than 15 books at once!</p>
<pre><code>try {
	const currentlyReading = await Fetch(
		"https://bookwyrm.social/user/Grigor/shelf/reading.json?page=1",
		{	
			duration: "1d",
			type: "json", 
		},
	);		
	// if we're currently reading something
	if (currentlyReading?.orderedItems?.length) {	
		books = [	
			...currentlyReading?.orderedItems.map(
			({ id, title, cover: { url: coverUrl } = {} }) =&gt; ({
					id,
					title,
					coverUrl,
					current: true,
				}),	
			),
			...books
		];	
	}
} catch (error) {
	throw new Error(error);
}</code></pre>
<p>Now, a drawback of BookWyrm's public endpoint is that it doesn't provide data about the time when you started/finished reading a book, so if we want to organize them by year in our bookshelf we'll have to add some manual breakpoints. I went to my BookWyrm profile and found out which book I had read first at the start of each year, and compiled an array like this:</p>
<pre><code>let breakpoints = [
	{
		year: 2023,
		start: "book title" // exact title of the book (you can also use the book id if you want), make sure to copy/paste it
	},
	{
		year: 2024,
		start: "..."
	}
	// an object for every year
]</code></pre>
<p>Next let's find the index of each breakpoint book in the array of books that we previously built:</p>
<pre><code>breakpoints = breakpoints.map((bp) =&gt; {
	// finding the index by title, make sure to compare book.id if you saved the id
	const bookIndex = books.findIndex(book =&gt; book.title === bp.start);
	return {
		...bp,
		startIndex: bookIndex, // add bookIndex to the breakpoint object
	};
});</code></pre>
<p>And finally, add year information about each book in the books array:</p>
<pre><code>books = books.map((book, i) =&gt; {
	for (let bpi = breakpoints.length - 1; bpi &gt;= 0; bpi--) {
		if (i &lt;= breakpoints[bpi].startIndex) {
			return {
				...book,
				year: breakpoints[bpi].year,
			};
		}
	}
});

return books</code></pre>
<p>Now all book objects will look like this:</p>
<pre><code>{
	id: "https://...", // url of the book in your bookwyrm instance
	title: 'Book title' // self-explanatory
	coverUrl: "https://..." // book cover image url
	year: "2023" // year when the book was read
	current: false // or true, if you're currently reading it
}</code></pre>
<p>Finally, in our bookshelf page, we can use the following nunjucks template to render all books:</p>
<pre><code>&lt;div class="grid books"&gt;
\% for book in books %}
	&lt;!-- if year != book.year it marks the start of a new year --&gt;
	\% if year != book.year %}
		\% set year = book.year %}
		&lt;!--at the start of each year add a heading as visual delimiter --&gt;
		&lt;h2 class="heading"&gt;{{ book.year }}&lt;/h2&gt;
	\% endif %}
	&lt;!--add .current class to the book(s) you're currently reading --&gt;
	&lt;article \% if book.current %}class="current"\%endif%}&gt;
		&lt;img src="{{book.coverUrl}}" alt="Cover image for {{ book.title }}" /&gt;
		&lt;p class="title"&gt;&lt;a href="{{book.id}}"&gt;{{ book.title }}&lt;/a&gt;&lt;/p&gt;
	&lt;/article&gt;
\% endfor %}
&lt;/div&gt;</code></pre>
<p>And like this, you get something like what I got in my <a href="https://grgml.xyz/bookshelf">/bookshelf page</a>.</p>
