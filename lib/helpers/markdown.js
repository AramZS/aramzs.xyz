const { slugify } = require("../filters");
const { setupMarkdownIt } = require("./hashtags");
var mila = require("markdown-it-link-attributes");

const markdown = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true,
});

markdown.use(require("markdown-it-anchor"), {
	permalink: false,
	slugify: (input) => slugify(input.toLowerCase().replace(/"/g, "")),
});

markdown.use(require("markdown-it-replace-link"));
markdown.use(require("markdown-it-todo"));
markdown.use(require("./markdown-it-codeblocks-skip-links"));

let milaOptions = [
	{
		matcher(href) {
			return href.match(/^https?:\/\//);
		},
		attrs: {
			class: "external-link",
			target: "_blank",
		},
	},
];

markdown.use(mila, milaOptions);

markdown.use(require("markdown-it-footnote"));

// TODO: Move hashtags to plugin...
setupMarkdownIt(markdown);

module.exports = markdown;
