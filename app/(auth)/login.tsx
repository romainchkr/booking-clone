import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/src/constants/colors.constants";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const LoginPage = () => {
  const router = useRouter();
  
  const renderButton = (
    text: string,
    iconName: React.ComponentProps<typeof FontAwesome>["name"],
    onClick: () => void
  ) => (
    <TouchableOpacity disabled={true} style={[styles.button, styles.buttonBorder, styles.buttonDisabled]} onPress={onClick}>
      <View style={styles.buttonContent}>
        <FontAwesome name={iconName} size={20} color={Colors.black} />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Sign in for easier access to your trip details
        </Text>

        {renderButton("Continue with Google", "google", () => {})}
        {renderButton("Continue with Apple", "apple", () => {})}
        {renderButton("Continue with Facebook", "facebook", () => {})}

        <TouchableOpacity
          onPress={() => router.push("/(auth)/emailSignIn")}
          style={[styles.button, { backgroundColor: Colors.secondary }]}
        >
          <Text style={[styles.buttonText, { color: Colors.white }]}>
            Continue with Email
          </Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1 }}></View>

        <Text style={styles.text}>
          By signin in or creating an account, you agree with our{" "}
          <Text style={{ color: Colors.secondary }}>Terms & conditions</Text>{" "}
          and <Text style={{ color: Colors.secondary }}>Privacy statement</Text>
        </Text>
        <Text style={styles.text}>2024 Booking.com & romainchkr</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 25,
    marginBottom: 16
  },
  button: {
    padding: 14,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: Colors.darkgrey,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: Colors.grey,
  },
  buttonText: {
    fontFamily: "mon-sb",
    marginLeft: 10,
    textAlign: "center",
  },
  text: {
    fontFamily: "mon",
    textAlign: "center",
    marginVertical: 10,
  }
});
