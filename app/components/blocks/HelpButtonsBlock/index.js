import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { LocationIcon, SupportIcon } from '../../svg';

import { showModal, hideModal } from '../../../redux/modal';
import { shadowBoxStyles } from '../../../styles';

import AsyncStorage from '@react-native-community/async-storage';
import { watchPosition, clearWatchPosition } from '../../../helpers';
import store from '../../../redux';
import { setLocation } from '../../../redux/location';

const mapDispatchToProps = (dispatch, store) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  }
});

const mapStateToProps = state => ({
  mainColor: state.themeChanger.main_color
});

class HelpButtonsBlock extends Component {
  state = {
    geoLocation: false
  };

  _watchId = '';

  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  openMenuModal = () => {
    const { showModal } = this.props;
    showModal(
      {
        open: true,
        title: 'Техподдержка',
        closeModal: this.closeModal
      },
      'help'
    );
  };

  _toggleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        store.dispatch(
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude
          })
        );

        this.setState(
          prevState => ({ geoLocation: !prevState.geoLocation }),
          () => {
            AsyncStorage.setItem('geoLocation', JSON.stringify(this.state.geoLocation));
            if (this.state.geoLocation) {
              this._watchId = watchPosition(store);
            } else {
              clearWatchPosition(this._watchId);
            }
          }
        );
      },
      errors => {
        alert('Включите геолокацию!');
      }
    );
  };

  async componentDidMount() {
    // включаем слежение за геопозицией
    await AsyncStorage.getItem('geoLocation').then(res => {
      const geoLocation = res ? JSON.parse(res.toLowerCase()) : false;
      // console.log('ROAD RESULT', road);
      this.setState({ geoLocation });
    });
  }

  render() {
    const { mainColor } = this.props;
    const { geoLocation } = this.state;
    const data = [
      {
        icon: <LocationIcon color={geoLocation ? '#FFF' : null} />,
        bgColor: geoLocation ? mainColor : '#FFF'
      },
      {
        icon: <SupportIcon />,
        bgColor: mainColor
      }
    ];

    return (
      <View style={styles.container}>
        {data.map((item, key) => {
          return (
            <TouchableOpacity
              key={key}
              style={[
                shadowBoxStyles,
                styles.iconContainerStyle,
                {
                  backgroundColor: item.bgColor,
                  elevation: 2
                }
              ]}
              onPress={() => {
                key === 0 ? this._toggleGeoLocation() : this.openMenuModal();
              }}
            >
              {item.icon}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconContainerStyle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpButtonsBlock);
