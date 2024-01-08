import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

interface Props {
    placeName: string;
}

const EmptyListing = ({placeName} : Props) => {
  return (
    <View style={styles.container}>
    <Image source={require('@/assets/images/bookings_empty_cancelled.png')} style={styles.image}/>
    <Text style={styles.title}>No properties found in {placeName}</Text>
    <Text style={styles.text}>There are no matching properties for your search criteria. Try updating your search</Text>
    <Link href={'/'} asChild>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update search</Text>
      </TouchableOpacity>
    </Link>
  </View>
  )
}

export default EmptyListing

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
  });