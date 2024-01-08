import { View, StyleSheet } from 'react-native'
import React from 'react'
import LoggedOutAccount from '@/src/components/account/LoggedOutAccount'

const AccountPage = () => {
  return (
    <View style={{flex: 1}}>
      <LoggedOutAccount />
      
    </View>
  )
}

export default AccountPage

const styles = StyleSheet.create({
});