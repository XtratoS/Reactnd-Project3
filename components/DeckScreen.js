import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

function DeckScreen(props) {
    useEffect(() => {
        if (props.deck && props.deck.title) {
            props.navigation.setOptions({title: props.deck.title})
        }
    }, [props.navigation, props.deck])

    if (props.loading === true || !props.deck) {
        return <ActivityIndicator style={{paddingVertical: 25}} size="large" color="red"/>
    }

    function navigateToAddCard() {
        props.navigation.navigate(
            'AddCard',
            {
                deckMetaInfo: props.route.params.deckMetaInfo
            }
        )
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Text style={{marginVertical:4, fontSize: 36}}>{props.deck.title}</Text>
                <Text style={{marginVertical:4, fontSize: 16, color: '#444'}}>{props.deck.questions.length} Cards</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {navigateToAddCard()}}
                >
                    <Text style={{fontSize: 24}}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                >
                    <Text style={{fontSize: 24}}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function mapStateToProps(state, props) {
    let deckId = props.route.params.deckMetaInfo.id;
    return {
        deck: state.decks[deckId],
        loading: state.loadingIndicator,
    }
}

export default connect(mapStateToProps)(DeckScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btn: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        width: 180,
        alignItems: 'center',
        marginVertical: 10
    },
})