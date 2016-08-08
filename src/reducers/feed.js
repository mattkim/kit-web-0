import {
  ADD_FEED,
  SET_FEED,
  ADD_LOCAL_FEED,
  SET_LOCAL_FEED,
  LOCAL_FEED,
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

    case SET_LOCAL_FEED: {
      return {
        ...state,
        [LOCAL_FEED]: action.payload.localFeed,
      };
    }

    case ADD_LOCAL_FEED: {
      const localFeed = state.localFeed;
      localFeed.unshift(action.payload.singleFeed);
      return {
        ...state,
        [LOCAL_FEED]: localFeed,
      };
    }

    default:
      return state;
  }
}
