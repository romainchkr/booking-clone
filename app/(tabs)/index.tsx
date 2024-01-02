import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MainPage = () => {
  return (
    <View>
      <Text>main page</Text>
      <Link href={'/(modals)/login'}>login</Link>
      <Link href={'/stay/listing'}>stay listing</Link>
      <Link href={'/stay/123/'}>stay detail page</Link>
      <Link href={'/stay/123/rooms'}>detail room</Link>
      <Link href={'/(search)/search'}>search</Link>
    </View>
  )
}

export default MainPage