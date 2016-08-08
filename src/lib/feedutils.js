import { getNowISOStr } from './dateutils';

function addMapProps(feed, pokemonMap) {
  const newFeed = feed;
  const pokemon = pokemonMap[newFeed.pokemon_name];
  // Just incase this pokemon does not exist.
  if (pokemon) {
    newFeed.pokemon_image_url = pokemon.image_url;
    newFeed.pokemon_display_name = pokemon.display_name;
  }

  return newFeed;
}

function createSingleFeed(
  username,
  message,
  pokemonName,
  lat,
  long,
  formattedAddress,
  createdAt,
  pokemonMap
) {
  let newCreatedAt = createdAt;

  if (!newCreatedAt) {
    newCreatedAt = getNowISOStr();
  }

  const feed = {
    created_at: newCreatedAt,
    lat,
    long,
    message,
    pokemon_name: pokemonName,
    username,
    formatted_address: formattedAddress,
  };

  return addMapProps(feed, pokemonMap);
}

async function getFeedByLocation(apiUrl, lat, long, latRadius, longRadius, pokemonMap) {
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
      d.username,
      d.message,
      d.pokemon_name,
      d.lat,
      d.long,
      d.formatted_address,
      d.created_at,
      pokemonMap,
    ));
  }

  return feeds;
}

async function getLatestFeeds(apiUrl, pokemonMap) {
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
      d.username,
      d.message,
      d.pokemon_name,
      d.lat,
      d.long,
      d.formatted_address,
      d.created_at,
      pokemonMap,
    ));
  }

  return feeds;
}

export { createSingleFeed, getFeedByLocation, getLatestFeeds };
