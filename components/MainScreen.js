import React, { useEffect } from 'react'
import { View, Text, StyleSheet, VirtualizedList, ActivityIndicator, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import { Entypo, Ionicons, MaterialIcons, } from '@expo/vector-icons'

// import { setLocalNotification } from '../utils/api'

function MainScreen(props) {
    useEffect(() => {
        props.handleInitialData();
        props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.iconsContainer}
                    onPress={()=>{props.navigation.navigate("ConfigureNotification")}}
                >
                    {Platform.OS === 'ios' ? <>
                    <Ionicons name='ios-notifications' color='black' size={26} />
                    </>:<>
                    <MaterialIcons name='notifications-on' color='black' size={26} />
                    </>}
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={styles.iconsContainer}
                    onPress={()=>{props.navigation.navigate("CreateDeck")}}
                >
                    <Entypo name='circle-with-plus' size={26} />
                </TouchableOpacity>
            )
        });
    }, [])

    function navigateToItem(item) {
        props.navigation.navigate(
            'Deck',
            { title: item.title }
        )
    }

    if (props.loading === true) {
        return <ActivityIndicator style={{paddingVertical: 25}} size="large" color="red"/>
    }

    return (
        <View style={styles.container}>
            <VirtualizedList
                style={{ paddingVertical: 15 }}
                contentContainerStyle={{ paddingBottom: 30 }}
                data={props.decks}
                renderItem={
                    ({item}) => (
                        <TouchableOpacity
                            key={item.title}
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
                    return item.title;
                }}
                ListEmptyComponent={() => {
                    return <View style={[styles.deckContainer, {borderWidth: 0, justifyContent: 'center'}]}>
                        <Text style={{fontSize: 24}}>No Decks Here Yet</Text>
                    </View>
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
        handleInitialData: () => dispatch(handleInitialData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    iconsContainer: {
        flexDirection: 'row',
        marginHorizontal: 4,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#eee',
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