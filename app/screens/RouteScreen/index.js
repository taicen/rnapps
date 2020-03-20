import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { blocksContainerStyles } from '../../styles';
import { connect } from 'react-redux';

import MapComponent from '../../components/Map';
import Layout from '../../components/layouts/Layout';
import { headerNavTitleStyle } from '../../styles';
import { BottomBlock, BottomTabs } from '../../components/blocks';
import { StartPointerIcon, FinishIcon, StationMarker, ArrowDown } from '../../components/svg';
import { fonts } from '../../constants';
import { centerBetweenCoordinates } from '../../helpers';

const bottomContainerStyle = {
  backgroundColor: '#FFF',
  paddingTop: 14,
  paddingHorizontal: 23,
  paddingBottom: 18,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
};

const hideRoute = {
  height: 1,
  overflow: 'hidden',
};

const bulletBtn = {
  width: 32,
  height: 32,
  alignItems: 'center',
  zIndex: 12,
  justifyContent: 'center',
  alignContent: 'center',
  borderRadius: 32,
  color: '#fff',
  backgroundColor: '#67A960',
};

const bottomHeaderStyle = {
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(0, 0, 0, .1)',
  // paddingBottom: 20
};

const init_region = {
  latitude: 51.158559,
  longitude: 71.43244,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const myPos = {
  latitude: 51.161596,
  longitude: 71.435876,
};
class RouteScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    title: 'Проложить маршрут',
    headerTitleStyle: headerNavTitleStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      duration: null,
      distance: null,
      hideRoute: false,
      amount: null,
      coordinates: [
        // { longitude: 71.4146913, latitude: 51.1558136 },
        // { longitude: 71.4144142, latitude: 51.1556917 },
        // { longitude: 71.4142211, latitude: 51.1556278 },
        // { longitude: 71.4140816, latitude: 51.1556194 },
        // { longitude: 71.413926, latitude: 51.1556345 },
        // { longitude: 71.4138214, latitude: 51.1556682 },
        // { longitude: 71.4136015, latitude: 51.1557439 },
        // { longitude: 71.4133789, latitude: 51.1558482 },
        // { longitude: 71.4132743, latitude: 51.15586 },
        // { longitude: 71.4131509, latitude: 51.1558482 },
        // { longitude: 71.4130409, latitude: 51.1558162 },
        // { longitude: 71.4129685, latitude: 51.1557691 },
        // { longitude: 71.4129122, latitude: 51.1557035 },
        // { longitude: 71.4128585, latitude: 51.1555959 },
        // { longitude: 71.4129256, latitude: 51.1555 },
        // { longitude: 71.4130972, latitude: 51.1554041 },
        // { longitude: 71.4132126, latitude: 51.1553856 },
        // { longitude: 71.4134298, latitude: 51.1553368 },
        // { longitude: 71.4136444, latitude: 51.1552846 },
        // { longitude: 71.4137624, latitude: 51.155219 },
        // { longitude: 71.4138412, latitude: 51.1551334 },
        // { longitude: 71.4138841, latitude: 51.1550308 },
        // { longitude: 71.4137982, latitude: 51.154876 },
        // { longitude: 71.4136974, latitude: 51.1547676 },
        // { longitude: 71.4135525, latitude: 51.154628 },
        // { longitude: 71.4134801, latitude: 51.1544715 },
        // { longitude: 71.4134909, latitude: 51.1543992 },
        // { longitude: 71.4135633, latitude: 51.1543049 },
        // { longitude: 71.413684, latitude: 51.154204 },
        // { longitude: 71.4138234, latitude: 51.1541283 },
        // { longitude: 71.4139951, latitude: 51.1540745 },
        // { longitude: 71.414199, latitude: 51.1540358 },
        // { longitude: 71.414435, latitude: 51.1540307 },
        // { longitude: 71.4146603, latitude: 51.1540442 },
        // { longitude: 71.4148695, latitude: 51.154056 },
        // { longitude: 71.4151002, latitude: 51.1540745 },
        // { longitude: 71.4153577, latitude: 51.1541485 },
        // { longitude: 71.4156259, latitude: 51.1543033 },
        // { longitude: 71.415768, latitude: 51.1544294 },
        // { longitude: 71.4158056, latitude: 51.154559 },
        // { longitude: 71.4157654, latitude: 51.1547289 },
        // { longitude: 71.4156652, latitude: 51.1549263 },
        // { longitude: 71.4155451, latitude: 51.1550547 },
        // { longitude: 71.4153815, latitude: 51.1551944 },
        // { longitude: 71.4152313, latitude: 51.1552768 },
        // { longitude: 71.415006, latitude: 51.1553609 },
        // { longitude: 71.4148423, latitude: 51.1554249 },
        // { longitude: 71.4147431, latitude: 51.1554938 },
        // { longitude: 71.4145554, latitude: 51.15562 },
        // { longitude: 71.4144186, latitude: 51.1557024 },
        // { longitude: 71.4142201, latitude: 51.1558421 },
        // { longitude: 71.414086, latitude: 51.1559329 },
        // { longitude: 71.4139706, latitude: 51.1559901 },
        // { longitude: 71.4138499, latitude: 51.1560271 },
        // { longitude: 71.4136863, latitude: 51.1560355 },
        // { longitude: 71.4135173, latitude: 51.1560238 },
        // { longitude: 71.4134422, latitude: 51.1560086 },
        // { longitude: 71.4131499, latitude: 51.1559481 },
        // { longitude: 71.4130077, latitude: 51.1558875 },
        // { longitude: 71.4128468, latitude: 51.1557832 },
        // { longitude: 71.4127502, latitude: 51.1556452 },
        // { longitude: 71.4128039, latitude: 51.1554602 },
        // { longitude: 71.4130292, latitude: 51.1553424 },
        // { longitude: 71.4134154, latitude: 51.1552549 },
        // { longitude: 71.4136354, latitude: 51.1551944 },
        // { longitude: 71.4137534, latitude: 51.1550766 },
        // { longitude: 71.4137373, latitude: 51.1549454 },
        // { longitude: 71.4134959, latitude: 51.1547233 },
        // { longitude: 71.4133618, latitude: 51.1545215 },
        // { longitude: 71.4133671, latitude: 51.154397 },
        // { longitude: 71.4135603, latitude: 51.1541682 },
        // { longitude: 71.4138285, latitude: 51.1540235 },
        // { longitude: 71.4140967, latitude: 51.1539663 },
        // { longitude: 71.4144293, latitude: 51.153936 },
        // { longitude: 71.4148906, latitude: 51.1539797 },
        // { longitude: 71.4151535, latitude: 51.15401 },
        // { longitude: 71.4153573, latitude: 51.1540571 },
        // { longitude: 71.4156148, latitude: 51.154185 },
        // { longitude: 71.415765, latitude: 51.1542792 },
        // { longitude: 71.4158884, latitude: 51.1544138 },
        // { longitude: 71.4159367, latitude: 51.154545 },
        // { longitude: 71.4158991, latitude: 51.1547267 },
        // { longitude: 71.4157865, latitude: 51.154942 },
        // { longitude: 71.4156148, latitude: 51.1551372 },
        // { longitude: 71.4153573, latitude: 51.1552987 },
        // { longitude: 71.4151428, latitude: 51.1553794 },
        // { longitude: 71.4149657, latitude: 51.1554568 },
        // { longitude: 71.4149014, latitude: 51.1555544 },
        // { longitude: 71.4149175, latitude: 51.1556923 },
        // { longitude: 71.4150784, latitude: 51.1557765 },
        // { longitude: 71.4152447, latitude: 51.1558337 },
        // { longitude: 71.4154646, latitude: 51.155837 },
        // { longitude: 71.4157221, latitude: 51.1558 },
        // { longitude: 71.4158938, latitude: 51.1557092 },
        // { longitude: 71.4160493, latitude: 51.1554736 },
        // { longitude: 71.4161459, latitude: 51.1551439 },
        // { longitude: 71.4161942, latitude: 51.1549151 },
        // { longitude: 71.4163658, latitude: 51.1546863 },
        // { longitude: 71.4164463, latitude: 51.154619 },
        // { longitude: 71.4165965, latitude: 51.1545921 },
        // { longitude: 71.4169667, latitude: 51.1546863 },
        // { longitude: 71.4172242, latitude: 51.1548276 },
        // { longitude: 71.4179269, latitude: 51.155366 },
        // { longitude: 71.4179851, latitude: 51.1554749 },
        // { longitude: 71.4178939, latitude: 51.15567 },
        // { longitude: 71.417572, latitude: 51.1558046 },
        // { longitude: 71.4172233, latitude: 51.155919 },
        // { longitude: 71.4169658, latitude: 51.1559223 },
        // { longitude: 71.4165152, latitude: 51.1559022 },
        // { longitude: 71.4162846, latitude: 51.1559156 },
        // { longitude: 71.4154209, latitude: 51.1561242 },
        // { longitude: 71.4150937, latitude: 51.1562386 },
        // { longitude: 71.4135407, latitude: 51.1569637 },
        // { longitude: 71.4133878, latitude: 51.1569906 },
        // { longitude: 71.4132483, latitude: 51.1569906 },
        // { longitude: 71.4131169, latitude: 51.1569805 },
        // { longitude: 71.4129801, latitude: 51.1569469 },
        // { longitude: 71.4127843, latitude: 51.1568325 },
        // { longitude: 71.4127226, latitude: 51.1567834 },
        // { longitude: 71.412626, latitude: 51.1565412 },
        // { longitude: 71.4126797, latitude: 51.1564201 },
        // { longitude: 71.4127977, latitude: 51.1563057 },
        // { longitude: 71.4130015, latitude: 51.156198 },
        // { longitude: 71.4132268, latitude: 51.1561374 },
        // { longitude: 71.4134414, latitude: 51.1561509 },
        // { longitude: 71.4135339, latitude: 51.1561728 },
        // { longitude: 71.4136533, latitude: 51.1562148 },
        // { longitude: 71.4137914, latitude: 51.1562754 },
        // { longitude: 71.4139349, latitude: 51.1563292 },
        // { longitude: 71.4140798, latitude: 51.1563528 },
        // { longitude: 71.4141951, latitude: 51.1563595 },
        // { longitude: 71.4143185, latitude: 51.1563385 },
        // { longitude: 71.4145478, latitude: 51.1562401 },
        // { longitude: 71.414749, latitude: 51.1561206 },
        // { longitude: 71.4148724, latitude: 51.156034 },
        // { longitude: 71.4149059, latitude: 51.1559499 },
        // { longitude: 71.4148523, latitude: 51.1558826 },
        // { longitude: 71.4146913, latitude: 51.1558136 }
      ],
    };
  }

  hideRoute = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        hideRoute: !prevState.hideRoute,
      };
    });
  };

  setAmount(amount) {
    this.setState({ amount });
  }

  amountDistance = duration => {
    // Tarif
    // < 30 freebie
    // > 30 &&  < 60 - 100
    // > 60 &7 < 120 - 250
    // > 120 && < 180 - 500
    // > 180 - 1000 per hour
    //SMS
    // 1 day - 3500
    // 3 days - 9000
    // 7 days - 17500

    const time = Math.floor(duration);
    let amount = '';

    if (time <= 30) {
      amount = 'Бесплатно';
    } else if (time > 30 && time <= 60) {
      amount = 100;
    } else if (time > 60 && time <= 120) {
      amount = 250;
    } else if (time > 120 && time <= 180) {
      amount = 500;
    } else {
      amount = 1000;
    }

    this.setAmount(amount);

    return time;
  };

  render() {
    const { navigation, currentPosition, start, finish } = this.props;
    const { name, address, location } = navigation.state.params.station;
    const { pointA, pointB } = navigation.state.params;

    const origin = {
      latitude: pointA.location.latitude,
      longitude: pointA.location.longitude,
    };
    const destination = {
      latitude: pointB.location.latitude,
      longitude: pointB.location.longitude,
    };

    //console.log('🐞: RouteScreen -> render -> this.props', origin);
    return (
      <Layout>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={blocksContainerStyles('map')}
          initialRegion={init_region}
          //region={ init_region }
          showsUserLocation={true}
          loadingEnabled={false}
          zoomEnabled
          minZoomLevel={10}
          //onRegionChangeComplete={reg => {
          // const diff = coordsDistMeters(
          //   reg.latitude,
          //   reg.longitude,
          //   region.latitude,
          //   region.longitude
          // );
          // console.log("diff", diff);
          // console.log("reg", reg);
          //this.setState({ region: reg });
          //}}
          // propRegion={{
          //   latitudeDelta: 0.05,
          //   longitudeDelta: 0.05,
          //   latitude: 51.161596,
          //   longitude: 71.435876
          // }}
        >
          {/* <Polyline coordinates={this.state.coordinates} strokeColor="#000" strokeWidth={3} /> */}
          <Marker
            coordinate={origin}
            //coordinate={myPos}
            // coordinate={currentPosition}
            tracksViewChanges={false}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <StationMarker />
          </Marker>
          <MapViewDirections
            waypoints={[]}
            origin={origin}
            destination={destination}
            mode={'WALKING'}
            optimizeWaypoints={true}
            apikey={Config.GOOGLE_MAPS_KEY}
            strokeWidth={2}
            onReady={info => {
              console.log('🐞: RouteScreen -> render -> info', info);
              this.setState({
                duration: this.amountDistance(info.duration),
                distance: info.distance,
              });
            }}
          />
          <Marker coordinate={destination} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
            <StationMarker color="#4D94FF" />
          </Marker>
        </MapView>
        <BottomBlock styles={{ left: 0, right: 0 }}>
          <View style={{ ...bottomContainerStyle }}>
            <View
              style={{
                marginTop: 0,
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <TouchableOpacity onPress={() => this.hideRoute()}>
                <View
                  key={this.state.hideRoute} // <- fix for transform
                  style={[
                    bulletBtn,
                    {
                      transform: [{ rotate: !this.state.hideRoute ? '0deg' : '180deg' }],
                    },
                  ]}
                >
                  <ArrowDown color="#fff" style={{ top: -2 }} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={this.state.hideRoute ? hideRoute : bottomHeaderStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StartPointerIcon color="#67A960" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#84888D',
                      fontFamily: fonts.OpenSansRegular,
                    }}
                  >
                    Старт
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#1F2021',
                      fontFamily: fonts.OpenSansRegular,
                      marginVertical: 5,
                    }}
                  >
                    {/* {name.ru} */}
                    {pointA.code}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OpenSansRegular,
                      color: 'rgba(31, 32, 33, .8)',
                    }}
                  >
                    {pointA.address.ru}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  width: '100%',
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FinishIcon />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#84888D',
                      fontFamily: fonts.OpenSansRegular,
                    }}
                  >
                    Финиш
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#1F2021',
                      fontFamily: fonts.OpenSansRegular,
                      marginVertical: 5,
                    }}
                  >
                    {/* {name.ru} */}
                    {pointB.code}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OpenSansRegular,
                      color: 'rgba(31, 32, 33, .8)',
                    }}
                  >
                    {pointB.address.ru}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: fonts.OpenSansRegular,
                        marginRight: 15,
                      }}
                    >
                      {/* {pointB.free_slots.ru} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: fonts.OpenSansRegular,
                      }}
                    >
                      {/* {pointB.avl_bikes.ru} */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#84888D',
                    fontFamily: fonts.OpenSansRegular,
                  }}
                >
                  продол.
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#1F2021',
                    fontFamily: fonts.OpenSansRegular,
                    marginTop: 5,
                  }}
                >
                  ~ {this.state.duration !== null && this.state.duration} мин
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#84888D',
                    fontFamily: fonts.OpenSansRegular,
                  }}
                >
                  стоимость
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#1F2021',
                    fontFamily: fonts.OpenSansRegular,
                    marginTop: 5,
                  }}
                >
                  {this.state.amount !== null && this.state.amount}{' '}
                  {this.state.amount === 1000
                    ? 'тенге в час'
                    : Number.isInteger(this.state.amount)
                    ? 'тенге'
                    : ' '}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#84888D',
                    fontFamily: fonts.OpenSansRegular,
                  }}
                >
                  расстояние
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#1F2021',
                    fontFamily: fonts.OpenSansRegular,
                    marginTop: 5,
                  }}
                >
                  {this.state.distance !== null && this.state.distance} км
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Station')}>
              <Text style={styles.button}>Изменить маршрут</Text>
            </TouchableOpacity>
          </View>
          {/* <BottomTabs navigation={navigation} /> */}
        </BottomBlock>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 25,
    color: '#fff',
    backgroundColor: '#67A960',
    padding: 11,
    fontSize: 16,
    lineHeight: 30,
  },
});

export default connect(
  ({ location }) => ({
    currentPosition: location.location,
  }),
  null,
)(RouteScreen);
