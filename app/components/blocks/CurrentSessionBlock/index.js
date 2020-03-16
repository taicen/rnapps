import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { fonts } from '../../../constants'

class CurrentSessionBlock extends Component {
    render() {
        return (
            <View style={styles.sessionContainer}>
                <View>
                    <Text style={styles.sessionTitle}>ТЕКУЩАЯ ПОЕЗДКА</Text>
                    <Text style={styles.sessionText}>83 мин 3,2 км</Text>
                </View>
                <Text style={styles.sessionText}>500 ₸</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sessionContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    sessionTitle: {
        fontSize: 10,
        color: '#979797',
        letterSpacing: 0.6,
        marginBottom: 5,
        fontFamily: fonts.OpenSansBold
    },
    sessionText: {
        fontSize: 18,
        color: '#191D30',
        fontFamily: fonts.OpenSansSemiBold
    }
})

export default CurrentSessionBlock