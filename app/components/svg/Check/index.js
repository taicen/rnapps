import React from "react";
import Svg, { Path } from "react-native-svg";

export default ({ color }) => (
  <Svg width="28" height="23" fill="none">
    <Path
      d="M2.29289 11.4853L1.58579 12.1924L2.29289 12.8995L9.36393 19.9706L9.36396 19.9706L10.071 20.6777L10.0711 20.6777L10.7782 19.9706L12.1924 18.5564L12.8995 17.8493L25.6275 5.12132L26.3346 4.41421L25.6275 3.70711L24.2133 2.29289L23.5062 1.58579L22.7991 2.29289L10.0711 15.0209L5.12132 10.0711L4.41421 9.36398L3.70711 10.0711L2.29289 11.4853Z"
      fill={color || "#67A960"}
      stroke="white"
      stroke-width="2"
    />
  </Svg>
);
