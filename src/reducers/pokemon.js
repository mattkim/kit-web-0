import {
  SET_POKEMON_NAMES,
  POKEMON_NAMES,
} from '../constants';

export default function feed(state = {}, action) {
  switch (action.type) {
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
