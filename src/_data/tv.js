const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const tv = fs.readFileSync("./src/_data/tv.txt", "utf8");
const { processObjectToMarkdown } = require("../../bin/json-to-markdown");

require("dotenv").config();

const cache = new ObjectCache("tmdb");

let movieDBUrl = new URL("https://api.themoviedb.org/3/search/tv");
movieDBUrl.searchParams.append("api_key", process.env.TMDB_KEY);
movieDBUrl.searchParams.append("query", "Star Trek");

let movieDBSet = {};

if (cache.has("tv")) {
	console.log("Found Cached TV Data");
	movieDBSet = cache.get("tv");
}

const tvArray = tv.split("\n").map(async (line) => {
	let showName = line;
	movieDBUrl.searchParams.delete("query");
	movieDBUrl.searchParams.append("query", showName);
	if (showName in movieDBSet) {
		console.log("tv cache found", showName);
		return { showName, ...movieDBSet[showName] };
	}
	fetch(movieDBUrl.href)
		.then((response) => response.json())
		.then((data) => {
			console.log("tv", showName, data.results[0]);
			movieDBSet[showName] = data.results[0];
			cache.set("tv", movieDBSet);
		});
	return { showName };
});

const writeTVShows = async (tvPromiseArray) => {
	console.log("Writing TV Shows");
	const tvShows = await Promise.all(tvPromiseArray);
	tvShows.forEach((show) => {
		if (!show.showName) {
			return;
		}
		show.rating = false;
		console.log("show", show.showName);
		processObjectToMarkdown(
			"showName",
			false,
			"./src/content/resources/tv",
			show
		);
	});
	return "./src/content/resources/tv";
};

// await Promise.all(tvArray);
// writeTVShows(tvArray);
// module.exports = writeTVShows(tvArray);

module.exports = {
	writeTVShows: async () => {
		var result = await writeTVShows(tvArray);
		return result;
	},
};
