import { connect } from 'react-redux';
import Profile from './Profile';
import { setUser } from '../../actions/user';


function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
}

const ProfileWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileWrapper;
