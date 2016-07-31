import {
  ADD_FEED,
  SET_FEED,
  FEED,
} from '../constants';

export default function feed(state = {}, action) {
  switch (action.type) {
    case SET_FEED: {
      return {
        ...state,
        [FEED]: action.payload.feed,
      };
    }

    case ADD_FEED: {
      const newFeed = state.feed;
      newFeed.unshift(action.payload.singleFeed);
      return {
        ...state,
        [FEED]: newFeed,
      };
    }
    default:
      return state;
  }
}
