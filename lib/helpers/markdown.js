const { slugify } = require("../filters");
const { setupMarkdownIt } = require("./hashtags");
var mila = require("markdown-it-link-attributes");

const markdown = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true, // https://github.com/markdown-it/linkify-it
});

markdown.use(require("markdown-it-anchor"), {
	permalink: false,
	slugify: (input) => slugify(input.toLowerCase().replace(/"/g, "")),
});

markdown.use(require("markdown-it-replace-link"), {
    processHTML: false, // defaults to false for backwards compatibility
    replaceLink: function (link, env, token, htmlToken) {
      if (!link.match(/^https?:\/\//) && link.startsWith("/")) {
        return process.env.DOMAIN+link;
      } else {
        return link;
      }
    }
})

markdown.use(require("markdown-it-todo"));
markdown.use(require("./markdown-it-codeblocks-skip-links"));

let milaOptions = [
	{
		matcher(href) {
			return !href.startsWith(process.env.DOMAIN) && href.match(/^https?:\/\//);
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
