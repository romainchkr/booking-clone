import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { Link } from 'expo-router'

const LoggedOutAccount = () => {
  return (
    <View style={{flex: 1}}>
      {/* Header if not logged in */}
      <View style={styles.header}>
        <View style={styles.pictureContainer}>
          <FontAwesome5 name="user-circle" size={30} color={Colors.white} />
        </View>
        <Text style={styles.text}>Sign in to manage your trips. You'll also unlock Genius discounts at great properties worldwide.</Text>
        <Link href={'/(auth)/login'} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.informations}>
        <Text style={styles.infoText}>Project made by <Text style={{fontFamily: "mon-sb"}}>Romain Chikirou</Text></Text>
        <Text style={styles.infoText}>Using</Text>
        <View>
          <Text style={styles.infoText}>React native Expo</Text>
          <Text style={styles.infoText}>Typescript</Text>
          <Text style={styles.infoText}>Redux</Text>
          <Text style={styles.infoText}>Firebase</Text>
        </View>
      </View>
    </View>
  )
}

export default LoggedOutAccount

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
    },
  
    informations: {
      flex: 1,
      justifyContent: "center",
      gap: 30,
    },
    infoText: {
      fontFamily: "mon",
      textAlign: "center",
      fontSize: 18
    }
  });