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
    const data = {
      message: this.state.textAreaValue,
      pokemon: this.state.selectValue,
      lat: this.props.lat,
      long: this.props.long,
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

    // TODO: create logic for creating a new singleFeed.
    this.props.addFeed({
      singleFeed: {
        created_at_date: '2016-07-17T20:34:58.651387237Z',
        created_by_user_uuid: 'b89d86f1-5502-4f17-8e68-6945206f2b3c',
        deleted_at_date: '2016-07-31T00:04:43.30072252-07:00',
        formatted_address: '11 Oak St, San Francisco, CA 94102, USA',
        lat: 37.7752315,
        long: -122.4197165,
        message: 'I just posted this yes.',
        pokemon: 'Charmander',
        pokemon_image_url: 'http://static.giantbomb.com/uploads/scale_small/0/6087/2438704-1202149925_t.png',
        updated_at_date: '2016-07-31T00:04:43.300722494-07:00',
        username: 'ilovepokemon23',
        uuid: 'a551ebe9-8b11-466f-ad25-797073b05b8b',
      },
    });

    // TODO: Also add post to top of feed before this.
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
