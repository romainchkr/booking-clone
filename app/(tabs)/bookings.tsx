import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const bookingStatus = [
  {
    name: "Active",
    image: require('@/assets/images/bookings_empty_active.png'),
    textIfEmpty: "No bookings yet",
  },
  {
    name: "Past",
    image: require('@/assets/images/bookings_empty_past.png'),
    textIfEmpty: "No past bookings",
  },
  {
    name: "Cancelled",
    image: require('@/assets/images/bookings_empty_cancelled.png'),
    textIfEmpty: "No cancelled bookings",
  },
];

const BookingsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <View style={{flex: 1}}>
      {/* Top scroll view that display booking status */}
      <ScrollView horizontal style={{flexGrow: 0}} contentContainerStyle={styles.statusScrollview}>
        {bookingStatus.map((item, index) => (
          <TouchableOpacity onPress={() => setActiveIndex(index)} key={index} style={activeIndex === index ? styles.statusItemActive : styles.statusItem}>
            <Text style={activeIndex === index ? styles.textActive : styles.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Booking historic if empty */}
      <ScrollView contentContainerStyle={styles.bookingScrollview}>
        <Image source={bookingStatus[activeIndex].image} style={styles.image}/>
        <Text style={styles.title}>{bookingStatus[activeIndex].textIfEmpty}</Text>
        <Text style={styles.text}>Sign in or create an account to get started</Text>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  statusScrollview: {
    flexDirection: "row",
    gap: 8,
    padding: 10,
    alignItems: "center",

  },
  statusItemActive: {
    borderColor: Colors.secondary,
    backgroundColor: "rgba(0, 159, 227, 0.05)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  statusItem: {
    padding: 10,
  },
  textActive: {
    color: Colors.secondary,
    fontFamily: "mon",
    fontSize: 15
  },
  text: {
    fontFamily: "mon",
    fontSize: 15
  },

  bookingScrollview: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    gap: 25
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 25  
  },
  button: {
    padding: 12,
    backgroundColor: Colors.secondary, 
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'mon-sb',
  },
});

export default BookingsPage