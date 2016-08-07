/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AppWrapper from '../components/App/AppWrapper';

// Child routes
import home from './home';
import post from './post';
import profile from './profile';
import error from './error';

export default {

  path: '/',

  children: [
    home,
    post,
    profile,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <AppWrapper context={context}>{component}</AppWrapper>
    );
  },

};
