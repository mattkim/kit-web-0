import { connect } from 'react-redux';
import Profile from './Profile';

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

const ProfileWrapper = connect(
  mapStateToProps,
)(Profile);

export default ProfileWrapper;
