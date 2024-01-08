import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { ListingPlace } from '@/src/interfaces/listingPlace';
import Place from '@/src/components/stay/Place';
import ListingHeader from '@/src/components/stay/ListingHeader';
import EmptyListing from '@/src/components/stay/EmptyListing';

const data: ListingPlace[] = [
  {
    id: '1',
    propertyType: 'Bed in dormitory',
    name: 'Yasi Hostel',
    rating: 8.7,
    reviewNumber: 1240,
    district: '3rd arr',
    distanceFromCenter: 2800,
    price: 22,
    sustainability: 2,
    image: 'https://content.r9cdn.net/rimg/dimg/6e/be/35edddf3-city-32643-1777295ff50.jpg?width=1366&height=768&xhint=1996&yhint=2225&crop=true',
  },
  {
    id: '2',
    propertyType: 'Hotel room',
    name: 'Hotêl Villa Berlioz',
    rating: 7.0,
    reviewNumber: 1048,
    district: '2rd arr',
    distanceFromCenter: 1300,
    price: 61,
    sustainability: 1,
    image: 'https://a.cdn-hotels.com/gdcs/production140/d1329/4ff90d12-f631-4df5-be5f-162545ce8863.jpg?impolicy=fcrop&w=800&h=533&q=medium',
  },
  {
    id: '3',
    propertyType: 'Entire studio',
    name: "Appart'City Part dieu",
    rating: 7.4,
    reviewNumber: 1247,
    district: '3rd arr',
    distanceFromCenter: 2400,
    price: 127,
    sustainability: 1,
    image: 'https://www.ahstatic.com/photos/2950_ho_00_p_1024x768.jpg',
  },
]

const ListingPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [places, setPlaces] = useState<ListingPlace[]>([]);
  
  const { placeId, placeName } = useLocalSearchParams<{placeId: string, placeName: string}>();
  console.log("placeId", placeId);

  useEffect(() => {
    console.log("use effect reload");
    // setPlaces(data);
    setLoading(false);
  }, []);

  const onSortPress = () => {};

  const onFilterPress = () => {};

  const onMapPress = () => {};

  const renderRow: ListRenderItem<ListingPlace> = ({item}) => {
    return <View style={{margin: 16}}><Place data={item} /></View>
  }

  const renderSeparator = () => (
    <View style={styles.separator}></View>
  )
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{header: () => <ListingHeader placeName={placeName} />}} />

      {places.length > 0 ? (
        <FlatList
          data={places}
          renderItem={renderRow}
          ItemSeparatorComponent={() => renderSeparator()}
          ListHeaderComponentStyle={{marginHorizontal: 16, marginTop: 16,}}
          ListHeaderComponent={() => (<Text>{places.length} properties</Text>)}
        />
      ) : (<EmptyListing placeName={placeName} />)}
    </View>
  );
}

export default ListingPage

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

  filterBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 }, // change this for more shadow
    shadowOpacity: 0.1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontFamily: "mon-sb",
  },

  separator: {
    height: 1,
    backgroundColor: Colors.grey,
  }
});