import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Header } from '@react-navigation/stack';
import { handleAddCard } from '../actions/decks'
import MoreTextInput from './MoreTextInput'
import { Btn, Container, Section } from './WrapperComponents'
import headerRightHomeBtn from './HeaderHomeBtn';
import Constants from 'expo-constants';

function AddCardScreen(props) {
  useEffect(() => {
    props.navigation.setOptions({
      title: `Add Card - ${props.route.params.deck.title}`,
      headerRight: () => {return headerRightHomeBtn(props);}
    });
  }, []);

  const [values, setValues] = useState({question: '', answer: ''});

  function handleChange(data) {
    const { name, value } = data;
    setValues({
      ...values,
      [name]: value
    });
  };

  function clearValue(name) {
    setValues({
      ...values,
      [name]: ''
    });
  }

  function submitQuestion() {
    // FORM VALIDATION
    const { question, answer } = values;
    if (question.length === 0 || answer.length === 0) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    } else if (props.questions.includes(question.toLowerCase())) {
      Alert.alert("Error", "This question already exists, please try adding another one");
      return;
    }

    // DISPATCH ACTION
    const { title } = props.route.params.deck
    props.handleAddCard(title, {...values});

    // NAVIGATE BACK TO DECK
    props.navigation.goBack();
  }

  return (
    <Container center>
    <KeyboardAvoidingView
      keyboardVerticalOffset={Constants.statusBarHeight + 64}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Section center>
        <MoreTextInput
          placeholder='Question'
          value={values.question}
          handleChange={(newText) => {handleChange({name: 'question', value: newText})}}
          clear={() => {clearValue('question')}}
        />

        <MoreTextInput
          placeholder='Answer'
          value={values.answer}
          handleChange={(newText) => {handleChange({name: 'answer', value: newText})}}
          clear={() => {clearValue('answer')}}
        />
      </Section>
      <Section center>
        <Btn
          onPress={submitQuestion}
          color='darkgreen'
          textColor='white'
          style={{marginTop: 'auto'}}
        >
          Submit
        </Btn>
      </Section>
    </KeyboardAvoidingView>
    </Container>
  )
}

function mapStateToProps(state, props) {
  let deck = state.decks[props.route.params.deck.title]
  return {
    questions: deck.questions.map((questionObject) => (questionObject.question.toLowerCase()))
  }
}

export default connect(mapStateToProps, { handleAddCard })(AddCardScreen)