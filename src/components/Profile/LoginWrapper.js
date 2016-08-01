import { connect } from 'react-redux';
import Login from './Login';
import { setUser } from '../../actions/user';

function mapStateToProps(state) {
  return {
    apiUrl: state.runtime.apiUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
}

const LoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginWrapper;
