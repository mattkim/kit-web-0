import { connect } from 'react-redux';
import Feed from './Feed';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    geocodes: state.location.geocodes,
    width: state.window.width,
    height: state.window.height,
    isMobile: state.window.isMobile,
    feed: state.feed.feed,
    localFeed: state.feed.localFeed,
    apiUrl: state.runtime.apiUrl,
    pokemonMap: state.pokemon.pokemonMap,
  };
}

const FeedWrapper = connect(
  mapStateToProps,
)(Feed);

export default FeedWrapper;
