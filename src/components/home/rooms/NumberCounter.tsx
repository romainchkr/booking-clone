import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
	name: string;
	number: number;
	min: number;
  onNumberChanged: (newNumber: number) => void;
}

const NumberCounter = ({name, number, min, onNumberChanged} : Props) => {
  const pressMinus = ()  => {
    number > min ? onNumberChanged(number-1) : null;
  }

  const pressAdd = ()  => {
    onNumberChanged(number+1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View>
        <TouchableOpacity onPress={() => pressMinus()} style={[styles.button, number <= min && styles.inactive]}>
          <Text style={[styles.actionIcon, number <= min && styles.inactive]}>-</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.number}>{number}</Text>
      <View>
        <TouchableOpacity onPress={() => pressAdd()} style={styles.button}>
        <Text style={styles.actionIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberCounter;

const styles = StyleSheet.create({
  container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
  },
	name: {
		flexGrow: 1,
		fontFamily: "mon-sb"
	},
  number: {
    fontFamily: "mon",
		width: 25,
		textAlign: "center",
  },
	button: {
		borderRadius: 4,
		borderColor: Colors.secondary,
		borderWidth: 1,
		width: 40,
		height: 40,
    alignItems: "center",
    justifyContent: "center",
	},
  inactive: {
    borderColor: Colors.grey,
    color: Colors.grey,
  },
  actionIcon: {
    fontSize: 32,
    lineHeight: 32,
    color: Colors.secondary,
  }
});
