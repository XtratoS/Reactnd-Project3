import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, VirtualizedList } from 'react-native';
import { getDecks } from '../utils/api';

export default class Main extends Component {
    state = {
        decks: {},
        loading: true,
    }
    
    async componentDidMount() {
        this._isMounted = true;
        let decks = await getDecks();
        Object.keys(decks).forEach((deckId) => {decks[deckId].id = deckId});
        if (this._isMounted === true) {
            this.setState({decks, loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { decks, loading } = this.state;
        if (loading === true) {
            return (
                <ActivityIndicator size="large" color="red"/>
            )
        }
        return (
            <View style={styles.container}>
                <VirtualizedList
                    data={decks}
                    renderItem={
                        ({item}) => (
                            <TouchableOpacity style={styles.deckContainer}>
                                <Text style={styles.deckTitle}>
                                    {item.title}
                                </Text>
                                <View style={styles.deckCount}>
                                    <Text style={styles.deckCountText}>{item.questions.length}</Text>
                                </View>
                                {/* <Text style={styles.deckCardCount}>
                                    Contains {item.questions.length} cards
                                </Text> */}
                            </TouchableOpacity>
                        )
                    }
                    getItem={(data, index) => {
                        let indices = Object.keys(data);
                        return data[indices[index]];
                    }}
                    getItemCount={(data)=>{
                        return Object.keys(data).length;
                    }}
                    listKey={"MainList"}
                    initialNumToRender={6}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                />
                {/* {Object.keys(decks).map((deckId) => {
                    const deck = decks[deckId];
                    return (
                        <TouchableOpacity
                            key={deckId}
                            style={styles.deckContainer}
                        >
                            <Text style={styles.deckTitle}>
                                {deck.title}
                            </Text>
                            <Text style={styles.deckCardCount}>
                                Contains {deck.questions.length} cards
                            </Text>
                        </TouchableOpacity>
                    )
                })} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 30,
        marginHorizontal: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'grey',
    },
    deckCount: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
        padding: 8
    },
    deckCountText : {
        fontSize: 20
    },
    deckTitle: {
        textAlign: 'left',
        fontSize: 30,
    },
});