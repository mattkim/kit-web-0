import {
  SET_USER,
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
    default:
      return state;
  }
}
