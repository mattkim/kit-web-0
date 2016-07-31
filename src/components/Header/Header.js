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
import s from './Header.css';
import Navigation from '../Navigation';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

class Header extends Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMobile: React.PropTypes.bool,
  };

  largeHeader() {
    return (
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} className={s.leftHeader}>
          <span className={s.strongText}>Pokefeed</span>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Navigation className={s.rightHeader} />
        </Col>
      </Row>
    );
  }

  smallHeader() {
    return (
      <Row>
        <Navigation className={s.rightHeaderCenter} />
      </Row>
    );
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            {this.props.isMobile ? this.smallHeader() : this.largeHeader()}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
