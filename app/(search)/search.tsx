import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import SearchListing from '@/src/components/home/SearchListing'
import { SearchPlace } from '@/src/interfaces/searchPlace'

const data: SearchPlace[] = [
  {
    id: '1',
    type: 'city',
    name: 'Lyon',
    city: 'Lyon',
    region: 'Rhône-Alpes',
    country: 'France',
    properties: 1300,
    image: 'https://content.r9cdn.net/rimg/dimg/6e/be/35edddf3-city-32643-1777295ff50.jpg?width=1366&height=768&xhint=1996&yhint=2225&crop=true',
  },
  {
    id: '2',
    type: 'place',
    name: 'Lyon City-Centre',
    city: 'Lyon',
    region: 'Rhône-Alpes',
    country: 'France',
    properties: 300,
    image: 'https://a.cdn-hotels.com/gdcs/production140/d1329/4ff90d12-f631-4df5-be5f-162545ce8863.jpg?impolicy=fcrop&w=800&h=533&q=medium',
  },
  {
    id: '3',
    type: 'property',
    name: 'Hotel Lyon Métropole',
    city: 'Lyon',
    region: 'Rhône-Alpes',
    country: 'France',
    properties: 0,
    image: 'https://www.ahstatic.com/photos/2950_ho_00_p_1024x768.jpg',
  },
]

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          placeholder="Enter destination"
          autoFocus
          style={{ flexGrow: 1 }}
        />
        {searchInput.length > 0 ? (
          <TouchableOpacity onPress={() => setSearchInput("")}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>
      
      <SearchListing data={data} searchInput={searchInput}/>
    </SafeAreaView>
  );
}

export default SearchPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    margin: 16,

    borderColor: Colors.tertiary,
    borderWidth: 3,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});