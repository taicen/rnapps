import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default ({color}) => (
    <Svg width="20" height="26" viewBox="0 0 20 26" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M1.16781 23.6364V0H3.50344V1.18182H19.9985L16.4965 8.27262L20 15.3636H3.50344V23.6364H4.67125V26H0V23.6364H1.16781ZM3.50344 13H16.2209L13.8853 8.27283L16.22 3.54545H3.50344V13Z" fill={color || "#67A960"}/>
    </Svg>    
)