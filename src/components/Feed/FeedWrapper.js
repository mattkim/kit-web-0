import { connect } from 'react-redux';
import Feed from './Feed';

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

const FeedWrapper = connect(
  mapStateToProps
)(Feed);

export default FeedWrapper;
