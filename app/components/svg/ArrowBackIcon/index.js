import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default ({ color, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Svg {...props} width="26" height="20" fill="none">
    <Path
      d="M1.11612 9.11611C0.627962 9.60427 0.627962 10.3957 1.11612 10.8839L9.07107 18.8388C9.55922 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16116C10.3507 0.673009 9.55922 0.673008 9.07107 1.16116L1.11612 9.11611ZM26 8.75L2 8.75L2 11.25L26 11.25L26 8.75Z"
      fill={color || '#54575A'}
    />
  </Svg>
);
