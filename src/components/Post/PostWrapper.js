import { connect } from 'react-redux';
import Post from './Post';
import { addFeed, addLocalFeed } from '../../actions/feed';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    geocodes: state.location.geocodes,
    width: state.window.width,
    height: state.window.height,
    isMobile: state.window.isMobile,
    apiUrl: state.runtime.apiUrl,
    user: state.user.user,
    pokemonMap: state.pokemon.pokemonMap,
    pokemonNames: state.pokemon.pokemonNames,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFeed: (singleFeed) => {
      dispatch(addFeed(singleFeed));
    },
    addLocalFeed: (singleFeed) => {
      dispatch(addLocalFeed(singleFeed));
    },
  };
}

const PostWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostWrapper;
