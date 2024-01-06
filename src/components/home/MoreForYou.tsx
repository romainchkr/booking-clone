import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MoreForYou = () => {
  return (
    <View>
      <Text style={styles.title}>More for you</Text>
      <View style={{height: 200}}></View>
    </View>
  )
}

export default MoreForYou

const styles = StyleSheet.create({
    title: {
        fontFamily: "mon-b",
        fontSize: 18,
    },
})