const fs = require("fs");
const path = require('path');
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
const { processObjectToMarkdown } = require("../json-to-markdown");
const csvParse = require('csv-parse');
const quotes = fs.readFileSync(
	"./to-process/readwise-data.csv",
	"utf8"
);
const existingQuotes = require("../../src/_data/quotes");
const slugger = require("../slugger");
var crypto = require("crypto");
require("dotenv").config();

function Quote(quoteObj) {
	this.sourceTitle = "";
	this.cite = {
		name: "",
		href: "",
	}; // author
	this.blockquote = "";
	this.createdDate = new Date().toISOString();
	this.publishDate = new Date().toISOString();
	this.location = 0;
	this.type = "quote";
	this.handedFrom = "Kindle";
	this.referringUri = false;
	this.notes = [];
	this.publish = true;
	this.slug = false;
	this.tags = ["Quote"];
	Object.assign(this, quoteObj);
	var quoteHasContent = false;
	if (
		quoteObj.hasOwnProperty("blockquote") &&
		quoteObj.blockquote.length > 3
	) {
		quoteHasContent = true;
	}
	if (!quoteHasContent) {
		this.publish = false;
	}
  if (this.hasOwnProperty("page")){
    this.pageNum = this.page;
    delete this.page;
  }
}

function clippingsIoToQuoteObj(clipping) {
	// console.log("Clipping", clipping);
	var quoteObj = {
		sourceTitle: clipping.BookTitle,
		cite: { 
      name: clipping.BookAuthor,
      href: false 
    },
		blockquote: clipping.Content,
		location: clipping.Location,
		page: clipping.Page,
		createdDate: clipping.CreatedKindle,
    date: new Date(clipping.CreatedKindle).toISOString(),
		publishDate: clipping.CreatedWebsite,
		annotationType: clipping.AnnotationType,
		notes: clipping.Notes ? clipping.Notes : [],
		publish: clipping.publish ? clipping.publish : true,
	};
	console.log("Clipping transformed", clipping, quoteObj);
	return quoteObj;
}

function readwiseReformatQuote(clipping) {
	// console.log("Clipping", clipping);
  var isKindle = clipping['Location Type'] === "location" && clipping['Amazon Book ID'].length > 0;
	var quoteObj = {
		sourceTitle: clipping["Book Title"],
		cite: { 
      name: clipping["Book Author"],
      href: false 
    },
		blockquote: clipping.Highlight,
		location: clipping['Location Type'] === "location" ? clipping.Location : null,
		page: null,
		createdDate: clipping["Highlighted at"],
    ogImageHref: children["cover_image_url"],
    date: new Date(clipping["Highlighted at"]).toISOString(),
		// publishDate: null,
		annotationType: "Highlight",
		notes: clipping.Note ? [clipping.Note] : [],
		publish: clipping.publish ? clipping.publish : true,
    tags: clipping["Document tags"] ? clipping["Document tags"].split(',') : [],
	};
  if (clipping['url'] != null){
    quoteObj.cover_image_url = clipping['url'];
  }
  if (!isKindle){
    quoteObj.handedFrom = "Pocket";
  }
	console.log("Readwise transformed", clipping, quoteObj);
	return quoteObj;
}
/**
 * 	{
		"BookTitle": "Reality Is Broken: Why Games Make Us Better and How They Can Change the World",
		"BookAuthor": "Jane McGonigal",
		"Content": "Playing World of Warcraft is such a satisfying job, gamers have collectively spent 5.93 million years doing it.",
		"Location": "891",
		"Page": "",
		"CreatedKindle": "2015-05-26T04:00:00",
		"CreatedWebsite": "2024-03-10T17:53:21.203",
		"AnnotationType": "Highlight",
		"Notes": [
			"Players have collectively spent 5.93 million years playing World of Warcraft."
		],
		"publish": false
	},
 */
