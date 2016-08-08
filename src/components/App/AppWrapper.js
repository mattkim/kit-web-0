import { connect } from 'react-redux';
import App from './App';

function mapStateToProps(state) {
  return {
    user: state.user.user,
    lat: state.location.lat,
    long: state.location.long,
    geocodes: state.location.geocodes,
    locationError: state.location.locationError,
    getUserExecuted: state.user.getUserExecuted,
  };
}

const AppWrapper = connect(
  mapStateToProps
)(App);

export default AppWrapper;
