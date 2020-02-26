import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator, Keyboard, ScrollView, Platform } from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Block, Text, Input } from '../components';

import { theme } from '../constants';

const VALID_EMAIL = 'kriss @kriss.com';
const VALID_PASSWORD = '12345';

export default class LoginScreen extends React.Component {
  static navigationOptions = {};

  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
  };

  handleLogin = () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });
    // check with backend API or with some static data
    setTimeout(() => {
      if (email !== VALID_EMAIL) {
        errors.push('email');
      }

      if (password !== VALID_PASSWORD) {
        errors.push('password');
      }

      this.setState({ errors, loading: false });

      if (!errors.length) {
        navigation.navigate('BrowseScreen');
      }
    }, 2000);
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.Os == "ios" ? "padding" : "" } enabled>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              label="Email"
              style={styles.input}
              error={hasErrors('email')}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              style={styles.input}
              error={hasErrors('password')}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Input
              secure
              label="Password"
              style={styles.input}
              error={hasErrors('password')}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </Block>

          <Button gradient onPress={() => this.handleLogin()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>
          <Button onPress={() => navigation.navigate('ForgotScreen')}>
            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  login: {
    flex: 1, height: '100%'
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
