import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import location from './location';
import window from './window';
import feed from './feed';
import pokemon from './pokemon';
import user from './user';

export default combineReducers({
  runtime,
  intl,
  location,
  window,
  feed,
  pokemon,
  user,
});
