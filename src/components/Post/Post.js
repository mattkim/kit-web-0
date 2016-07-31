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
import {
  Grid,
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
    address: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMobile: React.PropTypes.bool,
    apiUrl: React.PropTypes.string,
    addFeed: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: null,
      selectValue: 'bulbasaur', // It's the default selector
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }

  handleTextAreaChange(e) {
    this.setState({ textAreaValue: e.target.value });
  }

  handleSelectChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  async handleSubmit(e) { // eslint-disable-line no-unused-vars
    // Validate that lat long exists before submitting.
    const url = `${this.props.apiUrl}/postfeed`;
    const message = this.state.textAreaValue;
    const pokemon = this.state.selectValue;
    const lat = this.props.lat;
    const long = this.props.long;
    const address = this.props.address;
    const data = {
      message,
      pokemon,
      lat,
      long,
      address,
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

    const result = await await response.json();

    console.log(result);

    this.props.addFeed({
      singleFeed: createSingleFeed(message, pokemon, lat, long, address),
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
                {this.props.address ? this.props.address : 'Finding current location...'}
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
