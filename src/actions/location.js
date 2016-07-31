import { SET_LOCATION } from '../constants';

export function setLocation({ lat, long, address }) {
  return {
    type: SET_LOCATION,
    payload: {
      lat,
      long,
      address,
    },
  };
}
