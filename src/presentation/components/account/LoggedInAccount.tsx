import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/src/constants/colors.constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AppDispatch } from "@/src/application/state/store";
import { useDispatch } from "react-redux";
import { User } from "@/src/domain/entities/user.entity";
import { signOut } from "@/src/application/state/slices/auth.slice";

interface Props {
  user: User;
}

const LoggedInAccount = ({user} : Props) => {
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <View style={{ flex: 1 }}>
      {/* Header if logged in */}
      <View style={styles.header}>
        <View style={styles.pictureContainer}>
          <FontAwesome5 name="user-circle" size={30} color={Colors.white} />
        </View>
        <Text style={styles.nameText}>{user.name}</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => dispatch(signOut())}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoggedInAccount;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    height: 200,
    backgroundColor: Colors.primary,
    alignItems: "center",
    gap: 5,
  },
  pictureContainer: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#494C4C",
  },
  button: {
    padding: 14,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontFamily: "mon-sb",
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontFamily: "mon-sb",
  },
});

// container: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// loggedInContainer: {
//   alignItems: 'center',
// },

// signOutButton: {
//   marginTop: 20,
//   backgroundColor: 'blue',
//   padding: 10,
//   borderRadius: 5,
// },
// signOutText: {
//   color: 'white',
// },