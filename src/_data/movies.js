const movies = [
	// Crawl - https://letterboxd.com/aramzs/films/reviews/by/added/
	// {
	//   title: '',
	//   year: 2023,
	//   watchedDate: '2023-03-17',
	//   rewatch: false,
	//   review: '',
	//   rating: 5,
	//   imdb: ''
	// },
	{
		title: "Serenity",
		year: 2005,
		watchedDate: "2010-10-09",
		rewatch: false,
		review: "I am a leaf on the wind",
		rating: 4,
		imdb: "https://www.imdb.com/title/tt0379786/",
	},

	// {
	//   title: 'Everything Everywhere All at Once',
	//   year: 2022,
	//   watchedDate: '2023-03-17',
	//   rewatch: false,
	//   review: '',
	//   rating: 5,
	//   imdb: 'https://www.imdb.com/title/tt6710474/'
	// },

	// {
	//   title: '',
	//   year: 2023,
	//   watchedDate: '2023-03-17',
	//   rewatch: false,
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
