import { connect } from 'react-redux';
import Register from './Register';
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

const RegisterWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterWrapper;
