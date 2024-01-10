import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";

const EmailPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const submitEmail: () => Promise<void> = async () => {
    // Regular expression pattern for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    // CHECK firestore user exist with cloud function ?
    // if yes redirect to password, if not redirect to register

    if (true) {
      setIsSignIn(true);
      setLoading(false);
    } else {
      router.push({
        pathname: "/(auth)/emailSignUp",
        params: {
          email: email,
        },
      });
    }
  };

  const signIn: () => void = () => {
    if (loading || (email == "" && password == "")) {
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential: UserCredential) => {
        console.log("user log in", userCredential);
      })
      .catch((error) => {
        setError(error.message);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Enter your email address</Text>
        <Text style={styles.subtitle}>
          We'll use this to sign you in or to create an account if you don't
          have one yet.
        </Text>
      </View>

      <View>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email address"
          placeholderTextColor={Colors.darkgrey}
          autoFocus
          style={[styles.input, !isEmailFocused && styles.notFocusedInput]}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      {isSignIn && (
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            secureTextEntry={true}
            placeholderTextColor={Colors.darkgrey}
            autoFocus
            style={[styles.input, !isPasswordFocused && styles.notFocusedInput]}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, loading && styles.loadingButton]}
        onPress={isSignIn ? signIn : submitEmail}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default EmailPage;

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
    marginTop: 10,
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
  notFocusedInput: {
    borderColor: Colors.darkgrey,
    borderWidth: 1,
  },
  button: {
    padding: 14,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  loadingButton: {
    backgroundColor: Colors.grey,
  },
  buttonText: {
    fontFamily: "mon-sb",
    textAlign: "center",
    color: Colors.white,
  },
  errorText: {
    color: Colors.error,
    textAlign: "center",
    marginVertical: 10,
  },
});
