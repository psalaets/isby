const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

// replace this with cssnano/postcss after eleventy adds supports for async
// shortcodes (maybe in 0.9.1)
const CleanCss = require('clean-css');

const postCssProcessor = postcss([
  autoprefixer
]);

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('tail', function(array, count) {
    return array.slice(-count);
  });

  eleventyConfig.addPairedShortcode('style', function(rawCss) {
    const prefixed = postCssProcessor.process(rawCss, {from: undefined}).css;
    const minified = new CleanCss({}).minify(prefixed).styles;

    return `<style>${minified}</style>`;
  });
};
