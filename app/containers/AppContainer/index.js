import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from '../../redux';

import Navigator from '../../navigation';
import { StatusBar } from 'react-native';

export default () => (
  <Provider store={store}>
    <Fragment>
      <StatusBar backgroundColor="#F9F8F7" barStyle="dark-content" />
      <Navigator store={store} />
    </Fragment>
  </Provider>
);
