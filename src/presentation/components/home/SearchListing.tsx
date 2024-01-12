import { StyleSheet, Text, View, Image, FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import React from 'react'
import { SearchPlace } from '@/tmp-interfaces/searchPlace';
import Colors from '@/src/constants/colors.constants';
import { useRouter } from 'expo-router';

interface Props {
  searchInput: string;
  data: SearchPlace[];
}

const SearchListing = ({data : items, searchInput} : Props) => {
  const router = useRouter();

  const onSearchPlacePress = (item : SearchPlace) => {
    router.push({
      pathname: "/",
      params: {
        placeName: `${item.name}, ${item.country}`,
        placeId: item.id,
      },
    });
  }

  const renderRow: ListRenderItem<SearchPlace> = ({item}) => {
    if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
      if (searchInput !== "") {
        return (
          <TouchableOpacity onPress={() => onSearchPlacePress(item)}>
            <View style={styles.container}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.boldText}>{item.name}</Text>
                <Text style={styles.text}>
                  {item.region}, {item.country}
                </Text>
                <Text style={styles.text}>{item.properties} properties</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }

    return null;
  }

  return (
    <FlatList
      data={items}
      renderItem={renderRow}
      keyboardShouldPersistTaps={"always"}
      ListFooterComponent={() => (
        searchInput !== "" &&
        <View style={{ marginVertical: 8 }}>
          <Text style={styles.bottomText}>
            Haven't found your destination? Try a more specific search.
          </Text>
          <Text style={styles.bottomText}>(only works whith Lyon for now)</Text>
        </View>
      )}
    />
  );
}

export default SearchListing

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    padding: 16
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  textContainer: {
    gap: 3,
  },
  text: {
    fontFamily: "mon",
    color: Colors.darkgrey,
    fontSize: 11,
  },
  boldText: {
    fontFamily: "mon-sb",
  },

  bottomText: {
    fontFamily: "mon",
    color: Colors.darkgrey,
    fontSize: 11,
    textAlign: 'center',
  }
});