module.exports = {
	commit: {
		ref: process.env.COMMIT_REF || null,
		url: process.env.REPOSITORY_URL,
	},
	title: "Aram ZS | Digital Garden",
	description: "Microblog and feed from Aram Zucker-Scharff.",
	url: "https://aramzs.xyz",
	feedUrl: "https://aramzs.xyz/writing/feed.xml",
	author: {
		name: "Aram Zucker-Scharff",
    shortname: "Aram",
		email: "aramzs@hacktext.com",
	},
};
