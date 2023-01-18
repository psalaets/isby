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
    const entryCount = 5;
    // 5 most recent updates
    return data.entries
      .slice()
      .reverse()
      .map((item, index) => ({...item, guid: index}))
      .slice(-entryCount);
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
