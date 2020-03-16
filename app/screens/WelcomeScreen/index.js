import React from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/layouts/Layout';

import { Button, ButtonInline } from '../../components/ui';
import { QBikeLogo } from '../../components/svg';

const layoutStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

function WelcomeScreen({ navigation, mainColor }) {
  return (
    <Layout propStyles={{ ...layoutStyle }}>
      <QBikeLogo color={mainColor} full />

      <Button
        title="Войти"
        style={{ marginTop: 60 }}
        onPress={() => navigation.navigate('Login')}
      />
      <ButtonInline
        title="Регистрация"
        color="#000000"
        style={{
          fontSize: 16,
          paddingTop: 15,
        }}
        onPress={() => navigation.navigate('Registration')}
      />
    </Layout>
  );
}

WelcomeScreen.navigationOptions = {
  header: null,
};

export default connect(
  ({ themeChanger }) => ({
    mainColor: themeChanger.main_color,
  }),
  null,
)(WelcomeScreen);
