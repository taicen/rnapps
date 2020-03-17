import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from '../../../components/ui';
import { fonts } from '../../../constants';
import { logout } from '../../../redux/logout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LogOutModal extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isToken: '',
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem('user_token').then(tkn => {
      this.setState({
        isToken: tkn,
      });
    });
  }

  logoutHandler = () => {
    const { logout, logoutSuccess, navigation, logoutSuccessNavigation, closeHandler } = this.props;
    const { isToken } = this.state;
    console.log('🐞: LogOutModal -> logoutHandler -> isToken', isToken);
    const dataToSend = {
      token: isToken,
    };
    // navigation.navigate("InitalCity");
    if (!logoutSuccess) {
      logout({ ...dataToSend });
    }
    // logoutSuccessNavigation();
    // AsyncStorage.clear();
    // closeHandler();
  };

  componentDidUpdate(prevProps) {
    const { closeHandler, logoutSuccessNavigation, logoutSuccess } = this.props;
    if (prevProps.logoutSuccess !== logoutSuccess && logoutSuccess) {
      console.log('didUpdate is works');
      logoutSuccessNavigation();
      AsyncStorage.clear();
      closeHandler();
    }
  }

  render() {
    const { isModalActive, closeHandler } = this.props;
    console.log('modal props', this.props);

    return (
      <Modal animationType="slide" transparent={true} visible={isModalActive}>
        <View style={modalWrap}>
          <View style={wrapper}>
            <Text style={title}>Хотите выйти из аккаунта?</Text>
            <View style={buttonWrap}>
              <Button title="Да" width="48%" onPress={this.logoutHandler} />
              <Button title="Нет" width="48%" white onPress={closeHandler} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default connect(
  ({ logout }) => ({
    logoutSuccess: logout.logout_success,
  }),
  dispatch =>
    bindActionCreators(
      {
        logout,
      },
      dispatch,
    ),
)(LogOutModal);

// <== Styles ==>
const modalWrap = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.5)',
};
const wrapper = {
  backgroundColor: '#ffffff',
  width: '80%',
  // height: 200,
  paddingHorizontal: 35,
  paddingVertical: 45,
  borderRadius: 20,
  shadowOffset: { width: 0, height: 10 },
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowRadius: 20,
};
const title = {
  fontFamily: fonts.RobotoSlabBold,
  fontSize: 26,
  textAlign: 'center',
  marginBottom: 25,
};
const buttonWrap = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
