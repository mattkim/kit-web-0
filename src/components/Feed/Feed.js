/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TiMap from 'react-icons/lib/ti/map';
import TiMessage from 'react-icons/lib/ti/message';
import s from './Feed.css';
import { getDateDiff } from '../../lib/dateutils';
import { styleFeedTag } from '../../lib/feedtagutils';
import { createComment } from '../../lib/commentutils';
import { getGeocodeByType } from '../../lib/geolocation';
import AddressWrapper from '../Address/AddressWrapper';
import {
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormControl,
  FormGroup,
  Form,
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
    user: React.PropTypes.object,
    addComment: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      feedType: 'global',
      currentComments: {},
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

    // TODO: sometimes it's null...
    if (!feedItem) {
      return;
    }

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

    // TODO: why are there dupes here, so sad...
    const seenComments = new Set();
    const comments = feedItem.comments.filter((comment) => {
      if (seenComments.has(comment.uuid)) {
        return false;
      }

      seenComments.add(comment.uuid);
      return true;
    });

    if (feedItem.comments && feedItem.comments.length > 0) {
      const commentsStr = comments.map((comment) => (
        <div>
          <strong>{comment.username} </strong>
          {comment.message}
        </div>
      ));

      listGroupItems.push(
        <ListGroupItem className={innerFeedClass}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              {commentsStr}
            </Col>
          </Row>
        </ListGroupItem>
      );
    }

    // TODO: this might need to be a state in order to work.
    const bindHandleCommentSubmit = this.handleCommentSubmit.bind(this, feedItem);
    const bindHandleCommentChange = this.handleCommentChange.bind(this, feedItem);

    listGroupItems.push(
      <ListGroupItem className={innerFeedClass}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Form autoComplete="off" onSubmit={bindHandleCommentSubmit}>
              <FormGroup controlId="formHorizontalUsername">
                <FormControl
                  type="comment"
                  placeholder="Leave a comment"
                  className={s.textAreaStyle}
                  onChange={bindHandleCommentChange}
                  autoComplete="off"
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    );

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

  handleCommentChange(feedItem, e) {
    let comment = this.state.currentComments[feedItem.uuid];

    if (!comment) {
      comment = {};
      this.state.currentComments[feedItem.uuid] = comment;
    }

    comment.message = e.target.value;

    this.setState({ currentComments: this.state.currentComments });
  }

  async handleCommentSubmit(feedItem, e) {
    e.preventDefault();
    e.target[0].value = ''; // eslint-disable-line no-param-reassign

    // TODO: move this into a postutils
    const comment = this.state.currentComments[feedItem.uuid];
    // Refresh this comment
    this.state.currentComments[feedItem.uuid] = {};
    this.setState({ currentComments: this.state.currentComments });

    if (comment) {
      const url = `${this.props.apiUrl}/postcomment`;
      const feedUUID = feedItem.uuid;
      const message = comment.message;
      const username = this.props.user.username;
      const displayType = comment.displayType ? null : 'postal_code';
      const createdByUserUUID = this.props.user.uuid;
      const geocode = getGeocodeByType(this.props.geocodes, displayType);
      const lat = geocode ? geocode.lat : null;
      const long = geocode ? geocode.long : null;
      const formattedAddress = geocode ? geocode.formattedAddress : null;

      const newComment = createComment(null, feedUUID, username, message, null);

      // TODO: this needs to post the comment to feeds... hrm how
      // Maybe it should follow the same algo as pokefeed.
      console.log('**** feeds before ');
      console.log(this.props.feed);
      console.log(this.props.localFeed);

      this.props.addComment({ feedUUID, comment: newComment });

      const data = {
        feed_item_uuid: feedUUID,
        created_by_user_uuid: createdByUserUUID,
        message,
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

      console.log(response);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    }
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
