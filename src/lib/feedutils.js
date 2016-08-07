import { getNowISOStr } from './dateutils';

function addMapProps(feed, pokemonMap) {
  const newFeed = feed;
  const pokemon = pokemonMap[newFeed.pokemon];
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
  pokemon,
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
    pokemon,
    username,
    formatted_address: formattedAddress,
  };

  return addMapProps(feed, pokemonMap);
}

export { createSingleFeed };
