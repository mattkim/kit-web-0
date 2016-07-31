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
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
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
                <Col sm={12} md={8} className={s.centerText}>
                  {this.props.address ? this.props.address : 'Finding current location...'}
                  <br />
                  <br />
                  <FormGroup controlId="formControlsTextarea">
                    <FormControl
                      componentClass="textarea"
                      placeholder="Share the moment"
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
                      placeholder="Bulbasaur"
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
