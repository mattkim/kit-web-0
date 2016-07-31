import { SET_WINDOW_SIZE } from '../constants';

export function setWindowSize({ width, height, isMobile }) {
  return {
    type: SET_WINDOW_SIZE,
    payload: {
      width,
      height,
      isMobile,
    },
  };
}
