/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Link from '../Link';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Location.css';
import cx from 'classnames';
import {
  Grid,
  Row,
  Col,
  Checkbox,
  Radio,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';


class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.7786255,
      long: -122.4295503,
      address: null,
    };
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleLocation);
  }

  async getAddress(lat, long) {
    const adr = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true`;
    const resp = await fetch(adr);
    if (resp.status !== 200) throw new Error(resp.statusText);
    const data = await await resp.json();
    if (!data) return undefined;
    this.setState({ address: data.results[0].formatted_address });
    return data;
  }

  handleLocation(position) {
    // Set this globally
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });

    this.getAddress(position.coords.latitude, position.coords.longitude);
  }

  render() {
    // Expose a map with a marker and use that marker as current location.
    return (
      <div className={s.root}>
        <div className={cx(s.container, s.centerText)}>
          <Grid>
            <Row>
              <br />
              <span className={s.strongText}>Location:</span> {this.state.address}
              <br />
              <br />
            </Row>
            <Row>
              <Col sm={0} md={2} lg={3} />
              <Col sm={12} md={8} lg={6} >
                <img
                  style={{ width: '100%' }}
                  alt="gmaps"
                  src={
                  `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.lat},${this.state.long}&zoom=14&size=400x300&sensor=false`
                  }
                />
              </Col>
              <Col sm={0} md={2} lg={3} />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Location);
