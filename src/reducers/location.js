import {
  SET_LOCATION,
  LAT,
  LONG,
  GEOCODES,
} from '../constants';

export default function location(state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        [LAT]: action.payload.lat,
        [LONG]: action.payload.long,
        [GEOCODES]: action.payload.geocodes,
      };
    default:
      return state;
  }
}
