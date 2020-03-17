import React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";

export default ({ color }) => (
  <Svg width="10" height="21" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.84615 18.796C3.84615 19.461 4.36404 20 5 20C5.63725 20 6.15385 19.4625 6.15385 18.796V11.0578C6.15385 10.6177 6.48112 10.1504 6.88407 10.0144L6.92557 10.0004C8.73113 9.21612 10 7.36217 10 5.2C10 2.32812 7.76142 0 5 0C2.23858 0 0 2.32812 0 5.2C0 7.36618 1.27359 9.223 3.0845 10.0047L3.11723 10.0158C3.5198 10.1511 3.84615 10.619 3.84615 11.0578V18.796ZM8.43293 3.53517C7.54883 1.56337 5.29515 0.710293 3.3992 1.62975C3.11043 1.7698 2.98549 2.12679 3.12015 2.42711C3.25481 2.72743 3.59806 2.85737 3.88684 2.71732C5.20524 2.07795 6.7724 2.67117 7.38719 4.04231C7.52185 4.34263 7.8651 4.47257 8.15388 4.33252C8.44265 4.19248 8.56759 3.83549 8.43293 3.53517Z"
      fill={color || "#67A960"}
    />
    <Ellipse
      rx="3"
      ry="1.5"
      transform="matrix(-1 0 0 1 5 19.5)"
      fill={color || "#67A960"}
    />
  </Svg>
);
