module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('tail', function(array, count) {
    return array.slice(-count);
  });
};
