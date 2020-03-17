import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowBackSmall } from "../../svg";

const style = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

export const BackButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...style }}>
      <ArrowBackSmall />
      <Text style={{ marginLeft: 7, fontSize: 12 }}>{title}</Text>
    </TouchableOpacity>
  );
};
