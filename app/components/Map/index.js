import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

import { blocksContainerStyles } from '../../styles';
import { StationMarker, VeloRoadMarker } from '../svg';
import { getCluster, coordsDistMeters } from '../../helpers';
// import Config from 'react-native-config';

import ClusterMarker from './partials/ClusterMarker';

const init_region = {
  latitude: 51.158559,
  longitude: 71.43244,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05
};
const anchor = [0.5, 0.5];

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // latitude: 0,
      // longitude: 0,
      // latitude: 51.158559,
      // longitude: 71.432440
      region: init_region,
      coords: null,
      marginBottom: 1
    };
  }

  renderMarker = (marker, index) => {
    const { navigation, mainColor } = this.props;
    const key = index + marker.geometry.coordinates[0];
    if (marker.properties) {
      return (
        <Marker
          key={key}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
          tracksViewChanges={false}
          onPress={() => {
            this.mapRef.animateCamera({
              center: {
                latitude: marker.geometry.coordinates[1],
                longitude: marker.geometry.coordinates[0]
              },
              zoom: 16
            });
          }}
        >
          <ClusterMarker mainColor={mainColor} count={marker.properties.point_count} />
        </Marker>
      );
    }
    return (
      <Fragment key={key}>
        <Marker
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
          tracksViewChanges={false}
          onPress={() => {
            if (!marker.road) {
              return navigation.navigate('Station', {
                id: marker.origin_id,
                token: this.props.token
              });
            } else {
              return this.handleRoadToggle(marker.origin_id);
            }
          }}
        >
          {marker.road ? <VeloRoadMarker /> : <StationMarker color={mainColor} />}
        </Marker>
        {marker.roadDisplay && (
          <Polyline coordinates={marker.coordinates} strokeColor="#1C65D1" strokeWidth={3} />
        )}
      </Fragment>
    );
  };
  // вкл\выкл маршрут велодорожки
  handleRoadToggle = id => {
    let { coords } = this.state;
    coords.map(item => {
      if (item.origin_id === id) {
        item.roadDisplay = !item.roadDisplay;
      }
      return item;
    });
    this.setState({ coords });
  };

  componentDidUpdate(prevProps, prevState) {
    const { stations, veloroads, road_on } = this.props;
    // const { region } = this.state;
    if (prevProps.stations !== stations || prevProps.road_on !== road_on) {
      const points = stations && road_on ? [...stations, ...veloroads] : stations;
      const coords =
        stations &&
        points.map(item => ({
          origin_id: item.id,
          geometry: item.geometry,
          road: item.road || false, // указываем что это велодорожка
          roadDisplay: false, // отображать маршрут или нет
          coordinates: item.coordinates || false // координаты велодорожки
        }));

      this.setState({ coords });
    }
    // if (prevState.region !== region) {
    //     console.log('region', region)
    // }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ marginBottom: 0 }), 1200); // костыль для отображения кнопки геопозиции, вызывает доп. рендеринг
  }

  render() {
    const { region, coords } = this.state;
    const { stations, navigation, children, propRegion, mainColor, confirmed } = this.props;

    if (!stations || !confirmed) return null;
    // if (!stations) return <View><Text>loading...</Text></View>

    const cluster = getCluster(coords, region);

    return (
      <View style={{ paddingTop: this.state.marginBottom }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={[blocksContainerStyles('map'), { zIndex: 0, elevation: 0 }]}
          //initialRegion={propRegion || region}
          region={propRegion || region}
          showsUserLocation={true}
          //showsMyLocationButton={true}
          //onMapReady={this.onMapReady}
          loadingEnabled={false}
          zoomEnabled
          minZoomLevel={10}
          onRegionChangeComplete={reg => {
            // const diff = coordsDistMeters(
            //   reg.latitude,
            //   reg.longitude,
            //   region.latitude,
            //   region.longitude
            // );
            // console.log("diff", diff);
            // console.log("reg", reg);
            this.setState({ region: reg });
          }}
          ref={ref => {
            this.mapRef = ref;
          }}
        >
          {/* <MapViewDirections
          apikey={Config.GOOGLE_MAPS_KEY}
          origin={{
            latitude: stations[5].coordinates[1],
            longitude: stations[5].coordinates[0]
          }}
          destination={{
            latitude: stations[30].coordinates[1],
            longitude: stations[30].coordinates[0]
          }}
          mode="DRIVING"
          strokeWidth={4}
          strokeColor={mainColor}
        /> */}
          {children
            ? children
            : cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
        </MapView>
      </View>
    );
  }
}

export default connect(({ themeChanger }) => ({
  mainColor: themeChanger.main_color
}))(MapComponent);
