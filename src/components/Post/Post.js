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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';
import s from './Post.css';
import { createSingleFeed } from '../../lib/feedutils';
import AddressWrapper from '../Address/AddressWrapper';
import { getGeocodeByType } from '../../lib/geolocation';
import {
  Grid,
  Checkbox,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';


class Post extends Component {
  static propTypes = {
    lat: React.PropTypes.number,
    long: React.PropTypes.number,
    geocodes: React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMobile: React.PropTypes.bool,
    apiUrl: React.PropTypes.string,
    addFeed: React.PropTypes.func,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: null,
      selectValue: 'bulbasaur', // It's the default selector
      checkboxValue: false,
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }

  handleTextAreaChange(e) {
    this.setState({ textAreaValue: e.target.value });
  }

  handleCheckboxChange(e) { // eslint-disable-line no-unused-vars
    this.setState({ checkboxValue: !this.state.checkboxValue });
  }

  handleSelectChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  async handleSubmit(e) { // eslint-disable-line no-unused-vars
    // Validate that lat long exists before submitting.
    // TODO: move this into node js backend.
    const url = `${this.props.apiUrl}/postfeed`;
    const message = this.state.textAreaValue;
    const pokemon = this.state.selectValue;
    const displayType = this.state.checkboxValue ? null : 'postal_code';
    const lat = this.props.lat;
    const long = this.props.long;
    const geocodes = this.props.geocodes; // geocodes is a string?
    const username = this.props.user.Username;
    const createdByUserUUID = this.props.user.UUID; // TODO: convert to lowercase?

    const data = {
      created_by_user_uuid: createdByUserUUID,
      username,
      message,
      pokemon,
      lat,
      long,
      geocodes,
      display_type: displayType,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const geocode = getGeocodeByType(geocodes, displayType);

    this.props.addFeed({
      singleFeed: createSingleFeed(
        username,
        message,
        pokemon,
        geocode.lat,
        geocode.long,
        geocode.formattedAddress,
      ),
    });

    history.push('/');
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row>
              <br />
              <Col sm={0} md={2} />
              <Col sm={12} md={8} className={s.centerText}>
                <AddressWrapper />
                <br />
                <br />
                <FormGroup controlId="formControlsTextarea">
                  <FormControl
                    componentClass="textarea"
                    placeholder="Share the moment"
                    onChange={this.handleTextAreaChange}
                    ref="nameInput"
                    className={s.textAreaStyle}
                    style={{ height: this.props.height * 0.25 }}
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
                    placeholder="Select"
                    onChange={this.handleSelectChange}
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
            <Row>
              <Col sm={0} md={2} />
              <Col sm={12} md={8}>
                <Checkbox onChange={this.handleCheckboxChange} className={s.formCheckboxRow}>
                  Share exact location
                </Checkbox>
              </Col>
              <Col sm={0} md={2} />
            </Row>
            <Row className={s.formButtonsRow}>
              <br />
              <Button
                bsStyle="success"
                onClick={this.handleSubmit}
                className={s.buttonStyle}
              >
                Submit
              </Button>
              <br />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Post);
