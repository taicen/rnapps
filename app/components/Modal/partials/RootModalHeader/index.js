import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { CloseIcon, PhoneIcon } from '../../../svg'

const RootModalHeader = ({ closeModal, title, styles }) => {
    return (
        <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
                <CloseIcon />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title.toUpperCase()}</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <PhoneIcon />
            </TouchableOpacity>
        </View>
    )
}

export default RootModalHeader