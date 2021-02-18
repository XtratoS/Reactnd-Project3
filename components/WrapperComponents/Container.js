import React from 'react';
import { View } from 'react-native';

export default function Container(props) {
  const style = [{
    padding: 20,
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  }];
  if (props.center) {
    style.push({
      justifyContent: 'center',
      alignItems: 'center'
    });
  }

  return <View style={[style, props.style]}>{props.children}</View>
}