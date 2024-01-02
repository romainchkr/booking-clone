import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const RoomPage = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    console.log("id from rooms: ", id);
  return (
    <View>
      <Text>RoomPage</Text>
    </View>
  )
}

export default RoomPage