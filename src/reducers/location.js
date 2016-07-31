import {
  SET_LOCATION,
  ADDRESS,
  LAT,
  LONG,
} from '../constants';

export default function location(state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        [ADDRESS]: action.payload.address,
        [LAT]: action.payload.lat,
        [LONG]: action.payload.long,
      };
    default:
      return state;
  }
}
