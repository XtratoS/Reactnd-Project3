import React, { useState } from 'react'
import { View, Modal, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { handleAddCard } from '../../actions/decks'
import { Btn, Section } from '../WrapperComponents';
import MoreTextInput from '../MoreTextInput';
import ModalBackdrop from './ModalBackdrop';
import { Ionicons } from '@expo/vector-icons';

function AddCardScreen(props) {
  const [values, setValues] = useState({question: '', answer: ''});

  const handleChange = (data) => {
    const { name, value } = data;
    setValues({
      ...values,
      [name]: value
    });
  }

  const submitQuestion = async () => {
    // FORM VALIDATION
    if (question.length === 0 || answer.length === 0) {
      alert("Please fill in both fields");
      return;
    } else if (props.questions.includes(question.toLowerCase())) {
      alert("This question already exists, please try adding another one");
      return;
    }

    // DISPATCH ACTION
    const deckId = props.deck.title;
    props.handleAddCard({ deckId, card: {...values} });

    // CLEAR FIELDS
    let emptyValues = {};
    Object.keys(values).forEach((key) => {emptyValues[key] = ''});
    setValues({...emptyValues});

    // TODO: NAVIGATE BACK
    props.close();
  }

  function clearValues() {
    setValues({...values, ['question']: ''})
  }

  return (
    <Modal
      animationType='fade'
      visible={true}
      transparent={true}
      onRequestClose={() => {props.close()}}
    >
      <View style={styles.centeredView}>
        <ModalBackdrop />
        <KeyboardAvoidingView
          style={[
            styles.modalContentContainer,
            {
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View center style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {props.close()}}
            >
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-close-circle' : 'close-circle'}
                color='red'
                size={36}
              />
            </TouchableOpacity>
          </View>
          <Section center flex={2}>
            <MoreTextInput
              placeholder='Question'
              value={values.question}
              handleChange={newText => handleChange({name: 'question', value: newText})}
              clear={clearValues}
            />
            
            <MoreTextInput
              placeholder='Answer'
              value={values.answer}
              handleChange={newText => handleChange({name: 'answer', value: newText})}
              clear={clearValues}
            />
          </Section>
          <Section center>
            <Btn
              onPress={submitQuestion}
              color='darkgreen'
              textColor='white'
            >
              Submit
            </Btn>
          </Section>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

function mapDispatchToProps(state, props) {
  let deck = state.decks[props.deck.title]
  return {
    questions: deck.questions.map((questionObject) => (questionObject.question.toLowerCase()))
  }
}

export default connect(mapDispatchToProps, { handleAddCard })(AddCardScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContentContainer: {
    maxHeight: 480,
    borderRadius: 2,
    padding: 20,
    backgroundColor: 'white'
  }
});