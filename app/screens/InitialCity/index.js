/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { setTheme } from '../../redux/themeChanger';
import { profileData } from '../../redux/profile';
import { QBikeLogo } from '../../components/svg';
import { baseStyles } from '../../styles';

const data = [
  {
    city: 'Нур-Султан',
    value: '#00a5b4',
  },
  {
    city: 'Алматы',
    value: '#83bc00',
  },
  {
    city: 'Шымкент',
    value: '#d5152c',
  },
];

class InitialCity extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontColor: '#54575A',
      appLoaded: false,
      pressKey: null,
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ appLoaded: true });

    const { navigation, profileData } = this.props;

    await AsyncStorage.getItem('user_token', (err, res) => {
      if (res) {
        profileData().then(res => {
          if (res.success) navigation.navigate('Main');
        });
      }
    });
  }

  // componentDidMount() {
  //   this._isMounted = true;
  //   this._isMounted && this.setState({ appLoaded: true });
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setMainColor = it => {
    const { navigation, setTheme } = this.props;
    setTheme(it);
    navigation.navigate('Welcome');
  };

  render() {
    const { fontColor, appLoaded, keyPress } = this.state;

    if (!appLoaded)
      return (
        <View>
          <Text>Загрузка...</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        <QBikeLogo />
        <Text style={{ ...baseStyles.h1, marginBottom: 45 }}>Выбор города</Text>
        <View style={styles.cities}>
          {data.map((it, key) => (
            <View
              key={it.city}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: key !== 2 ? '#eee' : 'transparent',
              }}
            >
              <TouchableHighlight
                underlayColor={it.value}
                activeOpacity={1}
                onShowUnderlay={() => {
                  this.setState({ fontColor: '#ffffff', keyPress: key });
                }}
                onHideUnderlay={() => {
                  this.setState({ fontColor: '#54575A', keyPress: null });
                }}
                style={{
                  ...styles.citiesItem,
                  borderTopLeftRadius: key === 0 ? 15 : 0,
                  borderTopRightRadius: key === 0 ? 15 : 0,
                  borderBottomLeftRadius: key === 2 ? 15 : 0,
                  borderBottomRightRadius: key === 2 ? 15 : 0,
                }}
                onPress={() => {
                  this.setMainColor(it.value);
                }}
              >
                <Text
                  style={{
                    ...styles.cityTitle,
                    color: key === keyPress ? fontColor : '#54575A',
                  }}
                >
                  {it.city}
                </Text>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F8F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cities: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    overflow: 'hidden',
    elevation: 1,
  },
  citiesItem: {
    paddingVertical: 20,
    paddingHorizontal: 65,
  },
  cityTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default connect(
  ({ themeChanger }) => ({
    colorSet: themeChanger.color_set,
    mainColor: themeChanger.main_color,
  }),
  { setTheme, profileData },
)(InitialCity);
