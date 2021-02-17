import React from 'react';
import { View, Platform, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ClearBtn(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-trash-outline' : 'trash-outline'}
                style={{marginHorizontal: 8}}
                size={28}
                color='red'
            />
        </TouchableOpacity>
    )
}

export default function MoreTextInput(props) {
    return (
        <View style={styles.inputGroup}>
            <TextInput
                style={[styles.textInput, props.textInputStyle]}
                onChangeText={props.handleChange}
                placeholder={props.placeholder}
                value={props.value}
            />
            <ClearBtn
                onPress={props.clear}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 24,
        width: 220,
        borderWidth: 1,
        borderRadius: 4
    }
})