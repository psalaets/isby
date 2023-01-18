const createRssFeed = require('eleventy-rss-helper');

const siteUrl = 'https://issagabackyet.com';
const feedPath = '/feed.xml';
const feedUrl = `${siteUrl}${feedPath}`;

module.exports = createRssFeed({
  permalink: feedPath,
  feedOptions() {
    return {
      title: 'Is Saga back yet?',
      description: 'Status updates for Saga comic',
      feed_url: feedUrl,
      site_url: siteUrl
    };
  },
  items(_collections, data) {
    // 5 most recent updates
    const entryCount = 5;
    return data.entries.slice(0, entryCount);
  },
  itemOptions(item) {
    return {
      title: item.answer,
      description: item.blurb || undefined,
      url: item.url || siteUrl,
      date: item.date
    };
  }
});
