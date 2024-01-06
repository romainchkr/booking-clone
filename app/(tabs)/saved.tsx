import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'

const SavedPage = () => {
  return (
    // View if not logged in or 0 booking saved
    <View style={styles.container}>
      <Image source={require('@/assets/images/bookings_empty_cancelled.png')} style={styles.image}/>
      <Text style={styles.title}>Save what you like for later</Text>
      <Text style={styles.text}>Create lists of yout favourite properties to help you share, compare and book</Text>
      <Link href={'/(tabs)'} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start your search</Text>
        </TouchableOpacity>
      </Link>
      <Link href={'/(modals)/login'} style={styles.link}>Create a list</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 30,
    margin: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 22,
    fontFamily: "mon-b",
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    padding: 16,
    backgroundColor: Colors.secondary, 
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'mon-sb',
  },
  link: {
    fontFamily: 'mon-sb',
    fontSize: 15,
    color: Colors.secondary,
  }
});

export default SavedPage