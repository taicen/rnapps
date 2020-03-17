import React from 'react'
import Svg, { Path, Circle, Rect } from 'react-native-svg'

export default ({color}) => (
    <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
        <Circle cx="14.5" cy="14.5" r="13.5" stroke={color || '#67A960'} stroke-width="2"/>
        <Rect x="13" y="6" width="3" height="13" rx="1.5" fill={color || '#67A960'}/>
        <Rect x="13" y="21" width="3" height="3" rx="1.5" fill={color || '#67A960'}/>
    </Svg> 
)



    