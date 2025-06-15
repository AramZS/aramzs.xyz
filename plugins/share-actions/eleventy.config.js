const { activateShortcodes } = require("./lib/shortcodes");

module.exports = {
  configFunction: function (eleventyConfig, options = {}) {
    options = Object.assign({
      defaultUtms: [],
      defaultShareText:  "Copy this link to share with your friends.",
      domain: ""
    }, options);
  
    eleventyConfig.addPlugin(function(eleventyConfig) {
      // I am a plugin!
      activateShortcodes(eleventyConfig, options);
    });
	},
}
