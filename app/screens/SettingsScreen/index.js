import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import LogOutModal from './LogOutModal';
import { SwitchActions } from 'react-navigation';

import { fetchStatusNotifications } from '../../redux/notifications';
import { fetchStatusRoad } from '../../redux/stations';

import { Style } from './styles';
//import { isTSEnumMember } from "@babel/types";
//import { NavigationActions } from "react-navigation";

class SettingsScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false,
      road_on: false,
    };
  }

  modalOpenHandler = () => {
    this.setState({
      isModalActive: true,
    });
  };
  modalCloseHandler = () => {
    this.setState({
      isModalActive: false,
    });
  };

  // jump to initial screen after logining out
  logoutSuccessNavigation = () => {
    this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'Auth' }));
  };

  render() {
    const {
      navigation,
      mainColor,
      notice_on,
      road_on,
      fetchStatusNotifications,
      fetchStatusRoad,
    } = this.props;
    console.log('SettingsScreen', this.props);

    const { isModalActive } = this.state;
    const data = [
      {
        title: 'Язык',
        desc: 'Изменить язык приложении',
        switchable: false,
        hasModal: false,
        route: 'SettingsLanguage',
        callback: () => {},
      },
      {
        title: 'Город',
        desc: 'Выбрать доступные города',
        switchable: false,
        hasModal: false,
        route: 'SettingsCity',
        callback: () => {},
      },
      {
        title: 'Пуш уведомления',
        desc: 'Включить/выключить пуш уведемления',
        switchable: true,
        hasModal: false,
        route: '',
        switch: notice_on,
        callback: value => {
          fetchStatusNotifications({ notice_on: !value });
        },
      },
      {
        title: 'Показывать велодорожку',
        desc: 'Включить/выключить велодорожку',
        switchable: true,
        hasModal: false,
        route: '',
        switch: road_on,
        callback: value => {
          fetchStatusRoad({ road_on: !value });
        },
      },
      {
        title: 'Выйти из аккаунта',
        desc: 'Выйти из аккаунта',
        switchable: false,
        hasModal: true,
        route: '',
        callback: () => {},
      },
    ];
    return (
      <DropdownMenuLayout navigation={navigation} noDropdown screenName="Настройки">
        <View style={Style.main}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={Style.item}
                onPress={() => {
                  if (!item.switchable && !item.hasModal) {
                    navigation.navigate(item.route);
                  } else if (item.hasModal) {
                    this.modalOpenHandler();
                  } else {
                    item.callback(item.switch);
                  }
                }}
              >
                <View>
                  <Text style={Style.title}>{item.title}</Text>
                  <Text style={Style.desc}>{item.desc}</Text>
                </View>
                <View>
                  {item.switchable && (
                    <Switch
                      onValueChange={() => item.callback(item.switch)}
                      trackColor={{ false: '#B4B4B4', true: mainColor }}
                      thumbColor="#ffffff"
                      value={item.switch}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <LogOutModal
          navigation={navigation}
          isModalActive={isModalActive}
          closeHandler={this.modalCloseHandler}
          logoutSuccessNavigation={this.logoutSuccessNavigation}
        />

        {/* <BottomBlock>
          <BottomTabs navigation={navigation} />
        </BottomBlock> */}
      </DropdownMenuLayout>
    );
  }
}

export default connect(
  ({ stations, notifications, themeChanger }) => ({
    mainColor: themeChanger.main_color,
    notice_on: notifications.notification_on,
    road_on: stations.road_on,
  }),
  dispatch => ({
    fetchStatusNotifications: data => dispatch(fetchStatusNotifications(data)),
    fetchStatusRoad: data => dispatch(fetchStatusRoad(data)),
  }),
)(SettingsScreen);
