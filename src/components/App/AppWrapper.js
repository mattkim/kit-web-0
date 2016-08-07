import { connect } from 'react-redux';
import App from './App';

function mapStateToProps(state) {
  return {
    user: state.user.user,
    getUserExecuted: state.user.getUserExecuted,
  };
}

const AppWrapper = connect(
  mapStateToProps
)(App);

export default AppWrapper;
