import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLocation } from '../../actions/location';
import getCurrentPosition from '../../lib/geolocation';

class SetLocation extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.getCurrentPosition(this.props.dispatch);

    // TODO: I could set interval to do this every like 10 minutes
  }

  getCurrentPosition(dispatch) {
    getCurrentPosition((pos) => {
      dispatch(setLocation(pos));
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect()(SetLocation);
