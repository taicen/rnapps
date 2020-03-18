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
  // ForgetPasswordScreen,
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

// const HomeNavigator = createStackNavigator({
//   IntroScreen,
//   LoginScreen,
//   SignupScreen,
//   ForgotScreen,
// });

// const StackNavigator = createStackNavigator(
//   {
//     //IntroScreen,
//     //LoginScreen,
//     //EmailInputScreen,
//     //PasswordInputScreen,
//     //SignupScreen,
//     //ForgotScreen,
//     BrowseScreen,
//     ExploreScreen,
//     ProductScreen,
//     SettingScreen,

//     // TouchAuthentication: TouchAuthentication,
//     // onBoardScreen: {
//     //   screen: onBoardScreen,
//     // },
//     // SelectProfileScreen: SelectProfileScreen,
//     // SetGoalScreen: SetGoalScreen,
//     // CustomizeInterest: CustomizeInterest,
//     // SelectGender: SelectGender,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {},
//       headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
//       headerBackTitle: null,
//       headerLeftContainerStyle: {},
//       headerRightContainerStyle: {},
//     },
//     initialRouteName: 'BrowseScreen',
//   },
// );

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

// const AppTabNavigator = createBottomTabNavigator(
//   {
//     Main: {
//       screen: StackNavigator,
//       navigationOptions: {
//         tabBarLabel: ({ tintColor }) => (
//           <Text style={{ color: tintColor }}>
//             Browse
//           </Text>
//         ),
//         tabBarIcon: ({ horizontal, tintColor }) =>
//           <Icon name="home" size={horizontal ? 20 : 25} color={tintColor} />
//       }
//     },
//     Setting: {
//       screen: SettingScreen,
//       navigationOptions: {
//         tabBarLabel: ({ tintColor }) => (
//           <Text style={{ color: tintColor }}>
//             Setting
//           </Text>
//         ),
//         tabBarIcon: ({ horizontal, tintColor }) =>
//           <Icon name="cogs" size={horizontal ? 20 : 25} color={tintColor} />
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       //showLabel: false,
//       activeTintColor: 'orange',
//       inactiveTintColor: 'gray',
//       labelStyle: {
//         fontSize: 16,
//       },
//       labelPosition: 'below-icon',
//       style: {
//         backgroundColor: 'grey',
//         paddingTop: 4,
//         paddingBottom :4
//       },
//       tabStyle: {
//         backgroundColor: 'white',
//         alignItems: 'center',
//       }
//     },
//     initialRouteName: 'Main',
//     resetOnBlur: true, // сбрасывает состояние предыдущего экрана, по умолчанию false
//     //tabBarComponent: <> - Optional, override component to use as the tab bar.
//   }
// );

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
