import { getNowISOStr } from './dateutils';

function createSingleFeed(username, message, pokemon, lat, long, formattedAddress) {
  const now = getNowISOStr();
  return {
    created_at_date: now,
    lat,
    long,
    message,
    pokemon,
    pokemon_image_url: 'http://static.giantbomb.com/uploads/scale_small/0/6087/2438704-1202149925_t.png',
    updated_at_date: now,
    username,
    formatted_address: formattedAddress,
  };
}

export { createSingleFeed };
