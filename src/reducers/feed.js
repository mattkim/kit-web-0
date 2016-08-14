import {
  ADD_FEED,
  SET_FEED,
  ADD_LOCAL_FEED,
  SET_LOCAL_FEED,
  LOCAL_FEED,
  FEED,
  ADD_COMMENT,
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

    case ADD_COMMENT: {
      const feedUUID = action.payload.feedUUID;
      const comment = action.payload.comment;
      const localFeed = state.localFeed;
      const newFeed = state.feed;

      console.log("add_comment");
      console.log(newFeed);

      // TODO: jeeze these are bad.  But I don't have a hashmap sad face

      for (const feedItem of newFeed) {
        if (feedItem) {
          if (feedItem.uuid === feedUUID) {
            if (!feedItem.comments) {
              feedItem.comments = [];
            }
            feedItem.comments.push(comment);
          }
        }
      }

      for (const feedItem of localFeed) {
        // TODO: for some reason local feed has undefined here.
        if (feedItem) {
          if (feedItem.uuid === feedUUID) {
            if (!feedItem.comments) {
              feedItem.comments = [];
            }
            feedItem.comments.push(comment);
          }
        }
      }

      localFeed.unshift(action.payload.singleFeed);
      return {
        ...state,
        [LOCAL_FEED]: localFeed,
        [FEED]: newFeed,
      };
    }

    default:
      return state;
  }
}
