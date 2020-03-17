import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStation } from '../../redux/stations';
import { getFavorites, addFavorite, deleteFavorite } from '../../redux/favorite';
import { StationScreen } from '../../screens';

export default connect(
  ({ stations, location, themeChanger, favorite, auth }) => ({
    stations,
    location,
    mainColor: themeChanger.main_color,
    favorites: favorite.favorite_stations,
    favoriteLoaded: favorite.favorite_stations_loaded,
    favoriteAdded: favorite.favorite_added,
    token: auth.token,
  }),
  dispatch =>
    bindActionCreators(
      {
        getStation,
        getFavorites,
        addFavorite,
        deleteFavorite,
      },
      dispatch,
    ),
)(StationScreen);
