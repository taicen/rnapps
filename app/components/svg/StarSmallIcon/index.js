import React from "react";
import Svg, { Path } from "react-native-svg";

export default ({ color, fill }) => (
  <Svg width="17" height="16" fill={fill || "none"}>
    <Path
      d="M10.137 5.82574L10.3065 6.34157H10.8495H16.0992L11.8574 9.37529L11.4073 9.69716L11.582 10.2222L13.2291 15.171L8.92837 12.0952L8.49103 11.7824L8.0544 12.0962L3.77653 15.1705L5.42337 10.2222L5.59809 9.69716L5.14804 9.37529L0.906191 6.34157H6.15592H6.6989L6.86843 5.82574L8.5027 0.853024L10.137 5.82574ZM3.72316 15.3308L3.72317 15.3308L3.72316 15.3308Z"
      stroke={color || "#67A960"}
      strokeWidth="1.5"
    />
  </Svg>
);