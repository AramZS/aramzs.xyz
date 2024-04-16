const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
const { processObjectToMarkdown } = require("../json-to-markdown");
const quotes = fs.readFileSync(
	"./to-process/ClippingsIoKindleHighlights.json",
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

async function writeQuoteFile() {
	var existing = await existingQuotes();
	console.log("existing", existing);
	var candidateQuotesToProcess = JSON.parse(quotes);
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
		.map((quoteObj) => {
			var quote = new Quote(quoteObj);
      quote.sourceSlug = '';
			quote.id = idGen(quote);
			quote.slug = generateFileSlug(quote);
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
		});

	var finalQuotesActioned = finalQuotes.map((quoteObj) => {
    let sourcePath = '';
    if (quoteObj.sourceSlug && quoteObj.sourceSlug.length > 0) {
      sourcePath = `/${quoteObj.sourceSlug}`;;
    }
		return processObjectToMarkdown(
			"title",
			"content",
			"./src/content/resources/quotes"+sourcePath,
			quoteObj
		)
  });
	return finalQuotesActioned;
	return fs.writeFileSync(
		"./src/_dataSources/quotes.json",
		JSON.stringify(finalQuotes, null, 2)
	);
}

module.exports = {
	writeQuotes: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = await writeQuoteFile();
		return result;
	},
};
