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
    this.handleResize(null);
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
      return true;
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
                  {this.getDateDiff(row.created_at_date)}
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
    // Style up the front-end
    // I could calculate the container size on window resize.
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            {this.isMobile() ?
              this.createCombinedGroupItems(this.state.feed) :
              this.createGroupItems(this.state.feed)}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feed);
