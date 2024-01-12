import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/src/constants/colors.constants";
import { Link } from "expo-router";

const SignInPromo = () => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.leftContainer}>
        <View>
          <Text style={styles.title}>Sign in, save money</Text>
          <Text style={styles.text}>
            Save 10% or more at participating properties with a free Booking.com
            membership
          </Text>
        </View>
        <Link href={"/(auth)/login"} style={styles.button} asChild>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require("@/assets/images/bookings_empty_cancelled.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default SignInPromo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    gap: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContainer: {
    flex: 1,
    gap: 20,
  },
  rightContainer: {
    alignSelf: "center",
  },
  title: {
    fontFamily: "mon-sb",
    fontSize: 15,
    marginBottom: 4,
  },
  text: {
    fontFamily: "mon",
    fontSize: 13,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  button: {
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontFamily: "mon-sb",
    color: Colors.white,
    borderRadius: 4,
  },
});
