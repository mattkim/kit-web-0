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
import LoginWrapper from './LoginWrapper';
import RegisterWrapper from './RegisterWrapper';
import s from './Profile.css';
import {
  PageHeader,
} from 'react-bootstrap';

class Profile extends Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  userLoggedIn() {
    return this.props.user ? true : false;// eslint-disable-line no-unneeded-ternary
  }

  display() {
    // TODO: these attributes are uppercase and should be changed.
    if (this.userLoggedIn()) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <br />
            <PageHeader>
              Hello {this.props.user.Username}!
              <br />
              <small>email: {this.props.user.Email}</small>
            </PageHeader>
          </div>
        </div>
      );
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <RegisterWrapper />
          <strong className={s.lineThrough}>OR</strong>
          <LoginWrapper />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.display()}
      </div>
    );
  }
}

export default withStyles(s)(Profile);
