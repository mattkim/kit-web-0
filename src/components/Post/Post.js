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
import { styleFeedTag } from '../../lib/feedtagutils';
import AddressWrapper from '../Address/AddressWrapper';
import { getGeocodeByType } from '../../lib/geolocation';
import {
  Grid,
  Checkbox,
  Row,
  Col,
  Tabs,
  Tab,
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
    addLocalFeed: React.PropTypes.func,
    user: React.PropTypes.object,
    feedTagMap: React.PropTypes.object,
    pokemonNames: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: null,
      selectValue: null, // It's the default selector
      checkboxValue: false,
      errorMessage: null,
      key: 1,
      feedTags: [],
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }

  getPokemonStickerTags() {
    const tags = this.props.pokemonNames.map((name) => this.props.feedTagMap[name]);

    return this.getStyledTags(tags);
  }

  getFeedTags(type) {
    const tagNames = Object.keys(this.props.feedTagMap).filter((name) =>
      this.props.feedTagMap[name].type === type
    );

    const tags = tagNames.map((name) => this.props.feedTagMap[name]);

    return this.getStyledTags(tags);
  }

  getStyledTags(tags) {
    const styledTags = tags.map((tag) => {
      const bindHandleStickerTag = this.handleStickerTag.bind(this, tag);
      return styleFeedTag(tag, bindHandleStickerTag, true);
    });

    return (
      <div className={s.wrapperStyle}>
        {styledTags}
      </div>
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

  handleStickerTag(tag, e) {  // eslint-disable-line no-unused-vars
    this.setState({ errorMessage: null });

    if (this.state.feedTags.length >= 5) {
      this.setState({ errorMessage: 'Only 5 stickers allowed.' });
      return;
    }

    this.state.feedTags.push(tag);

    // This forces a rerender
    this.setState({ feedTags: this.state.feedTags });
  }

  async handleSubmit(e) { // eslint-disable-line no-unused-vars
    // Reset error message.
    this.setState({ errorMessage: null });

    const url = `${this.props.apiUrl}/postfeed`;
    const message = this.state.textAreaValue;
    const displayType = this.state.checkboxValue ? null : 'postal_code';
    const geocodes = this.props.geocodes;
    const username = this.props.user.username;
    const createdByUserUUID = this.props.user.uuid; // TODO: convert to lowercase?
    const geocode = getGeocodeByType(geocodes, displayType);
    const lat = geocode ? geocode.lat : null;
    const long = geocode ? geocode.long : null;
    const formattedAddress = geocode ? geocode.formattedAddress : null;
    const feedTags = this.state.feedTags;

    if (!message) {
      this.setState({ errorMessage: 'Please write a message.' });
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
      // TODO: make sure this works on the backend.
      feed_tags: feedTags,
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

    const singleFeed = createSingleFeed(
      username,
      message,
      feedTags,
      geocode.lat,
      geocode.long,
      geocode.formattedAddress,
      null,
    );

    // Add to both the global and local feed.
    this.props.addFeed({ singleFeed });
    this.props.addLocalFeed({ singleFeed });

    history.push('/');
  }

  handleSelect(key) {
    this.setState({ key });
  }

  renderChosenStickerTags() {
    const styledTags = this.state.feedTags.map((tag) =>
      styleFeedTag(tag, () => {}, false)
    );

    return (
      <div className={"text-center"}>
        {styledTags}
      </div>
    );
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
                <div style={{ height: '50px' }}>
                  {this.renderChosenStickerTags()}
                </div>
              </Col>
              <Col sm={0} md={2} />
            </Row>
            <Row>
              <Col sm={0} md={2} />
              <Col sm={12} md={8}>
                <br />
                <br />
                <Checkbox onChange={this.handleCheckboxChange} className={s.formCheckboxRow}>
                  Share exact location
                </Checkbox>
              </Col>
              <Col sm={0} md={2} />
            </Row>
            <Row>
              <Col sm={0} md={2} />
              <Col sm={12} md={8}>
                <Tabs
                  activeKey={this.state.key}
                  onSelect={this.handleSelect}
                  id="controlled-tab-example"
                >
                  <br />
                  <Tab eventKey={1} title="Pokemon">
                    {this.getPokemonStickerTags()}
                  </Tab>
                  <Tab eventKey={2} title="Team">
                    {this.getFeedTags('team')}
                  </Tab>
                </Tabs>
                <br />
                <br />
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
