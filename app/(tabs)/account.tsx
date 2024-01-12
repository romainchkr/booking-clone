import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import LoggedOutAccount from '@/src/presentation/components/account/LoggedOutAccount'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/application/state/store'
import LoggedInAccount from '@/src/presentation/components/account/LoggedInAccount'

const AccountPage = () => {
  const user = useSelector((state: RootState) => state.user.userDetails);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  return (
    <View style={{flex: 1}}>
       {isAuthenticated && user ? (
        <LoggedInAccount user={user} /> 
      ) : (
        <LoggedOutAccount />
      )}      
    </View>
  )
}

export default AccountPage