import React, { Component } from 'react';
import { ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavorites, deleteFavorite } from '../../redux/favorite';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import { fonts } from '../../constants';

import FavoriteCard from './FavoriteCard';
import { View } from 'react-native-animatable';

// Styles
const wrap = {
  height: '100%',
  marginHorizontal: 5,
  backgroundColor: '#ffffff',
  borderRadius: 15,
  paddingHorizontal: 20,
  paddingTop: 25,
  // paddingBottom: 20
};
const title = {
  fontFamily: fonts.RobotoSlabBold,
  fontSize: 22,
  color: '#54575A',
  marginBottom: 25,
};

// User token
let token = '';
AsyncStorage.getItem('user_token').then(tkn => {
  token = tkn;
});

class FavoritesScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  _dataToken = {
    token: token,
  };

  deleteStation = index => {
    const { getFavorites, deleteFavorite, favorites } = this.props;
    const dataToDelete = {
      token: token,
      station_id: favorites[index].station_id,
    };
    const dataToRefresh = {
      token: token,
    };
    deleteFavorite({ ...dataToDelete });
    getFavorites({ ...dataToRefresh });
  };

  reloadFavorites = data => {
    const { getFavorites } = this.props;
    getFavorites({ ...data });
  };

  componentDidMount() {
    const { getFavorites } = this.props;
    const data = {
      token: token,
    };

    getFavorites({ ...data });
  }

  render() {
    const { favorites, navigation, isLoading } = this.props;

    // if (!favorites) return null;

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Избранное">
        <View style={wrap}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Text style={title}>Избранное</Text>
            <TouchableOpacity onPress={() => this.reloadFavorites(this._dataToken)}>
              <Text>Обновить</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {isLoading ? (
              <ActivityIndicator size="large" color="#67A960" />
            ) : favorites ? (
              favorites.map((it, key) => (
                /* --- porps of this component ---
                  stationName - name of the station;
                  stationAdress - detailed addres of the station;
                  deleteHandler - deleting action handler
							  */
                <FavoriteCard
                  key={key}
                  stationName={it.station_name.ru}
                  stationAdress={it.station_address.ru}
                  deleteHandler={() => {
                    this.deleteStation(key);
                  }}
                />
              ))
            ) : (
              <Text>Нет избранных маршрутов</Text>
            )}
          </ScrollView>
        </View>
      </DropdownMenuLayout>
    );
  }
}

export default connect(
  ({ favorite }) => ({
    favorites: favorite.favorite_stations,
    isLoading: favorite.favorite_stations_in_progress,
  }),
  dispatch =>
    bindActionCreators(
      {
        getFavorites,
        deleteFavorite,
      },
      dispatch,
    ),
)(FavoritesScreen);
