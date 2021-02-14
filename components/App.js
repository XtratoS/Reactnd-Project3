import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import reducer from '../reducers';
import middleware from '../middleware';

import TopBar from './TopBar';
import MainScreen from './MainScreen';
import DeckScreen from './DeckScreen';
import AddCardScreen from './AddCardScreen';
import QuizScreen from './Quiz';
import CreateDeckScreen from './CreateDeckScreen'
import ConfigNotificationScreen from './ConfigNotificationScreen'

const store = createStore(reducer, middleware);

const Stack = createStackNavigator();

export default function App(props) {
    return (
        <Provider store={store}>
            <NavigationContainer style={styles.container}>
                <TopBar />
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={MainScreen}
                            options={{title: ""}}
                        />
                        <Stack.Screen
                            name="Deck"
                            component={DeckScreen}
                            options={{title: ""}}
                        />
                        <Stack.Screen
                            name="AddCard"
                            component={AddCardScreen}
                            options={{title: "Add Card"}}
                        />
                        <Stack.Screen
                            name="Quiz"
                            component={QuizScreen}
                            options={{title: "Quiz"}}
                        />
                        <Stack.Screen
                            name="CreateDeck"
                            component={CreateDeckScreen}
                            options={{title: "Create New Deck"}}
                        />
                        <Stack.Screen
                            name="ConfigureNotification"
                            component={ConfigNotificationScreen}
                            options={{title: "Reminder Settings"}}
                        />
                    </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});