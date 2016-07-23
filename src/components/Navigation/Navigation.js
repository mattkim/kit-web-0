/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import TiSocialInstagramCircular from 'react-icons/lib/ti/social-instagram-circular';
import TiPencil from 'react-icons/lib/ti/pencil';
import TiUser from 'react-icons/lib/ti/user';
import MdEditLocation from 'react-icons/lib/md/edit-location';

function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link to="/"><TiSocialInstagramCircular className={s.iconButton} /></Link>
      <span className={s.spacer}></span>
      <Link to="/post"><TiPencil className={s.iconButton} /></Link>
      <span className={s.spacer}></span>
      <Link to="/"><MdEditLocation className={s.iconButton} /></Link>
      <span className={s.spacer}></span>
      <Link to="/"><TiUser className={s.iconButton} /></Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Navigation);
