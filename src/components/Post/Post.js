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
import s from './Post.css';
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


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: null,
      windowHeight: null,
      currentLocation: 130,
      lat: 37.7786255,
      long: -122.4295503,
      address: null,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
    navigator.geolocation.getCurrentPosition(this.handleLocation);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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

  handleResize(e) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  isMobile() {
    if (this.state.windowWidth === null) {
      return true;
    }

    return this.state.windowWidth < 480;
  }

  render() {
    // Style up the front-end
    // I could calculate the container size on window resize.
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form>
            <Grid>
              <Row>
                <br />
                <Col sm={0} md={2} />
                <Col sm={12} md={8} className={s.centerText}>
                  {this.state.address ? this.state.address : 'Finding current location...'}
                  <br />
                  <br />
                  <FormGroup controlId="formControlsTextarea">
                    <FormControl
                      componentClass="textarea"
                      placeholder="Share the moment"
                      ref="nameInput"
                      className={s.textAreaStyle}
                      style={{ height: this.state.windowHeight * 0.25 }}
                      autofocus
                    />
                  </FormGroup>
                </Col>
                <Col sm={0} md={2} />
              </Row>
              <Row>
                <Col sm={0} md={2} />
                <Col sm={12} md={8}>
                  <FormGroup controlId="formControlsSelect">
                    <FormControl
                      componentClass="select"
                      placeholder="Bulbasaur"
                      className={s.selectStyle}
                    >
                      <option value="bulbasaur">Bulbasaur</option>
                      <option value="charmander">Charmander</option>
                      <option value="squirtle">Squirtle</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col sm={0} md={2} />
              </Row>
              <Row className={s.formButtonsRow}>
                <br />
                <Button bsStyle="success" className={s.buttonStyle}>
                  Submit
                </Button>
              </Row>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Post);
