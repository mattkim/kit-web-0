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
import s from './Feed.css';
import { getDateDiff } from '../../lib/dateutils';
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
    address: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMobile: React.PropTypes.bool,
    feed: React.PropTypes.array,
  };

  pokevisionURL(lat, long) {
    // TODO: move to config
    return `https://pokevision.com/#/@${lat},${long}`;
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
            <img alt={row.pokemon} className={s.profileImg} src={row.pokemon_image_url} />
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} className={s.feedText}>
            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                <span className={s.strongText}>{row.username} </span>
                spotted a <span className={s.strongText}>{row.pokemon}</span>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} className={s.rightFeedHeader}>
                <span className={s.strongText}>
                  {getDateDiff(row.created_at_date)}
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
        {row.formatted_address}
      </ListGroupItem>,
      <ListGroupItem className={innerFeedClass}>
        <span className={s.strongText}>
          <a href={this.pokevisionURL(row.lat, row.long)} target="_blank">
            Pokevision
          </a>
          <span className={s.spacer}></span>
          <a href={this.gmapsURL(row.lat, row.long)} target="_blank">
            Gmaps
          </a>
        </span>
      </ListGroupItem>,
    ]);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row className={s.centerText}>
              <br />
              {this.props.address ? this.props.address : 'Finding current location...'}
              <br />
              <br />
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
