import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export default function Bar() {
  return (
    <View style={{backgroundColor: "crimson", height: Constants.statusBarHeight}}>
      <StatusBar backgroundColor="crimson" translucent style="light" />
    </View>
  )
}
