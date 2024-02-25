const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
const tv = fs.readFileSync("./bin/enrichers/tv.txt", "utf8");
const { processObjectToMarkdown } = require("../json-to-markdown");
const slugger = require("../slugger");
require("dotenv").config();

const cache = new ObjectCache("tmdb");
// https://developer.themoviedb.org/reference/intro/getting-started
let movieDBUrl = new URL("https://api.themoviedb.org/3/search/tv");
movieDBUrl.searchParams.append("api_key", process.env.TMDB_KEY);
movieDBUrl.searchParams.append("query", "Star Trek");

let movieDBSet = {};
let genreResult = new Promise((resolve, reject) => {
	resolve(true);
});
if (cache.has("tv")) {
	console.log("Found Cached TV Data");
	movieDBSet = cache.get("tv");
}
let tvGenresSet = { genres: [] };
if (cache.has("tv_genres")) {
	console.log("Found Cached TV Genres Data");
	tvGenresSet = cache.get("tv_genres");
	console.log("tv genres cached", tvGenresSet);
} else {
	let movieDBTVGenreListUrl = new URL(
		"https://api.themoviedb.org/3/genre/tv/list"
	);
	movieDBTVGenreListUrl.searchParams.append("api_key", process.env.TMDB_KEY);
	genreResult = new Promise((resolve, reject) => {
		fetch(movieDBTVGenreListUrl.href)
			.then((response) => response.json())
			.then((data) => {
				console.log("tv genres response", data);
				cache.set("tv_genres", data);
				tvGenresSet = data;
				resolve(tvGenresSet);
			});
	});
}

const tvArray = tv.split("\n").map(async (line) => {
	let showName = line;
	movieDBUrl.searchParams.delete("query");
	movieDBUrl.searchParams.append("query", showName);
	var imagePath = "https://image.tmdb.org/t/p/original/";
	await genreResult;
	if (showName in movieDBSet) {
		console.log("tv cache found", showName);
		let tags = [];
		tags = movieDBSet[showName].genre_ids.reduce(
			(accumulator, genre) => {
				let genreObj = tvGenresSet.genres.find(
					(genreItem) => genreItem.id === genre
				);
				if (genreObj) {
					let genreText = genreObj.name;
					accumulator.push(genreText);
				} else {
					console.log("genre not found", genre);
				}
				return accumulator;
			},
			["list/film-and-tv", "list/tv"]
		);
		movieDBSet[showName].tags = tags;
		console.log("genre tag set", tags);
		if (tags.length < 1) {
			console.log("no tags", movieDBSet[showName]);
		}
		let featuredImage = imagePath + movieDBSet[showName].backdrop_path;
		let posterImage = imagePath + movieDBSet[showName].poster_path;
		movieDBSet[showName].date = new Date().toISOString();
		let showSlug = slugger(showName);
		movieDBSet[showName].slug = showSlug;
		// processImageUrl
		let featPath = await processImageUrl(
			featuredImage,
			"jpg",
			showSlug + "-featured",
			"./public/img/retrieved/tv"
		);
		let posterPath = await processImageUrl(
			posterImage,
			"jpg",
			showSlug + "-poster",
			"./public/img/retrieved/tv"
		);
		movieDBSet[showName].cover_image = featPath;
		movieDBSet[showName].poster = posterPath;
		movieDBSet[showName].watchedDate = new Date("2023-12-01").toISOString();
		movieDBSet[showName].layout = "layouts/list-tv-film.njk";
		delete movieDBSet[showName].layouts;
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
		show.title = show.showName;
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
