import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { reduxForm, Field } from 'redux-form';
import NetInfo from '@react-native-community/netinfo';
import { baseStyles } from '../../styles';
import { QBikeLogo } from '../../components/svg';
import { FormInput, Button, ButtonInline } from '../../components/ui';

// --- STYLES --- //
const layoutStyle = {
  paddingTop: 60,
  paddingBottom: 40,
  paddingHorizontal: 30,
};

const headerStyle = {
  alignItems: 'center',
};

class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      logined: false,
      fail: true,
      isConnected: false,
    };
  }

  submit = values => {
    const {
      login,
      auth: { logining_in },
    } = this.props;
    const number = values.phone_number.replace(/[^0-9]/g, '');
    // console.log(number);
    const data = { ...values, phone_number: `+${number}` };

    if (!logining_in) {
      login(data);
      this.setState({ fail: false });
    }
  };

  handleConnectivityChange = connection => {
    //console.log('Connection? ', connection.isConnected);
    this.setState({ isConnected: connection.isConnected });
  };

  componentDidMount() {
    this.netinfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    if (this.netinfoUnsubscribe) {
      this.netinfoUnsubscribe();
      this.netinfoUnsubscribe = null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      navigation,
      auth: { logining_success, logining_error, logining_error_message },
      logoutReset,
    } = this.props;
    // const { fail } = this.state;
    if (prevProps.auth.logining_success !== logining_success) {
      logoutReset();
      navigation.navigate('Main');
    }
    if (prevProps.auth.logining_error !== logining_error && logining_error) {
      Alert.alert(logining_error_message, '', [{ text: 'Закрыть' }]);
    }
  }

  render() {
    const {
      navigation,
      handleSubmit,
      mainColor,
      auth: { logining_in },
    } = this.props;

    return (
      <KeyboardAwareScrollView enableAutomaticScroll={true}>
        <View style={{ ...layoutStyle }}>
          <View style={{ ...headerStyle }}>
            <QBikeLogo color={mainColor} />
            <Text style={baseStyles.h1}>Авторизация</Text>
          </View>
          <View>
            <Field
              component={FormInput}
              mask="+7 ([000]) [000] [00] [00]"
              unControlled
              phoneInput
              name="phone_number"
              label="Номер телефона"
            />
            <Field
              component={FormInput}
              name="password"
              label="Пароль"
              hasInlineButton
              passwordInput
              inlineBtnOnPress={() => navigation.navigate('ForgetPassword')}
            />
            {!this.state.isConnected && (
              <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
                Подключите интернет соединение
              </Text>
            )}
            <Button
              title="Войти"
              style={{ marginTop: 30 }}
              loading={logining_in}
              onPress={handleSubmit(this.submit)}
              disabled={!this.state.isConnected}
              // onPress={this.submit}
            />
            <ButtonInline
              title="Назад"
              color="#000"
              onPress={() => navigation.goBack()}
              style={{
                alignSelf: 'center',
                fontSize: 16,
                paddingTop: 15,
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default reduxForm({
  form: 'login',
})(LoginScreen);
