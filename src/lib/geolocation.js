import fetch from '../core/fetch';

async function geocode(lat, long) {
  // TODO: move this into config.js
  const adr = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true`;
  const resp = await fetch(adr);
  if (resp.status !== 200) throw new Error(resp.statusText);
  const data = await await resp.json();
  if (!data) return undefined;
  return data.results;
}

async function handleLocation(position, callback) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const geocodes = await geocode(lat, long);
  const result = { lat, long, geocodes };
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

function getFormattedAddressByType(geocodes, type) {
  if (!geocodes) {
    return null;
  }

  console.log(type);
  console.log(geocodes);

  for (const g of geocodes) {
    for (const t of g.types) {
      if (t === type) {
        return g.formatted_address;
      }
    }
  }

  // Default to the first one
  return geocodes[0].formatted_address;
}

function getFormattedAddressDefault(geocodes) {
  if (!geocodes) {
    return null;
  }

  // Default to the first one
  return geocodes[0].formatted_address;
}

export { getCurrentPosition as default, getFormattedAddressByType, getFormattedAddressDefault };
