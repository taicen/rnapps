import React from "react";
import Svg, { Path } from "react-native-svg";

export default ({ color }) => (
  <Svg width="16" height="21" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 0C3.57647 0 0 3.53097 0 7.89823C0 11.4292 5.36471 18.5841 8 21C10.5412 18.5841 16 11.4292 16 7.89823C16 3.53097 12.4235 0 8 0ZM8 4.64602C9.78824 4.64602 11.2941 6.13274 11.2941 7.89823C11.2941 9.66372 9.78824 11.1504 8 11.1504C6.21176 11.1504 4.70588 9.66372 4.70588 7.89823C4.70588 6.13274 6.21176 4.64602 8 4.64602Z"
      fill={color || "#67A960"}
    />
  </Svg>
);
