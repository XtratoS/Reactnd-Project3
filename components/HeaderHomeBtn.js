import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderHomeBtn(props) {
  return (
    <TouchableOpacity
      style={styles.iconsContainer}
      onPress={()=>{props.navigation.dispatch(StackActions.popToTop())}}
    >
      <Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'home'} size={36} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
});