import { SET_FEED } from '../constants';

export function setFeed({ feed }) {
  return {
    type: SET_FEED,
    payload: {
      feed,
    },
  };
}
