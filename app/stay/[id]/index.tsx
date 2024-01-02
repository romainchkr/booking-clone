import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const StayPage = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  console.log("id from index: ", id);
  return (
    <View>
      <Text>StayPage</Text>
    </View>
  )
}

export default StayPage