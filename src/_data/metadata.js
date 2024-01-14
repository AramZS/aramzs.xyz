module.exports = {
	commit: {
		ref: process.env.COMMIT_REF || null,
		url: process.env.REPOSITORY_URL,
	},
	title: "Aram ZS | Blog",
	description: "Microblog and feed from Aram Zucker-Scharff.",
	url: "https://aramzs.xyz",
	feedUrl: "https://aramzs.xyz/writing/feed.xml",
	author: {
		name: "Aram Zucker-Scharff",
		email: "aramzs@hacktext.com",
	},
};
