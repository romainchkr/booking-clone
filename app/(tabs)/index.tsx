import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import HomeHeader from '@/src/components/home/HomeHeader'
import { ScrollView } from 'react-native-gesture-handler'
import Stays from '@/src/components/home/Stays'
import Flights from '@/src/components/home/Flights'
import SignInPromo from '@/src/components/home/SignInPromo'
import MoreForYou from '@/src/components/home/MoreForYou'

const MainPage = () => {
  const [category, setCategory] = useState<string>('Stays');
  const onCategoryChanged = (category: string) => {
    setCategory(category);
  }

  return (
    <View style={{flex: 1}}>
      <HomeHeader onCategoryChanged={onCategoryChanged}/>

      <ScrollView contentContainerStyle={styles.scrollViewBody}> 
        {category == "Stays" ? <Stays /> : <Flights />}

        <SignInPromo />

        <MoreForYou />
      </ScrollView>
    </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
  scrollViewBody: {
    paddingTop: 20,
    marginHorizontal: 20,
    gap: 30,
  }
})