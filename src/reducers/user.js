import {
  SET_USER,
  SET_GET_USER_EXECUTED,
  GET_USER_EXECUTED,
  USER,
} from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        [USER]: action.payload.user,
      };
    }
    case SET_GET_USER_EXECUTED: {
      return {
        ...state,
        [GET_USER_EXECUTED]: action.payload.getUserExecuted,
      };
    }
    default:
      return state;
  }
}
