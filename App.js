/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './app/containers/AppContainer';

import { enableScreens } from 'react-native-screens';
enableScreens();

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
