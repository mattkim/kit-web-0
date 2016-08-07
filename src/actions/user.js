import { SET_USER, SET_GET_USER_EXECUTED } from '../constants';

export function setUser({ user }) {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}

export function setGetUserExecuted({ getUserExecuted }) {
  return {
    type: SET_GET_USER_EXECUTED,
    payload: {
      getUserExecuted,
    },
  };
}
