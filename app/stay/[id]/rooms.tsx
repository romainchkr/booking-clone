import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const RoomPage = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  return (
    <View>
      <Text>RoomPage</Text>
    </View>
  )
}

export default RoomPage