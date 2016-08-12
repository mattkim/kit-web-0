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
import { styleFeedTag } from '../../lib/feedtagutils';
import AddressWrapper from '../Address/AddressWrapper';
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
    localFeed: React.PropTypes.array,
    apiUrl: React.PropTypes.string,
    feedTagMap: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      feedType: 'global',
    };

    this.setGlobal = this.setGlobal.bind(this);
    this.setLocal = this.setLocal.bind(this);
  }

  setGlobal(e) { // eslint-disable-line no-unused-vars
    this.setState({ feedType: 'global' });
  }

  setLocal(e) { // eslint-disable-line no-unused-vars
    this.setState({ feedType: 'local' });
  }

  getFeed() {
    if (this.state.feedType === 'local') {
      return this.props.localFeed;
    }

    return this.props.feed;
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

  createSingleGroup(feedItem, innerFeedClass) {
    // So this image should come from backend go server and it should have a
    // a map between pokemon and image... also it should uri encode the image.

    const listGroupItems = [
      <ListGroupItem className={innerFeedClass}>
        <Row>
          <Col xs={10} sm={10} md={10} lg={10}>
            <span className={s.strongText}>{feedItem.username} </span>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} className={s.rightFeedHeader}>
            <span className={s.strongText}>
              {getDateDiff(feedItem.created_at)}
            </span>
          </Col>
        </Row>
      </ListGroupItem>,
      <ListGroupItem className={innerFeedClass}>
        <a href={this.gmapsURL(feedItem.lat, feedItem.long)} target="_blank">
          {feedItem.formatted_address}
        </a>
        <span className={s.spacer} />
        <TiMap className={s.iconStyle} />
      </ListGroupItem>,
      <ListGroupItem className={innerFeedClass}>
        {feedItem.message}
      </ListGroupItem>,
    ];

    if (feedItem.feedTags.length > 0) {
      listGroupItems.push(this.renderFeedTags(feedItem.feedTags, innerFeedClass));
    }

    return listGroupItems;
  }

  renderFeedTags(feedTags, innerFeedClass) {
    const styledTags = feedTags.map((tag) =>
      styleFeedTag(tag, () => {}, false)
    );

    return (
      <ListGroupItem className={innerFeedClass}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {styledTags}
          </Col>
        </Row>
      </ListGroupItem>
    );
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
              <a onClick={this.setGlobal}>Global</a> | <a onClick={this.setLocal}>Local</a>
              <br />
              <br />
            </Row>
            {this.props.isMobile ?
              this.createCombinedGroupItems(this.getFeed()) :
              this.createGroupItems(this.getFeed())}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feed);
