import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  VirtualizedList,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Entypo, Ionicons, MaterialIcons, } from '@expo/vector-icons';
import { handleInitialData } from '../actions/shared';
import Loading from './Loading';
import { Container } from './WrapperComponents';
import CreateDeckModal from './Modals/CreateDeckModal';

// import { setLocalNotification } from '../utils/api'

function MainScreen(props) {
  const [createModalVisibility, setCreateModalVisibility] = useState(false);

  useEffect(() => {
    props.handleInitialData();
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.iconsContainer}
          onPress={()=>{props.navigation.navigate("Settings")}}
        >
          {Platform.OS === 'ios' ? <>
          <Ionicons name='ios-settings' color='black' size={36} />
          </>:<>
          <Ionicons name='settings' color='black' size={36} />
          </>}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.iconsContainer}
          onPress={()=>{setCreateModalVisibility(true)}}
        >
          <Entypo name='circle-with-plus' size={36} />
        </TouchableOpacity>
      )
    });
  }, [])

  function navigateToItem(title) {
    props.navigation.navigate(
      'Deck',
      { title }
    )
  }

  if (props.loading === true) {
    return <Loading />
  }
  
  return (
    <Container center>
      <CreateDeckModal
        visible={createModalVisibility}
        close={() => {setCreateModalVisibility(false)}}
        navigateToDeck={navigateToItem}
      />
      <VirtualizedList
        style={{ paddingVertical: 15, width: '100%' }}
        contentContainerStyle={{ paddingBottom: 30 }}
        data={props.decks}
        renderItem={
          ({item}) => (
            <TouchableOpacity
              key={item.title}
              style={styles.deckContainer}
              onPress={() => {navigateToItem(item.title)}}
            >
              <Text style={styles.deckTitle}>
                {item.title}
              </Text>
              <View style={styles.deckCount}>
                <Text style={styles.deckCountText}>{item.questions.length}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        getItem={(data, index) => {
          let indices = Object.keys(data);
          return data[indices[index]];
        }}
        getItemCount={(data)=>{
          return Object.keys(data).length;
        }}
        listKey={"MainList"}
        initialNumToRender={5}
        keyExtractor={(item) => {
          return item.title;
        }}
        ListEmptyComponent={() => {
          return <View style={[styles.deckContainer, {borderWidth: 0, justifyContent: 'center'}]}>
            <Text style={{fontSize: 24}}>No Decks Here Yet</Text>
          </View>
        }}
      />
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    loading: state.loadingIndicator,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 30,
    marginHorizontal: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
  },
  deckCount: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    padding: 8
  },
  deckCountText : {
    fontSize: 20
  },
  deckTitle: {
    textAlign: 'left',
    fontSize: 28,
  },
});