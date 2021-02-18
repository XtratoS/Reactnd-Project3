import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { handleRemoveDeck } from '../actions/decks';
import headerRightHomeBtn from './HeaderHomeBtn';
import { Container, Section, Btn } from './WrapperComponents';
import ModalBackdrop from './Modals/ModalBackdrop';
import AddCardModal from './Modals/AddCardModal';

function ModalConfirmBtn(props) {
  return (<TouchableOpacity
    style={{ marginRight: 20, padding: 4 }}
    onPress={props.onPress}
  >
    <Text style={{fontSize: 18, color: 'red'}}>
      Delete Deck
    </Text>
  </TouchableOpacity>)
}

function ModalCancelBtn(props) {
  return (<TouchableOpacity
    style={{ marginLeft: 20, padding: 4 }}
    onPress={props.onPress}
  >
    <Text style={{fontSize: 18}}>
      Cancel
    </Text>
  </TouchableOpacity>)
}

function DeckScreen(props) {
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [addCardModalVisibility, setAddCardModalVisibility] = useState(false);

  useEffect(() => {
    if (props.deck && props.deck.title) {
      props.navigation.setOptions({title: props.deck.title})
    }
  }, [props.deck]);

  useEffect (() => {
    props.navigation.setOptions({
      headerRight: () => {return headerRightHomeBtn(props);}
    });
  }, []);

  if (props.loading === true || !props.deck) {
    return <ActivityIndicator style={{paddingVertical: 25}} size="large" color="red"/>
  }

  function showAddCardModal() {
    setAddCardModalVisibility(true);
  }

  function startQuiz() {
    props.navigation.navigate(
      'Quiz',
      { deck: props.deck }
    )
  }

  function toggleModal() {
    setDeleteModalVisibility(!deleteModalVisibility)
  }

  function deleteDeck() {
    toggleModal();
    props.removeDeck();
    props.navigation.goBack();
  }

  const numCards = props.deck.questions.length;
  return (
    <Container center>
      <Modal
        animationType='fade'
        visible={deleteModalVisibility}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <ModalBackdrop />
          <View style={styles.modalContentContainer}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Are you sure you want to delete this deck?
            </Text>
            <View style={styles.modalBtnsContainer}>
              <ModalConfirmBtn onPress={deleteDeck}/>
              <ModalCancelBtn onPress={toggleModal}/>
            </View>
          </View>
        </View>
      </Modal>

      <AddCardModal
        deck={props.deck}
        visible={addCardModalVisibility}
        close={() => {setAddCardModalVisibility(false)}}
      />

      <Section center flex={1}>
        <Text style={{marginVertical:4, fontSize: 36}}>
          {props.deck.title}
        </Text>
        <Text style={{marginVertical:4, fontSize: 16, color: '#444'}}>
          {numCards} Cards
        </Text>
      </Section>
      <Section center flex={2}>
        <Btn
          onPress={showAddCardModal}
        >
          Add Card
        </Btn>

        <Btn
          onPress={startQuiz}
          disabled={numCards === 0}
          style={{opacity: numCards === 0 ? 0.3 : 1}}
        >
          Start Quiz
        </Btn>
      </Section>
      <Section center flex={1.5}>
        <Btn
          onPress={toggleModal}
          color='red'
          borderColor='red'
          textColor='white'
        >
          Delete
        </Btn>
      </Section>
    </Container>
  )
}

function mapStateToProps(state, props) {
  return {
    deck: state.decks[props.route.params.title],
    loading: state.loadingIndicator,
  }
}

function mapDispatchToProps(dispatch, props) {
  let deckTitle = props.route.params.title;
  return {
    removeDeck: () => {dispatch(handleRemoveDeck(deckTitle))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);

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
  modalBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 36
  }
});