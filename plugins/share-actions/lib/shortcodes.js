const { js } = require("./client-activation");
const shareComponent = require("./share-component");


module.exports = {
  activateShortcodes: function (eleventyConfig, options) {
    const shortcodes = {
      sharebutton: (url, text) => {
        return shareComponent(options.domain + url, text ? text : options.defaultShareText);
      },
      sharejs: function(){
        return `<script>${js()}</script>`;
      },
    }
    Object.keys(shortcodes).forEach((shortCodeName) => {
      eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
    });
  }
}
