import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { fonts } from '../../constants';
import {
  LockIcon,
  ArrowDestIcon,
  ArrowBackIcon,
  BikeSmallIcon,
  StarSmallIcon,
  StartPointerIcon,
} from '../../components/svg';
import { coordsDistMeters } from '../../helpers';

class StationScreen extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: "Карта",
  //   headerTitleStyle: {
  //     fontFamily: fonts.OpenSansSemiBold,
  //     fontSize: 16,
  //     textTransform: "uppercase",
  //     color: "#54575A",
  //     letterSpacing: 1
  //   },
  //   headerLeft: (
  //     <TouchableOpacity onPress={() => navigation.goBack()}>
  //       <ArrowBackIcon />
  //     </TouchableOpacity>
  //   ),
  //   headerLeftContainerStyle: {
  //     paddingLeft: 10
  //   }
  // });

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      pointA: null,
      pointB: null,
    };
    this._isMounted = false;
  }

  addPointA = () => {
    const {
      stations: { station },
    } = this.props;

    const { pointB } = this.state;

    // console.log(station);

    if (pointB === station) {
      alert('такая станция добавлена');
    } else {
      this.setState({
        pointA: station,
      });
    }
  };

  deletePointA = () => {
    this.setState({
      pointA: null,
      pointB: null,
    });
  };

  addPointB = () => {
    const {
      navigation,
      stations: { station },
    } = this.props;
    const { pointA } = this.state;
    // console.log(station);
    if (pointA === station) {
      alert('Выберите другой пункт!');
      navigation.navigate('Main');
    } else {
      this.setState({
        pointB: station,
      });
    }
  };

  deletePointB = () => {
    this.setState({
      pointB: null,
    });
  };

  addToFavorites = () => {
    const { addFavorite, getFavorites, navigation } = this.props;
    const { id, token } = navigation.state.params;
    const dataToSend = {
      token: token,
      station_id: id,
    };
    addFavorite({ ...dataToSend });
    this.setState({
      isFavorite: true,
    });
  };

  deleteFromFavorites = () => {
    const { deleteFavorite, navigation } = this.props;
    const { id, token } = navigation.state.params;
    const dataToSend = {
      token: token,
      station_id: id,
    };
    deleteFavorite({ ...dataToSend });
    this.setState({
      isFavorite: false,
    });
  };

  isItFavorite = id => {
    let founded = false;
    const { favorites } = this.props;
    favorites &&
      favorites.map(it => {
        if (it.station_id == id) {
          this.setState({
            isFavorite: true,
          });
          return (founded = true);
        } else if (it.station_id != id && !founded) {
          this.setState({ isFavorite: false });
        }
      });
  };

  // componentWillMount() {
  componentDidMount() {
    const { getStation, navigation, getFavorites } = this.props;
    const { id, token } = navigation.state.params;
    const dataToSend = {
      token: token,
    };
    getStation(id);
    getFavorites({ ...dataToSend });
  }

  // componentDidMount() {
  // this._isMounted = true;
  // const { navigation, favoriteLoaded } = this.props;
  // console.log('🐞: componentDidMount -> this.props', this.props);
  // const { id } = navigation.state.params;
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  componentDidUpdate(prevProps) {
    const {
      navigation,
      favorites,
      getStation,
      favoriteLoaded,
      favoriteAdded,
      stations,
    } = this.props;
    const { id, token } = navigation.state.params;
    console.log('Update', stations);
    // if(prevProps.stations.station !== stations.station && stations.station){
    //   this._isMounted = true;
    // }
    if (prevProps.favoriteLoaded !== favoriteLoaded && favoriteLoaded) {
      this.isItFavorite(id);
    }
    if (prevProps.navigation.state.params.id !== navigation.state.params.id && favoriteLoaded) {
      getStation(id);
      this.isItFavorite(id);
    }
    if (prevProps.favorites !== favorites && favoriteLoaded && favoriteAdded) {
      this.isItFavorite(id);
    }
  }

  renderInfoBlock = (icon, title, subtitle) => (
    <View style={styles.infoBlockStyle}>
      <View style={styles.iconBlockStyle}>{icon}</View>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={styles.infoTitleStyle}>{title}</Text>
        <Text style={styles.infoSubtitleStyle}>{subtitle}</Text>
      </View>
    </View>
  );

  getDistance = () => {
    const {
      stations: { station },
      location: { location },
    } = this.props;
    // latitude: 51.158559,
    // longitude: 71.432440,
    const dist = (
      coordsDistMeters(
        location.latitude,
        location.longitude,
        station.location.latitude,
        station.location.longitude,
      ) / 1000
    ).toFixed(1);
    // console.log("dist", dist);
    return dist;
  };

  render() {
    const {
      stations: { station },
      location: { location },
      navigation,
      mainColor,
      favorites,
    } = this.props;
    console.log('🐞: render -> this.props', this.props);
    const { isFavorite, pointA, pointB } = this.state;
    const { id } = navigation.state.params;

    // TODO add custom loader
    // if (!station && favorites)
    //   return (
    // <View
    //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <ActivityIndicator size="large" color={mainColor} />
    // </View>
    //   );
    if (!station) return null;

    return (
      <Fragment>
        {!station && !favorites ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainColor} />
          </View>
        ) : (
          <View style={styles.containerStyle}>
            <View style={styles.containerHeader}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowBackIcon />
              </TouchableOpacity>
              <Text style={styles.containerHeaderTitle}>Станция</Text>
            </View>

            <ScrollView style={styles.headerWrap}>
              <View style={styles.headerContainerStyle}>
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.headerTitleStyle}>
                  {station.name.ru}
                </Text>
                <View
                  style={{
                    borderBottomColor: 'rgba(196, 196, 196, .3)',
                    borderBottomWidth: 2,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text style={styles.headerSubtitleStyle}>
                    {location ? this.getDistance() : 'Геолокация выключена 0'} км до станции
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                {this.renderInfoBlock(
                  <LockIcon />,
                  station.free_slots.ru,
                  `Всего слотов: ${station.total_slots}`,
                )}
                {this.renderInfoBlock(
                  <BikeSmallIcon />,
                  station.avl_bikes.ru,
                  `Всего велосипедов: ${station.total_slots}`,
                )}
                {this.renderInfoBlock(<StartPointerIcon />, station.address.ru, station.desc.ru)}
              </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!pointA) {
                    this.addPointA();
                  } else {
                    this.deletePointA();
                  }
                }}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonsText}>
                  {pointA ? 'Удалить A: ' + pointA.name.ru : 'Пункт A'}
                </Text>
              </TouchableOpacity>
              {pointA && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (!pointB) {
                      this.addPointB();
                    } else {
                      this.deletePointB();
                    }
                  }}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonsText}>
                    {pointB ? 'Удалить B: ' + pointB.name.ru : 'Пункт B'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!isFavorite) {
                    this.addToFavorites();
                  } else {
                    this.deleteFromFavorites();
                  }
                }}
              >
                <View style={styles.buttonsIcon}>
                  <StarSmallIcon fill={isFavorite && mainColor} color={mainColor} />
                </View>
                <Text style={styles.buttonsText}>
                  {isFavorite ? 'Удалить из избранных' : 'Добавить в избранное'}
                </Text>
              </TouchableOpacity>
              {pointA && pointB && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('Route', {
                      station,
                      location,
                      pointA,
                      pointB,
                    })
                  }
                >
                  <View style={styles.buttonsIcon}>
                    <ArrowDestIcon color={mainColor} />
                  </View>
                  <Text style={styles.buttonsText}>Проложить маршрут</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    marginBottom: 75,
  },
  containerHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(196,196,196,0.3)',
  },
  containerHeaderTitle: {
    fontFamily: fonts.OpenSansSemiBold,
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#54575A',
    letterSpacing: 1,
    marginLeft: 15,
  },
  headerWrap: {
    overflow: 'hidden',
    height: 200,
  },
  headerContainerStyle: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  headerTitleStyle: {
    fontSize: 26,
    fontFamily: fonts.OpenSansSemiBold,
  },
  headerSubtitleStyle: {
    fontSize: 13,
    fontFamily: fonts.OpenSansRegular,
    color: '#54565A',
    marginTop: 5,
    paddingBottom: 10,
  },
  infoBlockStyle: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  iconBlockStyle: {
    width: 20,
    alignItems: 'center',
  },
  infoTitleStyle: {
    fontFamily: fonts.OpenSansRegular,
  },
  infoSubtitleStyle: {
    color: '#A5AAAF',
    marginTop: 5,
    fontSize: 11,
    fontFamily: fonts.OpenSansRegular,
  },
  buttonsContainer: {
    marginTop: 'auto',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(196, 196, 196, .3)',
    padding: 12,
  },
  buttonsIcon: {
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsText: {
    marginLeft: 15,
    fontFamily: fonts.OpenSansSemiBold,
  },
});

export default StationScreen;
