import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//import OneSignal from 'react-native-onesignal';
import { MSContextProvider, MSContextConsumer } from '../../context/MainScreenContext';

import Layout from '../../components/layouts/Layout';
// import MapComponent from '../../../containers/MapContainer'
import veloRoad from './veloroad.json';

import MapComponent from '../../components/Map';

import {
  TopBlock,
  BottomBlock,
  // BottomTabs,
  // CurrentSessionBlock,
  HelpButtonsBlock,
  // OverlayBlock,
  SearchBlock,
} from '../../components/blocks';
import { ShowList } from '../../components/blocks/SearchBlock/partials/ShowList';

class MainScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      color: '',
      heightTopBlock: 'auto',
      widthTopBlock: 'auto',
    };
  }

  componentWillMount() {
    const { fetchStations, getCallbackForm } = this.props;

    fetchStations();
    getCallbackForm();

    // OneSignal.init('a610fa20-489b-4e40-9292-dd5db0d9559f');

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  componentDidUpdate(prevProps, prevState) {
    const { notice_on } = this.props;

    // if (prevProps.notice_on !== notice_on) {
    //   OneSignal.setSubscription(notice_on);
    // }
  }

  async componentDidMount() {
    const { setTheme, mainColor, fetchStatusNotifications, fetchStatusRoad } = this.props;

    if (mainColor === '') {
      let setMainColor = '';
      await AsyncStorage.getItem('primary_color').then(clr => {
        setMainColor = clr;
        this.setState({ color: clr });
      });
      await AsyncStorage.getItem('user_token').then(tkn => {
        this.setState({ token: tkn });
      });
      // проверяем настройки включенных пуш уведомлений
      await AsyncStorage.getItem('notification_on').then(res => {
        const notice_on = res ? JSON.parse(res.toLowerCase()) : false;
        // console.log('NOTICE RESULT', vehicle);
        fetchStatusNotifications({ notice_on });
      });
      // проверяем настройки включенных велодорожек
      await AsyncStorage.getItem('road_on').then(res => {
        const road_on = res ? JSON.parse(res.toLowerCase()) : false;
        // console.log('ROAD RESULT', road);
        fetchStatusRoad({ road_on });
      });

      if (setMainColor !== '' || setMainColor !== null) {
        setTheme(setMainColor);
      }
    }
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  _sizeBlock = (width, height) => {
    this.setState({ widthTopBlock: width, heightTopBlock: height });
  };

  render() {
    const { navigation, stations, resultList, confirmed, road_on } = this.props;
    const { token } = this.state;
    return (
      /*
        <== MSContextProvider (Main Screen Context Provider) - provider, which provides data from context to childs. Used in Main Screen ==>
      */
      <Layout>
        <MSContextProvider>
          <MSContextConsumer>
            {({ resultList }) => (
              // --> If there are data in search result MapComponent renders stations from result data nor all stations
              <MapComponent
                confirmed={confirmed}
                road_on={road_on}
                veloroads={veloRoad.results}
                navigation={navigation}
                stations={resultList ? resultList : stations && stations.station_list}
                token={token}
              />
            )}
          </MSContextConsumer>
          <TopBlock autoWidth={this.state.widthTopBlock} autoHeight={this.state.heightTopBlock}>
            <SearchBlock
              data={stations.station_list}
              navigation={navigation}
              token={token}
              color={this.state.color}
              getFocus={this._sizeBlock}
            />
          </TopBlock>
          <BottomBlock>
            <HelpButtonsBlock />
            <ShowList />
          </BottomBlock>
        </MSContextProvider>
      </Layout>
    );
  }
}

export default connect(({ stations, notifications, profile }) => ({
  confirmed: profile.profile_data && profile.profile_data.confirmed === 'Y' ? true : false,
  road_on: stations.road_on,
  notice_on: notifications.notification_on,
}))(MainScreen);
