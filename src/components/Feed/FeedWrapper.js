import { connect } from 'react-redux';
import Feed from './Feed';
import { addComment } from '../../actions/feed';

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
    feedTagMap: state.feedtagmap.feedTagMap,
    user: state.user.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (feedUUID, comment) => {
      dispatch(addComment(feedUUID, comment));
    },
  };
}

const FeedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default FeedWrapper;
