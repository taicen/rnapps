import React, { Fragment } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import validate from './validate';
import {
  sendSmsCodeAction,
  checkPhoneAction,
  confirmCode as confirmCodeActive,
} from '../../../redux/auth';
import { FormInput, ButtonInline, Button } from '../../../components/ui';
import { normalizePhone } from '../../../helpers';

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneChecked: false,
      phone: '',
      checkCode: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { codeValue, handleNextStep, confirmCode, confirmed } = this.props;

    if (prevProps.codeValue !== codeValue) {
      if (codeValue && codeValue.length === 4) {
        confirmCode({ phone_number: this.state.phone, code: codeValue }).then(res => {
          // console.log('>>>>>>>>>>', success);
          if (process.env.NODE_ENV === 'development' || res.success) {
            // handleNextStep();
            // подтверждение смс кода
            this.setState({ checkCode: res.success });
            !res.success && Alert.alert('Ошибка', res.data.message);
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this.setState({ checkCode: false, phoneChecked: false, phone: '' });
  }

  handleCheckPhone = e => {
    const { checkPhone } = this.props;
    const normilizePhone = normalizePhone(e.phone_number, true);
    //console.log('🐞: normilizePhone', normilizePhone);
    checkPhone(normilizePhone).then(phoneChecked => {
      // console.log('!!!!phoneChecked', phoneChecked);
      this.setState({ phone: normilizePhone, phoneChecked: phoneChecked });
    });
  };

  handleSmsCode = () => {
    const { sendSmsCode } = this.props;
    sendSmsCode(this.state.phone);
  };

  render() {
    const { loading, handleSubmit, handleNextStep, codeValue } = this.props;
    const { phoneChecked } = this.state;
    return (
      <Fragment>
        <Field
          loading={loading}
          component={FormInput}
          mask="+7 ([000]) [000] [00] [00]"
          unControlled
          phoneInput
          hasArrowButton
          name="phone_number"
          label="Номер телефона"
          onPress={handleSubmit(this.handleCheckPhone)}
          containerPropsStyle={{ marginTop: 30 }}
          disable={phoneChecked}
        />
        {phoneChecked && (
          <Fragment>
            <View style={style.codeContainer}>
              <Text style={style.retryCodeText}>Не пришел код? </Text>
              <ButtonInline onPress={this.handleSmsCode} title="Отправить еще раз" />
            </View>

            <Field mask="[0000]" component={FormInput} name="code" label="Код" width={80} />

            <Button
              disabled={!this.state.checkCode}
              style={style.submitButton}
              title="Далее"
              onPress={handleNextStep}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const style = StyleSheet.create({
  codeContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  retryCodeText: {
    color: '#54575A',
    fontSize: 12,
  },
  submitButton: {
    marginTop: 30,
  },
});

const selector = formValueSelector('registration');

export default compose(
  connect(
    state => ({
      loading: state.auth.loading,
      confirmed: state.auth.code_confirmed,
      codeValue: selector(state, 'code'),
    }),
    {
      sendSmsCode: sendSmsCodeAction,
      checkPhone: checkPhoneAction,
      confirmCode: confirmCodeActive,
    },
  ),
  reduxForm({
    form: 'registration',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    validate,
  }),
)(FirstStep);
