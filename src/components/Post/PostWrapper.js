import { connect } from 'react-redux';
import Post from './Post';
import { addFeed } from '../../actions/feed';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    address: state.location.address,
    width: state.window.width,
    height: state.window.height,
    isMobile: state.window.isMobile,
    apiUrl: state.runtime.apiUrl,
    user: state.user.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFeed: (singleFeed) => {
      dispatch(addFeed(singleFeed));
    },
  };
}

const PostWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostWrapper;
