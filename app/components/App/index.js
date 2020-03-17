import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { PermissionAndroid, Platform } from 'react-native';

import NavigationService from '../../navigationService';
import { BottomTabs } from '../blocks';
import { watchPosition } from '../../helpers';
import ArrowBack from '../svg/ArrowBackIcon';

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
  MakePay
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
  PaymentsScreenContainer
} from '../../containers';

const LoginNavigator = createStackNavigator(
  {
    Initial: InitialCity,
    Welcome: WelcomeScreen,
    Login: LoginScreenContainer,
    Registration: RegistrationScreenContainer,
    ForgetPassword: ForgetPasswordContainer
  },
  {
    defaultNavigationOptions: {
      //headerBackImage: <ArrowBack style={{ margin: 10 }} />,
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0
      }
    },
    initialRouteName: 'Initial'
  }
);

const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreenContainer,
    // Station: StationScreenContainer,
    Profile: ProfileScreen,
    EditProfile: EditProfileContainer,
    // Route: RouteScreen,
    AllRoutes: AllRoutesScreen,
    Notification: NotificationsScreenContainer,
    SingleNotification: SingleNotificationScreenContainer,
    SinglePayment: SinglePaymentScreenContainer,
    Settings: SettingsScreen,
    SettingsLanguage: SettingsLanguageScreen,
    SettingsCity: SettingsCityScreen,
    Payment: PaymentsScreenContainer
  },
  {
    navigationOptions: {
      header: null
    },
    initialRouteName: 'Main',
    resetOnBlur: true
  }
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Main: MainScreenContainer,
    Tariffs: TariffsScreen,
    Favorites: FavoritesScreen,
    MakePay: MakePay,
    Station: StationScreenContainer,
    Route: RouteScreen,
    AppStackNavigator
  },
  {
    tabBarComponent: props => <BottomTabs {...props} />,
    navigationOptions: {
      header: null
    },
    initialRouteName: 'Main'
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Main: { screen: AppTabNavigator },
    Auth: LoginNavigator
  },
  {
    initialRouteName: 'Auth'
  }
);

class App extends Component {
  async componentDidMount() {
    const { store } = this.props;
    if (Platform.OS === 'ios') {
      watchPosition(store);
    }
  }

  // requestPermissions = async () => {
  //   try {
  //     const permissions = await PermissionAndroid.request([
  //       PermissionAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     ]);

  //     return permissions;
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   return null;
  // };

  render() {
    const Stack = createAppContainer(AppSwitchNavigator);
    return (
      <Stack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;
