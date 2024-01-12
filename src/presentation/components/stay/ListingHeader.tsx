import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/colors.constants";
import { router } from "expo-router";

interface Props {
	placeName: string;
}

const ListingHeader = ({placeName} : Props) => {
  const renderActionButton = (
    text: string,
    iconName: React.ComponentProps<typeof FontAwesome>["name"],
    onPress: () => void
  ) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <FontAwesome name={iconName} size={20} color={Colors.black} />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const onSortPress = () => {};

  const onFilterPress = () => {};

  const onMapPress = () => {};

  return (

    <View style={styles.container}>
			<View style={{height: 100}}></View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ flexGrow: 1 }}>{placeName}</Text>
      </View>

      {/* Filter bar */}
      <View style={styles.filterBarContainer}>
        {renderActionButton("Sort", "sort", onSortPress)}
        {renderActionButton("Filter", "filter", onFilterPress)}
        {renderActionButton("Map", "map", onMapPress)}
      </View>
    </View>
  );
};

export default ListingHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
  inputContainer: {
		position: "absolute",
		top: 45,
		zIndex: 1,
		backgroundColor: Colors.white,

    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    margin: 16,
		paddingHorizontal: 10,
    paddingVertical: 15,

    borderColor: Colors.tertiary,
    borderWidth: 3,
    borderRadius: 5,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 }, // change this for more shadow
    shadowOpacity: 0.1,
  },

  filterBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
		paddingTop: 35,
    padding: 16,
    backgroundColor: "white",
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
});
