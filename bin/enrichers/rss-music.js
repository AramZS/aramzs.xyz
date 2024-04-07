// https://songobsessed.com/rss/
let Parser = require("rss-parser");
const { processObjectToMarkdown } = require("../json-to-markdown");
const slugger = require("../slugger");
let mediaParser = new Parser({
	customFields: {
		item: [
			["media:content", "media:content", { keepArray: false }],
			"media:keywords",
			"media:caption",
			"media:category",
			"media:transcript",
			["media:thumbnail", "thumbnail", { keepArray: false }],
		],
	},
});
let standardParser = new Parser();

async function getMusicFeed(feedUrl){
  let feed = new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: {
        "User-Agent": "insomnia/8.6.1",
      },
    };

    fetch(feedUrl, options)
      .then((response) => response.text())
      .then((response) => resolve(response))
      .catch((err) => {
        console.error("song rss error", err);
        reject(err);
      });
  });

  let feedFile = await feed;
  let feedResult = await standardParser.parseString(feedFile);
  return feedResult.items.slice(0, 300);
}

async function getSongObsessedFeed(){
  var soFeed = 'https://songobsessed.com/rss/';
  let feed = await getMusicFeed(soFeed);
  let finalFeed = feed.map((item) => {
		if (item.title && item.content) {
			item.title = item.title.trim();
			item.description = item.contentSnippet.trim();
      delete item.contentSnippet;
      item.content = item['content:encoded'].trim();
      delete item['content:encoded'];
      delete item['dc:creator'];
      delete item['content:encodedSnippet'];
      item.isBasedOn = item.guid;
      delete item.guid;
      delete item.link;
      item.date = new Date(item.pubDate).toISOString();
      delete item.pubDate;
      // Generate a file-slug YYYY-MM-DD string from the date
      let date = new Date(item.date);
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0");
      let day = String(date.getDate()).padStart(2, "0");
      let dateString = `${year}-${month}-${day}`;
      item.slug = slugger(dateString + "-" + item.title);
			return item;
		} else {
			return false;
		}
	});
	console.log("feedObjects", finalFeed);
  return finalFeed.filter((item) => item);
}

function writeSong(songObject){
  return processObjectToMarkdown(
    "title",
    "content",
    "./src/content/resources/music",
    songObject
  )
}

async function writeSongFiles(){
  let feedObjects = await getSongObsessedFeed();
  let writeResults = feedObjects.map((song) => {
    return writeSong(song);
  })
  return writeResults;
}

module.exports = {
	writeSongs: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = await writeSongFiles();
		return result;
	},
};
