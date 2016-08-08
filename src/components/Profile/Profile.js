/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoginWrapper from './LoginWrapper';
import RegisterWrapper from './RegisterWrapper';
import s from './Profile.css';
import {
  PageHeader,
  FormGroup,
  Button,
} from 'react-bootstrap';

class Profile extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    setUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) { // eslint-disable-line no-unused-vars
    // TODO: eventually this will be async.
    localStorage.setItem('user', null);
    this.props.setUser({ user: null });
  }

  userLoggedIn() {
    return this.props.user ? true : false;// eslint-disable-line no-unneeded-ternary
  }

  display() {
    if (this.userLoggedIn()) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <br />
            <PageHeader>
              Hello {this.props.user.username}!
            </PageHeader>
            <label>Username:</label>
            <span className={'pull-right'}>
              {this.props.user.username}
            </span>
            <br />
            <label>Email:</label>
            <span className={'pull-right'}>
              {this.props.user.email}
            </span>
            <br />
            <br />
            <FormGroup>
              <Button
                bsStyle="info"
                onClick={this.handleSubmit}
                className={cx(s.buttonStyle, 'pull-right')}
              >
                Log out
              </Button>
            </FormGroup>
            <br />
            <br />
            <p className={"text-center"}>
              Have feedback?  Email <a href='mailto:pokefeed-feedback@bitoboto.com'>pokefeed-feedback@bitoboto.com</a>
            </p>
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
