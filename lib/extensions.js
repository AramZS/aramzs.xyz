const cssHandler = {
  outputFileExtension: 'css',
  compile: async (inputContent, inputPath) => {
    if (inputPath !== './src/styles/main.css') {
      return;
    }

    return async () => {
      const postcss = require('postcss');
      // https://github.com/postcss/postcss-load-config
      const postcssrc = require('postcss-load-config');
      console.log('postcssrc', postcssrc);
      // https://github.com/11ty/eleventy/discussions/2388
      let cssPromise = new Promise((resolve, reject) => {
        postcssrc().then(({ plugins, options }) => {
          console.log('pcss plugins', plugins);
          options.from = inputPath;
          console.log('pcss options', options);
          postcss(plugins)
            .process(inputContent, options)
            .then((result) => {
              resolve(result.css)
            })
        })
      });
      const cssResult = await cssPromise;
      // console.log('cssResult', cssResult);
      // debugger;
      return cssResult;

      let output = await postcss([
        pimport,
        autoprefixer,
        csso
      ]).process(inputContent, { from: inputPath });
    }
  }
};


module.exports = {
  css: cssHandler
}
