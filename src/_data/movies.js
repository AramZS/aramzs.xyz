const movies = [
	// Crawl - https://letterboxd.com/aramzs/films/reviews/by/added/
	// {
	//   title: '',
	//   year: 2023,
	//   watchedDate: '2023-03-17',
	//   reWatch: false,
	//   review: '',
	//   rating: 5,
	//   imdb: ''
	// },

	{
		title: "Enola Holmes 2",
		year: 2023,
		watchedDate: "2023-02-03",
		reWatch: false,
		review: "It had me in the second half",
		rating: 4,
		imdb: "https://www.imdb.com/title/tt14641788/",
	},

	{
		title: "Space Sweepers",
		year: 2021,
		watchedDate: "2021-02-07",
		reWatch: false,
		review: "Absolutely in love with this films aesthetic",
		rating: 5,
		imdb: "https://www.imdb.com/title/tt12838766/",
	},

	{
		title: "Enola Holmes",
		year: 2020,
		watchedDate: "2020-09-22",
		reWatch: false,
		review: "Much more than just a female Sherlock Holmes",
		rating: 4,
		imdb: "https://www.imdb.com/title/tt7846844/",
	},

	{
		title: "Blade Runner 2049",
		year: 2017,
		watchedDate: "2019-12-07",
		reWatch: false,
		review: "Harrison Ford has aged like a fine wine",
		rating: 4,
		imdb: "https://www.imdb.com/title/tt1856101/",
	},

	{
		title: "Serenity",
		year: 2005,
		watchedDate: "2019-10-09",
		reWatch: false,
		review: "I am a leaf on the wind",
		rating: 4,
		imdb: "https://www.imdb.com/title/tt0379786/",
	},

	{
		title: "Deadpool 2",
		year: 2018,
		watchedDate: "2023-04-28",
		reWatch: false,
		review: "A good guy in red",
		rating: 4,
		imdb: "https://www.imdb.com/title/tt5463162/",
	},

	// {
	//   title: 'Everything Everywhere All at Once',
	//   year: 2022,
	//   watchedDate: '2023-03-17',
	//   reWatch: false,
	//   review: '',
	//   rating: 5,
	//   imdb: 'https://www.imdb.com/title/tt6710474/'
	// },

	// {
	//   title: '',
	//   year: 2023,
	//   watchedDate: '2023-03-17',
	//   reWatch: false,
	//   review: '',
	//   rating: 5,
	//   imdb: ''
	// },
];

module.exports = movies
	.map((movie) => {
		return {
			...movie,
			watchedDate: new Date(Date.parse(movie.watchedDate)),
		};
	})
	.sort((a, b) => {
		return b.watchedDate - a.watchedDate;
	});
