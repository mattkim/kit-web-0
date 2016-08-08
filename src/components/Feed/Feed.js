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
import TiMap from 'react-icons/lib/ti/map';
import s from './Feed.css';
import { getDateDiff } from '../../lib/dateutils';
import AddressWrapper from '../Address/AddressWrapper';
import { getFeedByLocation, getLatestFeeds } from '../../lib/feedutils';
import {
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from 'react-bootstrap';

class Feed extends Component {
  static propTypes = {
    lat: React.PropTypes.number,
    long: React.PropTypes.number,
    geocodes: React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMobile: React.PropTypes.bool,
    feed: React.PropTypes.array,
    apiUrl: React.PropTypes.string,
    setFeed: React.PropTypes.func,
    pokemonMap: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.getLatestFeeds = this.getLatestFeeds.bind(this);
    this.getFeedByLocation = this.getFeedByLocation.bind(this);
  }

  gmapsURL(lat, long) {
    // TODO: move to config
    return `http://maps.google.com/?q=${lat},${long}`;
  }

  createGroupItems(feed) {
    return (
      <Row>
        <Col xs={0} md={2} />
        <Col xs={12} md={8}>
          <br />
          {
            feed.map((row, index) => (
              <ListGroup fill key={index} className={s.feedWrapper}>
                {this.createSingleGroup(row, s.innerFeed)}
              </ListGroup>
            ))
          }
        </Col>
        <Col xs={0} md={2} />
      </Row>
    );
  }

  createCombinedGroupItems(feed) {
    // Not sure I understand why, but this needs to be a list.
    return (
      <Row>
        <ListGroup fill className={s.feedWrapper}>
          {
            feed.map((row) => (
              <div className={s.feedCombinedDiv}>
                {this.createSingleGroup(row, s.innerFeedCombined)}
              </div>
            ))
          }
        </ListGroup>
      </Row>
    );
  }

  createSingleGroup(row, innerFeedClass) {
    // So this image should come from backend go server and it should have a
    // a map between pokemon and image... also it should uri encode the image.
    return ([
      <ListGroupItem className={innerFeedClass}>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2}>
            <img
              alt={row.pokemon_display_name}
              className={s.profileImg}
              src={row.pokemon_image_url}
            />
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} className={s.feedText}>
            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                <span className={s.strongText}>{row.username} </span>
                spotted <span className={s.strongText}>{row.pokemon_display_name}</span>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} className={s.rightFeedHeader}>
                <span className={s.strongText}>
                  {getDateDiff(row.created_at)}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroupItem>,
      <ListGroupItem className={innerFeedClass}>
        {row.message}
      </ListGroupItem>,
      <ListGroupItem className={innerFeedClass}>
        <a href={this.gmapsURL(row.lat, row.long)} target="_blank">
          {row.formatted_address}
        </a>
        <span className={s.spacer} />
        <TiMap className={s.iconStyle} />
      </ListGroupItem>,
    ]);
  }

  async getLatestFeeds() {
    console.log('***** getLatestFeeds');
    console.log(this.props);
    const feeds = await getLatestFeeds(this.props.apiUrl, this.props.pokemonMap);
    this.props.setFeed({ feed: feeds });
  }

  async getFeedByLocation() {
    console.log('***** getFeedByLocation');
    console.log(this.props);
    const feeds = await getFeedByLocation(this.props.apiUrl, this.props.lat, this.props.long, 0.1, 0.1, this.props.pokemonMap);
    this.props.setFeed({ feed: feeds });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row className={s.centerText}>
              <br />
              <AddressWrapper />
              <br />
              <a onClick={this.getLatestFeeds}>Global</a> | <a onClick={this.getFeedByLocation}>Local</a>
            </Row>
            {this.props.isMobile ?
              this.createCombinedGroupItems(this.props.feed) :
              this.createGroupItems(this.props.feed)}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feed);
