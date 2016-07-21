/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feed.css';

class Feed extends Component {
  static propTypes = {
    initialCount: React.PropTypes.number,
  };

  static defaultProps = {
    initialCount: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount,
      feed: [],
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.getFeed();
  }

  async getFeed() {
    // TODO: config endpoints
    // const resp = await fetch('http://pokefeed-api.herokuapp.com/getfeed', {
    const resp = await fetch('http://localhost:8888/getfeed?key=val', {
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
    this.setState({ feed: data });
    return data;
  }

  tick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    let results = this.state.feed.map((row) => (
      <li key={row.id}>
        {row.created_by_user_uuid} <br />
        {row.message} <br />
        {row.pokemon} <br />
        {row.lat} <br />
        {row.long} <br />
      </li>
    ));
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div onClick={this.tick}>
            Clicks: {this.state.count} <br />
            Fetch API: <br />
            <ul>
              {results}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feed);
