import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ArrowDownLong, GeolocationIcon, FinishIcon } from '../../../components/svg';

class SingleRouteCard extends Component {
  render() {
    /* 
      < --- PROPS OF THIS COMPONENT --- >
        - weekly - styles to the long rent of the week
        - date - date of the rent
        - pointA - departure station adress
        - pointAname - departure station name
        - pointB - return station adress
        - pointBname - return station name
        - amount - amount of rental
        - duration - duration of route in min
        - distance - covered distance of route
        -- using in: AllRoutesScreen --
      < --- END --- >
    */
    const {
      weekly,
      date,
      pointA,
      pointAname,
      pointB,
      pointBname,
      amount,
      duration,
      distance,
      mainColor,
    } = this.props;
    let parsedDurationMin;
    let durationInt = parseInt(duration / 60);
    parsedDurationMin = durationInt.toString();
    let parsedDistance;
    let distanceInt = parseFloat(distance / 1000);
    parsedDistance = distanceInt.toFixed(2);

    return (
      <View
        style={{
          ...wrapper,
          backgroundColor: weekly ? '#f0f0f0' : 'transparent',
          marginBottom: weekly ? 20 : 0,
        }}
      >
        <Text style={dateWrap}>{date}</Text>
        <View style={container}>
          <View style={col1}>
            <GeolocationIcon color={mainColor} />
            <ArrowDownLong />
            <FinishIcon color={mainColor} />
          </View>
          <View style={col2}>
            <View style={col2first}>
              <Text style={label}>Старт</Text>
              <Text style={title}>{pointAname}</Text>
              <Text style={adress}>{pointA}</Text>
            </View>
            <View style={col2second}>
              <Text style={label}>Финиш</Text>
              <Text style={title}>{pointBname}</Text>
              <Text style={adress}>{pointB}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...descWrapper,
            borderBottomColor: weekly ? 'transparent' : '#cccccc',
          }}
        >
          <View style={descCol}>
            <Text style={label}>продол.</Text>
            <Text style={title}>{parsedDurationMin} мин.</Text>
          </View>
          <View style={descCol}>
            <Text style={label}>стоимость</Text>
            <Text style={title}>{amount}</Text>
          </View>
          <View style={descCol}>
            <Text style={label}>расстояние</Text>
            <Text style={title}>{parsedDistance} км</Text>
          </View>
        </View>
      </View>
    );
  }
}

// --- THIS COMPONENT STYLES START --- //
const wrapper = {
  position: 'relative',
  width: '100%',
  maxHeight: 400,
  paddingHorizontal: 20,
  paddingVertical: 20,
  zIndex: 0,
};
const dateWrap = {
  fontSize: 12,
  color: '#1F2021',
  marginBottom: 10,
};
const container = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 10,
};
const col1 = {
  width: '10%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
};
const col2 = {
  position: 'relative',
  width: '90%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
const col2first = {
  justifyContent: 'flex-start',
  marginBottom: 15,
};
const col2second = {
  justifyContent: 'flex-start',
  marginBottom: 15,
};
const label = {
  fontSize: 12,
  color: '#84888D',
  marginBottom: 10,
};
const title = {
  fontSize: 16,
  color: '#1f2021',
  marginBottom: 7.5,
};
const adress = {
  fontSize: 10,
  color: '#1f2021',
  opacity: 0.8,
};
const descWrapper = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: 15,
  justifyContent: 'space-between',
  borderBottomWidth: 1,
};
const descCol = {
  width: '32%',
};
// --- THIS COMPONENT STYLES END --- //

export default SingleRouteCard;
