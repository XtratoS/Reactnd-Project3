import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Loading() {
  return (
    <ActivityIndicator style={{paddingVertical: 25}} size="large" color="red"/>
  )
}