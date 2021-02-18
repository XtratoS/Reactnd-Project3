import React, { useState } from 'react';
import { Modal, KeyboardAvoidingView, Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { handleCreateDeck } from '../../actions/decks';
import { Section, Btn } from '../WrapperComponents';
import MoreTextInput from '../MoreTextInput';
import ModalBackdrop from './ModalBackdrop';
import { Ionicons } from '@expo/vector-icons';

function CreateDeckModal(props) {
  const [name, setName] = useState('');

  const submitDeck = async () => {
    // FORM VALIDATION
    if (name.length === 0) {
      alert("You must input a name for the deck");
      return;
    } else if (props.deckTitles.includes(name.toLowerCase())) {
      alert("A deck with this name already exists, please use a different name for the new deck");
      return;
    }

    // DISPATCH ACTION
    props.createDeck(name);

    // NAVIGATE
    props.close();
    props.navigateToDeck(name);
  }

  function closeBtnPress() {
    setName('');
    props.close();
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
            {justifyContent: 'center', alignItems: 'center'}
          ]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View center style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
              onPress={closeBtnPress}
            >
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-close-circle' : 'close-circle'}
                color='red'
                size={48}
              />
            </TouchableOpacity>
          </View>
          <Section center>
            <MoreTextInput
              placeholder='Deck Name'

              value={name}

              handleChange={(newText) => setName(newText)}
              clear={() => setName('')}
            />
          </Section>
          <Section center flex={0.5}>
            <Btn
              color='darkgreen'
              textColor='white'
              onPress={submitDeck}
            >
              Create Deck
            </Btn>
          </Section>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

function mapStateToProps(state) {
  return {
    deckTitles: Object.keys(state.decks).map((title) => (title.toLowerCase()))
  }
}

let mapDispatchToProps = {
  createDeck: handleCreateDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeckModal);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContentContainer: {
    margin: 35,
    borderRadius: 2,
    padding: 20,
    maxHeight: 400,
    backgroundColor: 'white'
  },
});