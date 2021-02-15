import React, { useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { handleCreateDeck } from '../actions/decks';

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

function CreateDeckScreen(props) {
    const [name, setName] = useState('')

    const submitDeck = async () => {
        // DISPATCH ACTION
        props.createDeck(name);

        // CLEAR FIELDS
        setName('');

        // NAVIGATE
        props.navigation.goBack();
        props.navigation.navigate('Deck', {title: name});
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setName}
                    placeholder='Deck Name'
                    value={name}
                />
                <ClearBtn onPress={() => setName('')} />
            </View>
            <View style={styles.inputGroup}>
                <TouchableOpacity onPress={submitDeck} style={styles.submitBtn}>
                    <Text style={{fontSize: 20}}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

let mapDispatchToProps = {
    createDeck: handleCreateDeck
}

export default connect(null, mapDispatchToProps)(CreateDeckScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 20,
        width: 220,
        borderWidth: 1,
        borderRadius: 4
    },
    submitBtn: {
        marginTop: 20,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8
    },
})