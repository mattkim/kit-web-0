/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import cx from 'classnames';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';


function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6} className={s.leftHeader}>
              Pokefeed
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Navigation className={s.rightHeader} />
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
