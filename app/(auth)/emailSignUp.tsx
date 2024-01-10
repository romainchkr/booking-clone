import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebaseConfig";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const EmailSignUpPage = () => {
  const router = useRouter();
  const {email} = useLocalSearchParams<{email: string}>();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signUp: () => void = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if(loading || email === undefined) {
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential : UserCredential) => {
        const user = userCredential.user;
        console.log("user");
        setDoc(doc(FIRESTORE_DB, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
        router.push('/(tabs)/account');
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a password</Text>

      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Enter a password"
          placeholderTextColor={Colors.darkgrey}
          autoFocus
          style={[styles.input, !isPasswordFocused && styles.notFocusedInput]}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
      </View>

      <View>
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          placeholder="Confirm your password"
          placeholderTextColor={Colors.darkgrey}
          style={[
            styles.input,
            !isConfirmPasswordFocused && styles.notFocusedInput,
          ]}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.loadingButton]}
        onPress={signUp}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Create account and sign in</Text>
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default EmailSignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    gap: 20,
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 25,
  },
  subtitle: {
    fontFamily: "mon",
    marginVertical: 20,
  },
  label: {
    fontFamily: "mon-sb",
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 4,
    padding: 10,
    marginVertical: 4,
    fontFamily: "mon",
  },
  button: {
    padding: 14,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    fontFamily: "mon-sb",
    textAlign: "center",
    color: Colors.white,
  },
  notFocusedInput: {
    borderColor: Colors.darkgrey,
    borderWidth: 1,
  },

  loadingButton: {
    backgroundColor: Colors.grey,
  },
  errorText: {
    color: Colors.error,
    textAlign: "center",
    marginVertical: 10,
  },
});
