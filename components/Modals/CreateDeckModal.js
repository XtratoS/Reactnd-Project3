import React, { useState } from 'react';
import { Modal, KeyboardAvoidingView, Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { handleCreateDeck } from '../../actions/decks';
import { Container, Section, Btn } from '../WrapperComponents';
import MoreTextInput from '../MoreTextInput';
import ModalBackdrop from './ModalBackdrop';
import { Ionicons } from '@expo/vector-icons';

function CreateDeckModal(props) {
  const [name, setName] = useState('');

  const submitDeck = async () => {
    // DISPATCH ACTION
    props.createDeck(name);

    // CLEAR FIELDS
    setName('');

    // NAVIGATE
    props.close();
    props.navigateToDeck(name);
  }

  return (
    <Modal
      animationType='fade'
      visible={props.visible}
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
              onPress={() => {props.close()}}
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

let mapDispatchToProps = {
  createDeck: handleCreateDeck
}

export default connect(null, mapDispatchToProps)(CreateDeckModal);

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
    backgroundColor: 'white'
  },
});