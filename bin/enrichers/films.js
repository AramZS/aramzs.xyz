const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
// Date,Name,Year,Letterboxd URI,Rating,Rewatch,Review,Tags,Watched Date
const films = fs.readFileSync(
	"./to-process/letterboxd/export/reviews.csv",
	"utf8"
);
const { processObjectToMarkdown } = require("../json-to-markdown");
const slugger = require("../slugger");
const csvParse = require("csv-parse/sync");
require("dotenv").config();

const cache = new ObjectCache("tmdb");
// https://developer.themoviedb.org/reference/intro/getting-started
let movieDBUrl = new URL("https://api.themoviedb.org/3/search/movie");
movieDBUrl.searchParams.append("api_key", process.env.TMDB_KEY);
movieDBUrl.searchParams.append("query", "Star Trek");

let movieDBSet = {};
let genreResult = new Promise((resolve, reject) => {
	resolve(true);
});
if (cache.has("movie")) {
	console.log("Found Cached Movie Data");
	movieDBSet = cache.get("movie");
}
let moviesGenresSet = { genres: [] };
if (cache.has("movie_genres")) {
	console.log("Found Cached Movie Genres Data");
	moviesGenresSet = cache.get("movie_genres");
	console.log("movie genres cached", moviesGenresSet);
} else {
	let movieDBTVGenreListUrl = new URL(
		"https://api.themoviedb.org/3/genre/movie/list"
	);
	movieDBTVGenreListUrl.searchParams.append("api_key", process.env.TMDB_KEY);
	genreResult = new Promise((resolve, reject) => {
		fetch(movieDBTVGenreListUrl.href)
			.then((response) => response.json())
			.then((data) => {
				console.log("movie genres response", data);
				cache.set("movie_genres", data);
				moviesGenresSet = data;
				resolve(moviesGenresSet);
			});
	});
}

const records = csvParse.parse(films, {
	columns: true,
	skip_empty_lines: true,
});
console.log("records", records);
const filmArray = records.map(async (line) => {
	let filmInfo = line;
	if (!filmInfo) {
		//return;
	} else {
		console.log("filmName", filmInfo);
	}
});

const writeFilms = async (filmPromiseArray) => {
	console.log("Writing Films");
	return;
};

module.exports = {
	writeFilms: async () => {
		var finishedArray = await Promise.all(filmArray);
		var result = await writeFilms(finishedArray);
		return result;
	},
};
