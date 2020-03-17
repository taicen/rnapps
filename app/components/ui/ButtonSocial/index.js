import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { fonts } from "../../../constants";

const touchableStyle = {
  minWidth: 140
};

const containerStyle = {
  paddingHorizontal: 12,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  borderColor: "#8d8d8d"
};

const textStyle = {
  fontFamily: fonts.OpenSansSemibold,
  fontSize: 10,
  textAlign: "center"
};

const ButtonSocial = ({
  title,
  size,
  style,
  height,
  onPress,
  white,
  inProgress,
  backgroundColor,
  Icon,
  ...props
}) => {
  const finalContainerStyle = {
    ...containerStyle,
    height: height || 44,
    backgroundColor: backgroundColor,
    borderWidth: white ? 1 : 0,
    display: "flex",
    flexDirection: "row"
  };
  const finalTextStyle = {
    ...textStyle,
    color: "#54575A",
    marginLeft: 10
  };
  return (
    <TouchableOpacity
      {...props}
      style={{ ...touchableStyle, ...style }}
      disabled={inProgress}
      onPress={onPress}>
      <View style={{ ...finalContainerStyle }}>
        {Icon}

        {!inProgress && <Text style={{ ...finalTextStyle }}>{title}</Text>}
        {
          // props.inProgress &&
          // <ActivityIndicator color="#fff"/>
        }
      </View>
    </TouchableOpacity>
  );
};

export default ButtonSocial;