/*
https://readwise.io/api_deets

Book Quote (Highlight API)

		{
			"id": 969164749,
			"text": "Fundamentally, social platforms like Twitter and Facebook still follow the post-and-comment model of an earlier era, where interactions with the author are frictionless, even encouraged. These platforms struggle, more than any other, to adapt to modern social needs.",
			"note": "",
			"location": 3531,
			"location_type": "location",
			"highlighted_at": "2025-12-23T04:56:00.000000Z",
			"url": null,
			"color": "yellow",
			"updated": "2025-12-23T16:04:23.627068Z",
			"book_id": 44456241,
			"tags": []
		},

Book ID API

{
	"id": 44456241,
	"title": "Working in Public",
	"author": "Nadia Eghbal",
	"category": "books",
	"source": "kindle",
	"num_highlights": 161,
	"last_highlight_at": "2025-12-23T04:56:00.000000Z",
	"updated": "2025-12-23T16:04:23.644180Z",
	"cover_image_url": "https://m.media-amazon.com/images/I/71QEto5bYbL._SY160.jpg",
	"highlights_url": "https://readwise.io/bookreview/44456241",
	"source_url": null,
	"asin": "B08BDGXVK9",
	"tags": [],
	"document_note": ""
}

Article Quote (Highlight API)
		{
			"id": 968883022,
			"text": "Most recently, as every Minnesotan likely knows, the president of the United States [used it against our governor](https://www.startribune.com/in-social-media-posts-trump-targets-somali-community-in-minnesota-after-national-guard-shooting/601535368) in an unhinged social media rant, filled with false information, aimed chiefly at denigrating Somali Minnesotans. [As the Walz family responded](https://www.startribune.com/brooks-gov-tim-walz-knows-how-bullies-operate/601535429), trying to humanize the situation and talk about how language affects people (especially their son Gus, who has a [non-verbal learning disability](https://www.nbcnews.com/health/health-news/nonverbal-learning-disorder-tim-walzs-son-gus-condition-explained-rcna167804)), Republicans gleefully picked up on a comment that people were driving by the governor’s house and shouting the r-word.",
			"note": "",
			"location": 3076,
			"location_type": "offset",
			"highlighted_at": "2025-12-22T18:04:41.152618Z",
			"url": "https://read.readwise.io/read/01kd3kr79bshepz5pbxcm9vahj",
			"color": "",
			"updated": "2025-12-22T18:04:41.258235Z",
			"book_id": 57020773,
			"tags": []
		},


Book as Article ID API 
{
	"id": 57020773,
	"title": "The Return of the R-Word",
	"author": "startribune.com",
	"category": "articles",
	"source": "reader",
	"num_highlights": 2,
	"last_highlight_at": "2025-12-22T18:04:53.561210Z",
	"updated": "2025-12-25T19:05:18.576325Z",
	"cover_image_url": "https://arc.stimg.co/startribunemedia/I7BZCJIGDJFG3P5FDELOGZFS7Q.JPG?&w=1200&ar=1.91:1&fit=crop",
	"highlights_url": "https://readwise.io/bookreview/57020773",
	"source_url": "https://www.startribune.com/r-word-slur-trump-truth-social-posts/601549622",
	"asin": null,
	"tags": [
		{
			"id": 13317930,
			"user_book": 57020773,
			"name": "baselines"
		},
		{
			"id": 13317929,
			"user_book": 57020773,
			"name": "politics"
		},
		{
			"id": 13317928,
			"user_book": 57020773,
			"name": "culture"
		}
	],
	"document_note": ""
}
*/

function generateFileSlug(quoteObj) {
	var slugCommonWordsRemoved = quoteObj.blockquote
		.replace(" the ", " ")
    .replace(" The ", " ")
		.replace(" and ", " ")
    .replace(" but ", " ")
    .replace(" But ", " ")
		.replace(" if ", " ")
		.replace(" a ", " ")
    .replace(" A ", " ")
		.replace(" of ", " ")
		.replace(" or ", " ")
    .replace(" his ", " ")
    .replace(" her ", " ")
    .replace(" you ", " ")
    .replace(" with ", " ")
    .replace(" then ", " ")
    .replace(" I ", " ")
    .replace(" we ", " ")
		.replace(" in ", " ");
	var slugCandidate = slugCommonWordsRemoved.split(" ").slice(0, 5).join(" ");
	var slug = slugger(slugCandidate);
	return slug + "-" + quoteObj.id.slice(0, 5);
}

function idGen(quoteObj) {
	var pieces = [quoteObj.blockquote, quoteObj.cite];
	if (quoteObj.sourceTitle && quoteObj.sourceTitle.length > 0) {
		pieces.push(quoteObj.sourceTitle);
	}
	var idCandidate = pieces.join("-");
	return crypto.createHash("md5").update(idCandidate).digest("hex");
}

