import React from 'react';
import { Image, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import EmailInputScreen from '../screens/EmailInputScreen';
import PasswordInputScreen from '../screens/PasswordInputScreen';

import SplashScreen from '../screens/SplashScreen';
//import Welcome from '../screens/Welcome';
//import Login from '../screens/Login';
import SignupScreen from '../screens/SignupScreen';
import ForgotScreen from '../screens/ForgotScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProductScreen from '../screens/ProductScreen';
import SettingScreen from '../screens/SettingScreen';

const HomeNavigator = createStackNavigator({
  IntroScreen,
  LoginScreen,
  SignupScreen,
  ForgotScreen,
});

const StackNavigator = createStackNavigator(
  {
    //IntroScreen,
    //LoginScreen,
    //EmailInputScreen,
    //PasswordInputScreen,
    //SignupScreen,
    //ForgotScreen,
    BrowseScreen,
    ExploreScreen,
    ProductScreen,
    SettingScreen,

    // TouchAuthentication: TouchAuthentication,
    // onBoardScreen: {
    //   screen: onBoardScreen,
    // },
    // SelectProfileScreen: SelectProfileScreen,
    // SetGoalScreen: SetGoalScreen,
    // CustomizeInterest: CustomizeInterest,
    // SelectGender: SelectGender,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {},
      headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {},
      headerRightContainerStyle: {},
    },
    initialRouteName: 'BrowseScreen',
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Main: { 
      screen: StackNavigator,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ color: tintColor }}>
            Browse
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="home" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ color: tintColor }}>
            Setting
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="cogs" size={horizontal ? 20 : 25} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      //showLabel: false,
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 16,
      },
      labelPosition: 'below-icon',
      style: {
        backgroundColor: 'grey',
        paddingTop: 4,
        paddingBottom :4
      },
      tabStyle: {
        backgroundColor: 'white',
        alignItems: 'center',
      }
    },
    initialRouteName: 'Main',
    resetOnBlur: true, // сбрасывает состояние предыдущего экрана, по умолчанию false
    //tabBarComponent: <> - Optional, override component to use as the tab bar.
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    //Splash: SplashScreen,
    //Auth: HomeNavigator,
    Main: { screen: AppTabNavigator },
  },
  // {
  //   initialRouteName: 'Auth'
  // }
);

export default createAppContainer(AppSwitchNavigator);
