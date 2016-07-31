import fetch from '../core/fetch';

async function getAddress(lat, long) {
  // TODO: move this into config.js
  const adr = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true`;
  const resp = await fetch(adr);
  if (resp.status !== 200) throw new Error(resp.statusText);
  const data = await await resp.json();
  if (!data) return undefined;
  return data.results[0].formatted_address;
}

async function handleLocation(position, callback) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const address = await getAddress(lat, long);
  const result = { lat, long, address };
  callback(result);
}

function getCurrentPosition(callback) {
  // TODO: create try-catch here.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      handleLocation(position, callback);
    });
  }
}

export { getCurrentPosition as default };
