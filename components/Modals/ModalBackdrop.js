import React from 'react'
import { View } from 'react-native'

export default function ModalBackdrop() {
    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.5,
            height: '100%',
            width: '100%'}}>
        </View>
    )
}