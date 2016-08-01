import { getNowISOStr } from './dateutils';

function createSingleFeed(userID, username, message, pokemon, lat, long, address) {
  const now = getNowISOStr();
  return {
    created_at_date: now,
    created_by_user_uuid: null, // TODO: need to pass in the user.
    created_by_user_id: userID,
    deleted_at_date: null,
    formatted_address: address,
    lat,
    long,
    message,
    pokemon,
    // TODO: need to fetch image url from global map.
    pokemon_image_url: 'http://static.giantbomb.com/uploads/scale_small/0/6087/2438704-1202149925_t.png',
    updated_at_date: now,
    username, // TODO: need to pass in when user is available
    uuid: null, // TODO: auto generated id, only exists after sending to backend.
  };
}

export { createSingleFeed };
