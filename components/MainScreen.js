import React, { useEffect } from 'react'
import { View, Text, StyleSheet, VirtualizedList, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions'

function MainScreen(props) {
    useEffect(() => {
        props.handleReceiveDecks();
    }, [props])

    function navigateToItem(item) {
        props.navigation.navigate(
            'Deck',
            {
                deckMetaInfo: item
            }
        )
    }

    if (props.loading === true) {
        return <ActivityIndicator style={{paddingVertical: 25}} size="large" color="red"/>
    }

    return (
        <View style={styles.container}>
            <VirtualizedList
                style={{ paddingVertical: 15 }}
                data={props.decks}
                renderItem={
                    ({item}) => (
                        <TouchableOpacity
                            style={styles.deckContainer}
                            onPress={() => {navigateToItem(item)}}
                        >
                            <Text style={styles.deckTitle}>
                                {item.title}
                            </Text>
                            <View style={styles.deckCount}>
                                <Text style={styles.deckCountText}>{item.questions.length}</Text>
                            </View>
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
                initialNumToRender={5}
                keyExtractor={(item) => {
                    return item.id;
                }}
            />
        </View>
    )
}

function mapStateToProps(state) {
    return {
        decks: state.decks,
        loading: state.loadingIndicator,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleReceiveDecks: () => dispatch(handleReceiveDecks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

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
        marginVertical: 15,
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
        fontSize: 28,
    },
});