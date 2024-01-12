import { View, StyleSheet } from 'react-native'
import HomeHeader from '@/src/presentation/components/home/HomeHeader'
import { ScrollView } from 'react-native-gesture-handler'
import Stays from '@/src/presentation/components/home/Stays'
import Flights from '@/src/presentation/components/home/Flights'
import SignInPromo from '@/src/presentation/components/home/SignInPromo'
import MoreForYou from '@/src/presentation/components/home/MoreForYou'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FirebaseAuthRepository } from '@/src/infrastructure/repositories/firebaseAuth.repository'
import { fetchUserDetails } from '@/src/application/state/slices/user.slice'
import { AppDispatch } from '@/src/application/state/store'
import { authenticate } from '@/src/application/state/slices/auth.slice'

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authRepository = FirebaseAuthRepository.getInstance();
  
  const [category, setCategory] = useState<string>('Stays');
  const onCategoryChanged = (category: string) => {
    setCategory(category);
  }

  // Set up auth with firebase
  // Only used to persist auth state
  useEffect(() => {
    const unsubscribe = authRepository.onAuthStateChanged(userId => {
      if (userId) {
        console.log("user is logged in && fetch user details");
        dispatch(fetchUserDetails(userId));
        dispatch(authenticate(userId));
      } else {
        console.log("user is not logged in");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch, authRepository]);

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