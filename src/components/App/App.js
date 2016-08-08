/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import HeaderWrapper from '../Header/HeaderWrapper';
import SetLocation from './SetLocation';
import SetWindowSize from './SetWindowSize';
import SetFeed from './SetFeed';
import SetUser from './SetUser';
import history from '../../core/history';
import {
  Grid,
  Row,
} from 'react-bootstrap';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }).isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    user: React.PropTypes.object,
    getUserExecuted: React.PropTypes.bool,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }

    let result = null;

    if (
      !this.props.user &&
      history.getCurrentLocation().pathname !== '/profile'
    ) {
      result = (
        <div className={s.root}>
          <div className={s.container}>
            <Grid>
              <Row className={s.centerText}>
                <br />
                <div>
                  <span>{'Loading...'}</span>
                </div>
              </Row>
            </Grid>
          </div>
        </div>
      );
    } else {
      result = this.props.children;
    }

    return (
      <div>
        <SetUser componentDisplayName={this.props.children.type.ComposedComponent.displayName} />
        <HeaderWrapper />
        <SetWindowSize />
        <SetLocation />
        <SetFeed />
        {result}
      </div>
    );
  }

}

export default App;
