import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import eyeSlash from "../../../../../assets/eye-slash.png";
import { TransparentButton } from "../../../../components/button/TransparentButton";
import firebase from "firebase/compat/app";
// Required for side-effects

import { collection, addDoc } from "firebase/firestore";
import "firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import "firebase/auth";
import { firebaseConfig } from "../../../../firebaseConfig";
import { database } from "../../../../firebaseConfig";

export const Sign = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [namee, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

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
    }
  };

  const signUp = async () => {
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
        sendData();
        navigation.navigate("Log In");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  return (
    <View style={styles.body}>
      <View>
        <Text style={styles.header}>Create Account</Text>
      </View>
      <View>
        <View>
          <Text style={styles.inputText}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            inputMode="text"
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
            inputMode="number"
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
            inputMode="email"
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
            inputMode="text"
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
            inputMode="text"
            placeholderTextColor={"#0000004D"}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={styles.login}>
        <Text>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Log In")}>
          <Text style={styles.loginText}>Log in</Text>
        </Pressable>
      </View>

      <TransparentButton loading={loading} signUp={signUp} value={"Sign Up"} />
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
