import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { checkIn } from '../utils/api';

const ProgressBar = (props) => (
    <View style={{flexDirection: 'row', marginTop: 30, backgroundColor: '#c2c2c2', borderRadius: 8, height: 40, width: '80%', justifyContent: 'flex-start'}}>
        <View style={{backgroundColor: 'darkgreen', borderRadius: 8, height: 40, width: `${props.percentage}%`, justifyContent: 'center', alignItems: 'center'}}>
            {props.percentage >= 25 && <Text style={{color: 'white', fontSize: 24}}>{props.percentage} %</Text>}
        </View>
        {props.percentage < 25 && <Text style={{marginLeft: 10, color: 'black', fontSize: 24}}>{props.percentage} %</Text>}
    </View>
)

export default function Quiz(props) {

    const [correct, setCorrect] = useState(0);
    const [current, setCurrent] = useState(0);
    const [side, setSide] = useState('front');

    function nextQuestion() {
        setCurrent(current + 1);
        if (current === deck.questions.length - 1) {
            checkIn();
        }
    }

    function correctAnswerBtn() {
        setCorrect(correct + 1);
        nextQuestion();
    }

    function left() {
        return props.route.params.deck.questions.length - current - 1;
    }

    function flipCard() {
        setSide(side === 'front' ? 'back' : 'front')
    }

    function restart() {
        setCurrent(0);
        setCorrect(0);
        setSide('front');
    }

    function goBack() {
        props.navigation.goBack();
    }

    function goHome() {
        props.navigation.dispatch(StackActions.popToTop());
    }
    
    const { deck } = props.route.params;

    if (current === deck.questions.length) {
        const percentageRight = (correct / current * 10000).toFixed()/100;
        return (
            <View style={styles.container}>
                <Text style={styles.topText}>
                    You have completed this quiz!
                </Text>
                <Text style={{textAlign: 'center', marginTop: 35, fontSize: 20}}>
                    Correct: {correct}/{deck.questions.length}
                </Text>
                <ProgressBar percentage={percentageRight} />
                <View style={{marginTop: 20, marginBottom: 30}}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={restart}
                    >
                        <Text style={styles.btnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goBack}
                    >
                        <Text style={styles.btnText}>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goHome}
                    >
                        <Text style={styles.btnText}>Go Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 30, fontSize: 36}}>
                {deck.questions[current].question}
            </Text>
            <View style={{flex: 3}}>
                {side === 'back' ?
                    <Text style={{margin: 30, textAlign: 'center', fontSize: 30}}>
                        {deck.questions[current].answer}
                    </Text>
                :<>
                    <TouchableOpacity
                        style={[styles.btn, {marginTop: 50, backgroundColor: 'darkgreen'}]}
                        onPress={correctAnswerBtn}
                    >
                        <Text style={[styles.btnText, {color: 'white'}]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: 'darkred'}]}
                        onPress={nextQuestion}
                    >
                        <Text style={[styles.btnText, {color: 'white'}]}>Incorrect</Text>
                    </TouchableOpacity>
                </>}
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity style={[styles.btn, styles.flipCardBtn]} onPress={flipCard}>
                    <Text style={[styles.btnText, {color: 'white'}]}>
                        Flip Card
                    </Text>
                    <FontAwesome name="rotate-left" size={24} color="white" />
                </TouchableOpacity>
                <View style={{}}>
                    <Text style={{fontSize: 18, fontStyle: 'italic'}}>
                        {left()} questions left
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    },
    flipCardBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#222'
    },
    topText: {
        marginTop: 40,
        marginHorizontal: 20,
        fontSize: 26,
        textAlign: 'center'
    },
})