import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  // KeyboardAvoidingView,
  // Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TransparentButton } from "../../../../components/button/TransparentButton";
import firebase from "firebase/compat/app";
import "firebase/firestore";

import "firebase/auth";
import { database } from "../../../../firebaseConfig";

export const Sign = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [namee, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const userData = {
    namee: namee,
    email: email,
    phone: phone,
    address: address,
  };

  const userCollection = database.collection("consumers");
  const sendData = async () => {
    try {
      const userId = firebase.auth().currentUser;
      userCollection
        .doc(userId.uid)
        .set(userData)
        .then(() => {
          console.log("Data sent successful");
          //   navigation.navigate("Home");
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          //   alert("Data sent successfully!");
        });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const signUp = async () => {
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
        sendData();
        navigation.navigate("Log In");
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
        setErrorMessage(errorMessage);
      });
  };
  const handleLogin = () => {
    navigation.navigate("Log In");
  };

  return (
    <ScrollView style={styles.body}>
      {/* <KeyboardAvoidingView
        behavior="padding"
        style={{ backgroundColor: "white", flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      > */}

      <Text style={styles.header}>Create Account</Text>

      <View>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={"#0000004D"}
          value={namee}
          onChangeText={setName}
        />
      </View>
      <View>
        <Text style={styles.inputText}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={"#0000004D"}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
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
        <Text style={styles.inputText}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Address"
          placeholderTextColor={"#0000004D"}
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Password"
          placeholderTextColor={"#0000004D"}
          value={password}
          onChangeText={setPassword}
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
        loading={loading}
        signUp={signUp}
        value="Sign Up"
      />
      {/* </KeyboardAvoidingView> */}
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
    position: "absolute",
    bottom: 0,
    zIndex: 30,
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
