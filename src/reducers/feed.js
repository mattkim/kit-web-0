import {
  SET_FEED,
  FEED,
} from '../constants';

export default function feed(state = {}, action) {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        [FEED]: action.payload.feed,
      };
    default:
      return state;
  }
}
