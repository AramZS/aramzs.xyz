const htmlmin = require('html-minifier');

const htmlmin = (content, outputPath) => {
  if (
      process.env.ELEVENTY_ENV === 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
  ) {
      return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
      });
  }
  return content
}

module.exports = {

}
