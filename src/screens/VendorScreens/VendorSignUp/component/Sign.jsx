import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
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
      .createUserWithEmailAndPassword(email, password)
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
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const handleLogin = () => {
    navigation.navigate("Vendor Login");
  };
  return (
    <View style={styles.body}>
      <Text style={styles.header}>Create Account</Text>

      <View>
        <View>
          <Text style={styles.inputText}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Your Email"
            onChangeText={setEmail}
            placeholderTextColor={"#0000004D"}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"#0000004D"}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"#0000004D"}
          />
          <Text style={{ color: "red" }}>{errormessage}</Text>
        </View>
      </View>
      <View style={styles.login}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>

      <TransparentButton
        loading={loading}
        value={"Sign UP"}
        signUp={
          password === confirmPassword
            ? vendorSignUp
            : () => setErrorMessage("Your password does not match")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    height: "auto",
    paddingHorizontal: 18,
    position: "absolute",
    top: 200,
    paddingVertical: 13,
    backgroundColor: "white",
    // borderRadius: 30,
    fontSize: 16,
  },
  header: {
    color: "#FD6A00",
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
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
