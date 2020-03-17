import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { reduxForm, Field } from 'redux-form';

import { baseStyles } from '../../styles';
import { QBikeLogo } from '../../components/svg';
import { FormInput, Button } from '../../components/ui';
import { sendSms } from '../../redux/auth';

const layoutStyle = {
  paddingTop: 60,
  paddingBottom: 40,
  paddingHorizontal: 30,
};

const headerStyle = {
  alignItems: 'center',
};

const hintText = {
  color: '#54575A',
  textAlign: 'center',
};

const hint =
  'Для сброса пароля впишите свой телефон.\nНа него мы отправим на него код с подтверждением.';

class ForgetPasswordScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      isCodeSaved: false,
      theCode: undefined,
      phone_number: undefined,
      codeIsConfirmed: false,
      isLoading: false,
      timer: 59,
    };
  }

  generateCode = () => {
    let code = null;
    code = Math.floor(1000 + Math.random() * 9000);
    return code;
  };

  componentDidMount() {
    this.setState({
      theCode: this.generateCode(),
    });
  }

  submit = values => {
    const { currentStep, isCodeSaved, theCode } = this.state;
    const { saveCode, sendPassCode, newPass, navigation } = this.props;
    const userCode = parseInt(values.code, 10);
    const number = values.phone_number.replace(/[^0-9]/g, '');
    const dataToSave = {
      phone_number: `+7${number}`,
      code: theCode,
    };
    const dataToSend = {
      phone_number: `+7${number}`,
      message: `Код проверки - ${theCode}`,
    };
    const dataToCreate = {
      ...dataToSave,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    console.log('currentStep', currentStep, !isCodeSaved);
    if (currentStep === 1 && !isCodeSaved) {
      console.log('here');
      saveCode(dataToSave);
      sendPassCode(dataToSend);
      this.setState({
        isCodeSaved: true,
        phone_number: `+7${number}`,
      });
      this.countDown();
    } else if (currentStep === 1 && theCode === userCode) {
      this.setState(
        {
          currentStep: 2,
          codeIsConfirmed: true,
        },
        console.log('currentStep', currentStep),
      );
    } else {
      newPass(dataToCreate);
      this.setState({
        isLoading: true,
      });
    }
  };

  resendCode = () => {
    const { phone_number, theCode } = this.state;
    const { sendPassCode } = this.props;
    const dataToSend = {
      phone_number,
      message: `Код проверки - ${theCode}`,
    };
    sendPassCode(dataToSend);
    this.setState({
      timer: 59,
    });
  };

  componentDidUpdate(prevState, prevProps) {
    const { isLoading } = this.state;
    const { isDone, navigation, inProgress } = this.props;
    if (prevState.isLoading && !inProgress) {
      this.setState({
        isLoading: false,
      });
    }
    if (isDone) {
      navigation.navigate('Login');
    }
  }

  countDown = () => {
    const { timer } = this.state;
    if (timer === 0) clearInterval();
    setInterval(() => {
      this.setState(prevState => ({ timer: prevState.timer - 1 }));
    }, 1000);
  };

  render() {
    const { currentStep, isCodeSaved, isLoading, timer } = this.state;
    const { handleSubmit, inProgress, mainColor } = this.props;
    // console.log("🐞: ForgetPasswordScreen -> render -> this.props", this.props);

    return (
      <KeyboardAwareScrollView>
        <View style={{ ...layoutStyle }}>
          <View style={{ ...headerStyle }}>
            <QBikeLogo color={mainColor} />
            <Text style={baseStyles.h1}>
              {currentStep === 1 ? 'Восстановить пароль' : 'Сброс пароля'}
            </Text>
            {currentStep === 1 && <Text style={{ ...hintText }}>{hint}</Text>}
          </View>
          <View>
            {currentStep === 1 ? (
              <Fragment>
                <Field
                  component={FormInput}
                  name="phone_number"
                  label="Номер телефона"
                  phoneInput
                  // hasArrowButton
                />
                {isCodeSaved && (
                  <Fragment>
                    <Field component={FormInput} name="code" label="Код подтверждения" />
                    {timer > 0 ? (
                      <Text
                        style={{
                          textAlign: 'right',
                          marginBottom: -15,
                          marginTop: 10,
                          fontSize: 12,
                          color: '#67A960',
                        }}
                      >
                        Повторная отправка кода через - 00:
                        {timer >= 10 ? timer : `0${timer}`}
                      </Text>
                    ) : (
                      <TouchableOpacity onPress={this.resendCode}>
                        <Text
                          style={{
                            textAlign: 'right',
                            marginBottom: -18,
                            marginTop: 8,
                            fontSize: 16,
                            color: '#67A960',
                          }}
                        >
                          Повторная отправка
                        </Text>
                      </TouchableOpacity>
                    )}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <Field
                  component={FormInput}
                  name="password"
                  label="Новый пароль"
                  passwordInput
                  hasArrowButton
                />
                <Field
                  component={FormInput}
                  name="password_confirmation"
                  passwordInput
                  label="Подтвердите новый пароль"
                />
              </Fragment>
            )}
            <Button
              title={
                currentStep === 1 && !isCodeSaved
                  ? 'Получить код'
                  : currentStep === 1 && isCodeSaved
                  ? 'Отправить код'
                  : 'Сбросить пароль'
              }
              style={{ marginTop: 30 }}
              loading={isLoading}
              onPress={handleSubmit(this.submit)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default reduxForm({
  form: 'forgetPassword',
})(ForgetPasswordScreen);
