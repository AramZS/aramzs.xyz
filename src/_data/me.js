let data = {
	name: "Aram Zucker-Scharff",
	aboutMePage: "https://aramzs.github.io/aramzs/",
	rels: [
		{ href: "https://aramzs.glitch.me/", title: "Link in Glitch" },
		{
			href: "https://indieweb.social/@Chronotope",
			title: "Mastodon: IndieWeb",
		},
		{ href: "https://cohost.org/Chronotope", title: "Cohost" },
		{ href: "https://github.com/aramzs", title: "GitHub" },
		{ href: "https://twitter.com/chronotope", title: "Twitter" },
		{ href: "https://keybase.io/aramzs", title: "Keybase" },
    { href: "https://bsky.app/profile/chronotope.aramzs.xyz", title: "BlueSky" },
	],
	twitter: "@chronotope",
};

data.avatar = `/img/twitter-avy.jpg`;

module.exports = (info) => {
	return data;
};
