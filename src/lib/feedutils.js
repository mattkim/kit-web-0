import { getNowISOStr } from './dateutils';

function createSingleFeed(
  feedUUID,
  username,
  message,
  feedTags,
  comments,
  lat,
  long,
  formattedAddress,
  createdAt,
) {
  let newCreatedAt = createdAt;
  let newComments = comments;
  let newFeedTags = feedTags;

  if (!newCreatedAt) {
    newCreatedAt = getNowISOStr();
  }

  if (!newComments) {
    newComments = [];
  }

  if (!newFeedTags) {
    newFeedTags = [];
  }

  const feed = {
    uuid: feedUUID,
    created_at: newCreatedAt,
    lat,
    long,
    message,
    username,
    feedTags: newFeedTags,
    comments: newComments,
    formatted_address: formattedAddress,
  };

  return feed;
}

async function getFeedByLocation(apiUrl, lat, long, latRadius, longRadius) {
  const resp = await fetch(`${apiUrl}/getfeeds?lat=${lat}&long=${long}&latRadius=${latRadius}&longRadius=${longRadius}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status !== 200) throw new Error(resp.statusText);
  // Weird but I have to await twice.
  const data = await await resp.json();
  if (!data) return undefined;

  const feeds = [];

  for (const d of data) {
    feeds.push(createSingleFeed(
      d.uuid,
      d.username,
      d.message,
      d.feed_tags,
      d.comments,
      d.lat,
      d.long,
      d.formatted_address,
      d.created_at,
    ));
  }

  return feeds;
}

async function getLatestFeeds(apiUrl) {
  const resp = await fetch(`${apiUrl}/latestfeeds`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status !== 200) throw new Error(resp.statusText);
  // Weird but I have to await twice.
  const data = await await resp.json();
  if (!data) return undefined;

  const feeds = [];

  for (const d of data) {
    feeds.push(createSingleFeed(
      d.uuid,
      d.username,
      d.message,
      d.feed_tags,
      d.comments,
      d.lat,
      d.long,
      d.formatted_address,
      d.created_at,
    ));
  }

  return feeds;
}

export { createSingleFeed, getFeedByLocation, getLatestFeeds };
