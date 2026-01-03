module.exports = {
	commit: {
		ref: process.env.COMMIT_REF || null,
		url: process.env.REPOSITORY_URL,
	},
	title: "Aram ZS | Digital Garden",
	description: "Microblog and feed from Aram Zucker-Scharff.",
	url: process.env.DOMAIN,  // "https://aramzs.xyz",
	feedUrl: process.env.DOMAIN + "/writing/feed.xml",
	author: {
		name: "Aram Zucker-Scharff",
    shortname: "Aram",
		email: "xyz@aramzs.me",
	},
  defaultSocialImage: "zs-favicon-1200-600.png"
};
