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
    pokemonMap: React.PropTypes.object, // TODO: Is this right?
    pokemonNames: React.PropTypes.array, // TODO: Is this right?
  };

  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: null,
      selectValue: null, // It's the default selector
      checkboxValue: false,
      errorMessage: null,
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }

  getPokemonList() {
    // TODO: to get images in the drop down, we would need our own custom select.
    const pokemonOptions = this.props.pokemonNames.map((name) => {
      const pokemon = this.props.pokemonMap[name];
      return (
        <option value={pokemon.name}>
          {pokemon.display_name}
        </option>
      );
    });

    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl
          componentClass="select"
          placeholder="Select"
          onChange={this.handleSelectChange}
          className={s.selectStyle}
        >
          <option value={'select'}>
            Select Pokemon
          </option>
          {pokemonOptions}
        </FormControl>
      </FormGroup>
    );
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
    console.log('handleSubmit');
    // Reset error message.
    this.setState({ errorMessage: null });


    const url = `${this.props.apiUrl}/postfeed`;
    const message = this.state.textAreaValue;
    const pokemon = this.state.selectValue;
    const displayType = this.state.checkboxValue ? null : 'postal_code';
    const geocodes = this.props.geocodes;
    const username = this.props.user.username;
    const createdByUserUUID = this.props.user.uuid; // TODO: convert to lowercase?
    const geocode = getGeocodeByType(geocodes, displayType);
    const lat = geocode.lat;
    const long = geocode.long;
    const formattedAddress = geocode.formattedAddress;

    if (!message) {
      this.setState({ errorMessage: 'Please write a message.' });
      return;
    }

    if (!pokemon || pokemon === 'select') {
      this.setState({ errorMessage: 'Please select a pokemon.' });
      return;
    }

    if (!lat || !long || !formattedAddress) {
      this.setState({ errorMessage: 'Must wait until location is found.' });
      return;
    }

    if (!username || !createdByUserUUID) {
      this.setState({ errorMessage: 'Must be logged in to post.' });
      return;
    }

    const data = {
      created_by_user_uuid: createdByUserUUID,
      message,
      pokemon_name: pokemon,
      lat,
      long,
      formatted_address: formattedAddress,
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

    this.props.addFeed({
      singleFeed: createSingleFeed(
        username,
        message,
        pokemon,
        geocode.lat,
        geocode.long,
        geocode.formattedAddress,
        null,
        this.props.pokemonMap,
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
                <h5 className={'text-danger'}>{this.state.errorMessage}</h5>
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
                {this.getPokemonList()}
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
