import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import EmailInputScreen from '../screens/EmailInputScreen';
import PasswordInputScreen from '../screens/PasswordInputScreen';

const StackNavigator = createStackNavigator(
  {
    IntroScreen: IntroScreen,
    LoginScreen: LoginScreen,
    EmailInputscreen: EmailInputScreen,
    PasswordInputscreen: PasswordInputScreen,
    // TouchAuthentication: TouchAuthentication,
    // onBoardScreen: {
    //   screen: onBoardScreen,
    // },
    // SelectProfileScreen: SelectProfileScreen,
    // SetGoalScreen: SetGoalScreen,
    // CustomizeInterest: CustomizeInterest,
    // SelectGender: SelectGender,
  },{
    initialRouteName: 'LoginScreen'
  }
);

export default createAppContainer(StackNavigator);