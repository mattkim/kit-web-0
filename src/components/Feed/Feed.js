/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feed.css';
import {
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from 'react-bootstrap';

class Feed extends Component {
  static propTypes = {
    initialCount: React.PropTypes.number,
  };

  static defaultProps = {
    initialCount: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount,
      feed: [],
      windowWidth: null,
    };
    this.tick = this.tick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.getFeed();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e) {
    this.setState({ windowWidth: window.innerWidth });
  }

  isMobile() {
    if (this.state.windowWidth === null) {
      return false;
    }

    return this.state.windowWidth < 480;
  }

  async getFeed() {
    // TODO: config endpoints
    // const resp = await fetch('http://pokefeed-api.herokuapp.com/getfeed', {
    const resp = await fetch('http://localhost:8888/getfeed?key=val', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (resp.status !== 200) throw new Error(resp.statusText);
    // Weird but I have to await twice.
    const data = await await resp.json();
    if (!data) return undefined;
    this.setState({ feed: data });
    return data;
  }

  // TODO: move these into a time util lib
  getTimeWithPrefix(timeScalar) {
    const prefix = timeScalar < 10 ? '0' : '';
    return `${prefix}${timeScalar}`;
  }

  getTimeStr(date) {
    return `${this.getTimeWithPrefix(this.normalizeHours(date.getHours()))}:` +
    `${this.getTimeWithPrefix(date.getMinutes())}:` +
    `${this.getTimeWithPrefix(date.getSeconds())}`;
  }

  getTimeDiffStr(milliseconds) {
    const seconds = milliseconds / 1000;

    if (seconds < 60) {
      return `${Math.trunc(seconds)}s`;
    } else if (seconds < 3600) {
      return `${Math.trunc(seconds / 60)}m`;
    } else if (seconds < 86400) {
      return `${Math.trunc(seconds / 3600)}h`;
    }

    return `${Math.trunc(seconds / 86400)}d`;
  }

  getDateDiff(timeStringUTC) {
    const now = Date.now();
    const then = this.localizeDate(timeStringUTC).getTime();
    return this.getTimeDiffStr(now - then);
  }

  normalizeHours(hours) {
    return hours > 12 ? hours % 12 : hours;
  }

  tick() {
    this.setState({ count: this.state.count + 1 });
  }

  localizeDate(timeStringUTC) {
    const date = new Date();
    date.setTime(Date.parse(timeStringUTC));
    return date;
    // const dateStr = date.toDateString();
    // const timeStr = this.getTimeStr(date);
    // return `${dateStr} ${timeStr}`;
  }

  pokevisionURL(lat, long) {
    return `https://pokevision.com/#/@${lat},${long}`;
  }

  gmapsURL(lat, long) {
    return `http://maps.google.com/?q=${lat},${long}`;
  }

  createGroupItems(feed) {
    return feed.map((row, index) => (
      <ListGroup fill key={index} className={s.feedWrapper}>
        {this.createSingleGroup(row)}
      </ListGroup>
    ));
  }

  createCombinedGroupItems(feed) {
    // Not sure I understand why, but this needs to be a list.
    return (
      <ListGroup fill className={s.feedWrapper}>
        {feed.map((row) => this.createSingleGroup(row))}
      </ListGroup>
    );
  }

  createSingleGroup(row) {
    return ([
      <ListGroupItem className={s.innerFeed}>
        <Row>
          <Col xs={10} sm={10} md={10} lg={10}>
            <b>{row.username}</b> spotted a <b>{row.pokemon}</b>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} className={s.rightFeedHeader}>
            <b> {this.getDateDiff(row.created_at_date)}</b>
          </Col>
        </Row>
      </ListGroupItem>,
      <ListGroupItem className={s.innerFeed}>
        {row.message}
      </ListGroupItem>,
      <ListGroupItem className={s.innerFeed}>
        {row.formatted_address}
        <span className={s.spacer}></span>
        {row.lat}, {row.long}
      </ListGroupItem>,
      <ListGroupItem className={s.innerFeed}>
        <a href={this.pokevisionURL(row.lat, row.long)} target="_blank">
          Pokevision
        </a>
        <span className={s.spacer}></span>
        <a href={this.gmapsURL(row.lat, row.long)} target="_blank">
          Gmaps
        </a>
      </ListGroupItem>,
    ]);
  }

  render() {
    // Style up the front-end
    // I could calculate the container size on window resize.
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row>
              <Col xs={0} md={2} />
              <Col xs={12} md={8}>
                <br />
                {this.isMobile() ?
                  this.createCombinedGroupItems(this.state.feed) :
                  this.createGroupItems(this.state.feed)}
              </Col>
              <Col xs={0} md={2} />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feed);
