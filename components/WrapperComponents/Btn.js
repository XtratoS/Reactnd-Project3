import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Btn(props) {
  return (<TouchableOpacity
    disabled={props.disabled}
    onPress={props.onPress}
    style={[
      {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        width: 180,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: props.color || 'white',
        borderColor: props.borderColor || 'black',
      },
      props.style
    ]}
  >
    <Text style={[{
        fontSize: props.fontSize || 24,
        color: props.textColor || 'black'
      },
      props.textStyle
    ]}>
      {props.children}
    </Text>
  </TouchableOpacity>)
}