import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const ButtonInline = ({ title, style, color, ...props }) => {
    const textStyle = {
        fontSize: 12,
        color: color || '#67A960'
    }
    return (
        <TouchableOpacity {...props}>
            <Text style={{...textStyle, ...style}}>{ title }</Text>
        </TouchableOpacity>
    )
}

export default ButtonInline