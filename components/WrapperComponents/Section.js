import React from 'react';
import { View } from 'react-native';

export default function Section(props) {
  const style = [{
    flex: props.flex || 1,
    width: '100%'
  }];
  if (props.center) {
    style.push({
      justifyContent: 'center',
      alignItems: 'center'
    });
  }

  return <View
    pointerEvents={props.disabled === true ? 'none' : 'auto'}
    style={[style, {opacity: props.disabled === true ? (props.disabledOpacity || 0.5) : 1}, props.style]}
  >
    {props.children}
  </View>
}