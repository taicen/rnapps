import React, { Component } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavorites, deleteFavorite } from '../../redux/favorite';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import { fonts } from '../../constants';

import FavoriteCard from './FavoriteCard';
import { View } from 'react-native-animatable';

import { withNavigationFocus } from 'react-navigation';

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

class FavoritesScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  deleteStation = index => {
    const { getFavorites, deleteFavorite, favorites, token } = this.props;
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

  _getFavorites = () => {
    const { token, getFavorites } = this.props;
    getFavorites({ token: token });
  };

  componentDidMount() {
    this._getFavorites();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.isFocused && this._getFavorites();
    }
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
  ({ favorite, profile }) => ({
    token: profile.profile_token || null,
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
)(withNavigationFocus(FavoritesScreen));
