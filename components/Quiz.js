import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { checkIn } from '../utils/api';
import { Btn, Container, Section } from './WrapperComponents';
import ProgressBar from './ProgressBar';
import headerRightHomeBtn from './HeaderHomeBtn';

export default function Quiz(props) {
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {return headerRightHomeBtn(props);}
        })
    }, []);

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
            <Container center>
                <Text style={styles.topText}>
                    You have completed this quiz!
                </Text>
                <Text style={{textAlign: 'center', marginTop: 35, fontSize: 20}}>
                    Correct: {correct}/{deck.questions.length}
                </Text>
                <ProgressBar percentage={percentageRight} />
                <View style={{marginTop: 20, marginBottom: 30}}>
                    <Btn
                        onPress={restart}
                    >
                        Restart Quiz
                    </Btn>

                    <Btn
                        onPress={goBack}
                    >
                        Go Back
                    </Btn>

                    <Btn
                        onPress={goHome}
                    >
                        Go Home
                    </Btn>
                </View>
            </Container>
        )
    }

    return (
        <Container center>
            <Section center flex={1}>
                <Text style={{fontSize: 36}}>
                    {deck.questions[current].question}
                </Text>
            </Section>
            <Section center flex={3}>
                {side === 'back' ?
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        {deck.questions[current].answer}
                    </Text>
                :<>
                    <Btn
                        color='darkgreen'
                        textColor='white'
                        onPress={correctAnswerBtn}
                    >
                        Correct
                    </Btn>
                    <Btn
                        color='darkred'
                        textColor='white'
                        onPress={nextQuestion}
                    >
                        Incorrect
                    </Btn>
                </>}
            </Section>
            <Section center flex={2}>
                <Btn
                    color='#222'
                    textColor='white'
                    onPress={flipCard}
                >
                    Flip Card <FontAwesome name="rotate-left" size={24} color="white" />
                </Btn>
                <Text style={{fontSize: 18, fontStyle: 'italic'}}>
                    {left()} questions left
                </Text>
            </Section>
        </Container>
    )
}

const styles = StyleSheet.create({
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