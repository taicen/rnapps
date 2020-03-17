import React from "react";
import { View, Text } from "react-native";

import { StationMarker } from "../../svg";

containerStyle = {
  width: 90,
  height: 90,
  justifyContent: "center",
  alignItems: "center"
};

counterStyle = {
  color: "#191D30",
  fontSize: 12,
  zIndex: 2
};

iconContainerStyle = {
  position: "absolute",
  top: 0,
  left: 0
};

const ClusterMarker = ({ count, mainColor }) => (
  <View style={{ ...containerStyle }}>
    <Text style={{ ...counterStyle }}>{count}</Text>
    <View style={{ ...iconContainerStyle }}>
      <StationMarker color={mainColor} />
    </View>
  </View>
);

export default ClusterMarker;
