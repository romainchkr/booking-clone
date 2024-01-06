import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

const categories = [
  {
    name: "Stays",
    icon: "bed",
  },
  {
    name: "Flights",
    icon: "plane",
  },
  {
    name: "Car rental",
    icon: "car",
  },
  {
    name: "Taxi",
    icon: "taxi",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const HomeHeader = ({onCategoryChanged} : Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectCategory = (index: number) => {
    setActiveIndex(index);

    onCategoryChanged(categories[index].name);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollview} showsHorizontalScrollIndicator={false}>
        {
          categories.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => selectCategory(index)} style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
              <FontAwesome name={item.icon as any} size={20} color={Colors.white} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
  scrollview: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoriesBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  categoriesBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    backgroundColor: "#19498C"
  },
  text: {
    color: Colors.white,
    marginLeft: 8,
    fontFamily: "mon-sb"
  }
});

export default HomeHeader