/* eslint-disable no-unused-vars */
import React, { Component, cloneElement } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FirstStep, SecondStep, ThirdStep } from './Steps';
import { QBikeLogo, Progress } from '../../components/svg';
import { baseStyles } from '../../styles';
import { register } from '../../redux/auth';

import ArrowBack from '../../components/svg/ArrowBackIcon';

const Steps = [<FirstStep />, <SecondStep />, <ThirdStep />];

class RegistrationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: false,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerLeft: (
        <View style={{ marginLeft: 20 }}>
          <ArrowBack
            onPress={() => {
              console.log(navigation);
              navigation.state.params.currentStep > 1
                ? navigation.state.params.handlePrevStep()
                : navigation.goBack();
            }}
          />
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = { currentStep: 1 };
  }

  componentDidMount() {
    this._setParams();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentStep !== this.state.currentStep) {
      this._setParams();
    }
  }

  _setParams() {
    this.props.navigation.setParams({
      currentStep: this.state.currentStep,
      handlePrevStep: this.handlePrevStep,
    });
  }

  handleNextStep = () => {
    this.setState(state => ({ currentStep: state.currentStep + 1 }));
  };

  handlePrevStep = () => {
    this.setState(state => ({ currentStep: state.currentStep - 1 }));
  };

  lastSubmit = values => {
    const { register: registerAction } = this.props;
    registerAction(values).then(response => {
      if (!response.success) {
        Alert.alert('Ошибка регистрации', response.message_ru, [{ text: 'Закрыть' }]);
      }
    });
  };

  render() {
    const { currentStep } = this.state;
    const { mainColor } = this.props;
    return (
      <KeyboardAwareScrollView horizontal={false} alwaysBounceVertical style={{ flex: 1 }}>
        <View style={style.container}>
          <View style={style.header}>
            <QBikeLogo color={mainColor} />
            <Text style={baseStyles.h1}>Регистрация</Text>
            <Progress color={mainColor} step={currentStep} />
            {currentStep === 1 && (
              <Text style={style.hintText}>
                Для регистрации необходим код подтверждения. Код подтверждения придет на ваш телефон
              </Text>
            )}

            {cloneElement(Steps[currentStep - 1], {
              handleNextStep: this.handleNextStep,
              handlePrevStep: this.handlePrevStep,
              lastSubmit: this.lastSubmit,
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 50,
    marginHorizontal: 30,
  },
  header: {
    alignItems: 'center',
  },
  hintText: {
    color: '#54575A',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default connect(null, { register })(
  reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    form: 'registration',
    initialValues: {
      notifications: 0,
      gender: null,
      birthday: null,
      lang_bike: 'ru_RU',
    },
  })(RegistrationScreen),
);
