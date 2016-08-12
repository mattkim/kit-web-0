import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFeed, setLocalFeed } from '../../actions/feed';
import { setFeedTagMap } from '../../actions/feedtagmap';
import { setPokemonNames } from '../../actions/pokemon';
import { getFeedByLocation, getLatestFeeds } from '../../lib/feedutils';
import { setLocation, setLocationError } from '../../actions/location';
import getCurrentPosition from '../../lib/geolocation';

class SetFeed extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    apiUrl: React.PropTypes.string,
  };

  componentDidMount() {
    // TODO: this is super ugly, fix later.
    this.getCurrentPosition(
      this.props.dispatch,
      (pos) => {
        this.getAllFeedTags(this.props.dispatch, this.props.apiUrl).then(() => {
          // First set all pokemon, then get feed.
          this.getFeed(this.props.dispatch, this.props.apiUrl, pos);
        });
      }
    );
  }

  getCurrentPosition(dispatch, callback) {
    getCurrentPosition((pos) => {
      callback(pos);
      dispatch(setLocation(pos));
    }, (err) => {
      dispatch(setLocationError({ locationError: err }));
    });
  }

  async getAllFeedTags(dispatch, apiUrl) {
    const resp = await fetch(`${apiUrl}/allfeedtags`, {
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

    const ftmap = {};
    const pnames = [];

    for (const tag of data) {
      ftmap[tag.name] = tag;
      if (tag.type === 'pokemon') {
        pnames.push(tag.name);
      }
    }

    dispatch(setFeedTagMap({ feedTagMap: ftmap }));

    pnames.sort();
    dispatch(setPokemonNames({ pokemonNames: pnames }));

    return data;
  }

  async getFeed(dispatch, apiUrl, pos) {
    // Set to both local and global feed.
    this.getFeedByLocation(dispatch, apiUrl, pos);
    this.getLatestFeeds(dispatch, apiUrl);
  }

  async getLatestFeeds(dispatch, apiUrl) {
    const feeds = await getLatestFeeds(apiUrl);
    dispatch(setFeed({ feed: feeds }));
  }

  async getFeedByLocation(dispatch, apiUrl, pos) {
    const feeds = await getFeedByLocation(apiUrl, pos.lat, pos.long, 0.1, 0.1);
    dispatch(setLocalFeed({ localFeed: feeds }));
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
  };
}

export default connect(
  mapStateToProps
)(SetFeed);
