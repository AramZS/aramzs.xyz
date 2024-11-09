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
    date: new Date(clipping["Highlighted at"]).toISOString(),
		// publishDate: null,
		annotationType: "Highlight",
		notes: clipping.Note ? [clipping.Note] : [],
		publish: clipping.publish ? clipping.publish : true,
    tags: clipping["Document tags"] ? clipping["Document tags"].split(',') : [],
	};
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
