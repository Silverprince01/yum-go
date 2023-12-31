import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OrangeButton } from "../../../../components/button/OrangeButton";
import firebase from "firebase/compat/app";

import "firebase/auth";

export const Log = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  const handleSignUp = () => {
    navigation.navigate("Consumer Sign Up");
  };
  return (
    <View style={styles.body}>
      <View>
        <Text style={styles.header}>Login with your email and password</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="yumgo@gmail.com"
            placeholderTextColor={"#0000004D"}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Passsword</Text>
          <TextInput
            style={styles.input}
            placeholder="***********"
            placeholderTextColor={"#0000004D"}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Text style={{ color: "red" }}>{errormessage}</Text>
        <View style={styles.login}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={handleSignUp}>
            <Text style={styles.loginText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 30,
          width: "110%",
          paddingHorizontal: 10,
        }}
      >
        <OrangeButton
          value="Log In"
          loading={loading}
          handleLogin={handleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    paddingHorizontal: 18,
    position: "absolute",
    top: 185,
    paddingVertical: 13,
    backgroundColor: "white",
    borderRadius: 30,
    fontSize: 16,
    height: 500,
    // flex:2
  },
  header: {
    color: "#FD6A00",
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 28.14,
    paddingVertical: 20,
  },
  inputContainer: {
    position: "relative",
    marginVertical: 15,
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
