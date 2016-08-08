import {
  SET_LOCATION,
  SET_LOCATION_ERROR,
  LOCATION_ERROR,
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
    case SET_LOCATION_ERROR:
      return {
        ...state,
        [LOCATION_ERROR]: action.payload.locationError,
      };
    default:
      return state;
  }
}
