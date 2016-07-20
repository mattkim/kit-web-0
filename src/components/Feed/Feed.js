/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
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
    this.state = { count: props.initialCount };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div onClick={this.tick}>
            Clicks: {this.state.count}
          </div>
          <a
            className={s.link}
            href="https://gitter.im/kriasoft/react-starter-kit"
          >Ask a question</a>
          <span className={s.spacer}>|</span>
          <a
            className={s.link}
            href="https://github.com/kriasoft/react-starter-kit/issues/new"
          >Report an issue</a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feed);
