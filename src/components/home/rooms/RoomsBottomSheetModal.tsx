import { StyleSheet, View, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import NumberCounter from "./NumberCounter";
import Colors from "@/constants/Colors";

interface Props {
  initialRoomsNumber: number;
  initialAdultsNumber: number;
  initialChildrensNumber: number;
  onRoomsNumberApply: (rooms: number, adults: number, children: number) => void;
}
type Ref = BottomSheetModal;

const RoomsBottomSheetModal = forwardRef<Ref, Props>(({initialRoomsNumber, initialAdultsNumber, initialChildrensNumber, onRoomsNumberApply} : Props, ref) => {
  const [roomsNumber, setRoomsNumber] = useState<number>(initialRoomsNumber);
  const [adultsNumber, setAdultsNumber] = useState<number>(initialAdultsNumber);
  const [childrensNumber, setChildrensNumber] = useState<number>(initialChildrensNumber);

	const snapPoints = useMemo(() => [350], []);
	const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

  return (
    <BottomSheetModal
      index={0}
      snapPoints={snapPoints}
      ref={ref}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Select rooms and guests</Text>

          <NumberCounter name={"Rooms"} number={roomsNumber} min={1} onNumberChanged={(newNumber) => setRoomsNumber(newNumber)}/>
          <NumberCounter name={"Adults"} number={adultsNumber} min={1} onNumberChanged={(newNumber) => setAdultsNumber(newNumber)}/>
          <NumberCounter name={"Childrens"} number={childrensNumber} min={0} onNumberChanged={(newNumber) => setChildrensNumber(newNumber)}/>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => onRoomsNumberApply(roomsNumber, adultsNumber, childrensNumber)} style={styles.button}>
            <Text style={styles.text}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 15,
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 22,
  },
  footer: {
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 }, // change this for more shadow
    shadowOpacity: 0.1,
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    margin: 15,
    padding: 12,
  },
  text: {
    fontFamily: "mon-sb",
    fontSize: 18,
    color: Colors.white,
    textAlign: "center",
  },
});

export default RoomsBottomSheetModal;