import {
  SET_POKEMON_NAMES,
} from '../constants';

export function setPokemonNames({ pokemonNames }) {
  return {
    type: SET_POKEMON_NAMES,
    payload: {
      pokemonNames,
    },
  };
}
