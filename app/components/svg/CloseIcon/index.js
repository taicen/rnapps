import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default ({color}) => (
    <Svg width="23" height="24" fill="none">
        <Path d="M21.2132 0.960038C21.6037 0.569513 22.2369 0.569513 22.6274 0.960037C23.0179 1.35056 23.0179 1.98373 22.6274 2.37425L2.12132 22.8803C1.7308 23.2709 1.09763 23.2709 0.707107 22.8803C0.316582 22.4898 0.316582 21.8567 0.707107 21.4661L21.2132 0.960038Z" fill={color || "#54575A"}/>
        <Path d="M22.6274 21.4661C23.0179 21.8567 23.0179 22.4898 22.6274 22.8803C22.2369 23.2709 21.6037 23.2709 21.2132 22.8803L0.707109 2.37425C0.316585 1.98373 0.316584 1.35056 0.707108 0.960036C1.09763 0.569512 1.7308 0.569512 2.12132 0.960036L22.6274 21.4661Z" fill={color || "#54575A"}/>
    </Svg>
)