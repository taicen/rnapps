import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fonts } from '../../../constants';
import { StarIcon } from '../../../components/svg';

// Styles
const wrap = {
  marginBottom: 25,
};
const title = {
  fontFamily: fonts.OpenSansSemiBold,
  fontSize: 16,
  color: '#191D30',
  marginBottom: 10,
};
const adressPoint = {
  width: '100%',
  fontSize: 14,
  marginBottom: 15,
};
const deleteBtn = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
const deleteBtnLabel = {
  fontFamily: fonts.OpenSansSemiBold,
  marginLeft: 10,
  color: '#000000',
};

class FavoriteCard extends Component {
  render() {
    /* --- porps of this component ---
      stationName - name of the station;
      stationAdress - detailed addres of the station;
      deleteHandler - deleting action handler
    */
    const { stationName, stationAdress, deleteHandler, mainColor } = this.props;
    return (
      <View style={wrap}>
        <Text style={title}>{stationName}</Text>
        <Text style={adressPoint}>{stationAdress}</Text>
        <TouchableOpacity style={deleteBtn} onPress={deleteHandler}>
          <StarIcon color={mainColor} fill={mainColor} />
          <Text style={deleteBtnLabel}>Убрать из избранного</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(({ themeChanger }) => ({
  mainColor: themeChanger.main_color,
}))(FavoriteCard);
