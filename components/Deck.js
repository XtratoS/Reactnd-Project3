import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { getDeck } from '../utils/api';

export default class Deck extends Component {
    state = {
        deck: {}
    }
    
    async componentDidMount() {
        this._isMounted = true;
        let deck = await getDeck(this.props.id);
        if (this._isMounted === true) {
            this.setState({deck})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.state.deck)}</Text>
            </View>
        )
    }
}
