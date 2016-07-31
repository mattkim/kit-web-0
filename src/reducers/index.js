import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import location from './location';
import window from './window';
import feed from './feed';

export default combineReducers({
  runtime,
  intl,
  location,
  window,
  feed,
});
