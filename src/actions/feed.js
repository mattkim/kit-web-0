import {
  ADD_FEED,
  SET_FEED,
  ADD_LOCAL_FEED,
  SET_LOCAL_FEED,
  ADD_COMMENT,
} from '../constants';

export function setFeed({ feed }) {
  return {
    type: SET_FEED,
    payload: {
      feed,
    },
  };
}

export function setLocalFeed({ localFeed }) {
  return {
    type: SET_LOCAL_FEED,
    payload: {
      localFeed,
    },
  };
}

export function addFeed({ singleFeed }) {
  return {
    type: ADD_FEED,
    payload: {
      singleFeed,
    },
  };
}

export function addLocalFeed({ singleFeed }) {
  return {
    type: ADD_LOCAL_FEED,
    payload: {
      singleFeed,
    },
  };
}

export function addComment({ feedUUID, comment }) {
  console.log('addComment');
  console.log(comment);
  console.log(feedUUID);
  return {
    type: ADD_COMMENT,
    payload: {
      feedUUID,
      comment,
    },
  };
}
