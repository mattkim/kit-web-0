import {
  ADD_FEED,
  SET_FEED,
} from '../constants';

export function setFeed({ feed }) {
  return {
    type: SET_FEED,
    payload: {
      feed,
    },
  };
}

export function addFeed({ singleFeed }) {
  console.log('**** addFeed');
  console.log(singleFeed);
  return {
    type: ADD_FEED,
    payload: {
      singleFeed,
    },
  };
}
