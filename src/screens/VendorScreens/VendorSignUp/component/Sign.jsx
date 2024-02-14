import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TransparentButton } from "../../../../components/button/TransparentButton";
import firebase from "firebase/compat/app";

import "firebase/auth";

export const Sign = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const vendorSignUp = async () => {
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user);
        setLoading(false);

        navigation.navigate("Vendor Register");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;

        setErrorMessage(errorMessage);
      });
  };

  const handleLogin = () => {
    navigation.navigate("Vendor Login");
  };
  // const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

  return (
    <ScrollView style={styles.body}>
      
      <Text style={styles.header}>Create Account</Text>

      <View>
        <Text style={styles.inputText}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor={"#0000004D"}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View>
        <Text style={styles.inputText}>Passsword</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Password"
          placeholderTextColor={"#0000004D"}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View>
        <Text style={styles.inputText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={"#0000004D"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Text style={{ color: "red" }}>{errormessage}</Text>
      <View style={styles.login}>
        <Text>Already have an account?</Text>
        <Pressable onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </Pressable>
      </View>
      
      <TransparentButton
        value="Sign UP"
        loading={loading}
        vendorSignUp={
          password === confirmPassword
            ? vendorSignUp
            : () => setErrorMessage("Your password does not match")
        }
      />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    paddingHorizontal: 18,
    paddingBottom: 25,
    backgroundColor: "white",
    fontSize: 16,
  },
  header: {
    color: "#FD6A00",
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
  },
  inputContainer: {
    position: "relative",
  },
  inputText: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    borderColor: "#FF6600",
    borderWidth: 1,
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: 10,
    width: 15,
    height: 15,
    top: 50,
  },
  login: {
    marginVertical: 15,
    flexDirection: "row",
  },
  loginText: {
    marginLeft: 10,
    color: "#FD6A00",
  },
});