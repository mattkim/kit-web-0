import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, setGetUserExecuted } from '../../actions/user';
import history from '../../core/history';

class SetUser extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    apiUrl: React.PropTypes.string,
    user: React.PropTypes.object,
    componentDisplayName: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      getUserExecuted: false,
    };

    // I might need this....
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    // TODO: we should merge this with SetFeed so that nothing loads
    // until we find a user.
    // But we stil need this component to render logic to reroute clicks
    // after a page load.
    this.getUser(this.props.dispatch, this.props.apiUrl);
  }

  async getUser(dispatch, apiUrl) { // eslint-disable-line
    // TODO: I think we are supposed to use JWT tokens, and fetch
    // the user from a node handler, allow jwt to do auth at that level
    // then if that passes, just allow it to hit the backend service.
    // This way we store the cookie in the store, and we can rely on
    // jwt auth to handle expiry
    let user = localStorage.getItem('user');

    if (!user || user === 'null') {
      user = null;
      history.push('/profile');
    } else {
      user = JSON.parse(user);
    }

    dispatch(setUser({ user }));
    // TODO: somehow need to harness this...
    dispatch(setGetUserExecuted({ getUserExecuted: true }));
    this.setState({ getUserExecuted: true });
  }

  render() {
    // TODO: this seems like a good way to redirect page clicks.
    if (
      !this.props.user &&
      this.props.componentDisplayName !== 'Profile' &&
      this.state.getUserExecuted
    ) {
      history.push('/profile');
    }

    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiUrl: state.runtime.apiUrl,
    user: state.user.user,
  };
}

export default connect(
  mapStateToProps
)(SetUser);
