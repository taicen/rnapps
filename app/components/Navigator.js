import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import EmailInputScreen from '../screens/EmailInputScreen';
import PasswordInputScreen from '../screens/PasswordInputScreen';

//import Welcome from '../screens/Welcome';
//import Login from '../screens/Login';
import SignupScreen from '../screens/SignupScreen';
import ForgotScreen from '../screens/ForgotScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProductScreen from '../screens/ProductScreen';
import SettingScreen from '../screens/SettingScreen';

const StackNavigator = createStackNavigator(
  {
    IntroScreen,
    LoginScreen,
    //EmailInputScreen,
    //PasswordInputScreen,
    SignupScreen,
    ForgotScreen,
    ExploreScreen,
    BrowseScreen,
    //ProductScreen,
    SettingScreen,

    // TouchAuthentication: TouchAuthentication,
    // onBoardScreen: {
    //   screen: onBoardScreen,
    // },
    // SelectProfileScreen: SelectProfileScreen,
    // SetGoalScreen: SetGoalScreen,
    // CustomizeInterest: CustomizeInterest,
    // SelectGender: SelectGender,
  }, {
    defaultNavigationOptions: {
      headerStyle: {},
      headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {},
      headerRightContainerStyle: {},
    },
    initialRouteName: 'IntroScreen'
  }
);

export default createAppContainer(StackNavigator);