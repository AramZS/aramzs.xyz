const comp         = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');


module.exports = {

  onPostBuild: async ({ inputs, constants, utils }) => {

    // Only continue in the selected deploy contexts
    if( !inputs.contexts.includes(process.env.CONTEXT) ) {
      console.log('Not minifiying HTML in the context:', process.env.CONTEXT);
      return;
    }
    let inputConfig = constants.PUBLISH_DIR + '/**/*.html';
    if (inputs?.inputOptions?.paths){
      console.log("input options are overriding the default input glob:", inputs.inputOptions);
      inputConfig = inputs.inputOptions.paths.map(path => path.replace("[DIRSUB]", constants.PUBLISH_DIR));
      console.log("input options are transformed to glob:", inputConfig);
    }

    // Minify HTML
    console.log('Minifiying HTML in the deploy context:', process.env.CONTEXT);
    const options = {
      collapseWhitespace: false,
      ...inputs.minifierOptions
    };
    console.log('Minifiying HTML with these options:', options || "Default");

    try {
      const compResult = await comp({
        compressor: htmlMinifier,
        input: inputConfig,
        output: '$1.html',
        replaceInPlace: true,
        options
      });
      console.log('Minifiying HTML complete');

    } catch (error) {
      utils.build.failPlugin('The Minify HTML plugin failed.', { error })
    }

  }

}
