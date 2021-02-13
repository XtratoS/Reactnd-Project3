import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { handleRemoveDeck } from '../actions'

function ModalBackdrop() {
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

function DeckScreen(props) {
    const [modalVisibility, setModalVisibility] = useState(false)

    useEffect(() => {
        if (props.deck && props.deck.title) {
            props.navigation.setOptions({title: props.deck.title})
        }
    }, [props.deck])

    if (props.loading === true || !props.deck) {
        return <ActivityIndicator style={{paddingVertical: 25}} size="large" color="red"/>
    }

    function navigateToAddCard() {
        props.navigation.navigate(
            'AddCard',
            {
                title: props.route.params.title
            }
        )
    }

    function startQuiz() {
        props.navigation.navigate(
            'Quiz',
            { deck: props.deck }
        )
    }

    function toggleModal() {
        setModalVisibility(!modalVisibility)
    }

    function deleteDeck() {
        toggleModal();
        props.removeDeck();
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType='fade'
                visible={modalVisibility}
                transparent={true}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ModalBackdrop />
                    <View style={{margin: 35, borderRadius: 2, padding: 20, backgroundColor: 'white'}}>
                        <Text style={{textAlign: 'center', fontSize: 18}}>Are you sure you want to delete this deck?</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 36}}>
                            <TouchableOpacity style={{ marginRight: 20, padding: 4 }} onPress={deleteDeck}>
                                <Text style={{fontSize: 18, color: 'red'}}>Delete Deck</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 20, padding: 4 }} onPress={toggleModal}>
                                <Text style={{fontSize: 18}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
                    onPress={() => {startQuiz()}}
                >
                    <Text style={{fontSize: 24}}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={[styles.btn, {borderColor: 'red', backgroundColor: 'red'}]}>
                    <Text style={{fontSize: 18, color: 'white'}}>Delete</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

function mapStateToProps(state, props) {
    return {
        deck: state.decks[props.route.params.title],
        loading: state.loadingIndicator,
    }
}

function mapDispatchToProps(dispatch, props) {
    let deckTitle = props.route.params.title;
    return {
        removeDeck: () => {dispatch(handleRemoveDeck(deckTitle))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);

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
    }
})