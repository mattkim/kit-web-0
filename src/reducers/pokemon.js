import {
  SET_POKEMON_MAP,
  SET_POKEMON_NAMES,
  POKEMON_MAP,
  POKEMON_NAMES,
} from '../constants';

export default function feed(state = {}, action) {
  switch (action.type) {
    case SET_POKEMON_MAP: {
      return {
        ...state,
        [POKEMON_MAP]: action.payload.pokemonMap,
      };
    }
    case SET_POKEMON_NAMES: {
      return {
        ...state,
        [POKEMON_NAMES]: action.payload.pokemonNames,
      };
    }

    default:
      return state;
  }
}
