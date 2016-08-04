import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFeed } from '../../actions/feed';

class SetFeed extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    apiUrl: React.PropTypes.string,
  };

  componentDidMount() {
    // TODO: we actually need to block until current location
    // is found.
    this.getFeed(this.props.dispatch, this.props.apiUrl);
  }

  async getFeed(dispatch, apiUrl) {
    const resp = await fetch(`${apiUrl}/latestfeeds`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (resp.status !== 200) throw new Error(resp.statusText);
    // Weird but I have to await twice.
    const data = await await resp.json();
    if (!data) return undefined;

    console.log('***** latestfeeds result');
    console.log(data);

    dispatch(setFeed({ feed: data }));
    return data;
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiUrl: state.runtime.apiUrl,
  };
}

export default connect(
  mapStateToProps
)(SetFeed);
