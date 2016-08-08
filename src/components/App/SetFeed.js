import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFeed } from '../../actions/feed';
import { setPokemonMap, setPokemonNames } from '../../actions/pokemon';
import { createSingleFeed } from '../../lib/feedutils';

class SetFeed extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    apiUrl: React.PropTypes.string,
    pokemonMap: React.PropTypes.object,
  };

  componentDidMount() {
    this.getAllPokemon(this.props.dispatch, this.props.apiUrl).then(() => {
      // First set all pokemon, then get feed.
      this.getFeed(this.props.dispatch, this.props.apiUrl);
    });
  }

  async getAllPokemon(dispatch, apiUrl) {
    const resp = await fetch(`${apiUrl}/allpokemon`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (resp.status !== 200) throw new Error(resp.statusText);
    // Weird but I have to await twice.
    const data = await await resp.json();
    if (!data) return undefined;

    const pmap = {};
    const pnames = [];

    for (const pokemon of data) {
      pmap[pokemon.name] = pokemon;
      pnames.push(pokemon.name);
    }

    dispatch(setPokemonMap({ pokemonMap: pmap }));

    pnames.sort();
    dispatch(setPokemonNames({ pokemonNames: pnames }));

    return data;
  }

  async getFeed(dispatch, apiUrl) {
    const resp = await fetch(`${apiUrl}/latestfeeds`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (resp.status !== 200) throw new Error(resp.statusText);
    // Weird but I have to await twice.
    const data = await await resp.json();
    if (!data) return undefined;

    const feeds = [];

    for (const d of data) {
      feeds.push(createSingleFeed(
        d.username,
        d.message,
        d.pokemon_name,
        d.lat,
        d.long,
        d.formatted_address,
        d.created_at,
        this.props.pokemonMap
      ));
    }

    dispatch(setFeed({ feed: feeds }));
    return data;
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiUrl: state.runtime.apiUrl,
    pokemonMap: state.pokemon.pokemonMap,
  };
}

export default connect(
  mapStateToProps
)(SetFeed);
