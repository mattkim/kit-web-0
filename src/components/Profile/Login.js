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
import history from '../../core/history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

class Login extends Component {
  static propTypes = {
    apiUrl: React.PropTypes.string,
    setUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      passwordValue: null,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ emailValue: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }

  async handleSubmit(e) { // eslint-disable-line no-unused-vars
    // TODO: move this into node js backend.
    const url = `${this.props.apiUrl}/login`;
    const data = {
      email: this.state.emailValue,
      password: this.state.passwordValue,
    };

    console.log(data);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const user = await await response.json();

    console.log(user);

    this.props.setUser({ user });

    history.push('/');
  }

  render() {
    return (
      <div>
        <Form horizontal>
          <br />
          <FormGroup controlId="formHorizontalEmail">
            <FormControl
              type="email"
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <FormControl
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <FormGroup>
            <Button
              bsStyle="info"
              onClick={this.handleSubmit}
              className={cx(s.buttonStyle, 'pull-right')}
            >
              Log in
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withStyles(s)(Login);
