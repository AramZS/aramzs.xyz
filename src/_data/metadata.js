let domain_name = "https://aramzs.xyz";

console.log('metadata data race condition resolution');

if (process.env.IS_LOCAL === "true") {
	domain_name = "http://localhost:8080";
	console.log("metadata Dev env domain");
}

module.exports = {
	commit: {
		ref: process.env.COMMIT_REF || null,
		url: process.env.REPOSITORY_URL,
	},
	title: "Aram ZS | Digital Garden",
	description: "Microblog and feed from Aram Zucker-Scharff.",
	url:  domain_name,  // "https://aramzs.xyz",
	feedUrl: domain_name + "/writing/feed.xml",
	author: {
		name: "Aram Zucker-Scharff",
    shortname: "Aram",
		email: "xyz@aramzs.me",
	},
  defaultSocialImage: "zs-favicon-1200-600.png"
};
