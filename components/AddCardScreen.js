import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions'

function ClearBtn(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Ionicons style={{marginHorizontal: 8}} size={28} color='red' name={Platform.OS === 'ios' ? 'ios-trash-outline' : 'trash-outline'}/>
        </TouchableOpacity>
    )
}

function AddCardScreen(props) {
    const [values, setValues] = React.useState({question: '', answer: ''});

    React.useEffect(() => {
        props.navigation.setOptions({title: `${props.route.params.title} - Add Card`})
    }, [props.route.params.title]);
    
    const handleChange = (data) => {
        const { name, value } = data;
        setValues({
            ...values,
            [name]: value
        });
    }

    const submitQuestion = async () => {
        // DISPATCH ACTION
        const deckId = props.route.params.title;
        props.dispatch(handleAddCard({ deckId, card: {...values} }));

        // CLEAR FIELDS
        let emptyValues = {}
        Object.keys(values).forEach((key) => {emptyValues[key] = ''});
        setValues({...emptyValues});

        // NAVIGATE BACK
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={newText => handleChange({name: 'question', value: newText})}
                    placeholder='Question'
                    value={values.question}
                    multiline={true}
                />
                <ClearBtn
                    onPress={() => setValues({...values, ['question']: ''})}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={newText => handleChange({name: 'answer', value: newText})}
                    placeholder='Answer'
                    value={values.answer}
                    multiline={true}
                />
                <ClearBtn
                    onPress={() => setValues({...values, ['answer']: ''})}
                />
            </View>
            <View style={styles.inputGroup}>
                <TouchableOpacity onPress={submitQuestion} style={styles.submitBtn}>
                    <Text style={{fontSize: 16}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default connect()(AddCardScreen);

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
        textAlignVertical: 'top',
        fontSize: 16,
        height: 60,
        width: 220,
        borderWidth: 1,
        borderRadius: 4
    },
    submitBtn: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
})