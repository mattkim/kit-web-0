import {
  SET_FEED_TAG_MAP,
  FEED_TAG_MAP,
} from '../constants';

export default function feedtagmap(state = {}, action) {
  switch (action.type) {
    case SET_FEED_TAG_MAP: {
      return {
        ...state,
        [FEED_TAG_MAP]: action.payload.feedTagMap,
      };
    }

    default:
      return state;
  }
}
