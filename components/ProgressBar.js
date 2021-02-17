import React from 'react'
import { View, Text } from 'react-native'

export default function ProgressBar(props) {
  return (
    <View style={{
      flexDirection: 'row',
      marginTop: 30,
      backgroundColor: '#c2c2c2',
      borderRadius: 8,
      height: 40,
      width: '80%',
      justifyContent: 'flex-start'
    }}>
      <View style={{
        backgroundColor: 'darkgreen',
        borderRadius: 8,
        height: 40,
        width: `${props.percentage}%`,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {props.percentage >= 25 &&
          <Text style={{color: 'white', fontSize: 24}}>
            {props.percentage} %
          </Text>
        }
      </View>
      {props.percentage < 25 &&
        <Text style={{
          marginLeft: 10,
          color: 'black',
          fontSize: 24
        }}>
          {props.percentage} %
        </Text>
      }
    </View>
  )
}