function quoteObjCreator(quoteObj) {
    var quote = new Quote(quoteObj);
    console.log('Quote', quote);
    quote.sourceSlug = '';
    quote.id = idGen(quote);
    quote.slug = generateFileSlug(quote);
    // Some quotes are too long to be used as a title. Let's split it out at 10 words. 
    var ending = quote.blockquote.split(" ").length > 10 ? "..." : "";
    quote.title =
      quote.blockquote.split(" ").slice(0, 10).join(" ") + ending;
    if (quote.sourceTitle && quote.sourceTitle.length > 0) {
      quote.title = quote.title + " - " + quote.sourceTitle;
      var titleSlug = slugger(quote.sourceTitle);
      quote.sourceSlug = titleSlug;
    }
    if (quote.blockquote.split(" ").length < 2){
      quote.publish = false;
    }
    quote.content = `
> ${quote.blockquote}`;
    console.log("Quote Obj", quote);
    return quote;
}

function quoteObjectWriter(quoteObj){
  let sourcePath = '';
  if (quoteObj.sourceSlug && quoteObj.sourceSlug.length > 0) {
    sourcePath = `/${quoteObj.sourceSlug}`;
  }
  return processObjectToMarkdown(
    "title",
    "content",
    "./src/content/resources/quotes"+sourcePath,
    quoteObj,
    true
  )
}

async function writeQuoteFile(quotes) {
	var existing = await existingQuotes();
  if (quotes.length < 1){
    console.log('File has no content')
    return;
  }
	//console.log("existing", existing);
  try {
    //quotes = quotes.replace(/[\u0000-\u0019]+/g,"");
    quotes = quotes.replace('&#39;',"'");
    var candidateQuotesToProcess = JSON.parse(quotes);
  } catch (e) {
    console.log('Error parsing JSON', e);
    console.log('JSON', quotes);
    //throw new Error('Could not parse JSON');
    return false;
  }
	// var candidateQuotesToProcess = JSON.parse(quotes);
	var existingIds = existing.map((quoteObj) => {
		return quoteObj.id;
	});
	var candidateExisting = existing.map((quoteObj) => {
		if (!quoteObj.hasOwnProperty("id")) {
			return quoteObj;
		}
	});
	var candidates = [
		...candidateQuotesToProcess.map((quoteObj) =>
			clippingsIoToQuoteObj(quoteObj)
		),
		...candidateExisting,
	];
	let finalQuotes = candidates
		.filter((quoteObj) => quoteObj.blockquote.length > 1)
		.map(quoteObjCreator);

	var finalQuotesActioned = finalQuotes.map(quoteObjectWriter);
	return finalQuotesActioned;
	return fs.writeFileSync(
		"./src/_dataSources/quotes.json",
		JSON.stringify(finalQuotes, null, 2)
	);
}

function readJsonFilesFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const jsonFiles = files.filter(file => path.extname(file) === '.json');
  console.log('jsonFiles', jsonFiles);
  const jsonContents = jsonFiles.map(file => {
    const filePath = path.join(folderPath, file);
    console.log('Reading file', filePath);
    return fs.readFileSync(filePath, 'utf8');
  });
  return jsonContents;
}

async function readCSVFromFolder(folderPath) {
  //let parse = csvParse.parse({delimiter: ":"});
  const records = [];
  let counter = 0;
  let headers = [];
  const parser = fs
  .createReadStream(`./to-process/readwise-data.csv`)
  .pipe(csvParse.parse({
    trim: true,
  // CSV options if any
  }));
  for await (const record of parser) {
    if (counter === 0) {
      // Skip the first row
      counter++;
      headers = record;
      continue;
    }
    counter++;
    // Work with each record
    let jsonRecord = record.reduce((acc, value, index) => {
      acc[headers[index]] = value;
      return acc;
    }, {});
    const quoteObj = quoteObjCreator(readwiseReformatQuote(jsonRecord));
    quoteObjectWriter(quoteObj);
    records.push(quoteObj);
    console.log(quoteObj);
  }
  console.log(records);
}

module.exports = {
	writeQuotes: async () => {
		//var finishedArray = await Promise.all(quoteArray);
    readCSVFromFolder(); return;
    let arrayOfBooks = readJsonFilesFromFolder('./to-process/KindleHighlights');
    let promisedResultForAllQuotes = arrayOfBooks.reduce((promiseChain, quoteBlock) => {
      promiseChain.push(writeQuoteFile(quoteBlock));
      return promiseChain;
    }, [])
		var result = await Promise.all(promisedResultForAllQuotes);
		return result;
	},
};
