import {
  SET_POKEMON_MAP,
  SET_POKEMON_NAMES,
} from '../constants';

export function setPokemonMap({ pokemonMap }) {
  return {
    type: SET_POKEMON_MAP,
    payload: {
      pokemonMap,
    },
  };
}

export function setPokemonNames({ pokemonNames }) {
  return {
    type: SET_POKEMON_NAMES,
    payload: {
      pokemonNames,
    },
  };
}
