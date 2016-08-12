import {
  SET_FEED_TAG_MAP,
} from '../constants';

export function setFeedTagMap({ feedTagMap }) {
  return {
    type: SET_FEED_TAG_MAP,
    payload: {
      feedTagMap,
    },
  };
}
