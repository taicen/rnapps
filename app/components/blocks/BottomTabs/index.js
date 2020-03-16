import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { MapIcon, MenuIcon, StarIcon, WalletIcon } from '../../svg';

import { showModal, hideModal } from '../../../redux/modal';
import { shadowBoxStyles } from '../../../styles';

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  }
});

class BottomTabs extends Component {
  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  openMenuModal = () => {
    const { showModal, navigation } = this.props;
    showModal(
      {
        open: true,
        title: 'Меню',
        closeModal: this.closeModal,
        navigation: navigation
      },
      'menu'
    );
  };

  render() {
    const { navigation, mainColor, confirmed } = this.props;

    const { routes, index } = navigation.state;
    const onPress = this.openMenuModal;
    const { routeName } = navigation.state;
    const data = [
      {
        icon: <MapIcon color={mainColor} />,
        active: false,
        clickable: false,
        screenName: 'Main',
        confirmed
      },
      {
        icon: <WalletIcon color={mainColor} />,
        active: true,
        clickable: false,
        screenName: 'Tariffs',
        confirmed
      },
      {
        icon: <StarIcon color={mainColor} />,
        active: false,
        clickable: false,
        screenName: 'Favorites',
        confirmed
      },
      {
        icon: <MenuIcon color={mainColor} />,
        active: false,
        clickable: true,
        confirmed: true
      }
    ];

    return (
      <View style={[styles.tabsContainer, shadowBoxStyles]}>
        {data.map((tab, key) => {
          return (
            <Fragment key={key}>
              {tab.confirmed && (
                <TouchableOpacity
                  style={[
                    styles.tab,
                    index === key && !tab.clickable
                      ? { ...tabActive, borderTopColor: mainColor }
                      : null
                  ]}
                  onPress={
                    tab.clickable
                      ? onPress
                      : () =>
                          navigation.navigate(tab.screenName, {
                            title: tab.screenName
                          })
                  }
                >
                  {tab.icon}
                </TouchableOpacity>
              )}
            </Fragment>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabsContainer: {
    width: 100 - 7 + '%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 7,
    marginLeft: 10,
    marginRight: 10,
    position: 'absolute',
    bottom: 17,
    elevation: 2
  },
  tab: {
    width: '25%',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    height: 53,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

const tabActive = {
  // borderTopColor: "#67A960",
  borderTopWidth: 2
};

export default connect(
  ({ profile, themeChanger }) => ({
    confirmed: profile.profile_data && profile.profile_data.confirmed === 'Y' ? true : false,
    mainColor: themeChanger.main_color
  }),
  mapDispatchToProps
)(BottomTabs);
