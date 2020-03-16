import React, { Component, Fragment } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import { NotificationIcon, RidesIcon, FriendsIcon, WalletsIcon, SettingsIcon } from '../../svg';
import modalStyles from '../../../styles/ModalLists';
// import ProfileScreen from "../../screens/ProfileScreen";
import { connect } from 'react-redux';
import { profileData } from '../../../redux/profile';

class ModalMenu extends Component {
  // отключил
  // componentWillMount() {
  //   const { profileData } = this.props;
  //   profileData();
  // }

  renderMenuHeader = () => {
    const { navigation, closeModal, data, photos } = this.props;
    return (
      <View style={modalStyles.menuHeaderContainer}>
        {photos && (
          <Image
            source={{ uri: photos.photo_1 }}
            style={modalStyles.menuHeaderAvatar}
            resizeMode="cover"
          />
        )}
        <Text style={modalStyles.menuHeaderName}>{data && data.name}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
            closeModal();
          }}
        >
          <Text style={modalStyles.menuListItemDesc}>Настройки профиля</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { loading, navigation, closeModal, mainColor, moderation, approved } = this.props;
    const menuData = [
      {
        key: 'notification',
        title: 'Уведомления',
        desc: 'Информация об уведомлениях',
        icon: <NotificationIcon color={mainColor} />,
        clickable: false,
        route: 'Notification',
        approved: false,
        moderation: true
      },
      {
        key: 'rides',
        title: 'Поездки',
        desc: 'История поездок, лучшая поездка',
        icon: <RidesIcon color={mainColor} />,
        clickable: false,
        route: 'AllRoutes',
        approved,
        moderation
      },
      {
        key: 'wallets',
        title: 'Платежи',
        desc: 'История платежей',
        icon: <WalletsIcon color={mainColor} />,
        clickable: false,
        route: 'Payment',
        approved,
        moderation
      },
      // {
      //   key: "friends",
      //   title: "Друзья",
      //   desc: "Список друзей",
      //   icon: <FriendsIcon color={mainColor} />,
      //   clickable: false,
      //   route: "Friends",
      //   approved: auth.approved,
      //   moderation: auth.moderation
      // },
      {
        key: 'settings',
        title: 'Настройки',
        desc: 'Настройки приложения',
        icon: <SettingsIcon color={mainColor} />,
        clickable: true,
        route: 'Settings',
        approved,
        moderation
      }
    ];

    if (loading) return null;

    return (
      <View style={modalStyles.shadowContainer}>
        <FlatList
          data={menuData}
          style={modalStyles.menuContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <Fragment>
                {!item.approved && item.moderation && (
                  <TouchableOpacity
                    style={modalStyles.menuListItem}
                    onPress={() => {
                      navigation.navigate(item.route);
                      closeModal();
                    }}
                  >
                    <View style={modalStyles.menuListItemIcon}>{item.icon}</View>
                    <View>
                      <Text style={modalStyles.menuListItemTitle}>{item.title}</Text>
                      <Text style={modalStyles.menuListItemDesc}>{item.desc}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </Fragment>
            );
          }}
          ListHeaderComponent={this.renderMenuHeader}
        />
      </View>
    );
  }
}

// export default ModalMenu;
export default connect(
  ({ profile, themeChanger }) => ({
    loading: profile.loading,
    data: profile.profile_data,
    photos: profile.profile_photo,
    mainColor: themeChanger.main_color,
    moderation: profile.profile_data.confirmed === 'Y' ? true : false,
    approved: profile.profile_data.confirmed === 'P' ? true : false
  }),
  { profileData }
)(ModalMenu);
