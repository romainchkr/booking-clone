import { StyleSheet, View, Text } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/src/constants/colors.constants";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import RoomsBottomSheetModal from "./rooms/RoomsBottomSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateRangeBottomSheetModal from "./DateRangeBottomSheetModal";

const Stays = () => {
	const [rooms, setRooms] = useState<number>(1);
	const [adults, setAdults] = useState<number>(2);
	const [childrens, setChildrens] = useState<number>(0);
  const [rangeDate, setRangeDate] = useState<string>("Tue 2 Jan - Wed 3 Jan");

  const router = useRouter();
  const { placeId, placeName } = useLocalSearchParams<{placeId: string, placeName: string}>();

	// bottom sheet modal
	const roomBottomSheetRef = useRef<BottomSheetModal>(null);
	const dateRangeBottomSheetRef = useRef<BottomSheetModal>(null);

	const handlePresentRoomModalPress = useCallback(() => {
    roomBottomSheetRef.current?.present();
  }, []);

	const handlePresentDateRangeModalPress = useCallback(() => {
    dateRangeBottomSheetRef.current?.present();
  }, []);

  const handleRoomsModalApply = (rooms : number, adults: number, childrens: number) => {
    setRooms(rooms);
    setAdults(adults);
    setChildrens(childrens);

    roomBottomSheetRef.current?.dismiss();
  }

  // show required modal if clicked on search and input are empty
  const handleSearch = () => {
    if(placeId === undefined) {
      router.push("/(search)/search");
    } else if(rangeDate == "") {
      handlePresentDateRangeModalPress();
    } else {
      router.push({ pathname: "/stay/listing", params: { placeId, placeName, rangeDate } });
    }
  }

  return (
    <View style={styles.container}>
      <Link href="/(search)/search" asChild>
        <TouchableOpacity style={styles.inputBtn}>
          <FontAwesome name="search" size={24} color="black" />
          <Text>
            {placeName != undefined ? placeName : "Enter your destination"}
          </Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={handlePresentDateRangeModalPress}
        style={styles.inputBtn}
      >
        <FontAwesome name="calendar-o" size={24} color="black" />
        <Text>Tue 2 Jan - Wed 3 Jan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePresentRoomModalPress}
        style={styles.inputBtn}
      >
        <FontAwesome name="user-o" size={24} color="black" />
        <Text>
          {rooms} room . {adults} adults . {childrens} childrens
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontFamily: "mon-sb",
            fontSize: 15,
          }}
        >
          Search
        </Text>
      </TouchableOpacity>

      <RoomsBottomSheetModal
        ref={roomBottomSheetRef}
        onRoomsNumberApply={handleRoomsModalApply}
        initialAdultsNumber={adults}
        initialRoomsNumber={rooms}
        initialChildrensNumber={childrens}
      />
      <DateRangeBottomSheetModal ref={dateRangeBottomSheetRef} />
    </View>
  );
};

export default Stays;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.tertiary,
    borderWidth: 3,
		borderRadius: 5,
  },
	inputBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		borderBottomWidth: 1,
		borderColor: Colors.grey,
		paddingHorizontal: 10,
		paddingVertical: 15,
	},
	searchBtn: {
		backgroundColor: Colors.secondary,
		paddingVertical: 15,
	}
});