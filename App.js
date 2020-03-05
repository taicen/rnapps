/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Navigator from './app/navigation';

import { enableScreens } from 'react-native-screens';
enableScreens();

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
