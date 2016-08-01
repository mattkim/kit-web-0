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
import s from './Register.css';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  PageHeader,
} from 'react-bootstrap';

class Register extends Component {
  static propTypes = {
    apiUrl: React.PropTypes.string,
    setUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      usernameValue: null,
      passwordValue: null,
      passwordAgainValue: null,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordAgainChange = this.handlePasswordAgainChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ emailValue: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ usernameValue: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }

  handlePasswordAgainChange(e) {
    this.setState({ passwordAgainValue: e.target.value });
  }

  async handleSubmit(e) { // eslint-disable-line no-unused-vars
    // TODO: move this into node js backend.
    const url = `${this.props.apiUrl}/signup`;
    const data = {
      email: this.state.emailValue,
      username: this.state.usernameValue,
      password: this.state.passwordValue,
      password_again: this.state.passwordAgainValue,
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

    // TODO: this can fail too...
    const user = await await response.json();

    // TODO: if we get here, we assume this user was created
    // Need to set user onto the session/cookie.
    // We could also set this on the redux.
    console.log(user);

    this.props.setUser({ user });

    history.push('/');
  }

  render() {
    return (
      <div>
        <PageHeader>
          Register Now
          <br />
          <small>Keep up with the latest pokemon go news.</small>
        </PageHeader>
        <br />
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <FormControl
              type="email"
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <FormGroup controlId="formHorizontalUsername">
            <FormControl
              type="username"
              placeholder="Username"
              onChange={this.handleUsernameChange}
            />
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <FormControl
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <FormGroup controlId="formHorizontalPasswordAgain">
            <FormControl
              type="password"
              placeholder="Retype Password"
              onChange={this.handlePasswordAgainChange}
            />
          </FormGroup>
          <FormGroup controlId="formHorizontalSubmit">
            <Button
              bsStyle="success"
              onClick={this.handleSubmit}
              className={cx(s.buttonStyle, 'pull-right')}
            >
              Register
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withStyles(s)(Register);
