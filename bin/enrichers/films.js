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
	/** 
	 *   {
    Date: '2021-12-01',
    Name: 'Bloody Hell',
    Year: '2020',
    'Letterboxd URI': 'https://boxd.it/2kkgM7',
    Rating: '3.5',
    Rewatch: '',
    Review: 'Tight, well put together film. A lot better than I expected and totally badly represented by the marketing.',
    Tags: '',
    'Watched Date': '2021-11-30'
  },
	*/
	let filmInfo = line;
	if (!filmInfo) {
		//return;
	} else {
		console.log("filmName", filmInfo);
		filmInfo.mediaName = filmInfo.Name;
		let mediaName = filmInfo.mediaName;
		movieDBUrl.searchParams.delete("query");
		movieDBUrl.searchParams.append("query", filmInfo.mediaName);
		await genreResult;
		if (
			mediaName in movieDBSet &&
			movieDBSet[mediaName].hasOwnProperty("genre_ids")
		) {
			let showData = movieDBSet[mediaName];
			const enrichedShowData = await moviePageBuild(mediaName, showData);
			return enrichedShowData;
		}
		let showFound = new Promise((resolve, reject) => {
			fetch(movieDBUrl.href)
				.then((response) => response.json())
				.then((data) => {
					console.log("film retrieved", mediaName, data.results);
					movieDBSet[mediaName] = data.results[0];
					cache.set("film", movieDBSet);
					resolve(data.results[0]);
				})
				.catch((e) => {
					console.log(
						"show retrieval failed for",
						movieDBUrl.href,
						e
					);
					reject(e);
				});
		});
		// movieDBSet[filmInfo.mediaName] =
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
