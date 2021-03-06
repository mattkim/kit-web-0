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
import { getFormattedAddressDefault } from '../../lib/geolocation';
import s from './Address.css';
import MdLocationOn from 'react-icons/lib/md/location-on';

class Address extends Component {
  static propTypes = {
    lat: React.PropTypes.number,
    long: React.PropTypes.number,
    geocodes: React.PropTypes.array,
    locationError: React.PropTypes.object,
  };

  addressMessage() {
    if (this.props.locationError) {
      const error = this.props.locationError;

      let errorMessage = '';

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Turn on location services.';
          break;
        default:
          errorMessage = 'Location unavailable.  Try refreshing.';
      }

      return (
        <h5 className={'text-danger'}>{errorMessage}</h5>
      );
    } else if (this.props.geocodes) {
      return (
        <span>
          <MdLocationOn className={s.iconStyle} />
          <span className={s.spacerSm} />
          {getFormattedAddressDefault(this.props.geocodes)}
        </span>
      );
    }

    return (
      'Finding current location...'
    );
  }

  render() {
    return (
      <div>
        {this.addressMessage()}
      </div>
    );
  }
}

export default withStyles(s)(Address);
