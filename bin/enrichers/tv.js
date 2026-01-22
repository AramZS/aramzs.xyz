const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
const tv = fs.readFileSync("./bin/enrichers/tv.txt", "utf8");
const { processObjectToMarkdown } = require("../json-to-markdown");
const slugger = require("../slugger");
require("dotenv").config();

const cache = new ObjectCache("tmdb-tv");
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

const tvPageBuild = async (mediaName, showData) => {
	console.log("tv cache found", mediaName);
	const imagePath = "https://image.tmdb.org/t/p/original/";
	let tags = [];
	if (showData.hasOwnProperty("genre_ids")) {
		console.log("tv no genre IDs found", mediaName, showData);
	}
	tags = showData.genre_ids.reduce(
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
	showData.tags = tags;
	console.log("genre tag set", tags);
	if (tags.length < 1) {
		console.log("no tags", showData);
	}
	let featuredImage = imagePath + showData.backdrop_path;
	let posterImage = imagePath + showData.poster_path;

	let showSlug = slugger(mediaName);
	showData.slug = showSlug;
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
	showData.cover_image = featPath;
	showData.poster = posterPath;

	// Enforce particular requirements for the output
	if (!showData.hasOwnProperty("watchedDate")) {
		showData.watchedDate = new Date("2023-12-01").toISOString();
	}
	if (!showData.hasOwnProperty("year")) {
		let first_air_date = new Date(showData.first_air_date);
		showData.year = first_air_date.getFullYear();
	}
	if (!showData.hasOwnProperty("date")) {
		showData.date = new Date().toISOString();
	}
	if (!showData.hasOwnProperty("rewatch")) {
		showData.rewatch = false;
	}
	// showData.layout = "layouts/list-tv-film.njk";
	delete showData.layouts;
	delete showData.layout;
	return { mediaName, ...showData };
};

const grabShow = async (line) => {
	let mediaName = line;
	if (mediaName === "") {
		return;
	}
	await genreResult;
	if (
		mediaName in movieDBSet &&
		movieDBSet[mediaName].hasOwnProperty("genre_ids")
	) {
		let showData = movieDBSet[mediaName];
		const enrichedShowData = await tvPageBuild(mediaName, showData);
		return enrichedShowData;
	}
	let showFound = new Promise((resolve, reject) => {
    movieDBUrl.searchParams.delete("query");
    movieDBUrl.searchParams.append("query", mediaName);
		fetch(movieDBUrl.href)
			.then((response) => response.json())
			.then((data) => {
				console.log("tv retrieved", mediaName, data.results);
				movieDBSet[mediaName] = data.results[0];
				cache.set("tv", movieDBSet);
				resolve(data.results[0]);
			})
			.catch((e) => {
				console.log("show retrieval failed for", movieDBUrl.href, e);
				reject(e);
			});
	});
	try {
		let showFoundData = await showFound;
		const enrichedShowData = await tvPageBuild(mediaName, showFoundData);
		return enrichedShowData;
	} catch (error) {
		console.log(
			"tv show retrieval and processing failed",
			mediaName,
			error
		);
		return { mediaName };
	}
}


const writeTVShows = async (tvPromiseArray) => {
	
  const tvArray = tv.split("\n").map(grabShow);
  console.log("Writing TV Shows");
	const tvShows = await Promise.all(tvPromiseArray);
	const paths = tvShows.map((show) => {
		if (
			typeof show == "undefined" ||
			!show ||
			!show.hasOwnProperty("mediaName")
		) {
			console.log("show has no name", show);
			return;
		}
		show.rating = false;
		show.title = show.mediaName;
    if (show.hasOwnProperty("titleOverride")) {
      show.title = show.titleOverride;
      delete show.titleOverride;
    }
		console.log("show", show.mediaName);
		processObjectToMarkdown(
			"mediaName",
			false,
			"./src/content/resources/tv",
			show
		);
    return "./src/content/resources/tv/"+show.mediaName+".md";
	});
	return paths;
};

// await Promise.all(tvArray);
// writeTVShows(tvArray);
// module.exports = writeTVShows(tvArray);

module.exports = {
	writeTVShows: async (tvShows) => {
    if (!tvShows || tvShows.length === 0) {
		    var finishedArray = await Promise.all(tvArray);
        tvShows = tvArray;
    }
		var result = await writeTVShows(tvShows);
		return result;
	},
  grabShow,
};
