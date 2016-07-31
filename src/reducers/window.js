import {
  SET_WINDOW_SIZE,
  WIDTH,
  HEIGHT,
  ISMOBILE,
} from '../constants';

export default function window(state = {}, action) {
  switch (action.type) {
    case SET_WINDOW_SIZE:
      return {
        ...state,
        [WIDTH]: action.payload.width,
        [HEIGHT]: action.payload.height,
        [ISMOBILE]: action.payload.isMobile,
      };
    default:
      return state;
  }
}
