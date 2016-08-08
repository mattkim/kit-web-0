import { SET_LOCATION, SET_LOCATION_ERROR } from '../constants';

export function setLocation({ lat, long, geocodes }) {
  return {
    type: SET_LOCATION,
    payload: {
      lat,
      long,
      geocodes,
    },
  };
}

export function setLocationError({ locationError }) {
  return {
    type: SET_LOCATION_ERROR,
    payload: {
      locationError,
    },
  };
}
