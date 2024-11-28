let plugins = [
    require('postcss-import'),
    require('autoprefixer'),
];

if (process.env.ELEVENTY_ENV === 'production') {
    // These all take time to process and are best done in production only.
    plugins = [
      ...plugins,
        require('@fullhuman/postcss-purgecss')({
            content: [
                './**/*.html',
                './**/*.njk',
                './**/*.js',
                './**/*.md',
            ],
            safelist: [
                /^theme-/
            ]
        }),
        require('postcss-minify'),
    ];
}
// everything other than plugins here gets passed in as `options`. 
module.exports = {
    plugins,
    configLocation: './postcss.config.js',
    env: process.env.ELEVENTY_ENV
};
