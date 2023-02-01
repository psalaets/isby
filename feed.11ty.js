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
    return data.entries
      .slice()
      // The entries array is in reverse chronological order but here need to
      // render oldest first
      .reverse()
      .map((item, index) => ({...item, guid: index}));
  },
  itemOptions(item) {
    return {
      guid: item.guid,
      title: item.answer,
      description: item.blurb || undefined,
      url: item.url || siteUrl,
      date: item.date
    };
  }
});
