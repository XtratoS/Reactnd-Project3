import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

export default function Quiz(props) {

    const [correct, setCorrect] = useState(0)
    const [current, setCurrent] = useState(0)

    function nextQuestion() {
        setCurrent(current + 1);
    }

    function correctAnswer() {
        setCorrect(correct + 1);
    }

    function left() {
        return props.route.params.deck.questions.length - current - 1;
    }

    function flipCard() {
        const currentQuestion = props.route.params.deck.questions[current];
        props.navigation.navigate(
            'Answer',
            { question: currentQuestion}
        )
    }
    
    const { deck } = props.route.params;

    if (current === props.route.params.deck.questions.length) {
        const percentageRight = (correct / current).toFixed(2)*100;
        return (
            <View style={styles.container}>
                <Text style={{marginTop: 40, fontSize: 28, textAlign: 'center'}}>
                    You have completed this quiz!
                </Text>
                <Text style={{textAlign: 'center', marginTop: 50, fontSize: 24}}>
                    Correct: {correct}/{props.route.params.deck.questions.length}{percentageRight < 25 && ` (${percentageRight}%)`}
                </Text>
                <View style={{marginTop: 30, backgroundColor: '#c2c2c2', borderRadius: 8, height: 40, width: '80%', justifyContent: 'flex-start'}}>
                    <View style={{backgroundColor: 'darkgreen', borderRadius: 8, height: 40, width: `${percentageRight}%`, justifyContent: 'center', alignItems: 'center'}}>
                        {percentageRight >= 25 && <Text style={{color: 'white', fontSize: 24}}>{percentageRight} %</Text>}
                    </View>
                </View>
                <View style={{marginTop: 40, marginBottom: 30}}>
                    <TouchableOpacity style={[styles.btn]} onPress={()=>{props.navigation.goBack()}}>
                        <Text style={styles.btnText}>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn]} onPress={()=>{props.navigation.dispatch(StackActions.popToTop());}}>
                        <Text style={styles.btnText}>Go Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 36}}>{deck.questions[current].question}</Text>
            <View>
                <TouchableOpacity style={[styles.btn, {backgroundColor: 'darkgreen'}]} onPress={()=>{correctAnswer();nextQuestion()}}>
                    <Text style={[styles.btnText, {color: 'white'}]}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: 'darkred'}]} onPress={()=>{nextQuestion()}}>
                    <Text style={[styles.btnText, {color: 'white'}]}>Incorrect</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#222'}]} onPress={flipCard}>
                    <Text style={[styles.btnText, {color: 'white'}]}>Flip Card</Text><FontAwesome name="rotate-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{fontSize: 18, fontStyle: 'italic'}}>{left()} questions left</Text>
            </View>
        </View>
    )
}

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
    btnText: {
        fontSize: 24,
    }
})