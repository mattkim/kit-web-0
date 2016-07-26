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
import Link from '../Link';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';
import {
  Grid,
  Row,
  Col,
  Checkbox,
  Radio,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: null,
      windowHeight: null,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  isMobile() {
    if (this.state.windowWidth === null) {
      return true;
    }

    return this.state.windowWidth < 480;
  }

  render() {
    // Style up the front-end
    // I could calculate the container size on window resize.
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form>
            <Grid>
              <Row>
                <br />
                <Col sm={0} md={2} />
                <Col sm={12} md={8} >
                  <FormGroup controlId="formControlsTextarea">
                    <FormControl
                      componentClass="textarea"
                      placeholder="Share your thoughts"
                      ref="nameInput"
                      className={s.textAreaStyle}
                      style={{ height: this.state.windowHeight * 0.75 }}
                      autofocus
                    />
                  </FormGroup>
                </Col>
                <Col sm={0} md={2} />
              </Row>
              <Row className={s.formButtonsRow}>
                <br />
                <Button bsStyle="success" className={s.buttonStyle}>
                  Submit
                </Button>
              </Row>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Post);
