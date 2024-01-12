import { StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/src/constants/colors.constants'
import EmptySaved from '@/src/presentation/components/saved/EmptySaved'

const SavedPage = () => {
  return (
    // View if not logged in or 0 booking saved
    <EmptySaved />
    
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