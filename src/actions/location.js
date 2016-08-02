import { SET_LOCATION } from '../constants';

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
