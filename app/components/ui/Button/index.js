import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { fonts } from '../../../constants';

// let mainColor;
// AsyncStorage.getItem("primary_color").then(color => {
//   mainColor = color;
// });

const touchableStyle = {
  minWidth: 220
};

const containerStyle = {
  paddingHorizontal: 12,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  borderColor: '#8d8d8d'
};

const textStyle = {
  fontFamily: fonts.OpenSansSemibold,
  fontSize: 16,
  textAlign: 'center'
};

const Button = ({
  title,
  size,
  style,
  height,
  width,
  onPress,
  white,
  inProgress,
  loading,
  mainColor,
  disabled,
  ...props
}) => {
  const finalContainerStyle = {
    ...containerStyle,
    height: height || 44,
    // backgroundColor: white ? "#FFF" : "#67A960",
    backgroundColor: white ? '#fff' : mainColor,
    borderWidth: white ? 1 : 0
  };
  const finalTextStyle = {
    ...textStyle,
    color: white ? '#000' : '#FFF'
  };

  return (
    <TouchableOpacity
      style={[
        width ? { width } : { ...touchableStyle },
        { ...style },
        { opacity: disabled ? 0.7 : 1 }
      ]}
      disabled={inProgress || loading || disabled}
      onPress={onPress}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <View style={finalContainerStyle}>
        {/* {!inProgress && <Text style={{ ...finalTextStyle }}>{title}</Text>}
         */}
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={finalTextStyle}>{title}</Text>
        )}
        {
          // props.inProgress &&
          // <ActivityIndicator color="#fff"/>
        }
      </View>
    </TouchableOpacity>
  );
};

export default connect(({ themeChanger }) => ({
  mainColor: themeChanger.main_color
}))(Button);
