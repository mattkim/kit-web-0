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
      errorMessage: null,
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
    // Clear the error message
    this.setState({ errorMessage: null });

    const data = {
      email: this.state.emailValue,
      username: this.state.usernameValue,
      password: this.state.passwordValue,
      password_again: this.state.passwordAgainValue,
    };

    // Validate the form data
    if (!data.email) {
      this.setState({ errorMessage: '* Email required' });
      return;
    } else if (!data.username) {
      this.setState({ errorMessage: '* Username required' });
      return;
    } else if (!data.password) {
      this.setState({ errorMessage: '* Password required' });
      return;
    } else if (!data.password_again) {
      this.setState({ errorMessage: '* Retyped password required' });
      return;
    }

    // TODO: move this into node js backend.
    const url = `${this.props.apiUrl}/signup`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle error use cases.
    if (response.status !== 200) {
      const body = await await response.json();

      if (body.Code === '23505') {
        // Guess that this unique constraint error always means account exists
        this.setState({ errorMessage: '* Account already exists' });
        return;
      } else if (body.Error) {
        this.setState({ errorMessage: `* ${body.Error}` });
        return;
      }

      throw new Error(response.statusText);
    }

    // TODO: set user on session / cookie
    const user = await await response.json();

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
        <h5 className={'text-danger'}>{this.state.errorMessage}</h5>
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
