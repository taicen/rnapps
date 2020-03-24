import React from 'react';
//import { Image, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { BottomTabs } from '../components/blocks';
//import ArrowBack from '../svg/ArrowBackIcon';

import {
  FavoritesScreen,
  TariffsScreen,
  WelcomeScreen,
  ProfileScreen,
  RouteScreen,
  SettingsScreen,
  SettingsLanguageScreen,
  SettingsCityScreen,
  AllRoutesScreen,
  InitialCity,
  MakePay,
} from '../screens';

import {
  MainScreenContainer,
  StationScreenContainer,
  RegistrationScreenContainer,
  LoginScreenContainer,
  EditProfileContainer,
  ForgetPasswordContainer,
  NotificationsScreenContainer,
  SingleNotificationScreenContainer,
  SinglePaymentScreenContainer,
  PaymentsScreenContainer,
} from '../containers';

//import Icon from 'react-native-vector-icons/FontAwesome';

import SplashScreen from '../screens/SplashScreen';

const LoginNavigator = createStackNavigator(
  {
    Initial: InitialCity,
    Welcome: WelcomeScreen,
    Login: LoginScreenContainer,
    Registration: RegistrationScreenContainer,
    ForgetPassword: ForgetPasswordContainer,
  },
  {
    defaultNavigationOptions: {
      //headerBackImage: <ArrowBack style={{ margin: 10 }} />,
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0,
      },
    },
    initialRouteName: 'Initial',
  },
);

const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreenContainer,
    //// Station: StationScreenContainer,
    Profile: ProfileScreen,
    EditProfile: EditProfileContainer,
    //// Route: RouteScreen,
    AllRoutes: AllRoutesScreen,
    Notification: NotificationsScreenContainer,
    SingleNotification: SingleNotificationScreenContainer,
    SinglePayment: SinglePaymentScreenContainer,
    Settings: SettingsScreen,
    SettingsLanguage: SettingsLanguageScreen,
    SettingsCity: SettingsCityScreen,
    Payment: PaymentsScreenContainer,
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Main',
    resetOnBlur: true,
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Main: MainScreenContainer,
    Tariffs: TariffsScreen,
    Favorites: FavoritesScreen,
    MakePay: MakePay,
    Station: StationScreenContainer,
    Route: RouteScreen,
    AppStackNavigator,
  },
  {
    tabBarComponent: props => <BottomTabs {...props} />,
    navigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Main',
  },
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    //Splash: SplashScreen,
    Auth: LoginNavigator,
    Main: { screen: AppTabNavigator },
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppSwitchNavigator);
