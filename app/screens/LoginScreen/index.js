import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { reduxForm, Field } from 'redux-form';

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

  // async componentDidMount() {
  //   const token = await AsyncStorage.getItem('user_token');
  // }

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
      alert(logining_error_message);
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
            <Button
              title="Войти"
              style={{ marginTop: 30 }}
              loading={logining_in}
              onPress={handleSubmit(this.submit)}
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
