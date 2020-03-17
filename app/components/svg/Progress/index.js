import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';

export default ({ color, step }) => (
  <Svg width="71" height="11" fill="none">
    <Line x1="4" y1="5.5" x2="30" y2="5.5" stroke={step === 3 || step === 2 ? color : '#CACACA'} />
    <Line x1="35" y1="5.5" x2="67" y2="5.5" stroke={step === 3 ? color : '#CACACA'} />
    <Circle
      cx="5.5"
      cy="5.5"
      r={step === 3 || step === 2 || step === 1 ? '5.5' : '5'}
      fill={step === 3 || step === 2 || step === 1 ? color : '#F9F8F7'}
      stroke={step === 3 || step === 2 || step === 1 ? 'none' : '#CACACA'}
    />
    <Circle
      cx="35.5"
      cy="5.5"
      r={step === 3 || step === 2 ? '5.5' : '5'}
      fill={step === 3 || step === 2 ? color : '#F9F8F7'}
      stroke={step === 3 || step === 2 ? 'none' : '#CACACA'}
    />
    <Circle
      cx="65.5"
      cy="5.5"
      r={step === 3 ? '5.5' : '5'}
      fill={step === 3 ? color : '#F9F8F7'}
      stroke={step === 3 ? 'none' : '#CACACA'}
    />
  </Svg>
);
