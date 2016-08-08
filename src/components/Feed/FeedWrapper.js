import { connect } from 'react-redux';
import Feed from './Feed';
import { setFeed } from '../../actions/feed';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    geocodes: state.location.geocodes,
    width: state.window.width,
    height: state.window.height,
    isMobile: state.window.isMobile,
    feed: state.feed.feed,
    apiUrl: state.runtime.apiUrl,
    pokemonMap: state.pokemon.pokemonMap,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFeed: (feed) => {
      dispatch(setFeed(feed));
    },
  };
}

const FeedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default FeedWrapper;
