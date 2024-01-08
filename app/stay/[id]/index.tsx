import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'

const StayDetailPage = () => {
  const navigation = useNavigation();
  const {id} = useLocalSearchParams<{id: string}>();
  // console.log("id from index: ", id);

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: `Hotel id ${id}` });
  }, [navigation]);
  
  return (
    <View>
      <Text>StayPage</Text>
    </View>
  )
}

export default StayDetailPage