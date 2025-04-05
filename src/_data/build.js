const shareActions = require("../../plugins/share-actions");

module.exports = {
	env: process.env.ELEVENTY_ENV,
	timestamp: new Date(),
	bookwyrm: {
		username: "aramzs",
		instance: "bookwyrm.tilde.zone",
	},
  footerInlineScript: `<script>${shareActions.js()}</script>`,
};
