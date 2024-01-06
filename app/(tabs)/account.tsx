import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'

const AccountPage = () => {
  return (
    <ScrollView>
      {/* Header if not logged in */}
      <View style={styles.header}>
        <View style={styles.pictureContainer}>
          <FontAwesome5 name="user-circle" size={30} color={Colors.white} />
        </View>
        <Text style={styles.text}>Sign in to manage your trips. You'll also unlock Genius discounts at great properties worldwide.</Text>
        <Link href={'/(modals)/login'} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  )
}

export default AccountPage

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    height: 200,
    backgroundColor: Colors.primary,
    alignItems: "center",
    gap: 20,
  },
  pictureContainer: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#494C4C",
  },
  button: {
    padding: 14,
    backgroundColor: Colors.secondary, 
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'mon-sb',
  },
  text: {
    color: Colors.white,
    fontFamily: "mon",
    textAlign: "center",
    fontSize: 13
  }
});