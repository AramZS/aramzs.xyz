const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
// Date,Name,Year,Letterboxd URI,Rating,Rewatch,Review,Tags,Watched Date

async function fetchWithBackoff(url, retries = 1, delay = 1000) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed');
    return response;
  } catch (error) {
    if (retries === 0) throw new Error(`Fetch failed after ${retries} retries`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithBackoff(url, retries - 1, delay * 2);
  }
}

const films = fs.readFileSync(
	"./to-process/letterboxd/export/reviews.csv",
	"utf8"
);
const { processObjectToMarkdown } = require("../json-to-markdown");
const slugger = require("../slugger");
const csvParse = require("csv-parse/sync");
require("dotenv").config();

const cache = new ObjectCache("tmdb-films");
// https://developer.themoviedb.org/reference/intro/getting-started
let movieDBUrl = new URL("https://api.themoviedb.org/3/search/movie");
movieDBUrl.searchParams.append("api_key", process.env.TMDB_KEY);
movieDBUrl.searchParams.append("query", "Star Trek");

let movieDBSet = {};
let genreResult = new Promise((resolve, reject) => {
	resolve(true);
});
if (cache.has("movie")) {
	// cache.set("movie", {});
	console.log("Found Cached Movie Data");
	movieDBSet = cache.get("movie");
	console.log("Cached Movie Data", movieDBSet);
}
let moviesGenresSet = { genres: [] };
if (cache.has("movie_genres")) {
	console.log("Found Cached Movie Genres Data");
	moviesGenresSet = cache.get("movie_genres");
	console.log("movie genres cached", moviesGenresSet);
} else {
	let movieDBFilmGenreListUrl = new URL(
		"https://api.themoviedb.org/3/genre/movie/list"
	);
	movieDBFilmGenreListUrl.searchParams.append(
		"api_key",
		process.env.TMDB_KEY
	);
	genreResult = new Promise((resolve, reject) => {
		fetchWithBackoff(movieDBFilmGenreListUrl.href)
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

const moviePageBuild = async (mediaName, showData) => {
	console.log("film object found", mediaName);
	const imagePath = "https://image.tmdb.org/t/p/original";
	let tags = [];
	if (showData.hasOwnProperty("genre_ids")) {
		console.log("film no genre IDs found", mediaName, showData);
	}
	tags = showData.genre_ids && showData.genre_ids.reduce(
		(accumulator, genre) => {
			let genreObj = moviesGenresSet.genres.find(
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
		["list/film-and-tv", "list/film"]
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
		"./public/img/retrieved/film"
	);
	let posterPath = await processImageUrl(
		posterImage,
		"jpg",
		showSlug + "-poster",
		"./public/img/retrieved/film"
	);
	showData.cover_image = featPath;
	showData.poster = posterPath;
	showData.title = showData.title.replaceAll(/^"|"$/gm, "");
	showData.mediaName = showData.mediaName.replaceAll(/^"|"$/gm, "");
	// Enforce particular requirements for the output
	if (!showData.hasOwnProperty("watchedDate")) {
		showData.watchedDate = new Date("2023-12-01").toISOString();
	}
	if (showData.hasOwnProperty("Watched Date")) {
		showData.watchedDate = new Date(showData["Watched Date"]).toISOString();
		delete showData["Watched Date"];
	}
	if (!showData.hasOwnProperty("year")) {
		let first_air_date = new Date(showData.Date);
		showData.year = first_air_date.getFullYear();
	}
	if (showData.hasOwnProperty("Year")) {
		showData.year = showData.Year;
		delete showData["Year"];
	}
	if (!showData.hasOwnProperty("date")) {
		showData.date = new Date().toISOString();
	}
	if (showData.hasOwnProperty("Date")) {
		showData.date = new Date(showData["Date"]).toISOString();
		delete showData["Date"];
	}
	if (showData.hasOwnProperty("Rating")) {
		showData.rating = showData["Rating"];
		delete showData["Rating"];
	}
	console.log("showData rating", showData.rating);
	if (!showData.hasOwnProperty("rewatch")) {
		showData.rewatch = false;
	}
	if (showData.hasOwnProperty("Rewatch") && showData["Rewatch"] !== "") {
		showData.rewatch = showData.Rewatch;
	} else if (showData.hasOwnProperty("Rewatch")) {
		delete showData["Rewatch"];
	}
	if (showData.hasOwnProperty("Letterboxd URI")) {
		showData.letterboxd = showData["Letterboxd URI"];
		delete showData["Letterboxd URI"];
	}
	// showData.layout = "layouts/list-tv-film.njk";
	delete showData.layouts;
	delete showData.layout;
	delete showData.Tags;
	delete showData.Name;
	return { mediaName, ...showData };
};

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
		return;
	} else {
		console.log("filmName", filmInfo);
		filmInfo.mediaName = filmInfo.Name.replaceAll(/^"|"$/gm, "");
		let mediaName = filmInfo.Name.replaceAll(/^"|"$/gm, "");
		await genreResult;
		if (
			mediaName in movieDBSet &&
			movieDBSet[mediaName].hasOwnProperty("genre_ids")
		) {
			let showData = movieDBSet[mediaName];
			let finalShowData = { ...filmInfo, ...showData };
			const enrichedShowData = await moviePageBuild(
				mediaName,
				finalShowData
			);
			console.log(
				"film retrieved from cache",
				mediaName,
				enrichedShowData
			);
			return enrichedShowData;
		}
		let showFound = new Promise((resolve, reject) => {
			movieDBUrl.searchParams.delete("query");
			movieDBUrl.searchParams.delete("year");
			movieDBUrl.searchParams.append("query", mediaName);
			movieDBUrl.searchParams.append("year", filmInfo.Year);
			fetchWithBackoff(movieDBUrl.href)
				.then((response) => response.json())
				.then((data) => {
					if (data && data.results && data.results.length) {
						console.log(
							"film retrieved from db query",
							JSON.stringify(movieDBUrl.href),
							mediaName,
							data.results[0]
						);
						movieDBSet[mediaName] = {
							...filmInfo,
							...data.results[0],
						};
						cache.set("movie", movieDBSet);
						resolve(movieDBSet[mediaName]);
					} else {
						console.log("No film found", mediaName, data);
						resolve({ ...filmInfo, mediaName });
					}
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
		try {
			let showFoundData = await showFound;
			const enrichedShowData = await moviePageBuild(
				mediaName,
				showFoundData
			);
			return enrichedShowData;
		} catch (error) {
			console.log(
				"film show retrieval and processing failed",
				mediaName,
				error
			);
			return { mediaName };
		}
		// movieDBSet[filmInfo.mediaName] =
	}
});

const writeFilms = async (filmPromiseArray) => {
	console.log("Writing Films");
	const films = await Promise.all(filmPromiseArray);
	films.forEach((show) => {
		if (
			typeof show == "undefined" ||
			!show ||
			!show.hasOwnProperty("mediaName")
		) {
			console.log("show has no name", show);
			return;
		}
    if (
			!show.hasOwnProperty("tags")
		) {
			console.log("show has no tags", show);
			return;
		}
		show.rating = show.rating ? Number(show.rating) : false;
		show.title = show.mediaName;
		console.log("show", show.mediaName);
		processObjectToMarkdown(
			"mediaName",
			"Review",
			"./src/content/resources/film",
			show
		);
	});
	return "./src/content/resources/film";
};

module.exports = {
	writeFilms: async () => {
		var finishedArray = await Promise.all(filmArray);
		var result = await writeFilms(finishedArray);
		return result;
	},
};
