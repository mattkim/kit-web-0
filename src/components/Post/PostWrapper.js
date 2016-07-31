import { connect } from 'react-redux';
import Post from './Post';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    address: state.location.address,
    width: state.window.width,
    height: state.window.height,
    isMobile: state.window.isMobile,
  };
}

const PostWrapper = connect(
  mapStateToProps
)(Post);

export default PostWrapper;
